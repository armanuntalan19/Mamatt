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
// NO clicks only ever change `transform: scale()`, which is a purely
// visual change that doesn't affect layout — so neither button ever
// moves position. The user can keep clicking NO in the exact same
// spot while YES visibly grows next to it.
let noClicks = 0;
const MAX_NO_CLICKS = 6; // after this many, YES takes over the screen

function initButtons() {
  const yesBtn  = document.getElementById('yesBtn');
  const noBtn   = document.getElementById('noBtn');
  const overlay = document.getElementById('yesTakeover');
  const overYes = document.getElementById('overlayYesBtn');

  noBtn.addEventListener('click', () => {
    noClicks++;

    // YES grows in place (no reflow, no movement)
    const yesScale = Math.min(3.2, 1 + noClicks * 0.4);
    yesBtn.style.transform = `scale(${yesScale})`;

    // NO shrinks in place and fades, but stays exactly where it was
    const noScale = Math.max(0.35, 1 - noClicks * 0.12);
    noBtn.style.transform = `scale(${noScale})`;
    noBtn.style.opacity   = Math.max(0.25, 1 - noClicks * 0.12);

    // After enough NO clicks → YES takes over the whole screen
    if (noClicks >= MAX_NO_CLICKS) {
      overlay.classList.add('show');
    }
  });

  yesBtn.addEventListener('click', goToPage3);
  overYes.addEventListener('click', goToPage3);
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
