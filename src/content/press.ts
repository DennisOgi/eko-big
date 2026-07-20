/**
 * Press coverage — scanned newspaper features from the ECKOBIG PDF archive.
 */

export const pressIntro = {
  eyebrow: "In the Media",
  title: "Press Coverage",
  lead: "National newspaper features documenting leadership, advocacy, and enterprise — from political commentary to corporate milestones and personal testimony.",
  readMore:
    "These archived spreads reflect sustained visibility across Nigeria's press landscape: The Union, Sunday Sun, and Sunday Mirror. Each feature captures a distinct chapter — preaching change through music, divine inspiration in artistry, and a philosophy of corporate, smart personal style.",
} as const

export type PressSpread = {
  id: string
  image: string
  /** Small variant for the thumbnail strip (see scripts/optimize-press-images.mjs) */
  thumb: string
  publication: string
  headline: string
  date: string
  alt: string
}

export const pressSpreads: PressSpread[] = [
  {
    id: "the-union-2014",
    image: "/media/press/pages/page-01.jpg",
    thumb: "/media/press/pages/page-01-thumb.jpg",
    publication: "The Union",
    headline: "I Preach For Change Through My Music",
    date: "December 2014",
    alt: "The Union weekend special interview with Eckobig Chidiebere Anthony — I Preach For Change Through My Music",
  },
  {
    id: "sunday-sun-2015",
    image: "/media/press/pages/page-02.jpg",
    thumb: "/media/press/pages/page-02-thumb.jpg",
    publication: "Sunday Sun",
    headline: "God is my inspiration -Eckobig",
    date: "July 2015",
    alt: "Sunday Sun Entertainer feature — God is my inspiration -Eckobig",
  },
  {
    id: "sunday-mirror-2015",
    image: "/media/press/pages/page-03.jpg",
    thumb: "/media/press/pages/page-03-thumb.jpg",
    publication: "Sunday Mirror",
    headline: "'I like to look corporate and smart'",
    date: "August 2015",
    alt: "Sunday Mirror Dude Style feature with Eckobig Chidiebere — I like to look corporate and smart",
  },
] as const

export const pressArchive = {
  label: "View full press archive",
} as const
