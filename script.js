/* ============================================================
   script.js — "Do You Still Love Me?" question page

   YES and NO sit side by side at rest. The first time NO is
   clicked, both buttons are handed a `position: fixed` home in
   the *exact* spot they already occupy (measured via
   getBoundingClientRect — a FLIP transition), then eased toward
   their growth positions. Nothing jumps.

   From that point on, NO can be clicked an unlimited number of
   times. Every click feeds the same continuous growth formula
   for YES — there is no fixed click-count "shortcut" that snaps
   it to fullscreen. The longer NO gets clicked, the closer YES
   asymptotically gets to covering the entire viewport, through
   the exact same transition each time.
   ============================================================ */

let noClicks = 0;
let isFixed = false;

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

    if (!isFixed) {
      isFixed = true;
      lockToFixed(yesBtn, noBtn);
      updateNo(noBtn, noClicks);
      // Let the position settle first, then start the size growth —
      // animating both at once made the button swing off-path, since
      // translate(-50%,-50%) recomputes against a size that was also
      // mid-transition. Sequencing them keeps the motion clean.
      window.setTimeout(() => growYes(yesBtn, noClicks), 520);
    } else {
      growYes(yesBtn, noClicks);
      updateNo(noBtn, noClicks);
    }

    if (tally) {
      tally.textContent = noClicks + (noClicks === 1 ? ' no so far' : ' nos so far') +
        ' — yes just keeps getting bigger.';
    }
  });

  yesBtn.addEventListener('click', () => {
    window.location.href = 'happy_monthsary.html';
  });
}

// A genuine FLIP: measure each button's current on-screen center,
// pin it there with position:fixed (so nothing visibly moves),
// force a reflow, then let CSS transition it toward its growth home.
//
// Note: .card uses backdrop-filter, which (per spec) creates a new
// containing block for any position:fixed descendant. Left as-is,
// the buttons would size themselves relative to the card instead of
// the viewport. Reparenting to <body> before fixing position avoids
// that entirely.
function lockToFixed(yesBtn, noBtn) {
  [yesBtn, noBtn].forEach(btn => {
    const r = btn.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    document.body.appendChild(btn);
    btn.style.left = cx + 'px';
    btn.style.top = cy + 'px';
  });

  yesBtn.classList.add('yes-fixed');
  noBtn.classList.add('no-fixed');

  // Force a reflow so the browser registers the "locked" position
  // before we change it again — this is what makes the next change
  // animate instead of jump.
  // eslint-disable-next-line no-unused-expressions
  yesBtn.offsetHeight;

  yesBtn.style.left = '50%';
  yesBtn.style.top = '50%';

  noBtn.style.left = '50%';
  noBtn.style.top = '90vh';
}

// Continuous, unbounded growth curve: t creeps toward 1 forever,
// so YES keeps swelling for as long as NO keeps getting clicked,
// eventually covering the whole screen — no cap, no shortcut.
function growYes(yesBtn, n) {
  const t = 1 - Math.exp(-n / 6);

  yesBtn.style.fontSize   = `calc(1.5rem + ${(t * 21).toFixed(3)}vw)`;
  yesBtn.style.padding    = `calc(0.9rem + ${(t * 44).toFixed(3)}vh) calc(2.4rem + ${(t * 44).toFixed(3)}vw)`;
  yesBtn.style.borderRadius = `${Math.max(0, (1 - t) * 60).toFixed(1)}px`;
  yesBtn.style.boxShadow = `0 ${(10 + t * 40).toFixed(0)}px ${(30 + t * 130).toFixed(0)}px -8px rgba(216, 17, 89, ${(0.45 + t * 0.3).toFixed(2)})`;

  yesBtn.classList.toggle('yes-close', t > 0.9);
}

function updateNo(noBtn, n) {
  const msg = NO_MESSAGES[(n - 1) % NO_MESSAGES.length];
  noBtn.textContent = msg;

  const shrink = Math.max(0.55, 1 - n * 0.03);
  noBtn.style.transform = `translate(-50%, -50%) scale(${shrink})`;
  noBtn.style.opacity = Math.max(0.4, 1 - n * 0.025);
}

// ── BOOT ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderDecor();
  if (window.spawnTulipConfetti) window.spawnTulipConfetti('#confettiField', 26);
  initButtons();
});
