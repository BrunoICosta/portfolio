import { MAIN_CONTENT_ID } from './core/sections'
import { About } from './features/about/About'
import { Header } from './features/header/Header'
import { Hero } from './features/hero/Hero'
import { ProjectsSection } from './features/projects/ProjectsSection'
import { Skills } from './features/skills/Skills'

function App() {
  return (
    <>
      <Header />
      <main id={MAIN_CONTENT_ID} tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <ProjectsSection />
      </main>
    </>
  )
}

export default App
