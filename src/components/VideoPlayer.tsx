import { useCallback, useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

type VideoPlayerProps = {
  src: string
  poster?: string
  title: string
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)

  const toggle = useCallback(async () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      await video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTime = () => {
      setCurrent(video.currentTime)
      setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0)
    }
    const onMeta = () => setDuration(video.duration || 0)
    const onEnded = () => setPlaying(false)

    video.addEventListener("timeupdate", onTime)
    video.addEventListener("loadedmetadata", onMeta)
    video.addEventListener("ended", onEnded)
    return () => {
      video.removeEventListener("timeupdate", onTime)
      video.removeEventListener("loadedmetadata", onMeta)
      video.removeEventListener("ended", onEnded)
    }
  }, [])

  const seek = (value: number) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    video.currentTime = (value / 100) * video.duration
    setProgress(value)
  }

  return (
    <div className="video-shell group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        title={title}
        onClick={toggle}
        className="cursor-pointer transition duration-700 group-hover:brightness-[1.03]"
      />

      {!playing && (
        <button
          type="button"
          onClick={toggle}
          className="absolute inset-0 z-10 flex items-center justify-center bg-[color-mix(in_srgb,var(--green)_28%,transparent)] transition-opacity duration-300 focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-inset"
          aria-label={`Play ${title}`}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--green)_50%,transparent)] via-transparent to-transparent"
            aria-hidden
          />
          <motion.span
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--green)] shadow-[0_12px_32px_color-mix(in_srgb,var(--gold)_45%,transparent)]"
            whileHover={reduce ? undefined : { scale: 1.08 }}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.span>
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[color-mix(in_srgb,var(--green)_92%,black)] to-transparent p-4 pt-10 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 focus-within:pointer-events-auto focus-within:opacity-100">
        <div className="flex items-center gap-3 text-sm text-[var(--ivory)]">
          <button
            type="button"
            onClick={toggle}
            className="pointer-events-auto shrink-0 rounded-sm px-2 py-1 transition-colors hover:bg-[color-mix(in_srgb,var(--gold)_18%,transparent)] focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? "Pause" : "Play"}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            className="pointer-events-auto h-1 w-full cursor-pointer accent-[var(--gold)]"
            aria-label="Seek"
          />
          <span className="pointer-events-none shrink-0 tabular-nums text-[var(--gold-light)]">
            {formatTime(current)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  )
}
