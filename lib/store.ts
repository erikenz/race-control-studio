import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TEAM_RADIO_CONFIGS } from "./radio-config";

// --- Types ---

export type RadioSkinMode = "specific" | "random-all" | "random-selected";
export type ProviderType = "botrix" | "streamlabs";

interface PresetData {
  detailTemplate: string;
  headingTemplate: string;
  message: string;
  name: string;
  template: string;
  text: string;
}

interface AppState {
  activePreset: string;
  activePreviewTeam: string;
  bgColor: string;
  copied: boolean;
  detailTemplate: string;
  headingTemplate: string;
  locale: string;
  message: string;
  name: string;
  persistent: boolean;
  provider: ProviderType;
  radioSkinMode: RadioSkinMode;
  radioTeam: string;
  selectedRadioSkins: string[];
  selectedTemplate: string;
  showCode: boolean;
  showGrid: boolean;
  text: string;
  triggerKey: number;
}

interface AppActions {
  loadPreset: (presetType: string) => void;
  setBgColor: (color: string) => void;
  setCopied: (copied: boolean) => void;
  setDetailTemplate: (template: string) => void;
  setHeadingTemplate: (template: string) => void;
  setLocale: (locale: string) => void;
  setPersistent: (persistent: boolean) => void;
  setProvider: (provider: ProviderType) => void;
  setSelectedSkins: (skins: string[]) => void;
  setShowCode: (show: boolean) => void;
  setShowGrid: (show: boolean) => void;
  setSkinMode: (mode: RadioSkinMode) => void;
  setSpecificTeam: (team: string) => void;
  triggerReplay: () => void;
}

export type AppStore = AppState & AppActions;

// --- Presets ---

export const LOCALIZED_PRESETS: Record<string, Record<string, PresetData>> = {
  en: {
    followers: {
      detailTemplate: "Grid entry - new follower!",
      headingTemplate: "RACE CONTROL: {name} GRID ENTRY",
      message: "",
      name: "Test_User",
      template: "followers",
      text: "Grid entry - new follower!",
    },
    "gift-sub": {
      detailTemplate: "Gifted 5 subscriptions!",
      headingTemplate: "RACE CONTROL: {name} GIFT INCIDENT",
      message: "",
      name: "Test_User",
      template: "gift-sub",
      text: "Gifted 5 subscriptions!",
    },
    host: {
      detailTemplate: "Restart incident: joined with 120 viewers!",
      headingTemplate: "RACE CONTROL: {name} RESTART INCIDENT",
      message: "",
      name: "Test_User",
      template: "host",
      text: "Restart incident: joined with 120 viewers!",
    },
    kicks: {
      detailTemplate: "sent 500 Kicks!",
      headingTemplate: "RACE CONTROL: {name} KICK INCIDENT",
      message: "This is a test message",
      name: "Test_User",
      template: "kicks",
      text: "sent 500 Kicks!",
    },
    subscription: {
      detailTemplate: "stayed with the team for 12 months!",
      headingTemplate: "RACE CONTROL: {name} RENEWAL INCIDENT",
      message: "This is a test message",
      name: "Test_User",
      template: "subscription",
      text: "stayed with the team for 12 months!",
    },
    "tip-donate": {
      detailTemplate: "tipped $15.00 USD",
      headingTemplate: "RACE CONTROL: {name} PIT STOP INCIDENT",
      message: "This is a test message",
      name: "Test_User",
      template: "tip-donate",
      text: "tipped $15.00 USD",
    },
  },
  es: {
    followers: {
      detailTemplate: "¡Ingreso a pista - nuevo seguidor!",
      headingTemplate: "CONTROL DE CARRERA: INGRESO A PISTA DE {name}",
      message: "",
      name: "Usuario_Prueba",
      template: "followers",
      text: "¡Ingreso a pista - nuevo seguidor!",
    },
    "gift-sub": {
      detailTemplate: "¡Regaló 5 suscripciones!",
      headingTemplate: "CONTROL DE CARRERA: INCIDENTE DE REGALO DE {name}",
      message: "",
      name: "Usuario_Prueba",
      template: "gift-sub",
      text: "¡Regaló 5 suscripciones!",
    },
    host: {
      detailTemplate: "¡Reinicio de carrera: se unió con 120 espectadores!",
      headingTemplate: "CONTROL DE CARRERA: REINICIO CON {name}",
      message: "",
      name: "Usuario_Prueba",
      template: "host",
      text: "¡Reinicio de carrera: se unió con 120 espectadores!",
    },
    kicks: {
      detailTemplate: "¡envió 500 Kicks!",
      headingTemplate: "CONTROL DE CARRERA: INCIDENTE KICK DE {name}",
      message: "Este es un mensaje de prueba",
      name: "Usuario_Prueba",
      template: "kicks",
      text: "¡envió 500 Kicks!",
    },
    subscription: {
      detailTemplate: "¡permanece en el equipo por 12 meses!",
      headingTemplate: "CONTROL DE CARRERA: RENOVACIÓN DE {name}",
      message: "Este es un mensaje de prueba",
      name: "Usuario_Prueba",
      template: "subscription",
      text: "¡permanece en el equipo por 12 meses!",
    },
    "tip-donate": {
      detailTemplate: "¡donó $15.00 USD!",
      headingTemplate: "CONTROL DE CARRERA: PARADA EN PITS DE {name}",
      message: "Este es un mensaje de prueba",
      name: "Usuario_Prueba",
      template: "tip-donate",
      text: "¡donó $15.00 USD!",
    },
  },
};

