import { useI18n } from './core/i18n/useI18n'
import { MAIN_CONTENT_ID } from './core/sections'
import { About } from './features/about/About'
import { Contact } from './features/contact/Contact'
import { Footer } from './features/footer/Footer'
import { Header } from './features/header/Header'
import { Hero } from './features/hero/Hero'
import { ProjectsSection } from './features/projects/ProjectsSection'
import { Skills } from './features/skills/Skills'

function App() {
  const { t } = useI18n()

  return (
    <>
      <a href={`#${MAIN_CONTENT_ID}`} className="skip-link">
        {t.a11y.skipToContent}
      </a>
      <Header />
      <main id={MAIN_CONTENT_ID} tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <ProjectsSection />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
