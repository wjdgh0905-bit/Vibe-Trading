/* ============================================================================
 * WL.Creatures — 모닥불 무리: 파라메트릭 SVG 생물 렌더러
 * 의존성 0 · IIFE · window.WL 에 부착 · 최상위에서 DOM 안 건드림
 * ----------------------------------------------------------------------------
 * 공개 API
 * ----------------------------------------------------------------------------
 *   WL.Creatures.SPECIES
 *     { [id]: spec }  — 종 카탈로그(읽기 전용으로 쓸 것).
 *     동료 24종 id (로스터 index 0..23 순서 = WL.Creatures.PETS):
 *       0~11  hamster rabbit fox wolf hawk bear tiger rhino elephant
 *             shark mammoth dragon
 *       12~23 squid crocodile condor spermwhale bluewhale megalodon
 *             titanoboa paracer quetzal samjogo kirin peng
 *       (PETS_V1 은 앞 12종만. 구 호출부 호환용)
 *     적 아키타입 10종 id: insect snail critter bird reptile fish cephalopod
 *                   beast brute titan
 *
 *   WL.Creatures.make(opts) -> handle
 *     opts = {
 *       species : 'fox',            // 필수. SPECIES 의 key
 *       stage   : 0..4,             // 성장 단계 (기본 2)
 *       size    : 96,               // px. 세로 기준. (기본 96)
 *       flip    : false,            // true 면 왼쪽을 향함
 *       palette : {                 // 선택. 지역/적 색 오버라이드
 *         tint  : '#C1391A',        //   코트 색조
 *         amt   : 0.30,             //   코트에 tint 섞는 비율 0~1
 *         base  : '#0E1119',        //   코트 바닥색 (기본 --night/--soot)
 *         rim   : 'warm'|'cold',    //   주 림라이트 (동료=warm, 적=cold)
 *         accent: '#FFE2A6'         //   눈/균열 색
 *       },
 *       mood    : 'calm',           // 'calm'|'happy'|'fierce'|'tired'
 *       seed    : 1234,             // 개체 고정 시드(위상·흉터 위치). 미지정시 랜덤
 *       label   : '여우 루'          // aria-label 용(접근성). 미지정시 종 이름
 *     }
 *
 *   handle = {
 *     el,                           // <svg> 엘리먼트. 원하는 부모에 append 하면 됨
 *     play(state, opts),            // state: 'idle'|'attack'|'hurt'|'cheer'
 *                                   //        |'sleep'|'die'|'eat'|'pet'
 *                                   // opts: {hold:true} 1회성 상태를 유지
 *     setStage(n),                  // 0~4. 형태/비율/장식/색농도 전부 재생성
 *     setMood(m),                   // 'calm'|'happy'|'fierce'|'tired'
 *     setPalette(p),                // 색만 교체(지오메트리 재사용, 저비용)
 *     setSize(px), setFlip(bool),
 *     state,                        // 현재 상태 문자열(읽기 전용)
 *     spec,                         // 적용된 최종 스펙(디버그용)
 *     dispose()                     // 애니메이션 해제 + DOM 제거
 *   }
 *
 *   WL.Creatures.quality(n)         // 품질 티어. 2=전부 / 1=몸통 호흡·깜빡임·꼬리만
 *                                   // / 0=상시 애니메이션 정지. 인자 없으면 현재 값 반환.
 *                                   // 상태 연출(공격·피격·환호)은 어느 티어에서도 재생된다.
 *   WL.Creatures.autoQuality(bool)  // 프레임 예산(18ms) 초과를 감지해 자동으로 티어를
 *                                   // 내리고, 여유가 지속되면 되올린다.
 *                                   // 첫 make() 시점에 자동으로 켜진다. 끄려면 false.
 *
 *   WL.Creatures.drive(fn)          // 선택. 매 프레임 0~1 값을 받아 전역 CSS 변수
 *                                   // --wl-fire 로 흘려보냄(불의 맥박 연동용).
 *                                   // fn(tSec) -> number. 해제: drive(null)
 *   WL.Creatures.injectStyle()      // 수동 스타일 주입(보통 불필요, make가 호출)
 * ----------------------------------------------------------------------------
 * 스펙 필드 — 종 카탈로그에만 쓰는 선택 플래그
 *   flap   : 초. fly 종(arch:'bird')의 날갯짓 주기. 0/미지정이면 .62s.
 *            활공조(콘도르 3.4 · 붕 3.0)와 소형 맹금을 같은 속도로 퍼덕이면 같은 새로 읽힌다.
 *   cape   : false 면 stage4 망토를 걸치지 않는다(엎드린 악어 등).
 *   collar : false 면 stage1 목줄을 걸지 않는다(목이 두개골과 붙은 종).
 * ----------------------------------------------------------------------------
 * 조형 언어 — 모든 종이 공유한다
 *   · 단 하나의 프리미티브 ribbon(controlPoints, radiusProfile) 로 전부 그린다.
 *     몸통·목·머리·다리·꼬리·뿔·엄니·코·지느러미·날개·촉수가 전부 같은 함수다.
 *   · 아웃라인은 언제나 자기 fill 을 어둡게 섞은 파생색(검정 금지).
 *   · 실루엣 판별은 extras(뿔/엄니/코/지느러미/날개/등껍질/집게/더듬이/볏/촉수/
 *     갈기/꼬리깃/가시/판/수염 + 신규 12종이 가져온 긴턱선/목도리/고래미익/사각두상/
 *     아가리/배비늘/굽/혓불/후광/깔때기/외투막지느러미)가 만든다.
 *     반경 프로필만으로는 종이 안 갈린다.
 *   · 림라이트 2개: warm(모닥불, 아래-뒤) + cool(달빛, 위-앞).
 * ----------------------------------------------------------------------------
 * 통합 시 주의
 *   · 이 모듈은 상태를 읽기만 한다. 게임 수식에 절대 계수를 넣지 않는다.
 *   · <defs> 는 문서에 1회만 주입되며 id 는 wlcr- 접두사로 네임스페이스된다.
 *   · prefers-reduced-motion 은 html.rm 클래스 또는 미디어쿼리 둘 다로 분기한다.
 *   · 품질 티어도 분기점이 html 클래스 한 곳(wlq1/wlq0)뿐이다. 40군데로 흩뿌리지 말 것.
 *
 * 성능 (실측, Chromium / 70px 인스턴스)
 *   12~13마리(실제 전장 부하) 60fps · 20마리 q2 ~45fps / q1 60fps · 40마리 q1 ~44fps.
 *   많이 띄울 화면에서는 autoQuality(true) 를 켜 두는 것을 권장한다.
 *
 * 렌더 구조 — 왜 이렇게 생겼는지
 *   · 실루엣 통합: 파트마다 외곽선을 그으면 머리가 몸에 '덧붙은' 것처럼 보인다.
 *     그래서 채움 패스에는 내부 선이 하나도 없고, 뒤에 깔린 <use> 1장이
 *     양면 그라디언트(불 ← → 달) 스트로크로 림라이트를 만든다. 빛이 안 닿는
 *     구간은 밤으로 녹는다 — 외곽선이 아니라 조명이 형체를 만든다.
 *   · <use> 는 정확히 1장이다. 3장이면 애니메이션 DOM 이 4배가 되어 20마리에서 7fps 로 죽는다.
 *   · vector-effect:non-scaling-stroke 를 쓰지 않는다. 매 프레임 스트로크를 다시 재는
 *     비용이 실측으로 가장 컸다(13마리 15fps → 60fps). 스트로크는 전부 사용자 단위다.
 *   · transform-box:view-box 에서 transform-origin 길이값은 (Chromium 실측) 뷰박스
 *     좌상단이 아니라 사용자 좌표계 원점 기준이다. viewBox min 을 빼면 파트 회전축이
 *     어긋나 귀·꼬리가 몸에서 떨어져 나간다. 원좌표를 그대로 쓸 것.
 * ========================================================================== */
(function () {
'use strict';
var W = (window.WL = window.WL || {});
if (W.Creatures) return;

/* ─────────────────────────── 0. 유틸 ─────────────────────────── */
var PI = Math.PI, cos = Math.cos, sin = Math.sin, abs = Math.abs;
function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function lerp(a, b, t) { return a + (b - a) * t; }
function r2(v) { return Math.round(v * 100) / 100; }
function rad(d) { return d * PI / 180; }

/* 결정론적 난수 (개체 고정 시드) */
function rng(seed) {
  var s = (seed | 0) || 1;
  return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; s |= 0; return ((s >>> 0) % 100000) / 100000; };
}

/* 색: hex -> rgb, 혼합, 어둡게/밝게 */
function hex2rgb(h) {
  h = h.replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  var n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgb2hex(c) {
  return '#' + c.map(function (v) { var s = clamp(Math.round(v), 0, 255).toString(16); return s.length < 2 ? '0' + s : s; }).join('');
}
function mix(a, b, t) {
  var A = hex2rgb(a), B = hex2rgb(b);
  return rgb2hex([lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t)]);
}
function shade(c, t) { return mix(c, '#05070C', t); }
function tintUp(c, t) { return mix(c, '#FFE2A6', t); }

/* ─────────────────────────── 1. 팔레트 ─────────────────────────── */
var PAL = {
  night: '#0E1119', soot: '#1C2331', ash: '#2B3346',
  ember: '#FF9333', emberCore: '#FFE2A6', emberDeep: '#C1391A',
  moon: '#9EB6D6', firefly: '#C7DE7A', soulfire: '#5FD9C4'
};

/* ─────────────────── 2. 지오메트리 프리미티브 ─────────────────── */
/* Catmull-Rom 샘플 (2D) */
function crPt(P, t) {
  var n = P.length - 1;
  var x = clamp(t, 0, 0.9999999) * n, i = Math.floor(x), f = x - i;
  var p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[Math.min(n, i + 1)], p3 = P[Math.min(n, i + 2)];
  var f2 = f * f, f3 = f2 * f;
  return [
    0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * f + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * f2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * f3),
    0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * f + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * f2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * f3)
  ];
}
/* Catmull-Rom 샘플 (1D, 반경 프로필) */
function crNum(A, t) {
  var n = A.length - 1;
  if (n <= 0) return A[0];
  var x = clamp(t, 0, 0.9999999) * n, i = Math.floor(x), f = x - i;
  var p0 = A[Math.max(0, i - 1)], p1 = A[i], p2 = A[Math.min(n, i + 1)], p3 = A[Math.min(n, i + 2)];
  var f2 = f * f, f3 = f2 * f;
  return 0.5 * (2 * p1 + (-p0 + p2) * f + (2 * p0 - 5 * p1 + 4 * p2 - p3) * f2 + (-p0 + 3 * p1 - 3 * p2 + p3) * f3);
}

/* 닫힌 점열 -> 부드러운 path (중점 통과 2차 베지어) */
function closedSmooth(p) {
  var n = p.length, i, a, b, d;
  if (n < 3) return '';
  a = p[n - 1]; b = p[0];
  d = 'M' + r2((a[0] + b[0]) / 2) + ' ' + r2((a[1] + b[1]) / 2);
  for (i = 0; i < n; i++) {
    a = p[i]; b = p[(i + 1) % n];
    d += 'Q' + r2(a[0]) + ' ' + r2(a[1]) + ' ' + r2((a[0] + b[0]) / 2) + ' ' + r2((a[1] + b[1]) / 2);
  }
  return d + 'Z';
}
/* 열린 점열 -> 부드러운 polyline path (수염·흉터·더듬이용) */
function openSmooth(p) {
  var n = p.length, i, d;
  if (n < 2) return '';
  d = 'M' + r2(p[0][0]) + ' ' + r2(p[0][1]);
  for (i = 1; i < n - 1; i++) d += 'Q' + r2(p[i][0]) + ' ' + r2(p[i][1]) + ' ' + r2((p[i][0] + p[i + 1][0]) / 2) + ' ' + r2((p[i][1] + p[i + 1][1]) / 2);
  d += 'L' + r2(p[n - 1][0]) + ' ' + r2(p[n - 1][1]);
  return d;
}

/* ★ 핵심 프리미티브: 가변 반경 리본
 *  cps  : 제어점 [[x,y],...]
 *  prof : 반경 프로필 (배열 또는 숫자)
 *  o    : {n:샘플수, cap0:bool, cap1:bool, capN:정밀도}
 *  -> 닫힌 부드러운 path 문자열
 */
function ribbon(cps, prof, o) {
  o = o || {};
  var N = o.n || 12, CAP = o.capN || 5, i, k, t;
  var isNum = typeof prof === 'number';
  var S = [], pts = [], eps = 0.004;
  for (i = 0; i <= N; i++) {
    t = i / N;
    var p = crPt(cps, t);
    var p2 = crPt(cps, Math.min(1, t + eps)), p1 = crPt(cps, Math.max(0, t - eps));
    var tx = p2[0] - p1[0], ty = p2[1] - p1[1], L = Math.hypot(tx, ty) || 1;
    tx /= L; ty /= L;
    S.push({ x: p[0], y: p[1], tx: tx, ty: ty, nx: ty, ny: -tx, r: isNum ? prof : crNum(prof, t) });
  }
  /* 위쪽 */
  for (i = 0; i <= N; i++) pts.push([S[i].x + S[i].nx * S[i].r, S[i].y + S[i].ny * S[i].r]);
  /* 앞 캡 */
  var e = S[N];
  if (o.cap1 !== false) {
    for (k = 1; k < CAP; k++) {
      var a = PI / 2 - (PI * k) / CAP;
      pts.push([e.x + (cos(a) * e.tx + sin(a) * e.nx) * e.r, e.y + (cos(a) * e.ty + sin(a) * e.ny) * e.r]);
    }
  }
  /* 아래쪽(역순) */
  for (i = N; i >= 0; i--) pts.push([S[i].x - S[i].nx * S[i].r, S[i].y - S[i].ny * S[i].r]);
  /* 뒤 캡 */
  var s0 = S[0];
  if (o.cap0 !== false) {
    for (k = 1; k < CAP; k++) {
      var a2 = -PI / 2 - (PI * k) / CAP;
      pts.push([s0.x + (cos(a2) * s0.tx + sin(a2) * s0.nx) * s0.r, s0.y + (cos(a2) * s0.ty + sin(a2) * s0.ny) * s0.r]);
    }
  }
  return closedSmooth(pts);
}

/* 타원 path (그림자·눈·판 등) */
function ell(cx, cy, rx, ry, rot) {
  var p = [], i, a, c = cos(rad(rot || 0)), s = sin(rad(rot || 0));
  for (i = 0; i < 10; i++) {
    a = (i / 10) * PI * 2;
    var x = cos(a) * rx, y = sin(a) * ry;
    p.push([cx + x * c - y * s, cy + x * s + y * c]);
  }
  return closedSmooth(p);
}
/* 뾰족한 삼각 조각 (가시·이빨·볏) */
function spike(bx, by, ang, len, wid) {
  var a = rad(ang), dx = cos(a), dy = -sin(a), px = -dy, py = dx;
  return closedSmooth([
    [bx - px * wid, by - py * wid],
    [bx + dx * len * 0.55 - px * wid * 0.45, by + dy * len * 0.55 - py * wid * 0.45],
    [bx + dx * len, by + dy * len],
    [bx + dx * len * 0.55 + px * wid * 0.45, by + dy * len * 0.55 + py * wid * 0.45],
    [bx + px * wid, by + py * wid]
  ]);
}
/* 벡터 헬퍼 */
function add(p, d, k) { return [p[0] + d[0] * k, p[1] + d[1] * k]; }
function dirOf(deg) { return [cos(rad(deg)), -sin(rad(deg))]; }
function perp(d) { return [d[1], -d[0]]; }   /* 화면상 '위' 방향 */


/* ─────────────────────── 3. 종 카탈로그 ───────────────────────
 * 좌표계: 원점 = 접지점 중앙, +x = 전방, -y = 위.
 * 모든 길이는 "기준 체고 1.0" 정규화. bulk 가 종간 크기 차이를 만든다.
 * ------------------------------------------------------------- */
var DEF = {
  name: '짐승', arch: 'quad', bulk: 1, hover: 0, tilt: 0, flap: 0,
  body: { len: 0.56, girth: 0.155, prof: [0.74, 1.00, 0.98, 0.94, 0.60, 0.34], sag: 0.012, rise: 0.035 },
  neck: { len: 0.15, ang: 44, r: 0.55 },
  legs: { n: 4, len: 0.22, thick: 0.045, foreBend: 0.30, rearBend: 0.62, hock: 0.06, paw: 0.045, plant: 0.25, spread: 0.055, sprawl: 0 },
  head: { size: 0.185, prof: [0.44, 0.98, 0.86, 0.58, 0.34], snout: 0.55, taper: 1, drop: 20, brow: 0 },
  ears: { type: 'point', h: 0.15, w: 0.10, tilt: -10, x: -0.10, y: 0.72, n: 2 },
  tail: { type: 'brush', len: 0.34, r: 0.06, curl: -34, lift: 14, tuft: 1 },
  eye: { size: 0.030, x: 0.50, y: 0.30, shape: 'round' },
  mouth: 1,
  extras: [], marks: null,
  tint: '#8A8C93', gait: 'trot'
};

function deep(a, b) {
  var o = {}, k;
  for (k in a) o[k] = a[k] && a[k].constructor === Object ? deep(a[k], {}) : (a[k] && a[k].constructor === Array ? a[k].slice() : a[k]);
  for (k in b) {
    if (b[k] && b[k].constructor === Object && o[k] && o[k].constructor === Object) o[k] = deep(o[k], b[k]);
    else o[k] = b[k] && b[k].constructor === Array ? b[k].slice() : b[k];
  }
  return o;
}
function S_(o) { return deep(DEF, o); }

