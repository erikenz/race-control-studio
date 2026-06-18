"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TEAM_RADIO_CONFIGS } from "@/lib/radio-config";
import { PRESET_LABELS, PRESETS, useAppStore } from "@/lib/store";
import { Trans, useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-slate-900/80 bg-slate-955/50 p-4">
      <h4 className="flex items-center gap-1.5 font-bold font-mono text-slate-300 text-xs uppercase tracking-widest">
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
        {t("instructions.title")}
      </h4>
      <ol className="list-decimal space-y-2 pl-4 text-slate-400 text-xs leading-normal">
        <li>{t("instructions.step1")}</li>
        <li>
          <Trans
            components={[<strong className="text-slate-200" key="alerts" />]}
            i18nKey="instructions.step2"
          />
        </li>
        <li>
          <Trans
            components={[<strong className="text-[#DF0631]" key="tab" />]}
            i18nKey="instructions.step3"
            values={{ tab: botrixTab }}
          />
        </li>
        <li>
          <Trans
            components={[
              <strong className="text-slate-200" key="custom-code" />,
              <strong className="text-slate-200" key="html" />,
            ]}
            i18nKey="instructions.step4"
          />
        </li>
        <li>
          <Trans
            components={[
              <strong className="text-slate-200" key="css" />,
              <strong className="text-slate-200" key="js" />,
            ]}
            i18nKey="instructions.step5"
          />
        </li>
      </ol>
    </div>
  );
}

