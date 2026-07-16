import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

const links = [
  { href: "#about", label: "About", id: "about" },
  { href: "#credentials", label: "Credentials", id: "credentials" },
  { href: "#press", label: "Press", id: "press" },
  { href: "#dubai", label: "Dubai", id: "dubai" },
  { href: "#series", label: "Portraits", id: "series" },
  { href: "#change", label: "CHANGE", id: "change" },
  { href: "#son", label: "SON", id: "son" },
  { href: "#cefon", label: "CEFON", id: "cefon" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const

type NavProps = {
  activeId: string
}

export function Nav({ activeId }: NavProps) {
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const onHero = !scrolled

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500 ${
        scrolled
          ? "border-b border-[color-mix(in_srgb,var(--gold)_28%,transparent)] bg-[color-mix(in_srgb,var(--ivory)_92%,transparent)] shadow-[0_8px_32px_color-mix(in_srgb,var(--green)_8%,transparent)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:gap-6 md:px-8 md:py-4">
        <motion.a
          href="#top"
          className={`font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.22em] md:text-base ${
            onHero ? "text-[var(--ivory)]" : "text-[var(--green)]"
          }`}
          whileHover={reduce ? undefined : { letterSpacing: "0.28em" }}
          transition={{ duration: 0.35 }}
        >
          ECKOBIG
        </motion.a>

        <nav
          className="hidden items-center gap-1 lg:flex lg:gap-0.5 xl:gap-1"
          aria-label="Primary"
        >
          {links.map((link) => {
            const isDubai = link.id === "dubai"
            const active = activeId === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                className={`nav-link px-2 py-1 text-[0.75rem] tracking-[0.05em] xl:px-2.5 xl:text-[0.8rem] ${
                  onHero
                    ? active || isDubai
                      ? "text-[var(--gold-light)]"
                      : "text-[color-mix(in_srgb,var(--ivory)_88%,transparent)] hover:text-[var(--gold-light)]"
                    : active || isDubai
                      ? "text-[var(--gold-deep)]"
                      : "text-[var(--ink)] hover:text-[var(--gold-deep)]"
                } ${isDubai ? "font-medium" : ""}`}
                aria-current={active ? "true" : undefined}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#dubai"
            className={`hidden min-h-10 items-center text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 md:inline-flex lg:hidden ${
              onHero
                ? "text-[var(--gold-light)] hover:text-[var(--ivory)]"
                : "text-[var(--gold-deep)] hover:text-[var(--green)]"
            }`}
          >
            Dubai
          </a>
          <button
            type="button"
            className={`inline-flex min-h-11 min-w-[4.5rem] items-center justify-center border px-3.5 py-2.5 text-sm transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 lg:hidden ${
              onHero
                ? "border-[color-mix(in_srgb,var(--gold)_45%,transparent)] text-[var(--ivory)] hover:border-[var(--gold-light)] hover:text-[var(--gold-light)]"
                : "border-[color-mix(in_srgb,var(--green)_25%,transparent)] text-[var(--green)] hover:border-[var(--gold)] hover:text-[var(--gold-deep)]"
            }`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="max-h-[min(78dvh,34rem)] overflow-y-auto overscroll-contain border-t border-[color-mix(in_srgb,var(--gold)_25%,transparent)] bg-[var(--ivory)] px-5 py-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:hidden"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {links.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  className={`flex min-h-12 items-center border-b border-[color-mix(in_srgb,var(--gold)_18%,transparent)] text-base tracking-[0.04em] transition-colors last:border-b-0 hover:text-[var(--gold-deep)] ${
                    link.id === "dubai"
                      ? "font-medium text-[var(--gold-deep)]"
                      : activeId === link.id
                        ? "text-[var(--gold-deep)]"
                        : "text-[var(--green)]"
                  }`}
                  onClick={() => setOpen(false)}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.3 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
