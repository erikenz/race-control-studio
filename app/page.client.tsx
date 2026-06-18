"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { FollowerAlert } from "@/components/alerts/follower-alert";
import { GiftSubAlert } from "@/components/alerts/gift-sub-alert";
import { HostAlert } from "@/components/alerts/host-alert";
import { KickAlert } from "@/components/alerts/kick-alert";
import { RadioAlert, radioAlertStyles } from "@/components/alerts/radio-alert";
import {
  type AlertProps,
  f1LogoSvg,
  GithubIcon,
  sharedStyles,
} from "@/components/alerts/shared";
import { SubAlert } from "@/components/alerts/sub-alert";
import { TipAlert } from "@/components/alerts/tip-alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TEAM_RADIO_CONFIGS } from "@/lib/radio-config";
import { PRESET_LABELS, PRESETS, useAppStore } from "@/lib/store";

function resolveHeading(
  template: string,
  name: string,
  text: string,
  message: string
): string {
  return template
    .replace(/\{name\}/g, name.toUpperCase())
    .replace(/\{text\}/g, text.toUpperCase())
    .replace(/\{message\}/g, message.toUpperCase());
}

export type AlertComponentType = ComponentType<AlertProps> & {
  getBotrixHtml: (headingTemplate?: string) => string;
};

const alertComponents: Record<string, AlertComponentType> = {
  followers: FollowerAlert,
  "gift-sub": GiftSubAlert,
  host: HostAlert,
  kicks: KickAlert,
  subscription: SubAlert,
  "tip-donate": TipAlert,
};

const BG_CLASSES: Record<string, string> = {
  black: "bg-slate-955",
  chroma: "bg-[#00ff00]",
};

