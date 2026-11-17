// PC 메뉴 테스트: Esc → 메뉴(계속하기·설정·게임 종료), 판 도중엔 메뉴 안 열림, 설정의 게임 종료, 종료 버튼으로 창이 닫힘, 첫 창이 화면 안에 맞음
// 실행: xvfb-run -a -s "-screen 0 1280x720x24" node test/menu.cjs dist/Ddeoksang-linux-x64/Ddeoksang
'use strict';
const { _electron } = require('playwright');
const fs = require('fs'), os = require('os'), path = require('path');
const exe = path.resolve(process.argv[2]);
const fail = [], R = {};
const ok = (k, v, why) => { R[k] = v; if (!v) fail.push(k + (why ? ' — ' + why : '')); };
(async () => {
  const ud = fs.mkdtempSync(path.join(os.tmpdir(), 'ddk-m-'));
  const app = await _electron.launch({ executablePath: exe, args: ['--no-sandbox', '--user-data-dir=' + ud, '--lang=ko'], timeout: 60000 });
  const page = await app.firstWindow();
  await page.waitForLoadState('load'); await page.waitForTimeout(1500);
  const b = await app.evaluate(({ BrowserWindow, screen }) => ({ win: BrowserWindow.getAllWindows()[0].getBounds(), wa: screen.getPrimaryDisplay().workAreaSize }));
  ok('window.fitsScreen', b.win.width <= b.wa.width && b.win.height <= b.wa.height, JSON.stringify(b));
  await page.evaluate(() => { localStorage.setItem('shg_tut', '1'); localStorage.setItem('shg_profile', '"lion"'); });
  await page.goto('app://game/?selftest'); await page.waitForTimeout(2500);
  // 첫 화면 카드가 떠 있으면 닫기
  await page.evaluate(() => { const c = document.getElementById('card'); if (c && !c.hidden) c.hidden = true; });
  await page.keyboard.press('Escape'); await page.waitForTimeout(400);
  const m1 = await page.evaluate(() => ({ open: !document.getElementById('modal').hidden, quit: !!document.getElementById('pmQuit'), set: !!document.getElementById('pmSet') }));
  ok('esc.opensMenu', m1.open && m1.quit && m1.set, JSON.stringify(m1));
  await page.keyboard.press('Escape'); await page.waitForTimeout(300);
  ok('esc.closesMenu', await page.evaluate(() => document.getElementById('modal').hidden));
  await page.keyboard.press('Escape'); await page.waitForTimeout(300);
  await page.click('#pmSet'); await page.waitForTimeout(600);
  const st = await page.evaluate(() => ({ tab: window.__t.s.curTab, quitBtn: !!document.getElementById('pcQuit') }));
  ok('menu.settings', st.tab === 'set' && st.quitBtn, JSON.stringify(st));
  // 판 도중엔 Esc 메뉴가 열리지 않음
  await page.evaluate(() => window.__t.tab('trade')); await page.waitForTimeout(400);
  const held = await page.evaluate(async () => { const t = window.__t; for (let i = 0; i < 4 && t.s.state !== 'holding'; i++) { t.start(); await new Promise(r => setTimeout(r, 500)); } return t.s.state; });
  if (held === 'holding') {
    await page.keyboard.press('Escape'); await page.waitForTimeout(300);
    ok('esc.noMenuMidRound', await page.evaluate(() => document.getElementById('modal').hidden || !document.getElementById('pmQuit')));
    await page.evaluate(() => window.__t.release()); await page.waitForTimeout(2500);
  } else R.midRound = 'skipped (round did not start: ' + held + ')';
  // 종료 버튼 → 창이 닫힘
  await page.evaluate(() => { window.__t.tab('set'); }); await page.waitForTimeout(500);
  const closed = new Promise(r => app.on('close', () => r(true)));
  await page.evaluate(() => document.getElementById('pcQuit').click());
  const quit = await Promise.race([closed, new Promise(r => setTimeout(() => r(false), 6000))]);
  ok('quit.closesApp', quit === true);
  if (!quit) await app.close();
  fs.rmSync(ud, { recursive: true, force: true });
  console.log(JSON.stringify(R));
  console.log(fail.length ? 'FAIL\n' + fail.join('\n') : 'PASS PC menu (Esc menu, settings quit, window fits)');
  process.exit(fail.length ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
