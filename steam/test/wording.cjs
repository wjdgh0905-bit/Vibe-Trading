// PC판 문구 점검: 모든 탭 화면 글자에 광고·웹·폰 안내가 없는지 (KO·EN)
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
    const seen = {};
    for (const t of TABS) {
      await page.evaluate(t => { try { window.__t.tab(t); } catch (e) {} }, t); await page.waitForTimeout(700);
      seen[t] = await page.evaluate(() => document.body.innerText);
    }
    const build = (seen.set.match(/v3\.\d+\.\d+ · b\w+ · \w+-\w+/) || [''])[0];
    for (const [where, txt] of Object.entries(seen)) for (const re of BAD[lang]) {
      const i = txt.search(re); if (i >= 0) fail.push(`${lang}/${where}: "${txt.slice(Math.max(0, i - 40), i + 40).replace(/\s+/g, ' ')}"`);
    }
    if (build && !/-pc$/.test(build)) fail.push(lang + ' build tag is not pc: ' + build);
    console.log(lang, 'tabs', Object.keys(seen).length, 'pageerrors', errs.length, 'build', build || '(not shown)');
    if (errs.length) fail.push(lang + ' pageerror ' + errs[0]);
    await app.close();
    fs.rmSync(ud, { recursive: true, force: true });
  }
  console.log(fail.length ? 'FAIL\n' + fail.join('\n') : 'PASS no ad/web/phone wording on any tab (KO+EN)');
  process.exit(fail.length ? 1 : 0);
})().catch(e => { console.error('ERR', e); process.exit(2); });
