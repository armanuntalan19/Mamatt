/* ============================================================
   confetti.js — shared tulip-petal confetti
   Used identically by index.html and happy_monthsary.html so
   both pages show the exact same falling-tulip effect.
   ============================================================ */

// Same five tones on both pages — this is what keeps the effect identical
// regardless of a light or dark background.
const TULIP_PALETTE = ['#d81159', '#ef6351', '#dfa13a', '#f3a6c4', '#7a2a54'];
const LEAF_TONE = '#3a6b4c';

// A single flat, bold-outlined tulip icon — same silhouette used
// everywhere a tulip appears (bouquets, corner accents, falling
// confetti), so the artwork is uniform across every page. Only the
// bloom color changes (drawn from TULIP_PALETTE); the shape itself
// never varies: a scalloped three-petal bloom, a straight stem, and
// two crossing pointed leaves, all with a thick black outline.
function tulipSVG(bloomColor, leafColor) {
  leafColor = leafColor || LEAF_TONE;
  return (
    '<svg viewBox="0 0 40 64" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M20,50 L20,62" fill="none" stroke="#000" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M20,58 C14,54 8,50 5,42 C2,35 3,28 7,23 C10,30 12,36 15,42 C17,47 19,52 20,58 Z" fill="' + leafColor + '" stroke="#000" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<path d="M20,54 C26,49 32,44 34,35 C36,27 34,21 30,18 C28,26 25,33 22,40 C20,45 19,50 20,54 Z" fill="' + leafColor + '" stroke="#000" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<g transform="translate(20,26)">' +
        '<path d="M0,-24 C1.8,-24 3,-22.6 3.6,-20 C4.1,-17.8 5.8,-17.3 7.5,-19 C9.7,-21.2 11.7,-23.5 12.8,-21.8 C14.1,-19.7 14.3,-16.2 12,-13.3 C10.3,-11.1 8.6,-9.8 8.7,-7.6 C8.8,-5.5 10.4,-3.6 10.8,-1 C11.2,1.9 10,4.8 7.6,7.2 C5.2,9.5 2.5,11.2 0,13 C-2.5,11.2 -5.2,9.5 -7.6,7.2 C-10,4.8 -11.2,1.9 -10.8,-1 C-10.4,-3.6 -8.8,-5.5 -8.7,-7.6 C-8.6,-9.8 -10.3,-11.1 -12,-13.3 C-14.3,-16.2 -14.1,-19.7 -12.8,-21.8 C-11.7,-23.5 -9.7,-21.2 -7.5,-19 C-5.8,-17.3 -4.1,-17.8 -3.6,-20 C-3,-22.6 -1.8,-24 0,-24 Z" fill="' + bloomColor + '" stroke="#000" stroke-width="2.2" stroke-linejoin="round"/>' +
        '<path d="M3.6,-20 C4.5,-14 4,-7 5,0" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round" opacity="0.5"/>' +
        '<path d="M-3.6,-20 C-4.5,-14 -4,-7 -5,0" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round" opacity="0.5"/>' +
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
