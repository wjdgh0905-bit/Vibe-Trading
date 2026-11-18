// v3.1.6 테스트: 배수(x1.85) 표시 대신 수익률(+85%) · '가상 머니 · 투자 조언 아님' 안내 (KO·EN, 360×800)
// 사용: node game/test/v316.cjs <game-dir>
'use strict';
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(process.argv[2] || 'game');
const srv = http.createServer((q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.normalize(path.join(root, p));
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'content-type': { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2' }[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(r);
});
const MULT = /(^|[\s(·])x\d+\.\d{2}\b/m;   // 판 결과 배수 'x1.85' (예전 한국어 기록 목록) · 경험치 보너스 '×1.1'·레버리지 '10배'는 제외
const fail = [], R = {};
const ok = (k, v, why) => { R[k] = v; if (!v) fail.push(k + (why ? ' — ' + why : '')); };
(async () => {
  await new Promise(o => srv.listen(0, '127.0.0.1', o));
  const base = 'http://127.0.0.1:' + srv.address().port + '/';
  const b = await chromium.launch();
  for (const lang of ['ko', 'en']) {
    const url = base + (lang === 'en' ? 'en/' : '');
    // 첫 화면 안내 한 줄 (처음 방문)
    { const p = await b.newPage({ viewport: { width: 360, height: 800 } }); await p.goto(url); await p.waitForTimeout(2000);
      const r = await p.evaluate(() => { const v = document.querySelector('.vm'); return v ? { t: v.innerText, over: v.scrollWidth > v.clientWidth + 1, w: Math.round(v.getBoundingClientRect().right), vw: innerWidth } : null; });
      ok(lang + '.titleDisclaimer', r && /투자 조언|investment advice/.test(r.t) && !r.over && r.w <= r.vw, JSON.stringify(r)); await p.close(); }
    // 몇 판 하고 기록 목록·설정 확인
    const p = await b.newPage({ viewport: { width: 360, height: 800 } });
    await p.goto(url); await p.evaluate(() => { localStorage.setItem('shg_tut', '1'); localStorage.setItem('shg_profile', '"lion"'); localStorage.setItem('shg_stats', JSON.stringify({ rounds: 2, wins: 1, bestM: 1, bestPct: 0, net: 0, hist: [], c: { items: 0 }, cleanRounds: 0 })); });
    await p.goto(url + '?selftest'); await p.waitForTimeout(2500);
    const played = await p.evaluate(async () => { const t = window.__t; let n = 0;
      for (let k = 0; k < 3; k++) { for (let i = 0; i < 5 && t.s.state !== 'holding'; i++) { t.start(); await new Promise(r => setTimeout(r, 500)); }
        if (t.s.state === 'holding') { await new Promise(r => setTimeout(r, 900)); t.release(); n++; await new Promise(r => setTimeout(r, 2600)); } }
      return { n, hist: t.s.hist }; });
    const txt = [];
    for (const tab of ['trade', 'account', 'grow', 'mission', 'set']) { await p.evaluate(t => window.__t.tab(t), tab); await p.waitForTimeout(500); txt.push(await p.evaluate(() => document.body.innerText)); }
    const all = txt.join('\n'), m = all.match(MULT);
    ok(lang + '.noMultiplierText', !m, m ? JSON.stringify(all.slice(Math.max(0, m.index - 40), m.index + 40)) : '');
    ok(lang + '.historyShowsPercent', played.hist > 0 && /[+−]\d[\d.,]*%/.test(all), JSON.stringify(played));
    ok(lang + '.settingsDisclaimer', /실제 투자 조언이 아니에요|not investment advice/.test(txt[4]));
    await p.close();
  }
  await b.close(); srv.close();
  console.log(JSON.stringify(R));
  console.log(fail.length ? 'FAIL\n' + fail.join('\n') : 'PASS v3.1.6 (no result multipliers, disclaimer on title + settings)');
  process.exit(fail.length ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