var SPECIES = {
  /* ══════════ 동료 12종 ══════════ */
  hamster: S_({
    name: '햄찌', bulk: 0.50, gait: 'scurry',
    body: { len: 0.26, girth: 0.215, prof: [1.00, 1.10, 1.06, 0.84, 0.44, 0.28], sag: 0.004, rise: 0.010 },
    neck: { len: 0.075, ang: 40, r: 0.60 },
    legs: { len: 0.095, thick: 0.031, foreBend: 0.18, rearBend: 0.40, hock: 0.02, paw: 0.040, plant: 0.7, spread: 0.04 },
    head: { size: 0.200, prof: [0.44, 1.00, 0.86, 0.58, 0.40], snout: 0.28, taper: 0.9, drop: 12 },
    ears: { type: 'round', h: 0.125, w: 0.112, tilt: 8, x: -0.20, y: 0.86 },
    tail: { type: 'stub', len: 0.07, r: 0.035, curl: 20, lift: 8 },
    eye: { size: 0.036, x: 0.46, y: 0.26 },
    extras: [{ t: 'cheek', r: 0.085 }, { t: 'whisker', n: 3, len: 0.12 }, { t: 'claw', n: 3, len: 0.022 }],
    marks: { type: 'patch', n: 1 }, tint: '#C8955E'
  }),
  rabbit: S_({
    name: '토깽이', bulk: 0.60, gait: 'hop',
    body: { len: 0.44, girth: 0.185, prof: [0.92, 1.06, 0.98, 0.86, 0.56, 0.40], sag: -0.008, rise: 0.0 },
    neck: { len: 0.07, ang: 52, r: 0.66 },
    legs: { len: 0.11, thick: 0.038, foreBend: 0.20, rearBend: 0.95, hock: 0.13, paw: 0.06, plant: 0.6, spread: 0.045 },
    head: { size: 0.185, prof: [0.44, 0.98, 0.84, 0.58, 0.40], snout: 0.30, taper: 0.85, drop: 8 },
    ears: { type: 'long', h: 0.34, w: 0.078, tilt: -3, x: -0.12, y: 0.76 },
    tail: { type: 'puff', len: 0.09, r: 0.062, curl: 30, lift: 10 },
    eye: { size: 0.032, x: 0.48, y: 0.28 },
    extras: [{ t: 'haunch', r: 0.135 }, { t: 'whisker', n: 3, len: 0.11 }],
    marks: { type: 'counter', n: 1 }, tint: '#D6CFC2'
  }),
  fox: S_({
    name: '여우 루', bulk: 0.70, gait: 'trot',
    body: { len: 0.54, girth: 0.140, prof: [0.78, 1.00, 0.96, 0.90, 0.56, 0.32], sag: 0.014, rise: 0.030 },
    neck: { len: 0.13, ang: 40, r: 0.56 },
    legs: { len: 0.20, thick: 0.038, foreBend: 0.30, rearBend: 0.66, hock: 0.07, paw: 0.042, plant: 0.2, spread: 0.05 },
    head: { size: 0.175, prof: [0.42, 0.96, 0.74, 0.44, 0.22], snout: 0.78, taper: 0.6, drop: 16 },
    ears: { type: 'point', h: 0.185, w: 0.105, tilt: -8, x: -0.10, y: 0.74 },
    tail: { type: 'brush', len: 0.56, r: 0.078, curl: -40, lift: 20, tuft: 1.2 },
    eye: { size: 0.029, x: 0.54, y: 0.30, shape: 'slit' },
    extras: [{ t: 'whisker', n: 3, len: 0.13 }, { t: 'ruff', r: 0.075, n: 4 }, { t: 'claw', n: 3, len: 0.022 }],
    marks: { type: 'sock', n: 4 }, tint: '#E2712B'
  }),
  wolf: S_({
    name: '늑대 카이', bulk: 0.84, gait: 'trot',
    body: { len: 0.60, girth: 0.150, prof: [0.72, 0.96, 0.94, 0.98, 0.62, 0.34], sag: 0.010, rise: 0.045 },
    neck: { len: 0.155, ang: 34, r: 0.62 },
    legs: { len: 0.31, thick: 0.041, foreBend: 0.26, rearBend: 0.60, hock: 0.085, paw: 0.046, plant: 0.2, spread: 0.06 },
    head: { size: 0.185, prof: [0.46, 0.96, 0.80, 0.54, 0.30], snout: 0.66, taper: 0.78, drop: 22 },
    ears: { type: 'point', h: 0.155, w: 0.108, tilt: -6, x: -0.10, y: 0.74 },
    tail: { type: 'brush', len: 0.44, r: 0.060, curl: 26, lift: -22, tuft: 1.05 },
    eye: { size: 0.028, x: 0.54, y: 0.30, shape: 'slit' },
    extras: [{ t: 'ruff', r: 0.130, n: 7 }, { t: 'whisker', n: 2, len: 0.13 }, { t: 'fang', n: 2, len: 0.030 }, { t: 'claw', n: 3, len: 0.024 }],
    marks: { type: 'counter', n: 1 }, tint: '#7E8CA3'
  }),
  hawk: S_({
    name: '매 하늘', arch: 'bird', bulk: 0.68, gait: 'hover', hover: 0.10,
    body: { len: 0.30, girth: 0.205, prof: [0.40, 0.86, 1.08, 0.98, 0.50, 0.26], sag: -0.03, rise: 0.055 },
    neck: { len: 0.105, ang: 70, r: 0.50 },
    legs: { n: 2, len: 0.20, thick: 0.020, foreBend: 0.5, rearBend: 0.5, hock: 0.06, paw: 0.052, plant: 0.5, spread: 0.030 },
    head: { size: 0.150, prof: [0.50, 1.04, 0.90, 0.54, 0.26], snout: 0.10, taper: 0.66, drop: 62 },
    ears: { type: 'none' },
    tail: { type: 'feather', len: 0.40, r: 0.070, curl: -4, lift: -46 },
    eye: { size: 0.030, x: 0.30, y: 0.32, shape: 'fierce' },
    extras: [{ t: 'wing', kind: 'feather', len: 0.46, w: 0.21, ang: 4 }, { t: 'beak', len: 0.15, w: 0.052, hook: 0.52 },
             { t: 'crest', n: 3, len: 0.040 }, { t: 'talon', n: 3, len: 0.040 }],
    marks: { type: 'bar', n: 3 }, tint: '#B98A4A'
  }),
  bear: S_({
    name: '곰 바우', bulk: 0.98, gait: 'lumber',
    body: { len: 0.48, girth: 0.255, prof: [0.86, 1.02, 1.00, 1.12, 0.74, 0.48], sag: 0.022, rise: 0.075 },
    neck: { len: 0.085, ang: 30, r: 0.76 },
    legs: { len: 0.17, thick: 0.072, foreBend: 0.22, rearBend: 0.42, hock: 0.04, paw: 0.075, plant: 0.85, spread: 0.07 },
    head: { size: 0.200, prof: [0.48, 1.00, 0.86, 0.62, 0.40], snout: 0.40, taper: 0.95, drop: 22 },
    ears: { type: 'round', h: 0.125, w: 0.112, tilt: 6, x: -0.24, y: 0.84 },
    tail: { type: 'stub', len: 0.07, r: 0.04, curl: 10, lift: 4 },
    eye: { size: 0.026, x: 0.52, y: 0.30 },
    extras: [{ t: 'claw', n: 4, len: 0.036 }, { t: 'hump', r: 0.09 }], tint: '#7A5535'
  }),
  tiger: S_({
    name: '호랑이 범', bulk: 0.94, gait: 'prowl',
    body: { len: 0.70, girth: 0.168, prof: [0.78, 1.00, 0.92, 1.04, 0.62, 0.34], sag: 0.020, rise: 0.026 },
    neck: { len: 0.100, ang: 32, r: 0.60 },
    legs: { len: 0.25, thick: 0.052, foreBend: 0.26, rearBend: 0.66, hock: 0.07, paw: 0.058, plant: 0.25, spread: 0.065 },
    head: { size: 0.215, prof: [0.52, 1.04, 0.88, 0.60, 0.40], snout: 0.30, taper: 1.0, drop: 14 },
    ears: { type: 'round', h: 0.115, w: 0.098, tilt: -4, x: -0.16, y: 0.80 },
    tail: { type: 'thin', len: 0.52, r: 0.042, curl: -46, lift: 18, tuft: 1.2 },
    eye: { size: 0.030, x: 0.50, y: 0.30, shape: 'fierce' },
    extras: [{ t: 'haunch', r: 0.125 }, { t: 'whisker', n: 4, len: 0.13 }, { t: 'fang', n: 2, len: 0.034 }, { t: 'claw', n: 4, len: 0.030 }, { t: 'cheekfur', n: 3 }],
    marks: { type: 'stripe', n: 7 }, tint: '#E28A2A'
  }),
  rhino: S_({
    name: '코뿔소 탱', bulk: 1.06, gait: 'lumber',
    body: { len: 0.60, girth: 0.235, prof: [0.86, 1.02, 1.00, 1.00, 0.66, 0.50], sag: 0.014, rise: 0.02 },
    neck: { len: 0.07, ang: 14, r: 0.86 },
    legs: { len: 0.155, thick: 0.082, foreBend: 0.10, rearBend: 0.22, hock: 0.02, paw: 0.062, plant: 0.6, spread: 0.075 },
    head: { size: 0.190, prof: [0.52, 0.88, 0.82, 0.62, 0.44], snout: 0.62, taper: 0.9, drop: 34 },
    ears: { type: 'tube', h: 0.075, w: 0.042, tilt: 18, x: -0.24, y: 0.66 },
    tail: { type: 'rope', len: 0.17, r: 0.020, curl: -28, lift: -4, tuft: 1.4 },
    eye: { size: 0.022, x: 0.34, y: 0.30 },
    extras: [{ t: 'horn', mount: 'nose', n: 2, len: 0.21, curve: -30, w: 0.056 }, { t: 'plate', n: 4 }], tint: '#6E7788'
  }),
  elephant: S_({
    name: '코끼리 우르', bulk: 1.20, gait: 'lumber',
    body: { len: 0.58, girth: 0.232, prof: [0.88, 1.00, 1.04, 1.02, 0.70, 0.54], sag: 0.010, rise: 0.03 },
    neck: { len: 0.055, ang: 30, r: 0.92 },
    legs: { len: 0.32, thick: 0.094, foreBend: 0.06, rearBend: 0.14, hock: 0.01, paw: 0.052, plant: 0.5, spread: 0.085 },
    head: { size: 0.215, prof: [0.56, 1.00, 0.86, 0.56, 0.34], snout: 0.22, taper: 0.9, drop: 14 },
    ears: { type: 'fan', h: 0.34, w: 0.30, tilt: -6, x: -0.34, y: 0.16 },
    tail: { type: 'rope', len: 0.24, r: 0.020, curl: -20, lift: -6, tuft: 1.6 },
    eye: { size: 0.022, x: 0.40, y: 0.24 },
    extras: [{ t: 'trunk', len: 0.52, r: 0.055, curl: 44 }, { t: 'tusk', n: 2, len: 0.26, curve: 52, w: 0.030 }], tint: '#8A8C93'
  }),
  shark: S_({
    name: '상어 지느', arch: 'fish', bulk: 0.92, gait: 'glide', hover: 0.20, tilt: -4,
    body: { len: 0.74, girth: 0.148, prof: [0.08, 0.42, 1.02, 0.94, 0.66, 0.28], sag: 0, rise: 0 },
    neck: { len: 0.10, ang: 4, r: 0.66 },
    legs: { n: 0 },
    head: { size: 0.150, prof: [0.60, 0.94, 0.78, 0.50, 0.20], snout: 0.86, taper: 0.55, drop: 2 },
    ears: { type: 'none' },
    tail: { type: 'caudal', len: 0.26, r: 0.17, curl: 0, lift: 0 },
    eye: { size: 0.024, x: 0.34, y: 0.28, shape: 'fierce' },
    extras: [{ t: 'dorsal', len: 0.24, w: 0.11, at: 0.46 }, { t: 'pectoral', len: 0.26, w: 0.075, ang: -34, at: 0.66 },
             { t: 'gill', n: 5 }, { t: 'fang', n: 3, len: 0.022 }],
    marks: { type: 'counter', n: 1 }, tint: '#6E90AA'
  }),
  mammoth: S_({
    name: '매머드 설', bulk: 1.26, gait: 'lumber',
    body: { len: 0.58, girth: 0.240, prof: [0.84, 0.98, 1.06, 1.06, 0.72, 0.54], sag: 0.008, rise: 0.055 },
    neck: { len: 0.05, ang: 34, r: 0.94 },
    legs: { len: 0.30, thick: 0.096, foreBend: 0.08, rearBend: 0.16, hock: 0.01, paw: 0.055, plant: 0.5, spread: 0.085 },
    head: { size: 0.215, prof: [0.62, 1.06, 0.84, 0.52, 0.32], snout: 0.24, taper: 0.9, drop: 12 },
    ears: { type: 'round', h: 0.085, w: 0.075, tilt: -6, x: -0.20, y: 0.56 },
    tail: { type: 'rope', len: 0.18, r: 0.024, curl: -18, lift: -4, tuft: 1.5 },
    eye: { size: 0.021, x: 0.40, y: 0.24 },
    extras: [{ t: 'trunk', len: 0.46, r: 0.058, curl: 62 }, { t: 'tusk', n: 2, len: 0.40, curve: 128, w: 0.040 },
             { t: 'shag', n: 9, len: 0.16 }, { t: 'hump', r: 0.11 }], tint: '#9A6B45'
  }),
  dragon: S_({
    name: '비룡 아르', bulk: 1.34, gait: 'prowl',
    body: { len: 0.58, girth: 0.152, prof: [0.66, 0.92, 1.00, 0.96, 0.56, 0.30], sag: 0.010, rise: 0.05 },
    neck: { len: 0.30, ang: 58, r: 0.46 },
    legs: { len: 0.24, thick: 0.048, foreBend: 0.34, rearBend: 0.72, hock: 0.08, paw: 0.050, plant: 0.2, spread: 0.06 },
    head: { size: 0.175, prof: [0.44, 0.92, 0.72, 0.44, 0.22], snout: 0.82, taper: 0.6, drop: 30 },
    ears: { type: 'point', h: 0.10, w: 0.055, tilt: 22, x: -0.14, y: 0.70 },
    tail: { type: 'spike', len: 0.70, r: 0.062, curl: -30, lift: 4 },
    eye: { size: 0.028, x: 0.54, y: 0.30, shape: 'fierce' },
    extras: [{ t: 'wing', kind: 'membrane', len: 0.74, w: 0.44, ang: 40 }, { t: 'horn', n: 2, len: 0.22, curve: 26, w: 0.040 },
             { t: 'ridge', n: 11, len: 0.055 }, { t: 'fang', n: 3, len: 0.030 }, { t: 'claw', n: 3, len: 0.034 }],
    tint: '#D4553A'
  }),

  /* ══════════ 동료 신규 12종 (로스터 index 12~23) ══════════
   * content-roster.js 의 ART 표는 Canvas 렌더러 스키마로 쓰여 있다. 아래는 그것을
   * 이 스키마로 옮긴 것이며, 번역 규칙은 다음 6줄이 전부다.
   *   mass            → bulk          계열 내 서열을 유지한 채 0.9+mass*0.7 근처로
   *   max(rT)         → body.girth    rT[i]/max(rT) → body.prof[i] (6칸 그대로)
   *   neck.ang        → 부호 반전     Canvas 는 위가 음수, 여기는 위가 양수다
   *   neck.thick/girth→ neck.r        head.tilt·jaw → head.drop·snout, brow 는 0/1
   *   legs.rows.length→ legs.n/2      삼족오만 예외(n:3)
   *   coat.base       → tint          혼합량은 성장단계(M.coat)가 정한다. belly 는 --bel 파생
   * extras 이름 대응: wingFeather/wingMembrane → wing{kind}, gills → gill,
   *   tailFeather → tail.type:'feather', caudal → tail.type:'caudal',
   *   tentacle8 → tentacle{n:8}. 나머지(lips·fluke·sharkjaw·snoutPad·ruffcheek·
   *   chitin·toes·flame·halo·siphon)는 아래 EX 표에 새로 구현했다.
   * ------------------------------------------------------------------------- */

  /* 12. 대왕오징어 — 촉수 + 외투막 지느러미. 무척추 실루엣은 이 종뿐 */
  squid: S_({
    name: '대왕오징어 크라', arch: 'float', bulk: 1.08, gait: 'drift', hover: 0.62,
    body: { len: 0.60, girth: 0.158, prof: [0.03, 0.44, 0.92, 1.04, 0.92, 0.56], sag: 0, rise: 0 },
    neck: { len: 0.03, ang: -50, r: 0.92 },
    legs: { n: 0 },
    head: { size: 0.115, prof: [0.80, 1.04, 0.94, 0.80, 0.58], snout: 0.08, taper: 1, drop: 4 },
    ears: { type: 'none' },
    tail: { type: 'none' },
    eye: { size: 0.046, x: 0.00, y: 0.66, shape: 'round' },
    mouth: 0,
    extras: [{ t: 'mantlefin', at: 0.12, w: 0.215 }, { t: 'siphon', at: 0.86, len: 0.14, w: 0.040, ang: -56 },
             { t: 'tentacle', n: 10, len: 0.76, r: 0.027, a0: -6, span: 112 }],
    marks: { type: 'patch', n: 1 }, tint: '#8E4468'
  }),
  /* 13. 바다악어 — 긴 턱선 + 낮은 실루엣. 키가 가장 낮은 동료다 */
  crocodile: S_({
    name: '바다악어 고르', bulk: 1.14, gait: 'sprawl', cape: false, collar: false,
    body: { len: 0.84, girth: 0.142, prof: [0.66, 0.94, 1.00, 0.96, 0.78, 0.50], sag: 0.026, rise: 0.0 },
    neck: { len: 0.135, ang: 8, r: 0.76 },
    legs: { n: 4, len: 0.105, thick: 0.044, foreBend: 0.88, rearBend: 1.00, hock: 0.10, paw: 0.054, plant: 0.55, spread: 0.110, sprawl: 1 },
    head: { size: 0.185, prof: [0.44, 0.80, 0.74, 0.62, 0.46], snout: 1.30, taper: 0.60, drop: 5, brow: 1 },
    ears: { type: 'none' },
    tail: { type: 'spike', len: 0.74, r: 0.070, curl: 12, lift: -6 },
    eye: { size: 0.023, x: 0.30, y: 0.66, shape: 'slit' },
    mouth: 0,
    extras: [{ t: 'ridge', n: 9, len: 0.024 }, { t: 'plate', n: 6 }, { t: 'lips', n: 9, tooth: 0.036 },
             { t: 'fang', n: 2, len: 0.026 }, { t: 'claw', n: 4, len: 0.026 }],
    marks: { type: 'stripe', n: 6 }, tint: '#6B7C55'
  }),
  /* 14. 안데스콘도르 — 목도리(ruffcheek). 매(4번)와 갈라지는 단 하나의 파츠 */
  condor: S_({
    name: '안데스콘도르 미르', arch: 'bird', bulk: 0.98, gait: 'hover', hover: 0.07, flap: 3.4,
    body: { len: 0.38, girth: 0.205, prof: [0.44, 0.92, 1.10, 0.90, 0.30, 0.14], sag: -0.03, rise: 0.050 },
    neck: { len: 0.275, ang: 72, r: 0.23 },
    legs: { n: 2, len: 0.20, thick: 0.019, foreBend: 0.5, rearBend: 0.5, hock: 0.055, paw: 0.050, plant: 0.5, spread: 0.030 },
    head: { size: 0.130, prof: [0.42, 0.96, 0.84, 0.50, 0.24], snout: 0.16, taper: 0.60, drop: 70 },
    ears: { type: 'none' },
    tail: { type: 'feather', len: 0.46, r: 0.090, curl: -2, lift: -12 },
    eye: { size: 0.026, x: 0.30, y: 0.32, shape: 'fierce' },
    extras: [{ t: 'wing', kind: 'feather', len: 0.45, w: 0.150, ang: 20 }, { t: 'ruffcheek', at: 0.775, r: 0.092, n: 9 },
             { t: 'beak', len: 0.140, w: 0.050, hook: 0.58 }, { t: 'talon', n: 3, len: 0.038 }],
    marks: { type: 'counter', n: 1 }, tint: '#5C5464'
  }),
  /* 15. 향유고래 — 사각 두상(snoutPad). 등지느러미가 없다는 게 정체성이다 */
  spermwhale: S_({
    name: '향유고래 모비', arch: 'fish', bulk: 1.46, gait: 'glide', hover: 0.26, tilt: -2,
    body: { len: 0.66, girth: 0.188, prof: [0.04, 0.40, 0.94, 1.06, 1.02, 0.86], sag: 0, rise: 0 },
    neck: { len: 0.03, ang: 1, r: 0.98 },
    legs: { n: 0 },
    head: { size: 0.330, prof: [0.88, 1.06, 1.08, 1.06, 0.98], snout: 0.80, taper: 1.0, drop: 0 },
    ears: { type: 'none' },
    tail: { type: 'none' },
    eye: { size: 0.013, x: 0.18, y: -0.52, shape: 'round' },
    mouth: 0,
    extras: [{ t: 'fluke', len: 0.36, w: 0.078, lift: 0 }, { t: 'pectoral', len: 0.20, w: 0.052, ang: 34, at: 0.62 },
             { t: 'snoutPad', at: 0.16, s: 1, o: 0.34 }, { t: 'lips', at: 0.30, n: 0, teeth: false }],
    marks: { type: 'counter', n: 1 }, tint: '#6E6658'
  }),
  /* 16. 대왕고래 — 길이 그 자체. 향유고래의 정확한 반대 실루엣이 되게 짰다 */
  bluewhale: S_({
    name: '대왕고래 유하', arch: 'fish', bulk: 1.56, gait: 'glide', hover: 0.24, tilt: -2,
    body: { len: 0.96, girth: 0.150, prof: [0.03, 0.36, 0.86, 1.02, 0.94, 0.66], sag: 0, rise: 0 },
    neck: { len: 0.03, ang: 2, r: 0.92 },
    legs: { n: 0 },
    head: { size: 0.260, prof: [0.70, 0.92, 0.74, 0.50, 0.24], snout: 0.88, taper: 0.55, drop: 4 },
    ears: { type: 'none' },
    tail: { type: 'none' },
    eye: { size: 0.013, x: 0.20, y: -0.46, shape: 'round' },
    mouth: 0,
    extras: [{ t: 'fluke', len: 0.33, w: 0.062, lift: 0 }, { t: 'pectoral', len: 0.34, w: 0.032, ang: 30, at: 0.66 },
             { t: 'dorsal', len: 0.055, w: 0.036, at: 0.17 }, { t: 'seg', n: 7, at: 0.74, span: 0.20, side: 1 },
             { t: 'lips', at: 0.36, n: 0, teeth: false }],
    marks: { type: 'counter', n: 1 }, tint: '#5A7EA4'
  }),
  /* 17. 메갈로돈 — 아가리(sharkjaw). 상어(9번)와 같은 계열이되 턱이 전부다 */
  megalodon: S_({
    name: '메갈로돈 크론', arch: 'fish', bulk: 1.50, gait: 'glide', hover: 0.22, tilt: -3,
    body: { len: 0.82, girth: 0.180, prof: [0.08, 0.44, 1.04, 1.00, 0.72, 0.30], sag: 0, rise: 0 },
    neck: { len: 0.085, ang: 4, r: 0.66 },
    legs: { n: 0 },
    head: { size: 0.190, prof: [0.62, 0.98, 0.86, 0.60, 0.26], snout: 0.74, taper: 0.58, drop: 2 },
    ears: { type: 'none' },
    tail: { type: 'caudal', len: 0.30, r: 0.19, curl: 0, lift: 0 },
    eye: { size: 0.017, x: 0.30, y: 0.34, shape: 'fierce' },
    mouth: 0,
    extras: [{ t: 'dorsal', len: 0.28, w: 0.125, at: 0.46 }, { t: 'pectoral', len: 0.23, w: 0.105, ang: 26, at: 0.60 },
             { t: 'gill', n: 5 }, { t: 'sharkjaw', n: 9, tooth: 0.052 }],
    marks: { type: 'counter', n: 1 }, tint: '#63707B'
  }),
  /* 18. 티타노보아 — 다리 0 + 코일 꼬리. 로스터에서 유일한 무족 실루엣 */
  titanoboa: S_({
    name: '티타노보아 세르', bulk: 1.26, gait: 'creep',
    body: { len: 0.76, girth: 0.122, prof: [0.80, 0.96, 1.02, 0.98, 0.88, 0.62], sag: -0.048, rise: 0.055 },
    neck: { len: 0.165, ang: 46, r: 0.80 },
    legs: { n: 0 },
    head: { size: 0.160, prof: [0.50, 0.92, 0.86, 0.66, 0.42], snout: 0.66, taper: 0.62, drop: 12, brow: 1 },
    ears: { type: 'none' },
    tail: { type: 'coil', len: 1.02, r: 0.080, curl: 172, lift: 26 },
    eye: { size: 0.022, x: 0.46, y: 0.44, shape: 'slit' },
    mouth: 0,
    extras: [{ t: 'chitin', n: 13, at: 0.06, span: 0.82 }, { t: 'lips', n: 9, tooth: 0.032 },
             { t: 'fang', n: 3, len: 0.026 }],
    marks: { type: 'bar', n: 6 }, tint: '#8A7C44'
  }),
  /* 19. 파라케라테리움 — 목 길이. 최대 bulk 이므로 장식은 둘로 끝낸다 */
  paracer: S_({
    name: '파라케라테리움 세이', bulk: 1.52, gait: 'lumber',
    body: { len: 0.60, girth: 0.186, prof: [0.82, 1.02, 1.00, 0.98, 0.56, 0.36], sag: 0.008, rise: 0.070 },
    neck: { len: 0.72, ang: 66, r: 0.33 },
    legs: { n: 4, len: 0.54, thick: 0.070, foreBend: 0.08, rearBend: 0.16, hock: 0.01, paw: 0.056, plant: 0.5, spread: 0.085 },
    head: { size: 0.180, prof: [0.46, 0.94, 0.86, 0.62, 0.42], snout: 0.58, taper: 0.78, drop: 44 },
    ears: { type: 'tube', h: 0.085, w: 0.045, tilt: -10, x: -0.20, y: 0.68 },
    tail: { type: 'rope', len: 0.16, r: 0.020, curl: -20, lift: -8, tuft: 1.4 },
    eye: { size: 0.020, x: 0.42, y: 0.30 },
    extras: [{ t: 'hump', r: 0.075 }, { t: 'lips', n: 0, teeth: false, at: 0.46 }, { t: 'snoutPad', at: 0.62, s: 0.6, o: 0.30 },
             { t: 'toes' }],
    tint: '#9E8A6E'
  }),
  /* 20. 케찰코아틀루스 — 막날개. 조류 3종과 갈라지는 지점이 여기다 */
  quetzal: S_({
    name: '케찰코아틀루스 란', bulk: 1.30, gait: 'stalk',
    body: { len: 0.38, girth: 0.132, prof: [0.52, 0.94, 1.06, 0.96, 0.56, 0.30], sag: -0.010, rise: 0.040 },
    neck: { len: 0.36, ang: 58, r: 0.42 },
    legs: { n: 2, len: 0.44, thick: 0.026, foreBend: 0.5, rearBend: 0.5, hock: 0.11, paw: 0.046, plant: 0.45, spread: 0.050 },
    head: { size: 0.200, prof: [0.42, 0.92, 0.64, 0.34, 0.15], snout: 1.30, taper: 0.50, drop: 40 },
    ears: { type: 'none' },
    tail: { type: 'none' },
    eye: { size: 0.024, x: 0.26, y: 0.36, shape: 'fierce' },
    mouth: 0,
    extras: [{ t: 'wing', kind: 'membrane', len: 1.04, w: 0.46, ang: 30 }, { t: 'crest', n: 3, len: 0.052 },
             { t: 'beak', len: 0.20, w: 0.040, hook: 0.10 }, { t: 'talon', n: 3, len: 0.034 }],
    tint: '#B08A66'
  }),
  /* 21. 삼족오 — 다리 3개(!). 신규 파츠 0개로 정체성을 만든 유일한 종 */
  samjogo: S_({
    name: '삼족오 해무', arch: 'bird', bulk: 1.02, gait: 'hover', hover: 0.06, flap: 1.15,
    body: { len: 0.34, girth: 0.185, prof: [0.46, 0.92, 1.06, 0.94, 0.50, 0.28], sag: -0.02, rise: 0.030 },
    neck: { len: 0.125, ang: 58, r: 0.50 },
    legs: { n: 3, len: 0.20, thick: 0.023, foreBend: 0.5, rearBend: 0.5, hock: 0.07, paw: 0.044, plant: 0.5, spread: 0.060 },
    head: { size: 0.155, prof: [0.46, 1.02, 0.86, 0.52, 0.26], snout: 0.20, taper: 0.66, drop: 52 },
    ears: { type: 'none' },
    tail: { type: 'feather', len: 0.36, r: 0.072, curl: -6, lift: -28 },
    eye: { size: 0.030, x: 0.30, y: 0.34, shape: 'fierce' },
    extras: [{ t: 'flame', n: 9, at: 0.12, span: 0.70, len: 0.290, o: 0.58 },
             { t: 'wing', kind: 'feather', len: 0.52, w: 0.190, ang: 12 },
             { t: 'beak', len: 0.110, w: 0.042, hook: 0.20 }, { t: 'talon', n: 3, len: 0.032 }],
    tint: '#56384E'
  }),
  /* 22. 기린(麒麟) — 외뿔 하나. 사슴 골격에 비늘이라는 모순이 정체성이다 */
  kirin: S_({
    name: '기린 서', bulk: 1.20, gait: 'trot',
    body: { len: 0.50, girth: 0.120, prof: [0.76, 1.00, 0.94, 0.92, 0.56, 0.34], sag: 0.008, rise: 0.050 },
    neck: { len: 0.36, ang: 62, r: 0.38 },
    legs: { n: 4, len: 0.50, thick: 0.024, foreBend: 0.24, rearBend: 0.58, hock: 0.10, paw: 0.030, plant: 0.15, spread: 0.046 },
    head: { size: 0.150, prof: [0.44, 0.94, 0.80, 0.52, 0.30], snout: 0.58, taper: 0.70, drop: 34 },
    ears: { type: 'point', h: 0.160, w: 0.085, tilt: -12, x: -0.12, y: 0.74 },
    tail: { type: 'brush', len: 0.40, r: 0.062, curl: -34, lift: 16, tuft: 1.3 },
    eye: { size: 0.030, x: 0.50, y: 0.32 },
    extras: [{ t: 'flame', n: 7, at: 0.16, span: 0.64, len: 0.230, o: 0.55 }, { t: 'scale', n: 6 },
             { t: 'horn', n: 1, len: 0.40, curve: 14, w: 0.036 }, { t: 'toes' }],
    marks: { type: 'patch', n: 1 }, tint: '#C08A46'
  }),
  /* 23. 붕(鵬) — 후광. 최종 동료이므로 발광 링 하나로 끝낸다 */
  peng: S_({
    name: '붕 여명', arch: 'bird', bulk: 1.60, gait: 'hover', hover: 0.11, flap: 3.0,
    body: { len: 0.40, girth: 0.205, prof: [0.46, 0.92, 1.08, 0.98, 0.50, 0.26], sag: -0.03, rise: 0.055 },
    neck: { len: 0.185, ang: 62, r: 0.46 },
    legs: { n: 2, len: 0.26, thick: 0.024, foreBend: 0.5, rearBend: 0.5, hock: 0.08, paw: 0.052, plant: 0.45, spread: 0.035 },
    head: { size: 0.160, prof: [0.48, 1.02, 0.88, 0.52, 0.26], snout: 0.20, taper: 0.64, drop: 58 },
    ears: { type: 'none' },
    tail: { type: 'feather', len: 0.52, r: 0.084, curl: -4, lift: -40 },
    eye: { size: 0.030, x: 0.30, y: 0.34, shape: 'fierce' },
    extras: [{ t: 'halo', r: 0.265, x: -0.24, y: 0.36 }, { t: 'wing', kind: 'feather', len: 0.92, w: 0.235, ang: -10 },
             { t: 'crest', n: 3, len: 0.046 }, { t: 'beak', len: 0.130, w: 0.048, hook: 0.42 },
             { t: 'talon', n: 3, len: 0.036 }],
    marks: { type: 'counter', n: 1 }, tint: '#4E72A4'
  }),

  /* ══════════ 적 아키타입 10종 ══════════ */
  insect: S_({
    name: '벌레', arch: 'arthro', bulk: 0.62, gait: 'skitter',
    body: { len: 0.46, girth: 0.150, prof: [0.92, 1.06, 0.72, 0.90, 0.60, 0.36], sag: -0.01, rise: 0.0 },
    neck: { len: 0.07, ang: 16, r: 0.60 },
    legs: { n: 6, len: 0.15, thick: 0.020, foreBend: 0.9, rearBend: 0.9, hock: 0.10, paw: 0.03, plant: 0.1, spread: 0.05, sprawl: 1 },
    head: { size: 0.135, prof: [0.50, 1.00, 0.84, 0.56, 0.36], snout: 0.24, taper: 0.9, drop: 8 },
    ears: { type: 'none' },
    tail: { type: 'none' },
    eye: { size: 0.036, x: 0.34, y: 0.26, shape: 'compound' },
    extras: [{ t: 'antenna', n: 2, len: 0.26, curve: 58 }, { t: 'mandible', len: 0.10 }, { t: 'seg', n: 3 }],
    tint: '#5E6B52'
  }),
  snail: S_({
    name: '연체', arch: 'float', bulk: 0.58, gait: 'creep', hover: 0.0,
    body: { len: 0.44, girth: 0.085, prof: [0.60, 1.00, 0.92, 0.72, 0.50, 0.32], sag: -0.02, rise: 0.0 },
    neck: { len: 0.10, ang: 30, r: 0.72 },
    legs: { n: 0 },
    head: { size: 0.110, prof: [0.52, 0.98, 0.84, 0.58, 0.36], snout: 0.30, taper: 0.9, drop: 6 },
    ears: { type: 'none' },
    tail: { type: 'none' },
    eye: { size: 0.018, x: 0.30, y: 0.18 },
    extras: [{ t: 'shell', kind: 'spiral', r: 0.27 }, { t: 'eyestalk', n: 2, len: 0.19 }, { t: 'foot', w: 0.30 }],
    tint: '#6F7A5C'
  }),
  critter: S_({
    name: '작은 짐승', bulk: 0.56, gait: 'scurry',
    body: { len: 0.44, girth: 0.180, prof: [0.84, 1.02, 1.00, 0.92, 0.60, 0.42], sag: 0.008, rise: 0.01 },
    neck: { len: 0.06, ang: 40, r: 0.70 },
    legs: { len: 0.10, thick: 0.034, foreBend: 0.24, rearBend: 0.52, hock: 0.04, paw: 0.038, plant: 0.55, spread: 0.045 },
    head: { size: 0.190, prof: [0.46, 0.98, 0.84, 0.56, 0.36], snout: 0.42, taper: 0.85, drop: 12 },
    ears: { type: 'round', h: 0.10, w: 0.086, tilt: 2, x: -0.16, y: 0.76 },
    tail: { type: 'thin', len: 0.30, r: 0.028, curl: -40, lift: 14, tuft: 1.1 },
    eye: { size: 0.032, x: 0.48, y: 0.28 },
    extras: [{ t: 'whisker', n: 3, len: 0.11 }, { t: 'quill', n: 9, len: 0.10 }],
    tint: '#7C6A55'
  }),
  bird: S_({
    name: '날짐승', arch: 'bird', bulk: 0.66, gait: 'hover', hover: 0.07,
    body: { len: 0.44, girth: 0.172, prof: [0.46, 0.92, 1.06, 0.92, 0.50, 0.30], sag: -0.02, rise: 0.02 },
    neck: { len: 0.105, ang: 62, r: 0.56 },
    legs: { n: 2, len: 0.14, thick: 0.024, foreBend: 0.5, rearBend: 0.5, hock: 0.05, paw: 0.046, plant: 0.4, spread: 0.035 },
    head: { size: 0.170, prof: [0.46, 1.02, 0.86, 0.50, 0.26], snout: 0.16, taper: 0.7, drop: 8 },
    ears: { type: 'none' },
    tail: { type: 'feather', len: 0.38, r: 0.076, curl: -6, lift: -24 },
    eye: { size: 0.031, x: 0.36, y: 0.32 },
    extras: [{ t: 'wing', kind: 'feather', len: 0.54, w: 0.18, ang: 18 }, { t: 'beak', len: 0.11, w: 0.042, hook: 0.15 },
             { t: 'crest', n: 3, len: 0.05 }, { t: 'talon', n: 3, len: 0.032 }],
    tint: '#5F7A8C'
  }),
  reptile: S_({
    name: '파충', bulk: 0.86, gait: 'sprawl',
    body: { len: 0.70, girth: 0.135, prof: [0.70, 1.00, 0.98, 0.92, 0.62, 0.40], sag: 0.022, rise: 0.0 },
    neck: { len: 0.13, ang: 10, r: 0.72 },
    legs: { len: 0.095, thick: 0.042, foreBend: 0.85, rearBend: 0.95, hock: 0.11, paw: 0.055, plant: 0.5, spread: 0.09, sprawl: 1 },
    head: { size: 0.165, prof: [0.46, 0.86, 0.80, 0.62, 0.40], snout: 0.92, taper: 0.75, drop: 8 },
    ears: { type: 'none' },
    tail: { type: 'spike', len: 0.66, r: 0.052, curl: -16, lift: -6 },
    eye: { size: 0.024, x: 0.48, y: 0.30, shape: 'slit' },
    extras: [{ t: 'ridge', n: 9, len: 0.038 }, { t: 'crest', n: 4, len: 0.055 }, { t: 'fang', n: 4, len: 0.024 }, { t: 'plate', n: 5 }],
    tint: '#4E6B4A'
  }),
  fish: S_({
    name: '어류', arch: 'fish', bulk: 0.70, gait: 'glide', hover: 0.24, tilt: -6,
    body: { len: 0.58, girth: 0.185, prof: [0.09, 0.46, 1.08, 1.00, 0.64, 0.26], sag: 0, rise: 0 },
    neck: { len: 0.07, ang: 6, r: 0.70 },
    legs: { n: 0 },
    head: { size: 0.145, prof: [0.62, 0.98, 0.82, 0.56, 0.26], snout: 0.44, taper: 0.7, drop: 0 },
    ears: { type: 'none' },
    tail: { type: 'caudal', len: 0.26, r: 0.20, curl: 0, lift: 0 },
    eye: { size: 0.034, x: 0.28, y: 0.24 },
    extras: [{ t: 'dorsal', len: 0.22, w: 0.15, at: 0.40 }, { t: 'pectoral', len: 0.20, w: 0.10, ang: -42, at: 0.60 },
             { t: 'ventral', len: 0.13, w: 0.10, at: 0.34 }, { t: 'gill', n: 3 }],
    tint: '#5A87A0'
  }),
  cephalopod: S_({
    name: '두족', arch: 'float', bulk: 0.84, gait: 'drift', hover: 0.46,
    body: { len: 0.26, girth: 0.225, prof: [0.34, 0.92, 1.08, 1.00, 0.66, 0.34], sag: 0, rise: 0 },
    neck: { len: 0.015, ang: -90, r: 0.86 },
    legs: { n: 0 },
    head: { size: 0.105, prof: [0.72, 1.02, 0.90, 0.70, 0.48], snout: 0.06, taper: 1, drop: 0 },
    ears: { type: 'none' },
    tail: { type: 'none' },
    eye: { size: 0.042, x: -0.10, y: 1.35, shape: 'round' },
    extras: [{ t: 'tentacle', n: 8, len: 0.66, r: 0.028 }],
    tint: '#7A5B86'
  }),
  beast: S_({
    name: '들짐승', bulk: 0.86, gait: 'trot',
    body: { len: 0.58, girth: 0.158, prof: [0.76, 1.00, 0.96, 0.94, 0.60, 0.34], sag: 0.012, rise: 0.038 },
    neck: { len: 0.14, ang: 36, r: 0.62 },
    legs: { len: 0.23, thick: 0.044, foreBend: 0.28, rearBend: 0.64, hock: 0.07, paw: 0.046, plant: 0.25, spread: 0.058 },
    head: { size: 0.182, prof: [0.44, 0.96, 0.80, 0.52, 0.30], snout: 0.62, taper: 0.8, drop: 20 },
    ears: { type: 'point', h: 0.145, w: 0.100, tilt: -8, x: -0.10, y: 0.74 },
    tail: { type: 'brush', len: 0.36, r: 0.065, curl: -22, lift: 4 },
    eye: { size: 0.028, x: 0.52, y: 0.30, shape: 'slit' },
    extras: [{ t: 'ruff', r: 0.085, n: 5 }, { t: 'fang', n: 2, len: 0.028 }, { t: 'claw', n: 3, len: 0.024 }],
    tint: '#6A5F52'
  }),
  brute: S_({
    name: '거구', arch: 'ape', bulk: 1.06, gait: 'lumber',
    body: { len: 0.42, girth: 0.215, prof: [0.72, 0.92, 1.00, 1.14, 0.86, 0.62], sag: 0.008, rise: 0.09 },
    neck: { len: 0.05, ang: 60, r: 0.86 },
    legs: { len: 0.14, thick: 0.070, foreBend: 0.30, rearBend: 0.50, hock: 0.04, paw: 0.062, plant: 0.9, spread: 0.075 },
    head: { size: 0.165, prof: [0.52, 0.96, 0.86, 0.66, 0.46], snout: 0.40, taper: 1.0, drop: 24, brow: 1 },
    ears: { type: 'round', h: 0.075, w: 0.060, tilt: 0, x: -0.20, y: 0.62 },
    tail: { type: 'none' },
    eye: { size: 0.024, x: 0.48, y: 0.26, shape: 'fierce' },
    extras: [{ t: 'arm', len: 0.52, thick: 0.058 }, { t: 'mane', len: 0.16, n: 8 }, { t: 'fang', n: 2, len: 0.032 }],
    tint: '#5C5348'
  }),
  titan: S_({
    name: '거수', bulk: 1.40, gait: 'lumber',
    body: { len: 0.64, girth: 0.238, prof: [0.78, 0.94, 1.02, 1.12, 0.76, 0.50], sag: 0.014, rise: 0.075 },
    neck: { len: 0.12, ang: 28, r: 0.80 },
    legs: { len: 0.24, thick: 0.088, foreBend: 0.16, rearBend: 0.34, hock: 0.03, paw: 0.070, plant: 0.5, spread: 0.085 },
    head: { size: 0.205, prof: [0.50, 0.98, 0.84, 0.60, 0.40], snout: 0.56, taper: 0.9, drop: 24, brow: 1 },
    ears: { type: 'point', h: 0.105, w: 0.070, tilt: 16, x: -0.18, y: 0.70 },
    tail: { type: 'spike', len: 0.52, r: 0.070, curl: -22, lift: 0 },
    eye: { size: 0.026, x: 0.50, y: 0.30, shape: 'fierce' },
    extras: [{ t: 'horn', n: 2, len: 0.30, curve: 74, w: 0.055 }, { t: 'mane', len: 0.20, n: 9 }, { t: 'plate', n: 5 },
             { t: 'tusk', n: 2, len: 0.16, curve: 40, w: 0.026 }, { t: 'fang', n: 2, len: 0.038 }, { t: 'claw', n: 4, len: 0.036 }],
    tint: '#7A4438'
  })
};

