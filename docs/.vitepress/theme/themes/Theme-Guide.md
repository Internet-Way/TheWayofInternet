# Theme System — Developer Guide

A complete reference for understanding, extending, and troubleshooting the bitindex theme engine.

---

## Overview

The theme system is built around two independent concepts:

1. **Display Modes** — The native VitePress `appearance: true` mechanism (HTML `dark` class, persistence, system preference) still powers light/dark, but VitePress's own sun/moon switch UI is **removed** (hidden in `core/style.scss`) because mode switching now happens entirely in the settings menu. The theme engine reads the `dark` class; modes can be toggled via `ThemeHandler.toggleMode()`, which flips the class and persists it.
2. **Fonts** — A site-wide typography selection (`fontOptions`) persisted under `vitepress-theme-font`. Choosing a font overrides `--vp-font-family-base` and `--vp-font-family-heading`, including any theme-defined fonts.
3. **Themes** — Two coexist:
   - **Accent color (default)** — A hue selected from `accents.json` (name + hex). The engine derives a full Tailwind-style ramp from the hex and builds a complete theme for both modes.
   - **Preset theme** — Complete named color scheme (Catppuccin, Rosé Pine, Tokyo Night, Dracula) defined in `configs/`. Selecting a preset **locks the mode and accent selectors** in the settings UI until `None` is chosen again.

> **Key principle:** Accents and presets are mutually exclusive. Choosing a preset clears the accent. Choosing an accent clears the preset. A preset active also disables the mode switcher until the preset is set back to `None`.

---

## Directory Layout

```
docs/.vitepress/theme/themes/
├── theme-types.ts          Type definitions for the entire theme system
├── state.ts                ThemeHandler class — runtime engine
├── exports.ts              Barrel file re-exporting everything
├── theme-palette.ts        Tailwind-style ramps used to build accent themes (fallback for ramps)
├── accents.json            Accent definitions (name + hex) — THE source of accents
├── Theme-Guide.md          This file
│
└── configs/
    ├── registry.ts          Central registry mapping preset names → theme objects
    ├── theme-catppuccin.ts  Catppuccin theme definition
    ├── theme-dracula.ts     Dracula theme definition
    ├── theme-rose-pine.ts   Rosé Pine theme definition
    └── theme-tokyonight.ts  Tokyo Night theme definition
```

### Related UI Components

| Component | Location | Role |
|---|---|---|
| `SettingsMenu.vue` | `theme/components/` | Navbar gear → slim dropdown: mode toggle + accent selector (joined control) + preset selector |

The accent + mode row is rendered as a single joined control — a square mode button and a rectangular accent dropdown with a divider "cut" between them. When a preset is selected, both gray out (`.locked`, `pointer-events: none`). A third dropdown selects the site font. Choosing `None` in the preset dropdown unlocks the mode/accent controls.

**Navbar layout:** VitePress's native appearance switch (desktop `VPNavBarAppearance`, mobile `VPNavScreenAppearance`, and the `VPNavBarExtra` flyout entry) is permanently hidden in `core/style.scss`. The settings gear is parked exactly where the toggle used to be via flex `order` (`.settings-menu` = 1, `.social-links` = 2, `.extra` = 3, `.hamburger` = 4).

---

## Type System (`theme-types.ts`)

### `DisplayMode`

```ts
type DisplayMode = 'light' | 'dark'
```

### `ModeColors`

Defines every color token for a single display mode. Some fields are optional — when omitted, the system falls back to either VitePress defaults or the `ColorPicker` sidebar component.

| Property | Required? | Description |
|---|---|---|
| `brand` | Optional | Brand accent colors (`1`, `2`, `3`, `soft`). If omitted, <br>the `ColorPicker` sidebar component controls brand colors instead. |
| `bg`, `bgAlt`, `bgElv` | **Yes** | Page background, alternate background (sidebar), and elevated background (cards, modals). |
| `bgMark` | Optional | Background for marked/highlighted text. |
| `text` | Optional | Text colors (`1` = primary, `2` = secondary, `3` = muted). <br>If omitted, VitePress built-in text colors are used. |
| `button.brand` | **Yes** | 9 properties for primary buttons: `bg`, `border`, `text`, `hoverBg`, `hoverBorder`, `hoverText`, `activeBg`, `activeBorder`, `activeText`. |
| `button.alt` | **Yes** | 4 properties for secondary buttons: `bg`, `text`, `hoverBg`, `hoverText`. |
| `customBlock` | **Yes** | Colors for `info`, `tip`, `warning`, `danger` callout blocks. Each has `bg`, `border`, `text`, `textDeep`. |
| `selection` | **Yes** | `{ bg }` — text selection highlight color. |
| `home` | Optional | Hero section styling: `heroNameColor`, `heroNameBackground`, `heroImageBackground`, `heroImageFilter`. |

