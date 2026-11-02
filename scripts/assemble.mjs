#!/usr/bin/env node
/**
 * Assembles the single Cloudflare deployment in ./site:
 *
 *   site/                 <- portfolio build (dist/)
 *   site/<repo>/          <- each app's build output (apps.json -> "out")
 *   site/_headers         <- security + cache headers for static assets
 *
 * Local mode (default): builds the portfolio and copies each app from
 *   <repos-dir>/<repo>/<out>   (repos dir defaults to the parent folder of this repo)
 *
 * CI mode (--artifacts <dir>): copies already-built outputs downloaded by the workflow:
 *   <dir>/portfolio            and   <dir>/app-<repo>
 *
 * Options:
 *   --repos <dir>       where the app repositories live (local mode)
 *   --artifacts <dir>   downloaded workflow artifacts (CI mode)
 *   --only a,b          assemble only these apps (handy for local tests)
 *   --allow-missing     warn instead of failing when an app output is missing
 *   --skip-build        reuse the existing portfolio dist/ (local mode)
 */
import { execSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const siteDir = join(root, 'site')

const { values } = parseArgs({
  options: {
    repos: { type: 'string', default: resolve(root, '..') },
    artifacts: { type: 'string' },
    only: { type: 'string' },
    'allow-missing': { type: 'boolean', default: false },
    'skip-build': { type: 'boolean', default: false },
  },
})

const apps = JSON.parse(readFileSync(join(root, 'apps.json'), 'utf8'))
const only = values.only ? new Set(values.only.split(',').map((name) => name.trim())) : null
const selected = only ? apps.filter((app) => only.has(app.repo)) : apps
if (only && selected.length !== only.size) {
  const known = new Set(apps.map((app) => app.repo))
  const unknown = [...only].filter((name) => !known.has(name))
  throw new Error(`Unknown app(s) in --only: ${unknown.join(', ')}`)
}

function copyBuild(from, to, label, { optional = false } = {}) {
  if (!existsSync(join(from, 'index.html'))) {
    const message = `${label}: no index.html in ${from}`
    if (optional) {
      console.warn(`! skipped ${message}`)
      return false
    }
    throw new Error(message)
  }
  cpSync(from, to, { recursive: true })
  console.log(`+ ${label} <- ${from}`)
  return true
}

rmSync(siteDir, { recursive: true, force: true })
mkdirSync(siteDir, { recursive: true })

// 1. Portfolio at the root.
let portfolioDist = join(root, 'dist')
if (values.artifacts) {
  portfolioDist = join(resolve(values.artifacts), 'portfolio')
} else if (!values['skip-build']) {
  execSync('npm run build', { cwd: root, stdio: 'inherit' })
}
copyBuild(portfolioDist, siteDir, 'portfolio')

// 2. Apps under /<repo>/.
const assembled = []
for (const app of selected) {
  const from = values.artifacts
    ? join(resolve(values.artifacts), `app-${app.repo}`)
    : join(resolve(values.repos), app.repo, app.out)
  const target = join(siteDir, app.repo)
  // SPA fallback is done by the Worker; drop GitHub Pages-era 404.html copies of index.html.
  if (copyBuild(from, target, app.repo, { optional: values['allow-missing'] })) {
    assembled.push(app)
    if (app.fallback !== '404') rmSync(join(target, '404.html'), { force: true })
  }
}

// 3. Headers: security for everything, long cache for content-hashed files.
const immutable = 'public, max-age=31536000, immutable'
const headerRules = [
  ['/*', ['X-Content-Type-Options: nosniff', 'Referrer-Policy: strict-origin-when-cross-origin']],
  ['/assets/*', [`Cache-Control: ${immutable}`]],
  // Vite apps emit hashed files under /<repo>/assets/, Next.js under /_next/static/.
  ['/:app/assets/*', [`Cache-Control: ${immutable}`]],
  ['/:app/_next/static/*', [`Cache-Control: ${immutable}`]],
]
writeFileSync(
  join(siteDir, '_headers'),
  headerRules
    .map(([path, lines]) => [path, ...lines.map((line) => `  ${line}`)].join('\n'))
    .join('\n') + '\n',
)

console.log(`\nAssembled ${assembled.length}/${apps.length} app(s) into ${siteDir}`)
