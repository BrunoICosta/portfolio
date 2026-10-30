import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

// jsdom lacks these browser APIs; motion's whileInView and theme detection rely on them.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = '0px'
  readonly scrollMargin = '0px'
  readonly thresholds: readonly number[] = []
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}
window.IntersectionObserver = IntersectionObserverStub

if (!window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

// jsdom reports en-US; most tests assert the pt-BR default, so pin the browser language.
beforeEach(() => {
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['pt-BR'])
})

afterEach(() => {
  cleanup()
  window.localStorage.clear()
  delete document.documentElement.dataset.theme
})
