(function () {
  function startAlert() {
    const container = document.getElementById('botrix-alert-container');
    const banner = container ? container.querySelector('.f1-alert-banner') : null;
    
    if (!container || !banner) {
      // Elements not in DOM yet, poll again in 50ms
      setTimeout(startAlert, 50);
      return;
    }

    const getMetaValue = (id) => {
      const el = document.getElementById(id);
      return el ? el.textContent.trim() : '';
    };

    const metaName = getMetaValue('meta-name');
    const metaText = getMetaValue('meta-text');
    const metaAmount = getMetaValue('meta-amount');
    const metaMessage = getMetaValue('meta-message');
    const metaImage = getMetaValue('meta-image');
    const metaSound = getMetaValue('meta-sound');

    const hasImage = metaImage && metaImage !== '{image}' && metaImage !== '';
    const hasSound = metaSound && metaSound !== '{sound}' && metaSound !== '';
    const hasMessage = metaMessage && metaMessage !== '{message}' && metaMessage !== '';

    const name = metaName && metaName !== '{name}' ? metaName : 'Alguien';
    const amount = metaAmount && metaAmount !== '{amount}' ? metaAmount : '';
    const text = metaText && metaText !== '{text}' ? metaText : 'suscrito';
    const textLower = text.toLowerCase();

    // Argentine Spanish Slang & F1 Terminology logic
    let category = "RACE CONTROL";
    let title = `¡NUEVO APORTE!`;
    let desc = `Se sumó a boxes`;

    if (textLower.includes("gift") || textLower.includes("regaló") || textLower.includes("regalo")) {
      category = "PATROCINIO DE EQUIPO";
      const cleanAmount = amount.replace(/[^0-9]/g, '') || "1";
      title = `¡${name} REGALÓ ${cleanAmount} ${parseInt(cleanAmount) === 1 ? 'SUB' : 'SUBS'}!`;
      desc = "¡QUÉ TIPAZO, SE PASÓ DE REVOLUCIONES EN ENTRADA A RECTA!";
    } else if (textLower.includes("resub") || textLower.includes("re-sub") || textLower.includes("mes") || textLower.includes("month") || textLower.includes("renovó") || (amount && !amount.includes("$") && !amount.includes("USD") && !amount.includes("ARS") && textLower.includes("suscri"))) {
      category = "RENOVACIÓN DE CONTRATO";
      const months = amount.replace(/[^0-9]/g, '') || "2";
      title = `¡${name} RENOVÓ POR ${months} MESES!`;
      desc = "¡SIGUE FIRME EN LA ESCUDERÍA ACELERANDO A FONDO!";
    } else if (amount && (amount.includes("$") || amount.includes("USD") || amount.includes("ARS") || amount.includes("EUR") || textLower.includes("donó") || textLower.includes("tip") || textLower.includes("donacion") || textLower.includes("donación"))) {
      category = "APORTE PARA EL MONOPLAZA";
      title = `¡${name} APORTÓ ${amount}!`;
      desc = "¡DIRECTO PARA LA NAFTA Y EL JUEGO DE GOMAS DE CLASIFICACIÓN!";
    } else {
      category = "NUEVO PILOTO EN GRILLA";
      title = `¡${name} SE SUSCRIBIÓ, LOCO!`;
      desc = "¡BIENVENIDO A BOXES! SE ACABA DE SUMAR A LA ESCUDERÍA.";
    }

    // Update layout contents
    const categoryEl = document.getElementById('alert-category');
    const titleEl = document.getElementById('alert-main-title');
    const descEl = document.getElementById('alert-subtitle');
    const messageEl = document.getElementById('alert-user-message');
    const alertImg = document.getElementById('alert-img');
    const fallbackIcon = document.getElementById('alert-fallback-icon');

    if (categoryEl) categoryEl.textContent = category;
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;

    // Handle optional user message (styled like a Team Radio quote)
    if (messageEl) {
      if (hasMessage) {
        messageEl.textContent = `📻 RADIO: "${metaMessage}"`;
        messageEl.style.display = 'block';
      } else {
        messageEl.style.display = 'none';
      }
    }

    // Handle profile image vs checkered flag fallback
    if (alertImg && fallbackIcon) {
      if (hasImage) {
        alertImg.src = metaImage;
        alertImg.style.display = 'block';
        fallbackIcon.style.display = 'none';
      } else {
        alertImg.style.display = 'none';
        fallbackIcon.style.display = 'flex';
      }
    }

    // Play alert audio
    try {
      if (hasSound) {
        const audio = new Audio(metaSound);
        audio.volume = 0.7;
        audio.play().catch(err => {
          console.warn("Audio play promise failed:", err);
        });
      }
    } catch (audioErr) {
      console.error("Audio initialization failed:", audioErr);
    }

    // Reset animations/classes to allow multiple replays
    container.classList.remove('alert-show');
    banner.classList.remove('animate-in', 'animate-out');

    // Force a CSS style recalculation (reflow) to ensure the animation triggers
    void container.offsetWidth;
    void banner.offsetWidth;

    // Trigger animations
    container.classList.add('alert-show');
    banner.classList.add('animate-in');

    // Autohide timer
    const displayDuration = 6500; // Shows for 6.5 seconds
    setTimeout(() => {
      banner.classList.remove('animate-in');
      banner.classList.add('animate-out');
      
      setTimeout(() => {
        container.classList.remove('alert-show');
        banner.classList.remove('animate-out');
      }, 400); // Wait for fade out animation to finish
    }, displayDuration);
  }

  // Kick off the alert init
  startAlert();
})();