### `Theme`

```ts
interface Theme {
  name: string                        // Internal identifier (used as registry key)
  displayName: string                 // Human-readable name shown in UI
  preview?: string                    // Image URL for the theme selector circle
  logo?: string                       // Custom site logo URL (sets --vp-theme-logo)
  modes: {
    light: ModeColors
    dark: ModeColors
  }
  fonts?: { body?: string; heading?: string }
  borderRadius?: string               // Global border radius override
  spacing?: { small?: string; medium?: string; large?: string }
  customProperties?: Record<string, string>  // Arbitrary CSS custom properties
}
```

### `ThemeState`

Runtime state tracked by the `ThemeHandler`:

```ts
interface ThemeState {
  accent: string | null    // Active accent slug (from accents.json), e.g. 'sapphire'
  preset: string | null    // Active preset theme name (registry key), or null
  theme: Theme | null      // Resolved theme object (preset or generated accent)
}
```

---

## Theme Handler (`state.ts`)

The `ThemeHandler` class is a **singleton** that manages all theme state. It is initialized once via `useThemeHandler()` in the theme's `enhanceApp()` hook.

### Lifecycle

```
Constructor → boot()
  ├── Read saved accent + preset from localStorage (migrates legacy vitepress-theme-name)
  ├── Validate against accents.json / themeRegistry
  └── Apply theme to DOM
```

> The display mode is owned by VitePress (`appearance: true`). The handler reads the current mode from the `dark` class on `<html>` whenever it needs to pick a palette.

### Persistence Keys

| Key | Stores |
|---|---|
| `vitepress-theme-accent` | Active accent slug (e.g. `sapphire`) |
| `vitepress-theme-preset` | Active preset name (e.g. `catppuccin`), removed when `None` |
| `vitepress-theme-font` | Active font name (`default`/`outfit`/`jetbrainsmono`/`montserrat`/`comicsans`) |
| `vitepress-theme-accent-bg` | `1` when "Use Accent Toned BG" is ON (removed when OFF) |
| `vitepress-theme-accent-bg-intensity` | Accent BG tint intensity (0–50, clamped) |
| `vitepress-theme-name` | Legacy key (pre-accent model); migrated once on boot then removed |

(The display mode is persisted by VitePress under its own key.)

### How `applyTheme()` Works

1. Reads the effective mode from the `dark` class on `<html>` (managed by VitePress).
2. Sets base background CSS variables for that mode.
3. Sets `vp-theme-locked` class on `<html>` when a preset is active (used by the settings UI to gray out the mode/accent controls).
4. Resolves the active theme (preset from registry, or generated accent theme) and calls `writeCSS()`.
5. Calls `applyFont()` to layer the user-selected font on top of theme-defined fonts.
6. Calls `applyAccentBg()` to tint the whole neutral palette (backgrounds, surfaces, borders, text) with the active accent when "Use Accent Toned BG" is ON.

### How `writeCSS()` Works

1. **Clears** all inline `--vp-*` CSS variables from `<html>` for a clean slate.
2. **Brand colors:** If the theme defines brand colors, sets `--vp-c-brand-*`. If not, removes them so the `ColorPicker` CSS can take effect.
3. **Backgrounds:** Sets `--vp-c-bg`, `--vp-c-bg-alt`, `--vp-c-bg-elv`, plus surface variables (`--vp-c-bg-soft`, `--vp-c-default-*`).
4. **Text:** Applies text color variables if the theme defines them; removes them otherwise.
5. **Buttons:** Maps all 13 button properties to their CSS variables.
6. **Custom blocks:** Iterates `info`, `tip`, `warning`, `danger` and sets 4 variables each.
7. **Selection, Hero, Fonts, Spacing, Border Radius:** Applied if defined; removed if not.
8. **Custom Properties:** Any key in `theme.customProperties` is set as-is.
9. **Logo:** Sets `--vp-theme-logo: url(...)` if the theme provides a logo.

