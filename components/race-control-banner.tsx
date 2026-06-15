"use client"

import { useEffect, useState } from "react"

interface RaceControlBannerProps {
  heading?: string
  detail?: string
  /** Controls visibility. true = expand in from center, false = fade out. */
  show?: boolean
}

export function RaceControlBanner({
  heading = "RACE CONTROL: BEARMAN, HADJAR INCIDENT",
  detail = "TURN 12 - FORCING ANOTHER DRIVER OFF THE TRACK (15:04:44) - NOTED",
  show = true,
}: RaceControlBannerProps) {
  // `entered` drives the clip-path expand-from-center "in" animation.
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (show) {
      const id = requestAnimationFrame(() => setEntered(true))
      return () => cancelAnimationFrame(id)
    }
  }, [show])

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-stretch overflow-hidden shadow-2xl will-change-[clip-path,opacity]"
      style={{
        // In: starts as a tiny "/" parallelogram at the exact center and grows
        // sideways. The slant is CONSTANT because (topX - bottomX) === 11 in
        // both keyframes, so every vertex interpolates linearly while keeping
        // the lean — no rotation. The end keyframe overflows the box (top edge
        // to 111%, bottom edge to -11%) so the trailing top-left & bottom-right
        // corners are the last regions to fill in. Order: TL, TR, BR, BL.
        clipPath: entered
          ? "polygon(0% 0%, 111% 0%, 100% 100%, -11% 100%)"
          : "polygon(60% 0%, 62% 0%, 51% 100%, 49% 100%)",
        // Out: simple fade.
        opacity: show ? 1 : 0,
        transitionProperty: show ? "clip-path" : "opacity",
        transitionDuration: show ? "1100ms" : "350ms",
        transitionTimingFunction: show ? "cubic-bezier(0.22, 1, 0.36, 1)" : "ease-out",
      }}
    >
      {/* Logo (on the single navy background) */}
      <div className="flex w-20 shrink-0 flex-col items-center justify-center gap-1.5 bg-banner px-3 py-3">
        <span className="text-2xl font-black leading-none tracking-tighter text-banner-foreground">
          LOGO
        </span>
        <span className="h-1 w-10 bg-banner-accent" />
      </div>

      {/* Text panel (same navy) */}
      <div className="flex flex-col justify-center bg-banner px-5 py-3 text-banner-foreground">
        <p className="text-base font-bold uppercase leading-tight tracking-wide text-pretty">
          {heading}
        </p>
        <p className="mt-0.5 text-sm font-medium uppercase leading-tight tracking-wide text-banner-muted text-pretty">
          {detail}
        </p>
      </div>
    </div>
  )
}
