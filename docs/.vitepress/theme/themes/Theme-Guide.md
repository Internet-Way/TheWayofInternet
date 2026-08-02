# Theme System — Developer Guide

A complete reference for understanding, extending, and troubleshooting the bitindex theme engine.

---

## Overview

The theme system is built around two independent concepts:

1. **Display Modes** — The native VitePress light/dark toggle (`appearance: true`). The mode is managed entirely by VitePress (HTML class, persistence, system preference); the theme engine only reads it.
2. **Themes** — Named color schemes (Catppuccin, Dracula, etc.) that define palettes for both light and dark modes. Themes are independent from the display mode toggle.

> **Key principle:** Modes and themes are orthogonal. Switching from light to dark mode doesn't change your theme. Switching your theme doesn't change your mode.

---

## Directory Layout

```
docs/.vitepress/theme/themes/
├── theme-types.ts          Type definitions for the entire theme system
├── state.ts                ThemeHandler class — runtime engine
├── exports.ts              Barrel file re-exporting everything
├── theme-palette.ts        Color swatches used by the sidebar ColorPicker
├── Theme-Guide.md          This file
│
└── configs/
    ├── registry.ts         Central registry mapping names → theme objects
    ├── theme-catppuccin.ts Catppuccin theme definition
    ├── theme-dracula.ts    Dracula theme definition
    ├── theme-rose-pine.ts  Rosé Pine theme definition
    └── theme-tokyonight.ts Tokyo Night theme definition
```

### Related UI Components

| Component | Location | Role |
|---|---|---|
| `ThemeSelector.vue` | `theme/components/` | Shows the current theme name in the sidebar |
| `ColorPicker.vue` | `theme/components/` | Sidebar palette — generates dynamic color themes and selects preset themes |

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
  currentTheme: string        // Active theme name (registry key)
  theme: Theme | null         // Resolved theme object
}
```

---

## Theme Handler (`state.ts`)

The `ThemeHandler` class is a **singleton** that manages all theme state. It is initialized once via `useThemeHandler()` in the theme's `enhanceApp()` hook.

### Lifecycle

```
Constructor → boot()
  ├── Read saved theme from localStorage
  ├── Resolve theme from registry
  └── Apply theme to DOM
```

> The display mode is owned by VitePress (`appearance: true`). The handler reads the current mode from the `dark` class on `<html>` whenever it needs to pick a palette.

### Persistence Keys

| Key | Stores |
|---|---|
| `vitepress-theme-name` | Active theme name (e.g. `catppuccin`, `color-swarm`) |

(The display mode is persisted by VitePress under its own key.)

### How `applyTheme()` Works

1. Reads the effective mode from the `dark` class on `<html>` (managed by VitePress).
2. Sets base background CSS variables for that mode.
3. If a theme is active, calls `writeCSS()` with the matching mode palette.

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
  mode,              // Ref<DisplayMode> — follows VitePress's dark class via MutationObserver
  themeName,         // Ref<string>
  theme,             // Ref<Theme | null>
  setTheme,          // (name: string) => void
  getAvailableThemes,// () => { name, displayName }[]
  state              // Ref<ThemeState>
} = useTheme()
```

### Mode Sync

The display mode is owned entirely by VitePress (`appearance: true` in the config, `vitepress-theme-appearance` storage key). The `ThemeHandler` does not manage, persist, or toggle the mode itself — it observes VitePress's `dark` class on `<html>` via a `MutationObserver` (set up in `boot()` on the client only) and re-applies the active theme palette whenever VitePress flips the class. This works on every page, including the home page where no sidebar components are mounted.

---

## Theme Registry (`configs/registry.ts`)

The registry is a plain object mapping theme names to `Theme` objects:

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

The `ColorPicker` component also dynamically registers themes at runtime:
- **Color-based themes** (e.g. `color-swarm`, `color-meadow`) are generated from the palette and registered as `themeRegistry['color-<name>']`.

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

## ColorPicker Integration

The `ColorPicker.vue` component in the sidebar works alongside the theme system:

1. **Color swatches** — Generates a `Theme` object from predefined color palettes (swarm, meadow, etc.) and registers it as `color-<name>` in the registry.
2. **Preset themes** — Renders circles for each theme already in the registry (catppuccin, dracula, etc.).

### Brand Color Interaction

When a theme defines `brand` colors, they are set as inline CSS variables and **override** anything the ColorPicker sets. When a theme omits `brand`, the handler removes inline brand variables, and the ColorPicker's stylesheet takes priority.

After a theme switch, the handler dispatches a `theme-changed-apply-colors` custom event. The ColorPicker listens for this to reapply its color selection when the new theme doesn't define brand colors.

---

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Theme not appearing in sidebar | Not registered in `registry.ts` | Import and add to `themeRegistry` |
| Brand colors don't change | Theme defines `brand` in `ModeColors` | Remove `brand` from the theme to defer to ColorPicker |
| Colors don't update after theme switch | `theme-changed-apply-colors` event not firing | Ensure `notifyColorPicker()` is called in `setTheme()` |
| Theme preview missing | No `preview` property and no brand colors | Add a `preview` URL or define `brand` colors for gradient fallback |
| Fonts not applying | `fonts.body` / `fonts.heading` not defined | Add the `fonts` property to your theme definition |
