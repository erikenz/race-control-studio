// biome-ignore-all lint/security/noDangerouslySetInnerHtml: static trusted SVG content

export const fontLink =
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">';

export const sharedStyles = `
    .container {
      display: flex !important;
      justify-content: center !important;
      align-items: flex-start !important;
      padding-top: 40px !important;
      width: 100% !important;
      height: 100% !important;
      min-height: 100vh !important;
      background: transparent !important;
      position: relative !important;
    }

    .f1-alert-banner {
      display: flex !important;
      align-items: stretch !important;
      width: max-content !important;
      min-width: 450px !important;
      max-width: 90vw !important;
      background: #0f2a44 !important;
      border-radius: 0px !important;
      overflow: hidden !important;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4) !important;
      border: none !important;
      position: relative !important;
      will-change: clip-path, opacity !important;
      transform: translateZ(0) !important;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      animation: f1PlayAlert 8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important;
    }

    @keyframes f1PlayAlert {
      0% {
        clip-path: polygon(60% 0%, 62% 0%, 51% 100%, 49% 100%);
        opacity: 0;
      }
      15% {
        clip-path: polygon(0% 0%, 111% 0%, 100% 100%, -11% 100%);
        opacity: 1;
      }
      90% {
        clip-path: polygon(0% 0%, 111% 0%, 100% 100%, -11% 100%);
        opacity: 1;
      }
      100% {
        clip-path: polygon(0% 0%, 111% 0%, 100% 100%, -11% 100%);
        opacity: 0;
      }
    }

    .f1-alert-badge {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      width: 56px !important;
      background-color: #0f2a44 !important;
      padding: 12px 4px 12px 16px !important;
      flex-shrink: 0 !important;
      gap: 6px !important;
    }

    .f1-logo-content {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      height: 32px !important;
    }

    .f1-alert-body {
      display: flex !important;
      flex-direction: column !important;
      flex-grow: 1 !important;
      padding: 12px 20px 12px 12px !important;
      justify-content: center !important;
      text-align: left !important;
      background-color: #0f2a44 !important;
      color: #ffffff !important;
    }

    .f1-heading-text {
      font-family: 'Inter', sans-serif !important;
      font-size: 16px !important;
      font-weight: 700 !important;
      color: #ffffff !important;
      margin: 0 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.025em !important;
      line-height: 1.25 !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }

    .f1-detail-text {
      font-family: 'Inter', sans-serif !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      color: #c7d2dd !important;
      margin: 2px 0 0 0 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.025em !important;
      line-height: 1.25 !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }
`;

