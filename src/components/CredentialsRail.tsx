import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useId, useState, type KeyboardEvent } from "react"
import { credentials, credentialsIntro } from "../content/credentials"
import { Reveal, ScrollAccent } from "./Reveal"

const EASE = [0.22, 1, 0.36, 1] as const

export function CredentialsRail() {
  const reduce = useReducedMotion()
  const labelId = useId()
  const panelId = useId()
  const [openId, setOpenId] = useState<string | null>(null)

  const active = credentials.find((c) => c.id === openId) ?? null

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  const onKeyNav = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = credentials.findIndex((c) => c.id === openId)
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      const next = credentials[(index < 0 ? 0 : index + 1) % credentials.length]
      if (next) setOpenId(next.id)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      const prevIndex = index <= 0 ? credentials.length - 1 : index - 1
      const prev = credentials[prevIndex]
      if (prev) setOpenId(prev.id)
    } else if (e.key === "Home") {
      e.preventDefault()
      setOpenId(credentials[0]?.id ?? null)
    } else if (e.key === "End") {
      e.preventDefault()
      setOpenId(credentials[credentials.length - 1]?.id ?? null)
    } else if (e.key === "Escape" && openId) {
      e.preventDefault()
      setOpenId(null)
    }
  }

  return (
    <section
      id="credentials"
      className="bg-luxury texture-grain relative scroll-mt-24 overflow-hidden py-16 md:py-20"
      aria-labelledby={labelId}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--gold)_55%,transparent)] to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-[var(--gold-deep)] uppercase">
            {credentialsIntro.eyebrow}
          </p>
          <h2
            id={labelId}
            className="heading-shimmer mt-3 font-[family-name:var(--font-display)] text-2xl tracking-[0.04em] text-[var(--green)] md:text-3xl"
          >
            {credentialsIntro.title}
          </h2>
          <ScrollAccent />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--green-mid)] md:text-base">
            {credentialsIntro.lead}
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-8 md:mt-10">
          <div
            className="outline-none"
            role="list"
            aria-label="Credentials and initiatives"
            onKeyDown={onKeyNav}
          >
            <div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:flex-wrap md:gap-2.5 md:overflow-visible [&::-webkit-scrollbar]:hidden">
              {credentials.map((item) => {
                const expanded = openId === item.id
                const controlId = `credential-btn-${item.id}`
                return (
                  <button
                    key={item.id}
                    id={controlId}
                    type="button"
                    role="listitem"
                    aria-expanded={expanded}
                    aria-controls={expanded ? panelId : undefined}
                    className={`shrink-0 border px-3.5 py-2 text-left text-xs tracking-[0.14em] uppercase transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ivory)] md:text-[0.7rem] ${
                      expanded
                        ? "border-[var(--gold)] bg-[var(--green)] text-[var(--gold-light)]"
                        : "border-[color-mix(in_srgb,var(--gold)_40%,transparent)] bg-transparent text-[var(--green-mid)] hover:border-[var(--gold)] hover:text-[var(--green)]"
                    }`}
                    onClick={() => toggle(item.id)}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {active && (
                <motion.div
                  key={active.id}
                  id={panelId}
                  role="region"
                  aria-labelledby={`credential-btn-${active.id}`}
                  className="mt-5 border-l-2 border-[var(--gold)] bg-[color-mix(in_srgb,var(--green-soft)_55%,var(--ivory))] py-4 pl-5 pr-4 md:mt-6 md:py-5 md:pl-6 md:pr-6"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: reduce ? 0.15 : 0.4, ease: EASE }}
                >
                  <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.18em] text-[var(--green)] uppercase">
                    {active.label}
                  </p>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[color-mix(in_srgb,var(--ink)_78%,transparent)] md:text-[0.95rem]">
                    {active.detail}
                  </p>
                  {active.documents && active.documents.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      {active.documents.map((doc) => (
                        <a
                          key={doc.href}
                          href={doc.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs tracking-[0.16em] text-[var(--gold-deep)] uppercase transition-colors hover:text-[var(--green)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                        >
                          {doc.label}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!active && (
              <p className="mt-4 text-xs tracking-[0.16em] text-[color-mix(in_srgb,var(--ink)_42%,transparent)] uppercase">
                Select an item for detail
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
