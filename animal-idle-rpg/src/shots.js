/*!
 * WL.Shots — 픽셀 투사체·슬래시·타격 스파크 (DOM 풀, transform/opacity 만 씀)
 * fire(kind, x0, y0, x1, y1, onHit)  kind: claw|feather|fire|water|ink|bite|stomp|burst
 */
(function () {
'use strict';
var W = (window.WL = window.WL || {});
var CSS_ID = 'wl-shots-css';
function css() {
  if (document.getElementById(CSS_ID)) return;
  var st = document.createElement('style'); st.id = CSS_ID;
  st.textContent =
    '.wl-shot{position:absolute;left:0;top:0;width:12px;height:12px;pointer-events:none;opacity:0;image-rendering:pixelated;will-change:transform}' +
    '.wl-shot canvas{display:block;width:100%;height:100%;image-rendering:pixelated}' +
    '.wl-shot.go{transition:transform var(--d,.26s) linear,opacity .12s ease-out;opacity:1}' +
    '.wl-shot.hit{transition:transform .22s ease-out,opacity .22s ease-out;opacity:0}';
  document.head.appendChild(st);
}
/* 8×8 픽셀 스프라이트 */
var ART = {
  claw:    ['.......w','......ww','.....ww.','....ww..','...ww...','..ww....','.ww.....','w.......'],
  feather: ['....oo..','...offo.','..offfo.','..offo..','.offo...','.ofo....','oo......','........'],
  fire:    ['...rr...','..ryyr..','.ryyyyr.','.rywwyr.','.ryyyyr.','..ryyr..','...rr...','........'],
  water:   ['...b....','..bbb...','.bbbwb..','.bbbbb..','.bbbbb..','..bbb...','........','........'],
  ink:     ['..kkk...','.kkkkk..','kkkkkkk.','.kkkkk..','..kkk...','...k....','........','........'],
  bite:    ['w.w.w.w.','w.w.w.w.','........','........','.w.w.w.w','.w.w.w.w','........','........'],
  stomp:   ['........','........','..oooo..','.oooooo.','oooooooo','.oooooo.','..oooo..','........'],
  burst:   ['...y....','.y.y.y..','..yyy...','yyywyyy.','..yyy...','.y.y.y..','...y....','........'],
};
var COL = { w:'#FFFFFF', o:'#3B2A1A', f:'#EADFC8', r:'#C1391A', y:'#FFD36B', b:'#5FA8E8', k:'#2A1E3A' };
var sprites = {};
function sprite(kind) {
  if (sprites[kind]) return sprites[kind];
  var cv = document.createElement('canvas'); cv.width = cv.height = 8;
  var c = cv.getContext('2d'), rows = ART[kind] || ART.burst;
  for (var y = 0; y < 8; y++) for (var x = 0; x < 8; x++) { var ch = rows[y][x]; if (ch && ch !== '.') { c.fillStyle = COL[ch] || '#fff'; c.fillRect(x, y, 1, 1); } }
  sprites[kind] = cv; return cv;
}
var pool = [], host = null, N = 14;
function mount(el) {
  css(); host = el;
  for (var i = 0; i < N; i++) { var d = document.createElement('div'); d.className = 'wl-shot'; host.appendChild(d); pool.push({ el: d, busy: false, t: 0 }); }
}
function grab() { for (var i = 0; i < pool.length; i++) if (!pool[i].busy) return pool[i]; return null; }
function fire(kind, x0, y0, x1, y1, onHit, opt) {
  if (!host) { if (onHit) onHit(); return; }
  var p = grab(); if (!p) { if (onHit) onHit(); return; }
  opt = opt || {};
  var sz = opt.size || 14, dur = opt.dur || (kind === 'stomp' || kind === 'bite' ? 0.12 : 0.26);
  p.busy = true;
  var el = p.el;
  el.innerHTML = ''; el.appendChild(sprite(kind).cloneNode ? cloneCanvas(sprite(kind)) : sprite(kind));
  el.style.width = el.style.height = sz + 'px';
  el.style.setProperty('--d', dur + 's');
  el.className = 'wl-shot';
  var ang = Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI;
  var rot = kind === 'claw' ? 0 : kind === 'feather' ? (ang + 30) : ang;
  var sx = (kind === 'stomp' || kind === 'bite') ? x1 : x0, sy = (kind === 'stomp' || kind === 'bite') ? y1 : y0;
  el.style.transform = 'translate(' + (sx - sz / 2) + 'px,' + (sy - sz / 2) + 'px) rotate(' + rot + 'deg) scale(' + (kind === 'stomp' ? .4 : 1) + ')';
  void el.offsetWidth;
  el.classList.add('go');
  el.style.transform = 'translate(' + (x1 - sz / 2) + 'px,' + (y1 - sz / 2) + 'px) rotate(' + rot + 'deg) scale(' + (kind === 'stomp' ? 1.8 : 1) + ')';
  setTimeout(function () {
    if (onHit) onHit();
    el.classList.add('hit');
    el.style.transform = 'translate(' + (x1 - sz / 2) + 'px,' + (y1 - sz / 2 - 8) + 'px) rotate(' + rot + 'deg) scale(1.5)';
    setTimeout(function () { el.className = 'wl-shot'; p.busy = false; }, 230);
  }, dur * 1000);
}
function cloneCanvas(src) { var c = document.createElement('canvas'); c.width = src.width; c.height = src.height; c.getContext('2d').drawImage(src, 0, 0); return c; }
function burst(x, y, n) {
  n = n || 3;
  for (var i = 0; i < n; i++) {
    var a = Math.random() * Math.PI * 2, r = 10 + Math.random() * 16;
    fire('burst', x, y, x + Math.cos(a) * r, y + Math.sin(a) * r - 6, null, { size: 10, dur: 0.18 });
  }
}
W.Shots = { mount: mount, fire: fire, burst: burst };
})();
