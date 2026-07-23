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

const NAV_OFFSET = 88
const HERO_CLEAR_MARGIN = 40
const SECTION_PROBE = 16

/** Scroll-position spy — uses viewport geometry (not offsetTop) for accurate section detection. */
export function useSectionObserver(
  ids: string[],
  onActive: (id: string) => void,
) {
  useEffect(() => {
    const hero = document.getElementById("top")

    const update = () => {
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom
        // Hero still visible below the nav band — no section link should be active.
        if (heroBottom > NAV_OFFSET + HERO_CLEAR_MARGIN) {
          onActive("")
          return
        }
      }

      const probe = NAV_OFFSET + SECTION_PROBE
      let current = ""

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= probe) current = id
      }

      onActive(current)
    }

    update()
    const raf = requestAnimationFrame(update)
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update, { passive: true })
    window.addEventListener("load", update)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      window.removeEventListener("load", update)
    }
  }, [ids, onActive])
}

export function scrollToSection(id: string, smooth = true) {
  const el = document.getElementById(id)
  if (!el) return

  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior: smooth ? "smooth" : "auto" })
  history.replaceState(null, "", `#${id}`)
}
