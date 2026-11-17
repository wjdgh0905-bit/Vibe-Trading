// Web smoke test for a melange game build (KO + EN, phone 390x844 + PC 1280x800).
// Usage: node test_web.cjs <game-dir> [shots-dir]   (shots default: <tmp>/game_shots, never inside the repo)
// Needs: playwright (require('playwright') — preinstalled in the cloud container), built index.html + en/index.html.
// Contract with the game (see assets/starter.html): ?selftest exposes window.__t with tab(name) and
// start(), stop() and a getter s with s.state and s.rounds (finished rounds). Nav buttons carry data-tab="<name>".
// Optional: GAME_RUNNING=running,holding (states that mean a round is in play).
// Checks: no page errors, no failed/4xx requests (except sw.js), a round can start and stop,
// every tab's visible text has no number with 3+ decimals and no NaN/undefined/Infinity/[object.
'use strict';
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(process.argv[2] || '.');
const shots = path.resolve(process.argv[3] || path.join(require('os').tmpdir(), 'game_shots'));
const RUNNING = (process.env.GAME_RUNNING || 'running,holding').split(',');
fs.mkdirSync(shots, { recursive: true });
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' };
const srv = http.createServer((q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.normalize(path.join(root, p));
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
});
const BAD_NUM = /\d\.\d{3,}|NaN|undefined|Infinity|\[object/;
(async () => {
  await new Promise(ok => srv.listen(0, '127.0.0.1', ok));
  const base = 'http://127.0.0.1:' + srv.address().port;
  const b = await chromium.launch();
  const fail = [], log = [];
  for (const [lang, url] of [['ko', base + '/'], ['en', base + '/en/']]) {
    for (const vp of [{ width: 390, height: 844 }, { width: 1280, height: 800 }]) {
      const p = await b.newPage({ viewport: vp }); const errs = [];
      p.on('pageerror', e => errs.push('pageerror ' + e.message));
      p.on('response', r => { if (r.status() >= 400 && !/sw\.js/.test(r.url())) errs.push('http ' + r.status() + ' ' + r.url()); });
      p.on('requestfailed', r => { if (!/sw\.js/.test(r.url())) errs.push('failed ' + r.url()); });
      await p.goto(url + '?selftest'); await p.waitForTimeout(1500);
      const tag = `${lang}@${vp.width}`;
      const hasT = await p.evaluate(() => !!window.__t);
      if (!hasT) { fail.push(tag + ': window.__t missing with ?selftest'); await p.close(); continue; }
      const R = await p.evaluate(async () => {
        const t = window.__t, g = () => (t.s || {});
        if (!t.start) return { err: 'no start()' };
        try { t.tab && t.tab('play'); } catch (e) {}
        const before = g().state, r0 = g().rounds;
        t.start(); await new Promise(r => setTimeout(r, 500));
        const mid = g().state;
        // leaving the page mid-round must settle exactly once, even if pagehide fires twice
        dispatchEvent(new Event('pagehide')); dispatchEvent(new Event('pagehide')); await new Promise(r => setTimeout(r, 200));
        const after = g().state, r1 = g().rounds;
        return { before, mid, after, r0, r1 };
      });
      const st = R.err || `${R.before}->${R.mid}->${R.after} rounds ${R.r0}->${R.r1}`;
      if (R.err) fail.push(tag + ': ' + R.err);
      else {
        if (!RUNNING.includes(R.mid)) fail.push(`${tag}: start() did not start a round (${st})`);
        if (RUNNING.includes(R.after)) fail.push(`${tag}: pagehide did not settle the round (${st})`);
        if (typeof R.r0 !== 'number' || R.r1 !== R.r0 + 1) fail.push(`${tag}: pagehide must add exactly one finished round (${st}) — expose s.rounds`);
      }
      const tabs = await p.$$eval('[data-tab]', bs => [...new Set(bs.map(b => b.dataset.tab))]);
      for (const t of tabs) {
        await p.evaluate(t => window.__t.tab(t), t); await p.waitForTimeout(300);
        const txt = await p.evaluate(() => document.body.innerText);
        const m = txt.match(BAD_NUM); if (m) { const i = txt.search(BAD_NUM); fail.push(`${tag}/${t}: bad number "${txt.slice(Math.max(0, i - 30), i + 30).replace(/\s+/g, ' ')}"`); }
        await p.screenshot({ path: path.join(shots, `${lang}_${vp.width}_${t}.png`) });
      }
      const scrollX = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      if (scrollX > 1) fail.push(`${tag}: horizontal scroll ${scrollX}px`);
      if (vp.width >= 1280) {   // PC / Steam Deck: main action and nav must fit without scrolling
        await p.evaluate(() => window.__t.tab('play')).catch(() => {});
        const fold = await p.evaluate(() => { const n = document.querySelector('nav'); return n ? Math.round(n.getBoundingClientRect().bottom - innerHeight) : null; });
        if (fold !== null && fold > 0) fail.push(`${tag}: nav is ${fold}px below the fold at ${vp.width}x${vp.height}`);
      }
      errs.forEach(e => fail.push(tag + ': ' + e));
      log.push(`${tag} round ${st} tabs ${tabs.join(',')} errors ${errs.length}`);
      await p.close();
    }
  }
  await b.close(); srv.close();
  console.log(log.join('\n'));
  console.log(fail.length ? 'FAIL\n' + fail.join('\n') : 'PASS web smoke (KO+EN, 390 + 1280) · shots in ' + shots);
  process.exit(fail.length ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