/* ─────────────────── 4. 성장 단계 모디파이어 ───────────────────
 * 새끼(0)는 머리 크고 다리 짧고 몸 작고 색이 옅다(유형성숙).
 * 단계가 오를수록 두상이 길어지고 다리가 길어지며 물건이 붙는다.
 * ------------------------------------------------------------- */
function stageMods(st) {
  st = clamp(st | 0, 0, 4);
  var g = st / 4;
  return {
    st: st, g: g,
    headMul: 1 + 0.26 * (1 - g),
    eyeMul: 1 + 0.24 * (1 - g),
    legMul: 0.78 + 0.22 * g + (st >= 2 ? 0.07 : 0),
    lenMul: 0.88 + 0.12 * g,
    girthMul: 0.93 + 0.10 * g,
    neckMul: 0.80 + 0.20 * g,
    sizeMul: 0.74 + 0.0675 * st,
    coat: 0.24 + 0.065 * st,
    exMul: 0.62 + 0.095 * st,
    collar: st >= 1, marks: st >= 2, stand: st >= 2,
    scar: st >= 3, torn: st >= 3, veteran: st >= 3, trophy: st >= 3,
    cape: st >= 4, mane: st >= 4, glow: st >= 4
  };
}

/* ─────────────────── 5. 조립기 ─────────────────── */
var U100 = 100;                     /* 1.0 로컬 = 100 유저유닛 */

function Builder(sp, M, C, rnd) {
  this.sp = sp; this.M = M; this.C = C; this.rnd = rnd;
  this.L = { glow: [], back: [], deep: [], body: [], head: [], front: [], acc: [] };
  this.minX = 1e9; this.minY = 1e9; this.maxX = -1e9; this.maxY = -1e9;
}
var NUMRE = /-?\d+(?:\.\d+)?/g;
Builder.prototype.track = function (d) {
  var m = d.match(NUMRE); if (!m) return;
  for (var i = 0; i + 1 < m.length; i += 2) {
    var x = +m[i], y = +m[i + 1];
    if (x < this.minX) this.minX = x; if (x > this.maxX) this.maxX = x;
    if (y < this.minY) this.minY = y; if (y > this.maxY) this.maxY = y;
  }
};
/* p(layer, d, attrs) — path 하나를 레이어에 밀어넣고 bbox 갱신 */
Builder.prototype.p = function (layer, d, attrs, noTrack) {
  if (!d) return;
  if (!noTrack) this.track(d);
  this.L[layer].push('<path d="' + d + '" ' + (attrs || '') + '/>');
};
Builder.prototype.raw = function (layer, s) { this.L[layer].push(s); };
/* pm(layer, [d,...], attrs) — 속성이 같은 장식 다발을 path 하나로 합친다. */
Builder.prototype.pm = function (layer, ds, attrs, noTrack) {
  var d = [], i;
  for (i = 0; i < ds.length; i++) if (ds[i]) d.push(ds[i]);
  if (!d.length) return;
  var j = d.join(' ');
  if (!noTrack) this.track(j);
  this.L[layer].push('<path d="' + j + '" ' + (attrs || '') + '/>');
};
Builder.prototype.pre = function (layer, d, attrs) {
  if (!d) return; this.track(d);
  this.L[layer].unshift('<path d="' + d + '" ' + (attrs || '') + '/>');
};

