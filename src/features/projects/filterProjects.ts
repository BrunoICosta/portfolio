import { PROJECT_CATEGORIES, type Project, type ProjectCategory } from '../../data/projects'

export type ProjectFilter = 'all' | ProjectCategory

export const PROJECT_FILTERS: readonly ProjectFilter[] = ['all', ...PROJECT_CATEGORIES]

export function filterProjects(
  projects: readonly Project[],
  filter: ProjectFilter,
): readonly Project[] {
  if (filter === 'all') return projects
  return projects.filter((project) => project.category === filter)
}

export function countByFilter(projects: readonly Project[]): Record<ProjectFilter, number> {
  const counts: Record<ProjectFilter, number> = { all: projects.length, angular: 0, react: 0 }
  for (const project of projects) counts[project.category] += 1
  return counts
}
