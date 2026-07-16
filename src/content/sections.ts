/**
 * Section registry — add new page sections here for easy extension.
 * Each entry maps to a section component rendered in App.
 */
export const sections = [
  { id: "about", label: "About", component: "AboutSection" },
  { id: "dubai", label: "Dubai", component: "DubaiSection" },
  { id: "series", label: "Portraits", component: "PictureSeriesSection" },
  { id: "change", label: "CHANGE", component: "ChangeSection" },
  { id: "son", label: "SON Initiative", component: "SonSection" },
  { id: "cefon", label: "CEFON", component: "CefonSection" },
  { id: "contact", label: "Contact", component: "ContactSection" },
] as const

export type SectionId = (typeof sections)[number]["id"]