/* 색 클래스 약어 */
var A = {
  coat: 'class="k-c"', far: 'class="k-f"', line: 'class="k-l"',
  bel: 'class="k-b"', acc: 'class="k-a"', dim: 'class="k-d"', bone: 'class="k-n"'
};

/* ── 5-1 앵커 계산 ── */
function anchors(sp, M) {
  var B = sp.body, L = sp.legs, H = sp.head, NK = sp.neck;
  var bodyLen = B.len * M.lenMul * U100;
  var girth = B.girth * M.girthMul * U100;
  var legLen = (L.n > 0 ? L.len * M.legMul : 0) * U100;
  var hover = sp.hover * U100;
  var rHip = girth * B.prof[1];
  var baseY = -(legLen + rHip * 0.92) - hover;
  var hipX = -bodyLen * 0.5, chestX = bodyLen * 0.5;
  var sag = B.sag * U100, rise = B.rise * U100;
  var nkr = NK.r, nl = NK.len * M.neckMul * U100 * (M.stand ? 1.05 : 1);
  var na = NK.ang;
  var neckTop = [chestX + cos(rad(na)) * nl, baseY - rise - sin(rad(na)) * nl];

  var rp = [];
  for (var i = 0; i < 6; i++) rp.push(girth * B.prof[i] * (i === 4 ? nkr * 1.24 : i === 5 ? nkr * 0.98 : 1));

  var bodyCps = [
    [hipX - bodyLen * 0.20, baseY + sag * 0.55],
    [hipX, baseY],
    [0, baseY + sag],
    [chestX, baseY - rise],
    neckTop
  ];

  /* 머리 */
  var headAng = na - H.drop;
  var hd = dirOf(headAng), up = perp(hd);
  var hs = H.size * M.headMul * U100;
  var snoutL = hs * (0.52 + H.snout * 0.92);
  var c0 = add(neckTop, hd, -hs * 0.38);
  var c1 = add(neckTop, hd, hs * 0.26);
  var tip = add(c1, hd, snoutL);
  var cm = add(c1, hd, snoutL * 0.55);
  var headCps = [c0, c1, cm, tip];
  var hp = H.prof, headProf = [hs * hp[0], hs * hp[1], hs * hp[2], hs * hp[3] * H.taper, hs * hp[4] * H.taper];

  var eyeP = add(add(c1, hd, hs * sp.eye.x), up, hs * sp.eye.y);

  return {
    bodyLen: bodyLen, girth: girth, legLen: legLen, baseY: baseY, hipX: hipX, chestX: chestX,
    sag: sag, rise: rise, rp: rp, bodyCps: bodyCps, neckTop: neckTop, na: na,
    headAng: headAng, hd: hd, up: up, hs: hs, snoutL: snoutL, c0: c0, c1: c1, cm: cm, tip: tip,
    headCps: headCps, headProf: headProf, eyeP: eyeP,
    hipA: [hipX * 0.80, baseY + rp[1] * 0.42],
    foreA: [chestX * 0.78, baseY - rise + rp[3] * 0.42],
    tailBase: [hipX - bodyLen * 0.20, baseY + sag * 0.4]
  };
}
/* 몸통 스파인 위 t(0~1) 지점과 반경 */
function onBody(K, t) {
  var p = crPt(K.bodyCps, t), r = crNum(K.rp, t);
  var p1 = crPt(K.bodyCps, Math.max(0, t - 0.01)), p2 = crPt(K.bodyCps, Math.min(1, t + 0.01));
  var tx = p2[0] - p1[0], ty = p2[1] - p1[1], L = Math.hypot(tx, ty) || 1;
  return { p: p, r: r, t: [tx / L, ty / L], n: [ty / L, -tx / L] };
}
function onHead(K, t) {
  var p = crPt(K.headCps, t), r = crNum(K.headProf, t);
  return { p: p, r: r };
}

/* ── 5-2 다리 ── */
function legPath(hip, footX, bend, hock, thick, paw, plant, sprawl) {
  var hx = hip[0], hy = hip[1], dy = -hy, gy = 0;
  var kneeX, kneeY;
  if (sprawl) { kneeX = hx + bend * dy * 0.85; kneeY = hy - dy * 0.20; }
  else { kneeX = hx + bend * dy * 0.46; kneeY = hy + dy * 0.40; }
  var ankX = footX - hock * U100 * 0.6, ankY = hy + dy * 0.76;
  var footY = gy - thick * 0.55;
  var toeX = footX + paw * (0.55 + plant * 0.9);
  var cps = [[hx, hy], [kneeX, kneeY], [ankX, ankY], [footX, footY], [toeX, gy - thick * 0.40]];
  var prof = [thick * 1.55, thick * 1.05, thick * 0.74, thick * 0.62, thick * 0.46];
  return ribbon(cps, prof, { n: 12, capN: 4 });
}
function buildLegs(b) {
  var K = b.K, sp = b.sp, M = b.M, L = sp.legs;
  if (!L.n) return;
  var thick = L.thick * M.girthMul * U100, paw = L.paw * U100;
  var sets = [];
  if (L.n === 3) {
    /* 삼족 — 다리가 셋. 두 개를 뒤(deep) 한 개를 앞(front) 으로 갈라야
       겹쳐도 '세 개' 가 실제로 세어진다. 짝수 쌍 루프를 타면 무조건 넷이 된다. */
    var a3 = [K.chestX * 0.30, K.baseY + K.rp[3] * 0.52], s3 = L.spread * U100;
    var cf3 = [[-1.30, 'deep', 'k-f', 'b'], [-0.10, 'deep', 'k-cn', 'b'], [1.15, 'front', 'k-c', 'f']];
    for (var z = 0; z < 3; z++) {
      var c3 = cf3[z], hp3 = [a3[0] + s3 * c3[0] * 0.52, a3[1] + (z === 2 ? 0 : 1.1)];
      var sc3 = z === 2 ? 1 : 0.92;
      b.p(c3[1], legPath(hp3, a3[0] + s3 * c3[0] * 0.95 + 2, L.foreBend, L.hock, thick * sc3, paw * sc3, L.plant, L.sprawl),
        'class="' + c3[2] + ' wl-leg wl-leg-' + c3[3] + '" style="transform-origin:@@O:' + r2(hp3[0]) + ',' + r2(hp3[1]) + '@@"');
    }
    return;
  }
  if (L.n === 2) {
    sets.push({ a: [K.chestX * 0.30, K.baseY + K.rp[2] * 0.55], f: K.chestX * 0.30 + 2, bend: L.foreBend, i: 0 });
  } else if (L.n === 6) {
    for (var q = 0; q < 3; q++) {
      var tq = 0.22 + q * 0.24;
      var s = onBody(K, tq);
      sets.push({ a: [s.p[0], s.p[1] + s.r * 0.5], f: s.p[0] + (q - 1) * K.bodyLen * 0.16 + K.bodyLen * 0.10, bend: L.rearBend, i: q });
    }
  } else {
    sets.push({ a: K.hipA, f: K.hipX * 0.80 - L.hock * U100 * 0.35, bend: L.rearBend, i: 0 });
    sets.push({ a: K.foreA, f: K.chestX * 0.78 + paw * 0.2, bend: L.foreBend, i: 1 });
  }
  var sp2 = L.spread * U100;
  for (var s2 = 0; s2 < sets.length; s2++) {
    var S = sets[s2], far = [S.a[0] - sp2 * 0.55, S.a[1]], near = [S.a[0] + sp2 * 0.30, S.a[1]];
    var dF = legPath(far, S.f - sp2 * 0.7, S.bend, L.hock, thick * 0.92, paw * 0.9, L.plant, L.sprawl);
    var dN = legPath(near, S.f + sp2 * 0.25, S.bend, L.hock, thick, paw, L.plant, L.sprawl);
    b.p('deep', dF, A.far + ' class="k-f wl-leg wl-leg-b" style="transform-origin:@@O:' + r2(far[0]) + ',' + r2(far[1]) + '@@"');
    b.p('front', dN, 'class="k-cn wl-leg wl-leg-f" style="transform-origin:@@O:' + r2(near[0]) + ',' + r2(near[1]) + '@@"');
  }
}

/* ── 5-3 꼬리 ── */
function tailChain(base, ang, len, curl, seg) {
  var pts = [base.slice()], a = ang, cur = base.slice(), i;
  for (i = 1; i <= seg; i++) { a += curl / seg; cur = add(cur, dirOf(a), len / seg); pts.push(cur.slice()); }
  return pts;
}
function buildTail(b) {
  var K = b.K, sp = b.sp, M = b.M, T = sp.tail;
  if (T.type === 'none') return;
  var len = T.len * M.lenMul * U100, r = T.r * M.girthMul * U100, ang = 180 + T.lift;
  var base = K.tailBase, tuft = T.tuft || 1;
  var org = 'style="transform-origin:@@O:' + r2(base[0]) + ',' + r2(base[1]) + '@@"';
  var d;
  if (T.type === 'puff') {
    var c = add(base, dirOf(ang - T.curl), len * 0.6);
    d = ell(c[0], c[1], r * 1.5, r * 1.45, 0);
    b.p('deep', d, 'class="k-b wl-tail" ' + org);
    return;
  }
  if (T.type === 'caudal') {
    /* 어류 미저: 상엽이 크고 하엽이 작은 2엽. 뿌리를 몸통 안으로 밀어 넣어 반드시 붙인다. */
    var rt = add(base, dirOf(0), r * 1.3);
    var upT = add(rt, dirOf(ang - 32), len * 1.34);
    var loT = add(rt, dirOf(ang + 30), len * 0.96);
    var notch = add(rt, dirOf(ang), len * 0.26);
    b.p('deep', closedSmooth([add(rt, dirOf(ang + 96), r * 0.9), add(rt, dirOf(ang - 16), len * 0.52),
      upT, add(upT, dirOf(ang + 94), len * 0.40), notch, add(rt, dirOf(ang - 96), r * 0.5)]),
      'class="k-cn wl-tail" ' + org);
    b.p('deep', closedSmooth([add(rt, dirOf(ang - 96), r * 0.9), add(rt, dirOf(ang + 14), len * 0.46),
      loT, add(loT, dirOf(ang - 94), len * 0.32), notch, add(rt, dirOf(ang + 96), r * 0.4)]),
      'class="k-f wl-tail" ' + org);
    return;
  }
  if (T.type === 'feather') {
    var n = 5, i;
    for (i = 0; i < n; i++) {
      var f = i / (n - 1), aa = ang - 26 + f * 50, ln = len * (0.72 + 0.34 * (1 - abs(f - 0.5) * 2));
      var cps = tailChain(base, aa, ln, T.curl, 2);
      b.p('deep', ribbon(cps, [r * 0.9, r * 0.85, r * 0.34], { n: 6, capN: 3 }),
        (i % 2 ? 'class="k-f' : 'class="k-c') + ' wl-tail" ' + (i === 2 ? org : org));
    }
    return;
  }
  var coil = T.type === 'coil';
  var seg = coil ? 6 : 4, cps = tailChain(base, ang, len, T.curl, seg), prof;
  if (T.type === 'brush') prof = [r * 0.52, r * 0.95, r * 1.12 * tuft, r * 1.0 * tuft, r * 0.55];
  else if (T.type === 'thin') prof = [r * 1.15, r * 0.80, r * 0.68, r * 0.62, r * 0.44 * tuft];
  else if (T.type === 'stub') prof = [r * 1.2, r * 1.05, r * 0.8, r * 0.55, r * 0.4];
  else if (T.type === 'rope') prof = [r * 1.3, r * 0.85, r * 0.7, r * 0.62, r * 1.25 * tuft];
  else if (T.type === 'spike') prof = [r * 1.05, r * 0.88, r * 0.62, r * 0.34, r * 0.06];
  /* coil: 뱀. 끝이 0 까지 가늘어지고 크게 감긴다(무족 종의 유일한 꼬리 형태) */
  else if (coil) prof = [r * 1.02, r * 0.94, r * 0.74, r * 0.46, r * 0.04];
  else prof = [r, r, r * 0.8, r * 0.6, r * 0.4];
  d = ribbon(cps, prof, { n: coil ? 20 : 14, capN: 4 });
  b.p('deep', d, 'class="k-cn wl-tail" ' + org);
  if (T.type === 'thin' && tuft > 1) {
    var e = cps[seg];
    b.p('deep', ell(e[0], e[1], r * 1.5 * tuft, r * 1.15 * tuft, 0), 'class="k-c wl-tail" ' + org);
  }
  if (T.type === 'spike') { /* 등줄기 가시가 꼬리까지 이어진다 */
    for (var k = 1; k < 4; k++) {
      var pp = crPt(cps, k / 4.5), nn = dirOf(180 + T.lift + (T.curl * k / 4.5) + 90);
      b.p('deep', spike(pp[0] + nn[0] * r * 0.5, pp[1] + nn[1] * r * 0.5, 90 + T.lift * 0.5, r * (1.5 - k * 0.22), r * 0.34), 'class="k-f wl-tail" ' + org);
    }
  }
}

/* ── 5-4 귀 ── */
function buildEars(b) {
  var K = b.K, sp = b.sp, M = b.M, E = sp.ears;
  if (E.type === 'none') return;
  var hs = K.hs, hd = K.hd, up = K.up;
  var baseP = add(add(K.c1, hd, hs * E.x), up, hs * E.y * 0.72);
  var h = E.h * M.headMul * U100 * (M.stand ? 1.03 : 1), w = E.w * M.headMul * U100;
  var tilt = E.tilt + (M.st === 0 ? 8 : 0);
  var aBase = K.headAng + 74 + tilt;

  for (var i = 0; i < 2; i++) {
    var isFar = i === 0;
    var bp = [baseP[0] - (isFar ? w * 0.85 : 0) - (isFar ? 1.5 : -1.0), baseP[1] + (isFar ? w * 0.16 : 0)];
    var aa = aBase + (isFar ? 9 : 0), d;
    if (E.type === 'long') {
      var cps = tailChain(bp, aa, h, -10, 3);
      d = ribbon(cps, [w * 0.55, w * 0.92, w * 0.86, w * 0.52], { n: 9, capN: 4 });
    } else if (E.type === 'round') {
      var c = add(bp, dirOf(aa), h * 0.55);
      d = ell(c[0], c[1], w * 1.0, h * 0.62, 90 - aa);
    } else if (E.type === 'fan') {
      var c2 = add(add(bp, dirOf(aa), h * 0.30), dirOf(aa - 90), w * 0.30);
      d = ell(c2[0], c2[1], w * 1.05, h * 0.60, 96 - aa);
    } else if (E.type === 'tube') {
      var cps3 = tailChain(bp, aa, h, -16, 2);
      d = ribbon(cps3, [w * 0.9, w * 0.8, w * 0.55], { n: 7, capN: 3 });
    } else { /* point */
      var cps2 = tailChain(bp, aa, h, E.tilt < 0 ? -6 : 10, 2);
      d = ribbon(cps2, [w * 0.92, w * 0.58, w * 0.07], { n: 8, capN: 3 });
    }
    /* 찢긴 귀 (stage>=3, 가까운 쪽만) — evenodd 로 홈을 판다 */
    if (M.torn && !isFar && E.type !== 'fan') {
      var tp = add(bp, dirOf(aa), h * 0.80), nn = dirOf(aa + 90);
      d += spike(tp[0] + nn[0] * w * 0.5, tp[1] + nn[1] * w * 0.5, aa - 90, w * 1.05, w * 0.30);
    }
    b[E.type === 'fan' ? 'pre' : 'p']('head', d,
      (isFar ? 'class="k-f' : 'class="k-c') + ' wl-ear wl-ear-' + (isFar ? 'b' : 'f') + '"' +
      (isFar ? '' : ' stroke="var(--ed)" stroke-width="0.6"') +
      (M.torn && !isFar ? ' fill-rule="evenodd"' : '') +
      ' style="transform-origin:@@O:' + r2(bp[0]) + ',' + r2(bp[1]) + '@@"');
    /* 귀 안쪽 */
    if (!isFar && (E.type === 'long' || E.type === 'point' || E.type === 'round')) {
      var icf = E.type === 'round' ? 0.55 : E.type === 'long' ? 0.46 : 0.40;
      var ic = add(bp, dirOf(aa), h * icf);
      var irx = E.type === 'round' ? w * 0.40 : w * 0.30;
      var iry = E.type === 'round' ? h * 0.26 : h * 0.24;
      b.p('head', ell(ic[0], ic[1], irx, iry, 90 - aa), 'class="k-i wl-ear wl-ear-f" style="transform-origin:@@O:' + r2(bp[0]) + ',' + r2(bp[1]) + '@@"', true);
    }
  }
}

/* ── 5-5 눈 · 입 ── */
function buildFace(b) {
  var K = b.K, sp = b.sp, M = b.M;
  var e = sp.eye, hs = K.hs, r = e.size * M.eyeMul * U100 * (M.headMul);
  var p = K.eyeP, ox = r2(p[0]), oy = r2(p[1]);
  var org = 'style="transform-origin:@@O:' + ox + ',' + oy + '@@"';
  var g = ['<g class="wl-eye" ' + org + '>'];
  if (e.shape === 'compound') {
    g.push('<path class="k-e" d="' + ell(p[0], p[1], r * 1.9, r * 1.5, -18) + '"/>');
    g.push('<path class="k-a" d="' + ell(p[0] + r * 0.5, p[1] - r * 0.4, r * 0.5, r * 0.4, 0) + '"/>');
  } else {
    /* 눈알은 어두운 덩어리, 그 안의 작은 점만 불빛을 받는다.
       (밝은 공 하나로 그리면 눈이 아니라 전조등으로 읽힌다) */
    g.push('<path class="k-eo" d="' + ell(p[0], p[1], r * 1.30, r * 1.20, -6) + '"/>');
    g.push('<path class="k-e" d="' + ell(p[0] + r * 0.10, p[1] - r * 0.04, r * 0.60, r * 0.60, 0) + '"/>');
    g.push('<path class="k-a wl-spark" d="' + ell(p[0] + r * 0.40, p[1] - r * 0.40, r * 0.26, r * 0.24, 0) + '"/>');
  }
  b.track(ell(p[0], p[1], r * 1.9, r * 1.6, 0));
  /* 행복한 눈 ‿ (쓰다듬기·수면·환호) */
  g.push('<path class="wl-eyehappy" d="' + openSmooth([[p[0] - r * 1.2, p[1] + r * 0.1], [p[0], p[1] - r * 1.0], [p[0] + r * 1.2, p[1] + r * 0.1]]) + '" fill="none"/>');
  /* 눈꺼풀 */
  var lidOrg = 'transform-origin:@@O:' + r2(p[0]) + ',' + r2(p[1] - r * 1.3) + '@@';
  g.push('<path class="wl-lid" d="' + ell(p[0], p[1] - r * 0.15, r * 1.45, r * 1.5, 0) + '" style="' + lidOrg + '"/>');
  g.push('</g>');
  b.raw('head', g.join(''));

  /* 눈썹 융기(brow) */
  if (sp.head.brow) {
    var bp = add(add(K.c1, K.hd, hs * (e.x + 0.10)), K.up, hs * (e.y + 0.34));
    b.p('head', ribbon([add(bp, K.hd, -hs * 0.26), bp, add(bp, K.hd, hs * 0.26)], [hs * 0.05, hs * 0.09, hs * 0.045], { n: 6, capN: 3 }), 'class="k-f"');
  }
  /* 입 */
  if (sp.mouth && sp.head.snout > 0.18) {
    var m0 = crPt(K.headCps, 0.72), m1 = K.tip;
    var dwn = [-K.up[0], -K.up[1]];
    var a0 = add(m0, dwn, crNum(K.headProf, 0.72) * 0.66);
    var a1 = add(m1, dwn, crNum(K.headProf, 1) * 0.42);
    b.p('head', openSmooth([a0, add(a0, K.hd, K.snoutL * 0.45), a1]), 'class="k-m" fill="none"');
  }
  /* 코끝 */
  if (sp.head.snout > 0.25 && !hasEx(sp, 'beak') && !hasEx(sp, 'trunk')) {
    var nz = add(K.tip, K.up, crNum(K.headProf, 1) * 0.30);
    b.p('head', ell(nz[0], nz[1], crNum(K.headProf, 1) * 0.42, crNum(K.headProf, 1) * 0.34, 0), 'class="k-f"');
  }
}
function hasEx(sp, t) { for (var i = 0; i < sp.extras.length; i++) if (sp.extras[i].t === t) return true; return false; }

/* ── 5-6 EXTRAS — 실루엣 판별의 8할이 여기서 나온다 ── */
var EX = {};

