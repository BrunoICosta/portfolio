import { translate } from '../../core/i18n/language'
import { useI18n } from '../../core/i18n/useI18n'
import { SKILL_GROUPS } from '../../data/skills'
import { Reveal } from '../../shared/motion/Reveal'
import section from '../../shared/styles/section.module.css'
import styles from './Skills.module.css'

export function Skills() {
  const { t, language } = useI18n()

  return (
    <section id="skills" className={section.section} aria-labelledby="skills-title">
      <div className="container">
        <header className={section.header}>
          <p className={section.eyebrow}>02</p>
          <h2 id="skills-title" className={section.title}>
            {t.skills.title}
          </h2>
          <p className={section.intro}>{t.skills.intro}</p>
        </header>

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
      </div>
    </section>
  )
}
