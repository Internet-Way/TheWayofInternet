export type DisplayMode = 'light' | 'dark'

// Alert/callout block color scheme
interface BlockColorScheme {
  bg: string
  border: string
  text: string
  textDeep: string
}

// Brand button styling
interface BrandButtonColors {
  bg: string
  border: string
  text: string
  hoverBorder: string
  hoverText: string
  hoverBg: string
  activeBorder: string
  activeText: string
  activeBg: string
}

// Alternate button styling
interface AltButtonColors {
  bg: string
  text: string
  hoverBg: string
  hoverText: string
}

// Color palette for a single display mode
export interface ModeColors {
  brand?: {
    1?: string
    2?: string
    3?: string
    soft?: string
  }

  bg: string
  bgAlt: string
  bgElv: string
  bgMark?: string

  text?: {
    1?: string
    2?: string
    3?: string
  }

  button: {
    brand: BrandButtonColors
    alt: AltButtonColors
  }

  customBlock: {
    info: BlockColorScheme
    tip: BlockColorScheme
    warning: BlockColorScheme
    danger: BlockColorScheme
  }

  selection: { bg: string }

  home?: {
    heroNameColor: string
    heroNameBackground: string
    heroImageBackground: string
    heroImageFilter: string
  }
}

// Full theme definition
export interface Theme {
  name: string
  displayName: string
  preview?: string
  logo?: string
  modes: {
    light: ModeColors
    dark: ModeColors
  }
  fonts?: {
    body?: string
    heading?: string
  }
  borderRadius?: string
  spacing?: {
    small?: string
    medium?: string
    large?: string
  }
  customProperties?: Record<string, string>
}

// Registry mapping theme names to definitions
export interface ThemeRegistry {
  [key: string]: Theme
}

// Runtime state for the active theme
export interface ThemeState {
  accent: string | null
  preset: string | null
  theme: Theme | null
  font: string
  accentBg: boolean
  accentBgIntensity: number
}
