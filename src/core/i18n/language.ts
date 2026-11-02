import { readStorage } from '../storage'

export const LANGUAGES = ['pt-BR', 'en'] as const
export type Language = (typeof LANGUAGES)[number]

export const DEFAULT_LANGUAGE: Language = 'pt-BR'
export const LANGUAGE_STORAGE_KEY = 'bc-lang'

/** A value available in every supported language. */
export type Localized<T = string> = Record<Language, T>

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value)
}

/** Short label and native name, shown in the language switcher. */
export const LANGUAGE_LABELS: Record<Language, { short: string; name: string }> = {
  'pt-BR': { short: 'PT', name: 'Português (Brasil)' },
  en: { short: 'EN', name: 'English' },
}

/**
 * Maps the browser's preferred languages to a supported one:
 * any "pt*" tag -> pt-BR, anything else -> en. No preference -> null.
 */
export function detectBrowserLanguage(preferred: readonly string[]): Language | null {
  const first = preferred.find(Boolean)
  if (!first) return null
  return first.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en'
}

function browserLanguages(): readonly string[] {
  if (typeof navigator === 'undefined') return []
  return navigator.languages?.length ? navigator.languages : [navigator.language]
}

/** Resolution order: saved choice > browser language > pt-BR. */
export function getInitialLanguage(): Language {
  const stored = readStorage(LANGUAGE_STORAGE_KEY)
  if (isLanguage(stored)) return stored
  return detectBrowserLanguage(browserLanguages()) ?? DEFAULT_LANGUAGE
}

/** Text that is either language-neutral (e.g. "TypeScript") or translated per language. */
export type Translatable = string | Localized

export function translate(text: Translatable, language: Language): string {
  return typeof text === 'string' ? text : text[language]
}
