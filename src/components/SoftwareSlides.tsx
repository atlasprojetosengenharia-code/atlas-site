import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

const slides = [
  { src: '/images/software/tela-01.jpg', tab: 'Início', title: 'Tela inicial', text: 'Novo projeto, normas ABNT aplicadas e manual do usuário integrado.' },
  { src: '/images/software/tela-02.jpg', tab: 'Sondagem SPT', title: 'Sondagem SPT', text: 'Camadas, NSPT e correlações ajustáveis, nível d’água e perfil do solo em tempo real.' },
  { src: '/images/software/tela-03.jpg', tab: 'Gravidade', title: 'Muro de gravidade', text: 'Tombamento, deslizamento, tensões na base e pré-visualização com diagrama de empuxo.' },
  { src: '/images/software/tela-04.jpg', tab: 'Flexão', title: 'Muro de flexão', text: 'Muro em concreto armado com verificações da parede e da sapata e detalhamento da armadura.' },
  { src: '/images/software/tela-05.jpg', tab: 'Cortina', title: 'Cortina atirantada', text: 'Tirantes por nível, cargas de trabalho e de ensaio conforme a NBR 5629.' },
  { src: '/images/software/tela-06.jpg', tab: 'Estaca-prancha', title: 'Estaca-prancha', text: 'Ficha de projeto, momento máximo e módulo resistente do perfil.' },
  { src: '/images/software/tela-07.jpg', tab: 'Estacas', title: 'Parede de estacas', text: 'Estacas justapostas, secantes ou espaçadas, com taxa de armadura e espaçamentos.' },
  { src: '/images/software/tela-08.jpg', tab: 'Grampeado', title: 'Solo grampeado', text: 'Cunha crítica, arrancamento e tração dos grampos, verificação da face (NBR 16920-2).' },
]

/** Slides das telas reais do software: janela compacta, autoplay, miniaturas e ampliação. */
export default function SoftwareSlides() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const [hover, setHover] = useState(false)
  const [zoom, setZoom] = useState(false)
  const n = slides.length

  const go = useCallback((d: number) => {
    setDir(d)
    setI((v) => (v + d + n) % n)
  }, [n])
  const pick = (k: number) => {
    setDir(k > i ? 1 : -1)
    setI(k)
  }

  useEffect(() => {
    if (hover || zoom || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => go(1), 5500)
    return () => clearInterval(id)
  }, [hover, zoom, go, i])

  const s = slides[i]
  const variants = {
    enter: (d: number) => ({ x: d * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -40, opacity: 0 }),
  }

  return (
    <div className="mx-auto max-w-3xl" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="overflow-hidden rounded-xl border border-mist/15 bg-navy-deep shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-mist/10 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-mist/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-mist/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-mist/25" />
          <span className="ml-3 text-[0.68rem] tracking-wider text-mist/45">Calculadora de Contenções · {s.title}</span>
          <button onClick={() => setZoom(true)} className="ml-auto rounded p-1 text-mist/50 transition hover:text-mist" aria-label="Ampliar tela">
            <Maximize2 size={14} />
          </button>
        </div>

        <div className="relative aspect-[1600/867] w-full bg-mist">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.img
              key={s.src}
              src={s.src}
              alt={`Software Calculadora de Contenções: ${s.title}`}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute inset-0 h-full w-full cursor-zoom-in object-cover"
              onClick={() => setZoom(true)}
              draggable={false}
            />
          </AnimatePresence>
          <button onClick={() => go(-1)} aria-label="Slide anterior" className="glass absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 hover:bg-mist/20">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => go(1)} aria-label="Próximo slide" className="glass absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 hover:bg-mist/20">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="mt-5 min-h-[3.2rem] text-center" aria-live="polite">
        <p className="text-lg font-medium">
          {s.title} <span className="text-sm font-normal text-mist/40">· {i + 1}/{n}</span>
        </p>
        <p className="mx-auto mt-1 max-w-xl text-sm leading-relaxed text-mist/60">{s.text}</p>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Telas do software">
        {slides.map((t, k) => (
          <button
            key={t.src}
            role="tab"
            aria-selected={k === i}
            onClick={() => pick(k)}
            className={`rounded-full border px-3.5 py-1.5 text-[0.66rem] uppercase tracking-[0.16em] transition-colors duration-300 ${
              k === i ? 'border-mist bg-mist text-navy' : 'border-mist/25 text-mist/65 hover:border-mist/60 hover:text-mist'
            }`}
          >
            {t.tab}
          </button>
        ))}
      </div>

      <Dialog.Root open={zoom} onOpenChange={setZoom}>
        <AnimatePresence>
          {zoom && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div className="fixed inset-0 z-[70] bg-navy-deep/90 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
              </Dialog.Overlay>
              <Dialog.Content asChild aria-describedby={undefined}>
                <motion.div className="fixed inset-0 z-[70] flex flex-col items-center justify-center p-4 md:p-10" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}>
                  <Dialog.Title className="sr-only">{s.title}</Dialog.Title>
                  <Dialog.Close className="absolute right-5 top-5 rounded-full border border-mist/25 p-2.5 hover:bg-mist/10" aria-label="Fechar">
                    <X size={20} />
                  </Dialog.Close>
                  <img src={s.src} alt={s.title} className="max-h-[82vh] max-w-full rounded-lg shadow-2xl" />
                  <p className="mt-4 text-sm text-mist/70">{s.title}</p>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </div>
  )
}
