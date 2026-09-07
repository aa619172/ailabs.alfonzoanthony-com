(() => {
  'use strict';

  if (window.__AA_PORTFOLIO_PROTECTION__) return;
  window.__AA_PORTFOLIO_PROTECTION__ = true;

  const PROTECTED_MESSAGE = 'Protected portfolio content · © 2026 Alfonzo Anthony';
  const OVERLAY_ID = 'portfolio-protection-overlay';
  let overlayTimer = null;

  const ensureOverlay = () => {
    let overlay = document.getElementById(OVERLAY_ID);
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="portfolio-protection-card">
        <strong>Portfolio content protected</strong>
        <span>${PROTECTED_MESSAGE}</span>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  };

  const addStyles = () => {
    if (document.getElementById('portfolio-protection-style')) return;
    const style = document.createElement('style');
    style.id = 'portfolio-protection-style';
    style.textContent = `
      #${OVERLAY_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        display: none;
        align-items: center;
        justify-content: center;
        background: rgba(10, 10, 12, .98);
        color: #fff;
        padding: 24px;
        text-align: center;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      #${OVERLAY_ID}.is-active { display: flex; }
      #${OVERLAY_ID} .portfolio-protection-card {
        max-width: 520px;
        border: 1px solid rgba(255,255,255,.2);
        border-radius: 18px;
        padding: 24px;
        background: rgba(255,255,255,.06);
        box-shadow: 0 24px 80px rgba(0,0,0,.35);
      }
      #${OVERLAY_ID} strong {
        display: block;
        margin-bottom: 8px;
        font-size: 1rem;
      }
      #${OVERLAY_ID} span {
        color: rgba(255,255,255,.72);
        font-size: .8rem;
      }
      img, video { -webkit-user-drag: none; }
      @media print {
        body > *:not(#${OVERLAY_ID}) { display: none !important; }
        #${OVERLAY_ID} { display: flex !important; position: fixed !important; inset: 0 !important; }
      }
    `;
    document.head.appendChild(style);
  };

  const showProtectionOverlay = (duration = 1300) => {
    const overlay = ensureOverlay();
    overlay.classList.add('is-active');
    clearTimeout(overlayTimer);
    overlayTimer = setTimeout(() => overlay.classList.remove('is-active'), duration);
  };

  const isMacScreenshotShortcut = (event) =>
    event.metaKey && event.shiftKey && ['3', '4', '5'].includes(event.key);

  const isBrowserScreenshotShortcut = (event) =>
    (event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 's';

  const isProtectedUtilityShortcut = (event) => {
    const key = event.key.toLowerCase();
    return (event.ctrlKey || event.metaKey) && ['s', 'p'].includes(key);
  };

  document.addEventListener('DOMContentLoaded', () => {
    addStyles();
    ensureOverlay();
  }, { once: true });

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    showProtectionOverlay(850);
  }, { capture: true });

  document.addEventListener('dragstart', (event) => {
    const target = event.target;
    if (target instanceof HTMLImageElement || target instanceof HTMLVideoElement) {
      event.preventDefault();
    }
  }, { capture: true });

  document.addEventListener('keydown', (event) => {
    const printScreen = event.key === 'PrintScreen';
    const screenshotShortcut = isMacScreenshotShortcut(event) || isBrowserScreenshotShortcut(event);
    const protectedUtility = isProtectedUtilityShortcut(event);

    if (printScreen || screenshotShortcut || protectedUtility) {
      event.preventDefault();
      event.stopPropagation();
      showProtectionOverlay(printScreen || screenshotShortcut ? 1600 : 1000);
    }
  }, { capture: true });

  document.addEventListener('keyup', (event) => {
    if (event.key === 'PrintScreen') {
      event.preventDefault();
      showProtectionOverlay(1600);
    }
  }, { capture: true });

  window.addEventListener('beforeprint', () => {
    addStyles();
    ensureOverlay().classList.add('is-active');
  });

  window.addEventListener('afterprint', () => {
    ensureOverlay().classList.remove('is-active');
  });
})();
