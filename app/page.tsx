"use client"

import { useState } from "react"
import { RaceControlBanner } from "@/components/race-control-banner"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [show, setShow] = useState(true)
  // Bumping the key remounts the banner so the expand-in animation replays.
  const [replayKey, setReplayKey] = useState(0)

  function replay() {
    setShow(true)
    setReplayKey((k) => k + 1)
  }

  return (
    <main className="flex min-h-svh flex-col bg-foreground">
      {/* Banner stage */}
      <div className="flex flex-1 items-start justify-center px-4 pt-16">
        <RaceControlBanner key={replayKey} show={show} />
      </div>

      {/* Control tools */}
      <div className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-6">
          <p className="text-sm font-medium text-muted-foreground">Banner controls</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button onClick={replay}>Replay (expand in)</Button>
            <Button variant="secondary" onClick={() => setShow(true)} disabled={show}>
              Show
            </Button>
            <Button variant="outline" onClick={() => setShow(false)} disabled={!show}>
              Hide (fade out)
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
