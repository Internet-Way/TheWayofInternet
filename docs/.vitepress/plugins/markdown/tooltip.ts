import type MarkdownIt from 'markdown-it'

export const tooltipLinks = (md: MarkdownIt) => {
  md.core.ruler.push('tooltip_links', (state) => {
    state.tokens.forEach((token) => {
      if (token.type === 'inline') {
        const children = token.children
        if (!children) return

        for (let i = 0; i < children.length; i++) {
          const child = children[i]

          if (child.type === 'link_open') {
            const nextChild = children[i + 1]

            // Check if the link text is exactly "Note" or "Resource"
            if (
              nextChild &&
              nextChild.type === 'text' &&
              (nextChild.content === 'Note' || nextChild.content === 'Resource')
            ) {
              const hrefIndex = child.attrIndex('href')
              const href = hrefIndex >= 0 ? child.attrs![hrefIndex][1] : ''

              // Ensure it matches the requested note URL format
              if (href.startsWith('/notes#')) {
                const noteId = href.split('#')[1]
                const tooltipType = nextChild.content.toLowerCase()

                // Create our HTML inline component
                const htmlToken = new state.Token('html_inline', '', 0)
                htmlToken.content = `<Tooltip id="${noteId}" type="${tooltipType}" />`

                // Find the matching link_close
                let closeIdx = i + 2
                let level = 1
                while (closeIdx < children.length) {
                  if (children[closeIdx].type === 'link_open') level++
                  else if (children[closeIdx].type === 'link_close') level--

                  if (level === 0) break
                  closeIdx++
                }

                // Replace the entire link sequence with the Tooltip component
                if (closeIdx < children.length) {
                  children.splice(i, closeIdx - i + 1, htmlToken)
                }
              }
            }
          }
        }
      }
    })
  })
}
