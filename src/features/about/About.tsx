import { useI18n } from '../../core/i18n/useI18n'
import section from '../../shared/styles/section.module.css'
import styles from './About.module.css'

export function About() {
  const { t } = useI18n()

  return (
    <section id="about" className={section.section} aria-labelledby="about-title">
      <div className="container">
        <header className={section.header}>
          <p className={section.eyebrow}>01</p>
          <h2 id="about-title" className={section.title}>
            {t.about.title}
          </h2>
        </header>

        <div className={styles.layout}>
          <div className={styles.text}>
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className={styles.highlights}>
            {t.about.highlights.map(({ value, label }) => (
              <div key={label} className={styles.highlight}>
                <dt className={styles.label}>{label}</dt>
                <dd className={styles.value}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
