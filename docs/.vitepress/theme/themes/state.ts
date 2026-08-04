import { ref, computed } from 'vue'
import type { DisplayMode, ThemeState, Theme, ModeColors } from './theme-types'
import { themeRegistry } from './configs/registry'
import accentsData from './accents.json'
import { colors } from './theme-palette'

// Persistence keys
const PERSIST = {
  accent: 'vitepress-theme-accent',
  preset: 'vitepress-theme-preset',
  legacy: 'vitepress-theme-name',
  appearance: 'vitepress-theme-appearance',
  font: 'vitepress-theme-font'
} as const

export interface FontOption {
  name: string
  label: string
  stack: string
}

export const fontOptions: FontOption[] = [
  { name: 'default', label: 'Default', stack: '' },
  { name: 'outfit', label: 'Outfit', stack: "'Outfit', system-ui, sans-serif" },
  {
    name: 'jetbrainsmono',
    label: 'JetBrains Mono',
    stack: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
  },
  {
    name: 'montserrat',
    label: 'Montserrat',
    stack: "'Montserrat', system-ui, sans-serif",
  },
  {
    name: 'comicsans',
    label: 'Comic Sans',
    stack: "'Comic Sans MS', 'Comic Sans', 'Comic Neue', cursive, sans-serif",
  },
]

export const fontOptionNames = fontOptions.map((f) => f.name)

export interface AccentOption {
  slug: string
  name: string
  hex: string
}

export const accentOptions: AccentOption[] = accentsData.map((a) => ({
  slug: a.name.toLowerCase(),
  name: a.name,
  hex: a.hex,
}))

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, '-')

const PRESET_ORDER = ['catppuccin', 'rose-pine', 'tokyonight']

export const presetOptions = Object.entries(themeRegistry)
  .filter(([name]) => !name.startsWith('color-'))
  .sort(([a], [b]) => {
    const ia = PRESET_ORDER.indexOf(a)
    const ib = PRESET_ORDER.indexOf(b)
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })
  .map(([name, theme]) => ({ name, displayName: theme.displayName }))

// Helpers
const isBrowser = () => typeof window !== 'undefined'
const hasDocument = () => typeof document !== 'undefined'
const readStorage = (key: string) => localStorage.getItem(key)
const writeStorage = (key: string, val: string) => localStorage.setItem(key, val)
const removeStorage = (key: string) => localStorage.removeItem(key)

function resolveBackgroundColor(mode: DisplayMode): string {
  return mode === 'dark' ? '#1A1A1A' : '#f8fafc'
}

function resolveAltBackgroundColor(mode: DisplayMode): string {
  return mode === 'dark' ? '#171717' : '#eef2f5'
}

function resolveElevatedColor(mode: DisplayMode): string {
  return mode === 'dark' ? '#1a1a1acc' : 'rgba(255, 255, 255, 0.8)'
}

// --- Accent theme generation ------------------------------------------------

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ]
}

function mixHex(hex: string, target: string, ratio: number): string {
  const from = hexToRgb(hex)
  const to = hexToRgb(target)
  const mixed = from.map((c, i) => Math.round(c + (to[i] - c) * ratio))
  return '#' + mixed.map((c) => c.toString(16).padStart(2, '0')).join('')
}

const DERIVE_STEPS: Record<number, [string, number]> = {
  100: ['#ffffff', 0.85],
  200: ['#ffffff', 0.7],
  300: ['#ffffff', 0.5],
  400: ['#ffffff', 0.3],
  500: ['#ffffff', 0],
  600: ['#000000', 0.15],
  700: ['#000000', 0.3],
  800: ['#000000', 0.45],
  900: ['#000000', 0.6],
  950: ['#000000', 0.75],
}

function rampFor(accent: AccentOption): Record<number, string> {
  const known = colors[accent.slug as keyof typeof colors]
  if (known) return known as Record<number, string>
  const out: Record<number, string> = {}
  for (const [step, [target, ratio]] of Object.entries(DERIVE_STEPS)) {
    out[Number(step)] = ratio === 0 ? accent.hex : mixHex(accent.hex, target, ratio)
  }
  return out
}

