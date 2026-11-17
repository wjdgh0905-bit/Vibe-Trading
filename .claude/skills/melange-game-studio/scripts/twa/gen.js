// Android TWA project generator (Bubblewrap core library, no interactive CLI).
// Usage: node gen.js <config.json> <out-project-dir>
// config.json example (twa.config.json next to this file):
// { "manifestUrl": "http://localhost:8765/manifest.webmanifest",   // served locally: the container cannot reach github.io
//   "host": "melange-lab.github.io", "startUrl": "/", "packageId": "io.github.melangelab.mygame",
//   "name": "게임 이름", "launcherName": "짧은이름", "iconUrl": "http://localhost:8765/icon-512.png",
//   "maskableIconUrl": "http://localhost:8765/icon-512-maskable.png",
//   "versionCode": 1, "versionName": "1.0.0", "keystore": "keys/upload.keystore", "keyAlias": "upload" }
// Needs: npm i @bubblewrap/core@1.27.0 (see packaging-android.md for SDK/JDK/Gradle setup).
'use strict';
const fs = require('fs');
const path = require('path');
const { TwaManifest, TwaGenerator, ConsoleLog } = require('@bubblewrap/core');

(async () => {
  const [cfgPath, outDir] = process.argv.slice(2);
  if (!cfgPath || !outDir) { console.log('usage: node gen.js <config.json> <out-project-dir>'); process.exit(2); }
  const c = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  const res = await fetch(c.manifestUrl);
  if (!res.ok) throw new Error('manifest fetch ' + res.status + ' ' + c.manifestUrl);
  const m = TwaManifest.fromWebManifestJson(new URL(c.manifestUrl), await res.json());
  m.packageId = c.packageId;
  m.host = c.host;
  m.startUrl = c.startUrl || '/';
  if (c.name) m.name = c.name;
  if (c.launcherName) m.launcherName = c.launcherName;
  if (c.iconUrl) m.iconUrl = c.iconUrl;
  if (c.maskableIconUrl) m.maskableIconUrl = c.maskableIconUrl;
  m.appVersionCode = c.versionCode;
  m.appVersionName = c.versionName;
  m.signingKey = { path: path.resolve(c.keystore), alias: c.keyAlias || 'upload' };
  m.fallbackType = 'customtabs';
  m.orientation = c.orientation || 'portrait';
  m.minSdkVersion = Math.max(24, c.minSdkVersion || 24);   // androidbrowserhelper 2.7+ needs 24 (Android 7.0+)
  m.enableNotifications = false;                            // no notification nags (house rule: no dark patterns)
  const v = m.validate && m.validate();
  if (v) throw new Error('twa manifest invalid: ' + v);
  const generated = d => fs.existsSync(path.join(d, 'twa-manifest.json')) || (fs.existsSync(path.join(d, 'settings.gradle')) && fs.existsSync(path.join(d, 'app', 'build.gradle')));
  if (fs.existsSync(outDir) && fs.readdirSync(outDir).length && !generated(outDir))
    throw new Error(outDir + ' is not empty and is not a generated TWA project — pick an empty folder');
  fs.rmSync(outDir, { recursive: true, force: true });   // only an earlier generated project gets here
  await new TwaGenerator().createTwaProject(path.resolve(outDir), m, new ConsoleLog('twa'));
  fs.writeFileSync(path.join(outDir, 'twa-manifest.json'), JSON.stringify(m.toJson(), null, 2));   // marker: lets the next run replace this folder
  console.log('generated', outDir, m.packageId, m.appVersionName + ' (' + m.appVersionCode + ')');
})().catch(e => { console.error('ERR', e.message || e); process.exit(1); });
