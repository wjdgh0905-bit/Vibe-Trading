# MELANGE TATTOO — website

Standalone static homepage for **Melange Tattoo**, a guest tattoo artist working across
South Korea, Australia, the United States, the United Kingdom, and Europe.
Built with plain **HTML / CSS / JS** — no build tools, no framework, no dependencies.
Open the file or drop it on any static host and it works.

This folder is fully separate from the rest of this repository (the trading app).

## Structure

```
melange-tattoo/
├── index.html        # single page: Hero → Work → About → Style & Process →
│                      #   Guest Spots → Booking → FAQ → Contact → Footer
├── styles.css         # minimal editorial theme, CSS variable tokens, responsive
├── script.js          # gallery + guest spots (data-driven) · nav · lightbox · booking form
├── assets/
│   ├── favicon.svg
│   └── gallery/       # put real tattoo photos here
└── README.md
```

## View it locally

Simplest — open `index.html` directly in a browser.

Or run a local server:

```bash
python3 -m http.server 8000 -d melange-tattoo
# → http://localhost:8000
```

## Adding real tattoo photos

The gallery ("Selected Work") is data-driven so photos can be swapped in without touching
the HTML. Open `script.js` and find the `GALLERY` array near the top:

```js
const GALLERY = [
  { tag: "Dragon", src: "" },
  { tag: "Snake", src: "" },
  // ...
];
```

To add a photo:

1. Put the image file in `assets/gallery/` (square-ish crops work best, ~1200px wide).
2. Set that entry's `src` to the file path, e.g. `"assets/gallery/dragon-01.jpg"`.

Any entry left with `src: ""` shows a placeholder tile instead, so you can fill the gallery
in gradually. Add, remove, or reorder entries freely — the grid and the lightbox both read
from this same array, so they always stay in sync. There's no fixed limit of 9; the grid
reflows to fit however many entries are in the array.

Only use Melange's own finished tattoo photos here — no AI-generated tattoo images and no
other artists' work.

## Updating guest spots

`script.js` also has a `GUEST_SPOTS` array, rendered into the "Upcoming Guest Spots" section:

```js
const GUEST_SPOTS = [
  { region: "South Korea", status: "Dates via Instagram" },
  // ...
];
```

Once a city and date range are confirmed, update the matching entry, e.g.:

```js
{ region: "Seoul, South Korea", status: "Mar 3–15 — DM to book" }
```

Exact studio addresses are intentionally never shown on the site — per the booking process,
those are sent directly to clients once a deposit confirms their appointment.

## Booking form

The booking form composes a `mailto:` to `melange.tattoo@gmail.com` with the visitor's
details filled in (name, city, tattoo idea, placement, size, preferred date, Instagram).
`mailto:` links can't attach files, so the form reminds visitors to attach a placement photo
themselves before sending — this can't be automated from a static page.

To swap in a real backend instead (so submissions land somewhere without relying on the
visitor's mail client), a service like [Formspree](https://formspree.io) can replace the
`mailto` block in `script.js`'s `form.addEventListener("submit", ...)` handler with something
like:

```js
fetch("https://formspree.io/f/your-id", {
  method: "POST",
  headers: { Accept: "application/json" },
  body: new FormData(form),
}).then(() => {
  status.textContent = "Sent — thank you!";
  form.reset();
});
```

## Editing copy

All page text lives directly in `index.html`, organized by section (`<section id="...">`).
Contact details (Instagram handle, email) appear in a few places — the header CTA, the
booking section, the contact band, and the footer — so update all of them together if they
ever change.

## Deploying

Static files — upload this folder as-is to GitHub Pages, Cloudflare Pages, Netlify, Vercel,
or any web host. No build command needed.
