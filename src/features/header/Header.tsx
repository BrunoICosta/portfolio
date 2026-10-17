import { useEffect, useId, useState } from 'react'
import { useI18n } from '../../core/i18n/useI18n'
import { SECTION_IDS } from '../../core/sections'
import { useTheme } from '../../core/theme/useTheme'
import { Icon } from '../../shared/components/Icon'
import styles from './Header.module.css'

export function Header() {
  const { t, toggleLanguage } = useI18n()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const isDark = theme === 'dark'

  return (
    <header className={styles.header}>
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
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleLanguage}
            aria-label={t.header.switchLanguage}
            title={t.header.switchLanguage}
          >
            <span className={styles.langLabel}>{t.header.languageShort}</span>
          </button>
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
