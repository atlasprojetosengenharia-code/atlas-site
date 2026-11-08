// Dados institucionais. Campos vazios ('') não aparecem no site.
export const site = {
  name: 'Atlas Projetos e Engenharia',
  legalName: 'Atlas Projetos e Engenharia LTDA',
  domain: 'www.atlasprojetos.eng.br',
  email: 'contato@atlasprojetos.eng.br', // TODO: confirmar o e-mail real
  phone: '', // ex.: '(00) 00000-0000'
  whatsapp: '', // somente dígitos com DDI, ex.: '5511999999999'
  city: '', // ex.: 'São Paulo – SP'
  cnpj: '', // ex.: '00.000.000/0001-00'
  crea: '', // ex.: 'CREA-SP 0000000000'
  responsible: '', // Responsável técnico
}

export const software = {
  name: 'Calculadora de Contenções',
  releases: 'https://github.com/atlasprojetosengenharia-code/calculadora-contencoes-releases/releases',
}

export const nav = [
  { to: '/', label: 'Início' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/software', label: 'Software' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/contato', label: 'Contato' },
]
