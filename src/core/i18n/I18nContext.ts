import { createContext } from 'react'
import type { Language } from './language'
import type { Dictionary } from './translations'

export interface I18nContextValue {
  language: Language
  t: Dictionary
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

export const I18nContext = createContext<I18nContextValue | null>(null)
