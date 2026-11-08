import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, useEffect, type ReactNode } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer, Navbar } from './components/Layout'
import { ScrollTrigger, useLenis } from './lib/motion'
import Home from './pages/Home'

const Services = lazy(() => import('./pages/Services'))
const Software = lazy(() => import('./pages/Software'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))

const titles: Record<string, string> = {
  '/': 'Atlas Projetos e Engenharia | Cálculo Estrutural, Projetos e Obras',
  '/servicos': 'Serviços | Atlas Projetos e Engenharia',
  '/software': 'Calculadora de Contenções | Atlas Projetos e Engenharia',
  '/projetos': 'Projetos | Atlas Projetos e Engenharia',
  '/contato': 'Contato | Atlas Projetos e Engenharia',
}

/** Transição de página: cortina (wipe) com o símbolo da marca + fade do conteúdo. */
function Page({ children }: { children: ReactNode }) {
  const lenis = useLenis()
  // Cada rota monta um <Page> novo (key = pathname): volta ao topo e recalcula os gatilhos.
  useEffect(() => {
    window.scrollTo(0, 0)
    lenis?.scrollTo(0, { immediate: true })
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 900)
    return () => window.clearTimeout(t)
  }, [lenis])
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] grid place-items-center bg-navy-deep"
        style={{ originY: 0 }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.12 } }}
        exit={{ scaleY: 1, originY: 1, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
      >
        <motion.img
          src="/brand/symbol-light.png"
          alt=""
          className="w-24"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { duration: 0.25 } }}
          exit={{ opacity: 1, transition: { delay: 0.25, duration: 0.25 } }}
        />
      </motion.div>
    </motion.main>
  )
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    document.title = titles[location.pathname] ?? titles['/']
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait" initial={true}>
        <Page key={location.pathname}>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/servicos" element={<Services />} />
              <Route path="/software" element={<Software />} />
              <Route path="/projetos" element={<Projects />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
          <Footer />
        </Page>
      </AnimatePresence>
    </>
  )
}
