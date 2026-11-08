import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion'

/**
 * Malha estrutural (treliça) animada: nós oscilam suavemente, reagem ao cursor
 * e "cargas" percorrem as barras até os apoios, lembrando a distribuição de esforços.
 */
export default function HeroCanvas({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = prefersReducedMotion()

    let w = 0
    let h = 0
    let cols = 0
    let rows = 0
    const gap = 78
    let base: { x: number; y: number }[] = []
    let edges: [number, number][] = []
    const heat = new Map<string, number>()
    const pulses: { path: number[]; seg: number; t: number }[] = []
    const mouse = { x: -9999, y: -9999 }
    let visible = true
    let raf = 0

    const idx = (i: number, j: number) => j * (cols + 1) + i
    const key = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`)

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / gap)
      rows = Math.ceil(h / gap)
      base = []
      for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) base.push({ x: i * gap, y: j * gap })
      edges = []
      for (let j = 0; j <= rows; j++)
        for (let i = 0; i <= cols; i++) {
          if (i < cols) edges.push([idx(i, j), idx(i + 1, j)])
          if (j < rows) edges.push([idx(i, j), idx(i, j + 1)])
          if (i < cols && j < rows) edges.push((i + j) % 2 === 0 ? [idx(i, j), idx(i + 1, j + 1)] : [idx(i + 1, j), idx(i, j + 1)])
        }
    }

    const spawn = () => {
      let i = Math.floor(Math.random() * (cols + 1))
      let j = 0
      const path = [idx(i, j)]
      while (j < rows) {
        const opts = [i]
        if (i > 0) opts.push(i - 1)
        if (i < cols) opts.push(i + 1)
        i = opts[Math.floor(Math.random() * opts.length)]
        j++
        path.push(idx(i, j))
      }
      pulses.push({ path, seg: 0, t: 0 })
    }

    const pos: { x: number; y: number }[] = []
    const frame = (time: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      ctx.clearRect(0, 0, w, h)

      // posições animadas
      for (let n = 0; n < base.length; n++) {
        const b = base[n]
        let x = b.x + Math.sin(time / 1700 + b.y * 0.012) * 3.2
        let y = b.y + Math.cos(time / 1900 + b.x * 0.012) * 3.2
        const dx = x - mouse.x
        const dy = y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 22000) {
          const f = (1 - d2 / 22000) * 16
          const d = Math.sqrt(d2) || 1
          x += (dx / d) * f
          y += (dy / d) * f
        }
        pos[n] = { x, y }
      }

      // barras
      ctx.lineWidth = 1
      for (const [a, b] of edges) {
        const hv = heat.get(key(a, b)) ?? 0
        ctx.strokeStyle = `rgba(143,163,192,${0.1 + hv * 0.65})`
        ctx.beginPath()
        ctx.moveTo(pos[a].x, pos[a].y)
        ctx.lineTo(pos[b].x, pos[b].y)
        ctx.stroke()
      }
      heat.forEach((v, k) => (v < 0.02 ? heat.delete(k) : heat.set(k, v * 0.965)))

      // nós
      ctx.fillStyle = 'rgba(232,232,232,0.22)'
      for (const p of pos) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, 6.283)
        ctx.fill()
      }

      // cargas percorrendo a malha
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k]
        const a = pos[p.path[p.seg]]
        const b = pos[p.path[p.seg + 1]]
        p.t += 0.045
        const x = a.x + (b.x - a.x) * Math.min(p.t, 1)
        const y = a.y + (b.y - a.y) * Math.min(p.t, 1)
        heat.set(key(p.path[p.seg], p.path[p.seg + 1]), 1)
        const g = ctx.createRadialGradient(x, y, 0, x, y, 16)
        g.addColorStop(0, 'rgba(232,232,232,0.95)')
        g.addColorStop(1, 'rgba(143,163,192,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, 16, 0, 6.283)
        ctx.fill()
        if (p.t >= 1) {
          p.t = 0
          p.seg++
          if (p.seg >= p.path.length - 1) {
            // apoio: marca o nó final
            const end = pos[p.path[p.path.length - 1]]
            ctx.strokeStyle = 'rgba(232,232,232,0.6)'
            ctx.strokeRect(end.x - 5, end.y - 5, 10, 10)
            pulses.splice(k, 1)
          }
        }
      }
      if (pulses.length < 5 && Math.random() < 0.025) spawn()
    }

    build()
    if (reduced) {
      // quadro estático
      frame(0)
      cancelAnimationFrame(raf)
    } else {
      raf = requestAnimationFrame(frame)
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = mouse.y = -9999
    }
    const onResize = () => build()
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)
    window.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={`absolute inset-0 h-full w-full ${className}`} />
}
