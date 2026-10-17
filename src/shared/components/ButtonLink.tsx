import type { AnchorHTMLAttributes, ReactNode } from 'react'
import styles from './ButtonLink.module.css'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'sm'
  children: ReactNode
}

/** An anchor styled as a button: navigation stays semantic (<a>), looks consistent. */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={[styles.button, className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-size={size}
      {...rest}
    >
      {children}
    </a>
  )
}
