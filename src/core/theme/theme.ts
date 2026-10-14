import { readStorage } from '../storage'

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'bc-theme'

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

/**
 * Resolution order: explicit user choice (localStorage) -> OS preference -> light.
 * Mirrors the inline script in index.html so the first paint already has the right theme.
 */
export function getInitialTheme(): Theme {
  const stored = readStorage(THEME_STORAGE_KEY)
  if (isTheme(stored)) return stored

  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
}
