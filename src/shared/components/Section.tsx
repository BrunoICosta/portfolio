import type { ReactNode } from 'react'
import { SECTION_IDS, type SectionId } from '../../core/sections'
import styles from './Section.module.css'

const sectionTitleId = (id: SectionId) => `${id}-title`

interface SectionProps {
  id: SectionId
  children: ReactNode
}

/** Landmark region for a page section, labelled by its <SectionHeading>. */
export function Section({ id, children }: SectionProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={sectionTitleId(id)}>
      <div className="container">{children}</div>
    </section>
  )
}

interface SectionHeadingProps {
  section: SectionId
  title: string
  intro?: string
  /** Extra text after the section number, e.g. "04 · Contato". */
  label?: string
}

export function SectionHeading({ section, title, intro, label }: SectionHeadingProps) {
  const number = String(SECTION_IDS.indexOf(section) + 1).padStart(2, '0')
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>{label ? `${number} · ${label}` : number}</p>
      <h2 id={sectionTitleId(section)} className={styles.title}>
        {title}
      </h2>
      {intro && <p className={styles.intro}>{intro}</p>}
    </header>
  )
}
