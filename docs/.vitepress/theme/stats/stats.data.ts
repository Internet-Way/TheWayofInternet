import { createContentLoader } from 'vitepress'
import { cleanHeading, slugify } from './heading'

export interface ScopeStats {
  heading: string
  slug: string
  lines: number
  sections?: ScopeStats[]
  subsections?: ScopeStats[]
}

export interface PageStats {
  url: string
  title: string
  type: string
  lines: number
  departments: ScopeStats[]
}

export type StatsLevel = 'page' | 'department' | 'section' | 'subsection'

const headingRe = /^(#{1,6})\s+(.+?)\s*$/
const listRe = /^\s*(?:[-*+]|\d+[.)])\s+/
const hrRe = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/
const commentRe = /^\s*<!--/

interface MutableScope {
  heading: string
  slug: string
  lines: number
  sections?: MutableScope[]
  subsections?: MutableScope[]
}

interface Parsed {
  lines: number
  departments: MutableScope[]
}

function parsePage(src: string): Parsed {
  const rawLines = src.split(/\r?\n/)
  const page: Parsed = { lines: 0, departments: [] }
  const stack: { h: number; scope: MutableScope }[] = []
  let i = 0
  let inFence = false

  if (rawLines[0]?.trim() === '---') {
    i = 1
    for (; i < rawLines.length; i++) {
      if (rawLines[i].trim() === '---') {
        i++
        break
      }
    }
  }

  const openScope = (heading: string, level: number): void => {
    while (stack.length && stack[stack.length - 1].h >= level) stack.pop()
    const scope: MutableScope = { heading, slug: slugify(heading), lines: 0 }
    const parent = stack[stack.length - 1]?.scope
    if (!parent) {
      page.departments.push(scope)
    } else if (stack.length === 1) {
      parent.sections ??= []
      parent.sections.push(scope)
    } else if (stack.length === 2) {
      parent.subsections ??= []
      parent.subsections.push(scope)
    } else {
      return
    }
    stack.push({ h: level, scope })
  }

  for (; i < rawLines.length; i++) {
    const raw = rawLines[i]
    const line = raw.trim()
    if (inFence) {
      if (line.startsWith('```') || line.startsWith('~~~')) inFence = false
      continue
    }
    if (line.startsWith('```') || line.startsWith('~~~')) {
      inFence = true
      continue
    }
    const hm = headingRe.exec(raw)
    if (hm) {
      const level = hm[1].length
      if (level <= 3) openScope(cleanHeading(hm[2]), level)
      continue
    }
    if (!line || hrRe.test(line) || commentRe.test(line)) continue
    if (!listRe.test(line)) continue
    page.lines++
    if (stack.length) {
      stack[stack.length - 1].scope.lines++
    }
  }

  return page
}

function buildPageStats(url: string, frontmatter: Record<string, unknown>, src?: string): PageStats {
  const type = String(frontmatter.type ?? '')
  const parsed = parsePage(src ?? '')
  return {
    url,
    title: String(frontmatter.title ?? url),
    type,
    lines: parsed.lines,
    departments: parsed.departments,
  }
}

export default createContentLoader('**/*.md', {
  includeSrc: true,
  transform: (raw) =>
    raw
      .map(({ url, frontmatter, src }) => buildPageStats(url, frontmatter as Record<string, unknown>, src))
      .sort((a, b) => a.url.localeCompare(b.url)),
})

type StatsData = ReturnType<typeof createContentLoader>
declare const data: StatsData
export { data }
