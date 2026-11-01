import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '../../test/render'
import { LINKEDIN_URL } from '../../data/profile'
import { Contact } from './Contact'

describe('Contact', () => {
  it('links to email and GitHub', () => {
    renderWithProviders(<Contact />)

    expect(screen.getByRole('link', { name: /brunoisaacosta@hotmail\.com/ })).toHaveAttribute(
      'href',
      'mailto:brunoisaacosta@hotmail.com',
    )
    const github = screen.getByRole('link', { name: /GitHub/ })
    expect(github).toHaveAttribute('href', 'https://github.com/BrunoICosta')
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('links to the LinkedIn profile', () => {
    renderWithProviders(<Contact />)
    const linkedin = screen.getByRole('link', { name: /LinkedIn/ })
    expect(linkedin).toHaveAttribute('href', LINKEDIN_URL)
    expect(linkedin).toHaveAttribute('target', '_blank')
  })

  it('copies the email and confirms it', async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    renderWithProviders(<Contact />)

    await user.click(screen.getByRole('button', { name: 'Copiar e-mail' }))

    expect(writeText).toHaveBeenCalledWith('brunoisaacosta@hotmail.com')
    expect(await screen.findByText('E-mail copiado!')).toBeInTheDocument()
  })

  it('reports when copying fails', async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('denied'))
    renderWithProviders(<Contact />)

    await user.click(screen.getByRole('button', { name: 'Copiar e-mail' }))

    expect(await screen.findByText(/Não foi possível copiar/)).toBeInTheDocument()
  })
})
