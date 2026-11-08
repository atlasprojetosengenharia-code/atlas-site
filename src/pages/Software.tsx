import { Download, Scale } from 'lucide-react'
import PageHero from '../components/PageHero'
import { SoftwareCard } from '../components/SoftwareShowcase'
import SoftwareSlides from '../components/SoftwareSlides'
import { Button, Reveal, SectionHead } from '../components/ui'
import { software } from '../config/site'

const steps = [
  ['Acesse as Releases', 'Abra a página de versões no GitHub e escolha a mais recente.'],
  ['Baixe o instalador', 'Faça o download do arquivo da sua plataforma na seção "Assets".'],
  ['Execute e calcule', 'Importe sua sondagem SPT, defina o perfil da contenção e verifique a estabilidade.'],
]

export default function Software() {
  return (
    <>
      <PageHero eyebrow="Software" title={<>Calculadora de <em>Contenções</em></>}>
        Ferramenta própria da Atlas, em fase de desenvolvimento e teste (versão pré-alpha), com versões disponíveis para download.
      </PageHero>

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SoftwareCard />
        </div>
      </section>

      <section className="bg-navy-deep py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead eyebrow="Conheça por dentro" title={<>As telas do <em>software</em></>}>
            Seis tipos de contenção, com sondagem SPT, verificações e memorial segundo as normas ABNT.
          </SectionHead>
          <Reveal>
            <SoftwareSlides />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed tracking-wide text-mist/45">
              ABNT NBR 11682:2009 · NBR 6122:2019 · NBR 5629:2018 · NBR 16920-2:2021 · NBR 6118:2023
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead eyebrow="Como obter" title={<>Baixe em <em>três passos</em></>} />
          <div className="grid gap-10 md:grid-cols-3">
            {steps.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.1}>
                <span className="font-display text-5xl text-steel/60">0{i + 1}</span>
                <h3 className="mb-2 mt-3 text-2xl">{t}</h3>
                <p className="text-sm leading-relaxed text-mist/60">{d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-14 flex flex-wrap gap-4">
            <Button href={software.releases} external glow>
              <Download size={16} /> Baixar Versão Recente / Releases
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-16 text-navy">
        <Reveal className="mx-auto flex max-w-4xl items-start gap-5 px-6">
          <Scale size={26} strokeWidth={1.3} className="mt-1 shrink-0 text-slate" />
          <p className="text-sm leading-relaxed text-slate">
            <strong className="text-navy">Aviso técnico:</strong> o programa está em fase de desenvolvimento e teste (versão pré-alpha) e pode conter erros ou mudar sem aviso. Ele é uma ferramenta de apoio e não substitui a análise, o julgamento e a responsabilidade técnica do engenheiro habilitado. Verifique premissas e resultados antes de utilizá-los em projeto.
          </p>
        </Reveal>
      </section>
    </>
  )
}
