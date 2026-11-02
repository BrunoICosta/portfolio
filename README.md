# Bruno Costa — Portfólio

> **English:** [README.en.md](./README.en.md)

Site pessoal de **Bruno Vinicius Isaac Costa**, desenvolvedor front-end (Angular & React). Uma página
única, rápida e acessível que apresenta quem sou, minhas habilidades e uma vitrine filtrável dos meus
projetos open source — cada um com link para o código e para a demo publicada no GitHub Pages. Feito
com React 19, TypeScript e Vite, sem framework de CSS e com animações discretas.

**Demo ao vivo:** https://brunoicosta.github.io/

![Página inicial do portfólio com hero, seletor de idioma e tema](./docs/screenshot.png)

## Funcionalidades

- **Hero, Sobre, Habilidades, Projetos e Contato** em uma página com navegação por âncoras e header fixo.
- **Bilíngue (pt-BR / EN)**: idioma inicial pela escolha salva > idioma do navegador > pt-BR, seletor com
  bandeiras (Brasil / EUA) no header e badge "PT-BR / EN" com bandeirinhas nos cards (todos os projetos também são bilíngues).
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
- **i18n próprio e tipado em vez de uma biblioteca.** Veja [Internacionalização](#internacionalização).
- **CSS Modules + tokens.** Cores, espaçamentos, raios e sombras são variáveis CSS; o tema escuro só
  redefine os tokens em `[data-theme='dark']`. Sem runtime de CSS-in-JS e sem classes utilitárias.
- **Animações com custo baixo.** `LazyMotion` + componentes `m` com as _features_ de animação carregadas
  em um chunk separado depois da primeira renderização; o `h1` (LCP) não é animado. `MotionConfig
reducedMotion="user"` desliga transformações para quem prefere menos movimento.
- **Screenshots com degradação elegante.** As imagens vêm do `raw.githubusercontent.com` de cada
  repositório, com `loading="lazy"`, dimensões fixas (sem layout shift) e fallback em caso de 404.
- **Preferências resilientes.** Leitura/escrita do `localStorage` nunca lança erro (modo privado,
  cookies bloqueados); um script inline no `index.html` aplica tema antes do React montar.

## Internacionalização

O site inteiro existe em **pt-BR** (padrão) e **inglês**: textos visíveis, `aria-label`s, títulos,
mensagens de estado (filtro, cópia de e-mail), `document.title` e a meta description.

**Como funciona**

- `src/core/i18n/translations.ts` tem um dicionário por idioma. O pt-BR é a fonte da verdade e define
  o tipo `Dictionary`; o inglês é declarado como `const en: Dictionary`, então qualquer chave faltando
  ou sobrando é erro de compilação (e um teste compara as chaves dos dois idiomas).
- Textos com variáveis são funções tipadas, ex.: `projects.count(n)` → "1 projeto" / "5 projetos".
- Conteúdo de dados usa `Localized<string>` (`{ 'pt-BR': …, en: … }`) — por exemplo a descrição de cada
  projeto em `src/data/projects.ts` — ou `Translatable` quando o texto pode ser neutro ("TypeScript").
- O `I18nProvider` expõe `{ language, t, setLanguage }` via `useI18n()` e sincroniza
  `<html lang>`, `document.title` e a meta description sempre que o idioma muda.
- **Idioma inicial:** escolha salva (`localStorage`, chave `bc-lang`) > idioma do navegador
  (`pt*` → pt-BR, qualquer outro → en) > pt-BR. Um script inline no `index.html` aplica o mesmo
  `<html lang>` antes do React montar.
- O seletor do header é um grupo ("Idioma"/"Language") de dois botões com bandeiras em SVG inline
  (`src/shared/components/Flag.tsx`; emoji de bandeira não renderiza no Windows). Cada botão tem
  `aria-pressed`, nome acessível e `title` no próprio idioma ("Português (Brasil)", "English") e
  atributo `lang`; a bandeira é decorativa (`aria-hidden`). O idioma ativo ganha anel de destaque e cor
  plena (não depende só de cor); os inativos ficam esmaecidos até receber hover/foco.
- Datas/números: hoje o único valor formatado é o ano do rodapé; novos valores devem usar
  `Intl.*Format(language)`.

**Por que não i18next?** Com ~80 strings e dois idiomas, um dicionário tipado entrega a mesma segurança
(chaves verificadas pelo compilador) sem dependência extra, sem carregamento assíncrono e sem custo no
bundle — o que ajuda a manter o Lighthouse perto de 100. Se o site crescer (namespaces, pluralização
complexa, muitos idiomas), migrar para i18next é direto: os dicionários já são objetos aninhados.

**Como adicionar um idioma (ex.: espanhol)**

1. Inclua o código em `LANGUAGES` e um rótulo em `LANGUAGE_LABELS` (`src/core/i18n/language.ts`) e ajuste
   `detectBrowserLanguage` (ex.: `es*` → `es`).
2. Crie `const es: Dictionary = { … }` em `translations.ts` e registre em `translations` — o compilador
   aponta tudo o que falta.
3. Adicione a chave `es` aos campos `Localized` em `src/data/` (o TypeScript também aponta).
4. Atualize o script inline do `index.html` e rode `npm test`.

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

**Bruno Vinicius Isaac Costa** — https://github.com/BrunoICosta · [LinkedIn](https://www.linkedin.com/in/bruno-vin%C3%ADcius-isaac-costa-a90758156/) · brunoisaacosta@hotmail.com

## Licença

[MIT](./LICENSE)
