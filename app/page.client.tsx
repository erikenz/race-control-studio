"use client";

import { sharedStyles } from "@/components/alerts/shared";
import { SubAlert } from "@/components/alerts/sub-alert";
import { ConfiguratorSidebar } from "@/components/configurator-sidebar";
import { AlertHeader } from "@/components/header";
import { PreviewPanel } from "@/components/preview-panel";
import { alertComponents, getCombinedBotrixHtml } from "@/lib/alert-utils";
import { useAppStore } from "@/lib/store";

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

      {/* Navigation Bar */}
      <AlertHeader />

      {/* Background design elements */}
      <div className="pointer-events-none absolute top-0 right-0 h-125 w-125 rounded-full bg-[#e10600]/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-125 w-125 rounded-full bg-blue-600/5 blur-[120px]" />

      {/* Main Workspace Container */}
      <div className="z-10 mx-auto flex w-full max-w-[95vw] flex-1 flex-col gap-6 overflow-hidden p-4 md:p-6">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* LEFT: Controls Column (col-span-4) */}
          <ConfiguratorSidebar
            onCopyAction={handleCopy}
            onTriggerAction={triggerReplay}
          />

          {/* RIGHT: Viewport Column (col-span-8) */}
          <PreviewPanel
            AlertComponent={AlertComponent}
            compiledCode={compiledCode}
            onCopyAction={handleCopy}
          />
        </div>
      </div>
    </main>
  );
}
