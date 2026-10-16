import { MAIN_CONTENT_ID } from './core/sections'
import { Header } from './features/header/Header'

function App() {
  return (
    <>
      <Header />
      <main id={MAIN_CONTENT_ID} tabIndex={-1}>
        <div className="container">
          <h1>Bruno Vinicius Isaac Costa</h1>
        </div>
      </main>
    </>
  )
}

export default App
