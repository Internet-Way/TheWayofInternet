import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives
} from 'unocss'
import { colors } from './docs/.vitepress/theme/themes/theme-palette'

export default defineConfig({
  content: {
    filesystem: ['.vitepress/config.mts', '.vitepress/site-config.ts', '.vitepress/plugins/markdown/*.ts', 'docs/**/*.md']
  },
  safelist: [
    'i-simple-icons-discord',
    'i-simple-icons-github',
    'i-simple-icons-x',
    'i-simple-icons-reddit',
    'i-simple-icons-youtube',
    'i-simple-icons-telegram',
    'i-simple-icons-matrix',
    'i-simple-icons-lemmy',
    'i-simple-icons-mastodon',
    'i-simple-icons-twitch',
    'i-simple-icons-instagram',
    'i-simple-icons-facebook',
    'i-simple-icons-tiktok',
    'i-simple-icons-steam',
    'i-simple-icons-spotify',
    'i-simple-icons-bluesky',
    'i-simple-icons-threads',
    'i-mdi-help-circle',
    'i-twemoji-open-book',
    'i-twemoji-wrench',
    'i-twemoji-shield',
    'i-twemoji-mobile-phone',
    'i-twemoji-compass',
    'i-twemoji-check-mark-button',
    'i-twemoji-eye-in-speech-bubble',
    'i-twemoji-warning',
    'i-twemoji-star',
    'i-twemoji-rocket',
    'i-twemoji-sparkles',
    'i-twemoji-package',
    'i-twemoji-light-bulb',
    'i-twemoji-locked',
    'i-twemoji-locked-with-key',
    'i-twemoji-no-entry',
    'i-twemoji-laptop',
    'i-twemoji-books',
    'i-twemoji-clapper-board',
    'i-twemoji-glowing-star',
    'i-twemoji-crown',
    'i-twemoji-check-mark',
    'i-twemoji-warning',
    'i-twemoji-red-question-mark',
  ],
  theme: {
    colors: {
      ...colors,
      primary: 'var(--vp-c-brand-1)',
      bg: 'var(--vp-c-bg)',
      'bg-alt': 'var(--vp-c-bg-alt)',
      'bg-elv': 'var(--vp-c-bg-elv)',
      text: 'var(--vp-c-text-1)',
      'text-2': 'var(--vp-c-text-2)',
      div: 'var(--vp-c-divider)'
    }
  },
  rules: [
    [/^brand-(\d+)$/, ([, d]) => ({ color: `var(--vp-c-brand-${d})` })],
    [/^bg-brand-(\d+)$/, ([, d]) => ({ 'background-color': `var(--vp-c-brand-${d})` })],
    [/^border-brand-(\d+)$/, ([, d]) => ({ 'border-color': `var(--vp-c-brand-${d})` })],
    [/^text-brand-(\d+)$/, ([, d]) => ({ color: `var(--vp-c-brand-${d})` })],
    [
      'kbd',
      {
        display: 'inline-block',
        padding: '0.2em 0.4em',
        'font-size': '0.75em',
        'font-weight': '500',
        'line-height': '1',
        color: 'var(--vp-c-text-1)',
        'background-color': 'rgb(var(--vp-c-bg-alt))',
        'border-radius': '4px'
      }
    ]
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      autoInstall: true,
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      },
      collections: {
        custom: {
          privateersclub: () =>
            fetch('https://megathread.pages.dev/favicon.svg').then((r) => r.text())
        }
      }
    })
  ],
  transformers: [transformerDirectives()]
})
