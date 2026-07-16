import { useCallback, useState } from "react"
import { AboutSection } from "./components/AboutSection"
import { CefonSection } from "./components/CefonSection"
import { ChangeSection } from "./components/ChangeSection"
import { ContactSection } from "./components/ContactSection"
import { CredentialsRail } from "./components/CredentialsRail"
import { DubaiSection } from "./components/DubaiSection"
import { Hero } from "./components/Hero"
import { Nav } from "./components/Nav"
import { PictureSeriesSection } from "./components/PictureSeriesSection"
import { PressSection } from "./components/PressSection"
import { useSectionObserver } from "./components/Reveal"
import { SonSection } from "./components/SonSection"
import { SplashScreen } from "./components/SplashScreen"
import { sections } from "./content/sections"

const sectionIds = sections.map((s) => s.id)

export default function App() {
  const [activeId, setActiveId] = useState("about")
  const onActive = useCallback((id: string) => setActiveId(id), [])
  useSectionObserver(sectionIds, onActive)

  return (
    <>
      <SplashScreen />
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <Nav activeId={activeId} />
      <main>
        <Hero />
        <AboutSection />
        <CredentialsRail />
        <PressSection />
        <DubaiSection />
        <PictureSeriesSection />
        <ChangeSection />
        <SonSection />
        <CefonSection />
        <ContactSection />
      </main>
      <footer className="relative overflow-hidden border-t border-[color-mix(in_srgb,var(--gold)_25%,transparent)] bg-[var(--green)] px-5 py-14 pb-[max(3.5rem,calc(2.5rem+env(safe-area-inset-bottom)))] text-center text-sm text-[color-mix(in_srgb,var(--ivory)_72%,transparent)] md:px-8 md:pb-14">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold-light)] to-transparent opacity-60"
          aria-hidden
        />
        <a
          href="#top"
          className="font-[family-name:var(--font-display)] text-base tracking-[0.22em] text-[var(--gold-light)] transition-colors duration-300 hover:text-[var(--ivory)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
        >
          ECKOBIG ANTHONY
        </a>
        <p className="mt-3 text-xs tracking-[0.2em] text-[color-mix(in_srgb,var(--ivory)_55%,transparent)] uppercase">
          ECKOBIG TRINITY GLOBAL
        </p>
        <nav
          className="mx-auto mt-8 flex max-w-lg flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs tracking-[0.14em] uppercase"
          aria-label="Footer"
        >
          <a
            href="#dubai"
            className="inline-flex min-h-10 items-center text-[var(--gold-light)] transition-colors hover:text-[var(--ivory)]"
          >
            Dubai
          </a>
          <a
            href="#about"
            className="inline-flex min-h-10 items-center transition-colors hover:text-[var(--ivory)]"
          >
            About
          </a>
          <a
            href="#cefon"
            className="inline-flex min-h-10 items-center transition-colors hover:text-[var(--ivory)]"
          >
            CEFON
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-10 items-center transition-colors hover:text-[var(--ivory)]"
          >
            Contact
          </a>
        </nav>
        <p className="mt-8 text-[color-mix(in_srgb,var(--ivory)_65%,transparent)]">
          © {new Date().getFullYear()} ECKOBIG TRINITY GLOBAL · Beautify Our World
        </p>
        <p className="mt-4 text-[0.7rem] tracking-[0.12em] text-[color-mix(in_srgb,var(--ivory)_38%,transparent)]">
          Crafted by{" "}
          <a
            href="https://github.com/DennisOgi"
            target="_blank"
            rel="noreferrer"
            className="text-[color-mix(in_srgb,var(--ivory)_52%,transparent)] transition-colors hover:text-[var(--gold-light)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
          >
            Dennis Ogi
          </a>
        </p>
      </footer>
    </>
  )
}
