/**
 * Dubai Chapter — Fleet Supervisor / Private Limousine LLC service destinations.
 * Imagery: local hotel photos from `/assets/hotels`, served under `/public/media/dubai`.
 */

export type DubaiVenue = {
  id: string
  name: string
  district: string
  image: string
  /** Object-position for featured crop */
  position?: string
}

/** Light framing labels — major corridors, not a filter UI */
export const dubaiDistricts = [
  "Downtown",
  "Marina",
  "Jumeirah",
  "DIFC",
] as const

export const dubaiIntro = {
  eyebrow: "Dubai Chapter · UAE",
  title: "Luxury Hospitality Destinations",
  role: "Fleet Supervisor · Private Limousine LLC",
  lead:
    "Executive chauffeur operations across Dubai’s defining luxury hospitality destinations — Burj Khalifa (Armani Hotel & Residence), Leading Luxury Hotel and VIP Destination Across Downtown, Marina, Jumeirah and DIFC Dubai UAE — delivering the standard expected by international guests and institutional clients.",
  credibility:
    "A working map of world-class service: precision timing, discreet presence, and operational excellence forged in one of the world’s most demanding luxury markets.",
  note: "Twenty hotels and premium venues — the chapter that still informs leadership at ECKOBIG TRINITY GLOBAL.",
  closing:
    "This chapter shaped a lasting standard of operational excellence and hospitality — the same discipline that now informs leadership at ECKOBIG TRINITY GLOBAL.",
} as const

/** Featured portrait shown when visitors open the Dubai chapter */
export const dubaiFeatured = {
  src: "/media/dubai/dubai-hotel-magazine.jpg",
  alt: "ECKOBIG ANTHONY standing in front of a Dubai luxury hotel — magazine feature",
  caption: "On location · Dubai",
  position: "center top",
} as const

export const dubaiVenues: DubaiVenue[] = [
  {
    id: "armani-burj",
    name: "Burj Khalifa by Emaar (Armani Hotel Dubai)",
    district: "Downtown Dubai",
    image: "/media/dubai/armani-burj-khalifa.jpg",
    position: "center 30%",
  },
  {
    id: "vida-downtown",
    name: "Vida Hotel Downtown Dubai",
    district: "Downtown Dubai",
    image: "/media/dubai/vida-downtown.jpg",
    position: "center 40%",
  },
  {
    id: "manzil-downtown",
    name: "Manzil Hotel Downtown Dubai",
    district: "Downtown Dubai",
    image: "/media/dubai/manzil-downtown.jpg",
    position: "center center",
  },
  {
    id: "palace-downtown",
    name: "Palace Hotel Downtown Dubai",
    district: "Downtown Dubai",
    image: "/media/dubai/palace-downtown.jpg",
    position: "center 45%",
  },
  {
    id: "address-downtown",
    name: "Address Downtown Dubai",
    district: "Downtown Dubai",
    image: "/media/dubai/address-downtown.jpg",
    position: "center 35%",
  },
  {
    id: "address-dubai-mall",
    name: "Address Hotel Dubai Mall",
    district: "Downtown Dubai",
    image: "/media/dubai/address-dubai-mall.jpg",
    position: "center center",
  },
  {
    id: "address-boulevard",
    name: "Address Hotel Boulevard Dubai",
    district: "Downtown Dubai",
    image: "/media/dubai/address-boulevard.jpg",
    position: "center 40%",
  },
  {
    id: "address-marina",
    name: "Address Dubai Marina",
    district: "Dubai Marina",
    image: "/media/dubai/address-dubai-marina.jpg",
    position: "center 35%",
  },
  {
    id: "kiza-difc",
    name: "KIZA Restaurant (DIFC)",
    district: "DIFC",
    image: "/media/dubai/kiza-difc.jpg",
    position: "center 25%",
  },
  {
    id: "movenpick-bur",
    name: "Mövenpick Hotel Bur Dubai",
    district: "Bur Dubai",
    image: "/media/dubai/movenpick-bur-dubai.jpg",
    position: "center 40%",
  },
  {
    id: "jumeirah-living-wtc",
    name: "Jumeirah Living World Trade Centre",
    district: "Trade Centre",
    image: "/media/dubai/jumeirah-living-wtc.jpg",
    position: "center 30%",
  },
  {
    id: "city-walk",
    name: "City Walk Dubai",
    district: "Al Wasl",
    image: "/media/dubai/city-walk.jpg",
    position: "center 45%",
  },
  {
    id: "mandarin-oriental",
    name: "Mandarin Oriental Jumeira 1, Dubai",
    district: "Jumeirah",
    image: "/media/dubai/mandarin-oriental-jumeira.jpg",
    position: "center 40%",
  },
  {
    id: "festival-city",
    name: "Dubai Festival City Mall (IKEA)",
    district: "Festival City",
    image: "/media/dubai/festival-city-mall.jpg",
    position: "center 45%",
  },
  {
    id: "hard-rock-creek",
    name: "Hard Rock Café, Dubai Creek Harbour",
    district: "Creek Harbour",
    image: "/media/dubai/hard-rock-creek-harbour.jpg",
    position: "center center",
  },
  {
    id: "al-khasa",
    name: "Al Khasa Hotel, Jumeirah, Dubai",
    district: "Jumeirah",
    image: "/media/dubai/al-khasa-jumeirah.webp",
    position: "center 50%",
  },
  {
    id: "al-naseem",
    name: "Jumeirah Al Naseem, Dubai",
    district: "Madinat Jumeirah",
    image: "/media/dubai/jumeirah-al-naseem.jpg",
    position: "center 40%",
  },
  {
    id: "mina-asalam",
    name: "Jumeirah Mina A'Salam, Dubai",
    district: "Madinat Jumeirah",
    image: "/media/dubai/jumeirah-mina-asalam.jpg",
    position: "center 45%",
  },
  {
    id: "wyndham-marina",
    name: "Wyndham Dubai Marina",
    district: "Dubai Marina",
    image: "/media/dubai/wyndham-dubai-marina.jpg",
    position: "center 40%",
  },
  {
    id: "zabeel-saray",
    name: "Jumeirah Zabeel Saray, Dubai",
    district: "Palm Jumeirah",
    image: "/media/dubai/jumeirah-zabeel-saray.jpg",
    position: "center 35%",
  },
]
