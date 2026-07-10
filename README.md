# Do You Still Love Me?

A two-page romantic mini-site: a playful Yes/No question page, then a
"Happy Monthsary" reveal page. Tulip-themed throughout — no emoji, all
tulip artwork is hand-drawn SVG.

## Files
- `index.html` + `style.css` + `script.js` — the question page (Yes/No)
- `happy_monthsary.html` + `page3-style.css` + `page3-script.js` — the reveal page shown after Yes is clicked
- `confetti.js` + `confetti.css` — shared falling-tulip effect, used identically by both pages
- `icon.png` — the pleading-pup icon on the question page

## How it works
1. `index.html` shows the icon and the question with Yes/No buttons.
2. **No can be clicked an unlimited number of times.** Every click runs
   the same continuous growth formula on Yes (see `growYes()` in
   `script.js`) — there's no fixed click-count where it "jumps" to
   fullscreen. Yes simply keeps swelling the more No gets clicked,
   asymptotically approaching full-screen coverage. No also cycles
   through a short list of playful reply messages and shrinks on the
   exact same curve, in reverse — no floor, so it asymptotically
   shrinks toward nothing. Once it's effectively invisible it stops
   accepting clicks/taps/keyboard focus, leaving Yes as the only real
   option on screen.
3. Clicking **Yes** — always clickable, however big it's grown — goes
   to `happy_monthsary.html`, a separate page with its own HTML/CSS.
4. Both pages load the same `confetti.js`/`confetti.css` so the
   falling-tulip effect is pixel-for-pixel identical on each.

## Customizing
- Tune how fast Yes grows by changing the `/ 6` divisor inside
  `growYes()` in `script.js` — a smaller number makes it grow faster
  per click.
- Edit `NO_MESSAGES` in `script.js` to change what No says as it's clicked.
- Edit the copy directly inside `happy_monthsary.html`.
- Swap `icon.png` for a different image any time — just keep the
  filename, or update the `src`/`href` references in `index.html`.
- Tulip colors live in `TULIP_PALETTE` in `confetti.js`.
