---
name: melange-game-studio
description: "Playbook for melange's HTML5 web GAMES: single-file games written in Korean with an English build, deployed to GitHub Pages, packaged for Google Play (TWA) and Steam (Electron), under strict virtual-money, no-gambling-look, no-dark-pattern rules. Use whenever the owner asks to start a new game of any genre (새 게임, 다른 장르), add or change a game feature, fix/debug/QA/red-team a game (버그, 디버깅), translate or polish the English version (영어판), release or deploy a game version (배포, 출시), package for Google Play or Steam (플레이스토어, 스팀, aab, exe), or check game ads, store rules or age ratings (광고, 심의, 등급) — including any follow-up on 떡상 계좌 키우기 (Stonks Tycoon), even if the skill is not named. Do NOT use for the MELANGE operator/booking app (use melange-app-debug-review), the tattoo homepage, or the Vibe-Trading trading-agent code."
---

# melange game studio

The playbook distilled from shipping **떡상 계좌 키우기** (web + Android TWA + Steam PC). It is genre-neutral: use the same rules, build, tests and release steps for the next game.

**The repo's `CLAUDE.md` (협업 지침) is the owner's standing instruction and wins over this skill** wherever they differ.

All `scripts/` and `assets/` paths below live inside this skill folder. From the repo root use the full path, e.g.
`SK=.claude/skills/melange-game-studio` → `python3 $SK/scripts/build_game.py <game-dir>`.

| Task | Read |
|---|---|
| Any change players will see (texts, rewards, economy, monetization) | `references/house-rules.md` |
| New game, or touching saves / loop / layout / flags | `references/architecture.md` + `assets/starter.html` |
| Building KO/EN, adding strings | "Build and i18n" below |
| Testing, debugging, QA, red-team | `references/testing.md` |
| PR, deploy, Notion log, second game on the same site | `references/deploy.md` |
| Android / Google Play | `references/packaging-android.md` |
| Steam / PC | `references/packaging-steam.md` |
| Ads, store rules, ratings, market questions | `references/store-policies.md` |

## How to work with the owner
The owner is not a coder and reads on an iPhone.
- **Replies:** Korean, conclusion first, short; plain words instead of jargon; the owner's to-dos as numbered steps; after a change say what changed in ≤3 lines plus the version number.
- **Choices:** 2–3 options with one marked **(추천)**, so "추천대로" is a full answer. Mark anything unverified **RECHECK** — never guess.
- **Before starting:** read the Notion hub page 작업 현황 and the game's project page. **After finishing:** add one row to the 작업 로그 database (작업, 날짜, 누가, 프로젝트, 버전, 상태, 변경 파일, 결정 사항, 다음 할 일, 링크) and update the project page.
- **Approval needed first:**
  - Economy numbers, prices and player-facing guide text (안내문 문구): show before→after and wait for OK.
  - Anything irreversible: package name, bundle ID, signing key, store name.
  - Spending paid credits.
  - **Push, merge or deploy:** show a preview or test result and wait for "푸시해".
- **Code changes:** state the cause in one line before fixing (no guessing); make the minimal change; no unrequested features or refactors; keep the existing screen design; iPhone first.
- **Size and order:** one big job at a time. Tell the owner before a job over ~1 hour or a second round-trip on the same problem. Small fixes: core tests once, at most one verify and one fix round.
- **Art:** never call Higgsfield (or other paid) generation tools — the owner supplies art. Use emoji/CSS placeholders until files arrive.
- **Privacy:** never put the owner's email, customers' names or contacts, Notion IDs, keys or passwords into code, commits, public repos or outside services.

## House rules (summary — details and word lists in `references/house-rules.md`)
1. Virtual money only; target PEGI-12. Nothing in risk mechanics can be bought with or cashed out to real money.
2. No gambling look or wording (no casino visuals, slot/jackpot/bet words). No loot boxes and **no random reveals of any reward** — every reward is fixed and shown before claiming. No near-miss tricks.
3. No dark patterns: no fake timers, guilt or FOMO nags, forced ads, or badges that pull players back. Rewarded ads only on the player's tap, never mid-round.
4. Risky choices (leverage, max-buy, loans) are never made tempting: calm wording, visible downside, reset to safe defaults after a fresh start.
5. Every number on screen shows at most 2 decimals.
6. Old saves always load without loss (migrate, never wipe).
7. Platform wording matches the platform (no 광고/browser/phone wording on Steam PC, no web URLs in a paid build).

## New game in 6 steps
1. **Pitch** — one paragraph, the core loop, session length (1–3 min), and the reward table.
   - Check it against the house rules (a timing game must not look like a casino "crash" game).
   - Send it as options with a (추천) pick and start coding after OK. In a test build, label the numbers 제안.
