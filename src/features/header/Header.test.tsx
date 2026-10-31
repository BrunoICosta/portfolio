import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { LANGUAGE_STORAGE_KEY } from '../../core/i18n/language'
import { THEME_STORAGE_KEY } from '../../core/theme/theme'
import { renderWithProviders } from '../../test/render'
import { Header } from './Header'

describe('Header', () => {
  it('renders the section navigation in pt-BR', () => {
    renderWithProviders(<Header />)
    const nav = screen.getByRole('navigation', { name: 'Navegação principal' })
    expect(
      within(nav)
        .getAllByRole('link')
        .map((link) => link.textContent),
    ).toEqual(['Sobre', 'Habilidades', 'Projetos', 'Contato'])
  })

  it('switches the language, marks it as current and saves it', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)
    const switcher = screen.getByRole('group', { name: 'Idioma' })

    expect(within(switcher).getByRole('button', { name: 'Português' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )

    await user.click(within(switcher).getByRole('button', { name: 'English' }))

    expect(screen.getByRole('group', { name: 'Language' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en')
  })

  it('toggles the theme with a translated label', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)

    const current = document.documentElement.dataset.theme
    const button = screen.getByRole('button', { name: /Ativar tema (escuro|claro)/ })
    await user.click(button)

    expect(document.documentElement.dataset.theme).not.toBe(current)
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(document.documentElement.dataset.theme)
  })

  it('opens and closes the mobile menu with Escape', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)
    const menuButton = screen.getByRole('button', { name: 'Abrir menu de navegação' })

    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })
})
