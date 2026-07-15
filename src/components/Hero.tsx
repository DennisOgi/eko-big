import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { useEffect, useRef, useState, type MouseEvent } from "react"
import {
  HERO_AMBIENT_MS,
  HERO_CROSSFADE_S,
  HERO_SLIDE_MS,
  heroAmbient,
  heroDesktopSlide,
  heroSlides,
  type HeroSlide,
} from "../content/hero"
import { MagneticAnchor } from "./Magnetic"

function useMinWidth(queryPx: number) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${queryPx}px)`)
    const sync = () => setMatches(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [queryPx])
  return matches
}

/** Desktop: near 1.0–1.05. Mobile: gentle drift only. */
function kenBurnsTarget(
  kind: HeroSlide["kenBurns"],
  reduce: boolean | null,
  desktop: boolean,
) {
  if (reduce) return { scale: 1, x: "0%", y: "0%" }
  if (desktop) {
    switch (kind) {
      case "out":
        return { scale: 1.04, x: "0%", y: "-0.6%" }
      case "drift-left":
        return { scale: 1.035, x: "-1%", y: "0%" }
      case "drift-right":
        return { scale: 1.035, x: "1%", y: "0%" }
      case "in":
      default:
        return { scale: 1.03, x: "0%", y: "0.4%" }
    }
  }
  switch (kind) {
    case "out":
      return { scale: 1.08, x: "0%", y: "-1%" }
    case "drift-left":
      return { scale: 1.07, x: "-1.8%", y: "0%" }
    case "drift-right":
      return { scale: 1.07, x: "1.8%", y: "0%" }
    case "in":
    default:
      return { scale: 1.05, x: "0%", y: "0.6%" }
  }
}

function kenBurnsFrom(
  kind: HeroSlide["kenBurns"],
  reduce: boolean | null,
  desktop: boolean,
) {
  if (reduce) return { scale: 1, x: "0%", y: "0%" }
  if (desktop) {
    switch (kind) {
      case "out":
        return { scale: 1.01, x: "0%", y: "0%" }
      case "drift-left":
        return { scale: 1.015, x: "0.6%", y: "0%" }
      case "drift-right":
        return { scale: 1.015, x: "-0.6%", y: "0%" }
      case "in":
      default:
        return { scale: 1, x: "0%", y: "0%" }
    }
  }
  switch (kind) {
    case "out":
      return { scale: 1.02, x: "0%", y: "0%" }
    case "drift-left":
      return { scale: 1.03, x: "1%", y: "0%" }
    case "drift-right":
      return { scale: 1.03, x: "-1%", y: "0%" }
    case "in":
    default:
      return { scale: 1, x: "0%", y: "0%" }
  }
}

export function Hero() {
  const reduce = useReducedMotion()
  const isLg = useMinWidth(1024)
  const sectionRef = useRef<HTMLElement>(null)
  const [slide, setSlide] = useState(0)
  const [ambient, setAmbient] = useState(0)
  const [ready, setReady] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 55, damping: 22, mass: 0.45 })
  const springY = useSpring(my, { stiffness: 55, damping: 22, mass: 0.45 })

  const ambientGain = isLg ? 14 : 30
  const ambientGainY = isLg ? 9 : 20
  const portraitGain = isLg ? -6 : -14
  const portraitGainY = isLg ? -4 : -9

  const ambientX = useTransform(springX, (v) => v * ambientGain)
  const ambientY = useTransform(springY, (v) => v * ambientGainY)
  const portraitX = useTransform(springX, (v) => v * portraitGain)
  const portraitY = useTransform(springY, (v) => v * portraitGainY)
  const glowX = useTransform(springX, (v) => `${50 + v * 20}%`)
  const glowY = useTransform(springY, (v) => `${38 + v * 14}%`)
  const spotlight = useMotionTemplate`radial-gradient(58% 48% at ${glowX} ${glowY}, color-mix(in srgb, var(--gold) 24%, transparent), transparent 72%)`

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const veilOpacity = useTransform(scrollYProgress, [0, 0.85], [0, 0.35])

  useEffect(() => {
    const first = isLg ? heroDesktopSlide.src : heroSlides[0]?.src
    if (!first) {
      setReady(true)
      return
    }
    const img = new Image()
    img.src = first
    img.onload = () => setReady(true)
    img.onerror = () => setReady(true)
  }, [isLg])

  /** Mobile only — desktop locks to a single plate */
  useEffect(() => {
    if (reduce || isLg) return
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length)
    }, HERO_SLIDE_MS)
    return () => window.clearInterval(id)
  }, [reduce, isLg])

  useEffect(() => {
    if (reduce || isLg) return
    const id = window.setInterval(() => {
      setAmbient((a) => (a + 1) % heroAmbient.length)
    }, HERO_AMBIENT_MS)
    return () => window.clearInterval(id)
  }, [reduce, isLg])

  useEffect(() => {
    const idle = window.setTimeout(() => {
      const preload = new Image()
      preload.src = heroDesktopSlide.src
      if (!isLg) {
        heroSlides.slice(1).forEach((s) => {
          const img = new Image()
          img.src = s.src
        })
        heroAmbient.forEach((a) => {
          const img = new Image()
          img.src = a.src
        })
      }
    }, 500)
    return () => window.clearTimeout(idle)
  }, [isLg])

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(nx)
    my.set(ny)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const active = isLg ? heroDesktopSlide : heroSlides[slide]!
  const portraitPosition = isLg ? active.positionDesktop : active.position
  const ambientActive = isLg
    ? {
        src: heroDesktopSlide.src,
        alt: "",
        position: heroDesktopSlide.position,
        positionDesktop: heroDesktopSlide.positionDesktop,
      }
    : heroAmbient[ambient]!
  const ambientPosition = isLg
    ? ambientActive.positionDesktop
    : ambientActive.position

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-forest texture-grain"
      aria-label="Introduction"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="absolute inset-[-6%] z-0 will-change-transform lg:inset-[-3%]"
        style={reduce ? undefined : { x: ambientX, y: ambientY }}
        aria-hidden
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={isLg ? "desktop-amb" : `amb-${ambient}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: HERO_CROSSFADE_S, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={ambientActive.src}
              alt=""
              className="h-full w-full scale-105 object-cover opacity-[0.22] blur-[10px] saturate-[0.85] lg:scale-100 lg:opacity-[0.16] lg:blur-[14px]"
              style={{ objectPosition: ambientPosition }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[1] will-change-transform"
        style={reduce ? undefined : { x: portraitX, y: portraitY }}
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={isLg ? "desktop-hero" : active.src}
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: HERO_CROSSFADE_S, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={active.src}
              alt={active.alt}
              fetchPriority={isLg || slide === 0 ? "high" : "low"}
              decoding={isLg || slide === 0 ? "sync" : "async"}
              className="hero-portrait h-full w-full object-cover opacity-[0.9] lg:opacity-[0.98]"
              style={{ objectPosition: portraitPosition }}
              draggable={false}
              initial={kenBurnsFrom(active.kenBurns, reduce, isLg)}
              animate={kenBurnsTarget(active.kenBurns, reduce, isLg)}
              transition={
                reduce
                  ? { duration: 0 }
                  : isLg
                    ? {
                        duration: 18,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                      }
                    : { duration: HERO_SLIDE_MS / 1000, ease: "linear" }
              }
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Left text scrim — light under copy, open on face / figure */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[color-mix(in_srgb,var(--green)_58%,black)] via-[color-mix(in_srgb,var(--green)_22%,transparent)] to-transparent md:from-[color-mix(in_srgb,var(--green)_48%,black)] md:via-[color-mix(in_srgb,var(--green)_14%,transparent)] lg:from-[color-mix(in_srgb,var(--green)_42%,black)] lg:via-[color-mix(in_srgb,var(--green)_10%,transparent)] lg:to-transparent"
        style={{
          maskImage:
            "linear-gradient(90deg, black 0%, black 28%, transparent 52%)",
          WebkitMaskImage:
            "linear-gradient(90deg, black 0%, black 28%, transparent 52%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[color-mix(in_srgb,var(--green)_58%,black)] via-[color-mix(in_srgb,var(--green)_12%,transparent)] to-transparent"
        style={{
          maskImage:
            "linear-gradient(to top, black 0%, black 22%, transparent 55%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 22%, transparent 55%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[22%] bg-gradient-to-b from-[color-mix(in_srgb,var(--green)_22%,transparent)] to-transparent"
        aria-hidden
      />
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2] mix-blend-soft-light opacity-70"
          style={{ backgroundImage: spotlight }}
          aria-hidden
        />
      )}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[2] bg-[var(--green)]"
        style={{ opacity: veilOpacity }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-20 pt-28 md:px-8 md:pb-24 md:pt-28 lg:justify-end lg:pb-[min(18vh,7.5rem)] lg:pt-32"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="hero-copy max-w-[18rem] sm:max-w-md lg:max-w-[26rem] xl:max-w-[30rem]">
          <motion.h1
            className="font-[family-name:var(--font-display)] text-5xl leading-[1.05] font-semibold tracking-[0.05em] text-[var(--ivory)] [text-shadow:0_2px_32px_color-mix(in_srgb,var(--green)_65%,transparent)] sm:text-6xl md:text-6xl lg:text-7xl xl:text-[4.75rem]"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <span className={reduce ? undefined : "hero-shimmer"}>
              ECKOBIG ANTHONY
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-sm text-lg font-light tracking-wide text-[color-mix(in_srgb,var(--ivory)_92%,var(--gold-light))] [text-shadow:0_1px_18px_color-mix(in_srgb,var(--green)_55%,transparent)] md:mt-6 md:text-xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            Building value across borders.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap gap-4 md:mt-10"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <MagneticAnchor href="#about" className="btn-primary btn-lux">
              Explore the journey
            </MagneticAnchor>
            <MagneticAnchor
              href="#cefon"
              className="btn-ghost btn-lux-ghost"
              strength={0.22}
            >
              Discover CEFON
            </MagneticAnchor>
          </motion.div>
        </div>
      </motion.div>

      {!reduce && !isLg && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[2px] bg-[color-mix(in_srgb,var(--ivory)_12%,transparent)]"
          aria-hidden
        >
          <motion.div
            key={slide}
            className="h-full origin-left bg-gradient-to-r from-[var(--gold-deep)] via-[var(--gold-light)] to-[var(--gold)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: HERO_SLIDE_MS / 1000, ease: "linear" }}
          />
        </div>
      )}

      {!isLg && (
        <p className="sr-only" aria-live="polite">
          Portrait {slide + 1} of {heroSlides.length}
        </p>
      )}
    </section>
  )
}
