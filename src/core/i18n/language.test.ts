import { describe, expect, it, vi } from 'vitest'
import { detectBrowserLanguage, getInitialLanguage, LANGUAGE_STORAGE_KEY } from './language'

describe('detectBrowserLanguage', () => {
  it.each([
    [['pt-BR'], 'pt-BR'],
    [['pt-PT', 'en'], 'pt-BR'],
    [['PT'], 'pt-BR'],
    [['en-US', 'pt-BR'], 'en'],
    [['es-ES'], 'en'],
  ] as const)('%j -> %s', (preferred, expected) => {
    expect(detectBrowserLanguage(preferred)).toBe(expected)
  })

  it('returns null when the browser has no preference', () => {
    expect(detectBrowserLanguage([])).toBeNull()
    expect(detectBrowserLanguage([''])).toBeNull()
  })
})

describe('getInitialLanguage', () => {
  it('prefers the saved choice over the browser language', () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['pt-BR'])
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en')
    expect(getInitialLanguage()).toBe('en')
  })

  it('uses the browser language on the first visit', () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['en-GB'])
    expect(getInitialLanguage()).toBe('en')
  })

  it('ignores an invalid saved value', () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'fr')
    expect(getInitialLanguage()).toBe('pt-BR')
  })

  it('falls back to pt-BR without any preference', () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue([])
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('')
    expect(getInitialLanguage()).toBe('pt-BR')
  })
})
