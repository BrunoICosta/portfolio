import { useI18n } from '../../core/i18n/useI18n'
import { LINKEDIN_URL, PROFILE } from '../../data/profile'
import { ExternalLink } from '../../shared/components/ExternalLink'
import { Icon } from '../../shared/components/Icon'
import { useCopyToClipboard } from '../../shared/hooks/useCopyToClipboard'
import { Reveal } from '../../shared/motion/Reveal'
import section from '../../shared/styles/section.module.css'
import styles from './Contact.module.css'

export function Contact() {
  const { t } = useI18n()
  const { status, copy } = useCopyToClipboard()

  return (
    <section id="contact" className={section.section} aria-labelledby="contact-title">
      <div className="container">
        <Reveal className={styles.panel}>
          <header className={section.header}>
            <p className={section.eyebrow}>04 · {t.contact.title}</p>
            <h2 id="contact-title" className={section.title}>
              {t.contact.heading}
            </h2>
            <p className={section.intro}>{t.contact.text}</p>
          </header>

          <div className={styles.emailRow}>
            <a href={`mailto:${PROFILE.email}`} className={styles.email}>
              <Icon name="mail" size={22} />
              <span>
                <span className="visually-hidden">{t.contact.email}: </span>
                {PROFILE.email}
              </span>
            </a>
            <button
              type="button"
              className={styles.copy}
              onClick={() => void copy(PROFILE.email)}
              data-status={status}
            >
              <Icon name={status === 'copied' ? 'check' : 'copy'} size={16} />
              {t.contact.copyEmail}
            </button>
            <p className={styles.copyStatus} role="status">
              {status === 'copied' && t.contact.copied}
              {status === 'failed' && t.contact.copyFailed}
            </p>
          </div>

          <ul className={styles.socials}>
            <li>
              <ExternalLink href={PROFILE.githubUrl} className={styles.social}>
                <Icon name="github" size={18} />
                {t.contact.github}
              </ExternalLink>
            </li>
            {LINKEDIN_URL && (
              <li>
                <ExternalLink href={LINKEDIN_URL} className={styles.social}>
                  <Icon name="linkedin" size={18} />
                  {t.contact.linkedin}
                </ExternalLink>
              </li>
            )}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
