/* ============================================================================
 * WL.FX — 전투 이펙트 레이어 "모닥불 무리"
 * 의존성 0 · IIFE · window.WL 에 부착 · 최상위에서 DOM 안 건드림
 * ----------------------------------------------------------------------------
 * 공개 API  (좌표는 전부 mount 한 el 기준 CSS px — WL.Scene.slots() 가 주는 그 좌표계)
 *   WL.FX.mount(el, opts)                 opts {reduced, seed, driveFire, zIndex}
 *   WL.FX.hit(x, y, o)                    o {amount, crit, kind, boss}
 *                                         kind 'claw'|'bite'|'peck'|'stomp'|'auto'
 *   WL.FX.tap(x, y, o)                    o {crit}  터치 발톱자국 3~5줄
 *   WL.FX.poof(x, y, palette)             처치 — 실루엣이 수평 스트립으로 찢겨 상승
 *   WL.FX.coins(fromX, fromY, toEl, n)    발자국이 포물선으로 상단 수치에 빨려든다
 *   WL.FX.levelUp(el)                     동료 강화
 *   WL.FX.milestone(el, text)             마일스톤 돌파
 *   WL.FX.bossIntro(name, sub)            보스 등장
 *   WL.FX.bossWarn(sec)                   제한시간 경고 (내부에서 센다. 0/null 이면 해제)
 *   WL.FX.ribbon(text, tone)              배너 'zone'|'good'|'bad'|'gold'
 *   WL.FX.shake(p) / flash(c, ms) / pause(b) / stats() / dispose()
 * ----------------------------------------------------------------------------
 * 설계 메모
 *   · 레이어 2장: canvas.wl-fx (z4, 절차 파티클 전부) + div.wl-fx-dom (z5, 타이포 배너).
 *     숫자·스파크는 초당 수백 개라 캔버스, 배너는 웹폰트 자간이 생명이라 DOM 이다.
 *   · 이모지·문자 스파크 없음. 스파크의 유일한 원시형은 "둥근 끝 선분" 하나다.
 *     색×투명도×굵기로 계수정렬해 버킷당 stroke 1번 — 입자마다 stroke 하면 프레임이 깎인다.
 *   · 자동터치가 초당 8회를 넘으면 개별 숫자를 끄고 합산 숫자 + 밀도 스파크로 바꾼다.
 *     안 그러면 1초에 25개 숫자가 겹쳐 아무것도 안 읽힌다.
 *   · 할 일이 없으면 rAF 를 멈춘다. 유휴 이펙트 레이어는 0원이어야 한다.
 * ==========================================================================*/
