import { books, booksIntro } from "../content/books"
import { Reveal, ScrollAccent } from "./Reveal"

export function BooksSection() {
  return (
    <section
      id="books"
      className="bg-luxury texture-grain relative scroll-mt-24 overflow-hidden py-16 md:py-28"
      aria-labelledby="books-heading"
    >
      <div
        className="pointer-events-none absolute -right-16 top-20 h-56 w-56 rounded-full bg-[color-mix(in_srgb,var(--gold)_12%,transparent)] blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-[var(--gold-deep)] uppercase">
            {booksIntro.eyebrow}
          </p>
          <h2
            id="books-heading"
            className="heading-shimmer mt-3 font-[family-name:var(--font-display)] text-[1.75rem] tracking-[0.04em] text-[var(--green)] sm:text-3xl md:text-5xl"
          >
            {booksIntro.title}
          </h2>
          <ScrollAccent />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--green-mid)] md:text-lg">
            {booksIntro.lead}
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
          {books.map((book, i) => (
            <Reveal key={book.id} delay={0.06 + i * 0.05}>
              <li className="group relative flex h-full flex-col border border-[color-mix(in_srgb,var(--gold)_32%,transparent)] bg-[color-mix(in_srgb,var(--ivory)_88%,white)] p-6 transition duration-300 hover:border-[var(--gold)] hover:shadow-[0_18px_40px_color-mix(in_srgb,var(--green)_10%,transparent)] sm:p-8">
                <p className="text-[0.65rem] tracking-[0.24em] text-[var(--gold-deep)] uppercase">
                  {book.subtitle}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl tracking-[0.04em] text-[var(--green)] sm:text-2xl">
                  {book.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[color-mix(in_srgb,var(--ink)_72%,transparent)] sm:text-base">
                  {book.description}
                </p>
                <a
                  href={book.href}
                  download={book.filename}
                  className="btn-primary btn-lux mt-8 inline-flex min-h-12 w-full items-center justify-center sm:w-auto"
                >
                  Download PDF
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
