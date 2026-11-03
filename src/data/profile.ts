import type { Localized } from '../core/i18n/language'

/**
 * Public contact address per language (Cloudflare Email Routing forwards both to the same inbox).
 */
export const CONTACT_EMAIL: Localized = {
  'pt-BR': 'contato@brunoisaac.dev',
  en: 'hello@brunoisaac.dev',
}

/** Downloadable CV per language (files in public/cv). */
export const RESUME: Localized<{ href: string; fileName: string }> = {
  'pt-BR': { href: '/cv/Bruno-Costa-Curriculo.pdf', fileName: 'Bruno-Costa-Curriculo.pdf' },
  en: { href: '/cv/Bruno-Costa-Resume.pdf', fileName: 'Bruno-Costa-Resume.pdf' },
}

export const PROFILE = {
  name: 'Bruno Vinicius Isaac Costa',
  shortName: 'Bruno Costa',
  githubUser: 'BrunoICosta',
  githubUrl: 'https://github.com/BrunoICosta',
  siteUrl: 'https://portfolio.brunoisaac.dev/',
} as const

/**
 * LinkedIn profile URL (percent-encoded). When empty, the LinkedIn link is hidden everywhere on the site.
 */
export const LINKEDIN_URL: string =
  'https://www.linkedin.com/in/bruno-vin%C3%ADcius-isaac-costa-a90758156/'