(function () {
'use strict';

var W = window.WL || (window.WL = {});
var doc = document;

/* ─────────────────── 0. 수학 ─────────────────── */
var PI = Math.PI, TAU = PI * 2;
var abs = Math.abs, sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt;
var min = Math.min, max = Math.max, flr = Math.floor, pw = Math.pow;
var rnd = Math.random, lg = Math.log;

function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function lerp(a, b, t) { return a + (b - a) * t; }
function smooth(t) { return t * t * (3 - 2 * t); }
function ss(a, b, t) { return smooth(clamp((t - a) / (b - a || 1e-6), 0, 1)); }
function r3(v) { return Math.round(v * 1000) / 1000; }
function rr(a, b) { return a + (b - a) * rnd(); }
function sgn() { return rnd() < 0.5 ? -1 : 1; }
function eOut(t) { return 1 - pw(1 - t, 3); }
function eIn(t) { return t * t; }

function rng(seed) {
  var s = seed >>> 0;
  return function () {
    s = s + 0x6D2B79F5 | 0;
    var t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function makeNoise(seed) {
  var r = rng(seed), N = 512, a = new Float32Array(N), i;
  for (i = 0; i < N; i++) a[i] = r() * 2 - 1;
  return function (x) {
    var j = flr(x), f = x - j, u = f * f * (3 - 2 * f);
    var A = a[(j % N + N) % N], B = a[((j + 1) % N + N) % N];
    return A + (B - A) * u;
  };
}

/* ─────────────────── 1. 색 ─────────────────── */
function hex2rgb(h) {
  h = String(h).replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  var n = parseInt(h, 16);
  if (isNaN(n)) return [230, 220, 203];
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}
function rgba(c, a) { return 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + r3(a) + ')'; }
function cmix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }

var PAL = {
  night: hex2rgb('#0E1119'), soot: hex2rgb('#1C2331'), ash: hex2rgb('#2B3346'),
  ember: hex2rgb('#FF9333'), core: hex2rgb('#FFE2A6'), deep: hex2rgb('#C1391A'),
  moon: hex2rgb('#9EB6D6'), firefly: hex2rgb('#C7DE7A'), soul: hex2rgb('#5FD9C4'),
  ink: hex2rgb('#E6DCCB')
};
/* 스파크 색은 이 7개로 고정한다. 계수정렬 키가 되기 때문에 늘리면 버킷이 는다. */
var SC = [PAL.core, PAL.ember, PAL.deep, PAL.firefly, PAL.moon, PAL.soul, PAL.ink];
var C_CORE = 0, C_EMBER = 1, C_DEEP = 2, C_FLY = 3, C_MOON = 4, C_SOUL = 5, C_INK = 6;
var NC = 7, NA = 8, NW = 3, NKEY = NC * NA * NW;
var A_LV = [0.14, 0.27, 0.40, 0.53, 0.66, 0.78, 0.90, 1.00];

var F_MONO = '"IBM Plex Mono","IBM Plex Sans KR",ui-monospace,SFMono-Regular,Menlo,monospace';

/* ─────────────────── 2. 스프라이트 캐시 ─────────────────── */
/* 파티클마다 createRadialGradient 를 부르면 죽는다. 한 장 만들어 재사용한다.
 * 색은 8단계로 뭉갠다 — 안 그러면 cmix 가 만든 실수 성분이 매 프레임 새 키가 된다. */
var SPR = {};
function qc(c) { return [c[0] & ~7, c[1] & ~7, c[2] & ~7]; }
function glowSprite(col, soft) {
  col = qc(col);
  var key = 'g' + col[0] + '_' + col[1] + '_' + col[2] + '_' + soft;
  if (SPR[key]) return SPR[key];
  var S = 48, cv = doc.createElement('canvas'); cv.width = cv.height = S;
  var c = cv.getContext('2d');
  var g = c.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, rgba(col, 1));
  g.addColorStop(soft, rgba(col, 0.40));
  g.addColorStop(1, rgba(col, 0));
  c.fillStyle = g; c.fillRect(0, 0, S, S);
  SPR[key] = cv; return cv;
}
function softSprite(col, a) {
  col = qc(col);
  var key = 's' + col[0] + '_' + col[1] + '_' + col[2] + '_' + a;
  if (SPR[key]) return SPR[key];
  var S = 64, cv = doc.createElement('canvas'); cv.width = cv.height = S;
  var c = cv.getContext('2d');
  var g = c.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, rgba(col, a));
  g.addColorStop(0.5, rgba(col, a * 0.42));
  g.addColorStop(1, rgba(col, 0));
  c.fillStyle = g; c.fillRect(0, 0, S, S);
  SPR[key] = cv; return cv;
}
/* 빛기둥 — 아래가 밝고 위로 사라지며 좌우가 무르다 */
function shaftSprite(col) {
  col = qc(col);
  var key = 'f' + col[0] + '_' + col[1] + '_' + col[2];
  if (SPR[key]) return SPR[key];
  var Wq = 32, Hq = 128, cv = doc.createElement('canvas'); cv.width = Wq; cv.height = Hq;
  var c = cv.getContext('2d');
  var g = c.createLinearGradient(0, Hq, 0, 0);
  g.addColorStop(0, rgba(col, 0.90));
  g.addColorStop(0.32, rgba(col, 0.40));
  g.addColorStop(1, rgba(col, 0));
  c.fillStyle = g; c.fillRect(0, 0, Wq, Hq);
  c.globalCompositeOperation = 'destination-in';
  var g2 = c.createLinearGradient(0, 0, Wq, 0);
  g2.addColorStop(0, 'rgba(0,0,0,0)');
  g2.addColorStop(0.5, 'rgba(0,0,0,1)');
  g2.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g2; c.fillRect(0, 0, Wq, Hq);
  SPR[key] = cv; return cv;
}

/* ─────────────────── 3. 풀 ─────────────────── */
/* free 리스트 스택. 꽉 차면 라운드로빈으로 한 칸 뺏는다 — 상한이 곧 프레임 보증이다. */
function Pool(cap, make) {
  var a = new Array(cap), free = new Int32Array(cap), fn = cap, rrc = 0, i, o;
  for (i = 0; i < cap; i++) { o = make(); o.i = i; o.on = false; a[i] = o; free[i] = i; }
  return {
    a: a, cap: cap, live: 0,
    free: function () { return fn; },
    load: function () { return 1 - fn / cap; },
    get: function () {
      var x;
      if (fn > 0) { x = a[free[--fn]]; this.live++; }
      else { x = a[rrc]; rrc = (rrc + 1) % cap; }
      x.on = true; x.age = 0;
      return x;
    },
    put: function (x) {
      if (!x.on) return;
      x.on = false; this.live--;
      if (fn < cap) free[fn++] = x.i;
    },
    clear: function () {
      fn = 0; this.live = 0; rrc = 0;
      for (var j = 0; j < cap; j++) { a[j].on = false; free[fn++] = j; }
    }
  };
}

/* ─────────────────── 4. 숫자 포맷 ─────────────────── */
var UNIT = ['K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No'];
function fmt(v) {
  v = +v || 0; if (v < 0) v = 0;
  if (v < 1000) return v < 10 ? (Math.round(v * 10) / 10 + '') : String(Math.round(v));
  var i = -1;
  while (v >= 1000 && i < UNIT.length - 1) { v /= 1000; i++; }
  return (v < 10 ? v.toFixed(2) : v < 100 ? v.toFixed(1) : String(Math.round(v))) + UNIT[i];
}

/* ─────────────────── 5. CSS ─────────────────── */
var CSSID = 'wl-fx-css';
function injectCSS() {
  if (doc.getElementById(CSSID)) return;
  var st = doc.createElement('style'); st.id = CSSID;
  st.textContent = [
'.wl-fx-host{position:relative}',
'canvas.wl-fx{position:absolute;left:0;top:0;width:100%;height:100%;display:block;pointer-events:none}',
'.wl-fx-dom{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:hidden;',
  'font-family:"IBM Plex Sans KR","Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif;font-weight:300;',
  '--fxink:#E6DCCB;--fxcold:rgba(158,182,214,.62);--fxmono:"IBM Plex Mono","IBM Plex Sans KR",ui-monospace,monospace}',

/* ── 배너 ── */
'.wl-fx-ribs{position:absolute;left:0;right:0;top:12.5%;display:flex;flex-direction:column;align-items:center;gap:5px}',
'.wl-fx-rib{display:flex;align-items:center;gap:9px;max-width:86%;',
  'padding:5px 15px 5px 11px;background:linear-gradient(90deg,rgba(20,26,38,.95),rgba(20,26,38,.55));',
  'border-left:3px solid var(--tn,#FF9333);color:var(--fxink);font-size:12.5px;line-height:1.35;letter-spacing:.005em;',
  'box-shadow:0 6px 20px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.045);',
  'clip-path:polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px));',
  'animation:wl-rib 2.9s cubic-bezier(.16,.9,.28,1) forwards;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
'.wl-fx-rib span{min-width:0;overflow:hidden;text-overflow:ellipsis}',
'.wl-fx-rib i{width:5px;height:5px;flex:none;background:var(--tn,#FF9333);transform:rotate(45deg);',
  'box-shadow:0 0 7px var(--tn,#FF9333)}',
'.wl-fx-rib b{font-weight:600;color:var(--tn,#FF9333);font-family:var(--fxmono);font-size:10px;',
  'letter-spacing:.10em;flex:none}',
'@keyframes wl-rib{',
  '0%{opacity:0;transform:translateY(-9px) scale(.96);clip-path:inset(0 100% 0 0)}',
  '9%{opacity:1;transform:translateY(0) scale(1);clip-path:inset(0 0 0 0)}',
  '84%{opacity:1;transform:translateY(0) scale(1);clip-path:inset(0 0 0 0)}',
  '100%{opacity:0;transform:translateY(-5px) scale(.99);clip-path:inset(0 0 0 0)}}',

/* ── 태그 (마일스톤) ── */
'.wl-fx-tag{position:absolute;transform:translate(-50%,-100%);text-align:center;white-space:nowrap;',
  'animation:wl-tag 1.9s cubic-bezier(.14,.86,.3,1) forwards}',
'.wl-fx-tag b{display:block;font-family:"Hahmlet","IBM Plex Sans KR",serif;font-weight:500;',
  'font-size:15px;letter-spacing:.01em;color:#FFE2A6;text-shadow:0 0 14px rgba(255,147,51,.7),0 2px 6px rgba(0,0,0,.9)}',
'.wl-fx-tag u{display:block;height:1px;margin:4px auto 0;background:linear-gradient(90deg,transparent,#FF9333,transparent);',
  'animation:wl-tagu .5s cubic-bezier(.16,.9,.28,1) forwards}',
'@keyframes wl-tag{0%{opacity:0;transform:translate(-50%,-86%) scale(.9)}',
  '14%{opacity:1;transform:translate(-50%,-100%) scale(1)}',
  '72%{opacity:1;transform:translate(-50%,-108%) scale(1)}',
  '100%{opacity:0;transform:translate(-50%,-128%) scale(1)}}',
'@keyframes wl-tagu{0%{width:0}100%{width:104%}}',

/* ── 보스 등장 ── */
'.wl-fx-boss{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;',
  'animation:wl-bossfade 3s linear forwards}',
'.wl-fx-boss .wash{position:absolute;inset:0;',
  'background:radial-gradient(58% 46% at 50% 50%,rgba(14,17,25,0) 0,rgba(14,17,25,.76) 78%),',
  'linear-gradient(90deg,rgba(193,57,26,.14),transparent 42%,transparent 58%,rgba(193,57,26,.14));',
  'animation:wl-bosswash 3s ease-out forwards}',
'.wl-fx-boss .bar{position:absolute;left:0;right:0;top:0;height:9.5%;background:linear-gradient(180deg,#0E1119,rgba(14,17,25,.55));',
  'transform-origin:top;animation:wl-bossbar .5s cubic-bezier(.12,.85,.3,1) forwards}',
'.wl-fx-boss .bar.b{top:auto;bottom:0;transform-origin:bottom;background:linear-gradient(0deg,#0E1119,rgba(14,17,25,.55))}',
'.wl-fx-boss .bar:after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;',
  'background:linear-gradient(90deg,transparent,rgba(193,57,26,.85),transparent)}',
'.wl-fx-boss .bar.b:after{bottom:auto;top:0}',
'.wl-fx-boss .txt{position:relative;text-align:center;padding:0 18px}',
'.wl-fx-boss .txt b{display:block;font-family:"Hahmlet","IBM Plex Sans KR",serif;font-weight:700;',
  'font-size:clamp(24px,5.4vw,52px);line-height:1.1;color:#E6DCCB;',
  'text-shadow:0 0 26px rgba(193,57,26,.85),0 0 60px rgba(193,57,26,.4),0 3px 10px rgba(0,0,0,.9);',
  'animation:wl-bossname 1.5s cubic-bezier(.14,.9,.24,1) forwards}',
'.wl-fx-boss .txt u{display:block;height:1px;width:0;margin:11px auto 10px;',
  'background:linear-gradient(90deg,transparent,#C1391A 22%,#FF9333 50%,#C1391A 78%,transparent);',
  'animation:wl-bossrule .8s .18s cubic-bezier(.16,.9,.28,1) forwards}',
'.wl-fx-boss .txt span{display:block;font-size:clamp(10px,1.5vw,13px);font-weight:300;',
  'letter-spacing:.30em;color:rgba(158,182,214,.82);text-indent:.30em;opacity:0;',
  'animation:wl-bosssub .9s .34s ease-out forwards}',
'@keyframes wl-bossfade{0%,92%{opacity:1}100%{opacity:0}}',
'@keyframes wl-bosswash{0%{opacity:0}12%{opacity:1}70%{opacity:1}100%{opacity:.25}}',
'@keyframes wl-bossbar{0%{transform:scaleY(0)}100%{transform:scaleY(1)}}',
'@keyframes wl-bossname{0%{opacity:0;letter-spacing:.42em;transform:scale(1.06)}',
  '42%{opacity:1;letter-spacing:.06em;transform:scale(1)}',
  '100%{opacity:1;letter-spacing:.02em;transform:scale(1)}}',
'@keyframes wl-bossrule{0%{width:0}100%{width:100%}}',
'@keyframes wl-bosssub{0%{opacity:0;transform:translateY(6px)}100%{opacity:1;transform:translateY(0)}}',

/* ── 제한시간 경고 ── */
'.wl-fx-warn{position:absolute;left:50%;top:3.2%;transform:translateX(-50%);display:flex;align-items:center;gap:8px;',
  'padding:4px 13px 4px 10px;background:linear-gradient(180deg,rgba(20,26,38,.92),rgba(20,26,38,.66));',
  'clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px));',
  'box-shadow:0 4px 16px rgba(0,0,0,.5);transition:box-shadow .3s}',
'.wl-fx-warn .ring{width:8px;height:8px;flex:none;border-radius:50%;background:#FF9333;',
  'box-shadow:0 0 8px #FF9333;animation:wl-warnpip 1.4s ease-in-out infinite}',
'.wl-fx-warn .num{font-family:var(--fxmono);font-weight:600;font-size:14px;font-variant-numeric:tabular-nums;',
  'letter-spacing:.04em;color:#FFE2A6}',
'.wl-fx-warn em{font-style:normal;font-size:9.5px;letter-spacing:.16em;color:var(--fxcold)}',
'.wl-fx-warn.hot{box-shadow:0 4px 16px rgba(0,0,0,.5),0 0 0 1px rgba(193,57,26,.5)}',
'.wl-fx-warn.hot .ring{background:#C1391A;box-shadow:0 0 10px #C1391A;animation-duration:.46s}',
'.wl-fx-warn.hot .num{color:#FF9333}',
'@keyframes wl-warnpip{0%,100%{transform:scale(.72);opacity:.55}50%{transform:scale(1.18);opacity:1}}',
'.wl-fx-in{animation:wl-popin .42s cubic-bezier(.14,.9,.26,1)}',
'@keyframes wl-popin{0%{opacity:0;transform:translateX(-50%) translateY(-10px)}',
  '100%{opacity:1;transform:translateX(-50%) translateY(0)}}',

/* ── 수치 흡수 펄스 (coins 도착) ── */
'.wl-fx-pop{animation:wl-pop .34s cubic-bezier(.2,.9,.25,1)}',
'@keyframes wl-pop{0%{transform:scale(1)}38%{transform:scale(1.13)}100%{transform:scale(1)}}',

'@media(max-width:560px){',
  '.wl-fx-rib{font-size:11.5px;padding:4px 12px 4px 9px}',
  '.wl-fx-tag b{font-size:13px}',
  '.wl-fx-warn .num{font-size:12.5px}}',

'@media(prefers-reduced-motion:reduce){',
  '.wl-fx-rib,.wl-fx-tag,.wl-fx-boss,.wl-fx-boss .txt b,.wl-fx-boss .txt u,.wl-fx-boss .txt span,',
  '.wl-fx-boss .bar,.wl-fx-boss .wash,.wl-fx-in,.wl-fx-pop{animation-duration:.01ms!important;',
  'animation-iteration-count:1!important}',
  '.wl-fx-rib{animation:wl-ribrm 2.6s linear forwards!important}',
  '@keyframes wl-ribrm{0%{opacity:0}6%{opacity:1}88%{opacity:1}100%{opacity:0}}',
  '.wl-fx-tag{animation:wl-tagrm 1.8s linear forwards!important}',
  '@keyframes wl-tagrm{0%{opacity:0}8%{opacity:1}84%{opacity:1}100%{opacity:0}}',
  '.wl-fx-boss{animation:wl-bossrm 2.9s linear forwards!important}',
  '@keyframes wl-bossrm{0%{opacity:0}6%{opacity:1}90%{opacity:1}100%{opacity:0}}',
  '.wl-fx-boss .txt u{width:100%!important}',
  '.wl-fx-boss .txt span{opacity:1!important}',
  '.wl-fx-warn .ring{animation:none!important}}'
  ].join('');
  (doc.head || doc.documentElement).appendChild(st);
}

/* ─────────────────── 6. 타격 종류 ─────────────────── */
/* spd·vy·g 는 전부 Ht 배수다. 무대가 커지면 타격도 같이 커져야 한다. */
var KINDS = {
  claw:  { n: [11, 16], spd: [0.30, 0.86], life: [0.20, 0.42], wi: [0, 1], grav: 0.9,
           col: [C_CORE, C_EMBER, C_EMBER, C_DEEP], cone: 0, dir: null,
           marks: 3, ring: 0, shake: 0.15, tl: [0.030, 0.056] },
  bite:  { n: [9, 14],  spd: [0.20, 0.62], life: [0.22, 0.50], wi: [1, 2], grav: 1.5,
           col: [C_CORE, C_EMBER, C_DEEP, C_DEEP], cone: 0, dir: null,
           marks: 0, ring: 0.52, shake: 0.23, jaw: 1, tl: [0.028, 0.050] },
  peck:  { n: [6, 10],  spd: [0.55, 1.15], life: [0.11, 0.24], wi: [0, 0], grav: 0.35,
           col: [C_CORE, C_CORE, C_MOON, C_EMBER], cone: 0.44, dir: -0.34,
           marks: 0, ring: 0.24, shake: 0.09, tl: [0.042, 0.068] },
  stomp: { n: [16, 24], spd: [0.26, 0.80], life: [0.28, 0.62], wi: [1, 2], grav: 2.6,
           col: [C_EMBER, C_DEEP, C_DEEP, C_INK], cone: 0, dir: null, low: 1,
           marks: 0, ring: 0.92, flat: 0.30, dust: 4, shake: 0.44, tl: [0.024, 0.044] },
  auto:  { n: [3, 5],   spd: [0.16, 0.44], life: [0.10, 0.22], wi: [0, 0], grav: 0.5,
           col: [C_FLY, C_FLY, C_CORE], cone: 0, dir: null,
           marks: 0, ring: 0, shake: 0.04, tl: [0.018, 0.032] }
};

/* 숫자 형태 — 일반 / 치명 / 자동 / 보스 / 합산 */
var S_NORM = 0, S_CRIT = 1, S_AUTO = 2, S_BOSS = 3, S_STREAM = 4;
var NST = [
  { sz: 1.00, col: C_INK,   glow: 0,    ttl: 0.78, vy: -0.115, g: 0.34, dx: 0.050, wt: '600', rot: 0.00, pop: 0.16 },
  { sz: 1.66, col: C_CORE,  glow: 0.90, ttl: 1.04, vy: -0.152, g: 0.30, dx: 0.072, wt: '600', rot: 0.11, pop: 0.54 },
  { sz: 0.76, col: C_FLY,   glow: 0,    ttl: 0.54, vy: -0.092, g: 0.22, dx: 0.028, wt: '500', rot: 0.00, pop: 0.10 },
  { sz: 1.36, col: C_EMBER, glow: 0.58, ttl: 0.96, vy: -0.100, g: 0.26, dx: 0.040, wt: '600', rot: 0.05, pop: 0.32 },
  { sz: 1.48, col: C_FLY,   glow: 0.42, ttl: 0.94, vy: -0.074, g: 0.14, dx: 0.020, wt: '600', rot: 0.00, pop: 0.24 }
];

var RIB = { zone: C_MOON, good: C_FLY, bad: C_DEEP, gold: C_CORE };
var RIBTAG = { zone: '지역', good: '획득', bad: '경고', gold: '보상' };

/* ─────────────────── 7. 레이어 ─────────────────── */
function Layer(host, opts) {
  opts = opts || {};
  var F = {};
  injectCSS();

  /* ---- DOM ---- */
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  host.classList.add('wl-fx-host');
  var cv = doc.createElement('canvas'); cv.className = 'wl-fx';
  var dom = doc.createElement('div'); dom.className = 'wl-fx-dom';
  cv.setAttribute('aria-hidden', 'true');
  dom.setAttribute('aria-hidden', 'true');
  var zc = opts.zIndex == null ? 4 : opts.zIndex | 0;
  cv.style.zIndex = zc; dom.style.zIndex = zc + 1;
  host.appendChild(cv); host.appendChild(dom);
  var ctx = cv.getContext('2d');
  var elRibs = doc.createElement('div'); elRibs.className = 'wl-fx-ribs'; dom.appendChild(elRibs);
  var elWarn = null, elBoss = null;

  /* ---- 상태 ---- */
  var seed = opts.seed == null ? 20260914 : opts.seed | 0;
  var nz = makeNoise(seed), nz2 = makeNoise(seed ^ 0x5bf03635);
  var Wd = 0, Ht = 0, dpr = 1, U = 14, mobile = false;
  var t = 0, lastT = 0, raf = 0, paused = false, dead = false;
  var mql = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var RM = opts.reduced != null ? !!opts.reduced : !!(mql && mql.matches);
  var driveFire = opts.driveFire !== false;

  var camX = 0, camY = 0, shakeMag = 0, shakeT = 0;
  var flashT = 0, flashDur = 0, flashCol = PAL.core, flashPow = 0;
  var warnLeft = 0, warnTot = 0, warnStr = '', warnHot = false;
  var autoHeat = 0, autoX = 0, autoY = 0, autoPulse = 0;
  var fps = 60, frames = 0;
  var timers = [];

  /* ---- 풀 ---- */
  var pNum = Pool(30, function () { return { x:0,y:0,vx:0,vy:0,g:0,age:0,ttl:1,txt:'',st:0,ci:0,glow:0,size:12,tw:10,rot:0,rv:0,pop:0,mult:0,wt:'600' }; });
  var pSpk = Pool(460, function () { return { x:0,y:0,vx:0,vy:0,g:0,age:0,ttl:1,ci:0,wi:0,tl:0.02,drag:0.08,wob:0,wph:0,a0:1,_a:0,_k:0 }; });
  var pPuf = Pool(26, function () { return { x:0,y:0,vx:0,vy:0,age:0,ttl:1,sz:10,ci:0,a0:1 }; });
  var pRng = Pool(12, function () { return { x:0,y:0,r0:0,r1:0,age:0,ttl:1,ci:0,w:2,flat:1,a0:1 }; });
  var pClw = Pool(22, function () { return { x:0,y:0,ang:0,len:10,n:3,w:2,gap:4,bow:0,rev:0.11,age:0,ttl:1,ci:0,jit:new Float32Array(6) }; });
  var pStr = Pool(64, function () { return { x:0,y:0,w:10,h:3,vx:0,vy:0,age:0,ttl:1,dly:0,col:PAL.soot,rim:PAL.ember,flash:0,sx:1,rot:0,rv:0 }; });
  var pCon = Pool(30, function () { return { x:0,y:0,vx:0,vy:0,tx:0,ty:0,px:0,py:0,cx:0,cy:0,age:0,ttl:1,dly:0,ph:0,rot:0,rv:0,sz:8,sz2:1,t1:0,el:null }; });
  var pShf = Pool(6,  function () { return { x:0,y:0,w:10,h:40,age:0,ttl:1,ci:0,a0:1 }; });
  var POOLS = [pNum, pSpk, pPuf, pRng, pClw, pStr, pCon, pShf];

  /* 계수정렬 버킷 — 스파크를 색×투명도×굵기로 뭉쳐 stroke 를 수십 번으로 줄인다 */
  var skCnt = new Int32Array(NKEY + 1), skOrd = new Int32Array(pSpk.cap);

  /* 숫자 분산용 최근 위치 링 */
  var RC = 16, recent = [], rci = 0, _pt = { x: 0, y: 0 };
  (function () { for (var i = 0; i < RC; i++) recent.push({ x: -1e5, y: -1e5, t: -99 }); })();

  /* 자동터치 집계 */
  var MERGE_RATE = 8;
  var atBuf = new Float32Array(48), atI = 0;
  (function () { for (var i = 0; i < 48; i++) atBuf[i] = -99; })();
  var merged = false;
  var acc = { sum: 0, n: 0, x: 0, y: 0, crit: false, boss: false, t0: 0, last: -99 };

  var refLog = 0, refInit = false;

  /* ---- 치수 ---- */
  function resize() {
    var rect = host.getBoundingClientRect();
    var w = max(1, Math.round(rect.width));
    var h = max(1, Math.round(rect.height || w * 0.56));
    mobile = w < 560;
    var d = min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    if (w === Wd && h === Ht && d === dpr) return;
    Wd = w; Ht = h; dpr = d;
    cv.width = Math.round(w * d); cv.height = Math.round(h * d);
    ctx.setTransform(d, 0, 0, d, 0, 0);
    U = clamp(Ht * 0.036, 11, 25);
  }

  function numLimit() { return RM ? 10 : mobile ? 14 : 24; }
  function budget() {
    var l = pSpk.load();
    var b = l > 0.84 ? 0.30 : l > 0.62 ? 0.62 : 1;
    return b * (mobile ? 0.70 : 1);
  }
  function fireV() { return (W.Scene && W.Scene.fire) ? W.Scene.fire() : 1; }
  function after(sec, fn) { timers.push({ t: sec, fn: fn }); wake(); }

  /* ─────────────────── 8. 생성기 ─────────────────── */

  function spark(x, y, ang, spd, life, ci, wi, grav, tl) {
    var s = pSpk.get();
    s.x = x; s.y = y;
    s.vx = cos(ang) * spd; s.vy = sin(ang) * spd;
    s.ttl = life; s.g = grav; s.ci = ci; s.wi = wi;
    s.tl = tl; s.drag = 0.10; s.wob = 0; s.wph = rnd() * TAU; s.a0 = 1;
    return s;
  }
  function puff(x, y, sz, ci, a0, ttl, vy) {
    var p = pPuf.get();
    p.x = x; p.y = y; p.sz = sz; p.ci = ci; p.a0 = a0; p.ttl = ttl;
    p.vx = rr(-1, 1) * Ht * 0.05; p.vy = vy;
    return p;
  }
  function ring(x, y, r0, r1, ttl, ci, w, flat, a0) {
    var r = pRng.get();
    r.x = x; r.y = y; r.r0 = r0; r.r1 = r1; r.ttl = RM ? ttl * 0.7 : ttl;
    r.ci = ci; r.w = w; r.flat = flat == null ? 1 : flat; r.a0 = a0 == null ? 1 : a0;
    return r;
  }
  function shaft(x, y, w, h, ttl, ci, a0) {
    var s = pShf.get();
    s.x = x; s.y = y; s.w = w; s.h = h; s.ttl = ttl; s.ci = ci; s.a0 = a0 == null ? 1 : a0;
    return s;
  }
  function clawMark(x, y, ang, len, n, wid, ci, ttl) {
    var k = pClw.get(), i;
    k.x = x; k.y = y; k.ang = ang; k.len = len; k.n = n; k.w = wid; k.ci = ci;
    k.ttl = RM ? ttl * 0.7 : ttl;
    k.gap = wid * 2.5 + len * 0.055;
    k.bow = len * rr(0.05, 0.12) * sgn();
    k.rev = RM ? 0.02 : 0.105;
    for (i = 0; i < 6; i++) k.jit[i] = rnd();
    return k;
  }

  /* 숫자를 겹치지 않게 놓는다. 최근 0.42초 안에 뜬 숫자들과 거리를 재고
   * 가로 레인을 한 칸씩 밀어본다. 자리가 없으면 제일 덜 겹치는 칸에 둔다. */
  var OFFS = [0, -1, 1, -0.55, 0.55, -1.55, 1.55, -2.1, 2.1, -2.65, 2.65];
  function place(x, y, w, h) {
    var bx = x, by = y, bs = -1, k, j;
    for (k = 0; k < OFFS.length; k++) {
      var cx = x + OFFS[k] * w * 0.80;
      var cy = y - abs(OFFS[k]) * h * 0.34;
      var s = 1e9;
      for (j = 0; j < RC; j++) {
        var r = recent[j];
        if (t - r.t > 0.42) continue;
        var dx = (cx - r.x) / w, dy = (cy - r.y) / h;
        var d = dx * dx + dy * dy;
        if (d < s) s = d;
      }
      if (s >= 1) { bx = cx; by = cy; bs = s; break; }
      if (s > bs) { bs = s; bx = cx; by = cy; }
    }
    var rc = recent[rci]; rci = (rci + 1) % RC;
    rc.x = bx; rc.y = by; rc.t = t;
    var hw = w * 0.5 + U * 0.25;
    _pt.x = Wd > hw * 2 ? clamp(bx, hw, Wd - hw) : Wd * 0.5;
    _pt.y = clamp(by, h * 0.7, Ht - h * 0.35);
  }

  function magFactor(a) {
    if (!(a > 0)) return 1;
    var L = lg(a + 1) / Math.LN10;
    if (!refInit) { refLog = L; refInit = true; }
    var f = clamp(1 + (L - refLog) * 0.34, 0.80, 1.48);
    refLog += (L - refLog) * 0.055;
    return f;
  }
  function reapNum() {
    var a = pNum.a, b = -1, ba = -1;
    for (var i = 0; i < a.length; i++) if (a[i].on && a[i].age > ba) { ba = a[i].age; b = i; }
    if (b >= 0) pNum.put(a[b]);
  }

  function spawnNum(x, y, txt, style, amount, mult) {
    var st = NST[style];
    if (pNum.live >= numLimit()) reapNum();
    var n = pNum.get();
    var f = magFactor(amount);
    n.size = U * st.sz * (style === S_STREAM || style === S_AUTO ? 1 : f);
    /* 실제 글자 폭을 여기서 한 번만 잰다. 배치·클램프·장식이 전부 이 값을 쓰고,
     * 매 프레임 measureText 하던 것도 없어진다. */
    ctx.font = st.wt + ' ' + r3(n.size) + 'px ' + F_MONO;
    n.tw = ctx.measureText(txt).width;
    var boxW = n.tw + (mult > 1 ? n.size * 0.9 : 0) + n.size * 0.45;
    place(x, y, boxW, n.size * 1.5);
    n.x = _pt.x; n.y = _pt.y;
    n.vx = rr(-1, 1) * Ht * st.dx;
    n.vy = Ht * st.vy * rr(0.92, 1.08);
    n.g = Ht * st.g;
    n.ttl = st.ttl * (RM ? 0.74 : 1);
    n.txt = txt; n.st = style; n.ci = st.col; n.glow = st.glow;
    n.pop = RM ? st.pop * 0.28 : st.pop;
    n.rot = 0; n.rv = RM ? 0 : rr(-1, 1) * st.rot;
    n.mult = mult || 0; n.wt = st.wt;
    wake();
    return n;
  }

  /* 타격 스파크 — 종류마다 형태가 다르다 */
  function emit(x, y, kn, power, crit) {
    var K = KINDS[kn] || KINDS.claw, i, a, sp, wi;
    var bq = budget();
    var n = Math.round(rr(K.n[0], K.n[1]) * power * (crit ? 1.7 : 1) * (RM ? 0.38 : 1) * bq);
    var base = K.dir != null ? K.dir : rr(0, TAU);
    var fv = 0.86 + fireV() * 0.14;

    for (i = 0; i < n; i++) {
      if (K.cone) a = base + rr(-1, 1) * K.cone;
      else if (K.low) a = -PI * 0.5 + rr(-1, 1) * 1.18;           /* 지면 타격은 위로 낮게 퍼진다 */
      else a = rr(0, TAU);
      sp = rr(K.spd[0], K.spd[1]) * Ht * (crit ? 1.28 : 1);
      wi = K.wi[0] + ((rnd() * (K.wi[1] - K.wi[0] + 1)) | 0);
      var s = spark(x + rr(-1, 1) * U * 0.55, y + rr(-1, 1) * U * 0.55, a, sp,
        rr(K.life[0], K.life[1]) * (RM ? 0.7 : 1),
        crit && i % 4 === 0 ? C_CORE : K.col[(rnd() * K.col.length) | 0],
        min(wi, NW - 1), Ht * K.grav, rr(K.tl[0], K.tl[1]));
      s.a0 = fv;
    }

    /* 발톱 — 짧은 자상 3줄 */
    if (K.marks) {
      var ma = rr(-0.95, -0.42) * (rnd() < 0.5 ? 1 : -1);
      clawMark(x, y, ma, U * rr(1.5, 2.1) * (crit ? 1.35 : 1), crit ? 4 : 3,
        U * 0.10 * (crit ? 1.3 : 1), crit ? C_CORE : C_EMBER, 0.34);
    }
    /* 이빨 — 맞물리는 턱 두 짝 */
    if (K.jaw && !RM) {
      var ja = rr(0, TAU);
      ring(x, y, U * 1.5, U * 0.45, 0.28, C_DEEP, U * 0.30, 1, 0.8);
      for (i = 0; i < 2; i++) {
        clawMark(x + cos(ja + i * PI) * U * 0.75, y + sin(ja + i * PI) * U * 0.75,
          ja + i * PI + PI * 0.5, U * 1.25, 2, U * 0.13, C_CORE, 0.26);
      }
    }
    /* 밟기 — 지면에 납작한 고리 + 먼지 기둥 */
    if (K.dust) {
      var dn = Math.round(K.dust * bq * (RM ? 0.4 : 1) * (mobile ? 0.6 : 1));
      for (i = 0; i < dn; i++) {
        puff(x + rr(-1, 1) * U * 1.6, y + rr(-0.2, 0.5) * U, U * rr(1.1, 2.0),
          rnd() < 0.4 ? C_EMBER : C_INK, rr(0.10, 0.20), rr(0.5, 0.95), -Ht * rr(0.04, 0.11));
      }
    }
    if (K.ring) {
      ring(x, y, U * 0.4, U * K.ring * 3.2 * (crit ? 1.35 : 1), K.flat ? 0.46 : 0.36,
        crit ? C_CORE : C_EMBER, U * 0.16, K.flat || 1, 0.9);
    }
    if (crit) ring(x, y, U * 0.3, U * 3.4, 0.34, C_CORE, U * 0.14, 1, 0.80);
    var sk = K.shake * (crit ? 1.9 : 1) * clamp(power, 0.6, 1.6);
    if (sk > 0.02) F.shake(sk);
  }

  /* ─────────────────── 9. 자동터치 합산 ─────────────────── */
  /* 초당 15~25 발이 꽂히는데 숫자를 하나씩 띄우면 화면이 숫자 죽이 된다.
   * 초당 8발을 넘는 순간 개별 숫자를 끄고, 0.4초치를 모아 하나로 터뜨린다.
   * 그동안 손맛은 밀도 높은 스파크가 책임진다. */
  function autoRate() {
    var c = 0;
    for (var i = 0; i < 48; i++) if (t - atBuf[i] < 0.70) c++;
    return c / 0.70;
  }
  function flushAcc() {
    if (acc.n <= 0) { acc.t0 = t; return; }
    var n = spawnNum(acc.x, acc.y, fmt(acc.sum), acc.crit ? S_CRIT : S_STREAM, acc.sum, acc.n);
    if (acc.boss) n.ci = C_EMBER;
    ring(acc.x, acc.y, U * 0.4, U * 2.7, 0.34, C_FLY, U * 0.12, 1, 0.65);
    acc.sum = 0; acc.n = 0; acc.crit = false; acc.boss = false; acc.t0 = t;
  }
  function emitAutoDense(x, y, crit) {
    var bq = budget(), i;
    var n = Math.round((crit ? 7 : 3) * bq * (RM ? 0.4 : 1));
    for (i = 0; i < n; i++) {
      var s = spark(x + rr(-1, 1) * U * 0.6, y + rr(-1, 1) * U * 0.6, rr(0, TAU),
        rr(0.10, 0.38) * Ht, rr(0.07, 0.18) * (RM ? 0.7 : 1),
        rnd() < 0.22 ? C_CORE : C_FLY, 0, Ht * 0.5, rr(0.010, 0.021));
      s.a0 = 0.92;
    }
    if (t - autoPulse > 0.11 && !RM) {
      autoPulse = t;
      ring(x, y, U * 0.25, U * rr(1.0, 1.8), 0.20, C_FLY, U * 0.075, 1, 0.45);
    }
  }
  function autoHit(x, y, amount, crit, boss) {
    atBuf[atI] = t; atI = (atI + 1) % 48;
    autoX = autoX ? lerp(autoX, x, 0.40) : x;
    autoY = autoY ? lerp(autoY, y, 0.40) : y;
    autoHeat = min(1, autoHeat + 0.10);

    if (autoRate() >= MERGE_RATE) {
      if (!merged) { merged = true; acc.t0 = t; }
      acc.sum += amount; acc.n++; acc.last = t;
      acc.x = acc.n === 1 ? x : lerp(acc.x, x, 0.40);
      acc.y = acc.n === 1 ? y : lerp(acc.y, y, 0.40);
      if (crit) acc.crit = true;
      if (boss) acc.boss = true;
      emitAutoDense(x, y, crit);
      if (t - acc.t0 >= 0.40 || acc.n >= 28) flushAcc();
      if (crit) F.shake(0.06);
    } else {
      if (merged) { merged = false; flushAcc(); }
      spawnNum(x, y, fmt(amount), crit ? S_CRIT : S_AUTO, amount, 0);
      emit(x, y, 'auto', 1, crit);
    }
    wake();
  }

  /* ─────────────────── 10. 공개 이펙트 ─────────────────── */

  F.hit = function (x, y, o) {
    o = o || {};
    x = +x || 0; y = +y || 0;
    var amount = +o.amount || 0, crit = !!o.crit, boss = !!o.boss;
    var kind = KINDS[o.kind] ? o.kind : 'claw';
    if (kind === 'auto') { autoHit(x, y, amount, crit, boss); return F; }

    spawnNum(x, y, fmt(amount), crit ? S_CRIT : boss ? S_BOSS : S_NORM, amount, 0);
    emit(x, y, kind, boss ? 1.3 : 1, crit);
    if (boss) ring(x, y, U * 0.5, U * 3.4, 0.36, C_DEEP, U * 0.11, 1, 0.42);
    if (crit) autoFlash(boss ? PAL.deep : PAL.core, 100, boss ? 0.22 : 0.18);
    return F;
  };

  F.tap = function (x, y, o) {
    o = o || {};
    x = +x || 0; y = +y || 0;
    var crit = !!o.crit, i;
    var n = crit ? 5 : 3 + ((rnd() * 2) | 0);
    var ang = rr(-1.05, -0.50) * sgn();
    var len = U * rr(2.6, 3.5) * (crit ? 1.28 : 1);
    clawMark(x, y, ang, len, n, U * 0.115 * (crit ? 1.30 : 1),
      crit ? C_CORE : C_EMBER, crit ? 0.46 : 0.38);
    var bq = budget(), m = Math.round((crit ? 13 : 7) * bq * (RM ? 0.4 : 1));
    for (i = 0; i < m; i++) {
      spark(x + rr(-1, 1) * len * 0.34, y + rr(-1, 1) * len * 0.30,
        ang + PI * 0.5 * sgn() + rr(-0.5, 0.5), rr(0.16, 0.54) * Ht,
        rr(0.13, 0.30) * (RM ? 0.7 : 1), rnd() < 0.30 ? C_CORE : C_EMBER,
        rnd() < 0.5 ? 0 : 1, Ht * 1.0, rr(0.026, 0.046));
    }
    ring(x, y, U * 0.3, U * (crit ? 2.7 : 1.8), crit ? 0.34 : 0.26,
      crit ? C_CORE : C_EMBER, U * 0.10, 1, crit ? 0.9 : 0.5);
    F.shake(crit ? 0.20 : 0.09);
    wake();
    return F;
  };

  F.poof = function (x, y, palette) {
    x = +x || 0; y = +y || 0;
    var opt = (palette && typeof palette === 'object' && !palette.length) ? palette : null;
    var cols = normPal(opt ? opt.colors : palette);
    var hh = opt && opt.h ? +opt.h : U * 4.4;
    var ww = opt && opt.w ? +opt.w : hh * 0.70;
    var N = RM ? 7 : mobile ? 9 : 13;
    var y0 = y + hh * 0.5, i, s;
    for (i = 0; i < N; i++) {
      var f = i / (N - 1);
      s = pStr.get();
      s.h = hh / N * 1.08;
      s.w = ww * silW(f) * rr(0.90, 1.08);
      s.x = x + rr(-1, 1) * ww * 0.04;
      s.y = y0 - f * hh - s.h * 0.5;
      s.vy = -(0.13 + f * 0.27) * Ht * (RM ? 0.42 : 1);
      s.vx = (i % 2 ? 1 : -1) * rr(0.018, 0.090) * Ht * (RM ? 0.3 : 1);
      s.dly = (1 - f) * 0.055 + rr(0, 0.035);
      s.ttl = rr(0.62, 0.94) * (RM ? 0.68 : 1);
      s.col = cmix(cols[i % cols.length], PAL.soot, 0.34);
      s.rim = cmix(PAL.ember, PAL.core, rnd() * 0.55);
      s.flash = 1; s.sx = 1; s.rot = 0;
      s.rv = RM ? 0 : rr(-1, 1) * 0.9;
    }
    var bq = budget(), m = RM ? 4 : Math.round(11 * bq);
    for (i = 0; i < m; i++) {
      var sp = spark(x + rr(-1, 1) * ww * 0.45, y0 - rnd() * hh, -PI * 0.5 + rr(-0.45, 0.45),
        rr(0.08, 0.26) * Ht, rr(0.55, 1.05) * (RM ? 0.55 : 1), C_SOUL, 0, -Ht * 0.06, rr(0.030, 0.060));
      sp.wob = Ht * 0.05; sp.drag = 0.5;
    }
    ring(x, y, U * 0.5, U * 3.2, 0.42, C_SOUL, U * 0.13, 1.25, 0.70);
    if (!RM) puff(x, y0 - hh * 0.3, ww * 1.1, C_SOUL, 0.12, 0.75, -Ht * 0.05);
    F.shake(0.16);
    autoFlash(PAL.soul, 110, 0.13);
    wake();
    return F;
  };

  F.coins = function (fx, fy, toEl, n) {
    fx = +fx || 0; fy = +fy || 0;
    var r = rectIn(toEl);
    var tx = r ? r.x : Wd * 0.5, ty = r ? r.y : Ht * 0.05;
    n = clamp(n | 0 || 8, 1, 60);
    var m = min(n, RM ? 5 : mobile ? 9 : 14), i;
    for (i = 0; i < m; i++) {
      var c = pCon.get();
      c.x = c.px = fx; c.y = c.py = fy;
      c.tx = tx; c.ty = ty;
      c.vx = rr(-1, 1) * Ht * 0.30;
      c.vy = -rr(0.22, 0.48) * Ht;
      c.dly = i * 0.042 + rr(0, 0.03);
      c.ph = 0; c.t1 = 0; c.sz2 = 1;
      c.ttl = RM ? 0.40 : rr(0.50, 0.64);
      c.rot = rr(0, TAU); c.rv = RM ? 0 : rr(-1, 1) * 3.0;
      c.sz = U * rr(0.48, 0.66);
      c.el = toEl || null;
    }
    wake();
    return F;
  };

  F.levelUp = function (el) {
    var r = rectIn(el);
    var x = r ? r.x : Wd * 0.5, y = r ? r.y : Ht * 0.62;
    var rad = r ? max(U * 1.6, max(r.w, r.h) * 0.5) : U * 2.4;
    ring(x, y, rad * 0.35, rad * 2.1, 0.52, C_EMBER, U * 0.18, 1, 0.95);
    after(0.09, function () { ring(x, y, rad * 0.25, rad * 2.9, 0.62, C_CORE, U * 0.11, 1, 0.65); });
    shaft(x, y + rad * 0.6, rad * 1.6, rad * 4.2, 0.62, C_EMBER, 0.55);
    var bq = budget(), m = RM ? 5 : Math.round(15 * bq), i;
    for (i = 0; i < m; i++) {
      var s = spark(x + rr(-1, 1) * rad * 0.85, y + rr(-0.2, 0.9) * rad,
        -PI * 0.5 + rr(-0.35, 0.35), rr(0.10, 0.30) * Ht,
        rr(0.45, 0.85) * (RM ? 0.55 : 1), rnd() < 0.3 ? C_CORE : C_FLY, 0, -Ht * 0.04, rr(0.025, 0.05));
      s.wob = Ht * 0.045; s.drag = 0.45;
    }
    autoFlash(PAL.ember, 130, 0.15);
    F.shake(0.10);
    wake();
    return F;
  };

  F.milestone = function (el, text) {
    var r = rectIn(el);
    var x = r ? r.x : Wd * 0.5, y = r ? r.y - r.h * 0.46 : Ht * 0.42, i;
    var tag = mk('div', 'wl-fx-tag', null);
    var b = mk('b', null, tag); b.textContent = text == null ? '' : String(text);
    mk('u', null, tag);
    tag.style.left = r3(clamp(x, Wd * 0.13, Wd * 0.87)) + 'px';
    tag.style.top = r3(clamp(y, U * 2.4, Ht * 0.94)) + 'px';
    dom.appendChild(tag);
    var kill = function () { if (tag.parentNode) tag.parentNode.removeChild(tag); };
    tag.addEventListener('animationend', function (e) { if (e.target === tag) kill(); });
    after(2.4, kill);

    ring(x, y, U * 0.4, U * 3.4, 0.55, C_CORE, U * 0.13, 1, 0.85);
    shaft(x, y + U * 1.3, U * 3.0, U * 7.0, 0.70, C_CORE, 0.38);
    var bq = budget(), m = RM ? 5 : Math.round(16 * bq);
    for (i = 0; i < m; i++) {
      var s = spark(x + rr(-1, 1) * U * 2.2, y + rr(-0.5, 0.5) * U, rr(0, TAU),
        rr(0.12, 0.42) * Ht, rr(0.35, 0.75) * (RM ? 0.55 : 1),
        rnd() < 0.4 ? C_CORE : C_EMBER, rnd() < 0.5 ? 0 : 1, Ht * 0.35, rr(0.020, 0.042));
      s.drag = 0.6;
    }
    autoFlash(PAL.core, 140, 0.17);
    wake();
    return F;
  };

  function clearBoss() {
    if (elBoss && elBoss.parentNode) elBoss.parentNode.removeChild(elBoss);
    elBoss = null;
  }
  F.bossIntro = function (name, sub) {
    clearBoss();
    var b = mk('div', 'wl-fx-boss', null);
    mk('div', 'wash', b);
    mk('div', 'bar', b);
    mk('div', 'bar b', b);
    var txt = mk('div', 'txt', b);
    var nb = mk('b', null, txt); nb.textContent = name == null ? '' : String(name);
    mk('u', null, txt);
    var sp = mk('span', null, txt); sp.textContent = sub == null ? '' : String(sub);
    dom.appendChild(b); elBoss = b;
    b.addEventListener('animationend', function (e) { if (e.target === b) clearBoss(); });
    after(3.3, clearBoss);

    F.shake(0.52);
    F.flash(PAL.deep, 240, 0.30);
    ring(Wd * 0.5, Ht * 0.5, U * 1, max(Wd, Ht) * 0.64, 0.95, C_DEEP, U * 0.30, 1, 0.50);
    after(0.11, function () { ring(Wd * 0.5, Ht * 0.5, U * 1, max(Wd, Ht) * 0.50, 0.80, C_EMBER, U * 0.16, 1, 0.32); });
    /* 어둠에서 무언가가 걸어나온다 — 오른쪽에서 재가 쓸려온다 */
    var bq = budget(), m = RM ? 6 : Math.round(28 * bq), i;
    for (i = 0; i < m; i++) {
      var s = spark(Wd * rr(0.86, 1.04), Ht * rr(0.18, 0.92), PI + rr(-0.30, 0.30),
        rr(0.20, 0.62) * Ht, rr(0.5, 1.1) * (RM ? 0.5 : 1),
        rnd() < 0.3 ? C_DEEP : C_EMBER, rnd() < 0.5 ? 0 : 1, -Ht * 0.02, rr(0.030, 0.055));
      s.drag = 0.55;
    }
    wake();
    return F;
  };

  function hideWarn() {
    warnLeft = 0; warnTot = 0; warnHot = false; warnStr = '';
    if (elWarn && elWarn.parentNode) elWarn.parentNode.removeChild(elWarn);
    elWarn = null;
    if (droveFire) { droveFire = false; scSetFire(null); }
  }
  F.bossWarn = function (sec) {
    var s = +sec;
    if (!(s > 0)) { hideWarn(); return F; }
    if (warnLeft <= 0) warnTot = s; else warnTot = max(warnTot, s);
    warnLeft = s;
    if (!elWarn) {
      elWarn = mk('div', 'wl-fx-warn wl-fx-in', dom);
      mk('i', 'ring', elWarn);
      elWarn._n = mk('b', 'num', elWarn);
      mk('em', null, elWarn).textContent = '제한시간';
    }
    warnStr = '';
    wake();
    return F;
  };

  F.ribbon = function (text, tone) {
    tone = RIB[tone] != null ? tone : 'zone';
    var col = SC[RIB[tone]];
    while (elRibs.children.length >= 3) elRibs.removeChild(elRibs.firstChild);
    var r = mk('div', 'wl-fx-rib', elRibs);
    r.style.setProperty('--tn', rgba(col, 1));
    mk('i', null, r);
    mk('b', null, r).textContent = RIBTAG[tone];
    mk('span', null, r).textContent = text == null ? '' : String(text);
    var kill = function () { if (r.parentNode) r.parentNode.removeChild(r); };
    r.addEventListener('animationend', function (e) { if (e.target === r) kill(); });
    after(3.4, kill);
    return F;
  };

  F.shake = function (p) {
    p = clamp(+p || 0, 0, 1);
    if (RM) p *= 0.25;
    if (p <= 0) return F;
    shakeMag = min(1.6, shakeMag + p);
    shakeT = 0;
    var a = W.Scene && W.Scene.active && W.Scene.active();
    if (a && a.host === host && a.shake) a.shake(p);
    wake();
    return F;
  };
  F.flash = function (col, ms, pow) {
    flashCol = typeof col === 'string' ? hex2rgb(col) : (col && col.length === 3 ? col : PAL.core);
    flashDur = max(0.04, (ms == null ? 200 : +ms) / 1000);
    flashT = flashDur;
    flashPow = clamp(pow == null ? 0.30 : +pow, 0, 1) * (RM ? 0.34 : 1);
    wake();
    return F;
  };

  /* ---- 보조 ---- */
  function rectIn(el) {
    if (!el || !el.getBoundingClientRect) return null;
    var a = el.getBoundingClientRect(), b = host.getBoundingClientRect();
    if (!a.width && !a.height) return null;
    return { x: a.left - b.left + a.width / 2, y: a.top - b.top + a.height / 2, w: a.width, h: a.height };
  }
  var popCool = -99;
  function popEl(el) {
    if (!el || !el.classList || t - popCool < 0.11) return;
    popCool = t;
    el.classList.remove('wl-fx-pop');
    void el.offsetWidth;
    el.classList.add('wl-fx-pop');
    after(0.45, function () { el.classList.remove('wl-fx-pop'); });
  }
  var flashCool = -99;
  function autoFlash(col, ms, pow) {
    if (t - flashCool < 0.28) return;
    flashCool = t;
    F.flash(col, ms, pow);
  }
  var droveFire = false;
  function scSetFire(v) {
    if (!driveFire) return;
    var a = W.Scene && W.Scene.active && W.Scene.active();
    if (a && a.host === host && a.setFire) a.setFire(v);
  }

  /* ─────────────────── 11. 갱신 ─────────────────── */
  var warnBeat = -99, warnPulse = 0;
  var WID = [1, 2, 3], vg = null, vgW = -1, vgH = -1;

  function buildDeps() {
    vgW = Wd; vgH = Ht;
    WID = [max(0.8, U * 0.055), max(1.2, U * 0.100), max(1.8, U * 0.170)];
    var A = 'rgba(193,57,26,1)', B = 'rgba(193,57,26,0)', g;
    vg = [];
    g = ctx.createLinearGradient(0, 0, 0, Ht * 0.26); g.addColorStop(0, A); g.addColorStop(1, B);
    vg.push([g, 0, 0, Wd, Ht * 0.26]);
    g = ctx.createLinearGradient(0, Ht, 0, Ht * 0.74); g.addColorStop(0, A); g.addColorStop(1, B);
    vg.push([g, 0, Ht * 0.74, Wd, Ht * 0.26]);
    g = ctx.createLinearGradient(0, 0, Wd * 0.17, 0); g.addColorStop(0, A); g.addColorStop(1, B);
    vg.push([g, 0, 0, Wd * 0.17, Ht]);
    g = ctx.createLinearGradient(Wd, 0, Wd * 0.83, 0); g.addColorStop(0, A); g.addColorStop(1, B);
    vg.push([g, Wd * 0.83, 0, Wd * 0.17, Ht]);
  }

  function step(dt) {
    t += dt;
    var i, k;

    /* 타이머 */
    for (i = timers.length - 1; i >= 0; i--) {
      timers[i].t -= dt;
      if (timers[i].t <= 0) { var fn = timers[i].fn; timers.splice(i, 1); fn(); }
    }

    /* 카메라 충격 — 무대를 안 움직이고 FX 만 흔든다(Scene 이 있으면 그쪽에도 전달됨) */
    camX = camY = 0;
    if (shakeMag > 0.0008) {
      shakeT += dt;
      var q = shakeMag * Ht * 0.070 * (RM ? 0.25 : 1);
      camX = nz(shakeT * 47) * q;
      camY = nz2(shakeT * 53) * q * 0.75;
      shakeMag *= pw(0.0016, dt);
    } else shakeMag = 0;

    if (flashT > 0) flashT = max(0, flashT - dt);
    if (autoHeat > 0) autoHeat = max(0, autoHeat - dt * 1.30);
    if (warnPulse > 0) warnPulse = max(0, warnPulse - dt * 3.0);

    /* 자동터치가 멎으면 남은 누적을 털고 개별 숫자로 돌아간다 */
    if (acc.n > 0 && t - acc.last > 0.34) { flushAcc(); merged = false; }
    else if (merged && t - acc.last > 0.34) merged = false;

    /* 제한시간 */
    if (warnLeft > 0) {
      warnLeft = max(0, warnLeft - dt);
      var frac = warnTot > 0 ? warnLeft / warnTot : 0;
      var str = mmss(warnLeft);
      if (str !== warnStr) { warnStr = str; if (elWarn) elWarn._n.textContent = str; }
      var hot = frac < 0.34;
      if (hot !== warnHot) { warnHot = hot; if (elWarn) elWarn.classList.toggle('hot', hot); }
      /* 불이 조여든다 — ×1.0 → ×0.45 */
      if (driveFire) { droveFire = true; scSetFire(frac); }
      var bp = lerp(0.40, 1.50, frac);
      if (t - warnBeat > bp) {
        warnBeat = t; warnPulse = 1;
        if (hot) F.shake(0.05 * (1 - frac));
      }
      if (warnLeft <= 0) hideWarn();
    }

    /* 숫자 */
    var a = pNum.a, o;
    for (i = 0; i < a.length; i++) {
      o = a[i]; if (!o.on) continue;
      o.age += dt;
      if (o.age >= o.ttl) { pNum.put(o); continue; }
      o.vy += o.g * dt;
      o.vx *= pw(0.30, dt);
      o.x += o.vx * dt; o.y += o.vy * dt;
      o.rot += o.rv * dt;
    }
    /* 스파크 */
    a = pSpk.a;
    for (i = 0; i < a.length; i++) {
      o = a[i]; if (!o.on) continue;
      o.age += dt;
      if (o.age >= o.ttl) { pSpk.put(o); continue; }
      o.vy += o.g * dt;
      k = pw(o.drag, dt);
      o.vx *= k; o.vy *= k;
      o.x += o.vx * dt; o.y += o.vy * dt;
      if (o.wob) { o.wph += dt * 3.4; o.x += sin(o.wph) * o.wob * dt; }
    }
    /* 먼지 */
    a = pPuf.a;
    for (i = 0; i < a.length; i++) {
      o = a[i]; if (!o.on) continue;
      o.age += dt;
      if (o.age >= o.ttl) { pPuf.put(o); continue; }
      o.x += o.vx * dt; o.y += o.vy * dt;
      o.vy *= pw(0.35, dt); o.vx *= pw(0.25, dt);
      o.sz += o.sz * dt * 0.55;
    }
    /* 고리 */
    a = pRng.a;
    for (i = 0; i < a.length; i++) {
      o = a[i]; if (!o.on) continue;
      o.age += dt;
      if (o.age >= o.ttl) pRng.put(o);
    }
    /* 발톱자국 */
    a = pClw.a;
    for (i = 0; i < a.length; i++) {
      o = a[i]; if (!o.on) continue;
      o.age += dt;
      if (o.age >= o.ttl) pClw.put(o);
    }
    /* 실루엣 스트립 */
    a = pStr.a;
    for (i = 0; i < a.length; i++) {
      o = a[i]; if (!o.on) continue;
      o.age += dt;
      if (o.age - o.dly >= o.ttl) { pStr.put(o); continue; }
      if (o.age < o.dly) continue;
      o.x += o.vx * dt; o.y += o.vy * dt;
      o.vy *= pw(0.62, dt); o.vx *= pw(0.40, dt);
      o.sx += dt * 0.55;
      o.rot += o.rv * dt;
      if (o.flash > 0) o.flash = max(0, o.flash - dt * 7);
    }
    /* 발자국 */
    a = pCon.a;
    var LA = RM ? 0.10 : 0.26;
    for (i = 0; i < a.length; i++) {
      o = a[i]; if (!o.on) continue;
      o.age += dt;
      if (o.age < o.dly) continue;
      o.rot += o.rv * dt;
      if (o.ph === 0) {
        o.vy += Ht * 1.55 * dt;
        o.vx *= pw(0.40, dt);
        o.x += o.vx * dt; o.y += o.vy * dt;
        if (o.age - o.dly >= LA) {
          o.ph = 1; o.t1 = 0; o.px = o.x; o.py = o.y;
          o.cx = lerp(o.x, o.tx, 0.42) + rr(-1, 1) * Ht * 0.10;
          o.cy = min(o.y, o.ty) - Ht * rr(0.10, 0.22);
        }
      } else {
        o.t1 += dt;
        var u = clamp(o.t1 / o.ttl, 0, 1);
        var e = RM ? u : pw(u, 1.8);
        var iu = 1 - e;
        o.x = iu * iu * o.px + 2 * iu * e * o.cx + e * e * o.tx;
        o.y = iu * iu * o.py + 2 * iu * e * o.cy + e * e * o.ty;
        o.sz2 = 1 - u * 0.34;
        if (u >= 1) { arrive(o); pCon.put(o); }
      }
    }
    /* 빛기둥 */
    a = pShf.a;
    for (i = 0; i < a.length; i++) {
      o = a[i]; if (!o.on) continue;
      o.age += dt;
      if (o.age >= o.ttl) pShf.put(o);
    }
  }

  function arrive(c) {
    var bq = budget(), m = RM ? 2 : Math.round(4 * bq), i;
    for (i = 0; i < m; i++)
      spark(c.tx, c.ty, rr(0, TAU), rr(0.06, 0.22) * Ht, rr(0.10, 0.22), C_CORE, 0, Ht * 0.30, rr(0.012, 0.022));
    ring(c.tx, c.ty, U * 0.15, U * 0.95, 0.22, C_CORE, U * 0.07, 1, 0.50);
    popEl(c.el);
  }

  /* ─────────────────── 12. 그리기 ─────────────────── */

  function drawSparks(c) {
    var a = pSpk.a, i, s, k, ai, n = 0;
    skCnt.fill(0);
    for (i = 0; i < a.length; i++) {
      s = a[i]; if (!s.on) continue;
      s._a = 1 - s.age / s.ttl;
      var al = (s._a < 0.85 ? (s._a / 0.85) * (s._a / 0.85) : 1) * s.a0;
      ai = (al * NA) | 0; if (ai >= NA) ai = NA - 1; if (ai < 0) ai = 0;
      s._k = (s.ci * NA + ai) * NW + s.wi;
      skCnt[s._k + 1]++; n++;
    }
    if (!n) return;
    for (k = 1; k <= NKEY; k++) skCnt[k] += skCnt[k - 1];
    for (i = 0; i < a.length; i++) { s = a[i]; if (!s.on) continue; skOrd[skCnt[s._k]++] = i; }

    c.globalCompositeOperation = 'lighter';
    c.lineCap = 'round';
    var start = 0;
    for (k = 0; k < NKEY; k++) {
      var end = skCnt[k];
      if (end === start) continue;
      var ci = (k / (NA * NW)) | 0, rest = k - ci * NA * NW;
      var aiq = (rest / NW) | 0, wiq = rest - aiq * NW;
      c.strokeStyle = rgba(SC[ci], A_LV[aiq]);
      c.lineWidth = WID[wiq];
      c.beginPath();
      for (i = start; i < end; i++) {
        s = a[skOrd[i]];
        var sc = 0.34 + 0.66 * s._a;
        c.moveTo(s.x, s.y);
        c.lineTo(s.x - s.vx * s.tl * sc, s.y - s.vy * s.tl * sc);
      }
      c.stroke();
      start = end;
    }
    c.globalCompositeOperation = 'source-over';
  }

  function drawRings(c) {
    var a = pRng.a, i, r;
    c.globalCompositeOperation = 'lighter';
    for (i = 0; i < a.length; i++) {
      r = a[i]; if (!r.on) continue;
      var u = r.age / r.ttl, e = eOut(u);
      var rad = max(0.2, lerp(r.r0, r.r1, e));
      var al = (1 - u) * (1 - u) * r.a0;
      if (al <= 0.004) continue;
      c.strokeStyle = rgba(SC[r.ci], al);
      c.lineWidth = max(0.6, r.w * (1 - u * 0.72));
      c.beginPath();
      c.ellipse(r.x, r.y, rad, max(0.2, rad * r.flat), 0, 0, TAU);
      c.stroke();
    }
    c.globalCompositeOperation = 'source-over';
  }

  function drawPuffs(c) {
    var a = pPuf.a, i, p;
    c.globalCompositeOperation = 'lighter';
    for (i = 0; i < a.length; i++) {
      p = a[i]; if (!p.on) continue;
      var u = p.age / p.ttl;
      var al = (u < 0.16 ? u / 0.16 : 1 - (u - 0.16) / 0.84);
      if (al <= 0.01) continue;
      c.globalAlpha = al;
      c.drawImage(softSprite(SC[p.ci], p.a0), p.x - p.sz, p.y - p.sz, p.sz * 2, p.sz * 2);
    }
    c.globalAlpha = 1;
    c.globalCompositeOperation = 'source-over';
  }

  function drawClaws(c) {
    var a = pClw.a, i, k, j;
    c.globalCompositeOperation = 'lighter';
    for (i = 0; i < a.length; i++) {
      k = a[i]; if (!k.on) continue;
      var p = clamp(k.age / k.rev, 0, 1);
      if (p <= 0.02) continue;
      var u = k.age / k.ttl;
      var al = u < 0.52 ? 1 : 1 - (u - 0.52) / 0.48;
      if (al <= 0.01) continue;
      var ca = cos(k.ang), sa = sin(k.ang), nx = -sa, ny = ca;
      c.fillStyle = rgba(SC[k.ci], al * 0.90);
      for (var q = 0; q < k.n; q++) {
        var o = (q - (k.n - 1) / 2) * k.gap;
        var bx = k.x + nx * o, by = k.y + ny * o;
        var L = k.len * (0.70 + k.jit[q % 6] * 0.44);
        var bow = k.bow * (q % 2 ? 1 : 0.62);
        var S = 9, uu, ee, bz, w;
        c.beginPath();
        for (j = 0; j <= S; j++) {
          uu = j / S; ee = uu * p * L; bz = sin(uu * PI) * bow * p;
          w = k.w * sin(uu * PI * 0.94 + 0.06);
          c.lineTo(bx + ca * ee + nx * (bz + w), by + sa * ee + ny * (bz + w));
        }
        for (j = S; j >= 0; j--) {
          uu = j / S; ee = uu * p * L; bz = sin(uu * PI) * bow * p;
          w = k.w * sin(uu * PI * 0.94 + 0.06);
          c.lineTo(bx + ca * ee + nx * (bz - w), by + sa * ee + ny * (bz - w));
        }
        c.closePath(); c.fill();
      }
    }
    c.globalCompositeOperation = 'source-over';
  }

  function drawStrips(c) {
    var a = pStr.a, i, s;
    for (i = 0; i < a.length; i++) {
      s = a[i]; if (!s.on) continue;
      var ta = s.age - s.dly;
      if (ta < 0) ta = 0;
      var u = ta / s.ttl;
      var al = min(1, u < 0.10 ? 1 : (1 - u) * (1 - u) * 1.30);
      if (al <= 0.01) continue;
      var col = s.flash > 0.01 ? cmix(s.col, PAL.core, s.flash * 0.80) : s.col;
      var w = s.w * s.sx, h = s.h;
      c.save();
      c.translate(s.x, s.y);
      if (s.rot) c.rotate(s.rot);
      c.globalAlpha = al;
      c.fillStyle = rgba(col, 1);
      c.fillRect(-w * 0.5, -h * 0.5, w, h);
      c.globalCompositeOperation = 'lighter';
      c.fillStyle = rgba(s.rim, 0.55 * al * (1 - u * 0.55));
      c.fillRect(-w * 0.5, -h * 0.5, max(1, w * 0.13), h);
      c.restore();
    }
    c.globalAlpha = 1;
    c.globalCompositeOperation = 'source-over';
  }

  function drawCoins(c) {
    var a = pCon.a, i, o;
    for (i = 0; i < a.length; i++) {
      o = a[i]; if (!o.on || o.age < o.dly) continue;
      var r = o.sz * (o.sz2 || 1);
      c.save();
      c.translate(o.x, o.y);
      c.rotate(o.rot);
      c.globalCompositeOperation = 'lighter';
      c.globalAlpha = 0.55;
      c.drawImage(glowSprite(PAL.ember, 0.34), -r * 2.2, -r * 2.2, r * 4.4, r * 4.4);
      c.globalAlpha = 1;
      c.globalCompositeOperation = 'source-over';
      c.fillStyle = rgba(PAL.core, 0.96);
      paw(c, r);
      c.restore();
    }
    c.globalAlpha = 1;
  }

  function drawShafts(c) {
    var a = pShf.a, i, s;
    c.globalCompositeOperation = 'lighter';
    for (i = 0; i < a.length; i++) {
      s = a[i]; if (!s.on) continue;
      var u = s.age / s.ttl;
      var al = s.a0 * (u < 0.20 ? u / 0.20 : (1 - u) / 0.80);
      if (al <= 0.01) continue;
      c.globalAlpha = al;
      c.drawImage(shaftSprite(SC[s.ci]), s.x - s.w * 0.5, s.y - s.h, s.w, s.h);
    }
    c.globalAlpha = 1;
    c.globalCompositeOperation = 'source-over';
  }

  function drawNums(c) {
    var a = pNum.a, i, n;
    /* 글로우는 비싸다 — 큰 사각형을 'lighter' 로 확대 합성하기 때문이다.
     * 그래서 (1) 뜬 직후 0.3초만 (2) 프레임당 최대 GB 개만 태운다.
     * 어차피 손맛은 터지는 순간에 있지, 사그라드는 숫자에 있지 않다. */
    var gb = mobile ? 4 : 8;
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
    for (i = 0; i < a.length; i++) {
      n = a[i]; if (!n.on) continue;
      var u = n.age / n.ttl;
      var al = u < 0.09 ? u / 0.09 : (u > 0.66 ? 1 - (u - 0.66) / 0.34 : 1);
      if (al <= 0.01) continue;
      var sc = (1 + n.pop * Math.exp(-n.age * 11) * cos(n.age * 22)) * (1 - u * 0.06);
      var sz = max(6, n.size * sc);
      c.save();
      c.translate(n.x, n.y);
      if (n.rot) c.rotate(n.rot);
      c.font = n.wt + ' ' + r3(sz) + 'px ' + F_MONO;
      var mw = n.tw * sc;

      if (n.glow > 0 && gb > 0 && n.age < 0.30) {
        var gA = al * n.glow * 0.62 * (1 - ss(0, 0.30, n.age));
        if (gA > 0.012) {
          gb--;
          var R = sz * 1.45;
          c.globalCompositeOperation = 'lighter';
          c.globalAlpha = gA;
          c.drawImage(glowSprite(SC[n.ci], 0.34), -R, -R * 0.56, R * 2, R * 1.12);
          c.globalCompositeOperation = 'source-over';
        }
      }
      c.globalAlpha = al;
      c.lineWidth = max(2, sz * 0.20);
      c.strokeStyle = 'rgba(8,10,16,0.88)';
      c.strokeText(n.txt, 0, 0);
      c.fillStyle = rgba(SC[n.ci], 1);
      c.fillText(n.txt, 0, 0);

      if (n.st === S_CRIT) {                       /* 치명 — 위에 쐐기 */
        c.strokeStyle = rgba(SC[C_CORE], al * 0.90);
        c.lineWidth = max(1.2, sz * 0.11); c.lineCap = 'round';
        var cw = max(3, min(mw * 0.20, sz * 0.62)), ch = sz * 0.17, cy = -sz * 0.60;
        c.beginPath(); c.moveTo(-cw, cy); c.lineTo(0, cy - ch); c.lineTo(cw, cy); c.stroke();
      } else if (n.st === S_BOSS) {                /* 보스 — 양옆에 숯빛 눈금 */
        c.fillStyle = rgba(SC[C_DEEP], al * 0.92);
        var tw = sz * 0.32, th = max(1, sz * 0.085);
        c.fillRect(-mw * 0.5 - tw - sz * 0.17, -th * 0.5, tw, th);
        c.fillRect(mw * 0.5 + sz * 0.17, -th * 0.5, tw, th);
      } else if (n.st === S_STREAM) {              /* 합산 — 밑줄 + 타수 */
        c.fillStyle = rgba(SC[C_FLY], al * 0.55);
        c.fillRect(-mw * 0.5, sz * 0.56, mw, max(1, sz * 0.055));
        if (n.mult > 1) {
          var ms = sz * 0.44;
          c.font = '500 ' + r3(ms) + 'px ' + F_MONO;
          c.fillStyle = rgba(SC[C_MOON], al * 0.92);
          c.textAlign = 'left';
          c.fillText('×' + n.mult, mw * 0.5 + ms * 0.34, sz * 0.24);
          c.textAlign = 'center';
        }
      }
      c.restore();
    }
    c.globalAlpha = 1;
  }

  function draw() {
    var c = ctx;
    c.clearRect(0, 0, Wd, Ht);
    if (vgW !== Wd || vgH !== Ht) buildDeps();

    c.save();
    if (camX || camY) c.translate(camX, camY);

    if (autoHeat > 0.02) {                         /* 자동터치 열기 — 계속 갈리고 있다는 신호 */
      var R = U * (2.0 + autoHeat * 2.6);
      c.globalCompositeOperation = 'lighter';
      c.globalAlpha = autoHeat * 0.50;
      c.drawImage(softSprite(PAL.firefly, 0.30), autoX - R, autoY - R, R * 2, R * 2);
      c.globalAlpha = 1;
      c.globalCompositeOperation = 'source-over';
    }
    drawShafts(c);
    drawRings(c);
    drawStrips(c);
    drawPuffs(c);
    drawSparks(c);
    drawClaws(c);
    drawCoins(c);
    drawNums(c);
    c.restore();

    if (warnLeft > 0 && vg) {
      var frac = warnTot > 0 ? warnLeft / warnTot : 0;
      var wa = (1 - frac) * 0.20 + warnPulse * warnPulse * 0.14;
      if (wa > 0.004) {
        c.globalAlpha = wa;
        for (var i = 0; i < vg.length; i++) { c.fillStyle = vg[i][0]; c.fillRect(vg[i][1], vg[i][2], vg[i][3], vg[i][4]); }
        c.globalAlpha = 1;
      }
    }
    if (flashT > 0) {
      var fu = flashT / flashDur;
      c.globalCompositeOperation = 'lighter';
      c.fillStyle = rgba(flashCol, fu * fu * flashPow);
      c.fillRect(0, 0, Wd, Ht);
      c.globalCompositeOperation = 'source-over';
    }
  }

  /* ─────────────────── 13. 루프 ─────────────────── */
  function busy() {
    return !!(pNum.live || pSpk.live || pPuf.live || pRng.live || pClw.live || pStr.live ||
      pCon.live || pShf.live || timers.length || flashT > 0 || shakeMag > 0.0008 ||
      warnLeft > 0 || acc.n > 0 || autoHeat > 0.02);
  }
  function frame(ts) {
    raf = 0;
    if (dead) return;
    var dt = lastT ? (ts - lastT) / 1000 : 0.0166;
    lastT = ts;
    if (dt > 0.1) dt = 0.1;
    fps += (1 / max(dt, 0.001) - fps) * 0.08;
    frames++;
    step(dt); draw();
    if (busy()) raf = requestAnimationFrame(frame);
    else lastT = 0;                                 /* 할 일이 없으면 rAF 를 끊는다 */
  }
  function wake() {
    if (dead || paused || doc.hidden) return;
    if (!raf) { lastT = 0; raf = requestAnimationFrame(frame); }
  }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }

  /* ---- 이벤트 ---- */
  function onVis() { if (doc.hidden) stop(); else if (busy()) wake(); }
  doc.addEventListener('visibilitychange', onVis);
  var ro = null;
  if (window.ResizeObserver) { ro = new ResizeObserver(function () { resize(); }); ro.observe(host); }
  function onWinResize() { resize(); }
  window.addEventListener('resize', onWinResize);
  function onMQ() { if (opts.reduced == null) RM = mql.matches; }
  if (mql && mql.addEventListener) mql.addEventListener('change', onMQ);

  /* ─────────────────── 14. 나머지 공개 메서드 ─────────────────── */
  F.pause = function (b) { paused = !!b; if (paused) stop(); else if (busy()) wake(); return F; };
  F.size = function () { return { w: Wd, h: Ht, u: U }; };
  F.reduced = function () { return RM; };
  F.stats = function () {
    return {
      fps: Math.round(fps), frames: frames,
      num: pNum.live, spark: pSpk.live,
      live: pNum.live + pSpk.live + pPuf.live + pRng.live + pClw.live + pStr.live + pCon.live + pShf.live,
      merged: merged, rate: Math.round(autoRate() * 10) / 10,
      running: !!raf
    };
  };
  F.clear = function () {
    for (var i = 0; i < POOLS.length; i++) POOLS[i].clear();
    timers.length = 0;
    acc.sum = 0; acc.n = 0; merged = false; autoHeat = 0;
    flashT = 0; shakeMag = 0;
    hideWarn(); clearBoss();
    while (elRibs.firstChild) elRibs.removeChild(elRibs.firstChild);
    ctx.clearRect(0, 0, Wd, Ht);
    return F;
  };
  F.dispose = function () {
    dead = true; stop();
    doc.removeEventListener('visibilitychange', onVis);
    window.removeEventListener('resize', onWinResize);
    if (ro) ro.disconnect();
    if (mql && mql.removeEventListener) mql.removeEventListener('change', onMQ);
    if (droveFire) { droveFire = false; scSetFire(null); }
    timers.length = 0;
    if (cv.parentNode) cv.parentNode.removeChild(cv);
    if (dom.parentNode) dom.parentNode.removeChild(dom);
    host.classList.remove('wl-fx-host');
    if (ACTIVE === F) ACTIVE = null;
  };
  F.host = host; F.canvas = cv; F.dom = dom;

  /* ---- 초기화 ---- */
  resize(); buildDeps();
  if (doc.fonts && doc.fonts.load) {
    try { doc.fonts.load('600 16px "IBM Plex Mono"'); doc.fonts.load('500 16px "IBM Plex Mono"'); } catch (e) {}
  }
  return F;
}

