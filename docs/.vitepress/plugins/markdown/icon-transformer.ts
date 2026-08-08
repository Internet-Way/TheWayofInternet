import type { MarkdownRenderer } from 'vitepress'
import { icons as twemoji } from '@iconify-json/twemoji'
import { MARKER_ALIASES, markerEmojiDefs, renderMarkerHtml } from './markers'

// Build a lookup table from all available twemoji icon keys
const iconKeys = Object.keys(twemoji.icons)
export const defs: Record<string, string> = {}
for (const key of iconKeys) {
  defs[key] = key
}

// Marker shortcodes (`:windows:`, `:notoss:`, `:star:` …) become emoji tokens too
for (const key of Object.keys(markerEmojiDefs)) {
  defs[key] = key
}

// Renders emoji tokens as twemoji icon spans; marker aliases get tooltip wrappers
export function emojiRender(md: MarkdownRenderer) {
  md.renderer.rules.emoji = (tokens, idx) => {
    const markup = tokens[idx].markup
    if (MARKER_ALIASES[markup]) return renderMarkerHtml(markup)
    const isStarred = markup.startsWith('star')
    const className = `i-twemoji-${markup}${isStarred ? ' starred' : ''}`
    return `<span class="${className}"></span>`
  }
}

// Raw Unicode emoji → twemoji icon name lookup (shared with PageTitle)
export const emojiMap: Record<string, string> = {
  '📖': 'open-book',
  '🔧': 'wrench',
  '🛡️': 'shield',
  '🛡': 'shield',
  '📱': 'mobile-phone',
  '🧭': 'compass',
  '✔️': 'check-mark-button',
  '👁️‍🗨️': 'eye-in-speech-bubble',
  '⚠️': 'warning',
  '⭐': 'star',
  '🚀': 'rocket',
  '✨': 'sparkles',
  '📦': 'package',
  '💡': 'light-bulb',
  '🔒': 'locked',
  '🔐': 'locked-with-key',
  '🚫': 'no-entry',
  '💻': 'laptop',
  '📚': 'books',
  '🎬': 'clapper-board',
  '🌟': 'glowing-star',
  '👑': 'crown',
  '✔': 'check-mark',
  '⚠': 'warning',
  '❓': 'red-question-mark'
}

// Intercepts raw Unicode emojis in markdown text and headings and replaces them with Iconify / Twemoji icon spans
export function unicodeEmojiPlugin(md: MarkdownRenderer) {
  md.core.ruler.after('inline', 'emoji-to-icon', (state) => {
    const emojiRegex = new RegExp(
      `(${Object.keys(emojiMap)
        .sort((a, b) => b.length - a.length)
        .join('|')})`,
      'gu'
    )

    for (const token of state.tokens) {
      if (token.type !== 'inline') continue

      const children = token.children || []
      const newChildren = []

      for (let i = 0; i < children.length; i++) {
        const child = children[i]

        if (child.type === 'text' && emojiRegex.test(child.content)) {
          emojiRegex.lastIndex = 0
          const content = child.content
          let lastIdx = 0
          let match: RegExpExecArray | null

          while ((match = emojiRegex.exec(content)) !== null) {
            const emoji = match[0]
            const index = match.index

            if (index > lastIdx) {
              const textToken = new state.Token('text', '', 0)
              textToken.content = content.slice(lastIdx, index)
              newChildren.push(textToken)
            }

            const iconName = emojiMap[emoji] || 'question'
            // Star markers render as hoverable marker icons (⭐/🌟 are markers too)
            let htmlContent: string
            if (iconName === 'star' || iconName === 'glowing-star') {
              htmlContent = renderMarkerHtml(iconName)
            } else {
              htmlContent = `<span class="i-twemoji-${iconName}" style="display:inline-block; vertical-align:middle; width:1.2em; height:1.2em; margin-right:0.25em;" title="${emoji}"></span>`
            }
            const htmlToken = new state.Token('html_inline', '', 0)
            htmlToken.content = htmlContent
            newChildren.push(htmlToken)

            lastIdx = emojiRegex.lastIndex
          }

          if (lastIdx < content.length) {
            const textToken = new state.Token('text', '', 0)
            textToken.content = content.slice(lastIdx)
            newChildren.push(textToken)
          }
        } else {
          newChildren.push(child)
        }
      }
      token.children = newChildren
    }
    return true
  })
}

// Social icon mappings — link text (lowercase) → UnoCSS icon class
const SOCIAL_ICONS: Record<string, string> = {
  discord: 'i-simple-icons-discord',
  github: 'i-simple-icons-github',
  x: 'i-simple-icons-x',
  twitter: 'i-simple-icons-x',
  reddit: 'i-simple-icons-reddit',
  youtube: 'i-simple-icons-youtube',
  telegram: 'i-simple-icons-telegram',
  matrix: 'i-simple-icons-matrix',
  lemmy: 'i-simple-icons-lemmy',
  mastodon: 'i-simple-icons-mastodon',
  twitch: 'i-simple-icons-twitch',
  instagram: 'i-simple-icons-instagram',
  facebook: 'i-simple-icons-facebook',
  tiktok: 'i-simple-icons-tiktok',
  steam: 'i-simple-icons-steam',
  spotify: 'i-simple-icons-spotify',
  bluesky: 'i-simple-icons-bluesky',
  threads: 'i-simple-icons-threads'
}

// Transforms link text matching social names into icon spans
export function iconLinks(md: MarkdownRenderer) {
  md.core.ruler.after('inline', 'icon-links', (state) => {
    for (const token of state.tokens) {
      if (token.type !== 'inline') continue

      const children = token.children || []
      const newChildren = []

      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        
        if (
          child.type === 'link_open' &&
          i + 2 < children.length &&
          children[i + 1].type === 'text' &&
          children[i + 2].type === 'link_close'
        ) {
          const textToken = children[i + 1]
          const label = textToken.content.trim()
          const iconClass = SOCIAL_ICONS[label.toLowerCase()]

          if (iconClass) {
            // Push link_open
            newChildren.push(child)
            
            // Push icon as html_inline (No text pushed)
            const iconToken = new state.Token('html_inline', '', 0)
            iconToken.content = `<span class="${iconClass}" style="display:inline-block; vertical-align:middle; width:1.2em; height:1.2em;" title="${label}"></span>`
            newChildren.push(iconToken)
            
            // Skip the text token (i+1) and continue
            i++ 
            continue
          }
        }
        newChildren.push(child)
      }
      token.children = newChildren
    }
    return true
  })
}

// Reorder plugins array by moving pluginA before/after pluginB
export function movePlugin(
  plugins: { name: string }[],
  pluginAName: string,
  order: 'before' | 'after',
  pluginBName: string
) {
  const idxB = plugins.findIndex((p) => p.name === pluginBName)
  const idxA = plugins.findIndex((p) => p.name === pluginAName)
  if (idxA === -1 || idxB === -1) return

  const shouldMove =
    (order === 'before' && idxA > idxB) || (order === 'after' && idxA < idxB)

  if (shouldMove) {
    const [removed] = plugins.splice(idxA, 1)
    plugins.splice(idxB, 0, removed)
  }
}
