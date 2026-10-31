import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { useI18n } from '../../core/i18n/useI18n'

interface ExternalLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'target' | 'rel'
> {
  href: string
  children: ReactNode
}

/** Opens in a new tab safely and tells screen reader users that it will. */
export function ExternalLink({ children, ...rest }: ExternalLinkProps) {
  const { t } = useI18n()
  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children} <span className="visually-hidden">{t.a11y.opensInNewTab}</span>
    </a>
  )
}
