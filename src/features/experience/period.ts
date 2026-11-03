import type { Language } from '../../core/i18n/language'
import type { YearMonth } from '../../data/experience'

function parse(value: YearMonth): { year: number; month: number } {
  const [year, month] = value.split('-').map(Number)
  return { year, month }
}

/** "YYYY-MM" of the given date (local time), used as the end of the current position. */
export function toYearMonth(date: Date): YearMonth {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}` as YearMonth
}

/** "jul. de 2021" (pt-BR) / "Jul 2021" (en). */
export function formatMonth(value: YearMonth, language: Language): string {
  const { year, month } = parse(value)
  return new Intl.DateTimeFormat(language, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(Date.UTC(year, month - 1, 1))
}

export interface PeriodParts {
  from: string
  /** Text between the dates (" a ", " to ") or after the start of a current position. */
  connector: string
  to: string | null
}

/** Pieces of a period, so the UI can wrap each date in <time>. */
export function periodParts(
  start: YearMonth,
  end: YearMonth | undefined,
  language: Language,
): PeriodParts {
  const from = formatMonth(start, language)
  const to = end ? formatMonth(end, language) : null
  if (language === 'pt-BR') return { from, connector: to ? ' a ' : ' até o momento', to }
  return { from, connector: to ? ' to ' : ' to present', to }
}

/** Period without dashes: "abr. de 2021 a jul. de 2021", "Jul 2021 to present". */
export function formatPeriod(start: YearMonth, end: YearMonth | undefined, language: Language) {
  const { from, connector, to } = periodParts(start, end, language)
  return `${from}${connector}${to ?? ''}`
}

/** Whole months from start to end (end month excluded), at least 1. */
export function monthsBetween(start: YearMonth, end: YearMonth): number {
  const a = parse(start)
  const b = parse(end)
  return Math.max(1, (b.year - a.year) * 12 + (b.month - a.month))
}

/** "5 anos e 4 meses" (pt-BR) / "5 yrs 4 mos" (en). */
export function formatDuration(totalMonths: number, language: Language): string {
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (language === 'pt-BR') {
    const parts = [
      years > 0 ? `${years} ${years === 1 ? 'ano' : 'anos'}` : '',
      months > 0 ? `${months} ${months === 1 ? 'mês' : 'meses'}` : '',
    ].filter(Boolean)
    return parts.join(' e ')
  }

  const parts = [
    years > 0 ? `${years} ${years === 1 ? 'yr' : 'yrs'}` : '',
    months > 0 ? `${months} ${months === 1 ? 'mo' : 'mos'}` : '',
  ].filter(Boolean)
  return parts.join(' ')
}

/** Duration of a position; the current one runs until `today`. */
export function positionDuration(
  start: YearMonth,
  end: YearMonth | undefined,
  today: Date,
  language: Language,
): string {
  return formatDuration(monthsBetween(start, end ?? toYearMonth(today)), language)
}
