import { useI18n } from '../../core/i18n/useI18n'
import { Section, SectionHeading } from '../../shared/components/Section'
import { Reveal } from '../../shared/motion/Reveal'
import styles from './About.module.css'

export function About() {
  const { t } = useI18n()

  return (
    <Section id="about">
      <SectionHeading section="about" title={t.about.title} />

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
    </Section>
  )
}
