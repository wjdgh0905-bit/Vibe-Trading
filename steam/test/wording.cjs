// PC판 문구 점검 (KO·EN): 광고·웹·폰 안내가 PC 화면에 남아 있지 않은지
//   ① 모든 탭 (탭이 실제로 바뀌었는지도 확인) ② 각 탭의 도움말(?) 창 ③ 한 판 끝난 뒤 결과 카드 ④ 설정의 빌드 꼬리표 '-pc'
// 실행: xvfb-run -a node test/wording.cjs dist/Ddeoksang-linux-x64/Ddeoksang
'use strict';
const { _electron } = require('playwright');
const fs = require('fs'), os = require('os'), path = require('path');
const exe = path.resolve(process.argv[2]);
const BAD = {
  ko: [/광고/, /브라우저/, /AdSense/i, /CrazyGames/i, /쿠키/, /홈 화면/, /아이폰/, /폰을|폰으로|폰의/, /단톡방/, /melange-lab/],
  en: [/\bads?\b/i, /browser/i, /AdSense/i, /CrazyGames/i, /cookie/i, /home screen/i, /iPhone/i, /\bphone\b/i, /melange-lab/]
};
const TABS = ['trade', 'account', 'invest', 'bank', 'assets', 'grow', 'skill', 'pet', 'mission', 'shop', 'decor', 'set'];
const fail = [];
const scan = (lang, where, txt) => { for (const re of BAD[lang]) { const i = txt.search(re); if (i >= 0) fail.push(`${lang}/${where}: "${txt.slice(Math.max(0, i - 40), i + 40).replace(/\s+/g, ' ')}"`); } };
(async () => {
  for (const lang of ['ko', 'en']) {
    const ud = fs.mkdtempSync(path.join(os.tmpdir(), 'ddk-w-'));
    const app = await _electron.launch({ executablePath: exe, args: ['--no-sandbox', '--user-data-dir=' + ud, '--lang=' + lang], timeout: 60000 });
    const page = await app.firstWindow();
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    await page.waitForLoadState('load'); await page.waitForTimeout(1500);
    const base = lang === 'ko' ? 'app://game/' : 'app://game/en/';
    await page.evaluate(() => { localStorage.setItem('shg_tut', '1'); localStorage.setItem('shg_profile', '"lion"'); });
    await page.goto(base + '?selftest'); await page.waitForTimeout(2500);
    const realTabs = await page.$$eval('#tabs [data-tab], nav [data-tab]', bs => [...new Set(bs.map(b => b.dataset.tab))]).catch(() => []);
    const seen = {}; let helps = 0;
    for (const t of TABS) {
      await page.evaluate(t => { try { window.__t.tab(t); } catch (e) {} }, t); await page.waitForTimeout(700);
      if (realTabs.includes(t)) {   // ① 탭 전환 확인 (별칭 탭은 다른 탭 안 페이지라 건너뜀)
        const cur = await page.evaluate(() => { const s = window.__t.s || {}; return s.curTab ?? s.tab; });
        if (cur !== undefined && cur !== t) fail.push(`${lang}: tab('${t}') stayed on '${cur}'`);
      }
      seen[t] = await page.evaluate(() => document.body.innerText);
      // ② 이 화면의 도움말(?) 버튼마다 열어서 글자 확인 후 닫기
      const n = await page.$$eval('[data-help]', bs => bs.filter(b => b.offsetParent).length).catch(() => 0);
      for (let i = 0; i < n; i++) {
        const opened = await page.evaluate(i => { const b = [...document.querySelectorAll('[data-help]')].filter(b => b.offsetParent)[i]; if (!b) return false; b.click(); return true; }, i);
        if (!opened) continue;
        await page.waitForTimeout(450);
        seen[`${t}/help${i}`] = await page.evaluate(() => document.body.innerText); helps++;
        await page.keyboard.press('Escape'); await page.waitForTimeout(300);
        await page.evaluate(() => { const m = document.getElementById('modal'); if (m && !m.hidden) m.hidden = true; const s = document.getElementById('sheet'); if (s && !s.hidden) s.hidden = true; });
      }
    }
    // ③ 한 판 하고 결과 카드
    await page.evaluate(() => { try { window.__t.tab('trade'); } catch (e) {} });
    await page.waitForTimeout(500);
    const played = await page.evaluate(async () => {
      const t = window.__t; if (!t.start) return 'no start';
      t.start(); await new Promise(r => setTimeout(r, 1200));
      if (t.release) t.release(); else if (t.stop) t.stop();
      await new Promise(r => setTimeout(r, 2500));
      return (t.s || {}).state;
    });
    seen.result = await page.evaluate(() => document.body.innerText);
    for (const [where, txt] of Object.entries(seen)) scan(lang, where, txt);
    const build = ((Object.values(seen).join('\n')).match(/v\d+\.\d+\.\d+ · b\w+ · \w+-\w+/) || [''])[0];
    if (!build) fail.push(lang + ' build tag not shown on any tab');
    else if (!/-pc$/.test(build)) fail.push(lang + ' build tag is not pc: ' + build);
    console.log(lang, 'tabs', TABS.length, 'help sheets', helps, 'after round', played, 'pageerrors', errs.length, 'build', build || '(not shown)');
    if (errs.length) fail.push(lang + ' pageerror ' + errs[0]);
    await app.close();
    fs.rmSync(ud, { recursive: true, force: true });
  }
  console.log(fail.length ? 'FAIL\n' + fail.join('\n') : 'PASS no ad/web/phone wording on tabs, help sheets or the result card (KO+EN)');
  process.exit(fail.length ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
