import { useEffect, useRef } from "react"
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"
import type { ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  const reduce = useReducedMotion()

  // Opacity + translate only: blur() filters here caused a visible white
  // smear while sections faded in, and forced expensive repaints on scroll.
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

/** Soft scroll-linked gold accent line for section headers */
export function ScrollAccent({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  })
  const scaleX = useTransform(scrollYProgress, [0, 1], [0.15, 1])

  return (
    <div ref={ref} className={className ?? "mt-6"} aria-hidden>
      <motion.div
        className="h-px origin-left bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent"
        style={reduce ? { width: "4.5rem" } : { scaleX, width: "4.5rem" }}
      />
    </div>
  )
}

export function useSectionObserver(
  ids: string[],
  onActive: (id: string) => void,
) {
  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) onActive(visible[0].target.id)
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, onActive])
}
