import type { Language, Localized } from '../core/i18n/language'
import { PROFILE } from './profile'

export const PROJECT_CATEGORIES = ['angular', 'react'] as const
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export interface Project {
  /** GitHub repository name; also the path of the live demo (/<repo>/). */
  repo: string
  title: string
  category: ProjectCategory
  description: Localized
  tech: readonly string[]
  /** Languages the project's own UI is available in. */
  uiLanguages: readonly Language[]
}

const BILINGUAL: readonly Language[] = ['pt-BR', 'en']

export const PROJECTS: readonly Project[] = [
  {
    repo: 'angular-tv-explorer',
    title: 'TV Explorer',
    category: 'angular',
    description: {
      'pt-BR':
        'Catálogo de séries com a API pública do TVMaze: busca com debounce, detalhes, elenco e episódios, com infinite scroll. Estado com Signals e RxJS.',
      en: 'TV show catalog powered by the public TVMaze API: debounced search, details, cast and episodes, with infinite scroll. State with Signals and RxJS.',
    },
    uiLanguages: BILINGUAL,
    tech: ['Angular', 'Signals', 'RxJS', 'TVMaze API'],
  },
  {
    repo: 'angular-finance-tracker',
    title: 'Finance Tracker',
    category: 'angular',
    description: {
      'pt-BR':
        'Controle de finanças pessoais com lançamentos, categorias, orçamento mensal e gráficos. Interface com Angular Material e estado com Signals.',
      en: 'Personal finance tracker with transactions, categories, monthly budget and charts. UI built with Angular Material and state with Signals.',
    },
    uiLanguages: BILINGUAL,
    tech: ['Angular', 'Angular Material', 'Signals', 'Charts'],
  },
  {
    repo: 'angular-appointment-scheduler',
    title: 'Appointment Scheduler',
    category: 'angular',
    description: {
      'pt-BR':
        'Agenda de consultas com FullCalendar, formulários reativos com validadores customizados e internacionalização com Transloco.',
      en: 'Appointment scheduler with FullCalendar, reactive forms with custom validators and internationalization with Transloco.',
    },
    uiLanguages: BILINGUAL,
    tech: ['Angular', 'FullCalendar', 'Reactive Forms', 'Transloco'],
  },
  {
    repo: 'angular-kanban-board',
    title: 'Kanban Board',
    category: 'angular',
    description: {
      'pt-BR':
        'Quadro Kanban com arrastar e soltar (CDK Drag & Drop) e estado gerenciado com NgRx Store, Effects e Entity.',
      en: 'Kanban board with drag and drop (CDK Drag & Drop) and state managed with NgRx Store, Effects and Entity.',
    },
    uiLanguages: BILINGUAL,
    tech: ['Angular', 'NgRx', 'CDK Drag & Drop', 'RxJS'],
  },
  {
    repo: 'angular-ecommerce-admin',
    title: 'E-commerce Admin',
    category: 'angular',
    description: {
      'pt-BR':
        'Painel administrativo de e-commerce com tabelas Material (paginação, ordenação e filtros), interceptors HTTP e guards por perfil de acesso.',
      en: 'E-commerce admin dashboard with Material tables (pagination, sorting and filters), HTTP interceptors and role-based route guards.',
    },
    uiLanguages: BILINGUAL,
    tech: ['Angular', 'Angular Material', 'Interceptors', 'Guards'],
  },
  {
    repo: 'react-recipe-finder',
    title: 'Recipe Finder',
    category: 'react',
    description: {
      'pt-BR':
        'Busca de receitas na API TheMealDB, com filtros por categoria e formulários validados com React Hook Form e Zod.',
      en: 'Recipe search on top of TheMealDB API, with category filters and forms validated with React Hook Form and Zod.',
    },
    uiLanguages: BILINGUAL,
    tech: ['React', 'React Hook Form', 'Zod', 'TheMealDB'],
  },
  {
    repo: 'react-weather-dashboard',
    title: 'Weather Dashboard',
    category: 'react',
    description: {
      'pt-BR':
        'Dashboard de clima com dados do Open-Meteo: busca de cidades, previsão horária e semanal, cache com TanStack Query e gráficos em Recharts.',
      en: 'Weather dashboard using Open-Meteo data: city search, hourly and weekly forecast, caching with TanStack Query and Recharts charts.',
    },
    uiLanguages: BILINGUAL,
    tech: ['React', 'TanStack Query', 'Recharts', 'Open-Meteo'],
  },
  {
    repo: 'react-habit-tracker',
    title: 'Habit Tracker',
    category: 'react',
    description: {
      'pt-BR':
        'Rastreador de hábitos em formato PWA que funciona offline, com heatmap de consistência e animações com Framer Motion.',
      en: 'Habit tracker PWA that works offline, with a consistency heatmap and animations powered by Framer Motion.',
    },
    uiLanguages: BILINGUAL,
    tech: ['React', 'PWA', 'Framer Motion', 'Offline'],
  },
  {
    repo: 'react-notes-workspace',
    title: 'Notes Workspace',
    category: 'react',
    description: {
      'pt-BR':
        'Workspace de notas no estilo Notion, com páginas e blocos editáveis reordenáveis via dnd-kit e estado global com Zustand.',
      en: 'Notion-like notes workspace with pages and editable blocks you can reorder via dnd-kit, plus global state with Zustand.',
    },
    uiLanguages: BILINGUAL,
    tech: ['React', 'dnd-kit', 'Zustand', 'TypeScript'],
  },
  {
    repo: 'react-realtime-chat',
    title: 'Realtime Chat',
    category: 'react',
    description: {
      'pt-BR':
        'Chat em tempo real com Socket.io em um monorepo (cliente e servidor) e modo demo via BroadcastChannel que roda direto no navegador.',
      en: 'Real-time chat with Socket.io in a monorepo (client and server) and a BroadcastChannel demo mode that runs right in the browser.',
    },
    uiLanguages: BILINGUAL,
    tech: ['React', 'Socket.io', 'Node.js', 'Monorepo'],
  },
  {
    repo: 'next-ecommerce-store',
    title: 'Next E-commerce Store',
    category: 'react',
    description: {
      'pt-BR':
        'Loja virtual com Next.js 16 (App Router) e páginas estáticas (SSG), carrinho com Zustand e fluxo completo de checkout.',
      en: 'Online store built with Next.js 16 (App Router) and static pages (SSG), a Zustand cart and a full checkout flow.',
    },
    uiLanguages: BILINGUAL,
    tech: ['Next.js', 'React', 'Zustand', 'SSG'],
  },
]

export function getRepoUrl(project: Pick<Project, 'repo'>): string {
  return `${PROFILE.githubUrl}/${project.repo}`
}

export function getDemoUrl(project: Pick<Project, 'repo'>): string {
  return `${PROFILE.siteUrl}${project.repo}/`
}

/** Screenshot committed by each project at docs/screenshot.png (may not exist yet). */
export function getScreenshotUrl(project: Pick<Project, 'repo'>): string {
  return `https://raw.githubusercontent.com/${PROFILE.githubUser}/${project.repo}/main/docs/screenshot.png`
}
