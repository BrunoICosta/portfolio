import { useI18n } from '../../core/i18n/useI18n'
import { getDemoUrl, getRepoUrl, type Project } from '../../data/projects'
import { ExternalLink } from '../../shared/components/ExternalLink'
import { Icon } from '../../shared/components/Icon'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t, language } = useI18n()
  const titleId = `project-${project.repo}`

  return (
    <article className={styles.card} data-category={project.category} aria-labelledby={titleId}>
      <div className={styles.body}>
        <p className={styles.category}>{t.projects.filters[project.category]}</p>
        <h3 id={titleId} className={styles.title}>
          {project.title}
        </h3>
        <p className={styles.description}>{project.description[language]}</p>

        <ul className={styles.tech} aria-label={t.projects.techLabel}>
          {project.tech.map((tech) => (
            <li key={tech} className={styles.badge}>
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.links}>
        <ExternalLink href={getRepoUrl(project)} className={styles.link}>
          <Icon name="github" size={16} />
          {t.projects.code}
          <span className="visually-hidden"> — {project.title}</span>
        </ExternalLink>
        <ExternalLink href={getDemoUrl(project)} className={styles.link} data-primary="true">
          <Icon name="external" size={16} />
          {t.projects.demo}
          <span className="visually-hidden"> — {project.title}</span>
        </ExternalLink>
      </div>
    </article>
  )
}
