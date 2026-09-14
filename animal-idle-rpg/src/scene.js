/* ============================================================================
 * WL.Scene — 야경 무대 렌더러 "모닥불 무리"
 * 의존성 0 · IIFE · window.WL 에 부착 · 최상위에서 DOM 안 건드림
 * ----------------------------------------------------------------------------
 * 공개 API
 *   WL.Scene.mount(el, opts)   opts {biome:0~9, reduced:bool, seed:int}
 *                              -> handle (아래 메서드 전부 + .bg/.fg/.mob 노출)
 *   WL.Scene.setBiome(i)       지역 전환 (1.1s 크로스페이드)
 *   WL.Scene.setMood(m)        'normal'|'boss'|'victory'|'defeat'
 *   WL.Scene.setFire(v)        0~1 불 세기 강제. null 이면 mood 자동
 *   WL.Scene.setProgress(p)    0~1 존 내 진행도 (달 고도 + 원경 안개)
 *   WL.Scene.shake(power)      0~1 화면 충격
 *   WL.Scene.flash(color, ms)  전면 플래시
 *   WL.Scene.fire()            현재 불의 맥박 0.86~1.14
 *   WL.Scene.firePos()         {x,y,r,strength}
 *   WL.Scene.groundY()         지면선 y (CSS px)
 *   WL.Scene.slots(n, row)     row 'front'|'back'|'air'|'foe' -> 배치 좌표 배열
 *   WL.Scene.pause(b) / dispose()
 * ----------------------------------------------------------------------------
 * 무대 좌표계
 *   mount 은 el 안에 3장을 만든다:
 *     canvas.wl-scene-bg  (z0) 하늘·능선·소품·지면·그림자·모닥불
 *     div   .wl-scene-mob (z1) ← 여기에 WL.Creatures 의 <svg> 를 넣는다
 *     canvas.wl-scene-fg  (z2) 앞 파티클·어둠 비네트·플래시 (pointer-events:none)
 *   카메라 호흡·shake 는 씬이 매 프레임 .wl-scene-mob 의 transform 에 직접 쓴다.
 *   그래서 slots() 는 카메라가 빠진 "무대 기준 좌표"를 돌려준다. 그대로 쓰면 된다.
 * ==========================================================================*/
(function () {
'use strict';

var W = window.WL || (window.WL = {});
var doc = document;

/* ─────────────────── 0. 수학 ─────────────────── */
var PI = Math.PI, TAU = PI * 2;
var abs = Math.abs, sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt;
var min = Math.min, max = Math.max, flr = Math.floor, pw = Math.pow;

function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function lerp(a, b, t) { return a + (b - a) * t; }
function smooth(t) { return t * t * (3 - 2 * t); }
function ss(a, b, t) { return smooth(clamp((t - a) / (b - a || 1e-6), 0, 1)); }
function r3(v) { return Math.round(v * 1000) / 1000; }

/* mulberry32 — 시드 고정 난수 */
function rng(seed) {
  var s = seed >>> 0;
  return function () {
    s = s + 0x6D2B79F5 | 0;
    var t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* 1D 값 노이즈 — 불의 맥박·불꽃 요동 전부 이걸로 */
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
  h = h.replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  var n = parseInt(h, 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}
function rgba(c, a) { return 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + r3(a) + ')'; }
function cmix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }

var PAL = {
  night: hex2rgb('#0E1119'), soot: hex2rgb('#1C2331'), ash: hex2rgb('#2B3346'),
  ember: hex2rgb('#FF9333'), core: hex2rgb('#FFE2A6'), deep: hex2rgb('#C1391A'),
  moon: hex2rgb('#9EB6D6'), firefly: hex2rgb('#C7DE7A'), soul: hex2rgb('#5FD9C4'),
  ink: hex2rgb('#E6DCCB'), white: [255, 246, 224]
};

/* ─────────────────── 2. 스프라이트 캐시 ─────────────────── */
/* 파티클마다 createRadialGradient 하면 죽는다. 32px 스프라이트 1장 만들어 재사용. */
var SPR = {};
/* 색을 8단계로 뭉갠다. 이걸 안 하면 cmix 가 만든 실수 성분이 매 프레임 새 키가 되어
 * 48px 캔버스를 초당 수천 장 만든다 — 실제로 프레임을 반 토막 냈던 버그다. */
function qc(c) { return [c[0] & ~7, c[1] & ~7, c[2] & ~7]; }
function glowSprite(col, soft) {
  col = qc(col);
  var key = col[0] + '_' + col[1] + '_' + col[2] + '_' + soft;
  if (SPR[key]) return SPR[key];
  var S = 48, cv = doc.createElement('canvas'); cv.width = cv.height = S;
  var c = cv.getContext('2d');
  var g = c.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, rgba(col, 1));
  g.addColorStop(soft, rgba(col, 0.42));
  g.addColorStop(1, rgba(col, 0));
  c.fillStyle = g; c.fillRect(0, 0, S, S);
  SPR[key] = cv; return cv;
}
function softSprite(col, a) {           /* 연기·안개용 — 가장자리가 아주 무른 덩어리 */
  col = qc(col);
  var key = 's' + col[0] + '_' + col[1] + '_' + col[2] + '_' + a;
  if (SPR[key]) return SPR[key];
  var S = 64, cv = doc.createElement('canvas'); cv.width = cv.height = S;
  var c = cv.getContext('2d');
  var g = c.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, rgba(col, a));
  g.addColorStop(0.5, rgba(col, a * 0.45));
  g.addColorStop(1, rgba(col, 0));
  c.fillStyle = g; c.fillRect(0, 0, S, S);
  SPR[key] = cv; return cv;
}
var SHADOW_SPR = null;
function shadowSprite() {
  if (SHADOW_SPR) return SHADOW_SPR;
  var S = 64, cv = doc.createElement('canvas'); cv.width = cv.height = S;
  var c = cv.getContext('2d');
  var g = c.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, 'rgba(4,6,10,.95)');
  g.addColorStop(0.45, 'rgba(4,6,10,.55)');
  g.addColorStop(1, 'rgba(4,6,10,0)');
  c.fillStyle = g; c.fillRect(0, 0, S, S);
  SHADOW_SPR = cv; return cv;
}

/* ─────────────────── 3. 경로 헬퍼 ─────────────────── */
/* 점 배열을 중점 quadratic 으로 이어 부드러운 실루엣을 만든다 */
function smoothPath(c, p, n) {
  if (n < 2) return;
  c.lineTo(p[0], p[1]);
  for (var i = 1; i < n - 1; i++) {
    var x = p[i * 2], y = p[i * 2 + 1];
    c.quadraticCurveTo(x, y, (x + p[i * 2 + 2]) / 2, (y + p[i * 2 + 3]) / 2);
  }
  c.lineTo(p[(n - 1) * 2], p[(n - 1) * 2 + 1]);
}
function hardPath(c, p, n) {
  for (var i = 0; i < n; i++) c.lineTo(p[i * 2], p[i * 2 + 1]);
}

/* ─────────────────── 4. 지역 테이블 ─────────────────── */
/* zen 천정 · hor 지평 · glow 지역광 · fog 원경 안개 · gnd 지면 2색 */
var BIOMES = [
  { name: '이끼 낀 숲', zen: '#0A0D14', hor: '#16212A', glow: '#5F8A6B', ga: 0.30, gx: 0.34, gy: 0.96, gw: 0.80, gh: 0.62,
    g2: '#3D6E7A', g2a: 0.13, g2x: 0.86, stars: 0.70, moonA: 0.55, fog: '#18242C', fogA: 0.40,
    ridge: 'forest', props: 'mushroom', gnd: ['#1A2620', '#0D1219'], flyCol: '#C7DE7A',
    part: { c: '#C7DE7A', n: 40, sz: [0.7, 1.7], vy: [-11, -3], vx: [-5, 9], wob: 0.9, glow: 0.85, shape: 'dot', a: 0.30 } },

  { name: '바람의 초원', zen: '#0B0F17', hor: '#1B2434', glow: '#8FA6C4', ga: 0.29, gx: 0.52, gy: 0.98, gw: 1.05, gh: 0.52,
    g2: '#C8B98E', g2a: 0.10, g2x: 0.20, stars: 1.05, moonA: 0.85, fog: '#1C2636', fogA: 0.34,
    ridge: 'plain', props: 'grass', gnd: ['#1D2530', '#0E131B'], flyCol: '#C7DE7A',
    part: { c: '#E6DCCB', n: 52, sz: [0.6, 1.4], vy: [-7, 2], vx: [26, 62], wob: 1.5, glow: 0.5, shape: 'dot', a: 0.26 } },

  { name: '서리 설원', zen: '#0A0E18', hor: '#1E2A3E', glow: '#7FA8D8', ga: 0.30, gx: 0.62, gy: 0.94, gw: 0.95, gh: 0.60,
    g2: '#9EB6D6', g2a: 0.14, g2x: 0.18, stars: 1.25, moonA: 1.00, fog: '#22304A', fogA: 0.46,
    ridge: 'peak', props: 'drift', gnd: ['#26334A', '#101825'], flyCol: '#9EB6D6',
    part: { c: '#DCE8F6', n: 76, sz: [0.8, 1.9], vy: [14, 34], vx: [-14, 18], wob: 1.1, glow: 0.40, shape: 'dot', a: 0.48 } },

  { name: '모래 사막', zen: '#0C0E15', hor: '#241E24', glow: '#C08A55', ga: 0.32, gx: 0.72, gy: 0.98, gw: 0.90, gh: 0.50,
    g2: '#6E7FA0', g2a: 0.12, g2x: 0.14, stars: 1.35, moonA: 0.95, fog: '#241F26', fogA: 0.30,
    ridge: 'dune', props: 'bone', gnd: ['#2A2530', '#12131C'], flyCol: '#FFC98A',
    part: { c: '#D8BC93', n: 66, sz: [0.8, 1.9], vy: [-4, 5], vx: [44, 104], wob: 0.6, glow: 0.35, shape: 'streak', a: 0.30 } },

  { name: '심해 해구', zen: '#060B14', hor: '#0C2230', glow: '#2A7E86', ga: 0.30, gx: 0.44, gy: 0.92, gw: 0.85, gh: 0.70,
    g2: '#5FD9C4', g2a: 0.12, g2x: 0.84, stars: 0.16, moonA: 0.22, fog: '#0D2432', fogA: 0.52,
    ridge: 'trench', props: 'coral', gnd: ['#132630', '#070D14'], flyCol: '#5FD9C4',
    part: { c: '#8FE6DA', n: 44, sz: [1.0, 2.8], vy: [-26, -9], vx: [-5, 7], wob: 1.3, glow: 0.7, shape: 'bubble', a: 0.40 } },

  { name: '울창한 정글', zen: '#080D12', hor: '#132618', glow: '#4E7F4A', ga: 0.19, gx: 0.40, gy: 1.06, gw: 0.72, gh: 0.40,
    g2: '#7C6BB0', g2a: 0.14, g2x: 0.88, stars: 0.32, moonA: 0.35, fog: '#14261A', fogA: 0.44,
    ridge: 'canopy', props: 'fern', gnd: ['#182A1E', '#0A1014'], flyCol: '#C7DE7A',
    part: { c: '#9FB86A', n: 40, sz: [2.2, 5.0], vy: [10, 26], vx: [-16, 16], wob: 2.0, glow: 0.2, shape: 'leaf', a: 0.50 } },

  { name: '화산 지대', zen: '#0D0A10', hor: '#31161A', glow: '#C1391A', ga: 0.34, gx: 0.64, gy: 0.98, gw: 0.95, gh: 0.62,
    g2: '#FF9333', g2a: 0.14, g2x: 0.30, stars: 0.42, moonA: 0.40, fog: '#2E171B', fogA: 0.42,
    ridge: 'volcano', props: 'lava', gnd: ['#2C1D1E', '#120C10'], flyCol: '#FF9333',
    part: { c: '#FFAE6B', n: 54, sz: [0.6, 1.6], vy: [-20, -5], vx: [-8, 16], wob: 1.1, glow: 0.95, shape: 'dot', a: 0.34 } },

  { name: '하늘 절벽', zen: '#0A0F1C', hor: '#25334E', glow: '#9EB6D6', ga: 0.30, gx: 0.50, gy: 0.90, gw: 1.10, gh: 0.66,
    g2: '#C8A8D8', g2a: 0.12, g2x: 0.18, stars: 1.45, moonA: 1.00, fog: '#293856', fogA: 0.36,
    ridge: 'spire', props: 'cloud', gnd: ['#24304A', '#0E1522'], flyCol: '#9EB6D6',
    part: { c: '#BFD2EA', n: 26, sz: [6.0, 16.0], vy: [-2, 2], vx: [10, 30], wob: 0.4, glow: 0.1, shape: 'mist', a: 0.20, yb: [0.26, 0.58] } },

  { name: '고대 습지', zen: '#090D12', hor: '#18231E', glow: '#7A9866', ga: 0.32, gx: 0.46, gy: 0.98, gw: 0.90, gh: 0.54,
    g2: '#5FD9C4', g2a: 0.10, g2x: 0.82, stars: 0.50, moonA: 0.50, fog: '#1A2620', fogA: 0.40,
    ridge: 'swamp', props: 'reed', gnd: ['#1C2622', '#0A1013'], flyCol: '#C7DE7A',
    part: { c: '#A8BE9A', n: 24, sz: [8.0, 20.0], vy: [-1, 1], vx: [6, 18], wob: 0.3, glow: 0.12, shape: 'mist', a: 0.16, yb: [0.66, 0.98] } },

  { name: '별빛 심연', zen: '#07081A', hor: '#171338', glow: '#5B4A9E', ga: 0.30, gx: 0.56, gy: 0.94, gw: 0.95, gh: 0.72,
    g2: '#5FD9C4', g2a: 0.16, g2x: 0.14, stars: 1.70, moonA: 0.60, fog: '#1B1640', fogA: 0.40,
    ridge: 'crystal', props: 'shard', gnd: ['#1D1A3A', '#0A0917'], flyCol: '#5FD9C4',
    part: { c: '#CFC2FF', n: 62, sz: [0.6, 1.7], vy: [-6, 4], vx: [-6, 10], wob: 0.7, glow: 1.0, shape: 'dot', a: 0.38 } }
];

