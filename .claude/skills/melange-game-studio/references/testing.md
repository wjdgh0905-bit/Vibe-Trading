# Testing ladder

Run the rungs that match the change. A small text fix needs 1–2; a feature needs 1–4; a release needs all, once.
Chromium + Playwright are preinstalled in the cloud container (`require('playwright')`); use `xvfb-run -a` for Electron.

| # | Check | Command | Pass means |
|---|---|---|---|
| 1 | Build | `python3 $SK/scripts/build_game.py <game>` | 0 missing EN strings, EN values clean, 0 Hangul in EN, head files exist, JS parses |
| 2 | Web smoke | `node $SK/scripts/test_web.cjs <game>` | KO+EN at 390×844 and 1280×800: no page errors/404s, a round starts and pagehide settles it exactly once (`s.rounds` +1), no 3+-decimal / NaN text, no sideways scroll, nav visible at 1280×800 |
| 3 | Autoplay fuzz | per game in `<game>/test/`: copy the static-server + `?selftest` setup from `test_web.cjs`, drive `__t` for 1 000+ rounds with varied choices | stuck 0, errors 0, money never NaN/negative unless allowed |
| 4 | Rules + scenarios | per game in `<game>/test/`: fixed rewards pay exactly the shown table, save migration from the previous release, storage blocked, bad backup code keeps progress, multi-tab | each prints its expected outcome |
| 5 | Platform | PC: `steam/test/smoke.cjs` + `steam/test/wording.cjs`; Android: install the test APK | saves kept, settle once, no wrong-platform wording |
| 6 | Visual | screenshots of every tab KO/EN at 360, 390, 1280 | nothing clipped/overflowing; read them yourself |

Rules that made the tests trustworthy:
- **Negative control:** after a new check passes, run it once against the old build — it must fail, or it is not testing anything.
- Test the built files (`index.html`, `en/index.html`), not the source.
- Run heavy suites sequentially with `nice -n 10`, one browser at a time; close every browser and server you start (kill by PID).
- Keep test scripts in the repo next to the game (`<game>/test/`), never only in scratch. Screenshots go to a temp folder (default `<tmp>/game_shots`), never into the repo.
- When a test needs app mode (TWA), emulate it in-page (override `matchMedia('(display-mode: standalone)')`) — CDP display-mode emulation is ignored.

## Debug / red-team pass (big releases)
**Red-team only local copies** — built files on a local http.server, the local Linux Electron build, a local APK. Never probe, fuzz or load-test the live site, CrazyGames, store pages or other services.

Use a multi-agent workflow when the owner asks for "디버깅 확실하게" or before a store launch:
1. **Find** — parallel finders by lens: app/platform environment, low-severity robustness (storage, clock jumps, kill/reload), devices & UI (sizes, fonts, overflow, EN length), state & logic (economy rules, resets).
2. **Verify** — every finding is reproduced by a script; drop what does not reproduce.
3. **Fix** — one fixer applies all confirmed fixes through one patch script with backups; economy-changing fixes go to the owner first.
4. **Final** — full ladder once + the old red-team repros.
Report: total found / confirmed / fixed, the owner questions, and the test results.

## Number and wording scans
- Decimal scan: open every tab/sheet/modal in KO and EN; regex `\d\.\d{3,}|NaN|undefined|Infinity|\[object` on `innerText` must find nothing.
- Wording scan per platform: e.g. Steam PC forbids 광고/ads, 브라우저/browser, 폰/phone, 홈 화면/home screen, AdSense, CrazyGames, cookies, web URLs (see house-rules.md §7).
