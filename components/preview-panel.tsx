import { type ComponentType, useEffect, useRef, useState } from "react";
import { RadioAlert } from "@/components/alerts/radio-alert";
import type { AlertProps } from "@/components/alerts/shared";
import { Label } from "@/components/ui/label";
import { BG_CLASSES, resolveHeading } from "@/lib/alert-utils";
import { useAppStore } from "@/lib/store";
import { useTranslation } from "react-i18next";

function AlertPreviewFeed({
  AlertComponent,
}: {
  AlertComponent: ComponentType<AlertProps>;
}) {
  const { t } = useTranslation();
  const provider = useAppStore((s) => s.provider);
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
  const heading = resolveHeading(
    headingTemplate,
    name,
    text,
    message,
    provider
  );
  const bgClass = BG_CLASSES[bgColor] || "bg-grid-pattern bg-slate-900";

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.35);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setScale(width / 1920);
        }
      }
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const allowsMessage = ["subscription", "tip-donate", "kicks"].includes(
    selectedTemplate
  );
  const showRadio = allowsMessage && message.trim() !== "";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="flex items-center gap-1.5 font-bold font-mono text-slate-350 text-xs uppercase tracking-wider">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          {t("preview.title")}
        </h2>

        {/* Viewport Settings */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Background Selector */}
          <div className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-800 bg-slate-955 p-0.5">
            {(["chroma", "grid", "black"] as const).map((bg) => (
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
                {t(
                  `preview.bg${bg.charAt(0).toUpperCase() + bg.slice(1)}` as const
                )}
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
              {t("preview.alignmentGrid")}
            </Label>
          </div>
        </div>
      </div>

      <div
        className={`relative aspect-video w-full overflow-hidden rounded-xl border border-slate-800/90 shadow-2xl transition-all duration-300 ${bgClass}`}
        ref={containerRef}
      >
        {/* Scaled 1920x1080 OBS Canvas Stage */}
        <div
          className="pointer-events-none absolute top-0 left-0 h-[1080px] w-[1920px] origin-top-left"
          style={{ transform: `scale(${scale})` }}
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

          {/* Render stage */}
          <div className="pointer-events-auto relative z-10 h-full w-full">
            {triggerKey > 0 && (
              <div className="h-full w-full" key={triggerKey}>
                {/* Standard F1 Race Control Alert (Top Center - 40px top) */}
                <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-[40px]">
                  <div className="pointer-events-auto">
                    <AlertComponent heading={heading} name={name} text={text} />
                  </div>
                </div>

                {/* Radio Alert (Bottom Right - 80px bottom & right) */}
                {showRadio && (
                  <div className="pointer-events-none absolute inset-0 flex items-end justify-end pr-[80px] pb-[80px]">
                    <div className="pointer-events-auto">
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
    </div>
  );
}

export function PreviewPanel({
  AlertComponent,
  compiledCode,
  onCopyAction,
}: {
  AlertComponent: ComponentType<AlertProps>;
  compiledCode: string;
  onCopyAction: () => void;
}) {
  const { t } = useTranslation();
  const showCode = useAppStore((s) => s.showCode);
  return (
    <div className="flex flex-col gap-4 lg:col-span-6 xl:col-span-6">
      <AlertPreviewFeed AlertComponent={AlertComponent} />

      {/* Code Inspection Area */}
      {showCode && (
        <div className="relative flex flex-col gap-3 rounded-xl border border-slate-850 bg-slate-955 p-4 shadow-inner">
          <div className="flex items-center justify-between border-slate-900 border-b pb-2">
            <span className="font-bold font-mono text-slate-400 text-xs uppercase tracking-wider">
              {t("codePanel.title")}
            </span>
            <button
              className="font-bold font-mono text-[#DF0631] text-xs uppercase tracking-widest hover:text-red-400"
              onClick={onCopyAction}
              type="button"
            >
              {t("codePanel.copyBtn")}
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
