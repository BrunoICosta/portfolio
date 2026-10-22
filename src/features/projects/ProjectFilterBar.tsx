import { useI18n } from '../../core/i18n/useI18n'
import { PROJECT_FILTERS, type ProjectFilter } from './filterProjects'
import styles from './ProjectFilterBar.module.css'

interface ProjectFilterBarProps {
  value: ProjectFilter
  counts: Record<ProjectFilter, number>
  onChange: (filter: ProjectFilter) => void
}

/**
 * Toggle-button group (aria-pressed). Simpler for keyboard users than a
 * roving-tabindex radiogroup, and it reads naturally in screen readers.
 */
export function ProjectFilterBar({ value, counts, onChange }: ProjectFilterBarProps) {
  const { t } = useI18n()

  return (
    <div role="group" aria-label={t.projects.filterLabel} className={styles.bar}>
      {PROJECT_FILTERS.map((filter) => {
        const active = filter === value
        return (
          <button
            key={filter}
            type="button"
            className={styles.option}
            data-filter={filter}
            aria-pressed={active}
            onClick={() => onChange(filter)}
          >
            {t.projects.filters[filter]}
            <span className={styles.count} aria-hidden="true">
              {counts[filter]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
