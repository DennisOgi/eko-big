import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion"
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react"
import { dubaiDistricts, dubaiIntro, dubaiVenues } from "../content/dubai"
import { Reveal, ScrollAccent } from "./Reveal"

const AUTOPLAY_MS = 5600
const IDLE_RESUME_MS = 2800

export function DubaiSection() {
  const reduce = useReducedMotion()
  const labelId = useId()
  const stripRef = useRef<HTMLDivElement>(null)
  const pauseUntil = useRef(0)
  const holding = useRef(false)
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const venue = dubaiVenues[active] ?? dubaiVenues[0]
  const total = dubaiVenues.length

  const goTo = useCallback((index: number) => {
    const next = ((index % total) + total) % total
    setActive(next)
  }, [total])

  const bumpPause = useCallback(() => {
    pauseUntil.current = performance.now() + IDLE_RESUME_MS
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.25))
      },
      { threshold: [0, 0.25, 0.45] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduce || !inView) return
    let cancelled = false
    let timer = 0

    const tick = () => {
      if (cancelled) return
      if (holding.current || performance.now() < pauseUntil.current) {
        timer = window.setTimeout(tick, 240)
        return
      }
      setActive((i) => (i + 1) % total)
      timer = window.setTimeout(tick, AUTOPLAY_MS)
    }

    timer = window.setTimeout(tick, AUTOPLAY_MS)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [reduce, inView, total])

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const thumb = strip.querySelector<HTMLElement>(`[data-venue-index="${active}"]`)
    if (!thumb) return

    // Center the active thumb inside the strip only — never scrollIntoView,
    // which can shift the document horizontally near the last indices.
    const stripRect = strip.getBoundingClientRect()
    const thumbRect = thumb.getBoundingClientRect()
    const target =
      strip.scrollLeft +
      (thumbRect.left - stripRect.left) -
      (strip.clientWidth - thumbRect.width) / 2
    const maxScroll = Math.max(0, strip.scrollWidth - strip.clientWidth)

    strip.scrollTo({
      left: Math.min(maxScroll, Math.max(0, target)),
      behavior: reduce ? "auto" : "smooth",
    })
  }, [active, reduce])

  const onKeyNav = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      bumpPause()
      goTo(active + 1)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      bumpPause()
      goTo(active - 1)
    } else if (e.key === "Home") {
      e.preventDefault()
      bumpPause()
      goTo(0)
    } else if (e.key === "End") {
      e.preventDefault()
      bumpPause()
      goTo(total - 1)
    }
  }

  return (
    <section
      id="dubai"
      ref={sectionRef}
      className="bg-luxury texture-grain relative scroll-mt-24 overflow-hidden py-24 md:py-32"
      aria-labelledby={labelId}
    >
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--gold)_14%,transparent)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-20 h-64 w-64 rounded-full bg-[color-mix(in_srgb,var(--green)_10%,transparent)] blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-[var(--gold-deep)] uppercase">
            {dubaiIntro.eyebrow}
          </p>
          <h2
            id={labelId}
            className="heading-shimmer mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[0.04em] text-[var(--green)] md:text-5xl"
          >
            {dubaiIntro.title}
          </h2>
          <ScrollAccent />
          <p className="mt-5 text-sm font-medium tracking-[0.16em] text-[var(--green)] md:text-base">
            {dubaiIntro.role}
          </p>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--green-mid)] md:text-lg">
            {dubaiIntro.lead}
          </p>
          <ul
            className="mt-5 flex flex-wrap gap-x-4 gap-y-2"
            aria-label="Primary Dubai corridors"
          >
            {dubaiDistricts.map((district) => (
              <li
                key={district}
                className="text-[0.7rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--ink)_48%,transparent)] uppercase"
              >
                <span
                  className="mr-2 inline-block h-px w-3 align-middle bg-[var(--gold)]"
                  aria-hidden
                />
                {district}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[color-mix(in_srgb,var(--ink)_62%,transparent)] md:text-[0.95rem]">
            {dubaiIntro.credibility}
          </p>
          <p className="mt-3 text-sm tracking-wide text-[color-mix(in_srgb,var(--ink)_55%,transparent)]">
            {dubaiIntro.note}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 md:mt-14">
          <div
            className="relative outline-none"
            role="region"
            aria-roledescription="carousel"
            aria-label="Dubai service destinations"
            tabIndex={0}
            onKeyDown={onKeyNav}
            onPointerEnter={() => {
              holding.current = true
            }}
            onPointerLeave={() => {
              holding.current = false
              bumpPause()
            }}
          >
            {/* Featured spotlight */}
            <div className="relative aspect-[16/11] overflow-hidden bg-[var(--green)] sm:aspect-[16/9] md:aspect-[21/10]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={venue.id}
                  src={venue.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: venue.position ?? "center center" }}
                  initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  loading={active < 2 ? "eager" : "lazy"}
                  decoding="async"
                  aria-hidden
                />
              </AnimatePresence>

              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--green)_92%,black)] via-[color-mix(in_srgb,var(--green)_35%,transparent)] to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 border border-[color-mix(in_srgb,var(--gold)_40%,transparent)]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold-light)] to-transparent opacity-70"
                aria-hidden
              />

              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 p-5 md:flex-row md:items-end md:justify-between md:p-8 lg:p-10">
                <div className="min-w-0 max-w-2xl">
                  <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.32em] text-[var(--gold-light)]">
                    {String(active + 1).padStart(2, "0")}
                    <span className="mx-2 text-[color-mix(in_srgb,var(--ivory)_45%,transparent)]">
                      /
                    </span>
                    <span className="tracking-[0.24em] text-[color-mix(in_srgb,var(--ivory)_65%,transparent)]">
                      {String(total).padStart(2, "0")}
                    </span>
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={venue.id}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="mt-3 text-xs tracking-[0.28em] text-[color-mix(in_srgb,var(--ivory)_70%,transparent)] uppercase">
                        {venue.district}
                      </p>
                      <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-snug tracking-[0.04em] text-[var(--ivory)] md:text-3xl lg:text-4xl">
                        {venue.name}
                      </h3>
                    </motion.div>
                  </AnimatePresence>
                  <p className="mt-3 text-sm font-light text-[rgba(255,255,255,0.72)]">
                    {dubaiIntro.role}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    className="border border-[color-mix(in_srgb,var(--gold)_45%,transparent)] bg-[color-mix(in_srgb,var(--green)_55%,transparent)] px-4 py-2.5 text-sm tracking-wide text-[var(--ivory)] backdrop-blur-sm transition-colors hover:border-[var(--gold-light)] hover:text-[var(--gold-light)] focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--green)]"
                    aria-label="Previous destination"
                    onClick={() => {
                      bumpPause()
                      goTo(active - 1)
                    }}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className="border border-[color-mix(in_srgb,var(--gold)_45%,transparent)] bg-[color-mix(in_srgb,var(--green)_55%,transparent)] px-4 py-2.5 text-sm tracking-wide text-[var(--ivory)] backdrop-blur-sm transition-colors hover:border-[var(--gold-light)] hover:text-[var(--gold-light)] focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--green)]"
                    aria-label="Next destination"
                    onClick={() => {
                      bumpPause()
                      goTo(active + 1)
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>

              {!reduce && (
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-0.5 bg-[color-mix(in_srgb,var(--ivory)_12%,transparent)]"
                  aria-hidden
                >
                  <motion.div
                    key={`progress-${active}`}
                    className="h-full origin-left bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  />
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="mt-5 md:mt-6">
              <div
                ref={stripRef}
                className="flex gap-2.5 overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-3 [&::-webkit-scrollbar]:hidden"
                role="listbox"
                aria-label="All Dubai venues"
                aria-activedescendant={`dubai-venue-${venue.id}`}
              >
                {dubaiVenues.map((v, i) => {
                  const selected = i === active
                  return (
                    <button
                      key={v.id}
                      id={`dubai-venue-${v.id}`}
                      type="button"
                      data-venue-index={i}
                      role="option"
                      aria-selected={selected}
                      aria-label={`${v.name}, ${v.district}`}
                      className={`group relative shrink-0 overflow-hidden outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 ${
                        selected
                          ? "ring-1 ring-[var(--gold)] ring-offset-2 ring-offset-[var(--ivory)]"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      style={{ width: "min(28vw, 7.5rem)", height: "4.75rem" }}
                      onClick={() => {
                        bumpPause()
                        goTo(i)
                      }}
                    >
                      <img
                        src={v.image}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        style={{ objectPosition: v.position ?? "center center" }}
                        loading="lazy"
                        decoding="async"
                        aria-hidden
                      />
                      <div
                        className={`pointer-events-none absolute inset-0 transition-colors ${
                          selected
                            ? "bg-[color-mix(in_srgb,var(--green)_25%,transparent)]"
                            : "bg-[color-mix(in_srgb,var(--green)_45%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--green)_20%,transparent)]"
                        }`}
                        aria-hidden
                      />
                      <span className="pointer-events-none absolute bottom-1 left-1.5 font-[family-name:var(--font-display)] text-[0.65rem] tracking-[0.18em] text-[var(--gold-light)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="mt-3 text-xs tracking-[0.2em] text-[color-mix(in_srgb,var(--ink)_45%,transparent)] uppercase">
                {reduce
                  ? "Select a venue · arrows to step"
                  : "Autoplay · hover to pause · arrows · thumbnails"}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-10 max-w-2xl border-l-2 border-[var(--gold)] pl-5 text-sm leading-relaxed text-[var(--green-mid)] md:pl-6 md:text-base">
            {dubaiIntro.closing}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