2. **Scaffold** in `<repo>/<slug>/`:
   - `assets/starter.html` → `src/<slug>.html`. Rename `<title>`, the save key prefix `KP` and `BUILD`.
   - `assets/head_ko.html`, `assets/head_en.html` → `src/`. Fill in the titles and OG URLs.
   - `assets/starter_en/out0.json` → `src/en/`. It holds the shared shell strings (settings, backup, privacy). Put the game's own strings in `out1.json`, and delete out0 entries the game no longer uses.
   - `assets/manifest.webmanifest` and `assets/sw.js` → the game folder. Set the name, and set `SLUG` in sw.js.
   - Icons: put the owner's 512×512 art at `icon-512.png`, then run `python3 $SK/scripts/make_icons.py <slug>/icon-512.png` (makes icon-192, apple-touch-icon and the maskable icon).
   - The starter already has:
     - saves: storage with memory fallback, save versioning, backup code export/import with validation;
     - platform: `LANG`/`ASSET` constants, flags `ON_PC`/`onCG`/`APP_MODE`, the PC quit button;
     - stability: crash-proof frame loop, pagehide settle-once, Escape and Android Back that close the top layer;
     - display and tests: ≤2-decimal formatting, `?selftest` hooks (`window.__t` with `s.state`/`s.rounds`), the `BUILD` tag.
3. **Build** — `python3 $SK/scripts/build_game.py <slug>` → `index.html` (KO) + `en/index.html` (EN). It stops when a Korean string has no English entry and lists them in `src/en/_todo.json`.
4. **Test** — `node $SK/scripts/test_web.cjs <slug>`. It checks:
   - KO+EN at 390×844 and 1280×800;
   - no page errors or missing files;
   - a round really starts, stops and settles once on pagehide;
   - no bad numbers;
   - the nav is visible at 1280×800.
   Then run the rest of the ladder in `references/testing.md`.
5. **Ship web** — preview → "푸시해" → PR with the reviewer window → merge → copy to the Pages repo with a cache-version bump (`references/deploy.md`).
6. **Package** — Android TWA (`scripts/twa/`) and/or Steam (`scripts/steam/`, only `package.json` changes per game).

## Build and i18n (how KO → EN works)
- The source is one Korean file starting at `<title>`. Korean comments are fine; the build strips them. The deploy `<head>` lives in `src/head_ko.html` / `src/head_en.html`.
- **KO build** = KO head + source with Korean comments stripped + a service-worker tail (http/https only, never on CrazyGames).
- **EN build:**
  1. Every Korean fragment between `' " \` < > \n ${ }` is replaced through `src/en/out*.json` (later files win).
  2. `LANG='en'`, `ASSET='../'`, `'ko-KR'`→`'en-US'`.
  3. Relative `src`/`href` in markup move one folder up, then `src/en/swaps.json` is applied (e.g. market colors: KO red-up/blue-down → EN green-up/red-down).
- Write UI strings as **whole quoted fragments**, keep numbers outside them, and give each feature batch its own map file.
- The Korean half of an inline alternative (`LANG==='en'?'Stonks':'떡상'`) and one-character unit suffixes (`'점'`, `'초'`) still need a map entry. Map them to anything; that branch never runs in EN.
- EN values must not contain `' " \` < >` or `${` — use ’ “ ” instead (the build checks this).
- Platform text: two complete strings behind the flag (`ON_PC?'이 PC에만 저장돼요':'이 기기 브라우저에만 저장돼요'`).
- **떡상 계좌 키우기 (`game/`) has its own older build:** `bash game/tools/build.sh` (KO head = first 22 lines of `game/index.html`, EN via `game/i18n/build.py`). Never run `build_game.py` on `game/`.

## Lessons that cost real time
- **The cloud container's scratch folder can be wiped.** Keep every build script, test and template in the repo. Signing keys go to the owner as a zip and never into public repos.
- Large files (>~1 MB) sent through chat file delivery arrive truncated. For builds up to 100 MB, push a `.7z` to a temporary branch, give the raw link, and delete the branch after testing.
- Never `pkill -f` a pattern that also matches your own command; kill by PID (`cmd & PID=$!; …; kill $PID`).
- `rm -rf` with variables or relative globs is blocked by the safety check — use literal absolute paths.
- **Red-team only local copies** (local http.server, local Electron build, local APK) — never probe the live site, CrazyGames or store pages.
- github.io, store.steampowered.com, steamdb and several policy sites are unreachable from the container. Verify live pages through the owner, or cite WebSearch and mark RECHECK.
- GitHub Actions in the game repo is not running (last run 2026-10-21). Do not rely on CI — run tests locally and say so in the PR.
- When a check passes, also run it once against a deliberately broken build (negative control). Two of this skill's own tests passed vacuously until that was done.
