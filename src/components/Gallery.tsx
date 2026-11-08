import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { imageUrl, type Project } from '../config/projectsData'

/** Imagem lazy: shimmer enquanto carrega; se o arquivo não existir, mostra placeholder da marca. */
export function LazyImage({ src, alt, className = '', contain = false }: { src: string; alt: string; className?: string; contain?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    setState('loading')
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setNear(true), io.disconnect()), { rootMargin: '300px' })
    io.observe(el)
    return () => io.disconnect()
  }, [src])

  return (
    <div ref={ref} className={`relative overflow-hidden bg-navy-deep ${className}`}>
      {state !== 'ok' && (
        <div className={`absolute inset-0 ${state === 'loading' ? 'skeleton' : 'grid place-items-center bg-gradient-to-br from-slate/50 to-navy-deep'}`}>
          {state === 'error' && <img src="/brand/symbol-light.png" alt="" className="w-1/4 opacity-40" />}
        </div>
      )}
      {near && state !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setState('ok')}
          onError={() => setState('error')}
          className={`h-full w-full transition-opacity duration-700 ${contain ? 'object-contain' : 'object-cover'} ${state === 'ok' ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  )
}

/** Lightbox modal com carrossel (setas, teclado e miniaturas). */
export function Lightbox({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const n = project?.images.length ?? 0

  useEffect(() => setI(0), [project])

  const go = useCallback(
    (d: number) => {
      if (!n) return
      setDir(d)
      setI((v) => (v + d + n) % n)
    },
    [n],
  )

  useEffect(() => {
    if (!project) return
    const k = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [project, go])

  return (
    <Dialog.Root open={!!project} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {project && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div className="fixed inset-0 z-[70] bg-navy-deep/90 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            </Dialog.Overlay>
            <Dialog.Content asChild aria-describedby={undefined} data-lenis-prevent>
              <motion.div
                className="fixed inset-0 z-[70] flex flex-col p-4 md:p-10"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-4 flex items-start justify-between gap-6">
                  <div>
                    <Dialog.Title className="font-display text-2xl md:text-3xl">{project.title}</Dialog.Title>
                    <p className="mt-1 text-sm text-mist/60">
                      {project.location}
                      {project.year ? ` · ${project.year}` : ''} · {i + 1}/{n}
                    </p>
                  </div>
                  <Dialog.Close className="rounded-full border border-mist/25 p-2.5 transition hover:bg-mist/10" aria-label="Fechar">
                    <X size={20} />
                  </Dialog.Close>
                </div>

                <div className="relative min-h-0 flex-1">
                  <AnimatePresence initial={false} custom={dir} mode="popLayout">
                    <motion.div
                      key={i}
                      custom={dir}
                      className="absolute inset-0"
                      variants={{
                        enter: (d: number) => ({ x: d * 80, opacity: 0 }),
                        center: { x: 0, opacity: 1 },
                        exit: (d: number) => ({ x: d * -80, opacity: 0 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(_, info) => Math.abs(info.offset.x) > 80 && go(info.offset.x < 0 ? 1 : -1)}
                    >
                      <LazyImage src={imageUrl(project, project.images[i])} alt={`${project.title}, foto ${i + 1}`} contain className="h-full w-full rounded-xl" />
                    </motion.div>
                  </AnimatePresence>
                  {n > 1 && (
                    <>
                      <button onClick={() => go(-1)} aria-label="Anterior" className="glass absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 hover:bg-mist/15">
                        <ChevronLeft />
                      </button>
                      <button onClick={() => go(1)} aria-label="Próxima" className="glass absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-3 hover:bg-mist/15">
                        <ChevronRight />
                      </button>
                    </>
                  )}
                </div>

                {n > 1 && (
                  <div className="mt-4 flex justify-center gap-2">
                    {project.images.map((f, k) => (
                      <button
                        key={f}
                        onClick={() => {
                          setDir(k > i ? 1 : -1)
                          setI(k)
                        }}
                        aria-label={`Foto ${k + 1}`}
                        className={`h-14 w-20 overflow-hidden rounded-md border transition ${k === i ? 'border-mist' : 'border-mist/20 opacity-60 hover:opacity-100'}`}
                      >
                        <LazyImage src={imageUrl(project, f)} alt="" className="h-full w-full" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
