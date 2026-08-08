/**
 * Marker icons — shortcode aliases like `:windows:` / `:notoss:` that render as
 * brand/tag icons next to (or inside) a link, with a hover tooltip showing the
 * marker's name. ⭐ and 🌟 are markers too. Stats plain-text scanning shares
 * this registry via collectMarkersInLine().
 */

export interface MarkerAlias {
  icon: string
  label: string
}

export const MARKER_ALIASES: Record<string, MarkerAlias> = {
  // Operating Systems
  windows: { icon: 'i-simple-icons-windows', label: 'Windows' },
  linux: { icon: 'i-simple-icons-linux', label: 'Linux' },
  mac: { icon: 'i-simple-icons-apple', label: 'macOS' },
  android: { icon: 'i-simple-icons-android', label: 'Android' },
  ios: { icon: 'i-simple-icons-ios', label: 'iOS / iPadOS' },

  // Source
  notoss: { icon: 'i-mdi-package-variant-closed-remove', label: 'Closed Source' },
  usecrack: { icon: 'i-mdi-key', label: 'Keygen / Crack' },
  webapp: { icon: 'i-mdi-web', label: 'Web App' },

  // Browsers
  chromium: { icon: 'i-simple-icons-googlechrome', label: 'Chromium-based' },
  gecko: { icon: 'i-simple-icons-firefoxbrowser', label: 'Gecko-based' },

  // Content
  nsfw: { icon: 'i-twemoji-no-one-under-eighteen', label: 'NSFW / 18+' },
  userscript: { icon: 'i-simple-icons-tampermonkey', label: 'Userscript' },

  // Star markers (⭐ and 🌟)
  star: { icon: 'i-twemoji-star', label: 'Star' },
  'glowing-star': { icon: 'i-twemoji-glowing-star', label: 'Glowing Star' },
}

/** Emoji-defs entries so markdown-it tokenizes `:alias:` into an emoji token. */
export const markerEmojiDefs: Record<string, string> = Object.fromEntries(
  Object.keys(MARKER_ALIASES).map((key) => [key, ''])
)

const escAttr = (value: string) => value.replace(/"/g, '&quot;')

/** Renders a marker `<span>` wrapper carrying the tooltip data attributes. */
export function renderMarkerHtml(markup: string): string {
  const alias = MARKER_ALIASES[markup]
  if (!alias) return ''
  const starred = markup.startsWith('star') ? ' starred' : ''
  return (
    `<span class="marker-tip" data-marker="${markup}" data-tip="${escAttr(alias.label)}">` +
    `<span class="${alias.icon}${starred}"></span></span>`
  )
}

/** Raw-source scanner (stats): which distinct markers does this line use? */
export function collectMarkersInLine(line: string): Set<string> {
  const found = new Set<string>()
  if (line.includes('\u2b50')) found.add('star') // ⭐
  if (line.includes('\u{1f31f}')) found.add('glowing-star') // 🌟
  const re = /:([\w+-]+):/g
  let match: RegExpExecArray | null
  while ((match = re.exec(line)) !== null) {
    const key = match[1].toLowerCase()
    if (MARKER_ALIASES[key]) found.add(key)
  }
  return found
}