/* ============================================================
   page3-script.js — decorative setup for the Monthsary page.
   Uses the same falling-tulip confetti mechanics as the question
   page, but real tulip colors (yellow, orange, purple, red)
   instead of the index page's pink/crimson.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Real tulip colors — yellow, orange, purple, red — distinct from
  // the index page's pink/crimson bouquet.
  const palette = window.MONTHSARY_PALETTE || ['#f7ca18', '#f39c12', '#8e44ad', '#c0392b', '#6c3483'];

  if (window.spawnTulipConfetti) window.spawnTulipConfetti('#confettiField', 26, palette);

  const bouquet = document.getElementById('bouquet');
  if (bouquet && window.tulipSVG) {
    const stems = [
      { color: '#f7ca18', size: 56 },
      { color: '#8e44ad', size: 76 },
      { color: '#f39c12', size: 56 },
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
    const cornerColors = ['#f39c12', '#f7ca18', '#6c3483', '#c0392b'];
    corners.forEach((el, i) => {
      el.innerHTML = window.tulipSVG(cornerColors[i % cornerColors.length]);
    });
  }
});
