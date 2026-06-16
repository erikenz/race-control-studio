import { TEAM_RADIO_CONFIGS } from "@/lib/radio-config";
import { type AlertProps, sharedStyles } from "./shared";

const QUOTES_REGEX = /^["']|["']$/g;

export const radioAlertStyles = `
    .radio-card {
      display: flex !important;
      flex-direction: column !important;
      width: 250px !important;
      background-color: var(--radio-bg) !important;
      border-radius: 8px !important;
      overflow: hidden !important;
      font-family: 'Inter', sans-serif !important;
      position: relative !important;
      box-sizing: border-box !important;
      animation: f1PlayAlert 8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important;
    }

    .radio-card-header {
      position: relative !important;
      height: 110px !important;
      padding: 12px 12px 10px 12px !important;
      display: block !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
    }

    .radio-header-bg {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      z-index: 1 !important;
      display: flex !important;
      align-items: flex-end !important;
      justify-content: flex-start !important;
      gap: 4px !important;
      padding: 0 12px !important;
      box-sizing: border-box !important;
      background-color: transparent !important;
    }

    .cava-bar {
      flex: 1 !important;
      background-color: var(--radio-wave) !important;
      transform-origin: bottom !important;
      border-radius: 2px 2px 0 0 !important;
    }

    @keyframes cavaPlay {
      0%, 100% { transform: scaleY(0.15); }
      50% { transform: scaleY(1); }
    }

    .cava-bar:nth-child(1) { height: 35px !important; animation: cavaPlay 0.7s infinite ease-in-out !important; animation-delay: 0.1s !important; }
    .cava-bar:nth-child(2) { height: 35px !important; animation: cavaPlay 0.85s infinite ease-in-out !important; animation-delay: 0.2s !important; }
    
    .cava-bar:nth-child(3) { height: 50px !important; animation: cavaPlay 0.6s infinite ease-in-out !important; animation-delay: 0.05s !important; }
    .cava-bar:nth-child(4) { height: 50px !important; animation: cavaPlay 0.75s infinite ease-in-out !important; animation-delay: 0.15s !important; }
    
    .cava-bar:nth-child(5) { height: 65px !important; animation: cavaPlay 0.9s infinite ease-in-out !important; animation-delay: 0.25s !important; }
    .cava-bar:nth-child(6) { height: 65px !important; animation: cavaPlay 0.7s infinite ease-in-out !important; animation-delay: 0.1s !important; }
    
    .cava-bar:nth-child(7) { height: 80px !important; animation: cavaPlay 0.8s infinite ease-in-out !important; animation-delay: 0.3s !important; }
    .cava-bar:nth-child(8) { height: 80px !important; animation: cavaPlay 0.55s infinite ease-in-out !important; animation-delay: 0.12s !important; }
    
    .cava-bar:nth-child(9) { height: 95px !important; animation: cavaPlay 0.95s infinite ease-in-out !important; animation-delay: 0.05s !important; }
    .cava-bar:nth-child(10) { height: 95px !important; animation: cavaPlay 0.65s infinite ease-in-out !important; animation-delay: 0.22s !important; }

    .radio-header-content {
      position: relative !important;
      z-index: 2 !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box !important;
      min-width: 0 !important;
    }

    .radio-card-name-row {
      display: block !important;
      width: 100% !important;
      text-align: right !important;
    }

    .radio-card-name {
      color: var(--radio-primary) !important;
      font-family: 'Montserrat', sans-serif !important;
      font-weight: 900 !important;
      font-size: 20px !important;
      text-transform: uppercase !important;
      letter-spacing: -0.02em !important;
      line-height: 1.0 !important;
      margin: 0 !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      display: inline-block !important;
      width: 100% !important;
    }

    .radio-header-bottom-row {
      display: flex !important;
      justify-content: space-between !important;
      align-items: flex-end !important;
      width: 100% !important;
      margin-top: auto !important;
    }

    .radio-card-number-wrapper {
      display: flex !important;
      align-items: flex-end !important;
      flex-shrink: 0 !important;
      padding-bottom: 0px !important;
      margin-bottom: -4px !important;
    }

    .radio-card-number {
      font-family: 'Orbitron', sans-serif !important;
      font-size: 55px !important;
      font-weight: 900 !important;
      color: var(--radio-primary) !important;
      line-height: 0.8 !important;
      font-style: normal !important;
      letter-spacing: -0.05em !important;
      margin: 0 !important;
      padding: 0 !important;
      user-select: none !important;
    }

    .radio-header-right-bottom {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-end !important;
      flex-shrink: 0 !important;
    }

    .radio-card-radio {
      color: #ffffff !important;
      font-family: 'Montserrat', sans-serif !important;
      font-weight: 900 !important;
      font-size: 20px !important;
      letter-spacing: -0.02em !important;
      text-transform: uppercase !important;
      line-height: 0.9 !important;
      margin: 0 !important;
      text-align: right !important;
    }

    .radio-card-shield-wrapper {
      margin-top: 4px !important;
      display: block !important;
    }

    .radio-shield-svg {
      width: 26px !important;
      height: 31px !important;
      display: block !important;
    }

    .radio-card-body {
      position: relative !important;
      padding: 16px 20px 24px 20px !important;
      box-sizing: border-box !important;
      display: flex !important;
      flex-direction: column !important;
      background-color: var(--radio-bg) !important;
    }

    .radio-message-text {
      font-family: 'Montserrat', sans-serif !important;
      font-size: 15px !important;
      font-weight: 900 !important;
      color: var(--radio-primary) !important;
      margin: 0 !important;
      font-style: normal !important;
      line-height: 1.3 !important;
      text-transform: uppercase !important;
      text-align: right !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
    }
`;

export function RadioAlert({
  name,
  text,
  message,
  team = "ferrari",
}: AlertProps & { team?: string }) {
  const config = TEAM_RADIO_CONFIGS[team] || TEAM_RADIO_CONFIGS.ferrari;
  const resolvedName = name.trim() || "PILOTO";
  const resolvedText =
    message || text || "Slow button on, copy. We are checking.";

  const driverNumber = config.getDriverNumber(resolvedName);
  const cleanText = resolvedText.replace(QUOTES_REGEX, "").trim();

  const teamStyles = `
    .radio-card {
      --radio-bg: ${config.cssVars.bg};
      --radio-primary: ${config.cssVars.primary};
      --radio-wave: ${config.cssVars.wave};
      --radio-accent: ${config.cssVars.accent};
    }
  `;

  return (
    <div className={`radio-card radio-team-${config.id}`}>
      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static component styles
        dangerouslySetInnerHTML={{ __html: radioAlertStyles + teamStyles }}
      />

      <div className="radio-card-header">
        <div className="radio-header-bg">
          <div className="cava-bar" />
          <div className="cava-bar" />
          <div className="cava-bar" />
          <div className="cava-bar" />
          <div className="cava-bar" />
          <div className="cava-bar" />
          <div className="cava-bar" />
          <div className="cava-bar" />
          <div className="cava-bar" />
          <div className="cava-bar" />
        </div>
        <div className="radio-header-content">
          <div className="radio-card-name-row">
            <span className="radio-card-name">{resolvedName}</span>
          </div>
          <div className="radio-header-bottom-row">
            <div className="radio-card-number-wrapper">
              <span className="radio-card-number">{driverNumber}</span>
            </div>
            <div className="radio-header-right-bottom">
              <span className="radio-card-radio">RADIO</span>
              <div
                className="radio-card-shield-wrapper"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted SVG config
                dangerouslySetInnerHTML={{ __html: config.shieldSvg }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="radio-card-body">
        <p className="radio-message-text">"{cleanText}"</p>
      </div>
    </div>
  );
}

export function getRadioBotrixHtml(team: string) {
  const config = TEAM_RADIO_CONFIGS[team] || TEAM_RADIO_CONFIGS.ferrari;
  const customFontLink =
    '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Orbitron:wght@900&family=Inter:wght@400;700;900&display=swap" rel="stylesheet">';

  const teamStyles = `
    .radio-card {
      --radio-bg: ${config.cssVars.bg};
      --radio-primary: ${config.cssVars.primary};
      --radio-wave: ${config.cssVars.wave};
      --radio-accent: ${config.cssVars.accent};
    }
  `;

  return `<div class="container {disposition} {transition}">
  ${customFontLink}
  <style>
    ${sharedStyles}
    ${radioAlertStyles}
    ${teamStyles}
    
    /* Override container alignment specifically for Radio alert to bottom-right */
    .container {
      display: flex !important;
      justify-content: flex-end !important;
      align-items: flex-end !important;
      padding-right: 80px !important;
      padding-bottom: 80px !important;
      width: 100% !important;
      height: 100% !important;
      min-height: 100vh !important;
      background: transparent !important;
      position: relative !important;
    }
  </style>

  <div class="radio-card radio-team-${config.id}">
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
          <span class="radio-card-name" id="radio-name"></span>
        </div>
        <div class="radio-header-bottom-row">
          <div class="radio-card-number-wrapper">
            <span class="radio-card-number">${config.fallbackDriverNumber || "16"}</span>
          </div>
          <div class="radio-header-right-bottom">
            <span class="radio-card-radio">RADIO</span>
            <div class="radio-card-shield-wrapper">
              ${config.shieldSvg}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="radio-card-body">
      <p class="radio-message-text" id="radio-message"></p>
    </div>
  </div>

  <script>
    (function() {
      const nameVal = "{name}".replace(/\\\\([\\s\\S])/g, "$1").trim();
      const msgVal = "{message}".replace(/\\\\([\\s\\S])/g, "$1").trim();
      
      const nameEl = document.getElementById('radio-name');
      const msgEl = document.getElementById('radio-message');
      
      if (nameEl) nameEl.textContent = nameVal.toUpperCase();
      if (msgEl) msgEl.textContent = '"' + msgVal.replace(/^["']|["']$/g, '').trim() + '"';
      
      if (nameVal && nameVal.indexOf('{') === -1) {
        const numMatch = nameVal.match(/\\\\d+$/);
        if (numMatch) {
          const numEl = document.querySelector('.radio-card-number');
          if (numEl) numEl.textContent = numMatch[0].slice(0, 2);
        }
      }
    })();
  </script>
</div>`;
}
