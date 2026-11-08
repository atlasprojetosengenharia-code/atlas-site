import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { useRef, type ElementType, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { gsap, prefersReducedMotion, ScrollTrigger, SplitText } from '../lib/motion'

/** Título com revelação linha a linha (lógica SplitText do GSAP). */
export function SplitReveal({
  as: Tag = 'h2',
  className,
  children,
  delay = 0,
  onLoad = false,
}: {
  as?: ElementType
  className?: string
  children: ReactNode
  delay?: number
  /** true = anima ao montar (hero); false = ao rolar até o elemento */
  onLoad?: boolean
}) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return
      let cancelled = false
      document.fonts.ready.then(() => {
        if (cancelled) return
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.1,
              delay,
              stagger: 0.09,
              ease: 'power4.out',
              scrollTrigger: onLoad ? undefined : { trigger: el, start: 'top 88%', once: true },
            }),
        })
      })
      return () => {
        cancelled = true
      }
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/** Entrada suave ao rolar. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 32,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Efeito magnético: o botão acompanha o cursor. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion() || window.matchMedia('(hover: none)').matches) return
      const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
      const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        x((e.clientX - (r.left + r.width / 2)) * strength)
        y((e.clientY - (r.top + r.height / 2)) * strength)
      }
      const leave = () => {
        x(0)
        y(0)
      }
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
      return () => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
      }
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="inline-block">
      {children}
    </div>
  )
}

type BtnProps = {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  glow?: boolean
  to?: string
  href?: string
  className?: string
  external?: boolean
}

/** Botão com tint que muda no hover + efeito magnético. */
export function Button({ children, variant = 'primary', glow, to, href, className = '', external }: BtnProps) {
  const base =
    'group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500'
  const styles =
    variant === 'primary'
      ? 'bg-mist text-navy hover:bg-steel'
      : 'border border-mist/40 text-mist hover:border-mist hover:bg-mist/10'
  const cls = `${base} ${styles} ${glow ? 'animate-pulse-glow' : ''} ${className}`
  const inner = <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
  return (
    <Magnetic>
      {to ? (
        <Link to={to} className={cls}>
          {inner}
        </Link>
      ) : (
        <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {inner}
        </a>
      )}
    </Magnetic>
  )
}

/** Fundo com estampa da marca e parallax no scroll. */
export function ParallaxPattern({ className = '', speed = 120 }: { className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return
      gsap.to(el, {
        yPercent: speed / 4,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      return () => ScrollTrigger.refresh()
    },
    { scope: ref },
  )
  return <div ref={ref} aria-hidden className={`pattern pointer-events-none absolute inset-x-0 -top-1/4 h-[150%] ${className}`} />
}

export function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="mb-14 max-w-2xl">
      <Reveal>
        <p className="eyebrow mb-5">{eyebrow}</p>
      </Reveal>
      <SplitReveal as="h2" className="text-4xl leading-[1.1] md:text-5xl">
        {title}
      </SplitReveal>
      {children && (
        <Reveal delay={0.15}>
          <p className="mt-6 leading-relaxed text-mist/70">{children}</p>
        </Reveal>
      )}
    </div>
  )
}

/** lucide-react removeu ícones de marcas; ícone do GitHub inline. */
export function Github({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}
