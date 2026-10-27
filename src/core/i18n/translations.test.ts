import { describe, expect, it } from 'vitest'
import { translations } from './translations'

/** Flattens a dictionary into "a.b.c" paths so both languages can be compared. */
function keyPaths(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => keyPaths(item, `${prefix}[${index}]`))
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      keyPaths(child, prefix ? `${prefix}.${key}` : key),
    )
  }
  return [prefix]
}

describe('translations', () => {
  it('has the same keys in every language', () => {
    expect(keyPaths(translations.en)).toEqual(keyPaths(translations['pt-BR']))
  })

  it('has no empty strings', () => {
    for (const dictionary of Object.values(translations)) {
      const strings = JSON.stringify(dictionary)
      expect(strings).not.toContain('""')
    }
  })

  it('pluralizes the project count', () => {
    expect(translations['pt-BR'].projects.count(1)).toBe('1 projeto')
    expect(translations['pt-BR'].projects.count(5)).toBe('5 projetos')
    expect(translations.en.projects.count(1)).toBe('1 project')
  })
})
