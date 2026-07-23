export type BookItem = {
  id: string
  title: string
  subtitle: string
  description: string
  href: string
  filename: string
}

export const booksIntro = {
  eyebrow: "Publications",
  title: "Books",
  lead: "Writings by ECKOBIG ANTHONY — available to download and share.",
} as const

export const books: BookItem[] = [
  {
    id: "eckobig-profile",
    title: "ECKOBIG Profile",
    subtitle: "Professional profile",
    description:
      "A concise profile of ECKOBIG ANTHONY — entrepreneur, trade consultant, and founder of ECKOBIG TRINITY GLOBAL.",
    href: "/media/books/eckobig-profile.pdf",
    filename: "ECKOBIG-Profile.pdf",
  },
  {
    id: "what-is-life",
    title: "What is Life",
    subtitle: "Reflections & philosophy",
    description:
      "A personal exploration of purpose, resilience, and the lessons that shape a life of impact.",
    href: "/media/books/what-is-life.pdf",
    filename: "What-is-Life.pdf",
  },
]
