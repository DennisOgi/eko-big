/**
 * Credentials rail — verified proof points, not vanity metrics.
 * Optional media links open source documents where available.
 */

import { media } from "./assets"

export type CredentialDocument = {
  href: string
  label: string
}

export type CredentialItem = {
  id: string
  label: string
  detail: string
  documents?: CredentialDocument[]
}

export const credentialsIntro = {
  eyebrow: "Credentials",
  title: "Verified standing",
  lead: "Institutional registration, Dubai hospitality operations, and initiatives under one disciplined leadership standard.",
} as const

export const credentials: CredentialItem[] = [
  {
    id: "cac",
    label: "CAC registered",
    detail:
      "ECKOBIG TRINITY GLOBAL is registered with Nigeria’s Corporate Affairs Commission — a formal corporate identity for premium trade, agency, and cross-border partnerships.",
    documents: [
      {
        href: media.credentials.cac,
        label: "View CAC certificate",
      },
    ],
  },
  {
    id: "dubai-ops",
    label: "Dubai hospitality ops",
    detail:
      "Fleet Supervisor with Private Limousine LLC — executive chauffeur operations across Dubai’s defining luxury hotels and premium destinations. SIRA security training underpins the operational standard.",
    documents: [
      {
        href: media.credentials.employment,
        label: "View employment certificate",
      },
      {
        href: media.credentials.sira,
        label: "View SIRA certificate",
      },
    ],
  },
  {
    id: "trinity",
    label: "ECKOBIG TRINITY GLOBAL",
    detail:
      "Founder-led enterprise spanning luxury sales and marketing, international sourcing, procurement, and logistics — connecting brands and businesses across borders.",
  },
  {
    id: "cefon",
    label: "CEFON",
    detail:
      "Founder of Clean Earth Foundation Nigeria — environmental sustainability, public sanitation, and shared civic responsibility for cleaner communities.",
  },
  {
    id: "son",
    label: "SON initiative",
    detail:
      "Social impact programming under the SON initiative — purpose-driven advocacy aligned with ethical leadership and community uplift.",
  },
  {
    id: "change",
    label: "CHANGE campaign",
    detail:
      "“CHANGE! YES WE CAN!” — advocacy for transformed thinking, responsible leadership, and positive social transformation.",
  },
]