export const PRESETS: Record<string, PresetData> = LOCALIZED_PRESETS.en;

export const PRESET_LABELS: Record<string, string> = {
  followers: "Followers",
  "gift-sub": "Gift Sub",
  host: "Host",
  kicks: "KICKs",
  subscription: "Subscription",
  "tip-donate": "Tip/Donate",
};

// --- Known Default Heading Checker ---

const KNOWN_DEFAULT_HEADINGS = new Set([
  "RACE CONTROL: {name} RENEWAL INCIDENT",
  "CONTROL DE CARRERA: RENOVACIÓN DE {name}",
  "RACE CONTROL: {name} GRID ENTRY",
  "CONTROL DE CARRERA: INGRESO A PISTA DE {name}",
  "RACE CONTROL: {name} GIFT INCIDENT",
  "CONTROL DE CARRERA: INCIDENTE DE REGALO DE {name}",
  "RACE CONTROL: {name} RESTART INCIDENT",
  "CONTROL DE CARRERA: REINICIO CON {name}",
  "RACE CONTROL: {name} KICK INCIDENT",
  "CONTROL DE CARRERA: INCIDENTE KICK DE {name}",
  "RACE CONTROL: {name} PIT STOP INCIDENT",
  "CONTROL DE CARRERA: PARADA EN PITS DE {name}",
  "RACE CONTROL: {messageTemplate}",
]);

function isDefaultHeading(value: string): boolean {
  return KNOWN_DEFAULT_HEADINGS.has(value.trim());
}

// --- Helpers ---

const TEAM_KEYS = Object.keys(TEAM_RADIO_CONFIGS);

function determinePreviewTeam(
  mode: RadioSkinMode,
  selectedSkins: string[],
  specificTeam: string
): string {
  if (mode === "specific") {
    return specificTeam;
  }
  let pool: string[];
  if (mode === "random-all") {
    pool = TEAM_KEYS;
  } else if (selectedSkins.length > 0) {
    pool = selectedSkins;
  } else {
    pool = ["ferrari"];
  }
  return pool[Math.floor(Math.random() * pool.length)] || "ferrari";
}

// --- Initial State ---

export const TEST_VALUES = {
  amount: "$15.00 USD",
  message: "this is a test message",
  name: "test-user",
  text: "tipped $15.00 USD",
} as const;

const INITIAL_STATE: AppState = {
  activePreset: "subscription",
  activePreviewTeam: "ferrari",
  bgColor: "grid",
  copied: false,
  detailTemplate: LOCALIZED_PRESETS.en.subscription.detailTemplate,
  headingTemplate: LOCALIZED_PRESETS.en.subscription.headingTemplate,
  locale: "en",
  message: TEST_VALUES.message,
  name: TEST_VALUES.name,
  persistent: false,
  provider: "botrix",
  radioSkinMode: "specific",
  radioTeam: "ferrari",
  selectedRadioSkins: ["ferrari", "mercedes", "redbull"],
  selectedTemplate: "subscription",
  showCode: false,
  showGrid: true,
  text: TEST_VALUES.text,
  triggerKey: 1,
};

