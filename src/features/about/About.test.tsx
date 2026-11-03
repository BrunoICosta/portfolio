import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LANGUAGE_STORAGE_KEY } from '../../core/i18n/language'
import { renderWithProviders } from '../../test/render'
import { About } from './About'

describe('About', () => {
  it('shows the photo with a translated alt text and fixed dimensions', () => {
    renderWithProviders(<About />)

    const photo = screen.getByRole('img', { name: 'Foto de Bruno Vinicius Isaac Costa' })
    expect(photo).toHaveAttribute('src', '/img/bruno.jpg')
    expect(photo).toHaveAttribute('loading', 'lazy')
    expect(photo).toHaveAttribute('width', '640')
    expect(photo).toHaveAttribute('height', '800')
    expect(photo.closest('picture')?.querySelector('source')).toHaveAttribute(
      'srcset',
      '/img/bruno.webp',
    )
  })

  it('summarizes the career and the highlights', () => {
    renderWithProviders(<About />)

    expect(screen.getByText(/mais de 6 anos de experiência/)).toBeInTheDocument()
    expect(screen.getByText('6+')).toBeInTheDocument()
    expect(screen.getByText('10 s → 0,6 s')).toBeInTheDocument()
    expect(screen.getByText('grandes bancos atendidos')).toBeInTheDocument()
  })

  it('renders in English', () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en')
    renderWithProviders(<About />)

    expect(
      screen.getByRole('img', { name: 'Photo of Bruno Vinicius Isaac Costa' }),
    ).toBeInTheDocument()
    expect(screen.getByText('10 s → 0.6 s')).toBeInTheDocument()
    expect(screen.getByText('major banks served')).toBeInTheDocument()
  })
})
