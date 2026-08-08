import fs from 'node:fs'
import path from 'node:path'
import MarkdownIt from 'markdown-it'
// Import Plugin from vitepress's own vite copy so the returned plugin type
// matches the one defineConfig() expects (root 'vite' resolves to a second copy).
import type { Plugin } from 'vitepress/dist/node/index.js'

export function TooltipVitePlugin(): Plugin {
  const virtualModuleId = 'virtual:tooltip-registry'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite-plugin-tooltip-registry',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const notesPath =
          ['docs/utilpages/notes.md', 'docs/notes.md', 'notes.md']
            .map((p) => path.resolve(process.cwd(), p))
            .find((p) => fs.existsSync(p)) || ''

        const registry: Record<string, string> = {}
        const md = new MarkdownIt({ html: true })

        if (notesPath) {
          const content = fs.readFileSync(notesPath, 'utf8')
          // Regex to match ### [name]\n [content] until the next heading or end of file
          const regex = /^###\s+([^\r\n]+)\r?\n([\s\S]*?)(?=\n#+\s|(?![\s\S]))/gm
          let match

          while ((match = regex.exec(content)) !== null) {
            const name = match[1].trim()
            const markdownContent = match[2].trim()
            registry[name] = md.render(markdownContent)
          }
        }

        return `export const tooltipRegistry = ${JSON.stringify(registry)};`
      }
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith('notes.md')) {
        const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId)
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload', path: '*' })
        }
      }
    }
  }
}
