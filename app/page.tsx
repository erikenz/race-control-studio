"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";

// biome-ignore lint/suspicious/noExplicitAny: alert components can be any React component type
const alertComponents: Record<string, any> = {
  subscription: SubAlert,
  "gift-sub": GiftSubAlert,
  followers: FollowerAlert,
  host: HostAlert,
  kicks: KickAlert,
  "tip-donate": TipAlert,
};

export default function AlertPreviewPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("subscription");
  const [name, setName] = useState("Martina_GP");
  const [text, setText] = useState("resubscribed");
  const [amount, setAmount] = useState("12 meses");
  const [message, setMessage] = useState(
    "Un año metiendo rebajes con esta escudería. ¡Qué locura!"
  );
  const [triggerKey, setTriggerKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showCode, setShowCode] = useState(false);

  const loadPreset = (
    presetType: "sub" | "resub" | "gift" | "follower" | "host" | "kick" | "tip"
  ) => {
    switch (presetType) {
      case "sub":
        setSelectedTemplate("subscription");
        setName("Bauti_F1");
        setText("subscribed");
        setAmount("");
        setMessage(
          "¡Vamos Argentina! ¡Hoy largamos de boxes pero ganamos igual!"
        );
        break;
      case "resub":
        setSelectedTemplate("subscription");
        setName("Martina_GP");
        setText("resubscribed");
        setAmount("12 meses");
        setMessage("Un año metiendo rebajes con esta escudería. ¡Qué locura!");
        break;
      case "gift":
        setSelectedTemplate("gift-sub");
        setName("ElTanoRacing");
        setText("gifted");
        setAmount("5");
        setMessage("");
        break;
      case "follower":
        setSelectedTemplate("followers");
        setName("Lewis_44");
        setText("followed");
        setAmount("");
        setMessage("");
        break;
      case "host":
        setSelectedTemplate("host");
        setName("Max_MV33");
        setText("hosted");
        setAmount("120");
        setMessage("");
        break;
      case "kick":
        setSelectedTemplate("kicks");
        setName("KickStreamer");
        setText("subscribed on Kick");
        setAmount("");
        setMessage("¡Primera fila de largada en Kick!");
        break;
      case "tip":
        setSelectedTemplate("tip-donate");
        setName("DonMecánico");
        setText("tip");
        setAmount("$15.00 USD");
        setMessage(
          "Tomá master, para comprarle gomas duras a ver si aguantamos la parada."
        );
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
    setTimeout(() => setCopied(false), 2000);
  };

  const AlertComponent = alertComponents[selectedTemplate] || SubAlert;
  const compiledCode = AlertComponent.getBotrixHtml();

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-grid-pattern bg-slate-950 p-4 font-sans text-slate-100 md:p-8">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static trusted styles */}
      <style dangerouslySetInnerHTML={{ __html: sharedStyles }} />

      {/* Background design elements */}
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-red-650/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px]" />

      <div className="z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 md:gap-8">
        {/* Header telemetry area */}
        <div className="flex flex-col justify-between gap-4 border-slate-800/80 border-b pb-6 md:flex-row md:items-center">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-600 shadow-[0_0_8px_#ef4444]" />
              <span className="font-bold font-mono text-red-500 text-xs uppercase tracking-wider">
                Race Control Broadcast System
              </span>
            </div>
            <h1 className="font-black text-3xl uppercase tracking-tight md:text-4xl">
              F1 Alert Studio
            </h1>
            <p className="max-w-xl text-slate-400 text-sm">
              Create, customize, and export premium F1 racing incident alert
              banners. Native React preview matched 1:1 with OBS telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start rounded-lg border border-slate-800/80 bg-slate-900/50 p-3 backdrop-blur-sm md:self-auto">
            <div className="flex flex-col font-mono text-[11px] text-slate-400">
              <span className="text-slate-500">UTC TELEMETRY</span>
              <span className="font-bold text-red-500 text-xs tracking-wider">
                LIVE DATA FEED
              </span>
            </div>
            <div className="h-8 w-[1px] bg-slate-800" />
            <div className="flex flex-col font-mono text-[11px] text-slate-400">
              <span className="text-slate-500">VERSION</span>
              <span className="font-bold text-slate-200">v2.1.0-REACT</span>
            </div>
          </div>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 items-start gap-6 md:gap-8 lg:grid-cols-12">
          {/* Controls Column */}
          <div className="relative flex flex-col gap-5 rounded-xl border border-slate-800/85 bg-slate-900/40 p-5 shadow-2xl backdrop-blur-md md:p-6 lg:col-span-5">
            <div className="absolute top-0 left-6 h-[3px] w-24 bg-red-600" />

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
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-3">
                <Button
                  className="h-8 rounded-lg border-slate-800 bg-slate-850 font-bold text-[11px] text-slate-300 uppercase tracking-wider transition hover:bg-slate-800 hover:text-slate-200"
                  onClick={() => loadPreset("sub")}
                  size="sm"
                  variant="outline"
                >
                  Sub
                </Button>
                <Button
                  className="h-8 rounded-lg border-slate-800 bg-slate-850 font-bold text-[11px] text-slate-300 uppercase tracking-wider transition hover:bg-slate-800 hover:text-slate-200"
                  onClick={() => loadPreset("resub")}
                  size="sm"
                  variant="outline"
                >
                  Re-Sub
                </Button>
                <Button
                  className="h-8 rounded-lg border-slate-800 bg-slate-850 font-bold text-[11px] text-slate-300 uppercase tracking-wider transition hover:bg-slate-800 hover:text-slate-200"
                  onClick={() => loadPreset("gift")}
                  size="sm"
                  variant="outline"
                >
                  Gift Sub
                </Button>
                <Button
                  className="h-8 rounded-lg border-slate-800 bg-slate-850 font-bold text-[11px] text-slate-300 uppercase tracking-wider transition hover:bg-slate-800 hover:text-slate-200"
                  onClick={() => loadPreset("follower")}
                  size="sm"
                  variant="outline"
                >
                  Followers
                </Button>
                <Button
                  className="h-8 rounded-lg border-slate-800 bg-slate-850 font-bold text-[11px] text-slate-300 uppercase tracking-wider transition hover:bg-slate-800 hover:text-slate-200"
                  onClick={() => loadPreset("host")}
                  size="sm"
                  variant="outline"
                >
                  Host
                </Button>
                <Button
                  className="h-8 rounded-lg border-slate-800 bg-slate-850 font-bold text-[11px] text-slate-300 uppercase tracking-wider transition hover:bg-slate-800 hover:text-slate-200"
                  onClick={() => loadPreset("kick")}
                  size="sm"
                  variant="outline"
                >
                  KICKs
                </Button>
                <Button
                  className="col-span-2 h-8 rounded-lg border-slate-800 bg-slate-850 font-bold text-[11px] text-slate-300 uppercase tracking-wider transition hover:bg-slate-800 hover:text-slate-200 sm:col-span-1 lg:col-span-3"
                  onClick={() => loadPreset("tip")}
                  size="sm"
                  variant="outline"
                >
                  Tip/Donate
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
                onValueChange={(val) => setSelectedTemplate(val)}
                value={selectedTemplate}
              >
                <SelectTrigger
                  className="border-slate-800 bg-slate-950 font-medium text-slate-100 hover:border-slate-700 focus:ring-1 focus:ring-red-500"
                  id="template-selector"
                >
                  <SelectValue placeholder="Select component type" />
                </SelectTrigger>
                <SelectContent className="border-slate-800 bg-slate-950 text-slate-100">
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
                </SelectContent>
              </Select>
            </div>

            {/* Grid Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label
                  className="font-bold font-mono text-[11px] text-slate-400 uppercase tracking-wider"
                  htmlFor="name-input"
                >
                  Driver Name
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
              <div className="flex flex-col gap-1.5">
                <Label
                  className="font-bold font-mono text-[11px] text-slate-400 uppercase tracking-wider"
                  htmlFor="amount-input"
                >
                  Event Value / Amount
                </Label>
                <Input
                  className="border-slate-800 bg-slate-955 text-slate-100 hover:border-slate-700 focus:ring-1 focus:ring-red-500"
                  id="amount-input"
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 5, $10.00"
                  type="text"
                  value={amount}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                className="font-bold font-mono text-[11px] text-slate-400 uppercase tracking-wider"
                htmlFor="text-input"
              >
                Telemetry Action Text
              </Label>
              <Input
                className="border-slate-800 bg-slate-955 text-slate-100 hover:border-slate-700 focus:ring-1 focus:ring-red-500"
                id="text-input"
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g. followed, subscribed"
                type="text"
                value={text}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                className="font-bold font-mono text-[11px] text-slate-400 uppercase tracking-wider"
                htmlFor="message-input"
              >
                Team Radio Transcript ({"{message}"})
              </Label>
              <Textarea
                className="h-20 resize-none border-slate-800 bg-slate-955 font-mono text-slate-100 hover:border-slate-700 focus:ring-1 focus:ring-red-500"
                id="message-input"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type team radio chat here..."
                value={message}
              />
            </div>

            <div className="mt-2 flex flex-col gap-3">
              <div className="flex gap-3">
                <Button
                  className="flex-1 rounded-lg bg-red-600 py-2.5 font-extrabold text-white text-xs uppercase tracking-wider shadow-[0_4px_12px_rgba(239,68,68,0.2)] transition hover:bg-red-700 active:scale-[0.98]"
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

          {/* Viewport Column */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {/* Viewport Card */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-1.5 font-bold font-mono text-slate-300 text-sm uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 animate-ping rounded-full bg-green-500" />
                  Telemetry Viewport
                </h2>

                {/* Toggles */}
                <div className="flex items-center gap-4">
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

              <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-slate-800/90 bg-emerald-500 shadow-2xl">
                {/* Calibration lines */}
                {showGrid && (
                  <div className="pointer-events-none absolute inset-0 z-10">
                    {/* Horizontal center */}
                    <div className="absolute top-1/2 right-0 left-0 h-[1px] border-white/10 border-t border-dashed bg-white/20" />
                    {/* Vertical center */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-[1px] border-white/10 border-l border-dashed bg-white/20" />

                    {/* Centering bounding box */}
                    <div className="pointer-events-none absolute top-1/4 right-1/4 bottom-1/4 left-1/4 rounded border border-white/5 border-dashed" />
                  </div>
                )}

                {/* Scanlines / Television Effect overlay */}
                <div className="pointer-events-none absolute inset-0 z-20 bg-scanlines opacity-[0.04]" />

                {/* Broadcast details */}
                <div className="absolute top-3 left-3 z-30 flex select-none items-center gap-2 rounded-md border border-slate-800/80 bg-slate-950/85 px-2.5 py-1 font-mono text-[10px] text-slate-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" />
                  OBS BROADCAST VIEWPORT (16:9 CHROMA)
                </div>

                <div className="absolute right-3 bottom-3 z-30 select-none rounded border border-slate-800/80 bg-slate-950/85 px-2 py-1 font-mono text-[10px] text-slate-400">
                  {selectedTemplate.toUpperCase()} / PREVIEW
                </div>

                {/* Native Component Render stage */}
                <div className="z-10 scale-[0.85] transform transition duration-300 sm:scale-100">
                  {triggerKey > 0 ? (
                    <div key={triggerKey}>
                      <AlertComponent
                        amount={amount}
                        message={message}
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
                <pre className="scrollbar-thin scrollbar-thumb-slate-800 max-h-[300px] overflow-x-auto rounded-lg border border-slate-900/80 bg-slate-900/60 p-3 font-mono text-[10px] text-slate-300">
                  <code>{compiledCode}</code>
                </pre>
              </div>
            )}

            {/* Telemetry Telecast specs */}
            <div className="rounded-xl border border-slate-800/60 bg-slate-900/35 p-4 text-slate-400 text-xs leading-relaxed backdrop-blur-sm">
              <span className="mb-2 block border-slate-800/50 border-b pb-1.5 font-bold font-mono text-slate-200 uppercase tracking-wide">
                Botrix Overlay Setup Instructions
              </span>
              <ol className="list-decimal space-y-2 pl-4 text-slate-300">
                <li>
                  Click the{" "}
                  <strong className="text-slate-100">📋 Copy HTML</strong>{" "}
                  button to save the entire widget block to your clipboard.
                </li>
                <li>
                  Open your <strong className="text-slate-100">Botrix</strong>{" "}
                  dashboard, select the alert type tab (e.g. Followers,
                  Subscribers), and navigate to the custom code section.
                </li>
                <li>
                  Paste the copied code directly into the{" "}
                  <strong className="rounded bg-red-400/10 px-1 font-bold font-mono text-[11px] text-red-400">
                    HTML
                  </strong>{" "}
                  input tab.
                </li>
                <li>
                  Clear/empty any custom code in the{" "}
                  <strong className="rounded bg-slate-800 px-1 font-mono text-[11px] text-slate-300">
                    CSS
                  </strong>{" "}
                  and{" "}
                  <strong className="rounded bg-slate-800 px-1 font-mono text-[11px] text-slate-300">
                    JS
                  </strong>{" "}
                  tabs to avoid configuration conflicts.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <style global jsx>{`
        .bg-grid-pattern {
          background-size: 30px 30px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
        }

        .bg-scanlines {
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.25) 50%
          );
          background-size: 100% 4px;
        }

        .bg-slate-850 {
          background-color: #15202b;
        }

        .bg-slate-955 {
          background-color: #0b131a;
        }
      `}</style>
    </main>
  );
}
