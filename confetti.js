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
    '<svg viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M20,58 L20,26" fill="none" stroke="' + leafColor + '" stroke-width="2.2" stroke-linecap="round"/>' +
      '<path d="M20,46 C10,43 6,35 8,27" fill="none" stroke="' + leafColor + '" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M20,41 C30,38 34,30 32,23" fill="none" stroke="' + leafColor + '" stroke-width="2" stroke-linecap="round"/>' +
      '<g transform="translate(20,21)">' +
        '<path d="M0,0 C-9,-4 -9,-20 0,-26 C9,-20 9,-4 0,0 Z" fill="' + bloomColor + '" opacity="0.85" transform="rotate(-20)"/>' +
        '<path d="M0,0 C-9,-4 -9,-20 0,-26 C9,-20 9,-4 0,0 Z" fill="' + bloomColor + '"/>' +
        '<path d="M0,0 C-9,-4 -9,-20 0,-26 C9,-20 9,-4 0,0 Z" fill="' + bloomColor + '" opacity="0.85" transform="rotate(20)"/>' +
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