/* ─────────────────── 15. 모듈 보조 ─────────────────── */
function mk(tag, cls, parent) {
  var e = doc.createElement(tag);
  if (cls) e.className = cls;
  if (parent) parent.appendChild(e);
  return e;
}
/* 실루엣 가로폭 — 0 이 발밑, 1 이 정수리. 배가 불룩하고 목이 잘록하고 머리가 둥글다. */
function silW(f) {
  if (f < 0.60) return 0.55 + 0.45 * sin((f / 0.60) * PI * 0.92 + 0.22);
  if (f < 0.70) return 0.40;
  return 0.36 + 0.44 * sin(((f - 0.70) / 0.30) * PI);
}
function normPal(p) {
  var out = [], i, c;
  if (!p) return [PAL.ash, PAL.soot];
  if (typeof p === 'string') p = [p];
  if (!p.length) return [PAL.ash, PAL.soot];
  for (i = 0; i < p.length; i++) {
    c = p[i];
    out.push(typeof c === 'string' ? hex2rgb(c) : (c && c.length === 3 ? c : PAL.ash));
  }
  return out.length ? out : [PAL.ash, PAL.soot];
}
function mmss(s) {
  s = max(0, Math.ceil(s));
  var m = (s / 60) | 0, q = s - m * 60;
  return m + ':' + (q < 10 ? '0' : '') + q;
}
/* 발자국 — 발바닥 하나 + 발가락 셋. 화폐는 동전이 아니라 발자국이다. */
function paw(c, r) {
  c.beginPath(); c.ellipse(0, r * 0.34, r * 0.62, r * 0.50, 0, 0, TAU); c.fill();
  c.beginPath(); c.ellipse(-r * 0.54, -r * 0.28, r * 0.25, r * 0.31, -0.34, 0, TAU); c.fill();
  c.beginPath(); c.ellipse(0, -r * 0.54, r * 0.25, r * 0.31, 0, 0, TAU); c.fill();
  c.beginPath(); c.ellipse(r * 0.54, -r * 0.28, r * 0.25, r * 0.31, 0.34, 0, TAU); c.fill();
}

