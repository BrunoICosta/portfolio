import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { LANGUAGE_STORAGE_KEY } from './core/i18n/language'
import { renderWithProviders } from './test/render'

describe('App', () => {
  it('renders every section in pt-BR by default', () => {
    renderWithProviders(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: /Bruno Vinicius Isaac Costa/ }),
    ).toBeInTheDocument()
    for (const name of [
      'Sobre mim',
      'Por onde passei',
      'Habilidades',
      'Projetos',
      'Vamos conversar?',
    ]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'Pular para o conteúdo' })).toHaveAttribute(
      'href',
      '#content',
    )
  })

  it('renders in English when that was the saved choice', () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en')
    renderWithProviders(<App />)

    for (const name of ['About me', "Where I've worked", 'Skills', 'Projects', "Let's talk?"]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument()
    }
    expect(document.documentElement.lang).toBe('en')
  })
})
