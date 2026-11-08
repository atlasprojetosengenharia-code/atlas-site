import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Domínio próprio na raiz (GitHub Pages + CNAME) => base '/'
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
