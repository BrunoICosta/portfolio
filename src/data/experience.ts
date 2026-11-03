import type { Localized, Translatable } from '../core/i18n/language'

/** Year and month, "YYYY-MM". Months are what the CV states; days are not tracked. */
export type YearMonth = `${number}-${number}`

export interface Experience {
  id: string
  role: Localized
  company: string
  /** Client the consultancy allocated me to, when there is one. */
  client?: string
  location: string
  start: YearMonth
  /** Omitted while it is the current position. */
  end?: YearMonth
  highlights: readonly Localized[]
  tech: readonly Translatable[]
}

const ANALYST: Localized = { 'pt-BR': 'Analista de Sistemas', en: 'Systems Analyst' }
const INTERN: Localized = { 'pt-BR': 'Estagiário de TI', en: 'IT Intern' }
const BRASILIA = 'Brasília, DF'

/** Most recent first. */
export const EXPERIENCES: readonly Experience[] = [
  {
    id: 'act-safra',
    role: ANALYST,
    company: 'ACT Digital',
    client: 'Banco Safra',
    location: BRASILIA,
    start: '2021-07',
    highlights: [
      {
        'pt-BR':
          'Referência técnica em diversos sistemas internos de maquininhas de cartão e domicílio bancário, conduzindo tecnicamente o time de desenvolvedores júnior, pleno e sênior.',
        en: 'Technical reference for several internal systems for card payment terminals and bank account settlement, providing technical leadership to a team of junior, mid-level and senior developers.',
      },
      {
        'pt-BR':
          'Desenvolvo e evoluo aplicações web em Angular, TypeScript, JavaScript, HTML e CSS, com testes unitários em Jest e Karma.',
        en: 'Develop and evolve web applications with Angular, TypeScript, JavaScript, HTML and CSS, with unit tests in Jest and Karma.',
      },
      {
        'pt-BR':
          'Realizo code review e documentação técnica e apoio desenvolvedores mais novos, em times de 3 desenvolvedores front-end e 3 back-end com Scrum e Kanban.',
        en: 'Perform code review and technical documentation and mentor less experienced developers, in teams of 3 front-end and 3 back-end developers using Scrum and Kanban.',
      },
    ],
    tech: ['Angular', 'TypeScript', 'Jest', 'Karma', 'Code review'],
  },
  {
    id: 'everis-bradesco',
    role: ANALYST,
    company: 'Everis Brasil / NTT DATA',
    client: 'Bradesco',
    location: BRASILIA,
    start: '2021-04',
    end: '2021-07',
    highlights: [
      {
        'pt-BR':
          'Desenvolvi funcionalidades do módulo de Open Finance do aplicativo Bradesco com Angular, TypeScript, JavaScript, HTML e CSS.',
        en: 'Developed features for the Open Finance module of the Bradesco app with Angular, TypeScript, JavaScript, HTML and CSS.',
      },
      {
        'pt-BR':
          'Implementei novas soluções e realizei manutenções e correções nas aplicações existentes do módulo.',
        en: "Implemented new solutions and performed maintenance and fixes on the module's existing applications.",
      },
    ],
    tech: ['Angular', 'TypeScript', 'Open Finance'],
  },
  {
    id: 'capgemini-bb',
    role: ANALYST,
    company: 'Capgemini Brasil',
    client: 'Banco do Brasil',
    location: BRASILIA,
    start: '2020-03',
    end: '2021-04',
    highlights: [
      {
        'pt-BR':
          'Participei da migração de aplicações de AngularJS para Angular na plataforma interna do Banco do Brasil.',
        en: "Took part in migrating applications from AngularJS to Angular on Banco do Brasil's internal platform.",
      },
      {
        'pt-BR': 'Desenvolvi aplicações web em AngularJS e Angular, com JavaScript, HTML e CSS.',
        en: 'Developed web applications with AngularJS and Angular, using JavaScript, HTML and CSS.',
      },
      {
        'pt-BR':
          'Atuei na atualização e manutenção das aplicações internas, com foco em estabilidade e qualidade.',
        en: 'Updated and maintained internal applications, with a focus on stability and quality.',
      },
    ],
    tech: ['AngularJS', 'Angular', { 'pt-BR': 'Migração', en: 'Migration' }],
  },
  {
    id: 'bb-intern',
    role: INTERN,
    company: 'Banco do Brasil',
    location: BRASILIA,
    start: '2018-11',
    end: '2020-03',
    highlights: [
      {
        'pt-BR':
          'Realizei a manutenção do banco de dados PostgreSQL e apoiei a elaboração e a documentação técnica de programas em Java, AngularJS e VueJS.',
        en: 'Maintained the PostgreSQL database and supported the development and technical documentation of programs in Java, AngularJS and VueJS.',
      },
      {
        'pt-BR': 'Atualizei o site da intranet e apoiei a carga de dados no sistema.',
        en: 'Updated the intranet website and supported data loading into the system.',
      },
    ],
    tech: ['PostgreSQL', 'Java', 'AngularJS', 'VueJS'],
  },
  {
    id: 'seplag-intern',
    role: INTERN,
    company: 'SEPLAG / CODHAB (via CIEE)',
    location: BRASILIA,
    start: '2018-08',
    end: '2018-11',
    highlights: [
      {
        'pt-BR':
          'Realizei a manutenção de banco de dados e apoiei a documentação de programas e a instalação de redes, microcomputadores e comunicação de dados.',
        en: 'Maintained databases and supported program documentation and the installation of networks, microcomputers and data communications.',
      },
    ],
    tech: [],
  },
]

export interface Credential {
  title: Localized
  issuer?: string
  year?: number
}

export const EDUCATION: readonly Credential[] = [
  {
    title: {
      'pt-BR': 'Bacharelado em Sistemas de Informação',
      en: "Bachelor's Degree in Information Systems",
    },
    issuer: 'Faculdade Projeção',
    year: 2020,
  },
  {
    title: {
      'pt-BR': 'Scrum Foundation Professional Certificate (SFPC)',
      en: 'Scrum Foundation Professional Certificate (SFPC)',
    },
  },
  {
    title: { 'pt-BR': 'Kanban Foundation (KIKF)', en: 'Kanban Foundation (KIKF)' },
  },
]
