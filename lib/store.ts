import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TEAM_RADIO_CONFIGS } from "./radio-config";

// --- Types ---

export type RadioSkinMode = "specific" | "random-all" | "random-selected";
export type ProviderType = "botrix" | "streamlabs";

interface PresetData {
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
  setHeadingTemplate: (template: string) => void;
  setLocale: (locale: string) => void;
  setMessage: (message: string) => void;
  setName: (name: string) => void;
  setPersistent: (persistent: boolean) => void;
  setProvider: (provider: ProviderType) => void;
  setSelectedSkins: (skins: string[]) => void;
  setShowCode: (show: boolean) => void;
  setShowGrid: (show: boolean) => void;
  setSkinMode: (mode: RadioSkinMode) => void;
  setSpecificTeam: (team: string) => void;
  setText: (text: string) => void;
  triggerReplay: () => void;
}

export type AppStore = AppState & AppActions;

// --- Presets ---

export const PRESETS: Record<string, PresetData> = {
  followers: {
    headingTemplate: "RACE CONTROL: {name} GRID ENTRY",
    message: "",
    name: "Rookie_Driver",
    template: "followers",
    text: "Grid entry - green light on track!",
  },
  "gift-sub": {
    headingTemplate: "RACE CONTROL: {name} GIFT INCIDENT",
    message: "",
    name: "Team_Principal",
    template: "gift-sub",
    text: "Sponsored 5 drivers in the pit lane!",
  },
  host: {
    headingTemplate: "RACE CONTROL: {name} RESTART INCIDENT",
    message: "",
    name: "Safety_Car",
    template: "host",
    text: "Restart incident: joined force with 120 viewers!",
  },
  kicks: {
    headingTemplate: "RACE CONTROL: {name} KICK INCIDENT",
    message: "Launch control active! First row start on Kick!",
    name: "KickStreamer",
    template: "kicks",
    text: "sent 500 Kicks!",
  },
  subscription: {
    headingTemplate: "RACE CONTROL: {name} RENEWAL INCIDENT",
    message: "Staying with the team. 12 months completed!",
    name: "HAMILTON_44",
    template: "subscription",
    text: "stayed with the team for 12 months!",
  },
  "tip-donate": {
    headingTemplate: "RACE CONTROL: {name} PIT STOP INCIDENT",
    message: "For tyre compound upgrade!",
    name: "Pit_Crew",
    template: "tip-donate",
    text: "tipped $15.00 USD",
  },
};

export const PRESET_LABELS: Record<string, string> = {
  followers: "Followers",
  "gift-sub": "Gift Sub",
  host: "Host",
  kicks: "KICKs",
  subscription: "Subscription",
  "tip-donate": "Tip/Donate",
};

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

const INITIAL_STATE: AppState = {
  activePreset: "subscription",
  activePreviewTeam: "ferrari",
  bgColor: "grid",
  copied: false,
  headingTemplate: PRESETS.subscription.headingTemplate,
  locale: "en",
  message: "Staying with the team. 12 months completed!",
  name: "HAMILTON_44",
  persistent: false,
  provider: "botrix",
  radioSkinMode: "specific",
  radioTeam: "ferrari",
  selectedRadioSkins: ["ferrari", "mercedes", "redbull"],
  selectedTemplate: "subscription",
  showCode: false,
  showGrid: true,
  text: "stayed with the team for 12 months!",
  triggerKey: 1,
};

// --- Store ---

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      loadPreset: (presetType) => {
        const preset = PRESETS[presetType];
        if (!preset) {
          return;
        }
        const state = get();
        set({
          activePreset: presetType,
          activePreviewTeam: determinePreviewTeam(
            state.radioSkinMode,
            state.selectedRadioSkins,
            state.radioTeam
          ),
          headingTemplate: preset.headingTemplate,
          message: preset.message,
          name: preset.name,
          selectedTemplate: preset.template,
          text: preset.text,
          triggerKey: state.triggerKey + 1,
        });
      },
      setBgColor: (bgColor) => set({ bgColor }),
      setCopied: (copied) => set({ copied }),
      setHeadingTemplate: (headingTemplate) => set({ headingTemplate }),
      setLocale: (locale) => set({ locale }),

      setMessage: (message) => set({ message }),

      setName: (name) => set({ name }),

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
      setText: (text) => set({ text }),

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
          headingTemplate,
          locale,
          message,
          name,
          persistent,
          provider,
          radioSkinMode,
          radioTeam,
          selectedRadioSkins,
          selectedTemplate,
          showCode,
          showGrid,
          text,
        } = state;
        return {
          activePreset,
          activePreviewTeam,
          bgColor,
          headingTemplate,
          locale,
          message,
          name,
          persistent,
          provider,
          radioSkinMode,
          radioTeam,
          selectedRadioSkins,
          selectedTemplate,
          showCode,
          showGrid,
          text,
        };
      },
      storage: createJSONStorage(() => localStorage),
    }
  )
);
