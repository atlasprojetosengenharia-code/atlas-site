/**
 * ============================================================
 *  GALERIA DE PROJETOS: como adicionar projetos reais
 * ============================================================
 * As fotos NUNCA ficam em links externos. Cada projeto tem sua pasta local:
 *
 *   public/images/projects/{categoria}/{id-do-projeto}/01.jpg, 02.jpg, ...
 *
 * 1) Crie a pasta (um comando):
 *      npm run project:new -- contencao muro-arrimo-01
 *    (equivale a: mkdir public/images/projects/contencao/muro-arrimo-01)
 *
 * 2) Copie as fotos para a pasta (JPG/WebP, ~1600px de largura, < 400 KB cada).
 *    A primeira imagem (`images[0]`) é a capa do card.
 *
 * 3) Adicione um item em `projects` abaixo, por exemplo:
 *      {
 *        id: 'muro-arrimo-01',
 *        category: 'contencao',
 *        title: 'Muro de arrimo em solo grampeado',
 *        location: 'Cidade – UF',
 *        year: 2025,
 *        summary: 'Contenção de talude com 6 m de altura...',
 *        images: ['01.jpg', '02.jpg', '03.jpg'],
 *      }
 *    e REMOVA o campo `placeholder: true`.
 *
 * Enquanto o arquivo não existir, o site mostra um placeholder da marca
 * (sem quebrar a página).
 *
 * Mapeamento JSON equivalente (se preferir gerar a lista por script):
 *   { "contencao": { "muro-arrimo-01": ["01.jpg","02.jpg"] } }
 */

export type CategoryId = 'estrutural' | 'geotecnico' | 'contencao' | 'comercial'

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'estrutural', label: 'Engenharia Estrutural' },
  { id: 'geotecnico', label: 'Geotecnia' },
  { id: 'contencao', label: 'Sistemas de Contenção' },
  { id: 'comercial', label: 'Comercial' },
]

export interface Project {
  id: string
  category: CategoryId
  title: string
  location: string
  year?: number
  summary: string
  images: string[]
  /** true = item de exemplo (aparece com selo "Em breve"). Remova ao cadastrar um projeto real. */
  placeholder?: boolean
}

export const IMAGE_ROOT = '/images/projects'

export const imageUrl = (p: Pick<Project, 'category' | 'id'>, file: string) =>
  `${IMAGE_ROOT}/${p.category}/${p.id}/${file}`

export const projects: Project[] = [
  {
    id: 'exemplo-estrutural-01',
    category: 'estrutural',
    title: 'Edificação em concreto armado',
    location: 'Cidade – UF',
    summary: 'Projeto estrutural completo com memorial de cálculo, formas e armação.',
    images: ['01.jpg', '02.jpg', '03.jpg'],
    placeholder: true,
  },
  {
    id: 'exemplo-geotecnico-01',
    category: 'geotecnico',
    title: 'Análise geotécnica com sondagem SPT',
    location: 'Cidade – UF',
    summary: 'Interpretação de sondagens e definição de parâmetros para fundações e taludes.',
    images: ['01.jpg', '02.jpg'],
    placeholder: true,
  },
  {
    id: 'exemplo-contencao-01',
    category: 'contencao',
    title: 'Muro de arrimo',
    location: 'Cidade – UF',
    summary: 'Dimensionamento e verificação de estabilidade de contenção.',
    images: ['01.jpg', '02.jpg', '03.jpg'],
    placeholder: true,
  },
  {
    id: 'exemplo-comercial-01',
    category: 'comercial',
    title: 'Galpão comercial',
    location: 'Cidade – UF',
    summary: 'Estrutura, orçamento e acompanhamento de obra de edificação comercial.',
    images: ['01.jpg', '02.jpg'],
    placeholder: true,
  },
  {
    id: 'exemplo-contencao-02',
    category: 'contencao',
    title: 'Contenção de talude',
    location: 'Cidade – UF',
    summary: 'Solução de contenção com verificação de estabilidade global.',
    images: ['01.jpg', '02.jpg'],
    placeholder: true,
  },
  {
    id: 'exemplo-estrutural-02',
    category: 'estrutural',
    title: 'Reforço estrutural',
    location: 'Cidade – UF',
    summary: 'Laudo e projeto de reforço de estrutura existente.',
    images: ['01.jpg'],
    placeholder: true,
  },
]
