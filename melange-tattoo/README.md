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
assets/work/      # gallery photos as WebP: <id>-480.webp and <id>-1080.webp
assets/gallery/   # original JPGs (source files, not loaded by the pages)
sitemap.xml       # every page (hreflang pairs where a Korean version exists), plus all gallery images
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

The Australian Tattoo Expo model call lives in five places:

- `melbourne/index.html` — the English-only page and application form (`model-form.js`)
- `index.html` and `ko/index.html` — the `#melbourne` section after Work, and the `#pop` popup
- `script.js` — the `note`/`link` on the Melbourne entry in `GUEST_SPOTS` (the table link)

All of them hide themselves after `data-until="2026-12-06"` (the table link after `noteUntil`),
counted in Melbourne time (`data-tz` / `noteTz` = `Australia/Melbourne`).

The popup opens every time the home page loads. Close / ✕ / Esc only close it for that visit;
"Don't show for 3 days" hides it for 3 days in that browser (localStorage key
`melange.pop.expo2026.later`). It isn't shown when the visitor arrives at `#book`, `#melbourne`
or a flash-design booking link, or clicks something / starts typing before it opens (scrolling
doesn't count).

**To close the call early** (e.g. once enough models have signed up): change every
`data-until="2026-12-06"` to yesterday's date in `index.html`, `ko/index.html` and
`melbourne/index.html`, and set `noteUntil` on the Melbourne entry in `script.js` to the same date.
The `/melbourne/` page then shows a "this call has closed" note instead of the form.

## Booking form

The inquiry form posts to Formspree (`FORMSPREE_ENDPOINT` in `script.js`, currently
`https://formspree.io/f/mwlkpjyw`). Name, city and idea are required, plus an email or
Instagram handle to reply to. Submissions arrive by email from Formspree, with the reply-to
set to the visitor's email when they give one.
