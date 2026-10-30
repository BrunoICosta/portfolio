import { translate } from '../../core/i18n/language'
import { useI18n } from '../../core/i18n/useI18n'
import { SKILL_GROUPS } from '../../data/skills'
import { Section, SectionHeading } from '../../shared/components/Section'
import { Reveal } from '../../shared/motion/Reveal'
import styles from './Skills.module.css'

export function Skills() {
  const { t, language } = useI18n()

  return (
    <Section id="skills">
      <SectionHeading section="skills" title={t.skills.title} intro={t.skills.intro} />

      <div className={styles.groups}>
        {SKILL_GROUPS.map((group, index) => (
          <Reveal key={group.id} delay={index * 0.08} className={styles.cell}>
            <article className={styles.group} data-group={group.id}>
              <h3 className={styles.groupTitle}>{t.skills.groups[group.id]}</h3>
              <ul className={styles.list}>
                {group.skills.map((skill) => {
                  const name = translate(skill.name, language)
                  return (
                    <li key={name} className={styles.skill}>
                      <span className={styles.name}>{name}</span>
                      <span className={styles.detail}>{translate(skill.detail, language)}</span>
                    </li>
                  )
                })}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
