/**
 * Pure routing rules for requests that did NOT match a static asset.
 *
 * Cloudflare serves every existing file in site/ directly (assets first), so the
 * Worker only sees "misses". This module decides what each miss becomes; it has
 * no Cloudflare dependencies so it can be unit tested with Vitest.
 */

export interface AppConfig {
  repo: string
  /**
   * How unknown routes inside the app are answered:
   * - "spa" (default): serve the app's index.html with 200 (client-side router).
   * - "404": the app exports real HTML per route (Next.js static export), so an
   *   unknown route is a genuine miss: serve the app's own 404 page with 404.
   */
  fallback?: 'spa' | '404'
}

export interface AssetCandidate {
  /** Canonical asset path (no ".html": Cloudflare's html_handling maps it). */
  path: string
  status: number
}

export type RouteDecision =
  | { kind: 'redirect'; location: string; status: 301 }
  | { kind: 'not-found' }
  | { kind: 'method-not-allowed' }
  | { kind: 'assets'; candidates: readonly AssetCandidate[] }

/** True when the last path segment looks like a file (e.g. main.js, logo.png). */
export function hasFileExtension(pathname: string): boolean {
  const lastSegment = pathname.slice(pathname.lastIndexOf('/') + 1)
  return /\.[a-z0-9]{1,8}$/i.test(lastSegment)
}

/**
 * Next.js 16 static export writes segment-prefetch payloads as nested files
 * (`__next.$d$locale/produtos/__PAGE__.txt`) while the client requests the dotted
 * form (`__next.$d$locale.produtos.__PAGE__.txt`). Returns the nested path, or null.
 */
export function nextSegmentPrefetchPath(pathname: string): string | null {
  const slash = pathname.lastIndexOf('/')
  const file = pathname.slice(slash + 1)
  const match = /^__next\.(.+)\.txt$/.exec(file)
  if (!match) return null
  const parts = match[1].split('.')
  if (parts.length < 2) return null
  const [first, ...rest] = parts
  return `${pathname.slice(0, slash + 1)}__next.${first}/${rest.join('/')}.txt`
}

export function resolveMiss(
  method: string,
  url: Pick<URL, 'pathname' | 'search'>,
  apps: readonly AppConfig[],
): RouteDecision {
  if (method !== 'GET' && method !== 'HEAD') return { kind: 'method-not-allowed' }

  const { pathname, search } = url
  const firstSegment = pathname.split('/')[1] ?? ''
  const app = apps.find((candidate) => candidate.repo === firstSegment)

  if (app) {
    const base = `/${app.repo}/`

    // "/react-recipe-finder" -> "/react-recipe-finder/" so relative asset URLs resolve.
    if (pathname === `/${app.repo}`) {
      return { kind: 'redirect', location: `${base}${search}`, status: 301 }
    }

    const prefetch = app.fallback === '404' ? nextSegmentPrefetchPath(pathname) : null
    if (prefetch) return { kind: 'assets', candidates: [{ path: prefetch, status: 200 }] }

    // A missing JS/CSS/image must stay a 404: answering with HTML breaks module loading
    // and hides deploy problems.
    if (hasFileExtension(pathname)) return { kind: 'not-found' }

    if (app.fallback === '404') {
      return { kind: 'assets', candidates: [{ path: `${base}404`, status: 404 }] }
    }
    return { kind: 'assets', candidates: [{ path: base, status: 200 }] }
  }

  // Outside the apps: the portfolio itself (single page, no client routes).
  if (hasFileExtension(pathname)) return { kind: 'not-found' }
  return {
    kind: 'assets',
    candidates: [
      { path: '/404', status: 404 },
      { path: '/', status: 200 },
    ],
  }
}

/** Headers added to every response produced by the Worker. */
export const SECURITY_HEADERS: Readonly<Record<string, string>> = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}
