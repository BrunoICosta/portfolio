import { m, type HTMLMotionProps } from 'motion/react'
import { fadeUp, revealTransition } from './variants'

interface RevealProps extends HTMLMotionProps<'div'> {
  /** Seconds to wait before animating, handy for staggering siblings. */
  delay?: number
}

/** Fades content up the first time it scrolls into view. */
export function Reveal({ delay = 0, children, ...rest }: RevealProps) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ ...revealTransition, delay }}
      {...rest}
    >
      {children}
    </m.div>
  )
}
