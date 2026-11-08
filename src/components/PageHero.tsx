import type { ReactNode } from 'react'
import { ParallaxPattern, Reveal, SplitReveal } from './ui'

export default function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate/60 via-navy to-navy-deep pb-20 pt-40">
      <ParallaxPattern className="!opacity-[0.035]" speed={100} />
      <div className="relative mx-auto max-w-7xl px-6">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <SplitReveal as="h1" onLoad delay={0.85} className="max-w-4xl text-5xl leading-[1.05] md:text-7xl">
          {title}
        </SplitReveal>
        {children && (
          <Reveal delay={0.9}>
            <p className="mt-8 max-w-xl leading-relaxed text-mist/70">{children}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
