// GitHub Pages não tem fallback de SPA: 404.html = index.html faz as rotas (/servicos etc.) funcionarem ao recarregar.
import { copyFileSync } from 'node:fs'
copyFileSync('dist/index.html', 'dist/404.html')
console.log('dist/404.html criado (fallback SPA)')
