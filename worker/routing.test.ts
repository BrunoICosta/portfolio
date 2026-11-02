import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import apps from '../apps.json'
import { hasFileExtension, nextSegmentPrefetchPath, resolveMiss, type AppConfig } from './routing'

const APPS: AppConfig[] = [
  { repo: 'react-recipe-finder' },
  { repo: 'angular-kanban-board', fallback: 'spa' },
  { repo: 'next-ecommerce-store', fallback: '404' },
]

const miss = (pathname: string, search = '', method = 'GET') =>
  resolveMiss(method, { pathname, search }, APPS)

describe('hasFileExtension', () => {
  it.each([
    ['/app/assets/index-abc123.js', true],
    ['/app/logo.PNG', true],
    ['/app/fonts/inter.woff2', true],
    ['/app/recipes/52772', false],
    ['/app/', false],
    ['/app/v1.2/details', false],
  ])('%s -> %s', (pathname, expected) => {
    expect(hasFileExtension(pathname)).toBe(expected)
  })
})

describe('nextSegmentPrefetchPath', () => {
  it('maps dotted Next.js prefetch requests to the nested exported files', () => {
    expect(
      nextSegmentPrefetchPath('/next-ecommerce-store/pt-BR/__next.$d$locale.__PAGE__.txt'),
    ).toBe('/next-ecommerce-store/pt-BR/__next.$d$locale/__PAGE__.txt')
    expect(
      nextSegmentPrefetchPath(
        '/next-ecommerce-store/pt-BR/produtos/__next.$d$locale.produtos.__PAGE__.txt',
      ),
    ).toBe('/next-ecommerce-store/pt-BR/produtos/__next.$d$locale/produtos/__PAGE__.txt')
  })

  it('ignores files that are not segment prefetches', () => {
    expect(nextSegmentPrefetchPath('/next-ecommerce-store/pt-BR/__next._tree.txt')).toBeNull()
    expect(nextSegmentPrefetchPath('/next-ecommerce-store/robots.txt')).toBeNull()
  })
})

describe('resolveMiss', () => {
  it('redirects an app path without trailing slash, keeping the query', () => {
    expect(miss('/react-recipe-finder', '?q=pasta')).toEqual({
      kind: 'redirect',
      location: '/react-recipe-finder/?q=pasta',
      status: 301,
    })
  })

  it('serves the SPA index for deep client-side routes', () => {
    expect(miss('/react-recipe-finder/recipes/52772')).toEqual({
      kind: 'assets',
      candidates: [{ path: '/react-recipe-finder/', status: 200 }],
    })
    expect(miss('/angular-kanban-board/boards/1/cards')).toEqual({
      kind: 'assets',
      candidates: [{ path: '/angular-kanban-board/', status: 200 }],
    })
  })

  it('rewrites Next.js segment prefetches only for the statically exported app', () => {
    expect(miss('/next-ecommerce-store/en/__next.$d$locale.__PAGE__.txt')).toEqual({
      kind: 'assets',
      candidates: [{ path: '/next-ecommerce-store/en/__next.$d$locale/__PAGE__.txt', status: 200 }],
    })
    expect(miss('/react-recipe-finder/__next.a.b.txt')).toEqual({ kind: 'not-found' })
  })

  it('answers missing files inside an app with a plain 404', () => {
    expect(miss('/react-recipe-finder/assets/missing-123.js')).toEqual({ kind: 'not-found' })
    expect(miss('/next-ecommerce-store/_next/static/chunks/gone.js')).toEqual({
      kind: 'not-found',
    })
  })

  it("serves the Next.js app's own 404 page with status 404", () => {
    expect(miss('/next-ecommerce-store/produto-inexistente/')).toEqual({
      kind: 'assets',
      candidates: [{ path: '/next-ecommerce-store/404', status: 404 }],
    })
  })

  it('falls back to the portfolio 404 page, then the home page, outside the apps', () => {
    expect(miss('/some/unknown/page')).toEqual({
      kind: 'assets',
      candidates: [
        { path: '/404', status: 404 },
        { path: '/', status: 200 },
      ],
    })
  })

  it('matches whole path segments only, not repo-name prefixes', () => {
    expect(miss('/react-recipe-finder-old/')).toMatchObject({
      candidates: [{ path: '/404', status: 404 }, expect.anything()],
    })
  })

  it('returns a plain 404 for missing portfolio files', () => {
    expect(miss('/favicon.ico')).toEqual({ kind: 'not-found' })
  })

  it('rejects methods other than GET and HEAD', () => {
    expect(miss('/react-recipe-finder/', '', 'POST')).toEqual({ kind: 'method-not-allowed' })
    expect(miss('/', '', 'HEAD')).toMatchObject({ kind: 'assets' })
  })
})

describe('apps.json', () => {
  it('lists the 11 apps with a build command and an output dir', () => {
    expect(apps).toHaveLength(11)
    for (const app of apps) {
      expect(app.repo).toMatch(/^[a-z0-9-]+$/)
      expect(app.build).toBe('npm run build:cf')
      expect(app.out).not.toMatch(/^\/|\.\./)
    }
  })

  it('only uses the 404 fallback for the statically exported Next.js store', () => {
    const withPageFallback = apps.filter((app) => 'fallback' in app).map((app) => app.repo)
    expect(withPageFallback).toEqual(['next-ecommerce-store'])
  })
})

describe('wrangler.jsonc', () => {
  it('runs the Worker first for every app root, so "/<app>" gets a 301', () => {
    // Vitest runs from the repository root.
    const jsonc = readFileSync('wrangler.jsonc', 'utf8')
    const json = jsonc.replace(/^\s*\/\/.*$/gm, '').replace(/,(\s*[}\]])/g, '$1')
    const config = JSON.parse(json) as { assets: { run_worker_first: string[] } }

    expect(config.assets.run_worker_first).toEqual(apps.map((app) => `/${app.repo}`))
  })
})
