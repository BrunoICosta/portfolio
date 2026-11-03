import { describe, expect, it } from 'vitest'
import { PROJECTS, type Project } from '../../data/projects'
import { countByFilter, filterProjects } from './filterProjects'

const project = (repo: string, category: Project['category']): Project => ({
  repo,
  title: { 'pt-BR': repo.toUpperCase(), en: repo.toUpperCase() },
  category,
  description: { 'pt-BR': '', en: '' },
  tech: [],
  uiLanguages: ['pt-BR', 'en'],
})

const sample: Project[] = [project('a', 'angular'), project('b', 'react'), project('c', 'react')]

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