EX.horn = function (b, e) {
  var K = b.K, M = b.M, hs = K.hs, s = M.exMul;
  var len = e.len * hs * 5.4 * s, w = e.w * hs * 5.4 * s;
  var i, o, base, cps, L;
  if (e.mount === 'nose') {          /* 코뿔소: 정중선에 앞뒤로 두 개 */
    for (i = 0; i < (e.n || 1); i++) {
      var t = i === 0 ? 0.88 : 0.50;
      o = onHead(K, t);
      base = add(o.p, K.up, o.r * 0.86);
      L = len * (i === 0 ? 1 : 0.42);
      cps = tailChain(base, K.headAng + 82, L, e.curve, 3);
      b.p('head', ribbon(cps, [w * (i ? 0.8 : 1), w * 0.72, w * 0.42, w * 0.04], { n: 9, capN: 3 }), 'class="k-n wl-horn"');
    }
    return;
  }
  if (e.n === 1) {                   /* 기린: 이마 정중선에 외뿔 하나 */
    o = onHead(K, 0.34);
    base = add(o.p, K.up, o.r * 0.84);
    cps = tailChain(base, K.headAng + 76, len, e.curve, 3);
    b.p('head', ribbon(cps, [w * 1.15, w * 0.82, w * 0.48, w * 0.05], { n: 10, capN: 3 }), 'class="k-n wl-horn"');
    return;
  }
  for (i = 0; i < 2; i++) {          /* 용·거수: 두개골 좌우 한 쌍 */
    var far = i === 0;
    o = onHead(K, 0.20);
    base = add(add(o.p, K.up, o.r * 0.76), K.hd, far ? -hs * 0.20 : -hs * 0.02);
    cps = tailChain(base, K.headAng + 116 + (far ? 8 : 0), len * (far ? 0.86 : 1), e.curve, 3);
    b.p('head', ribbon(cps, [w * 1.0, w * 0.76, w * 0.46, w * 0.05], { n: 9, capN: 3 }),
      (far ? 'class="k-f' : 'class="k-n') + ' wl-horn"');
  }
};
EX.tusk = function (b, e) {
  var K = b.K, M = b.M, hs = K.hs, s = M.exMul;
  var len = e.len * hs * 5.0 * s, w = e.w * hs * 5.0 * s;
  for (var i = 0; i < 2; i++) {
    var far = i === 0;
    var o = onHead(K, 0.80);
    var base = add(add(o.p, K.up, -o.r * 0.55), K.hd, far ? -hs * 0.16 : hs * 0.02);
    var cps = tailChain(base, K.headAng - 26 + (far ? 5 : 0), len * (far ? 0.9 : 1), e.curve, 4);
    b.p('head', ribbon(cps, [w * 1.1, w * 0.86, w * 0.60, w * 0.34, w * 0.04], { n: 11, capN: 3 }),
      (far ? 'class="k-f' : 'class="k-n') + ' wl-tusk"');
  }
};
EX.trunk = function (b, e) {
  var K = b.K, M = b.M, hs = K.hs, s = 0.7 + 0.3 * M.exMul;
  var len = e.len * hs * 5.0 * s, r = e.r * hs * 5.0 * s;
  var base = add(K.tip, K.up, -crNum(K.headProf, 1) * 0.12);
  var cps = tailChain(base, K.headAng - 64, len, e.curl, 4);
  b.p('head', ribbon(cps, [r * 1.5, r * 1.15, r * 0.9, r * 0.66, r * 0.44], { n: 14, capN: 4 }),
    'class="k-c wl-trunk" stroke="var(--ed)" stroke-width="0.7" style="transform-origin:@@O:' + r2(base[0]) + ',' + r2(base[1]) + '@@"');
  for (var i = 1; i < 4; i++) {
    var p = crPt(cps, i / 4.4), a = K.headAng - 64 + e.curl * (i / 4.4);
    var n = dirOf(a + 90);
    b.p('head', openSmooth([add(p, n, -r * 0.9), add(p, n, r * 0.9)]),
      'class="k-w wl-trunk" fill="none" style="transform-origin:@@O:' + r2(base[0]) + ',' + r2(base[1]) + '@@"', true);
  }
};
EX.beak = function (b, e) {
  var K = b.K, M = b.M, hs = K.hs;
  var len = e.len * hs * 5.6, w = e.w * hs * 5.6;
  var o = onHead(K, 0.82), base = o.p;
  var tip = add(add(base, K.hd, len), K.up, -len * e.hook * 0.9);
  var d = closedSmooth([add(base, K.up, w * 1.05), add(add(base, K.hd, len * 0.55), K.up, w * 0.35),
    tip, add(tip, K.up, w * 0.28), add(add(base, K.hd, len * 0.5), K.up, -w * 0.55), add(base, K.up, -w * 0.95)]);
  b.p('head', d, 'class="k-n wl-beak"');
  b.p('head', openSmooth([add(base, K.hd, len * 0.1), add(add(base, K.hd, len * 0.62), K.up, -w * 0.1), add(tip, K.up, w * 0.14)]), 'class="k-w" fill="none"', true);
};
EX.crest = function (b, e) {
  var K = b.K, M = b.M, hs = K.hs, n = e.n || 4, D = [];
  for (var i = 0; i < n; i++) {
    var t = 0.10 + (i / n) * 0.42, o = onHead(K, t);
    var base = add(o.p, K.up, o.r * 0.88);
    var L = e.len * hs * 5.4 * M.exMul * (1 - abs(i / (n - 1) - 0.35) * 0.5);
    D.push(spike(base[0], base[1], K.headAng + 96 - i * 5, L, L * 0.30));
  }
  b.pm('head', D, 'class="k-f wl-crest"');
};
EX.ridge = function (b, e) {
  var K = b.K, M = b.M, n = e.n || 9, D = [];
  for (var i = 0; i < n; i++) {
    var t = 0.08 + (i / (n - 1)) * 0.78, o = onBody(K, t);
    var base = add(o.p, o.n, o.r * 0.92);
    var L = e.len * U100 * M.exMul * (0.55 + 0.9 * Math.sin(PI * (i / (n - 1)) * 0.9 + 0.3));
    var a = Math.atan2(-o.n[1], o.n[0]) * 180 / PI;
    D.push(spike(base[0], base[1], a, L, L * 0.36));
  }
  b.pm('deep', D, 'class="k-f wl-ridge"');
};
EX.plate = function (b, e) {
  var K = b.K, n = e.n || 4, D = [];
  for (var i = 0; i < n; i++) {
    var t = 0.16 + (i / n) * 0.62, o = onBody(K, t);
    var c = add(o.p, o.n, o.r * 0.52);
    D.push(ell(c[0], c[1], o.r * 0.46, o.r * 0.30, Math.atan2(o.n[1], o.n[0]) * 180 / PI + 90));
  }
  b.pm('body', D, 'class="k-f wl-plate" opacity=".34"');
};
/* 마디 — 벌레의 체절(관통선). side:1 로 배 쪽만 그으면 고래의 목주름이 된다 */
EX.seg = function (b, e) {
  var K = b.K, n = e.n || 3;
  var t0 = e.at == null ? 0.10 : e.at, sp = e.span == null ? 0.32 : e.span;
  for (var i = 0; i < n; i++) {
    var t = t0 + (i / n) * sp, o = onBody(K, t);
    b.p('body', openSmooth([add(o.p, o.n, e.side ? -o.r * 0.26 : o.r * 0.98), add(o.p, o.n, -o.r * 0.98)]),
      'class="k-w" fill="none"' + (e.side ? ' opacity=".38"' : ''), true);
  }
};
EX.dorsal = function (b, e) {
  var K = b.K, M = b.M, o = onBody(K, e.at || 0.46);
  var base = add(o.p, o.n, o.r * 0.8);
  var L = e.len * U100 * M.exMul * 1.2, w = e.w * U100 * M.exMul;
  var back = add(base, o.t, -w * 1.5), fwd = add(base, o.t, w * 1.1);
  var tipP = add(add(base, o.n, L), o.t, -w * 1.9);
  b.p('deep', closedSmooth([back, add(back, o.n, L * 0.25), tipP, add(fwd, o.n, L * 0.30), fwd]), 'class="k-c wl-fin" stroke="var(--ed)" stroke-width="0.6"');
};
EX.pectoral = function (b, e) {
  var K = b.K, M = b.M, o = onBody(K, e.at || 0.64);
  var base = add(o.p, o.n, -o.r * 0.55);
  var L = e.len * U100 * M.exMul, w = e.w * U100 * M.exMul;
  var a = Math.atan2(-o.t[1], o.t[0]) * 180 / PI + 180 + e.ang;
  var tipP = add(base, dirOf(a), L);
  for (var i = 0; i < 2; i++) {
    var off = i ? 0 : -w * 0.9, lay = i ? 'front' : 'deep';
    var bb = [base[0] + off, base[1] + (i ? 0 : w * 0.3)];
    var tp = [tipP[0] + off * 1.3, tipP[1] + (i ? 0 : w * 0.3)];
    b.p(lay, closedSmooth([add(bb, o.t, w * 0.9), tp, add(tp, o.n, w * 0.7), add(bb, o.t, -w * 0.9)]),
      (i ? 'class="k-c' : 'class="k-f') + ' wl-fin"');
  }
};
EX.ventral = function (b, e) {
  var K = b.K, M = b.M, o = onBody(K, e.at || 0.34);
  var base = add(o.p, o.n, -o.r * 0.72);
  var L = e.len * U100 * M.exMul, w = e.w * U100 * M.exMul;
  b.p('deep', closedSmooth([add(base, o.t, w * 0.8), add(add(base, o.n, -L), o.t, -w * 0.5), add(base, o.t, -w * 0.9)]),
    'class="k-f wl-fin"');
};
EX.gill = function (b, e) {
  var K = b.K, n = e.n || 5, D = [];
  for (var i = 0; i < n; i++) {
    var t = 0.68 + (i / n) * 0.16, o = onBody(K, t);
    D.push(openSmooth([add(o.p, o.n, o.r * 0.72), add(add(o.p, o.n, o.r * 0.1), o.t, -o.r * 0.18)]));
  }
  b.pm('body', D, 'class="k-w" fill="none"', true);
};
EX.scale = function (b, e) {
  var K = b.K, n = e.n || 5, D = [];
  for (var i = 0; i < n; i++) {
    var t = 0.24 + (i / n) * 0.46, o = onBody(K, t);
    D.push(openSmooth([add(o.p, o.n, o.r * 0.85), add(add(o.p, o.t, o.r * 0.35), o.n, o.r * 0.1), add(o.p, o.n, -o.r * 0.7)]));
  }
  b.pm('body', D, 'class="k-w" fill="none" opacity=".5"', true);
};
EX.wing = function (b, e) {
  var K = b.K, M = b.M, s = M.exMul;
  var o = onBody(K, e.kind === 'feather' ? 0.48 : 0.70);
  var root = add(o.p, o.n, o.r * (e.kind === 'feather' ? 0.86 : 0.45));
  var L = e.len * U100 * s, w = e.w * U100 * s;
  for (var side = 0; side < 2; side++) {
    var far = side === 0;
    var rr = [root[0] - (far ? w * 0.28 : 0), root[1] - (far ? w * 0.06 : 0)];
    var a = e.ang + (far ? 14 : 0), sc = far ? 0.86 : 1;
    if (e.kind === 'membrane') {
      var elb = add(rr, dirOf(a + 128), L * 0.44 * sc);
      var f1 = add(elb, dirOf(a + 74), L * 0.62 * sc);
      var f2 = add(elb, dirOf(a + 26), L * 0.58 * sc);
      var f3 = add(elb, dirOf(a - 20), L * 0.48 * sc);
      var hip = add(rr, dirOf(180), L * 0.30 * sc);
      var d = closedSmooth([rr, add(rr, dirOf(a + 150), L * 0.26 * sc), elb, f1,
        add(add(f1, dirOf(a - 40), L * 0.14), dirOf(a + 30), -L * 0.06), f2,
        add(f2, dirOf(a - 50), L * 0.10), f3, add(f3, dirOf(a - 70), L * 0.12), hip]);
      b.p(far ? 'back' : 'front', d, (far ? 'class="k-f' : 'class="k-c') + ' wl-wing wl-wing-' + (far ? 'b' : 'f') +
        '" stroke="var(--ed)" stroke-width="0.7" style="transform-origin:@@O:' + r2(rr[0]) + ',' + r2(rr[1]) + '@@"');
      /* 지골 */
      var bones = [[elb, f1], [elb, f2], [elb, f3]];
      for (var q = 0; q < 3; q++) b.p(far ? 'back' : 'front', ribbon([rr, bones[q][0], bones[q][1]], [L * 0.028, L * 0.020, L * 0.008], { n: 6, capN: 3 }),
        (far ? 'class="k-d' : 'class="k-f') + ' wl-wing wl-wing-' + (far ? 'b' : 'f') + '" style="transform-origin:@@O:' + r2(rr[0]) + ',' + r2(rr[1]) + '@@"');
    } else {
      /* 한 장의 후퇴익. 앞전은 매끈하고 뒷전은 초장깃 3개로 갈라진다. */
      var A0 = 146 + a * 0.3, ln = L * sc, ow = w * sc;
      var P = [
        add(rr, dirOf(A0 - 46), ow * 0.55),
        add(rr, dirOf(A0 - 8), ln * 0.46),
        add(rr, dirOf(A0 + 12), ln * 0.80),
        add(rr, dirOf(A0 + 26), ln * 1.00),
        add(rr, dirOf(A0 + 33), ln * 0.70),
        add(rr, dirOf(A0 + 40), ln * 0.92),
        add(rr, dirOf(A0 + 47), ln * 0.62),
        add(rr, dirOf(A0 + 55), ln * 0.82),
        add(rr, dirOf(A0 + 63), ln * 0.50),
        add(rr, dirOf(A0 + 78), ln * 0.40),
        add(rr, dirOf(A0 + 104), ow * 0.75)
      ];
      var wOrg = ' style="transform-origin:@@O:' + r2(rr[0]) + ',' + r2(rr[1]) + '@@"';
      b.p(far ? 'back' : 'front', closedSmooth(P),
        (far ? 'class="k-f' : 'class="k-c') + ' wl-wing wl-wing-' + (far ? 'b' : 'f') + '"' +
        (far ? '' : ' stroke="var(--ed)" stroke-width="0.7"') + wOrg);
      if (!far) {
        for (var q = 1; q <= 3; q++)
          b.p('front', openSmooth([add(rr, dirOf(A0 + 6 + q * 16), ln * 0.30), add(rr, dirOf(A0 + 14 + q * 15), ln * 0.78)]),
            'class="k-w wl-wing wl-wing-f" fill="none" opacity=".45"' + wOrg, true);
      }
    }
  }
};
EX.tentacle = function (b, e) {
  var K = b.K, M = b.M, n = e.n || 8, rnd = b.rnd;
  var hr = crNum(K.headProf, 1);
  var base = add(K.tip, K.up, -hr * 0.2);
  var L = e.len * U100 * M.exMul * 1.1, r = e.r * U100;
  for (var i = 0; i < n; i++) {
    var f = i / (n - 1), far = i % 2 === 0;
    var a = (e.a0 == null ? 16 : e.a0) - f * (e.span == null ? 128 : e.span) + (rnd() - 0.5) * 12;
    var curl = -34 + (rnd() - 0.5) * 70;
    var bp = [base[0] + (0.5 - abs(f - 0.5)) * hr * 0.9, base[1] + (f - 0.5) * hr * 1.1];
    var cps = tailChain(bp, a, L * (0.66 + 0.44 * (1 - abs(f - 0.5) * 1.4)), curl, 4);
    b.p(far ? 'back' : 'front', ribbon(cps, [r * 1.5, r * 1.1, r * 0.8, r * 0.5, r * 0.12], { n: 12, capN: 3 }),
      (far ? 'class="k-f' : 'class="k-c') + ' wl-tent" style="transform-origin:@@O:' + r2(bp[0]) + ',' + r2(bp[1]) + '@@;--tp:' + r2(f * 0.7) + 's"');
  }
};
/* 외투막 지느러미 — 두족류 뒤끝의 삼각 날개. 마름모로 그리면 '혹' 으로 읽힌다.
   앞전이 몸에 길게 붙고 뒤로 후퇴각을 주어야 오징어가 된다. */
