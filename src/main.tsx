import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { I18nProvider } from './core/i18n/I18nProvider.tsx'
import { ThemeProvider } from './core/theme/ThemeProvider.tsx'
import { MotionProvider } from './shared/motion/MotionProvider.tsx'
import './styles/global.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root not found')

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <MotionProvider>
          <App />
        </MotionProvider>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)