/* 색 문자열을 한 번만 파싱해 둔다 */
(function () {
  for (var i = 0; i < BIOMES.length; i++) {
    var b = BIOMES[i];
    b._zen = hex2rgb(b.zen); b._hor = hex2rgb(b.hor);
    b._glow = hex2rgb(b.glow); b._g2 = hex2rgb(b.g2); b._fog = hex2rgb(b.fog);
    b._g0 = hex2rgb(b.gnd[0]); b._g1 = hex2rgb(b.gnd[1]);
    b._fly = hex2rgb(b.flyCol); b.part._c = hex2rgb(b.part.c);
  }
})();

/* ─────────────────── 5. 무드 ─────────────────── */
var MOODS = {
  normal:  { fire: 1.00, vig: 1.00, warm: 0.00, cool: 0.00, emb: 1.0, smk: 1.0, red: 0.00, spd: 1.00, star: 1.00 },
  boss:    { fire: 0.70, vig: 1.18, warm: 0.00, cool: 0.00, emb: 2.0, smk: 1.5, red: 0.52, spd: 1.30, star: 0.62 },
  victory: { fire: 1.16, vig: 0.80, warm: 0.13, cool: 0.00, emb: 1.7, smk: 0.6, red: 0.00, spd: 1.08, star: 1.40 },
  defeat:  { fire: 0.46, vig: 1.38, warm: 0.00, cool: 0.18, emb: 0.4, smk: 2.0, red: 0.08, spd: 0.50, star: 0.55 }
};
var MKEYS = ['fire', 'vig', 'warm', 'cool', 'emb', 'smk', 'red', 'spd', 'star'];

/* 무대 행(row) 정의 — y 는 gY 기준 H 배수 오프셋 */
var ROWS = {
  front: { x0: 0.440, x1: 0.600, y:  0.000, s: 1.00, z: 3, dir:  1 },
  back:  { x0: 0.300, x1: 0.440, y: -0.060, s: 0.86, z: 2, dir:  1 },
  air:   { x0: 0.340, x1: 0.580, y: -0.260, s: 0.92, z: 4, dir:  1 },
  foe:   { x0: 0.740, x1: 0.880, y:  0.000, s: 1.06, z: 3, dir: -1 }
};

/* ─────────────────── 6. 능선 생성기 ─────────────────── */
/* 반환 {polys:[Float32Array(x,h …)], smooth:bool}
 * x 는 0~1 을 넘어 -0.14~1.14 (시차 여유), h 는 기준선 위 높이(H 배수). */

function pushPoly(out, arr) { out.push(new Float32Array(arr)); }

function ridgeForest(r, lay) {
  var polys = [], a = [], x, base, i;
  var hMul = lay ? 0.62 : 1, step = 0.016;
  /* 밑둥 구릉 + 침엽수 톱니 */
  for (x = -0.14; x <= 1.145; x += step) {
    base = 0.036 * hMul + sin(x * 7.1 + lay * 2) * 0.012 * hMul + sin(x * 17.3) * 0.005;
    if (r() < (lay ? 0.34 : 0.46)) {            /* 간격도 키도 제각각이어야 숲이다 */
      var tall = r();
      var h = base + (0.022 + tall * tall * 0.105) * hMul;
      var w = step * (0.6 + tall * 1.5);
      a.push(x - w, base, x - w * 0.42, base + (h - base) * 0.30,
             x - w * 0.55, base + (h - base) * 0.34, x, h,
             x + w * 0.55, base + (h - base) * 0.34, x + w * 0.42, base + (h - base) * 0.30, x + w, base);
    } else a.push(x, base);
  }
  pushPoly(polys, a);
  return { polys: polys, smooth: false };
}

function ridgePlain(r, lay) {
  var a = [], x, hMul = lay ? 0.55 : 1;
  var p1 = r() * 6, p2 = r() * 6;
  for (x = -0.14; x <= 1.145; x += 0.02) {
    var h = (0.052 + sin(x * 3.4 + p1) * 0.032 + sin(x * 8.2 + p2) * 0.012 + sin(x * 1.7) * 0.022) * hMul;
    a.push(x, max(0.004, h));
  }
  return { polys: [new Float32Array(a)], smooth: true };
}

function ridgePeak(r, lay) {
  var a = [], x = -0.14, hMul = lay ? 0.52 : 1;
  a.push(x, 0.012);
  while (x < 1.145) {
    var w = 0.10 + r() * 0.13;
    var h = (0.065 + r() * 0.115) * hMul;
    var sk = (r() - 0.5) * 0.5;                 /* 비대칭 봉우리 */
    a.push(x + w * (0.34 + sk * 0.2), h * 0.52, x + w * (0.5 + sk * 0.18), h,
           x + w * 0.70, h * 0.60, x + w * 0.82, h * 0.70, x + w, 0.016 + r() * 0.014);
    x += w;
  }
  a.push(1.145, 0.012);
  return { polys: [new Float32Array(a)], smooth: false };
}

function ridgeDune(r, lay) {
  var a = [], x, hMul = lay ? 0.58 : 1, p1 = r() * 6;
  for (x = -0.14; x <= 1.145; x += 0.014) {
    var s = sin(x * 2.6 + p1);
    /* 능선을 한쪽으로 몰아 사구 특유의 칼날 crest */
    var sh = s >= 0 ? pw(s, 0.78) : -pw(-s, 1.5);
    var h = (0.072 + sh * 0.058 + sin(x * 6.1 + p1 * 2) * 0.010) * hMul;
    a.push(x, max(0.005, h));
  }
  return { polys: [new Float32Array(a)], smooth: true };
}

function ridgeTrench(r, lay) {
  var polys = [], i, n = lay ? 7 : 10, hMul = lay ? 0.6 : 1;
  var base = [];
  for (var x = -0.14; x <= 1.145; x += 0.03) base.push(x, 0.020 * hMul + sin(x * 5.3) * 0.007);
  pushPoly(polys, base);
  for (i = 0; i < n; i++) {                     /* 열수구 굴뚝 */
    var cx = -0.10 + (i + r() * 0.7) / n * 1.22;
    var h = (0.070 + r() * 0.150) * hMul, w = (0.014 + r() * 0.020) * hMul;
    pushPoly(polys, [cx - w, 0, cx - w * 0.72, h * 0.45, cx - w * 0.52, h * 0.82,
                     cx - w * 0.74, h, cx + w * 0.66, h * 0.96, cx + w * 0.46, h * 0.78,
                     cx + w * 0.70, h * 0.40, cx + w, 0]);
  }
  return { polys: polys, smooth: false };
}

function ridgeCanopy(r, lay) {
  var polys = [], i, hMul = lay ? 0.6 : 1;
  var a = [], x;
  for (x = -0.14; x <= 1.145; x += 0.012) {     /* 둥근 수관이 겹친 덩어리 */
    var h = 0.055 * hMul;
    h += abs(sin(x * 9.1 + 0.7)) * 0.030 * hMul;
    h += abs(sin(x * 4.3 + 2.1)) * 0.026 * hMul;
    a.push(x, h);
  }
  pushPoly(polys, a);
  for (i = 0; i < (lay ? 2 : 4); i++) {         /* 돌출목 */
    var cx = -0.05 + r() * 1.1, h = (0.13 + r() * 0.10) * hMul, w = 0.010 + r() * 0.008;
    pushPoly(polys, [cx - w * 0.5, 0, cx - w * 0.22, h * 0.72, cx - w * 1.9, h * 0.80,
                     cx - w * 0.3, h * 0.90, cx, h, cx + w * 0.3, h * 0.90,
                     cx + w * 2.1, h * 0.78, cx + w * 0.22, h * 0.70, cx + w * 0.5, 0]);
  }
  return { polys: polys, smooth: false };
}

function ridgeVolcano(r, lay) {
  var polys = [], hMul = lay ? 0.55 : 1;
  var a = [], x;
  for (x = -0.14; x <= 1.145; x += 0.02) a.push(x, (0.024 + sin(x * 4.1) * 0.010) * hMul);
  pushPoly(polys, a);
  function cone(cx, h, w, notch) {
    var p = [cx - w, 0, cx - w * 0.46, h * 0.60, cx - w * 0.20, h];
    if (notch) p.push(cx - w * 0.09, h * 0.90, cx + w * 0.09, h * 0.90);
    p.push(cx + w * 0.22, h, cx + w * 0.48, h * 0.58, cx + w, 0);
    pushPoly(polys, p);
  }
  cone(0.60 + r() * 0.1, (0.17 + r() * 0.09) * hMul, 0.26, true);
  cone(0.16 + r() * 0.1, (0.08 + r() * 0.05) * hMul, 0.17, false);
  if (!lay) cone(0.92, 0.10 * hMul, 0.15, true);
  return { polys: polys, smooth: false };
}

function ridgeSpire(r, lay) {
  var polys = [], floats = [], i, n = lay ? 4 : 5, hMul = lay ? 0.6 : 1;
  for (i = 0; i < n; i++) {                     /* 땅에 박힌 메사 — 수직 벽에 평평한 정상 */
    var cx = -0.08 + (i + 0.15 + r() * 0.5) / n * 1.20;
    var h = (0.075 + r() * 0.150) * hMul, w = 0.026 + r() * 0.036;
    var tw = w * (0.42 + r() * 0.18);           /* 정상은 밑변보다 좁다 — 그래야 절벽이 선다 */
    pushPoly(polys, [cx - w, 0, cx - w * 0.88, h * 0.16, cx - w * 0.71, h * 0.29,
                     cx - tw * 1.18, h * 0.63, cx - tw * 1.04, h * 0.89, cx - tw, h,
                     cx + tw * 0.96, h, cx + tw * 1.08, h * 0.87, cx + tw * 1.22, h * 0.56,
                     cx + w * 0.76, h * 0.27, cx + w * 0.93, h * 0.13, cx + w, 0]);
    floats.push(0);
  }
  for (i = 0; i < (lay ? 2 : 3); i++) {         /* 허공에 뜬 섬 — 위는 평평, 아래는 뾰족 */
    var fx = 0.05 + r() * 1.0;
    var fy = (0.17 + r() * 0.16) * hMul;        /* 바닥 높이 */
    var fw = 0.026 + r() * 0.034, fh = (0.055 + r() * 0.075) * hMul;
    /* 위는 칼같이 평평하고 아래는 한 점으로 모인다 — 뒤집힌 물방울이 '떠 있음'을 만든다 */
    pushPoly(polys, [fx - fw, fy + fh, fx + fw, fy + fh,
                     fx + fw * 0.50, fy + fh * 0.54, fx + fw * 0.30, fy + fh * 0.22,
                     fx + fw * 0.06, fy, fx - fw * 0.16, fy + fh * 0.13,
                     fx - fw * 0.44, fy + fh * 0.30, fx - fw * 0.78, fy + fh * 0.58]);
    floats.push(1);
  }
  return { polys: polys, smooth: false, floats: floats };
}

function ridgeSwamp(r, lay) {
  var polys = [], i, hMul = lay ? 0.6 : 1;
  var a = [], x;
  for (x = -0.14; x <= 1.145; x += 0.018)
    a.push(x, (0.026 + abs(sin(x * 3.2 + 1.1)) * 0.026 + sin(x * 9.7) * 0.005) * hMul);
  pushPoly(polys, a);
  for (i = 0; i < (lay ? 3 : 6); i++) {         /* 죽은 나무 — 갈라진 몸통 */
    var cx = -0.06 + r() * 1.14, h = (0.090 + r() * 0.105) * hMul, w = 0.005 + r() * 0.005;
    var bend = (r() - 0.5) * 0.035;
    pushPoly(polys, [cx - w, 0, cx - w * 0.5 + bend * 0.5, h * 0.55,
                     cx - w * 3.6 + bend, h * 0.74, cx - w * 0.4 + bend * 0.8, h * 0.70,
                     cx + bend, h, cx + w * 0.7 + bend * 0.9, h * 0.66,
                     cx + w * 4.2 + bend, h * 0.80, cx + w * 0.6 + bend * 0.4, h * 0.50, cx + w, 0]);
  }
  return { polys: polys, smooth: false };
}

