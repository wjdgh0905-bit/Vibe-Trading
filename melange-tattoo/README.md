# Melange Tattoo — melangetattoo.ink

Static site, no build step. Netlify publishes this folder as-is.

```
index.html        # English page  (/)
ko/index.html     # Korean page   (/ko/)
styles.css        # shared styles — cobalt "blue ink on paper"
gallery.js        # gallery data (120 photos, subject + placement per photo)
script.js         # behaviour: gallery filters/lightbox, booking form, guest spots, motion
assets/work/      # gallery photos as WebP: <id>-480.webp and <id>-1080.webp
assets/gallery/   # original JPGs (source files, not loaded by the pages)
sitemap.xml       # both pages, with hreflang alternates
```

## Editing copy

Each page's text is written directly in its HTML file: English in `index.html`,
Korean in `ko/index.html`. When you change one, change the other so they stay in step.

## Adding a gallery photo

1. Export two WebP files into `assets/work/`: `<id>-480.webp` (480px wide) and
   `<id>-1080.webp` (1080px wide). Example with cwebp:
   `cwebp -q 76 -resize 1080 0 photo.jpg -o assets/work/custom-121-1080.webp`
2. Add a line at the top of the list in `gallery.js`:
   ```js
   {"id": "custom-121", "cat": "dragon", "w": 1600, "h": 2000, "en": "forearm dragon, blue ink", "ko": "팔뚝 용, 파란색 잉크", "placeEn": "Forearm", "placeKo": "팔뚝"},
   ```
   `cat` is one of `dragon`, `snake`, `koi`, `animal`, `floral`, `pattern`, `character` or `more`, and sets which filter
   chip the photo shows under. `w`/`h` are the original pixel size (used for the aspect ratio).

"All" deals one photo per subject in turn (order set by `MIX_ORDER` in `script.js`); within each
subject, the photos in the `FEATURED` list come first.

## Guest spots and the announcement bar

Add confirmed trips to `GUEST_SPOTS` at the top of `script.js`:

```js
var GUEST_SPOTS = [
  { region: "AU", city: { en: "Melbourne", ko: "멜버른" }, start: "2026-11-03", end: "2026-11-15" },
];
```

`region` is `KR`, `AU`, `US`, `UK` or `EU`. That row of the Guest spots table then shows the
city and dates, and a bar across the top of both pages announces the soonest upcoming trip.
Entries hide themselves after their end date; with no entries the bar stays hidden.

## Booking form

The inquiry form posts to Formspree (`FORMSPREE_ENDPOINT` in `script.js`, currently
`https://formspree.io/f/mwlkpjyw`). Name, city and idea are required, plus an email or
Instagram handle to reply to. Submissions arrive by email from Formspree, with the reply-to
set to the visitor's email when they give one.
