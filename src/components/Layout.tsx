import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Mail, Phone, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav, site } from '../config/site'
import { Instagram } from './ui'
import { Button } from './ui'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-mist/10 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" aria-label={`${site.name} – início`} className="block">
          <img src="/brand/logo-h-light.png" alt={site.name} className="h-9 w-auto md:h-10" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Principal">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className="relative py-1 text-[0.72rem] uppercase tracking-[0.22em] text-mist/75 transition-colors hover:text-mist">
              {({ isActive }) => (
                <>
                  <span className={isActive ? 'text-mist' : ''}>{n.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 h-px w-full bg-steel"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <Button to="/contato" variant="ghost" className="!px-5 !py-2.5">
            Orçamento
          </Button>
        </nav>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="p-2 text-mist md:hidden" aria-label="Abrir menu">
            <Menu size={26} />
          </Dialog.Trigger>
          <AnimatePresence>
            {open && (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild>
                  <motion.div className="fixed inset-0 z-50 bg-navy-deep/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                </Dialog.Overlay>
                <Dialog.Content asChild aria-describedby={undefined}>
                  <motion.aside
                    className="fixed right-0 top-0 z-50 flex h-full w-[82%] max-w-sm flex-col bg-navy p-8 shadow-2xl"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', ease: [0.2, 0.8, 0.2, 1], duration: 0.5 }}
                  >
                    <Dialog.Title className="sr-only">Menu</Dialog.Title>
                    <Dialog.Close className="mb-10 self-end p-2" aria-label="Fechar menu">
                      <X size={26} />
                    </Dialog.Close>
                    <nav className="flex flex-col gap-6" aria-label="Mobile">
                      {nav.map((n, i) => (
                        <motion.div key={n.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }}>
                          <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => `font-display text-3xl ${isActive ? 'text-mist' : 'text-mist/60'}`}>
                            {n.label}
                          </NavLink>
                        </motion.div>
                      ))}
                    </nav>
                    <img src="/brand/seal-light.png" alt="" className="mt-auto w-32 self-center opacity-30" />
                  </motion.aside>
                </Dialog.Content>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t border-mist/10 bg-navy-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src="/brand/logo-light.png" alt={site.name} className="mb-6 w-44" />
          <p className="max-w-sm text-sm leading-relaxed text-mist/60">
            Projetos estruturais, geotecnia, orçamentação e administração de obras, com responsabilidade técnica e transparência em cada etapa.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-5">Navegação</p>
          <ul className="space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="link-u text-mist/75 hover:text-mist">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5">Contato</p>
          <ul className="space-y-3 text-sm text-mist/75">
            {site.email && <li className="flex items-center gap-3"><Mail size={15} className="text-steel" /> <a className="link-u" href={`mailto:${site.email}`}>{site.email}</a></li>}
            {site.phone && <li className="flex items-center gap-3"><Phone size={15} className="text-steel" /> <a className="link-u" href={`tel:+55${site.phone.replace(/\D/g, '')}`}>{site.phone}</a></li>}
            {site.instagram && <li className="flex items-center gap-3"><Instagram size={15} className="text-steel" /> <a className="link-u" href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer">@{site.instagram}</a></li>}
            {site.city && <li className="flex items-center gap-3"><MapPin size={15} className="text-steel" /> {site.city}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-mist/10 px-6 py-6 text-center text-xs text-mist/45">
        © {new Date().getFullYear()} {site.legalName}
        {site.cnpj && ` · CNPJ ${site.cnpj}`}
        {site.crea && ` · ${site.crea}`}
        {site.responsible && ` · Resp. técnico: ${site.responsible}`}
      </div>
    </footer>
  )
}