EX.mantlefin = function (b, e) {
  var K = b.K, o = onBody(K, e.at == null ? 0.26 : e.at), w = e.w * U100;
  for (var sg = -1; sg <= 1; sg += 2) {
    var c = add(o.p, o.n, sg * o.r * 0.45);
    b.p(sg < 0 ? 'front' : 'deep', closedSmooth([
      add(c, o.t, w * 1.05),                                            /* 앞쪽 부착점 */
      add(add(c, o.t, w * 0.18), o.n, sg * w * 0.72),
      add(add(c, o.t, -w * 0.70), o.n, sg * w * (sg < 0 ? 1.30 : 1.05)), /* 바깥 꼭짓점 */
      add(add(c, o.t, -w * 1.30), o.n, sg * w * 0.30),
      add(c, o.t, -w * 1.15)]),
      (sg < 0 ? 'class="k-c' : 'class="k-f') + ' wl-fin" stroke="var(--ed)" stroke-width="0.5"');
  }
};
EX.shell = function (b, e) {
  var K = b.K, M = b.M, R = e.r * U100 * (0.85 + 0.15 * M.exMul);
  var o = onBody(K, 0.42), c = add(o.p, o.n, R * 0.52);
  var pts = [], prof = [], i, n = 22;
  for (i = 0; i <= n; i++) {
    var a = -PI * 0.35 + (i / n) * PI * 3.1, rr = R * (1 - i / n * 0.80);
    pts.push([c[0] + cos(a) * rr * 0.92, c[1] - sin(a) * rr * 0.92]);
  }
  var cps = [];
  for (i = 0; i <= 6; i++) cps.push(pts[Math.round(i / 6 * n)]);
  b.p('front', ribbon(cps, [R * 0.34, R * 0.32, R * 0.28, R * 0.22, R * 0.16, R * 0.10, R * 0.04], { n: 22, capN: 4 }),
    'class="k-c wl-shell" stroke="var(--ed)" stroke-width="0.8"');
  b.p('front', openSmooth(pts), 'class="k-w" fill="none" opacity=".55"', true);
};
EX.foot = function (b, e) {
  var K = b.K, w = e.w * U100;
  b.p('deep', ell(K.bodyCps[2][0], -2.2, w * 1.0, 3.0, 0), 'class="k-f wl-foot"');
};
EX.eyestalk = function (b, e) {
  var K = b.K, M = b.M, hs = K.hs, L = e.len * hs * 5.4 * M.exMul;
  for (var i = 0; i < (e.n || 2); i++) {
    var far = i === 0;
    var base = add(add(K.c1, K.hd, hs * 0.3), K.up, hs * 0.5);
    base = [base[0] - (far ? hs * 0.22 : 0), base[1] + (far ? hs * 0.06 : 0)];
    var a = K.headAng + 72 + (far ? 12 : -6);
    var cps = tailChain(base, a, L * (far ? 0.86 : 1), -18, 2);
    b.p('head', ribbon(cps, [L * 0.10, L * 0.085, L * 0.07], { n: 7, capN: 3 }),
      (far ? 'class="k-f' : 'class="k-c') + ' wl-stalk" style="transform-origin:@@O:' + r2(base[0]) + ',' + r2(base[1]) + '@@"');
    var tp = cps[2];
    b.p('head', ell(tp[0], tp[1], L * 0.17, L * 0.17, 0), (far ? 'class="k-f' : 'class="k-e') + ' wl-stalk" style="transform-origin:@@O:' + r2(base[0]) + ',' + r2(base[1]) + '@@"');
  }
};
EX.antenna = function (b, e) {
  var K = b.K, M = b.M, hs = K.hs, L = e.len * hs * 5.6 * M.exMul;
  for (var i = 0; i < (e.n || 2); i++) {
    var far = i === 0;
    var o = onHead(K, 0.55), base = add(o.p, K.up, o.r * 0.8);
    base = [base[0] - (far ? hs * 0.18 : 0), base[1] + (far ? hs * 0.05 : 0)];
    var cps = tailChain(base, K.headAng + 56 + (far ? 10 : -4), L * (far ? 0.88 : 1), e.curve, 3);
    b.p('head', ribbon(cps, [L * 0.055, L * 0.042, L * 0.028, L * 0.012], { n: 9, capN: 3 }),
      (far ? 'class="k-f' : 'class="k-c') + ' wl-ant" style="transform-origin:@@O:' + r2(base[0]) + ',' + r2(base[1]) + '@@"');
  }
};
EX.mandible = function (b, e) {
  var K = b.K, hs = K.hs, L = e.len * hs * 5.6;
  for (var i = 0; i < 2; i++) {
    var far = i === 0;
    var base = add(K.tip, K.up, (far ? -1 : 1) * crNum(K.headProf, 1) * 0.36);
    var cps = tailChain(base, K.headAng + (far ? -30 : 24), L, far ? 46 : -46, 2);
    b.p('head', ribbon(cps, [L * 0.26, L * 0.16, L * 0.03], { n: 7, capN: 3 }),
      (far ? 'class="k-f' : 'class="k-n') + ' wl-mand" style="transform-origin:@@O:' + r2(base[0]) + ',' + r2(base[1]) + '@@"');
  }
};
EX.pincer = function (b, e) {
  var K = b.K, o = onBody(K, 0.80), L = e.len * U100;
  for (var i = 0; i < 2; i++) {
    var far = i === 0, base = add(o.p, o.n, -o.r * (far ? 0.2 : 0.5));
    var arm = tailChain([base[0] + (far ? -4 : 0), base[1]], far ? 14 : -6, L * 0.7, -20, 2);
    b.p(far ? 'deep' : 'front', ribbon(arm, [L * 0.14, L * 0.12, L * 0.10], { n: 7, capN: 3 }), (far ? 'class="k-f' : 'class="k-c') + '"');
    var tipP = arm[2];
    b.p(far ? 'deep' : 'front', closedSmooth([tipP, add(tipP, dirOf(24), L * 0.48), add(tipP, dirOf(6), L * 0.54), add(tipP, dirOf(-8), L * 0.30)]), (far ? 'class="k-f' : 'class="k-c') + '"');
    b.p(far ? 'deep' : 'front', closedSmooth([tipP, add(tipP, dirOf(-18), L * 0.42), add(tipP, dirOf(-2), L * 0.46)]), (far ? 'class="k-f' : 'class="k-n') + '"');
  }
};
EX.arm = function (b, e) {
  var K = b.K, M = b.M, o = onBody(K, 0.76);
  var sh = add(o.p, o.n, o.r * 0.32), L = e.len * U100 * M.legMul, th = e.thick * U100;
  for (var i = 0; i < 2; i++) {
    var far = i === 0, s = far ? 0.9 : 1;
    var bp = [sh[0] - (far ? 6 : 0), sh[1] + (far ? 2 : 0)];
    var elb = add(bp, dirOf(-72), L * 0.5 * s);
    var hand = [elb[0] + L * 0.12, -1.5];
    b.p(far ? 'deep' : 'front', ribbon([bp, elb, hand, [hand[0] + th * 0.9, -th * 0.4]], [th * 1.5, th * 1.05, th * 0.85, th * 0.7], { n: 11, capN: 4 }),
      (far ? 'class="k-f' : 'class="k-c') + ' wl-arm" stroke="var(--ed)" stroke-width="0.6" style="transform-origin:@@O:' + r2(bp[0]) + ',' + r2(bp[1]) + '@@"');
  }
};
EX.haunch = function (b, e) {
  var K = b.K, M = b.M, o = onBody(K, 0.16), R = e.r * U100 * M.girthMul;
  b.p('front', ell(o.p[0] + R * 0.1, o.p[1] + R * 0.24, R * 0.95, R * 1.02, -8), 'class="k-c wl-haunch" opacity=".96"');
};
EX.hump = function (b, e) {
  var K = b.K, o = onBody(K, 0.66), R = e.r * U100;
  b.p('body', ell(o.p[0], o.p[1] - o.r * 0.5, R * 1.25, R * 0.72, -6), 'class="k-c"');
};
EX.cheek = function (b, e) {
  var K = b.K, o = onHead(K, 0.55), R = e.r * U100 * b.M.headMul;
  b.p('head', ell(o.p[0] + R * 0.1, o.p[1] + R * 0.42, R * 1.1, R * 0.82, -6), 'class="k-c"');
};
EX.cheekfur = function (b, e) {
  var K = b.K, o = onHead(K, 0.42), n = e.n || 3;
  for (var i = 0; i < n; i++) {
    var s = i / (n - 1) - 0.5;
    var base = add(add(o.p, K.up, -o.r * 0.3 + s * o.r * 0.9), K.hd, -o.r * 0.1);
    b.p('head', spike(base[0], base[1], K.headAng + 176 + s * 34, o.r * 0.42, o.r * 0.16), 'class="k-f"');
  }
};
EX.ruff = EX.mane = function (b, e) {
  var K = b.K, M = b.M, n = e.n || 6, D = [];
  var big = e.len ? e.len * U100 * M.exMul : (e.r * U100 * M.exMul * 1.25);
  for (var i = 0; i < n; i++) {
    var t = 0.70 + (i / (n - 1)) * 0.28, o = onBody(K, t);
    for (var sgn = -1; sgn <= 1; sgn += 2) {
      var base = add(o.p, o.n, sgn * o.r * 0.82);
      var a = Math.atan2(-o.n[1], o.n[0]) * 180 / PI * sgn + (sgn < 0 ? 180 : 0);
      a = sgn > 0 ? a - 30 - i * 6 : a + 20 + i * 5;
      D.push(spike(base[0], base[1], a, big * (0.6 + 0.5 * Math.sin(PI * i / n)), big * 0.30));
    }
  }
  b.pm('deep', D, 'class="k-f wl-ruff"');
};
EX.shag = function (b, e) {
  var K = b.K, M = b.M, n = e.n || 7, L = e.len * U100 * M.exMul, D = [];
  for (var i = 0; i < n; i++) {
    var t = 0.10 + (i / (n - 1)) * 0.72, o = onBody(K, t);
    var base = add(o.p, o.n, -o.r * 0.88);
    D.push(spike(base[0], base[1], -84 + (i - n / 2) * 3, L * (0.6 + 0.55 * Math.sin(PI * i / n)), L * 0.26));
  }
  b.pm('front', D, 'class="k-f wl-shag"');
};
EX.quill = function (b, e) {
  var K = b.K, M = b.M, n = e.n || 9, L = e.len * U100 * M.exMul, D = [];
  for (var i = 0; i < n; i++) {
    var t = 0.12 + (i / (n - 1)) * 0.62, o = onBody(K, t);
    var base = add(o.p, o.n, o.r * 0.80);
    var a = Math.atan2(-o.n[1], o.n[0]) * 180 / PI - 26;
    D.push(spike(base[0], base[1], a, L * (0.7 + 0.5 * Math.sin(PI * i / n)), L * 0.14));
  }
  b.pm('deep', D, 'class="k-f wl-quill"');
};
EX.fang = function (b, e) {
  var K = b.K, n = e.n || 2, L = e.len * U100 * (0.8 + 0.2 * b.M.exMul), D = [];
  for (var i = 0; i < n; i++) {
    var t = 0.70 + (i / Math.max(1, n)) * 0.24, o = onHead(K, t);
    var base = add(o.p, K.up, -o.r * 0.70);
    D.push(spike(base[0], base[1], K.headAng - 96, L * (1 - i * 0.16), L * 0.30));
  }
  b.pm('head', D, 'class="k-n wl-fang"');
};
EX.claw = EX.talon = function (b, e) {
  var K = b.K, sp = b.sp, n = e.n || 3, L = e.len * U100 * (0.8 + 0.25 * b.M.exMul);
  var xs = sp.legs.n === 2 ? [K.chestX * 0.30 + sp.legs.paw * U100 * 0.9] :
    [K.hipX * 0.80 + sp.legs.paw * U100, K.chestX * 0.78 + sp.legs.paw * U100 * 1.5];
  var D = [];
  for (var q = 0; q < xs.length; q++)
    for (var i = 0; i < n; i++)
      D.push(spike(xs[q] + i * L * 0.52, -1.4, -30 - i * 9, L * 0.72, L * 0.17));
  b.pm('front', D, 'class="k-n wl-claw" opacity=".7"', true);
};
EX.whisker = function (b, e) {
  var K = b.K, n = e.n || 3, L = e.len * U100 * b.M.headMul, D = [];
  for (var i = 0; i < n; i++) {
    var f = i / Math.max(1, n - 1);
    var o = onHead(K, 0.80);
    var base = add(o.p, K.up, o.r * (0.1 - f * 0.5));
    var a = K.headAng + 16 - f * 34;
    D.push(openSmooth([base, add(base, dirOf(a), L * 0.5), add(add(base, dirOf(a), L), K.up, -L * 0.12)]));
  }
  b.pm('head', D, 'class="k-w wl-whisk" fill="none"', true);
};

/* ── 5-6b 신규 12종이 가져온 파츠 ────────────────────────────────────────
 * 규칙은 위와 같다: ribbon / ell / spike 세 프리미티브만 쓰고, 자기 레이어에만
 * 밀어넣는다. 새 종을 위해 별도 렌더 경로를 만들지 않는다.
 * -------------------------------------------------------------------- */

/* 긴 턱선 — 악어·보아·고래·파라케라테리움.
   fang(송곳니 2~5개)과 다르다: 이건 주둥이를 끝까지 가르는 '잇줄 전체' 다.
   teeth:false 면 선만 남아 고래의 다문 입선이 된다. */
EX.lips = function (b, e) {
  var K = b.K, M = b.M, n = e.n || 0, i;
  var t0 = e.at == null ? 0.34 : e.at;
  var dwn = [-K.up[0], -K.up[1]], line = [];
  for (i = 0; i <= 4; i++) {
    var t = t0 + (1 - t0) * (i / 4), o = onHead(K, t);
    line.push(add(o.p, dwn, o.r * (0.46 + 0.34 * (i / 4))));
  }
  b.p('head', openSmooth(line), 'class="k-m" fill="none" opacity=".85"', true);
  if (e.teeth === false || !n) return;
  var D = [];
  for (i = 0; i < n; i++) {
    var f = (i + 0.5) / n, p = crPt(line, f);
    var L = (e.tooth || 0.040) * U100 * M.headMul * (0.55 + 0.65 * Math.sin(PI * f));
    D.push(spike(p[0], p[1], K.headAng - 88 - f * 10, L, L * 0.36));
  }
  b.pm('head', D, 'class="k-n wl-fang" opacity=".92"');
};

/* 목도리 — 콘도르. 목 밑동을 한 바퀴 감는 흰 러프(등줄기 갈기가 아니다) */
EX.ruffcheek = function (b, e) {
  var K = b.K, M = b.M, o = onBody(K, e.at == null ? 0.82 : e.at);
  var R = (e.r || 0.085) * U100 * (0.72 + 0.28 * M.exMul), n = e.n || 9, D = [], i;
  b.p('front', ell(o.p[0], o.p[1], R * 1.15, R * 0.78, -24), 'class="k-b wl-ruffc" opacity=".6"');
  for (i = 0; i < n; i++) {
    var a = -164 + (i / (n - 1)) * 320;
    var bp = [o.p[0] + cos(rad(a)) * R * 0.98, o.p[1] - sin(rad(a)) * R * 0.62];
    D.push(spike(bp[0], bp[1], a, R * (0.24 + 0.26 * Math.sin(PI * i / (n - 1))), R * 0.20));
  }
  b.pm('front', D, 'class="k-b wl-ruffc" opacity=".55"');
};

/* 고래 미익 — 수평 지느러미. 상어의 수직 미저(caudal)와 정반대인 게 정체성이다.
   옆에서 보면 얕은 V 두 장 + 가운데 홈. 가까운 엽이 아래로 크게 온다. */
EX.fluke = function (b, e) {
  var K = b.K, M = b.M;
  var len = (e.len || 0.30) * U100 * M.lenMul, w = (e.w || 0.11) * U100;
  var ang = 180 + (e.lift || 0), base = K.tailBase;
  var org = ' style="transform-origin:@@O:' + r2(base[0]) + ',' + r2(base[1]) + '@@"';
  var pk = add(base, dirOf(ang), len * 0.86);
  /* 미병(尾柄) — 길고 가는 자루. 이게 굵으면 미익이 몸통에 먹혀 고래가 '덩어리' 가 된다 */
  b.p('deep', ribbon([base, add(base, dirOf(ang), len * 0.44), pk], [w * 0.80, w * 0.42, w * 0.20], { n: 9, capN: 3 }),
    'class="k-cn wl-tail"' + org);
  var notch = add(pk, dirOf(ang), len * 0.26);
  for (var s = 0; s < 2; s++) {
    var far = s === 0, sg = far ? -1 : 1, sc = far ? 0.78 : 1;
    var out = dirOf(ang + 90 * sg), back = dirOf(ang);
    var tip = add(add(pk, back, len * 0.52 * sc), out, len * 0.86 * sc);
    b.p('deep', closedSmooth([
      add(pk, out, w * 0.34),
      add(add(pk, out, len * 0.52 * sc), back, -len * 0.04),   /* 앞전 — 일찍 벌어져야 '한 장' 으로 읽힌다 */
      tip,
      add(add(pk, out, len * 0.44 * sc), back, len * 0.72),    /* 뒷전 */
      notch,
      add(pk, dirOf(ang - 90 * sg), w * 0.08)
    ]), (far ? 'class="k-f' : 'class="k-cn') + ' wl-tail"' + org);
  }
};

/* 사각 두상 — 향유고래의 정면 '벽'. 파라케라테리움에선 s 를 줄여 콧등 패드로 쓴다 */
EX.snoutPad = function (b, e) {
  var K = b.K, s = e.s == null ? 1 : e.s;
  var o0 = onHead(K, e.at == null ? 0.28 : e.at), o1 = onHead(K, 0.99);
  b.p('head', closedSmooth([
    add(o0.p, K.up, o0.r * 0.22),
    add(o0.p, K.up, o0.r * (0.14 + 0.82 * s)),
    add(add(o1.p, K.up, o1.r * (0.06 + 0.90 * s)), K.hd, o1.r * 0.22),
    add(add(o1.p, K.up, -o1.r * 0.34), K.hd, o1.r * 0.12),
    add(o1.p, K.up, -o1.r * 0.48)
  ]), 'class="k-b wl-pad" opacity="' + (e.o == null ? 0.40 : e.o) + '"');
};

/* 아가리 — 메갈로돈. 벌어진 구강 + 아래턱 + 삼각니 2줄.
   메갈로돈은 '턱이 전부' 이므로 이 파츠 하나에 예산을 몰아준다. */
EX.sharkjaw = function (b, e) {
  var K = b.K, M = b.M, n = e.n || 8, i;
  var dwn = [-K.up[0], -K.up[1]];
  var up = [], lo = [], t, o;
  for (i = 0; i <= 4; i++) {                    /* 윗잇줄 */
    t = 0.30 + 0.70 * (i / 4); o = onHead(K, t);
    up.push(add(add(o.p, dwn, o.r * (0.26 + 0.44 * (i / 4))), K.hd, -o.r * 0.04));
  }
  for (i = 0; i <= 3; i++) {                    /* 아래턱 — 통째로 내린다 */
    t = 0.32 + 0.66 * (i / 3); o = onHead(K, t);
    lo.push(add(o.p, dwn, o.r * (0.60 + 0.66 * (i / 3))));
  }
  b.p('head', closedSmooth(up.concat(lo.slice().reverse())), 'class="k-d wl-jaw" opacity=".92"');
  b.p('head', ribbon(lo, [onHead(K, 0.32).r * 0.34, onHead(K, 0.6).r * 0.28, onHead(K, 0.8).r * 0.22, onHead(K, 1).r * 0.14],
    { n: 10, capN: 3 }), 'class="k-cn wl-jaw"');
  var D = [];
  for (i = 0; i < n; i++) {
    var f = (i + 0.5) / n;
    var L = (e.tooth || 0.05) * U100 * M.headMul * (0.55 + 0.60 * Math.sin(PI * f));
    var pu = crPt(up, f);
    D.push(spike(pu[0], pu[1], K.headAng - 90, L, L * 0.44));
    if (i < n - 2) { var pl = crPt(lo, f * 0.96); D.push(spike(pl[0], pl[1], K.headAng + 90, L * 0.62, L * 0.36)); }
  }
  b.pm('head', D, 'class="k-n wl-fang"');
};

/* 비늘 띠 — 티타노보아의 배비늘. 몸통을 가로지르는 호가 무족 실루엣을 읽히게 한다 */
EX.chitin = function (b, e) {
  var K = b.K, n = e.n || 12, D = [], i;
  var t0 = e.at == null ? 0.08 : e.at, sp = e.span == null ? 0.80 : e.span;
  for (i = 0; i < n; i++) {
    var t = t0 + sp * (i / (n - 1)), o = onBody(K, t);
    D.push(openSmooth([add(o.p, o.n, -o.r * 0.94), add(add(o.p, o.n, -o.r * 0.24), o.t, o.r * 0.20), add(o.p, o.n, o.r * 0.58)]));
  }
  b.pm('body', D, 'class="k-w" fill="none" opacity=".40"', true);
};

/* 굽 — 기린·파라케라테리움. 작지만 이게 없으면 발이 뭉툭한 덩어리로 끝난다 */
EX.toes = function (b, e) {
  var K = b.K, sp = b.sp, D = [], q, k;
  var xs = sp.legs.n === 2 ? [K.chestX * 0.30] : [K.hipX * 0.80, K.chestX * 0.78];
  var w = sp.legs.paw * U100;
  for (q = 0; q < xs.length; q++) for (k = 0; k < 2; k++)
    D.push(openSmooth([[xs[q] + w * (0.05 + k * 0.72), -w * 1.35], [xs[q] + w * (0.22 + k * 0.72), -0.7]]));
  b.pm('front', D, 'class="k-m" fill="none" opacity=".5"', true);
};

/* 혓불 — 삼족오·기린. 등줄기에서 피어오른다. 색은 눈과 같은 accent 를 쓴다:
   불꽃을 따로 물들이면 지역 팔레트를 갈아끼울 때 이 종만 어긋난다. */
EX.flame = function (b, e) {
  var K = b.K, M = b.M, n = e.n || 6, i;
  var t0 = e.at == null ? 0.18 : e.at, sp = e.span == null ? 0.60 : e.span;
  var L = (e.len || 0.13) * U100 * M.exMul;
  for (i = 0; i < n; i++) {
    var f = n > 1 ? i / (n - 1) : 0.5, o = onBody(K, t0 + sp * f);
    var base = add(o.p, o.n, o.r * 0.74);
    var ln = L * (0.46 + 0.80 * Math.sin(PI * (0.16 + f * 0.84)));
    var a = Math.atan2(-o.n[1], o.n[0]) * 180 / PI + 14;
    /* 혓불 = 밑동이 굵고 끝이 바늘, 그리고 반드시 한 번 꺾인다. 안 꺾으면 가시로 읽힌다 */
    var cps = tailChain(base, a, ln, (i % 2 ? -96 : -54), 4);
    b.p('back', ribbon(cps, [ln * 0.135, ln * 0.098, ln * 0.060, ln * 0.026, ln * 0.004], { n: 12, capN: 3 }),
      'class="k-fm wl-flame" opacity="' + (e.o == null ? 0.55 : e.o) + '" style="transform-origin:@@O:' + r2(base[0]) + ',' + r2(base[1]) + '@@;--fp:' + r2(f * 0.9) + 's"');
  }
};

/* 후광 — 붕(鵬). 최종 동료이므로 발광 링 하나로 끝낸다.
   evenodd 로 판 고리 + 그 안의 옅은 원반. 머리 뒤(back) 레이어다. */
EX.halo = function (b, e) {
  var K = b.K, M = b.M;
  var R = (e.r || 0.24) * U100 * (0.80 + 0.20 * M.exMul);
  var c = add(add(K.c1, K.hd, K.hs * (e.x == null ? -0.10 : e.x)), K.up, K.hs * (e.y == null ? 0.30 : e.y));
  var org = ' style="transform-origin:@@O:' + r2(c[0]) + ',' + r2(c[1]) + '@@"';
  b.p('back', ell(c[0], c[1], R * 0.94, R * 0.90, 0), 'class="k-fl wl-halod" opacity=".1"' + org, true);
  b.p('back', ell(c[0], c[1], R, R * 0.96, 0) + ell(c[0], c[1], R * 0.84, R * 0.80, 0),
    'class="k-fl wl-halo" fill-rule="evenodd" opacity=".72"' + org);
};

/* 깔때기 — 오징어의 배출관. 작지만 이게 있어야 '두족류' 로 못 박힌다 */
EX.siphon = function (b, e) {
  var K = b.K, o = onBody(K, e.at == null ? 0.80 : e.at);
  var L = (e.len || 0.12) * U100, w = (e.w || 0.042) * U100;
  var base = add(o.p, o.n, -o.r * 0.48);
  var cps = tailChain(base, e.ang == null ? -34 : e.ang, L, 26, 2);
  b.p('front', ribbon(cps, [w * 1.35, w * 0.98, w * 0.60], { n: 7, capN: 3 }), 'class="k-cn wl-siphon"');
};

/* ── 5-7 무늬 (stage>=2, 몸통 path 로 클립) ── */
function buildMarks(b, clipId) {
  var K = b.K, sp = b.sp, m = sp.marks;
  if (!m || !b.M.marks) return;
  var out = [], i, t, o;
  if (m.type === 'stripe') {
    for (i = 0; i < (m.n || 6); i++) {
      t = 0.14 + (i / (m.n || 6)) * 0.62; o = onBody(K, t);
      var w = o.r * (0.11 + 0.05 * Math.sin(i * 2.1));
      out.push('<path d="' + ribbon([add(o.p, o.n, o.r * 1.1), add(o.p, o.n, o.r * 0.1), add(add(o.p, o.n, -o.r * 0.5), o.t, -o.r * 0.25)], [w * 1.1, w, w * 0.5], { n: 7, capN: 3 }) + '" class="k-mk"/>');
    }
    o = onHead(K, 0.34);
    out.push('<path d="' + ribbon([add(o.p, K.up, o.r * 0.9), add(o.p, K.up, o.r * 0.1)], [o.r * 0.11, o.r * 0.08], { n: 5, capN: 3 }) + '" class="k-mk"/>');
  } else if (m.type === 'counter') {
    var pts = [], j;
    for (j = 0; j <= 10; j++) { o = onBody(K, 0.06 + j * 0.078); pts.push(add(o.p, o.n, -o.r * 0.42)); }
    var pts2 = [];
    for (j = 10; j >= 0; j--) { o = onBody(K, 0.06 + j * 0.078); pts2.push(add(o.p, o.n, -o.r * 1.15)); }
    out.push('<path d="' + closedSmooth(pts.concat(pts2)) + '" class="k-bl"/>');
  } else if (m.type === 'sock') {
    out.push('');
  } else if (m.type === 'patch') {
    o = onBody(K, 0.42);
    out.push('<path d="' + ell(o.p[0], o.p[1] + o.r * 0.55, o.r * 0.95, o.r * 0.52, -4) + '" class="k-bl"/>');
  } else if (m.type === 'bar') {
    for (i = 0; i < (m.n || 4); i++) {
      t = 0.18 + (i / (m.n || 4)) * 0.44; o = onBody(K, t);
      out.push('<path d="' + ribbon([add(o.p, o.n, o.r * 1.05), add(o.p, o.n, -o.r * 0.2)], [o.r * 0.10, o.r * 0.07], { n: 5, capN: 3 }) + '" class="k-mk"/>');
    }
  }
  if (out.length) b.raw('body', '<g clip-path="url(#' + clipId + ')" class="wl-marks">' + out.join('') + '</g>');
  /* 양말(발목 어두움)은 클립 밖 */
  if (m.type === 'sock') {
    var xs = [K.hipX * 0.80, K.chestX * 0.78];
    for (i = 0; i < xs.length; i++) for (var s = 0; s < 2; s++)
      b.p('front', ell(xs[i] + (s ? 2 : -3), -sp.legs.thick * U100 * 1.2, sp.legs.thick * U100 * 1.15, sp.legs.thick * U100 * 1.5, 0), 'class="k-mk" opacity=".75"', true);
  }
}

