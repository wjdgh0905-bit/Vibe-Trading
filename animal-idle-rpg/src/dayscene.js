/*!
 * WL.DayScene — 캔버스 없는 낮 무대 (DOM + CSS 만)
 * 의존성 0. IIFE. window.WL 부착. 최상위 DOM 조작 없음.
 *
 * WL.Scene(캔버스 야경)과 같은 API 부분집합을 제공한다. 코어는 둘 중 하나를 골라 쓴다.
 *   mount(el, opts{biome}) -> handle { host, mob, setBiome(i), setMood(m), setFire(v), setProgress(p),
 *                                      shake(p), flash(c,ms), slots(n,row), groundY(), size(),
 *                                      fire(), firePos(), quality(n), pause(b), dispose() }
 * 지역마다 시간대가 다르다 — 아침·정오·황혼·밤이 섞여 있어 "밤밖에 없는" 무대가 아니다.
 * 움직이는 것은 구름(transform 애니메이션)뿐이라 어떤 기기에서도 가볍다.
 */
(function () {
'use strict';
var W = (window.WL = window.WL || {});

/* 지역별 팔레트 — [하늘 위, 하늘 아래], 태양{색, x%, y%, 크기%}, 원경, 중경, 지면 위/아래, 안개, 시간대 */
var B = [
  { n:'이끼 낀 숲',   sky:['#B9DDE9','#EAF3E2'], sun:{c:'#FFF3C4',x:22,y:26,s:9},  far:'#86AE92', mid:'#5F8F6C', gr:['#7FA65E','#5B8646'], haze:.16, t:'morning' },
  { n:'바람의 초원',  sky:['#7FC4F0','#DDF0FB'], sun:{c:'#FFF7D6',x:74,y:18,s:8},  far:'#A3CD93', mid:'#7FB46E', gr:['#9CCB70','#78A857'], haze:.08, t:'noon' },
  { n:'서리 설원',    sky:['#CFE0EE','#F5F8FB'], sun:{c:'#FFFFFF',x:60,y:22,s:7},  far:'#C6D6E4', mid:'#B0C4D6', gr:['#EEF3F8','#CFDAE6'], haze:.22, t:'overcast' },
  { n:'모래 사막',    sky:['#EFA36B','#F9DFB2'], sun:{c:'#FFD27A',x:80,y:52,s:13}, far:'#CF9B66', mid:'#B77E4F', gr:['#E7BF84','#C79A5F'], haze:.12, t:'dusk' },
  { n:'심해 해구',    sky:['#3E86B8','#1F5C8C'], sun:{c:'#CDEBFF',x:40,y:8,s:16},  far:'#2C6A97', mid:'#245C86', gr:['#2F6079','#223F55'], haze:.20, t:'sea' },
  { n:'울창한 정글',  sky:['#A6DBE2','#E5F3DA'], sun:{c:'#FFF6CC',x:30,y:16,s:8},  far:'#4E9059', mid:'#3B7A47', gr:['#5FA24C','#3F7D38'], haze:.10, t:'noon' },
  { n:'화산 지대',    sky:['#E6845A','#F6C99B'], sun:{c:'#FF8E5A',x:20,y:48,s:12}, far:'#7C4A43', mid:'#5D3833', gr:['#6E4B40','#4B322C'], haze:.14, t:'dusk' },
  { n:'하늘 절벽',    sky:['#F3BFD0','#FDEBDA'], sun:{c:'#FFF0E6',x:66,y:34,s:10}, far:'#B9A9D6', mid:'#9C8CC2', gr:['#AE9FBE','#8A7CA0'], haze:.18, t:'dawn' },
  { n:'고대 습지',    sky:['#CDDFD5','#EEF3E7'], sun:{c:'#FFFBEA',x:48,y:20,s:7},  far:'#8FAC95', mid:'#71917A', gr:['#839F71','#647F57'], haze:.26, t:'mist' },
  { n:'별빛 심연',    sky:['#2A2F6C','#6E4F96'], sun:{c:'#F2ECFF',x:78,y:20,s:6},  far:'#3E3C7E', mid:'#312F68', gr:['#403E74','#2B2A54'], haze:.10, t:'night' },
];
var MOODS = { normal:0, boss:.34, victory:0, defeat:.5 };
var ROWS = {
  front:{ x0:.44, x1:.60, y:0,     s:1.00, z:3 },
  back: { x0:.30, x1:.44, y:-.060, s:0.86, z:2 },
  air:  { x0:.30, x1:.58, y:-.246, s:0.80, z:1 },
  foe:  { x0:.81, x1:.81, y:0,     s:1.00, z:4 },
};
var CSS_ID = 'wl-ds-css';
function css() {
  if (document.getElementById(CSS_ID)) return;
  var st = document.createElement('style'); st.id = CSS_ID;
  st.textContent =
    '.wl-ds{position:relative;overflow:hidden}' +
    '.ds-world{position:absolute;inset:0;transition:opacity .9s ease;will-change:opacity}' +
    '.ds-sky,.ds-far,.ds-mid,.ds-ground,.ds-sun,.ds-cloud,.ds-haze,.ds-stars{position:absolute;pointer-events:none}' +
    '.ds-sky{inset:0}' +
    '.ds-sun{border-radius:50%;transform:translate(-50%,-50%)}' +
    '.ds-stars{inset:0;opacity:.9}' +
    '.ds-far{left:-12%;right:-12%;height:26%;bottom:30%;}' +
    '.ds-mid{left:-8%;right:-8%;height:18%;bottom:30%;}' +
    '.ds-ground{left:0;right:0;top:70%;bottom:0}' +
    '.ds-haze{left:0;right:0;top:42%;height:28%;}' +
    '.ds-cloud{top:0;left:0;height:12%;width:30%;opacity:.9;' +
      'background:radial-gradient(ellipse 40% 55% at 30% 62%,rgba(255,255,255,.95) 0 38%,rgba(255,255,255,0) 72%),' +
      'radial-gradient(ellipse 34% 62% at 62% 52%,rgba(255,255,255,.9) 0 40%,rgba(255,255,255,0) 74%),' +
      'radial-gradient(ellipse 26% 40% at 82% 70%,rgba(255,255,255,.8) 0 40%,rgba(255,255,255,0) 74%);' +
      'animation:dsDrift var(--dur,80s) linear infinite;animation-delay:var(--dl,0s)}' +
    '@keyframes dsDrift{from{transform:translate3d(-30%,0,0)}to{transform:translate3d(430%,0,0)}}' +
    '.ds-mob{position:absolute;inset:0;z-index:5;pointer-events:none}' +
    '.ds-mob.shk{animation:dsShake .34s ease-out}' +
    '@keyframes dsShake{0%{transform:translate(0,0)}20%{transform:translate(-4px,2px)}40%{transform:translate(3px,-2px)}60%{transform:translate(-2px,1px)}80%{transform:translate(1px,0)}100%{transform:none}}' +
    '.ds-tint{position:absolute;inset:0;z-index:6;pointer-events:none;background:#3a1410;opacity:0;transition:opacity .5s ease}' +
    '.ds-flash{position:absolute;inset:0;z-index:7;pointer-events:none;opacity:0}' +
    '.ds-shadow{position:absolute;width:64px;height:14px;border-radius:50%;background:rgba(20,26,20,.28);' +
      'transform:translate(-50%,-50%) scaleX(1.1);pointer-events:none}' +
    '.wl-ds.paused .ds-cloud{animation-play-state:paused}' +
    '@media (prefers-reduced-motion:reduce){.ds-cloud{animation:none}}';
  document.head.appendChild(st);
}
function el(cls, parent) { var d = document.createElement('div'); d.className = cls; if (parent) parent.appendChild(d); return d; }

function buildWorld(b) {
  var w = el('ds-world');
  var sky = el('ds-sky', w);
  sky.style.background = 'linear-gradient(180deg,' + b.sky[0] + ' 0%,' + b.sky[1] + ' 70%,' + b.gr[0] + ' 70.2%,' + b.gr[1] + ' 100%)';
  if (b.t === 'night') {
    var s = el('ds-stars', w);
    s.style.background =
      'radial-gradient(1px 1px at 12% 18%,#fff 60%,transparent 61%),radial-gradient(1.5px 1.5px at 30% 9%,#fff 60%,transparent 61%),' +
      'radial-gradient(1px 1px at 47% 24%,#fff 60%,transparent 61%),radial-gradient(1.2px 1.2px at 63% 12%,#fff 60%,transparent 61%),' +
      'radial-gradient(1px 1px at 84% 30%,#fff 60%,transparent 61%),radial-gradient(1.4px 1.4px at 92% 8%,#fff 60%,transparent 61%),' +
      'radial-gradient(1px 1px at 22% 40%,#fff 60%,transparent 61%),radial-gradient(1px 1px at 72% 44%,#fff 60%,transparent 61%)';
    s.style.height = '62%';
  }
  var sun = el('ds-sun', w);
  sun.style.left = b.sun.x + '%'; sun.style.top = b.sun.y + '%';
  sun.style.width = sun.style.height = (b.sun.s * 2) + '%';
  sun.style.background = 'radial-gradient(circle,' + b.sun.c + ' 0 30%,rgba(255,255,255,.35) 42%,transparent 70%)';
  if (b.t === 'sea') { sun.style.width = '46%'; sun.style.height = '80%'; sun.style.borderRadius = '0';
    sun.style.background = 'linear-gradient(180deg,rgba(205,235,255,.55),transparent 80%)'; sun.style.transform = 'translate(-50%,0) skewX(-8deg)'; }
  /* 원경·중경 — 둥근 능선을 radial-gradient 여러 장으로 */
  var far = el('ds-far', w);
  far.style.background =
    'radial-gradient(ellipse 30% 100% at 12% 100%,' + b.far + ' 0 58%,transparent 59%),' +
    'radial-gradient(ellipse 34% 90% at 42% 100%,' + b.far + ' 0 58%,transparent 59%),' +
    'radial-gradient(ellipse 28% 100% at 72% 100%,' + b.far + ' 0 58%,transparent 59%),' +
    'radial-gradient(ellipse 24% 80% at 95% 100%,' + b.far + ' 0 58%,transparent 59%)';
  var mid = el('ds-mid', w);
  mid.style.background =
    'radial-gradient(ellipse 26% 100% at 6% 100%,' + b.mid + ' 0 58%,transparent 59%),' +
    'radial-gradient(ellipse 32% 88% at 36% 100%,' + b.mid + ' 0 58%,transparent 59%),' +
    'radial-gradient(ellipse 30% 100% at 66% 100%,' + b.mid + ' 0 58%,transparent 59%),' +
    'radial-gradient(ellipse 22% 76% at 92% 100%,' + b.mid + ' 0 58%,transparent 59%)';
  var haze = el('ds-haze', w);
  haze.style.background = 'linear-gradient(180deg,transparent,' + b.sky[1] + ')';
  haze.style.opacity = String(b.haze);
  if (b.t !== 'sea' && b.t !== 'night') {
    for (var i = 0; i < 3; i++) {
      var c = el('ds-cloud', w);
      c.style.top = (2 + i * 7) + '%'; c.style.left = (-30 + i * 12) + '%';
      c.style.width = (22 + i * 6) + '%'; c.style.height = (9 + i * 2) + '%';
      c.style.opacity = String(0.85 - i * 0.18);
      c.style.setProperty('--dur', (70 + i * 25) + 's'); c.style.setProperty('--dl', (-i * 23) + 's');
    }
  }
  return w;
}

function Stage(host, opts) {
  css();
  host.classList.add('wl-ds');
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  var S = {}, bi = Math.max(0, Math.min(B.length - 1, (opts && opts.biome) | 0));
  var world = buildWorld(B[bi]); host.appendChild(world);
  var mob = el('ds-mob', host), tint = el('ds-tint', host), flash = el('ds-flash', host);
  var Wd = 0, Ht = 0, gY = 0, t0 = performance.now();
  function measure() { var r = host.getBoundingClientRect(); Wd = r.width || 1; Ht = r.height || 1; gY = Math.round(Ht * 0.70); }
  measure();
  var ro = window.ResizeObserver ? new ResizeObserver(measure) : null;
  if (ro) ro.observe(host);

  S.host = host; S.mob = mob; S.bg = null; S.fg = null;
  S.setBiome = function (i) {
    i = Math.max(0, Math.min(B.length - 1, i | 0));
    if (i === bi) return S;
    bi = i;
    var nw = buildWorld(B[i]); nw.style.opacity = '0';
    host.insertBefore(nw, mob);
    var old = world; world = nw;
    requestAnimationFrame(function () { nw.style.opacity = '1'; old.style.opacity = '0'; });
    setTimeout(function () { if (old.parentNode) old.parentNode.removeChild(old); }, 1000);
    return S;
  };
  S.setMood = function (m) { tint.style.opacity = String(MOODS[m] || 0); return S; };
  S.setFire = function () { return S; };
  S.setProgress = function () { return S; };
  S.shake = function () { mob.classList.remove('shk'); void mob.offsetWidth; mob.classList.add('shk'); return S; };
  S.flash = function (col, ms) {
    flash.style.background = col || '#FFE2A6'; flash.style.transition = 'none'; flash.style.opacity = '.55';
    setTimeout(function () { flash.style.transition = 'opacity ' + ((ms || 240) / 1000) + 's ease'; flash.style.opacity = '0'; }, 16);
    return S;
  };
  S.fire = function () { return 1; };
  S.firePos = function () { return { x: Wd * 0.27, y: gY, r: 0, strength: 1 }; };
  S.groundY = function () { return gY; };
  S.size = function () { return { w: Wd, h: Ht }; };
  S.biome = function () { return { i: bi, name: B[bi].n }; };
  S.slots = function (n, row) {
    var R = ROWS[row] || ROWS.front, out = [];
    n = Math.max(0, n | 0);
    var sp = Math.max(0, Math.min(1, (1000 - Wd) / 560)) * 0.42;
    var mid = (R.x0 + R.x1) * 0.5;
    var x0 = mid + (R.x0 - mid) * (1 + sp), x1 = mid + (R.x1 - mid) * (1 + sp);
    var t = (performance.now() - t0) / 1000;
    for (var i = 0; i < n; i++) {
      var f = n === 1 ? 0.5 : i / (n - 1);
      var x = (x0 + (x1 - x0) * f) * Wd, y = gY + R.y * Ht;
      if (row === 'air') y += Math.sin(t * 1.05 + i * 1.7) * Ht * 0.014;
      out.push({ i: i, x: x, y: y, scale: R.s, dir: 1, row: row, z: R.z * 10 + i, size: Ht * 0.19 * R.s, light: 1 });
    }
    return out;
  };
  S.quality = function (n) { return n === undefined ? 1 : S; };
  S.profile = function () { return null; };
  S.pause = function (b) { host.classList.toggle('paused', !!b); return S; };
  S.frames = function () { return 0; };
  S.dispose = function () {
    if (ro) ro.disconnect();
    [world, mob, tint, flash].forEach(function (e) { if (e && e.parentNode) e.parentNode.removeChild(e); });
    host.classList.remove('wl-ds');
  };
  return S;
}

var ACTIVE = null;
function proxy(k) { return function () { if (ACTIVE) ACTIVE[k].apply(ACTIVE, arguments); return ACTIVE; }; }
W.DayScene = {
  BIOMES: B.map(function (b) { return b.n; }),
  TIME: B.map(function (b) { return b.t; }),
  mount: function (el, opts) { if (ACTIVE && ACTIVE.host === el) ACTIVE.dispose(); ACTIVE = Stage(el, opts); return ACTIVE; },
  setBiome: proxy('setBiome'), setMood: proxy('setMood'), setFire: proxy('setFire'), setProgress: proxy('setProgress'),
  shake: proxy('shake'), flash: proxy('flash'), pause: proxy('pause'),
  fire: function () { return 1; }, firePos: function () { return ACTIVE ? ACTIVE.firePos() : { x: 0, y: 0 }; },
  groundY: function () { return ACTIVE ? ACTIVE.groundY() : 0; },
  size: function () { return ACTIVE ? ACTIVE.size() : { w: 0, h: 0 }; },
  slots: function (n, row) { return ACTIVE ? ACTIVE.slots(n, row) : []; },
  quality: function (n) { return ACTIVE ? ACTIVE.quality(n) : 1; },
  dispose: function () { if (ACTIVE) ACTIVE.dispose(); ACTIVE = null; },
  active: function () { return ACTIVE; },
};
})();
