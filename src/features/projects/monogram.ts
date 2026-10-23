/** "Next E-commerce Store" -> "NE" */
export function toMonogram(title: string): string {
  return title
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
}