/* ── 5-8 성장 물건: 목줄 / 흉터 / 트로피 / 망토 ── */
function buildGear(b) {
  var K = b.K, M = b.M, sp = b.sp, rnd = b.rnd;
  /* 목줄 + 이름표 (stage>=1) */
  if (M.collar && sp.collar !== false) {
    var o = onBody(K, 0.90);
    var a = add(o.p, o.n, o.r * 1.06), c = add(o.p, o.n, -o.r * 1.02);
    b.p('body', ribbon([a, o.p, c], [o.r * 0.19, o.r * 0.16, o.r * 0.17], { n: 7, capN: 3 }), 'class="k-lt wl-collar"');
    var tag = add(o.p, o.n, -o.r * 1.02);
    b.p('body', ell(tag[0] + 0.4, tag[1] + o.r * 0.34, o.r * 0.24, o.r * 0.30, 8), 'class="k-n wl-tag"');
  }
  /* 흉터 (stage>=3) — 시드 고정 */
  if (M.scar) {
    var n = 1 + Math.floor(rnd() * 3);
    for (var i = 0; i < n; i++) {
      var t = 0.28 + rnd() * 0.52, s = onBody(K, t);
      var base = add(s.p, s.n, s.r * (0.30 + rnd() * 0.5));
      var L = s.r * (0.5 + rnd() * 0.6), aa = -50 + rnd() * 100;
      b.p('body', openSmooth([base, add(base, dirOf(aa), L * 0.5), add(base, dirOf(aa + 12), L)]), 'class="k-sc" fill="none"', true);
    }
  }
  /* 전리품 (stage>=3) — 목에 매단 뼈구슬 */
  if (M.trophy) {
    var o2 = onBody(K, 0.84), hang = add(o2.p, o2.n, -o2.r * 0.86);
    b.p('body', openSmooth([add(o2.p, o2.n, o2.r * 0.5), hang]), 'class="k-w" fill="none" opacity=".55"', true);
    for (var q = 0; q < 3; q++)
      b.p('body', ell(hang[0] + (q - 1) * o2.r * 0.30, hang[1] + o2.r * (0.10 + 0.10 * (1 - abs(q - 1))),
        o2.r * 0.11, o2.r * 0.15, (q - 1) * 18), 'class="k-n wl-troph"', true);
  }
  /* 망토 (stage>=4) — 어깨에 걸친 그을린 외투. 본체보다 80ms 늦게 따라오는 2차 진자 */
  if (M.cape && sp.cape !== false && sp.arch === 'quad' && sp.legs.n >= 4) {
    var tA = 0.78, tB = 0.34, N = 4, top = [], hem = [], k, oo, dd;
    for (k = 0; k <= N; k++) { oo = onBody(K, tA + (tB - tA) * k / N); top.push(add(oo.p, oo.n, oo.r * 0.92)); }
    for (k = N; k >= 0; k--) {
      oo = onBody(K, tA + (tB - tA) * k / N);
      dd = oo.r * (0.20 + 0.42 * (k / N)) * (k % 2 ? 1.16 : 0.88);
      hem.push(add(add(oo.p, oo.n, oo.r * 0.30), [0, 1], dd));
    }
    var pin = top[0], capeD = closedSmooth(top.concat(hem));
    var corg = ' style="transform-origin:@@O:' + r2(pin[0]) + ',' + r2(pin[1]) + '@@"';
    b.p('front', capeD, 'class="k-cp wl-cape"' + corg);
    b.p('front', ell(pin[0], pin[1] + 1.2, onBody(K, tA).r * 0.17, onBody(K, tA).r * 0.17, 0), 'class="k-n wl-cape"' + corg, true);
  }
}

/* ── 5-9 몸통 · 머리 · 그림자 · 조립 ── */
function buildCore(b, uid) {
  var K = b.K, sp = b.sp, M = b.M;
  var bodyD = ribbon(K.bodyCps, K.rp, { n: 16, capN: 5 });
  var headD = ribbon(K.headCps, K.headProf, { n: 12, capN: 5 });
  b.bodyD = bodyD; b.headD = headD;

  /* 접지 그림자 — 불 반대 방향으로 늘어난다 */
  var gw = K.bodyLen * 0.70 + K.girth * 1.2;
  if (sp.legs.n || sp.hover) b.p('glow', ell(K.bodyLen * 0.06, -1.4, gw, Math.max(2.6, gw * 0.15), 0), 'class="k-sh"', true);

  /* stage4 자체 발광 */
  if (M.glow) b.raw('glow', '<ellipse cx="0" cy="' + r2(K.baseY) + '" rx="' + r2(K.bodyLen * 0.9) + '" ry="' + r2(K.girth * 2.6) + '" fill="url(#wlcr-glow)" class="wl-aura"/>');

  /* 림은 여기서 그리지 않는다 — 실루엣 합집합 뒤에 깔리는 별도 <use> 패스가 처리한다.
     파트마다 림을 그리면 '가려진 가장자리'까지 선이 남아 머리가 덧붙어 보인다. */
  b.p('body', bodyD, 'class="k-c wl-sk"');
  b.p('head', headD, 'class="k-c wl-sk"');
}

function buildAll(sp, M, seed, uid) {
  var b = new Builder(sp, M, null, rng(seed));
  b.K = anchors(sp, M); b.sp = sp; b.M = M;
  var K = b.K;
  var clipId = 'wlcr-c' + uid;

  buildTail(b);
  buildLegs(b);
  buildCore(b, uid);
  buildMarks(b, clipId);
  buildEars(b);
  buildFace(b);
  buildGear(b);
  for (var i = 0; i < sp.extras.length; i++) {
    var e = sp.extras[i], fn = EX[e.t];
    if (fn) fn(b, e);
  }
  /* stage4 갈기는 추가로 한 겹 더 */
  if (M.mane && !hasEx(sp, 'mane') && !hasEx(sp, 'ruff') && sp.arch === 'quad')
    EX.ruff(b, { r: sp.body.girth * 0.55, n: 5 });

  return { b: b, clipId: clipId };
}

/* ─────────────────── 6. 공유 defs · 스타일 ─────────────────── */
var DEFS_ID = 'wlcr-defs', STYLE_ID = 'wlcr-style', injected = false;
/* 한 스트로크로 두 광원을 낸다. 오프셋 0 = 불 쪽, 1 = 달 쪽. */
function twoSide(id, flip, warmLed) {
  var x1 = flip ? 1 : 0, x2 = flip ? 0 : 1;
  var E = PAL.ember, M = PAL.moon, N = PAL.night;
  var eo = warmLed ? 1 : 0.38, mo = warmLed ? 0.52 : 0.95;
  return '<linearGradient id="' + id + '" x1="' + x1 + '" y1="1" x2="' + x2 + '" y2="0">' +
    '<stop offset="0" stop-color="' + E + '" stop-opacity="' + eo + '"/>' +
    '<stop offset=".26" stop-color="' + E + '" stop-opacity="' + (eo * 0.42) + '"/>' +
    '<stop offset=".44" stop-color="' + N + '" stop-opacity=".30"/>' +
    '<stop offset=".60" stop-color="' + N + '" stop-opacity=".30"/>' +
    '<stop offset=".80" stop-color="' + M + '" stop-opacity="' + (mo * 0.5) + '"/>' +
    '<stop offset="1" stop-color="' + M + '" stop-opacity="' + mo + '"/></linearGradient>';
}
function rimGrad(id, x1, y1, x2, y2, c, o1, o2) {
  return '<linearGradient id="' + id + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '">' +
    '<stop offset="0" stop-color="' + c + '" stop-opacity="' + o1 + '"/>' +
    '<stop offset=".32" stop-color="' + c + '" stop-opacity="' + o2 + '"/>' +
    '<stop offset=".66" stop-color="' + c + '" stop-opacity="0"/></linearGradient>';
}
var CSS = [
'.wl-cr{display:block;overflow:visible;--co:#2B3346;--co2:#1C2331;--co3:#141A26;--ed:#0B0E16;',
'  --bel:#3C4358;--eye:#FFE2A6;--inner:#4A3A36;--bone:#E6DCCB;--mark:#151A26;--scar:#C7A98A;',
'  --wire:#5A6478;--lt:#6B4A32;--cape:#241C1A;--shadow:#05070C;--flm:#FF9333;--rimW:url(#wlcr-rw);--rimC:url(#wlcr-rc);',
'  --rwO:.9;--rcO:.5;--amp:1;--lid0:0;--br:3.4s;--tw:2.6s;--ef:4.4s;--bl:3.6s;--ph:0s;--ph2:0s;--ph3:0s;--ph4:0s;',
'  --skC:transparent;--skW:0;--auraF:url(#wlcr-glow);--eyeW:#0A0D14;--rimG:url(#wlcr-rim)}',
'.wl-cr.flip{--rimW:url(#wlcr-rwf);--rimC:url(#wlcr-rcf)}',

'.wl-cr .k-c,.wl-cr .k-f,.wl-cr .k-d,.wl-cr .k-b,.wl-cr .k-n,.wl-cr .k-lt,.wl-cr .k-cp,.wl-cr .k-cn{',
'  stroke:var(--skC);stroke-width:var(--skW);stroke-linejoin:round;stroke-linecap:round}',
'.wl-cr .k-c{fill:var(--co)}.wl-cr .k-f{fill:var(--co2)}.wl-cr .k-d{fill:var(--co3)}',
'.wl-cr .k-cn{fill:var(--con)}',
'.wl-cr .k-b,.wl-cr .k-bl{fill:var(--bel)}.wl-cr .k-bl{opacity:.42}',
'.wl-cr .k-a{fill:var(--eye)}.wl-cr .k-e{fill:var(--eye)}.wl-cr .k-e2{fill:var(--eye);opacity:.30}',
'.wl-cr .k-eo{fill:var(--eyeW)}',
'.wl-cr .k-i{fill:var(--inner);opacity:.85}.wl-cr .k-n{fill:var(--bone)}',
'.wl-cr .k-mk{fill:var(--mark);opacity:.62}',
'.wl-cr .k-m{stroke:var(--ed);stroke-width:.8;stroke-linecap:round;fill:none}',
'.wl-cr .k-w{stroke:var(--wire);stroke-width:.5;stroke-linecap:round;fill:none;opacity:.5}',
'.wl-cr .k-sc{stroke:var(--scar);stroke-width:.62;stroke-linecap:round;fill:none;opacity:.62}',
'.wl-cr .k-lt{fill:var(--lt)}.wl-cr .k-cp{fill:var(--cape)}',
/* 신규 12종: 불꽃·후광은 accent(눈 색)를 그대로 쓴다 — 지역 팔레트와 같이 움직인다 */
'.wl-cr .k-fl{fill:var(--eye)}.wl-cr .k-fm{fill:var(--flm)}',
'.wl-cr .k-sh{fill:var(--shadow);opacity:.45}.wl-cr .wl-aura{fill:var(--auraF)}',
'.wl-cr .wl-rim{stroke:var(--rimW);stroke-width:var(--rimWpx,2);opacity:var(--rwO);stroke-linejoin:round}',
'.wl-cr .wl-rim2{stroke:var(--rimC);stroke-width:var(--rimCpx,1.3);opacity:var(--rcO);stroke-linejoin:round}',
'.wl-cr .wl-whisk{stroke:var(--bone);stroke-width:.42;opacity:.30}',
'.wl-cr .wl-eyehappy{stroke:var(--eye);stroke-width:1.8;stroke-linecap:round;fill:none;display:none}',
'.wl-cr .wl-lid{fill:var(--co);transform:scaleY(var(--lid0))}',
'.wl-cr .wl-sil use{--co:transparent;--co2:transparent;--co3:transparent;--con:transparent;',
'  --bel:transparent;--bone:transparent;--lt:transparent;--cape:transparent;--mark:transparent;',
'  --inner:transparent;--eye:transparent;--eyeW:transparent;--scar:transparent;--wire:transparent;',
'  --shadow:transparent;--auraF:transparent;--flm:transparent;--skC:var(--rimG);--skW:var(--rimWpx,3)}',
'.wl-cr .wl-flash{display:none;fill:var(--eye)}',
'.wl-cr .wl-flash use{--co:var(--eye);--co2:var(--eye);--co3:var(--eye);--bel:var(--eye);--bone:var(--eye);--lt:var(--eye);--cape:var(--eye);--mark:var(--eye);--flm:var(--eye);--rwO:0;--rcO:0}',
/* 파트 공통 */
'.wl-cr g[class^="wl-"],.wl-cr path[class*="wl-"]{transform-box:view-box}',
/* ── 상시 idle ── */
'.wl-torso{animation:wlBreathe var(--br) ease-in-out infinite var(--ph)}',
'.wl-headg{animation:wlHead calc(var(--br)*1.9) ease-in-out infinite var(--ph)}',
'.wl-tail{animation:wlTail var(--tw) ease-in-out infinite var(--ph2)}',
'.wl-ear-f{animation:wlEar var(--ef) ease-in-out infinite var(--ph3)}',
'.wl-ear-b{animation:wlEar var(--ef) ease-in-out infinite calc(var(--ph3) - .14s)}',
'.wl-lid{animation:wlBlink var(--bl) linear infinite var(--ph4)}',
'.wl-leg-f{animation:wlLeg calc(var(--br)*1.3) ease-in-out infinite var(--ph2)}',
'.wl-cape{animation:wlCape calc(var(--br)*1.25) ease-in-out infinite calc(var(--ph) - .09s)}',
'.wl-trunk{animation:wlTrunk calc(var(--br)*1.6) ease-in-out infinite var(--ph2)}',
'.wl-tent{animation:wlTent 3.1s ease-in-out infinite calc(var(--tp,0s) * -1)}',
'.wl-stalk{animation:wlStalk 3.8s ease-in-out infinite var(--ph3)}',
'.wl-ant{animation:wlStalk 2.9s ease-in-out infinite var(--ph3)}',
'.wl-wing-f,.wl-wing-b{animation:wlWing var(--fl,2.4s) ease-in-out infinite var(--ph2)}',
/* fly 종의 기본 날갯짓은 .62s. 활공조(콘도르·붕)는 --flap 으로 개별 지정한다 —
   같은 0.62s 로 퍼덕이면 소형 맹금과 대형 활공조가 같은 새로 읽힌다. */
'.wl-cr.fly .wl-wing-f,.wl-cr.fly .wl-wing-b{--fl:var(--flap,.62s)}',
'.wl-flame{animation:wlFlame 1.9s ease-in-out infinite calc(var(--fp,0s) * -1)}',
'.wl-halo{animation:wlHalo 7.2s linear infinite}',
'@keyframes wlFlame{0%,100%{transform:rotate(calc(-7deg*var(--amp))) scaleY(1)}50%{transform:rotate(calc(8deg*var(--amp))) scaleY(calc(1 + .26*var(--amp)))}}',
'@keyframes wlHalo{0%{transform:rotate(0) scale(1);opacity:.58}50%{transform:rotate(180deg) scale(calc(1 + .05*var(--amp)));opacity:.95}100%{transform:rotate(360deg) scale(1);opacity:.58}}',
'.wl-cr.hover .wl-root{animation:wlHover calc(var(--br)*.9) ease-in-out infinite var(--ph)}',
'@keyframes wlBreathe{0%,100%{transform:scale(1,1)}50%{transform:scale(calc(1 + .020*var(--amp)),calc(1 + .034*var(--amp)))}}',
'@keyframes wlHead{0%,100%{transform:translate(0,0) rotate(0)}35%{transform:translate(calc(.4px*var(--amp)),calc(-.5px*var(--amp))) rotate(calc(-1.4deg*var(--amp)))}70%{transform:translate(0,calc(.6px*var(--amp))) rotate(calc(1.1deg*var(--amp)))}}',
'@keyframes wlTail{0%,100%{transform:rotate(calc(-4deg*var(--amp)))}50%{transform:rotate(calc(5deg*var(--amp)))}}',
'@keyframes wlEar{0%,84%,100%{transform:rotate(0)}88%{transform:rotate(calc(-13deg*var(--amp)))}93%{transform:rotate(calc(5deg*var(--amp)))}}',
'@keyframes wlBlink{0%,95.5%,100%{transform:scaleY(var(--lid0))}97%{transform:scaleY(1)}98.6%{transform:scaleY(var(--lid0))}}',
'@keyframes wlLeg{0%,100%{transform:rotate(calc(-.9deg*var(--amp)))}50%{transform:rotate(calc(1.2deg*var(--amp)))}}',
'@keyframes wlCape{0%,100%{transform:rotate(calc(-2.4deg*var(--amp))) skewX(calc(1.5deg*var(--amp)))}50%{transform:rotate(calc(3deg*var(--amp))) skewX(calc(-2deg*var(--amp)))}}',
'@keyframes wlTrunk{0%,100%{transform:rotate(calc(-5deg*var(--amp)))}50%{transform:rotate(calc(6deg*var(--amp)))}}',
'@keyframes wlTent{0%,100%{transform:rotate(calc(-7deg*var(--amp)))}50%{transform:rotate(calc(8deg*var(--amp)))}}',
'@keyframes wlStalk{0%,100%{transform:rotate(calc(-5deg*var(--amp)))}50%{transform:rotate(calc(6deg*var(--amp)))}}',
'@keyframes wlWing{0%,100%{transform:rotate(calc(-5deg*var(--amp))) scaleY(1)}50%{transform:rotate(calc(10deg*var(--amp))) scaleY(calc(1 - .07*var(--amp)))}}',
'@keyframes wlHover{0%,100%{transform:translateY(calc(-1.2% * var(--amp)))}50%{transform:translateY(calc(1.6% * var(--amp)))}}',
/* ── 상태 ── */
'.wl-cr.is-attack .wl-root{animation:wlLunge .52s cubic-bezier(.2,.9,.3,1) 1}',
'.wl-cr.is-attack .wl-headg{animation:wlThrust .52s cubic-bezier(.2,.9,.3,1) 1}',
'.wl-cr.is-attack .wl-tail{animation:wlTailWhip .52s cubic-bezier(.2,.9,.3,1) 1}',
'@keyframes wlLunge{0%{transform:translateX(0) scale(1,1)}18%{transform:translateX(-4%) scale(1.05,.94)}46%{transform:translateX(15%) scale(.95,1.06)}100%{transform:translateX(0) scale(1,1)}}',
'@keyframes wlThrust{0%{transform:rotate(0)}20%{transform:rotate(8deg) translateY(-2%)}48%{transform:rotate(-11deg) translateY(2%)}100%{transform:rotate(0)}}',
'@keyframes wlTailWhip{0%{transform:rotate(0)}30%{transform:rotate(18deg)}60%{transform:rotate(-12deg)}100%{transform:rotate(0)}}',
'.wl-cr.is-hurt .wl-root{animation:wlRecoil .30s cubic-bezier(.2,.9,.3,1) 1}',
'.wl-cr.is-hurt .wl-flash{display:block;animation:wlFlash .30s linear 1}',
'@keyframes wlRecoil{0%{transform:translateX(0) rotate(0)}30%{transform:translateX(-7%) rotate(-3deg) scale(.97,1.03)}100%{transform:translateX(0) rotate(0)}}',
'@keyframes wlFlash{0%{opacity:.75}100%{opacity:0}}',
'.wl-cr.is-cheer .wl-root{animation:wlCheer .92s cubic-bezier(.2,.9,.3,1) 1}',
'.wl-cr.is-cheer .wl-headg{animation:wlCheerHead .92s cubic-bezier(.2,.9,.3,1) 1}',
'.wl-cr.is-cheer .wl-tail{animation:wlWag .22s ease-in-out 4}',
'@keyframes wlCheer{0%{transform:translateY(0) scale(1,1)}18%{transform:translateY(0) scale(1.07,.90)}42%{transform:translateY(-13%) scale(.95,1.08)}70%{transform:translateY(0) scale(1.04,.96)}100%{transform:translateY(0) scale(1,1)}}',
'@keyframes wlCheerHead{0%,100%{transform:rotate(0)}40%{transform:rotate(-16deg)}}',
'@keyframes wlWag{0%,100%{transform:rotate(-16deg)}50%{transform:rotate(19deg)}}',
'.wl-cr.is-cheer .wl-eyehappy,.wl-cr.is-pet .wl-eyehappy,.wl-cr.mood-happy .wl-eyehappy{display:block}',
'.wl-cr.is-cheer .k-e,.wl-cr.is-pet .k-e,.wl-cr.mood-happy .k-e,.wl-cr.is-cheer .wl-spark,.wl-cr.is-pet .wl-spark,.wl-cr.mood-happy .wl-spark{display:none}',
'.wl-cr.is-pet .wl-headg{animation:wlPet 1.6s ease-in-out infinite}',
'.wl-cr.is-pet .wl-tail{animation:wlWag .34s ease-in-out infinite}',
'.wl-cr.is-pet .wl-ear-f,.wl-cr.is-pet .wl-ear-b{animation:none;transform:rotate(26deg)}',
'@keyframes wlPet{0%,100%{transform:rotate(-7deg) translateY(2%)}50%{transform:rotate(-13deg) translateY(0)}}',
'.wl-cr.is-sleep{--lid0:1;--amp:.45}',
'.wl-cr.is-sleep .wl-root{animation:wlSleep .6s cubic-bezier(.2,.9,.3,1) forwards}',
'.wl-cr.is-sleep .wl-lid{animation:none;transform:scaleY(1)}',
'.wl-cr.is-sleep .wl-torso{animation-duration:calc(var(--br)*1.9)}',
'.wl-cr.is-sleep .wl-tail{animation-duration:calc(var(--tw)*2.2)}',
'.wl-cr.is-sleep .wl-ear-f,.wl-cr.is-sleep .wl-ear-b{animation:none;transform:rotate(30deg)}',
'@keyframes wlSleep{to{transform:translateY(6%) scale(1.03,.88)}}',
'.wl-cr.is-eat .wl-headg{animation:wlEat 1.4s ease-in-out 1}',
'@keyframes wlEat{0%,100%{transform:rotate(0)}12%{transform:rotate(26deg) translateY(5%)}20%,32%,44%,56%{transform:rotate(23deg) translateY(6%)}26%,38%,50%{transform:rotate(28deg) translateY(4%)}80%{transform:rotate(24deg) translateY(5%)}}',
'.wl-cr.is-die .wl-root{animation:wlDie .72s cubic-bezier(.4,0,1,1) forwards}',
'.wl-cr.is-die{--lid0:1}',
'@keyframes wlDie{0%{transform:none;opacity:1}30%{transform:translateY(-4%) rotate(-4deg)}100%{transform:translateY(10%) rotate(-16deg) scale(.96);opacity:0}}',
/* 무드 */
'.wl-cr.mood-fierce{--lid0:.40}.wl-cr.mood-tired{--lid0:.52;--amp:.55}',
'.wl-cr.vet{--lid0:.26}',
'.wl-cr.mood-tired .wl-ear-f,.wl-cr.mood-tired .wl-ear-b{transform:rotate(14deg)}',
/* reduced motion — 끄지 않고 줄인다. 흔들림·플래시만 완전히 끈다 */
'@media (prefers-reduced-motion:reduce){.wl-cr{--amp:.22;--br:5.2s;--tw:4.4s}',
'  .wl-cr.is-hurt .wl-flash{display:none}.wl-cr.is-hurt .wl-root{animation:none}',
'  .wl-cr.is-attack .wl-root{animation-duration:.32s}.wl-cr.is-cheer .wl-root{animation:none}}',
'html.rm .wl-cr{--amp:.22;--br:5.2s;--tw:4.4s}',
/* ── 품질 티어 (분기점은 html 클래스 한 곳뿐) ───────────────────────────
   q1: 파트별 상시 애니메이션을 끄고 몸통 호흡·눈깜빡임·꼬리만 남긴다.
       상태(공격/피격/환호) 연출은 그대로 재생된다 — 정보를 잃지 않는다.
   q0: 상시 애니메이션 전부 정지. 상태 연출만.                           */
'html.wlq1 .wl-cr .wl-leg,html.wlq1 .wl-cr .wl-ear-f,html.wlq1 .wl-cr .wl-ear-b,',
'html.wlq1 .wl-cr .wl-wing,html.wlq1 .wl-cr .wl-tent,html.wlq1 .wl-cr .wl-trunk,',
'html.wlq1 .wl-cr .wl-headg,html.wlq1 .wl-cr .wl-spark,html.wlq1 .wl-cr .wl-flame,',
'html.wlq1 .wl-cr .wl-halo,html.wlq1 .wl-cr .wl-siphon{animation:none}',
'html.wlq0 .wl-cr .wl-leg,html.wlq0 .wl-cr .wl-ear-f,html.wlq0 .wl-cr .wl-ear-b,',
'html.wlq0 .wl-cr .wl-wing,html.wlq0 .wl-cr .wl-tent,html.wlq0 .wl-cr .wl-trunk,',
'html.wlq0 .wl-cr .wl-headg,html.wlq0 .wl-cr .wl-spark,html.wlq0 .wl-cr .wl-torso,',
'html.wlq0 .wl-cr .wl-tail,html.wlq0 .wl-cr .wl-eye,html.wlq0 .wl-cr .wl-lid,',
'html.wlq0 .wl-cr .wl-flame,html.wlq0 .wl-cr .wl-halo{animation:none}',
'html.rm .wl-cr.is-hurt .wl-flash{display:none}html.rm .wl-cr.is-hurt .wl-root{animation:none}',
'html.rm .wl-cr.is-attack .wl-root{animation-duration:.32s}html.rm .wl-cr.is-cheer .wl-root{animation:none}'
].join('');

