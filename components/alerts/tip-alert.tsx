import { type AlertProps, compileBotrixHtml, F1Logo } from "./shared";

export function TipAlert({ name, amount, message }: AlertProps) {
  const resolvedName = name.trim() || "PILOTO";
  const resolvedAmount = amount.trim() || "$5.00";
  const heading = `RACE CONTROL: ${resolvedName.toUpperCase()} PIT STOP INCIDENT`;
  const detail = message
    ? `📻 RADIO: "${message.toUpperCase()}"`
    : `TIPPED ${resolvedAmount.toUpperCase()}`;

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
  );
}

TipAlert.getBotrixHtml = () =>
  compileBotrixHtml(`
    function updateText() {
      const getMetaValue = (id) => {
        const el = document.getElementById(id);
        return el ? el.textContent.trim() : '';
      };

      const cleanPlaceholder = (val, placeholder) => {
        if (!val) return '';
        const trimmed = val.trim();
        if (trimmed === placeholder || trimmed.toLowerCase() === placeholder.toLowerCase() || trimmed.includes(placeholder)) {
          return '';
        }
        return trimmed;
      };

      const rawName = getMetaValue('meta-name');
      const rawText = getMetaValue('meta-text');
      const rawAmount = getMetaValue('meta-amount');
      const rawMessage = getMetaValue('meta-message');

      const message = cleanPlaceholder(rawMessage, '{message}');
      let name = cleanPlaceholder(rawName, '{name}');
      let amount = cleanPlaceholder(rawAmount, '{amount}');

      if (!name && rawText) {
        const firstSpace = rawText.indexOf(' ');
        name = firstSpace !== -1 ? rawText.substring(0, firstSpace) : rawText;
      }
      if (!name) {
        name = 'PILOTO';
      }
      if (!amount) {
        amount = '$5.00';
      }

      const heading = "RACE CONTROL: " + name.toUpperCase() + " PIT STOP INCIDENT";
      
      let detail = '';
      if (message) {
        detail = "📻 RADIO: \\"" + message.toUpperCase() + "\\"";
      } else {
        detail = "TIPPED " + amount.toUpperCase();
      }

      const headingEl = document.getElementById('f1-heading');
      const detailEl = document.getElementById('f1-detail');

      if (headingEl) headingEl.textContent = heading;
      if (detailEl) detailEl.textContent = detail;
    }

    updateText();

    const target = document.getElementById('meta-data');
    if (target) {
      const observer = new MutationObserver(updateText);
      observer.observe(target, { childList: true, subtree: true, characterData: true });
    }
  `);