### Vue Composable (`useTheme()`)

For use in Vue components. Returns reactive refs and methods:

```ts
const {
  mode,                // Ref<DisplayMode> — follows VitePress's dark class via MutationObserver
  accent,              // Ref<string | null> — active accent slug
  preset,              // Ref<string | null> — active preset name
  theme,               // Ref<Theme | null>
  font,                // Ref<string> — active font name (e.g. 'outfit')
  accentBg,            // Ref<boolean> — "Use Accent Toned BG" toggle
  accentBgIntensity,   // Ref<number> — tint intensity 0–50
  isPresetActive,      // ComputedRef<boolean> — preset locks mode + accent selectors
  setAccent,           // (slug: string) => void — clears preset, applies accent theme
  setPreset,           // (name: string | null) => void   null = unlock, back to accent mode
  setFont,             // (name: string) => void — applies + persists font choice
  setAccentBg,         // (enabled: boolean) => void — toggles accent-toned background
  setAccentBgIntensity,// (v: number) => void — sets tint intensity, clamps to 0–50
  toggleMode,          // () => void — flips VitePress dark class (no-op visually when locked)
  accentOptions,       // AccentOption[] — from accents.json ({ slug, name, hex })
  presetOptions,       // { name, displayName }[] — preset themes, user-preferred order
  fontOptions,         // FontOption[] — { name, label, stack }[]
  state                // Ref<ThemeState>
} = useTheme()
```

### Mode Sync

The display mode is owned entirely by VitePress (`appearance: true` in the config, `vitepress-theme-appearance` storage key). The `ThemeHandler` does not manage or persist the mode itself — it observes VitePress's `dark` class on `<html>` via a `MutationObserver` (set up in `boot()` on the client only) and re-applies the active theme palette whenever VitePress flips the class. This works on every page, including the home page. `ThemeHandler.toggleMode()` exists so the settings menu can flip the same class + storage key without duplicating VitePress state.

### Fonts

`fontOptions` (`{ name, label, stack }`) lives in `state.ts`. Available fonts: `default`, `outfit`, `jetbrainsmono`, `montserrat`, `comicsans`. Google Fonts (Outfit, JetBrains Mono, Montserrat) are loaded via `<link>` in the VitePress `head` config; Comic Sans is a system font stack.

**To add a font:** append an entry to `fontOptions` with a CSS font-family stack, and add the corresponding Google Fonts `<link>` to `head` in `config.mts` (or rely on a system font).

`applyFont()` (called at the end of `applyTheme()`, after `writeCSS()` wipes the `--vp-*` variables) sets `--vp-font-family-base` and `--vp-font-family-heading` to the selected stack, or removes them for `default`. This means a user font choice overrides any theme-defined `fonts.body`/`fonts.heading`.

### Accents (`accents.json`)

Accents are defined in `themes/accents.json` as `{ name, hex }` entries. `accentOptions` (and the matching slug) is derived by lowercasing the name. The ramp used to build a full theme comes from `theme-palette.ts` when a matching slug exists there; otherwise it is derived from the hex by mixing toward white/black at fixed ratios.

**To add an accent:** append `{ "name": "YourColor", "hex": "#123456" }` to `accents.json`. No code changes needed. (Optional: add a matching ramp to `theme-palette.ts` to overfit the shades.)

---

## Theme Registry (`configs/registry.ts`)

The registry is a plain object mapping preset theme names to `Theme` objects:

```ts
import { catppuccinTheme } from './theme-catppuccin'
import { draculaTheme } from './theme-dracula'
import { tokyoNightTheme } from './theme-tokyonight'
import { rosePineTheme } from './theme-rose-pine'

export const themeRegistry: ThemeRegistry = {
  catppuccin: catppuccinTheme,
  dracula: draculaTheme,
  tokyonight: tokyoNightTheme,
  'rose-pine': rosePineTheme,
}
```

Accent themes are **not** registered in the registry — they are generated on demand from `accents.json` and cached internally by the `ThemeHandler`.

---

## How to Create a New Theme

### Step 1: Create the theme file

Create `configs/theme-<yourname>.ts`:

