import type { ComponentType } from "react";
import { FollowerAlert } from "@/components/alerts/follower-alert";
import { GiftSubAlert } from "@/components/alerts/gift-sub-alert";
import { HostAlert } from "@/components/alerts/host-alert";
import { KickAlert } from "@/components/alerts/kick-alert";
import { radioAlertStyles } from "@/components/alerts/radio-alert";
import {
  type AlertProps,
  f1LogoSvg,
  sharedStyles,
} from "@/components/alerts/shared";
import { SubAlert } from "@/components/alerts/sub-alert";
import { TipAlert } from "@/components/alerts/tip-alert";
import { TEAM_RADIO_CONFIGS } from "@/lib/radio-config";

export function resolveHeading(
  template: string,
  name: string,
  text: string,
  message: string,
  provider: "botrix" | "streamlabs" = "botrix"
): string {
  if (provider === "streamlabs") {
    const defaultTemplateText = `${name} ${text}`.trim();
    return template
      .replace(/\{messageTemplate\}/g, defaultTemplateText.toUpperCase())
      .replace(/\{userMessage\}/g, message.toUpperCase())
      .replace(/\{name\}/g, name.toUpperCase())
      .replace(/\{text\}/g, text.toUpperCase())
      .replace(/\{message\}/g, message.toUpperCase());
  }
  return template
    .replace(/\{name\}/g, name.toUpperCase())
    .replace(/\{text\}/g, text.toUpperCase())
    .replace(/\{message\}/g, message.toUpperCase());
}

export type AlertComponentType = ComponentType<AlertProps> & {
  getBotrixHtml: (headingTemplate?: string) => string;
  getStreamlabsHtml: (headingTemplate?: string) => string;
};

export const alertComponents: Record<string, AlertComponentType> = {
  followers: FollowerAlert,
  "gift-sub": GiftSubAlert,
  host: HostAlert,
  kicks: KickAlert,
  subscription: SubAlert,
  "tip-donate": TipAlert,
};

export const BG_CLASSES: Record<string, string> = {
  black: "bg-slate-955",
  chroma: "bg-[#00ff00]",
};

export const LOCALES = ["en", "es"];

