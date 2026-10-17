import { useI18n } from '../../core/i18n/useI18n'
import { PROFILE } from '../../data/profile'
import { ButtonLink } from '../../shared/components/ButtonLink'
import { Icon } from '../../shared/components/Icon'
import styles from './Hero.module.css'

export function Hero() {
  const { t } = useI18n()

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.availability}>
            <span className={styles.dot} aria-hidden="true" />
            {t.hero.availability}
          </p>

          <h1 id="hero-title" className={styles.title}>
            <span className={styles.greeting}>{t.hero.greeting}</span>
            {PROFILE.name}
          </h1>

          <p className={styles.role}>
            {t.hero.role} <span className={styles.separator}>·</span>{' '}
            <span className={styles.stack}>{t.hero.stack}</span>
          </p>

          <p className={styles.tagline}>{t.hero.tagline}</p>

          <div className={styles.ctas}>
            <ButtonLink href="#projects">
              {t.hero.ctaProjects}
              <Icon name="arrowRight" size={16} />
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              {t.hero.ctaContact}
            </ButtonLink>
          </div>
        </div>

        <CodeCard />
      </div>
    </section>
  )
}

type TokenKind = 'kw' | 'str' | 'type' | 'plain'
type Token = readonly [TokenKind, string]

/** Tiny pre-tokenized snippet: no syntax-highlighting library needed for one card. */
const CODE_LINES: readonly (readonly Token[])[] = [
  [
    ['kw', 'const'],
    ['plain', ' dev = {'],
  ],
  [
    ['plain', '  name: '],
    ['str', "'Bruno Costa'"],
    ['plain', ','],
  ],
  [
    ['plain', '  role: '],
    ['str', "'Front-end'"],
    ['plain', ','],
  ],
  [
    ['plain', '  stack: ['],
    ['str', "'Angular'"],
    ['plain', ', '],
    ['str', "'React'"],
    ['plain', ', '],
    ['str', "'TypeScript'"],
    ['plain', '],'],
  ],
  [
    ['plain', '  cares: ['],
    ['str', "'a11y'"],
    ['plain', ', '],
    ['str', "'tests'"],
    ['plain', ', '],
    ['str', "'perf'"],
    ['plain', '],'],
  ],
  [
    ['plain', '} '],
    ['kw', 'satisfies'],
    ['plain', ' '],
    ['type', 'Developer'],
  ],
]

/** Decorative "profile as code" card; hidden from assistive tech (the copy already says it). */
function CodeCard() {
  return (
    <div className={styles.codeCard} aria-hidden="true">
      <div className={styles.codeBar}>
        <span />
        <span />
        <span />
        <code className={styles.codeFile}>bruno.ts</code>
      </div>
      <pre className={styles.code}>
        <code>
          {CODE_LINES.map((line, lineIndex) => (
            <span key={lineIndex} className={styles.line}>
              {line.map(([kind, text], tokenIndex) => (
                <span key={tokenIndex} className={kind === 'plain' ? undefined : styles[kind]}>
                  {text}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
