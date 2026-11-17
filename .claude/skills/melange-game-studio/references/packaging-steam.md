# Steam / PC — Electron packaging

The web build runs in an Electron window served over a custom `app://game/` scheme. Because the protocol is `app:`, the game's `ON_PC` flag turns on:
- monetization is off;
- PC wording is used;
- the service worker cannot register;
- CrazyGames detection stays off.

## Set up for a game
1. Copy `scripts/steam/` to `<repo>/steam/` (main.js, build.sh, patch_exe.js, package.json, test/).
2. Edit only `package.json`. Prerequisites: python3 + Pillow, zip, xvfb-run (7z optional), and `<gameDir>/icon-512.png`.
   - `productName` (ASCII, used for the exe and folders)
   - `titles.ko` / `titles.en` (window titles)
   - `gameDir` (relative path to the web build)
   - `gameFiles` (what to ship: `index.html`, `en/index.html`, asset folders, icons)
   - `version`
   - `test`:
     - `presetStorage`: localStorage keys to skip tutorials;
     - `roundCounter`: the field in `__t.s` that counts finished rounds (default `rounds`);
     - `runningStates`: the `s.state` values that mean a round is in play;
     - `keyPrefix`: the game's `KP`;
     - `extraTabs`: tabs not reachable through `[data-tab]`.
3. First time: `npm install` (creates `package-lock.json` — commit it); later `npm ci`. `build.sh` does this for you. If the Electron binary is missing, run `node node_modules/electron/install.js` with `ELECTRON_GET_USE_PROXY=1 GLOBAL_AGENT_HTTPS_PROXY=$HTTPS_PROXY`.
4. `bash build.sh` → `dist/<Name>-win32-x64` (+ `.zip`, `.7z`), `dist/<Name>-linux-x64` (+ `.tar.gz`).
   - Windows icon and version info are written with resedit, so no wine is needed.
5. Test the Linux build:
   - `xvfb-run -a node test/smoke.cjs dist/<Name>-linux-x64/<Name>`
   - `xvfb-run -a node test/wording.cjs dist/<Name>-linux-x64/<Name>`

## What main.js does
- Starts in the OS language, `Ctrl+Shift+L` switches it (remembered), `--lang=ko|en` forces it.
- Remembers window size and fullscreen. `F11`/`Alt+Enter` toggle fullscreen, `Ctrl +/-/0` zoom, and `F5`/`Ctrl+R` are blocked.
- Single instance. Blocks navigation outside the game, opens https links in the default browser, allows only clipboard-write and fullscreen permissions, and flushes storage on close.
- Saves are the web build's localStorage in `%APPDATA%\<Name>\Local Storage\` (Windows) and `~/.config/<Name>/` (Linux).

## Game-side requirements for Steam
- No ads, no rewarded ads, no donation or external store links, no "play free on the web" links. Valve bans ad-based monetization and rewards for watching ads.
- PC wording via `ON_PC` (see house-rules.md §7); share copies the result text only.
- Keyboard play (Space/Enter/Escape), and readable at 1280×800 (Steam Deck). Gamepad support is a plus for Deck Verified.
- An in-game way to quit is expected on PC (a Settings button that calls `window.close()`).

## Delivering a test build to the owner
- Chat file delivery truncates big files. Make the `.7z` (~96 MB for Electron 45), push it alone on a temporary orphan branch (`pc-test-build`, amend + force-push for updates), and send the raw link `https://github.com/<owner>/<repo>/raw/pc-test-build/<file>.7z`.
- Delete the branch after testing.
- Windows SmartScreen warns on unsigned exes: "추가 정보 → 실행". Steam builds do not need code signing.

## Steamworks (owner steps, ~1 month)
1. Steamworks partner account, $100 app fee (recouped after $1,000 revenue), bank, tax and identity paperwork (15–30 days).
2. App fee paid → 30-day wait before release. Store page public as "Coming Soon" ≥ 2 weeks. Build and store review takes 1–5 days.
3. Store page English-first + Korean. EN is the main Steam language: do a native-quality EN pass, not just map completeness, check EN text length at 1280×800, and make EN screenshots and capsules. Capsules, screenshots (1920×1080), short description, tags, content survey (simulated gambling? answer honestly), price.
4. After the App ID:
   - Add steamworks.js for achievements, Steam language and cloud saves.
   - SteamPipe depot = `dist/<Name>-win32-x64`, launch `<Name>.exe`.
