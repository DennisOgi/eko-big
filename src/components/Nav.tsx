import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

const links = [
  { href: "#about", label: "About", id: "about" },
  { href: "#series", label: "Portraits", id: "series" },
  { href: "#change", label: "CHANGE", id: "change" },
  { href: "#son", label: "SON Initiative", id: "son" },
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[color-mix(in_srgb,var(--gold)_28%,transparent)] bg-[color-mix(in_srgb,var(--ivory)_92%,transparent)] shadow-[0_8px_32px_color-mix(in_srgb,var(--green)_8%,transparent)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <motion.a
          href="#top"
          className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.22em] text-[var(--green)] md:text-base"
          whileHover={reduce ? undefined : { letterSpacing: "0.28em" }}
          transition={{ duration: 0.35 }}
        >
          ECKOBIG
        </motion.a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="nav-link text-sm tracking-wide text-[var(--ink)]"
              aria-current={activeId === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center border border-[color-mix(in_srgb,var(--green)_25%,transparent)] px-3 py-2 text-sm text-[var(--green)] transition-colors duration-300 hover:border-[var(--gold)] hover:text-[var(--gold-deep)] focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="border-t border-[color-mix(in_srgb,var(--gold)_25%,transparent)] bg-[var(--ivory)] px-5 py-6 md:hidden"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col gap-4" aria-label="Mobile">
              {links.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  className="text-lg text-[var(--green)] transition-colors hover:text-[var(--gold-deep)]"
                  onClick={() => setOpen(false)}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.35 }}
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
