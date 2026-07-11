/* ============================================================
   confetti.js — shared floating image confetti
   Used identically by index.html and happy_monthsary.html so
   both pages show the same gentle falling confetti — built from
   the provided confetti artwork instead of tulip SVGs.
   ============================================================ */

const CONFETTI_IMAGE = 'images/confetti-piece.png';

// Spawns a balanced field of slowly falling confetti pieces inside
// `containerSelector`. Each piece gets its own size, rotation,
// opacity, drift and timing so the motion never feels mechanical
// or crowded.
function spawnConfetti(containerSelector, count) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  count = count || 16;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';

    const img = document.createElement('img');
    img.src = CONFETTI_IMAGE;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    piece.appendChild(img);

    const size = 16 + Math.random() * 20;              // 16–36px
    const rotStart = Math.random() * 360 - 180;
    const rotSwing = 40 + Math.random() * 60;

    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.width = size + 'px';
    piece.style.setProperty('--rot-start', rotStart + 'deg');
    piece.style.setProperty('--rot-mid', (rotStart + rotSwing) + 'deg');
    piece.style.setProperty('--rot-end', (rotStart + rotSwing * 2) + 'deg');
    piece.style.setProperty('--drift', (Math.random() * 70 - 35) + 'px');
    piece.style.setProperty('--peak-opacity', (0.45 + Math.random() * 0.4).toFixed(2));
    // Slow, elegant fall — long durations, staggered starts.
    piece.style.animationDuration = (14 + Math.random() * 12) + 's';
    piece.style.animationDelay = (Math.random() * 14) + 's';
    container.appendChild(piece);
  }
}

window.spawnConfetti = spawnConfetti;
