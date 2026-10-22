import { useMemo, useState } from 'react'
import { useI18n } from '../../core/i18n/useI18n'
import { PROJECTS } from '../../data/projects'
import section from '../../shared/styles/section.module.css'
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
    <section id="projects" className={section.section} aria-labelledby="projects-title">
      <div className="container">
        <header className={section.header}>
          <p className={section.eyebrow}>03</p>
          <h2 id="projects-title" className={section.title}>
            {t.projects.title}
          </h2>
          <p className={section.intro}>{t.projects.intro}</p>
        </header>

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
            {visible.map((project) => (
              <li key={project.repo}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
