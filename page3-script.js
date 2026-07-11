/* ============================================================
   page3-script.js — decorative setup for the Monthsary page.
   Uses the same falling-confetti mechanics as the question page.
   Tulip photo decor only — no hearts or ribbons here, matching
   page3-style.css.
   ============================================================ */

function initParallax() {
  const layer = document.getElementById('decorLayer');
  if (!layer || window.matchMedia('(pointer: coarse)').matches) return;

  let raf = null;
  window.addEventListener('mousemove', (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      layer.style.transform = `translate(${x * -10}px, ${y * -8}px)`;
      raf = null;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.spawnConfetti) window.spawnConfetti('#confettiField', 16);
  initParallax();
});
