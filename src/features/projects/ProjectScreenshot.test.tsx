import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PROJECTS } from '../../data/projects'
import { renderWithProviders } from '../../test/render'
import { toMonogram } from './monogram'
import { ProjectScreenshot } from './ProjectScreenshot'

const project = PROJECTS[0]

describe('ProjectScreenshot', () => {
  it('lazy-loads the screenshot from the project repository', () => {
    renderWithProviders(<ProjectScreenshot project={project} />)

    const image = screen.getByRole('img', { name: `Captura de tela do projeto ${project.title}` })
    expect(image).toHaveAttribute(
      'src',
      `https://raw.githubusercontent.com/BrunoICosta/${project.repo}/main/docs/screenshot.png`,
    )
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('falls back to a placeholder when the screenshot is missing', () => {
    const { container } = renderWithProviders(<ProjectScreenshot project={project} />)

    fireEvent.error(screen.getByRole('img'))

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('Prévia indisponível')).toBeInTheDocument()
    expect(container.firstElementChild).toHaveAttribute('data-state', 'error')
  })
})

describe('toMonogram', () => {
  it.each([
    ['TV Explorer', 'TE'],
    ['Next E-commerce Store', 'NE'],
    ['Kanban', 'K'],
  ])('%s -> %s', (title, expected) => {
    expect(toMonogram(title)).toBe(expected)
  })
})
