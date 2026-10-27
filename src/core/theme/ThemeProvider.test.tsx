import { act, render, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { getInitialTheme, THEME_STORAGE_KEY } from './theme'
import { ThemeProvider } from './ThemeProvider'
import { useTheme } from './useTheme'

const wrapper = ({ children }: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>

function mockPrefersDark(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) => ({ matches, media: query }) as MediaQueryList,
  )
}

describe('getInitialTheme', () => {
  it('prefers the stored choice over the OS preference', () => {
    mockPrefersDark(true)
    localStorage.setItem(THEME_STORAGE_KEY, 'light')
    expect(getInitialTheme()).toBe('light')
  })

  it('falls back to the OS preference', () => {
    mockPrefersDark(true)
    expect(getInitialTheme()).toBe('dark')
  })

  it('ignores invalid stored values', () => {
    mockPrefersDark(false)
    localStorage.setItem(THEME_STORAGE_KEY, 'sepia')
    expect(getInitialTheme()).toBe('light')
  })
})

describe('ThemeProvider', () => {
  it('applies the theme to <html> and toggles it', () => {
    mockPrefersDark(false)
    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current.theme).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')

    act(() => result.current.toggleTheme())

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })

  it('throws a helpful error when used outside the provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    function Orphan() {
      useTheme()
      return null
    }
    expect(() => render(<Orphan />)).toThrow(/ThemeProvider/)
  })
})
