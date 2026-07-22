import type { Metadata } from "next";
import Link from "next/link";
import { GithubIcon, sharedStyles } from "@/components/alerts/shared";

export const metadata: Metadata = {
  description:
    "Import, customize, and deploy Race Control Studio F1 alert widgets in your Botrix or Streamlabs streaming dashboard.",
  title: "Setup Guide - Race Control Studio",
};

export default function InstructionsPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-grid-pattern bg-slate-950 font-sans text-slate-100">
      <style>{sharedStyles}</style>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-20 border-slate-800/80 border-b bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#e10600] shadow-[0_0_8px_#e10600]" />
            <span className="font-black font-mono text-red-500 text-sm uppercase tracking-widest">
              Race Control Studio
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              className="font-bold text-slate-400 text-xs uppercase tracking-wider transition hover:text-slate-100"
              href="/"
            >
              Studio
            </Link>
            <Link
              className="font-bold text-[#DF0631] text-xs uppercase tracking-wider transition hover:text-red-400"
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

      {/* Background design elements */}
      <div className="pointer-events-none absolute top-0 right-0 h-100 w-100 rounded-full bg-[#e10600]/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-100 w-100 rounded-full bg-cyan-600/5 blur-[100px]" />

      {/* Content Container */}
      <div className="z-10 mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-2 border-slate-800/80 border-b pb-6">
            <span className="font-bold font-mono text-red-500 text-xs uppercase tracking-wider">
              System Documentation
            </span>
            <h1 className="font-black text-3xl uppercase tracking-tight md:text-4xl">
              Streaming Platform Integration Guide
            </h1>
            <p className="max-w-2xl text-slate-400 text-sm leading-relaxed">
              Step-by-step instructions for importing, customizing, and styling
              your custom Formula 1 incident alert widgets directly inside
              Botrix or Streamlabs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Botrix Integration Column */}
            <div className="flex flex-col gap-6">
              <section className="flex flex-col gap-4 rounded-xl border border-slate-800/80 bg-slate-900/30 p-5 shadow-lg backdrop-blur-sm md:p-6">
                <div className="flex items-center justify-between border-slate-800 border-b pb-3">
                  <h2 className="flex items-center gap-2 font-extrabold text-base text-slate-100 uppercase tracking-wide">
                    <span className="h-2 w-2 rounded-full bg-[#DF0631]" />
                    Botrix Setup Guide
                  </h2>
                  <span className="rounded bg-red-500/10 px-2 py-0.5 font-mono text-red-400 text-xs">
                    Botrix
                  </span>
                </div>
                <ol className="list-decimal space-y-3.5 pl-5 text-slate-355 text-xs sm:text-sm">
                  <li>
                    <strong className="text-slate-100">
                      Select Botrix Mode:
                    </strong>{" "}
                    Switch the provider toggle to Botrix in the header.
                  </li>
                  <li>
                    <strong className="text-slate-100">Copy the Code:</strong>{" "}
                    Click the{" "}
                    <code className="rounded bg-slate-900 px-1.5 py-0.5 text-red-400 text-xs">
                      Copy HTML
                    </code>{" "}
                    button.
                  </li>
                  <li>
                    <strong className="text-slate-100">Open Botrix:</strong>{" "}
                    Navigate to{" "}
                    <strong className="text-slate-200">Alerts</strong> in your
                    Botrix dashboard.
                  </li>
                  <li>
                    <strong className="text-slate-100">
                      Enable Custom Code:
                    </strong>{" "}
                    Turn on the{" "}
                    <strong className="text-red-400">Custom Code</strong>{" "}
                    toggle.
                  </li>
                  <li>
                    <strong className="text-slate-100">Paste HTML:</strong>{" "}
                    Paste into the{" "}
                    <strong className="text-slate-200">HTML</strong> tab. Clear
                    the CSS/JS tabs completely.
                  </li>
                </ol>

                <div className="mt-2 flex flex-col gap-2 rounded-lg border border-slate-900 bg-slate-950 p-3 font-mono text-[11px]">
                  <span className="font-bold text-red-400">
                    Botrix Supported Variables:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-slate-300">
                    <span>• {"{name}"}</span>
                    <span>• {"{text}"}</span>
                    <span>• {"{message}"}</span>
                    <span>• {"{amount}"}</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Streamlabs Integration Column */}
            <div className="flex flex-col gap-6">
              <section className="flex flex-col gap-4 rounded-xl border border-cyan-900/40 bg-slate-900/30 p-5 shadow-lg backdrop-blur-sm md:p-6">
                <div className="flex items-center justify-between border-slate-800 border-b pb-3">
                  <h2 className="flex items-center gap-2 font-extrabold text-base text-slate-100 uppercase tracking-wide">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    Streamlabs Setup Guide
                  </h2>
                  <span className="rounded bg-cyan-500/10 px-2 py-0.5 font-mono text-cyan-400 text-xs">
                    Streamlabs
                  </span>
                </div>
                <ol className="list-decimal space-y-3.5 pl-5 text-slate-355 text-xs sm:text-sm">
                  <li>
                    <strong className="text-slate-100">
                      Select Streamlabs Mode:
                    </strong>{" "}
                    Switch the provider toggle to Streamlabs in the header.
                  </li>
                  <li>
                    <strong className="text-slate-100">
                      Copy Widget Code:
                    </strong>{" "}
                    Click the{" "}
                    <code className="rounded bg-slate-900 px-1.5 py-0.5 text-cyan-400 text-xs">
                      Copy HTML
                    </code>{" "}
                    button.
                  </li>
                  <li>
                    <strong className="text-slate-100">Open Alert Box:</strong>{" "}
                    Log in to Streamlabs and navigate to{" "}
                    <strong className="text-slate-200">Alert Box</strong>.
                  </li>
                  <li>
                    <strong className="text-slate-100">
                      Enable Custom HTML/CSS:
                    </strong>{" "}
                    Select your alert category and enable{" "}
                    <strong className="text-cyan-400">Custom HTML/CSS</strong>.
                  </li>
                  <li>
                    <strong className="text-slate-100">
                      Paste & Clear CSS:
                    </strong>{" "}
                    Paste the snippet in the{" "}
                    <strong className="text-slate-200">HTML</strong> tab and
                    clear the CSS tab.
                  </li>
                </ol>

                <div className="mt-2 flex flex-col gap-2 rounded-lg border border-slate-900 bg-slate-955 p-3 font-mono text-[11px]">
                  <span className="font-bold text-cyan-400">
                    Streamlabs Supported Variables:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-slate-300">
                    <span>• {"{messageTemplate}"}</span>
                    <span>• {"{userMessage}"}</span>
                    <span>• {"{img}"}</span>
                    <span>• {"{name}"}</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
