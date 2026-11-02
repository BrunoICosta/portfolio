import type { Language } from './language'

const ptBR = {
  meta: {
    title: 'Bruno Costa — Desenvolvedor Front-end Angular & React',
    description:
      'Portfólio de Bruno Vinicius Isaac Costa, desenvolvedor front-end especializado em Angular e React, com foco em TypeScript, testes e acessibilidade.',
  },
  a11y: {
    skipToContent: 'Pular para o conteúdo',
    opensInNewTab: '(abre em nova aba)',
  },
  header: {
    homeLink: 'Bruno Costa — voltar ao início',
    navLabel: 'Navegação principal',
    themeToDark: 'Ativar tema escuro',
    themeToLight: 'Ativar tema claro',
    menu: 'Abrir menu de navegação',
    languageLabel: 'Idioma',
  },
  nav: {
    about: 'Sobre',
    skills: 'Habilidades',
    projects: 'Projetos',
    contact: 'Contato',
  },
  hero: {
    greeting: 'Olá, eu sou',
    role: 'Desenvolvedor Front-end',
    stack: 'Angular & React',
    tagline:
      'Construo interfaces rápidas, acessíveis e bem testadas — de painéis complexos em Angular a aplicações React focadas na experiência de quem usa.',
    ctaProjects: 'Ver projetos',
    ctaContact: 'Fale comigo',
    availability: 'Aberto a novas oportunidades',
  },
  about: {
    title: 'Sobre mim',
    paragraphs: [
      'Sou desenvolvedor front-end e gosto de transformar requisitos em interfaces claras, rápidas e fáceis de manter. Trabalho principalmente com Angular e React, sempre com TypeScript.',
      'No dia a dia me preocupo com arquitetura de componentes, estado previsível (RxJS, NgRx, Signals, Zustand), testes automatizados e acessibilidade. Para mim, um bom front-end é aquele que a pessoa usuária nem percebe: simplesmente funciona.',
      'Este portfólio reúne projetos que construí para explorar e demonstrar essas práticas. Todos têm código aberto, testes, pipeline de CI e demo publicada.',
    ],
    highlights: [
      { value: '11', label: 'projetos open source' },
      { value: '2', label: 'ecossistemas: Angular e React' },
      { value: '100%', label: 'TypeScript estrito' },
    ],
  },
  skills: {
    title: 'Habilidades',
    intro: 'Ferramentas e práticas que uso para entregar front-ends de qualidade.',
    groups: {
      frameworks: 'Frameworks & linguagem',
      state: 'Estado & reatividade',
      platform: 'Plataforma & ferramentas',
      quality: 'Qualidade & entrega',
    },
  },
  projects: {
    title: 'Projetos',
    intro:
      'Uma seleção de projetos open source. Cada um tem código no GitHub e demo ao vivo em portfolio.brunoisaac.dev.',
    filterLabel: 'Filtrar projetos por tecnologia',
    filters: { all: 'Todos', angular: 'Angular', react: 'React' },
    count: (count: number) => (count === 1 ? '1 projeto' : `${count} projetos`),
    code: 'Código',
    demo: 'Demo',
    screenshotAlt: (title: string) => `Captura de tela do projeto ${title}`,
    screenshotFallback: 'Prévia indisponível',
    techLabel: 'Tecnologias',
    uiLanguages: (names: string) => `Interface disponível em: ${names}`,
    empty: 'Nenhum projeto encontrado para este filtro.',
  },
  contact: {
    title: 'Contato',
    heading: 'Vamos conversar?',
    text: 'Estou aberto a oportunidades, projetos e boas conversas sobre front-end. O jeito mais rápido de falar comigo é por e-mail.',
    email: 'E-mail',
    copyEmail: 'Copiar e-mail',
    copied: 'E-mail copiado!',
    copyFailed: 'Não foi possível copiar. Use o link acima.',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  footer: {
    rights: (year: number) => `© ${year} Bruno Vinicius Isaac Costa`,
    builtWith: 'Feito com React, TypeScript e Vite.',
    source: 'Código deste site',
    backToTop: 'Voltar ao topo',
  },
}

/** Shape every language must implement (derived from the pt-BR source of truth). */
export type Dictionary = typeof ptBR

const en: Dictionary = {
  meta: {
    title: 'Bruno Costa — Front-end Developer, Angular & React',
    description:
      'Portfolio of Bruno Vinicius Isaac Costa, a front-end developer specialized in Angular and React, focused on TypeScript, testing and accessibility.',
  },
  a11y: {
    skipToContent: 'Skip to content',
    opensInNewTab: '(opens in a new tab)',
  },
  header: {
    homeLink: 'Bruno Costa — back to top',
    navLabel: 'Main navigation',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
    menu: 'Open navigation menu',
    languageLabel: 'Language',
  },
  nav: {
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
  },
  hero: {
    greeting: "Hi, I'm",
    role: 'Front-end Developer',
    stack: 'Angular & React',
    tagline:
      'I build fast, accessible and well-tested interfaces — from complex Angular dashboards to React apps focused on the people who use them.',
    ctaProjects: 'See projects',
    ctaContact: 'Get in touch',
    availability: 'Open to new opportunities',
  },
  about: {
    title: 'About me',
    paragraphs: [
      'I am a front-end developer who enjoys turning requirements into clear, fast and maintainable interfaces. I work mostly with Angular and React, always with TypeScript.',
      'Day to day I care about component architecture, predictable state (RxJS, NgRx, Signals, Zustand), automated tests and accessibility. To me, good front-end is the kind users never notice: it just works.',
      'This portfolio gathers projects I built to explore and showcase those practices. Every one of them is open source, tested, has a CI pipeline and a live demo.',
    ],
    highlights: [
      { value: '11', label: 'open source projects' },
      { value: '2', label: 'ecosystems: Angular and React' },
      { value: '100%', label: 'strict TypeScript' },
    ],
  },
  skills: {
    title: 'Skills',
    intro: 'Tools and practices I use to ship quality front-ends.',
    groups: {
      frameworks: 'Frameworks & language',
      state: 'State & reactivity',
      platform: 'Platform & tooling',
      quality: 'Quality & delivery',
    },
  },
  projects: {
    title: 'Projects',
    intro:
      'A selection of open source projects. Each one has its code on GitHub and a live demo on portfolio.brunoisaac.dev.',
    filterLabel: 'Filter projects by technology',
    filters: { all: 'All', angular: 'Angular', react: 'React' },
    count: (count: number) => (count === 1 ? '1 project' : `${count} projects`),
    code: 'Code',
    demo: 'Demo',
    screenshotAlt: (title: string) => `Screenshot of the ${title} project`,
    screenshotFallback: 'Preview unavailable',
    techLabel: 'Technologies',
    uiLanguages: (names: string) => `Interface available in: ${names}`,
    empty: 'No projects found for this filter.',
  },
  contact: {
    title: 'Contact',
    heading: "Let's talk?",
    text: "I'm open to opportunities, projects and good conversations about front-end. The fastest way to reach me is by email.",
    email: 'Email',
    copyEmail: 'Copy email',
    copied: 'Email copied!',
    copyFailed: "Couldn't copy. Please use the link above.",
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  footer: {
    rights: (year: number) => `© ${year} Bruno Vinicius Isaac Costa`,
    builtWith: 'Built with React, TypeScript and Vite.',
    source: 'Source of this site',
    backToTop: 'Back to top',
  },
}

export const translations: Record<Language, Dictionary> = {
  'pt-BR': ptBR,
  en,
}
