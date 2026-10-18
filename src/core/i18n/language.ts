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

/** pt-BR is the default audience; English only when the visitor picked it before. */
export function getInitialLanguage(): Language {
  const stored = readStorage(LANGUAGE_STORAGE_KEY)
  return isLanguage(stored) ? stored : DEFAULT_LANGUAGE
}

/** Text that is either language-neutral (e.g. "TypeScript") or translated per language. */
export type Translatable = string | Localized

export function translate(text: Translatable, language: Language): string {
  return typeof text === 'string' ? text : text[language]
}
