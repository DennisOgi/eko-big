import { media } from "../content/assets"
import { cefon } from "../content/cefon"
import { ReadMore } from "./ReadMore"
import { Reveal, ScrollAccent } from "./Reveal"
import { VideoPlayer } from "./VideoPlayer"

export function CefonSection() {
  return (
    <section id="cefon" className="bg-luxury texture-grain relative scroll-mt-24 overflow-hidden py-16 md:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 sm:gap-8 md:flex-row md:items-center md:gap-12">
            <img
              src={media.cefonLogo}
              alt="Clean Earth Foundation Nigeria logo — Beautify Our World"
              className="h-28 w-28 object-cover shadow-[0_16px_40px_color-mix(in_srgb,var(--gold)_25%,transparent)] transition duration-500 hover:shadow-[0_20px_48px_color-mix(in_srgb,var(--gold)_40%,transparent)] hover:scale-[1.02] sm:h-36 sm:w-36 md:h-44 md:w-44"
            />
            <div>
              <p className="text-xs font-medium tracking-[0.3em] text-[var(--gold-deep)] uppercase">
                Social impact
              </p>
              <h2 className="heading-shimmer mt-3 font-[family-name:var(--font-display)] text-[1.75rem] tracking-[0.04em] text-[var(--green)] sm:text-3xl md:text-5xl">
                {cefon.name}
              </h2>
              <p className="mt-3 text-lg text-[var(--gold-deep)] sm:text-xl md:text-2xl">{cefon.tagline}</p>
              <p className="mt-2 text-base text-[var(--green-mid)] sm:text-lg">{cefon.subtitle}</p>
            </div>
          </div>
          <ScrollAccent className="mt-8" />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <VideoPlayer
              src={media.cefonVideo}
              poster={media.cefonPoster}
              title={cefon.name}
            />
          </Reveal>
          <div>
            <div className="prose-editorial">
              {cefon.lead.map((p, i) => (
                <Reveal key={i} delay={0.04 * i}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <blockquote className="quote-lift mt-8 border-l-2 border-[var(--gold)] pl-6 md:pl-8">
                <p className="font-[family-name:var(--font-display)] text-2xl leading-snug text-[var(--green)] md:text-3xl">
                  “{cefon.quote}”
                </p>
                <footer className="mt-4 text-sm tracking-[0.2em] text-[var(--gold-deep)] uppercase">
                  — {cefon.quoteAttribution}
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <Reveal>
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--green)]">
              {cefon.vision.title}
            </h3>
            <p className="mt-4 leading-relaxed text-[var(--ink)]/80">{cefon.vision.body}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--green)]">
              {cefon.mission.title}
            </h3>
            <p className="mt-4 leading-relaxed text-[var(--ink)]/80">{cefon.mission.body}</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-16">
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--green)]">
              {cefon.beliefs.title}
            </h3>
            <p className="mt-3 text-[var(--green-mid)]">{cefon.beliefs.intro}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {cefon.beliefs.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-[color-mix(in_srgb,var(--gold)_30%,transparent)] py-3 text-[var(--ink)]/85 transition-colors duration-300 hover:border-[var(--gold)] hover:text-[var(--green)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <ReadMore
            className="mt-16"
            moreLabel="Explore programmes & invitation"
            lessLabel="Show less"
          >
            <div className="prose-editorial max-w-3xl">
              {cefon.introExtended.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--green)]">
                {cefon.standFor.title}
              </h3>
              <p className="mt-3 text-[var(--green-mid)]">{cefon.standFor.intro}</p>
              <ul className="mt-8 columns-1 gap-8 sm:columns-2">
                {cefon.standFor.items.map((item) => (
                  <li
                    key={item}
                    className="mb-3 break-inside-avoid pl-4 text-[var(--ink)]/85"
                    style={{ borderLeft: "2px solid var(--gold)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-16 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <img
                src={media.changeThinking}
                alt="Change Your Thinking — social impact message"
                className="w-full object-cover"
              />
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--green)]">
                  {cefon.movement.title}
                </h3>
                <p className="mt-4 text-lg text-[var(--gold-deep)]">{cefon.movement.lead}</p>
                <p className="mt-4 leading-relaxed text-[var(--ink)]/80">{cefon.movement.body}</p>
                <p className="mt-6 font-[family-name:var(--font-display)] text-3xl text-[var(--green)]">
                  “{cefon.movement.mantra}”
                </p>
                <p className="mt-6 leading-relaxed text-[var(--ink)]/80">{cefon.movement.close}</p>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--green)]">
                {cefon.impact.title}
              </h3>
              <div className="prose-editorial mt-4 max-w-3xl">
                {cefon.impact.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--green)]">
                {cefon.future.title}
              </h3>
              <p className="mt-4 text-[var(--gold-deep)]">{cefon.future.lead}</p>
              <p className="mt-3 max-w-3xl leading-relaxed text-[var(--ink)]/80">
                {cefon.future.body}
              </p>
              <ol className="mt-8 grid list-decimal gap-3 pl-5 sm:grid-cols-2 sm:gap-x-10">
                {cefon.future.programmes.map((item) => (
                  <li key={item} className="pl-1 leading-relaxed text-[var(--ink)]/85">
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-16 border-t border-[color-mix(in_srgb,var(--gold)_35%,transparent)] pt-14">
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--green)]">
                {cefon.invitation.title}
              </h3>
              <div className="prose-editorial mt-4 max-w-3xl">
                {cefon.invitation.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ul className="mt-8 space-y-2 font-[family-name:var(--font-display)] text-xl text-[var(--green)] md:text-2xl">
                {cefon.invitation.cadence.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-6 max-w-2xl text-lg text-[var(--green-mid)]">
                {cefon.invitation.cadenceClose}
              </p>
            </div>

            <div className="mt-16 bg-[var(--green)] px-6 py-14 text-center text-[var(--ivory)] md:px-12">
              <h3 className="font-[family-name:var(--font-display)] text-3xl tracking-[0.04em] text-[var(--gold-light)] md:text-4xl">
                {cefon.closing.title}
              </h3>
              <div className="mx-auto mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-[rgba(255,255,255,0.9)] md:text-lg">
                {cefon.closing.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="mt-10 text-sm tracking-[0.25em] text-[var(--gold-light)] uppercase">
                {cefon.closing.signOff}
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-2xl text-[var(--ivory)]">
                {cefon.closing.mantra}
              </p>
            </div>
          </ReadMore>
        </Reveal>
      </div>
    </section>
  )
}
