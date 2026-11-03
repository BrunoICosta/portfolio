import type { Language } from './language'

const ptBR = {
  meta: {
    title: 'Bruno Costa | Desenvolvedor Front-end Angular & React',
    description:
      'Portfólio de Bruno Vinicius Isaac Costa, desenvolvedor front-end especializado em Angular e React, com foco em TypeScript, testes e acessibilidade.',
  },
  a11y: {
    skipToContent: 'Pular para o conteúdo',
    opensInNewTab: '(abre em nova aba)',
  },
  header: {
    homeLink: 'Bruno Costa, voltar ao início',
    navLabel: 'Navegação principal',
    themeToDark: 'Ativar tema escuro',
    themeToLight: 'Ativar tema claro',
    menu: 'Abrir menu de navegação',
    languageLabel: 'Idioma',
  },
  nav: {
    about: 'Sobre',
    experience: 'Experiência',
    skills: 'Habilidades',
    projects: 'Projetos',
    contact: 'Contato',
  },
  hero: {
    greeting: 'Olá, eu sou',
    role: 'Desenvolvedor Front-end',
    stack: 'Angular & React',
    tagline:
      'Construo interfaces rápidas e acessíveis, de painéis complexos em Angular a aplicações React focadas na experiência do usuário.',
    ctaProjects: 'Ver projetos',
    ctaContact: 'Fale comigo',
    ctaResume: 'Baixar currículo',
    availability: 'Aberto a novas oportunidades',
  },
  about: {
    title: 'Sobre mim',
    photoAlt: 'Foto de Bruno Vinicius Isaac Costa',
    paragraphs: [
      'Sou desenvolvedor front-end com mais de 6 anos de experiência, a maior parte no setor financeiro, em projetos para Banco do Brasil, Bradesco e Banco Safra pelas consultorias Capgemini, Everis/NTT DATA e ACT Digital.',
      'Hoje sou referência técnica em diversos sistemas no Banco Safra, conduzindo o time com code review, documentação e apoio a desenvolvedores júnior, pleno e sênior. Domino Angular do AngularJS às versões modernas, com standalone components e signals, e uso React e Next.js nos meus projetos, sempre com TypeScript.',
      'No dia a dia me preocupo com arquitetura de componentes, performance (já reduzi o carregamento de páginas de 10 s para 600 ms), testes automatizados e acessibilidade. Acredito que um bom front-end é aquele que ninguém precisa notar, porque tudo funciona como deveria.',
      'Este portfólio reúne projetos que construí para demonstrar essas práticas, todos com código aberto, testes, CI e demo publicada.',
    ],
    highlights: [
      { value: '6+', label: 'anos de experiência' },
      { value: '3', label: 'grandes bancos atendidos' },
      { value: '10 s → 0,6 s', label: 'carregamento de página otimizado' },
    ],
  },
  experience: {
    title: 'Por onde passei',
    intro:
      'Mais de 6 anos construindo aplicações web para o setor financeiro, de migrações de AngularJS para Angular à liderança técnica de times.',
    timelineLabel: 'Linha do tempo profissional',
    client: 'cliente',
    current: 'Atual',
    techLabel: 'Tecnologias e práticas',
    educationTitle: 'Formação e certificações',
    resume: 'Baixar currículo completo',
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
    resume: 'Currículo (PDF)',
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
    title: 'Bruno Costa | Front-end Developer, Angular & React',
    description:
      'Portfolio of Bruno Vinicius Isaac Costa, a front-end developer specialized in Angular and React, focused on TypeScript, testing and accessibility.',
  },
  a11y: {
    skipToContent: 'Skip to content',
    opensInNewTab: '(opens in a new tab)',
  },
  header: {
    homeLink: 'Bruno Costa, back to top',
    navLabel: 'Main navigation',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
    menu: 'Open navigation menu',
    languageLabel: 'Language',
  },
  nav: {
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
  },
  hero: {
    greeting: "Hi, I'm",
    role: 'Front-end Developer',
    stack: 'Angular & React',
    tagline:
      'I build fast, accessible interfaces, from complex Angular dashboards to React apps focused on user experience.',
    ctaProjects: 'See projects',
    ctaContact: 'Get in touch',
    ctaResume: 'Download resume',
    availability: 'Open to new opportunities',
  },
  about: {
    title: 'About me',
    photoAlt: 'Photo of Bruno Vinicius Isaac Costa',
    paragraphs: [
      'I am a front-end developer with more than 6 years of experience, mostly in the financial sector, working on projects for Banco do Brasil, Bradesco and Banco Safra through the consultancies Capgemini, Everis/NTT DATA and ACT Digital.',
      'Today I am a technical reference for several systems at Banco Safra, guiding the team through code review, documentation and support for junior, mid-level and senior developers. I master Angular from AngularJS to the modern versions, with standalone components and signals, and I use React and Next.js in my own projects, always with TypeScript.',
      'Day to day I care about component architecture, performance (I have cut page load times from 10 s to 600 ms), automated tests and accessibility. I believe good front-end is the kind nobody has to notice, because everything works the way it should.',
      'This portfolio gathers projects I built to showcase those practices, all of them open source, tested, with CI and a live demo.',
    ],
    highlights: [
      { value: '6+', label: 'years of experience' },
      { value: '3', label: 'major banks served' },
      { value: '10 s → 0.6 s', label: 'page load optimized' },
    ],
  },
  experience: {
    title: "Where I've worked",
    intro:
      'More than 6 years building web applications for the financial sector, from AngularJS to Angular migrations to leading teams technically.',
    timelineLabel: 'Professional timeline',
    client: 'client',
    current: 'Current',
    techLabel: 'Technologies and practices',
    educationTitle: 'Education and certifications',
    resume: 'Download full resume',
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
    resume: 'Resume (PDF)',
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
