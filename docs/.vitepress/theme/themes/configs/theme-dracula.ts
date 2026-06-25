import type { Theme } from '../theme-types'

export const draculaTheme: Theme = {
  name: 'dracula',
  displayName: 'Dracula',
  preview: 'https://draculatheme.com/images/hero/default.svg',
  modes: {
    light: {
      brand: {
        1: '#bd93f9',
        2: '#ff79c6',
        3: '#8be9fd',
        soft: '#f1fa8c'
      },
      bg: '#f8fafc',
      bgAlt: '#f1f5f9',
      bgElv: '#e2e8f0',
      text: {
        1: '#282a36',
        2: '#44475a',
        3: '#6272a4'
      },
      button: {
        brand: {
          bg: '#bd93f9',
          border: '#bd93f9',
          text: '#282a36',
          hoverBorder: '#ff79c6',
          hoverText: '#282a36',
          hoverBg: '#ff79c6',
          activeBorder: '#ff79c6',
          activeText: '#282a36',
          activeBg: '#f1fa8c'
        },
        alt: {
          bg: '#44475a',
          text: '#f8f8f2',
          hoverBg: '#6272a4',
          hoverText: '#f8f8f2'
        }
      },
      customBlock: {
        info: {
          bg: '#f1fa8c33',
          border: '#f1fa8c',
          text: '#44475a',
          textDeep: '#282a36'
        },
        tip: {
          bg: '#50fa7b33',
          border: '#50fa7b',
          text: '#44475a',
          textDeep: '#282a36'
        },
        warning: {
          bg: '#ffb86c33',
          border: '#ffb86c',
          text: '#44475a',
          textDeep: '#282a36'
        },
        danger: {
          bg: '#ff555533',
          border: '#ff5555',
          text: '#44475a',
          textDeep: '#282a36'
        }
      },
      selection: {
        bg: '#44475a4d'
      },
      home: {
        heroNameColor: 'transparent',
        heroNameBackground: 'linear-gradient(120deg, #bd93f9 30%, #ff79c6)',
        heroImageBackground: 'linear-gradient(-45deg, #bd93f9 50%, #ff79c6 50%)',
        heroImageFilter: 'blur(44px)'
      }
    },
    dark: {
      brand: {
        1: '#bd93f9',
        2: '#ff79c6',
        3: '#8be9fd',
        soft: '#f1fa8c'
      },
      bg: '#282a36',
      bgAlt: '#1e1f29',
      bgElv: '#44475a',
      bgMark: '#ff79c6',
      text: {
        1: '#f8f8f2',
        2: '#6272a4',
        3: '#44475a'
      },
      button: {
        brand: {
          bg: '#bd93f9',
          border: '#bd93f9',
          text: '#282a36',
          hoverBorder: '#ff79c6',
          hoverText: '#282a36',
          hoverBg: '#ff79c6',
          activeBorder: '#ff79c6',
          activeText: '#282a36',
          activeBg: '#f1fa8c'
        },
        alt: {
          bg: '#44475a',
          text: '#f8f8f2',
          hoverBg: '#6272a4',
          hoverText: '#f8f8f2'
        }
      },
      customBlock: {
        info: {
          bg: '#f1fa8c1a',
          border: '#f1fa8c',
          text: '#f8f8f2',
          textDeep: '#f8f8f2'
        },
        tip: {
          bg: '#50fa7b1a',
          border: '#50fa7b',
          text: '#50fa7b',
          textDeep: '#50fa7b'
        },
        warning: {
          bg: '#ffb86c1a',
          border: '#ffb86c',
          text: '#ffb86c',
          textDeep: '#ffb86c'
        },
        danger: {
          bg: '#ff55551a',
          border: '#ff5555',
          text: '#ff5555',
          textDeep: '#ff5555'
        }
      },
      selection: {
        bg: '#44475a'
      },
      home: {
        heroNameColor: 'transparent',
        heroNameBackground: 'linear-gradient(120deg, #bd93f9 30%, #ff79c6)',
        heroImageBackground: 'linear-gradient(-45deg, #bd93f9 50%, #ff79c6 50%)',
        heroImageFilter: 'blur(44px)'
      }
    }
  }
}
