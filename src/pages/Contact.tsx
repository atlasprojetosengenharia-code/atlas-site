import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import PageHero from '../components/PageHero'
import { Reveal } from '../components/ui'
import { site } from '../config/site'

const services = ['Cálculo estrutural', 'Projeto arquitetônico', 'Orçamentação', 'Administração de obras', 'Contenções / Geotecnia', 'Outro']

const field = 'w-full border-b border-mist/25 bg-transparent py-3 text-mist placeholder:text-mist/35 transition-colors focus:border-steel focus:outline-none'

export default function Contact() {
  const [sent, setSent] = useState(false)

  /*
   * Sem backend: o formulário abre o e-mail do visitante já preenchido (mailto).
   * Para envio direto, troque por um serviço como Formspree: fetch('https://formspree.io/f/SEU_ID', ...)
   */
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    const body = `Nome: ${d.nome}\nE-mail: ${d.email}\nTelefone: ${d.telefone || '-'}\nServiço: ${d.servico}\n\n${d.mensagem}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Contato pelo site: ' + d.servico)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const items = [
    { icon: Mail, label: 'E-mail', value: site.email, href: `mailto:${site.email}` },
    site.phone && { icon: Phone, label: 'Telefone', value: site.phone, href: `tel:${site.phone.replace(/\D/g, '')}` },
    site.whatsapp && { icon: MessageCircle, label: 'WhatsApp', value: 'Conversar agora', href: `https://wa.me/${site.whatsapp}` },
    site.city && { icon: MapPin, label: 'Localização', value: site.city },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href?: string }[]

  return (
    <>
      <PageHero eyebrow="Contato" title={<>Conte sobre o seu <em>projeto</em></>}>
        Descreva o que você precisa e retornamos com os próximos passos.
      </PageHero>

      <section className="bg-navy py-20">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <ul className="space-y-8">
              {items.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-mist/20">
                    <Icon size={18} className="text-steel" />
                  </span>
                  <div>
                    <p className="eyebrow !text-[0.65rem]">{label}</p>
                    {href ? (
                      <a href={href} className="link-u mt-1 inline-block text-lg">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-lg">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <img src="/brand/seal-light.png" alt="" className="mt-16 hidden w-40 opacity-20 lg:block" />
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="grid gap-8 rounded-2xl border border-mist/10 bg-navy-deep/60 p-8 md:p-10">
              <div className="grid gap-8 md:grid-cols-2">
                <label className="block"><span className="eyebrow !text-[0.65rem]">Nome</span><input name="nome" required autoComplete="name" className={field} placeholder="Seu nome" /></label>
                <label className="block"><span className="eyebrow !text-[0.65rem]">E-mail</span><input name="email" type="email" required autoComplete="email" className={field} placeholder="voce@email.com" /></label>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <label className="block"><span className="eyebrow !text-[0.65rem]">Telefone</span><input name="telefone" type="tel" autoComplete="tel" className={field} placeholder="(00) 00000-0000" /></label>
                <label className="block">
                  <span className="eyebrow !text-[0.65rem]">Serviço</span>
                  <select name="servico" className={`${field} [&>option]:bg-navy`}>{services.map((s) => <option key={s}>{s}</option>)}</select>
                </label>
              </div>
              <label className="block"><span className="eyebrow !text-[0.65rem]">Mensagem</span><textarea name="mensagem" required rows={5} className={`${field} resize-none`} placeholder="Descreva o projeto, local e prazo desejado" /></label>
              <div className="flex flex-wrap items-center gap-6">
                <button type="submit" className="rounded-full bg-mist px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-navy transition-colors duration-500 hover:bg-steel">
                  Enviar mensagem
                </button>
                {sent && <p role="status" className="text-sm text-steel">Abrimos seu aplicativo de e-mail para concluir o envio.</p>}
              </div>
              <p className="text-xs text-mist/40">Usamos seus dados apenas para responder ao seu contato (LGPD).</p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
