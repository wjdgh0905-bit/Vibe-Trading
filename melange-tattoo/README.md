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
│                      #   Guest Spots → Booking → FAQ → Contact → Footer,
│                      #   plus the inquiry modal and gallery lightbox
├── styles.css         # minimal editorial theme, CSS variable tokens, responsive
├── script.js          # bilingual copy (KO/EN) · gallery + guest spots (data-driven) ·
│                      #   nav · lightbox · inquiry modal · booking form (Formspree)
├── assets/
│   ├── favicon.svg
│   └── gallery/       # tattoo photos live here
└── README.md
```

## View it locally

Simplest — open `index.html` directly in a browser.

Or run a local server:

```bash
python3 -m http.server 8000 -d melange-tattoo
# → http://localhost:8000
```

## Language (KO / EN)

The site is bilingual. All copy lives in the `I18N` object near the top of `script.js`
(one block for `en`, one for `ko`) — **not** in `index.html`. Markup only carries
`data-i18n="some.key"` attributes; `script.js` fills in the actual text for whichever
language is active. To edit any sentence on the site, find its key in `I18N` and change
the value there, for both languages.

The visitor's choice is saved to `localStorage` and defaults to English. Gallery tags and
guest-spot region names have their own small dictionaries (`TAGS`, `REGIONS`) for the same
reason — they're rendered dynamically, not written directly in the HTML.

## Adding real tattoo photos

The gallery ("Selected Work") is data-driven so photos can be swapped in without touching
the HTML. Open `script.js` and find the `GALLERY` array near the top:

```js
const GALLERY = [
  { tagKey: "Dragon", src: "assets/gallery/dragon-01.jpg" },
  { tagKey: "Snake", src: "assets/gallery/snake-01.jpg" },
  // ...
];
```

`tagKey` must match an entry in the `TAGS` dictionary (further down the file) so the label
translates correctly — use `"MelangeStyle"` for pieces that don't fit one of the named
subjects. To add a photo:

1. Put the image file in `assets/gallery/` (compress it first — aim for well under 1MB;
   the existing photos were resized to ~1600px wide).
2. Add an entry with that `src` path and a `tagKey`.

Leaving `src: ""` on an entry shows a placeholder tile instead, so the gallery can be filled
in gradually. Add, remove, or reorder entries freely — the grid and the lightbox both read
from this same array. Only use Melange's own finished tattoo photos — no AI-generated tattoo
images and no other artists' work.

Each entry also carries `w`/`h` (the photo's real pixel dimensions), so the browser can
reserve the right amount of space before the image loads instead of the whole page jumping
around as 100+ photos load in. Get a new photo's dimensions (e.g. `python3 -c "from PIL import
Image; print(Image.open('file.jpg').size)"`) and include them when adding an entry.

## Instagram Reels

`script.js` has a `REELS` array, shown as embedded clips under "Style & Process":

```js
const REELS = [
  { url: "https://www.instagram.com/reel/AbCdefGHij/" },
];
```

Paste in the reel's permalink URL (the link from Instagram's "Copy Link" on that post). Uses
Instagram's own oEmbed script, so no video files are hosted here. Leave the array empty and
the whole block stays hidden — nothing shows a broken or empty state.

## Dark mode

The site follows the visitor's system dark/light preference automatically
(`prefers-color-scheme`) — there's no manual toggle. All colors are CSS variables in
`styles.css`'s `:root` block plus a `@media (prefers-color-scheme: dark)` override further
down; add a new color anywhere on the site by adding a token there rather than a literal hex
value, or it won't adapt in dark mode.

## Updating guest spots

`script.js` also has a `GUEST_SPOTS` array, rendered into the "Upcoming Guest Spots" section.
It starts **empty** — add an entry only once a trip is actually confirmed:

```js
const GUEST_SPOTS = [
  { regionKey: "SouthKorea", city: "Seoul", status: "Mar 3–15 — DM to book" },
];
```

`regionKey` must match an entry in the `REGIONS` dictionary. `city` and `status` are optional;
without them a card falls back to the region name and a generic "Dates via Instagram" status
(both translated). While the array is empty, the section shows a short "no confirmed dates"
note with an Instagram link instead of an empty grid.

Exact studio addresses are intentionally never shown on the site — per the booking process,
those are sent directly to clients once a deposit confirms their appointment.

## Booking form

"Inquire" in the header, the mobile sticky bar, and the button at the end of the Booking
section all open the **same form in a modal** (`#inquiryModal` in `index.html`) — there's
only one `<form>` in the page, so there's one place to edit its fields.

The form submits to [Formspree](https://formspree.io) via `fetch()` (see
`FORMSPREE_ENDPOINT` near the top of `script.js`), including the optional placement photo as
a file upload — nothing opens the visitor's mail app. Submissions land in the connected
Formspree account/email. If the endpoint is ever reset (e.g. `"...f/YOUR_FORM_ID"`), the form
shows a friendly inline error pointing at direct email instead of failing silently.

## Editing copy

Section-by-section English and Korean text both live in `script.js`'s `I18N` object — see
**Language** above. `index.html` only holds structure and `data-i18n` keys, not the actual
sentences. Contact details (Instagram handle, email) appear in a few places — the booking
section, the inquiry modal, the contact band, and the footer — so update all of them together
if they ever change.

## Deploying

Static files — upload this folder as-is to GitHub Pages, Cloudflare Pages, Netlify, Vercel,
or any web host. No build command needed.
