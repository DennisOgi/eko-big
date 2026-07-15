/** Cinematic hero media suite — full-bleed layers.
 *
 * Desktop (lg+): single plate from `eko big desktop.png` → `/media/eko-big-desktop.png`.
 * Mobile: rotating picture + hero series frames from `/public/media`.
 *
 * Picture series originals in `/assets`: `picture 1`–`5`, `7`–`10` (no `picture 6`).
 * Hero series originals: `hero 1`–`6` (+ `hero 3.5`).
 */

export type HeroSlide = {
  src: string
  alt: string
  /** object-position — mobile / default (face centered) */
  position: string
  /** object-position — lg+ desktop (face/suit in right ~55–65%, left copy space) */
  positionDesktop: string
  /** Ken Burns pan direction for variety */
  kenBurns: "in" | "out" | "drift-left" | "drift-right"
}

export type HeroAmbient = {
  src: string
  alt: string
  position: string
  positionDesktop: string
}

/** Sole desktop hero plate — landscape studio portrait with left copy space */
export const heroDesktopSlide: HeroSlide = {
  src: "/media/eko-big-desktop.png",
  alt: "ECKOBIG ANTHONY in a burgundy mandarin-collar suit, seated studio portrait",
  position: "center 32%",
  positionDesktop: "62% 38%",
  kenBurns: "in",
}

/**
 * Curated cinematic sequence — every picture-series frame, plus all hero-series frames.
 *
 * Picture series mapping:
 * picture 1 → portrait-white-suit-2
 * picture 2 → portrait-white-suit-3
 * picture 3 → portrait-white-suit-5
 * picture 4 → portrait-white-suit
 * picture 5 → portrait-navy-2
 * picture 7 → portrait-navy-4
 * picture 8 → portrait-navy-5
 * picture 9 → portrait-navy
 * picture 10 → portrait-navy-full
 *
 * Hero series mapping:
 * hero 1 → portrait-navy-full-5
 * hero 2 → portrait-navy-full-6
 * hero 3 → portrait-navy-3
 * hero 3.5 → portrait-navy-full-2
 * hero 4 → change-thinking-3
 * hero 5 → portrait-navy-full-3
 * hero 6 → portrait-white-suit-4
 */
export const heroSlides: HeroSlide[] = [
  {
    src: "/media/portrait-navy-full-5.jpeg",
    alt: "ECKOBIG ANTHONY in a navy pinstripe suit, hands clasped, smiling",
    position: "center 18%",
    positionDesktop: "68% 26%",
    kenBurns: "in",
  },
  {
    src: "/media/portrait-white-suit-2.jpeg",
    alt: "ECKOBIG ANTHONY close portrait in a textured white suit",
    position: "center 22%",
    positionDesktop: "72% 32%",
    kenBurns: "drift-right",
  },
  {
    src: "/media/portrait-navy-full-6.jpeg",
    alt: "ECKOBIG ANTHONY in a burgundy mandarin-collar jacket, reflective pose",
    position: "center 20%",
    positionDesktop: "74% 34%",
    kenBurns: "out",
  },
  {
    src: "/media/portrait-white-suit-3.jpeg",
    alt: "ECKOBIG ANTHONY full-length white suit studio portrait",
    position: "center 14%",
    positionDesktop: "66% 22%",
    kenBurns: "drift-left",
  },
  {
    src: "/media/portrait-white-suit-5.jpeg",
    alt: "ECKOBIG ANTHONY three-quarter white suit portrait",
    position: "center 16%",
    positionDesktop: "70% 28%",
    kenBurns: "in",
  },
  {
    src: "/media/portrait-navy-full-2.jpeg",
    alt: "ECKOBIG ANTHONY in a burgundy jacket with gold crest buttons, warm smile",
    position: "center 18%",
    positionDesktop: "72% 30%",
    kenBurns: "drift-right",
  },
  {
    src: "/media/portrait-white-suit.jpeg",
    alt: "ECKOBIG ANTHONY holding his lapel in a textured white blazer",
    position: "center 16%",
    positionDesktop: "70% 28%",
    kenBurns: "out",
  },
  {
    src: "/media/portrait-navy-2.jpeg",
    alt: "ECKOBIG ANTHONY navy suit studio portrait",
    position: "center 18%",
    positionDesktop: "68% 28%",
    kenBurns: "drift-left",
  },
  {
    src: "/media/portrait-navy-3.jpeg",
    alt: "ECKOBIG ANTHONY in a black suit against a white studio backdrop",
    position: "center 18%",
    positionDesktop: "70% 26%",
    kenBurns: "in",
  },
  {
    src: "/media/portrait-navy-4.jpeg",
    alt: "ECKOBIG ANTHONY navy studio portrait, composed gaze",
    position: "center 20%",
    positionDesktop: "72% 30%",
    kenBurns: "drift-right",
  },
  {
    src: "/media/change-thinking-3.jpeg",
    alt: "ECKOBIG ANTHONY in a textured white suit with blue shirt and striped tie",
    position: "center 14%",
    positionDesktop: "68% 24%",
    kenBurns: "out",
  },
  {
    src: "/media/portrait-navy-5.jpeg",
    alt: "ECKOBIG ANTHONY navy formal portrait",
    position: "center 18%",
    positionDesktop: "70% 28%",
    kenBurns: "drift-left",
  },
  {
    src: "/media/portrait-navy-full-3.jpeg",
    alt: "ECKOBIG ANTHONY in a white suit with lime accents, holding eyeglasses",
    position: "center 12%",
    positionDesktop: "66% 22%",
    kenBurns: "in",
  },
  {
    src: "/media/portrait-navy.jpeg",
    alt: "ECKOBIG ANTHONY smiling in a navy pinstripe suit, hands clasped",
    position: "center 16%",
    positionDesktop: "68% 26%",
    kenBurns: "drift-right",
  },
  {
    src: "/media/portrait-navy-full.jpeg",
    alt: "ECKOBIG ANTHONY standing full-length in navy formal attire",
    position: "center 12%",
    positionDesktop: "64% 18%",
    kenBurns: "out",
  },
  {
    src: "/media/portrait-white-suit-4.jpeg",
    alt: "ECKOBIG ANTHONY in a white suit with a welcoming open-hand gesture",
    position: "center 16%",
    positionDesktop: "70% 26%",
    kenBurns: "in",
  },
]

/** Soft atmospheric plates — mix of picture + hero series */
export const heroAmbient: HeroAmbient[] = [
  {
    src: "/media/portrait-navy-full-5.jpeg",
    alt: "",
    position: "center 20%",
    positionDesktop: "62% 28%",
  },
  {
    src: "/media/portrait-white-suit-2.jpeg",
    alt: "",
    position: "center 18%",
    positionDesktop: "65% 30%",
  },
  {
    src: "/media/portrait-navy-full.jpeg",
    alt: "",
    position: "center 14%",
    positionDesktop: "60% 22%",
  },
  {
    src: "/media/change-thinking-3.jpeg",
    alt: "",
    position: "center 16%",
    positionDesktop: "62% 26%",
  },
  {
    src: "/media/portrait-white-suit-4.jpeg",
    alt: "",
    position: "center 18%",
    positionDesktop: "64% 28%",
  },
  {
    src: "/media/portrait-navy.jpeg",
    alt: "",
    position: "center 16%",
    positionDesktop: "62% 26%",
  },
]

/** Slightly longer dwell with the expanded suite */
export const HERO_SLIDE_MS = 6400
export const HERO_AMBIENT_MS = 9200
export const HERO_CROSSFADE_S = 1.55
