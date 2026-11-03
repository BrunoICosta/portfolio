import { describe, expect, it } from 'vitest'
import {
  formatDuration,
  formatMonth,
  formatPeriod,
  monthsBetween,
  positionDuration,
  toYearMonth,
} from './period'

describe('formatMonth', () => {
  it('uses the locale month abbreviation', () => {
    expect(formatMonth('2021-07', 'pt-BR')).toBe('jul. de 2021')
    expect(formatMonth('2021-07', 'en')).toBe('Jul 2021')
  })
})

describe('formatPeriod', () => {
  it('formats closed periods without a dash', () => {
    expect(formatPeriod('2021-04', '2021-07', 'pt-BR')).toBe('abr. de 2021 a jul. de 2021')
    expect(formatPeriod('2021-04', '2021-07', 'en')).toBe('Apr 2021 to Jul 2021')
  })

  it('formats the current position', () => {
    expect(formatPeriod('2021-07', undefined, 'pt-BR')).toBe('jul. de 2021 até o momento')
    expect(formatPeriod('2021-07', undefined, 'en')).toBe('Jul 2021 to present')
  })
})

describe('duration', () => {
  it('counts whole months between two year-months', () => {
    expect(monthsBetween('2021-07', '2026-11')).toBe(64)
    expect(monthsBetween('2021-04', '2021-07')).toBe(3)
    expect(monthsBetween('2021-07', '2021-07')).toBe(1)
  })

  it.each([
    [64, '5 anos e 4 meses', '5 yrs 4 mos'],
    [12, '1 ano', '1 yr'],
    [13, '1 ano e 1 mês', '1 yr 1 mo'],
    [3, '3 meses', '3 mos'],
    [1, '1 mês', '1 mo'],
  ])('%i months -> "%s" / "%s"', (months, pt, en) => {
    expect(formatDuration(months, 'pt-BR')).toBe(pt)
    expect(formatDuration(months, 'en')).toBe(en)
  })

  it('runs the current position until today', () => {
    const today = new Date(2026, 10, 15) // 15 Nov 2026
    expect(toYearMonth(today)).toBe('2026-11')
    expect(positionDuration('2021-07', undefined, today, 'pt-BR')).toBe('5 anos e 4 meses')
    expect(positionDuration('2020-03', '2021-04', today, 'en')).toBe('1 yr 1 mo')
  })
})