export function getCombinedBotrixHtml(
  _template: string,
  persistent: boolean,
  radioSkinMode: "specific" | "random-all" | "random-selected",
  selectedRadioSkins: string[],
  radioTeam: string,
  headingTemplate: string
) {
  let allowedTeams: string[];
  if (radioSkinMode === "specific") {
    allowedTeams = [radioTeam];
  } else if (radioSkinMode === "random-all") {
    allowedTeams = Object.keys(TEAM_RADIO_CONFIGS);
  } else {
    allowedTeams =
      selectedRadioSkins.length > 0 ? selectedRadioSkins : ["ferrari"];
  }

  const defaultTeamKey = allowedTeams[0] || "ferrari";
  const defaultConfig =
    TEAM_RADIO_CONFIGS[defaultTeamKey] || TEAM_RADIO_CONFIGS.ferrari;

  const serializedConfigs = Object.fromEntries(
    Object.entries(TEAM_RADIO_CONFIGS).map(([key, cfg]) => [
      key,
      {
        accent: cfg.cssVars.accent,
        bg: cfg.cssVars.bg,
        fallbackNumber: cfg.fallbackDriverNumber || "16",
        id: cfg.id,
        primary: cfg.cssVars.primary,
        shieldSvg: cfg.shieldSvg.replace(/\n\s*/g, " ").trim(),
        wave: cfg.cssVars.wave,
      },
    ])
  );

  const configsJson = JSON.stringify(serializedConfigs);
  const allowedJson = JSON.stringify(allowedTeams);

  const teamStyles = `
    .radio-card {
      --radio-bg: ${defaultConfig.cssVars.bg};
      --radio-primary: ${defaultConfig.cssVars.primary};
      --radio-wave: ${defaultConfig.cssVars.wave};
      --radio-accent: ${defaultConfig.cssVars.accent};
    }
  `;

  return `<div class="container {disposition} {transition}">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Orbitron:wght@900&family=Inter:wght@400;550;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}

    .f1-alert-banner {
      animation: ${persistent ? "none !important" : "f1PlayAlert 8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important"};
      ${persistent ? "opacity: 1 !important; clip-path: polygon(0% 0%, 111% 0%, 100% 100%, -11% 100%) !important;" : ""}
    }

    ${radioAlertStyles}
    ${teamStyles}

    .radio-card {
      animation: ${persistent ? "none !important" : "f1PlayAlert 8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important"};
      ${persistent ? "opacity: 1 !important; clip-path: none !important;" : ""}
    }

    .overlay-grid-container {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      pointer-events: none !important;
    }

    .standard-layout-wrapper {
      position: absolute !important;
      top: 40px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      pointer-events: auto !important;
    }

    .radio-layout-wrapper {
      position: absolute !important;
      bottom: 80px !important;
      right: 80px !important;
      pointer-events: auto !important;
    }

    .radio-layout-wrapper[data-message=""] {
      display: none !important;
    }
  </style>

  <div class="overlay-grid-container">
    <div id="standard-alert-wrap" class="standard-layout-wrapper">
      <div class="f1-alert-banner">
        <div class="f1-alert-badge">
          <div class="f1-logo-content">
            ${f1LogoSvg}
          </div>
        </div>
        <div class="f1-alert-body">
          <p class="f1-heading-text" id="alert-heading">${headingTemplate}</p>
          <p class="f1-detail-text" id="alert-detail">{text}</p>
        </div>
      </div>
    </div>

    <div id="radio-alert-wrap" class="radio-layout-wrapper" data-message="{message}" data-configs='${configsJson}' data-allowed='${allowedJson}'>
      <img src=x onerror="
var w=this.parentNode,
c=JSON.parse(w.getAttribute('data-configs')),
a=JSON.parse(w.getAttribute('data-allowed')),
t=a[Math.floor(Math.random()*a.length)],g=c[t],
d=w.querySelector('.radio-card');
d.style.setProperty('--radio-bg',g.bg);
d.style.setProperty('--radio-primary',g.primary);
d.style.setProperty('--radio-wave',g.wave);
d.style.setProperty('--radio-accent',g.accent);
d.className='radio-card radio-team-'+g.id;
w.querySelector('.radio-card-shield-wrapper').innerHTML=g.shieldSvg;
w.querySelector('.radio-card-number').textContent=g.fallbackNumber;
var n=w.querySelector('.radio-card-name');
if(n){var m=n.textContent.match(/\\d+$/);if(m)d.querySelector('.radio-card-number').textContent=m[0].slice(0,2);}
 d.style.visibility='visible';
 this.remove();
" style="display:none" />
      <div class="radio-card radio-team-${defaultConfig.id}" style="visibility:hidden">
        <div class="radio-card-header">
          <div class="radio-header-bg">
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
            <div class="cava-bar"></div>
          </div>
          <div class="radio-header-content">
            <div class="radio-card-name-row">
              <span class="radio-card-name" id="radio-name">{name}</span>
            </div>
            <div class="radio-header-bottom-row">
              <div class="radio-card-number-wrapper">
                <span class="radio-card-number">${defaultConfig.fallbackDriverNumber || "16"}</span>
              </div>
              <div class="radio-header-right-bottom">
                <span class="radio-card-radio">RADIO</span>
                <div class="radio-card-shield-wrapper">
                  ${defaultConfig.shieldSvg}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="radio-card-body">
          <p class="radio-message-text" id="radio-message">&quot;{message}&quot;</p>
        </div>
      </div>
    </div>
  </div>
}
</div>`;
}

