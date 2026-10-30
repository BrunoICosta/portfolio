import { useEffect, useId, useRef, useState } from 'react'
import { LANGUAGE_LABELS, LANGUAGES } from '../../core/i18n/language'
import { useI18n } from '../../core/i18n/useI18n'
import { SECTION_IDS } from '../../core/sections'
import { useTheme } from '../../core/theme/useTheme'
import { Icon } from '../../shared/components/Icon'
import styles from './Header.module.css'

export function Header() {
  const { t, language, setLanguage } = useI18n()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    // Close the mobile menu when the user taps anywhere outside the header.
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  const isDark = theme === 'dark'

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#content" className={styles.logo} aria-label={t.header.homeLink}>
          <span className={styles.mark} aria-hidden="true">
            BC
          </span>
          <span className={styles.logoText} aria-hidden="true">
            Bruno Costa
          </span>
        </a>

        <nav aria-label={t.header.navLabel} className={styles.nav}>
          <ul id={menuId} className={styles.links} data-open={menuOpen}>
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={styles.link} onClick={() => setMenuOpen(false)}>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div role="group" aria-label={t.header.languageLabel} className={styles.languages}>
            {LANGUAGES.map((option) => (
              <button
                key={option}
                type="button"
                lang={option}
                className={styles.language}
                aria-pressed={option === language}
                title={LANGUAGE_LABELS[option].name}
                onClick={() => setLanguage(option)}
              >
                <span aria-hidden="true">{LANGUAGE_LABELS[option].short}</span>
                <span className="visually-hidden">{LANGUAGE_LABELS[option].name}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label={isDark ? t.header.themeToLight : t.header.themeToDark}
            title={isDark ? t.header.themeToLight : t.header.themeToDark}
          >
            <Icon name={isDark ? 'sun' : 'moon'} />
          </button>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.menuButton}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={t.header.menu}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  )
}