function injectStyle() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  if (!document.getElementById(STYLE_ID)) {
    var st = document.createElement('style');
    st.id = STYLE_ID; st.textContent = CSS;
    document.head.appendChild(st);
  }
  if (!document.getElementById(DEFS_ID)) {
    var w = document.createElement('div');
    w.setAttribute('aria-hidden', 'true');
    w.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
    w.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" id="' + DEFS_ID + '" width="0" height="0"><defs>' +
      twoSide('wlcr-rim', false, true) + twoSide('wlcr-rimf', true, true) +
      twoSide('wlcr-rimk', false, false) + twoSide('wlcr-rimkf', true, false) +
      rimGrad('wlcr-rw', 0, 1, 1, 0.05, PAL.ember, 1, 0.5) +
      rimGrad('wlcr-rwf', 1, 1, 0, 0.05, PAL.ember, 1, 0.5) +
      rimGrad('wlcr-rc', 1, 0, 0.1, 0.95, PAL.moon, 0.95, 0.34) +
      rimGrad('wlcr-rcf', 0, 0, 0.9, 0.95, PAL.moon, 0.95, 0.34) +
      '<radialGradient id="wlcr-glow"><stop offset="0" stop-color="' + PAL.ember + '" stop-opacity=".22"/>' +
      '<stop offset=".55" stop-color="' + PAL.ember + '" stop-opacity=".07"/>' +
      '<stop offset="1" stop-color="' + PAL.ember + '" stop-opacity="0"/></radialGradient>' +
      '</defs></svg>';
    (document.body || document.documentElement).appendChild(w);
  }
}

/* ─────────────────── 7. 색 계산 ─────────────────── */
function colorsFor(sp, M, pal) {
  pal = pal || {};
  var base = pal.base || PAL.soot;
  var tint = pal.tint || sp.tint;
  var amt = (pal.amt == null ? M.coat : pal.amt);
  var co = mix(base, tint, amt);
  var cold = pal.rim === 'cold';
  return {
    '--co': co,
    '--co2': shade(co, 0.32),
    '--con': shade(co, 0.155),
    '--co3': shade(co, 0.55),
    '--ed': shade(co, 0.48),
    '--bel': mix(co, PAL.emberCore, 0.17),
    '--eye': pal.accent || (cold ? PAL.emberDeep : PAL.emberCore),
    '--inner': mix(shade(co, 0.25), PAL.emberDeep, 0.20),
    '--bone': mix(PAL.emberCore, co, 0.20),
    '--mark': shade(co, 0.62),
    '--scar': mix(co, PAL.emberCore, 0.55),
    '--wire': mix(co, PAL.moon, 0.35),
    '--lt': mix(co, '#8B5A2B', 0.55),
    '--cape': shade(mix(co, PAL.emberDeep, 0.20), 0.40),
    /* 불꽃은 accent 가 아니라 불 그 자체의 색이다 — 뼈·눈과 같은 색이면 가시로 읽힌다 */
    '--flm': mix(PAL.ember, pal.accent || (cold ? PAL.emberDeep : PAL.emberCore), 0.28),
    '--shadow': PAL.night,
    '--rwO': cold ? 0.30 : 0.92,
    '--rcO': cold ? 0.92 : 0.46
  };
}

/* ─────────────────── 8. 공유 rAF 티커 ─────────────────── */
var jobs = [], raf = 0, driveFn = null, t0 = 0;
function loop(now) {
  raf = 0;
  if (!t0) t0 = now;
  var t = (now - t0) / 1000, i;
  for (i = jobs.length - 1; i >= 0; i--) {
    var j = jobs[i];
    if (now >= j.at) { jobs.splice(i, 1); try { j.fn(); } catch (e) { } }
  }
  if (driveFn) {
    var v = driveFn(t);
    if (typeof v === 'number' && document.documentElement) document.documentElement.style.setProperty('--wl-fire', r2(v));
  }
  if (jobs.length || driveFn) raf = requestAnimationFrame(loop);
}
function kick() { if (!raf && typeof requestAnimationFrame === 'function') raf = requestAnimationFrame(loop); }

/* ─── 품질 티어 · 적응형 폴백 ───────────────────────────────────────────
 * 고정 상한만 두고 런타임 감지가 없으면 느린 기기에서 그냥 무너진다.
 * 연속으로 예산(18ms)을 넘기면 한 단계씩 내리고, 여유가 지속되면 되올린다. */
var qTier = 2, qAuto = false, qWatch = 0, qBad = 0, qGood = 0, qLast = 0;
function applyTier() {
  var d = document.documentElement; if (!d) return;
  d.classList.toggle('wlq1', qTier === 1);
  d.classList.toggle('wlq0', qTier === 0);
}
function setTier(n) { qTier = clamp(n | 0, 0, 2); applyTier(); return qTier; }
function qLoop(now) {
  qWatch = 0;
  if (!qAuto) return;
  if (qLast) {
    var dt = now - qLast;
    if (dt > 18) { qBad++; qGood = 0; } else if (dt < 13) { qGood++; qBad = 0; }
    if (qBad > 24 && qTier > 0) { setTier(qTier - 1); qBad = 0; }
    else if (qGood > 360 && qTier < 2) { setTier(qTier + 1); qGood = 0; }
  }
  qLast = now;
  qWatch = requestAnimationFrame(qLoop);
}
function setAuto(on) {
  qAuto = !!on; qBad = qGood = 0; qLast = 0;
  if (qAuto && !qWatch && typeof requestAnimationFrame === 'function') qWatch = requestAnimationFrame(qLoop);
  return qAuto;
}
function later(ms, fn, tag) {
  var j = { at: (typeof performance !== 'undefined' ? performance.now() : Date.now()) + ms, fn: fn, tag: tag };
  jobs.push(j); kick(); return j;
}
function cancel(tag) { for (var i = jobs.length - 1; i >= 0; i--) if (jobs[i].tag === tag) jobs.splice(i, 1); }

/* ─────────────────── 9. make() ─────────────────── */
var SVGNS = 'http://www.w3.org/2000/svg';
var uidSeq = 0;
var ONESHOT = { attack: 520, hurt: 300, cheer: 920, eat: 1400, die: 720 };
var ALLSTATE = ['idle', 'attack', 'hurt', 'cheer', 'sleep', 'die', 'eat', 'pet'];

var autoInit = false;
function make(opts) {
  opts = opts || {};
  injectStyle();
  /* 적응형 폴백은 기본 ON. 끄려면 WL.Creatures.autoQuality(false). */
  if (!autoInit) { autoInit = true; setAuto(true); }
  var id = opts.species;
  if (!SPECIES[id]) throw new Error('WL.Creatures: 알 수 없는 종 "' + id + '"');
  var uid = ++uidSeq;
  var svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute('class', 'wl-cr');
  svg.setAttribute('role', 'img');
  svg.setAttribute('preserveAspectRatio', 'xMidYMax meet');

  var H = {
    el: svg, id: id, uid: uid,
    stage: clamp(opts.stage == null ? 2 : opts.stage | 0, 0, 4),
    size: opts.size || 96,
    flip: !!opts.flip,
    relative: opts.relative !== false,
    pal: opts.palette || null,
    mood: opts.mood || 'calm',
    seed: opts.seed == null ? (1 + ((Math.random() * 99991) | 0)) : opts.seed,
    label: opts.label || SPECIES[id].name,
    state: 'idle',
    spec: null
  };
  var rr = rng(H.seed);
  H._ph = [ -(rr() * 4).toFixed(2), -(rr() * 4).toFixed(2), -(rr() * 5).toFixed(2), -(rr() * 4).toFixed(2) ];
  H._br = (2.9 + rr() * 1.5).toFixed(2);
  H._tw = (2.1 + rr() * 1.6).toFixed(2);
  H._ef = (3.6 + rr() * 2.2).toFixed(2);
  H._bl = (3.0 + rr() * 1.8).toFixed(2);

  function paint() {
    var sp = SPECIES[H.id], M = stageMods(H.stage);
    H.spec = sp;
    var built = buildAll(sp, M, H.seed, uid);
    var b = built.b, K = b.K;
    var pad = Math.max(3, (b.maxX - b.minX) * 0.035);
    var x0 = b.minX - pad, y0 = b.minY - pad;
    var w = (b.maxX - b.minX) + pad * 2, h = (b.maxY - b.minY) + pad * 2 + 1.5;

    /* transform-box:view-box 에서 transform-origin 의 길이값은 (실측) 뷰박스 좌상단이 아니라
       사용자 좌표계 원점 기준으로 해석된다. x0/y0 를 빼면 파트마다 회전축이
       (x0,y0) 만큼 어긋나 귀·꼬리가 몸에서 떨어져 날아간다. 원좌표를 그대로 쓴다. */
    function sub(s) {
      return s.replace(/@@O:(-?[\d.]+),(-?[\d.]+)@@/g, function (_, a, c) {
        return r2(+a) + 'px ' + r2(+c) + 'px';
      });
    }
    var bodyCenter = crPt(K.bodyCps, 0.45);
    var torsoOrg = r2(bodyCenter[0]) + 'px ' + r2(bodyCenter[1]) + 'px';
    var headOrg = r2(K.neckTop[0]) + 'px ' + r2(K.neckTop[1]) + 'px';

    var inner =
      '<defs><clipPath id="' + built.clipId + '"><path d="' + b.bodyD + '"/></clipPath></defs>' +
      '<g class="wl-sil" aria-hidden="true"><use href="#wlr-' + uid + '" xlink:href="#wlr-' + uid + '"/></g>' +
      '<g class="wl-root" id="wlr-' + uid + '" style="transform-origin:0px ' + r2(K.baseY) + 'px">' +
        '<g class="wl-glow">' + b.L.glow.join('') + '</g>' +
        '<g class="wl-back">' + b.L.back.join('') + '</g>' +
        '<g class="wl-deep">' + b.L.deep.join('') + '</g>' +
        '<g class="wl-torso" style="transform-origin:' + torsoOrg + '">' +
          '<g class="wl-bodyg">' + b.L.body.join('') + '</g>' +
          '<g class="wl-headg" style="transform-origin:' + headOrg + '">' + b.L.head.join('') + '</g>' +
        '</g>' +
        '<g class="wl-frontg">' + b.L.front.join('') + '</g>' +
        '<g class="wl-accg">' + b.L.acc.join('') + '</g>' +
      '</g>' +
      '<g class="wl-flash" aria-hidden="true"><use href="#wlr-' + uid + '" xlink:href="#wlr-' + uid + '"/></g>';

    svg.setAttribute('viewBox', r2(x0) + ' ' + r2(y0) + ' ' + r2(w) + ' ' + r2(h));
    svg.innerHTML = sub(inner);
    H._w = w; H._h = h;
    applySize();
    applyPalette();
    applyFlags(sp, M);
  }
  function applySize() {
    var sp = SPECIES[H.id];
    var pxH = H.relative ? H.size * Math.pow(sp.bulk, 0.75) * (H._h / U100) : H.size;
    var pxW = pxH * (H._w / H._h);
    svg.style.height = r2(pxH) + 'px';
    svg.style.width = r2(pxW) + 'px';
    /* non-scaling-stroke 는 스크린 px 고정이다. 48px 초상과 200px 전장이 같은 굵기면
       작은 쪽이 실루엣 외곽선에 잡아먹힌다 → 렌더 크기에 비례시킨다. */
    /* 스트로크는 사용자 단위다(non-scaling-stroke 를 쓰지 않는다 — 매 프레임
       스트로크를 다시 재는 비용이 60fps 예산에서 실제로 잡힌다).
       화면에서 원하는 굵기를 뷰박스 배율로 나눠 사용자 단위로 환산한다. */
    var uscale = pxH / (H._h || 1);
    var kk = clamp(pxH / 170, 0.30, 1.7);
    var wantPx = clamp(6.0 * kk, 2.0, 9);
    svg.style.setProperty('--rimWpx', r2(wantPx / (uscale || 1)));
  }
  function applyPalette() {
    var sp = SPECIES[H.id], M = stageMods(H.stage);
    var c = colorsFor(sp, M, H.pal), k;
    for (k in c) svg.style.setProperty(k, c[k]);
    var cold = !!(H.pal && H.pal.rim === 'cold');
    svg.style.setProperty('--rimG', 'url(#wlcr-rim' + (cold ? 'k' : '') + (H.flip ? 'f' : '') + ')');
    /* 활공조는 날갯짓 주기를 종이 직접 정한다. flap:0(기본) 이면 제거 → 기존 동작 그대로 */
    svg.style.setProperty('--flap', sp.flap ? sp.flap + 's' : '');
    svg.style.setProperty('--br', H._br + 's');
    svg.style.setProperty('--tw', H._tw + 's');
    svg.style.setProperty('--ef', H._ef + 's');
    svg.style.setProperty('--bl', H._bl + 's');
    svg.style.setProperty('--ph', H._ph[0] + 's');
    svg.style.setProperty('--ph2', H._ph[1] + 's');
    svg.style.setProperty('--ph3', H._ph[2] + 's');
    svg.style.setProperty('--ph4', H._ph[3] + 's');
  }
  function applyFlags(sp, M) {
    var cl = ['wl-cr'];
    if (H.flip) cl.push('flip');
    if (sp.gait === 'hover' || sp.gait === 'drift' || sp.gait === 'glide') cl.push('hover');
    if (sp.arch === 'bird') cl.push('fly');
    if (M.veteran) cl.push('vet');
    if (H.mood && H.mood !== 'calm') cl.push('mood-' + H.mood);
    if (H.state !== 'idle') cl.push('is-' + H.state);
    svg.setAttribute('class', cl.join(' '));
    svg.setAttribute('aria-label', H.label + (M.st >= 3 ? ' (성체)' : M.st === 0 ? ' (새끼)' : ''));
  }

  paint();

  H.play = function (state, o) {
    o = o || {};
    if (ALLSTATE.indexOf(state) < 0) state = 'idle';
    cancel('s' + uid);
    /* 재시작 강제 */
    for (var i = 0; i < ALLSTATE.length; i++) svg.classList.remove('is-' + ALLSTATE[i]);
    void svg.getBoundingClientRect().width;
    H.state = state;
    if (state !== 'idle') svg.classList.add('is-' + state);
    if (ONESHOT[state] && !o.hold && state !== 'die') {
      later(ONESHOT[state] + 20, function () {
        if (H.state === state) { svg.classList.remove('is-' + state); H.state = 'idle'; }
      }, 's' + uid);
    }
    return H;
  };
  H.setStage = function (n) {
    n = clamp(n | 0, 0, 4);
    if (n === H.stage) return H;
    H.stage = n; paint();
    if (H.state !== 'idle') svg.classList.add('is-' + H.state);
    return H;
  };
  H.setMood = function (m) {
    svg.classList.remove('mood-happy', 'mood-fierce', 'mood-tired');
    H.mood = m || 'calm';
    if (H.mood !== 'calm') svg.classList.add('mood-' + H.mood);
    return H;
  };
  H.setPalette = function (p) { H.pal = p; applyPalette(); return H; };
  H.setSize = function (px) { H.size = px; applySize(); return H; };
  H.setFlip = function (f) { H.flip = !!f; svg.classList.toggle('flip', H.flip); applyPalette(); return H; };
  H.dispose = function () {
    cancel('s' + uid);
    if (svg.parentNode) svg.parentNode.removeChild(svg);
    svg.innerHTML = '';
  };
  return H;
}

/* ─────────────────── 10. 공개 ─────────────────── */
W.Creatures = {
  SPECIES: SPECIES,
  PALETTE: PAL,
  /* PETS 는 로스터 index 0..23 순서와 1:1 이다. 앞 12개는 원본, 뒤 12개가 신규다. */
  PETS: ['hamster', 'rabbit', 'fox', 'wolf', 'hawk', 'bear', 'tiger', 'rhino', 'elephant', 'shark', 'mammoth', 'dragon',
         'squid', 'crocodile', 'condor', 'spermwhale', 'bluewhale', 'megalodon',
         'titanoboa', 'paracer', 'quetzal', 'samjogo', 'kirin', 'peng'],
  PETS_V1: ['hamster', 'rabbit', 'fox', 'wolf', 'hawk', 'bear', 'tiger', 'rhino', 'elephant', 'shark', 'mammoth', 'dragon'],
  FOES: ['insect', 'snail', 'critter', 'bird', 'reptile', 'fish', 'cephalopod', 'beast', 'brute', 'titan'],
  make: make,
  injectStyle: injectStyle,
  drive: function (fn) { driveFn = fn || null; if (driveFn) kick(); },
  /* quality(n): 2=전부 1=몸통호흡+깜빡임+꼬리 0=정지. 인자 없으면 현재 값 */
  quality: function (n) { return n == null ? qTier : setTier(n); },
  /* autoQuality(true): 프레임 예산 초과를 감지해 자동으로 등급을 내린다 */
  autoQuality: setAuto,
  mix: mix, shade: shade,
  _geom: { ribbon: ribbon, ell: ell, spike: spike, closedSmooth: closedSmooth, openSmooth: openSmooth }
};
})();
