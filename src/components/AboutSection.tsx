import { about } from "../content/about"
import { media } from "../content/assets"
import { ReadMore } from "./ReadMore"
import { Reveal, ScrollAccent } from "./Reveal"

export function AboutSection() {
  return (
    <section id="about" className="bg-luxury texture-grain relative scroll-mt-24 py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-[var(--gold-deep)] uppercase">
            Profile
          </p>
          <h2 className="heading-shimmer mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[0.04em] text-[var(--green)] md:text-5xl">
            {about.title}
          </h2>
          <ScrollAccent />
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-8 max-w-4xl text-base leading-relaxed text-[var(--green-mid)] md:text-lg">
            {about.roles.join("  ·  ")}
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal className="relative">
            <figure className="media-lift group overflow-hidden">
              <img
                src={media.aboutPortrait}
                alt="ECKOBIG ANTHONY in a navy pinstripe suit"
                className="w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
              />
            </figure>
            <figure className="media-lift group mt-4 overflow-hidden md:mt-6">
              <img
                src={media.lifestyle}
                alt="ECKOBIG ANTHONY with a luxury vehicle"
                className="aspect-[16/10] w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
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
                <p className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-snug text-[var(--green)] md:text-3xl">
                  “{about.pullQuote}”
                </p>
                <p className="mt-4 text-[var(--ink)]/75">{about.pullLead}</p>
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
          <figure className="quote-lift mt-16 border-y border-[color-mix(in_srgb,var(--gold)_35%,transparent)] py-12 text-center">
            <blockquote className="mx-auto max-w-3xl font-[family-name:var(--font-display)] text-2xl leading-relaxed text-[var(--green)] md:text-3xl">
              “{about.closingQuote}”
            </blockquote>
            <figcaption className="mt-6 text-sm tracking-[0.25em] text-[var(--gold-deep)] uppercase">
              — {about.closingAttribution}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
          <div className="mt-16">
            <p className="text-xs tracking-[0.28em] text-[var(--gold-deep)] uppercase">
              Credentials
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <a
                href={media.credentials.cac}
                target="_blank"
                rel="noreferrer"
                className="media-lift group block overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-4"
              >
                <img
                  src={media.credentials.cac}
                  alt="CAC Certificate of Registration — ECKOBIG TRINITY GLOBAL"
                  className="h-48 w-full object-cover object-top transition duration-500 group-hover:scale-[1.04] sm:h-56"
                />
                <p className="mt-2 text-sm text-[var(--green-mid)] transition-colors group-hover:text-[var(--gold-deep)]">
                  CAC Registration
                </p>
              </a>
              <a
                href={media.credentials.employment}
                target="_blank"
                rel="noreferrer"
                className="media-lift group block overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-4"
              >
                <img
                  src={media.credentials.employment}
                  alt="Employment certificate from Private Limousine LLC, Dubai"
                  className="h-48 w-full object-cover object-top transition duration-500 group-hover:scale-[1.04] sm:h-56"
                />
                <p className="mt-2 text-sm text-[var(--green-mid)] transition-colors group-hover:text-[var(--gold-deep)]">
                  Dubai Employment
                </p>
              </a>
              <a
                href={media.credentials.sira}
                target="_blank"
                rel="noreferrer"
                className="media-lift group block overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-4"
              >
                <img
                  src={media.credentials.sira}
                  alt="SIRA Security Guard Training Certificate, Dubai"
                  className="h-48 w-full object-cover object-top transition duration-500 group-hover:scale-[1.04] sm:h-56"
                />
                <p className="mt-2 text-sm text-[var(--green-mid)] transition-colors group-hover:text-[var(--gold-deep)]">
                  SIRA Training
                </p>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
