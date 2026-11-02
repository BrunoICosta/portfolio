import apps from '../apps.json'
import { resolveMiss, SECURITY_HEADERS, type AppConfig } from './routing'

/** Minimal shape of the static assets binding (avoids a dependency on workers-types). */
interface AssetsBinding {
  fetch(request: Request): Promise<Response>
}

export interface Env {
  ASSETS: AssetsBinding
}

const APPS: readonly AppConfig[] = apps as readonly AppConfig[]

function withHeaders(response: Response, status = response.status): Response {
  const headers = new Headers(response.headers)
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) headers.set(name, value)
  return new Response(response.body, { status, statusText: '', headers })
}

function plain(status: number, body: string, extra: Record<string, string> = {}): Response {
  return withHeaders(
    new Response(body, {
      status,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', ...extra },
    }),
  )
}

/**
 * Fetches an asset by its canonical path, following the binding's own
 * html_handling redirects (e.g. /404.html -> /404) internally.
 */
async function fetchAsset(env: Env, request: Request, path: string): Promise<Response | null> {
  let url = new URL(path, request.url)
  for (let hop = 0; hop < 3; hop += 1) {
    const response = await env.ASSETS.fetch(new Request(url, { method: request.method }))
    if (response.ok) return response
    const location = response.headers.get('Location')
    if (response.status >= 300 && response.status < 400 && location) {
      url = new URL(location, url)
      continue
    }
    return null
  }
  return null
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const decision = resolveMiss(request.method, url, APPS)

    switch (decision.kind) {
      case 'redirect':
        return withHeaders(
          new Response(null, { status: decision.status, headers: { Location: decision.location } }),
        )
      case 'method-not-allowed':
        return plain(405, 'Method Not Allowed', { Allow: 'GET, HEAD' })
      case 'not-found':
        return plain(404, 'Not Found')
      case 'assets':
        for (const candidate of decision.candidates) {
          const response = await fetchAsset(env, request, candidate.path)
          if (response) return withHeaders(response, candidate.status)
        }
        return plain(404, 'Not Found')
    }
  },
}
