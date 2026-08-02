import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { abbr } from '@mdit/plugin-abbr'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const unocssConfigPath = path.resolve(__dirname, '../../unocss.config.ts')
import { align } from '@mdit/plugin-align'
import { attrs } from '@mdit/plugin-attrs'
import { demo } from '@mdit/plugin-demo'
import { footnote } from '@mdit/plugin-footnote'
import { icon } from '@mdit/plugin-icon'
import { imgSize } from '@mdit/plugin-img-size'
import { ins } from '@mdit/plugin-ins'
import { mark } from '@mdit/plugin-mark'
import { spoiler } from '@mdit/plugin-spoiler'
import { sub } from '@mdit/plugin-sub'
import { sup } from '@mdit/plugin-sup'
import { tab } from '@mdit/plugin-tab'
import { tasklist } from '@mdit/plugin-tasklist'
import consola from 'consola'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import OptimizeExclude from 'vite-plugin-optimize-exclude'
import Terminal from 'vite-plugin-terminal'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitepress'
import { meta, nav, sidebar, socialLinks } from './core/meta'
import { generateMeta } from './plugins/transform/generate-meta'
import { defs, emojiRender, iconLinks, unicodeEmojiPlugin } from './plugins/markdown/icon-transformer'
import { starLinks } from './plugins/markdown/starredlink'
import { tooltipLinks } from './plugins/markdown/tooltip'
import { TooltipVitePlugin } from './plugins/vite/tooltip-plugin'

// @unocss-include

let commitTitle = 'development'
try {
  commitTitle = execSync('git log -1 --pretty=%s', { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim()
} catch {
  // fallback if Git is unavailable (Cloudflare Pages preview)
}

export default defineConfig({
  base: '/',
  title: 'TWI',
  description: meta.description,
  lang: 'en-US',
  lastUpdated: false,
  cleanUrls: true,
  appearance: true,
  srcExclude: ['README.md', 'single-page'],
  ignoreDeadLinks: true,
  sitemap: {
    hostname: meta.hostname
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon.png' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    [
      'meta',
      {
        name: 'description',
        content:
          'The Way of Internet is a free media, resource, and tool index featuring alternatives, curated lists, and a digital vault.'
      }
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'The Way of Internet' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'A free media, resource, and tool index with alternatives, curated lists, and a digital vault.'
      }
    ],
    ['meta', { property: 'og:site_name', content: 'The Way of Internet' }],
    ['meta', { property: 'og:url', content: meta.hostname }],
    ['meta', { property: 'og:image', content: `${meta.hostname}/og.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'The Way of Internet' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content:
          'A free media, resource, and tool index with alternatives and curated resources.'
      }
    ],
    ['meta', { name: 'twitter:image', content: `${meta.hostname}/og.png` }],
    ['meta', { name: 'theme-color', content: '#000000' }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo.png', sizes: '192x192' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }]
  ],
  transformHead: async (context) => generateMeta(context, meta.hostname),
  buildEnd: async () => {
    consola.success('Build complete!')
  },
  vite: {
    server: {
      host: '0.0.0.0',
      port: 3000
    },
    optimizeDeps: {
      exclude: ['workbox-window'],
      include: ['vue', '@vue/runtime-dom', '@vue/runtime-core']
    },
    plugins: [
      TooltipVitePlugin(),
      OptimizeExclude(),
      Terminal({
        console: 'terminal',
        output: ['console', 'terminal']
      }),
      UnoCSS({
        configFile: unocssConfigPath
      }),
      AutoImport({
        dts: '../.cache/imports.d.ts',
        imports: ['vue', 'vitepress'],
        vueTemplate: true,
        biomelintrc: {
          enabled: true,
          filepath: './.cache/imports.json'
        }
      }),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        },
        manifest: {
          name: 'The Way of Internet',
          short_name: 'TWI',
          description:
            'A free media, resource, and tool index featuring alternatives, curated lists, and a digital vault.',
          theme_color: '#000000',
          background_color: '#000000',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: '/favicon.png',
              sizes: '48x48',
              type: 'image/png'
            },
            {
              src: '/logo.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      }),
    ],
    build: { 
      chunkSizeWarningLimit: Number.POSITIVE_INFINITY
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  },
  markdown: {
    emoji: { defs },
    config(md) {
      md.use(abbr)
      md.use(sub)
      md.use(sup)
      md.use(attrs)
      md.use(footnote)
      md.use(spoiler)
      md.use(ins)
      md.use(tasklist)
      md.use(mark)
      md.use(align)
      md.use(icon)
      md.use(demo)
      md.use(tab)
      md.use(imgSize)
      md.use(emojiRender)
      md.use(unicodeEmojiPlugin)
      md.use(starLinks)
      md.use(iconLinks)
      md.use(tooltipLinks)
    }
  },
  themeConfig: {
    logo: '/logo.png',
    outline: [2, 6],
    nav,
    sidebar,
    socialLinks,
    search: {
      provider: 'local',
      detailedView: true,
      options: {
        tokenize: (string) => string.split(/[\s\-]+/u).filter(Boolean),
        processTerm: (term) => term.toLowerCase().trim(),
      },
      searchOptions: {
        fuzzy: 0.25,
        prefix: true,
        boost: {
          title: 4,
          heading: 3,
          text: 2,
          tag: 1
        }
      }
    },
    footer: {
      message: `Made with 💔, version: ${commitTitle}<br/>This site does not host any files.`,
      copyright: `© ${new Date().getFullYear()}, Estd 2026. The Way of Internet`
    }
  }
})
