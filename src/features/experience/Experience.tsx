import { translate } from '../../core/i18n/language'
import { useI18n } from '../../core/i18n/useI18n'
import { EDUCATION, EXPERIENCES, type Experience as ExperienceItem } from '../../data/experience'
import { RESUME } from '../../data/profile'
import { ButtonLink } from '../../shared/components/ButtonLink'
import { Icon } from '../../shared/components/Icon'
import { Section, SectionHeading } from '../../shared/components/Section'
import { Reveal } from '../../shared/motion/Reveal'
import styles from './Experience.module.css'
import { periodParts, positionDuration } from './period'

export function Experience() {
  const { t, language } = useI18n()
  const resume = RESUME[language]
  const today = new Date()

  return (
    <Section id="experience">
      <SectionHeading section="experience" title={t.experience.title} intro={t.experience.intro} />

      <ol className={styles.timeline} aria-label={t.experience.timelineLabel}>
        {EXPERIENCES.map((item) => (
          <li key={item.id} className={styles.item} data-current={!item.end}>
            <Reveal>
              <TimelineEntry item={item} today={today} />
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className={styles.footer}>
        <div className={styles.education}>
          <h3 className={styles.educationTitle}>{t.experience.educationTitle}</h3>
          <ul className={styles.credentials}>
            {EDUCATION.map((credential) => (
              <li key={credential.title.en} className={styles.credential}>
                <span className={styles.credentialTitle}>{credential.title[language]}</span>
                {(credential.issuer || credential.year) && (
                  <span className={styles.credentialMeta}>
                    {[credential.issuer, credential.year].filter(Boolean).join(', ')}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <ButtonLink
          href={resume.href}
          download={resume.fileName}
          type="application/pdf"
          variant="secondary"
          className={styles.resume}
        >
          <Icon name="download" size={16} />
          {t.experience.resume}
          <span className="visually-hidden"> (PDF)</span>
        </ButtonLink>
      </Reveal>
    </Section>
  )
}

function TimelineEntry({ item, today }: { item: ExperienceItem; today: Date }) {
  const { t, language } = useI18n()
  const titleId = `experience-${item.id}`
  const period = periodParts(item.start, item.end, language)

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <header className={styles.cardHeader}>
        <div className={styles.headline}>
          <h3 id={titleId} className={styles.role}>
            {item.role[language]}
          </h3>
          {!item.end && <span className={styles.current}>{t.experience.current}</span>}
        </div>
        <p className={styles.company}>
          {item.company}
          {item.client && (
            <>
              {' · '}
              <span className={styles.client}>
                {t.experience.client} {item.client}
              </span>
            </>
          )}
        </p>
        <p className={styles.meta}>
          <span>
            <time dateTime={item.start}>{period.from}</time>
            {period.connector}
            {item.end && period.to && <time dateTime={item.end}>{period.to}</time>}
          </span>
          <span className={styles.metaSeparator} aria-hidden="true">
            ·
          </span>
          <span>
            {positionDuration(item.start, item.end, today, language)} · {item.location}
          </span>
        </p>
      </header>

      <ul className={styles.highlights}>
        {item.highlights.map((highlight) => (
          <li key={highlight.en}>{highlight[language]}</li>
        ))}
      </ul>

      {item.tech.length > 0 && (
        <ul className={styles.tech} aria-label={t.experience.techLabel}>
          {item.tech.map((tech) => {
            const label = translate(tech, language)
            return (
              <li key={label} className={styles.badge}>
                {label}
              </li>
            )
          })}
        </ul>
      )}
    </article>
  )
}
