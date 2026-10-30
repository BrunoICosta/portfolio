import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '../../test/render'
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

  it('hides the LinkedIn link while LINKEDIN_URL is empty', () => {
    renderWithProviders(<Contact />)
    expect(screen.queryByRole('link', { name: /LinkedIn/ })).not.toBeInTheDocument()
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