function ridgeCrystal(r, lay) {
  var polys = [], i, n = lay ? 6 : 9, hMul = lay ? 0.58 : 1;
  var a = [], x;
  for (x = -0.14; x <= 1.145; x += 0.03) a.push(x, 0.014 * hMul);
  pushPoly(polys, a);
  for (i = 0; i < n; i++) {                     /* 각진 수정 결정 */
    var cx = -0.10 + (i + r() * 0.8) / n * 1.24;
    var h = (0.055 + r() * 0.185) * hMul, w = (0.012 + r() * 0.026);
    var lean = (r() - 0.5) * w * 1.6;
    pushPoly(polys, [cx - w, 0, cx - w * 0.72, h * 0.66, cx + lean, h,
                     cx + w * 0.60, h * 0.58, cx + w * 0.86, h * 0.24, cx + w, 0]);
  }
  return { polys: polys, smooth: false };
}

var RIDGE = {
  forest: ridgeForest, plain: ridgePlain, peak: ridgePeak, dune: ridgeDune,
  trench: ridgeTrench, canopy: ridgeCanopy, volcano: ridgeVolcano,
  spire: ridgeSpire, swamp: ridgeSwamp, crystal: ridgeCrystal
};

/* ─────────────────── 7. 중경 소품 ─────────────────── */
/* 인스턴스 {x, d(깊이 0먼~1가까운), s(스케일), v(변종), ph(위상), r(개별난수)} */
/* 카메라 코앞의 큰 실루엣 몇 개. 밑변을 눌러 주면 무대에 깊이가 생긴다. */
function buildFore(r) {
  var out = [], i, n = 5;
  for (i = 0; i < n; i++) {
    var x = (i + 0.15 + r() * 0.7) / n;
    if (x > 0.20 && x < 0.36) x += 0.22;               /* 모닥불은 가리지 않는다 */
    out.push({ x: x, d: 1, s: 0.8 + r() * 0.5, v: r() < 0.5 ? 0 : 2, ph: r() * TAU, r: r(), r2: r() });
  }
  return out;
}

function buildProps(kind, r) {
  var out = [], n = 32, i;
  for (i = 0; i < n; i++) {
    var x = -0.06 + (i + r() * 0.85) / n * 1.14;
    /* 오른쪽(적 영역)은 성기게 — 어둠이 읽혀야 한다 */
    if (x > 0.70 && r() < 0.42) continue;
    /* 모닥불 바로 자리는 비운다 */
    if (x > 0.21 && x < 0.33 && r() < 0.55) continue;
    out.push({ x: x, d: r(), s: 0, v: flr(r() * 3), ph: r() * TAU, r: r(), r2: r() });
  }
  for (i = 0; i < out.length; i++) out[i].s = lerp(0.52, 1.0, out[i].d);
  out.sort(function (a, b) { return a.d - b.d; });
  return { kind: kind, list: out };
}

/* 공통: 소품 본체색(거의 밤) / 불 쪽 림 / 달 쪽 림 */
function propInk(st, lit) { return rgba(cmix(PAL.night, PAL.soot, 0.22 + lit * 0.40), 1); }

function pMushroom(c, P, x, y, s, t, lit, st) {
  var sw = sin(t * 0.6 + P.ph) * 1.2 * s;
  if (P.v === 2) {                                     /* 고사리 다발 */
    c.strokeStyle = propInk(st, lit); c.lineWidth = 1.6 * s; c.lineCap = 'round';
    for (var i = 0; i < 6; i++) {
      var a = -PI / 2 + (i - 2.5) * 0.30, L = (16 + P.r * 9) * s;
      c.beginPath(); c.moveTo(x, y);
      c.quadraticCurveTo(x + cos(a) * L * 0.5, y + sin(a) * L * 0.62,
                         x + cos(a) * L + sw, y + sin(a) * L * 0.9);
      c.stroke();
    }
    return;
  }
  var h = (8 + P.r * 8) * s, cw = (7.5 + P.r2 * 6.5) * s;
  c.fillStyle = propInk(st, lit);
  c.beginPath(); c.moveTo(x - 3.0 * s, y);             /* 대 */
  c.quadraticCurveTo(x - 2.1 * s + sw * 0.4, y - h * 0.6, x - 1.8 * s + sw, y - h);
  c.lineTo(x + 1.8 * s + sw, y - h);
  c.quadraticCurveTo(x + 2.1 * s + sw * 0.4, y - h * 0.6, x + 3.0 * s, y);
  c.closePath(); c.fill();
  c.beginPath();                                        /* 갓 */
  c.moveTo(x - cw + sw, y - h);
  c.quadraticCurveTo(x + sw, y - h - cw * 1.30, x + cw + sw, y - h);
  c.quadraticCurveTo(x + sw, y - h + cw * 0.30, x - cw + sw, y - h);
  c.fill();
  if (lit > 0.04) {                                     /* 불 쪽 아래-왼 림 */
    c.strokeStyle = rgba(PAL.ember, lit * 0.5); c.lineWidth = 1.1 * s;
    c.beginPath(); c.moveTo(x - cw * 0.95 + sw, y - h + cw * 0.06);
    c.quadraticCurveTo(x - cw * 0.5 + sw, y - h - cw * 0.72, x + sw * 0.6, y - h - cw * 1.02);
    c.stroke();
  }
  if (!st.fore) {                                      /* 발광 포자점 */
    c.fillStyle = rgba(PAL.firefly, 0.16 + P.r * 0.12);
    c.beginPath(); c.arc(x + sw * 0.8, y - h - cw * 0.4, 1.0 * s, 0, TAU); c.fill();
  }
}

function pGrass(c, P, x, y, s, t, lit, st) {
  var n = 6 + (P.r * 4 | 0), i;
  c.strokeStyle = propInk(st, lit); c.lineWidth = 1.3 * s; c.lineCap = 'round';
  for (i = 0; i < n; i++) {
    var f = (i / (n - 1) - 0.5), L = (15 + P.r * 16) * s * (1 - abs(f) * 0.42);
    var sw = sin(t * 1.05 + P.ph + i * 0.5) * (2.4 + L * 0.10);
    c.beginPath(); c.moveTo(x + f * 7 * s, y);
    c.quadraticCurveTo(x + f * 10 * s + sw * 0.4, y - L * 0.58, x + f * 13 * s + sw, y - L);
    c.stroke();
  }
  if (lit > 0.05) {                                     /* 불빛 받은 잎끝 */
    c.strokeStyle = rgba(PAL.ember, lit * 0.30); c.lineWidth = 0.9 * s;
    c.beginPath(); c.moveTo(x - 5 * s, y - 4 * s);
    c.quadraticCurveTo(x - 2 * s, y - 16 * s, x + sin(t + P.ph) * 3 - 1 * s, y - 24 * s);
    c.stroke();
  }
}

function pDrift(c, P, x, y, s, t, lit, st) {
  var w = (26 + P.r * 30) * s, h = (7 + P.r2 * 9) * s;
  c.fillStyle = rgba(cmix(st.gndTop, PAL.moon, 0.14 + lit * 0.10), 1);
  c.beginPath(); c.moveTo(x - w, y + 2 * s);
  c.quadraticCurveTo(x - w * 0.45, y - h, x + w * 0.1, y - h * 0.82);
  c.quadraticCurveTo(x + w * 0.6, y - h * 0.6, x + w, y + 2 * s);
  c.closePath(); c.fill();
  c.strokeStyle = rgba(PAL.moon, 0.20);  c.lineWidth = 1.1 * s;   /* 달빛 능선 */
  c.beginPath(); c.moveTo(x - w * 0.9, y);
  c.quadraticCurveTo(x - w * 0.4, y - h * 0.95, x + w * 0.12, y - h * 0.80); c.stroke();
  if (P.v === 0) {                                      /* 언 관목 */
    c.strokeStyle = propInk(st, lit * 0.6); c.lineWidth = 1.2 * s; c.lineCap = 'round';
    for (var i = 0; i < 5; i++) {
      var a = -PI / 2 + (i - 2) * 0.34, L = (12 + P.r * 12) * s;
      c.beginPath(); c.moveTo(x + w * 0.2, y - h * 0.5);
      c.lineTo(x + w * 0.2 + cos(a) * L, y - h * 0.5 + sin(a) * L); c.stroke();
    }
  }
}

function pBone(c, P, x, y, s, t, lit, st) {
  c.fillStyle = propInk(st, lit);
  if (P.v === 0) {                                      /* 선인장 */
    var h = (22 + P.r * 26) * s, w = 3.4 * s;
    c.beginPath();
    c.moveTo(x - w, y); c.lineTo(x - w, y - h + w); c.quadraticCurveTo(x - w, y - h, x, y - h);
    c.quadraticCurveTo(x + w, y - h, x + w, y - h + w); c.lineTo(x + w, y); c.closePath(); c.fill();
    var ay = y - h * 0.62, aw = (9 + P.r2 * 7) * s;     /* 팔 */
    c.beginPath(); c.moveTo(x + w * 0.6, ay); c.lineTo(x + aw, ay);
    c.quadraticCurveTo(x + aw + w, ay, x + aw + w, ay - w * 2.4);
    c.lineTo(x + aw + w, ay - h * 0.30); c.lineTo(x + aw - w * 0.4, ay - h * 0.30);
    c.lineTo(x + aw - w * 0.4, ay - w * 1.6); c.lineTo(x + w * 0.6, ay - w * 1.6); c.closePath(); c.fill();
    if (lit > 0.05) { c.strokeStyle = rgba(PAL.ember, lit * 0.42); c.lineWidth = 1.2 * s;
      c.beginPath(); c.moveTo(x - w, y - 2 * s); c.lineTo(x - w, y - h + w); c.stroke(); }
  } else {                                              /* 갈비뼈 */
    var rw = (14 + P.r * 12) * s, rh = (11 + P.r2 * 13) * s, i;
    c.strokeStyle = rgba(cmix(PAL.night, PAL.ink, st.fore ? 0.07 : 0.09 + lit * 0.13), 1);
    c.lineWidth = 1.5 * s; c.lineCap = 'round';
    for (i = 0; i < 4; i++) {
      var k = i / 3;
      c.beginPath();
      c.moveTo(x - rw * 0.8 + k * rw * 1.5, y);
      c.quadraticCurveTo(x - rw * 0.2 + k * rw * 1.3, y - rh * (1 - k * 0.3), x + rw * 0.5 + k * rw, y - rh * 0.15);
      c.stroke();
    }
    c.lineWidth = 2.4 * s; c.beginPath();               /* 척추 */
    c.moveTo(x - rw, y - rh * 0.10); c.quadraticCurveTo(x, y - rh * 0.55, x + rw * 1.4, y - rh * 0.18); c.stroke();
  }
}

function pCoral(c, P, x, y, s, t, lit, st) {
  var sway = sin(t * 0.42 + P.ph) * 0.10;
  if (P.v === 2) {                                      /* 관벌레 */
    for (var i = 0; i < 3; i++) {
      var tx = x + (i - 1) * 6 * s, h = (14 + ((i * 37 + P.r * 91) % 13)) * s;
      c.fillStyle = propInk(st, lit);
      c.beginPath(); c.moveTo(tx - 2.2 * s, y);
      c.quadraticCurveTo(tx - 1.4 * s, y - h, tx - 2.6 * s + sway * 8, y - h);
      c.lineTo(tx + 2.6 * s + sway * 8, y - h);
      c.quadraticCurveTo(tx + 1.4 * s, y - h, tx + 2.2 * s, y); c.closePath(); c.fill();
      c.fillStyle = rgba(PAL.soul, st.fore ? 0.05 : 0.22 + lit * 0.18);
      c.beginPath(); c.ellipse(tx + sway * 8, y - h, 2.8 * s, 1.3 * s, 0, 0, TAU); c.fill();
    }
    return;
  }
  c.strokeStyle = propInk(st, lit); c.lineCap = 'round';
  (function branch(bx, by, ang, L, w, dep) {            /* 2단 가지치기 */
    c.lineWidth = w; c.beginPath(); c.moveTo(bx, by);
    var ex = bx + cos(ang) * L, ey = by + sin(ang) * L;
    c.quadraticCurveTo(bx + cos(ang) * L * 0.5 - L * 0.14, by + sin(ang) * L * 0.5, ex, ey);
    c.stroke();
    if (dep <= 0) {
      c.fillStyle = rgba(PAL.soul, st.fore ? 0.04 : 0.16 + lit * 0.14);
      c.beginPath(); c.arc(ex, ey, w * 0.9, 0, TAU); c.fill(); return;
    }
    branch(ex, ey, ang - 0.50 + sway, L * 0.62, w * 0.66, dep - 1);
    branch(ex, ey, ang + 0.46 + sway, L * 0.58, w * 0.66, dep - 1);
  })(x, y, -PI / 2 + sway, (15 + P.r * 13) * s, 3.0 * s, 2);
}

