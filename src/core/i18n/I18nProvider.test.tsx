import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { I18nProvider } from './I18nProvider'
import { LANGUAGE_STORAGE_KEY } from './language'
import { translations } from './translations'
import { useI18n } from './useI18n'

const wrapper = ({ children }: { children: ReactNode }) => <I18nProvider>{children}</I18nProvider>

describe('I18nProvider', () => {
  it('defaults to pt-BR', () => {
    const { result } = renderHook(() => useI18n(), { wrapper })

    expect(result.current.language).toBe('pt-BR')
    expect(result.current.t.nav.projects).toBe('Projetos')
    expect(document.documentElement.lang).toBe('pt-BR')
  })

  it('switches to English, syncs the document and persists the choice', () => {
    const { result } = renderHook(() => useI18n(), { wrapper })

    act(() => result.current.toggleLanguage())

    expect(result.current.language).toBe('en')
    expect(result.current.t.nav.projects).toBe('Projects')
    expect(document.documentElement.lang).toBe('en')
    expect(document.title).toBe(translations.en.meta.title)
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en')
  })

  it('restores a previously saved language', () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en')
    const { result } = renderHook(() => useI18n(), { wrapper })
    expect(result.current.language).toBe('en')
  })
})
