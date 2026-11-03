import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LANGUAGE_STORAGE_KEY, type Language } from '../../core/i18n/language'
import { PROJECTS } from '../../data/projects'
import { renderWithProviders } from '../../test/render'
import { ProjectCard } from './ProjectCard'

const kanban = PROJECTS.find((project) => project.repo === 'angular-kanban-board')

function renderIn(language: Language) {
  if (!kanban) throw new Error('fixture project not found')
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  renderWithProviders(<ProjectCard project={kanban} />)
  return kanban
}

describe('ProjectCard', () => {
  it('renders in pt-BR', () => {
    const project = renderIn('pt-BR')

    expect(screen.getByRole('heading', { name: 'Kanban Board' })).toBeInTheDocument()
    expect(screen.getByText(project.description['pt-BR'])).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Tecnologias' })).toHaveTextContent('NgRx')
    expect(
      screen.getByText('Interface disponível em: Português (Brasil), English'),
    ).toBeInTheDocument()

    const code = screen.getByRole('link', { name: /^Código: Kanban Board/ })
    expect(code).toHaveAttribute('href', 'https://github.com/BrunoICosta/angular-kanban-board')
    const demo = screen.getByRole('link', { name: /^Demo: Kanban Board \(abre em nova aba\)/ })
    expect(demo).toHaveAttribute('href', 'https://portfolio.brunoisaac.dev/angular-kanban-board/')
  })

  it('renders in English', () => {
    const project = renderIn('en')

    expect(screen.getByText(project.description.en)).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Technologies' })).toBeInTheDocument()
    expect(
      screen.getByText('Interface available in: Português (Brasil), English'),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^Code: Kanban Board/ })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /\(opens in a new tab\)$/ })).toHaveLength(2)
  })

  it('shows the PT-BR / EN badge', () => {
    renderIn('pt-BR')
    expect(screen.getByText('PT-BR / EN')).toBeInTheDocument()
  })
})
