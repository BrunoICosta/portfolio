import { useI18n } from '../../core/i18n/useI18n'
import { CONTACT_EMAIL, LINKEDIN_URL, PROFILE } from '../../data/profile'
import { ExternalLink } from '../../shared/components/ExternalLink'
import { Icon } from '../../shared/components/Icon'
import { Section, SectionHeading } from '../../shared/components/Section'
import { useCopyToClipboard } from '../../shared/hooks/useCopyToClipboard'
import { Reveal } from '../../shared/motion/Reveal'
import styles from './Contact.module.css'

export function Contact() {
  const { t, language } = useI18n()
  const email = CONTACT_EMAIL[language]
  const { status, copy } = useCopyToClipboard()

  return (
    <Section id="contact">
      <Reveal className={styles.panel}>
        <SectionHeading
          section="contact"
          label={t.contact.title}
          title={t.contact.heading}
          intro={t.contact.text}
        />

        <div className={styles.emailRow}>
          <a href={`mailto:${email}`} className={styles.email}>
            <Icon name="mail" size={22} />
            <span>
              <span className="visually-hidden">{t.contact.email}:</span> {email}
            </span>
          </a>
          <button
            type="button"
            className={styles.copy}
            onClick={() => void copy(email)}
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
    </Section>
  )
}
