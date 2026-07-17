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
import { pressArchive, pressIntro, pressSpreads } from "../content/press"
import { ReadMore } from "./ReadMore"
import { Reveal, ScrollAccent } from "./Reveal"

const EASE = [0.22, 1, 0.36, 1] as const

export function PressSection() {
  const reduce = useReducedMotion()
  const labelId = useId()
  const lightboxLabelId = useId()
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const lightboxRef = useRef<HTMLDivElement>(null)

  const spread = pressSpreads[active] ?? pressSpreads[0]
  const total = pressSpreads.length

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % total) + total) % total
      setActive(next)
    },
    [total],
  )

  const openLightbox = useCallback((index?: number) => {
    if (index !== undefined) setActive(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  useEffect(() => {
    if (!lightboxOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    lightboxRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
    }
  }, [lightboxOpen])

  const onGalleryKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      goTo(active + 1)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      goTo(active - 1)
    } else if (e.key === "Home") {
      e.preventDefault()
      goTo(0)
    } else if (e.key === "End") {
      e.preventDefault()
      goTo(total - 1)
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      openLightbox()
    }
  }

  const onLightboxKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault()
      closeLightbox()
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      goTo(active + 1)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      goTo(active - 1)
    } else if (e.key === "Home") {
      e.preventDefault()
      goTo(0)
    } else if (e.key === "End") {
      e.preventDefault()
      goTo(total - 1)
    }
  }

  return (
    <>
      <section
        id="press"
        className="bg-luxury texture-grain relative scroll-mt-24 overflow-hidden py-16 md:py-32"
        aria-labelledby={labelId}
      >
        <div
          className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-[color-mix(in_srgb,var(--gold)_12%,transparent)] blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.3em] text-[var(--gold-deep)] uppercase">
              {pressIntro.eyebrow}
            </p>
            <h2
              id={labelId}
              className="heading-shimmer mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[0.04em] text-[var(--green)] md:text-5xl"
            >
              {pressIntro.title}
            </h2>
            <ScrollAccent />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--green-mid)] md:text-lg">
              {pressIntro.lead}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-12 md:mt-14">
            <div
              className="relative outline-none"
              role="region"
              aria-roledescription="carousel"
              aria-label="Newspaper press coverage"
              tabIndex={0}
              onKeyDown={onGalleryKey}
            >
              <button
                type="button"
                className="group relative block w-full overflow-hidden border border-[color-mix(in_srgb,var(--gold)_40%,transparent)] bg-[var(--green)] text-left outline-none transition-shadow duration-500 hover:shadow-[0_24px_64px_color-mix(in_srgb,var(--green)_18%,transparent)] focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ivory)]"
                aria-label={`Open ${spread.publication}: ${spread.headline}`}
                onClick={() => openLightbox()}
              >
                <div className="relative aspect-[4/5] sm:aspect-[16/11] md:aspect-[21/12]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={spread.id}
                      src={spread.image}
                      alt={spread.alt}
                      className="absolute inset-0 h-full w-full object-contain bg-[color-mix(in_srgb,var(--ivory)_92%,white)] p-2 sm:object-cover sm:p-0"
                      initial={reduce ? false : { opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                      loading={active === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </AnimatePresence>

                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--green)_88%,black)] via-[color-mix(in_srgb,var(--green)_20%,transparent)] to-transparent sm:via-transparent"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold-light)] to-transparent opacity-70"
                    aria-hidden
                  />

                  <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 md:p-8">
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
                        key={spread.id}
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        <p className="mt-2 text-[0.65rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--ivory)_72%,transparent)] uppercase sm:mt-3 sm:text-xs sm:tracking-[0.28em]">
                          {spread.publication}
                          <span className="mx-2 opacity-50" aria-hidden>
                            ·
                          </span>
                          {spread.date}
                        </p>
                        <h3 className="mt-2 max-w-3xl font-[family-name:var(--font-display)] text-lg leading-snug tracking-[0.03em] text-[var(--ivory)] sm:text-xl md:text-2xl lg:text-3xl">
                          {spread.headline}
                        </h3>
                      </motion.div>
                    </AnimatePresence>
                    <p className="mt-3 text-[0.65rem] tracking-[0.16em] text-[color-mix(in_srgb,var(--ivory)_58%,transparent)] uppercase sm:text-xs sm:tracking-[0.18em]">
                      <span className="md:hidden">Tap to enlarge · swipe thumbs</span>
                      <span className="hidden md:inline">
                        Click to enlarge · arrows to browse
                      </span>
                    </p>
                  </div>
                </div>
              </button>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between md:mt-6">
                <div className="relative min-w-0 flex-1">
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[var(--ivory)] to-transparent sm:hidden"
                    aria-hidden
                  />
                  <div
                    className="press-thumbs flex gap-2.5 overflow-x-auto overscroll-x-contain pb-1 pe-8 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-3 md:pe-0 [&::-webkit-scrollbar]:hidden"
                    role="listbox"
                    aria-label="All press spreads"
                    aria-activedescendant={`press-spread-${spread.id}`}
                  >
                  {pressSpreads.map((item, i) => {
                    const selected = i === active
                    return (
                      <button
                        key={item.id}
                        id={`press-spread-${item.id}`}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        aria-label={`${item.publication}, ${item.headline}`}
                        className={`group relative shrink-0 overflow-hidden outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 ${
                          selected
                            ? "ring-1 ring-[var(--gold)] ring-offset-2 ring-offset-[var(--ivory)]"
                            : "opacity-75 hover:opacity-100"
                        }`}
                        style={{
                          width: "min(30vw, 7.5rem)",
                          height: "5.25rem",
                          minWidth: "5.5rem",
                        }}
                        onClick={() => goTo(i)}
                        onDoubleClick={() => openLightbox(i)}
                      >
                        <img
                          src={item.thumb}
                          alt=""
                          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                          aria-hidden
                        />
                        <div
                          className={`pointer-events-none absolute inset-0 transition-colors ${
                            selected
                              ? "bg-[color-mix(in_srgb,var(--green)_18%,transparent)]"
                              : "bg-[color-mix(in_srgb,var(--green)_38%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--green)_15%,transparent)]"
                          }`}
                          aria-hidden
                        />
                        <span className="pointer-events-none absolute bottom-1 left-1.5 max-w-[calc(100%-0.75rem)] truncate font-[family-name:var(--font-display)] text-[0.55rem] tracking-[0.12em] text-[var(--gold-light)]">
                          {item.publication}
                        </span>
                      </button>
                    )
                  })}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    className="min-h-11 border border-[color-mix(in_srgb,var(--gold)_40%,transparent)] px-4 py-2.5 text-xs tracking-[0.14em] text-[var(--green-mid)] uppercase transition-colors hover:border-[var(--gold)] hover:text-[var(--green)] focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2"
                    aria-label="Previous spread"
                    onClick={() => goTo(active - 1)}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className="min-h-11 border border-[color-mix(in_srgb,var(--gold)_40%,transparent)] px-4 py-2.5 text-xs tracking-[0.14em] text-[var(--green-mid)] uppercase transition-colors hover:border-[var(--gold)] hover:text-[var(--green)] focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2"
                    aria-label="Next spread"
                    onClick={() => goTo(active + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10">
              <button
                type="button"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-[var(--gold)] bg-[var(--green)] px-5 py-2.5 text-xs font-medium tracking-[0.18em] text-[var(--gold-light)] uppercase transition-colors hover:bg-[color-mix(in_srgb,var(--green)_88%,black)] focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 sm:w-auto"
                onClick={() => openLightbox()}
              >
                {pressArchive.label}
              </button>
            </div>
          </Reveal>

          <Reveal>
            <ReadMore className="mt-12" moreLabel="Read more">
              <p className="max-w-3xl text-base leading-relaxed text-[var(--green-mid)]">
                {pressIntro.readMore}
              </p>
            </ReadMore>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby={lightboxLabelId}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            onKeyDown={onLightboxKey}
          >
            <button
              type="button"
              className="absolute inset-0 bg-[color-mix(in_srgb,var(--green)_82%,black)] backdrop-blur-sm"
              aria-label="Close lightbox"
              onClick={closeLightbox}
            />

            <motion.div
              ref={lightboxRef}
              className="relative z-10 flex max-h-[min(92vh,100dvh)] w-full max-w-5xl flex-col outline-none"
              initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 8, scale: 0.99 }}
              transition={{ duration: 0.35, ease: EASE }}
              tabIndex={-1}
            >
              <div className="flex items-start justify-between gap-3 border border-[color-mix(in_srgb,var(--gold)_45%,transparent)] bg-[var(--ivory)] px-3 py-3 sm:gap-4 sm:px-4 md:px-5">
                <div className="min-w-0">
                  <p
                    id={lightboxLabelId}
                    className="text-[0.65rem] tracking-[0.2em] text-[var(--gold-deep)] uppercase sm:text-xs sm:tracking-[0.24em]"
                  >
                    {spread.publication} · {spread.date}
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-sm leading-snug text-[var(--green)] md:text-base">
                    {spread.headline}
                  </p>
                </div>
                <button
                  type="button"
                  className="min-h-10 shrink-0 border border-[color-mix(in_srgb,var(--gold)_40%,transparent)] px-3 py-2 text-xs tracking-[0.14em] text-[var(--green)] uppercase transition-colors hover:border-[var(--gold)] focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  onClick={closeLightbox}
                >
                  Close
                </button>
              </div>

              <div className="relative overflow-hidden border-x border-b border-[color-mix(in_srgb,var(--gold)_45%,transparent)] bg-[color-mix(in_srgb,var(--ivory)_96%,white)]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`lb-${spread.id}`}
                    src={spread.image}
                    alt={spread.alt}
                    className="max-h-[min(58vh,820px)] w-full object-contain sm:max-h-[min(72vh,820px)]"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    decoding="async"
                  />
                </AnimatePresence>

                <div className="absolute inset-y-0 left-0 hidden items-center sm:flex">
                  <button
                    type="button"
                    className="ml-2 border border-[color-mix(in_srgb,var(--gold)_45%,transparent)] bg-[color-mix(in_srgb,var(--green)_75%,transparent)] px-3 py-2 text-xs tracking-[0.12em] text-[var(--ivory)] uppercase backdrop-blur-sm transition-colors hover:border-[var(--gold-light)] focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                    aria-label="Previous spread"
                    onClick={() => goTo(active - 1)}
                  >
                    Prev
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 hidden items-center sm:flex">
                  <button
                    type="button"
                    className="mr-2 border border-[color-mix(in_srgb,var(--gold)_45%,transparent)] bg-[color-mix(in_srgb,var(--green)_75%,transparent)] px-3 py-2 text-xs tracking-[0.12em] text-[var(--ivory)] uppercase backdrop-blur-sm transition-colors hover:border-[var(--gold-light)] focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                    aria-label="Next spread"
                    onClick={() => goTo(active + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 sm:hidden">
                <button
                  type="button"
                  className="min-h-11 flex-1 border border-[color-mix(in_srgb,var(--gold)_45%,transparent)] bg-[color-mix(in_srgb,var(--green)_70%,transparent)] px-3 py-2 text-xs tracking-[0.12em] text-[var(--ivory)] uppercase"
                  aria-label="Previous spread"
                  onClick={() => goTo(active - 1)}
                >
                  Prev
                </button>
                <button
                  type="button"
                  className="min-h-11 flex-1 border border-[color-mix(in_srgb,var(--gold)_45%,transparent)] bg-[color-mix(in_srgb,var(--green)_70%,transparent)] px-3 py-2 text-xs tracking-[0.12em] text-[var(--ivory)] uppercase"
                  aria-label="Next spread"
                  onClick={() => goTo(active + 1)}
                >
                  Next
                </button>
              </div>

              <p className="mt-3 text-center text-[0.65rem] tracking-[0.14em] text-[color-mix(in_srgb,var(--ivory)_72%,transparent)] uppercase sm:text-xs sm:tracking-[0.16em]">
                {active + 1} of {total}
                <span className="hidden sm:inline">
                  {" "}
                  · Escape to close · Arrow keys to navigate
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
