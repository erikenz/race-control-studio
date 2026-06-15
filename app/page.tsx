"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FerrariRadioAlert,
  ferrariRadioStyles,
} from "@/components/alerts/ferrari-radio";
import { FollowerAlert } from "@/components/alerts/follower-alert";
import { GiftSubAlert } from "@/components/alerts/gift-sub-alert";
import { HostAlert } from "@/components/alerts/host-alert";
import { KickAlert } from "@/components/alerts/kick-alert";
import { f1LogoSvg, sharedStyles } from "@/components/alerts/shared";
import { SubAlert } from "@/components/alerts/sub-alert";
import { TipAlert } from "@/components/alerts/tip-alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// biome-ignore lint/suspicious/noExplicitAny: alert components can be any React component type
const alertComponents: Record<string, any> = {
  followers: FollowerAlert,
  "gift-sub": GiftSubAlert,
  host: HostAlert,
  kicks: KickAlert,
  subscription: SubAlert,
  "tip-donate": TipAlert,
};

interface PresetData {
  message: string;
  name: string;
  template: string;
  text: string;
}

const PRESETS: Record<string, PresetData> = {
  followers: {
    message: "",
    name: "Rookie_Driver",
    template: "followers",
    text: "Grid entry - green light on track!",
  },
  "gift-sub": {
    message: "",
    name: "Team_Principal",
    template: "gift-sub",
    text: "Sponsored 5 drivers in the pit lane!",
  },
  host: {
    message: "",
    name: "Safety_Car",
    template: "host",
    text: "Restart incident: joined force with 120 viewers!",
  },
  kicks: {
    message: "Launch control active! First row start on Kick!",
    name: "KickStreamer",
    template: "kicks",
    text: "sent 500 Kicks!",
  },
  subscription: {
    message: "Staying with the team. 12 months completed!",
    name: "HAMILTON_44",
    template: "subscription",
    text: "stayed with the team for 12 months!",
  },
  "tip-donate": {
    message: "For tyre compound upgrade!",
    name: "Pit_Crew",
    template: "tip-donate",
    text: "tipped $15.00 USD",
  },
};

const PRESET_LABELS: Record<string, string> = {
  followers: "Followers",
  "gift-sub": "Gift Sub",
  host: "Host",
  kicks: "KICKs",
  subscription: "Subscription",
  "tip-donate": "Tip/Donate",
};

interface QuickPresetsDeckProps {
  activePreset: string;
  onLoadPreset: (presetType: string) => void;
}

function QuickPresetsDeck({
  activePreset,
  onLoadPreset,
}: QuickPresetsDeckProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {Object.keys(PRESETS).map((key) => {
        const isActive = activePreset === key;
        return (
          <Button
            className={`h-8 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
              isActive
                ? "border-[#DF0631] bg-[#DF0631]/10 text-[#DF0631] shadow-[0_0_8px_rgba(223,6,49,0.2)]"
                : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:bg-slate-800/40 hover:text-slate-200"
            }`}
            key={key}
            onClick={() => onLoadPreset(key)}
            size="sm"
            variant="outline"
          >
            {PRESET_LABELS[key] || key}
          </Button>
        );
      })}
    </div>
  );
}

interface QuickInstructionsCardProps {
  botrixTab: string;
}

function QuickInstructionsCard({ botrixTab }: QuickInstructionsCardProps) {
  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-slate-900/80 bg-slate-955/50 p-4">
      <h4 className="flex items-center gap-1.5 font-bold font-mono text-slate-300 text-xs uppercase tracking-widest">
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
        Botrix Setup Guide
      </h4>
      <ol className="list-decimal space-y-2 pl-4 text-slate-400 text-xs leading-normal">
        <li>Copy the widget HTML code using the primary red button above.</li>
        <li>
          Open your Botrix Dashboard and go to the{" "}
          <strong className="text-slate-200">Alerts</strong> tab.
        </li>
        <li>
          Select the <strong className="text-[#DF0631]">{botrixTab}</strong>{" "}
          category.
        </li>
        <li>
          Scroll down, enable{" "}
          <strong className="text-slate-200">Custom Code</strong>, and paste
          into the <strong className="text-slate-200">HTML</strong> tab.
        </li>
        <li>
          Keep the <strong className="text-slate-200">CSS</strong> and{" "}
          <strong className="text-slate-200">JS</strong> boxes completely empty.
        </li>
      </ol>
    </div>
  );
}

