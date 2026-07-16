import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

const STORAGE_KEY = "eckobig-splash-seen"
/** Hold long enough for authority line to land (~3.1s), still skippable */
const HOLD_MS = 3100
const HOLD_REDUCED_MS = 320
const EXIT_S = 0.7
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
          {/* Quiet gold / green atmosphere — restrained, no sparkle */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0.15 : 1.2, ease: EASE }}
            style={{
              backgroundImage: `
                radial-gradient(ellipse 65% 50% at 50% 40%, color-mix(in srgb, var(--gold) 16%, transparent), transparent 60%),
                radial-gradient(ellipse 50% 40% at 14% 82%, color-mix(in srgb, var(--green-mid) 80%, transparent), transparent 64%),
                radial-gradient(ellipse 45% 35% at 90% 16%, color-mix(in srgb, var(--gold-light) 8%, transparent), transparent 58%),
                linear-gradient(165deg, #0a2f24 0%, var(--green) 48%, #124a38 100%)
              `,
            }}
          />

          {/* Soft gold breath — very quiet pulse */}
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute left-1/2 top-[38%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color-mix(in_srgb,var(--gold)_10%,transparent)] blur-3xl md:h-64 md:w-64"
              aria-hidden
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: [0, 0.55, 0.35], scale: [0.85, 1.05, 1] }}
              transition={{ duration: 2.4, ease: EASE }}
            />
          )}

          <div className="relative z-10 flex flex-col items-center px-5 text-center sm:px-6">
            <motion.p
              className="font-[family-name:var(--font-display)] text-[clamp(2.35rem,9vw,5.5rem)] font-semibold leading-none tracking-[0.22em] text-[var(--ivory)] sm:tracking-[0.28em]"
              initial={reduce ? false : { opacity: 0, y: 16, letterSpacing: "0.4em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.28em" }}
              transition={{
                duration: reduce ? 0.2 : 1.05,
                delay: reduce ? 0 : 0.12,
                ease: EASE,
              }}
            >
              ECKOBIG
            </motion.p>

            <motion.div
              className="mt-7 h-px w-24 origin-center bg-gradient-to-r from-transparent via-[var(--gold-light)] to-transparent md:mt-8 md:w-32"
              aria-hidden
              initial={reduce ? false : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.9 }}
              transition={{
                duration: reduce ? 0.15 : 0.85,
                delay: reduce ? 0 : 0.5,
                ease: EASE,
              }}
            />

            <motion.p
              className="mt-6 font-[family-name:var(--font-display)] text-sm font-medium tracking-[0.42em] text-[var(--gold-light)] md:mt-7 md:text-base"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduce ? 0.15 : 0.75,
                delay: reduce ? 0 : 0.7,
                ease: EASE,
              }}
            >
              ANTHONY
            </motion.p>

            <motion.p
              className="mt-7 max-w-md text-[0.65rem] font-light leading-relaxed tracking-[0.2em] text-[color-mix(in_srgb,var(--ivory)_68%,transparent)] uppercase md:mt-8 md:text-[0.7rem] md:tracking-[0.22em]"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduce ? 0.12 : 0.65,
                delay: reduce ? 0 : 1.0,
                ease: EASE,
              }}
            >
              Luxury hospitality · International trade · Social impact
            </motion.p>

            <motion.p
              className="mt-4 text-[0.65rem] font-light tracking-[0.18em] text-[color-mix(in_srgb,var(--ivory)_48%,transparent)] uppercase md:text-[0.7rem]"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: reduce ? 0.1 : 0.55,
                delay: reduce ? 0 : 1.25,
                ease: EASE,
              }}
            >
              Founder · ECKOBIG TRINITY GLOBAL
            </motion.p>
          </div>

          <motion.p
            className="pointer-events-none absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-0 right-0 text-center text-[0.65rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--ivory)_40%,transparent)] uppercase md:bottom-10"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduce ? 0.1 : 0.5,
              delay: reduce ? 0 : 1.55,
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
