import React from "react"
import { type AlertProps, F1Logo, f1LogoSvg, fontLink, sharedStyles } from "./shared"

export function GiftSubAlert({ name, amount }: AlertProps) {
  const resolvedName = name.trim() || "PILOTO"
  const resolvedAmount = amount.trim() || "1"
  const heading = `RACE CONTROL: ${resolvedName.toUpperCase()} GIFT INCIDENT`
  const detail = `GIFTED ${resolvedAmount.toUpperCase()} SUBSCRIPTIONS`

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

GiftSubAlert.getBotrixHtml = () => {
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
      <p class="f1-heading-text">RACE CONTROL: {name} GIFT INCIDENT</p>
      <p class="f1-detail-text">GIFTED {amount} SUBSCRIPTIONS</p>
    </div>
  </div>
</div>`
}
