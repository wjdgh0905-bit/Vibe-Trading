// PC 빌드가 켜질 때 바깥(구글 맞춤법 사전 등)으로 접속하지 않는지 확인 (Chromium net-log로 8초 기록)
// 실행: xvfb-run -a node test/offline.cjs dist/Ddeoksang-linux-x64/Ddeoksang
'use strict';
const { _electron } = require('playwright');
const fs = require('fs'), os = require('os'), path = require('path');
const exe = path.resolve(process.argv[2]);
(async () => {
  const ud = fs.mkdtempSync(path.join(os.tmpdir(), 'ddk-off-')), log = path.join(ud, 'net.json');
  const app = await _electron.launch({ executablePath: exe, args: ['--no-sandbox', '--user-data-dir=' + ud, '--lang=ko', '--log-net-log=' + log], timeout: 60000 });
  const p = await app.firstWindow(); await p.waitForLoadState('load'); await p.waitForTimeout(8000); await app.close();
  const s = fs.readFileSync(log, 'utf8');
  const hosts = [...new Set((s.match(/https?:\/\/[a-z0-9.-]+/gi) || []).map(u => u.toLowerCase()))].filter(h => !/^https?:\/\/(127\.0\.0\.1|localhost)$/.test(h));
  fs.rmSync(ud, { recursive: true, force: true });
  console.log(hosts.length ? 'FAIL outside hosts contacted at startup: ' + hosts.join(', ') : 'PASS no outside network requests at startup');
  process.exit(hosts.length ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