// --- Store ---

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      loadPreset: (presetType) => {
        const state = get();
        const localePresets =
          LOCALIZED_PRESETS[state.locale] || LOCALIZED_PRESETS.en;
        const preset = localePresets[presetType];
        if (!preset) {
          return;
        }
        set({
          activePreset: presetType,
          activePreviewTeam: determinePreviewTeam(
            state.radioSkinMode,
            state.selectedRadioSkins,
            state.radioTeam
          ),
          detailTemplate: preset.detailTemplate,
          headingTemplate: preset.headingTemplate,
          message: TEST_VALUES.message,
          name: TEST_VALUES.name,
          selectedTemplate: preset.template,
          text: TEST_VALUES.text,
          triggerKey: state.triggerKey + 1,
        });
      },
      setBgColor: (bgColor) => set({ bgColor }),
      setCopied: (copied) => set({ copied }),
      setDetailTemplate: (detailTemplate) => set({ detailTemplate }),
      setHeadingTemplate: (headingTemplate) => set({ headingTemplate }),

      setLocale: (locale) => {
        const state = get();
        if (state.locale === locale) {
          return;
        }

        const localePresets = LOCALIZED_PRESETS[locale] || LOCALIZED_PRESETS.en;
        const targetPreset =
          localePresets[state.activePreset] || localePresets.subscription;

        const updateHeading = isDefaultHeading(state.headingTemplate);
        const updateDetail = state.detailTemplate === "";

        set({
          detailTemplate: updateDetail
            ? targetPreset.detailTemplate
            : state.detailTemplate,
          headingTemplate: updateHeading
            ? targetPreset.headingTemplate
            : state.headingTemplate,
          locale,
          message: TEST_VALUES.message,
          name: TEST_VALUES.name,
          text: TEST_VALUES.text,
        });
      },

      setPersistent: (persistent) => set({ persistent }),

      setProvider: (provider) => set({ provider }),

      setSelectedSkins: (skins) => {
        const state = get();
        set({
          activePreviewTeam: determinePreviewTeam(
            state.radioSkinMode,
            skins,
            state.radioTeam
          ),
          selectedRadioSkins: skins,
        });
      },
      setShowCode: (showCode) => set({ showCode }),
      setShowGrid: (showGrid) => set({ showGrid }),

      setSkinMode: (mode) => {
        const state = get();
        set({
          activePreviewTeam: determinePreviewTeam(
            mode,
            state.selectedRadioSkins,
            state.radioTeam
          ),
          radioSkinMode: mode,
        });
      },

      setSpecificTeam: (team) => {
        const state = get();
        set({
          activePreviewTeam:
            state.radioSkinMode === "specific" ? team : state.activePreviewTeam,
          radioTeam: team,
        });
      },

      triggerReplay: () => {
        const state = get();
        set({
          activePreviewTeam: determinePreviewTeam(
            state.radioSkinMode,
            state.selectedRadioSkins,
            state.radioTeam
          ),
          triggerKey: state.triggerKey + 1,
        });
      },
    }),
    {
      name: "race-control-studio",
      partialize: (state) => {
        const {
          activePreset,
          activePreviewTeam,
          bgColor,
          detailTemplate,
          headingTemplate,
          locale,
          persistent,
          provider,
          radioSkinMode,
          radioTeam,
          selectedRadioSkins,
          selectedTemplate,
          showCode,
          showGrid,
        } = state;
        return {
          activePreset,
          activePreviewTeam,
          bgColor,
          detailTemplate,
          headingTemplate,
          locale,
          persistent,
          provider,
          radioSkinMode,
          radioTeam,
          selectedRadioSkins,
          selectedTemplate,
          showCode,
          showGrid,
        };
      },
      storage: createJSONStorage(() => localStorage),
    }
  )
);
