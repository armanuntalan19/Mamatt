/* ============================================================
   page3-script.js — decorative setup for the Monthsary page.
   Uses the exact same tulip confetti as the question page.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Uses the same pink/crimson palette as the index page so the reveal
  // page feels like a continuation, not a different look.
  const palette = window.MONTHSARY_PALETTE || ['#d81159', '#ef6351', '#dfa13a', '#f3a6c4', '#7a2a54'];

  if (window.spawnTulipConfetti) window.spawnTulipConfetti('#confettiField', 26, palette);

  const bouquet = document.getElementById('bouquet');
  if (bouquet && window.tulipSVG) {
    const stems = [
      { color: '#e7b567', size: 56 },
      { color: '#f3a6c4', size: 76 },
      { color: '#ef6351', size: 56 },
    ];
    stems.forEach(s => {
      const wrap = document.createElement('div');
      wrap.style.width = s.size + 'px';
      wrap.innerHTML = window.tulipSVG(s.color);
      bouquet.appendChild(wrap);
    });
  }

  const corners = document.querySelectorAll('.tulip-float');
  if (window.tulipSVG) {
    const cornerColors = ['#f3a6c4', '#e7b567', '#ef6351', '#d81159'];
    corners.forEach((el, i) => {
      el.innerHTML = window.tulipSVG(cornerColors[i % cornerColors.length]);
    });
  }
});