const generateAccentTheme = (accent: AccentOption): Theme => {
  const colorSet = rampFor(accent)

  return {
    name: `color-${accent.slug}`,
    displayName: accent.name,
    modes: {
      light: {
        brand: {
          1: colorSet[500],
          2: colorSet[600],
          3: colorSet[800],
          soft: colorSet[400],
        },
        bg: '#f8fafc',
        bgAlt: '#eef2f5',
        bgElv: 'rgba(255, 255, 255, 0.8)',
        bgMark: 'rgb(226, 232, 240)',
        text: {
          1: '#0f172a',
          2: '#334155',
          3: '#64748b',
        },
        button: {
          brand: {
            bg: colorSet[500],
            border: colorSet[400],
            text: 'rgba(255, 255, 255)',
            hoverBorder: colorSet[400],
            hoverText: 'rgba(255, 255, 255)',
            hoverBg: colorSet[400],
            activeBorder: colorSet[400],
            activeText: 'rgba(255, 255, 255)',
            activeBg: colorSet[500],
          },
          alt: {
            bg: '#484848',
            text: '#f0eeee',
            hoverBg: '#484848',
            hoverText: '#f0eeee',
          },
        },
        customBlock: {
          info: {
            bg: `${colorSet[100]}`,
            border: `${colorSet[800]}`,
            text: `${colorSet[800]}`,
            textDeep: `${colorSet[900]}`,
          },
          tip: {
            bg: '#D8F8E4',
            border: '#447A61',
            text: '#2D6A58',
            textDeep: '#166534',
          },
          warning: {
            bg: '#FCEFC3',
            border: '#9A8034',
            text: '#9C701B',
            textDeep: '#92400e',
          },
          danger: {
            bg: '#FBE1E2',
            border: '#B3565E',
            text: '#912239',
            textDeep: '#991b1b',
          },
        },
        selection: {
          bg: colorSet[200],
        },
        home: {
          heroNameColor: 'transparent',
          heroNameBackground: `-webkit-linear-gradient(120deg, ${colorSet[300]} 30%, ${colorSet[500]})`,
          heroImageBackground: `linear-gradient(-45deg, ${colorSet[300]} 50%, ${colorSet[500]} 50%)`,
          heroImageFilter: 'blur(44px)',
        },
      },
      dark: {
        brand: {
          1: colorSet[400],
          2: colorSet[500],
          3: colorSet[600],
          soft: colorSet[300],
        },
        bg: '#1A1A1A',
        bgAlt: '#171717',
        bgElv: '#1a1a1acc',
        button: {
          brand: {
            bg: colorSet[400],
            border: colorSet[300],
            text: 'rgba(15, 23, 42)',
            hoverBorder: colorSet[300],
            hoverText: 'rgba(15, 23, 42)',
            hoverBg: colorSet[300],
            activeBorder: colorSet[300],
            activeText: 'rgba(15, 23, 42)',
            activeBg: colorSet[400],
          },
          alt: {
            bg: '#484848',
            text: '#f0eeee',
            hoverBg: '#484848',
            hoverText: '#f0eeee',
          },
        },
        customBlock: {
          info: {
            bg: `${colorSet[950]}`,
            border: `${colorSet[700]}`,
            text: `${colorSet[200]}`,
            textDeep: `${colorSet[200]}`,
          },
          tip: {
            bg: '#0C2A20',
            border: '#184633',
            text: '#B0EBC9',
            textDeep: '#166534',
          },
          warning: {
            bg: '#403207',
            border: '#7E6211',
            text: '#F9DE88',
            textDeep: '#92400e',
          },
          danger: {
            bg: '#3F060A',
            border: '#7C0F18',
            text: '#F7C1BC',
            textDeep: '#991b1b',
          },
        },
        selection: {
          bg: colorSet[800],
        },
        home: {
          heroNameColor: 'transparent',
          heroNameBackground: `-webkit-linear-gradient(120deg, ${colorSet[300]} 30%, ${colorSet[500]})`,
          heroImageBackground: `linear-gradient(-45deg, ${colorSet[400]} 50%, ${colorSet[600]} 50%)`,
          heroImageFilter: 'blur(44px)',
        },
      },
    },
  }
}

