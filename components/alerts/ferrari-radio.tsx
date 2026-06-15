import { type AlertProps, sharedStyles } from "./shared";

const DRIVER_NUMBER_REGEX = /\d+/;
const QUOTES_REGEX = /^["']|["']$/g;

// Helper function to extract up to 2 digits from the name or default to 16
const getDriverNumber = (name: string) => {
  const matches = name.match(DRIVER_NUMBER_REGEX);
  return matches ? matches[0].slice(0, 2) : "16";
};

const ferrariRadioStyles = `
    .ferrari-radio-card {
      display: flex !important;
      flex-direction: column !important;
      width: 250px !important;
      background-color: #1A1D23 !important;
      border-radius: 8px !important;
      overflow: hidden !important;
      font-family: 'Inter', sans-serif !important;
      position: relative !important;
      box-sizing: border-box !important;
      animation: f1PlayAlert 8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important;
    }

    .ferrari-card-header {
      position: relative !important;
      height: 110px !important;
      padding: 16px 12px 12px 12px !important;
      display: flex !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
    }

    .ferrari-header-bg {
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
      background-color: #35141f !important;
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

    .ferrari-header-content {
      position: relative !important;
      z-index: 2 !important;
      display: flex !important;
      align-items: flex-start !important;
      justify-content: space-between !important;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box !important;
    }

    .ferrari-card-number-wrapper {
      display: flex !important;
      align-items: flex-end !important;
      height: 100% !important;
      flex-shrink: 0 !important;
      padding-bottom: 0px !important;
      margin-bottom: -4px !important;
    }

    .ferrari-card-number {
      font-family: 'Orbitron', sans-serif !important;
      font-size: 70px !important;
      font-weight: 900 !important;
      color: #DF0631 !important;
      line-height: 0.8 !important;
      font-style: normal !important;
      letter-spacing: -0.05em !important;
      margin: 0 !important;
      padding: 0 !important;
      user-select: none !important;
    }

    .ferrari-header-right {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-end !important;
      height: 100% !important;
      justify-content: flex-start !important;
    }

    .ferrari-card-name {
      color: #DF0631 !important;
      font-family: 'Montserrat', sans-serif !important;
      font-weight: 900 !important;
      font-size: 24px !important;
      text-transform: uppercase !important;
      letter-spacing: -0.02em !important;
      line-height: 0.9 !important;
      margin: 0 !important;
      text-align: right !important;
    }

    .ferrari-card-radio {
      color: #ffffff !important;
      font-family: 'Montserrat', sans-serif !important;
      font-weight: 900 !important;
      font-size: 24px !important;
      letter-spacing: -0.02em !important;
      text-transform: uppercase !important;
      line-height: 0.9 !important;
      margin: 2px 0 0 0 !important;
      text-align: right !important;
    }

    .ferrari-card-shield-wrapper {
      margin-top: 6px !important;
      display: block !important;
    }

    .ferrari-shield-svg {
      width: 30px !important;
      height: 36px !important;
      display: block !important;
    }

    .ferrari-card-body {
      position: relative !important;
      padding: 16px 20px 24px 20px !important;
      box-sizing: border-box !important;
      display: flex !important;
      flex-direction: column !important;
      background-color: #1A1D23 !important;
    }

    .ferrari-message-text {
      font-family: 'Montserrat', sans-serif !important;
      font-size: 15px !important;
      font-weight: 900 !important;
      color: #DF0631 !important;
      margin: 0 !important;
      font-style: normal !important;
      line-height: 1.3 !important;
      text-transform: uppercase !important;
      text-align: right !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
    }
`;

export function FerrariRadioAlert({ name, text, message }: AlertProps) {
  const resolvedName = name.trim() || "PILOTO";
  const resolvedText =
    message || text || "Slow button on, copy. We are checking.";

  const driverNumber = getDriverNumber(resolvedName);
  const cleanText = resolvedText.replace(QUOTES_REGEX, "").trim();

  return (
    <div className="ferrari-radio-card">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static component styles */}
      <style dangerouslySetInnerHTML={{ __html: ferrariRadioStyles }} />

      <div className="ferrari-card-header">
        <div className="ferrari-header-bg">
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
        <div className="ferrari-header-content">
          <div className="ferrari-card-number-wrapper">
            <span className="ferrari-card-number">{driverNumber}</span>
          </div>
          <div className="ferrari-header-right">
            <span className="ferrari-card-name">{resolvedName}</span>
            <span className="ferrari-card-radio">RADIO</span>
            <div className="ferrari-card-shield-wrapper">
              <svg
                className="ferrari-shield-svg"
                height="36"
                viewBox="0 0 100 120"
                width="30"
              >
                <title>Ferrari Shield</title>
                <path
                  d="M10 10 C30 10 30 5 50 5 C70 5 70 10 90 10 C90 60 85 90 50 115 C15 90 10 60 10 10 Z"
                  fill="#ffe100"
                  stroke="#000000"
                  strokeWidth="3"
                />
                <path
                  d="M11 11 C30 11 30 6 50 6 C70 6 70 11 89 11 L89 19 C70 19 70 14 50 14 C30 14 30 19 11 19 Z"
                  fill="#000000"
                />
                <rect fill="#008f39" height="7" width="25" x="12" y="11" />
                <rect fill="#ffffff" height="7" width="26" x="37" y="11" />
                <rect fill="#e10600" height="7" width="25" x="63" y="11" />
                <path
                  d="M48 25 C45 30 40 35 40 45 C40 55 45 60 48 65 C45 70 42 75 42 85 C45 90 48 90 52 90 C50 80 52 75 55 70 C58 75 60 85 62 85 C65 85 68 80 65 70 C60 65 58 55 58 45 C58 35 52 30 48 25 Z"
                  fill="#000000"
                />
                <path
                  d="M50 30 C51 32 52 35 51 38 C50 40 48 41 46 41 C48 42 50 43 49 46 C48 48 45 50 43 50 C45 52 48 55 48 58 C48 62 46 65 44 68 C47 70 50 73 50 78 C50 82 48 85 47 88 C49 88 52 87 53 84 C54 81 53 78 52 75 C54 77 56 80 57 83 C58 86 58 89 57 91 C59 90 61 88 61 85 C61 82 59 79 57 76 C59 75 61 74 62 72 C63 70 63 68 62 66 C60 67 58 68 56 68 C58 64 59 60 59 55 C59 48 56 42 52 37 C54 36 56 35 57 33 C56 31 54 30 52 30 C51 28 50 26 51 24 C50 25 49 26 49 27 C49 28 50 29 50 30 Z"
                  fill="#000000"
                />
                <text
                  fill="#000000"
                  fontFamily="sans-serif"
                  fontSize="12"
                  fontWeight="900"
                  x="32"
                  y="107"
                >
                  S
                </text>
                <text
                  fill="#000000"
                  fontFamily="sans-serif"
                  fontSize="12"
                  fontWeight="900"
                  x="56"
                  y="107"
                >
                  F
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="ferrari-card-body">
        <p className="ferrari-message-text">"{cleanText}"</p>
      </div>
    </div>
  );
}

