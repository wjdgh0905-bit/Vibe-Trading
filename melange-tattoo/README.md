# Melange Tattoo — melangetattoo.ink

Static site, no build step. Netlify publishes this folder as-is.

```
index.html        # English page  (/)
404.html          # shown for any address that doesn't exist
ko/index.html     # Korean page   (/ko/)
melbourne/        # Australian Tattoo Expo model call (English only), form in model-form.js;
                  # the page's form and the home-page callout hide themselves after data-until
styles.css        # shared styles — cobalt "blue ink on paper"
gallery.js        # gallery data (subject, placement and alt text per photo)
script.js         # behaviour: gallery filters/lightbox, booking form, guest spots, motion
assets/work/      # gallery photos as WebP: <id>-480.webp, <id>-720.webp and <id>-1080.webp
assets/gallery/   # original JPGs (source files, not loaded by the pages)
assets/og/        # share images (1200×630) shown when a page link is posted; one per page and language
sitemap.xml       # every page (hreflang pairs where a Korean version exists), plus all gallery images
```

## Editing copy

Each page's text is written directly in its HTML file: English in `index.html`,
Korean in `ko/index.html`. When you change one, change the other so they stay in step.

## Adding a gallery photo

1. Export three WebP files into `assets/work/`: `<id>-480.webp`, `<id>-720.webp` and
   `<id>-1080.webp` (480, 720 and 1080px wide). Example with cwebp:
   `cwebp -q 76 -resize 1080 0 photo.jpg -o assets/work/custom-121-1080.webp`
2. Add a line at the top of the list in `gallery.js`:
   ```js
   {"id": "custom-121", "cat": "dragon", "w": 1600, "h": 2000, "en": "Blue dragon in waves, forearm tattoo by Melange", "ko": "파도 속 푸른 용, 팔뚝 타투 · 멜란지", "placeEn": "Forearm", "placeKo": "팔뚝", "nameEn": "Dragon in waves", "nameKo": "파도 속 용"},
   ```
   `cat` is one of `dragon`, `snake`, `koi`, `animal`, `floral`, `pattern`, `character` or `more`, and sets which filter
   chip the photo shows under. `w`/`h` are the original pixel size (used for the aspect ratio). `en`/`ko` are the
   alt text; `nameEn`/`nameKo` are the short subject on the card and in the photo viewer (which also offers
   "Ask about something in this style", starting the booking form with that piece's name and id).

To replace a photo, give the new file a new id (e.g. `custom-073b`): files under `assets/` are
cached by browsers for a year, so reusing a name can keep showing the old photo.

The gallery order and the six hero slideshow photos are shuffled on every visit. "All" deals one
photo per subject in turn (order set by `MIX_ORDER` in `script.js`).

## Guest spots and the announcement bar

Add confirmed trips to `GUEST_SPOTS` at the top of `script.js`:

```js
var GUEST_SPOTS = [
  { region: "AU", where: { en: "Melbourne", ko: "멜버른" },
    cities: { en: "Melbourne", ko: "멜버른" },
    when: { en: "Dec 1 – 9", ko: "12월 1일 ~ 9일" }, start: "2026-12-01", end: "2026-12-09" },
];
```

`region` is `KR`, `AU`, `US`, `UK` or `EU`. That row of the Guest spots table shows `cities` and
`when`, and scheduled rows move to the top **in the order they're written** — put the trip you want
first at the top of the list. The bar across the top of both pages and the booking form's location
list follow the same order. `when` is shown exactly as written, so use months ("Oct – early Nov")
when exact dates aren't fixed; an entry hides itself once `end` has passed. To take a trip down
early (for example when it's fully booked), delete its entry. With no entries the bar stays hidden.

## Melbourne expo model call (until Dec 6, 2026)

The Australian Tattoo Expo model call lives in these places:

- `melbourne/index.html` — the English-only page and application form (`model-form.js`)
- `index.html` and `ko/index.html` — the `#melbourne` section after Work, the `#pop` popup (desktop)
  and the `#pnote` bar (phones and tablets, ≤960px)
- `script.js` — the `note`/`link` on the Melbourne entry in `GUEST_SPOTS` (the table link)
- the "Melbourne" / "멜버른" link in the top nav of the flash, aftercare and privacy pages (EN and KO)
  and of `/melbourne/` itself, plus the page's "Apply as a model" button

All of them hide themselves after `data-until="2026-12-06"` (the table link after `noteUntil`),
counted in Melbourne time (`data-tz` / `noteTz` = `Australia/Melbourne`).

On screens wider than 960px a popup opens every time the home page loads; on phones and tablets
a small bar sits above the bottom booking bar instead (it follows the scroll and doesn't cover the
page; it steps aside while the expo section itself is on screen, and turns into one compact row
on short landscape screens). Close / ✕ / Esc only close them for that visit;
"Don't show for 3 days" hides it for 3 days in that browser (localStorage key
`melange.pop.expo2026.later`, shared by both). The desktop popup isn't shown when the visitor
arrives at `#book`, `#melbourne` or a flash-design booking link, or clicks something / starts
typing before it opens (scrolling doesn't count).

**To close the call early** (e.g. once enough models have signed up): change every
`data-until="2026-12-06"` to yesterday's date in `index.html`, `ko/index.html`,
`melbourne/index.html` and the six flash/aftercare/privacy pages, and set `noteUntil` on the
Melbourne entry in `script.js` to the same date.
The `/melbourne/` page then shows a "this call has closed" note instead of the form.

## Share images

Each page names its own share image (`og:image`, with its size and alt text) in `assets/og/`:
`home-en`/`home-ko` (also used by the privacy pages), `melbourne`, `flash-en`/`flash-ko` and
`aftercare-en`/`aftercare-ko`. They're 1200×630 JPGs. Files under `assets/` are cached for a year,
so a changed card needs a new file name (e.g. `melbourne-2.jpg`) and the page's meta tags updated.

## Tracking

Every page loads the Google tag (Analytics measurement ID `G-WC2TXY1EGH`) right after `<head>`,
and the Meta Pixel (`957190954111173`). A sent booking or model form also records a
`generate_lead` event in Analytics and a `Lead` event in Meta.

## Booking form

The inquiry form posts to Formspree (`FORMSPREE_ENDPOINT` in `script.js`, currently
`https://formspree.io/f/mwlkpjyw`). Name, city and idea are required, plus an email or
Instagram handle to reply to. Submissions arrive by email from Formspree, with the reply-to
set to the visitor's email when they give one.
