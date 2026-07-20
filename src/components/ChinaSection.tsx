import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useId, useRef } from "react"
import { chinaImages, chinaIntro, chinaQuote } from "../content/china"
import { Reveal, ScrollAccent } from "./Reveal"

const [primaryImage, secondaryImage] = chinaImages

export function ChinaSection() {
  const reduce = useReducedMotion()
  const labelId = useId()
  const splitRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: splitRef,
    offset: ["start end", "end start"],
  })
  const primaryY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, -24])
  const secondaryY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-16, 16])

  return (
    <section
      id="china"
      className="bg-luxury texture-grain relative scroll-mt-24 overflow-hidden py-16 md:py-32"
      aria-labelledby={labelId}
    >
      <div
        className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-[color-mix(in_srgb,var(--gold)_12%,transparent)] blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-[var(--gold-deep)] uppercase">
            {chinaIntro.eyebrow}
          </p>
          <h2
            id={labelId}
            className="heading-shimmer mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[0.04em] text-[var(--green)] md:text-5xl"
          >
            {chinaIntro.title}
          </h2>
          <ScrollAccent />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--green-mid)] md:text-lg">
            {chinaIntro.lead}
          </p>
          <p className="mt-4 text-[0.7rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--ink)_48%,transparent)] uppercase md:text-xs">
            {chinaIntro.route}
          </p>
        </Reveal>

        <div
          ref={splitRef}
          className="mt-12 grid items-start gap-10 md:mt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-16"
        >
          {/* Cinematic imagery column */}
          <div className="order-2 lg:order-1">
            <Reveal delay={0.06}>
              <figure className="media-lift group relative overflow-hidden border border-[color-mix(in_srgb,var(--gold)_35%,transparent)]">
                <motion.div style={{ y: primaryY }} className="will-change-transform">
                  <img
                    src={primaryImage.src}
                    alt={primaryImage.alt}
                    className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.02] sm:aspect-[5/6] lg:aspect-[4/5]"
                    style={{ objectPosition: primaryImage.position ?? "center center" }}
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[color-mix(in_srgb,var(--green)_55%,transparent)] to-transparent"
                  aria-hidden
                />
                {primaryImage.caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 px-4 py-3 text-[0.65rem] tracking-[0.22em] text-[var(--ivory)] uppercase sm:px-5 sm:py-4 sm:text-xs">
                    {primaryImage.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>

            <Reveal delay={0.1} className="mt-5 md:mt-6">
              <figure className="media-lift group relative overflow-hidden border border-[color-mix(in_srgb,var(--gold)_28%,transparent)] bg-[var(--green)]">
                <motion.div style={{ y: secondaryY }} className="will-change-transform">
                  <img
                    src={secondaryImage.src}
                    alt={secondaryImage.alt}
                    className="block h-auto w-full object-contain transition duration-700 group-hover:scale-[1.01]"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
                {secondaryImage.caption && (
                  <figcaption className="border-t border-[color-mix(in_srgb,var(--gold)_30%,transparent)] px-4 py-3 text-[0.65rem] tracking-[0.2em] text-[color-mix(in_srgb,var(--ivory)_72%,transparent)] uppercase sm:px-5 sm:text-xs">
                    {secondaryImage.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          </div>

          {/* Hero pull quote column */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.04}>
              <div className="relative border border-[color-mix(in_srgb,var(--gold)_38%,transparent)] bg-[var(--green)] px-6 py-10 text-[var(--ivory)] sm:px-8 sm:py-12 md:px-10 md:py-14">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold-light)] to-transparent opacity-80"
                  aria-hidden
                />
                <p className="text-[0.65rem] font-medium tracking-[0.32em] text-[var(--gold-light)] uppercase sm:text-xs">
                  On the ground · Beijing
                </p>
                <blockquote className="quote-lift mt-6 md:mt-8">
                  <p
                    className="font-[family-name:var(--font-display)] text-[1.35rem] leading-[1.35] tracking-[0.02em] text-[var(--ivory)] sm:text-2xl md:text-[1.65rem] md:leading-[1.38] lg:text-3xl xl:text-[2rem] xl:leading-[1.32]"
                    lang="en"
                  >
                    “{chinaQuote.text}”
                  </p>
                  <footer className="mt-8 text-sm tracking-[0.24em] text-[var(--gold-light)] uppercase">
                    — {chinaQuote.attribution}
                  </footer>
                </blockquote>
                <div
                  className="pointer-events-none absolute -right-px bottom-8 top-8 w-px bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent opacity-50"
                  aria-hidden
                />
              </div>
            </Reveal>

            <Reveal delay={0.12} className="mt-8 lg:mt-10">
              <p className="max-w-md border-l-2 border-[var(--gold)] pl-5 text-sm leading-relaxed text-[var(--green-mid)] md:pl-6 md:text-base">
                {chinaIntro.closing}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
