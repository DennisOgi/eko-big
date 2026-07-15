/**
 * Portraits gallery — originals in `/assets` named `picture 1.jpeg` … `picture 10.jpeg`
 * (picture 6 absent). Horizontal browse below; mobile hero may still rotate these frames.
 */

export type SeriesFrame = {
  src: string
  alt: string
  position: string
  /** Index display, e.g. "01" */
  index: string
  title: string
  line: string
}

export const seriesIntro = {
  eyebrow: "Portraits",
  title: "Presence",
  lead: "Formal studio portraiture — composure and character, held with quiet authority.",
  /** Discreet control hint below the lead */
  hint: "Drag or use arrows",
} as const

export const seriesFrames: SeriesFrame[] = [
  {
    src: "/media/portrait-white-suit-2.jpeg",
    alt: "ECKOBIG ANTHONY close portrait in a textured white suit",
    position: "center 18%",
    index: "01",
    title: "Poise",
    line: "Stillness that holds the room.",
  },
  {
    src: "/media/portrait-white-suit-3.jpeg",
    alt: "ECKOBIG ANTHONY full-length white suit studio portrait",
    position: "center 12%",
    index: "02",
    title: "Line",
    line: "Tailoring as quiet architecture.",
  },
  {
    src: "/media/portrait-white-suit-5.jpeg",
    alt: "ECKOBIG ANTHONY three-quarter white suit portrait",
    position: "center 14%",
    index: "03",
    title: "Light",
    line: "Where gold meets composure.",
  },
  {
    src: "/media/portrait-white-suit.jpeg",
    alt: "ECKOBIG ANTHONY holding his lapel in a textured white blazer",
    position: "center 12%",
    index: "04",
    title: "Form",
    line: "Presence cut to the grain.",
  },
  {
    src: "/media/portrait-navy-2.jpeg",
    alt: "ECKOBIG ANTHONY navy suit studio portrait",
    position: "center 16%",
    index: "05",
    title: "Depth",
    line: "Navy as continuum of intent.",
  },
  {
    src: "/media/portrait-navy-4.jpeg",
    alt: "ECKOBIG ANTHONY navy studio portrait, composed gaze",
    position: "center 18%",
    index: "06",
    title: "Focus",
    line: "Eye contact that leads.",
  },
  {
    src: "/media/portrait-navy-5.jpeg",
    alt: "ECKOBIG ANTHONY navy formal portrait",
    position: "center 15%",
    index: "07",
    title: "Measure",
    line: "Discipline in every detail.",
  },
  {
    src: "/media/portrait-navy.jpeg",
    alt: "ECKOBIG ANTHONY smiling in a navy pinstripe suit, hands clasped",
    position: "center 14%",
    index: "08",
    title: "Warmth",
    line: "Authority with an open face.",
  },
  {
    src: "/media/portrait-navy-full.jpeg",
    alt: "ECKOBIG ANTHONY standing full-length in navy formal attire",
    position: "center 10%",
    index: "09",
    title: "Stance",
    line: "Value held upright.",
  },
]