function BotrixVariablesSection() {
  const name = useAppStore((s) => s.name);
  const text = useAppStore((s) => s.text);
  const message = useAppStore((s) => s.message);
  const selectedTemplate = useAppStore((s) => s.selectedTemplate);
  const setName = useAppStore((s) => s.setName);
  const setText = useAppStore((s) => s.setText);
  const setMessage = useAppStore((s) => s.setMessage);
  const allowsMessage = ["subscription", "tip-donate", "kicks"].includes(
    selectedTemplate
  );

  const inputClass =
    "h-9 border-slate-800 bg-slate-955 text-slate-100 text-sm hover:border-slate-700 focus:ring-1 focus:ring-red-500";
  const labelClass =
    "font-bold font-mono text-slate-300 text-xs uppercase tracking-wider";
  const descClass = "text-slate-500 text-[11px] leading-relaxed -mt-0.5";

  return (
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

      <div className="flex flex-col gap-1.5">
        <Label className={labelClass} htmlFor="name-input">
          Name
        </Label>
        <p className={descClass}>
          Maps to the{" "}
          <code className="font-mono text-[#DF0631]">{"{name}"}</code> Botrix
          variable.
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

      <div className="flex flex-col gap-1.5">
        <Label className={labelClass} htmlFor="text-input">
          Alert Text
        </Label>
        <p className={descClass}>
          Maps to the{" "}
          <code className="font-mono text-[#DF0631]">{"{text}"}</code> Botrix
          variable.
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

      {allowsMessage && (
        <div className="flex flex-col gap-1.5">
          <Label className={labelClass} htmlFor="message-input">
            Custom User Message (Radio)
          </Label>
          <p className={descClass}>
            Maps to the{" "}
            <code className="font-mono text-[#DF0631]">{"{message}"}</code>{" "}
            Botrix variable.
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
  );
}

function AlertContentsSection() {
  const headingTemplate = useAppStore((s) => s.headingTemplate);
  const radioSkinMode = useAppStore((s) => s.radioSkinMode);
  const radioTeam = useAppStore((s) => s.radioTeam);
  const selectedRadioSkins = useAppStore((s) => s.selectedRadioSkins);
  const persistent = useAppStore((s) => s.persistent);
  const selectedTemplate = useAppStore((s) => s.selectedTemplate);
  const setHeadingTemplate = useAppStore((s) => s.setHeadingTemplate);
  const setSkinMode = useAppStore((s) => s.setSkinMode);
  const setSpecificTeam = useAppStore((s) => s.setSpecificTeam);
  const setSelectedSkins = useAppStore((s) => s.setSelectedSkins);
  const setPersistent = useAppStore((s) => s.setPersistent);
  const allowsMessage = ["subscription", "tip-donate", "kicks"].includes(
    selectedTemplate
  );

  const inputClass =
    "h-9 border-slate-800 bg-slate-955 text-slate-100 text-sm hover:border-slate-700 focus:ring-1 focus:ring-red-500";
  const labelClass =
    "font-bold font-mono text-slate-300 text-xs uppercase tracking-wider";
  const descClass = "text-slate-500 text-[11px] leading-relaxed -mt-0.5";

  return (
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
        placeholders to reference the Botrix variables above. These are replaced
        at preview time and in the generated HTML.
      </p>

      <div className="flex flex-col gap-1.5">
        <Label className={labelClass} htmlFor="heading-template-input">
          Heading Template
        </Label>
        <p className={descClass}>
          The first line of the alert banner. Use{" "}
          <code className="font-mono text-[#DF0631]">{"{name}"}</code>,{" "}
          <code className="font-mono text-[#DF0631]">{"{text}"}</code>, and{" "}
          <code className="font-mono text-[#DF0631]">{"{message}"}</code>{" "}
          placeholders.
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

      {allowsMessage && (
        <>
          <div className="flex flex-col gap-1.5">
            <Label className={labelClass}>Radio Skin Mode</Label>
            <p className={descClass}>
              Controls the radio card skin in the bottom-right corner.
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
                The team whose colors, shield, and number appear on the card.
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
                Only checked teams are used when picking a random skin.
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
  );
}

function ExportSection({
  onCopyAction,
  onTriggerAction,
}: {
  onCopyAction: () => void;
  onTriggerAction: () => void;
}) {
  const copied = useAppStore((s) => s.copied);
  const showCode = useAppStore((s) => s.showCode);
  const setShowCode = useAppStore((s) => s.setShowCode);

  return (
    <div className="flex flex-col gap-3 border-slate-800/60 border-t pt-4">
      <div className="flex gap-3">
        <Button
          className={`flex-1 rounded-lg py-2.5 font-extrabold text-xs uppercase tracking-wider transition-all active:scale-[0.98] ${
            copied
              ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:bg-emerald-700"
              : "bg-[#DF0631] text-white shadow-[0_4px_12px_rgba(223,6,49,0.2)] hover:bg-[#c3052a]"
          }`}
          onClick={onCopyAction}
        >
          {copied ? "🏁 COPIED HTML!" : "📋 COPY HTML"}
        </Button>

        <Button
          className="flex-1 rounded-lg border border-slate-700 bg-slate-800/40 py-2.5 font-extrabold text-slate-200 text-xs uppercase tracking-wider transition-all hover:bg-slate-700 hover:text-white active:scale-[0.98]"
          onClick={onTriggerAction}
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
  );
}

export function ConfiguratorSidebar({
  onCopyAction,
  onTriggerAction,
}: {
  onCopyAction: () => void;
  onTriggerAction: () => void;
}) {
  return (
    <div className="relative flex flex-col gap-5 overflow-y-auto rounded-xl border border-slate-800/85 bg-slate-900/40 p-5 shadow-2xl backdrop-blur-md md:p-6 lg:sticky lg:top-4 lg:col-span-4 lg:max-h-[calc(100dvh-5.5rem)] xl:col-span-3">
      <div className="absolute top-0 left-6 h-0.75 w-24 bg-[#e10600]" />

      <h2 className="flex items-center justify-between border-slate-800/60 border-b pb-3 font-extrabold text-lg uppercase tracking-wide">
        <span>Alert Configurator</span>
        <span className="rounded bg-red-500/10 px-2 py-0.5 font-mono font-semibold text-red-500 text-xs">
          FORMULA-1
        </span>
      </h2>

      <div className="flex flex-col gap-2">
        <Label className="font-bold font-mono text-slate-400 text-xs uppercase tracking-wider">
          Test Alerts Presets
        </Label>
        <QuickPresetsDeck />
      </div>

      <BotrixVariablesSection />
      <AlertContentsSection />
      <ExportSection
        onCopyAction={onCopyAction}
        onTriggerAction={onTriggerAction}
      />
      <QuickInstructionsCard />
    </div>
  );
}
