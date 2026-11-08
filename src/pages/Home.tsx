import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { ArrowRight, Calculator, ClipboardList, HardHat, Layers3, PencilRuler, ShieldCheck, FileCheck2, Cpu, Eye } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import HeroCanvas from '../components/HeroCanvas'
import { SoftwareCard } from '../components/SoftwareShowcase'
import { Button, ParallaxPattern, Reveal, SectionHead, SplitReveal } from '../components/ui'
import { gsap, prefersReducedMotion } from '../lib/motion'

const services = [
  { icon: Calculator, title: 'Cálculo Estrutural', text: 'Dimensionamento em concreto, aço e madeira, fundações e contenções.' },
  { icon: PencilRuler, title: 'Projetos Arquitetônicos', text: 'Do estudo preliminar ao projeto executivo, compatibilizado.' },
  { icon: Layers3, title: 'Projetos Complementares', text: 'Hidrossanitário, elétrico, SPDA, incêndio e demais disciplinas integradas.' },
  { icon: ClipboardList, title: 'Orçamentação', text: 'Quantitativos, composições de custo e cronograma físico-financeiro.' },
  { icon: HardHat, title: 'Administração de Obras', text: 'Gestão de prazo, qualidade e custo até a entrega.' },
]

const trust = [
  { icon: ShieldCheck, title: 'Responsabilidade técnica', text: 'Projetos com ART e responsável técnico habilitado.' },
  { icon: FileCheck2, title: 'Normas ABNT', text: 'Dimensionamento e verificações segundo as normas aplicáveis a cada caso.' },
  { icon: Cpu, title: 'Ferramentas próprias', text: 'Software desenvolvido internamente para cálculos geotécnicos e estruturais.' },
  { icon: Eye, title: 'Transparência', text: 'Memoriais, premissas e orçamentos claros para o cliente acompanhar.' },
]

function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('[data-hero-fade]', { opacity: 0, y: 24, duration: 1, stagger: 0.12, delay: 1.1, ease: 'power3.out' })
      gsap.to('[data-hero-parallax]', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-slate/70 via-navy to-navy-deep">
      <div data-hero-parallax className="absolute inset-0">
        <HeroCanvas />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgb(21_37_62/0.0),rgb(13_24_41/0.75)_75%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-28">
        <p data-hero-fade className="eyebrow mb-8">Projetos e Engenharia</p>
        <SplitReveal as="h1" onLoad delay={0.9} className="max-w-4xl text-5xl leading-[1.05] md:text-7xl lg:text-[5.5rem]">
          Engenharia que sustenta <em>cada etapa</em> da sua obra
        </SplitReveal>
        <p data-hero-fade className="mt-9 max-w-xl text-base leading-relaxed text-mist/70 md:text-lg">
          Cálculo estrutural, geotecnia, projetos arquitetônicos e complementares, orçamentação e administração de obras, com rigor técnico do primeiro traço à entrega.
        </p>
        <div data-hero-fade className="mt-11 flex flex-wrap gap-4">
          <Button to="/contato">
            Solicitar orçamento <ArrowRight size={16} />
          </Button>
          <Button to="/software" variant="ghost">
            Conhecer o software
          </Button>
        </div>
      </div>

      <div data-hero-fade className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="eyebrow !text-[0.6rem]">Role</span>
        <motion.span className="h-10 w-px bg-steel/60" animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="relative overflow-hidden bg-mist py-28 text-navy">
      <ParallaxPattern className="!opacity-[0.05] [filter:invert(1)_brightness(0.2)]" speed={80} />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <p className="eyebrow mb-5 !text-slate">Sobre a Atlas</p>
          </Reveal>
          <SplitReveal as="h2" className="text-4xl leading-[1.1] md:text-6xl">
            Precisão técnica com <em>olhar de obra</em>
          </SplitReveal>
        </div>
        <div className="space-y-5 leading-relaxed text-slate">
          <Reveal>
            <p>
              A Atlas Projetos e Engenharia reúne projeto, cálculo e gestão em uma única equipe. Entendemos a obra por dentro: cada decisão estrutural considera custo, prazo e execução.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Além dos serviços, desenvolvemos nossos próprios softwares de engenharia, aplicados nos nossos projetos e disponibilizados para download.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/servicos" className="link-u inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-navy">
              Ver serviços <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="relative bg-navy py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Serviços" title={<>Soluções integradas, do <em>projeto</em> à obra</>}>
          Um único parceiro técnico para que sua obra seja segura, econômica e executável.
        </SectionHead>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-mist/10 bg-mist/10 sm:grid-cols-2 lg:grid-cols-5">
          {services.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08} className="group relative bg-navy p-7 transition-colors duration-500 hover:bg-slate/30">
              <Icon size={30} strokeWidth={1.2} className="mb-8 text-steel transition-transform duration-500 group-hover:-translate-y-1" />
              <h3 className="mb-3 text-2xl">{title}</h3>
              <p className="text-sm leading-relaxed text-mist/60">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Trust() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Por que a Atlas" title={<>Confiança construída em <em>método</em></>} />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="border-t border-steel/40 pt-6">
                <Icon size={24} strokeWidth={1.3} className="mb-5 text-steel" />
                <h3 className="mb-2 text-xl">{title}</h3>
                <p className="text-sm leading-relaxed text-mist/60">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <section className="bg-navy px-6 pb-28">
        <div className="mx-auto max-w-7xl">
          <SoftwareCard compact />
        </div>
      </section>
      <Trust />
      <section className="relative overflow-hidden bg-slate/40 py-24 text-center">
        <div className="relative mx-auto max-w-3xl px-6">
          <SplitReveal as="h2" className="text-4xl leading-tight md:text-5xl">
            Vamos tirar o seu <em>projeto</em> do papel?
          </SplitReveal>
          <Reveal delay={0.2} className="mt-10">
            <Button to="/contato">Fale com a Atlas</Button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