function pFern(c, P, x, y, s, t, lit, st) {
  var sway = sin(t * 0.5 + P.ph) * 0.075;
  c.strokeStyle = propInk(st, lit); c.lineCap = 'round';
  if (P.v === 2) {                                      /* 늘어진 덩굴 */
    var L = (40 + P.r * 40) * s;
    c.lineWidth = 1.5 * s;
    c.beginPath(); c.moveTo(x, y - L * 1.5);
    c.quadraticCurveTo(x + sway * 40, y - L * 0.7, x + sway * 26, y); c.stroke();
    c.fillStyle = propInk(st, lit);
    for (var k = 0; k < 5; k++) {
      var f = 0.2 + k * 0.18, vy = y - L * 1.5 + L * 1.5 * f;
      c.beginPath(); c.ellipse(x + sway * 40 * f + (k % 2 ? 3.4 : -3.4) * s, vy, 3.6 * s, 1.7 * s, k % 2 ? 0.4 : -0.4, 0, TAU); c.fill();
    }
    return;
  }
  for (var i = 0; i < 4; i++) {                         /* 큰 잎자루 4장 */
    var a = -PI / 2 + (i - 1.5) * 0.46 + sway, L2 = (26 + P.r * 20) * s;
    var ex = x + cos(a) * L2, ey = y + sin(a) * L2 * 0.92;
    c.lineWidth = 1.8 * s;
    c.beginPath(); c.moveTo(x, y);
    c.quadraticCurveTo(x + cos(a) * L2 * 0.5, y + sin(a) * L2 * 0.40, ex, ey); c.stroke();
    c.lineWidth = 1.0 * s;                              /* 작은 잎 */
    for (var j = 1; j <= 4; j++) {
      var f2 = j / 4.6, px = lerp(x, ex, f2), py = lerp(y, ey, f2 * 0.86);
      c.beginPath(); c.moveTo(px, py); c.lineTo(px - cos(a) * 5 * s + 5 * s, py - 4 * s); c.stroke();
      c.beginPath(); c.moveTo(px, py); c.lineTo(px - cos(a) * 5 * s - 5 * s, py - 4 * s); c.stroke();
    }
  }
}

function pLava(c, P, x, y, s, t, lit, st) {
  var w = (13 + P.r * 20) * s, h = (9 + P.r2 * 16) * s;
  c.fillStyle = rgba(cmix(PAL.night, PAL.soot, 0.5), 1);
  c.beginPath();                                        /* 각진 현무암 */
  c.moveTo(x - w, y); c.lineTo(x - w * 0.72, y - h * 0.64); c.lineTo(x - w * 0.14, y - h);
  c.lineTo(x + w * 0.46, y - h * 0.80); c.lineTo(x + w, y - h * 0.22); c.lineTo(x + w * 0.9, y);
  c.closePath(); c.fill();
  if (st.fore) return;                                  /* 코앞의 바위는 그냥 검다 */
  var pu = 0.5 + 0.5 * sin(t * 1.7 + P.ph);             /* 용암 균열 — 스스로 맥동 */
  c.strokeStyle = rgba(cmix(PAL.deep, PAL.ember, pu * 0.55), 0.26 + pu * 0.20);
  c.lineWidth = 1.2 * s; c.lineCap = 'round';
  c.beginPath(); c.moveTo(x - w * 0.62, y - h * 0.12);
  c.lineTo(x - w * 0.16, y - h * 0.52); c.lineTo(x + w * 0.24, y - h * 0.30);
  c.lineTo(x + w * 0.74, y - h * 0.50); c.stroke();
  c.globalCompositeOperation = 'lighter';
  c.globalAlpha = 0.09 + pu * 0.08;
  var g = glowSprite(PAL.deep, 0.4), R = w * 1.4;
  c.drawImage(g, x - R, y - h * 0.4 - R * 0.6, R * 2, R * 1.2);
  c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
}

function pCloud(c, P, x, y, s, t, lit, st) {
  if (st.fore) {                                        /* 코앞은 바위 실루엣만 */
    c.fillStyle = propInk(st, 0);
    c.beginPath(); c.moveTo(x - 13 * s, y); c.lineTo(x - 7 * s, y - 15 * s);
    c.lineTo(x + 3 * s, y - 20 * s); c.lineTo(x + 11 * s, y - 7 * s); c.lineTo(x + 14 * s, y);
    c.closePath(); c.fill(); return;
  }
  var dx = ((t * (3 + P.r * 5) * s) % 1600) - 200;      /* 흘러간다 */
  var cx = x + dx * 0.06, w = (40 + P.r * 55) * s, h = (7 + P.r2 * 7) * s;
  c.globalAlpha = 0.30 + P.r2 * 0.18;
  var sp = softSprite(cmix(PAL.ash, PAL.moon, 0.34), 0.6);
  for (var i = 0; i < 4; i++) {
    var f = (i / 3 - 0.5), ww = w * (0.55 - abs(f) * 0.22);
    c.drawImage(sp, cx + f * w * 0.9 - ww, y - h * 1.2 - h * 0.5, ww * 2, h * 2.6);
  }
  c.globalAlpha = 1;
  if (P.v === 0) {                                      /* 절벽 위 바위 */
    c.fillStyle = propInk(st, lit);
    c.beginPath(); c.moveTo(x - 9 * s, y); c.lineTo(x - 5 * s, y - 12 * s);
    c.lineTo(x + 2 * s, y - 16 * s); c.lineTo(x + 8 * s, y - 5 * s); c.lineTo(x + 10 * s, y);
    c.closePath(); c.fill();
  }
}

function pReed(c, P, x, y, s, t, lit, st) {
  if (P.v === 0) {                                      /* 수련잎 + 물반사 */
    c.fillStyle = propInk(st, lit * 0.7);
    for (var k = 0; k < 3; k++) {
      var lx = x + (k - 1) * 11 * s, ly = y + k % 2 * 2 * s;
      c.beginPath(); c.ellipse(lx, ly, (7 + k * 2) * s, 2.4 * s, 0, 0, TAU); c.fill();
    }
    if (lit > 0.05) { c.strokeStyle = rgba(PAL.ember, lit * 0.34); c.lineWidth = 1 * s;
      c.beginPath(); c.ellipse(x - 11 * s, y, 7 * s, 2.4 * s, 0, PI * 0.85, PI * 1.9); c.stroke(); }
    return;
  }
  var n = 5 + (P.r * 4 | 0);
  c.strokeStyle = propInk(st, lit); c.lineWidth = 1.4 * s; c.lineCap = 'round';
  for (var i = 0; i < n; i++) {
    var f = (i / (n - 1) - 0.5), L = (24 + P.r * 26) * s * (1 - abs(f) * 0.3);
    var sw = sin(t * 0.72 + P.ph + i * 0.7) * (2.6 + L * 0.07);
    var tx = x + f * 9 * s + sw, ty = y - L;
    c.beginPath(); c.moveTo(x + f * 5 * s, y);
    c.quadraticCurveTo(x + f * 7 * s + sw * 0.4, y - L * 0.6, tx, ty); c.stroke();
    if (i % 2 === 0) {                                  /* 씨앗 이삭 */
      c.fillStyle = propInk(st, lit + 0.12);
      c.beginPath(); c.ellipse(tx, ty - 2 * s, 1.5 * s, 4 * s, sw * 0.03, 0, TAU); c.fill();
    }
  }
}

function pShard(c, P, x, y, s, t, lit, st) {
  var bob = sin(t * 0.55 + P.ph) * 4 * s;               /* 떠 있다 */
  var h = (18 + P.r * 30) * s, w = (5 + P.r2 * 7) * s, yy = y - 14 * s + bob;
  c.fillStyle = rgba(cmix(PAL.night, PAL.soul, st.fore ? 0.055 : 0.14), 1);
  c.beginPath();
  c.moveTo(x, yy - h); c.lineTo(x + w, yy - h * 0.42); c.lineTo(x + w * 0.55, yy);
  c.lineTo(x - w * 0.6, yy); c.lineTo(x - w, yy - h * 0.48); c.closePath(); c.fill();
  c.fillStyle = rgba(PAL.soul, st.fore ? 0.035 : 0.085 + lit * 0.07);   /* 안쪽 면 */
  c.beginPath(); c.moveTo(x, yy - h); c.lineTo(x + w, yy - h * 0.42); c.lineTo(x + w * 0.55, yy);
  c.lineTo(x + w * 0.06, yy - h * 0.3); c.closePath(); c.fill();
  if (st.fore) return;
  c.globalCompositeOperation = 'lighter'; c.globalAlpha = 0.07 + 0.05 * sin(t * 0.9 + P.ph);
  var g = glowSprite(PAL.soul, 0.35), R = h * 0.62;
  c.drawImage(g, x - R, yy - h * 0.5 - R, R * 2, R * 2);
  c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
}

var PROPD = {
  mushroom: pMushroom, grass: pGrass, drift: pDrift, bone: pBone, coral: pCoral,
  fern: pFern, lava: pLava, cloud: pCloud, reed: pReed, shard: pShard
};

/* ─────────────────── 8. 무대 ─────────────────── */
var CSSID = 'wl-scene-css';
function injectCSS() {
  if (doc.getElementById(CSSID)) return;
  var st = doc.createElement('style'); st.id = CSSID;
  st.textContent =
    '.wl-scene{position:relative;overflow:hidden;background:#0E1119;isolation:isolate}' +
    '.wl-scene>canvas{position:absolute;left:0;top:0;width:100%;height:100%;display:block}' +
    '.wl-scene-bg{z-index:0}' +
    '.wl-scene-mob{position:absolute;left:0;top:0;width:100%;height:100%;z-index:1;' +
      'will-change:transform;transform-origin:0 0}' +
    '.wl-scene-fg{z-index:2;pointer-events:none}';
  (doc.head || doc.documentElement).appendChild(st);
}

