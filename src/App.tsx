import { MAIN_CONTENT_ID } from './core/sections'
import { Header } from './features/header/Header'
import { Hero } from './features/hero/Hero'

function App() {
  return (
    <>
      <Header />
      <main id={MAIN_CONTENT_ID} tabIndex={-1}>
        <Hero />
      </main>
    </>
  )
}

export default App
