import { catppuccinTheme } from './theme-catppuccin'
import { draculaTheme } from './theme-dracula'
import { tokyoNightTheme } from './theme-tokyonight'
import { rosePineTheme } from './theme-rose-pine'
import type { ThemeRegistry } from '../theme-types'

export const themeRegistry: ThemeRegistry = {
  tokyonight: tokyoNightTheme,
  catppuccin: catppuccinTheme,
  'rose-pine': rosePineTheme,
  dracula: draculaTheme,
}

export {
  catppuccinTheme,
  draculaTheme,
  tokyoNightTheme,
  rosePineTheme,
}
