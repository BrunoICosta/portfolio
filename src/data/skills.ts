import type { Translatable } from '../core/i18n/language'

export type SkillGroupId = 'frameworks' | 'state' | 'platform' | 'quality'

export interface Skill {
  name: Translatable
  detail: Translatable
}

export interface SkillGroup {
  id: SkillGroupId
  skills: readonly Skill[]
}

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    id: 'frameworks',
    skills: [
      {
        name: 'Angular',
        detail: {
          'pt-BR': 'Standalone, Signals, Material, CDK',
          en: 'Standalone, Signals, Material, CDK',
        },
      },
      {
        name: 'React',
        detail: { 'pt-BR': 'Hooks, composição, React 19', en: 'Hooks, composition, React 19' },
      },
      {
        name: 'Next.js',
        detail: {
          'pt-BR': 'App Router, SSG, Server Components',
          en: 'App Router, SSG, Server Components',
        },
      },
      {
        name: 'TypeScript',
        detail: { 'pt-BR': 'Modo estrito, tipos utilitários', en: 'Strict mode, utility types' },
      },
    ],
  },
  {
    id: 'state',
    skills: [
      {
        name: 'RxJS',
        detail: {
          'pt-BR': 'Streams, operadores, cancelamento',
          en: 'Streams, operators, cancellation',
        },
      },
      {
        name: 'NgRx',
        detail: { 'pt-BR': 'Store, Effects, Entity', en: 'Store, Effects, Entity' },
      },
      {
        name: 'Signals',
        detail: {
          'pt-BR': 'computed, effect, interop com RxJS',
          en: 'computed, effect, RxJS interop',
        },
      },
      {
        name: 'Zustand & TanStack Query',
        detail: {
          'pt-BR': 'Estado global e cache de servidor',
          en: 'Global state and server cache',
        },
      },
    ],
  },
  {
    id: 'platform',
    skills: [
      {
        name: 'Node.js',
        detail: { 'pt-BR': 'APIs, Socket.io, scripts', en: 'APIs, Socket.io, scripting' },
      },
      {
        name: 'Vite',
        detail: { 'pt-BR': 'Build rápido e DX', en: 'Fast builds and DX' },
      },
      {
        name: 'Git & GitHub',
        detail: { 'pt-BR': 'Conventional Commits, PRs', en: 'Conventional Commits, PRs' },
      },
    ],
  },
  {
    id: 'quality',
    skills: [
      {
        name: { 'pt-BR': 'Testes', en: 'Testing' },
        detail: 'Vitest, Testing Library, Jasmine/Karma',
      },
      {
        name: 'CI/CD',
        detail: 'GitHub Actions, GitHub Pages',
      },
      {
        name: { 'pt-BR': 'Acessibilidade', en: 'Accessibility' },
        detail: {
          'pt-BR': 'WCAG, ARIA, navegação por teclado',
          en: 'WCAG, ARIA, keyboard navigation',
        },
      },
    ],
  },
]
