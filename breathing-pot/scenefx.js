/* ==========================================================================
   숨결 화분 — scenefx.js  ·  window.SceneFX
   빛 아트 디렉션 v1 구현부.

   무엇을 하는가
     · #scene 안에 조명 레이어(#lx, #lxg)와 젖은 광택(.lx-wet)을 주입한다.
     · setTime()이 올 때마다 밴드별 조명 상수를 한 번에 lerp해 #scene에
       CSS 커스텀 프로퍼티로 쓴다. 보간은 CSS가 한다 (cinematic.css §0).
     · high 티어에서만 먼지 캔버스를 돌린다 (실측 초당 16프레임).
       모듈 전체에 rAF 루프는 이것 하나고, 프레임은 그릴 때만 요청한다 —
       매 vsync가 아니라.

   무엇을 하지 않는가
     · SVG 필터를 하나도 만들지 않는다. #pot 안의 #soil은 물 주는 동안
       초당 10회 다시 칠해지므로 #pot에 필터를 걸면 필터 그래프가 초당 10회
       재실행된다. #plant는 will-change:transform으로 승격되어 있어 필터가
       그 승격을 깨고 10초 호흡을 매 프레임 재래스터로 만든다. 림 라이트는
       .plant-svg 한 장의 CSS drop-shadow 체인으로 대신한다 — 같은 그림,
       컴포지터 경로, 그리고 plants.js가 그룹 내용을 통째로 갈아엎어도
       살아남는다 (필터가 <svg> 자신에 걸려 있으므로).
     · filter 리스트에 url()을 절대 넣지 않는다. url()이 섞인 filter 리스트는
       보간이 죽고, 그러면 잎의 목마름 크로스페이드가 조용히 사라진다.
     · window.Sound를 한 번도 호출하지 않는다. BGM과의 결합은 공유 상수뿐이다.

   ES5 IIFE. 전역 하나. 모든 public 함수는 try/catch. 미지원이면 조용한 no-op.
   외부 에셋 0, fetch 0, <img> 0 — file://에서 그대로 돌고 단일 HTML 인라인을
   통과한다.
   ========================================================================== */
