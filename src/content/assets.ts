/** Media map — add new files under /public/media and register them here.
 *  Hero cinematic suite lives in `src/content/hero.ts`.
 */
export const media = {
  /** Legacy single-hero hooks (hero suite lives in hero.ts — hero series only) */
  heroPortrait: "/media/portrait-navy-full-5.jpeg",
  heroPortraitAlt: "/media/portrait-white-suit-4.jpeg",
  aboutPortrait: "/media/portrait-navy-full.jpeg",
  aboutPortraitAlt: "/media/portrait-navy.jpeg",
  lifestyle: "/media/portrait-lifestyle.jpeg",
  dubaiStory: "/media/portrait-dubai-story.jpeg",
  burj: "/media/burj-atmosphere.jpeg",
  /** Dubai chapter imagery lives under `/media/dubai` — see `content/dubai.ts` */
  brandLogo: "/media/eckobig-logo.jpeg",
  cefonLogo: "/media/cefon-logo.jpeg",
  changeThinking: "/media/change-thinking.jpeg",
  sonVideo: "/media/son.mp4",
  cefonVideo: "/media/cefon.mp4",
  /** Poster stills — studio portraits used until dedicated video frames are supplied */
  sonPoster: "/media/portrait-navy.jpeg",
  cefonPoster: "/media/cefon-logo.jpeg",
  credentials: {
    employment: "/media/credential-employment.jpeg",
    sira: "/media/credential-sira.jpeg",
    cac: "/media/credential-cac.jpeg",
  },
} as const

export const contact = {
  phone: "+234 803 415 0358",
  phoneHref: "tel:+2348034150358",
  email: "prince.eckobig@gmail.com",
  emailHref: "mailto:prince.eckobig@gmail.com",
  facebook: "@eckobig",
  facebookHref: "https://facebook.com/eckobig",
} as const
