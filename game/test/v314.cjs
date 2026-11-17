// v3.1.4 수정 4건 재현 테스트 (KO 빌드, 로컬 서버) · 사용: node game/test/v314.cjs <game-dir>
//  1) 새 대출을 받으면 '이자 이미 냄' 표시가 지워짐
//  2) 판 도중 강제 종료(정산 없이 꺼짐) → 다음 실행 때 마지막 가격으로 정산 (손실 판을 꺼서 피하기 불가)
//  3) 시계를 미래로 돌렸다 되돌려도 선물·미션이 그 날짜까지 잠기지 않음 (오늘 받음으로 바뀜)
//  4) 화면을 떠나도 앱 아이콘 배지를 붙이지 않음
'use strict';
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(process.argv[2] || 'game');
const srv = http.createServer((q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.normalize(path.join(root, p));
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
  const ext = path.extname(f); r.writeHead(200, { 'content-type': { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2' }[ext] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(r);
});
const PRE = { shg_tut: '1', shg_profile: '"lion"' };
const fail = [], R = {};
const ok = (k, v, why) => { R[k] = v; if (!v) fail.push(k + (why ? ' — ' + why : '')); };
(async () => {
  await new Promise(o => srv.listen(0, '127.0.0.1', o));
  const base = 'http://127.0.0.1:' + srv.address().port + '/';
  const b = await chromium.launch();
  const open = async (storage, init) => {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.addInitScript(([st, ini]) => {
      if (!sessionStorage.getItem('__seeded')) { for (const [k, v] of Object.entries(st)) localStorage.setItem(k, v); sessionStorage.setItem('__seeded', '1'); }
      if (ini) (new Function(ini))();
    }, [storage, init || '']);
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(base + '?selftest'); await p.waitForTimeout(2500);
    return { ctx, p, errs };
  };
  const today = await (async () => { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); })();

  // 1) 대출 이자 표시
  { const { ctx, p } = await open({ ...PRE, shg_intPaid: 'true', shg_debt: '5000000', shg_bal: '3000000' });
    const r = await p.evaluate(() => { const ok = window.__t.takeLoan(); return { ok, flag: localStorage.getItem('shg_intPaid') }; });
    ok('1.newLoanClearsIntPaid', r.flag === 'false', JSON.stringify(r)); await ctx.close(); }

  // 2) 강제 종료: 판 도중의 저장 상태를 그대로 복사해 새 창에서 열기 (pagehide 정산이 안 일어난 경우)
  for (let attempt = 0; attempt < 4; attempt++) { const { ctx, p } = await open({ ...PRE, shg_bal: '10000000', shg_stats: JSON.stringify({ rounds: 2, wins: 1, bestM: 1, bestPct: 0, net: 0, hist: [], c: { items: 0 }, cleanRounds: 0 }) });   // 처음 5판 신규 보호: 일찍 폭락하지 않음
    const r0 = await p.evaluate(async () => { const t = window.__t; t.lev = 1; t.pct = 1; for (let i = 0; i < 4 && t.s.state !== 'holding'; i++) { t.start(); await new Promise(r => setTimeout(r, 600)); } await new Promise(r => setTimeout(r, 1200)); return { s: t.s, live: localStorage.getItem('shg_live'), bal: localStorage.getItem('shg_bal') }; });
    const snap = await p.evaluate(() => Object.assign({}, localStorage));
    await ctx.close();   // 컨텍스트를 그냥 닫음 = 강제 종료 (같은 저장소 사본은 snap)
    if (r0.s.state !== 'holding' && attempt < 3) continue;   // 드물게 판이 이미 끝났으면 다시
    ok('2.liveRecorded', !!r0.live && r0.s.state === 'holding', JSON.stringify({ st: r0.s.state, live: r0.live }));
    const live = JSON.parse(r0.live || '{}') || {};
    const { ctx: c2, p: p2 } = await open(snap);
    const r1 = await p2.evaluate(() => ({ bal: window.__t.s.balance, live: localStorage.getItem('shg_live'), toast: document.getElementById('toast') && document.getElementById('toast').textContent }));
    const before = +snap.shg_bal, expect = before + (live.b || 0) * ((live.c || 1) - 1) * (live.l || 1);
    ok('2.settledAtLastPrice', Math.abs(r1.bal - expect) <= Math.max(2, Math.abs(expect) * 0.001) && (r1.live === null || r1.live === "null"), JSON.stringify({ before, after: r1.bal, expect: Math.round(expect), live }));
    // 다시 열어도 한 번 더 정산되지 않음
    const snap2 = await p2.evaluate(() => Object.assign({}, localStorage)); await c2.close();
    const { ctx: c3, p: p3 } = await open(snap2);
    const b3 = await p3.evaluate(() => window.__t.s.balance);
    ok('2.settledOnce', Math.abs(b3 - r1.bal) < 1, `${r1.bal} -> ${b3}`); await c3.close(); break; }

  // 3) 미래 날짜 잠금
  { const fut = '2027-12-21';
    const { ctx, p } = await open({ ...PRE, shg_spin: JSON.stringify(fut), shg_adSpin: JSON.stringify(fut) });
    const r = await p.evaluate(() => ({ spin: JSON.parse(localStorage.getItem('shg_spin')), daily: (JSON.parse(localStorage.getItem('shg_daily') || '{}')).date }));
    ok('3.futureGiftDateClamped', r.spin === today, JSON.stringify(r));
    ok('3.missionsToday', r.daily === today, JSON.stringify(r)); await ctx.close(); }
  { const fut = '2027-12-21';
    const { ctx, p } = await open({ ...PRE, shg_daily: JSON.stringify({ date: fut, v: 4, ids: ['x'], prog: {}, done: [] }) });
    const d = await p.evaluate(() => JSON.parse(localStorage.getItem('shg_daily')).date);
    ok('3.futureMissionDateClamped', d === today, d); await ctx.close(); }

  // 4) 앱 아이콘 배지
  { const { ctx, p } = await open({ ...PRE }, "window.__badge=[];navigator.setAppBadge=n=>{window.__badge.push(n);return Promise.resolve();};navigator.clearAppBadge=()=>{window.__badge.push('clear');return Promise.resolve();};");
    const calls = await p.evaluate(async () => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); await new Promise(r => setTimeout(r, 300)); return window.__badge; });
    ok('4.noBadgeSet', !calls.some(c => typeof c === 'number'), JSON.stringify(calls)); await ctx.close(); }

  await b.close(); srv.close();
  console.log(JSON.stringify(R));
  console.log(fail.length ? 'FAIL\n' + fail.join('\n') : 'PASS v3.1.4 fixes 1–4');
  process.exit(fail.length ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
