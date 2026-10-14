/**
 * Thin wrappers around localStorage that never throw. Storage can be
 * unavailable (private mode, blocked cookies, SSR-like test environments),
 * and user preferences are a nice-to-have, never a hard requirement.
 */
export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Ignore quota / security errors: the preference just won't persist.
  }
}
