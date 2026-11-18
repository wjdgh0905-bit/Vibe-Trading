// v3.1.4 수정 4건 재현 테스트 (KO 빌드, 로컬 서버) · 사용: node game/test/v314.cjs <game-dir>
//  1) 새 대출을 받으면 '이자 이미 냄' 표시가 지워짐
//  2) 판 도중 강제 종료(정산 없이 꺼짐) → 다음 실행 때 마지막 가격으로 정산 (손실 판을 꺼서 피하기 불가)
//  3) 시계를 미래로 돌렸다 되돌려도 선물·미션이 그 날짜까지 잠기지 않음 (오늘 받음으로 바뀜)
//  4) 화면을 떠나도 앱 아이콘 배지를 붙이지 않음
//  5) 랜덤 보상 → 고정: 매일 선물(요일표·같은 날 같은 보상), 보물상자(익절 14번째), 시즌 패스 잠금 없음
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
    await p2.waitForFunction(() => { const v = localStorage.getItem('shg_live'); return v === null || v === 'null'; }, null, { timeout: 8000 }).catch(() => {});   // v314b: 방금 꺼진 판은 기록이 3초 멈춘 걸 확인한 뒤 정산
    const r1 = await p2.evaluate(() => ({ bal: window.__t.s.balance, live: localStorage.getItem('shg_live'), toast: document.getElementById('toast') && document.getElementById('toast').textContent }));
    const before = +snap.shg_bal, expect = before + (live.b || 0) * ((live.c || 1) - 1) * (live.l || 1);
    ok('2.settledAtLastPrice', Math.abs(r1.bal - expect) <= Math.max(2, Math.abs(expect) * 0.001) && (r1.live === null || r1.live === "null"), JSON.stringify({ before, after: r1.bal, expect: Math.round(expect), live }));
    // 다시 열어도 한 번 더 정산되지 않음
    const snap2 = await p2.evaluate(() => Object.assign({}, localStorage)); await c2.close();
    const { ctx: c3, p: p3 } = await open(snap2);
    const b3 = await p3.evaluate(() => window.__t.s.balance);
    ok('2.settledOnce', Math.abs(b3 - r1.bal) < 1, `${r1.bal} -> ${b3}`); await c3.close(); break; }

  // 2b) 두 탭: 한 탭이 판 도중일 때 새 탭을 열어도 (가) 새 탭이 그 판을 대신 정산하지 않고 (나) 판 하는 탭이 새로고침되지 않음
  { const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.addInitScript(st => { if (!sessionStorage.getItem('__seeded') && !localStorage.getItem('shg_tut')) { for (const [k, v] of Object.entries(st)) localStorage.setItem(k, v); } sessionStorage.setItem('__seeded', '1');
      window.__toasts = []; setInterval(() => { const t = document.getElementById('toast'); const v = t && t.textContent; if (v && window.__toasts[window.__toasts.length - 1] !== v) window.__toasts.push(v); }, 100); },
      { ...PRE, shg_bal: '10000000', shg_stats: JSON.stringify({ rounds: 2, wins: 1, bestM: 1, bestPct: 0, net: 0, hist: [], c: { items: 0 }, cleanRounds: 0 }) });
    const A = await ctx.newPage(); await A.goto(base + '?selftest'); await A.waitForTimeout(2500);
    const a0 = await A.evaluate(async () => { window.__mark = 1; const t = window.__t; t.lev = 1; t.pct = 1; for (let i = 0; i < 4 && t.s.state !== 'holding'; i++) { t.start(); await new Promise(r => setTimeout(r, 600)); } return { st: t.s.state, bal: t.s.balance }; });
    const B = await ctx.newPage(); await B.goto(base + '?selftest'); await B.waitForTimeout(1000);
    const b0 = await B.evaluate(() => window.__t.s.balance);
    await B.waitForTimeout(4500);
    const b1 = await B.evaluate(() => ({ bal: window.__t.s.balance, toasts: window.__toasts }));
    const a1 = await A.evaluate(() => ({ mark: window.__mark, st: window.__t.s.state, live: localStorage.getItem('shg_live') }));
    ok('2b.newTabDoesNotSettleOthersRound', a0.st === 'holding' ? !b1.toasts.some(t => /지난 판은 창이 닫혀/.test(t)) : true, JSON.stringify({ a0, b0, b1 }));
    ok('2b.liveRecordKept', a0.st !== 'holding' || a1.st !== 'holding' || (a1.live && a1.live !== 'null'), JSON.stringify(a1));
    await A.evaluate(() => { try { window.__t.release(); } catch (e) {} }); await A.waitForTimeout(4000);   // 판이 끝난 뒤에도 판 하던 탭이 새로고침되지 않아야 함
    const a2 = await A.evaluate(() => ({ mark: window.__mark, st: window.__t.s.state })).catch(e => ({ err: String(e) }));
    ok('2b.playingTabNotReloaded', a1.mark === 1 && a2.mark === 1, JSON.stringify({ a1, a2 }));
    await ctx.close(); }

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

  // 5a) 매일 선물: 같은 날이면 몇 번을 새로 해도 같은 보상 (뽑기 없음) · 요일표 7칸 · '여는 중' 없음
  { const deltas = [];
    for (let i = 0; i < 2; i++) {
      const { ctx, p } = await open({ ...PRE, shg_bal: '5000000', shg_stats: JSON.stringify({ rounds: 12, wins: 3, bestM: 1, bestPct: 0, net: 0, hist: [], c: { items: 0 }, cleanRounds: 0 }) });
      const r = await p.evaluate(async () => { const s0 = { ...window.__t.s }, inv0 = localStorage.getItem('shg_inv'); document.getElementById('giftBtn').click(); await new Promise(r => setTimeout(r, 900));
        const m = document.getElementById('modal'), s1 = window.__t.s;
        return { days: m.querySelectorAll('.gwk span').length, on: m.querySelectorAll('.gwk span.on').length, opening: /여는 중/.test(m.innerText), d: { bal: Math.round(s1.balance - s0.balance), xp: s1.xp - s0.xp, inv: localStorage.getItem('shg_inv') !== inv0 ? localStorage.getItem('shg_inv') : '' } }; });
      deltas.push(JSON.stringify(r.d));
      if (i === 0) { ok('5a.weekStrip', r.days === 7 && r.on === 1, JSON.stringify(r)); ok('5a.noSuspense', !r.opening); }
      await ctx.close();
    }
    ok('5a.sameGiftSameDay', deltas[0] === deltas[1] && deltas[0] !== JSON.stringify({ bal: 0, xp: 0, inv: '' }), deltas.join(' | ')); }

  // 5b) 보물상자: 익절 14번째에 정해진 순서로 (첫 상자 = 현금 0.5배)
  for (let attempt = 0; attempt < 4; attempt++) {
    const { ctx, p } = await open({ ...PRE, shg_bal: '10000000', shg_stats: JSON.stringify({ rounds: 2, wins: 1, bestM: 1, bestPct: 0, net: 0, hist: [], c: { items: 0 }, cleanRounds: 0, chestN: 13, chestK: 0 }) });
    const r = await p.evaluate(async () => { const t = window.__t; t.lev = 1; t.pct = 1;
      for (let i = 0; i < 4 && t.s.state !== 'holding'; i++) { t.start(); await new Promise(r => setTimeout(r, 600)); }
      for (let i = 0; i < 40 && t.s.state === 'holding' && t.s.cur < 1.03; i++) await new Promise(r => setTimeout(r, 100));
      const held = t.s.state === 'holding'; t.release(); await new Promise(r => setTimeout(r, 300));
      const st = JSON.parse(localStorage.getItem('shg_stats')); return { held, chestN: st.chestN, chestK: st.chestK }; });
    await ctx.close();
    if (!r.held && attempt < 3) continue;
    ok('5b.chestOn14th', r.chestK === 1 && r.chestN === 0, JSON.stringify(r)); break;
  }

  // 5c) 시즌 패스: 요일 잠금·'N일 남음' 없음
  { const { ctx, p } = await open({ ...PRE, shg_stats: JSON.stringify({ rounds: 12, wins: 3, bestM: 1, bestPct: 0, net: 0, hist: [], c: { items: 0 }, cleanRounds: 0 }) });
    const r = await p.evaluate(async () => { window.__t.tab('mission'); await new Promise(r => setTimeout(r, 700)); const tx = document.body.innerText; return { left: /일 남음/.test(tx), daily: /단계씩 열려요/.test(tx), note: /경험치를 모으면 칸이 열려요/.test(tx), locked: document.querySelectorAll('.spass .lk').length }; });
    ok('5c.seasonUnlocked', !r.left && !r.daily && r.note && r.locked === 0, JSON.stringify(r)); await ctx.close(); }

  await b.close(); srv.close();
  console.log(JSON.stringify(R));
  console.log(fail.length ? 'FAIL\n' + fail.join('\n') : 'PASS v3.1.4 fixes 1–5');
  process.exit(fail.length ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
