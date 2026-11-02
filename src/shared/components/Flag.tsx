import { useId } from 'react'
import type { Language } from '../../core/i18n/language'

interface FlagProps {
  language: Language
  /** Width in px; height keeps the 7:5 ratio of the 28x20 artwork. */
  width?: number
  className?: string
}

/**
 * Inline SVG flags (flag emoji don't render on Windows). Always decorative:
 * the surrounding control carries the accessible name.
 */
export function Flag({ language, width = 28, className }: FlagProps) {
  // Strip characters (e.g. ":" or "«»") that are awkward inside url(#…) references.
  const clipId = `flag-clip-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const height = Math.round((width * 20) / 28)

  return (
    <svg
      className={className}
      viewBox="0 0 28 20"
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      {language === 'pt-BR' ? (
        <>
          <rect width="28" height="20" rx="2" fill="#009C3B" />
          <path d="M14 2.5 25.5 10 14 17.5 2.5 10Z" fill="#FFDF00" />
          <circle cx="14" cy="10" r="4.6" fill="#002776" />
          <path d="M9.6 8.9c3-.9 6.3-.6 8.9 1.1l-.3.9c-2.5-1.6-5.6-1.9-8.4-1.1Z" fill="#fff" />
        </>
      ) : (
        <>
          {/* useId keeps the clipPath id unique when several US flags are on the page. */}
          <clipPath id={clipId}>
            <rect width="28" height="20" rx="2" />
          </clipPath>
          <g clipPath={`url(#${clipId})`}>
            <rect width="28" height="20" fill="#fff" />
            <path
              d="M0 0h28M0 3.08h28M0 6.15h28M0 9.23h28M0 12.3h28M0 15.38h28M0 18.46h28"
              stroke="#B22234"
              strokeWidth="1.54"
              transform="translate(0 .77)"
            />
            <rect width="12" height="10.77" fill="#3C3B6E" />
            <g fill="#fff">
              {US_STARS.map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r=".6" />
              ))}
            </g>
          </g>
        </>
      )}
    </svg>
  )
}

/** Simplified 14-star canton that still reads as the US flag at 28px. */
const US_STARS: readonly (readonly [number, number])[] = [2, 4, 6, 8].flatMap((cy, row) =>
  (row % 2 === 0 ? [2, 5, 8, 11] : [3.5, 6.5, 9.5]).map((cx) => [cx, cy] as const),
)
