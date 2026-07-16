/**
 * Press coverage — scanned newspaper features from the ECKOBIG PDF archive.
 */

export const pressIntro = {
  eyebrow: "In the Media",
  title: "Press Coverage",
  lead: "National newspaper features documenting leadership, advocacy, and enterprise — from political commentary to corporate milestones and personal testimony.",
  readMore:
    "These archived spreads reflect sustained visibility across Nigeria's press landscape: Vanguard, Independent Observer, and Sunday Independent. Each feature captures a distinct chapter — faith under pressure, electoral advocacy, and the eighth anniversary of ECKOBIG TRINITY GLOBAL.",
} as const

export type PressSpread = {
  id: string
  image: string
  publication: string
  headline: string
  date: string
  alt: string
}

export const pressSpreads: PressSpread[] = [
  {
    id: "vanguard-2023",
    image: "/media/press/pages/page-01.jpg",
    publication: "Vanguard",
    headline:
      "How I escaped from police SARS squad through divine intervention",
    date: "November 2023",
    alt: "Vanguard newspaper spread featuring Prince ECKOBIG Anthony — headline on escaping police SARS through divine intervention",
  },
  {
    id: "independent-observer-2019",
    image: "/media/press/pages/page-02.jpg",
    publication: "Independent Observer",
    headline: "Why it has to be Atiku",
    date: "September 2019",
    alt: "Independent Observer newspaper page with ECKOBIG commentary on Atiku Abubakar and the 2019 presidential election",
  },
  {
    id: "sunday-independent-2019",
    image: "/media/press/pages/page-03.jpg",
    publication: "Sunday Independent",
    headline: "ECKOBIG TRINITY GLOBAL celebrates 8th anniversary in style",
    date: "April 2019",
    alt: "Sunday Independent feature on ECKOBIG TRINITY GLOBAL eighth anniversary celebration in Lagos",
  },
] as const

export const pressArchive = {
  label: "View full press archive",
} as const
