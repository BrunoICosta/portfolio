import { useCallback, useEffect, useRef, useState } from 'react'

export type CopyStatus = 'idle' | 'copied' | 'failed'

/** Copies text and exposes a short-lived status for UI feedback. */
export function useCopyToClipboard(resetAfterMs = 2500) {
  const [status, setStatus] = useState<CopyStatus>('idle')
  const timeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  const copy = useCallback(
    async (text: string) => {
      let next: CopyStatus = 'failed'
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text)
          next = 'copied'
        }
      } catch {
        // Permission denied or insecure context: fall through to 'failed'.
      }
      setStatus(next)
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setStatus('idle'), resetAfterMs)
    },
    [resetAfterMs],
  )

  return { status, copy }
}
