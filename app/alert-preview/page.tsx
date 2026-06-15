"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

interface AlertData {
  name: string
  text: string
  sound: string
  image: string
  amount: string
  message: string
}

export default function AlertPreviewPage() {
  const [name, setName] = useState("FacaGomez")
  const [text, setText] = useState("subscribed")
  const [sound, setSound] = useState("https://assets.mixkit.co/active_storage/sfx/2869/2869-84.wav") // Free SFX
  const [image, setImage] = useState("")
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("¡Aguante el Colo Colapinto loco! ¡Que corra el domingo a fondo!")
  const [triggerKey, setTriggerKey] = useState(0)

  const alertContainerRef = useRef<HTMLDivElement>(null)

  const loadPreset = (type: "sub" | "resub" | "gift" | "tip") => {
    switch (type) {
      case "sub":
        setName("Bauti_F1")
        setText("subscribed")
        setAmount("")
        setMessage("¡Vamos Argentina! ¡Hoy largamos de boxes pero ganamos igual!")
        setImage("https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=150&h=150")
        break
      case "resub":
        setName("Martina_GP")
        setText("resubscribed")
        setAmount("12 meses")
        setMessage("Un año metiendo rebajes con esta escudería. ¡Qué locura!")
        setImage("https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150")
        break
      case "gift":
        setName("ElTanoRacing")
        setText("gifted")
        setAmount("5")
        setMessage("")
        setImage("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150")
        break
      case "tip":
        setName("DonMecánico")
        setText("tip")
        setAmount("$15.00 USD")
        setMessage("Tomá master, para comprarle gomas duras a ver si aguantamos la parada.")
        setImage("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150")
        break
    }
  }

  // Inject the custom JS whenever the triggerKey changes, mimicking Botrix execution
  useEffect(() => {
    if (triggerKey === 0) return

    const container = alertContainerRef.current
    if (!container) return

    const banner = container.querySelector(".f1-alert-banner") as HTMLElement
    const alertImg = document.getElementById("alert-img") as HTMLImageElement
    const fallbackIcon = document.getElementById("alert-fallback-icon") as HTMLElement
    
    const metaName = document.getElementById("meta-name")?.textContent?.trim() || ""
    const metaText = document.getElementById("meta-text")?.textContent?.trim() || ""
    const metaAmount = document.getElementById("meta-amount")?.textContent?.trim() || ""
    const metaMessage = document.getElementById("meta-message")?.textContent?.trim() || ""
    const metaImage = document.getElementById("meta-image")?.textContent?.trim() || ""
    const metaSound = document.getElementById("meta-sound")?.textContent?.trim() || ""

    const hasImage = metaImage && metaImage !== "{image}" && metaImage !== ""
    const hasSound = metaSound && metaSound !== "{sound}" && metaSound !== ""
    const hasMessage = metaMessage && metaMessage !== "{message}" && metaMessage !== ""

    const cleanName = metaName && metaName !== "{name}" ? metaName : "Alguien"
    const cleanAmount = metaAmount && metaAmount !== "{amount}" ? metaAmount : ""
    const cleanText = metaText && metaText !== "{text}" ? metaText : "suscrito"
    const textLower = cleanText.toLowerCase()

    let category = "RACE CONTROL"
    let title = `¡NUEVO APORTE!`
    let desc = `Se sumó a boxes`

    if (textLower.includes("gift") || textLower.includes("regaló") || textLower.includes("regalo")) {
      category = "PATROCINIO DE EQUIPO"
      const num = cleanAmount.replace(/[^0-9]/g, "") || "1"
      title = `¡${cleanName} REGALÓ ${num} ${parseInt(num) === 1 ? "SUB" : "SUBS"}!`
      desc = "¡QUÉ TIPAZO, SE PASÓ DE REVOLUCIONES EN ENTRADA A RECTA!"
    } else if (
      textLower.includes("resub") ||
      textLower.includes("re-sub") ||
      textLower.includes("mes") ||
      textLower.includes("month") ||
      textLower.includes("renovó") ||
      (cleanAmount && !cleanAmount.includes("$") && !cleanAmount.includes("USD") && !cleanAmount.includes("ARS") && textLower.includes("suscri"))
    ) {
      category = "RENOVACIÓN DE CONTRATO"
      const months = cleanAmount.replace(/[^0-9]/g, "") || "2"
      title = `¡${cleanName} RENOVÓ POR ${months} MESES!`
      desc = "¡SIGUE FIRME EN LA ESCUDERÍA ACELERANDO A FONDO!"
    } else if (
      cleanAmount &&
      (cleanAmount.includes("$") ||
        cleanAmount.includes("USD") ||
        cleanAmount.includes("ARS") ||
        cleanAmount.includes("EUR") ||
        textLower.includes("donó") ||
        textLower.includes("tip") ||
        textLower.includes("donacion") ||
        textLower.includes("donación"))
    ) {
      category = "APORTE PARA EL MONOPLAZA"
      title = `¡${cleanName} APORTÓ ${cleanAmount}!`
      desc = "¡DIRECTO PARA LA NAFTA Y EL JUEGO DE GOMAS DE CLASIFICACIÓN!"
    } else {
      category = "NUEVO PILOTO EN GRILLA"
      title = `¡${cleanName} SE SUSCRIBIÓ, LOCO!`
      desc = "¡BIENVENIDO A BOXES! SE ACABA DE SUMAR A LA ESCUDERÍA."
    }

    // Update display content
    const catEl = document.getElementById("alert-category")
    const titleEl = document.getElementById("alert-main-title")
    const descEl = document.getElementById("alert-subtitle")
    const msgEl = document.getElementById("alert-user-message")

    if (catEl) catEl.textContent = category
    if (titleEl) titleEl.textContent = title
    if (descEl) descEl.textContent = desc

    if (msgEl) {
      if (hasMessage) {
        msgEl.textContent = `📻 RADIO: "${metaMessage}"`
        msgEl.style.display = "block"
      } else {
        msgEl.style.display = "none"
      }
    }

    if (alertImg && fallbackIcon) {
      if (hasImage) {
        alertImg.src = metaImage
        alertImg.style.display = "block"
        fallbackIcon.style.display = "none"
      } else {
        alertImg.style.display = "none"
        fallbackIcon.style.display = "flex"
      }
    }

    // Play SFX simulation
    if (hasSound) {
      const audio = new Audio(metaSound)
      audio.volume = 0.5
      audio.play().catch((err) => console.log("Audio play blocked", err))
    }

    // Reset styles and trigger animation
    container.classList.remove("alert-show")
    banner.classList.remove("animate-in", "animate-out")
    
    // Force reflow
    void banner.offsetWidth

    container.classList.add("alert-show")
    banner.classList.add("animate-in")

    const timer = setTimeout(() => {
      banner.classList.remove("animate-in")
      banner.classList.add("animate-out")

      const hideTimer = setTimeout(() => {
        container.classList.remove("alert-show")
        banner.classList.remove("animate-out")
      }, 400)

      return () => clearTimeout(hideTimer)
    }, 6500)

    return () => clearTimeout(timer)
  }, [triggerKey])

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100 font-sans p-6">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 flex-1">
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">Live Preview</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">F1-Themed Botrix Alert Dashboard</h1>
          <p className="text-sm text-slate-400">
            Configure the variables below to test the F1 Race Control alert. This page simulates the exact layout, CSS, and JS injected into the Kick/Twitch widget.
          </p>
        </div>

        {/* Workspace layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Controls Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex flex-col gap-4 shadow-xl">
            <h2 className="text-lg font-bold border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Variables Config</span>
              <span className="text-xs font-normal text-slate-400">Simulates Botrix values</span>
            </h2>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 mb-2">
              <Button size="sm" variant="secondary" onClick={() => loadPreset("sub")}>
                Preset Sub
              </Button>
              <Button size="sm" variant="secondary" onClick={() => loadPreset("resub")}>
                Preset Re-Sub
              </Button>
              <Button size="sm" variant="secondary" onClick={() => loadPreset("gift")}>
                Preset Gift Sub
              </Button>
              <Button size="sm" variant="secondary" onClick={() => loadPreset("tip")}>
                Preset Tip ($)
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400">Amount</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="e.g. 5, $10.00 USD, 6 meses"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400">Text (Botrix event type hint)</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-red-500 transition-colors"
                placeholder="subscribed, resubscribed, gifted, tip"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400">User Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-sm text-slate-100 h-20 resize-none focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400">Image URL (Optional)</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-red-500 transition-colors text-xs"
                placeholder="Leave blank for checkered flag icon"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400">Sound URL (Optional)</label>
              <input
                type="text"
                value={sound}
                onChange={(e) => setSound(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-red-500 transition-colors text-xs"
              />
            </div>

            <Button
              onClick={() => setTriggerKey((k) => k + 1)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 mt-2 tracking-wider uppercase text-sm"
            >
              🏁 Trigger Alert! 🏁
            </Button>
          </div>

          {/* Render Stage */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold border-b border-slate-800 pb-2">Overlay Screen (Chroma-Key Preview)</h2>
            
            <div className="relative aspect-video w-full rounded-lg border border-slate-800 bg-green-500 flex items-center justify-center overflow-hidden shadow-2xl">
              {/* Chroma screen background label */}
              <div className="absolute top-2 left-2 text-[10px] bg-slate-900/80 px-2 py-0.5 rounded text-slate-400 font-mono select-none">
                OBS Screen (Green Screen / Transparent)
              </div>

              {/* Injected HTML Block structure */}
              <div
                ref={alertContainerRef}
                id="botrix-alert-container"
                className="alert-hidden w-full px-4"
              >
                {/* Simulated variables injected from the react state */}
                <div id="meta-data" style={{ display: "none" }}>
                  <span id="meta-name">{name}</span>
                  <span id="meta-text">{text}</span>
                  <span id="meta-amount">{amount}</span>
                  <span id="meta-message">{message}</span>
                  <span id="meta-image">{image}</span>
                  <span id="meta-sound">{sound}</span>
                </div>

                <div className="f1-alert-banner">
                  {/* Left graphic / Image block */}
                  <div className="f1-alert-badge">
                    <div className="f1-image-wrapper">
                      <img id="alert-img" src="" alt="Alert Image" style={{ display: "none" }} />
                      <div id="alert-fallback-icon" className="fallback-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 21V3H12L12.4 5H20V16H14L13.6 14H7V21H5Z" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                    <div className="badge-stripe"></div>
                  </div>

                  {/* Right text block */}
                  <div className="f1-alert-body">
                    <div className="f1-alert-header">
                      <span id="alert-category" className="category-text">RACE CONTROL</span>
                      <span className="header-indicator"></span>
                    </div>
                    <div className="f1-alert-content">
                      <h1 id="alert-main-title" className="alert-title">¡ALERTA EN GRILLA!</h1>
                      <p id="alert-subtitle" className="alert-desc">Esperando señal de largada...</p>
                      <p id="alert-user-message" className="alert-msg" style={{ display: "none" }}></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 text-xs text-slate-400 leading-relaxed">
              <span className="font-bold text-slate-300">Tip:</span> The alert expands from the center with a slanted cut, just like the actual F1 broadcast graphics. The user message behaves like a team radio transmission in italic yellow monospace.
            </div>
          </div>
        </div>

        {/* Embedded Style rules for the alert (matching our CSS output) */}
        <style jsx global>{`
          .alert-hidden {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease;
          }

          .alert-hidden.alert-show {
            opacity: 1;
            pointer-events: auto;
          }

          .f1-alert-banner {
            display: flex;
            width: 100%;
            background: linear-gradient(135deg, #0a1d31 0%, #0f2a44 100%);
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(225, 6, 0, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.15);
            position: relative;
            will-change: clip-path, opacity;
            transform: translateZ(0);
          }

          .f1-alert-banner.animate-in {
            animation: f1ExpandIn 1.100s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .f1-alert-banner.animate-out {
            animation: f1FadeOut 0.35s ease-out forwards;
          }

          @keyframes f1ExpandIn {
            0% {
              clip-path: polygon(60% 0%, 62% 0%, 51% 100%, 49% 100%);
              opacity: 0.5;
            }
            100% {
              clip-path: polygon(0% 0%, 111% 0%, 100% 100%, -11% 100%);
              opacity: 1;
            }
          }

          @keyframes f1FadeOut {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0.95);
            }
          }

          .f1-alert-badge {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100px;
            background-color: #0a1d31;
            padding: 12px;
            position: relative;
            flex-shrink: 0;
            border-right: 1px solid rgba(255, 255, 255, 0.15);
          }

          .f1-image-wrapper {
            position: relative;
            width: 60px;
            height: 60px;
            border-radius: 4px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.05);
          }

          .f1-image-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 2;
          }

          .fallback-icon {
            position: absolute;
            color: #e10600;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
          }

          .fallback-icon svg {
            width: 100%;
            height: 100%;
          }

          .badge-stripe {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background-color: #e10600;
          }

          .f1-alert-body {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            padding: 14px 20px;
            justify-content: center;
            text-align: left;
          }

          .f1-alert-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 4px;
          }

          .category-text {
            font-size: 10px;
            font-weight: 900;
            letter-spacing: 0.15em;
            color: #e10600;
            text-transform: uppercase;
          }

          .header-indicator {
            height: 2.5px;
            width: 24px;
            background-color: #e10600;
            display: inline-block;
          }

          .f1-alert-content {
            display: flex;
            flex-direction: column;
          }

          .alert-title {
            font-size: 18px;
            font-weight: 800;
            color: #ffffff;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            line-height: 1.2;
          }

          .alert-desc {
            font-size: 12px;
            font-weight: 600;
            color: #c7d2dd;
            margin: 2px 0 0 0;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            line-height: 1.3;
          }

          .alert-msg {
            font-family: monospace;
            font-size: 12px;
            color: #ffeb3b;
            background: rgba(0, 0, 0, 0.3);
            border-left: 2.5px solid #c7d2dd;
            padding: 5px 10px;
            margin: 8px 0 0 0;
            border-radius: 0 4px 4px 0;
            font-style: italic;
            word-break: break-word;
          }
        `}</style>
      </div>
    </main>
  )
}