// --- Theme handler -----------------------------------------------------------

export class ThemeHandler {
  private _state = ref<ThemeState>({
    accent: null,
    preset: null,
    theme: null,
    font: 'default',
  })
  private _mode = ref<DisplayMode>('light')
  private _modeObserver: MutationObserver | null = null
  private _accentThemeCache = new Map<string, Theme>()

  constructor() {
    this.boot()
  }

  private boot() {
    if (!isBrowser()) return

    const state = this._state.value
    const legacy = readStorage(PERSIST.legacy)
    const storedAccent = readStorage(PERSIST.accent)
    const storedPreset = readStorage(PERSIST.preset)
    const storedFont = readStorage(PERSIST.font)

    if (legacy) {
      if (legacy.startsWith('color-')) {
        state.accent = legacy.slice('color-'.length)
      } else if (themeRegistry[legacy]) {
        state.preset = legacy
      }
      localStorage.removeItem(PERSIST.legacy)
    }

    if (!state.accent) state.accent = storedAccent ?? 'swarm'
    if (!state.preset) state.preset = storedPreset

    // Validate against known options
    if (!accentOptions.some((a) => a.slug === state.accent)) state.accent = 'swarm'
    if (state.preset && !themeRegistry[state.preset]) state.preset = null

    if (fontOptionNames.includes(storedFont ?? '')) state.font = storedFont!
    else state.font = 'default'

    this.observeModeChanges()
    this.applyTheme()
  }

  // React to VitePress's own appearance toggle (the `dark` class on <html>)
  private observeModeChanges() {
    this._mode.value = this.currentMode()
    this._modeObserver = new MutationObserver(() => {
      this._mode.value = this.currentMode()
      this.applyTheme()
    })
    this._modeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }

  private currentMode(): DisplayMode {
    return hasDocument() && document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  }

  public toggleMode() {
    if (!hasDocument()) return
    const dark = !this.currentModeIsDark()
    document.documentElement.classList.toggle('dark', dark)
    writeStorage(PERSIST.appearance, dark ? 'dark' : 'light')
    // MutationObserver picks up the class change and re-applies the theme
  }

  private currentModeIsDark(): boolean {
    return hasDocument() && document.documentElement.classList.contains('dark')
  }

  private resolveTheme(): Theme | null {
    const { preset, accent } = this._state.value
    if (preset && themeRegistry[preset]) return themeRegistry[preset]
    if (accent) {
      const cached = this._accentThemeCache.get(accent)
      if (cached) return cached
      const option = accentOptions.find((a) => a.slug === accent)
      if (option) {
        const theme = generateAccentTheme(option)
        this._accentThemeCache.set(accent, theme)
        return theme
      }
    }
    return null
  }

  public applyTheme() {
    if (!hasDocument()) return

    const { preset } = this._state.value
    const mode = this.currentMode()
    const el = document.documentElement

    el.style.setProperty('--vp-c-bg', resolveBackgroundColor(mode))
    el.style.setProperty('--vp-c-bg-alt', resolveAltBackgroundColor(mode))
    el.style.setProperty('--vp-c-bg-elv', resolveElevatedColor(mode))
    el.classList.toggle('vp-theme-locked', Boolean(preset))

    const theme = this.resolveTheme()
    this._state.value.theme = theme
    if (!theme) return

    this.writeCSS(theme.modes[mode], theme)
    this.applyFont()
  }

  private applyFont() {
    if (!hasDocument()) return

    const el = document.documentElement
    const font = fontOptions.find((f) => f.name === this._state.value.font)
    if (!font || !font.stack) {
      el.style.removeProperty('--vp-font-family-base')
      el.style.removeProperty('--vp-font-family-heading')
      return
    }
    el.style.setProperty('--vp-font-family-base', font.stack)
    el.style.setProperty('--vp-font-family-heading', font.stack)
  }

