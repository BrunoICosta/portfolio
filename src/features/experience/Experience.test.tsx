import { screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LANGUAGE_STORAGE_KEY, type Language } from '../../core/i18n/language'
import { renderWithProviders } from '../../test/render'
import { Experience } from './Experience'

function renderIn(language: Language) {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  return renderWithProviders(<Experience />)
}

function entry(role: string, company: RegExp) {
  const articles = screen.getAllByRole('article', { name: role })
  const match = articles.find((article) => company.test(article.textContent ?? ''))
  if (!match) throw new Error(`no ${role} entry for ${company}`)
  return match
}

describe('Experience', () => {
  beforeEach(() => {
    // Fixed "today" so the duration of the current position is deterministic.
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 10, 15))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the timeline in pt-BR, most recent first', () => {
    renderIn('pt-BR')

    expect(screen.getByRole('heading', { level: 2, name: 'Por onde passei' })).toBeInTheDocument()
    const timeline = screen.getByRole('list', { name: 'Linha do tempo profissional' })
    const items = within(timeline).getAllByRole('article')
    expect(items).toHaveLength(5)
    expect(items[0]).toHaveTextContent('ACT Digital · cliente Banco Safra')

    const current = entry('Analista de Sistemas', /ACT Digital/)
    expect(current).toHaveTextContent('jul. de 2021 até o momento')
    expect(current).toHaveTextContent('5 anos e 4 meses')
    expect(current).toHaveTextContent('Atual')
    expect(within(current).getByText('jul. de 2021').tagName).toBe('TIME')
    expect(within(current).getByText('jul. de 2021')).toHaveAttribute('datetime', '2021-07')
    expect(within(current).getByRole('list', { name: 'Tecnologias e práticas' })).toHaveTextContent(
      'Code review',
    )

    const bradesco = entry('Analista de Sistemas', /Bradesco/)
    expect(bradesco).toHaveTextContent('abr. de 2021 a jul. de 2021')
    expect(bradesco).toHaveTextContent('3 meses')
  })

  it('renders in English', () => {
    renderIn('en')

    expect(screen.getByRole('heading', { level: 2, name: "Where I've worked" })).toBeInTheDocument()
    const current = entry('Systems Analyst', /ACT Digital/)
    expect(current).toHaveTextContent('ACT Digital · client Banco Safra')
    expect(current).toHaveTextContent('Jul 2021 to present')
    expect(current).toHaveTextContent('5 yrs 4 mos')

    expect(entry('IT Intern', /SEPLAG/)).toHaveTextContent('Aug 2018 to Nov 2018')
    expect(screen.getByText("Bachelor's Degree in Information Systems")).toBeInTheDocument()
  })

  it('lists education and links to the full resume', () => {
    renderIn('pt-BR')

    expect(screen.getByRole('heading', { name: 'Formação e certificações' })).toBeInTheDocument()
    expect(screen.getByText('Faculdade Projeção, 2020')).toBeInTheDocument()
    expect(screen.getByText('Kanban Foundation (KIKF)')).toBeInTheDocument()

    const resume = screen.getByRole('link', { name: /Baixar currículo completo/ })
    expect(resume).toHaveAttribute('href', '/cv/Bruno-Costa-Curriculo.pdf')
    expect(resume).toHaveAttribute('download', 'Bruno-Costa-Curriculo.pdf')
  })
})
