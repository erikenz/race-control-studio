import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";

export const defaultNS = "translation";

export const resources = {
  en: { translation: en },
  es: { translation: es },
} as const;

const i18nInstance = createInstance();

i18nInstance.use(initReactI18next).init({
  defaultNS,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  lng: "en",
  resources,
});

export default i18nInstance;