interface AlertPreviewFeedProps {
  AlertComponent: React.ComponentType<{ name: string; text: string }>;
  bgColor: string;
  message: string;
  name: string;
  persistent: boolean;
  selectedTemplate: string;
  setBgColor: (val: string) => void;
  setShowGrid: (val: boolean) => void;
  showGrid: boolean;
  text: string;
  triggerKey: number;
}

function AlertPreviewFeed({
  bgColor,
  setBgColor,
  showGrid,
  setShowGrid,
  selectedTemplate,
  triggerKey,
  AlertComponent,
  name,
  text,
  message,
  persistent,
}: AlertPreviewFeedProps) {
  const bgClasses: Record<string, string> = {
    black: "bg-slate-955",
    chroma: "bg-[#00ff00]",
  };
  const bgClass = bgClasses[bgColor] || "bg-grid-pattern bg-slate-900";

  const allowsMessage = ["subscription", "tip-donate", "kicks"].includes(
    selectedTemplate
  );
  const showRadio = allowsMessage && message.trim() !== "";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="flex items-center gap-1.5 font-bold font-mono text-slate-350 text-xs uppercase tracking-wider">
          OBS Overlay Canvas Preview
        </h2>

        {/* Viewport Settings */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Background Selector */}
          <div className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-800 bg-slate-955 p-0.5">
            {["chroma", "grid", "black"].map((bg) => (
              <button
                className={`rounded px-2.5 py-1 font-bold font-mono text-[10px] uppercase transition ${
                  bgColor === bg
                    ? "bg-[#e10600] text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                key={bg}
                onClick={() => setBgColor(bg)}
                type="button"
              >
                {bg}
              </button>
            ))}
          </div>

          {/* Alignment Grid Toggle */}
          <div className="flex items-center gap-2">
            <input
              checked={showGrid}
              className="h-4 w-4 cursor-pointer rounded border border-slate-800 bg-slate-955 text-[#DF0631] accent-[#DF0631] focus:ring-1 focus:ring-red-500"
              id="grid-toggle"
              onChange={(e) => setShowGrid(e.target.checked)}
              type="checkbox"
            />
            <Label
              className="cursor-pointer select-none font-mono text-[10px] text-slate-400 uppercase hover:text-slate-200"
              htmlFor="grid-toggle"
            >
              Alignment Grid
            </Label>
          </div>
        </div>
      </div>

      <div
        className={`relative flex aspect-video w-full overflow-hidden rounded-xl border border-slate-800/90 shadow-2xl transition-all duration-300 ${bgClass}`}
      >
        {/* Calibration lines */}
        {showGrid && (
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="absolute top-1/2 right-0 left-0 h-[1px] border-white/10 border-t border-dashed bg-white/20" />
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] border-white/10 border-l border-dashed bg-white/20" />
            <div className="pointer-events-none absolute top-1/4 right-1/4 bottom-1/4 left-1/4 rounded border border-white/5 border-dashed" />
          </div>
        )}

        {/* Scanlines / Television Effect overlay */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-scanlines opacity-[0.04]" />

        {/* Persistent mode style overrides inside simulator */}
        {persistent && (
          <style
            // biome-ignore lint/security/noDangerouslySetInnerHtml: static preview styles override
            dangerouslySetInnerHTML={{
              __html: `
            .f1-alert-banner, .ferrari-radio-card {
              animation: none !important;
              opacity: 1 !important;
              clip-path: polygon(0% 0%, 111% 0%, 100% 100%, -11% 100%) !important;
            }
            .ferrari-radio-card {
              clip-path: none !important;
            }
          `,
            }}
          />
        )}

        {/* Native Component Render stage */}
        <div className="relative z-10 h-full w-full">
          {triggerKey > 0 && (
            <div className="h-full w-full" key={triggerKey}>
              {/* Standard F1 Race Control Alert (Top Center) */}
              <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-[4%]">
                <div className="pointer-events-auto scale-[0.85] transform transition duration-300 sm:scale-100">
                  <AlertComponent name={name} text={text} />
                </div>
              </div>

              {/* Ferrari Radio Alert (Bottom Right) */}
              {showRadio && (
                <div className="pointer-events-none absolute inset-0 flex items-end justify-end pr-[6%] pb-[6%]">
                  <div className="pointer-events-auto scale-[0.85] transform transition duration-300 sm:scale-100">
                    <FerrariRadioAlert
                      message={message}
                      name={name}
                      text={message}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getCombinedBotrixHtml(template: string, persistent: boolean) {
  return `<div class="container {disposition} {transition}">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Orbitron:wght@900&family=Inter:wght@400;550;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}
    
    .f1-alert-banner {
      animation: ${persistent ? "none !important" : "f1PlayAlert 8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important"};
      ${persistent ? "opacity: 1 !important; clip-path: polygon(0% 0%, 111% 0%, 100% 100%, -11% 100%) !important;" : ""}
    }
    
    ${ferrariRadioStyles}
    
    .ferrari-radio-card {
      animation: ${persistent ? "none !important" : "f1PlayAlert 8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important"};
      ${persistent ? "opacity: 1 !important; clip-path: none !important;" : ""}
    }
    
    /* Layout wrappers to handle alignment correctly in the same screen overlay */
    .overlay-grid-container {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      pointer-events: none !important;
    }
    
    .standard-layout-wrapper {
      position: absolute !important;
      top: 40px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      pointer-events: auto !important;
    }
    
    .radio-layout-wrapper {
      position: absolute !important;
      bottom: 80px !important;
      right: 80px !important;
      pointer-events: auto !important;
    }
  </style>

  <template id="botrix-data">
    <span id="name-val">{name}</span>
    <span id="text-val">{text}</span>
    <span id="message-val">{message}</span>
  </template>

  <div class="overlay-grid-container">
    <!-- Standard Alert Banner (Always displayed) -->
    <div id="standard-alert-wrap" class="standard-layout-wrapper">
      <div class="f1-alert-banner">
        <div class="f1-alert-badge">
          <div class="f1-logo-content">
            ${f1LogoSvg}
          </div>
        </div>
        <div class="f1-alert-body">
          <p class="f1-heading-text" id="alert-heading"></p>
          <p class="f1-detail-text" id="alert-detail"></p>
        </div>
      </div>
    </div>

    <!-- Ferrari Radio Alert Banner (Conditionally displayed via JS if {message} is filled) -->
    <div id="radio-alert-wrap" class="radio-layout-wrapper" style="display: none;">
      <div class="ferrari-radio-card">
        <div class="ferrari-card-header">
          <div class="ferrari-header-bg">
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
          </div>
          <div class="ferrari-header-content">
            <div class="ferrari-card-name-row">
              <span class="ferrari-card-name" id="ferrari-name"></span>
            </div>
            <div class="ferrari-header-bottom-row">
              <div class="ferrari-card-number-wrapper">
                <span class="ferrari-card-number">16</span>
              </div>
              <div class="ferrari-header-right-bottom">
                <span class="ferrari-card-radio">RADIO</span>
                <div class="ferrari-card-shield-wrapper">
                  <svg viewBox="0 0 100 120" class="ferrari-shield-svg">
                    <title>Ferrari Shield</title>
                    <path d="M10 10 C30 10 30 5 50 5 C70 5 70 10 90 10 C90 60 85 90 50 115 C15 90 10 60 10 10 Z" fill="#ffe100" stroke="#000000" stroke-width="3" />
                    <path d="M11 11 C30 11 30 6 50 6 C70 6 70 11 89 11 L89 19 C70 19 70 14 50 14 C30 14 30 19 11 19 Z" fill="#000000" />
                    <rect x="12" y="11" width="25" height="7" fill="#008f39" />
                    <rect x="37" y="11" width="26" height="7" fill="#ffffff" />
                    <rect x="63" y="11" width="25" height="7" fill="#e10600" />
                    <path d="M48 25 C45 30 40 35 40 45 C40 55 45 60 48 65 C45 70 42 75 42 85 C45 90 48 90 52 90 C50 80 52 75 55 70 C58 75 60 85 62 85 C65 85 68 80 65 70 C60 65 58 55 58 45 C58 35 52 30 48 25 Z" fill="#000000" />
                    <path d="M50 30 C51 32 52 35 51 38 C50 40 48 41 46 41 C48 42 50 43 49 46 C48 48 45 50 43 50 C45 52 48 55 48 58 C48 62 46 65 44 68 C47 70 50 73 50 78 C50 82 48 85 47 88 C49 88 52 87 53 84 C54 81 53 78 52 75 C54 77 56 80 57 83 C58 86 58 89 57 91 C59 90 61 88 61 85 C61 82 59 79 57 76 C59 75 61 74 62 72 C63 70 63 68 62 66 C60 67 58 68 56 68 C58 64 59 60 59 55 C59 48 56 42 52 37 C54 36 56 35 57 33 C56 31 54 30 52 30 C51 28 50 26 51 24 C50 25 49 26 49 27 C49 28 50 29 50 30 Z" fill="#000000" />
                    <text x="32" y="107" font-family="sans-serif" font-size="12" font-weight="900" fill="#000000">S</text>
                    <text x="56" y="107" font-family="sans-serif" font-size="12" font-weight="900" fill="#000000">F</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ferrari-card-body">
          <p class="ferrari-message-text" id="ferrari-message"></p>
        </div>
      </div>
    </div>
  </div>

  <script>
    (function() {
      const template = document.getElementById('botrix-data');
      if (template) {
        const nameVal = template.content.getElementById('name-val').textContent.trim();
        const textVal = template.content.getElementById('text-val').textContent.trim();
        const msgVal = template.content.getElementById('message-val').textContent.trim();
        
        // Populate Standard Alert values safely
        const headingEl = document.getElementById('alert-heading');
        const detailEl = document.getElementById('alert-detail');
        const templateType = "${template}";
        
        let headingText = "RACE CONTROL: " + nameVal.toUpperCase();
        if (templateType === "subscription") {
          headingText += " RENEWAL INCIDENT";
        } else if (templateType === "tip-donate") {
          headingText += " PIT STOP INCIDENT";
        } else if (templateType === "kicks") {
          headingText += " KICK INCIDENT";
        } else {
          headingText += " INCIDENT";
        }
        
        if (headingEl) headingEl.textContent = headingText;
        if (detailEl) detailEl.textContent = textVal.toUpperCase();
        
        // Check if custom message exists to show Ferrari Radio
        const hasMessage = msgVal && 
                           msgVal !== "{message}" && 
                           msgVal.trim() !== "" && 
                           msgVal.trim() !== '""' && 
                           msgVal.trim() !== '\\"\\"' &&
                           msgVal.replace(/RADIO:|📻/gi, "").replace(/['"\\s]/g, "") !== "";

        const radioWrap = document.getElementById("radio-alert-wrap");

        if (hasMessage) {
          if (radioWrap) radioWrap.style.display = "block";
          
          const nameEl = document.getElementById('ferrari-name');
          const msgEl = document.getElementById('ferrari-message');
          
          if (nameEl) nameEl.textContent = nameVal.toUpperCase();
          if (msgEl) msgEl.textContent = '"' + msgVal.replace(/^["']|["']$/g, '').trim() + '"';
          
          if (nameVal) {
            const numMatch = nameVal.match(/\\d+/);
            if (numMatch) {
              const numEl = document.querySelector('.ferrari-card-number');
              if (numEl) numEl.textContent = numMatch[0].slice(0, 2);
            }
          }
        } else {
          if (radioWrap) radioWrap.style.display = "none";
        }
      }
    })();
  </script>
</div>`;
}

export default function AlertPreviewPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("subscription");
  const [name, setName] = useState("HAMILTON_44");
  const [text, setText] = useState("stayed with the team for 12 months!");
  const [message, setMessage] = useState(
    "Staying with the team. 12 months completed!"
  );
  const [triggerKey, setTriggerKey] = useState(1);
  const [copied, setCopied] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [bgColor, setBgColor] = useState("grid"); // "chroma", "grid", "black"
  const [activePreset, setActivePreset] = useState("subscription");
  const [persistent, setPersistent] = useState(false);

  const loadPreset = (presetType: string) => {
    const preset = PRESETS[presetType];
    if (preset) {
      setActivePreset(presetType);
      setSelectedTemplate(preset.template);
      setName(preset.name);
      setText(preset.text);
      setMessage(preset.message);
      setTriggerKey((k) => k + 1);
    }
  };

  const handleTrigger = () => {
    setTriggerKey((k) => k + 1);
  };

  const handleCopy = () => {
    const allowsMessage = ["subscription", "tip-donate", "kicks"].includes(
      selectedTemplate
    );
    const code = allowsMessage
      ? getCombinedBotrixHtml(selectedTemplate, persistent)
      : alertComponents[selectedTemplate].getBotrixHtml();

    let finalCode = code;
    if (persistent && !allowsMessage) {
      finalCode = finalCode.replace(
        "animation: f1PlayAlert 8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important;",
        "animation: none !important; opacity: 1 !important; clip-path: polygon(0% 0%, 111% 0%, 100% 100%, -11% 100%) !important;"
      );
    }

    navigator.clipboard.writeText(finalCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2050);
  };

  const allowsMessage = ["subscription", "tip-donate", "kicks"].includes(
    selectedTemplate
  );
  const AlertComponent = alertComponents[selectedTemplate] || SubAlert;

  let rawCode = "";
  if (allowsMessage) {
    rawCode = getCombinedBotrixHtml(selectedTemplate, persistent);
  } else if (alertComponents[selectedTemplate]) {
    rawCode = alertComponents[selectedTemplate].getBotrixHtml();
  }

  let compiledCode = rawCode;
  if (persistent && !allowsMessage) {
    compiledCode = compiledCode.replace(
      "animation: f1PlayAlert 8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important;",
      "animation: none !important; opacity: 1 !important; clip-path: polygon(0% 0%, 111% 0%, 100% 100%, -11% 100%) !important;"
    );
  }

  const botrixTabName = PRESET_LABELS[activePreset] || "Alerts";

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-grid-pattern bg-slate-955 text-slate-100">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static trusted styles */}
      <style dangerouslySetInnerHTML={{ __html: sharedStyles }} />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-20 border-slate-800/80 border-b bg-slate-955/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[95vw] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#e10600] shadow-[0_0_8px_#e10600]" />
            <span className="font-black font-mono text-red-500 text-sm uppercase tracking-widest">
              Race Control Studio
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              className="font-bold text-red-500 text-xs uppercase tracking-wider transition hover:text-red-400"
              href="/"
            >
              Studio
            </Link>
            <Link
              className="font-bold text-slate-400 text-xs uppercase tracking-wider transition hover:text-slate-100"
              href="/instructions"
            >
              Instructions
            </Link>
          </nav>
        </div>
      </header>

      {/* Background design elements */}
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#e10600]/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px]" />

      {/* Main Workspace Container */}
      <div className="z-10 mx-auto flex w-full max-w-[95vw] flex-1 flex-col gap-6 p-4 md:p-6">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* LEFT: Controls Column (col-span-4) */}
          <div className="relative flex flex-col gap-5 rounded-xl border border-slate-800/85 bg-slate-900/40 p-5 shadow-2xl backdrop-blur-md md:p-6 lg:col-span-4 xl:col-span-3">
            <div className="absolute top-0 left-6 h-[3px] w-24 bg-[#e10600]" />

            <h2 className="flex items-center justify-between border-slate-800/60 border-b pb-3 font-extrabold text-lg uppercase tracking-wide">
              <span>Alert Configurator</span>
              <span className="rounded bg-red-500/10 px-2 py-0.5 font-mono font-semibold text-red-500 text-xs">
                FORMULA-1
              </span>
            </h2>

            {/* Step 1: Alert Presets */}
            <div className="flex flex-col gap-2">
              <Label className="font-bold font-mono text-slate-400 text-xs uppercase tracking-wider">
                Test Alerts Presets
              </Label>
              <QuickPresetsDeck
                activePreset={activePreset}
                onLoadPreset={loadPreset}
              />
            </div>

            {/* Step 2: Input Variables */}
            <div className="flex flex-col gap-4 border-slate-800/60 border-t pt-4">
              {/* Driver Name Input */}
              <div className="flex flex-col gap-1.5">
                <Label
                  className="font-bold font-mono text-slate-300 text-xs uppercase tracking-wider"
                  htmlFor="name-input"
                >
                  Driver Name
                </Label>
                <Input
                  className="h-9 border-slate-800 bg-slate-955 text-slate-100 text-sm hover:border-slate-700 focus:ring-1 focus:ring-red-500"
                  id="name-input"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. LEWIS_44"
                  type="text"
                  value={name}
                />
              </div>

              {/* Alert Text Input */}
              <div className="flex flex-col gap-1.5">
                <Label
                  className="font-bold font-mono text-slate-300 text-xs uppercase tracking-wider"
                  htmlFor="text-input"
                >
                  Alert Text (Configured in Botrix Panel)
                </Label>
                <Input
                  className="h-9 border-slate-800 bg-slate-955 text-slate-100 text-sm hover:border-slate-700 focus:ring-1 focus:ring-red-500"
                  id="text-input"
                  onChange={(e) => setText(e.target.value)}
                  placeholder="e.g. subscribed"
                  type="text"
                  value={text}
                />
              </div>

              {/* Custom Message Input (Conditional) */}
              {allowsMessage && (
                <div className="flex flex-col gap-1.5">
                  <Label
                    className="font-bold font-mono text-slate-300 text-xs uppercase tracking-wider"
                    htmlFor="message-input"
                  >
                    Custom User Message (Radio Message)
                  </Label>
                  <Input
                    className="h-9 border-slate-800 bg-slate-955 text-slate-100 text-sm hover:border-slate-700 focus:ring-1 focus:ring-red-500"
                    id="message-input"
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Staying with the team. 12 months completed!"
                    type="text"
                    value={message}
                  />
                </div>
              )}

              {/* Persistent Mode Toggle */}
              <div className="mt-1 flex items-center gap-2">
                <input
                  checked={persistent}
                  className="h-4 w-4 cursor-pointer rounded border border-slate-800 bg-slate-955 text-[#DF0631] accent-[#DF0631] focus:ring-1 focus:ring-red-500"
                  id="persistent-toggle"
                  onChange={(e) => setPersistent(e.target.checked)}
                  type="checkbox"
                />
                <Label
                  className="cursor-pointer select-none font-medium text-slate-400 text-xs hover:text-slate-200"
                  htmlFor="persistent-toggle"
                >
                  Persistent Mode (keep alert visible for setup)
                </Label>
              </div>
            </div>

            {/* Step 3: Export buttons */}
            <div className="flex flex-col gap-3 border-slate-800/60 border-t pt-4">
              <div className="flex gap-3">
                <Button
                  className={`flex-1 rounded-lg py-2.5 font-extrabold text-xs uppercase tracking-wider transition-all active:scale-[0.98] ${
                    copied
                      ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:bg-emerald-700"
                      : "bg-[#DF0631] text-white shadow-[0_4px_12px_rgba(223,6,49,0.2)] hover:bg-[#c3052a]"
                  }`}
                  onClick={handleCopy}
                >
                  {copied ? "🏁 COPIED HTML!" : "📋 COPY HTML"}
                </Button>

                <Button
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-800/40 py-2.5 font-extrabold text-slate-200 text-xs uppercase tracking-wider transition-all hover:bg-slate-700 hover:text-white active:scale-[0.98]"
                  onClick={handleTrigger}
                >
                  🔄 REPLAY PREVIEW
                </Button>
              </div>

              <Button
                className="border-slate-800 py-1.5 font-mono text-slate-400 text-xs uppercase tracking-wider hover:bg-slate-800/40 hover:text-slate-200"
                onClick={() => setShowCode(!showCode)}
                size="sm"
                variant="outline"
              >
                {showCode
                  ? "Hide Compiled Widget Code"
                  : "Show Compiled Widget Code"}
              </Button>
            </div>

            {/* Help instructions card */}
            <QuickInstructionsCard botrixTab={botrixTabName} />
          </div>

          {/* RIGHT: Viewport Column (col-span-8) */}
          <div className="flex flex-col gap-4 lg:col-span-8 xl:col-span-9">
            <AlertPreviewFeed
              AlertComponent={AlertComponent}
              bgColor={bgColor}
              message={message}
              name={name}
              persistent={persistent}
              selectedTemplate={selectedTemplate}
              setBgColor={setBgColor}
              setShowGrid={setShowGrid}
              showGrid={showGrid}
              text={text}
              triggerKey={triggerKey}
            />

            {/* Code Inspection Area */}
            {showCode && (
              <div className="relative flex flex-col gap-3 rounded-xl border border-slate-850 bg-slate-955 p-4 shadow-inner">
                <div className="flex items-center justify-between border-slate-900 border-b pb-2">
                  <span className="font-bold font-mono text-slate-400 text-xs uppercase tracking-wider">
                    Compiled HTML Export Block
                  </span>
                  <button
                    className="font-bold font-mono text-[#DF0631] text-xs uppercase tracking-widest hover:text-red-400"
                    onClick={handleCopy}
                    type="button"
                  >
                    Copy Output
                  </button>
                </div>
                <pre className="scrollbar-thin scrollbar-thumb-slate-800 max-h-[300px] overflow-x-auto rounded-lg border border-slate-900/80 bg-slate-900/60 p-3 font-mono text-slate-355 text-xs">
                  <code>{compiledCode}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
