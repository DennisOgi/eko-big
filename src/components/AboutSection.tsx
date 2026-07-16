import { about } from "../content/about"
import { media } from "../content/assets"
import { ReadMore } from "./ReadMore"
import { Reveal, ScrollAccent } from "./Reveal"

export function AboutSection() {
  return (
    <section id="about" className="bg-luxury texture-grain relative scroll-mt-24 overflow-hidden py-16 md:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-[var(--gold-deep)] uppercase">
            Profile
          </p>
          <h2 className="heading-shimmer mt-3 font-[family-name:var(--font-display)] text-[1.75rem] tracking-[0.04em] text-[var(--green)] sm:text-3xl md:text-5xl">
            {about.title}
          </h2>
          <ScrollAccent />
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-6 max-w-3xl text-[0.7rem] font-medium tracking-[0.12em] text-[var(--gold-deep)] uppercase sm:text-sm sm:tracking-[0.14em] md:text-[0.8rem]">
            CEO · ECKOBIG TRINITY GLOBAL
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[var(--green-mid)] sm:text-base md:text-lg">
            {about.roles.join("  ·  ")}
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-8 sm:mt-12 sm:gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal className="relative">
            <figure className="media-lift group overflow-hidden">
              <img
                src={media.aboutPortrait}
                alt="ECKOBIG ANTHONY in a navy pinstripe suit"
                className="w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                loading="eager"
                decoding="async"
              />
            </figure>
            <figure className="media-lift group mt-4 overflow-hidden md:mt-6">
              <img
                src={media.lifestyle}
                alt="ECKOBIG ANTHONY with a luxury vehicle"
                className="aspect-[16/10] w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </Reveal>

          <div>
            <div className="prose-editorial">
              {about.lead.map((p, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <blockquote className="quote-lift mt-10 border-l-2 border-[var(--gold)] pl-6 md:pl-8">
                <p className="text-sm tracking-[0.2em] text-[var(--gold-deep)] uppercase">
                  Philosophy
                </p>
                <p className="mt-4 text-base leading-relaxed text-[var(--ink)]/80 md:text-lg">
                  {about.pullLead}
                </p>
                <p className="mt-3 font-[family-name:var(--font-display)] text-xl leading-snug text-[var(--green)] sm:text-2xl md:text-3xl">
                  “{about.pullQuote}”
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <ReadMore className="mt-14" moreLabel="Read full profile" lessLabel="Show less">
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="media-lift group overflow-hidden">
                <img
                  src={media.dubaiStory}
                  alt="ECKOBIG ANTHONY with Burj Khalifa — Dubai career chapter"
                  className="w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="prose-editorial">
                {about.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p className="!mt-8 !text-lg !text-[var(--green)]">{about.impact}</p>
              </div>
            </div>
          </ReadMore>
        </Reveal>

        <Reveal>
          <figure className="quote-lift mt-12 border-y border-[color-mix(in_srgb,var(--gold)_35%,transparent)] py-10 text-center sm:mt-16 sm:py-12">
            <blockquote className="mx-auto max-w-3xl font-[family-name:var(--font-display)] text-xl leading-relaxed text-[var(--green)] sm:text-2xl md:text-3xl">
              “{about.closingQuote}”
            </blockquote>
            <figcaption className="mt-6 text-sm tracking-[0.25em] text-[var(--gold-deep)] uppercase">
              — {about.closingAttribution}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
