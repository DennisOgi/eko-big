import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

type YouTubeEmbedProps = {
  videoId: string
  title: string
  /** Optional custom poster; defaults to YouTube hqdefault */
  poster?: string
}

export function YouTubeEmbed({ videoId, title, poster }: YouTubeEmbedProps) {
  const [active, setActive] = useState(false)
  const reduce = useReducedMotion()
  const thumb =
    poster ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

  return (
    <div className="video-shell group aspect-video">
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
        />
      ) : (
        <>
          <img
            src={thumb}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--green)_55%,transparent)] via-transparent to-[color-mix(in_srgb,var(--green)_18%,transparent)]"
            aria-hidden
          />
          <button
            type="button"
            onClick={() => setActive(true)}
            className="absolute inset-0 z-10 flex items-center justify-center bg-[color-mix(in_srgb,var(--green)_28%,transparent)] transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--green)_18%,transparent)] focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-inset"
            aria-label={`Play ${title}`}
          >
            <motion.span
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--green)] shadow-[0_12px_32px_color-mix(in_srgb,var(--gold)_45%,transparent)]"
              whileHover={reduce ? undefined : { scale: 1.08 }}
              whileTap={reduce ? undefined : { scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.span>
          </button>
        </>
      )}
    </div>
  )
}
