"use client";

import { LanguagesIcon } from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/alerts/shared";
import { LOCALES } from "@/lib/alert-utils";
import i18n from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { useTranslation } from "react-i18next";

function LocaleToggle() {
  const locale = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);
  return (
    <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/60 p-0.5">
      {LOCALES.map((l) => (
        <button
          className={`rounded px-1.5 py-0.5 font-bold font-mono text-[10px] uppercase tracking-wider transition ${
            locale === l
              ? "bg-[#e10600] text-white"
              : "text-slate-500 hover:text-slate-200"
          }`}
          key={l}
          onClick={() => {
            setLocale(l);
            i18n.changeLanguage(l).catch(() => {
              /* noop */
            });
          }}
          type="button"
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function ProviderToggle() {
  const provider = useAppStore((s) => s.provider);
  const setProvider = useAppStore((s) => s.setProvider);
  return (
    <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/80 p-0.5 shadow-inner">
      <button
        className={`flex items-center gap-1 rounded px-2.5 py-1 font-bold font-mono text-[10px] uppercase tracking-wider transition-all ${
          provider === "botrix"
            ? "bg-[#DF0631] text-white shadow-[0_0_10px_rgba(223,6,49,0.4)]"
            : "text-slate-400 hover:text-slate-200"
        }`}
        onClick={() => setProvider("botrix")}
        type="button"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Botrix
      </button>
      <button
        className={`flex items-center gap-1 rounded px-2.5 py-1 font-bold font-mono text-[10px] uppercase tracking-wider transition-all ${
          provider === "streamlabs"
            ? "bg-cyan-600 text-white shadow-[0_0_10px_rgba(8,145,178,0.4)]"
            : "text-slate-400 hover:text-slate-200"
        }`}
        onClick={() => setProvider("streamlabs")}
        type="button"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        Streamlabs
      </button>
    </div>
  );
}

export function AlertHeader() {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-20 border-slate-800/80 border-b bg-slate-955/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[95vw] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#e10600] shadow-[0_0_8px_#e10600]" />
            <span className="font-black font-mono text-red-500 text-sm uppercase tracking-widest">
              {t("header.title")}
            </span>
          </div>
          <ProviderToggle />
        </div>
        <nav className="flex items-center gap-6">
          <Link
            className="font-bold text-[#DF0631] text-xs uppercase tracking-wider transition hover:text-red-400"
            href="/"
          >
            {t("header.studio")}
          </Link>
          <Link
            className="font-bold text-slate-400 text-xs uppercase tracking-wider transition hover:text-slate-100"
            href="/instructions"
          >
            {t("header.instructions")}
          </Link>
          <div className="flex items-center gap-1.5">
            <LocaleToggle />
            <LanguagesIcon className="h-3.5 w-3.5 text-slate-500" />
          </div>
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
