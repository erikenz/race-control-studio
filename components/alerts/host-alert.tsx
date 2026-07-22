import {
  type AlertProps,
  F1Logo,
  f1LogoSvg,
  fontLink,
  sharedStyles,
} from "./shared";

export function HostAlert({ heading, name, text }: AlertProps) {
  const resolvedName = name.trim() || "PILOTO";
  const resolvedText = text || "HOSTED";
  const resolvedHeading =
    heading || `RACE CONTROL: ${resolvedName.toUpperCase()} RESTART INCIDENT`;

  return (
    <div className="f1-alert-banner">
      <div className="f1-alert-badge">
        <F1Logo />
      </div>
      <div className="f1-alert-body">
        <p className="f1-heading-text">{resolvedHeading}</p>
        <p className="f1-detail-text">{resolvedText.toUpperCase()}</p>
      </div>
    </div>
  );
}

HostAlert.getBotrixHtml = (
  headingTemplate?: string
) => `<div class="container {disposition} {transition}">
  ${fontLink}
  <style>${sharedStyles}</style>

  <div class="f1-alert-banner">
    <div class="f1-alert-badge">
      <div class="f1-logo-content">
        ${f1LogoSvg}
      </div>
    </div>

    <div class="f1-alert-body">
      <p class="f1-heading-text" id="alert-heading">${headingTemplate || "RACE CONTROL: {name} RESTART INCIDENT"}</p>
      <p class="f1-detail-text" id="alert-detail">{text}</p>
    </div>
  </div>
</div>`;

HostAlert.getStreamlabsHtml = (
  headingTemplate?: string
) => `<div class="container streamlabs-container">
  ${fontLink}
  <style>
    ${sharedStyles}
    #alert-image-wrap { display: none !important; }
    #alert-text-wrap { width: 100% !important; height: 100% !important; }
    #alert-box, #alert-text, #alert-message, #alert-user-message, #alert-image, #alert-image-wrap, #alert-text-wrap { margin: 0 !important; padding: 0 !important; border: 0 !important; background: transparent !important; text-shadow: none !important; }
  </style>

  <div id="alert-image-wrap">
    <div id="alert-image">{img}</div>
  </div>

  <div id="alert-text-wrap">
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
</div>`;
