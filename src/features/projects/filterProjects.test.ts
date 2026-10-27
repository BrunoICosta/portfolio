import { describe, expect, it } from 'vitest'
import { PROJECTS, type Project } from '../../data/projects'
import { countByFilter, filterProjects } from './filterProjects'

const sample: Project[] = [
  { repo: 'a', title: 'A', category: 'angular', description: { 'pt-BR': '', en: '' }, tech: [] },
  { repo: 'b', title: 'B', category: 'react', description: { 'pt-BR': '', en: '' }, tech: [] },
  { repo: 'c', title: 'C', category: 'react', description: { 'pt-BR': '', en: '' }, tech: [] },
]

describe('filterProjects', () => {
  it('returns every project for "all"', () => {
    expect(filterProjects(sample, 'all')).toBe(sample)
  })

  it('keeps only projects of the selected category', () => {
    expect(filterProjects(sample, 'react').map((p) => p.repo)).toEqual(['b', 'c'])
    expect(filterProjects(sample, 'angular').map((p) => p.repo)).toEqual(['a'])
  })
})

describe('countByFilter', () => {
  it('counts projects per filter', () => {
    expect(countByFilter(sample)).toEqual({ all: 3, angular: 1, react: 2 })
  })

  it('matches the real portfolio data', () => {
    expect(countByFilter(PROJECTS)).toEqual({ all: 11, angular: 5, react: 6 })
  })
})
