import { m } from 'motion/react'
import { useMemo, useState } from 'react'
import { useI18n } from '../../core/i18n/useI18n'
import { PROJECTS } from '../../data/projects'
import { Section, SectionHeading } from '../../shared/components/Section'
import { fadeUp, revealTransition } from '../../shared/motion/variants'
import { countByFilter, filterProjects, type ProjectFilter } from './filterProjects'
import { ProjectCard } from './ProjectCard'
import { ProjectFilterBar } from './ProjectFilterBar'
import styles from './ProjectsSection.module.css'

const COUNTS = countByFilter(PROJECTS)

export function ProjectsSection() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<ProjectFilter>('all')
  const visible = useMemo(() => filterProjects(PROJECTS, filter), [filter])

  return (
    <Section id="projects">
      <SectionHeading section="projects" title={t.projects.title} intro={t.projects.intro} />

      <div className={styles.toolbar}>
        <ProjectFilterBar value={filter} counts={COUNTS} onChange={setFilter} />
        <p className={styles.status} role="status">
          {t.projects.count(visible.length)}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>{t.projects.empty}</p>
      ) : (
        <ul className={styles.grid}>
          {visible.map((project, index) => (
            <m.li
              key={`${filter}-${project.repo}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ ...revealTransition, delay: (index % 3) * 0.06 }}
            >
              <ProjectCard project={project} />
            </m.li>
          ))}
        </ul>
      )}
    </Section>
  )
}
