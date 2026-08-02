import { ref, computed } from 'vue'
import type { DisplayMode, ThemeState, Theme, ModeColors } from './theme-types'
import { themeRegistry } from './configs/registry'

// Persistence keys
const PERSIST = {
  theme: 'vitepress-theme-name'
} as const

// Helpers
const isBrowser = () => typeof window !== 'undefined'
const hasDocument = () => typeof document !== 'undefined'
const readStorage = (key: string) => localStorage.getItem(key)
const writeStorage = (key: string, val: string) => localStorage.setItem(key, val)

function resolveBackgroundColor(mode: DisplayMode): string {
  return mode === 'dark' ? '#1A1A1A' : '#f8fafc'
}

function resolveAltBackgroundColor(mode: DisplayMode): string {
  return mode === 'dark' ? '#171717' : '#eef2f5'
}

function resolveElevatedColor(mode: DisplayMode): string {
  return mode === 'dark' ? '#1a1a1acc' : 'rgba(255, 255, 255, 0.8)'
}

export class ThemeHandler {
  private _state = ref<ThemeState>({
    currentTheme: 'tokyonight',
    theme: null
  })
  private _mode = ref<DisplayMode>('light')
  private _modeObserver: MutationObserver | null = null

  constructor() {
    this.boot()
  }

  private boot() {
    if (!isBrowser()) return

    const storedTheme = readStorage(PERSIST.theme)

    if (storedTheme && themeRegistry[storedTheme]) {
      this._state.value.currentTheme = storedTheme
      this._state.value.theme = themeRegistry[storedTheme]
    } else if (!storedTheme) {
      // First visit: default to Tokyo Night
      this._state.value.currentTheme = 'tokyonight'
      this._state.value.theme = themeRegistry['tokyonight']
    }
    // If storedTheme is a dynamic color-* theme, it will be applied by ColorPicker on mount

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
      attributeFilter: ['class']
    })
  }

  private currentMode(): DisplayMode {
    return hasDocument() && document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  }

  public applyTheme() {
    if (!hasDocument()) return

    const { theme } = this._state.value
    const mode = this.currentMode()
    const el = document.documentElement

    el.style.setProperty('--vp-c-bg', resolveBackgroundColor(mode))
    el.style.setProperty('--vp-c-bg-alt', resolveAltBackgroundColor(mode))
    el.style.setProperty('--vp-c-bg-elv', resolveElevatedColor(mode))

    if (!theme) return

    const palette = theme.modes[mode]

    this.writeCSS(palette, theme)
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
      ['--vp-button-alt-hover-text', colors.button.alt.hoverText]
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
        '--vp-home-hero-name-color', '--vp-home-hero-name-background',
        '--vp-home-hero-image-background-image', '--vp-home-hero-image-filter'
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

  public setTheme(name: string) {
    if (!themeRegistry[name]) {
      console.warn(`Theme "${name}" not found. Falling back to catppuccin.`)
      name = 'catppuccin'
    }

    this._state.value.currentTheme = name
    this._state.value.theme = themeRegistry[name]
    writeStorage(PERSIST.theme, name)

    this.applyTheme()
    this.notifyColorPicker()
  }

  private notifyColorPicker() {
    const theme = this._state.value.theme
    if (!theme) return
    const palette = theme.modes[this.currentMode()]
    if (!palette.brand || !palette.brand[1]) {
      if (isBrowser()) window.dispatchEvent(new CustomEvent('theme-changed-apply-colors'))
    }
  }

  public getState() { return this._state }
  public getModeRef() { return this._mode }
  public getTheme() { return this._state.value.currentTheme }
  public getCurrentTheme() { return this._state.value.theme }

  public getAvailableThemes() {
    return Object.keys(themeRegistry).map(k => ({
      name: k,
      displayName: themeRegistry[k].displayName
    }))
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
    themeName: computed(() => st.value.currentTheme),
    theme: computed(() => st.value.theme),
    setTheme: (n: string) => handler.setTheme(n),
    getAvailableThemes: () => handler.getAvailableThemes(),
    state: st
  }
}