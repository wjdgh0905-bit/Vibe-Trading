# 떡상 계좌 키우기 — source (for code review)

- `sanghanga.html` — the readable game source (Korean comments). **This is what to review.**
- `en/out*.json` — Korean → English string maps used to build the English page.
- `../index.html` (KO) and `../en/index.html` (EN) are **build outputs**: the source with comments stripped, a deploy head added, and (for EN) every Korean string replaced through the maps. Do not edit them by hand.

## Run it locally
```
cd game && python3 -m http.server 8000
# open http://localhost:8000/            (KO)
#      http://localhost:8000/en/         (EN)
# add ?selftest to the URL for test hooks (window.__t)
```

## House rules the code follows
Virtual money only (PEGI-12). No gambling look or wording, no loot boxes, no dark patterns.
Leverage / 영끌 / loans are never made more tempting. Every number on screen shows at most 2 decimals.
Economy numbers change only with the owner's approval.
