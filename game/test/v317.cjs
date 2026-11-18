// v3.1.7 확인 (KO+EN 빌드, 로컬 서버) · 사용: node game/test/v317.cjs <game-dir>
//  1) 실제 회사·대회·기관·지수·지명 이름이 게임에 없음 (역사 이야기의 다우·나스닥 지수는 그대로)
//  2) 영어판 이름은 Peakopia (Stonks 없음) · 영어 화면의 종목 코드에는 숫자가 섞여 있음 (실제 상장 코드와 안 겹침)
//  3) 팔 때 효과음이 예전 시-미 네모파(마리오 코인)가 아님
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
const fail = [], R = {};
const ok = (k, v, why) => { R[k] = v; if (!v) fail.push(k + (why ? ' — ' + why : '')); };
const REAL = /진바이오텍|메디포스|젠큐어|셀메디|한빛전자|대한중공업|삼진화학|국민통신|동방제철|미래금융지주|태평양건설|한국그리드|신화테크|코리아스타|에이스홀딩스|세종인더|태양바이오|대박전자|국일테크|삼영물산|미래씨앤씨|동아에너지|한성피앤씨|대성로보틱스|도지킹|스페이스원|퀀텀랩스|노바 다이내믹스|아틀라스 칩스|블루오션 EV|퀀텀 클라우드|메가 소셜|NASDAQ|NASA|FDA |코스피|F1 레이싱|올림픽|월드컵|월가|맨해튼|강남|여의도|돌진하는 황소상|한강|Zoom-Zoom|\bFed\b|GeneBiotech|MediForce|GenCure|DogeKing|Wall St|Manhattan|Charging Bull|Stonks/;
(async () => {
  for (const [f, lang] of [['index.html', 'ko'], ['en/index.html', 'en']]) {
    const s = fs.readFileSync(path.join(root, f), 'utf8');
    const m = s.match(REAL); ok(lang + '.noRealNames', !m, m && s.slice(Math.max(0, m.index - 40), m.index + 40));
    ok(lang + '.newSellSound', !/beep\(988,\.07,'square'/.test(s) && /beep\(1047,\.05,'triangle'/.test(s));
  }
  const en = fs.readFileSync(path.join(root, 'en/index.html'), 'utf8');
  ok('en.title', /<title>Peakopia<\/title>/.test(en));
  await new Promise(o => srv.listen(0, '127.0.0.1', o));
  const base = 'http://127.0.0.1:' + srv.address().port + '/';
  const b = await chromium.launch();
  for (const lang of ['ko', 'en']) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.addInitScript(() => { localStorage.setItem('shg_tut', '1'); localStorage.setItem('shg_profile', '"lion"'); });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(base + (lang === 'en' ? 'en/' : '') + '?selftest'); await p.waitForTimeout(2500);
    const t = await p.evaluate(() => document.body.innerText);
    const m = t.match(/진바이오텍|메디포스|젠큐어|NASDAQ|NASA|코스피|Stonks|DogeKing|GeneBiotech/);
    ok(lang + '.screenNoRealNames', !m, m && m[0]);
    if (lang === 'en') ok('en.codeHasDigit', /\b[A-Z]{3}\d\b/.test(t), (t.match(/\b[A-Z]{3,5}\d?\b/g) || []).slice(0, 8).join(','));
    ok(lang + '.noPageErrors', !errs.length, errs[0]);
    await ctx.close();
  }
  await b.close(); srv.close();
  console.log(JSON.stringify(R));
  console.log(fail.length ? 'FAIL\n' + fail.join('\n') : 'PASS v3.1.7 (no real names, Peakopia, fictional codes, new sell sound)');
  process.exit(fail.length ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
