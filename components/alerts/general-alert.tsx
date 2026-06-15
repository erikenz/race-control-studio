import { type AlertProps, compileBotrixHtml, F1Logo } from "./shared";

export function GeneralAlert({ name, text, message }: AlertProps) {
  const resolvedName = name.trim() || "PILOTO";
  const resolvedText = text || "incident";
  const textLower = resolvedText.toLowerCase();

  let headingSuffix = "INCIDENT";
  if (
    textLower.includes("gift") ||
    textLower.includes("regaló") ||
    textLower.includes("regalo") ||
    textLower.includes("gifted")
  ) {
    headingSuffix = "GIFT INCIDENT";
  } else if (
    textLower.includes("resub") ||
    textLower.includes("re-sub") ||
    textLower.includes("mes") ||
    textLower.includes("month") ||
    textLower.includes("renovó")
  ) {
    headingSuffix = "RENEWAL INCIDENT";
  } else if (
    textLower.includes("tipped") ||
    textLower.includes("donated") ||
    textLower.includes("donó") ||
    textLower.includes("apoyó") ||
    textLower.includes("tip") ||
    textLower.includes("donation") ||
    textLower.includes("$") ||
    textLower.includes("usd") ||
    textLower.includes("ars") ||
    textLower.includes("eur")
  ) {
    headingSuffix = "PIT STOP INCIDENT";
  }

  const heading = `RACE CONTROL: ${resolvedName.toUpperCase()} ${headingSuffix}`;
  const detail = message
    ? `📻 RADIO: "${message.toUpperCase()}"`
    : resolvedText.toUpperCase();

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

GeneralAlert.getBotrixHtml = () =>
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
      const rawMessage = getMetaValue('meta-message');

      const text = cleanPlaceholder(rawText, '{text}');
      const message = cleanPlaceholder(rawMessage, '{message}');
      let name = cleanPlaceholder(rawName, '{name}');

      if (!name && text) {
        const firstSpace = text.indexOf(' ');
        name = firstSpace !== -1 ? text.substring(0, firstSpace) : text;
      }
      if (!name) {
        name = 'PILOTO';
      }

      const textLower = text.toLowerCase();

      let headingSuffix = 'INCIDENT';
      if (textLower.includes("gift") || textLower.includes("regaló") || textLower.includes("regalo") || textLower.includes("gifted")) {
        headingSuffix = 'GIFT INCIDENT';
      } else if (textLower.includes("resub") || textLower.includes("re-sub") || textLower.includes("mes") || textLower.includes("month") || textLower.includes("renovó")) {
        headingSuffix = 'RENEWAL INCIDENT';
      } else if (textLower.includes("tipped") || textLower.includes("donated") || textLower.includes("donó") || textLower.includes("apoyó") || textLower.includes("tip") || textLower.includes("donation") || textLower.includes("$") || textLower.includes("usd") || textLower.includes("ars") || textLower.includes("eur")) {
        headingSuffix = 'PIT STOP INCIDENT';
      }

      const heading = "RACE CONTROL: " + name.toUpperCase() + " " + headingSuffix;
      
      let detail = '';
      if (message) {
        detail = "📻 RADIO: \\"" + message.toUpperCase() + "\\"";
      } else if (text) {
        detail = text.toUpperCase();
      } else {
        detail = 'INCIDENT';
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
