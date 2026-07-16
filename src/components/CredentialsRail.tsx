import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react"
import { credentials, credentialsIntro } from "../content/credentials"
import { Reveal, ScrollAccent } from "./Reveal"

const EASE = [0.22, 1, 0.36, 1] as const

export function CredentialsRail() {
  const reduce = useReducedMotion()
  const labelId = useId()
  const panelId = useId()
  const railRef = useRef<HTMLDivElement>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const [canScrollMore, setCanScrollMore] = useState(false)
  const [canScrollBack, setCanScrollBack] = useState(false)
  const [overflows, setOverflows] = useState(false)
  const [activeDot, setActiveDot] = useState(0)
  const [hintVisible, setHintVisible] = useState(true)

  const active = credentials.find((c) => c.id === openId) ?? null

  const syncRail = useCallback(() => {
    const el = railRef.current
    if (!el) return
    const max = Math.max(0, el.scrollWidth - el.clientWidth)
    const left = el.scrollLeft
    const hasOverflow = max > 10
    setOverflows(hasOverflow)
    setCanScrollMore(hasOverflow && left < max - 10)
    setCanScrollBack(hasOverflow && left > 10)

    if (!hasOverflow) {
      setActiveDot(0)
      return
    }
    const ratio = left / max
    setActiveDot(
      Math.round(ratio * Math.max(0, credentials.length - 1)),
    )
  }, [])

  useEffect(() => {
    syncRail()
    const el = railRef.current
    if (!el) return
    const ro = new ResizeObserver(syncRail)
    ro.observe(el)
    window.addEventListener("resize", syncRail)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", syncRail)
    }
  }, [syncRail])

  const dismissHint = () => {
    if (hintVisible) setHintVisible(false)
  }

  /**
   * Scroll the rail only (never document scrollIntoView).
   * Selected chip sits left-of-center so the next chip peeks on the right.
   * Last chip scrolls flush to the end.
   */
  const scrollChipIntoView = useCallback(
    (index: number) => {
      const el = railRef.current
      if (!el) return

      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth)
      if (maxScroll <= 0) return

      const last = credentials.length - 1
      const behavior: ScrollBehavior = reduce ? "auto" : "smooth"

      if (index >= last) {
        el.scrollTo({ left: maxScroll, behavior })
        return
      }

      const chip = el.querySelector<HTMLElement>(
        `[data-credential-index="${index}"]`,
      )
      if (!chip) return

      const elRect = el.getBoundingClientRect()
      const chipRect = chip.getBoundingClientRect()
      const chipLeft = el.scrollLeft + (chipRect.left - elRect.left)

      // Prefer selected chip ~16–20% from the left edge (left-of-center).
      let target = chipLeft - el.clientWidth * 0.16

      // Guarantee a peek of the next chip on the right when more remain.
      const next = el.querySelector<HTMLElement>(
        `[data-credential-index="${index + 1}"]`,
      )
      if (next) {
        const nextRect = next.getBoundingClientRect()
        const nextLeft = el.scrollLeft + (nextRect.left - elRect.left)
        const peek = Math.min(nextRect.width * 0.55, el.clientWidth * 0.28)
        const minForPeek = nextLeft + peek - el.clientWidth
        target = Math.max(target, minForPeek)
      }

      el.scrollTo({
        left: Math.min(maxScroll, Math.max(0, target)),
        behavior,
      })
    },
    [reduce],
  )

  const selectCredential = (id: string, index: number) => {
    dismissHint()
    setOpenId(id)
    setActiveDot(index)
    // Defer one frame so layout/expanded state settles before measuring.
    requestAnimationFrame(() => scrollChipIntoView(index))
  }

  const toggle = (id: string, index: number) => {
    dismissHint()
    if (openId === id) {
      setOpenId(null)
      return
    }
    selectCredential(id, index)
  }

  const onKeyNav = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = credentials.findIndex((c) => c.id === openId)
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      const nextIndex = (index < 0 ? 0 : index + 1) % credentials.length
      const next = credentials[nextIndex]
      if (next) selectCredential(next.id, nextIndex)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      const prevIndex = index <= 0 ? credentials.length - 1 : index - 1
      const prev = credentials[prevIndex]
      if (prev) selectCredential(prev.id, prevIndex)
    } else if (e.key === "Home") {
      e.preventDefault()
      const first = credentials[0]
      if (first) selectCredential(first.id, 0)
    } else if (e.key === "End") {
      e.preventDefault()
      const last = credentials.length - 1
      const item = credentials[last]
      if (item) selectCredential(item.id, last)
    } else if (e.key === "Escape" && openId) {
      e.preventDefault()
      setOpenId(null)
    }
  }

  return (
    <section
      id="credentials"
      className="bg-luxury texture-grain relative scroll-mt-24 overflow-hidden py-14 md:py-20"
      aria-labelledby={labelId}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--gold)_55%,transparent)] to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-[var(--gold-deep)] uppercase">
            {credentialsIntro.eyebrow}
          </p>
          <h2
            id={labelId}
            className="heading-shimmer mt-3 font-[family-name:var(--font-display)] text-2xl tracking-[0.04em] text-[var(--green)] md:text-3xl"
          >
            {credentialsIntro.title}
          </h2>
          <ScrollAccent />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--green-mid)] md:text-base">
            {credentialsIntro.lead}
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-8 md:mt-10">
          <div
            className="outline-none"
            role="list"
            aria-label="Credentials and initiatives"
            onKeyDown={onKeyNav}
          >
            <div className="relative">
              {/* Soft edge fades — mobile cue that the rail continues */}
              <div
                className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[var(--ivory)] to-transparent transition-opacity duration-300 lg:hidden ${
                  canScrollBack ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden
              />
              <div
                className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[var(--ivory)] via-[color-mix(in_srgb,var(--ivory)_88%,transparent)] to-transparent transition-opacity duration-300 lg:hidden ${
                  canScrollMore ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden
              />

              <div
                ref={railRef}
                className="credentials-rail flex gap-2.5 overflow-x-auto overscroll-x-contain scroll-smooth pb-1 pe-14 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-wrap lg:gap-2.5 lg:overflow-visible lg:pe-0 [&::-webkit-scrollbar]:hidden"
                onScroll={() => {
                  syncRail()
                  dismissHint()
                }}
              >
                {credentials.map((item, index) => {
                  const expanded = openId === item.id
                  const controlId = `credential-btn-${item.id}`
                  return (
                    <button
                      key={item.id}
                      id={controlId}
                      type="button"
                      role="listitem"
                      data-credential-index={index}
                      aria-expanded={expanded}
                      aria-controls={expanded ? panelId : undefined}
                      className={`min-h-11 shrink-0 border px-4 py-2.5 text-left text-[0.7rem] tracking-[0.14em] uppercase transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ivory)] md:min-h-0 md:px-3.5 md:py-2 md:text-[0.7rem] ${
                        expanded
                          ? "border-[var(--gold)] bg-[var(--green)] text-[var(--gold-light)]"
                          : "border-[color-mix(in_srgb,var(--gold)_40%,transparent)] bg-transparent text-[var(--green-mid)] hover:border-[var(--gold)] hover:text-[var(--green)]"
                      }`}
                      onClick={() => toggle(item.id, index)}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Mobile: swipe hint + progress dots */}
            {overflows && (
              <div className="mt-3 flex items-center justify-between gap-3 lg:hidden">
                <div className="min-h-[1rem] min-w-0 flex-1">
                  <AnimatePresence>
                    {hintVisible && canScrollMore && (
                      <motion.p
                        className="flex items-center gap-2 text-[0.65rem] tracking-[0.22em] text-[var(--gold-deep)] uppercase"
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduce ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        <span
                          className="inline-block h-px w-4 bg-gradient-to-r from-[var(--gold)] to-transparent"
                          aria-hidden
                        />
                        Swipe
                        <motion.span
                          aria-hidden
                          className="inline-block text-[var(--gold)]"
                          animate={
                            reduce
                              ? undefined
                              : { x: [0, 4, 0], opacity: [0.55, 1, 0.55] }
                          }
                          transition={
                            reduce
                              ? undefined
                              : {
                                  duration: 1.6,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }
                          }
                        >
                          ›
                        </motion.span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div
                  className="flex shrink-0 items-center gap-1.5"
                  role="tablist"
                  aria-label="Credential scroll position"
                >
                  {credentials.map((item, index) => {
                    const on = index === activeDot
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={on}
                        aria-label={`Show ${item.label}`}
                        className={`h-1.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 ${
                          on
                            ? "w-5 bg-[var(--gold)]"
                            : "w-1.5 bg-[color-mix(in_srgb,var(--green)_28%,transparent)]"
                        }`}
                        onClick={() => selectCredential(item.id, index)}
                      />
                    )
                  })}
                </div>
              </div>
            )}

            <AnimatePresence mode="wait" initial={false}>
              {active && (
                <motion.div
                  key={active.id}
                  id={panelId}
                  role="region"
                  aria-labelledby={`credential-btn-${active.id}`}
                  className="mt-5 border-l-2 border-[var(--gold)] bg-[color-mix(in_srgb,var(--green-soft)_55%,var(--ivory))] py-4 pl-7 pr-4 md:mt-6 md:py-5 md:pl-6 md:pr-6"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: reduce ? 0.15 : 0.4, ease: EASE }}
                >
                  <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.18em] text-[var(--green)] uppercase">
                    {active.label}
                  </p>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[color-mix(in_srgb,var(--ink)_78%,transparent)] md:text-[0.95rem]">
                    {active.detail}
                  </p>
                  {active.documents && active.documents.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      {active.documents.map((doc) => (
                        <a
                          key={doc.href}
                          href={doc.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-10 items-center text-xs tracking-[0.16em] text-[var(--gold-deep)] uppercase transition-colors hover:text-[var(--green)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                        >
                          {doc.label}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!active && (
              <p className="mt-4 text-xs tracking-[0.16em] text-[color-mix(in_srgb,var(--ink)_42%,transparent)] uppercase">
                Select an item for detail
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
