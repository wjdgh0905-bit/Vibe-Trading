/*!
 * WL.PixScene — 절차 생성 픽셀아트 무대 (DOM + 정적 PNG 레이어)
 * 캔버스는 지역이 바뀔 때 한 번만 그려서 data-URL 로 굽는다. 매 프레임 그리는 것은 없다.
 * 움직이는 것은 구름 한 겹(transform 키프레임)뿐 → 아이폰에서도 안전.
 *
 * API: WL.DayScene 과 동일 (mount / setBiome / setMood / shake / flash / slots / groundY / size / dispose …)
 */
(function () {
'use strict';
var W = (window.WL = window.WL || {});
var TW = 288, TH = 144;          /* 타일 픽셀 크기 (가로 반복) */
var HZ = 0.72;                   /* 지평선 = 높이의 72% */

/* ── 지역 팔레트 ─────────────────────────────────────────────────────── */
var B = [
  { n:'이끼 낀 숲',  t:'morning', sky:['#7FB3D5','#A9D2E6','#D4E7E6','#EEF2DE'], sun:{x:.2,y:.24,r:9,c:'#FFF6D0',g:'#FFE9A8'},
    far:'#7EA894', mid:'#4E7F62', tree:'pine', treeC:['#3F6E4E','#2F5A3D'], gr:['#7BA557','#5F8B44','#8FB868'], fg:'#4A7238', acc:['#F2E85C','#F0A5B4'], fog:.14 },
  { n:'바람의 초원', t:'noon', sky:['#4C9BE8','#6FB6F0','#A7D6F7','#E6F3FB'], sun:{x:.78,y:.16,r:8,c:'#FFFCE6',g:'#FFF3B0'},
    far:'#8CBF98', mid:'#69A86C', tree:'round', treeC:['#4E9450','#3A7A3E'], gr:['#8FC763','#6FAA4C','#A7D97A'], fg:'#5E9542', acc:['#FFFFFF','#FFD64F'], fog:.06 },
  { n:'서리 설원',   t:'overcast', sky:['#A8BDD0','#C4D4E2','#DEE8F0','#F2F6FA'], sun:{x:.62,y:.2,r:7,c:'#FFFFFF',g:'#E6EEF6'},
    far:'#B7C8D8', mid:'#8EA6BB', tree:'snowpine', treeC:['#4E6E7E','#3B5666'], gr:['#EEF3F8','#D5E0EA','#FFFFFF'], fg:'#C4D2DF', acc:['#9CC7E8','#FFFFFF'], fog:.22 },
  { n:'모래 사막',   t:'dusk', sky:['#C95A4E','#E58A5A','#F2B67A','#F8D9A6'], sun:{x:.8,y:.5,r:13,c:'#FFD27A',g:'#FFAE5A'},
    far:'#B97A55', mid:'#8E5A3E', tree:'cactus', treeC:['#5E8A4E','#436A3A'], gr:['#E3B87A','#C9985B','#F0CC90'], fg:'#B8884E', acc:['#8E5A3E','#F0CC90'], fog:.12 },
  { n:'심해 해구',   t:'sea', sky:['#0D3F6B','#155A8C','#1F73AA','#2B88BF'], sun:{x:.4,y:.05,r:0,c:'#CDEBFF',g:'#8FCBEF'},
    far:'#1B5A85', mid:'#164C72', tree:'kelp', treeC:['#2F8A6A','#226B52'], gr:['#3E6E86','#2F566B','#4E809A'], fg:'#274757', acc:['#F27A9B','#FFD36B'], fog:.18 },
  { n:'울창한 정글', t:'noon', sky:['#57A7C9','#8BCBDD','#C0E4E4','#E3F2DE'], sun:{x:.3,y:.14,r:8,c:'#FFF8D6',g:'#FFF0A8'},
    far:'#4C8F63', mid:'#2F6E45', tree:'palm', treeC:['#2E7A3E','#20602E'], gr:['#5FA24C','#43813A','#7BBB62'], fg:'#356A2E', acc:['#F25C7A','#FFB040'], fog:.10 },
  { n:'화산 지대',   t:'dusk', sky:['#3A1418','#7A2A24','#C4522E','#E8884A'], sun:{x:.2,y:.46,r:11,c:'#FF9A5A',g:'#FF6A3A'},
    far:'#5A2B2A', mid:'#3E1F1E', tree:'dead', treeC:['#2A1514','#1C0E0E'], gr:['#5E4038','#43302B','#75514A'], fg:'#2E1F1C', acc:['#FF6A2A','#FFC24A'], fog:.14 },
  { n:'하늘 절벽',   t:'dawn', sky:['#7C6FB8','#C58EC0','#F3B8C4','#FDE4CF'], sun:{x:.66,y:.34,r:10,c:'#FFF4E8',g:'#FFCFB0'},
    far:'#A493C9', mid:'#7E6EA8', tree:'round', treeC:['#6A5A96','#544678'], gr:['#B4A5C8','#948499','#C9BCD9'], fg:'#7D6E92', acc:['#FFFFFF','#F7C5D9'], fog:.16 },
  { n:'고대 습지',   t:'mist', sky:['#8FA79B','#B4C6B6','#D2DFCF','#E7EDE0'], sun:{x:.5,y:.2,r:7,c:'#FFFCEC',g:'#EDEFD8'},
    far:'#7F9C86', mid:'#5A7A64', tree:'willow', treeC:['#4A6E52','#365640'], gr:['#7E9A6C','#61794F','#93AE7E'], fg:'#4B5F3E', acc:['#C9DE7A','#E8E2A0'], fog:.28 },
  { n:'별빛 심연',   t:'night', sky:['#0B0E2C','#1B1E52','#312A6E','#4A3A82'], sun:{x:.78,y:.18,r:6,c:'#F2ECFF',g:'#B9A9F0'},
    far:'#2B2A66', mid:'#1F1E4E', tree:'crystal', treeC:['#7A6CD8','#5C4EB8'], gr:['#3B3872','#2A2856','#4D4A8C'], fg:'#1F1D42', acc:['#9CE0FF','#F5D5FF'], fog:.10 },
];
var MOODS = { normal:0, boss:.34, victory:0, defeat:.5 };
var ROWS = {
  front:{ x0:.44, x1:.60, y:0,     s:1.00, z:3 },
  back: { x0:.30, x1:.44, y:-.060, s:0.86, z:2 },
  air:  { x0:.30, x1:.58, y:-.246, s:0.80, z:1 },
  foe:  { x0:.81, x1:.81, y:0,     s:1.00, z:4 },
};

/* ── 래스터 버퍼 ────────────────────────────────────────────────────── */
function hex(h) { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
function dark(c, t) { return mix(c, [14, 12, 24], t); }
function light(c, t) { return mix(c, [255, 250, 235], t); }
function Rng(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s % 10000) / 10000; }; }

function Buf(w, h) {
  this.w = w; this.h = h; this.d = new Uint8ClampedArray(w * h * 4);
}
Buf.prototype.px = function (x, y, c, a) {
  x |= 0; y |= 0; if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
  var i = (y * this.w + x) * 4, d = this.d;
  if (a === undefined || a >= 1) { d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255; return; }
  var pa = d[i + 3] / 255, na = a + pa * (1 - a);
  if (na <= 0) return;
  d[i] = (c[0] * a + d[i] * pa * (1 - a)) / na; d[i + 1] = (c[1] * a + d[i + 1] * pa * (1 - a)) / na; d[i + 2] = (c[2] * a + d[i + 2] * pa * (1 - a)) / na; d[i + 3] = na * 255;
};
Buf.prototype.rect = function (x, y, w, h, c, a) { for (var yy = y; yy < y + h; yy++) for (var xx = x; xx < x + w; xx++) this.px(xx, yy, c, a); };
/* 체커 디더: 두 색을 섞는 대신 격자로 번갈아 찍는다 — 픽셀아트의 그라데이션 */
Buf.prototype.dither = function (x, y, w, h, c1, c2) { for (var yy = y; yy < y + h; yy++) for (var xx = x; xx < x + w; xx++) this.px(xx, yy, ((xx + yy) & 1) ? c1 : c2); };
Buf.prototype.disc = function (cx, cy, r, c, a) { for (var yy = -r; yy <= r; yy++) for (var xx = -r; xx <= r; xx++) if (xx * xx + yy * yy <= r * r + r * 0.5) this.px(cx + xx, cy + yy, c, a); };
Buf.prototype.url = function () {
  var cv = document.createElement('canvas'); cv.width = this.w; cv.height = this.h;
  var ctx = cv.getContext('2d'), im = ctx.createImageData(this.w, this.h);
  im.data.set(this.d); ctx.putImageData(im, 0, 0);
  var u = cv.toDataURL('image/png'); cv.width = cv.height = 0; return u;
};

/* ── 하늘 ── */
function drawSky(b, rng) {
  var g = new Buf(TW, TH), cols = b.sky.map(hex), H = Math.round(TH * HZ);
  var n = cols.length - 1, bandH = H / n;
  for (var y = 0; y < TH; y++) {
    var t = Math.min(n - 1e-6, y / bandH), i = Math.floor(t), f = t - i;
    var c = i >= n ? cols[n] : cols[i], c2 = cols[Math.min(n, i + 1)];
    for (var x = 0; x < TW; x++) {
      /* 밴드 경계 근처만 디더 → 부드러운 하늘 */
      var use = (f > 0.62 && ((x + y) & 1)) ? c2 : (f > 0.86 ? c2 : c);
      g.px(x, y, y >= H ? cols[n] : use);
    }
  }
  if (b.t === 'night') {
    for (var s = 0; s < 46; s++) { var sx = rng() * TW, sy = rng() * H * 0.9, br = rng();
      g.px(sx, sy, br > .7 ? [255, 255, 255] : [190, 200, 255], .5 + br * .5); if (br > .85) { g.px(sx + 1, sy, [255, 255, 255], .35); g.px(sx, sy + 1, [255, 255, 255], .35); } }
  }
  var S = b.sun, cx = Math.round(S.x * TW), cy = Math.round(S.y * TH), sc = hex(S.c), sg = hex(S.g);
  if (b.t === 'sea') {
    /* 빛기둥 */
    for (var k = 0; k < 5; k++) { var bx = 30 + k * 58 + rng() * 20, bw = 8 + rng() * 10;
      for (var yy = 0; yy < H; yy++) for (var xx = 0; xx < bw; xx++) g.px(bx + xx + yy * 0.18, yy, sg, 0.16 * (1 - yy / H) * (xx > 1 && xx < bw - 2 ? 1 : .5)); }
    for (var bb = 0; bb < 30; bb++) g.px(rng() * TW, rng() * TH, [220, 240, 255], .35);
  } else if (S.r > 0) {
    g.disc(cx, cy, S.r + 6, sg, .18); g.disc(cx, cy, S.r + 3, sg, .30); g.disc(cx, cy, S.r, sc);
    if (b.t === 'night') { g.disc(cx + 3, cy - 2, S.r - 1, cols[0], 1); }   /* 초승달 */
    else g.disc(cx - S.r * .3, cy - S.r * .3, Math.max(1, S.r * .45), light(sc, .5), .8);
  }
  /* 지평선 안개 */
  var fogc = light(cols[n], .35);
  for (var fy = H - 16; fy < H; fy++) g.rect(0, fy, TW, 1, fogc, b.fog * (fy - (H - 16)) / 16);
  return g.url();
}

/* ── 원경 산 ── */
function drawFar(b, rng) {
  var g = new Buf(TW, TH), H = Math.round(TH * HZ), c = hex(b.far), snow = b.t === 'overcast' || b.n === '하늘 절벽';
  var cd = dark(c, .18), cl = light(c, .18);
  var prof = [];
  for (var x = 0; x < TW; x++) prof[x] = 0;
  var peaks = 5 + Math.floor(rng() * 2);
  for (var p = 0; p < peaks; p++) {
    var px = (p / peaks + rng() * 0.12) * TW, pw = 34 + rng() * 34, ph = (b.t === 'sea' ? 22 : 30) + rng() * 30;
    for (var x2 = 0; x2 < TW; x2++) { var dxx = Math.abs(((x2 - px + TW * 1.5) % TW) - TW * .5); var hh = Math.max(0, ph * (1 - dxx / pw)); prof[x2] = Math.max(prof[x2], hh); }
  }
  /* 능선을 살짝 울퉁불퉁하게, 그러나 세로줄은 생기지 않게 — 저주파 노이즈 */
  var wob = [], acc = 0; for (var w0 = 0; w0 < TW; w0++) { if (w0 % 6 === 0) acc = (rng() - .5) * 3; wob[w0] = acc; }
  for (var w1 = 0; w1 < TW; w1++) if (prof[w1] > 4) prof[w1] += wob[w1];
  for (var x3 = 0; x3 < TW; x3++) {
    var top = H - Math.round(prof[x3]);
    var slope = prof[(x3 + 3) % TW] - prof[(x3 + TW - 3) % TW];
    for (var y = top; y < H; y++) {
      var lit = slope > 0.6;
      var col = lit ? cl : c;
      if (y - top < 2 && prof[x3] > 6) col = snow ? [245, 248, 252] : cl;
      else if (snow && y - top < 6 && prof[x3] > 24) col = ((x3 + y) & 1) ? [245, 248, 252] : cl;
      if (y > H - 6) col = ((x3 + y) & 1) ? col : cd;
      g.px(x3, y, col);
    }
  }
  if (b.n === '화산 지대') { /* 용암 줄기 */
    for (var l = 0; l < 4; l++) { var lx = rng() * TW, ly = H - prof[Math.floor(lx)] + 2; for (var k = 0; k < 14; k++) { g.px(lx + (rng() - .5) * 2, ly + k, k < 4 ? [255, 200, 90] : [255, 110, 50]); } }
  }
  return g.url();
}

/* ── 중경 언덕 + 나무 ── */
function tree(g, x, base, type, C, rng) {
  var c0 = hex(C[0]), c1 = hex(C[1]), tr = [74, 50, 32], hi = light(c0, .22);
  var h;
  if (type === 'pine' || type === 'snowpine') {
    h = 12 + Math.floor(rng() * 8);
    g.rect(x, base - 3, 2, 3, tr);
    for (var y = 0; y < h; y++) { var w = Math.max(1, Math.round((y / h) * 6)); g.rect(x - w + 1, base - 3 - h + y, w * 2, 1, (y % 4 === 0) ? c1 : c0); if (type === 'snowpine' && y % 4 === 1) g.rect(x - w + 1, base - 3 - h + y, w, 1, [240, 246, 252]); }
    g.px(x, base - 3 - h, hi);
  } else if (type === 'round') {
    h = 8 + Math.floor(rng() * 6);
    g.rect(x, base - h + 3, 2, h - 3, tr);
    g.disc(x + 1, base - h, 5 + Math.floor(rng() * 3), c0); g.disc(x - 1, base - h - 2, 3, hi, .55); g.disc(x + 3, base - h + 2, 3, c1, .8);
  } else if (type === 'palm') {
    h = 16 + Math.floor(rng() * 8);
    for (var yy = 0; yy < h; yy++) g.px(x + Math.round(yy * 0.12), base - yy, (yy & 3) ? tr : light(tr, .25));
    var tx = x + Math.round(h * 0.12), ty = base - h;
    for (var d = -1; d <= 1; d += 2) for (var k = 0; k < 7; k++) { g.px(tx + d * k, ty + Math.round(k * k * 0.12), k < 2 ? hi : c0); g.px(tx + d * k, ty + 1 + Math.round(k * k * 0.12), c1); }
    g.rect(tx - 1, ty - 1, 3, 2, c0);
  } else if (type === 'cactus') {
    h = 8 + Math.floor(rng() * 6);
    g.rect(x, base - h, 3, h, c0); g.rect(x, base - h, 1, h, hi);
    g.rect(x - 3, base - h + 3, 2, 4, c0); g.rect(x - 3, base - h + 3, 3, 1, c0);
    g.rect(x + 4, base - h + 5, 2, 3, c1); g.rect(x + 3, base - h + 5, 3, 1, c1);
  } else if (type === 'dead') {
    h = 10 + Math.floor(rng() * 8);
    g.rect(x, base - h, 2, h, c0); g.rect(x - 3, base - h + 3, 4, 1, c0); g.rect(x - 3, base - h + 1, 1, 3, c0); g.rect(x + 2, base - h + 5, 4, 1, c0); g.rect(x + 5, base - h + 3, 1, 3, c0);
  } else if (type === 'kelp') {
    h = 14 + Math.floor(rng() * 12);
    for (var y2 = 0; y2 < h; y2++) { var sx = x + Math.round(Math.sin(y2 * 0.55) * 1.6); g.px(sx, base - y2, (y2 & 1) ? c0 : c1); if (y2 % 3 === 0) g.px(sx + 1, base - y2, hi); }
  } else if (type === 'willow') {
    h = 12 + Math.floor(rng() * 6);
    g.rect(x, base - h + 4, 2, h - 4, tr);
    g.disc(x + 1, base - h + 1, 6, c0); for (var s = -6; s <= 6; s += 2) g.rect(x + 1 + s, base - h + 3, 1, 5 + (s & 2), c1);
  } else if (type === 'crystal') {
    h = 8 + Math.floor(rng() * 10);
    for (var y3 = 0; y3 < h; y3++) { var w2 = Math.max(1, Math.round((y3 / h) * 3)); g.rect(x - w2 + 1, base - h + y3, w2 * 2 - 1, 1, (y3 & 1) ? c0 : c1); g.px(x - w2 + 1, base - h + y3, hi); }
    g.px(x, base - h - 1, [235, 240, 255]);
  }
}
function drawMid(b, rng) {
  var g = new Buf(TW, TH), H = Math.round(TH * HZ), c = hex(b.mid), cd = dark(c, .2), cl = light(c, .1);
  var prof = [];
  for (var x = 0; x < TW; x++) prof[x] = 0;
  var hills = 4;
  for (var p = 0; p < hills; p++) { var px = (p / hills + rng() * 0.2) * TW, pw = 46 + rng() * 40, ph = 8 + rng() * 10;
    for (var x2 = 0; x2 < TW; x2++) { var d = Math.abs(((x2 - px + TW * 1.5) % TW) - TW * .5); prof[x2] = Math.max(prof[x2], ph * Math.max(0, 1 - (d / pw) * (d / pw))); } }
  var treeY = [];
  for (var x3 = 0; x3 < TW; x3++) { var top = H - Math.round(prof[x3]); treeY[x3] = top; for (var y = top; y < H; y++) g.px(x3, y, y === top ? cl : (y > H - 4 && ((x3 + y) & 1)) ? cd : c); }
  var n = 14 + Math.floor(rng() * 6), ttype = b.tree;
  for (var t = 0; t < n; t++) { var tx = Math.floor(rng() * TW); tree(g, tx, treeY[tx] + 1 + Math.floor(rng() * 3), ttype, b.treeC, rng); }
  return g.url();
}

/* ── 지면 ── */
function drawGround(b, rng) {
  var g = new Buf(TW, TH), H = Math.round(TH * HZ), G = b.gr.map(hex), acc = b.acc.map(hex), fg = hex(b.fg);
  var base = G[0], dk = G[1], lt = G[2];
  for (var y = H; y < TH; y++) {
    var t = (y - H) / (TH - H);
    for (var x = 0; x < TW; x++) {
      var col = base;
      if (y === H) col = lt;
      else if (t > 0.55 && ((x + y) & 1)) col = dk;            /* 아래로 갈수록 어둡게 */
      else if (t > 0.82) col = dk;
      if (b.t === 'sea' && ((x * 7 + y * 3) % 23 === 0)) col = lt;   /* 모래 반짝 */
      g.px(x, y, col);
    }
  }
  /* 길 — 밝은 띠 */
  var py = H + 5 + Math.round((TH - H) * .12);
  g.dither(0, py, TW, 3, lt, base);
  /* 풀 뭉치·꽃·돌 */
  var n = 60;
  for (var i = 0; i < n; i++) {
    var x0 = Math.floor(rng() * TW), y0 = H + 1 + Math.floor(rng() * (TH - H - 6)), r = rng();
    if (b.t === 'sea') { if (r < .3) { g.px(x0, y0, acc[0]); g.px(x0 + 1, y0, acc[0]); g.px(x0, y0 - 1, acc[1]); } else if (r < .5) { g.rect(x0, y0, 3, 2, dark(base, .25)); } else { g.px(x0, y0, lt); } continue; }
    if (b.t === 'overcast') { if (r < .5) { g.px(x0, y0, dark(base, .08)); g.px(x0 + 1, y0 - 1, dark(base, .06)); } else { g.rect(x0, y0, 2, 1, acc[0]); } continue; }
    if (r < .5) { g.px(x0, y0, dk); g.px(x0 + 1, y0 - 1, dk); g.px(x0 + 2, y0, dk); }                    /* 풀 */
    else if (r < .7) { g.px(x0, y0, acc[i & 1]); g.px(x0, y0 + 1, dk); }                                   /* 꽃 */
    else if (r < .8) { g.rect(x0, y0, 3, 2, dark(base, .3)); g.px(x0, y0, light(base, .1)); }             /* 돌 */
    else { g.px(x0, y0, lt); }
  }
  if (b.n === '화산 지대') for (var k = 0; k < 6; k++) { var lx = rng() * TW, ly = H + 6 + rng() * (TH - H - 10); for (var m = 0; m < 8; m++) { lx += rng() > .5 ? 1 : -1; g.px(lx, ly + m, m & 1 ? [255, 120, 50] : [255, 200, 90]); } }
  /* 전경 — 화면 아래 어두운 풀띠 */
  var fh = 10;
  for (var y2 = TH - fh; y2 < TH; y2++) for (var x2 = 0; x2 < TW; x2++) { var top = TH - fh + ((x2 * 5) % 4); if (y2 >= top) g.px(x2, y2, ((x2 + y2) & 1) && y2 === top ? light(fg, .12) : fg); }
  for (var q = 0; q < 26; q++) { var qx = Math.floor(rng() * TW), qh = 3 + Math.floor(rng() * 5); for (var qy = 0; qy < qh; qy++) g.px(qx + (qy > qh - 2 ? 1 : 0), TH - fh - qy, fg); }
  return g.url();
}

/* ── 구름 (투명 타일) ── */
function drawClouds(b, rng) {
  var g = new Buf(TW, TH);
  if (b.t === 'sea') { for (var i = 0; i < 18; i++) { var bx = rng() * TW, by = rng() * TH * .8, r = rng() > .6 ? 2 : 1; g.disc(bx, by, r, [220, 240, 255], .45); g.px(bx - 1, by - 1, [255, 255, 255], .6); } return g.url(); }
  if (b.t === 'night') { for (var s = 0; s < 3; s++) { var sx = rng() * TW, sy = 10 + rng() * 40; for (var k = 0; k < 6; k++) g.px(sx + k, sy + k * .5, [255, 255, 255], .9 - k * .14); } return g.url(); }
  var cw = mix([255, 255, 255], hex(b.sun.g), b.t === 'dusk' || b.t === 'dawn' ? .35 : .08), cs = mix(cw, hex(b.sky[1]), .45), n = 4;
  for (var c = 0; c < n; c++) {
    var x0 = c * (TW / n) + rng() * 30, y0 = 8 + rng() * 34, w = 22 + rng() * 26, h = 6 + rng() * 5;
    for (var p = 0; p < 4; p++) { var px = x0 + rng() * w, py = y0 + rng() * h * .5, pr = 3 + Math.round(rng() * 4); g.disc(px, py, pr, cw, .95); g.rect(px - pr, py + 1, pr * 2 + 1, pr, cw, .95); }
    for (var yy = y0 + h * .5; yy < y0 + h + 4; yy++) for (var xx = x0 - 2; xx < x0 + w + 6; xx++) { var i2 = ((yy | 0) * TW + (xx | 0)) * 4; if (g.d[i2 + 3] > 0 && yy > y0 + h * .6) g.px(xx, yy, cs, .5); }
  }
  return g.url();
}

/* ── DOM ── */
var CSS_ID = 'wl-ps-css';
function css() {
  if (document.getElementById(CSS_ID)) return;
  var st = document.createElement('style'); st.id = CSS_ID;
  st.textContent =
    '.wl-ds{position:relative;overflow:hidden;background:#1a2230}' +
    '.ds-world{position:absolute;inset:0;transition:opacity .9s ease}' +
    '.ds-l{position:absolute;left:0;top:0;bottom:0;width:100%;background-repeat:repeat-x;background-size:auto 100%;background-position:0 0;image-rendering:-webkit-optimize-contrast;image-rendering:pixelated;image-rendering:crisp-edges;pointer-events:none}' +
    '.ds-cl{width:200%;background-repeat:repeat-x;animation:dsDrift 140s linear infinite}' +
    '@keyframes dsDrift{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}' +
    '.ds-mob{position:absolute;inset:0;z-index:5;pointer-events:none}' +
    '.ds-mob.shk{animation:dsShake .34s ease-out}' +
    '@keyframes dsShake{0%{transform:translate(0,0)}20%{transform:translate(-4px,2px)}40%{transform:translate(3px,-2px)}60%{transform:translate(-2px,1px)}80%{transform:translate(1px,0)}100%{transform:none}}' +
    '.ds-tint{position:absolute;inset:0;z-index:6;pointer-events:none;background:#3a1410;opacity:0;transition:opacity .5s ease}' +
    '.ds-flash{position:absolute;inset:0;z-index:7;pointer-events:none;opacity:0}' +
    '.ds-vig{position:absolute;inset:0;z-index:4;pointer-events:none;background:linear-gradient(180deg,rgba(8,10,18,.34) 0%,rgba(8,10,18,0) 24%,rgba(8,10,18,0) 70%,rgba(8,10,18,.5) 100%)}' +
    '.wl-ds.paused .ds-cl{animation-play-state:paused}' +
    '@media (prefers-reduced-motion:reduce){.ds-cl{animation:none}}';
  document.head.appendChild(st);
}
function el(cls, parent) { var d = document.createElement('div'); d.className = cls; if (parent) parent.appendChild(d); return d; }
var CACHE = {};
function urls(i) {
  if (CACHE[i]) return CACHE[i];
  var b = B[i], rng = Rng(1234 + i * 977);
  var u = { sky: drawSky(b, rng), far: drawFar(b, rng), mid: drawMid(b, rng), gr: drawGround(b, rng), cl: drawClouds(b, rng) };
  CACHE[i] = u; return u;
}
function buildWorld(i) {
  var u = urls(i), w = el('ds-world');
  ['sky', 'far', 'mid'].forEach(function (k) { var l = el('ds-l ' + k, w); l.style.backgroundImage = 'url(' + u[k] + ')'; });
  var cl = el('ds-l ds-cl', w); cl.style.backgroundImage = 'url(' + u.cl + ')';
  var gr = el('ds-l gr', w); gr.style.backgroundImage = 'url(' + u.gr + ')';
  el('ds-vig', w);
  return w;
}

function Stage(host, opts) {
  css();
  host.classList.add('wl-ds');
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  var S = {}, bi = Math.max(0, Math.min(B.length - 1, (opts && opts.biome) | 0));
  var world = buildWorld(bi); host.appendChild(world);
  var mob = el('ds-mob', host), tint = el('ds-tint', host), flash = el('ds-flash', host);
  var Wd = 0, Ht = 0, gY = 0, t0 = performance.now();
  function measure() { var r = host.getBoundingClientRect(); Wd = r.width || 1; Ht = r.height || 1; gY = Math.round(Ht * HZ); }
  measure();
  var ro = window.ResizeObserver ? new ResizeObserver(measure) : null;
  if (ro) ro.observe(host);

  S.host = host; S.mob = mob; S.bg = null; S.fg = null;
  S.setBiome = function (i) {
    i = Math.max(0, Math.min(B.length - 1, i | 0));
    if (i === bi) return S;
    bi = i;
    var nw = buildWorld(i); nw.style.opacity = '0';
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
W.PixScene = W.DayScene = {
  BIOMES: B.map(function (b) { return b.n; }),
  TIME: B.map(function (b) { return b.t; }),
  urls: urls,
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
