import {
  type AlertProps,
  F1Logo,
  f1LogoSvg,
  fontLink,
  sharedStyles,
} from "./shared";

export function FollowerAlert({ name, text }: AlertProps) {
  const resolvedName = name.trim() || "PILOTO";
  const resolvedText = text || "NEW FOLLOWER";
  const heading = `RACE CONTROL: ${resolvedName.toUpperCase()} GRID ENTRY`;

  return (
    <div className="f1-alert-banner">
      <div className="f1-alert-badge">
        <F1Logo />
      </div>
      <div className="f1-alert-body">
        <p className="f1-heading-text">{heading}</p>
        <p className="f1-detail-text">{resolvedText.toUpperCase()}</p>
      </div>
    </div>
  );
}

FollowerAlert.getBotrixHtml =
  () => `<div class="container {disposition} {transition}">
  ${fontLink}
  <style>${sharedStyles}</style>

  <div class="f1-alert-banner">
    <div class="f1-alert-badge">
      <div class="f1-logo-content">
        ${f1LogoSvg}
      </div>
    </div>

    <div class="f1-alert-body">
      <p class="f1-heading-text" id="alert-heading">RACE CONTROL: {name} GRID ENTRY</p>
      <p class="f1-detail-text" id="alert-detail">{text}</p>
    </div>
  </div>
</div>`;
