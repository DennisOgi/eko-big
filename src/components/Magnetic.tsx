import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import {
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react"

type MagneticAnchorProps = {
  children: ReactNode
  href: string
  className?: string
  strength?: number
  target?: string
  rel?: string
}

/** Subtle magnetic pull for primary CTAs — disabled under reduced motion. */
export function MagneticAnchor({
  children,
  className,
  href,
  strength = 0.28,
  target,
  rel,
}: MagneticAnchorProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.35 })
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.35 })

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    mx.set(dx * strength)
    my.set(dy * strength)
  }

  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      target={target}
      rel={rel}
      style={reduce ? undefined : { x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.a>
  )
}
