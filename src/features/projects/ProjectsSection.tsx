import { useI18n } from '../../core/i18n/useI18n'
import { PROJECTS } from '../../data/projects'
import section from '../../shared/styles/section.module.css'
import { ProjectCard } from './ProjectCard'
import styles from './ProjectsSection.module.css'

export function ProjectsSection() {
  const { t } = useI18n()

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

        <ul className={styles.grid}>
          {PROJECTS.map((project) => (
            <li key={project.repo}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
