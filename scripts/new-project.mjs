// Uso: npm run project:new -- <categoria> <id-do-projeto>
// Ex.:  npm run project:new -- contencao muro-arrimo-01
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const [category, id] = process.argv.slice(2)
const valid = ['estrutural', 'geotecnico', 'contencao', 'comercial']
if (!category || !id || !valid.includes(category) || !/^[a-z0-9-]+$/.test(id)) {
  console.error(`Uso: npm run project:new -- <${valid.join('|')}> <id-em-kebab-case>`)
  process.exit(1)
}
const dir = join('public', 'images', 'projects', category, id)
mkdirSync(dir, { recursive: true })
const keep = join(dir, '.gitkeep')
if (!existsSync(keep)) writeFileSync(keep, '')
console.log(`Pasta criada: ${dir}\nCopie as fotos (01.jpg, 02.jpg...) e registre o projeto em src/config/projectsData.ts`)
