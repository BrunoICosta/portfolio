import { useI18n } from '../../core/i18n/useI18n'
import { Reveal } from '../../shared/motion/Reveal'
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
          <Reveal className={styles.text}>
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <dl className={styles.highlights}>
            {t.about.highlights.map(({ value, label }) => (
              <Reveal key={label} className={styles.highlight} delay={0.1}>
                <dt className={styles.label}>{label}</dt>
                <dd className={styles.value}>{value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
