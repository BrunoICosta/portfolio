import { describe, expect, it } from 'vitest'
import { getDemoUrl, getRepoUrl, getScreenshotUrl, PROJECTS } from './projects'

describe('projects data', () => {
  it('uses unique repository names', () => {
    const repos = PROJECTS.map((project) => project.repo)
    expect(new Set(repos).size).toBe(repos.length)
  })

  it('has descriptions and tech badges for every project', () => {
    for (const project of PROJECTS) {
      expect(project.description['pt-BR'].length, project.repo).toBeGreaterThan(20)
      expect(project.description.en.length, project.repo).toBeGreaterThan(20)
      expect(project.tech.length, project.repo).toBeGreaterThan(0)
    }
  })

  it('builds GitHub, Pages and screenshot URLs from the repo name', () => {
    const project = { repo: 'react-weather-dashboard' }
    expect(getRepoUrl(project)).toBe('https://github.com/BrunoICosta/react-weather-dashboard')
    expect(getDemoUrl(project)).toBe('https://brunoicosta.github.io/react-weather-dashboard/')
    expect(getScreenshotUrl(project)).toBe(
      'https://raw.githubusercontent.com/BrunoICosta/react-weather-dashboard/main/docs/screenshot.png',
    )
  })
})
