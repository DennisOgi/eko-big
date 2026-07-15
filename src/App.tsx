import { useCallback, useState } from "react"
import { AboutSection } from "./components/AboutSection"
import { CefonSection } from "./components/CefonSection"
import { ChangeSection } from "./components/ChangeSection"
import { ContactSection } from "./components/ContactSection"
import { Hero } from "./components/Hero"
import { Nav } from "./components/Nav"
import { PictureSeriesSection } from "./components/PictureSeriesSection"
import { useSectionObserver } from "./components/Reveal"
import { SonSection } from "./components/SonSection"
import { sections } from "./content/sections"

const sectionIds = sections.map((s) => s.id)

export default function App() {
  const [activeId, setActiveId] = useState("about")
  const onActive = useCallback((id: string) => setActiveId(id), [])
  useSectionObserver(sectionIds, onActive)

  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <Nav activeId={activeId} />
      <main>
        <Hero />
        <AboutSection />
        <PictureSeriesSection />
        <ChangeSection />
        <SonSection />
        <CefonSection />
        <ContactSection />
      </main>
      <footer className="relative overflow-hidden border-t border-[color-mix(in_srgb,var(--gold)_25%,transparent)] bg-[var(--green)] px-5 py-12 text-center text-sm text-[color-mix(in_srgb,var(--ivory)_70%,transparent)] md:px-8">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold-light)] to-transparent opacity-60"
          aria-hidden
        />
        <a
          href="#top"
          className="font-[family-name:var(--font-display)] tracking-[0.2em] text-[var(--gold-light)] transition-colors duration-300 hover:text-[var(--ivory)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
        >
          ECKOBIG ANTHONY
        </a>
        <p className="mt-4">© {new Date().getFullYear()} ECKOBIG TRINITY GLOBAL · Beautify Our World</p>
      </footer>
    </>
  )
}
