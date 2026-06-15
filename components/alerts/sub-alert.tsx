import React from "react"
import { type AlertProps, F1Logo, f1LogoSvg, fontLink, sharedStyles } from "./shared"

export function SubAlert({ name, text, message }: AlertProps) {
  const resolvedName = name.trim() || "PILOTO"
  const resolvedText = text || "subscribed"
  const heading = `RACE CONTROL: ${resolvedName.toUpperCase()} RENEWAL INCIDENT`
  const detail = message
    ? `📻 RADIO: "${message.toUpperCase()}"`
    : resolvedText.toUpperCase()

  return (
    <div className="f1-alert-banner">
      <div className="f1-alert-badge">
        <F1Logo />
      </div>
      <div className="f1-alert-body">
        <p className="f1-heading-text">{heading}</p>
        <p className="f1-detail-text">{detail}</p>
      </div>
    </div>
  )
}

SubAlert.getBotrixHtml = () => {
  return `<div class="container {disposition} {transition}">
  ${fontLink}
  <style>${sharedStyles}</style>

  <div class="f1-alert-banner">
    <div class="f1-alert-badge">
      <div class="f1-logo-content">
        ${f1LogoSvg}
      </div>
    </div>

    <div class="f1-alert-body">
      <p class="f1-heading-text">RACE CONTROL: {name} RENEWAL INCIDENT</p>
      <p class="f1-detail-text">📻 RADIO: "{message}"</p>
    </div>
  </div>
</div>`
}
