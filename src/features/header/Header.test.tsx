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
    ).toEqual(['Sobre', 'Experiência', 'Habilidades', 'Projetos', 'Contato'])
  })

  it('shows the profile photo inside the home link', () => {
    renderWithProviders(<Header />)

    const home = screen.getByRole('link', { name: 'Bruno Costa, voltar ao início' })
    const photo = home.querySelector('img')
    expect(photo).toHaveAttribute('src', '/img/bruno-avatar.webp')
    // Decorative: the link's aria-label already names it.
    expect(photo).toHaveAttribute('alt', '')
    expect(photo).toHaveAttribute('width', '36')
    expect(photo).toHaveAttribute('height', '36')
    expect(photo).toHaveAttribute('decoding', 'async')
    expect(screen.queryByText('BC')).not.toBeInTheDocument()
  })

  it('switches the language, marks it as current and saves it', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)
    const switcher = screen.getByRole('group', { name: 'Idioma' })

    expect(within(switcher).getByRole('button', { name: 'Português (Brasil)' })).toHaveAttribute(
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

  it('renders accessible flag buttons for each language', () => {
    renderWithProviders(<Header />)
    const switcher = screen.getByRole('group', { name: 'Idioma' })
    const portuguese = within(switcher).getByRole('button', { name: 'Português (Brasil)' })
    const english = within(switcher).getByRole('button', { name: 'English' })

    expect(portuguese).toHaveAttribute('lang', 'pt-BR')
    expect(portuguese).toHaveAttribute('title', 'Português (Brasil)')
    expect(english).toHaveAttribute('lang', 'en')
    expect(english).toHaveAttribute('aria-pressed', 'false')
    for (const flag of switcher.querySelectorAll('svg')) {
      expect(flag).toHaveAttribute('aria-hidden', 'true')
    }
  })

  it('switches back to Portuguese and persists it', async () => {
    const user = userEvent.setup()
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en')
    renderWithProviders(<Header />)

    await user.click(screen.getByRole('button', { name: 'Português (Brasil)' }))

    expect(screen.getByRole('group', { name: 'Idioma' })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('pt-BR')
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('pt-BR')
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
