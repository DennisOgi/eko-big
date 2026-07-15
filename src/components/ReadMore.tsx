import { useId, useState, type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

type ReadMoreProps = {
  children: ReactNode
  className?: string
  /** Visual tone: dark sections (green plate) vs light luxury pages */
  tone?: "light" | "dark"
  moreLabel?: string
  lessLabel?: string
}

export function ReadMore({
  children,
  className,
  tone = "light",
  moreLabel = "Read more",
  lessLabel = "Read less",
}: ReadMoreProps) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const panelId = `${id}-panel`
  const reduce = useReducedMotion()

  const labelColor =
    tone === "dark"
      ? "text-[var(--gold-light)] hover:text-[var(--ivory)]"
      : "text-[var(--gold-deep)] hover:text-[var(--green)]"

  const ruleColor =
    tone === "dark"
      ? "border-[color-mix(in_srgb,var(--gold)_45%,transparent)]"
      : "border-[color-mix(in_srgb,var(--gold)_40%,transparent)]"

  return (
    <div className={className}>
      <div className={`border-t ${ruleColor} pt-8`}>
        <button
          type="button"
          className={`group inline-flex items-center gap-3 font-[family-name:var(--font-display)] text-lg tracking-[0.06em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-4 ${
            tone === "dark"
              ? "focus-visible:ring-offset-[var(--green)]"
              : "focus-visible:ring-offset-[var(--ivory)]"
          } ${labelColor}`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? lessLabel : moreLabel}</span>
          <motion.span
            aria-hidden
            className="inline-block text-[0.85em] leading-none"
            animate={{ rotate: open ? 180 : 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
            }
          >
            ↓
          </motion.span>
        </button>
      </div>

      <motion.div
        id={panelId}
        role="region"
        aria-hidden={!open}
        {...(!open ? { inert: true as const } : {})}
        initial={false}
        animate={
          open
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        transition={
          reduce
            ? { duration: 0 }
            : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
        style={{ overflow: "hidden" }}
        className="mt-8"
      >
        {children}
      </motion.div>
    </div>
  )
}