```ts
import type { Theme } from '../theme-types'

export const myTheme: Theme = {
  name: 'mytheme',
  displayName: 'My Theme',
  preview: 'https://example.com/preview.png',  // Optional
  modes: {
    light: {
      brand: {                    // Optional — omit to let ColorPicker handle
        1: '#3b82f6',
        2: '#2563eb',
        3: '#1d4ed8',
        soft: '#60a5fa'
      },
      bg: '#ffffff',
      bgAlt: '#f8fafc',
      bgElv: '#f1f5f9',
      button: {
        brand: {
          bg: '#3b82f6', border: '#3b82f6', text: '#ffffff',
          hoverBg: '#2563eb', hoverBorder: '#2563eb', hoverText: '#ffffff',
          activeBg: '#1d4ed8', activeBorder: '#1d4ed8', activeText: '#ffffff'
        },
        alt: {
          bg: '#e2e8f0', text: '#334155',
          hoverBg: '#cbd5e1', hoverText: '#1e293b'
        }
      },
      customBlock: {
        info:    { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af', textDeep: '#1e3a8a' },
        tip:     { bg: '#dcfce7', border: '#22c55e', text: '#166534', textDeep: '#14532d' },
        warning: { bg: '#fef9c3', border: '#eab308', text: '#854d0e', textDeep: '#713f12' },
        danger:  { bg: '#fee2e2', border: '#ef4444', text: '#991b1b', textDeep: '#7f1d1d' }
      },
      selection: { bg: '#bfdbfe' },
      home: {
        heroNameColor: 'transparent',
        heroNameBackground: 'linear-gradient(120deg, #3b82f6 30%, #06b6d4)',
        heroImageBackground: 'linear-gradient(-45deg, #3b82f6 50%, #06b6d4 50%)',
        heroImageFilter: 'blur(44px)'
      }
    },
    dark: {
      // ... same structure with dark-appropriate colors
    }
  }
}
```

### Step 2: Register it

In `configs/registry.ts`, import and add your theme:

```ts
import { myTheme } from './theme-mytheme'

export const themeRegistry: ThemeRegistry = {
  // ... existing themes
  mytheme: myTheme,
}
```

### Step 3: Done

The theme will automatically appear in the `ColorPicker` sidebar as a preset circle. Users can select it just like any other theme.

### Tips

- **Omit `brand`** in your `ModeColors` to let the `ColorPicker` sidebar control accent/link colors independently of your theme.
- **Omit `text`** to use VitePress default text colors (good for themes that only customize backgrounds and accents).
- **Add `preview`** as an image URL for a recognizable circle in the theme selector. If omitted, the system generates a gradient from brand colors.
- **Use `customProperties`** to set arbitrary CSS variables that your own components can consume.

---

## CSS Variables Reference

### Brand
| Variable | Source |
|---|---|
| `--vp-c-brand-1` | `brand.1` or ColorPicker |
| `--vp-c-brand-2` | `brand.2` or ColorPicker |
| `--vp-c-brand-3` | `brand.3` or ColorPicker |
| `--vp-c-brand-soft` | `brand.soft` or ColorPicker |

### Backgrounds
| Variable | Source |
|---|---|
| `--vp-c-bg` | `bg` |
| `--vp-c-bg-alt` | `bgAlt` |
| `--vp-c-bg-elv` | `bgElv` |
| `--vp-c-bg-soft` | Same as `bgAlt` |
| `--vp-c-bg-mark` | `bgMark` (if defined) |
| `--vp-c-default-1` | Same as `bgAlt` |
| `--vp-c-default-2` | Same as `bgElv` |
| `--vp-c-default-3` | Same as `bg` |
| `--vp-c-default-soft` | Same as `bgElv` |

### Text
| Variable | Source |
|---|---|
| `--vp-c-text-1` | `text.1` (if defined) |
| `--vp-c-text-2` | `text.2` (if defined) |
| `--vp-c-text-3` | `text.3` (if defined) |

### Buttons
| Variable | Source |
|---|---|
| `--vp-button-brand-bg` | `button.brand.bg` |
| `--vp-button-brand-border` | `button.brand.border` |
| `--vp-button-brand-text` | `button.brand.text` |
| `--vp-button-brand-hover-*` | `button.brand.hover*` |
| `--vp-button-brand-active-*` | `button.brand.active*` |
| `--vp-button-alt-bg` | `button.alt.bg` |
| `--vp-button-alt-text` | `button.alt.text` |
| `--vp-button-alt-hover-*` | `button.alt.hover*` |

