import { Check } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Button, Reveal, SectionHead } from '../components/ui'

const services = [
  {
    n: '01',
    title: 'Cálculo Estrutural',
    text: 'Projeto estrutural completo com memorial de cálculo, plantas de formas e armação e emissão de ART.',
    items: ['Concreto armado e protendido', 'Estruturas metálicas e de madeira', 'Fundações (sapatas, estacas, radier)', 'Contenções e muros de arrimo', 'Laudos, reforços e análise de patologias'],
  },
  {
    n: '02',
    title: 'Projetos Arquitetônicos',
    text: 'Concepção e desenvolvimento do projeto, com aprovação nos órgãos competentes e compatibilização com os complementares.',
    items: ['Estudo preliminar e anteprojeto', 'Projeto legal e executivo', 'Reformas e regularização (As Built)', 'Compatibilização com os projetos complementares'],
  },
  {
    n: '03',
    title: 'Projetos Complementares',
    text: 'Projetos das demais disciplinas da edificação, desenvolvidos de forma integrada ao estrutural e ao arquitetônico.',
    items: ['Hidrossanitário e águas pluviais', 'Elétrico e cabeamento estruturado', 'SPDA (para-raios) e aterramento', 'Prevenção e combate a incêndio (PPCI)', 'Gás e climatização', 'Compatibilização entre disciplinas'],
  },
  {
    n: '04',
    title: 'Orçamentação',
    text: 'Levantamento de quantitativos e orçamento com base em tabelas oficiais (como SINAPI) e cotações de mercado.',
    items: ['Quantitativos e composições de custo', 'Cronograma físico-financeiro', 'Planilhas para licitação e financiamento', 'Análise de viabilidade'],
  },
  {
    n: '05',
    title: 'Administração de Obras',
    text: 'Gerenciamento da execução para garantir prazo, qualidade e controle de custos.',
    items: ['Planejamento e controle de cronograma', 'Gestão de equipes e fornecedores', 'Fiscalização e controle tecnológico', 'Medições e prestação de contas'],
  },
]

const steps = [
  ['Briefing', 'Entendemos escopo, terreno, prazo e orçamento.'],
  ['Proposta', 'Escopo, cronograma e honorários claros.'],
  ['Desenvolvimento', 'Projeto e cálculo com revisões acordadas.'],
  ['Entrega', 'Documentos, ART e suporte na execução.'],
]

export default function Services() {
  return (
    <>
      <PageHero eyebrow="Serviços" title={<>O que a Atlas <em>entrega</em></>}>
        Cinco frentes que se complementam: você pode contratar uma etapa ou o pacote completo.
      </PageHero>

      <section className="bg-navy py-24">
        <div className="mx-auto max-w-7xl px-6">
          {services.map((s) => (
            <Reveal key={s.n} className="grid gap-8 border-t border-mist/10 py-14 md:grid-cols-[120px_1fr_1fr]">
              <span className="font-display text-6xl text-steel/60">{s.n}</span>
              <div>
                <h2 className="mb-4 text-3xl md:text-4xl">{s.title}</h2>
                <p className="max-w-md leading-relaxed text-mist/65">{s.text}</p>
              </div>
              <ul className="space-y-3">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-sm text-mist/80">
                    <Check size={16} className="mt-0.5 shrink-0 text-steel" /> {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-mist py-24 text-navy">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead eyebrow="Como trabalhamos" title={<>Um processo <em>claro</em></>} />
          <div className="grid gap-8 md:grid-cols-4">
            {steps.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.1}>
                <div className="border-t-2 border-navy pt-5">
                  <span className="eyebrow !text-slate">Etapa {i + 1}</span>
                  <h3 className="mb-2 mt-2 text-2xl">{t}</h3>
                  <p className="text-sm leading-relaxed text-slate">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-24 text-center">
        <Reveal>
          <Button to="/contato">Solicitar orçamento</Button>
        </Reveal>
      </section>
    </>
  )
}
