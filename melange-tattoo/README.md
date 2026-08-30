# MELANGE TATTOO — site

Single-page portfolio site for Melange (solo international guest tattoo artist).
Plain HTML/CSS/JS, no build step. Deploy by serving this folder as-is (GitHub
Pages, Netlify, any static host).

## Local preview

```
cd melange-tattoo
python3 -m http.server 8000
```

Open http://localhost:8000 — the gallery and guest-spot sections load their
data via `fetch`, so they need to be served over http(s), not opened directly
as a `file://` URL.

## Adding a new work photo to the gallery

Edit `content/gallery.json`. Each entry:

```json
{ "id": "work-10", "motif": "Koi", "placement": "Forearm", "image": "images/work/work-10.jpg", "placeholder": true }
```

1. Drop the photo file into `images/work/`.
2. Set `"image"` to that file's path.
3. Set `"placement"` (e.g. `"Forearm"`, `"Calf"`) — optional, shown in the caption.
4. Set `"motif"` to one of the existing tags (Dragon, Snake, Phoenix, Koi,
   Whale, Flowers, Clouds, Lightning, Patterns) or a new one — new motifs get
   their own filter button automatically.
5. Set `"placeholder": false`.

Until a real photo is added, leave `"placeholder": true` and the card shows a
labeled "photo coming soon" placeholder instead of a broken image. Never use
AI-generated tattoo images or another artist's work here.

## Updating guest spots / upcoming cities

Edit `content/guest-spots.json`:

```json
{
  "regions": ["South Korea", "Australia", "United States", "United Kingdom", "Europe"],
  "spots": [
    { "city": "Seoul", "country": "South Korea", "dateRange": "Oct 12–19, 2026", "status": "Booking Open" }
  ]
}
```

- `regions` is the general list of countries Melange works in — only change
  this if that changes.
- `spots` is the list of confirmed, dated guest spots. Leave it as `[]` when
  nothing is confirmed yet — the site shows an Instagram follow prompt
  instead of an empty section.
- Do not put a full studio address here. The exact studio address for a
  confirmed city is sent privately to booked clients only.

## Editing copy

All section copy lives directly in `index.html`. It was fact-checked against
the brand brief (no invented address, pricing, experience claims, press, or
city/date bookings) — keep any future edits within that constraint.
