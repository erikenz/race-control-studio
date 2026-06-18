"use client";

import { useEffect } from "react";
import i18n from "@/lib/i18n";
import { useAppStore } from "@/lib/store";

export function LangSetter() {
  const locale = useAppStore((s) => s.locale);

  useEffect(() => {
    document.documentElement.lang = locale;
    i18n.changeLanguage(locale);
  }, [locale]);

  return null;
}
