/** Page sections, in display order. Ids double as URL fragments (#projects). */
export const SECTION_IDS = ['about', 'experience', 'skills', 'projects', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

export const MAIN_CONTENT_ID = 'content'
