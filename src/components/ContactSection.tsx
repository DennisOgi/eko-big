import { contact, media } from "../content/assets"
import { MagneticAnchor } from "./Magnetic"
import { Reveal, ScrollAccent } from "./Reveal"

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 overflow-hidden bg-[var(--ivory)] py-16 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs font-medium tracking-[0.3em] text-[var(--gold-deep)] uppercase">
                Connect
              </p>
              <h2 className="heading-shimmer mt-3 font-[family-name:var(--font-display)] text-[1.75rem] tracking-[0.04em] text-[var(--green)] sm:text-3xl md:text-5xl">
                Contact
              </h2>
              <ScrollAccent />
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--ink)]/80 sm:text-lg">
                For executive introductions, trade partnerships, speaking
                engagements, or CEFON collaboration — please reach out directly.
                All enquiries are handled with discretion.
              </p>

              <dl className="mt-10 space-y-5">
                <div className="contact-row">
                  <dt className="text-xs tracking-[0.22em] text-[var(--gold-deep)] uppercase">
                    Phone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={contact.phoneHref}
                      className="inline-flex min-h-11 items-center text-lg text-[var(--green)] transition-colors duration-300 hover:text-[var(--gold-deep)] sm:text-xl"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
                <div className="contact-row">
                  <dt className="text-xs tracking-[0.22em] text-[var(--gold-deep)] uppercase">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={contact.emailHref}
                      className="inline-flex min-h-11 max-w-full items-center break-all text-base text-[var(--green)] transition-colors duration-300 hover:text-[var(--gold-deep)] sm:text-lg md:text-xl"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
                <div className="contact-row">
                  <dt className="text-xs tracking-[0.22em] text-[var(--gold-deep)] uppercase">
                    Facebook
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={contact.facebookHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center text-lg text-[var(--green)] transition-colors duration-300 hover:text-[var(--gold-deep)] sm:text-xl"
                    >
                      {contact.facebook}
                    </a>
                  </dd>
                </div>
              </dl>

              <MagneticAnchor
                href={contact.emailHref}
                className="btn-outline-dark btn-lux mt-10 w-full justify-center sm:w-auto"
                strength={0.2}
              >
                Send a message
              </MagneticAnchor>
            </div>

            <figure className="media-lift overflow-hidden shadow-[0_20px_50px_color-mix(in_srgb,var(--green)_12%,transparent)]">
              <img
                src={media.brandLogo}
                alt="ECKOBIG high-end luxury brand mark"
                className="w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
