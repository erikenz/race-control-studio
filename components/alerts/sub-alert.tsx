import {
  type AlertProps,
  F1Logo,
  f1LogoSvg,
  fontLink,
  sharedStyles,
} from "./shared";

export function SubAlert({ name, text }: AlertProps) {
  const resolvedName = name.trim() || "PILOTO";
  const resolvedText = text || "subscribed";
  const heading = `RACE CONTROL: ${resolvedName.toUpperCase()} RENEWAL INCIDENT`;

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

SubAlert.getBotrixHtml =
  () => `<div class="container {disposition} {transition}">
  ${fontLink}
  <style>${sharedStyles}</style>

  <template id="botrix-data">
    <span id="name-val">{name}</span>
    <span id="text-val">{text}</span>
  </template>

  <div class="f1-alert-banner">
    <div class="f1-alert-badge">
      <div class="f1-logo-content">
        ${f1LogoSvg}
      </div>
    </div>

    <div class="f1-alert-body">
      <p class="f1-heading-text" id="alert-heading">RACE CONTROL: RENEWAL INCIDENT</p>
      <p class="f1-detail-text" id="alert-detail"></p>
    </div>
  </div>

  <script>
    (function() {
      const template = document.getElementById('botrix-data');
      if (template) {
        const nameVal = template.content.getElementById('name-val').textContent.trim();
        const textVal = template.content.getElementById('text-val').textContent.trim();
        
        const headingEl = document.getElementById('alert-heading');
        const detailEl = document.getElementById('alert-detail');
        
        if (headingEl) {
          headingEl.textContent = 'RACE CONTROL: ' + nameVal.toUpperCase() + ' RENEWAL INCIDENT';
        }
        if (detailEl) {
          detailEl.textContent = textVal.toUpperCase();
        }
      }
    })();
  </script>
</div>`;
