import { change } from "../content/change"
import { MagneticAnchor } from "./Magnetic"
import { ReadMore } from "./ReadMore"
import { Reveal, ScrollAccent } from "./Reveal"
import { YouTubeEmbed } from "./YouTubeEmbed"

function PullQuote({
  quote,
  attribution,
  tone = "light",
}: {
  quote: string
  attribution: string
  tone?: "light" | "dark"
}) {
  const quoteColor = tone === "dark" ? "text-[var(--gold-light)]" : "text-[var(--green)]"
  const attrColor =
    tone === "dark"
      ? "text-[color-mix(in_srgb,var(--ivory)_70%,transparent)]"
      : "text-[var(--gold-deep)]"

  return (
    <blockquote className="quote-lift mt-8 border-l-2 border-[var(--gold)] pl-6 md:pl-8">
      <p
        className={`font-[family-name:var(--font-display)] text-xl leading-snug tracking-[0.02em] md:text-2xl ${quoteColor}`}
      >
        “{quote}”
      </p>
      <footer className={`mt-4 text-sm tracking-[0.2em] uppercase ${attrColor}`}>
        — {attribution}
      </footer>
    </blockquote>
  )
}

export function ChangeSection() {
  return (
    <section
      id="change"
      className="scroll-mt-24 bg-[var(--green)] texture-grain relative py-24 text-[var(--ivory)] md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-[var(--gold-light)] uppercase">
            {change.eyebrow}
          </p>
          <h2 className="heading-shimmer-light mt-4 max-w-4xl font-[family-name:var(--font-display)] text-3xl leading-tight tracking-[0.04em] md:text-5xl lg:text-6xl">
            {change.title}
          </h2>
          <p className="mt-4 text-xl text-[var(--gold-light)] md:text-2xl">{change.tagline}</p>
          <p className="mt-2 text-[rgba(255,255,255,0.8)]">{change.byline}</p>
          <ScrollAccent className="mt-6" />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <Reveal>
            <YouTubeEmbed videoId={change.youtubeId} title={change.title} />
          </Reveal>
          <div>
            <div className="prose-editorial prose-on-dark mt-0">
              {change.lead.map((p, i) => (
                <Reveal key={i} delay={0.04 * i}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.12}>
              <PullQuote
                quote={change.quote}
                attribution={change.quoteAttribution}
                tone="dark"
              />
            </Reveal>
          </div>
        </div>

        <Reveal>
          <ReadMore
            className="mt-16"
            tone="dark"
            moreLabel="Read the full story"
            lessLabel="Show less"
          >
            <div className="prose-editorial prose-on-dark max-w-3xl">
              {change.leadExtended.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-16 border-t border-[color-mix(in_srgb,var(--gold)_28%,transparent)] pt-14">
              <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-[0.03em] text-[var(--gold-light)] md:text-3xl">
                {change.about.title}
              </h3>
              <div className="prose-editorial prose-on-dark mt-6 max-w-3xl">
                {change.about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div className="mt-20">
              <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-[0.03em] text-[var(--gold-light)] md:text-3xl">
                {change.why.title}
              </h3>
              <div className="prose-editorial prose-on-dark mt-6 max-w-3xl">
                {change.why.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="mt-2 text-sm tracking-[0.18em] text-[var(--gold-light)] uppercase">
                As ECKOBIG ANTHONY explains:
              </p>
              <PullQuote
                quote={change.why.quote}
                attribution={change.why.quoteAttribution}
                tone="dark"
              />
              <div className="prose-editorial prose-on-dark mt-8 max-w-3xl">
                {change.why.after.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div className="mt-20">
              <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-[0.03em] text-[var(--gold-light)] md:text-3xl">
                {change.spiritual.title}
              </h3>
              <p className="mt-4 max-w-2xl text-lg text-[rgba(255,255,255,0.88)]">
                {change.spiritual.lead}
              </p>
              <PullQuote
                quote={change.spiritual.quote}
                attribution={change.spiritual.quoteAttribution}
                tone="dark"
              />
              <div className="prose-editorial prose-on-dark mt-8 max-w-3xl">
                {change.spiritual.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div className="mt-20">
              <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-[0.03em] text-[var(--gold-light)] md:text-3xl">
                {change.inspired.title}
              </h3>
              <p className="mt-4 max-w-3xl text-[rgba(255,255,255,0.88)]">
                {change.inspired.lead}
              </p>
              <ul className="mt-8 space-y-3">
                {change.inspired.challenges.map((item) => (
                  <li
                    key={item}
                    className="border-l border-[var(--gold)] pl-4 text-lg text-[var(--ivory)] transition-colors duration-300 hover:border-[var(--gold-light)] hover:text-[var(--gold-light)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-3xl leading-relaxed text-[rgba(255,255,255,0.9)]">
                {change.inspired.close}
              </p>
            </div>

            <div className="mt-20 border-t border-[color-mix(in_srgb,var(--gold)_28%,transparent)] pt-14">
              <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-[0.03em] text-[var(--gold-light)] md:text-3xl">
                {change.movement.title}
              </h3>
              <div className="prose-editorial prose-on-dark mt-6 max-w-3xl">
                {change.movement.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div className="mt-20">
              <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-[0.03em] text-[var(--gold-light)] md:text-3xl">
                {change.startWhere.title}
              </h3>
              <p className="mt-4 text-lg text-[var(--gold-light)]">{change.startWhere.lead}</p>
              <p className="mt-2 text-[rgba(255,255,255,0.8)]">{change.startWhere.prompt}</p>
              <ul className="mt-8 space-y-4">
                {change.startWhere.questions.map((q) => (
                  <li
                    key={q}
                    className="font-[family-name:var(--font-display)] text-lg tracking-[0.02em] text-[var(--ivory)] md:text-xl"
                  >
                    {q}
                  </li>
                ))}
              </ul>
              <div className="prose-editorial prose-on-dark mt-8 max-w-3xl">
                {change.startWhere.close.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div className="mt-20">
              <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-[0.03em] text-[var(--gold-light)] md:text-3xl">
                {change.join.title}
              </h3>
              <div className="prose-editorial prose-on-dark mt-6 max-w-3xl">
                {change.join.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <MagneticAnchor
                href={change.youtubeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-lux mt-8"
              >
                Watch on YouTube
              </MagneticAnchor>
            </div>

            <div className="mt-20 border-t border-[color-mix(in_srgb,var(--gold)_28%,transparent)] pt-14">
              <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-[0.03em] text-[var(--gold-light)] md:text-3xl">
                {change.conversation.title}
              </h3>
              <p className="mt-4 text-lg text-[rgba(255,255,255,0.88)]">
                {change.conversation.lead}
              </p>
              <ul className="mt-8 space-y-4">
                {change.conversation.questions.map((q) => (
                  <li
                    key={q}
                    className="border-b border-[color-mix(in_srgb,var(--gold)_22%,transparent)] py-3 text-[rgba(255,255,255,0.9)]"
                  >
                    {q}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-2xl text-[rgba(255,255,255,0.88)]">
                {change.conversation.invite}
              </p>
              <ul className="mt-10 space-y-3 font-[family-name:var(--font-display)] text-xl text-[var(--gold-light)] md:text-2xl">
                {change.conversation.cadence.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            <div className="mt-20 bg-[color-mix(in_srgb,black_22%,var(--green))] px-6 py-14 text-center md:px-12">
              <h3 className="font-[family-name:var(--font-display)] text-3xl tracking-[0.06em] text-[var(--gold-light)] md:text-4xl">
                {change.closing.title}
              </h3>
              <p className="mx-auto mt-8 max-w-2xl font-[family-name:var(--font-display)] text-xl leading-snug text-[var(--ivory)] md:text-2xl">
                “{change.closing.quote}”
              </p>
              <p className="mt-6 text-sm tracking-[0.25em] text-[var(--gold-light)] uppercase">
                — {change.closing.quoteAttribution}
              </p>
            </div>
          </ReadMore>
        </Reveal>
      </div>
    </section>
  )
}
