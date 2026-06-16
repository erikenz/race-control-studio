import type { JSX } from "react";
import { TEAM_RADIO_CONFIGS } from "@/lib/radio-config";
import type { AlertProps } from "./shared";

const QUOTES_REGEX = /^["']|["']$/g;

export const radioAlertStyles = `
    .radio-card {
      display: flex !important;
      flex-direction: column !important;
      width: 320px !important;
      background-color: var(--radio-bg) !important;
      overflow: hidden !important;
      font-family: 'Inter', sans-serif !important;
      position: relative !important;
      box-sizing: border-box !important;
      animation: f1PlayAlert 8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important;
    }

    .radio-card-header {
      position: relative !important;
      height: 140px !important;
      padding: 16px 16px 12px 16px !important;
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

    .cava-bar:nth-child(1) { height: 45px !important; animation: cavaPlay 0.7s infinite ease-in-out !important; animation-delay: 0.1s !important; }
    .cava-bar:nth-child(2) { height: 45px !important; animation: cavaPlay 0.85s infinite ease-in-out !important; animation-delay: 0.2s !important; }

    .cava-bar:nth-child(3) { height: 65px !important; animation: cavaPlay 0.6s infinite ease-in-out !important; animation-delay: 0.05s !important; }
    .cava-bar:nth-child(4) { height: 65px !important; animation: cavaPlay 0.75s infinite ease-in-out !important; animation-delay: 0.15s !important; }

    .cava-bar:nth-child(5) { height: 85px !important; animation: cavaPlay 0.9s infinite ease-in-out !important; animation-delay: 0.25s !important; }
    .cava-bar:nth-child(6) { height: 85px !important; animation: cavaPlay 0.7s infinite ease-in-out !important; animation-delay: 0.1s !important; }

    .cava-bar:nth-child(7) { height: 105px !important; animation: cavaPlay 0.8s infinite ease-in-out !important; animation-delay: 0.3s !important; }
    .cava-bar:nth-child(8) { height: 105px !important; animation: cavaPlay 0.55s infinite ease-in-out !important; animation-delay: 0.12s !important; }

    .cava-bar:nth-child(9) { height: 125px !important; animation: cavaPlay 0.95s infinite ease-in-out !important; animation-delay: 0.05s !important; }
    .cava-bar:nth-child(10) { height: 125px !important; animation: cavaPlay 0.65s infinite ease-in-out !important; animation-delay: 0.22s !important; }

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
      font-size: 28px !important;
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
      font-size: 72px !important;
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
      font-size: 24px !important;
      letter-spacing: -0.02em !important;
      text-transform: uppercase !important;
      line-height: 0.9 !important;
      margin: 0 !important;
      text-align: right !important;
    }

    .radio-card-shield-wrapper {
      margin-top: 6px !important;
      display: block !important;
    }

    .radio-shield-svg {
      width: 36px !important;
      height: 42px !important;
      display: block !important;
    }

    .radio-card-body {
      position: relative !important;
      padding: 20px 24px 28px 24px !important;
      box-sizing: border-box !important;
      display: flex !important;
      flex-direction: column !important;
      background-color: var(--radio-bg) !important;
    }

    .radio-message-text {
      font-family: 'Montserrat', sans-serif !important;
      font-size: 20px !important;
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

function FerrariShield() {
  return (
    <svg className="radio-shield-svg" viewBox="0 0 100 120">
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
  );
}

function MercedesShield() {
  return (
    <svg
      className="radio-shield-svg"
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 112 112"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Mercedes Shield</title>
      <g transform="matrix(1.7396 0 0 1.7396 56.085 55.726)">
        <g transform="translate(-32,-32)">
          <g fillRule="nonzero">
            <path
              d="m63.3 32c0 17.3-14 31.3-31.3 31.3s-31.3-14-31.3-31.3 14-31.3 31.3-31.3 31.3 14 31.3 31.3zm-31.3-29.4c-16.3 0-29.4 13.1-29.4 29.4s13.2 29.4 29.4 29.4c16.3 0 29.4-13.2 29.4-29.4 0-16.3-13.1-29.4-29.4-29.4z"
              fill="url(#_Linear1)"
              id="outer_24_"
            />
            <path
              d="m32 2.6c-16.3 0-29.4 13.1-29.4 29.4s13.2 29.4 29.4 29.4c16.3 0 29.4-13.2 29.4-29.4 0-16.3-13.1-29.4-29.4-29.4zm0 56.9c-15.2 0-27.5-12.3-27.5-27.5s12.3-27.5 27.5-27.5 27.5 12.3 27.5 27.5-12.3 27.5-27.5 27.5z"
              fill="url(#_Linear2)"
            />
            <path
              d="m32 63.3c17.3 0 31.3-14 31.3-31.3s-14-31.3-31.3-31.3-31.3 14-31.3 31.3 14 31.3 31.3 31.3zm0-63.3c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32z"
              fill="url(#_Linear3)"
            />
            <path
              d="m2.2 32.1c0-16.4 13.3-29.9 29.8-29.9s29.8 13.4 29.8 29.9c0 16.4-13.3 29.7-29.8 29.7s-29.8-13.3-29.8-29.7zm9.3-20.6c-5.3 5.3-8.6 12.6-8.6 20.6s3.3 15.3 8.5 20.5c5.3 5.2 12.6 8.5 20.6 8.5s15.3-3.2 20.5-8.5c5.3-5.2 8.5-12.5 8.5-20.5s-3.3-15.3-8.5-20.6-12.5-8.6-20.5-8.6-15.3 3.3-20.5 8.6z"
              fill="#fff"
            />
            <path
              d="m32 59.6c-7.4 0-14.3-2.9-19.5-8.1s-8.1-12.1-8.1-19.5 2.9-14.3 8.1-19.5 12.1-8.1 19.5-8.1 14.3 2.9 19.5 8.1 8.1 12.1 8.1 19.5-2.9 14.3-8.1 19.5-12.1 8.1-19.5 8.1zm0-0.8c7.1 0 13.9-2.8 18.9-7.8 5.1-5.1 7.8-11.8 7.8-18.9s-2.8-13.9-7.8-18.9c-5.1-5.1-11.8-7.8-18.9-7.8s-13.9 2.8-18.9 7.8c-5.1 4.9-7.9 11.7-7.9 18.8s2.8 13.9 7.8 18.9c5.1 5.1 11.9 7.9 19 7.9z"
              fill="url(#_Linear4)"
            />
            <path
              d="m56.3 45c-0.5-0.4-19.8-15.7-19.8-15.7l-4.5-25.7c-0.3 0.1-0.7 0.4-0.9 0.8l-3.2 25-19.9 15.3s-0.4 0.5-0.6 0.8c-0.1 0.2-0.1 0.5-0.1 0.8l24.6-10.1 24.6 10.1c0.2-0.5 0-1-0.2-1.3z"
              fill="#fff"
            />
            <path
              d="m32.2 32.8-0.2 4.6 22.6 9.1c0.8 0.4 1.4 0.2 2-0.2l-24.1-13.6c-0.1-0.1-0.3 0-0.3 0.1z"
              fill="#565f64"
            />
            <path
              d="m32.2 32.8s1.3 2.3 2.8 3.9c2.1 2.3 4.9 3.9 4.9 3.9l14.7 5.9c0.8 0.4 1.4 0.2 2-0.2l-24.1-13.6c-0.1-0.1-0.3 0-0.3 0.1z"
              fill="url(#_Linear5)"
            />
            <path
              d="m56.5 45.4c0-0.1-0.1-0.2-0.2-0.4l-20.6-15.1-2.8 1.8s0.2 0.1 0.3 0c0.3-0.1 0.9-0.2 1.5 0 0.5 0.2 21.8 13.8 21.8 13.8z"
              fill="#a4aaae"
              fillOpacity={0.6}
            />
            <path
              d="m55.8 44.5-19.2-15.2-0.9 0.6 20.6 15.2c-0.1-0.2-0.3-0.4-0.5-0.6z"
              fill="#333e46"
            />
            <path
              d="m32.5 31.3-0.1 0.1s0 0.2 0.2 0.1c0.1-0.1 3-1.6 4-2.2l-3.5-24c-0.1-0.9-0.5-1.3-1.2-1.6l0.4 27.8z"
              fill="#565f64"
            />
            <path
              d="m30.8 5.3v1.3l-2.2 22.1c0 0.3 0.1 0.6 0.4 0.8l1.3 1 0.9-24.4 0.1-1.9c-0.3 0.2-0.4 0.6-0.5 1.1z"
              fill="#a4aaae"
              fillOpacity={0.6}
            />
            <path
              d="m29.6 30.9-1.2-1-20.3 14.7s-0.6 0.4-0.7 0.8l0.7-0.4 21.3-13.4c0.4-0.2 0.5-0.4 0.2-0.7z"
              fill="#a4aaae"
              fillOpacity={0.6}
            />
            <path
              d="m31.7 32.8c0-0.1-0.1-0.2-0.2-0.1l-24.2 13.7c0.6 0.4 1.2 0.5 2 0.2l22.6-9.1z"
              fill="#565f64"
            />
            <path
              d="m32.4 31.4 0.1-0.1-0.1 0.1s0 0.1 0.1 0.1h0.1c0.1-0.1 3-1.6 4-2.2l-0.4-2.9-3.1-21.1c0-0.4-0.1-0.7-0.3-0.9 0 0 1.5 20.2 1.5 22.4 0 2.9-1.9 4.6-1.9 4.6z"
              fill="url(#_Linear6)"
            />
            <path
              d="m31.7 32.8c0-0.1-0.1-0.2-0.2-0.1l-24.2 13.7c0.6 0.4 1.2 0.5 2 0.2l22.6-9.1z"
              fill="url(#_Linear7)"
            />
            <path
              d="m9.3 46.5 22.6-9.1-0.2-4.4c-0.4 1.2-1.1 2.5-3 3.5-1.4 0.8-14.8 7.4-19.6 9.7-0.3 0.2-0.7 0.3-0.9 0.4 0.4 0.2 0.7 0.1 1.1-0.1z"
              fill="url(#_Linear8)"
            />
            <path
              d="m32.5 31.3-0.1 0.1s0 0.2 0.2 0.1c0.1-0.1 3-1.6 4-2.2l-3.5-24c-0.1-0.9-0.5-1.3-1.2-1.6l0.4 27.8z"
              fill="url(#_Linear9)"
            />
            <path
              d="m32.5 31.3-0.1 0.1s0 0.2 0.2 0.1c0.1-0.1 3-1.6 4-2.2l-3.5-24c-0.1-0.9-0.5-1.3-1.2-1.6l0.4 27.8z"
              fill="url(#_Linear10)"
            />
            <path
              d="m5.1 44.4c-0.7-1.6-4.7-9.4-0.3-24.4h-1.7c-0.9 3-1.6 4.8-2 7.5 0 0-0.2 1-0.3 2.1s-0.1 1.7-0.1 2.4c0 6 1.5 9.5 1.5 9.5 1.6 5 4.4 9.5 8.2 12.9 3.3 2.9 8.4 5.1 12.6 5.9-0.7-0.1-12.7-5.2-17.9-15.9z"
              fill="url(#_Linear11)"
            />
            <path
              d="m32.4 32.6h-0.9c0.1 0 0.2 0 0.2 0.1l0.2 4.6h0.1l0.2-4.6c0-0.1 0.1-0.2 0.2-0.1z"
              fill="url(#_Linear12)"
            />
            <path
              d="m42 2.3c10.5 4 20.4 15 20.4 28.9 0 16.8-13.4 30.5-30.4 30.5v1.6c17 0 31.3-14 31.3-31.3 0-13.8-8.8-25.4-21.3-29.7z"
              fill="url(#_Linear13)"
            />
            <path d="m32.3 0.7h-0.3z" fill="url(#_Linear14)" />
            <path
              d="m58.8 20.2c-7-16.1-22.8-17-23.7-17.1h-0.1c12.1 2.2 19.8 10.1 22.5 18.4v0.1c1.2 3.2 1.8 6.6 1.9 10.3 0.1 3.5-0.7 7.4-2.2 11-0.1 0.5-0.2 1.1-0.3 1.1h1.6c4.8-9 2.7-18.1 0.3-23.8z"
              fill="url(#_Linear15)"
            />
            <path
              d="m2.2 32.1c0-16.4 13.3-29.9 29.8-29.9s29.8 13.4 29.8 29.9c0 16.4-13.3 29.7-29.8 29.7s-29.8-13.3-29.8-29.7zm9.3-20.6c-5.3 5.3-8.6 12.6-8.6 20.6s3.3 15.3 8.5 20.5c5.3 5.2 12.6 8.5 20.6 8.5s15.3-3.2 20.5-8.5c5.3-5.2 8.5-12.5 8.5-20.5s-3.3-15.3-8.5-20.6-12.5-8.6-20.5-8.6-15.3 3.3-20.5 8.6z"
              fill="#fbfbfb"
            />
            <path
              d="m7.9 44.8 20.4-14.7c1.1 0.6 2.9 1.4 3.1 1.4 0.2 0.1 0.2-0.1 0.2-0.1l-2.5-2.1c-0.3-0.2-0.4-0.5-0.4-0.8l2.4-24.1c-0.1 0.1-0.1 0.3-0.2 0.4-0.1 0.2-0.1 0.3-0.1 0.5l-3.5 24.1-19.2 15.1c-0.1 0.1-0.2 0.2-0.2 0.3z"
              fill="#333f47"
            />
          </g>
        </g>
      </g>
      <defs>
        <linearGradient
          gradientTransform="matrix(48,40.2,-40.2,48,8,11.9)"
          gradientUnits="userSpaceOnUse"
          id="_Linear1"
          x2="1"
        >
          <stop offset="0" stopColor="#fff" />
          <stop offset={0.1} stopColor="#e7e8e6" />
          <stop offset={0.1} stopColor="#cdd0d0" />
          <stop offset={0.2} stopColor="#b5bbbd" />
          <stop offset={0.2} stopColor="#a5acaf" />
          <stop offset={0.3} stopColor="#9ba3a7" />
          <stop offset={0.3} stopColor="#98a0a4" />
          <stop offset={0.4} stopColor="#828a8f" />
          <stop offset={0.5} stopColor="#667075" />
          <stop offset={0.6} stopColor="#535c63" />
          <stop offset={0.7} stopColor="#475158" />
          <stop offset={0.8} stopColor="#434d54" />
          <stop offset={1} stopColor="#475157" />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(45,37.8,-37.8,45,9.5,13.1)"
          gradientUnits="userSpaceOnUse"
          id="_Linear2"
          x2="1"
        >
          <stop offset="0" stopColor="#0b1f2a" />
          <stop offset={0.2} stopColor="#333f47" />
          <stop offset={0.5} stopColor="#777f84" />
          <stop offset={0.5} stopColor="#81898d" />
          <stop offset={0.7} stopColor="#b3b8b8" />
          <stop offset={0.8} stopColor="#d2d5d3" />
          <stop offset={0.8} stopColor="#dee0dd" />
          <stop offset={1} stopColor="#fbfbfb" />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(-21.9 -60.2 60.2 -21.9 42.973 62.107)"
          gradientUnits="userSpaceOnUse"
          id="_Linear3"
          x2="1"
        >
          <stop offset="0" stopColor="#e1e3e1" stopOpacity={0.4} />
          <stop offset={0.1} stopColor="#c1c5c4" stopOpacity={0.4} />
          <stop offset={0.3} stopColor="#9ba1a2" stopOpacity={0.4} />
          <stop offset={0.5} stopColor="#7d8487" stopOpacity={0.4} />
          <stop offset={0.7} stopColor="#687074" stopOpacity={0} />
          <stop offset={0.8} stopColor="#5b6469" stopOpacity={0} />
          <stop offset={1} stopColor="#576065" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(27.6,47.8,-47.8,27.6,18.2,8.1)"
          gradientUnits="userSpaceOnUse"
          id="_Linear4"
          x2="1"
        >
          <stop offset="0" stopColor="#e1e3e1" stopOpacity={0.4} />
          <stop offset={0.1} stopColor="#c1c5c4" stopOpacity={0.4} />
          <stop offset={0.3} stopColor="#9ba1a2" stopOpacity={0.4} />
          <stop offset={0.5} stopColor="#7d8487" stopOpacity={0.4} />
          <stop offset={0.7} stopColor="#687074" stopOpacity={0} />
          <stop offset={0.8} stopColor="#5b6469" stopOpacity={0} />
          <stop offset={1} stopColor="#576065" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(-1.7,2.8,-2.8,-1.7,44.5,39.4)"
          gradientUnits="userSpaceOnUse"
          id="_Linear5"
          x2="1"
        >
          <stop offset="0" stopColor="#27343c" />
          <stop offset={1} stopColor="#00111e" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(-2.8,-4.5,4.5,-2.8,39.6,29.1)"
          gradientUnits="userSpaceOnUse"
          id="_Linear6"
          x2="1"
        >
          <stop offset="0" stopColor="#02131f" />
          <stop offset={0.1} stopColor="#02131f" />
          <stop offset={0.9} stopColor="#02131f" stopOpacity={0} />
          <stop offset={1} stopColor="#02131f" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(-4.2,1.2,-1.2,-4.2,32,36.4)"
          gradientUnits="userSpaceOnUse"
          id="_Linear7"
          x2="1"
        >
          <stop offset="0" stopColor="#02131f" stopOpacity={0.8} />
          <stop offset={0.2} stopColor="#02131f" stopOpacity={0.8} />
          <stop offset={0.9} stopColor="#02131f" stopOpacity={0} />
          <stop offset={1} stopColor="#02131f" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(-.6 -1.5 1.5 -.6 20.8 41.9)"
          gradientUnits="userSpaceOnUse"
          id="_Linear8"
          x2="1"
        >
          <stop offset="0" stopColor="#02131f" stopOpacity={0.8} />
          <stop offset={0.1} stopColor="#02131f" stopOpacity={0.8} />
          <stop offset={1} stopColor="#02131f" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(-3.4 .4 -.4 -3.4 35.6 17.2)"
          gradientUnits="userSpaceOnUse"
          id="_Linear9"
          x2="1"
        >
          <stop offset="0" stopColor="#02131f" />
          <stop offset={0.3} stopColor="#02131f" />
          <stop offset={0.8} stopColor="#02131f" stopOpacity={0} />
          <stop offset={1} stopColor="#02131f" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(-2.3 .3 -.3 -2.3 35.7 17.1)"
          gradientUnits="userSpaceOnUse"
          id="_Linear10"
          x2="1"
        >
          <stop offset="0" stopColor="#27343c" />
          <stop offset={0.4} stopColor="#27343c" />
          <stop offset={1} stopColor="#3b474e" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(27.9 16.1 -16.1 27.9 -.4 32.9)"
          gradientUnits="userSpaceOnUse"
          id="_Linear11"
          x2="1"
        >
          <stop offset="0" stopColor="#24303a" stopOpacity={0} />
          <stop offset="0" stopColor="#25323b" stopOpacity={0} />
          <stop offset={0.1} stopColor="#27343c" />
          <stop offset={1} stopColor="#27343c" />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(0,-4.8,4.8,0,32,37.4)"
          gradientUnits="userSpaceOnUse"
          id="_Linear12"
          x2="1"
        >
          <stop offset="0" stopColor="#a5abaf" />
          <stop offset={0.3} stopColor="#a5abaf" />
          <stop offset={1} stopColor="#a5abaf" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(0,61,-61,0,47.7,2.3)"
          gradientUnits="userSpaceOnUse"
          id="_Linear13"
          x2="1"
        >
          <stop offset="0" stopColor="#dee0dd" />
          <stop offset="0" stopColor="#c5c9c7" />
          <stop offset="0" stopColor="#9ea4a5" />
          <stop offset="0" stopColor="#82898c" />
          <stop offset="0" stopColor="#71797d" />
          <stop offset="0" stopColor="#6b7378" />
          <stop offset={0.2} stopColor="#333f47" />
          <stop offset={0.5} stopColor="#27343c" />
          <stop offset={0.8} stopColor="#333f47" />
          <stop offset={1} stopColor="#434d54" />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(2e-6 0 0 2e-6 32.1 .7)"
          gradientUnits="userSpaceOnUse"
          id="_Linear14"
          x2="1"
        >
          <stop offset="0" stopColor="#dee0dd" />
          <stop offset="0" stopColor="#c5c9c7" />
          <stop offset="0" stopColor="#9ea4a5" />
          <stop offset="0" stopColor="#82898c" />
          <stop offset="0" stopColor="#71797d" />
          <stop offset="0" stopColor="#6b7378" />
          <stop offset={0.2} stopColor="#333f47" />
          <stop offset={0.5} stopColor="#27343c" />
          <stop offset={0.8} stopColor="#333f47" />
          <stop offset={1} stopColor="#434d54" />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(-13.5,19.8,-19.8,-13.5,57.3,8.1)"
          gradientUnits="userSpaceOnUse"
          id="_Linear15"
          x2="1"
        >
          <stop offset="0" stopColor="#27343c" />
          <stop offset={0.7} stopColor="#27343c" />
          <stop offset={0.7} stopColor="#2b373f" />
          <stop offset={0.7} stopColor="#36424a" />
          <stop offset={0.7} stopColor="#49545b" />
          <stop offset={0.8} stopColor="#646d73" stopOpacity={0} />
          <stop offset={0.8} stopColor="#868d92" stopOpacity={0} />
          <stop offset={0.8} stopColor="#b0b5b8" stopOpacity={0} />
          <stop offset={0.8} stopColor="#e1e3e4" stopOpacity={0} />
          <stop offset={0.8} stopColor="#fff" stopOpacity={0} />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}

function RedBullShield() {
  return (
    <svg
      className="radio-shield-svg"
      viewBox="0 0 95 36"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Red Bull Shield</title>
      <g clipPath="url(#a)">
        <path
          d="M47.268 36c9.94 0 18-8.059 18-18s-8.06-18-18-18c-9.941 0-18 8.059-18 18s8.059 18 18 18"
          fill="#FC0"
        />
        <path d="M45.984 26.351c-1.017-.574-1.218-1.705-1.75-2.397-.218-.274-.578-.578-.675-.827-.917-2.346-1.228-3.664-1.55-5.954-.166-1.173-.944-2.162-2.079-3.55-.495-.605-1.2-1.605-1.81-2.196-2.047-1.726-3.154-2.685-4.52-3.605a5.3 5.3 0 0 0-.845-.467h-.007a.03.03 0 0 1-.014-.007c-.456-.2-.868-.256-1.429-.287a4 4 0 0 0-.224-.007c-1.018 0-1.986.37-2.962 1.124-.709.464-1.522.723-2.31.972-.994.315-2.025.644-2.865 1.377-.15.108-.287.26-.422.402-.184.197-.315.422-.595.512-.243.055-.416.055-.613.072a7 7 0 0 0-.924.132c-1.034.245-1.826.882-2.66 1.557l-.284.228c-.54.429-1.47.82-1.996.837-1.47.045-2.511.391-3.594 1.197-1.118.855-2.315 1.737-3.64 2.28a2.7 2.7 0 0 1-.954.183c-.346 0-.841-.076-1.235-.442-.502-.464-.668-1.357-.367-1.955.45-.886 1.366-1.609 2.114-2.142.965-.73 1.899-1.688 1.484-3.276-.447-1.453-2.221-1.92-3.394-2.231-.332-.087-.62-.163-.789-.242-.37-.173-.63-.35-.882-.52a4.2 4.2 0 0 0-.785-.449.5.5 0 0 0-.146-.028q-.248 0-.397.239c-.423.737-.547 1.488-.37 2.221.273 1.204 1.46 2.3 2.698 2.494.124.031.266.042.405.056.128.01.259.024.38.048a14.2 14.2 0 0 0-2.235 2.155c-.906 1.066-1.155 2.827-.578 4.093.499 1.266 1.765 2.297 3.08 2.505.259.048.54.072.857.072.457 0 .917-.048 1.357-.096.107-.01.218-.025.321-.035.045 1.003.08 1.626.637 3.048.034.09.01.242-.107.346-.097.086-.907.422-1.139.47a1.6 1.6 0 0 1-.297.021h-.332c-.11 0-.253 0-.391.02-.509.073-.761.502-.941.918-.11.252-.19.474-.26.664-.173.474-.28.768-.612.948 0 0-.692-.616-.81-.7A1.06 1.06 0 0 0 4 25.982c-.436 0-.823.277-1.197.543a5 5 0 0 1-.35.239c-.314.197-.55.533-.618.882-.509.256-1.007.564-1.239 1.073-.11.218-.131.484-.152.74a4 4 0 0 1-.042.363 2 2 0 0 1-.135.235c-.141.194-.266.481-.266.658 0 .373.138.515.346.692.253.18.941.39 1.432.512a.4.4 0 0 0 .11.014c.15 0 .27-.077.385-.15.055-.034.11-.072.173-.1.405.097 1.003.222 1.584.222q.452-.001.82-.1c.592-.16 1.097-.962 1.37-1.395.066-.104.132-.207.149-.221a.1.1 0 0 1 .055-.01c.09 0 .236.041.391.086.18.052.388.11.575.128.667.059 1.304-.356 1.716-.664.169-.125.352-.301.532-.47.2-.191.405-.388.582-.506a1.9 1.9 0 0 1 .736-.138q.135-.001.298.014c.48.1 1.11.218 1.723.218.612 0 1.076-.104 1.48-.315l.374-.194c.405-.207.82-.418 1.214-.633.761-.412 1.066-1.09 1.315-1.633l.062-.138c.146-.315.367-.886.426-1.028q.175.025.367.024c.411 0 .816-.086 1.207-.17.384-.082.785-.165 1.186-.165.212 0 .405.02.599.069.72.142 1.668.305 2.633.305a6.6 6.6 0 0 0 1.487-.156c.111.107.236.2.357.29.12.09.231.173.335.274a4 4 0 0 1-.335.045c-.336.038-.685.076-.941.35a2.2 2.2 0 0 0-.872-.16 7 7 0 0 0-1.01.097q-.203.03-.395.055c-.515.062-.868.26-1.051.595-.111.218-.194.447-.014.82l1.013 1.681c.125.218.332.395.474.405.076.007.177 0 .287-.01q.132-.012.263-.014.244 0 .295.083.076.118.148.235c.208.326.422.665.747.952.492.429 1.284.608 2.028.436q.42-.155.84-.305c.876-.315 1.782-.64 2.66-1.013l1.457-.208c.481-.094.848-.744.969-1.014l.031-.062s.44-.872.574-1.401c.007.09.007.21.007.377 0 .823.146 1.865 1.55 1.81.782-.032 1.82-.495 2.56-.63.775-.132 1.785.197 2.536-.17.73-.297 1.149-.865 1.266-.747A5 5 0 0 0 44.78 29c1.049-.034 1.163-.875.43-1.256 1.431.166 1.854-.608 1.587-.858-.17-.159-.27-.238-.813-.543zm-12.859-.782c-.54-.73-.892-1.248-.944-1.916.688-.08 1.318-.308 2.342-.363-.267.792-1.183 1.169-1.401 2.276zm60.851 4.647c-.049-.097-.097-.19-.125-.26-.045-.155-.052-.318-.062-.491-.01-.19-.02-.388-.08-.574-.162-.54-.74-.876-1.207-1.066-.017-.204-.055-.425-.245-.56-.807-.575-1.229-.9-1.457-1.073-.135-.104-.183-.142-.211-.152a.75.75 0 0 0-.305-.07c-.356 0-.64.284-.916.554l-.19.187c-.007.007-.01.007-.021.007-.087 0-.267-.266-.312-.387-.08-.215-.141-.419-.204-.616a7 7 0 0 0-.398-1.07c-.304-.605-.954-.615-1.529-.625h-.162c-.263 0-.61-.038-.672-.212-.062-.172.066-.498.146-.736.055-.166.107-.322.124-.474.146-.65.156-1.516.028-2.218.145.004.29.02.443.038q.196.027.408.038h.125c.865 0 1.595-.17 2.231-.515 1.283-.772 2.069-2.017 2.1-3.342-.045-.692-.208-1.263-.56-1.969-.474-.934-1.263-1.854-2.415-2.809.667-.138 1.221-.3 1.733-.623 1.045-.664 1.508-1.868 1.304-3.393-.055-.36-.194-.983-.498-1.145a.3.3 0 0 0-.142-.035c-.221 0-.436.239-.626.45-.07.08-.138.152-.197.204-.356.318-.775.401-1.214.488-.232.045-.47.093-.696.176-1.052.343-2.84 1.124-3 2.546-.155 1.405.845 2.35 1.814 3.263.321.304.63.591.892.896.56.647 1.038 1.29.913 2.017-.044.249-.397.63-.733.782q-.386.134-.792.134c-.896 0-1.758-.49-2.515-.927l-.108-.062c-1.757-1.218-3.573-2.48-5.825-2.72-.858-.165-1.602-.684-2.325-1.19a26 26 0 0 0-.502-.345 7 7 0 0 0-2.46-.879c-.45-.059-.806-.353-1.183-.66a5 5 0 0 0-.622-.46 8.2 8.2 0 0 0-2.9-1.163 3 3 0 0 0-.31-.076c-.27-.056-.551-.118-.745-.322-.297-.35-.706-.8-1.2-1.152-.661-.443-1.688-.914-2.584-.914a2 2 0 0 0-.537.066c-.498.125-.885.415-1.294.723l-.155.114c-.82.64-1.91 1.52-2.768 2.132-2.56 1.823-3.522 2.622-4.791 4.01-3.266 3.566-2.273 8.904-5.096 11.997-.73.802-.934.906-1.2 1.128-.33.276-.406 1.747 1.732 1.027-.975.834-.36 1.221.28 1.235 1.129.024 2.374-.367 3.595-1.667.848 1.22 2.325.657 3.093.72.72.058 2.045.84 2.816.795 1.176-.073 1.609-1.249 1.491-1.903.19 0 .242-.045.294-.138.139.681.232 1.148.364 1.49q.017.038.044.09v.008c.084.148.257.477.43.636.2.242.501.274.74.274.097 0 .194-.007.287-.01q.16-.011.311-.011a3 3 0 0 1 .256.214c.19.166.384.34.623.405 1.114.287 2.038.543 2.934.858.183.059.463.135.743.135q.137 0 .263-.024c.852-.184 1.61-.913 1.796-1.74.014-.128.107-.139.266-.146.115-.003.246-.01.319-.093.463-.37.747-.879 1.024-1.367q.086-.156.18-.314a.88.88 0 0 0 .034-.817q-.135-.27-.488-.39c-.443-.125-.937-.136-1.363-.136h-.47c-.222 0-.478 0-.727-.024l-.18-.197c-.131-.118-.297-.145-.46-.173l-.117-.02.404-.316q.243.007.481.007c.941 0 1.806-.083 2.578-.245a9.4 9.4 0 0 1 2.096-.26q.141-.002.287.007.173.01.346.024c.422.028.855.06 1.287.06.571 0 1.035-.053 1.45-.163.052.207.093.411.131.612.152.754.294 1.467.875 2.086.35.446.806.702 1.25.955.228.128.46.273.684.422.298.152.537.176.879.176.477 0 1.086-.204 1.432-.204 1.443 0 2.557.782 3.764 1.726.215.142.478.215.779.215.366 0 .778-.11 1.138-.305l.028.042c.22.311.453.637.764.89.446.404 1.024.46 1.53.46.169 0 .345-.008.515-.015.242-.01.487-.02.723-.01.093.131.273.232.415.225s1.702-.516 1.785-.543.2-.097.2-.097c.378-.194.104-.74-.096-1.142l-.007.01ZM61.67 25.62c-.377-.75-.672-1.425-1.139-2.13 1.07.252 2.29.13 2.29.13-.345.492-.74 1.194-1.151 2" />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h95v36H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}

const SHIELD_COMPONENTS: Record<string, () => JSX.Element> = {
  ferrari: FerrariShield,
  mercedes: MercedesShield,
  redbull: RedBullShield,
};

function Shield({ team }: { team: string }) {
  const Component = SHIELD_COMPONENTS[team] || FerrariShield;
  return <Component />;
}

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
      <style>{radioAlertStyles + teamStyles}</style>

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
              <div className="radio-card-shield-wrapper">
                <Shield team={config.id} />
              </div>
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