  public setFont(name: string) {
    if (!fontOptionNames.includes(name)) {
      console.warn(`Font "${name}" not found. Ignoring.`)
      return
    }
    this._state.value.font = name
    writeStorage(PERSIST.font, name)
    this.applyFont()
  }

  private writeCSS(colors: ModeColors, theme: Theme) {
    if (!hasDocument()) return

    const el = document.documentElement

    // Wipe all inline vitepress variables for a clean slate
    for (const prop of Array.from(el.style)) {
      if (prop.startsWith('--vp-')) el.style.removeProperty(prop)
    }

    // Brand color handling
    const hasBrand = colors.brand && (colors.brand[1] || colors.brand[2] || colors.brand[3] || colors.brand.soft)
    if (hasBrand) {
      if (colors.brand![1]) el.style.setProperty('--vp-c-brand-1', colors.brand![1])
      if (colors.brand![2]) el.style.setProperty('--vp-c-brand-2', colors.brand![2])
      if (colors.brand![3]) el.style.setProperty('--vp-c-brand-3', colors.brand![3])
      if (colors.brand!.soft) el.style.setProperty('--vp-c-brand-soft', colors.brand!.soft)
    } else {
      for (const key of ['--vp-c-brand-1', '--vp-c-brand-2', '--vp-c-brand-3', '--vp-c-brand-soft']) {
        el.style.removeProperty(key)
      }
    }

    // Background variables
    el.style.setProperty('--vp-c-bg', colors.bg)
    el.style.setProperty('--vp-c-bg-alt', colors.bgAlt)
    el.style.setProperty('--vp-c-bg-elv', colors.bgElv)
    el.style.setProperty('--vp-c-bg-soft', colors.bgAlt)
    el.style.setProperty('--vp-c-default-soft', colors.bgElv)
    el.style.setProperty('--vp-c-default-1', colors.bgAlt)
    el.style.setProperty('--vp-c-default-2', colors.bgElv)
    el.style.setProperty('--vp-c-default-3', colors.bg)

    if (colors.bgMark) el.style.setProperty('--vp-c-bg-mark', colors.bgMark)

    // Text colors
    if (colors.text) {
      if (colors.text[1]) el.style.setProperty('--vp-c-text-1', colors.text[1])
      if (colors.text[2]) el.style.setProperty('--vp-c-text-2', colors.text[2])
      if (colors.text[3]) el.style.setProperty('--vp-c-text-3', colors.text[3])
    } else {
      for (const key of ['--vp-c-text-1', '--vp-c-text-2', '--vp-c-text-3']) {
        el.style.removeProperty(key)
      }
    }

    // Button colors
    const brandBtn = colors.button.brand
    const btnProps: [string, string][] = [
      ['--vp-button-brand-bg', brandBtn.bg],
      ['--vp-button-brand-border', brandBtn.border],
      ['--vp-button-brand-text', brandBtn.text],
      ['--vp-button-brand-hover-border', brandBtn.hoverBorder],
      ['--vp-button-brand-hover-text', brandBtn.hoverText],
      ['--vp-button-brand-hover-bg', brandBtn.hoverBg],
      ['--vp-button-brand-active-border', brandBtn.activeBorder],
      ['--vp-button-brand-active-text', brandBtn.activeText],
      ['--vp-button-brand-active-bg', brandBtn.activeBg],
      ['--vp-button-alt-bg', colors.button.alt.bg],
      ['--vp-button-alt-text', colors.button.alt.text],
      ['--vp-button-alt-hover-bg', colors.button.alt.hoverBg],
      ['--vp-button-alt-hover-text', colors.button.alt.hoverText],
    ]
    for (const [prop, val] of btnProps) {
      el.style.setProperty(prop, val)
    }

    // Custom block colors
    for (const blockType of ['info', 'tip', 'warning', 'danger'] as const) {
      const blockPalette = colors.customBlock[blockType]
      el.style.setProperty(`--vp-custom-block-${blockType}-bg`, blockPalette.bg)
      el.style.setProperty(`--vp-custom-block-${blockType}-border`, blockPalette.border)
      el.style.setProperty(`--vp-custom-block-${blockType}-text`, blockPalette.text)
      el.style.setProperty(`--vp-custom-block-${blockType}-text-deep`, blockPalette.textDeep)
    }

    // Selection color
    el.style.setProperty('--vp-c-selection-bg', colors.selection.bg)

    // Hero section
    if (colors.home) {
      el.style.setProperty('--vp-home-hero-name-color', colors.home.heroNameColor)
      el.style.setProperty('--vp-home-hero-name-background', colors.home.heroNameBackground)
      el.style.setProperty('--vp-home-hero-image-background-image', colors.home.heroImageBackground)
      el.style.setProperty('--vp-home-hero-image-filter', colors.home.heroImageFilter)
    } else {
      for (const key of [
        '--vp-home-hero-name-color',
        '--vp-home-hero-name-background',
        '--vp-home-hero-image-background-image',
        '--vp-home-hero-image-filter',
      ]) {
        el.style.removeProperty(key)
      }
    }

    // Typography
    if (theme.fonts?.body) el.style.setProperty('--vp-font-family-base', theme.fonts.body)
    else el.style.removeProperty('--vp-font-family-base')
    if (theme.fonts?.heading) el.style.setProperty('--vp-font-family-heading', theme.fonts.heading)
    else el.style.removeProperty('--vp-font-family-heading')

    // Border radius
    if (theme.borderRadius) el.style.setProperty('--vp-border-radius', theme.borderRadius)
    else el.style.removeProperty('--vp-border-radius')

    // Spacing
    const spacingKeys = ['small', 'medium', 'large'] as const
    for (const size of spacingKeys) {
      const cssVar = `--vp-spacing-${size}`
      if (theme.spacing?.[size]) el.style.setProperty(cssVar, theme.spacing[size]!)
      else el.style.removeProperty(cssVar)
    }

    // Arbitrary custom properties
    if (theme.customProperties) {
      for (const [k, v] of Object.entries(theme.customProperties)) {
        el.style.setProperty(k, v)
      }
    }

    // Logo override
    if (theme.logo) el.style.setProperty('--vp-theme-logo', `url(${theme.logo})`)
    else el.style.removeProperty('--vp-theme-logo')
  }

