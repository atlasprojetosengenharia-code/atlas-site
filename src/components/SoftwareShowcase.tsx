import { motion } from 'framer-motion'
import { Cpu, Download, Droplets, Layers, ScrollText } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { software } from '../config/site'
import { Button, Reveal } from './ui'

const badges = [
  { icon: Cpu, label: 'Rust Engine' },
  { icon: ScrollText, label: 'SPT Boring Logs Processing' },
  { icon: Layers, label: 'Structural Stability' },
  { icon: Droplets, label: 'Hydraulic Stability' },
]

const lines = [
  { t: 'cmd', s: '$ calculadora-contencoes --sondagem furo_01.spt --perfil muro_gravidade' },
  { t: 'info', s: '› Lendo sondagem SPT ........ 12 camadas · NSPT 4 → 38' },
  { t: 'info', s: "› Parâmetros: φ' = 30° · c' = 8 kPa · γ = 18,5 kN/m³" },
  { t: 'info', s: '› Empuxo ativo (Rankine) .... Ea = 62,4 kN/m' },
  { t: 'ok', s: '✓ Tombamento ................ FS = 2,31   (mín. 2,00)' },
  { t: 'ok', s: '✓ Deslizamento .............. FS = 1,84   (mín. 1,50)' },
  { t: 'ok', s: '✓ Tensão na base ............ σmáx = 187 kPa' },
  { t: 'ok', s: '✓ Estabilidade global ....... FS = 1,62   (mín. 1,50)' },
  { t: 'end', s: '■ Verificação concluída em 0,04 s' },
]

/** Janela de terminal que "digita" a saída quando entra na tela. */
export function TerminalMock() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setStarted(true), io.disconnect()), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return setShown(lines.length)
    const id = setInterval(() => setShown((n) => (n >= lines.length ? n : n + 1)), 520)
    return () => clearInterval(id)
  }, [started])

  const color = { cmd: 'text-mist', info: 'text-steel', ok: 'text-emerald-300/90', end: 'text-mist/60' } as const

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-mist/15 bg-navy-deep shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-mist/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-mist/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-mist/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-mist/25" />
        <span className="ml-3 text-[0.7rem] tracking-wider text-mist/45">atlas · estabilidade</span>
      </div>
      <div className="min-h-[300px] space-y-1.5 overflow-x-auto p-5 font-mono text-[0.74rem] leading-relaxed md:text-[0.8rem]" aria-live="polite">
        {lines.slice(0, shown).map((l, i) => (
          <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className={`whitespace-pre ${color[l.t as keyof typeof color]}`}>
            {l.s}
          </motion.p>
        ))}
        {shown < lines.length && <span className="inline-block h-4 w-2 animate-pulse bg-mist/70" />}
      </div>
      <p className="border-t border-mist/10 px-5 py-3 text-[0.68rem] text-mist/40">Saída ilustrativa: valores meramente demonstrativos.</p>
    </div>
  )
}

export function SoftwareCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-mist/15 bg-gradient-to-br from-navy-deep via-navy to-slate/40 p-8 md:p-12">
      <div aria-hidden className="pattern pointer-events-none absolute -right-20 -top-20 h-[130%] w-1/2 opacity-[0.04]" />
      <div className={`relative grid items-center gap-12 ${compact ? 'lg:grid-cols-[1fr_1fr]' : 'lg:grid-cols-[1fr_1.1fr]'}`}>
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Software proprietário</p>
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-amber-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" /> Versão pré-alpha · em desenvolvimento e teste
            </p>
            <h3 className="mb-5 text-4xl leading-tight md:text-5xl">
              {software.name.split(' ')[0]} <em>{software.name.split(' ').slice(1).join(' ')}</em>
            </h3>
            <p className="mb-7 max-w-lg leading-relaxed text-mist/70">
              Ferramenta de cálculo geotécnico e estrutural desenvolvida pela Atlas para verificar a estabilidade de sistemas de contenção a partir de sondagens SPT. O programa está em fase de desenvolvimento e teste (pré-alpha): recursos e resultados podem mudar.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mb-9 flex flex-wrap gap-2.5">
              {badges.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 rounded-full border border-mist/20 bg-mist/5 px-4 py-2 text-xs tracking-wide text-mist/85">
                  <Icon size={14} className="text-steel" /> {label}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <Button href={software.releases} external glow>
                <Download size={16} /> Baixar Versão Recente
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <TerminalMock />
        </Reveal>
      </div>
    </div>
  )
}
