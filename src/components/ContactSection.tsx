import { contact, media } from "../content/assets"
import { MagneticAnchor } from "./Magnetic"
import { Reveal, ScrollAccent } from "./Reveal"

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-[var(--ivory)] py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs font-medium tracking-[0.3em] text-[var(--gold-deep)] uppercase">
                Connect
              </p>
              <h2 className="heading-shimmer mt-3 font-[family-name:var(--font-display)] text-3xl tracking-[0.04em] text-[var(--green)] md:text-5xl">
                Contact
              </h2>
              <ScrollAccent />
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ink)]/75">
                For partnerships, speaking engagements, trade enquiries, or CEFON
                collaboration — reach out directly. More channels can be added here later.
              </p>

              <dl className="mt-10 space-y-5">
                <div className="contact-row">
                  <dt className="text-xs tracking-[0.22em] text-[var(--gold-deep)] uppercase">
                    Phone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={contact.phoneHref}
                      className="text-xl text-[var(--green)] transition-colors duration-300 hover:text-[var(--gold-deep)]"
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
                      className="text-xl text-[var(--green)] transition-colors duration-300 hover:text-[var(--gold-deep)]"
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
                      className="text-xl text-[var(--green)] transition-colors duration-300 hover:text-[var(--gold-deep)]"
                    >
                      {contact.facebook}
                    </a>
                  </dd>
                </div>
              </dl>

              <MagneticAnchor
                href={contact.emailHref}
                className="btn-outline-dark btn-lux mt-10"
                strength={0.2}
              >
                Send a message
              </MagneticAnchor>
            </div>

            <figure className="media-lift overflow-hidden shadow-[0_20px_50px_color-mix(in_srgb,var(--green)_12%,transparent)]">
              <img
                src={media.brandLogo}
                alt="ECKOBIG high-end luxury brand mark"
                className="w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
