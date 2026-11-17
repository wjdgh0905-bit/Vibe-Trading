// PC 빌드 스모크 테스트 (Linux 빌드로): node test/smoke.cjs <Ddeoksang 실행 파일>
// 실행: xvfb-run -a node test/smoke.cjs dist/Ddeoksang-linux-x64/Ddeoksang
'use strict';
const { _electron } = require('playwright');
const fs = require('fs'), os = require('os'), path = require('path');
const exe = path.resolve(process.argv[2]);
const ud = fs.mkdtempSync(path.join(os.tmpdir(), 'ddk-ud-'));
const out = path.resolve(process.argv[3] || 'dist/smoke');
fs.mkdirSync(out, { recursive: true });
const R = {}; const fail = [];
const ok = (k, v, why) => { R[k] = v; if (!v) fail.push(k + (why ? ' ' + why : '')); };
async function launch(extra = []) {
  const app = await _electron.launch({ executablePath: exe, args: ['--no-sandbox', '--user-data-dir=' + ud, ...extra], timeout: 60000 });
  const page = await app.firstWindow();
  const bad = [];
  page.on('pageerror', e => bad.push('pageerror ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/403 \(Forbidden\)/.test(m.text())) bad.push('console ' + m.text()); });
  const mine = u => /%2f/i.test(u);   // 경로 밖 접근 테스트가 일부러 낸 403
  page.on('response', r => { if (r.status() >= 400 && !mine(r.url())) bad.push('http ' + r.status() + ' ' + r.url()); });
  page.on('requestfailed', r => { if (!/sw\.js/.test(r.url()) && !mine(r.url())) bad.push('failed ' + r.url()); });
  await page.waitForLoadState('load');
  await page.waitForTimeout(2500);
  return { app, page, bad };
}
(async () => {
  // 1) 한국어 첫 실행
  let { app, page, bad } = await launch(['--lang=ko']);
  ok('ko.url', page.url() === 'app://game/', page.url());
  ok('ko.title', /떡상/.test(await page.title()));
  const sz = await app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0].getContentBounds());
  R.size = sz;
  await page.screenshot({ path: path.join(out, 'ko_1280.png') });
  const keys1 = await page.evaluate(() => Object.keys(localStorage).filter(k => /^shg/.test(k)).length);
  ok('ko.saves', keys1 > 0, 'keys ' + keys1);
  // 외부 이동 막힘 + https 링크는 기본 브라우저로 넘김.
  // 실제 브라우저(xdg-open)는 띄우지 않고 가로채서 기록만 함: 띄우면 그 프로세스가 앱의 출력 통로를 물고 있어 app.close()가 끝나지 않음 (CI에서 17분 멈춤)
  await app.evaluate(({ shell }) => { global.__opened = []; shell.openExternal = async u => { global.__opened.push(u); }; });
  await page.evaluate(() => { try { location.href = 'https://example.com/'; } catch (e) {} });
  await page.waitForTimeout(800);
  ok('nav.blocked', page.url().startsWith('app://game/'), page.url());
  const opened = await app.evaluate(() => global.__opened);
  ok('nav.external', opened.length === 1 && opened[0] === 'https://example.com/', JSON.stringify(opened));
  // 경로 밖 파일 막힘
  const trav = await page.evaluate(async () => { try { const r = await fetch('app://game/..%2f..%2fmain.js'); return r.status; } catch (e) { return 'err'; } });
  ok('traversal.blocked', trav !== 200, String(trav));
  // 서비스워커 없음
  ok('no.sw', await page.evaluate(async () => { try { return !navigator.serviceWorker || !(await navigator.serviceWorker.getRegistration()); } catch (e) { return true; } }));
  // 키 처리: main.js의 before-input-event 리스너에 키를 직접 넣어 확인 (CDP 키 입력은 그 경로를 안 탐)
  const key = (k, m = {}) => app.evaluate(({ BrowserWindow }, a) => { const w = BrowserWindow.getAllWindows()[0]; let p = false;
    w.webContents.emit('before-input-event', { preventDefault() { p = true; } }, Object.assign({ type: 'keyDown', key: a.k, control: false, shift: false, alt: false, meta: false }, a.m)); return p; }, { k, m });
  const fsNow = () => app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0].isFullScreen());
  ok('f11.handled', await key('F11')); await page.waitForTimeout(1200); R.f11on = await fsNow();
  ok('f11.handled2', await key('F11')); await page.waitForTimeout(1200); R.f11off = await fsNow();
  ok('f11.toggles', R.f11on === true && R.f11off === false, `on=${R.f11on} off=${R.f11off} (Xvfb without a window manager may ignore fullscreen)`);
  ok('reload.blocked', await key('F5'));
  ok('zoom.in', await key('=', { control: true })); await page.waitForTimeout(300);
  R.zoom = await app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0].webContents.getZoomLevel());
  await key('0', { control: true });
  // 판 도중 창 닫기 → 다시 열면 한 번만 정산
  await page.evaluate(() => { localStorage.setItem('shg_tut', '1'); localStorage.setItem('shg_profile', '"lion"'); });
  await page.goto('app://game/?selftest'); await page.waitForTimeout(2500);
  const s0 = await page.evaluate(() => window.__t && window.__t.s);
  R.s0 = s0;
  if (s0) {
    await page.evaluate(() => { try { window.__t.start(); } catch (e) {} });
    await page.waitForTimeout(1500);
    R.s1 = await page.evaluate(() => window.__t.s);
  }
  ok('clean.ko', bad.length === 0, JSON.stringify(bad.slice(0, 5)));
  await app.close();
  // 2) 다시 열기: 저장 유지 + 정산 1회
  ({ app, page, bad } = await launch(['--lang=ko']));
  await page.goto('app://game/?selftest'); await page.waitForTimeout(2500);
  const s2 = await page.evaluate(() => window.__t && window.__t.s); R.s2 = s2;
  if (R.s1 && s2) {
    ok('mid.round.settled', s2.state !== 'holding' && s2.rounds >= R.s1.rounds, `${R.s1.state}/${R.s1.rounds} -> ${s2.state}/${s2.rounds}`);
    ok('mid.round.once', s2.rounds <= (R.s1.rounds || 0) + 1, `${R.s1.rounds} -> ${s2.rounds}`);
  }
  const keys2 = await page.evaluate(() => Object.keys(localStorage).filter(k => /^shg/.test(k)).length);
  ok('saves.kept', keys2 >= keys1, `${keys1} -> ${keys2}`);
  await page.goto('app://game/'); await page.waitForTimeout(1500);
  // 3) Ctrl+Shift+L → 영어
  ok('lang.key', await key('L', { control: true, shift: true })); await page.waitForTimeout(3000);
  ok('lang.switch', page.url() === 'app://game/en/', page.url());
  await page.screenshot({ path: path.join(out, 'en_1280.png') });
  ok('clean.en', bad.length === 0, JSON.stringify(bad.slice(0, 5)));
  await app.close();
  // 4) 언어 설정 기억
  ({ app, page, bad } = await launch(['--lang=']));
  ok('lang.remembered', page.url() === 'app://game/en/', page.url());
  await app.close();
  console.log(JSON.stringify(R));
  console.log(fail.length ? 'FAIL ' + JSON.stringify(fail) : 'PASS all');
  fs.rmSync(ud, { recursive: true, force: true });
  process.exit(fail.length ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