function QuickPresetsDeck() {
  const activePreset = useAppStore((s) => s.activePreset);
  const loadPreset = useAppStore((s) => s.loadPreset);
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
            onClick={() => loadPreset(key)}
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

function QuickInstructionsCard() {
  const activePreset = useAppStore((s) => s.activePreset);
  const botrixTab = PRESET_LABELS[activePreset] || "Alerts";
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

function AlertPreviewFeed({
  AlertComponent,
}: {
  AlertComponent: ComponentType<AlertProps>;
}) {
  const bgColor = useAppStore((s) => s.bgColor);
  const setBgColor = useAppStore((s) => s.setBgColor);
  const showGrid = useAppStore((s) => s.showGrid);
  const setShowGrid = useAppStore((s) => s.setShowGrid);
  const selectedTemplate = useAppStore((s) => s.selectedTemplate);
  const triggerKey = useAppStore((s) => s.triggerKey);
  const name = useAppStore((s) => s.name);
  const text = useAppStore((s) => s.text);
  const message = useAppStore((s) => s.message);
  const persistent = useAppStore((s) => s.persistent);
  const headingTemplate = useAppStore((s) => s.headingTemplate);
  const activePreviewTeam = useAppStore((s) => s.activePreviewTeam);
  const heading = resolveHeading(headingTemplate, name, text, message);
  const bgClass = BG_CLASSES[bgColor] || "bg-grid-pattern bg-slate-900";

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
              aria-label="Alignment Grid"
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
            <div className="absolute top-1/2 right-0 left-0 h-px border-white/10 border-t border-dashed bg-white/20" />
            <div className="absolute top-0 bottom-0 left-1/2 w-px border-white/10 border-l border-dashed bg-white/20" />
            <div className="pointer-events-none absolute top-1/4 right-1/4 bottom-1/4 left-1/4 rounded border border-white/5 border-dashed" />
          </div>
        )}

        {/* Scanlines / Television Effect overlay */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-scanlines opacity-[0.04]" />

        {/* Persistent mode style overrides inside simulator */}
        {persistent && (
          <style>
            {`
            .f1-alert-banner, .radio-card {
              animation: none !important;
              opacity: 1 !important;
              clip-path: polygon(0% 0%, 111% 0%, 100% 100%, -11% 100%) !important;
            }
            .radio-card {
              clip-path: none !important;
            }
            `}
          </style>
        )}

        {/* Native Component Render stage */}
        <div className="relative z-10 h-full w-full">
          {triggerKey > 0 && (
            <div className="h-full w-full" key={triggerKey}>
              {/* Standard F1 Race Control Alert (Top Center) */}
              <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-[4%]">
                <div className="pointer-events-auto scale-[0.85] transform transition duration-300 sm:scale-100">
                  <AlertComponent heading={heading} name={name} text={text} />
                </div>
              </div>

              {/* Radio Alert (Bottom Right) */}
              {showRadio && (
                <div className="pointer-events-none absolute inset-0 flex items-end justify-end pr-[6%] pb-[6%]">
                  <div className="pointer-events-auto scale-[0.85] transform transition duration-300 sm:scale-100">
                    <RadioAlert
                      message={message}
                      name={name}
                      team={activePreviewTeam}
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

function getCombinedBotrixHtml(
  _template: string,
  persistent: boolean,
  radioSkinMode: "specific" | "random-all" | "random-selected",
  selectedRadioSkins: string[],
  radioTeam: string,
  headingTemplate: string
) {
  let allowedTeams: string[];
  if (radioSkinMode === "specific") {
    allowedTeams = [radioTeam];
  } else if (radioSkinMode === "random-all") {
    allowedTeams = Object.keys(TEAM_RADIO_CONFIGS);
  } else {
    allowedTeams =
      selectedRadioSkins.length > 0 ? selectedRadioSkins : ["ferrari"];
  }

  const defaultTeamKey = allowedTeams[0] || "ferrari";
  const defaultConfig =
    TEAM_RADIO_CONFIGS[defaultTeamKey] || TEAM_RADIO_CONFIGS.ferrari;

  const serializedConfigs = Object.fromEntries(
    Object.entries(TEAM_RADIO_CONFIGS).map(([key, cfg]) => [
      key,
      {
        accent: cfg.cssVars.accent,
        bg: cfg.cssVars.bg,
        fallbackNumber: cfg.fallbackDriverNumber || "16",
        id: cfg.id,
        primary: cfg.cssVars.primary,
        shieldSvg: cfg.shieldSvg.replace(/\n\s*/g, " ").trim(),
        wave: cfg.cssVars.wave,
      },
    ])
  );

  const configsJson = JSON.stringify(serializedConfigs);
  const allowedJson = JSON.stringify(allowedTeams);

  const teamStyles = `
    .radio-card {
      --radio-bg: ${defaultConfig.cssVars.bg};
      --radio-primary: ${defaultConfig.cssVars.primary};
      --radio-wave: ${defaultConfig.cssVars.wave};
      --radio-accent: ${defaultConfig.cssVars.accent};
    }
  `;

  return `<div class="container {disposition} {transition}">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Orbitron:wght@900&family=Inter:wght@400;550;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}

    .f1-alert-banner {
      animation: ${persistent ? "none !important" : "f1PlayAlert 8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important"};
      ${persistent ? "opacity: 1 !important; clip-path: polygon(0% 0%, 111% 0%, 100% 100%, -11% 100%) !important;" : ""}
    }

    ${radioAlertStyles}
    ${teamStyles}

    .radio-card {
      animation: ${persistent ? "none !important" : "f1PlayAlert 8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important"};
      ${persistent ? "opacity: 1 !important; clip-path: none !important;" : ""}
    }

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

    .radio-layout-wrapper[data-message=""] {
      display: none !important;
    }
  </style>

  <div class="overlay-grid-container">
    <div id="standard-alert-wrap" class="standard-layout-wrapper">
      <div class="f1-alert-banner">
        <div class="f1-alert-badge">
          <div class="f1-logo-content">
            ${f1LogoSvg}
          </div>
        </div>
        <div class="f1-alert-body">
          <p class="f1-heading-text" id="alert-heading">${headingTemplate}</p>
          <p class="f1-detail-text" id="alert-detail">{text}</p>
        </div>
      </div>
    </div>

    <div id="radio-alert-wrap" class="radio-layout-wrapper" data-message="{message}" data-configs='${configsJson}' data-allowed='${allowedJson}'>
      <img src=x onerror="
var w=this.parentNode,
c=JSON.parse(w.getAttribute('data-configs')),
a=JSON.parse(w.getAttribute('data-allowed')),
t=a[Math.floor(Math.random()*a.length)],g=c[t],
d=w.querySelector('.radio-card');
d.style.setProperty('--radio-bg',g.bg);
d.style.setProperty('--radio-primary',g.primary);
d.style.setProperty('--radio-wave',g.wave);
d.style.setProperty('--radio-accent',g.accent);
d.className='radio-card radio-team-'+g.id;
w.querySelector('.radio-card-shield-wrapper').innerHTML=g.shieldSvg;
w.querySelector('.radio-card-number').textContent=g.fallbackNumber;
var n=w.querySelector('.radio-card-name');
if(n){var m=n.textContent.match(/\\d+$/);if(m)d.querySelector('.radio-card-number').textContent=m[0].slice(0,2);}
 d.style.visibility='visible';
 this.remove();
" style="display:none" />
      <div class="radio-card radio-team-${defaultConfig.id}" style="visibility:hidden">
        <div class="radio-card-header">
          <div class="radio-header-bg">
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
          <div class="radio-header-content">
            <div class="radio-card-name-row">
              <span class="radio-card-name" id="radio-name">{name}</span>
            </div>
            <div class="radio-header-bottom-row">
              <div class="radio-card-number-wrapper">
                <span class="radio-card-number">${defaultConfig.fallbackDriverNumber || "16"}</span>
              </div>
              <div class="radio-header-right-bottom">
                <span class="radio-card-radio">RADIO</span>
                <div class="radio-card-shield-wrapper">
                  ${defaultConfig.shieldSvg}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="radio-card-body">
          <p class="radio-message-text" id="radio-message">&quot;{message}&quot;</p>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function AlertHeader() {
  return (
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
            className="font-bold text-[#DF0631] text-xs uppercase tracking-wider transition hover:text-red-400"
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
          <a
            aria-label="GitHub Repository"
            className="text-slate-400 transition hover:text-slate-100"
            href="https://github.com/erikenz/race-control-studio"
            rel="noopener"
            target="_blank"
          >
            <GithubIcon className="h-4.5 w-4.5" />
          </a>
        </nav>
      </div>
    </header>
  );
}

function ConfiguratorSidebar({
  onCopy,
  onTrigger,
}: {
  onCopy: () => void;
  onTrigger: () => void;
}) {
  const name = useAppStore((s) => s.name);
  const text = useAppStore((s) => s.text);
  const message = useAppStore((s) => s.message);
  const headingTemplate = useAppStore((s) => s.headingTemplate);
  const radioSkinMode = useAppStore((s) => s.radioSkinMode);
  const radioTeam = useAppStore((s) => s.radioTeam);
  const selectedRadioSkins = useAppStore((s) => s.selectedRadioSkins);
  const persistent = useAppStore((s) => s.persistent);
  const copied = useAppStore((s) => s.copied);
  const showCode = useAppStore((s) => s.showCode);
  const selectedTemplate = useAppStore((s) => s.selectedTemplate);
  const setName = useAppStore((s) => s.setName);
  const setText = useAppStore((s) => s.setText);
  const setMessage = useAppStore((s) => s.setMessage);
  const setHeadingTemplate = useAppStore((s) => s.setHeadingTemplate);
  const setSkinMode = useAppStore((s) => s.setSkinMode);
  const setSpecificTeam = useAppStore((s) => s.setSpecificTeam);
  const setSelectedSkins = useAppStore((s) => s.setSelectedSkins);
  const setPersistent = useAppStore((s) => s.setPersistent);
  const setShowCode = useAppStore((s) => s.setShowCode);
  const allowsMessage = ["subscription", "tip-donate", "kicks"].includes(
    selectedTemplate
  );

  const inputClass =
    "h-9 border-slate-800 bg-slate-955 text-slate-100 text-sm hover:border-slate-700 focus:ring-1 focus:ring-red-500";
  const labelClass =
    "font-bold font-mono text-slate-300 text-xs uppercase tracking-wider";
  const descClass = "text-slate-500 text-[11px] leading-relaxed -mt-0.5";

  return (
    <div className="relative flex flex-col gap-5 overflow-y-auto rounded-xl border border-slate-800/85 bg-slate-900/40 p-5 shadow-2xl backdrop-blur-md md:p-6 lg:sticky lg:top-4 lg:max-h-[calc(100dvh-5.5rem)] lg:col-span-4 xl:col-span-3">
      <div className="absolute top-0 left-6 h-0.75 w-24 bg-[#e10600]" />

      <h2 className="flex items-center justify-between border-slate-800/60 border-b pb-3 font-extrabold text-lg uppercase tracking-wide">
        <span>Alert Configurator</span>
        <span className="rounded bg-red-500/10 px-2 py-0.5 font-mono font-semibold text-red-500 text-xs">
          FORMULA-1
        </span>
      </h2>

      {/* Test Alerts Presets */}
      <div className="flex flex-col gap-2">
        <Label className="font-bold font-mono text-slate-400 text-xs uppercase tracking-wider">
          Test Alerts Presets
        </Label>
        <QuickPresetsDeck />
      </div>

      {/* === SECTION 1: Botrix Variables === */}
      <div className="flex flex-col gap-4 border-slate-800/60 border-t pt-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#DF0631]" />
          <span className="font-bold font-mono text-[11px] text-slate-400 uppercase tracking-widest">
            Botrix Variables
          </span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          These fields receive values from Botrix. Use{" "}
          <code className="rounded bg-slate-800/60 px-1 py-0.5 font-mono text-[#DF0631] text-[10px]">
            {"{name}"}
          </code>
          ,{" "}
          <code className="rounded bg-slate-800/60 px-1 py-0.5 font-mono text-[#DF0631] text-[10px]">
            {"{text}"}
          </code>
          , and{" "}
          <code className="rounded bg-slate-800/60 px-1 py-0.5 font-mono text-[#DF0631] text-[10px]">
            {"{message}"}
          </code>{" "}
          placeholders in the heading template below. Configuring these inside
          Botrix means they update dynamically with each alert trigger.
        </p>

        {/* Driver Name */}
        <div className="flex flex-col gap-1.5">
          <Label className={labelClass} htmlFor="name-input">
            Name
          </Label>
          <p className={descClass}>
            Maps to the{" "}
            <code className="font-mono text-[#DF0631]">{'{name}'}</code> variable
            — set this in your Botrix alert panel under "Name".
          </p>
          <Input
            className={inputClass}
            id="name-input"
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. LEWIS_44"
            type="text"
            value={name}
          />
        </div>

        {/* Alert Text */}
        <div className="flex flex-col gap-1.5">
          <Label className={labelClass} htmlFor="text-input">
            Alert Text
          </Label>
          <p className={descClass}>
            The main message body passed by Botrix. The variable{" "}
            <code className="font-mono text-[#DF0631]">{"{text}"}</code>{" "}
            replaces whatever you type in Botrix's "Text" field.
          </p>
          <Input
            className={inputClass}
            id="text-input"
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. subscribed"
            type="text"
            value={text}
          />
        </div>

        {/* Custom Message (conditional) */}
        {allowsMessage && (
          <div className="flex flex-col gap-1.5">
            <Label className={labelClass} htmlFor="message-input">
              Custom User Message (Radio)
            </Label>
            <p className={descClass}>
              The custom user message shown in the radio card. The variable{" "}
              <code className="font-mono text-[#DF0631]">{"{message}"}</code>{" "}
              maps to your custom message field in Botrix. Only visible for
              Subscription, Tip/Donate, and Kicks presets.
            </p>
            <Input
              className={inputClass}
              id="message-input"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Staying with the team. 12 months completed!"
              type="text"
              value={message}
            />
          </div>
        )}
      </div>

      {/* === SECTION 2: Alert Contents === */}
      <div className="flex flex-col gap-4 border-slate-800/60 border-t pt-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="font-bold font-mono text-[11px] text-slate-400 uppercase tracking-widest">
            Alert Contents
          </span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Customize the heading text and radio card appearance. Use{" "}
          <code className="rounded bg-slate-800/60 px-1 py-0.5 font-mono text-[#DF0631] text-[10px]">
            {"{name}"}
          </code>
          ,{" "}
          <code className="rounded bg-slate-800/60 px-1 py-0.5 font-mono text-[#DF0631] text-[10px]">
            {"{text}"}
          </code>
          ,{" "}
          <code className="rounded bg-slate-800/60 px-1 py-0.5 font-mono text-[#DF0631] text-[10px]">
            {"{message}"}
          </code>{" "}
          placeholders to reference the Botrix variables above. These are
          replaced at preview time and in the generated HTML.
        </p>

        {/* Heading Template */}
        <div className="flex flex-col gap-1.5">
          <Label className={labelClass} htmlFor="heading-template-input">
            Heading Template
          </Label>
          <p className={descClass}>
            Controls the entire first line of the alert banner. Arrange{" "}
            <code className="font-mono text-[#DF0631]">{"{name}"}</code>,{" "}
            <code className="font-mono text-[#DF0631]">{"{text}"}</code>, and{" "}
            <code className="font-mono text-[#DF0631]">{"{message}"}</code>{" "}
            however you like — add prefixes, suffixes, or reposition them.
          </p>
          <Input
            className={inputClass}
            id="heading-template-input"
            onChange={(e) => setHeadingTemplate(e.target.value)}
            placeholder="RACE CONTROL: {name} RENEWAL INCIDENT"
            type="text"
            value={headingTemplate}
          />
        </div>

        {/* Radio Skin Config (conditional) */}
        {allowsMessage && (
          <>
            <div className="flex flex-col gap-1.5">
              <Label className={labelClass}>Radio Skin Mode</Label>
              <p className={descClass}>
                Choose which team radio skin appears in the bottom-right card: a
                fixed team, random from all teams, or random from a filtered
                selection.
              </p>
              <select
                className="h-9 rounded-lg border border-slate-800 bg-slate-955 px-3 text-slate-100 text-sm hover:border-slate-700 focus:outline-none focus:ring-1 focus:ring-red-500"
                onChange={(e) => {
                  const val = e.target.value;
                  if (
                    val === "specific" ||
                    val === "random-all" ||
                    val === "random-selected"
                  ) {
                    setSkinMode(val);
                  }
                }}
                value={radioSkinMode}
              >
                <option value="specific">Specific Team</option>
                <option value="random-all">Random (All Teams)</option>
                <option value="random-selected">Random (Selected Teams)</option>
              </select>
            </div>

            {radioSkinMode === "specific" && (
              <div className="flex animate-fadeIn flex-col gap-1.5">
                <Label className={labelClass} htmlFor="radio-team-select">
                  Team Skin
                </Label>
                <p className={descClass}>
                  The fixed team styling applied to the radio card (colors,
                  shield, driver number).
                </p>
                <select
                  className="h-9 rounded-lg border border-slate-800 bg-slate-955 px-3 text-slate-100 text-sm hover:border-slate-700 focus:outline-none focus:ring-1 focus:ring-red-500"
                  id="radio-team-select"
                  onChange={(e) => setSpecificTeam(e.target.value)}
                  value={radioTeam}
                >
                  {Object.entries(TEAM_RADIO_CONFIGS).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {radioSkinMode === "random-selected" && (
              <div className="flex animate-fadeIn flex-col gap-2 rounded-lg border border-slate-800/80 bg-slate-900/30 p-3">
                <Label className="mb-1 font-bold font-mono text-slate-300 text-xs uppercase tracking-wider">
                  Allowed Teams
                </Label>
                <p className={descClass}>
                  Only the checked teams will be used when randomly picking a
                  radio skin at runtime.
                </p>
                <div className="flex flex-col gap-2.5">
                  {Object.entries(TEAM_RADIO_CONFIGS).map(([key, config]) => {
                    const isChecked = selectedRadioSkins.includes(key);
                    return (
                      <div className="flex items-center gap-2.5" key={key}>
                        <input
                          aria-label={config.name}
                          checked={isChecked}
                          className="h-4 w-4 cursor-pointer rounded border border-slate-800 bg-slate-955 text-[#DF0631] accent-[#DF0631] focus:ring-1 focus:ring-red-500"
                          id={`select-skin-${key}`}
                          onChange={(e) => {
                            let newSkins: string[];
                            if (e.target.checked) {
                              newSkins = [...selectedRadioSkins, key];
                            } else {
                              newSkins = selectedRadioSkins.filter(
                                (s) => s !== key
                              );
                            }
                            setSelectedSkins(newSkins);
                          }}
                          type="checkbox"
                        />
                        <Label
                          className="cursor-pointer select-none font-medium text-slate-300 text-sm hover:text-slate-150"
                          htmlFor={`select-skin-${key}`}
                        >
                          {config.name}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* Persistent Mode */}
        <div className="flex items-center gap-2">
          <input
            aria-label="Persistent Mode (keep alert visible for setup)"
            checked={persistent}
            className="h-4 w-4 cursor-pointer rounded border border-slate-800 bg-slate-955 text-[#DF0631] accent-[#DF0631] focus:ring-1 focus:ring-red-500"
            id="persistent-toggle"
            onChange={(e) => setPersistent(e.target.checked)}
            type="checkbox"
          />
          <div className="flex flex-col">
            <Label
              className="cursor-pointer select-none font-medium text-slate-400 text-xs hover:text-slate-200"
              htmlFor="persistent-toggle"
            >
              Persistent Mode
            </Label>
            <span className="text-[10px] text-slate-500">
              Keeps the alert visible without animating out, useful for
              positioning and alignment in OBS.
            </span>
          </div>
        </div>
      </div>

      {/* Export buttons */}
      <div className="flex flex-col gap-3 border-slate-800/60 border-t pt-4">
        <div className="flex gap-3">
          <Button
            className={`flex-1 rounded-lg py-2.5 font-extrabold text-xs uppercase tracking-wider transition-all active:scale-[0.98] ${
              copied
                ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:bg-emerald-700"
                : "bg-[#DF0631] text-white shadow-[0_4px_12px_rgba(223,6,49,0.2)] hover:bg-[#c3052a]"
            }`}
            onClick={onCopy}
          >
            {copied ? "🏁 COPIED HTML!" : "📋 COPY HTML"}
          </Button>

          <Button
            className="flex-1 rounded-lg border border-slate-700 bg-slate-800/40 py-2.5 font-extrabold text-slate-200 text-xs uppercase tracking-wider transition-all hover:bg-slate-700 hover:text-white active:scale-[0.98]"
            onClick={onTrigger}
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
          {showCode ? "Hide Compiled Widget Code" : "Show Compiled Widget Code"}
        </Button>
      </div>

      {/* Help instructions card */}
      <QuickInstructionsCard />
    </div>
  );
}

function PreviewPanel({
  AlertComponent,
  compiledCode,
  onCopy,
}: {
  AlertComponent: ComponentType<AlertProps>;
  compiledCode: string;
  onCopy: () => void;
}) {
  const showCode = useAppStore((s) => s.showCode);
  return (
    <div className="flex flex-col gap-4 lg:col-span-8 xl:col-span-9">
      <AlertPreviewFeed AlertComponent={AlertComponent} />

      {/* Code Inspection Area */}
      {showCode && (
        <div className="relative flex flex-col gap-3 rounded-xl border border-slate-850 bg-slate-955 p-4 shadow-inner">
          <div className="flex items-center justify-between border-slate-900 border-b pb-2">
            <span className="font-bold font-mono text-slate-400 text-xs uppercase tracking-wider">
              Compiled HTML Export Block
            </span>
            <button
              className="font-bold font-mono text-[#DF0631] text-xs uppercase tracking-widest hover:text-red-400"
              onClick={onCopy}
              type="button"
            >
              Copy Output
            </button>
          </div>
          <pre className="scrollbar-thin scrollbar-thumb-slate-800 max-h-75 overflow-x-auto rounded-lg border border-slate-900/80 bg-slate-900/60 p-3 font-mono text-slate-355 text-xs">
            <code>{compiledCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

export default function AlertPreviewPage() {
  const selectedTemplate = useAppStore((s) => s.selectedTemplate);
  const persistent = useAppStore((s) => s.persistent);
  const radioSkinMode = useAppStore((s) => s.radioSkinMode);
  const selectedRadioSkins = useAppStore((s) => s.selectedRadioSkins);
  const radioTeam = useAppStore((s) => s.radioTeam);
  const headingTemplate = useAppStore((s) => s.headingTemplate);
  const setCopied = useAppStore((s) => s.setCopied);
  const triggerReplay = useAppStore((s) => s.triggerReplay);

  const AlertComponent = alertComponents[selectedTemplate] || SubAlert;

  const allowsMessage = ["subscription", "tip-donate", "kicks"].includes(
    selectedTemplate
  );

  let rawCode = "";
  if (allowsMessage) {
    rawCode = getCombinedBotrixHtml(
      selectedTemplate,
      persistent,
      radioSkinMode,
      selectedRadioSkins,
      radioTeam,
      headingTemplate
    );
  } else if (alertComponents[selectedTemplate]) {
    rawCode = alertComponents[selectedTemplate].getBotrixHtml(headingTemplate);
  }

  let compiledCode = rawCode;
  if (persistent && !allowsMessage) {
    compiledCode = compiledCode.replace(
      "animation: f1PlayAlert 8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important;",
      "animation: none !important; opacity: 1 !important; clip-path: polygon(0% 0%, 111% 0%, 100% 100%, -11% 100%) !important;"
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2050);
  };

  return (
    <main className="relative flex h-dvh flex-col overflow-hidden bg-grid-pattern bg-slate-955 text-slate-100">
      <style>{sharedStyles}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Orbitron:wght@900&family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Navigation Bar */}
      <AlertHeader />

      {/* Background design elements */}
      <div className="pointer-events-none absolute top-0 right-0 h-125 w-125 rounded-full bg-[#e10600]/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-125 w-125 rounded-full bg-blue-600/5 blur-[120px]" />

      {/* Main Workspace Container */}
      <div className="z-10 mx-auto flex w-full max-w-[95vw] flex-1 flex-col gap-6 overflow-hidden p-4 md:p-6">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* LEFT: Controls Column (col-span-4) */}
          <ConfiguratorSidebar onCopy={handleCopy} onTrigger={triggerReplay} />

          {/* RIGHT: Viewport Column (col-span-8) */}
          <PreviewPanel
            AlertComponent={AlertComponent}
            compiledCode={compiledCode}
            onCopy={handleCopy}
          />
        </div>
      </div>
    </main>
  );
}