### Custom Blocks
For each block type (`info`, `tip`, `warning`, `danger`):
| Variable | Source |
|---|---|
| `--vp-custom-block-{type}-bg` | `customBlock.{type}.bg` |
| `--vp-custom-block-{type}-border` | `customBlock.{type}.border` |
| `--vp-custom-block-{type}-text` | `customBlock.{type}.text` |
| `--vp-custom-block-{type}-text-deep` | `customBlock.{type}.textDeep` |

### Other
| Variable | Source |
|---|---|
| `--vp-c-selection-bg` | `selection.bg` |
| `--vp-home-hero-name-color` | `home.heroNameColor` |
| `--vp-home-hero-name-background` | `home.heroNameBackground` |
| `--vp-home-hero-image-background-image` | `home.heroImageBackground` |
| `--vp-home-hero-image-filter` | `home.heroImageFilter` |
| `--vp-font-family-base` | `fonts.body` |
| `--vp-font-family-heading` | `fonts.heading` |
| `--vp-border-radius` | `borderRadius` |
| `--vp-spacing-small` | `spacing.small` |
| `--vp-spacing-medium` | `spacing.medium` |
| `--vp-spacing-large` | `spacing.large` |
| `--vp-theme-logo` | `url(logo)` (if defined) |

---

## Settings Menu Integration

The `SettingsMenu.vue` component in the navbar works alongside the theme system:

1. **Mode toggle** — Square button (rounded corners) showing sun/moon; calls `toggleMode()` which flips VitePress's `dark` class. Rendered joined to the accent selector with a divider, like one button split in two.
2. **Accent selector** — Rectangular dropdown listing every entry from `accents.json` with a color dot + name + checkmark. Selecting one calls `setAccent(slug)`.
3. **Preset selector** — Dropdown with `None` + all registered preset themes. Selecting a preset calls `setPreset(name)`; selecting `None` calls `setPreset(null)`.
4. **Accent Toned BG** — Joined control under the accent selector: a small ON/OFF square toggle + an intensity slider (0–50%) in the larger part, grayed out when OFF:
   - **ON/OFF**: `setAccentBg(true/false)` persists to `vitepress-theme-accent-bg`.
   - **Intensity**: `setAccentBgIntensity(v)` clamps 0–50 and persists to `vitepress-theme-accent-bg-intensity`.
   - `applyAccentBg()` converts the accent's 500 hex to OKLCH and re-emits every neutral token (`--vp-c-bg`, `--vp-c-bg-alt`, `--vp-c-bg-elv`, `--vp-c-bg-soft`, `--vp-c-default-*`, `--vp-c-divider`, `--vp-c-border`, `--vp-c-gutter`, `--vp-c-text-1/2/3`) as `oklch(L C*strength H)` with each token's base lightness kept intact (contrast unchanged). Strength = `min(1, accentChroma / 0.1) * (intensity/50) * 1.5`, so colorful accents wash the whole page while grayscale accents stay gray. Skipped while a preset is active.
5. **Font selector** — Dropdown listing `fontOptions`; each item is rendered in its own font as a preview. Selecting one calls `setFont(name)`.
6. **Locking** — While a preset is active, the mode button and accent selector get the `.locked` class (45% opacity, `pointer-events: none`, disabled). The font selector stays unlocked. The native VitePress appearance switch is hidden unconditionally (see "Navbar layout" above).

### Brand Color Interaction

When a preset theme defines `brand` colors, they are set as inline CSS variables and take priority. Accent themes always define `brand`, so switching between the two fully re-applies brand colors.

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Accent not appearing in settings menu | Not in `accents.json` | Append `{ "name": ..., "hex": ... }` to `accents.json` |
| Mode/accent selectors grayed out | A preset is active | Select `None` in the preset dropdown |
| Colors don't update after accent switch | Stale localStorage | Clear `vitepress-theme-accent` / `vitepress-theme-preset` |
| Theme preview missing | No `preview` property and no brand colors | Add a `preview` URL or define `brand` colors for gradient fallback |
| Fonts not applying | `fonts.body` / `fonts.heading` not defined | Add the `fonts` property to your theme definition |
