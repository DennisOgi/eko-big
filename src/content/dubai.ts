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

export const dubaiIntro = {
  eyebrow: "Dubai · UAE",
  title: "Luxury Hospitality Destinations",
  lead:
    "As Fleet Supervisor with Private Limousine LLC, ECKOBIG ANTHONY led executive chauffeur operations across Dubai’s defining luxury hotels and premium destinations — from Burj Khalifa and Downtown to Marina, Jumeirah, DIFC, and the Palm.",
  note: "Twenty-one hospitality and lifestyle venues — a working map of world-class service standards.",
  era: "Private Limousine LLC · Fleet Supervisor",
  credibility: "Operational excellence forged in Dubai’s luxury hospitality market.",
} as const

export const dubaiVenues: DubaiVenue[] = [
  {
    id: "armani-burj",
    name: "Armani Hotel Dubai, Burj Khalifa",
    district: "Downtown Dubai",
    image: "/media/dubai/armani-burj-khalifa.jpg",
    position: "center 30%",
  },
  {
    id: "vida-downtown",
    name: "Vida Downtown Dubai",
    district: "Downtown Dubai",
    image: "/media/dubai/vida-downtown.jpg",
    position: "center 40%",
  },
  {
    id: "manzil-downtown",
    name: "Manzil Downtown Dubai",
    district: "Downtown Dubai",
    image: "/media/dubai/manzil-downtown.jpg",
    position: "center center",
  },
  {
    id: "palace-downtown",
    name: "Palace Downtown Dubai",
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
    name: "Address Dubai Mall",
    district: "Downtown Dubai",
    image: "/media/dubai/address-dubai-mall.jpg",
    position: "center center",
  },
  {
    id: "address-boulevard",
    name: "Address Boulevard Dubai",
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
    name: "KIZA Restaurant, Dubai International Financial Centre (DIFC)",
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
    name: "Jumeirah Living World Trade Centre Residence",
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
    name: "Mandarin Oriental Jumeira, Dubai",
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
    image: "/media/dubai/al-khasa-jumeirah.jpg",
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
    id: "jumeirah-beach-hotel",
    name: "Jumeirah Beach Hotel, Dubai",
    district: "Jumeirah Beach",
    image: "/media/dubai/jumeirah-beach-hotel.jpg",
    position: "center 35%",
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
