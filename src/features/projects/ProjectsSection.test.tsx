import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '../../test/render'
import { ProjectsSection } from './ProjectsSection'

function cardTitles(): string[] {
  const section = screen.getByRole('region', { name: 'Projetos' })
  return within(section)
    .getAllByRole('heading', { level: 3 })
    .map((heading) => heading.textContent ?? '')
}

describe('ProjectsSection', () => {
  it('shows every project by default', () => {
    renderWithProviders(<ProjectsSection />)

    expect(cardTitles()).toHaveLength(11)
    expect(screen.getByRole('button', { name: /Todos/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('status')).toHaveTextContent('11 projetos')
  })

  it('filters by technology and announces the new count', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProjectsSection />)

    await user.click(screen.getByRole('button', { name: /Angular/ }))

    expect(cardTitles()).toHaveLength(5)
    expect(cardTitles()).toContain('Quadro Kanban')
    expect(cardTitles()).not.toContain('Receitário')
    expect(screen.getByRole('button', { name: /Angular/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('status')).toHaveTextContent('5 projetos')

    await user.click(screen.getByRole('button', { name: /React/ }))

    expect(cardTitles()).toHaveLength(6)
    expect(cardTitles()).toContain('Loja Virtual com Next.js')
  })
})
