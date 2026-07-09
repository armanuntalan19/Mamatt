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
// The bloom is a rounded bell of overlapping petals — a soft waist,
// a gently pointed base, and a light highlight fold on the left
// petal for a touch of dimension — the shared shape used everywhere
// a tulip appears (bouquets, corner accents, falling confetti).
function tulipSVG(bloomColor, leafColor) {
  leafColor = leafColor || LEAF_TONE;
  return (
    '<svg viewBox="0 0 40 64" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M20,62 L20,38" fill="none" stroke="' + leafColor + '" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M20,48 C10,45 6,37 8,29" fill="none" stroke="' + leafColor + '" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M20,43 C30,40 34,32 32,25" fill="none" stroke="' + leafColor + '" stroke-width="2" stroke-linecap="round"/>' +
      '<g transform="translate(20,30)">' +
        '<path d="M0,-34 C-5,-35 -11,-32 -12,-25 C-18,-23 -21,-17 -18,-11 C-21,-6 -19,0 -13,2 C-13,9 -8,14 -5,19 C-2,25 -1,31 0,38 C1,31 2,25 5,19 C8,14 13,9 13,2 C19,0 21,-6 18,-11 C21,-17 18,-23 12,-25 C11,-32 5,-35 0,-34 Z" fill="' + bloomColor + '"/>' +
        '<path d="M0,-32 C0,-16 0,0 0,20" stroke="rgba(0,0,0,0.22)" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
        '<path d="M-9,-22 C-11,-12 -8,-2 -3,6" stroke="rgba(0,0,0,0.16)" stroke-width="1.1" fill="none" stroke-linecap="round"/>' +
        '<path d="M9,-22 C11,-12 8,-2 3,6" stroke="rgba(0,0,0,0.16)" stroke-width="1.1" fill="none" stroke-linecap="round"/>' +
        '<path d="M-11,-24 C-15,-21 -16,-15 -13,-11" fill="rgba(255,255,255,0.32)"/>' +
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
