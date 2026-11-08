# Atlas Projetos e Engenharia: site

Vite + React 19 + TypeScript + Tailwind v4 · GSAP (ScrollTrigger, SplitText, Flip) · Framer Motion · Lenis · Radix UI.

## Rodar
```
npm install
npm run dev        # desenvolvimento
npm run build      # gera dist/ (+ 404.html para rotas SPA)
```

## Onde editar
| O quê | Arquivo |
|---|---|
| E-mail, telefone, WhatsApp, cidade, CNPJ, CREA, links do GitHub | `src/config/site.ts` |
| Projetos e fotos da galeria | `src/config/projectsData.ts` (instruções no topo do arquivo) |
| Criar pasta de um projeto novo | `npm run project:new -- contencao muro-arrimo-01` |
| Cores e fontes (tokens da marca) | `src/index.css` (`@theme`) |
| Logos | `public/brand/` |

## Publicação (GitHub Pages + domínio próprio)
1. Envie para um repositório GitHub (branch `main`). O workflow `.github/workflows/deploy.yml` faz o build e publica.
2. Settings → Pages → Source: **GitHub Actions**; Custom domain: `www.atlasprojetos.eng.br`.
3. DNS no Registro.br: CNAME `www` → `SEU-USUARIO.github.io.` e registros A do apex para 185.199.108.153 / .109.153 / .110.153 / .111.153.
4. Marque **Enforce HTTPS** quando o certificado for emitido.
