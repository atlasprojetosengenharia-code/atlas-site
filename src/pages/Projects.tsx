import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Lightbox, LazyImage } from '../components/Gallery'
import PageHero from '../components/PageHero'
import { categories, imageUrl, projects, type CategoryId, type Project } from '../config/projectsData'
import { Flip, gsap, prefersReducedMotion } from '../lib/motion'

export default function Projects() {
  const [filter, setFilter] = useState<'all' | CategoryId>('all')
  const [open, setOpen] = useState<Project | null>(null)
  const grid = useRef<HTMLDivElement>(null)
  const state = useRef<Flip.FlipState | null>(null)

  const pick = (f: 'all' | CategoryId) => {
    if (f === filter) return
    // Flip: guarda o estado antes de alterar o layout e anima a transição
    if (grid.current && !prefersReducedMotion()) state.current = Flip.getState(grid.current.querySelectorAll('[data-card]'))
    setFilter(f)
  }

  useGSAP(
    () => {
      if (!state.current || !grid.current) return
      Flip.from(state.current, {
        targets: grid.current.querySelectorAll('[data-card]'),
        duration: 0.7,
        ease: 'power3.inOut',
        scale: true,
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.2 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.3 }),
      })
      state.current = null
    },
    { dependencies: [filter], scope: grid },
  )

  const list = projects.filter((p) => filter === 'all' || p.category === filter)
  const label = (id: CategoryId) => categories.find((c) => c.id === id)!.label

  return (
    <>
      <PageHero eyebrow="Projetos" title={<>Obras e projetos <em>em destaque</em></>}>
        Uma seleção de trabalhos de estrutura, geotecnia, contenções e edificações comerciais.
      </PageHero>

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-wrap gap-3" role="tablist" aria-label="Filtrar projetos">
            {[{ id: 'all' as const, label: 'Todos' }, ...categories].map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={filter === c.id}
                onClick={() => pick(c.id)}
                className={`rounded-full border px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
                  filter === c.id ? 'border-mist bg-mist text-navy' : 'border-mist/25 text-mist/75 hover:border-mist/60 hover:text-mist'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div ref={grid} className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <article key={p.id} data-card className="group cursor-pointer" onClick={() => setOpen(p)}>
                <button className="block w-full text-left" aria-label={`Abrir galeria: ${p.title}`}>
                  <div className="relative overflow-hidden rounded-xl">
                    <LazyImage src={imageUrl(p, p.images[0])} alt={p.title} className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="glass absolute right-4 top-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={18} />
                    </span>
                    {p.placeholder && <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em]">Em breve</span>}
                  </div>
                  <p className="eyebrow mt-5 !text-[0.65rem]">{label(p.category)}</p>
                  <h3 className="mt-2 text-2xl transition-colors group-hover:text-steel">{p.title}</h3>
                  <p className="mt-2 text-sm text-mist/55">
                    {p.location}
                    {p.year ? ` · ${p.year}` : ''}
                  </p>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Lightbox project={open} onClose={() => setOpen(null)} />
    </>
  )
}
