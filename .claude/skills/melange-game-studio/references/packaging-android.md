# Android (Google Play) — TWA packaging

A Trusted Web Activity is the live website in a full-screen Chrome shell. One web deploy updates the app; a new AAB is needed only for app-shell changes (icon, name, version, target SDK).

## One-time setup (cloud container)
- Package name: `io.github.melangelab.<game>` — **irreversible: confirm with the owner first** (CLAUDE.md); it can never change after upload.
- Android SDK: `cmdline-tools` → `platforms;android-36`, `build-tools;36.0.0`. Accepting SDK licenses needs the **owner's explicit consent** first. `dl.google.com` must be on the environment's network allowlist.
- JDK 17–21 and Gradle 8.x (e.g. `/opt/gradle`). AGP from the generated project.
- Upload key (**irreversible — confirm with the owner first**): `keytool -genkeypair -v -keystore keys/upload.keystore -alias upload -keyalg RSA -keysize 2048 -validity 10000`.
  - Save the password in `keys/upload_password.txt`.
  - Zip the keys folder and send it to the owner. Never commit it.
  - The container's scratch can be wiped, so the owner's copy is the backup.
- Work folder: `scripts/twa/` (`gen.js`, `build.sh`, `twa.config.json`) copied to a private location with `keys/`.

## Build
1. Serve the game folder locally (`python3 -m http.server 8765`) — the container cannot reach github.io, so `twa.config.json` points `manifestUrl`, `iconUrl` and `maskableIconUrl` at localhost while `host` stays the real domain.
2. `bash build.sh <versionCode> <versionName>` → `out/<slug>-<ver>-upload.aab` (Play) and `out/<slug>-<ver>-test.apk` (sideload).
3. `versionCode` must increase on every upload.

## Requirements learned
- minSdk 24 (androidbrowserhelper 2.7+), targetSdk 36 (Play requires API 36 for new apps since 31 Aug 2026).
- Web manifest needs `"id":"./"` and a **maskable** icon (`icon-512-maskable.png`): the art scaled into the central ~80% on the background color. Without it Android shows the square icon in a white circle.
- **Digital Asset Links:** `https://<host>/.well-known/assetlinks.json` with `handle_all_urls`, the package name and SHA-256 fingerprints. Without it the app shows a browser URL bar.
  - Include the **upload key** (for the test APK) **and the Play App Signing key** from Play Console → App integrity. Play-installed apps are re-signed by Google.
- In-app behaviour: Android Back must close the open sheet/modal/page first (`APP_MODE` history guard); request `navigator.storage.persist()`; no notification permission, no app-icon badges.

## Play Console checklist (owner)
- Developer account ($25). Personal accounts: closed test with **12 testers for 14 days** before production.
- Privacy policy URL: Claude drafts it with a placeholder `[연락처 — 오너가 직접 입력]`; the owner types the contact details into the page and Play Console (never write the owner's email into files, pages, commits or forms), Data safety form ("no data collected" if true), content rating questionnaire (IARC), target audience (not designed for children), ads declaration.
- Store listing: 512×512 icon (32-bit PNG), 1024×500 feature graphic, phone screenshots, short/full description KO+EN.
