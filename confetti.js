/* ============================================================
   confetti.js — shared tulip-petal confetti
   Used identically by index.html and happy_monthsary.html so
   both pages show the exact same falling-tulip effect.
   ============================================================ */

// Same five tones on both pages — this is what keeps the effect identical
// regardless of a light or dark background.
const TULIP_PALETTE = ['#d81159', '#ef6351', '#dfa13a', '#f3a6c4', '#7a2a54'];
const LEAF_TONE = '#3a6b4c';

// A single hand-drawn tulip silhouette, built from paths (no emoji).
function tulipSVG(bloomColor, leafColor) {
  leafColor = leafColor || LEAF_TONE;
  return (
    '<svg viewBox="0 0 40 64" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M20,62 L20,38" fill="none" stroke="' + leafColor + '" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M20,48 C10,45 6,37 8,29" fill="none" stroke="' + leafColor + '" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M20,43 C30,40 34,32 32,25" fill="none" stroke="' + leafColor + '" stroke-width="2" stroke-linecap="round"/>' +
      '<g transform="translate(20,30)">' +
        '<path d="M0,-30 C0,-30 -5,-26.2 -5,-18.6 C-5,-22.4 -7.5,-22.4 -8.75,-20.5 C-10,-18.6 -10,-14.8 -8.75,-12.9 C-10,-9.1 -8.75,-5.3 -6.25,-5.3 C-6.25,-1.5 -3.75,0.4 0,8 C3.75,0.4 6.25,-1.5 6.25,-5.3 C8.75,-5.3 10,-9.1 8.75,-12.9 C10,-14.8 10,-18.6 8.75,-20.5 C7.5,-22.4 5,-22.4 5,-18.6 C5,-26.2 0,-30 0,-30 Z" fill="' + bloomColor + '"/>' +
        '<path d="M0,-28 C0,-15 0,-5 0,6" stroke="rgba(255,255,255,0.35)" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
        '<path d="M-7,-18 C-9,-10 -7,-2 -3,5" stroke="rgba(255,255,255,0.25)" stroke-width="1.1" fill="none" stroke-linecap="round"/>' +
        '<path d="M7,-18 C9,-10 7,-2 3,5" stroke="rgba(255,255,255,0.25)" stroke-width="1.1" fill="none" stroke-linecap="round"/>' +
      '</g>' +
    '</svg>'
  );
}

// Spawns a field of gently falling tulip petals inside `containerSelector`.
// Identical logic/markup on both pages by design.
function spawnTulipConfetti(containerSelector, count) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  count = count || 26;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'tulip-petal';
    const color = TULIP_PALETTE[Math.floor(Math.random() * TULIP_PALETTE.length)];
    piece.innerHTML = tulipSVG(color);

    const size = 14 + Math.random() * 16;
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.width = size + 'px';
    piece.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
    piece.style.setProperty('--drift', (Math.random() * 90 - 45) + 'px');
    piece.style.animationDuration = (8 + Math.random() * 9) + 's';
    piece.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(piece);
  }
}

window.spawnTulipConfetti = spawnTulipConfetti;
window.tulipSVG = tulipSVG;
window.TULIP_PALETTE = TULIP_PALETTE;
