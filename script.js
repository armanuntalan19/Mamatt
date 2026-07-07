/* ============================================================
   script.js — "Do You Still Love Me?" question page
   ============================================================ */

// ── SPAWN FALLING PETALS ────────────────────────────────────
function spawnPetals() {
  const container = document.querySelector('.p1-petals');
  if (!container) return;
  const emojis = ['🌷', '🌸', '💗', '✨', '🌺', '💕'];
  for (let i = 0; i < 22; i++) {
    const el = document.createElement('div');
    el.classList.add('petal');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (1 + Math.random() * 1.4) + 'rem';
    el.style.animationDuration = (6 + Math.random() * 8) + 's';
    el.style.animationDelay = (Math.random() * 8) + 's';
    container.appendChild(el);
  }
}

// ── YES / NO LOGIC ───────────────────────────────────────────
// Every NO click makes YES genuinely bigger (real padding/font-size,
// not just a transform), so the layout adapts around it — nothing is
// pinned in place. Keep clicking NO and YES keeps swelling until, on
// the final click, it smoothly expands (FLIP animation) to cover the
// entire screen.
let noClicks = 0;
const MAX_NO_CLICKS = 9; // number of NO clicks needed before YES takes the whole page

function initButtons() {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn  = document.getElementById('noBtn');

  noBtn.addEventListener('click', () => {
    if (noClicks >= MAX_NO_CLICKS) return;
    noClicks++;

    const progress = noClicks / MAX_NO_CLICKS; // 0 → 1

    if (noClicks < MAX_NO_CLICKS) {
      // Real size growth, in normal flow — layout reflows as it grows
      const fontSize   = 1.5 + progress * 5.5;      // 1.5rem → ~7rem
      const padY       = 0.9 + progress * 2.4;      // rem
      const padX       = 2.4 + progress * 6.5;      // rem
      yesBtn.style.fontSize = fontSize + 'rem';
      yesBtn.style.padding  = `${padY}rem ${padX}rem`;

      // NO shrinks, fades, and (because it's in normal flow) gets
      // naturally nudged aside as its neighbor swells
      const noScale = Math.max(0.3, 1 - noClicks * 0.1);
      const noPad   = Math.max(0.3, 0.9 - noClicks * 0.08);
      noBtn.style.transform = `scale(${noScale})`;
      noBtn.style.opacity   = Math.max(0.15, 1 - noClicks * 0.11);
      noBtn.style.padding   = `${noPad}rem ${noPad + 1.5}rem`;
    }

    // Final click → smoothly expand YES to fill the whole page
    if (noClicks >= MAX_NO_CLICKS) {
      noBtn.style.pointerEvents = 'none';
      noBtn.style.opacity = '0';
      expandYesToFullscreen(yesBtn);
    }
  });

  yesBtn.addEventListener('click', goToPage3);
}

// ── FLIP ANIMATION: grow YES from wherever it sits into a fullscreen takeover ──
function expandYesToFullscreen(yesBtn) {
  const rect = yesBtn.getBoundingClientRect();

  // Lock its current on-screen position/size first (no visual jump)
  yesBtn.classList.add('yes-expanding');
  yesBtn.style.top    = rect.top + 'px';
  yesBtn.style.left   = rect.left + 'px';
  yesBtn.style.width  = rect.width + 'px';
  yesBtn.style.height = rect.height + 'px';
  yesBtn.style.margin = '0';

  // Force a reflow so the browser registers the starting position
  // before we animate to the fullscreen end-state
  void yesBtn.offsetWidth;

  requestAnimationFrame(() => {
    yesBtn.classList.add('yes-fullscreen');
    yesBtn.style.top    = '0';
    yesBtn.style.left   = '0';
    yesBtn.style.width  = '100vw';
    yesBtn.style.height = '100vh';
  });
}

// ── GO TO PAGE 3 (separate html/css, own file) ──────────────
function goToPage3() {
  window.location.href = 'happy_monthsary.html';
}

// ── BOOT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  spawnPetals();
  initButtons();
});
