import { ref, onMounted, computed } from 'vue'
import type { DisplayMode, ThemeState, Theme, ModeColors } from './theme-types'
import { themeRegistry } from './configs/registry'

// Persistence keys
const PERSIST = {
  theme: 'vitepress-theme-name',
  mode: 'vitepress-display-mode',
  amoled: 'vitepress-amoled-enabled'
} as const

// Helpers
const isBrowser = () => typeof window !== 'undefined'
const hasDocument = () => typeof document !== 'undefined'
const readStorage = (key: string) => localStorage.getItem(key)
const writeStorage = (key: string, val: string) => localStorage.setItem(key, val)

function resolveBackgroundColor(mode: DisplayMode, amoled: boolean): string {
  if (mode === 'dark' && amoled) return '#000000'
  return mode === 'dark' ? '#1A1A1A' : '#f8fafc'
}

function resolveAltBackgroundColor(mode: DisplayMode, amoled: boolean): string {
  if (mode === 'dark' && amoled) return '#000000'
  return mode === 'dark' ? '#171717' : '#eef2f5'
}

function resolveElevatedColor(mode: DisplayMode, amoled: boolean): string {
  if (mode === 'dark' && amoled) return 'rgba(0, 0, 0, 0.9)'
  return mode === 'dark' ? '#1a1a1acc' : 'rgba(255, 255, 255, 0.8)'
}

export class ThemeHandler {
  private _state = ref<ThemeState>({
    currentTheme: 'tokyonight',
    currentMode: 'dark' as DisplayMode,
    theme: null
  })
  private _amoled = ref(false)

  constructor() {
    this.boot()
  }

  private boot() {
    if (!isBrowser()) return

    const storedTheme = readStorage(PERSIST.theme)
    const storedMode = readStorage(PERSIST.mode) as DisplayMode | null
    const storedAmoled = readStorage(PERSIST.amoled) === 'true'

    if (storedTheme && themeRegistry[storedTheme]) {
      this._state.value.currentTheme = storedTheme
      this._state.value.theme = themeRegistry[storedTheme]
    } else if (!storedTheme) {
      // First visit: default to Tokyo Night
      this._state.value.currentTheme = 'tokyonight'
      this._state.value.theme = themeRegistry['tokyonight']
    }
    // If storedTheme is a dynamic color-* theme, it will be applied by ColorPicker on mount

    this._amoled.value = storedAmoled

    if (storedMode) {
      this._state.value.currentMode = storedMode
    } else {
      // Default to dark mode for new users
      this._state.value.currentMode = 'dark'
    }

    this.applyTheme()

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (ev) => {
      if (!readStorage(PERSIST.mode)) {
        this._state.value.currentMode = ev.matches ? 'dark' : 'light'
      }
      this.applyTheme()
    })
  }

  public applyTheme() {
    if (!hasDocument()) return

    const { currentMode, theme } = this._state.value
    const el = document.documentElement

    el.style.setProperty('--vp-c-bg', resolveBackgroundColor(currentMode, this._amoled.value))
    el.style.setProperty('--vp-c-bg-alt', resolveAltBackgroundColor(currentMode, this._amoled.value))
    el.style.setProperty('--vp-c-bg-elv', resolveElevatedColor(currentMode, this._amoled.value))

    this.syncDOMClasses(currentMode)

    if (!theme) return

    const effectiveMode = currentMode
    const palette = theme.modes[effectiveMode]

    this.syncDOMClasses(currentMode)
    this.writeCSS(palette, theme)
  }

  private syncDOMClasses(mode: DisplayMode) {
    const el = document.documentElement
    el.classList.remove('dark', 'light', 'amoled')
    el.classList.add(mode)
    if (mode === 'dark' && this._amoled.value) {
      el.classList.add('amoled')
    }
  }

  private writeCSS(colors: ModeColors, theme: Theme) {
    if (!hasDocument()) return

    const el = document.documentElement

    // Wipe all inline vitepress variables for a clean slate
    for (const prop of Array.from(el.style)) {
      if (prop.startsWith('--vp-')) el.style.removeProperty(prop)
    }

    // Background overrides for AMOLED
    let bg = colors.bg
    let bgAlt = colors.bgAlt
    let bgElv = colors.bgElv
    if (this._state.value.currentMode === 'dark' && this._amoled.value) {
      bg = '#000000'
      bgAlt = '#000000'
      bgElv = 'rgba(0, 0, 0, 0.9)'
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
    el.style.setProperty('--vp-c-bg', bg)
    el.style.setProperty('--vp-c-bg-alt', bgAlt)
    el.style.setProperty('--vp-c-bg-elv', bgElv)
    el.style.setProperty('--vp-c-bg-soft', bgAlt)
    el.style.setProperty('--vp-c-default-soft', bgElv)
    el.style.setProperty('--vp-c-default-1', bgAlt)
    el.style.setProperty('--vp-c-default-2', bgElv)
    el.style.setProperty('--vp-c-default-3', bg)

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

  public setMode(mode: DisplayMode) {
    this._state.value.currentMode = mode
    writeStorage(PERSIST.mode, mode)
    this.applyTheme()
  }

  public toggleMode() {
    const next: DisplayMode = this._state.value.currentMode === 'light' ? 'dark' : 'light'
    this.setMode(next)
  }

  public setAmoledEnabled(enabled: boolean) {
    this._amoled.value = enabled
    writeStorage(PERSIST.amoled, String(enabled))
    this.applyTheme()
  }

  public getAmoledEnabled() { return this._amoled.value }
  public toggleAmoled() { this.setAmoledEnabled(!this._amoled.value) }
  public getAmoledEnabledRef() { return this._amoled }

  private notifyColorPicker() {
    const theme = this._state.value.theme
    if (!theme) return
    const palette = theme.modes[this._state.value.currentMode]
    if (!palette.brand || !palette.brand[1]) {
      if (isBrowser()) window.dispatchEvent(new CustomEvent('theme-changed-apply-colors'))
    }
  }

  public getState() { return this._state }
  public getMode() { return this._state.value.currentMode }
  public getTheme() { return this._state.value.currentTheme }
  public getCurrentTheme() { return this._state.value.theme }

  public getAvailableThemes() {
    return Object.keys(themeRegistry).map(k => ({
      name: k,
      displayName: themeRegistry[k].displayName
    }))
  }

  public isDarkMode() { return this._state.value.currentMode === 'dark' }
  public isAmoledMode() { return this._state.value.currentMode === 'dark' && this._amoled.value }
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

  onMounted(() => handler.applyTheme())

  return {
    mode: computed(() => st.value.currentMode),
    themeName: computed(() => st.value.currentTheme),
    theme: computed(() => st.value.theme),
    setMode: (m: DisplayMode) => handler.setMode(m),
    setTheme: (n: string) => handler.setTheme(n),
    toggleMode: () => handler.toggleMode(),
    getAvailableThemes: () => handler.getAvailableThemes(),
    isDarkMode: () => handler.isDarkMode(),
    isAmoledMode: () => handler.isAmoledMode(),
    amoledEnabled: handler.getAmoledEnabledRef(),
    setAmoledEnabled: (e: boolean) => handler.setAmoledEnabled(e),
    toggleAmoled: () => handler.toggleAmoled(),
    state: st
  }
}