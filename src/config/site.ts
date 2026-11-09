// Dados institucionais. Campos vazios ('') não aparecem no site.
export const site = {
  name: 'Atlas Projetos e Engenharia',
  legalName: 'Atlas Projetos e Engenharia LTDA',
  domain: 'www.atlasprojetos.eng.br',
  email: 'contato@atlasprojetos.eng.br',
  phone: '(73) 98103-1866',
  whatsapp: '5573981031866', // somente dígitos com DDI
  instagram: 'atlasprojetos.eng.br', // usuário, sem @
  city: '', // ex.: 'São Paulo – SP'
  cnpj: '', // ex.: '00.000.000/0001-00'
  crea: '', // ex.: 'CREA-SP 0000000000'
  responsible: 'Kaique Ferreira – CREA 3000076396BA', // Responsável técnico
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