function Stage(host, opts) {
  opts = opts || {};
  var S = {};
  injectCSS();

  /* ---- DOM ---- */
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  host.classList.add('wl-scene');
  var bg = doc.createElement('canvas'); bg.className = 'wl-scene-bg';
  var mob = doc.createElement('div');   mob.className = 'wl-scene-mob';
  var fg = doc.createElement('canvas'); fg.className = 'wl-scene-fg';
  bg.setAttribute('aria-hidden', 'true'); fg.setAttribute('aria-hidden', 'true');
  host.appendChild(bg); host.appendChild(mob); host.appendChild(fg);
  var cb = bg.getContext('2d'), cf = fg.getContext('2d');

  /* ---- 상태 ---- */
  var seed = opts.seed == null ? 20260914 : opts.seed | 0;
  var nz = makeNoise(seed), nz2 = makeNoise(seed ^ 0x5bf03635);
  var Wd = 0, Ht = 0, dpr = 1, dprF = 1, gY = 0, farY = 0, fireX = 0;
  var t = 0, lastTS = 0, raf = 0, paused = false, dead = false, everDrawn = false;
  var mql = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduced = opts.reduced != null ? !!opts.reduced : !!(mql && mql.matches);

  var bi = clamp(opts.biome | 0, 0, 9);
  var BA = BIOMES[bi], BB = BIOMES[bi], geoA = null, geoB = null, xf = 1;
  var mood = 'normal', mv = {}, mt = MOODS.normal, k;
  for (k = 0; k < MKEYS.length; k++) mv[MKEYS[k]] = MOODS.normal[MKEYS[k]];
  var fireForce = null, progress = 0, pulse = 1;
  var shakeMag = 0, shakeT = 0, flashT = 0, flashDur = 0, flashCol = PAL.core;
  var camX = 0, camY = 0;
  var occ = { front: [], back: [], air: [], foe: [] };
  var stEnv = { gndTop: PAL.ash, fore: false };         /* 소품 drawer 에 넘기는 환경 */

  /* ---- 풀 ---- */
  var stars = [], parts = [], flies = [], embs = [], smks = [];
  var PN = 0, FN = 0, EN = 0, SN = 0;

  function buildGeo(b, s2) {
    var r = rng(s2);
    return {
      b: b,
      far: RIDGE[b.ridge](r, 1),
      near: RIDGE[b.ridge](r, 0),
      props: buildProps(b.props, r),
      fore: buildFore(r)
    };
  }

  function makeStars() {
    var r = rng(seed ^ 0x9e3779b9), i, n = 150;
    stars.length = 0;
    for (i = 0; i < n; i++) {
      var yy = pw(r(), 1.7);                            /* 위쪽에 몰리게 */
      stars.push({ x: r(), y: yy * 0.74, r: 0.4 + pw(r(), 2.4) * 1.5,
                   a: 0.22 + r() * 0.66, ph: r() * TAU, sp: 0.25 + r() * 1.5 });
    }
  }

  function allocPools() {
    var r = rng(seed ^ 0x2545f491), i;
    PN = reduced ? 34 : 86;  FN = reduced ? 6 : 14;  EN = reduced ? 14 : 42;  SN = reduced ? 6 : 16;
    parts.length = 0; flies.length = 0; embs.length = 0; smks.length = 0;
    for (i = 0; i < PN; i++) parts.push({ x: r(), y: r(), vx: 0, vy: 0, sz: 1, ph: r() * TAU, a: 1, g: 1, sw: r() * 0.82, rot: r() * TAU, rv: 0, on: false });
    for (i = 0; i < FN; i++) flies.push({ x: r(), y: r(), ph: r() * TAU, ph2: r() * TAU, sp: 0.1 + r() * 0.22, bl: r() * TAU, blS: 0.5 + r() * 1.1, rx: 0.03 + r() * 0.10, ry: 0.02 + r() * 0.06 });
    for (i = 0; i < EN; i++) embs.push({ life: -1, x: 0, y: 0, vx: 0, vy: 0, sz: 1, ph: r() * TAU, ttl: 1, hot: 0 });
    for (i = 0; i < SN; i++) smks.push({ life: -1, x: 0, y: 0, vx: 0, vy: 0, sz: 1, ttl: 1, rot: 0, rv: 0 });
  }

  /* 파티클 1개를 지정 지역 스펙으로 (재)배치 */
  function respawn(p, spec, fresh) {
    var r = Math.random;
    /* 입자는 제 고도대에서만 산다. 포자가 별자리까지 올라가면 무대가 보케가 된다. */
    var vy0 = spec.vy[0], vy1 = spec.vy[1];
    var hx = max(abs(spec.vx[0]), abs(spec.vx[1]));
    if (spec.yb) { p.lo = spec.yb[0]; p.hi = spec.yb[1]; }
    else if (vy1 < -2) { p.lo = 0.24; p.hi = 1.12; }       /* 상승 — 지면에서 태어난다 */
    else if (vy0 > 6)  { p.lo = -0.22; p.hi = 1.12; }      /* 하강 — 하늘에서 내린다 */
    else if (hx > 24)  { p.lo = 0.30; p.hi = 1.04; }       /* 바람 — 지면 가까이 분다 */
    else               { p.lo = 0.34; p.hi = 1.00; }
    p.sz = lerp(spec.sz[0], spec.sz[1], r());
    p.vx = lerp(spec.vx[0], spec.vx[1], r());
    p.vy = lerp(spec.vy[0], spec.vy[1], r());
    p.ph = r() * TAU; p.rot = r() * TAU; p.rv = (r() - 0.5) * 2.2;
    p.a = spec.a * (0.5 + r() * 0.7);
    p.z = r();                                          /* 0~.45 는 무리 뒤, 나머지 앞 */
    if (fresh) {
      p.x = r();
      /* 흐름 방향 반대편 가장자리에서 들어오게 */
      p.y = vy1 < -2 ? p.hi - r() * 0.12
          : vy0 > 6  ? p.lo + r() * 0.12
          : lerp(p.lo, p.hi, r());
      if (abs(p.vx) > 28) p.x = p.vx > 0 ? -0.08 - r() * 0.2 : 1.08 + r() * 0.2;
    }
  }

  function seedParticles(spec) {
    for (var i = 0; i < PN; i++) {
      var p = parts[i];
      respawn(p, spec, true);
      p.x = Math.random();
      p.y = lerp(p.lo, p.hi, Math.random());            /* 첫 프레임부터 고르게 깔려 있게 */
      p.g = 1; p.on = true;
    }
  }

  /* ---- 사이즈 ---- */
  function resize() {
    var rect = host.getBoundingClientRect();
    var w = max(1, Math.round(rect.width));
    var h = max(1, Math.round(rect.height || w * 0.56));
    var mobile = w < 560;
    var d = min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    if (w === Wd && h === Ht && d === dpr) return;
    Wd = w; Ht = h; dpr = d;
    /* 전면 캔버스는 비네트와 무른 파티클뿐이다. 풀 DPR 로 래스터할 이유가 없고,
     * 두 장을 매 프레임 합성하는 비용이 실제로 프레임을 깎는다. */
    dprF = min(d, 1.25);
    bg.width = Math.round(w * d);   bg.height = Math.round(h * d);
    fg.width = Math.round(w * dprF); fg.height = Math.round(h * dprF);
    cb.setTransform(d, 0, 0, d, 0, 0);
    cf.setTransform(dprF, 0, 0, dprF, 0, 0);
    gY = Math.round(Ht * 0.70);
    farY = gY - Ht * 0.085;
    fireX = Math.round(Wd * 0.27);
  }

  /* ---- 지역 보간 접근자 ---- */
  function bn(k) { return xf >= 1 ? BB[k] : BA[k] + (BB[k] - BA[k]) * xf; }
  function bc(k) { return xf >= 1 ? BB[k] : cmix(BA[k], BB[k], xf); }

  /* 현재 불빛 반경 (맥박 포함) */
  var R = 1, strength = 1, baseR = 1;
  function litAt(x, y) {
    var dx = (x - fireX) / (R * 1.30), dy = (y - gY) / (R * 0.62);
    return clamp(1 - sqrt(dx * dx + dy * dy), 0, 1);
  }

  /* ---- 지면 텍스처 (정규화 좌표, 리사이즈와 무관) ---- */
  var gtex = [];
  (function () {
    var r = rng(seed ^ 0x68bc21eb), i;
    for (i = 0; i < 54; i++) {
      var d = pw(r(), 0.7);                             /* 아래(가까이)로 갈수록 굵게 */
      gtex.push({ x: r(), d: d, w: 0.01 + r() * 0.055, a: 0.2 + r() * 0.8, k: r() < 0.26 ? 1 : 0, p: r() * TAU });
    }
  })();

  /* ---- L0 하늘 ---- */
  /* 하늘 그라디언트와 지역광은 지역·무드가 바뀔 때만 변한다.
   * 매 프레임 4M 픽셀을 다시 칠하면 그것만으로 예산이 날아간다 → 반해상도 캐시. */
  var skyCv = doc.createElement('canvas'), skyC = skyCv.getContext('2d'), skyKey = '';
  function skyCache() {
    var key = Wd + 'x' + Ht + '|' + BIOMES.indexOf(BA) + '>' + BIOMES.indexOf(BB) +
              '|' + (xf * 24 | 0) + '|' + (mv.red * 16 | 0) + '|' + (mv.cool * 16 | 0) + '|' + (mv.warm * 16 | 0);
    if (key === skyKey) return;
    skyKey = key;
    var SW = max(2, Math.round(Wd * 0.5)), SH = max(2, Math.round(Ht * 0.5));
    if (skyCv.width !== SW || skyCv.height !== SH) { skyCv.width = SW; skyCv.height = SH; }
    var c = skyC;
    c.setTransform(0.5, 0, 0, 0.5, 0, 0);
    c.clearRect(0, 0, Wd, Ht);
    var zen = bc('_zen'), hor = bc('_hor');
    if (mv.red > 0.001) hor = cmix(hor, PAL.deep, mv.red * 0.30);
    if (mv.cool > 0.001) zen = cmix(zen, PAL.moon, mv.cool * 0.10);
    var g = c.createLinearGradient(0, 0, 0, gY);
    g.addColorStop(0, rgba(zen, 1));
    g.addColorStop(0.62, rgba(cmix(zen, hor, 0.52), 1));
    g.addColorStop(1, rgba(hor, 1));
    c.fillStyle = g; c.fillRect(0, 0, Wd, gY + 2);
    c.globalCompositeOperation = 'lighter';
    blob(c, bc('_glow'), bn('ga') * (1 + mv.warm), bn('gx'), bn('gy'), bn('gw'), bn('gh'));
    blob(c, bc('_g2'), bn('g2a'), bn('g2x'), 0.96, 0.55, 0.42);
    c.globalCompositeOperation = 'source-over';
  }

  function drawSky(c) {
    skyCache();
    c.drawImage(skyCv, 0, 0, Wd, Ht);

    /* 별 — 존 진행도가 오르면 하늘이 맑아진다 */
    var sA = bn('stars') * mv.star * (0.80 + progress * 0.30);
    if (sA > 0.02) {
      c.fillStyle = rgba(cmix(PAL.moon, PAL.white, 0.45), 1);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i], yy = s.y * gY;
        var a = s.a * sA * (0.60 + 0.40 * sin(t * s.sp + s.ph));
        if (a <= 0.02) continue;
        c.globalAlpha = min(1, a);
        if (s.r < 0.85) c.fillRect(s.x * Wd, yy, 1, 1);
        else { c.beginPath(); c.arc(s.x * Wd, yy, s.r, 0, TAU); c.fill(); }
      }
      c.globalAlpha = 1;
    }

    /* 달 — 진행도에 따라 떠오른다. 적의 등을 그리는 차가운 광원. */
    var ma = bn('moonA') * (1 - mv.warm * 1.4);
    if (ma > 0.03) {
      var mx = lerp(0.790, 0.898, progress) * Wd;
      var my = lerp(0.360, 0.200, progress) * gY;
      var mr = min(Wd, Ht) * 0.032;
      c.globalCompositeOperation = 'lighter';
      c.globalAlpha = ma * 0.30;
      var hg = glowSprite(PAL.moon, 0.22), HR = mr * 7;
      c.drawImage(hg, mx - HR, my - HR, HR * 2, HR * 2);
      c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
      c.fillStyle = rgba(cmix(PAL.moon, PAL.white, 0.55), ma * 0.92);
      c.beginPath(); c.arc(mx, my, mr, 0, TAU); c.fill();
      c.fillStyle = rgba(bc('_zen'), ma * 0.82);        /* 초승달 음영 */
      c.beginPath(); c.arc(mx + mr * 0.46, my - mr * 0.22, mr * 0.96, 0, TAU); c.fill();
    }

  }
  function blob(c, col, a, cx, cy, rw, rh) {
    if (a <= 0.004) return;
    var x = cx * Wd, y = cy * farY, rx = rw * Wd * 0.5, ry = rh * farY * 0.5;
    c.save(); c.translate(x, y); c.scale(1, ry / rx);
    var g = c.createRadialGradient(0, 0, 0, 0, 0, rx);
    g.addColorStop(0, rgba(col, a));
    g.addColorStop(0.45, rgba(col, a * 0.42));
    g.addColorStop(1, rgba(col, 0));
    c.fillStyle = g; c.fillRect(-rx, -rx, rx * 2, rx * 2); c.restore();
  }

  /* ---- L1 원경 능선 ---- */
  function ridgePass(c, geo, key, alpha, par, col, yLift) {
    if (alpha <= 0.006 || !geo) return;
    var R2 = geo[key], polys = R2.polys, ox = camX * par, base = farY + yLift;
    var fl = R2.floats;
    c.fillStyle = rgba(col, alpha);
    for (var i = 0; i < polys.length; i++) {
      var p = polys[i], n = p.length >> 1, j;
      var floating = fl && fl[i];
      for (j = 0; j < n; j++) { TMP[j * 2] = p[j * 2] * Wd + ox; TMP[j * 2 + 1] = base - p[j * 2 + 1] * Ht; }
      c.beginPath();
      if (floating) {                                   /* 허공에 뜬 암괴 — 지면에 안 붙는다 */
        c.moveTo(TMP[0], TMP[1]);
        if (R2.smooth) smoothPath(c, TMP, n); else hardPath(c, TMP, n);
      } else {
        c.moveTo(p[0] * Wd + ox, base);
        if (R2.smooth) smoothPath(c, TMP, n); else hardPath(c, TMP, n);
        c.lineTo(p[(n - 1) * 2] * Wd + ox, base);
      }
      c.closePath(); c.fill();
    }
  }
  var TMP = new Float32Array(4096);

  function drawRidges(c) {
    var fogc = bc('_fog');
    /* 원경은 안개에 떠서 하늘보다 밝고, 근경은 하늘보다 확실히 어둡다.
     * 이 둘의 명도 차가 없으면 능선이 한 겹으로 뭉쳐 장식 띠가 된다. */
    var farCol = cmix(bc('_hor'), fogc, 0.55);
    farCol = cmix(farCol, PAL.moon, 0.10);
    var nearCol = cmix(PAL.night, PAL.soot, 0.14 - progress * 0.06);
    var fade = 1 - progress * 0.22;                     /* 존을 지날수록 원경이 가까워진다 */
    ridgePass(c, geoA, 'far', (1 - xf) * 0.92 * fade, 0.12, farCol, Ht * 0.012);
    ridgePass(c, geoB, 'far', xf * 0.92 * fade, 0.12, farCol, Ht * 0.012);
    ridgePass(c, geoA, 'near', (1 - xf), 0.18, nearCol, Ht * 0.004);
    ridgePass(c, geoB, 'near', xf, 0.18, nearCol, Ht * 0.004);

    /* 지평 안개띠 — 능선 발치를 지우고 깊이를 만든다 */
    var fa = bn('fogA') * (1 - progress * 0.25);
    var g = c.createLinearGradient(0, farY - Ht * 0.16, 0, farY + Ht * 0.03);
    g.addColorStop(0, rgba(fogc, 0));
    g.addColorStop(0.72, rgba(fogc, fa * 0.72));
    g.addColorStop(1, rgba(fogc, fa));
    c.fillStyle = g; c.fillRect(0, farY - Ht * 0.16, Wd, Ht * 0.19);
  }

  /* ---- L2 중경 소품 ---- */
  function propPass(c, geo, alpha) {
    if (alpha <= 0.006 || !geo) return;
    var L = geo.props.list, fn = PROPD[geo.props.kind], i;
    c.globalAlpha = alpha;
    for (i = 0; i < L.length; i++) {
      var P = L[i];
      var par = 0.24 + P.d * 0.14;
      var x = P.x * Wd + camX * par;
      if (x < -Wd * 0.12 || x > Wd * 1.12) continue;
      var y = lerp(farY + Ht * 0.006, gY - Ht * 0.004, P.d);
      var s = pw(P.s, 1.7) * (Ht / 560) * 2.35;
      fn(c, P, x, y, s, t, pw(litAt(x, y), 1.4), stEnv);
    }
    c.globalAlpha = 1;
  }
  function drawProps(c) { propPass(c, geoA, 1 - xf); propPass(c, geoB, xf); }

  /* 전경 — 전면 캔버스에, 비네트 위에. 그래서 언제나 새까만 실루엣이다. */
  var foreEnv = { gndTop: PAL.night, fore: true };
  function forePass(c, geo, alpha) {
    if (alpha <= 0.006 || !geo) return;
    var L = geo.fore, fn = PROPD[geo.props.kind], i;
    c.globalAlpha = alpha;
    for (i = 0; i < L.length; i++) {
      var P = L[i];
      var x = P.x * Wd + camX * 1.15;
      var s = P.s * (Ht / 560) * 4.3;
      fn(c, P, x, Ht + Ht * 0.05, s, t, 0, foreEnv);
    }
    c.globalAlpha = 1;
  }
  function drawFore(c) { forePass(c, geoA, 1 - xf); forePass(c, geoB, xf); }

  /* ---- L3 지면 + 불빛 풀 ---- */
  function drawGround(c) {
    var g0 = bc('_g0'), g1 = bc('_g1');
    if (mv.cool > 0.001) { g0 = cmix(g0, PAL.moon, mv.cool * 0.12); g1 = cmix(g1, PAL.night, mv.cool * 0.3); }
    var oy = camY * 0.60;
    /* 지면은 스스로 빛나지 않는다. 기본값은 거의 밤이고, 불빛 풀만이 바닥을 만든다. */
    var gFar = cmix(g0, bc('_fog'), 0.62);              /* 지평 — 원경 안개와 같은 값이라 선이 안 생긴다 */
    var gTop = cmix(g0, PAL.night, 0.44);
    var gMid = cmix(g0, PAL.night, 0.68);
    var gNear = cmix(g1, PAL.night, 0.84);              /* 카메라 앞 — 빛이 없으면 아무것도 없다 */
    var g = c.createLinearGradient(0, farY + oy, 0, Ht);
    g.addColorStop(0, rgba(gFar, 1));
    g.addColorStop(0.09, rgba(gTop, 1));
    g.addColorStop(0.34, rgba(gMid, 1));
    g.addColorStop(1, rgba(gNear, 1));
    c.fillStyle = g; c.fillRect(0, farY + oy - 1, Wd, Ht - farY - oy + 2);
    stEnv.gndTop = g0;

    /* 불빛 풀 — 지면에 눕는 타원. 이게 무대의 유일한 따뜻한 바닥이다.
     * 지면 밖으로 새면 능선까지 노랗게 물든다. 반드시 클립한다. */
    var px = fireX + camX * 0.60, py = gY + Ht * 0.026 + oy;
    var rx = R * 1.48, ry = R * 0.34;
    c.save();
    c.beginPath(); c.rect(0, farY + oy - 1, Wd, Ht - farY - oy + 2); c.clip();
    c.globalCompositeOperation = 'lighter';
    c.translate(px, py); c.scale(1, ry / rx);
    var pg = c.createRadialGradient(0, 0, 0, 0, 0, rx);
    pg.addColorStop(0,    rgba(PAL.ember, 0.30 * strength));
    pg.addColorStop(0.07, rgba(PAL.ember, 0.19 * strength));
    pg.addColorStop(0.20, rgba(PAL.ember, 0.115 * strength));
    pg.addColorStop(0.42, rgba(PAL.ember, 0.055 * strength));
    pg.addColorStop(0.70, rgba(PAL.deep,  0.022 * strength));
    pg.addColorStop(1,    rgba(PAL.deep,  0));
    c.fillStyle = pg; c.fillRect(-rx, -rx, rx * 2, rx * 2);
    var cr = R * 0.13;                                  /* 장작 바로 아래 접지광 */
    var cg2 = c.createRadialGradient(0, 0, 0, 0, 0, cr);
    cg2.addColorStop(0, rgba(PAL.core, 0.34 * strength));
    cg2.addColorStop(0.5, rgba(PAL.ember, 0.16 * strength));
    cg2.addColorStop(1, rgba(PAL.ember, 0));
    c.fillStyle = cg2; c.fillRect(-cr, -cr, cr * 2, cr * 2);
    c.restore();

    /* 지면 결 — 불빛 안에서만 보인다 */
    var ox = camX * 0.60;
    for (var i = 0; i < gtex.length; i++) {
      var T = gtex[i];
      var x = T.x * Wd + ox, y = farY + oy + (Ht - farY) * T.d * 0.92;
      var l = pw(litAt(x, y), 1.35) * T.a;
      if (l < 0.030) continue;
      var w = T.w * Wd * (0.35 + T.d * 0.9);
      if (T.k) {                                        /* 돌 — 불 쪽 면이 빛난다 */
        var rr = w * 0.22;
        c.fillStyle = rgba(cmix(PAL.night, PAL.soot, 0.5), min(0.85, 0.3 + l));
        c.beginPath(); c.ellipse(x, y, rr, rr * 0.62, 0, 0, TAU); c.fill();
        c.fillStyle = rgba(PAL.ember, l * 0.45);
        c.beginPath(); c.ellipse(x - rr * 0.28, y - rr * 0.18, rr * 0.55, rr * 0.32, -0.3, 0, TAU); c.fill();
      } else {
        c.strokeStyle = rgba(PAL.ember, l * 0.22);
        c.lineWidth = max(0.7, Ht * 0.0016 * (0.4 + T.d));
        c.beginPath(); c.moveTo(x - w * 0.5, y); c.lineTo(x + w * 0.5, y + w * 0.03); c.stroke();
      }
    }
  }

  /* ---- 지면 그림자 — 불 반대 방향으로 늘어난다 ---- */
  function drawShadows(c) {
    var sp = shadowSprite(), ox = camX * 0.60, oy = camY * 0.60, rows = ['back', 'air', 'front', 'foe'], k, i;
    for (k = 0; k < rows.length; k++) {
      var L = occ[rows[k]], air = rows[k] === 'air';
      for (i = 0; i < L.length; i++) {
        var o = L[i];
        var x = o.x + ox, y = (air ? gY : o.y) + oy;
        var l = litAt(x, gY);
        if (l < 0.02) continue;
        var dx = x - (fireX + ox);
        var dir = dx >= 0 ? 1 : -1;
        var far = clamp(abs(dx) / (R * 1.2), 0, 1.4);
        var stretch = 0.55 + far * 1.85;                /* 멀수록 길게 눕는다 */
        var w = Ht * 0.055 * o.scale * (air ? 0.7 : 1);
        var h = Ht * 0.017 * o.scale * (air ? 0.8 : 1);
        var lw = w * stretch;
        var a = l * (air ? 0.26 : 0.52) * strength;
        c.save();
        c.globalAlpha = a;
        c.translate(x, y);
        c.transform(1, 0, dir * 0.30 * (stretch - 0.5), 1, 0, 0);   /* 불 반대쪽으로 기울임 */
        c.drawImage(sp, -w * 0.7 + dir * lw * 0.30, -h, w * 0.7 * 2 + lw * 0.6, h * 2);
        c.restore();
      }
    }
    c.globalAlpha = 1;
  }

  /* ---- L4 모닥불 ---- */
  var TB = new Float32Array(96);
  function tongue(c, x, y, w, h, col, a, sd) {
    var N = 8, i, n = 0, f, taper, wob;
    for (i = 0; i <= N; i++) {                          /* 왼쪽 모서리 아래→위 */
      f = i / N;
      taper = (1 - f) * (1 - f * 0.52) + 0.055;
      wob = nz(t * 3.2 + sd + f * 2.6) * w * 0.44 * f + nz2(t * 1.25 + sd * 2.3) * w * 0.22 * f * f;
      TB[n++] = x - w * taper + wob; TB[n++] = y - h * f;
    }
    for (i = N; i >= 0; i--) {                          /* 오른쪽 모서리 위→아래 */
      f = i / N;
      taper = (1 - f) * (1 - f * 0.52) + 0.055;
      wob = nz(t * 3.2 + sd + f * 2.6) * w * 0.44 * f + nz2(t * 1.25 + sd * 2.3) * w * 0.22 * f * f;
      TB[n++] = x + w * taper + wob; TB[n++] = y - h * f;
    }
    c.beginPath(); c.moveTo(TB[0], TB[1]); smoothPath(c, TB, n >> 1); c.closePath();
    c.fillStyle = rgba(col, a); c.fill();
  }

  function log(c, x, y, L, ang, th, lit) {
    c.save(); c.translate(x, y); c.rotate(ang);
    c.fillStyle = rgba(cmix(PAL.night, PAL.soot, 0.62), 1);
    c.beginPath();
    c.moveTo(-L, -th); c.lineTo(L * 0.86, -th * 0.82);
    c.quadraticCurveTo(L, -th * 0.82, L, 0);
    c.quadraticCurveTo(L, th * 0.82, L * 0.86, th * 0.82);
    c.lineTo(-L, th); c.quadraticCurveTo(-L - th * 0.6, 0, -L, -th);
    c.closePath(); c.fill();
    c.strokeStyle = rgba(PAL.ember, 0.34 * lit); c.lineWidth = max(0.8, th * 0.26);
    c.beginPath(); c.moveTo(-L * 0.9, -th * 0.72); c.lineTo(L * 0.8, -th * 0.6); c.stroke();
    c.fillStyle = rgba(PAL.deep, 0.5 * lit);            /* 숯이 된 끝 */
    c.beginPath(); c.ellipse(L * 0.86, 0, th * 0.5, th * 0.72, 0, 0, TAU); c.fill();
    c.restore();
  }

  function drawFire(c) {
    var x = fireX + camX * 0.60, y = gY + camY * 0.60;
    var sc = Ht / 560;
    var fh = Ht * 0.152 * strength * (0.88 + (pulse - 1) * 1.8);
    var fw = Wd * 0.034 * (0.55 + strength * 0.45);
    fw = min(fw, Ht * 0.070);
    var lit = strength * pulse;

    /* 잉걸 바닥 */
    c.save(); c.globalCompositeOperation = 'lighter';
    c.translate(x, y); c.scale(1, 0.34);
    var cg = c.createRadialGradient(0, 0, 0, 0, 0, fw * 2.6);
    cg.addColorStop(0, rgba(PAL.core, 0.55 * lit));
    cg.addColorStop(0.35, rgba(PAL.ember, 0.34 * lit));
    cg.addColorStop(1, rgba(PAL.deep, 0));
    c.fillStyle = cg; c.fillRect(-fw * 2.6, -fw * 2.6, fw * 5.2, fw * 5.2);
    c.restore();

    /* 장작 3개 */
    var lg = fw * 1.42, th = max(2.6, sc * 5.6);
    log(c, x - fw * 0.30, y - th * 0.35, lg, -0.13, th, lit);
    log(c, x + fw * 0.26, y - th * 1.05, lg * 0.92, 0.17, th * 0.92, lit);
    log(c, x - fw * 0.04, y - th * 1.85, lg * 0.74, -0.46, th * 0.80, lit);

    /* 후광 */
    c.globalCompositeOperation = 'lighter';
    c.globalAlpha = 0.30 * lit;
    var hs = glowSprite(PAL.ember, 0.30), HR = fh * 1.45;
    c.drawImage(hs, x - HR, y - fh * 0.52 - HR, HR * 2, HR * 2);
    c.globalAlpha = 1;

    /* 불꽃 3겹 + 심지 — 가산 합성으로 뜨겁게 */
    tongue(c, x, y - th * 0.5, fw * 1.12, fh * 1.00, PAL.deep,  0.46, 11.3);
    tongue(c, x, y - th * 0.5, fw * 0.95, fh * 0.84, PAL.ember, 0.52, 27.9);
    tongue(c, x, y - th * 0.5, fw * 0.58, fh * 0.56, PAL.core,  0.60, 43.1);
    tongue(c, x, y - th * 0.5, fw * 0.30, fh * 0.31, PAL.white, 0.78, 61.7);
    c.globalCompositeOperation = 'source-over';
  }

  /* ---- 불씨 ---- */
  var embAcc = 0;
  function updEmbers(dt) {
    var x = fireX, y = gY, fh = Ht * 0.15 * strength;
    embAcc += dt * (13 * mv.emb * strength + 3) * (reduced ? 0.4 : 1);
    var i, e;
    while (embAcc >= 1) {
      embAcc -= 1;
      for (i = 0; i < EN; i++) if (embs[i].life < 0) {
        e = embs[i];
        e.life = 0; e.ttl = 1.1 + Math.random() * 2.2;
        e.x = x + (Math.random() - 0.5) * Wd * 0.028;
        e.y = y - Ht * 0.012 - Math.random() * fh * 0.4;
        e.vx = (Math.random() - 0.5) * Ht * 0.05;
        e.vy = -Ht * (0.09 + Math.random() * 0.16);
        e.sz = (0.9 + Math.random() * 2.0) * (Ht / 560);
        e.ph = Math.random() * TAU;
        e.hot = Math.random();
        break;
      }
    }
    for (i = 0; i < EN; i++) {
      e = embs[i]; if (e.life < 0) continue;
      e.life += dt;
      if (e.life >= e.ttl) { e.life = -1; continue; }
      var k = e.life / e.ttl;
      e.vy += Ht * 0.030 * dt;                          /* 위로 갈수록 느려진다 */
      e.x += (e.vx + sin(t * 1.9 + e.ph) * Ht * 0.045) * dt;
      e.y += e.vy * dt;
    }
  }
  function drawEmbers(c) {
    c.globalCompositeOperation = 'lighter';
    var ox = camX * 0.60, oy = camY * 0.60;
    for (var i = 0; i < EN; i++) {
      var e = embs[i]; if (e.life < 0) continue;
      var k = e.life / e.ttl;
      var a = (1 - k) * (0.55 + e.hot * 0.45) * strength;
      a *= ss(0, 0.08, k);
      if (a < 0.02) continue;
      var col = e.hot > 0.55 ? PAL.core : PAL.ember;
      if (k > 0.55) col = cmix(col, PAL.deep, (k - 0.55) * 2.2);   /* 식으면서 붉어진다 */
      var rr = (1.7 + e.sz * 1.05) * (1 - k * 0.28);
      c.globalAlpha = min(1, a * 0.85);
      c.drawImage(glowSprite(col, 0.24), e.x + ox - rr, e.y + oy - rr, rr * 2, rr * 2);
      c.globalAlpha = min(1, a);                        /* 단단한 심 — 이게 있어야 불똥이다 */
      c.fillStyle = rgba(cmix(col, PAL.white, 0.5), 1);
      c.beginPath(); c.arc(e.x + ox, e.y + oy, max(0.45, e.sz * 0.34), 0, TAU); c.fill();
    }
    c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
  }

  /* ---- 연기 ---- */
  var smkAcc = 0;
  function updSmoke(dt) {
    smkAcc += dt * (2.4 * mv.smk) * (reduced ? 0.5 : 1);
    var i, s;
    while (smkAcc >= 1) {
      smkAcc -= 1;
      for (i = 0; i < SN; i++) if (smks[i].life < 0) {
        s = smks[i];
        s.life = 0; s.ttl = 4.5 + Math.random() * 3.5;
        s.x = fireX + (Math.random() - 0.5) * Wd * 0.018;
        s.y = gY - Ht * 0.14 * strength;
        s.vx = Ht * (0.035 + Math.random() * 0.055);    /* 바람은 오른쪽으로 */
        s.vy = -Ht * (0.055 + Math.random() * 0.045);
        s.sz = Ht * (0.055 + Math.random() * 0.06);
        s.rot = Math.random() * TAU; s.rv = (Math.random() - 0.5) * 0.5;
        break;
      }
    }
    for (i = 0; i < SN; i++) {
      s = smks[i]; if (s.life < 0) continue;
      s.life += dt;
      if (s.life >= s.ttl) { s.life = -1; continue; }
      s.x += (s.vx + sin(t * 0.5 + s.rot) * Ht * 0.02) * dt;
      s.y += s.vy * dt; s.vy *= (1 - dt * 0.25);
      s.rot += s.rv * dt;
    }
  }
  function drawSmoke(c) {
    var sp = softSprite(cmix(PAL.ash, PAL.moon, 0.22), 0.55);
    var ox = camX * 0.35, oy = camY * 0.35;
    for (var i = 0; i < SN; i++) {
      var s = smks[i]; if (s.life < 0) continue;
      var k = s.life / s.ttl;
      var a = ss(0, 0.18, k) * (1 - ss(0.45, 1, k)) * 0.30 * mv.smk;
      if (a < 0.012) continue;
      var r2 = s.sz * (0.5 + k * 2.4);
      c.globalAlpha = a;
      c.save(); c.translate(s.x + ox, s.y + oy); c.rotate(s.rot);
      c.drawImage(sp, -r2, -r2 * 0.82, r2 * 2, r2 * 1.64);
      c.restore();
    }
    c.globalAlpha = 1;
  }

  /* ---- 지역 파티클 ---- */
  function partSpec(gen) { return (gen === 1 ? BA : BB).part; }
  function updParts(dt) {
    var sp = mv.spd * (reduced ? 0.45 : 1);
    for (var i = 0; i < PN; i++) {
      var p = parts[i];
      var spec = partSpec(p.g);
      /* 지역 전환: 입자마다 제 차례에 갈아탄다 */
      if (xf < 1) {
        var fade = clamp((xf - p.sw) / 0.16, 0, 1);
        if (fade >= 0.5 && p.g === 1) { p.g = 2; respawn(p, BB.part, true); spec = BB.part; }
      } else if (p.g === 1 && BA !== BB) { p.g = 2; }
      var sc = Ht / 560;
      p.x += (p.vx * sp * dt) / Wd + sin(t * spec.wob + p.ph) * 0.00035 * sp;
      p.y += (p.vy * sp * dt) / Ht;
      p.rot += p.rv * dt * sp;
      if (p.x < -0.16 || p.x > 1.16 || p.y < p.lo - 0.14 || p.y > p.hi + 0.14) respawn(p, spec, true);
    }
  }
  function drawParts(c, front) {
    var i, p, spec, sc = Ht / 560;
    for (i = 0; i < PN; i++) {
      p = parts[i];
      if ((p.z > 0.42) !== front) continue;
      spec = partSpec(p.g);
      var a = p.a;
      if (xf < 1) {                                     /* 개별 디졸브 */
        var fade = clamp((xf - p.sw) / 0.16, 0, 1);
        a *= p.g === 1 ? (1 - fade * 2) : clamp((fade - 0.5) * 2, 0, 1);
        if (a <= 0.01) continue;
      }
      var x = p.x * Wd + camX * (front ? 1.0 : 0.45);
      var y = p.y * Ht + camY * (front ? 1.0 : 0.45);
      var s = p.sz * sc * (front ? 1.25 : 0.8);
      var l = spec.glow > 0.3 ? 1 : lerp(0.35, 1, pw(litAt(x, y), 1.2));
      a *= l;
      var col = spec._c;
      switch (spec.shape) {
        case 'streak':
          c.globalAlpha = a; c.strokeStyle = rgba(col, 1); c.lineWidth = max(0.6, s * 0.5);
          c.beginPath(); c.moveTo(x, y); c.lineTo(x - s * 7, y - s * 0.5); c.stroke();
          break;
        case 'leaf':
          c.globalAlpha = a; c.fillStyle = rgba(col, 1);
          c.save(); c.translate(x, y); c.rotate(p.rot);
          c.beginPath(); c.ellipse(0, 0, s, s * (0.30 + 0.3 * abs(sin(p.rot))), 0, 0, TAU); c.fill();
          c.restore();
          break;
        case 'bubble':
          c.globalAlpha = a * 0.8; c.strokeStyle = rgba(col, 1); c.lineWidth = max(0.6, s * 0.22);
          c.beginPath(); c.arc(x, y, s, 0, TAU); c.stroke();
          c.globalAlpha = a * 0.5; c.fillStyle = rgba(PAL.white, 1);
          c.beginPath(); c.arc(x - s * 0.34, y - s * 0.34, max(0.5, s * 0.18), 0, TAU); c.fill();
          break;
        case 'mist':
          c.globalAlpha = a;
          c.drawImage(softSprite(col, 0.5), x - s * 4, y - s * 1.4, s * 8, s * 2.8);
          break;
        default:
          if (spec.glow > 0.45) {
            c.globalCompositeOperation = 'lighter';
            c.globalAlpha = min(1, a * (0.62 + 0.38 * sin(t * 1.6 + p.ph)));
            var g = glowSprite(col, 0.22), rr = s * 1.85;
            c.drawImage(g, x - rr, y - rr, rr * 2, rr * 2);
            /* 글로우만 있으면 솜뭉치다. 가운데 단단한 심을 하나 박는다. */
            c.globalAlpha = min(1, a * 1.1);
            c.fillStyle = rgba(cmix(col, PAL.white, 0.4), 1);
            c.beginPath(); c.arc(x, y, max(0.45, s * 0.42), 0, TAU); c.fill();
            c.globalCompositeOperation = 'source-over';
          } else {
            c.globalAlpha = a; c.fillStyle = rgba(col, 1);
            c.beginPath(); c.arc(x, y, max(0.5, s), 0, TAU); c.fill();
          }
      }
    }
    c.globalAlpha = 1;
  }

  /* ---- 반딧불 — 어느 지역에도 있다. 무대가 죽지 않게 하는 최후의 보험. ---- */
  function drawFlies(c, front) {
    var col = bc('_fly'), sc = Ht / 560;
    c.globalCompositeOperation = 'lighter';
    for (var i = 0; i < FN; i++) {
      var f = flies[i];
      if (((i & 1) === 1) !== front) continue;
      var x = (f.x + cos(t * f.sp + f.ph) * f.rx) * Wd + camX * (front ? 0.9 : 0.5);
      var y = (0.46 + f.y * 0.44) * Ht + sin(t * f.sp * 1.37 + f.ph2) * f.ry * Ht + camY * 0.6;
      var bl = sin(t * f.blS + f.bl);
      var a = clamp(bl * 1.6 - 0.15, 0, 1) * (front ? 0.85 : 0.45);
      if (a < 0.02) continue;
      var s = (1.5 + bl * 0.8) * sc * (front ? 1.15 : 0.8);
      c.globalAlpha = a * 0.85;
      var g = glowSprite(col, 0.22), rr = s * 2.6;
      c.drawImage(g, x - rr, y - rr, rr * 2, rr * 2);
      c.globalAlpha = min(1, a * 1.2);                  /* 심 */
      c.fillStyle = rgba(cmix(col, PAL.white, 0.45), 1);
      c.beginPath(); c.arc(x, y, max(0.5, s * 0.42), 0, TAU); c.fill();
    }
    c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
  }

  /* ---- L7 어둠 · 플래시 (전면 캔버스) ---- */
  var vigCv = doc.createElement('canvas'), vigC = vigCv.getContext('2d'), vigKey = '';
  function vigCache() {
    var key = Wd + 'x' + Ht + '|' + (R * 50 / max(1, Wd) | 0) + '|' + (mv.vig * 24 | 0) + '|' + (mv.cool * 16 | 0);
    if (key === vigKey) return;
    vigKey = key;
    var SW = max(2, Math.round(Wd * 0.5)), SH = max(2, Math.round(Ht * 0.5));
    if (vigCv.width !== SW || vigCv.height !== SH) { vigCv.width = SW; vigCv.height = SH; }
    var c = vigC;
    c.setTransform(0.5, 0, 0, 0.5, 0, 0);
    c.clearRect(0, 0, Wd, Ht);
    var px = fireX, py = gY - Ht * 0.05;
    var inner = R * 0.34, outer = R * 2.35;             /* 반경에 매인다 — 불이 죽으면 어둠이 다가온다 */
    var v = mv.vig;
    var nc = mv.cool > 0.001 ? cmix(PAL.night, PAL.moon, mv.cool * 0.25) : PAL.night;
    var g = c.createRadialGradient(px, py, inner, px, py, outer);
    g.addColorStop(0, rgba(nc, 0));
    g.addColorStop(0.26, rgba(nc, 0.16 * v));
    g.addColorStop(0.58, rgba(nc, 0.52 * v));
    g.addColorStop(0.82, rgba(nc, 0.76 * v));
    g.addColorStop(1, rgba(nc, min(0.95, 0.88 * v)));
    c.fillStyle = g; c.fillRect(0, 0, Wd, Ht);
    /* 상하 프레이밍 */
    var tg = c.createLinearGradient(0, 0, 0, Ht * 0.20);
    tg.addColorStop(0, rgba(PAL.night, 0.52)); tg.addColorStop(1, rgba(PAL.night, 0));
    c.fillStyle = tg; c.fillRect(0, 0, Wd, Ht * 0.20);
    var bgd = c.createLinearGradient(0, Ht * 0.84, 0, Ht);
    bgd.addColorStop(0, rgba(PAL.night, 0)); bgd.addColorStop(1, rgba(PAL.night, 0.46));
    c.fillStyle = bgd; c.fillRect(0, Ht * 0.84, Wd, Ht * 0.16);
  }

  function drawDark(c) {
    vigCache();
    c.drawImage(vigCv, 0, 0, Wd, Ht);

    /* 보스 — 오른쪽에서 붉은 압력이 밀려온다 */
    if (mv.red > 0.004) {
      var rp = 0.5 + 0.5 * sin(t * 1.1);
      var rg = c.createLinearGradient(Wd, 0, Wd * 0.52, 0);
      rg.addColorStop(0, rgba(PAL.deep, mv.red * (0.13 + rp * 0.07)));
      rg.addColorStop(1, rgba(PAL.deep, 0));
      c.fillStyle = rg; c.fillRect(Wd * 0.5, 0, Wd * 0.5, Ht);
    }
    /* 승리 — 온기가 화면을 채운다 */
    if (mv.warm > 0.004) {
      c.globalCompositeOperation = 'lighter';
      c.fillStyle = rgba(PAL.ember, mv.warm * 0.16);
      c.fillRect(0, 0, Wd, Ht);
      c.globalCompositeOperation = 'source-over';
    }
    if (mv.cool > 0.004) { c.fillStyle = rgba(PAL.moon, mv.cool * 0.10); c.fillRect(0, 0, Wd, Ht); }

    if (flashT > 0) {
      var k = 1 - flashT / flashDur;
      c.globalCompositeOperation = 'lighter';
      c.fillStyle = rgba(flashCol, pw(1 - k, 2.1) * 0.80);
      c.fillRect(0, 0, Wd, Ht);
      c.globalCompositeOperation = 'source-over';
    }
  }

  /* ─────────────────── 9. 루프 ─────────────────── */
  var frames = 0;
  function step(dt) {
    t += dt;
    frames++;

    /* 불의 맥박 — 이 값 하나가 무대 전체를 구동한다 */
    if (reduced) pulse = clamp(1 + nz(t * 0.55) * 0.05, 0.90, 1.10);
    else {
      var raw = nz(t * 3.2) * 0.60 + nz2(t * 8.1) * 0.24 + nz(t * 0.85 + 40) * 0.16;
      pulse = clamp(1 + raw * 0.145, 0.86, 1.14);
    }
    strength = fireForce != null ? lerp(0.45, 1.00, fireForce) : mv.fire;
    baseR = min(Wd * 0.34, Ht * 0.58);
    R = baseR * strength * (0.93 + (pulse - 1) * 0.85);

    /* 무드 보간 */
    for (var i = 0; i < MKEYS.length; i++) {
      var k = MKEYS[i];
      mv[k] += (mt[k] - mv[k]) * min(1, dt * 3.4);
    }
    /* 지역 크로스페이드 */
    if (xf < 1) {
      xf = min(1, xf + dt / 1.1);
      if (xf >= 1) { BA = BB; geoA = geoB; }
    }
    /* 카메라 호흡 + 충격 */
    var sc = Ht / 560, amp = reduced ? 0.22 : 1;
    camX = sin(t * 0.07) * 6 * sc * amp;
    camY = cos(t * 0.053) * 3 * sc * amp;
    if (shakeMag > 0.0008) {
      shakeT += dt;
      var q = shakeMag * Ht * 0.075 * (reduced ? 0.25 : 1);
      camX += nz(shakeT * 47) * q;
      camY += nz2(shakeT * 53) * q * 0.75;
      shakeMag *= pw(0.0016, dt);                       /* ~0.32s 만에 사그라든다 */
    } else shakeMag = 0;
    if (flashT > 0) flashT = max(0, flashT - dt);

    updEmbers(dt); updSmoke(dt); updParts(dt);
  }

  function draw() {
    var c = cb;
    c.clearRect(0, 0, Wd, Ht);
    drawSky(c);
    drawRidges(c);
    drawSmoke(c);                                       /* 연기는 하늘에 걸린다 */
    drawGround(c);
    drawProps(c);                                       /* 지면 fill 뒤에 와야 안 덮인다 */
    drawParts(c, false);                                /* 무리 뒤 파티클 */
    drawFlies(c, false);
    drawShadows(c);
    drawFire(c);
    drawEmbers(c);

    var f = cf;
    f.clearRect(0, 0, Wd, Ht);
    drawDark(f);                                        /* 빛이 닿는 만큼만 존재한다 */
    drawFore(f);                                        /* 코앞의 검은 실루엣이 화면을 잡아 준다 */
    drawParts(f, true);
    drawFlies(f, true);

    /* 무리 레이어는 지면과 같은 시차로 함께 흔들린다 */
    mob.style.transform = 'translate3d(' + r3(camX * 0.60) + 'px,' + r3(camY * 0.60) + 'px,0)';
    /* CSS 변수 1회 write */
    docEl.style.setProperty('--wl-fire', r3(pulse));
  }
  var docEl = doc.documentElement;

  var lastT = 0;
  function frame(ts) {
    raf = 0;
    if (dead) return;
    var dt = lastT ? (ts - lastT) / 1000 : 0.0166;
    lastT = ts;
    if (dt > 0.1) dt = 0.1;                             /* 탭 복귀 시 점프 방지 */
    step(dt); draw();
    raf = requestAnimationFrame(frame);
  }
  function start() { if (!raf && !dead && !paused && !doc.hidden) { lastT = 0; raf = requestAnimationFrame(frame); } }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }

  /* ---- 이벤트 ---- */
  function onVis() { if (doc.hidden) stop(); else start(); }
  doc.addEventListener('visibilitychange', onVis);
  var ro = null;
  if (window.ResizeObserver) { ro = new ResizeObserver(function () { resize(); }); ro.observe(host); }
  function onWinResize() { resize(); }
  window.addEventListener('resize', onWinResize);
  function onMQ() { reduced = opts.reduced != null ? !!opts.reduced : mql.matches; allocPools(); seedParticles(BB.part); }
  if (mql && mql.addEventListener) mql.addEventListener('change', onMQ);

  /* ─────────────────── 10. 공개 메서드 ─────────────────── */
  S.mount = function () { return S; };
  S.setBiome = function (i) {
    i = clamp(i | 0, 0, BIOMES.length - 1);
    if (BIOMES[i] === BB && xf >= 1) return S;
    BA = BB; geoA = geoB;                               /* 진행 중이던 전환은 즉시 확정 */
    BB = BIOMES[i]; geoB = buildGeo(BB, (seed ^ (i * 2654435761)) >>> 0);
    bi = i; xf = 0;
    for (var j = 0; j < PN; j++) { parts[j].g = 1; parts[j].sw = Math.random() * 0.82; }
    return S;
  };
  S.setMood = function (m) {
    if (!MOODS[m]) m = 'normal';
    mood = m; mt = MOODS[m];
    return S;
  };
  S.setFire = function (v) { fireForce = (v == null) ? null : clamp(+v || 0, 0, 1); return S; };
  S.setProgress = function (p) { progress = clamp(+p || 0, 0, 1); return S; };
  S.shake = function (power) { shakeMag = min(1.6, shakeMag + clamp(+power || 0, 0, 1)); shakeT = 0; return S; };
  S.flash = function (col, ms) {
    flashCol = typeof col === 'string' ? hex2rgb(col) : (col || PAL.core);
    flashDur = max(0.05, (ms == null ? 240 : ms) / 1000);
    flashT = flashDur; return S;
  };
  S.fire = function () { return pulse; };
  S.firePos = function () { return { x: fireX, y: gY, r: R, strength: strength }; };
  S.groundY = function () { return gY; };
  S.size = function () { return { w: Wd, h: Ht }; };
  S.biome = function () { return { i: bi, name: BB.name }; };
  S.slots = function (n, row) {
    row = ROWS[row] ? row : 'front';
    var Rw = ROWS[row], out = occ[row];
    out.length = 0;
    n = max(0, n | 0);
    /* 좁은 화면 보정: 폭이 줄면 줄 간격을 벌려 무리가 서로 파묻히지 않게 한다.
     * 1000px 이상에서는 아트 디렉션 수치 그대로다. */
    var sp = clamp((1000 - Wd) / 560, 0, 1) * 0.42;
    var mid = (Rw.x0 + Rw.x1) * 0.5;
    var x0 = mid + (Rw.x0 - mid) * (1 + sp), x1 = mid + (Rw.x1 - mid) * (1 + sp);
    for (var i = 0; i < n; i++) {
      var f = n === 1 ? 0.5 : i / (n - 1);
      var x = lerp(x0, x1, f) * Wd;
      var y = gY + Rw.y * Ht;
      if (row === 'front' || row === 'back') y -= Ht * 0.015 * sin(f * PI);   /* 불을 둘러싼 초승달 */
      if (row === 'air') y += sin(t * 1.05 + i * 1.7) * Ht * 0.014;
      out.push({
        i: i, x: x, y: y, scale: Rw.s, dir: Rw.dir, row: row,
        z: Rw.z * 10 + i, size: Ht * 0.19 * Rw.s,
        light: pw(litAt(x, row === 'air' ? gY : y), 1.2)
      });
    }
    return out;
  };
  S.pause = function (b) { paused = !!b; if (paused) stop(); else start(); return S; };
  S.dispose = function () {
    dead = true; stop();
    doc.removeEventListener('visibilitychange', onVis);
    window.removeEventListener('resize', onWinResize);
    if (ro) ro.disconnect();
    if (mql && mql.removeEventListener) mql.removeEventListener('change', onMQ);
    if (bg.parentNode) bg.parentNode.removeChild(bg);
    if (fg.parentNode) fg.parentNode.removeChild(fg);
    if (mob.parentNode) mob.parentNode.removeChild(mob);
    host.classList.remove('wl-scene');
    docEl.style.removeProperty('--wl-fire');
    if (ACTIVE === S) ACTIVE = null;
  };
  S.frames = function () { return frames; };
  S.bg = bg; S.fg = fg; S.mob = mob; S.host = host;

  /* ---- 초기화 ---- */
  resize();
  makeStars();
  allocPools();
  geoA = geoB = buildGeo(BB, (seed ^ (bi * 2654435761)) >>> 0);
  seedParticles(BB.part);
  step(0.016); draw();
  start();
  return S;
}

