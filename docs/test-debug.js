import fs from 'node:fs'
import path from 'node:path'

const notesPath = path.resolve(process.cwd(), 'notes.md')
const content = fs.readFileSync(notesPath, 'utf8')
const regex = /^###\s+([^\r\n]+)\r?\n([\s\S]*?)(?=\n#+\s|(?![\s\S]))/gm
const registry = {}

let match
while ((match = regex.exec(content)) !== null) {
  const name = match[1].trim()
  const markdownContent = match[2].trim()
  registry[name] = markdownContent
}

console.log('Registry keys:', Object.keys(registry))
console.log('Registry content for testnote:', registry['testnote'])
