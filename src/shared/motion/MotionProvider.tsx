import { LazyMotion, MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

const loadFeatures = () => import('./features').then((module) => module.default)

/**
 * LazyMotion + `m` components: the DOM animation features are fetched in a
 * separate chunk after first render, keeping the initial bundle small.
 * reducedMotion="user" disables transforms for visitors who prefer reduced motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