const customFontLink =
  '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Orbitron:wght@900&family=Inter:wght@400;700;900&display=swap" rel="stylesheet">';

FerrariRadioAlert.getBotrixHtml =
  () => `<div class="container {disposition} {transition}">
  ${customFontLink}
  <style>
    ${sharedStyles}
    ${ferrariRadioStyles}
    
    /* Override container alignment specifically for Ferrari Radio alert to bottom-right */
    .container {
      display: flex !important;
      justify-content: flex-end !important;
      align-items: flex-end !important;
      padding-right: 80px !important;
      padding-bottom: 80px !important;
      width: 100% !important;
      height: 100% !important;
      background: transparent !important;
    }
  </style>

  <div class="ferrari-radio-card">
    <div class="ferrari-card-header">
      <div class="ferrari-header-bg">
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
      <div class="ferrari-header-content">
        <div class="ferrari-card-number-wrapper">
          <span class="ferrari-card-number">16</span>
        </div>
        <div class="ferrari-header-right">
          <span class="ferrari-card-name">{name}</span>
          <span class="ferrari-card-radio">RADIO</span>
          <div class="ferrari-card-shield-wrapper">
            <svg viewBox="0 0 100 120" class="ferrari-shield-svg">
              <title>Ferrari Shield</title>
              <path d="M10 10 C30 10 30 5 50 5 C70 5 70 10 90 10 C90 60 85 90 50 115 C15 90 10 60 10 10 Z" fill="#ffe100" stroke="#000000" stroke-width="3" />
              <path d="M11 11 C30 11 30 6 50 6 C70 6 70 11 89 11 L89 19 C70 19 70 14 50 14 C30 14 30 19 11 19 Z" fill="#000000" />
              <rect x="12" y="11" width="25" height="7" fill="#008f39" />
              <rect x="37" y="11" width="26" height="7" fill="#ffffff" />
              <rect x="63" y="11" width="25" height="7" fill="#e10600" />
              <path d="M48 25 C45 30 40 35 40 45 C40 55 45 60 48 65 C45 70 42 75 42 85 C45 90 48 90 52 90 C50 80 52 75 55 70 C58 75 60 85 62 85 C65 85 68 80 65 70 C60 65 58 55 58 45 C58 35 52 30 48 25 Z" fill="#000000" />
              <path d="M50 30 C51 32 52 35 51 38 C50 40 48 41 46 41 C48 42 50 43 49 46 C48 48 45 50 43 50 C45 52 48 55 48 58 C48 62 46 65 44 68 C47 70 50 73 50 78 C50 82 48 85 47 88 C49 88 52 87 53 84 C54 81 53 78 52 75 C54 77 56 80 57 83 C58 86 58 89 57 91 C59 90 61 88 61 85 C61 82 59 79 57 76 C59 75 61 74 62 72 C63 70 63 68 62 66 C60 67 58 68 56 68 C58 64 59 60 59 55 C59 48 56 42 52 37 C54 36 56 35 57 33 C56 31 54 30 52 30 C51 28 50 26 51 24 C50 25 49 26 49 27 C49 28 50 29 50 30 Z" fill="#000000" />
              <text x="32" y="107" font-family="sans-serif" font-size="12" font-weight="900" fill="#000000">S</text>
              <text x="56" y="107" font-family="sans-serif" font-size="12" font-weight="900" fill="#000000">F</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="ferrari-card-body">
      <p class="ferrari-message-text">"{message}"</p>
    </div>
  </div>

  <script>
    (function() {
      // Dynamically extract driver number from the Botrix {name} variable
      const nameVal = "{name}";
      if (nameVal && nameVal.indexOf('{') === -1) {
        // Find numbers
        const numMatch = nameVal.match(/\\d+/);
        if (numMatch) {
          const numEl = document.querySelector('.ferrari-card-number');
          if (numEl) numEl.textContent = numMatch[0].slice(0, 2);
        }
      }
    })();
  </script>
</div>`;
