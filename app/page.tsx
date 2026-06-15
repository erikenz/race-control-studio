"use client";

import Link from "next/link";
import { useState } from "react";
import { FerrariRadioAlert } from "@/components/alerts/ferrari-radio";
import { FollowerAlert } from "@/components/alerts/follower-alert";
import { GiftSubAlert } from "@/components/alerts/gift-sub-alert";
import { HostAlert } from "@/components/alerts/host-alert";
import { KickAlert } from "@/components/alerts/kick-alert";
import { sharedStyles } from "@/components/alerts/shared";
import { SubAlert } from "@/components/alerts/sub-alert";
import { TipAlert } from "@/components/alerts/tip-alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// biome-ignore lint/suspicious/noExplicitAny: alert components can be any React component type
const alertComponents: Record<string, any> = {
  subscription: SubAlert,
  "gift-sub": GiftSubAlert,
  followers: FollowerAlert,
  host: HostAlert,
  kicks: KickAlert,
  "tip-donate": TipAlert,
  "ferrari-radio": FerrariRadioAlert,
};

export default function AlertPreviewPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("subscription");
  const [name, setName] = useState("HAMILTON_44");
  const [text, setText] = useState(
    '"Staying with the team. 12 months completed!"'
  );
  const [triggerKey, setTriggerKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [bgColor, setBgColor] = useState("grid"); // "chroma", "grid", "black"

  const loadPreset = (
    presetType:
      | "sub"
      | "resub"
      | "gift"
      | "follower"
      | "host"
      | "kick"
      | "tip"
      | "ferrari"
  ) => {
    switch (presetType) {
      case "sub":
        setSelectedTemplate("subscription");
        setName("Gearbox_GP");
        setText("Joined the grid - brand new subscriber!");
        break;
      case "resub":
        setSelectedTemplate("subscription");
        setName("HAMILTON_44");
        setText('Radio: "Staying with the team. 12 months completed!"');
        break;
      case "gift":
        setSelectedTemplate("gift-sub");
        setName("Team_Principal");
        setText("Sponsored 5 drivers in the pit lane!");
        break;
      case "follower":
        setSelectedTemplate("followers");
        setName("Rookie_Driver");
        setText("Grid entry - green light on track!");
        break;
      case "host":
        setSelectedTemplate("host");
        setName("Safety_Car");
        setText("Restart incident: joined force with 120 viewers!");
        break;
      case "kick":
        setSelectedTemplate("kicks");
        setName("KickStreamer");
        setText('Radio: "Launch control active! First row start on Kick!"');
        break;
      case "tip":
        setSelectedTemplate("tip-donate");
        setName("Pit_Crew");
        setText('Tipped $15.00 USD - "For tyre compound upgrade!"');
        break;
      case "ferrari":
        setSelectedTemplate("ferrari-radio");
        setName("LECLERC_16");
        setText("Slow button on, copy. We are checking.");
        break;
      default:
        break;
    }
  };

  const handleTrigger = () => {
    setTriggerKey((k) => k + 1);
  };

  const handleCopy = () => {
    const component = alertComponents[selectedTemplate] || SubAlert;
    const code = component.getBotrixHtml();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2050);
  };

  const AlertComponent = alertComponents[selectedTemplate] || SubAlert;
  const compiledCode = AlertComponent.getBotrixHtml();

  const getBgClass = () => {
    switch (bgColor) {
      case "chroma":
        return "bg-[#00ff00]"; // bright green chroma key
      case "black":
        return "bg-slate-950"; // solid black/dark OBS view
      default:
        return "bg-grid-pattern bg-slate-900"; // dark transparency checkerboard
    }
  };

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
              F1 Alert Studio
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
              <span>Telemetry Input</span>
              <span className="rounded bg-red-500/10 px-2 py-0.5 font-mono font-semibold text-red-500 text-xs">
                FORMULA-1
              </span>
            </h2>

            {/* Quick Presets */}
            <div className="flex flex-col gap-1.5">
              <Label className="mb-1 font-bold font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                Test Alerts Presets
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  className="h-8 rounded-lg border-slate-800 bg-slate-850 font-bold text-[11px] text-slate-300 uppercase tracking-wider transition hover:bg-slate-850 hover:text-slate-200"
                  onClick={() => loadPreset("sub")}
                  size="sm"
                  variant="outline"
                >
                  Sub
                </Button>
                <Button
                  className="h-8 rounded-lg border-slate-800 bg-slate-850 font-bold text-[11px] text-slate-300 uppercase tracking-wider transition hover:bg-slate-850 hover:text-slate-200"
                  onClick={() => loadPreset("resub")}
                  size="sm"
                  variant="outline"
                >
                  Re-Sub
                </Button>
                <Button
                  className="h-8 rounded-lg border-slate-800 bg-slate-850 font-bold text-[11px] text-slate-300 uppercase tracking-wider transition hover:bg-slate-850 hover:text-slate-200"
                  onClick={() => loadPreset("gift")}
                  size="sm"
                  variant="outline"
                >
                  Gift Sub
                </Button>
                <Button
                  className="h-8 rounded-lg border-slate-800 bg-slate-855 font-bold text-[11px] text-slate-300 uppercase tracking-wider transition hover:bg-slate-855 hover:text-slate-200"
                  onClick={() => loadPreset("follower")}
                  size="sm"
                  variant="outline"
                >
                  Follower
                </Button>
                <Button
                  className="h-8 rounded-lg border-slate-800 bg-slate-855 font-bold text-[11px] text-slate-300 uppercase tracking-wider transition hover:bg-slate-855 hover:text-slate-200"
                  onClick={() => loadPreset("host")}
                  size="sm"
                  variant="outline"
                >
                  Host
                </Button>
                <Button
                  className="h-8 rounded-lg border-slate-800 bg-slate-855 font-bold text-[11px] text-slate-300 uppercase tracking-wider transition hover:bg-slate-855 hover:text-slate-200"
                  onClick={() => loadPreset("kick")}
                  size="sm"
                  variant="outline"
                >
                  Kick
                </Button>
                <Button
                  className="h-8 rounded-lg border-slate-800 bg-slate-855 font-bold text-[11px] text-slate-300 uppercase tracking-wider transition hover:bg-slate-855 hover:text-slate-200"
                  onClick={() => loadPreset("tip")}
                  size="sm"
                  variant="outline"
                >
                  Tip/Donate
                </Button>
                <Button
                  className="h-8 rounded-lg border-slate-800 bg-slate-855 font-bold text-[11px] text-slate-300 uppercase tracking-wider transition hover:bg-slate-855 hover:text-slate-200"
                  onClick={() => loadPreset("ferrari")}
                  size="sm"
                  variant="outline"
                >
                  Ferrari Radio
                </Button>
              </div>
            </div>

            {/* Template Selector */}
            <div className="flex flex-col gap-1.5">
              <Label
                className="font-bold font-mono text-[11px] text-slate-400 uppercase tracking-wider"
                htmlFor="template-selector"
              >
                Alert Component Type (Botrix Tab)
              </Label>
              <Select
                onValueChange={(val) => {
                  if (val) {
                    setSelectedTemplate(val);
                  }
                }}
                value={selectedTemplate}
              >
                <SelectTrigger
                  className="border-slate-800 bg-slate-950 font-medium text-slate-100 hover:border-slate-700 focus:ring-1 focus:ring-red-500"
                  id="template-selector"
                >
                  <SelectValue placeholder="Select component type" />
                </SelectTrigger>
                <SelectContent className="border-slate-800 bg-slate-955 text-slate-100">
                  <SelectItem
                    className="cursor-pointer hover:bg-slate-900 focus:bg-slate-900"
                    value="subscription"
                  >
                    Subscription
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:bg-slate-900 focus:bg-slate-900"
                    value="gift-sub"
                  >
                    Gift Sub
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:bg-slate-900 focus:bg-slate-900"
                    value="followers"
                  >
                    Followers
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:bg-slate-900 focus:bg-slate-900"
                    value="host"
                  >
                    Host
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:bg-slate-900 focus:bg-slate-900"
                    value="kicks"
                  >
                    KICKs
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:bg-slate-900 focus:bg-slate-900"
                    value="tip-donate"
                  >
                    Tip/Donate
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer hover:bg-slate-900 focus:bg-slate-900"
                    value="ferrari-radio"
                  >
                    Ferrari Team Radio
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Driver Name Input */}
            <div className="flex flex-col gap-1.5">
              <Label
                className="font-bold font-mono text-[11px] text-slate-400 uppercase tracking-wider"
                htmlFor="name-input"
              >
                {selectedTemplate === "ferrari-radio"
                  ? "Viewer Name (Botrix {name})"
                  : "Driver Name"}
              </Label>
              <Input
                className="border-slate-800 bg-slate-955 text-slate-100 hover:border-slate-700 focus:ring-1 focus:ring-red-500"
                id="name-input"
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Lewis_44"
                type="text"
                value={name}
              />
            </div>

            {/* Alert Text Input */}
            <div className="flex flex-col gap-1.5">
              <Label
                className="font-bold font-mono text-[11px] text-slate-400 uppercase tracking-wider"
                htmlFor="text-input"
              >
                {selectedTemplate === "ferrari-radio"
                  ? "Radio Message (Botrix {message})"
                  : "Alert Text (Configured in Botrix Panel)"}
              </Label>
              <Input
                className="border-slate-800 bg-slate-955 text-slate-100 hover:border-slate-700 focus:ring-1 focus:ring-red-500"
                id="text-input"
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g. subscribed"
                type="text"
                value={text}
              />
            </div>

            <div className="mt-2 flex flex-col gap-3">
              <div className="flex gap-3">
                <Button
                  className="flex-1 rounded-lg bg-[#e10600] py-2.5 font-extrabold text-white text-xs uppercase tracking-wider shadow-[0_4px_12px_rgba(225,6,0,0.2)] transition hover:bg-[#c30500] active:scale-[0.98]"
                  onClick={handleTrigger}
                >
                  🏁 Trigger Alert!
                </Button>

                <Button
                  className={`flex-1 rounded-lg py-2.5 font-extrabold text-xs uppercase tracking-wider transition-all active:scale-[0.98] ${
                    copied
                      ? "bg-emerald-650 text-white hover:bg-emerald-700"
                      : "border border-slate-700/60 bg-slate-800 text-slate-200 hover:bg-slate-700"
                  }`}
                  onClick={handleCopy}
                >
                  {copied ? "Copied! 🏁" : "📋 Copy HTML"}
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
          </div>

          {/* RIGHT: Viewport Column (col-span-8) */}
          <div className="flex flex-col gap-4 lg:col-span-8 xl:col-span-9">
            {/* Viewport Card */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <h2 className="flex items-center gap-1.5 font-bold font-mono text-slate-350 text-xs uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 animate-ping rounded-full bg-green-500" />
                  OBS Broadcast Stream Simulator (16:9)
                </h2>

                {/* Viewport Settings */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Background Selector */}
                  <div className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-800 bg-slate-955 p-0.5">
                    <button
                      className={`rounded px-2.5 py-1 font-bold font-mono text-[10px] uppercase transition ${
                        bgColor === "chroma"
                          ? "bg-[#e10600] text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                      onClick={() => setBgColor("chroma")}
                      type="button"
                    >
                      Chroma
                    </button>
                    <button
                      className={`rounded px-2.5 py-1 font-bold font-mono text-[10px] uppercase transition ${
                        bgColor === "grid"
                          ? "bg-[#e10600] text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                      onClick={() => setBgColor("grid")}
                      type="button"
                    >
                      Grid
                    </button>
                    <button
                      className={`rounded px-2.5 py-1 font-bold font-mono text-[10px] uppercase transition ${
                        bgColor === "black"
                          ? "bg-[#e10600] text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                      onClick={() => setBgColor("black")}
                      type="button"
                    >
                      Black
                    </button>
                  </div>

                  {/* Alignment Grid Toggle */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={showGrid}
                      className="h-4 w-4 cursor-pointer border-slate-800 bg-slate-955 text-red-500 data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500"
                      id="grid-toggle"
                      onCheckedChange={(checked) => setShowGrid(!!checked)}
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
                className={`relative flex aspect-video w-full overflow-hidden rounded-xl border border-slate-800/90 shadow-2xl transition-all duration-300 ${getBgClass()} ${
                  selectedTemplate === "ferrari-radio"
                    ? "items-end justify-end pt-0 pr-[6%] pb-[6%] pl-0"
                    : "items-start justify-center pt-[4%] pr-0 pb-0 pl-0"
                }`}
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

                {/* Broadcast details */}
                <div className="absolute top-3 left-3 z-30 flex select-none items-center gap-2 rounded-md border border-slate-800/80 bg-slate-950/85 px-2.5 py-1 font-mono text-[10px] text-slate-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e10600]" />
                  1080P SIMULATOR FEED
                </div>

                <div className="absolute right-3 bottom-3 z-30 select-none rounded border border-slate-800/80 bg-slate-950/85 px-2 py-1 font-mono text-[10px] text-slate-400">
                  {selectedTemplate.toUpperCase()} / PREVIEW
                </div>

                {/* Native Component Render stage */}
                <div className="z-10 scale-[0.85] transform transition duration-300 sm:scale-100">
                  {triggerKey > 0 ? (
                    <div key={triggerKey}>
                      <AlertComponent
                        message={
                          selectedTemplate === "ferrari-radio"
                            ? text
                            : undefined
                        }
                        name={name}
                        text={text}
                      />
                    </div>
                  ) : (
                    <div className="flex select-none flex-col items-center gap-2 px-6 text-center font-black font-sans text-slate-900 text-xl uppercase tracking-wider opacity-30 sm:text-2xl">
                      <span>Race Control Idle</span>
                      <span className="font-bold font-mono text-xs">
                        Press "Trigger Alert" to start telemetry animation
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Code Inspection Area */}
            {showCode && (
              <div className="relative flex flex-col gap-3 rounded-xl border border-slate-850 bg-slate-950 p-4 shadow-inner">
                <div className="flex items-center justify-between border-slate-900 border-b pb-2">
                  <span className="font-bold font-mono text-slate-400 text-xs uppercase tracking-wider">
                    Compiled HTML Export Block
                  </span>
                  <button
                    className="font-bold font-mono text-red-500 text-xs uppercase tracking-widest hover:text-red-400"
                    onClick={handleCopy}
                    type="button"
                  >
                    Copy Output
                  </button>
                </div>
                <pre className="scrollbar-thin scrollbar-thumb-slate-800 max-h-[300px] overflow-x-auto rounded-lg border border-slate-900/80 bg-slate-900/60 p-3 font-mono text-[10px] text-slate-350">
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
