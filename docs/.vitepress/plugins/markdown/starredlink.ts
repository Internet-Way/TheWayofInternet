import type { MarkdownRenderer } from 'vitepress'

export function starLinks(md: MarkdownRenderer) {
  md.core.ruler.after('inline', 'star-links', (state) => {
    for (const token of state.tokens) {
      if (token.type !== 'inline') continue
      
      const content = token.content
      const hasBrightStar = content.includes('🌟')
      const hasRegularStar = content.includes('⭐')
      
      if (!hasBrightStar && !hasRegularStar) continue
      
      const children = token.children || []
      const newChildren = []
      
      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        
        if (child.type === 'link_open') {
          // Wrap content inside the link
          // link_open ... content ... link_close
          
          if (hasBrightStar) {
            // Bold + Italic
            newChildren.push(child)
            newChildren.push(new state.Token('strong_open', 'strong', 1))
            newChildren.push(new state.Token('em_open', 'em', 1))
          } else if (hasRegularStar) {
            // Bold
            newChildren.push(child)
            newChildren.push(new state.Token('strong_open', 'strong', 1))
          }
        } else if (child.type === 'link_close') {
          if (hasBrightStar) {
            newChildren.push(new state.Token('em_close', 'em', -1))
            newChildren.push(new state.Token('strong_close', 'strong', -1))
            newChildren.push(child)
          } else if (hasRegularStar) {
            newChildren.push(new state.Token('strong_close', 'strong', -1))
            newChildren.push(child)
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
