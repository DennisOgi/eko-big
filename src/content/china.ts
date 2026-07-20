/**
 * China Chapter — international learning and global perspective.
 * Imagery: local photos from `/assets`, served under `/public/media/china`.
 */

export type ChinaImage = {
  id: string
  src: string
  alt: string
  caption?: string
  /** Object-position for featured crop */
  position?: string
}

export const chinaIntro = {
  eyebrow: "China Chapter · Beijing",
  title: "A Month That Rewrote the Map",
  lead:
    "International experience beyond borders — where real-world immersion in one of the world's most dynamic economies delivers lessons no classroom can replicate.",
  route: "Hamad International · Doha → Daxing International · Beijing",
  closing:
    "From Dubai's luxury corridors to Beijing's capital intensity — a global perspective forged in the field, not from a syllabus.",
} as const

export const chinaQuote = {
  text: "What I learned in China in one month can never be learned in any university around the world in one year",
  attribution: "ECKOBIG ANTHONY",
} as const

export const chinaImages: ChinaImage[] = [
  {
    id: "journey-portrait",
    src: "/media/china/portrait-journey.jpeg",
    alt: "ECKOBIG ANTHONY en route — international travel portrait",
    caption: "En route · International corridor",
    position: "center 20%",
  },
  {
    id: "beijing-editorial",
    src: "/media/china/beijing-trip-editorial.jpeg",
    alt: "My Trip to Beijing — Daxing International Airport and the capital city of China",
    caption: "Beijing · Daxing International",
  },
]
