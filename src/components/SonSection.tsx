import { media } from "../content/assets"
import { son } from "../content/son"
import { ReadMore } from "./ReadMore"
import { Reveal, ScrollAccent } from "./Reveal"
import { VideoPlayer } from "./VideoPlayer"

export function SonSection() {
  return (
    <section id="son" className="scroll-mt-24 overflow-hidden bg-[var(--green)] texture-grain relative py-16 text-[var(--ivory)] md:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-[var(--gold-light)] uppercase">
            Creative initiative
          </p>
          <h2 className="heading-shimmer-light mt-4 max-w-4xl font-[family-name:var(--font-display)] text-[1.75rem] leading-tight tracking-[0.03em] sm:text-3xl md:text-5xl">
            {son.title}
          </h2>
          <p className="mt-4 text-[var(--gold-light)]">{son.producedBy}</p>
          <ScrollAccent className="mt-6" />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <Reveal>
            <VideoPlayer
              src={media.sonVideo}
              poster={media.sonPoster}
              title={son.title}
            />
          </Reveal>

          <div>
            <Reveal>
              <blockquote className="quote-lift border-l-2 border-[var(--gold)] pl-6 md:pl-8">
                <p className="font-[family-name:var(--font-display)] text-xl leading-snug text-[var(--gold-light)] md:text-2xl">
                  “{son.quote}”
                </p>
              </blockquote>
            </Reveal>
            <div className="prose-editorial prose-on-dark mt-8">
              {son.lead.map((p, i) => (
                <Reveal key={i} delay={0.04 * i}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal>
          <div className="mt-16 border-t border-[color-mix(in_srgb,var(--gold)_30%,transparent)] pt-12">
            <p className="text-[rgba(255,255,255,0.88)]">{son.valuesIntro}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {son.values.map((value) => (
                <li
                  key={value}
                  className="border-l border-[var(--gold)] pl-4 text-lg text-[var(--ivory)] transition-colors duration-300 hover:border-[var(--gold-light)] hover:text-[var(--gold-light)]"
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <ReadMore
            className="mt-12"
            tone="dark"
            moreLabel="Read more"
            lessLabel="Show less"
          >
            <div className="prose-editorial prose-on-dark max-w-3xl">
              {son.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {son.closing.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="!mt-8 !font-[family-name:var(--font-display)] !text-xl !text-[var(--gold-light)]">
                {son.thanks}
              </p>
            </div>
          </ReadMore>
        </Reveal>
      </div>
    </section>
  )
}
