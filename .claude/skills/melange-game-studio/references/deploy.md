# Deploy flow

Repos (owner's GitHub):
- **Vibe-Trading** — source of truth: `game/src/` (source, maps), `game/index.html` + `game/en/index.html` (build outputs), `steam/` (PC wrapper), `.claude/skills/` (this skill).
- **melange-lab.github.io** — the live site (GitHub Pages, has `.nojekyll` so `.well-known/` is served). 떡상: KO at `/`, EN at `/en/`, `sw.js`, manifest, icons, `.well-known/assetlinks.json`.
- Merging Vibe-Trading `main` does **not** update the live site (the `game-pages.yml` note in game/README is stale; Actions is not running). If the Pages repo is not in the session, attach `melange-lab/melange-lab.github.io` with add_repo (push access) and push there.

## Release steps
Ship each finished piece on its own (don't batch unrelated work). **Steps 4–5 need the owner's "푸시해"** after a preview (what changed in ≤3 lines, version, test results).
1. Bump `BUILD` in the source (`vX.Y.Z · bYYMMDDx`), rebuild KO+EN, run the testing ladder.
2. Vibe-Trading: `git checkout -B game/vX.Y.Z origin/main`, copy outputs + readable source + new maps + updated README (+ static changes), commit, push the branch.
3. Open the PR as draft, then mark ready, subscribe to its activity and schedule a check in 60 minutes.
   - **Reviewer window:** another AI reviewer ("Pickle") gets up to 1 hour. Merge after its OK, or after 1 hour with no comments.
   - Fix only real issues it raises, each verified by a test.
4. Squash-merge with `expectedHeadSha`.
5. melange-lab.github.io: copy `index.html`, `en/index.html`, `sw.js` (bump the number in the cache name and keep the game's prefix, e.g. `sanghanga-v65` → `sanghanga-v66`) and any static files; commit; push `main`.
   - The container cannot open github.io to check the live site; ask the owner or rely on the push succeeding.
6. Notion: one row in 작업 로그 + update the project page. Tell the owner in a short Korean summary.

## Service worker
- Bump the cache name on every release that changes cached files; precache the first-screen assets (fonts, title art, tab icons) best-effort per URL so one miss never fails install.
- Let the page post `performance.getEntriesByType('resource')` URLs to the SW after load and on `controllerchange` so the new cache is warm for offline play.
- Never register the SW in CrazyGames or PC builds (wrong origin; the PC `app://` scheme rejects it anyway).

## Commit and PR text
- Commit trailer and PR footer: use the attribution lines the session's system instructions give. Never write model names or model IDs anywhere else (code, comments, PR titles/bodies, READMEs).
- PR body: what changed (by finding id), tests run with results, what is NOT in the PR (owner decisions pending).
- Never commit signing keys, passwords, the owner's email or Notion IDs to the public repos.

## Second game on the same site
- Put it in its own folder: `/<slug>/` (+ `/<slug>/en/`), with manifest `id`/`start_url`/`scope` = `./` inside that folder.
- Use its own `sw.js` from `assets/sw.js` with `SLUG='<slug>'`. Its scope is `/<slug>/` and it only deletes `<slug>-` caches.
- Before the second game ships, patch 떡상's root `sw.js`:
  - activate deletes only `sanghanga-` caches;
  - fetch ignores requests under `/<slug>/`.
  Otherwise its activate step deletes every other cache, and its root scope serves the 떡상 page offline.
- Use a unique save key prefix (`KP`), so localStorage on the shared origin never collides.

## Scheduled check-ins
For long jobs, a recurring progress report (every ~3 h) may be scheduled; turn it off when all tracked work is done. Short-lived one-shot reminders are used for the PR reviewer window.