(function () {
  'use strict';

  var W = window, D = document;

  /* ═══════════════ 0. 작은 도구들 ═══════════════ */

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* '#rgb' | '#rrggbb' | 'rgb(a)()' → [r,g,b,a] */
  function parse(c) {
    c = String(c).trim();
    if (c.charAt(0) === '#') {
      if (c.length === 4) c = '#' + c.charAt(1) + c.charAt(1) + c.charAt(2) + c.charAt(2) + c.charAt(3) + c.charAt(3);
      return [parseInt(c.substr(1, 2), 16), parseInt(c.substr(3, 2), 16), parseInt(c.substr(5, 2), 16), 1];
    }
    var m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return [0, 0, 0, 0];
    var p = m[1].split(',');
    return [parseFloat(p[0]) || 0, parseFloat(p[1]) || 0, parseFloat(p[2]) || 0,
            p.length > 3 ? parseFloat(p[3]) : 1];
  }
  function rgba(c, mul) {
    var a = c[3] * (mul === undefined ? 1 : mul);
    return 'rgba(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ',' +
           (Math.round(clamp(a, 0, 1) * 1000) / 1000) + ')';
  }
  function mixc(a, b, t) {
    return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t), lerp(a[3], b[3], t)];
  }

  /* ═══════════════ 1. 밴드 표 ═══════════════
     광원 리그는 숫자 두 개에서 전부 파생된다.
       σ = 방위각. "식물 바로 뒤"가 0°, 화면 오른쪽이 +. σ는 언제나 양수 —
           plants.js가 이미 화분 왼쪽을 그늘로, 오른쪽을 하이라이트로 칠해
           놓았으므로 해는 하루 종일 창의 오른쪽 절반에 머문다. 좌우를
           뒤집으면 조명이 화분 아트와 싸우고 '영화적'이 아니라 '고장 난'
           것처럼 읽힌다.
       ε = 선반면 기준 고도. 클수록 그림자가 짧고 짙고 단단하다.
     τ(샤프트 기울기) = 54·(1 − ε/90).

                  σ      ε      τ
       morning   +34°   22°   41°
       day       +18°   62°   17°
       evening   +52°   12°   47°
       night     +44°   46°   26°   (달)

     길이 값은 전부 stage 높이 337.59px(390×844) 기준 px이며, 런타임에
     실제 stage 높이로 스케일된다 — 화분은 뷰포트 높이를 따라 커지므로
     고정 px 그림자는 작은 화면에서 어긋난다.
     ─────────────────────────────────────────────────────────────────── */

  var REF_STAGE_H = 337.59;   /* .stage 높이 @ 390×844, 실측 */

  var BANDS = {
    morning: {
      sunX: 69, sunY: 66, tau: 41,
      key: '#FFE3BC', fill: '#CBDCEC', bounce: '#F1E0C9',
      sunCore: 'rgba(255,236,198,.42)', sunHalo: 'rgba(255,224,182,.22)', haze: 'rgba(255,238,214,.12)',
      lift: 'rgba(255,246,228,.11)', bounceC: 'rgba(241,224,201,.22)',
      shaftC: 'rgba(255,238,209,.11)', shaftO: 0.85,
      washC: 'rgba(255,238,212,.34)', washLen: 52, sideA: 0.05,
      sillHot: 'rgba(255,244,222,.70)', poolC: 'rgba(255,240,214,.48)', poolX: 59,
      conW: 118, conH: 13, conA: 0.30, conDX: -9,
      coreW: 74, coreH: 7, coreA: 0.38,
      rimDX: 0.9, rimDY: -1.7, rimB: 2.2, rimC: 'rgba(255,232,196,.42)',
      shDX: -0.5, shDY: 1.0, shB: 2.4, shC: 'rgba(150,140,130,.14)',
      gradeTop: 'rgba(255,246,232,0)', gradeBot: 'rgba(226,214,200,.14)', vigA: 0.06
    },
    day: {
      sunX: 60, sunY: 14, tau: 17,
      key: '#FFF7E4', fill: '#D6E4F0', bounce: '#F3E8D6',
      sunCore: 'rgba(255,250,236,.36)', sunHalo: 'rgba(255,246,228,.18)', haze: 'rgba(228,238,246,.09)',
      lift: 'rgba(255,252,244,.11)', bounceC: 'rgba(243,232,214,.20)',
      shaftC: 'rgba(255,252,240,.09)', shaftO: 0.70,
      washC: 'rgba(252,246,232,.32)', washLen: 44, sideA: 0.04,
      sillHot: 'rgba(255,252,242,.78)', poolC: 'rgba(255,250,236,.48)', poolX: 55,
      conW: 104, conH: 11, conA: 0.34, conDX: -4,
      coreW: 70, coreH: 6, coreA: 0.44,
      rimDX: 0.4, rimDY: -1.5, rimB: 1.8, rimC: 'rgba(255,248,226,.38)',
      shDX: -0.25, shDY: 0.9, shB: 2.0, shC: 'rgba(140,132,124,.15)',
      gradeTop: 'rgba(255,246,232,0)', gradeBot: 'rgba(224,214,202,.12)', vigA: 0.05
    },
    evening: {
      sunX: 77, sunY: 70, tau: 47,
      key: '#FFC894', fill: '#BEB8D8', bounce: '#EBCDB4',
      sunCore: 'rgba(255,206,158,.44)', sunHalo: 'rgba(246,176,148,.24)', haze: 'rgba(255,208,178,.18)',
      lift: 'rgba(255,240,226,.17)', bounceC: 'rgba(238,212,190,.28)',
      shaftC: 'rgba(255,212,166,.13)', shaftO: 0.95,
      washC: 'rgba(250,208,176,.32)', washLen: 62, sideA: 0.07,
      sillHot: 'rgba(255,224,186,.66)', poolC: 'rgba(255,214,172,.52)', poolX: 63,
      conW: 140, conH: 14, conA: 0.28, conDX: -17,
      coreW: 76, coreH: 7, coreA: 0.36,
      rimDX: 1.1, rimDY: -1.6, rimB: 2.6, rimC: 'rgba(255,214,168,.44)',
      shDX: -0.6, shDY: 1.0, shB: 2.8, shC: 'rgba(120,104,110,.16)',
      gradeTop: 'rgba(255,230,210,0)', gradeBot: 'rgba(210,196,202,.15)', vigA: 0.08
    },
    night: {
      sunX: 74, sunY: 36, tau: 26,
      key: '#C6D8FF', fill: '#7C8AB8', bounce: '#646C88',
      sunCore: 'rgba(206,222,255,.15)', sunHalo: 'rgba(180,200,244,.10)', haze: 'rgba(140,164,212,.07)',
      lift: 'rgba(176,198,246,.07)', bounceC: 'rgba(100,108,136,.10)',
      shaftC: 'rgba(196,214,255,.05)', shaftO: 0.50,
      washC: 'rgba(168,190,236,.14)', washLen: 40, sideA: 0.06,
      sillHot: 'rgba(206,222,255,.30)', poolC: 'rgba(190,210,250,.22)', poolX: 61,
      conW: 112, conH: 12, conA: 0.26, conDX: -6,
      coreW: 72, coreH: 6, coreA: 0.34,
      rimDX: 0.4, rimDY: -1.2, rimB: 2.4, rimC: 'rgba(198,216,255,.13)',
      shDX: -0.25, shDY: 0.8, shB: 2.0, shC: 'rgba(16,20,34,.22)',
      gradeTop: 'rgba(150,178,236,0)', gradeBot: 'rgba(46,50,74,.24)', vigA: 0.16
    }
  };

  /* 색 문자열을 한 번만 파싱해 둔다 */
  var COLOR_KEYS = ['sunCore', 'sunHalo', 'haze', 'shaftC', 'washC', 'sillHot', 'poolC',
                    'rimC', 'shC', 'gradeTop', 'gradeBot', 'key', 'fill', 'bounce',
                    'lift', 'bounceC'];
  (function bake() {
    for (var b in BANDS) {
      if (!Object.prototype.hasOwnProperty.call(BANDS, b)) continue;
      var B = BANDS[b], i;
      for (i = 0; i < COLOR_KEYS.length; i++) B['_' + COLOR_KEYS[i]] = parse(B[COLOR_KEYS[i]]);
    }
  })();

  var SCENE_INK_DAY = parse('#524C46');    /* PALETTES.onScene와 같은 값으로 맞춘다 — 유휴 대비 때문에 한 단계 어둡다. */
  var SCENE_INK_NIGHT = parse('#E9E4DC');
  var CON_RGB = [46, 34, 26];
  var SIDE_RGB = [40, 32, 26];
  var VIG_RGB = [32, 24, 20];
  /* 젖은 흙은 밝아지지 않는다. 어두워지고 진해진다. 그래서 이 값은
     흰색이 아니라 따뜻한 어둠이고, .lx-wet은 multiply로 깔린다. */
  var WET_RGB = [92, 70, 54];

  /* 날씨 커플링. 확산광이 지배하는 날은 빔이 없고, 공기가 더 산란하고,
     그림자가 흐려진다. cloud는 배수, rain은 고정값(전 밴드에서 감소 방향). */
  var WEATHER = {
    clear: { shaft: 1, haze: 1, ground: 1, rim: 1 },
    cloud: { shaft: 0.60, haze: 1.12, ground: 0.88, rim: 0.75 },
    rain:  { shaft: 0, haze: 1.35, ground: 0, rim: 0.60,
             shaftO: 0.10, conA: 0.20, coreA: 0.26 }
  };

  /* ═══════════════ 2. 모듈 상태 ═══════════════ */

  var S = {
    inited: false, dead: false, capMotes: false, forceMotes: 0,
    wanted: 'high',          /* setQuality가 요청한 티어 */
    wantedSet: false,        /* 호스트가 setQuality로 의사를 밝혔는가 */
    bootQ: false,            /* init()과 같은 태스크에서 오는 복원 호출 창 */
    tok: null,               /* 마지막으로 쓴 토큰 값 — 같은 값을 다시 쓰지 않는다 */
    quality: 'off',          /* 실제 적용된 티어 */
    capLow: false,           /* 런타임 강등 기록 (sumgyeol.gfx) */
    rm: false, hidden: false,
    weather: 'clear',
    info: null,              /* 마지막 setTime 인자 */
    scene: null, lx: null, lxg: null, wet: null,
    shaft: null, canvas: null, ctx: null, blob: null,
    raf: 0, mtimer: 0, last: 0, frames: 0,
    motes: [], mw: 0, mh: 0, mscale: 1,
    sunX: 60, sunY: 20, tau: 17, shaftO: 0, moteGain: 0,
    pulseUntil: 0, pulseAmp: 0, wetAt: 0,
    stageH: REF_STAGE_H,
    sig: '', sampled: false, readyTimer: 0, sampleTimer: 0, boundResize: null, boundVis: null, mo: null, moSit: null
  };

  var MOTE_N = 16;           /* 200개가 아니다. 성긴 먼지가 진짜 먼지다. */
  /* 프레임 간격. 먼지는 초당 12–26px로 흐른다 — 16과 60은 구분되지 않는다.
     타이머 50ms 뒤에 다음 vsync를 기다리므로 실질 주기는 약 60ms, 초당 15–17
     프레임이다 (5초 트레이스에서 commit 78회, 고치기 전에는 300회였다).
     캔버스 비용은 그리기가 아니라 매 프레임의 텍스처 업로드이므로
     해상도가 가장 큰 지렛대다. */
  var MOTE_MS = 50;

  /* ═══════════════ 3. 지원 여부 ═══════════════ */

  function supportsBlend() {
    try { return !!(W.CSS && CSS.supports && CSS.supports('mix-blend-mode', 'multiply')); }
    catch (e) { return false; }
  }
  function supportsMask() {
    try {
      if (!(W.CSS && CSS.supports)) return false;
      var g = 'radial-gradient(#000, rgba(0,0,0,0))';
      return CSS.supports('mask-image', g) || CSS.supports('-webkit-mask-image', g);
    } catch (e) { return false; }
  }

  function readCap() {
    try { return W.localStorage.getItem('sumgyeol.gfx') || ''; } catch (e) { return ''; }
  }
  function writeCap(v) {
    try { W.localStorage.setItem('sumgyeol.gfx', v); } catch (e) { /* 저장 못해도 이번 세션에는 적용된다 */ }
  }
  function clearCap() {
    try { W.localStorage.removeItem('sumgyeol.gfx'); } catch (e) { /* 지우지 못해도 이번 세션에는 풀린다 */ }
  }

  /* 티어는 sumgyeol.gfx 자체 키에 저장한다. 절대 sumgyeol.v1 안에 넣지 않는다 —
     그 블롭은 설정의 '기록 옮기기'가 내보내고 불러온다. 기기별 그래픽 티어가
     기기 사이를 여행해서는 안 된다. */
  /* 없는 신호는 나쁜 신호가 아니다.
     navigator.deviceMemory는 Chromium에만 있다. 그것을 `|| 4`로 받으면
     Safari와 Firefox는 기기가 무엇이든 항상 거르는 값이 나온다 —
     모든 iPhone과 iPad가 조용히 low로 떨어진다. 그래서 숫자일 때만
     읽고, 아니면 모든 엔진이 보내는 신호(hardwareConcurrency, 백킹
     픽셀 수)만 본다. 확실히 작은 기기만 미리 내리고, 나머지 판단은
     sampleOnce()의 실측 프레임 프로브에 맡긴다 — 그것은 어느 엔진에서도
     동작하고, 물어보는 대신 재보는 방법이다. */
  function pickTier() {
    try {
      if (!supportsBlend()) return 'off';
      var nav = W.navigator || {};
      var hc = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency > 0
             ? nav.hardwareConcurrency : 0;
      var dm = typeof nav.deviceMemory === 'number' && nav.deviceMemory > 0
             ? nav.deviceMemory : 0;
      var px = (W.innerWidth || 390) * (W.innerHeight || 844) * (W.devicePixelRatio || 1);
      if (dm && dm <= 2) return 'low';        /* 2GB 이하는 진짜로 작다 */
      if (hc && hc <= 3) return 'low';
      if (px > 3.2e6) return 'low';           /* 아주 큰 패널 — 태블릿 가로보기 등 */
      return 'high';
    } catch (e) { return 'off'; }
  }

  var RANK = { off: 0, low: 1, high: 2 };
  function effective() {
    if (!supportsBlend()) return 'off';
    var q = S.wanted;
    if (!RANK.hasOwnProperty(q)) q = 'low';
    if (S.capLow && RANK[q] > RANK.low) q = 'low';
    return q;
  }

  /* ═══════════════ 4. DOM 주입 ═══════════════ */

  function mk(tag, cls) {
    var e = D.createElement(tag);
    if (cls) e.className = cls;
    e.setAttribute('aria-hidden', 'true');
    return e;
  }

  function injectLayers() {
    var scene = D.getElementById('scene');
    if (!scene) return false;
    S.scene = scene;

    /* #lx / #lxg는 <header class="top"> 바로 앞에 넣는다.
       같은 z-index:2에서 DOM 순서가 늦은 .top/.bottom이 이긴다. 그래서
       말풍선·버튼·"함께한 날 N일" 위에는 어떤 조명 레이어도 칠해지지 않는다.
       대비는 구조적으로 보장된다. 이 순서를 바꾸면 조용히 깨진다. */
    var before = D.getElementById('top') || scene.firstChild;

    if (!S.lx) {
      S.lx = mk('div'); S.lx.id = 'lx';
      S.lx.appendChild(mk('div', 'lx-sky'));
      scene.insertBefore(S.lx, before);
    }
    if (!S.lxg) {
      S.lxg = mk('div'); S.lxg.id = 'lxg';
      S.lxg.appendChild(mk('div', 'lx-grade'));
      scene.insertBefore(S.lxg, before);
    }
    /* 접지 2단 — 페넘브라와 AO 코어. 이 둘만으로 화분이 뜨는 것이 멈춘다.
       벽에 길게 드리우던 캐스트 로브는 빼냈다 — 이유는 cinematic.css §7. */
    if (!S.lx.querySelector('.lx-contact')) {
      S.lx.appendChild(mk('div', 'lx-contact'));
      S.lx.appendChild(mk('div', 'lx-core'));
    }
    /* 젖은 흙 광택 — .stage 안, #plantSvg 뒤 (페인트 순서상 위).
       pointer-events:none이 빠지면 식물 탭이 에러 없이 조용히 죽는다. */
    if (!S.wet) {
      var stage = D.getElementById('stage');
      if (stage) {
        S.wet = mk('div', 'lx-wet'); S.wet.id = 'lxWet';
        stage.appendChild(S.wet);
      }
    }
    return true;
  }

  function ensureShaft(on) {
    if (on) {
      if (S.shaft || !S.lx || !supportsMask()) return;
      S.shaft = mk('div', 'lx-shaft');
      /* 하늘 레이어 바로 뒤 */
      var sky = S.lx.querySelector('.lx-sky');
      if (sky && sky.nextSibling) S.lx.insertBefore(S.shaft, sky.nextSibling);
      else S.lx.appendChild(S.shaft);
    } else if (S.shaft) {
      if (S.shaft.parentNode) S.shaft.parentNode.removeChild(S.shaft);
      S.shaft = null;
    }
  }

  /* ═══════════════ 5. 먼지 캔버스 ═══════════════
     먼지는 빛 방향을 읽는다: 각 입자는 τ 방향(= 샤프트 축)을 따라 흐르고,
     주기 18–34초의 횡방향 배회를 더한다. 난류 없음, 돌풍 없음.
     샤프트 마스크 안쪽에서만 밝아진다 — 빛이 있는 곳에서만 먼지가 보이는
     이 커플링이 먼지를 장식이 아니라 볼류메트릭으로 읽히게 하는 전부다.
     ──────────────────────────────────────────────────────────────── */

  function bakeBlob() {
    try {
      var c = D.createElement('canvas');
      c.width = 16; c.height = 16;
      var x = c.getContext('2d');
      if (!x) return null;
      var g = x.createRadialGradient(8, 8, 0, 8, 8, 8);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.45, 'rgba(255,255,255,.55)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = g; x.fillRect(0, 0, 16, 16);
      return c;
    } catch (e) { return null; }
  }

  function seedMotes() {
    S.motes.length = 0;
    for (var i = 0; i < MOTE_N; i++) {
      S.motes.push({
        x: Math.random(), y: Math.random(),                 /* 0..1, 리사이즈에 안전 */
        v: 12 + Math.random() * 14,                          /* 12–26 px/s */
        r: 0.6 + Math.random() * 1.0,                        /* 0.6–1.6px, 보케 암시 */
        a: 0.10 + Math.random() * 0.18,                      /* 0.10–0.28 */
        lat: 4 + Math.random() * 7,
        w: (Math.PI * 2) / (18 + Math.random() * 16),        /* 18–34s */
        ph: Math.random() * Math.PI * 2
      });
    }
  }

  function ensureMotes(on) {
    if (on) {
      if (S.canvas || !S.lx) return;
      var c = mk('canvas', 'lx-motes');
      var ctx = null;
      try { ctx = c.getContext('2d'); } catch (e) { ctx = null; }
      if (!ctx) return;                                      /* 실패하면 붙이지도 않는다 */
      if (!S.blob) S.blob = bakeBlob();
      if (!S.blob) return;
      S.canvas = c; S.ctx = ctx;
      /* .lx-shaft 다음 = 샤프트 위, 식물 뒤 */
      if (S.shaft && S.shaft.nextSibling) S.lx.insertBefore(c, S.shaft.nextSibling);
      else if (S.shaft) S.lx.appendChild(c);
      else {
        var sky = S.lx.querySelector('.lx-sky');
        if (sky && sky.nextSibling) S.lx.insertBefore(c, sky.nextSibling);
        else S.lx.appendChild(c);
      }
      seedMotes();
      sizeCanvas();
    } else if (S.canvas) {
      if (S.canvas.parentNode) S.canvas.parentNode.removeChild(S.canvas);
      S.canvas = null; S.ctx = null; S.motes.length = 0;
    }
  }

  /* 레이아웃 읽기는 여기서만 일어난다 — init / resize / setTime. rAF 안에서 0회. */
  function sizeCanvas() {
    if (!S.canvas || !S.ctx) return;
    try {
      var w = S.canvas.clientWidth || S.canvas.offsetWidth || 0;
      var h = S.canvas.clientHeight || S.canvas.offsetHeight || 0;
      if (!w || !h) return;
      /* dpr 3을 그대로 잡으면 9배 낭비다. 먼지는 0.6–1.6px의 부드러운
         블롭이라 1배 백킹에서 육안으로 구분되지 않는다. */
      var sc = Math.min(W.devicePixelRatio || 1, 1);
      S.mw = w; S.mh = h; S.mscale = sc;
      var pw = Math.round(w * sc), ph = Math.round(h * sc);
      if (S.canvas.width !== pw) S.canvas.width = pw;
      if (S.canvas.height !== ph) S.canvas.height = ph;
      S.ctx.setTransform(sc, 0, 0, sc, 0, 0);
      S.ctx.globalCompositeOperation = 'lighter';
    } catch (e) { /* 조용히 */ }
  }

  function measureStage() {
    try {
      var st = D.getElementById('stage');
      if (!st) return;
      var h = st.getBoundingClientRect().height;
      if (h > 40) S.stageH = h;
    } catch (e) { /* 조용히 */ }
  }

  /* ═══════════════ 6. rAF 루프 ═══════════════ */

  /* 앉기 오버레이가 열려 있으면 리그는 이미 .35로 물러나 있다. 그 뒤에서
     먼지를 계속 그리는 것은 보이지도 않고 공짜도 아니다. */
  function sitOpen() {
    try {
      var el = D.getElementById('sitOverlay');
      return !!(el && !el.hasAttribute('hidden'));
    } catch (e) { return false; }
  }

  function shouldRun() {
    if (S.dead || S.quality !== 'high') return false;
    if (S.rm || S.hidden) return false;
    if (!S.canvas || !S.ctx || !S.blob) return false;
    /* 빔이 없으면 먼지도 없다. 달은 거실 창으로 먼지 기둥을 던지지 않고,
       비 오는 날도 마찬가지다. 어두운 하늘 위의 흰 점은 먼지가 아니라 눈으로
       읽힌다 — 밤으로 가면서 밝기가 0으로 빠지고 루프가 스스로 멎는다. */
    if (S.moteGain < 0.12) return false;
    if (sitOpen()) return false;
    try { if (D.body && D.body.classList.contains('hidden')) return false; } catch (e) { }
    return true;
  }

  function sync() {
    if (S.dead) return;
    var want = S.quality === 'high' && !S.rm && !S.hidden && motesAllowed() && S.moteGain >= 0.12;
    try { if (want && D.body && D.body.classList.contains('hidden')) want = false; } catch (e) { }
    /* 캔버스는 도는 동안에만 존재한다. 멈춘 캔버스를 컴포지터 트리에 남겨
       두면, 아래의 샤프트가 계속 흐르는 한 매 프레임 재합성 비용을 낸다. */
    if (want && !S.canvas) ensureMotes(true);
    if (!want && S.canvas) ensureMotes(false);
    if (shouldRun()) {
      if (!looping()) {
        S.last = 0; S.raf = W.requestAnimationFrame(tick);
        /* 판정은 판정 대상이 실제로 도는 동안 한 번만 한다 */
        if (!S.sampled) {
          S.sampled = true;
          if (S.sampleTimer) clearTimeout(S.sampleTimer);
          S.sampleTimer = setTimeout(function () { S.sampleTimer = 0; try { sampleOnce(); } catch (e) { } }, 1400);
        }
      }
    } else {
      stopLoop();
    }
  }

  /* 루프가 살아 있는가. 두 상태가 있다: 프레임을 기다리는 중(S.raf),
     또는 다음 프레임을 예약해 둔 타이머가 돌고 있는 중(S.mtimer). */
  function looping() { return !!(S.raf || S.mtimer); }

  function stopLoop() {
    if (S.raf) { W.cancelAnimationFrame(S.raf); S.raf = 0; }
    if (S.mtimer) { clearTimeout(S.mtimer); S.mtimer = 0; }
  }

  /* 다음 프레임은 rAF 체인이 아니라 타이머에서 온다.
     매 vsync마다 rAF를 요청하고 그 중 둘을 버리면, 버린 프레임도 공짜가
     아니다 — 요청 자체가 문서 라이프사이클(style+layout+paint+commit)을
     60Hz로 돌린다. 측정(5초 CDP 트레이스): 그리는 속도는 거의 같은데
     commit 300회가 78회로, styleN 352가 92로, Paint 31ms가 9ms로 내려갔고,
     45초 유휴 렌더러 CPU는 코어의 10.7%에서 7.2%로(HEAD는 3.4%) 내려갔다. */
  function queueFrame() {
    if (looping()) return;
    S.mtimer = W.setTimeout(function () {
      S.mtimer = 0;
      if (!shouldRun()) return;
      S.raf = W.requestAnimationFrame(tick);
    }, MOTE_MS);
  }

  function tick(ts) {
    S.raf = 0;
    if (!shouldRun()) { if (S.ctx) { try { S.ctx.clearRect(0, 0, S.mw, S.mh); } catch (e) { } } return; }
    var dt = S.last ? ts - S.last : MOTE_MS;   /* 간격은 타이머가 정한다 */
    S.last = ts;
    S.frames++;
    draw(Math.min(dt, 120) / 1000, ts);
    queueFrame();
  }

  function draw(dt, ts) {
    var ctx = S.ctx, w = S.mw, h = S.mh;
    if (!ctx || !w || !h) return;
    try {
      ctx.clearRect(0, 0, w, h);
      var rad = S.tau * Math.PI / 180;
      /* 빔은 해(오른쪽 위)에서 아래-왼쪽으로 흐른다 */
      var dx = -Math.sin(rad), dy = Math.cos(rad);
      var px = Math.cos(rad), py = Math.sin(rad);          /* 횡방향 */
      var cx = S.sunX / 100 * w, cy = S.sunY / 100 * h;
      var rx = 0.44 * w, ry = 0.70 * h;
      var boost = 1;
      if (ts < S.pulseUntil) boost = 1 + S.pulseAmp * (S.pulseUntil - ts) / 900;
      var base = S.moteGain;
      var blob = S.blob, m, i, mx, my, o, d, mk2;
      for (i = 0; i < S.motes.length; i++) {
        m = S.motes[i];
        m.x += dx * m.v * dt / w;
        m.y += dy * m.v * dt / h;
        m.ph += m.w * dt;
        if (m.x < -0.08) m.x += 1.16; else if (m.x > 1.08) m.x -= 1.16;
        if (m.y < -0.08) m.y += 1.16; else if (m.y > 1.08) m.y -= 1.16;
        var sw = Math.sin(m.ph) * m.lat;
        mx = m.x * w + px * sw;
        my = m.y * h + py * sw;
        d = ((mx - cx) / rx) * ((mx - cx) / rx) + ((my - cy) / ry) * ((my - cy) / ry);
        mk2 = d < 1 ? (1 - d) : 0;
        o = m.a * (1 + 1.2 * mk2) * base * boost;
        if (o <= 0.004) continue;
        ctx.globalAlpha = o > 1 ? 1 : o;
        /* arc() + shadowBlur 금지 — shadowBlur는 drawImage의 ~20배다 */
        ctx.drawImage(blob, mx - m.r * 3, my - m.r * 3, m.r * 6, m.r * 6);
      }
      ctx.globalAlpha = 1;
    } catch (e) { /* 프레임 하나를 잃을 뿐이다 */ }
  }

  /* ═══════════════ 7. 토큰 쓰기 ═══════════════
     밴드 전환은 별도 이벤트가 아니다. setTime이 올 때마다 같은 t로 모든
     스칼라와 색을 lerp해 #scene에 한 번에 쓴다. 시계는 하나다.
     getBoundingClientRect 0회(스테이지 측정 제외), DOM 변경 0회.
     ──────────────────────────────────────────────────────────────── */

  function bandOf(n) { return BANDS[n] || BANDS.day; }

  function hydration() {
    try {
      var s = W.__sumgyeol && W.__sumgyeol.state && W.__sumgyeol.state();
      if (s && typeof s.hydration === 'number') return clamp(s.hydration, 0, 100);
    } catch (e) { }
    return 70;
  }

  function applyTokens() {
    if (!S.scene || S.quality === 'off') return;
    var info = S.info || { band: 'day', nextBand: 'day', t: 0, nightness: 0 };
    var A = bandOf(info.band), B = bandOf(info.nextBand || info.band);
    var t = clamp(typeof info.t === 'number' ? info.t : 0, 0, 1);
    var night = typeof info.nightness === 'number' ? clamp(info.nightness, 0, 1)
              : (info.band === 'night' ? 1 : 0);

    function n(k) { return lerp(A[k], B[k], t); }
    function c(k) { return mixc(A['_' + k], B['_' + k], t); }

    var Wt = WEATHER[S.weather] || WEATHER.clear;
    var thirsty = false, holding = false;
    try {
      thirsty = !!(D.body && D.body.classList.contains('thirsty'));
      holding = !!(D.body && D.body.classList.contains('holding'));
    } catch (e) { }

    /* 목마른 식물은 빛에 덜 반응한다 — 잎이 처지고 왁스층이 마른다 */
    var rimMul = Wt.rim * (thirsty ? 0.7 : 1);
    var groundMul = (thirsty ? 0.9 : 1);

    var sc = S.stageH / REF_STAGE_H;
    var st = S.scene.style;
    /* 토큰은 전부 inherits:true로 등록되어 있다 (cinematic.css §0). #scene에
       하나를 쓰면 #scene 서브트리 전체가 무효화된다 — 그리고 서브트리에는
       식물 SVG가 통째로 들어 있다. 그래서 호출자가 얼마나 자주 부르든
       실제로 바뀐 값만 내려보낸다. 물 주는 동안 pulse('water')는 초당 10번
       들어오지만, 그때 바뀌는 것은 --wet-c 하나뿐이다. */
    var tok = S.tok || (S.tok = {});
    function set(k, v) {
      v = '' + v;
      if (tok[k] === v) return;
      tok[k] = v;
      st.setProperty(k, v);
    }
    function px(v) { return (Math.round(v * sc * 100) / 100) + 'px'; }

    /* 광원 방향 */
    var sunX = n('sunX'), sunY = n('sunY'), tau = n('tau');
    S.sunX = sunX; S.sunY = sunY; S.tau = tau;
    set('--sun-x', sunX + '%');
    set('--sun-y', sunY + '%');
    set('--tau', (Math.round(tau * 100) / 100) + 'deg');

    /* 3점 조명 — 토큰으로만 존재한다. 실제 레이어 색은 여기서 유도된 값이다.
       warm/cool split이 핵심: key와 fill의 온도 차가 저녁에 최대, 낮에 최소.
       단색 평면에 서로 다른 두 온도가 공존하는 순간 평면이 입체로 읽힌다. */
    set('--key', rgba(c('key')));
    set('--fill', rgba(c('fill')));
    set('--bounce', rgba(c('bounce')));

    /* .lx-sky — 블룸 + 헤이즈 */
    set('--sun-core', rgba(c('sunCore')));
    set('--sun-halo', rgba(c('sunHalo')));
    set('--haze-c', rgba(c('haze'), Wt.haze));
    set('--lift-c', rgba(c('lift')));

    /* .lx-shaft */
    var shaftO = Wt.shaftO !== undefined ? Wt.shaftO : n('shaftO') * Wt.shaft;
    S.shaftO = shaftO;
    S.moteGain = shaftO * (1 - night);
    set('--shaft-c', rgba(c('shaftC')));
    set('--shaft-o', Math.round(shaftO * 1000) / 1000);

    /* .wall */
    set('--wash-c', rgba(c('washC')));
    set('--wash-len', (Math.round(n('washLen') * 10) / 10) + '%');
    set('--side-c', rgba([SIDE_RGB[0], SIDE_RGB[1], SIDE_RGB[2], n('sideA')]));
    set('--bounce-c', rgba(c('bounceC')));

    /* .sill */
    set('--sill-hot', rgba(c('sillHot')));
    set('--pool-c', rgba(c('poolC')));
    set('--pool-x', (Math.round(n('poolX') * 10) / 10) + '%');

    /* 접지 페넘브라 + AO 코어.
       --core-w는 언제나 화분 바닥(67.5px)보다 약간 넓고, --con-w는 화분
       테두리(124.6px) 안팎이다. 바닥 폭에 맞추면 화분 뒤에 통째로 가려진다. */
    var conA = (Wt.conA !== undefined ? Wt.conA : n('conA') * Wt.ground) * groundMul;
    var coreA = (Wt.coreA !== undefined ? Wt.coreA : n('coreA') * Wt.ground) * groundMul;
    if (holding) { conA *= 1.15; coreA *= 1.08; }          /* 물이 흙을 무겁게 한다 */
    var conDX = n('conDX');
    set('--con-w', px(n('conW'))); set('--con-h', px(n('conH')));
    set('--con-dx', px(conDX));
    set('--con-g0', rgba([CON_RGB[0], CON_RGB[1], CON_RGB[2], conA]));
    set('--con-g1', rgba([CON_RGB[0], CON_RGB[1], CON_RGB[2], conA * 0.78]));
    set('--con-g2', rgba([CON_RGB[0], CON_RGB[1], CON_RGB[2], conA * 0.30]));
    set('--core-w', px(n('coreW'))); set('--core-h', px(n('coreH')));
    /* 접촉면은 거의 움직이지 않고 페넘브라만 길게 흐른다 */
    set('--core-dx', px(conDX * 0.35));
    set('--core-g0', rgba([CON_RGB[0], CON_RGB[1], CON_RGB[2], coreA]));
    set('--core-g1', rgba([CON_RGB[0], CON_RGB[1], CON_RGB[2], coreA * 0.7]));

    /* 그레이드 + 비네트.
       --grade-top은 모든 밴드에서 알파 0이다 — 위쪽(창 쪽, #days가 있는 곳)은
       그레이드가 건드리지 않는다. 이것이 대비 보장의 절반이다. */
    set('--grade-top', rgba(c('gradeTop')));
    set('--grade-bot', rgba(c('gradeBot')));
    set('--vig-c', rgba([VIG_RGB[0], VIG_RGB[1], VIG_RGB[2], n('vigA')]));

    /* 씬 잉크 */
    set('--scene-ink', rgba(mixc(SCENE_INK_DAY, SCENE_INK_NIGHT, night)));

    /* 림 + 그늘면.
       blur >= 1.5 x |offset|, alpha <= 0.45 — 이 규칙을 어기면 잎마다 뚜렷한
       외곽선이 생겨 림이 아니라 스티커 테두리로 읽힌다.
       brightness/saturate는 낮에도 1로 항상 자리를 지킨다: 리스트 모양이
       변하지 않아야 밤 전환이 보간된다. url()은 절대 넣지 않는다. */
    var bri = lerp(1, 0.72, night), sat = lerp(1, 0.82, night);
    var f = 'brightness(' + (Math.round(bri * 1000) / 1000) + ') saturate(' + (Math.round(sat * 1000) / 1000) + ') ';
    var rb = n('rimB'), rdx = n('rimDX'), rdy = n('rimDY');
    if (S.quality === 'low') {
      /* low가 아끼는 것은 두 번째 drop-shadow(그늘면) 하나다. 림 자체는
         high와 같은 모양이어야 한다 — blur 0은 잃을 것이 없을 만큼
         싸지도 않고(같은 drop-shadow 한 장이다), 잎 위로 4–5디바이스
         픽셀의 선을 그어 §9의 규칙(blur >= 1.5 x |offset|)을 정면으로
         어기며, 그 결과는 림이 아니라 스티커 테두리로 읽힌다. */
      var lrb = Math.max(rb, 1.6, 1.5 * Math.sqrt(rdx * rdx + rdy * rdy));
      f += 'drop-shadow(' + px2(rdx * sc) + ' ' + px2(rdy * sc) + ' ' + px2(lrb * sc) + ' ' + rgba(c('rimC'), rimMul) + ')';
    } else {
      f += 'drop-shadow(' + px2(rdx * sc) + ' ' + px2(rdy * sc) + ' ' + px2(rb * sc) + ' ' + rgba(c('rimC'), rimMul) + ') ' +
           'drop-shadow(' + px2(n('shDX') * sc) + ' ' + px2(n('shDY') * sc) + ' ' + px2(n('shB') * sc) + ' ' + rgba(c('shC')) + ')';
    }
    set('--lx-plant-f', f);

    /* 젖은 흙 광택. renderPot이 10Hz로 재발화해도 비용은 변수 쓰기 하나다. */
    /* 1/255보다 작은 알파 변화는 화면에 존재하지 않는다. 그 단위로 끊어
       쓰면 물 주는 10초 동안 --wet-c 쓰기가 100번이 아니라 일곱 번이 된다 (실측). */
    var wetA = Math.round((0.05 + 0.10 * (hydration() / 100)) * (holding ? 1.45 : 1) * 250) / 250;
    set('--wet-c', rgba([WET_RGB[0], WET_RGB[1], WET_RGB[2], wetA]));

    /* sizeCanvas()를 여기서 부르지 않는다. 그것은 clientWidth를 읽고, 읽기는
       스타일+레이아웃을 그 자리에서 강제로 플러시한다. applyTokens는 물 주는
       동안 초당 여러 번 불리므로, 그 한 줄이 홀드 내내 동기적 레이아웃을
       끌고 왔다. 캔버스 백킹 크기는 만들 때(ensureMotes)와 리사이즈 때
       (onResize)만 바뀔 수 있고, 둘 다 이미 직접 부른다. */
    sync();
  }
  function px2(v) { return (Math.round(v * 100) / 100) + 'px'; }

  function clearTokens() {
    if (!S.scene) return;
    var keys = ['--sun-x', '--sun-y', '--tau', '--key', '--fill', '--bounce',
      '--sun-core', '--sun-halo', '--haze-c', '--shaft-c', '--shaft-o',
      '--wash-c', '--wash-len', '--side-c', '--lift-c', '--bounce-c',
      '--sill-hot', '--pool-c', '--pool-x',
      '--con-w', '--con-h', '--con-dx', '--con-g0', '--con-g1', '--con-g2',
      '--core-w', '--core-h', '--core-dx', '--core-g0', '--core-g1',
      '--grade-top', '--grade-bot', '--vig-c', '--scene-ink', '--lx-plant-f', '--wet-c'];
    for (var i = 0; i < keys.length; i++) S.scene.style.removeProperty(keys[i]);
    S.tok = null;
  }

  /* ═══════════════ 8. 티어 적용 ═══════════════ */

  function applyQuality() {
    var q = effective();
    var body = D.body;
    if (!body) return;
    S.quality = q;
    body.classList.toggle('fx-high', q === 'high');
    body.classList.toggle('fx-low', q === 'low');
    if (q === 'off') {
      ensureShaft(false); ensureMotes(false);
      body.classList.remove('fx-ready');
      clearTokens();
      sync();
      return;
    }
    ensureShaft(q === 'high');
    ensureMotes(q === 'high' && motesAllowed());
    measureStage();
    applyTokens();
    /* 첫 토큰 쓰기는 트랜지션 없이. 조명은 sceneIn이 시작되기 전에 그냥
       거기 있어야 하고, 그 위에 두 번째 계단식 등장을 얹지 않는다. */
    if (!body.classList.contains('fx-ready')) {
      if (S.readyTimer) clearTimeout(S.readyTimer);
      S.readyTimer = setTimeout(function () {
        S.readyTimer = 0;
        try { if (!S.dead && S.quality !== 'off') D.body.classList.add('fx-ready'); } catch (e) { }
      }, 60);
    }
  }

  function motesAllowed() {
    if (S.forceMotes === 1) return true;
    if (S.forceMotes === -1) return false;
    return !S.capMotes;
  }

  /* 부팅 후 첫 여유에 40프레임 1회 샘플링. 러닝 루프가 아니다 —
     측정이 끝나면 rAF를 즉시 해제하고 세션 내에서 다시 재지 않는다.
     두 단계로 내린다: 먼저 먼지만 끄고(캔버스는 이 모듈에서 유일하게 매
     프레임 새 텍스처를 올리는 비용이다), 그래도 모자라면 티어 자체를 내린다.
     강등은 세션 내에서 되돌리지 않는다 — 깜빡임 방지. */
  function sampleOnce() {
    if (S.dead || S.capLow || S.quality !== 'high') return;
    if (S.rm || S.hidden || !looping()) return;
    var times = [], prev = 0, raf = 0, n = 0;
    function step(ts) {
      if (S.dead || S.hidden) { if (raf) W.cancelAnimationFrame(raf); return; }
      if (prev && n > 16) times.push(ts - prev);   /* 초기 정착 프레임은 버린다 */
      prev = ts;
      if (++n < 76) { raf = W.requestAnimationFrame(step); return; }
      raf = 0;
      times.sort(function (a, b) { return a - b; });
      var med = times[Math.floor(times.length / 2)] || 0;
      var p90 = times[Math.floor(times.length * 0.9)] || 0;
      /* median은 프레임 드롭을 보지 못한다 — 드롭이 3프레임에 1번이면
         중앙값은 여전히 16.7ms다. p90이 그것을 본다. */
      if (med > 20 || p90 > 44) {
        /* 기기 등급 판정이다 — 이것만 저장한다. */
        S.capLow = true; S.capMotes = true; writeCap('low');
        try { applyQuality(); } catch (e) { }
      } else if (p90 > 28 && !S.capMotes) {
        /* 먼지만 내린다. 한 번의 운 나쁜 부팅이 이 기기에서 먼지를 영원히
           없애면 안 되므로 이 판정은 저장하지 않는다 — 이번 세션만이다. */
        S.capMotes = true;
        try { ensureMotes(false); sync(); } catch (e) { }
      }
    }
    raf = W.requestAnimationFrame(step);
  }

  /* ═══════════════ 9. 이벤트 ═══════════════ */

  function bodySig() {
    try {
      var cl = D.body.classList;
      return (cl.contains('night') ? 'n' : '') + (cl.contains('thirsty') ? 't' : '') +
             (cl.contains('holding') ? 'h' : '') + (cl.contains('rm') ? 'r' : '') +
             (cl.contains('hidden') ? 'x' : '');
    } catch (e) { return ''; }
  }

  function onBodyClass() {
    var s = bodySig();
    if (s === S.sig) return;
    S.sig = s;
    try {
      S.rm = D.body.classList.contains('rm');
      S.hidden = !!D.hidden || D.body.classList.contains('hidden');
    } catch (e) { }
    if (S.quality !== 'off') applyTokens(); else sync();
  }

  function onVis() {
    S.hidden = !!D.hidden;
    sync();
  }

  var resizeTimer = 0;
  function onResize() {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resizeTimer = 0;
      if (S.dead || S.quality === 'off') return;
      measureStage();
      sizeCanvas();
      applyTokens();
    }, 180);
  }

  /* ═══════════════ 10. public ═══════════════ */

  var SceneFX = {

    /* 조명 레이어와 .lx-wet을 주입한다. 두 번 불러도 두 번 주입하지 않는다.
       <defs>는 주입하지 않는다 — 이 설계에 SVG 필터는 하나도 없다. 이유는
       파일 머리 주석에 적어 두었다. */
    init: function () {
      try {
        /* destroy()는 종단이 아니다. 그것은 모든 노드·타이머·관찰자·리스너를
           거두어놓으므로 다시 들어오는 것이 안전하다. 재시작 경로가 조용한
           no-op이면 그것이야말로 고치기 어려운 버그다. */
        S.dead = false;
        if (S.inited) return;
        if (!D.body) return;
        S.inited = true;
        if (!supportsBlend()) { S.quality = 'off'; return; }
        if (!injectLayers()) { S.inited = false; return; }

        var cap = readCap();
        S.capLow = cap === 'low';
        S.capMotes = (cap === 'low');
        /* 호스트가 init() 전에 이미 setQuality()로 의사를 밝혔다면 그것이
           이긴다. 저장된 '화면 효과: 꺼요'를 순서 하나로 잃지 않는다. */
        if (!S.wantedSet) S.wanted = pickTier();
        /* 부팅 복원 창: init() 바로 뒤의 applyFx()는 사용자의 새 요청이
           아니라 설정값 복원이므로, 저장된 기기 판정을 지우지 않는다. */
        S.bootQ = true;
        setTimeout(function () { S.bootQ = false; }, 0);
        try {
          S.rm = D.body.classList.contains('rm');
          S.hidden = !!D.hidden || D.body.classList.contains('hidden');
        } catch (e) { }
        S.sig = bodySig();

        S.boundVis = onVis;
        S.boundResize = onResize;
        D.addEventListener('visibilitychange', S.boundVis, false);
        W.addEventListener('resize', S.boundResize, false);
        W.addEventListener('orientationchange', S.boundResize, false);

        /* body의 class만 관찰한다. class 변경은 드물고, 콜백은 토큰 한 벌을
           다시 쓰는 것이 전부다. */
        if (W.MutationObserver) {
          S.mo = new W.MutationObserver(onBodyClass);
          S.mo.observe(D.body, { attributes: true, attributeFilter: ['class'] });
          /* 앉기가 열리고 닫히는 것은 body의 class를 바꾸지 않는다 — CSS는
             :has()로 읽는다. 먼지 루프는 그 동안 멈췄다가 다시 돌아야 하므로
             hidden 속성 하나만 따로 본다. 한 번의 앉기에 콜백 두 번이다. */
          var sit = D.getElementById('sitOverlay');
          if (sit) {
            S.moSit = new W.MutationObserver(function () { try { sync(); } catch (e) { } });
            S.moSit.observe(sit, { attributes: true, attributeFilter: ['hidden'] });
          }
        }

        applyQuality();
      } catch (e) { /* 조명이 없는 게임은 여전히 완전한 게임이다 */ }
    },

    /* 'high' | 'low' | 'off'. off는 오늘의 게임으로 정확히 되돌아간다. */
    setQuality: function (q) {
      try {
        if (S.dead) return;
        if (!RANK.hasOwnProperty(q)) return;
        S.wanted = q; S.wantedSet = true;
        /* 사용자가 명시적으로 high를 다시 요청하면 자동 강등은 풀린다.
           자동 강등은 단 한 번의 60프레임 샘플에서 나오고 sumgyeol.gfx에
           남는다. 나가는 문이 없으면 그것은 판정이 아니라 선고가 된다.
           부팅 직후의 복원 호출(S.bootQ)은 제외한다 — 그것까지 풀면 저장이
           아무것도 아니게 되고, 느린 기기는 매 세션 둘째 초에 한 번씩
           티어가 떨어지는 것을 보게 된다. */
        if (q === 'high' && !S.bootQ && (S.capLow || S.capMotes)) {
          S.capLow = false; S.capMotes = false;
          clearCap();
          /* 방금 명시적으로 청한 것을 1.4초 뒤에 다시 빼앗지 않는다 */
          S.sampled = true;
          if (S.sampleTimer) { clearTimeout(S.sampleTimer); S.sampleTimer = 0; }
        }
        if (!S.inited) return;
        applyQuality();
      } catch (e) { }
    },

    /* { band, nextBand, t, nightness, palette } — updateSky가 계산한 그대로.
       밴드 경계는 별도 이벤트가 아니다: 같은 t로 전부 lerp한다. */
    setTime: function (info) {
      try {
        if (S.dead || !info) return;
        S.info = {
          band: info.band, nextBand: info.nextBand || info.band,
          t: info.t, nightness: info.nightness, palette: info.palette
        };
        if (!S.inited || S.quality === 'off') return;
        applyTokens();
      } catch (e) { }
    },

    /* 'clear' | 'cloud' | 'rain'. 비 오는 날은 빔이 없고 그림자가 흐려진다. */
    setWeather: function (w) {
      try {
        if (S.dead) return;
        if (!WEATHER[w]) return;
        if (S.weather === w) return;
        S.weather = w;
        if (S.inited && S.quality !== 'off') applyTokens();
      } catch (e) { }
    },

    /* 움직임을 줄이는 것이지 빛을 끄는 것이 아니다. 정적 조명은 전부 남고
       샤프트 드리프트와 먼지만 멈춘다. */
    setReducedMotion: function (on) {
      try {
        if (S.dead) return;
        S.rm = !!on;
        sync();
      } catch (e) { }
    },

    /* 'water' | 'stage'.
       'water' — 물이 흙에 닿는 순간의 광택과 접지 무게를 갱신한다.
       'stage' — 창이 밝아지는 연출은 하지 않는다. 노출이 출렁이는 빛 펄스는
       이 게임에서 언제나 과하고, 식물의 기존 1200ms stageUp이 그 순간을
       충분히 옮긴다. high 티어에서 먼지가 아주 잠깐 밝아지는 것이 전부이며,
       먼지가 없으면 조용한 no-op이다. */
    pulse: function (kind) {
      try {
        if (S.dead || S.quality === 'off') return;
        if (kind === 'water') {
          var t = (W.performance && performance.now ? performance.now() : Date.now());
          S.pulseUntil = t + 600;
          S.pulseAmp = 0.35;
          /* 호출자는 이것이 얼마짜리 일을 하는지 알 필요가 없어야 한다.
             물은 100ms마다 떨어지고 --wet-c는 1/255 단위로만 움직인다 —
             60ms보다 짧은 간격의 호출은 어차피 같은 값을 다시 계산할 뿐이다. */
          if (t - S.wetAt < 60) return;
          S.wetAt = t;
          applyTokens();
        } else if (kind === 'stage') {
          S.pulseUntil = (W.performance && performance.now ? performance.now() : Date.now()) + 900;
          S.pulseAmp = 0.55;
          sync();
        }
      } catch (e) { }
    },

    destroy: function () {
      try {
        S.dead = true;
        stopLoop();
        if (S.readyTimer) { clearTimeout(S.readyTimer); S.readyTimer = 0; }
        if (S.sampleTimer) { clearTimeout(S.sampleTimer); S.sampleTimer = 0; }
        if (S.mo) { S.mo.disconnect(); S.mo = null; }
        if (S.moSit) { S.moSit.disconnect(); S.moSit = null; }
        if (S.boundVis) D.removeEventListener('visibilitychange', S.boundVis, false);
        if (S.boundResize) {
          W.removeEventListener('resize', S.boundResize, false);
          W.removeEventListener('orientationchange', S.boundResize, false);
        }
        ensureMotes(false); ensureShaft(false);
        clearTokens();
        var i, nodes = [S.lx, S.lxg, S.wet];
        for (i = 0; i < nodes.length; i++) if (nodes[i] && nodes[i].parentNode) nodes[i].parentNode.removeChild(nodes[i]);
        S.lx = S.lxg = S.wet = null;
        if (D.body) {
          D.body.classList.remove('fx-high');
          D.body.classList.remove('fx-low');
          D.body.classList.remove('fx-ready');
        }
        S.inited = false; S.quality = 'off'; S.tok = null;
      } catch (e) { }
    },

    /* QA 전용. 세 티어를 다 스크린샷하고 루프가 실제로 멎는지 세기 위한 것.
       __debug('motes-on' | 'motes-off')로 적응형 강등을 덮어쓴다. */
    __debug: function (cmd) {
      try {
        if (cmd === 'motes-on') { S.forceMotes = 1; ensureMotes(S.quality === 'high'); applyTokens(); }
        else if (cmd === 'motes-off') { S.forceMotes = -1; ensureMotes(false); sync(); }
        else if (cmd === 'motes-auto') { S.forceMotes = 0; ensureMotes(S.quality === 'high' && motesAllowed()); applyTokens(); }
      } catch (e) { }
      return {
        quality: S.quality, wanted: S.wanted, capLow: S.capLow, capMotes: S.capMotes,
        rm: S.rm, hidden: S.hidden, weather: S.weather,
        running: looping(), frames: S.frames, motes: S.motes.length,
        shaftO: S.shaftO, stageH: S.stageH,
        canvas: S.canvas ? [S.canvas.width, S.canvas.height] : null
      };
    }
  };

  W.SceneFX = SceneFX;
})();
