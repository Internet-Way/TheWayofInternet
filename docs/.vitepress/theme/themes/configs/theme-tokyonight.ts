import type { Theme } from '../theme-types'

export const tokyoNightTheme: Theme = {
  name: 'tokyonight',
  displayName: 'Tokyo Night',
  preview: 'https://avatars.githubusercontent.com/u/103661550?s=200&v=4', // Dummy or relevant icon if possible
  modes: {
    light: {
      brand: {
        1: '#7aa2f7',
        2: '#bb9af7',
        3: '#7dcfff',
        soft: '#9ece6a'
      },
      bg: '#e1e2e7',
      bgAlt: '#d5d7e0',
      bgElv: '#f4f4f7',
      text: {
        1: '#1a1b26',
        2: '#343b58',
        3: '#565f89'
      },
      button: {
        brand: {
          bg: '#7aa2f7',
          border: '#7aa2f7',
          text: '#1a1b26',
          hoverBorder: '#bb9af7',
          hoverText: '#1a1b26',
          hoverBg: '#bb9af7',
          activeBorder: '#bb9af7',
          activeText: '#1a1b26',
          activeBg: '#7dcfff'
        },
        alt: {
          bg: '#343b58',
          text: '#c0caf5',
          hoverBg: '#565f89',
          hoverText: '#c0caf5'
        }
      },
      customBlock: {
        info: {
          bg: '#e0af6833',
          border: '#e0af68',
          text: '#343b58',
          textDeep: '#1a1b26'
        },
        tip: {
          bg: '#9ece6a33',
          border: '#9ece6a',
          text: '#343b58',
          textDeep: '#1a1b26'
        },
        warning: {
          bg: '#ff9e6433',
          border: '#ff9e64',
          text: '#343b58',
          textDeep: '#1a1b26'
        },
        danger: {
          bg: '#f7768e33',
          border: '#f7768e',
          text: '#343b58',
          textDeep: '#1a1b26'
        }
      },
      selection: {
        bg: '#33467c4d'
      },
      home: {
        heroNameColor: 'transparent',
        heroNameBackground: 'linear-gradient(120deg, #7aa2f7 30%, #bb9af7)',
        heroImageBackground: 'linear-gradient(-45deg, #7aa2f7 50%, #bb9af7 50%)',
        heroImageFilter: 'blur(44px)'
      }
    },
    dark: {
      brand: {
        1: '#7aa2f7',
        2: '#bb9af7',
        3: '#7dcfff',
        soft: '#9ece6a'
      },
      bg: '#1a1b26',
      bgAlt: '#16161e',
      bgElv: '#24283b',
      bgMark: '#bb9af7',
      text: {
        1: '#c0caf5',
        2: '#565f89',
        3: '#343b58'
      },
      button: {
        brand: {
          bg: '#7aa2f7',
          border: '#7aa2f7',
          text: '#1a1b26',
          hoverBorder: '#bb9af7',
          hoverText: '#1a1b26',
          hoverBg: '#bb9af7',
          activeBorder: '#bb9af7',
          activeText: '#1a1b26',
          activeBg: '#7dcfff'
        },
        alt: {
          bg: '#343b58',
          text: '#c0caf5',
          hoverBg: '#565f89',
          hoverText: '#c0caf5'
        }
      },
      customBlock: {
        info: {
          bg: '#e0af681a',
          border: '#e0af68',
          text: '#c0caf5',
          textDeep: '#c0caf5'
        },
        tip: {
          bg: '#9ece6a1a',
          border: '#9ece6a',
          text: '#9ece6a',
          textDeep: '#9ece6a'
        },
        warning: {
          bg: '#ff9e641a',
          border: '#ff9e64',
          text: '#ff9e64',
          textDeep: '#ff9e64'
        },
        danger: {
          bg: '#f7768e1a',
          border: '#f7768e',
          text: '#f7768e',
          textDeep: '#f7768e'
        }
      },
      selection: {
        bg: '#33467c'
      },
      home: {
        heroNameColor: 'transparent',
        heroNameBackground: 'linear-gradient(120deg, #7aa2f7 30%, #bb9af7)',
        heroImageBackground: 'linear-gradient(-45deg, #7aa2f7 50%, #bb9af7 50%)',
        heroImageFilter: 'blur(44px)'
      }
    }
  }
}
