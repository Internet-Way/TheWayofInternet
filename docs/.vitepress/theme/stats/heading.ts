/** Strip markdown formatting from a heading so DOM text can be matched to parsed data. */
export function cleanHeading(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/#+\s*$/, '')
    .trim()
}

/** Approximate the anchor slug VitePress (github-slugger) generates for a heading. */
export function slugify(text: string): string {
  return cleanHeading(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[*+~.(),'"!:@]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}