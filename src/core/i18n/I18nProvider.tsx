import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { writeStorage } from '../storage'
import { I18nContext, type I18nContextValue } from './I18nContext'
import { getInitialLanguage, LANGUAGE_STORAGE_KEY, type Language } from './language'
import { translations } from './translations'

/** Keeps <html lang>, the tab title and the meta description in sync with the UI language. */
function syncDocument(language: Language): void {
  const { meta } = translations[language]
  document.documentElement.lang = language
  document.title = meta.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    syncDocument(language)
  }, [language])

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
    writeStorage(LANGUAGE_STORAGE_KEY, next)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR')
  }, [language, setLanguage])

  const value = useMemo<I18nContextValue>(
    () => ({ language, t: translations[language], setLanguage, toggleLanguage }),
    [language, setLanguage, toggleLanguage],
  )

  return <I18nContext value={value}>{children}</I18nContext>
}
