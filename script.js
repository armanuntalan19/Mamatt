/* ============================================================
   script.js — "Do You Still Love Me?" question page

   NO can be clicked an unlimited number of times. Every click
   feeds the same continuous growth formula for YES — there is
   no fixed click-count "shortcut" that snaps YES to fullscreen.
   The longer NO gets clicked, the closer YES asymptotically
   gets to covering the entire viewport, through the exact same
   transition each time.
   ============================================================ */

let noClicks = 0;

const NO_MESSAGES = [
  'No', 'Wait, no', 'Still no', 'Are you sure', 'Really, no',
  'Think again', 'Hmm, no', 'One more no', 'No, but nicely',
  'Okay, no', 'Absolutely not', 'No comment', 'Unlimited no'
];

// ── DECORATIVE TULIPS (bouquet + fixed corner tulips) ─────────
function renderDecor() {
  const bouquet = document.getElementById('bouquet');
  if (bouquet && window.tulipSVG) {
    const stems = [
      { color: '#c9922e', size: 54 },
      { color: '#d81159', size: 72 },
      { color: '#ef6351', size: 54 },
    ];
    stems.forEach(s => {
      const wrap = document.createElement('div');
      wrap.style.width = s.size + 'px';
      wrap.innerHTML = window.tulipSVG(s.color);
      bouquet.appendChild(wrap);
    });
  }

  if (window.tulipSVG) {
    const corners = document.querySelectorAll('.tulip-float');
    const cornerColors = ['#d81159', '#c9922e', '#ef6351', '#7a2a54'];
    corners.forEach((el, i) => {
      el.innerHTML = window.tulipSVG(cornerColors[i % cornerColors.length]);
    });
  }
}

// ── YES / NO LOGIC ────────────────────────────────────────────
function initButtons() {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn  = document.getElementById('noBtn');
  const tally  = document.getElementById('tally');

  noBtn.addEventListener('click', () => {
    noClicks++;
    growYes(yesBtn, noClicks);
    updateNo(noBtn, noClicks);
    if (tally) {
      tally.textContent = noClicks + (noClicks === 1 ? ' no so far' : ' nos so far') +
        ' — yes just keeps getting bigger.';
    }
  });

  yesBtn.addEventListener('click', () => {
    window.location.href = 'happy_monthsary.html';
  });
}

// Continuous, unbounded growth curve: t creeps toward 1 forever,
// so YES keeps swelling for as long as NO keeps getting clicked,
// eventually covering the whole screen — no cap, no shortcut.
function growYes(yesBtn, n) {
  const t = 1 - Math.exp(-n / 6);

  yesBtn.style.fontSize   = `calc(1.5rem + ${(t * 21).toFixed(3)}vw)`;
  yesBtn.style.padding    = `calc(0.85rem + ${(t * 44).toFixed(3)}vh) calc(2.1rem + ${(t * 44).toFixed(3)}vw)`;
  yesBtn.style.borderRadius = `${Math.max(0, (1 - t) * 60).toFixed(1)}px`;
  yesBtn.style.boxShadow = `0 ${(10 + t * 40).toFixed(0)}px ${(30 + t * 130).toFixed(0)}px -8px rgba(216, 17, 89, ${(0.45 + t * 0.3).toFixed(2)})`;

  yesBtn.classList.toggle('yes-close', t > 0.9);
}

function updateNo(noBtn, n) {
  const msg = NO_MESSAGES[(n - 1) % NO_MESSAGES.length];
  noBtn.textContent = msg;

  const shrink = Math.max(0.55, 1 - n * 0.03);
  noBtn.style.transform = `translateX(-50%) scale(${shrink})`;
  noBtn.style.opacity = Math.max(0.4, 1 - n * 0.025);
}

// ── BOOT ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderDecor();
  if (window.spawnTulipConfetti) window.spawnTulipConfetti('#confettiField', 26);
  initButtons();
});
