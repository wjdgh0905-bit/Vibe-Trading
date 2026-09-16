/* plants.js — 숨결 화분 · SVG plant generator (window.Plants)
   Plain browser script, no dependencies. Draws 5 species × 6 stages into a given <g>
   (viewBox 0 0 200 260, soil anchor A = (100,196)), with continuous within-stage growth by t,
   deterministic jitter per seed (mulberry32), and small self-contained FX.

   Rendering model
   - Children are built ONCE per (plantId, stage); the key is stored in data-key on the group.
     Re-renders with the same key only rewrite transforms / path d / opacity (no node churn).
   - Every element that grows carries data-appear and is positioned with a CSS transform
     "translate(x,y) rotate(a) scale(s)" about its own local origin (0 0), which is the
     attachment point of every unit shape (all shapes are drawn tip-up from (0,0)).
     CSS may add: #plant [data-appear]{transition:transform 2s var(--ease),opacity 2s var(--ease)}
   - Sway groups (.sway) carry no transform of their own; their transform-origin is written
     inline (px, view-box) at the leaf attachment, so a CSS rotate() animation swings the leaf.
   - The root child group has class "breath" (origin must be 100px 196px in CSS).
*/
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var AX = 100, AY = 196;                         // soil anchor A
  var EASE = 'cubic-bezier(.33,0,.2,1)';

  // Token hexes (spec §6.1). Written as presentation attributes so CSS can still override
  // (e.g. #plant.thirsty .leaf { fill: … }).
  var C = {
    leafLight: '#9CC5A1', leafMid: '#6FA37A', leafDeep: '#4F7F5C',
    pot: '#D9A08A', potShadow: '#C08A76', soilWet: '#6B5546', soilDry: '#8A7361',
    ripple: '#DCEFF7', pineTuft: '#6F8F73', pineNeedle: '#4F7F5C', pineNeedleOld: '#5E8069',
    blush: '#E7B7A6', bark: '#8C6A5A', barkLight: '#9A7866'
  };

  /* ───────────────────────── math / utils ───────────────────────── */
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smooth(x) { x = clamp01(x); return x * x * (3 - 2 * x); }
  function n2(v) { return Math.round(v * 1000) / 1000; }
  function rad(d) { return d * Math.PI / 180; }
  function mulberry32(a) {
    a = a >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hexLerp(a, b, t) {
    t = clamp01(t);
    var A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16), out = '#';
    for (var sh = 16; sh >= 0; sh -= 8) {
      var v = Math.round(lerp((A >> sh) & 255, (B >> sh) & 255, t));
      out += (v < 16 ? '0' : '') + v.toString(16);
    }
    return out.toUpperCase();
  }
  // unfold progress for an element: appear < 0 → always full; otherwise a 0.35-wide window
  // (shortened near t = 1 so every element is fully open when the stage completes).
  function unfold(t, appear) {
    if (appear < 0) return 1;
    if (t < 0) return 0;                        // pre-stage-up folded state (render() applies t = -0.001 first)
    var w = Math.max(0.1, Math.min(0.35, 1 - appear));
    var u = smooth((t - appear) / w);
    // Elements that belong to the stage-up itself (appear 0) open to ~35% during the 2 s CSS
    // transition so the "첫 잎이에요" whisper matches what is on screen; they keep growing with t.
    return appear === 0 ? 0.35 + 0.65 * u : u;
  }
  function qpt(x0, y0, cx, cy, x1, y1, u) {
    var v = 1 - u;
    return { x: v * v * x0 + 2 * v * u * cx + u * u * x1, y: v * v * y0 + 2 * v * u * cy + u * u * y1 };
  }
  function cpt(x0, y0, c1x, c1y, c2x, c2y, x1, y1, u) {
    var v = 1 - u, a = v * v * v, b = 3 * v * v * u, c = 3 * v * u * u, d = u * u * u;
    return { x: a * x0 + b * c1x + c * c2x + d * x1, y: a * y0 + b * c1y + c * c2y + d * y1 };
  }
  // CSS transform string; scale about the local origin (attachment point)
  function T(x, y, a, sx, sy, post) {
    return 'translate(' + n2(x) + 'px,' + n2(y) + 'px) rotate(' + n2(a) + 'deg) scale(' + n2(sx) + ',' + n2(sy) + ')' + (post || '');
  }

  /* ───────────────────────── DOM helpers ───────────────────────── */
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    if (attrs) for (var k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function clear(node) { while (node && node.firstChild) node.removeChild(node.firstChild); }
  // pin the CSS transform origin to the element's local (0,0) regardless of stylesheet rules
  function origin0(e) { e.style.transformBox = 'view-box'; e.style.transformOrigin = '0px 0px'; }

  /* ───────────────────────── unit shapes (tip up, base at 0,0) ───────────────────────── */
  var SHAPE = {
    heart: 'M0 0 C-0.7 -0.1 -0.75 -0.8 -0.2 -0.95 Q0 -1.05 0.2 -0.95 C0.75 -0.8 0.7 -0.1 0 0 Z',
    lance: 'M0 0 C-0.18 -0.3 -0.18 -0.7 0 -1 C0.18 -0.7 0.18 -0.3 0 0 Z',
    tooth: 'M0 0 L-0.16 -0.2 L-0.1 -0.3 L-0.2 -0.5 L-0.12 -0.6 L-0.16 -0.82 L0 -1 L0.16 -0.82 L0.12 -0.6 L0.2 -0.5 L0.1 -0.3 L0.16 -0.2 Z',
    drop: 'M0 0 C-0.32 -0.3 -0.3 -0.75 0 -1 C0.3 -0.75 0.32 -0.3 0 0 Z',
    bell: 'M-0.3 0 L-0.2 -0.8 Q0 -1 0.2 -0.8 L0.3 0 Q0 0.15 -0.3 0 Z',
    petal: 'M0 0 C-0.22 -0.3 -0.22 -0.75 0 -1 C0.22 -0.75 0.22 -0.3 0 0 Z',
    round: 'M0 0 C-0.78 -0.05 -0.78 -1 0 -1 C0.78 -1 0.78 -0.05 0 0 Z'   // cotyledon lobe
  };
  var VEIN = 'M0 0 L0 -0.85', VEIN_P = 'M0 0.2 L0 -0.85';
  var PETAL_PTS = [[0, 0], [-0.22, -0.3], [-0.22, -0.75], [0, -1], [0.22, -0.75], [0.22, -0.3], [0, 0]];
  // n petals of length r around (0,0) as ONE path (keeps the node budget small)
  function petalRing(n, r, ry, a0) {
    var d = '';
    for (var i = 0; i < n; i++) {
      var a = (a0 || 0) + i * 2 * Math.PI / n, ca = Math.cos(a), sa = Math.sin(a);
      var P = PETAL_PTS.map(function (p) {
        var x = p[0] * r, y = p[1] * r;
        return n2(x * ca - y * sa) + ' ' + n2((x * sa + y * ca) * (ry || 1));
      });
      d += 'M' + P[0] + ' C' + P[1] + ' ' + P[2] + ' ' + P[3] + ' C' + P[4] + ' ' + P[5] + ' ' + P[6] + ' Z ';
    }
    return d;
  }
  function circleD(x, y, r) {
    return 'M' + n2(x - r) + ' ' + n2(y) + ' a' + n2(r) + ' ' + n2(r) + ' 0 1 0 ' + n2(2 * r) + ' 0 a' + n2(r) + ' ' + n2(r) + ' 0 1 0 ' + n2(-2 * r) + ' 0 Z ';
  }

  /* ───────────────────────── Builder: static nodes + per-render updaters ───────────────────────── */
  function Builder(seed, stage) { this.seed = seed >>> 0; this.stage = stage; this.ups = []; }
  // stable jitter per leaf id (same across stages so leaves don't jump on stage-up)
  Builder.prototype.jit = function (id) {
    var r = mulberry32((Math.imul(this.seed | 0, 2654435761 | 0) ^ Math.imul((id | 0) + 1, 40503)) >>> 0);
    return { a: (r() * 2 - 1) * 6, s: 1 + (r() * 2 - 1) * 0.04, r: r() };
  };
  Builder.prototype.dyn = function (fn) { this.ups.push(fn); };
  Builder.prototype.apply = function (ctx) { for (var i = 0; i < this.ups.length; i++) this.ups[i](ctx); };
  Builder.prototype.wrapSway = function (parent, on) {
    if (!on) return parent;
    var w = el('g', { 'class': 'sway' }, parent);
    w.style.transformBox = 'view-box';
    return w;
  };
  Builder.prototype.markAppear = function (e, ap) {
    e.setAttribute('data-appear', ap);
    if (this.stage >= 5 && ap > 0) e.style.transitionDelay = n2(ap * 1.6) + 's'; // bloom stagger (t is always 1 there)
  };
  function val(v, ctx) { return typeof v === 'function' ? v(ctx) : v; }

  // A leaf/petal shape. o: { shape, fill, scale, appear, id, pos:{x,y,a}|fn, sway, vein, petiole,
  //   stroke, strokeW, strokeOpacity, highlight, opacity, sx:fn, cls, jitter:false }
  Builder.prototype.leaf = function (parent, o) {
    var self = this, j = o.jitter === false ? { a: 0, s: 1, r: 0.5 } : this.jit(o.id || 0);
    var wrap = this.wrapSway(parent, o.sway);
    var ap = o.appear == null ? -1 : o.appear;
    var fillFn = typeof o.fill === 'function';
    var p = el('path', { d: SHAPE[o.shape], 'class': 'leaf' + (o.cls ? ' ' + o.cls : ''), fill: fillFn ? null : o.fill }, wrap);
    if (o.stroke) {
      p.setAttribute('stroke', o.stroke); p.setAttribute('stroke-width', o.strokeW || 0.07);
      p.setAttribute('stroke-opacity', o.strokeOpacity == null ? 0.3 : o.strokeOpacity); p.setAttribute('stroke-linejoin', 'round');
    }
    var parts = [p];
    if (o.vein) parts.push(el('path', { d: o.petiole ? VEIN_P : VEIN, 'class': 'vein', fill: 'none', stroke: o.vein, 'stroke-width': 0.05, 'stroke-linecap': 'round', 'stroke-opacity': 0.5 }, wrap));
    if (o.highlight) parts.push(el('ellipse', { cx: -0.05, cy: -0.55, rx: 0.07, ry: 0.19, fill: '#FFFFFF', 'fill-opacity': 0.35 }, wrap));
    var post = o.petiole ? ' translate(0px,-0.2px)' : (o.post || '');
    parts.forEach(function (e) { origin0(e); self.markAppear(e, ap); });
    this.dyn(function (ctx) {
      var P = val(o.pos, ctx), u = unfold(ctx.t, ap);
      var s = val(o.scale, ctx) * j.s * u, sx = o.sx ? o.sx(ctx) : 1;
      var str = T(P.x, P.y, P.a + j.a, s * sx, s, post);
      var op = (o.opacity == null ? 1 : val(o.opacity, ctx)) * (u <= 0 ? 0 : Math.min(1, 0.2 + u));
      for (var i = 0; i < parts.length; i++) { parts[i].style.transform = str; parts[i].style.opacity = n2(op); }
      if (fillFn) p.setAttribute('fill', o.fill(ctx));
      if (wrap !== parent) wrap.style.transformOrigin = n2(P.x) + 'px ' + n2(P.y) + 'px';
    });
    return p;
  };

  // A positioned group that unfolds; children are drawn in px around (0,0).
  Builder.prototype.group = function (parent, o) {
    var j = o.jitter ? this.jit(o.id || 0) : { a: 0, s: 1 };
    var wrap = this.wrapSway(parent, o.sway);
    var ap = o.appear == null ? -1 : o.appear;
    var g = el('g', { 'class': o.cls || null }, wrap);
    origin0(g); this.markAppear(g, ap);
    this.dyn(function (ctx) {
      var P = val(o.pos, ctx), u = unfold(ctx.t, ap);
      var s = (o.scale == null ? 1 : val(o.scale, ctx)) * j.s * u;
      g.style.transform = T(P.x, P.y, (P.a || 0) + j.a, s * (o.sx ? o.sx(ctx) : 1), s, o.post);
      g.style.opacity = n2((o.opacity == null ? 1 : val(o.opacity, ctx)) * (u <= 0 ? 0 : Math.min(1, 0.2 + u)));
      if (wrap !== parent) wrap.style.transformOrigin = n2(P.x) + 'px ' + n2(P.y) + 'px';
    });
    return g;
  };

  // A stroked path whose d (and optionally width) is recomputed every render (stems, twigs).
  Builder.prototype.stroke = function (parent, o) {
    var p = el('path', { 'class': o.cls || 'stem', fill: 'none', stroke: o.color, 'stroke-width': n2(val(o.w, { t: 0 })), 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, parent);
    if (o.opacity != null) p.setAttribute('stroke-opacity', o.opacity);
    this.dyn(function (ctx) {
      p.setAttribute('d', o.d(ctx));
      if (typeof o.w === 'function') p.setAttribute('stroke-width', n2(o.w(ctx)));
      if (typeof o.color === 'function') p.setAttribute('stroke', o.color(ctx));
    });
    return p;
  };

  // A fixed path revealed progressively with stroke-dash (vine, flower stalk). Length is
  // pre-computed numerically so no getTotalLength() is needed.
  Builder.prototype.reveal = function (parent, o) {
    var L = o.length + 1;
    var p = el('path', { d: o.d, 'class': o.cls || 'vine', fill: 'none', stroke: o.color, 'stroke-width': o.w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': n2(L) + ' ' + n2(L) }, parent);
    p.style.transition = 'stroke-dashoffset ' + (o.dur || 1.6) + 's ' + EASE;
    this.dyn(function (ctx) { p.style.strokeDashoffset = n2(L * (1 - clamp01(o.frac(ctx)))) + 'px'; });
    return p;
  };

  // numeric arc-length table for a parametric curve fn(u)->{x,y}
  function arcTable(fn, n) {
    var cum = [0], prev = fn(0), L = 0;
    for (var i = 1; i <= n; i++) {
      var p = fn(i / n); L += Math.hypot(p.x - prev.x, p.y - prev.y); cum.push(L); prev = p;
    }
    return { length: L, frac: function (u) { return cum[Math.round(clamp01(u) * n)] / L; } };
  }

  /* ───────────────────────── shared pieces ───────────────────────── */
  function beanSeed(g) {   // bean casing drawn around (0,0), ~22×14
    el('ellipse', { cx: 0, cy: 0, rx: 11, ry: 7, fill: '#B86B5A' }, g);
    el('path', { d: 'M-7 -1.5 Q0 -4.5 7 -1.5', fill: 'none', stroke: '#D08876', 'stroke-width': 1.2, 'stroke-linecap': 'round', 'stroke-opacity': 0.55 }, g);
    [[-5, 2.2], [-1, -3], [3, 3], [6.5, -1]].forEach(function (p) { el('circle', { cx: p[0], cy: p[1], r: 1.2, fill: '#8C4A3E' }, g); });
  }
  function flower5(g, r, petal, center, ry) {
    el('path', { d: petalRing(5, r, ry || 1), fill: petal, 'class': 'petal' }, g);
    el('circle', { cx: 0, cy: 0, r: n2(r * 0.28), fill: center }, g);
  }

  /* ───────────────────────── species ───────────────────────── */
  var SP = {};

  // 강낭콩 — hook → cotyledons → heart leaves → bloom
  SP.bean = function (B, root, s) {
    [[76, 197, 2], [118, 199, 1.6], [126, 195, 2.1]].forEach(function (p) { el('circle', { cx: p[0], cy: p[1], r: p[2], fill: '#C9BFB3' }, root); });
    var HR = [[0, 0], [6, 18], [18, 40], [40, 90], [90, 120], [120, 120]], DX = [[8, 8], [8, 8], [8, 6], [6, 6], [6, 5], [5, 5]];
    var H = function (c) { return lerp(HR[s][0], HR[s][1], c.t); }, dx = function (c) { return lerp(DX[s][0], DX[s][1], c.t); };
    var tip = function (c) { return { x: AX + dx(c) * 0.3, y: AY - H(c) }; };
    var ctl = function (c) { return { x: AX + dx(c), y: AY - H(c) * 0.6 }; };
    var pt = function (c, u) { var k = ctl(c), e = tip(c); return qpt(AX, AY, k.x, k.y, e.x, e.y, u); };
    var stemD = function (c) { var k = ctl(c), e = tip(c); return 'M' + AX + ' ' + AY + ' Q' + n2(k.x) + ' ' + n2(k.y) + ' ' + n2(e.x) + ' ' + n2(e.y); };
    var at = function (u, a) { return function (c) { var p = pt(c, u); return { x: p.x, y: p.y, a: a }; }; };

    if (s === 0) {
      beanSeed(B.group(root, { pos: { x: 100, y: 192, a: -20 } }));
      B.leaf(root, { shape: 'lance', fill: C.leafLight, scale: 5, appear: 0.55, id: 9, pos: { x: 104, y: 189, a: -12 } });
      return;
    }
    B.stroke(root, { d: stemD, w: [0, 3, 3.2, 3.6, 3.8, 3.8][s], color: s === 1 ? C.leafLight : C.leafMid });

    if (s === 1) {
      beanSeed(B.group(root, { pos: function (c) { var p = tip(c); return { x: p.x, y: p.y + 2, a: -30 }; }, appear: 0, scale: 0.6, id: 1, jitter: true }));
    }
    var cot = function (side, pos, scale, ap) {
      B.leaf(root, { shape: 'round', fill: C.leafLight, scale: scale, appear: ap, id: 3 + (side > 0 ? 1 : 0), pos: pos, sway: true, jitter: true });
    };
    if (s === 2) {
      beanSeed(B.group(root, { pos: { x: 128, y: 195, a: 15 }, appear: 0.3, scale: 0.6, opacity: 0.4, id: 2 }));
      cot(-1, function (c) { var p = tip(c); return { x: p.x - 1, y: p.y + 1, a: -58 }; }, 14, 0);
      cot(1, function (c) { var p = tip(c); return { x: p.x + 1, y: p.y + 1, a: 58 }; }, 14, 0.15);
    }
    if (s === 3) {   // cotyledons stay at the old node while the stem keeps climbing
      var cu = function (c) { return 40 / H(c); };
      cot(-1, function (c) { var p = pt(c, cu(c)); return { x: p.x - 1, y: p.y + 1, a: -62 }; }, function (c) { return lerp(14, 11, c.t); }, -1);
      cot(1, function (c) { var p = pt(c, cu(c)); return { x: p.x + 1, y: p.y + 1, a: 62 }; }, function (c) { return lerp(14, 11, c.t); }, -1);
    }
    var leaves = s === 3 ? [{ u: 0.55, a: -35, ap: 0, id: 11 }, { u: 0.8, a: 38, ap: 0.4, id: 12 }]
      : s === 4 ? [{ u: 0.3, a: -40, ap: 0, id: 13 }, { u: 0.45, a: 42, ap: 0.3, id: 14 }, { u: [0.55, 0.6], a: -36, ap: -1, id: 11 }, { u: [0.8, 0.75], a: 40, ap: -1, id: 12 }, { u: 0.9, a: -30, ap: 0.7, id: 15 }]
      : s === 5 ? [{ u: 0.3, a: -40, ap: -1, id: 13 }, { u: 0.45, a: 42, ap: -1, id: 14 }, { u: 0.6, a: -36, ap: -1, id: 11 }, { u: 0.75, a: 40, ap: -1, id: 12 }, { u: 0.9, a: -30, ap: -1, id: 15 }] : [];
    leaves.forEach(function (L) {
      var uf = Array.isArray(L.u) ? function (c) { return lerp(L.u[0], L.u[1], c.t); } : function () { return L.u; };
      var fill = s === 3 ? C.leafMid : hexLerp(C.leafDeep, C.leafMid, Array.isArray(L.u) ? L.u[1] : L.u);
      var sc = s === 3 ? 22 : (s === 4 && L.ap < 0) ? function (c) { return lerp(22, 26, c.t); } : 26;
      B.leaf(root, { shape: 'heart', fill: fill, scale: sc, appear: L.ap, id: L.id, sway: true, vein: C.leafDeep, petiole: true,
        pos: function (c) { var p = pt(c, uf(c)); return { x: p.x, y: p.y, a: L.a }; } });
    });
    if (s === 3 || s === 4) {   // tendril at the tip
      var tg = B.group(root, { pos: function (c) { var p = tip(c); return { x: p.x, y: p.y, a: 0 }; }, appear: s === 3 ? 0.7 : -1, sway: true, id: 16, jitter: true });
      el('path', { d: s === 3 ? 'M0 0 Q10 -8 6 -18' : 'M0 0 C10 -6 14 -18 4 -22 C-4 -25 -6 -16 2 -14', fill: 'none', stroke: C.leafMid, 'stroke-width': 1.6, 'stroke-linecap': 'round' }, tg);
    }
    if (s === 5) {
      [{ u: 0.7, dx: -12, ap: 0, id: 21 }, { u: 0.85, dx: 12, ap: 0.3, id: 22 }, { u: 0.96, dx: -6, ap: 0.6, id: 23 }].forEach(function (F) {
        var g = B.group(root, { pos: at(F.u, 0), appear: F.ap, sway: true, id: F.id, jitter: true });
        el('path', { d: 'M0 0 Q' + n2(F.dx * 0.5) + ' -2 ' + F.dx + ' -6', fill: 'none', stroke: C.leafMid, 'stroke-width': 1.3, 'stroke-linecap': 'round' }, g);
        flower5(el('g', { transform: 'translate(' + F.dx + ' -6)' }, g), 7, '#FFF6F1', '#F2C3B3');
      });
      B.leaf(root, { shape: 'lance', fill: C.leafLight, scale: 14, appear: 0.8, id: 24, pos: at(0.6, 160), sway: true, sx: function () { return 1.6; } });
    }
  };

  // 다육이 — mother leaf → rosette → bell stalk
  SP.succulent = function (B, root, s) {
    var MINT = '#B7D2BE', SAGE = '#8FB89C', DRY = '#D9C6B3';
    if (s <= 2) {   // mother leaf lying on the soil
      B.leaf(root, { shape: 'drop', fill: s === 2 ? function (c) { return hexLerp(MINT, DRY, c.t); } : MINT,
        scale: s === 2 ? function (c) { return lerp(20, 14, c.t); } : 20, id: 1, pos: { x: 104, y: 194, a: 80 }, highlight: true, jitter: true });
    }
    if (s === 1) {   // pink roots reaching into the soil
      var rg = B.group(root, { pos: { x: 104, y: 194, a: 0 }, appear: 0, id: 2 });
      el('path', { d: 'M0 0 Q-3 4 -5 8 M0 0 Q1 5 0 9 M0 0 Q4 4 5 7', fill: 'none', stroke: C.blush, 'stroke-width': 1, 'stroke-linecap': 'round', 'stroke-opacity': 0.7 }, rg);
    }
    // rosette: n leaves on the golden angle, outer leaves first (inner ones overlap them)
    var RS = [null, { n: 3, R: [6, 6], np: 0, cx: 96, cy: 194, ap0: 0.4 }, { n: 5, R: [6, 14], np: 3, cx: 100, cy: 190 }, { n: 8, R: [14, 26], np: 5, cx: 100, cy: 190 }, { n: 13, R: [26, 36], np: 8, cx: 100, cy: 190 }, { n: 13, R: [36, 36], np: 13, cx: 100, cy: 190 }][s];
    if (RS) {
      var ros = el('g', { 'class': 'rosette' }, root);
      ros.style.transformBox = 'view-box'; ros.style.transformOrigin = RS.cx + 'px ' + RS.cy + 'px'; ros.style.transform = 'scale(1,0.7)';
      var Rf = function (c) { return lerp(RS.R[0], RS.R[1], c.t); };
      for (var i = RS.n - 1; i >= 0; i--) {
        var ang = rad(i * 137.5 - 90), k = i / RS.n, ca = Math.cos(ang), sa = Math.sin(ang);
        var isNew = i >= RS.np, apv = isNew ? (RS.ap0 != null ? RS.ap0 : 0.05 + 0.65 * (i - RS.np) / Math.max(1, RS.n - RS.np - 1)) : -1;
        var fill = s <= 2 ? hexLerp(MINT, SAGE, 0.25 - 0.25 * k) : hexLerp(SAGE, MINT, k);
        B.leaf(ros, { shape: 'drop', fill: fill, id: 100 + i, appear: apv, highlight: s >= 4, jitter: true,
          stroke: s >= 3 ? C.blush : null, strokeW: 0.08, strokeOpacity: 0.3,
          scale: (function (k) { return function (c) { return Rf(c) * lerp(0.6, 1.05, k); }; })(k),
          pos: (function (ca, sa, k, ang) { return function (c) { var r = Rf(c) * 0.4 * Math.sqrt(k); return { x: RS.cx + ca * r, y: RS.cy + sa * r, a: ang * 180 / Math.PI + 90 }; }; })(ca, sa, k, ang),
          sx: function (c) { return c.thirsty ? 0.94 : 1; } });
      }
    }
    if (s === 5) {   // bloom stalk with hanging bells
      var st = function (u) { return qpt(112, 186, 150, 170, 150, 120, u); };
      var tab = arcTable(st, 40);
      B.reveal(root, { d: 'M112 186 Q150 170 150 120', color: SAGE, w: 2.2, length: tab.length, frac: function (c) { return unfold(c.t, 0); }, cls: 'vine stalk' });
      [0.45, 0.575, 0.7, 0.825, 0.95].forEach(function (u, i) {
        var p = st(u);
        B.leaf(root, { shape: 'bell', fill: hexLerp('#F4C6A3', '#F7DDC8', i / 4), scale: 8, appear: 0.2 + 0.15 * i, id: 200 + i, jitter: true,
          pos: { x: p.x, y: p.y, a: (i % 2 ? 22 : -22) + 8 }, post: ' translate(0px,1px)', sway: true });
      });
    }
  };

  // 민들레 — pappus seed → toothed rosette → hollow stem → flower → seed head
  SP.dandelion = function (B, root, s) {
    var LG = '#A8C89A', LG2 = '#8FB89C';
    if (s === 0) {
      var g = B.group(root, { pos: { x: 98, y: 193, a: 32 } });
      el('ellipse', { cx: 0, cy: -2.2, rx: 1.4, ry: 3, fill: C.bark }, g);
      el('path', { d: 'M0 -4 L0 -12', stroke: '#E4DED2', 'stroke-width': 1, 'stroke-linecap': 'round' }, g);
      var fd = ''; for (var i = 0; i < 8; i++) { var a = rad(-84 + i * 24); fd += 'M0 -12 L' + n2(Math.sin(a) * 5) + ' ' + n2(-12 - Math.cos(a) * 5) + ' '; }
      el('path', { d: fd, stroke: '#E4DED2', 'stroke-width': 0.9, 'stroke-linecap': 'round', fill: 'none' }, g);
      return;
    }
    // leaf fan (looks like a flat rosette thanks to the y-squash)
    var fan = el('g', { 'class': 'fan' }, root);
    fan.style.transformBox = 'view-box'; fan.style.transformOrigin = AX + 'px ' + AY + 'px';
    var fanScale = [0, 1, 1, [1, 1.1], [1.1, 1.3], 1.3][s];
    B.dyn(function (c) { var k = Array.isArray(fanScale) ? lerp(fanScale[0], fanScale[1], c.t) : fanScale; fan.style.transform = 'scale(' + n2(k) + ',' + n2(k * (s >= 2 ? 0.6 : 1)) + ')'; });
    var lanceScale = s === 1 ? function (c) { return lerp(12, 20, c.t); } : function (c) { return s === 2 ? lerp(20, 16, c.t) : 16; };
    B.leaf(fan, { shape: 'lance', fill: LG, scale: lanceScale, appear: s === 1 ? 0 : -1, id: 1, pos: { x: AX - 1, y: AY, a: -25 }, sway: true });
    B.leaf(fan, { shape: 'lance', fill: LG, scale: lanceScale, appear: s === 1 ? 0.15 : -1, id: 2, pos: { x: AX + 1, y: AY, a: 25 }, sway: true });
    if (s >= 2) {
      [-80, -40, 0, 40, 80].forEach(function (a, i) {
        B.leaf(fan, { shape: 'tooth', fill: hexLerp(LG, LG2, (i * 0.37) % 1), scale: s === 2 ? function (c) { return lerp(18, 28, c.t); } : 28, appear: s === 2 ? 0.05 + i * 0.15 : -1, id: 10 + i,
          pos: { x: AX, y: AY, a: a }, sway: true, vein: C.leafDeep });
      });
    }
    if (s >= 3) {
      var Hs = [0, 0, 0, [0, 80], [80, 80], [80, 80]][s];
      var H = function (c) { return lerp(Hs[0], Hs[1], c.t); };
      var tip = function (c) { return { x: 103, y: AY - H(c) }; };
      B.stroke(root, { d: function (c) { var h = H(c); return 'M' + AX + ' ' + AY + ' Q' + n2(AX - 2 + h * 0.03) + ' ' + n2(AY - h * 0.55) + ' 103 ' + n2(AY - h); }, w: 2.6, color: '#9CBF8E' });
      var head = B.group(root, { pos: function (c) { var p = tip(c); return { x: p.x, y: p.y, a: 0 }; }, appear: s === 3 ? 0.5 : -1, id: 30, sway: true, cls: 'head' });
      if (s === 3) {
        el('ellipse', { cx: 0, cy: -4, rx: 3, ry: 4.6, fill: LG2 }, head);
        el('path', { d: 'M-2.4 -2 L-3 -6 M2.4 -2 L3 -6 M0 -8.4 L0 -9', stroke: LG2, 'stroke-width': 1, 'stroke-linecap': 'round', fill: 'none' }, head);
      } else if (s === 4) {
        el('ellipse', { cx: 0, cy: 0.5, rx: 4.2, ry: 3, fill: LG2 }, head);
        var pOuter = el('path', { d: petalRing(24, 17, 0.85, rad(7)), fill: '#F5D77A', 'class': 'petal' }, head);
        var pInner = el('path', { d: petalRing(12, 11, 0.85, rad(15)), fill: '#F0C860', 'class': 'petal' }, head);
        el('circle', { cx: 0, cy: 0, r: 5.5, fill: '#E9B94E' }, head);
        origin0(pOuter); origin0(pInner);
        B.dyn(function (c) { var k = lerp(0.35, 1, smooth(c.t)); pOuter.style.transform = 'scale(' + n2(k) + ')'; pInner.style.transform = 'scale(' + n2(lerp(0.5, 1, smooth(c.t))) + ')'; });
      } else {   // seed head: 40 rays + 40 tips as two paths
        var rays = '', tips = '';
        for (var k = 0; k < 40; k++) {
          var an = rad(k * 9), len = 18 + B.jit(300 + k).r * 3.5, x = Math.cos(an) * len, y = Math.sin(an) * len * 0.92;
          rays += 'M0 0 L' + n2(x) + ' ' + n2(y) + ' ';
          tips += circleD(x, y, 1.5);
        }
        el('path', { d: rays, stroke: '#E4DED2', 'stroke-width': 1, 'stroke-linecap': 'round', fill: 'none' }, head);
        el('path', { d: tips, fill: '#FBF7F0' }, head);
        el('circle', { cx: 0, cy: 0, r: 3, fill: '#D9C6B3' }, head);
      }
    }
  };

  // 나팔꽃 — seed + twig → vine wraps the twig → buds → trumpets (open 05–11h)
  var VINE = [[118, 186, 96, 172, 108, 160], [122, 148, 94, 132, 108, 118], [122, 104, 96, 92, 106, 82]];
  var VINE_D = 'M100 196 ' + VINE.map(function (s) { return 'C' + s.join(' '); }).join(' ');
  function vinePt(u) {
    u = clamp01(u); var n = VINE.length, k = Math.min(n - 1, Math.floor(u * n)), lu = u * n - k;
    var p0 = k === 0 ? [100, 196] : [VINE[k - 1][4], VINE[k - 1][5]], g = VINE[k];
    return cpt(p0[0], p0[1], g[0], g[1], g[2], g[3], g[4], g[5], lu);
  }
  var VINE_T = null;
  SP.morningglory = function (B, root, s) {
    if (!VINE_T) VINE_T = arcTable(vinePt, 120);
    var twigY = [[176, 176], [176, 176], [176, 136], [136, 86], [86, 86], [86, 86]][s];
    B.stroke(root, { d: function (c) { return 'M108 197 L109 ' + n2(lerp(twigY[0], twigY[1], c.t)); }, w: 2, color: '#B99C82', cls: 'twig' });
    if (s === 0) {
      B.group(root, { pos: { x: 94, y: 193, a: 8 } }).appendChild(el('path', { d: 'M-4 3 L4 3 L0 -5 Z', fill: '#4E4A5A', 'stroke': '#4E4A5A', 'stroke-width': 1.5, 'stroke-linejoin': 'round' }));
      B.leaf(root, { shape: 'lance', fill: C.leafLight, scale: 4, appear: 0.6, id: 9, pos: { x: 97, y: 193, a: 20 } });
      return;
    }
    if (s === 1) {
      B.stroke(root, { d: function (c) { var k = lerp(0.4, 1, c.t); return 'M97 196 Q' + n2(97 + 2 * k) + ' ' + n2(196 - 5 * k) + ' ' + n2(97 + 7 * k) + ' ' + n2(196 - 6 * k); }, w: 1.8, color: C.leafLight });
      B.leaf(root, { shape: 'heart', fill: C.leafLight, scale: function (c) { return lerp(8, 14, c.t); }, appear: 0, id: 1, pos: function (c) { var k = lerp(0.4, 1, c.t); return { x: 97 + 7 * k, y: 196 - 6 * k, a: -20 }; }, sway: true, vein: C.leafMid });
      return;
    }
    var F1 = VINE_T.frac(1 / 3);
    var frac = s === 2 ? function (c) { return lerp(0, F1, c.t); } : s === 3 ? function (c) { return lerp(F1, 1, c.t); } : function () { return 1; };
    B.reveal(root, { d: VINE_D, color: C.leafMid, w: 2.2, length: VINE_T.length, frac: frac });
    // leaves along the vine; appear when the growing tip passes them
    var U = [0.12, 0.2, 0.3, 0.45, 0.6, 0.75, 0.9], count = [0, 0, 3, 5, 7, 7][s], first = [0, 0, 0, 3, 5, 7][s];
    for (var i = 0; i < count; i++) {
      var u = U[i], p = vinePt(u), ap = -1;
      if (i >= first) {
        if (s === 2) ap = Math.min(0.8, VINE_T.frac(u) / F1 * 0.85);
        else if (s === 3) ap = Math.min(0.8, (VINE_T.frac(u) - F1) / (1 - F1) * 0.85);
        else ap = 0.1 + 0.4 * (i - first);
      }
      B.leaf(root, { shape: 'heart', fill: hexLerp(C.leafMid, C.leafLight, 0.35 * u), scale: s === 2 ? 18 : (i < 3 && s === 3) ? function (c) { return lerp(18, 20, c.t); } : 20,
        appear: ap, id: 10 + i, pos: { x: p.x, y: p.y, a: (i % 2 ? 52 : -50) }, sway: true, vein: C.leafDeep, petiole: true });
    }
    if (s === 3 || s === 4) {
      var buds = s === 3 ? [{ u: 0.8, ap: 0.6, a: -30 }] : [{ u: 0.8, ap: -1, a: -30 }, { u: 0.95, ap: 0.4, a: 35 }];
      buds.forEach(function (b, i) {
        var q = vinePt(b.u);
        B.leaf(root, { shape: 'lance', fill: '#8FA3D9', scale: 10, appear: b.ap, id: 20 + i, pos: { x: q.x, y: q.y, a: b.a }, sway: true, sx: function () { return 1.5; } });
      });
    }
    if (s === 5) {
      [{ u: 0.6, dx: -13, ap: 0 }, { u: 0.8, dx: 13, ap: 0.3 }, { u: 0.95, dx: -8, ap: 0.6 }].forEach(function (F, i) {
        var q = vinePt(F.u);
        var g = B.group(root, { pos: { x: q.x, y: q.y, a: 0 }, appear: F.ap, sway: true, id: 40 + i, jitter: true });
        el('path', { d: 'M0 0 Q' + n2(F.dx * 0.5) + ' -3 ' + F.dx + ' -7', fill: 'none', stroke: C.leafMid, 'stroke-width': 1.4, 'stroke-linecap': 'round' }, g);
        var holder = el('g', { transform: 'translate(' + F.dx + ' -7)' }, g);
        el('circle', { cx: 0, cy: 0, r: 3, fill: C.leafMid }, holder);
        var tr = el('g', { 'class': 'trumpet' }, holder); origin0(tr);
        tr.style.transition = 'transform 4s ' + EASE;
        flower5(tr, 11, '#9DB4E8', '#F4F0FA');
        el('path', { d: 'M0 -6 L0 6 M-5.2 -3 L5.2 3 M-5.2 3 L5.2 -3', stroke: '#F4F0FA', 'stroke-width': 0.9, 'stroke-opacity': 0.7, 'stroke-linecap': 'round' }, tr);
        B.dyn(function (c) {
          var open = c.hour >= 5 && c.hour < 11;
          tr.style.transform = 'scale(' + (open ? 1 : 0.35) + ',1)';
          tr.classList.toggle('open', open); tr.classList.toggle('furled', !open);
        });
      });
    }
  };

  // 작은 소나무 — cone → needle whorl → trunk with tufts → S-curve + moss → tiny cone
  SP.pine = function (B, root, s) {
    var needle = s >= 5 ? C.pineNeedleOld : C.pineNeedle;
    if (s === 0) {
      var g = B.group(root, { pos: { x: 102, y: 193, a: -72 } });
      for (var k = 0; k < 5; k++) el('ellipse', { cx: 0, cy: n2(-k * 3.1), rx: n2(5 - k * 0.75), ry: 2.1, fill: k % 2 ? '#7A5A4C' : C.bark }, g);
      return;
    }
    el('circle', { cx: 100, cy: 196, r: 2.2, fill: C.bark }, root);
    if (s <= 2) {   // needle whorl from the anchor
      B.stroke(root, { d: function (c) {
        var L = s === 1 ? lerp(8, 16, c.t) : lerp(16, 12, c.t), d = '';
        for (var i = 0; i < 9; i++) { var a = rad(-64 + i * 16); d += 'M100 196 L' + n2(100 + Math.sin(a) * L) + ' ' + n2(196 - Math.cos(a) * L) + ' '; }
        return d;
      }, w: 1.4, color: C.pineTuft, cls: 'whorl', opacity: s === 2 ? 0.7 : 1 });
      if (s === 1) return;
    }
    var sw = el('g', { 'class': 'sway' }, root); sw.style.transformBox = 'view-box'; sw.style.transformOrigin = AX + 'px ' + AY + 'px';
    var HR = [0, 0, [0, 34], [34, 70], [70, 86], [86, 86]][s];
    var H = function (c) { return lerp(HR[0], HR[1], c.t); };
    // trunk as one cubic: quad-equivalent while young, morphing into an S-curve at stage 4
    var ctrl = function (c) {
      var h = H(c), lean = s === 2 ? 3 : s === 3 ? lerp(3, 8, c.t) : 8, tx = s === 2 ? 0 : s === 3 ? lerp(0, 2, c.t) : 2;
      var qx = AX + lean, qy = AY - h * 0.55, ex = AX + tx, ey = AY - h;
      var q = { c1x: AX + (qx - AX) * 2 / 3, c1y: AY + (qy - AY) * 2 / 3, c2x: ex + (qx - ex) * 2 / 3, c2y: ey + (qy - ey) * 2 / 3, ex: ex, ey: ey };
      if (s < 4) return q;
      var k = s === 4 ? c.t : 1;
      return { c1x: lerp(q.c1x, 91, k), c1y: lerp(q.c1y, AY - h * 0.35, k), c2x: lerp(q.c2x, 113, k), c2y: lerp(q.c2y, AY - h * 0.72, k), ex: lerp(ex, 101, k), ey: ey };
    };
    var tpt = function (c, u) { var k = ctrl(c); return cpt(AX, AY, k.c1x, k.c1y, k.c2x, k.c2y, k.ex, k.ey, u); };
    var trunkD = function (off) { return function (c) { var k = ctrl(c); return 'M' + n2(AX + off) + ' ' + AY + ' C' + n2(k.c1x + off) + ' ' + n2(k.c1y) + ' ' + n2(k.c2x + off) + ' ' + n2(k.c2y) + ' ' + n2(k.ex + off) + ' ' + n2(k.ey); }; };
    B.stroke(sw, { d: trunkD(0), w: 4, color: C.bark, cls: 'trunk' });
    B.stroke(sw, { d: trunkD(0.8), w: 2.4, color: C.barkLight, cls: 'trunk', opacity: 0.8 });
    if (s >= 4) el('ellipse', { cx: 100, cy: 196.5, rx: 9, ry: 2.5, fill: '#8FB89C' }, root);
    // tufts: [u along trunk, dx, dy, base rx, appear, id]; lower ones first
    var TF = s === 2 ? [{ u: 0.6, dx: -9, dy: 1, rx: 10, ap: 0.4, id: 32 }, { u: 1, dx: 0, dy: 0, rx: 12, ap: 0, id: 31 }]
      : s === 3 ? [{ u: 0.6, dx: -11, dy: 1, rx: [10, 11], ap: -1, id: 32 }, { u: 0.8, dx: 11, dy: 0, rx: 11, ap: 0.3, id: 33 }, { u: 1, dx: 0, dy: 0, rx: [12, 13], ap: -1, id: 31 }]
      : [{ u: 0.42, dx: 11, dy: 1, rx: s === 4 ? 12 : 12, ap: s === 4 ? 0.3 : -1, id: 34 }, { u: 0.62, dx: -12, dy: 1, rx: s === 4 ? [11, 13] : 13, ap: -1, id: 32 }, { u: 0.8, dx: 12, dy: 0, rx: s === 4 ? [11, 14] : 14, ap: -1, id: 33 }, { u: 1, dx: 0, dy: 0, rx: s === 4 ? [13, 16] : 16, ap: -1, id: 31 }];
    TF.forEach(function (F) {
      var g = B.group(sw, { pos: function (c) { var p = tpt(c, F.u); return { x: p.x + F.dx, y: p.y + F.dy, a: 0 }; }, appear: F.ap, id: F.id, jitter: true, cls: 'tuft' });
      if (F.dx) el('path', { d: 'M0 0 L' + n2(-F.dx) + ' ' + n2(-F.dy + 1), stroke: C.bark, 'stroke-width': 2, 'stroke-linecap': 'round' }, g);
      var body = el('ellipse', { cx: 0, cy: 0, fill: C.pineTuft }, g);
      var hi = el('ellipse', { fill: '#7FA083' }, g);
      var nd = el('path', { stroke: needle, 'stroke-width': 1.2, 'stroke-linecap': 'round', fill: 'none' }, g);
      B.dyn(function (c) {
        var rx = Array.isArray(F.rx) ? lerp(F.rx[0], F.rx[1], c.t) : F.rx, ry = rx * 0.66;
        body.setAttribute('rx', n2(rx)); body.setAttribute('ry', n2(ry));
        hi.setAttribute('cx', n2(-rx * 0.2)); hi.setAttribute('cy', n2(-ry * 0.28)); hi.setAttribute('rx', n2(rx * 0.55)); hi.setAttribute('ry', n2(ry * 0.5));
        var d = '';
        for (var i = 0; i < 14; i++) { var a = rad(i * 360 / 14 + 7); d += 'M0 0 L' + n2(Math.cos(a) * rx * 0.86) + ' ' + n2(Math.sin(a) * ry * 0.86) + ' '; }
        nd.setAttribute('d', d);
      });
    });
    if (s === 5) {   // a tiny cone hanging from the right branch
      var cg = B.group(sw, { pos: function (c) { var p = tpt(c, 0.8); return { x: p.x + 20, y: p.y + 6, a: 168 }; }, appear: 0, scale: 0.5, id: 35, jitter: true });
      for (var m = 0; m < 5; m++) el('ellipse', { cx: 0, cy: n2(-m * 3.1), rx: n2(5 - m * 0.75), ry: 2.1, fill: m % 2 ? '#7A5A4C' : C.bark }, cg);
    }
  };

  /* ───────────────────────── plant list ───────────────────────── */
  var STAGES = ['씨앗', '새싹', '떡잎', '줄기', '무성한 잎', '꽃'];
  var LIST = [
    { id: 'bean', name: '강낭콩', personality: '가장 먼저 만나는 친구예요', unlockHint: '', stageNames: STAGES.slice(), unlock: function () { return true; } },
    { id: 'succulent', name: '다육이', personality: '거의 움직이지 않아요. 그게 매력이에요', unlockHint: '첫 씨앗을 받으면 만날 수 있어요', stageNames: STAGES.slice(), unlock: function (c) { return (c && c.pressedCount || 0) >= 1; } },
    { id: 'dandelion', name: '민들레', personality: '바람을 제일 좋아해요', unlockHint: '함께한 날이 7일이 되면 만날 수 있어요', stageNames: STAGES.slice(), unlock: function (c) { return (c && c.daysTogether || 0) >= 7; } },
    { id: 'morningglory', name: '나팔꽃', personality: '천천히 감아 올라요. 아침에 피어요', unlockHint: '함께한 숨이 60번이 되면 만날 수 있어요. 꽃을 두 번 받아도 좋아요', stageNames: STAGES.slice(), unlock: function (c) { return (c && c.breaths || 0) >= 60 || (c && c.pressedCount || 0) >= 2; } },
    { id: 'pine', name: '작은 소나무', personality: '완성이 없어요. 그게 좋아요', unlockHint: '함께한 날이 30일이 되면 만날 수 있어요', stageNames: STAGES.slice(0, 5).concat(['작은 솔방울']), unlock: function (c) { return (c && c.daysTogether || 0) >= 30; } }
  ];
  function get(id) { for (var i = 0; i < LIST.length; i++) if (LIST[i].id === id) return LIST[i]; return null; }

  /* ───────────────────────── render ───────────────────────── */
  var cache = typeof WeakMap === 'function' ? new WeakMap() : null;
  function currentHour() { var d = new Date(); return d.getHours() + d.getMinutes() / 60; }

  function render(g, o) {
    if (!g) return;
    try {
      o = o || {};
      var plantId = get(o.plantId) ? o.plantId : 'bean';
      var stage = Math.max(0, Math.min(5, Math.floor(+o.stage || 0)));
      var t = stage >= 5 ? 1 : clamp01(+o.t || 0);
      var seed = (o.seed >>> 0) || 1;
      var ctx = { t: t, hour: typeof o.hour === 'number' ? o.hour : currentHour(), thirsty: !!o.thirsty, stage: stage };
      var key = plantId + ':' + stage + ':' + seed;
      var rec = cache && cache.get(g);
      var prevKey = g.getAttribute('data-key');
      if (!rec || rec.key !== key || prevKey !== key || !g.firstChild) {
        var stageUp = !!prevKey && prevKey === plantId + ':' + (stage - 1) + ':' + seed;
        clear(g);
        var B = new Builder(seed, stage);
        // breath amplitude variants (style.css): succulent .soft, pine .softer; dandelion sways wide
        var root = el('g', { 'class': 'breath' + (plantId === 'succulent' ? ' soft' : plantId === 'pine' ? ' softer' : '') }, g);
        SP[plantId](B, root, stage);
        if (plantId === 'dandelion') {
          var sw = g.querySelectorAll('.sway');
          for (var i = 0; i < sw.length; i++) sw[i].classList.add('wide');
        }
        g.setAttribute('data-key', key);
        g.setAttribute('data-plant', plantId);
        g.setAttribute('data-stage', stage);
        rec = { key: key, B: B };
        if (cache) cache.set(g, rec);
        if (stageUp) {           // new elements start folded, then transition open
          B.apply({ t: -0.001, hour: ctx.hour, thirsty: ctx.thirsty, stage: stage });
          void g.getBoundingClientRect();
        }
      }
      rec.B.apply(ctx);
      g.classList.toggle('thirsty', ctx.thirsty);
    } catch (e) { if (window.console) console.warn('Plants.render', e); }
  }

  /* ───────────────────────── pot ───────────────────────── */
  var POT_D = 'M66 200 L134 200 Q144 200 142.59 209.9 L137.41 246.1 Q136 256 126 256 L74 256 Q64 256 62.59 246.1 L57.41 209.9 Q56 200 66 200 Z';
  var POT_SHADOW_D = 'M66 200 L86 200 L88 256 L74 256 Q64 256 62.59 246.1 L57.41 209.9 Q56 200 66 200 Z';
  var RIM_SHADOW_D = 'M57 190 L86 190 L86 200 L57 200 A5 5 0 0 1 57 190 Z';
  function buildPot(g, withId) {
    el('path', { d: POT_D, fill: C.pot, 'class': 'pot-body' }, g);
    el('path', { d: POT_SHADOW_D, fill: C.potShadow, 'class': 'pot-shadow' }, g);
    el('rect', { x: 122, y: 208, width: 5, height: 36, rx: 2.5, fill: '#FFFFFF', 'fill-opacity': 0.14 }, g);
    el('rect', { x: 56, y: 200, width: 88, height: 3.5, fill: C.potShadow, 'fill-opacity': 0.4 }, g);
    el('rect', { x: 52, y: 190, width: 96, height: 10, rx: 5, fill: C.pot, 'class': 'pot-rim' }, g);
    el('path', { d: RIM_SHADOW_D, fill: C.potShadow, 'class': 'pot-shadow' }, g);
    var soil = el('ellipse', { cx: 100, cy: 198, rx: 42, ry: 7, fill: C.soilWet, 'class': 'soil' }, g);
    if (withId) soil.setAttribute('id', 'soil');
    return soil;
  }
  var potSoil = typeof WeakMap === 'function' ? new WeakMap() : null;
  function renderPot(g, o) {
    if (!g) return;
    try {
      var soil = potSoil && potSoil.get(g);
      if (!soil || !g.firstChild) { clear(g); soil = buildPot(g, true); if (potSoil) potSoil.set(g, soil); }
      var hyd = o && typeof o.hydration === 'number' ? o.hydration : 80;
      soil.setAttribute('fill', hexLerp(C.soilWet, C.soilDry, 1 - clamp01(hyd / 100)));
    } catch (e) { if (window.console) console.warn('Plants.renderPot', e); }
  }

  /* ───────────────────────── mini scenes ───────────────────────── */
  function miniScene(svg, plantId, stage, t) {
    if (!svg) return;
    try {
      if (!svg.getAttribute('viewBox')) svg.setAttribute('viewBox', '0 0 200 260');
      clear(svg);
      buildPot(el('g', { 'class': 'pot' }, svg), false).setAttribute('fill', hexLerp(C.soilWet, C.soilDry, 0.25));
      render(el('g', { 'class': 'plant static' }, svg), { plantId: plantId, stage: stage, t: t, seed: 20260916, thirsty: false, hour: 8 });
    } catch (e) { if (window.console) console.warn('Plants.miniScene', e); }
  }
  function renderStatic(svg, plantId) { miniScene(svg, plantId, 5, 1); }
  function renderSeedSilhouette(svg, plantId) { miniScene(svg, plantId, 0, 0.5); }

  /* ───────────────────────── FX (self-contained inline transitions) ───────────────────────── */
  function later(fn, ms) { return setTimeout(function () { try { fn(); } catch (e) { /* noop */ } }, ms); }
  function remove(n) { if (n && n.parentNode) n.parentNode.removeChild(n); }

  function gatherEffect(plantId, gFx, opts) {
    var rm = !!(opts && opts.reducedMotion);
    return new Promise(function (resolve) {
      try {
        if (plantId !== 'dandelion' || !gFx) { later(resolve, rm ? 800 : 1500); return; }
        var rng = mulberry32(1414), parts = [], hx = 103, hy = AY - 80;
        for (var i = 0; i < 14; i++) {
          var a = rng() * 360, r = 4 + rng() * 14;
          var g = el('g', { 'class': 'pappus' }, gFx); origin0(g);
          el('path', { d: 'M0 0 L0 -6', stroke: '#FBF7F0', 'stroke-width': 1, 'stroke-linecap': 'round' }, g);
          el('circle', { cx: 0, cy: -6, r: 1.5, fill: '#FBF7F0' }, g);
          var x0 = hx + Math.cos(rad(a)) * r, y0 = hy + Math.sin(rad(a)) * r * 0.9;
          g.style.transform = T(x0, y0, a * 0.2 - 30, 1, 1);
          parts.push({ g: g, x: x0 + 60 + (rng() - 0.5) * 40, y: y0 - 120 - rng() * 40, a: a * 0.2 + 10 + rng() * 40 });
        }
        void gFx.getBoundingClientRect();
        parts.forEach(function (p, i) {
          if (rm) { p.g.style.transition = 'opacity .8s ' + EASE; }
          else {
            p.g.style.transition = 'transform 3.5s cubic-bezier(.1,.6,.2,1) ' + n2(i * 0.04) + 's, opacity 1.8s ease-in ' + n2(1.6 + i * 0.04) + 's';
            p.g.style.transform = T(p.x, p.y, p.a, 1, 1);
          }
          p.g.style.opacity = '0';
        });
        later(function () { parts.forEach(function (p) { remove(p.g); }); resolve(); }, rm ? 850 : 3700);
      } catch (e) { resolve(); }
    });
  }

  function ripple(gFx) {
    if (!gFx) return;
    try {
      var r = el('ellipse', { cx: 100, cy: 196, rx: 34, ry: 6, fill: 'none', stroke: C.ripple, 'stroke-width': 2, 'class': 'ripple' }, gFx);
      r.style.transformBox = 'view-box'; r.style.transformOrigin = '100px 196px';
      r.style.transform = 'scale(0.4)'; r.style.opacity = '0.9';
      void gFx.getBoundingClientRect();
      r.style.transition = 'transform 1.4s ' + EASE + ', opacity 1.4s ' + EASE;
      r.style.transform = 'scale(1)'; r.style.opacity = '0';
      later(function () { remove(r); }, 1400);
    } catch (e) { /* noop */ }
  }

  function petalDrift(gFx, plantId) {
    if (!gFx) return;
    try {
      var rng = mulberry32((Date.now() / 250) >>> 0), src, fill, shape = 'petal', sc = 5;
      if (plantId === 'morningglory') { src = vinePt([0.6, 0.8, 0.95][Math.floor(rng() * 3)]); fill = '#9DB4E8'; src = { x: src.x + (rng() < 0.5 ? -13 : 13), y: src.y - 7 }; }
      else if (plantId === 'dandelion') { src = { x: 103 + (rng() - 0.5) * 16, y: AY - 80 - rng() * 12 }; fill = '#FBF7F0'; shape = 'lance'; sc = 4; }
      else if (plantId === 'bean') { var u = [0.7, 0.85, 0.96][Math.floor(rng() * 3)], p = qpt(AX, AY, 105, AY - 72, 101.5, AY - 120, u); src = { x: p.x + (rng() < 0.5 ? -12 : 12), y: p.y - 6 }; fill = '#FFF6F1'; }
      else return;   // succulent / pine: nothing falls
      var pe = el('path', { d: SHAPE[shape], fill: fill, 'class': 'petal-drift' }, gFx); origin0(pe);
      var a0 = rng() * 360, drift = (rng() - 0.5) * 36;
      pe.style.transform = T(src.x, src.y, a0, sc, sc); pe.style.opacity = '0.95';
      void gFx.getBoundingClientRect();
      pe.style.transition = 'transform 2.4s cubic-bezier(.4,0,.8,.6), opacity .6s ease-in 1.8s';
      pe.style.transform = T(src.x + drift, 200, a0 + 140 + rng() * 120, sc, sc); pe.style.opacity = '0';
      later(function () { remove(pe); }, 2500);
    } catch (e) { /* noop */ }
  }

  /* ───────────────────────── public API ───────────────────────── */
  window.Plants = {
    LIST: LIST,
    get: get,
    renderPot: renderPot,
    render: render,
    renderStatic: renderStatic,
    renderSeedSilhouette: renderSeedSilhouette,
    gatherEffect: gatherEffect,
    ripple: ripple,
    petalDrift: petalDrift,
    // small helpers exposed for the integrator (pure)
    util: { smooth: smooth, mulberry32: mulberry32, hexLerp: hexLerp }
  };
})();
