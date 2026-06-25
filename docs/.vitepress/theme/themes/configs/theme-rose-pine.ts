import type { Theme } from '../theme-types'

export const rosePineTheme: Theme = {
  name: 'rose-pine',
  displayName: 'Rosé Pine',
  preview: 'https://raw.githubusercontent.com/rose-pine/rose-pine-theme/main/assets/icon.png',
  modes: {
    light: {
      brand: {
        1: '#907aa9',
        2: '#d7827e',
        3: '#ea9d34',
        soft: '#56949f'
      },
      bg: '#faf4ed',
      bgAlt: '#fffaf3',
      bgElv: '#f2e9e1',
      text: {
        1: '#575279',
        2: '#797593',
        3: '#9893a5'
      },
      button: {
        brand: {
          bg: '#907aa9',
          border: '#907aa9',
          text: '#faf4ed',
          hoverBorder: '#d7827e',
          hoverText: '#faf4ed',
          hoverBg: '#d7827e',
          activeBorder: '#d7827e',
          activeText: '#faf4ed',
          activeBg: '#ea9d34'
        },
        alt: {
          bg: '#f2e9e1',
          text: '#575279',
          hoverBg: '#dfdad9',
          hoverText: '#575279'
        }
      },
      customBlock: {
        info: {
          bg: '#56949f33',
          border: '#56949f',
          text: '#575279',
          textDeep: '#575279'
        },
        tip: {
          bg: '#28698333',
          border: '#286983',
          text: '#575279',
          textDeep: '#575279'
        },
        warning: {
          bg: '#ea9d3433',
          border: '#ea9d34',
          text: '#575279',
          textDeep: '#575279'
        },
        danger: {
          bg: '#b4637a33',
          border: '#b4637a',
          text: '#575279',
          textDeep: '#575279'
        }
      },
      selection: {
        bg: '#dfdad9'
      },
      home: {
        heroNameColor: 'transparent',
        heroNameBackground: 'linear-gradient(120deg, #907aa9 30%, #d7827e)',
        heroImageBackground: 'linear-gradient(-45deg, #907aa9 50%, #d7827e 50%)',
        heroImageFilter: 'blur(44px)'
      }
    },
    dark: {
      brand: {
        1: '#c4a7e7',
        2: '#ebbcba',
        3: '#f6c177',
        soft: '#9ccfd8'
      },
      bg: '#191724',
      bgAlt: '#1f1d2e',
      bgElv: '#26233a',
      bgMark: '#ebbcba',
      text: {
        1: '#e0def4',
        2: '#908caa',
        3: '#6e6a86'
      },
      button: {
        brand: {
          bg: '#c4a7e7',
          border: '#c4a7e7',
          text: '#191724',
          hoverBorder: '#ebbcba',
          hoverText: '#191724',
          hoverBg: '#ebbcba',
          activeBorder: '#ebbcba',
          activeText: '#191724',
          activeBg: '#f6c177'
        },
        alt: {
          bg: '#26233a',
          text: '#e0def4',
          hoverBg: '#403d52',
          hoverText: '#e0def4'
        }
      },
      customBlock: {
        info: {
          bg: '#9ccfd81a',
          border: '#9ccfd8',
          text: '#9ccfd8',
          textDeep: '#9ccfd8'
        },
        tip: {
          bg: '#31748f1a',
          border: '#31748f',
          text: '#31748f',
          textDeep: '#31748f'
        },
        warning: {
          bg: '#f6c1771a',
          border: '#f6c177',
          text: '#f6c177',
          textDeep: '#f6c177'
        },
        danger: {
          bg: '#eb6f921a',
          border: '#eb6f92',
          text: '#eb6f92',
          textDeep: '#eb6f92'
        }
      },
      selection: {
        bg: '#403d52'
      },
      home: {
        heroNameColor: 'transparent',
        heroNameBackground: 'linear-gradient(120deg, #c4a7e7 30%, #ebbcba)',
        heroImageBackground: 'linear-gradient(-45deg, #c4a7e7 50%, #ebbcba 50%)',
        heroImageFilter: 'blur(44px)'
      }
    }
  }
}
