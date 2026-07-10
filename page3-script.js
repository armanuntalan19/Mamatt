/* ============================================================
   page3-script.js — decorative setup for the Monthsary page.
   Uses the exact same tulip confetti as the question page.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Uses MONTHSARY_PALETTE (gold/violet) instead of the index page's
  // TULIP_PALETTE (pink/crimson) so the reveal page has its own look.
  const palette = window.MONTHSARY_PALETTE || ['#8a4fc7', '#e0a458', '#c77dff', '#b8449a', '#5b3a8e'];

  if (window.spawnTulipConfetti) window.spawnTulipConfetti('#confettiField', 26, palette);

  const bouquet = document.getElementById('bouquet');
  if (bouquet && window.tulipSVG) {
    const stems = [
      { color: '#e0a458', size: 56 },
      { color: '#8a4fc7', size: 76 },
      { color: '#b8449a', size: 56 },
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
    const cornerColors = ['#c77dff', '#e0a458', '#b8449a', '#5b3a8e'];
    corners.forEach((el, i) => {
      el.innerHTML = window.tulipSVG(cornerColors[i % cornerColors.length]);
    });
  }
});