/* ─────────────────── 16. 파사드 ─────────────────── */
/* 전투 무대는 보통 하나다. WL.FX.* 는 마지막으로 mount 한 레이어에 위임한다.
 * 여러 개를 띄우려면 mount() 가 돌려준 핸들을 직접 써라. */
var ACTIVE = null;
function proxy(name) {
  return function (a, b, c, d) {
    if (!ACTIVE) return null;
    return ACTIVE[name](a, b, c, d);
  };
}

W.FX = {
  mount: function (el, opts) {
    if (!el) throw new Error('WL.FX.mount: el 이 없다');
    if (ACTIVE && ACTIVE.host === el) ACTIVE.dispose();
    ACTIVE = Layer(el, opts);
    return ACTIVE;
  },
  hit:       proxy('hit'),
  tap:       proxy('tap'),
  poof:      proxy('poof'),
  coins:     proxy('coins'),
  levelUp:   proxy('levelUp'),
  milestone: proxy('milestone'),
  bossIntro: proxy('bossIntro'),
  bossWarn:  proxy('bossWarn'),
  ribbon:    proxy('ribbon'),
  shake:     proxy('shake'),
  flash:     proxy('flash'),
  pause:     proxy('pause'),
  clear:     proxy('clear'),
  size:      function () { return ACTIVE ? ACTIVE.size() : { w: 0, h: 0, u: 0 }; },
  stats:     function () { return ACTIVE ? ACTIVE.stats() : { fps: 0, num: 0, spark: 0, live: 0, merged: false, rate: 0, running: false }; },
  reduced:   function () { return ACTIVE ? ACTIVE.reduced() : false; },
  dispose:   function () { if (ACTIVE) ACTIVE.dispose(); },
  active:    function () { return ACTIVE; }
};

})();
