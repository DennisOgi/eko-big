import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

const STORAGE_KEY = "eckobig-splash-seen"
const HOLD_MS = 2800
const HOLD_REDUCED_MS = 320
const EXIT_S = 0.75
const EXIT_REDUCED_S = 0.2
const EASE = [0.22, 1, 0.36, 1] as const

function wasSeenThisSession(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1"
  } catch {
    return false
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1")
  } catch {
    /* private mode / blocked storage */
  }
}

export function SplashScreen() {
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(() => !wasSeenThisSession())
  const [present, setPresent] = useState(() => !wasSeenThisSession())

  const dismiss = useCallback(() => {
    setOpen((prev) => {
      if (!prev) return prev
      markSeen()
      return false
    })
  }, [])

  useEffect(() => {
    if (!open) return
    const ms = reduce ? HOLD_REDUCED_MS : HOLD_MS
    const timer = window.setTimeout(dismiss, ms)
    return () => window.clearTimeout(timer)
  }, [open, reduce, dismiss])

  useEffect(() => {
    if (!open) return
    panelRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, dismiss])

  useEffect(() => {
    if (!present) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [present])

  if (!present) return null

  return (
    <AnimatePresence onExitComplete={() => setPresent(false)}>
      {open && (
        <motion.div
          key="eckobig-splash"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="ECKOBIG ANTHONY"
          tabIndex={-1}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-[var(--green)] outline-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduce ? EXIT_REDUCED_S : EXIT_S,
            ease: EASE,
          }}
          onClick={dismiss}
        >
          {/* Soft gold / green atmosphere */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0.15 : 1.1, ease: EASE }}
            style={{
              backgroundImage: `
                radial-gradient(ellipse 70% 55% at 50% 42%, color-mix(in srgb, var(--gold) 22%, transparent), transparent 58%),
                radial-gradient(ellipse 55% 45% at 18% 78%, color-mix(in srgb, var(--green-mid) 85%, transparent), transparent 62%),
                radial-gradient(ellipse 50% 40% at 88% 18%, color-mix(in srgb, var(--gold-light) 12%, transparent), transparent 55%),
                linear-gradient(165deg, #0a2f24 0%, var(--green) 48%, #124a38 100%)
              `,
            }}
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.p
              className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,9vw,5.5rem)] font-semibold leading-none tracking-[0.28em] text-[var(--ivory)]"
              initial={reduce ? false : { opacity: 0, y: 18, letterSpacing: "0.42em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.28em" }}
              transition={{
                duration: reduce ? 0.2 : 1.05,
                delay: reduce ? 0 : 0.15,
                ease: EASE,
              }}
            >
              ECKOBIG
            </motion.p>

            <motion.div
              className="mt-7 h-px w-24 origin-center bg-gradient-to-r from-transparent via-[var(--gold-light)] to-transparent md:mt-8 md:w-32"
              aria-hidden
              initial={reduce ? false : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: reduce ? 0.15 : 0.9,
                delay: reduce ? 0 : 0.55,
                ease: EASE,
              }}
            />

            <motion.p
              className="mt-6 font-[family-name:var(--font-display)] text-sm font-medium tracking-[0.42em] text-[var(--gold-light)] md:mt-7 md:text-base"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduce ? 0.15 : 0.8,
                delay: reduce ? 0 : 0.75,
                ease: EASE,
              }}
            >
              ANTHONY
            </motion.p>

            <motion.p
              className="mt-8 max-w-xs text-[0.7rem] font-light leading-relaxed tracking-[0.18em] text-[color-mix(in_srgb,var(--ivory)_62%,transparent)] uppercase md:mt-9 md:max-w-sm md:text-xs"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduce ? 0.12 : 0.7,
                delay: reduce ? 0 : 1.05,
                ease: EASE,
              }}
            >
              Founder · ECKOBIG TRINITY GLOBAL
            </motion.p>
          </div>

          <motion.p
            className="pointer-events-none absolute bottom-8 left-0 right-0 text-center text-[0.7rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--ivory)_45%,transparent)] uppercase md:bottom-10"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduce ? 0.1 : 0.6,
              delay: reduce ? 0 : 1.45,
              ease: EASE,
            }}
          >
            Continue
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