export function getCombinedStreamlabsHtml(
  _template: string,
  persistent: boolean,
  radioSkinMode: "specific" | "random-all" | "random-selected",
  selectedRadioSkins: string[],
  radioTeam: string,
  headingTemplate: string
) {
  let allowedTeams: string[];
  if (radioSkinMode === "specific") {
    allowedTeams = [radioTeam];
  } else if (radioSkinMode === "random-all") {
    allowedTeams = Object.keys(TEAM_RADIO_CONFIGS);
  } else {
    allowedTeams =
      selectedRadioSkins.length > 0 ? selectedRadioSkins : ["ferrari"];
  }

  const defaultTeamKey = allowedTeams[0] || "ferrari";
  const defaultConfig =
    TEAM_RADIO_CONFIGS[defaultTeamKey] || TEAM_RADIO_CONFIGS.ferrari;

  const serializedConfigs = Object.fromEntries(
    Object.entries(TEAM_RADIO_CONFIGS).map(([key, cfg]) => [
      key,
      {
        accent: cfg.cssVars.accent,
        bg: cfg.cssVars.bg,
        fallbackNumber: cfg.fallbackDriverNumber || "16",
        id: cfg.id,
        primary: cfg.cssVars.primary,
        shieldSvg: cfg.shieldSvg.replace(/\n\s*/g, " ").trim(),
        wave: cfg.cssVars.wave,
      },
    ])
  );

  const configsJson = JSON.stringify(serializedConfigs);
  const allowedJson = JSON.stringify(allowedTeams);

  const teamStyles = `
    .radio-card {
      --radio-bg: ${defaultConfig.cssVars.bg};
      --radio-primary: ${defaultConfig.cssVars.primary};
      --radio-wave: ${defaultConfig.cssVars.wave};
      --radio-accent: ${defaultConfig.cssVars.accent};
    }
  `;

  return `<div class="container streamlabs-container">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Orbitron:wght@900&family=Inter:wght@400;550;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    ${sharedStyles}

    #alert-image-wrap {
      display: none !important;
    }

    #alert-text-wrap {
      width: 100% !important;
      height: 100% !important;
    }

    /* Streamlabs default style resets */
    #alert-box, #alert-text, #alert-message, #alert-user-message, #alert-image, #alert-image-wrap, #alert-text-wrap {
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      background: transparent !important;
      text-shadow: none !important;
    }

    .f1-alert-banner {
      animation: ${persistent ? "none !important" : "f1PlayAlert 8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important"};
      ${persistent ? "opacity: 1 !important; clip-path: polygon(0% 0%, 111% 0%, 100% 100%, -11% 100%) !important;" : ""}
    }

    ${radioAlertStyles}
    ${teamStyles}

    .radio-card {
      animation: ${persistent ? "none !important" : "f1PlayAlert 8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important"};
      ${persistent ? "opacity: 1 !important; clip-path: none !important;" : ""}
    }

    .overlay-grid-container {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      pointer-events: none !important;
    }

    .standard-layout-wrapper {
      position: absolute !important;
      top: 40px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      pointer-events: auto !important;
    }

    .radio-layout-wrapper {
      position: absolute !important;
      bottom: 80px !important;
      right: 80px !important;
      pointer-events: auto !important;
    }

    .radio-layout-wrapper[data-message=""],
    .radio-layout-wrapper[data-message=" "] {
      display: none !important;
    }
  </style>

  <!-- Streamlabs Image Container -->
  <div id="alert-image-wrap">
    <div id="alert-image">{img}</div>
  </div>

  <!-- Streamlabs Alert Container -->
  <div id="alert-text-wrap">
    <div class="overlay-grid-container">
      <div id="standard-alert-wrap" class="standard-layout-wrapper">
        <div class="f1-alert-banner">
          <div class="f1-alert-badge">
            <div class="f1-logo-content">
              ${f1LogoSvg}
            </div>
          </div>
          <div class="f1-alert-body">
            <div id="alert-message" class="f1-heading-text">${headingTemplate || "RACE CONTROL: {messageTemplate}"}</div>
            <div id="alert-detail" class="f1-detail-text">RACE CONTROL INCIDENT</div>
          </div>
        </div>
      </div>

      <div id="radio-alert-wrap" class="radio-layout-wrapper" data-message="{userMessage}" data-configs='${configsJson}' data-allowed='${allowedJson}'>
        <img src=x onerror="
var w=this.parentNode,
c=JSON.parse(w.getAttribute('data-configs')),
a=JSON.parse(w.getAttribute('data-allowed')),
t=a[Math.floor(Math.random()*a.length)],g=c[t],
d=w.querySelector('.radio-card');
d.style.setProperty('--radio-bg',g.bg);
d.style.setProperty('--radio-primary',g.primary);
d.style.setProperty('--radio-wave',g.wave);
d.style.setProperty('--radio-accent',g.accent);
d.className='radio-card radio-team-'+g.id;
w.querySelector('.radio-card-shield-wrapper').innerHTML=g.shieldSvg;
w.querySelector('.radio-card-number').textContent=g.fallbackNumber;
var n=w.querySelector('#alert-message');
if(n){var m=n.textContent.match(/\\d+$/);if(m)d.querySelector('.radio-card-number').textContent=m[0].slice(0,2);}
 d.style.visibility='visible';
 this.remove();
" style="display:none" />
        <div class="radio-card radio-team-${defaultConfig.id}" style="visibility:hidden">
          <div class="radio-card-header">
            <div class="radio-header-bg">
              <div class="cava-bar"></div>
              <div class="cava-bar"></div>
              <div class="cava-bar"></div>
              <div class="cava-bar"></div>
              <div class="cava-bar"></div>
              <div class="cava-bar"></div>
              <div class="cava-bar"></div>
              <div class="cava-bar"></div>
              <div class="cava-bar"></div>
              <div class="cava-bar"></div>
            </div>
            <div class="radio-header-content">
              <div class="radio-card-name-row">
                <span class="radio-card-name" id="radio-name">TEAM RADIO</span>
              </div>
              <div class="radio-header-bottom-row">
                <div class="radio-card-number-wrapper">
                  <span class="radio-card-number">${defaultConfig.fallbackDriverNumber || "16"}</span>
                </div>
                <div class="radio-header-right-bottom">
                  <span class="radio-card-radio">RADIO</span>
                  <div class="radio-card-shield-wrapper">
                    ${defaultConfig.shieldSvg}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="radio-card-body">
            <div id="alert-user-message" class="radio-message-text">&quot;{userMessage}&quot;</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}
