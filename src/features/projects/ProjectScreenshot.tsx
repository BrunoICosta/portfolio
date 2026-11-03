import { useCallback, useState } from 'react'
import { useI18n } from '../../core/i18n/useI18n'
import { getScreenshotUrl, type Project } from '../../data/projects'
import { Icon } from '../../shared/components/Icon'
import { toMonogram } from './monogram'
import styles from './ProjectScreenshot.module.css'

type LoadState = 'loading' | 'loaded' | 'error'

interface ProjectScreenshotProps {
  project: Project
}

/**
 * Screenshots live in each project's repo (docs/screenshot.png) and may not
 * exist yet, so a failed load degrades to a branded placeholder instead of a
 * broken image icon.
 */
export function ProjectScreenshot({ project }: ProjectScreenshotProps) {
  const { t, language } = useI18n()
  const title = project.title[language]
  const [state, setState] = useState<LoadState>('loading')

  // Cached images can finish loading before React attaches onLoad; check on mount.
  const imageRef = useCallback((image: HTMLImageElement | null) => {
    if (image?.complete) setState(image.naturalWidth > 0 ? 'loaded' : 'error')
  }, [])

  return (
    <div className={styles.frame} data-state={state} data-category={project.category}>
      {state !== 'error' && (
        <img
          ref={imageRef}
          className={styles.image}
          src={getScreenshotUrl(project)}
          alt={t.projects.screenshotAlt(title)}
          width={1280}
          height={800}
          loading="lazy"
          decoding="async"
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
        />
      )}

      {state === 'error' && (
        <div className={styles.fallback} aria-hidden="true">
          <span className={styles.monogram}>{toMonogram(title)}</span>
          <span className={styles.fallbackText}>
            <Icon name="image" size={14} />
            {t.projects.screenshotFallback}
          </span>
        </div>
      )}
    </div>
  )
}