/* ─────────────────── 11. 파사드 ─────────────────── */
/* 보통 무대는 화면에 하나다. 그래서 WL.Scene.* 는 마지막으로 mount 한 무대에
 * 그대로 위임한다. 여러 개를 띄우려면 mount() 가 돌려준 핸들을 직접 써라. */
var ACTIVE = null;

function proxy(name, fallback) {
  return function (a, b) {
    if (!ACTIVE) return fallback === undefined ? null : (typeof fallback === 'function' ? fallback() : fallback);
    return ACTIVE[name](a, b);
  };
}

W.Scene = {
  BIOMES: (function () {
    var o = [];
    for (var i = 0; i < BIOMES.length; i++) o.push(BIOMES[i].name);
    return o;
  })(),
  mount: function (el, opts) {
    if (!el) throw new Error('WL.Scene.mount: el 이 없다');
    if (ACTIVE && ACTIVE.host === el) ACTIVE.dispose();
    ACTIVE = Stage(el, opts);
    return ACTIVE;
  },
  setBiome:    proxy('setBiome'),
  setMood:     proxy('setMood'),
  setFire:     proxy('setFire'),
  setProgress: proxy('setProgress'),
  shake:       proxy('shake'),
  flash:       proxy('flash'),
  fire:        function () { return ACTIVE ? ACTIVE.fire() : 1; },
  firePos:     function () { return ACTIVE ? ACTIVE.firePos() : { x: 0, y: 0, r: 0, strength: 1 }; },
  groundY:     function () { return ACTIVE ? ACTIVE.groundY() : 0; },
  size:        function () { return ACTIVE ? ACTIVE.size() : { w: 0, h: 0 }; },
  biome:       function () { return ACTIVE ? ACTIVE.biome() : { i: 0, name: BIOMES[0].name }; },
  slots:       function (n, row) { return ACTIVE ? ACTIVE.slots(n, row) : []; },
  pause:       proxy('pause'),
  dispose:     function () { if (ACTIVE) ACTIVE.dispose(); },
  active:      function () { return ACTIVE; }
};

})();
