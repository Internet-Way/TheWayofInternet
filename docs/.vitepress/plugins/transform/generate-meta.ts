import type { HeadConfig, TransformContext } from 'vitepress'

function buildPageUrl(hostname: string, relativePath: string): string {
  const cleaned = relativePath.replace(/((^|\/)index)?\.md$/, '$2')
  return `${hostname}/${cleaned}`
}

function buildOgImagePath(filePath: string): string {
  return filePath
    .replace('index.md', '')
    .replace('.md', '')
    .concat('/__og_image__/og.png')
    .replaceAll('//', '/')
    .replace(/^\//, '')
}

function appendOpenGraphImageTags(
  tags: HeadConfig[],
  imageUrl: string,
  altText?: string
): void {
  tags.push(
    ['meta', { property: 'og:image', content: imageUrl }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '628' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }]
  )
  if (altText) {
    tags.push(['meta', { property: 'og:image:alt', content: altText }])
  }
  tags.push(
    ['meta', { name: 'twitter:image', content: imageUrl }],
    ['meta', { name: 'twitter:image:width', content: '1200' }],
    ['meta', { name: 'twitter:image:height', content: '628' }]
  )
  if (altText) {
    tags.push(['meta', { name: 'twitter:image:alt', content: altText }])
  }
}

export function generateMeta(ctx: TransformContext, hostname: string): HeadConfig[] {
  const tags: HeadConfig[] = []
  const page = ctx.pageData

  if (page.isNotFound || Object.keys(page.frontmatter).length === 0) {
    return tags
  }

  const pageTitle = page.frontmatter.title ?? page.title
  const pageUrl = buildPageUrl(hostname, page.relativePath)

  // Canonical + social URLs
  tags.push(
    ['link', { rel: 'canonical', href: pageUrl }],
    ['meta', { property: 'og:url', content: pageUrl }],
    ['meta', { name: 'twitter:url', content: pageUrl }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
  )

  // Title tags
  if (pageTitle) {
    tags.push(
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { name: 'twitter:title', content: pageTitle }]
    )
  }

  // Description tags
  const desc = page.frontmatter.description
  if (desc) {
    tags.push(
      ['meta', { property: 'og:description', content: desc }],
      ['meta', { name: 'twitter:description', content: desc }]
    )
  }

  // Image tags
  const frontmatterImage = page.frontmatter.image
  if (frontmatterImage) {
    const fullImageUrl = `${hostname}/${frontmatterImage.replace(/^\//, '')}`
    tags.push(
      ['meta', { property: 'og:image', content: fullImageUrl }],
      ['meta', { name: 'twitter:image', content: fullImageUrl }]
    )
  } else {
    const generatedImageUrl = `${hostname}/${buildOgImagePath(page.filePath)}`
    appendOpenGraphImageTags(tags, generatedImageUrl, pageTitle)
  }

  // Article metadata
  if (page.frontmatter.tag) {
    tags.push(['meta', { property: 'article:tag', content: page.frontmatter.tag }])
  }

  if (page.frontmatter.date) {
    tags.push(['meta', { property: 'article:published_time', content: page.frontmatter.date }])
  }

  if (page.lastUpdated && page.frontmatter.lastUpdated !== false) {
    tags.push([
      'meta',
      { property: 'article:modified_time', content: new Date(page.lastUpdated).toISOString() }
    ])
  }

  return tags
}