export const f1LogoSvg = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900" width="32" height="32" style="display: block;">
  <title>F1 Logo</title>
  <g transform="translate(0.000000,900.000000) scale(0.100000,-0.100000)" stroke="none">
    <polygon fill="#ffffff" points="5685,8549 5369,8608 5320,8603 5320,8603 4906,8485 4690,8385 4480,8288 4335,8223 4265,8189 4175,8147 4010,8073 3570,7870 3343,7764 3246,7720 3178,7689 3040,7625 2820,7525 2570,7410 1800,7055 1400,6873 1344,6839 1330,2175 1486,1753 2492,1355 2868,730 3128,467 3232,412 3455,334 4092,414 4333,525 4513,609 4600,649 4735,710 4870,773 5000,833 5180,915 5888,1241 5996,1290 6093,1334 6545,1543 6850,1683 7170,1830 7375,1924 7520,1991 7682,2104 7688,4469 7688,6795 7648,6895 7523,7151 7079,7495 6747,7559 6595,7541 6595,7541" />
    <path fill="#000000" d="M5320 8603 c-142 -14 -270 -51 -414 -118 -50 -23 -147 -68 -216 -100 -69 -32 -163 -75 -210 -97 -47 -22 -112 -51 -145 -65 -33 -14 -65 -29 -70 -34 -6 -4 -47 -23 -90 -42 -44 -19 -118 -52 -165 -74 -84 -40 -179 -84 -440 -203 -74 -34 -176 -82 -227 -106 -51 -24 -94 -44 -97 -44 -3 0 -34 -14 -68 -31 -35 -17 -97 -46 -138 -64 -41 -18 -140 -63 -220 -100 -80 -37 -192 -89 -250 -115 -92 -41 -420 -193 -770 -355 -160 -74 -346 -159 -400 -182 -25 -11 -50 -26 -56 -34 -13 -16 -27 -4562 -14 -4664 16 -138 80 -309 156 -422 222 -328 621 -486 1006 -398 89 20 191 54 200 67 1 2 5 307 8 678 l5 675 42 60 c23 33 73 103 111 155 64 89 642 900 776 1090 33 47 76 108 96 135 21 28 88 122 150 210 62 88 135 189 160 225 53 72 90 131 90 143 0 16 -32 5 -136 -47 -60 -29 -284 -140 -499 -246 -214 -106 -475 -235 -580 -287 -179 -90 -190 -94 -203 -76 -12 15 -13 136 -8 807 5 715 8 791 23 808 9 10 20 18 24 18 5 0 89 39 186 86 98 48 223 108 278 134 96 46 234 112 545 262 224 109 414 200 660 318 124 59 295 141 380 183 311 151 552 267 555 267 2 0 141 68 310 150 168 83 308 150 310 150 1 0 82 38 179 85 l176 86 0 107 c0 132 -21 263 -59 375 -89 261 -318 487 -586 576 -79 26 -279 64 -316 59 -8 0 -30 -3 -49 -5z" />
    <path fill="#CB4646" d="M6595 7541 c-94 -18 -221 -57 -230 -71 -2 -4 -7 -304 -11 -666 -6 -637 -6 -660 -26 -694 -17 -30 -300 -432 -394 -560 -18 -25 -82 -115 -143 -200 -60 -85 -126 -177 -146 -205 -32 -43 -159 -222 -338 -474 -28 -40 -72 -102 -97 -136 -25 -34 -63 -88 -85 -119 -22 -31 -69 -96 -104 -144 -67 -91 -88 -128 -78 -138 5 -5 334 155 1101 537 131 66 249 119 262 119 13 0 28 -9 34 -20 8 -15 10 -253 8 -811 l-3 -791 -30 -24 c-16 -13 -33 -24 -37 -24 -3 0 -117 -54 -253 -120 -136 -66 -248 -120 -250 -120 -1 0 -97 -45 -211 -101 -655 -317 -784 -379 -849 -409 -55 -26 -296 -142 -570 -275 -60 -30 -182 -88 -270 -130 -88 -43 -225 -109 -305 -147 -80 -39 -190 -92 -245 -118 -204 -98 -541 -261 -574 -278 l-33 -17 1 -145 c3 -214 46 -367 149 -530 39 -60 217 -241 260 -263 15 -7 61 -32 104 -55 74 -40 97 -48 223 -78 203 -47 424 -19 637 80 51 24 160 74 241 111 82 36 163 74 180 84 18 9 57 27 87 40 30 13 91 40 135 61 44 21 105 49 135 63 30 14 89 41 130 60 41 18 122 56 180 82 388 177 556 254 708 326 57 27 105 49 108 49 2 0 46 20 97 44 93 44 271 126 452 209 55 25 192 88 305 140 113 52 257 118 320 147 63 29 156 71 205 94 50 23 115 53 145 67 136 59 154 72 162 113 5 22 7 1086 6 2365 l-3 2326 -37 100 c-51 138 -66 169 -125 256 -100 147 -275 283 -444 344 -96 35 -254 65 -332 64 -34 -1 -102 -9 -152 -18z" />
  </g>
</svg>`;

export function F1Logo() {
  return (
    <div
      className="f1-logo-content"
      dangerouslySetInnerHTML={{ __html: f1LogoSvg }}
    />
  );
}

export interface AlertProps {
  amount?: string;
  message?: string;
  name: string;
  text: string;
}

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 1024 1024"
    >
      <path
        clipRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
        fillRule="evenodd"
        transform="scale(64)"
      />
    </svg>
  );
}
