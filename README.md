# Bruno Costa — Portfólio

Site pessoal de **Bruno Vinicius Isaac Costa**, desenvolvedor front-end (Angular & React). Uma página
única, rápida e acessível que apresenta quem sou, minhas habilidades e uma vitrine filtrável dos meus
projetos open source — cada um com link para o código e para a demo publicada no GitHub Pages. Feito
com React 19, TypeScript e Vite, sem framework de CSS e com animações discretas.

**Demo ao vivo:** https://brunoicosta.github.io/

## Funcionalidades

- **Hero, Sobre, Habilidades, Projetos e Contato** em uma página com navegação por âncoras e header fixo.
- **Bilíngue (pt-BR / EN)**: idioma inicial pela escolha salva > idioma do navegador > pt-BR, seletor PT/EN
  no header e badge "PT-BR / EN" nos cards (todos os projetos também são bilíngues).
- **Tema claro/escuro**: segue o sistema operacional na primeira visita e lembra a escolha; aplicado
  antes da primeira pintura (sem "flash" de tema errado).
- **Projetos filtráveis** (Todos / Angular / React) com contagem anunciada para leitores de tela.
- **Cards de projeto** com descrição, badges de tecnologia, links "Código" e "Demo" e screenshot carregado
  de `docs/screenshot.png` de cada repositório — com _skeleton_ durante o carregamento e um placeholder
  elegante quando a imagem ainda não existe.
- **Contato** por e-mail (`mailto:` + botão "copiar e-mail" com feedback) e GitHub. O link do LinkedIn
  fica oculto enquanto a constante `LINKEDIN_URL` estiver vazia.
- **Acessibilidade**: skip link, landmarks e headings semânticos, foco visível, `aria-pressed` nos
  filtros, avisos via `role="status"`, contraste AA nos dois temas e respeito a `prefers-reduced-motion`.
- **SEO**: meta description, canonical, Open Graph/Twitter Card com imagem 1200×630, JSON-LD (`Person`),
  `robots.txt`, `sitemap.xml`, manifest e favicons.

## Stack

| Área             | Tecnologia                                                                |
| ---------------- | ------------------------------------------------------------------------- |
| UI               | React 19.3, TypeScript 6.0 (strict)                                       |
| Build/dev server | Vite 8.3 + @vitejs/plugin-react 6.1                                       |
| Estilos          | CSS Modules + design tokens em CSS custom properties                      |
| Animações        | Motion 14 (`motion/react`, ex-Framer Motion) com `LazyMotion`             |
| Testes           | Vitest 5, Testing Library (React 16, user-event 14, jest-dom 7), jsdom 30 |
| Qualidade        | ESLint 10 + typescript-eslint 8 (strict), Prettier 3                      |
| CI/CD            | GitHub Actions + GitHub Pages                                             |

## Arquitetura e decisões

- **Página única sem roteador.** O conteúdo é linear e cabe em uma página; âncoras (`#projects`) dão
  links compartilháveis sem o peso de um router.
- **`core` / `features` / `shared` / `data`.** `core` guarda infraestrutura (tema, i18n, storage),
  `features` tem uma pasta por seção, `shared` reúne componentes genéricos e `data` concentra o
  conteúdo tipado (`projects.ts`, `skills.ts`, `profile.ts`). Para adicionar um projeto basta incluir
  um objeto em `src/data/projects.ts` — o TypeScript garante descrição nos dois idiomas.
- **i18n próprio e tipado em vez de uma biblioteca.** São ~80 strings: um dicionário pt-BR é a fonte da
  verdade e o inglês precisa ter exatamente o mesmo formato (`const en: Dictionary`), então faltar uma
  chave é erro de compilação. Zero dependência extra e nenhum carregamento assíncrono de traduções.
- **CSS Modules + tokens.** Cores, espaçamentos, raios e sombras são variáveis CSS; o tema escuro só
  redefine os tokens em `[data-theme='dark']`. Sem runtime de CSS-in-JS e sem classes utilitárias.
- **Animações com custo baixo.** `LazyMotion` + componentes `m` com as _features_ de animação carregadas
  em um chunk separado depois da primeira renderização; o `h1` (LCP) não é animado. `MotionConfig
reducedMotion="user"` desliga transformações para quem prefere menos movimento.
- **Screenshots com degradação elegante.** As imagens vêm do `raw.githubusercontent.com` de cada
  repositório, com `loading="lazy"`, dimensões fixas (sem layout shift) e fallback em caso de 404.
- **Preferências resilientes.** Leitura/escrita do `localStorage` nunca lança erro (modo privado,
  cookies bloqueados); um script inline no `index.html` aplica tema antes do React montar.

## Como rodar

Pré-requisitos: Node.js 22+ e npm 10+.

```bash
npm install          # instala as dependências
npm run dev          # servidor de desenvolvimento em http://localhost:5173
npm test             # testes unitários e de componentes (Vitest, uma execução)
npm run test:watch   # testes em modo watch
npm run lint         # ESLint
npm run format:check # Prettier (use `npm run format` para corrigir)
npm run build        # type-check + build de produção em dist/
npm run preview      # serve o build de produção localmente
```

## Estrutura de pastas

```
├── index.html               # meta tags/SEO, JSON-LD e script de tema pré-render
├── public/                  # favicon, og-image, robots.txt, sitemap.xml, manifest
└── src/
    ├── core/
    │   ├── i18n/            # dicionários pt-BR/en, provider, hook useI18n
    │   ├── theme/           # tema claro/escuro, provider, hook useTheme
    │   ├── sections.ts      # ids das seções (âncoras)
    │   └── storage.ts       # localStorage seguro
    ├── data/                # profile.ts, projects.ts, skills.ts (conteúdo tipado)
    ├── features/            # header, hero, about, skills, projects, contact, footer
    ├── shared/
    │   ├── components/      # Section, ButtonLink, ExternalLink, Icon
    │   ├── hooks/           # useCopyToClipboard
    │   └── motion/          # MotionProvider, Reveal, variants
    ├── styles/              # tokens.css e global.css
    └── test/                # setup do Vitest e render com providers
```

## Próximos passos

- Pré-renderizar o HTML (SSG) para entregar o conteúdo já no primeiro byte.
- Buscar estrelas e data do último commit de cada repositório pela API pública do GitHub.
- Página de detalhes por projeto com GIFs/vídeos curtos das demos.
- Preencher `LINKEDIN_URL` em `src/data/profile.ts`.

## Autor

**Bruno Vinicius Isaac Costa** — https://github.com/BrunoICosta · brunoisaacosta@hotmail.com

## Licença

[MIT](./LICENSE)
