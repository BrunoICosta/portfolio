import type { Transition, Variants } from 'motion/react'

export const revealTransition: Transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}
