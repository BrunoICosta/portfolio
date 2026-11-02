import { useI18n } from '../../core/i18n/useI18n'
import { PROFILE } from '../../data/profile'
import { ExternalLink } from '../../shared/components/ExternalLink'
import { Icon } from '../../shared/components/Icon'
import styles from './Footer.module.css'

const SITE_REPO_URL = `${PROFILE.githubUrl}/portfolio`

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p>{t.footer.rights(year)}</p>
          <p className={styles.muted}>
            {t.footer.builtWith}{' '}
            <ExternalLink href={SITE_REPO_URL} className={styles.link}>
              {t.footer.source}
            </ExternalLink>
          </p>
        </div>
        <a href="#content" className={styles.top}>
          <Icon name="arrowUp" size={16} />
          {t.footer.backToTop}
        </a>
      </div>
    </footer>
  )
}
