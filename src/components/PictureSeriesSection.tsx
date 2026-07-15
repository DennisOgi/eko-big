import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { seriesFrames, seriesIntro, type SeriesFrame } from "../content/series"

/** Tasteful dwell between frames while the runway is in view */
const SERIES_AUTOPLAY_MS = 5200
/** Resume autoplay after the last pointer / key interaction */
const SERIES_IDLE_RESUME_MS = 2600

function RunwayFrame({
  frame,
  index,
  total,
  active,
  focused,
  onFocus,
  onActivate,
  progress,
  reduce,
}: {
  frame: SeriesFrame
  index: number
  total: number
  active: boolean
  focused: boolean
  onFocus: () => void
  onActivate: () => void
  progress: MotionValue<number>
  reduce: boolean | null
}) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 140, damping: 18, mass: 0.35 })
  const springY = useSpring(my, { stiffness: 140, damping: 18, mass: 0.35 })

  const depth = (index % 3) - 1
  const parallaxY = useTransform(
    progress,
    [0, 1],
    reduce ? [0, 0] : [depth * 14, depth * -18],
  )
  const frameY = useTransform(
    [parallaxY, springY],
    ([py, myv]: number[]) => (reduce ? 0 : py + myv),
  )
  const frameX = useTransform(springX, (v) => (reduce ? 0 : v))
  const imgScale = useTransform(
    progress,
    [0, 0.5, 1],
    reduce ? [1, 1, 1] : [1.04, 1.08, 1.03],
  )

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(nx * 16)
    my.set(ny * 12)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.button
      type="button"
      className={`group relative shrink-0 overflow-hidden text-left outline-none transition-[opacity,filter] duration-500 focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--green)] ${
        active || focused
          ? "z-10 opacity-100"
          : "opacity-[0.62] md:opacity-[0.55]"
      }`}
      style={{
        width: "min(72vw, 26rem)",
        height: "min(58vh, 32rem)",
        x: frameX,
        y: frameY,
      }}
      aria-label={`${frame.title}: ${frame.alt}`}
      aria-current={active ? "true" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onMouseEnter={onFocus}
      onClick={onActivate}
      onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onActivate()
        }
      }}
    >
      <motion.img
        src={frame.src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{
          objectPosition: frame.position,
          scale: active && !reduce ? 1.06 : imgScale,
        }}
        draggable={false}
        loading={index < 2 ? "eager" : "lazy"}
        decoding="async"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--green)_88%,black)] via-[color-mix(in_srgb,var(--green)_28%,transparent)] to-transparent opacity-95"
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-0 border transition-colors duration-500 ${
          active || focused
            ? "border-[color-mix(in_srgb,var(--gold)_55%,transparent)]"
            : "border-[color-mix(in_srgb,var(--ivory)_12%,transparent)]"
        }`}
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-7">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.32em] text-[var(--gold-light)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]">
          {frame.index}
          <span className="mx-2 text-[color-mix(in_srgb,var(--ivory)_55%,transparent)]">
            /
          </span>
          <span className="tracking-[0.24em] text-[color-mix(in_srgb,var(--ivory)_70%,transparent)]">
            {String(total).padStart(2, "0")}
          </span>
        </p>
        <h3
          className={`mt-3 font-[family-name:var(--font-display)] tracking-[0.08em] text-[var(--ivory)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] transition-all duration-500 ${
            active || focused
              ? "translate-y-0 text-3xl opacity-100 md:text-4xl"
              : "translate-y-0 text-2xl opacity-95 md:text-3xl"
          }`}
        >
          {frame.title}
        </h3>
        <p
          className={`mt-2 max-w-[16rem] text-sm font-light tracking-wide text-[rgba(255,255,255,0.9)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)] transition-opacity duration-500 md:text-base ${
            active || focused ? "opacity-100" : "opacity-85"
          }`}
        >
          {frame.line}
        </p>
      </div>
    </motion.button>
  )
}

function TrackProgress({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion()
  const scaleX = useSpring(progress, { stiffness: 90, damping: 28, mass: 0.35 })

  if (reduce) return null

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-30 h-px bg-[color-mix(in_srgb,var(--ivory)_8%,transparent)]"
      aria-hidden
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-transparent via-[var(--gold-light)] to-[var(--gold)] opacity-80"
        style={{ scaleX }}
      />
    </div>
  )
}

export function PictureSeriesSection() {
  const reduce = useReducedMotion()
  const labelId = useId()
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [hover, setHover] = useState<number | null>(null)
  const [trackOverflow, setTrackOverflow] = useState(0)
  const [inView, setInView] = useState(false)
  const [holding, setHolding] = useState(false)

  const activeRef = useRef(0)
  const holdingRef = useRef(false)
  const pauseUntilRef = useRef(0)
  const dragStartX = useRef(0)
  const dragFrom = useRef(0)
  const draggingRef = useRef(false)

  const progress = useMotionValue(0)
  const x = useMotionValue(0)

  const measure = useCallback(() => {
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage) return
    const overflow = Math.max(0, track.scrollWidth - stage.clientWidth)
    setTrackOverflow(overflow)
  }, [])

  const offsetForIndex = useCallback(
    (index: number) => {
      const last = Math.max(1, seriesFrames.length - 1)
      return -((index / last) * trackOverflow)
    },
    [trackOverflow],
  )

  const goTo = useCallback(
    (index: number, opts?: { instant?: boolean }) => {
      const last = seriesFrames.length - 1
      const clamped = Math.max(0, Math.min(last, index))
      const from = activeRef.current
      const wrapping = from === last && clamped === 0
      const targetX = offsetForIndex(clamped)
      const progressV = last === 0 ? 0 : clamped / last

      activeRef.current = clamped
      setActive(clamped)
      progress.set(progressV)

      const instant = reduce || opts?.instant || wrapping
      if (instant) {
        x.set(targetX)
        return
      }
      animate(x, targetX, {
        type: "spring",
        stiffness: 70,
        damping: 28,
        mass: 0.4,
      })
    },
    [offsetForIndex, progress, reduce, x],
  )

  useEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (stageRef.current) ro.observe(stageRef.current)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [measure])

  useEffect(() => {
    // Keep position in sync when overflow changes (resize)
    goTo(activeRef.current, { instant: true })
  }, [trackOverflow, goTo])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.35))
      },
      { threshold: [0, 0.25, 0.35, 0.55, 0.85] },
    )
    io.observe(stage)
    return () => io.disconnect()
  }, [])

  const bumpIdlePause = useCallback(() => {
    pauseUntilRef.current = performance.now() + SERIES_IDLE_RESUME_MS
  }, [])

  const setHoldingPause = useCallback(
    (next: boolean) => {
      holdingRef.current = next
      setHolding(next)
      if (!next) bumpIdlePause()
    },
    [bumpIdlePause],
  )

  useEffect(() => {
    if (reduce || !inView) return

    let cancelled = false
    let timer = 0

    const schedule = (delay: number) => {
      timer = window.setTimeout(step, delay)
    }

    const step = () => {
      if (cancelled) return
      if (
        holdingRef.current ||
        draggingRef.current ||
        performance.now() < pauseUntilRef.current
      ) {
        schedule(220)
        return
      }

      const last = seriesFrames.length - 1
      const from = activeRef.current
      const next = from >= last ? 0 : from + 1
      goTo(next, { instant: next === 0 })
      schedule(SERIES_AUTOPLAY_MS)
    }

    schedule(SERIES_AUTOPLAY_MS)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [reduce, inView, goTo])

  const onKeyNav = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      bumpIdlePause()
      goTo(active + 1)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      bumpIdlePause()
      goTo(active - 1)
    } else if (e.key === "Home") {
      e.preventDefault()
      bumpIdlePause()
      goTo(0)
    } else if (e.key === "End") {
      e.preventDefault()
      bumpIdlePause()
      goTo(seriesFrames.length - 1)
    }
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce || e.button !== 0) return
    draggingRef.current = true
    dragStartX.current = e.clientX
    dragFrom.current = x.get()
    setHoldingPause(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || reduce) return
    const dx = e.clientX - dragStartX.current
    const next = Math.min(0, Math.max(-trackOverflow, dragFrom.current + dx))
    x.set(next)
    if (trackOverflow > 0) {
      progress.set(Math.min(1, Math.max(0, -next / trackOverflow)))
    }
  }

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    draggingRef.current = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }

    const last = Math.max(1, seriesFrames.length - 1)
    const p = trackOverflow > 0 ? Math.min(1, Math.max(0, -x.get() / trackOverflow)) : 0
    const nearest = Math.round(p * last)
    bumpIdlePause()
    setHoldingPause(false)
    goTo(nearest)
  }

  const focusIndex = hover ?? active

  return (
    <section
      id="series"
      ref={sectionRef}
      className="relative scroll-mt-24 bg-[var(--green)]"
      aria-labelledby={labelId}
    >
      <div
        ref={stageRef}
        className="relative min-h-[min(100svh,52rem)] overflow-hidden md:min-h-[min(100svh,56rem)]"
      >
        <TrackProgress progress={progress} />

        <div className="pointer-events-none absolute inset-0 bg-forest texture-grain opacity-90" />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[var(--green)] to-transparent md:w-28"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[var(--green)] to-transparent md:w-28"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex h-full min-h-[inherit] max-w-[100vw] flex-col justify-between px-5 py-20 md:px-8 md:py-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="text-xs font-medium tracking-[0.3em] text-[var(--gold-light)] uppercase">
              {seriesIntro.eyebrow}
            </p>
            <h2
              id={labelId}
              className="heading-shimmer-light mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[0.08em] text-[var(--ivory)] md:text-5xl"
            >
              {seriesIntro.title}
            </h2>
            <div className="mt-5 h-px w-16 bg-gradient-to-r from-[var(--gold)] to-transparent" />
            <p className="mt-5 max-w-md text-base font-light leading-relaxed text-[rgba(255,255,255,0.88)] md:text-lg">
              {seriesIntro.lead}
            </p>
            <p className="mt-3 text-sm font-light tracking-wide text-[rgba(255,255,255,0.4)]">
              {seriesIntro.hint}
            </p>
          </motion.div>

          <div
            className={
              reduce
                ? "mt-12 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                : "relative mt-8 min-h-[min(58vh,32rem)] flex-1 touch-pan-y"
            }
            role="listbox"
            aria-label="Portrait gallery"
            aria-activedescendant={`series-frame-${seriesFrames[active]?.index}`}
            tabIndex={0}
            onKeyDown={onKeyNav}
            onPointerDown={reduce ? undefined : onPointerDown}
            onPointerMove={reduce ? undefined : onPointerMove}
            onPointerUp={reduce ? undefined : endDrag}
            onPointerCancel={reduce ? undefined : endDrag}
            onPointerEnter={() => {
              if (!reduce) setHoldingPause(true)
            }}
            onPointerLeave={() => {
              if (!reduce) {
                if (draggingRef.current) return
                setHoldingPause(false)
              }
            }}
            onFocusCapture={() => {
              if (!reduce) setHoldingPause(true)
            }}
            onBlurCapture={(e) => {
              if (reduce) return
              const next = e.relatedTarget
              if (next instanceof Node && e.currentTarget.contains(next)) return
              setHoldingPause(false)
            }}
          >
            <motion.div
              ref={trackRef}
              className={`flex cursor-grab items-end gap-5 active:cursor-grabbing md:gap-8 ${
                reduce
                  ? "w-max pr-8"
                  : "absolute left-0 right-0 bottom-2 select-none md:bottom-4"
              }`}
              style={reduce ? undefined : { x }}
            >
              {seriesFrames.map((frame, i) => (
                <div
                  key={frame.src}
                  id={`series-frame-${frame.index}`}
                  role="option"
                  aria-selected={active === i}
                >
                  <RunwayFrame
                    frame={frame}
                    index={i}
                    total={seriesFrames.length}
                    active={active === i}
                    focused={focusIndex === i}
                    onFocus={() => setHover(i)}
                    onActivate={() => {
                      bumpIdlePause()
                      goTo(i)
                    }}
                    progress={progress}
                    reduce={reduce}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div
            className="relative z-20 mt-6 flex flex-wrap items-center gap-3 pb-2"
            onPointerEnter={() => {
              if (!reduce) setHoldingPause(true)
            }}
            onPointerLeave={() => {
              if (!reduce) setHoldingPause(false)
            }}
          >
            {seriesFrames.map((frame, i) => (
              <button
                key={frame.index}
                type="button"
                className={`relative h-1.5 overflow-hidden transition-all duration-500 focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--green)] ${
                  active === i
                    ? "w-11 bg-[color-mix(in_srgb,var(--gold)_35%,transparent)]"
                    : "w-3 bg-[color-mix(in_srgb,var(--ivory)_28%,transparent)] hover:bg-[color-mix(in_srgb,var(--gold)_55%,transparent)]"
                }`}
                aria-label={`Go to ${frame.title}`}
                aria-current={active === i ? "true" : undefined}
                onClick={() => {
                  bumpIdlePause()
                  goTo(i)
                }}
              >
                {active === i && !reduce && (
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-[var(--gold-light)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: SERIES_AUTOPLAY_MS / 1000, ease: "linear" }}
                    key={`tick-${i}-${active}`}
                  />
                )}
              </button>
            ))}
            <p className="ml-auto text-xs tracking-[0.22em] text-[rgba(255,255,255,0.55)] uppercase">
              {reduce
                ? "Swipe to travel · arrows to step"
                : holding
                  ? "Paused · drag or arrows to step"
                  : "Autoplay · drag · arrows · dots"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
