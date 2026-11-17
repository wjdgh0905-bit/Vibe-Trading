# Architecture — patterns that kept the games stable

`assets/starter.html` implements the core patterns (storage fallback, save versioning, platform flags, crash-proof loop, overlays + Android Back, backup code, settle-once, selftest, PC quit, SW cache warm-up). Add the audio guard, multi-tab listener and 만/억/조 money units yourself when the game needs them. 떡상 계좌 키우기 (~980 KB in one file) uses all of them.

## Files
```
<repo>/<game>/
  src/<slug>.html        Korean source (starts at <title>; Korean comments allowed — stripped in builds)
  src/head_ko.html       deploy head (meta, manifest, icons, OG) ending with </head><body>
  src/head_en.html       same for EN (paths one folder up, English meta, no Korean)
  src/en/out*.json       KO→EN maps, one file per feature batch; src/en/swaps.json for EN-only code swaps
  index.html, en/index.html   build outputs — never edit by hand
  ui/ brand/ chars/ fonts/    assets (webp icons, title art, self-hosted fonts)
  sw.js, manifest.webmanifest, icon-192.png, icon-512.png, icon-512-maskable.png
```
For the original game the equivalents are `game/src/sanghanga.html` and `game/tools/build.sh` (its head comes from the first 22 lines of the deployed `index.html`).

## Constants and flags
- `const LANG='ko'` and `const ASSET=''` appear exactly once; the EN build rewrites them (`'en'`, `'../'`). Build image URLs as `ASSET+'ui/x.webp'`.
- Platform flags, computed once at boot:
  - `ON_PC = location.protocol==='app:'` (Electron/Steam), forces ads/donate/IAP off.
  - `onCG` (CrazyGames host; `?cg` test switch only on localhost).
  - `APP_MODE` (Android TWA: `document.referrer` starts with `android-app:` or display-mode standalone).
- `CFG={adClient:'',donateUrl:'',iap:false}` — monetization is off until the owner turns it on for a platform.
- `BUILD='vX.Y.Z · bYYMMDDx · '+LANG+'-'+platform` shown at the bottom of Settings; tests assert the suffix (`-web`, `-cg`, `-app`, `-itch`, `-pc`).

## Saves
- Wrap storage: `store.get/set` with JSON + key prefix per game. On `localStorage` errors switch to a memory store, warn once, and point to the backup code.
- Version the save (`v`) and migrate step by step; never drop unknown keys. Keep a test save from every release and load it in tests.
- Backup code = base64 JSON export; import validates then replaces atomically (on failure: toast "지금 기록은 그대로예요").
- Multi-tab: listen to the `storage` event if two tabs could double-spend; settle a running round only once.

## Loop and lifecycle
- `requestAnimationFrame(frame)` where `frame` wraps the real work in `try{...}finally{requestAnimationFrame(frame)}` and logs only the first error — one bad frame must never freeze the game.
- Wrap audio (WebAudio beeps, BGM ticks) in try/catch with an error counter that mutes after 3 errors; unlock audio on the first user gesture.
- `pagehide` + `visibilitychange(hidden)` → settle a running round exactly once at the current value (players will close the window or switch apps mid-round).
- Background/minimize = same as hidden. Never award or charge twice on resume (test: close mid-round → relaunch → counter +1).

## UI
- Tokens on `:root` (colors, surfaces, radii, type scale); new screens use only tokens.
- Layout: phone portrait first (360–430 px), desktop/tablet landscape layout from 700 px wide.
- Minimum text 12 px at 390 wide; tap targets ≥ 44 px; no horizontal scroll at 320–1280 px.
- Overlays: one sheet (bottom), one modal, toasts. Escape closes the top layer (and stops propagation). In `APP_MODE` keep one history entry while a layer is open so Android Back closes the layer instead of the app.
- Keyboard: Space = main action (skip it when a button inside the board has focus), Escape = close. Show the shortcut on the title screen. Space/Enter/Escape + mouse must cover everything (Steam Deck).
- Emoji in UI may be swapped to webp icons via a map (`📈`→`ui/chart_up.webp`) with the emoji as fallback (`data-e`).

## Text
- Whole-sentence string literals, numbers formatted outside; platform branches as two full strings.
- Money: KO 원 with 만/억/조 units, EN $ with K/M/B/T; ≤2 decimals everywhere (`fmt()`).
- Korean comments explain *why*; keep them — the build strips them.

## Test hooks
`?selftest` exposes `window.__t` with at least: `tab(name)`, `start()`, `stop()`, getter `s` with **`s.state`** (e.g. ready/running) and **`s.rounds`** (finished rounds — the shared test scripts rely on these two names), plus setters needed by tests. Nav buttons carry `data-tab`. Never ship gameplay that depends on `__t`.
