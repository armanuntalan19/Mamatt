# Do You Still Love Me? 💕

A standalone project, separate from the anniversary page project.

## Files
- `index.html` + `style.css` + `script.js` — the question page (Yes/No)
- `page3.html` + `page3-style.css` — the reveal page shown after Yes is clicked
- `icon.png` — the pleading-pup icon used on the question page

## How it works
1. `index.html` shows the icon and the question with Yes/No buttons.
2. Clicking **No** shrinks No and grows Yes *in place*, using `transform: scale()`
   only — never font-size/padding — so nothing reflows and both buttons stay
   exactly where they are. That means the No button never moves and can be
   clicked quickly and repeatedly. No is layered on top (higher z-index) so
   the growing Yes button never blocks it.
3. After 6 No clicks, Yes takes over the full screen.
4. Clicking **Yes** (either button) redirects to `page3.html` — a completely
   separate page with its own HTML/CSS — showing the 43-month message.
   The question page content is fully replaced by navigating away, rather
   than swapping a div, so nothing from the question ever lingers.

## Customizing
- Change `MAX_NO_CLICKS` in `script.js` to adjust how many No clicks it takes
  before Yes takes over.
- Edit the message text directly inside `page3.html` inside `.p3-message`.
- Swap `icon.png` for a different image any time — just keep the filename,
  or update the `src`/`href` references in `index.html`.