  public setAccent(slug: string) {
    const option = accentOptions.find((a) => a.slug === slug)
    if (!option) {
      console.warn(`Accent "${slug}" not found. Ignoring.`)
      return
    }
    this._state.value.accent = slug
    this._state.value.preset = null
    writeStorage(PERSIST.accent, slug)
    removeStorage(PERSIST.preset)
    this.applyTheme()
  }

  public setPreset(name: string | null) {
    if (name !== null && !themeRegistry[name]) {
      console.warn(`Preset theme "${name}" not found. Ignoring.`)
      return
    }
    this._state.value.preset = name
    if (name) {
      writeStorage(PERSIST.preset, name)
    } else {
      removeStorage(PERSIST.preset)
    }
    this.applyTheme()
  }

  public getState() {
    return this._state
  }
  public getModeRef() {
    return this._mode
  }
}

// Singleton
let instance: ThemeHandler | null = null

export function useThemeHandler(): ThemeHandler {
  if (!instance) instance = new ThemeHandler()
  return instance
}

// Vue composable
export function useTheme() {
  const handler = useThemeHandler()
  const st = handler.getState()

  return {
    mode: handler.getModeRef(),
    accent: computed(() => st.value.accent),
    preset: computed(() => st.value.preset),
    theme: computed(() => st.value.theme),
    font: computed(() => st.value.font),
    isPresetActive: computed(() => st.value.preset !== null),
    setAccent: (slug: string) => handler.setAccent(slug),
    setPreset: (name: string | null) => handler.setPreset(name),
    setFont: (name: string) => handler.setFont(name),
    toggleMode: () => handler.toggleMode(),
    accentOptions,
    presetOptions,
    fontOptions,
    state: st,
  }
}

export { slugify }
