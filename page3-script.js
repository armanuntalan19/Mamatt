/* ============================================================
   page3-script.js — decorative setup for the Monthsary page.
   Uses the exact same tulip confetti as the question page.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (window.spawnTulipConfetti) window.spawnTulipConfetti('#confettiField', 26);

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
