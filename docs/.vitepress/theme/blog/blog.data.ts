import type { ContentData } from 'vitepress'
import { createContentLoader } from 'vitepress'

interface BlogEntry {
  title: string
  url: string
  date: string
}

// Group an array of items by a key derived from each item
function categorize<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> {
  const result: Record<string, T[]> = {}
  for (const item of items) {
    const key = keyFn(item)
    if (!result[key]) result[key] = []
    result[key].push(item)
  }
  return result
}

function processBlogPosts(rawContent: ContentData[]): Record<string, BlogEntry[]> {
  const entries: BlogEntry[] = rawContent
    .map(({ url, frontmatter }) => ({
      title: frontmatter.title,
      url,
      date: (frontmatter.date as Date).toISOString().slice(0, 10)
    }))
    .sort((a, b) => b.date.localeCompare(a.date))

  return categorize(entries, (entry) => entry.date.slice(0, 4))
}

type BlogData = ReturnType<typeof createContentLoader>
declare const data: BlogData
export { data }

export default createContentLoader('blogs/*.md', {
  includeSrc: true,
  transform: (raw) => processBlogPosts(raw)
})
