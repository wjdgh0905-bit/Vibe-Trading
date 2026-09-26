/*!
 * WL.Chibi — 둥근 SD 스타일 동물 캐릭터 (SVG, 파츠 조립)
 * 큰 머리·둥근 몸·짧은 다리·큰 눈. 작게 그려도 "귀엽다"로 읽히는 비율이 목표다.
 * API 는 WL.Creatures 와 같은 부분집합: make(opts) -> {el, play, setStage, setSize, setMood, setPalette, dispose}
 */
(function () {
'use strict';
var W = (window.WL = window.WL || {});

/* ── 종 데이터: 색, 귀, 꼬리, 특징 ─────────────────────────────────── */
/* ears: round|long|point|fan|tuft|none  tail: stub|puff|brush|long|thin|fin|feather|coil|none
   kind: quad|bird|fish|snake|blob  extras: horn,tusk,trunk,mane,stripes,spots,wing,dorsal,tent,crest,beak,shell,antenna,frill,sabre,flame,halo */
var SP = {
  hamster:   { n:'햄찌',     c:['#E7B77A','#F9E4C0','#8A5A2B'], ears:'round', tail:'stub',  kind:'quad', extras:['cheek'] , w:1.05 },
  rabbit:    { n:'토깽이',   c:['#EDE6DD','#FFFFFF','#8C8078'], ears:'long',  tail:'puff',  kind:'quad', extras:[] },
  fox:       { n:'여우 루',  c:['#F08A3C','#FFE6C8','#8A3E12'], ears:'point', tail:'brush', kind:'quad', extras:['socks'] },
  wolf:      { n:'늑대 카이',c:['#8FA0B8','#E6ECF4','#3F4A5E'], ears:'point', tail:'brush', kind:'quad', extras:['fang'] },
  hawk:      { n:'매 하늘',  c:['#B98A4A','#F3E3BE','#5E3F1C'], ears:'none',  tail:'feather',kind:'bird', extras:['beak','wing'] },
  bear:      { n:'곰 바우',  c:['#8D5E3A','#E8C79C','#4A2E17'], ears:'round', tail:'stub',  kind:'quad', extras:[], w:1.15 },
  tiger:     { n:'호랑이 범',c:['#F0A040','#FFF1D6','#3B2412'], ears:'round', tail:'long',  kind:'quad', extras:['stripes','fang'] },
  rhino:     { n:'코뿔소 탱',c:['#9AA3B0','#D9DEE5','#4C5563'], ears:'tuft',  tail:'thin',  kind:'quad', extras:['horn'], w:1.15 },
  elephant:  { n:'코끼리 우르',c:['#A9AFBA','#E1E5EA','#5B6270'], ears:'fan',  tail:'thin',  kind:'quad', extras:['trunk','tusk'], w:1.2 },
  shark:     { n:'상어 지느',c:['#7FA6C4','#EAF3FA','#3A5A78'], ears:'none',  tail:'fin',   kind:'fish', extras:['dorsal','fang'] },
  mammoth:   { n:'매머드 설',c:['#8B6A4B','#E4CFB2','#4B341F'], ears:'round', tail:'thin',  kind:'quad', extras:['trunk','tusk','shag'], w:1.25 },
  dragon:    { n:'비룡 아르',c:['#E0603F','#FFD9B0','#7A2A18'], ears:'point', tail:'long',  kind:'quad', extras:['horn','wing','spikes'] },
  squid:     { n:'대왕오징어 크라',c:['#9B6BB5','#EED8F5','#4B2A66'], ears:'fan', tail:'none', kind:'blob', extras:['tent'] },
  crocodile: { n:'바다악어 고르',c:['#7FA35C','#DCE8C3','#3E5A2A'], ears:'none', tail:'long', kind:'quad', extras:['snout','spikes','fang'] },
  condor:    { n:'콘도르',   c:['#4E4A55','#E9E2D8','#2B2830'], ears:'none',  tail:'feather',kind:'bird', extras:['beak','wing','ruff'] },
  spermwhale:{ n:'향유고래', c:['#6E7E93','#DDE5EE','#3B4658'], ears:'none',  tail:'fin',   kind:'fish', extras:['blow'], w:1.3 },
  bluewhale: { n:'대왕고래', c:['#6C9BC8','#E4F0FA','#2F4E70'], ears:'none',  tail:'fin',   kind:'fish', extras:['blow'], w:1.35 },
  megalodon: { n:'메갈로돈', c:['#5F7C93','#DCE6EE','#2C3D4C'], ears:'none',  tail:'fin',   kind:'fish', extras:['dorsal','fang','scar'], w:1.3 },
  titanoboa: { n:'티타노보아',c:['#7E9C4E','#E6EBC2','#3E5222'], ears:'none', tail:'coil',  kind:'snake', extras:['spots'] },
  paracer:   { n:'파라케라테리움',c:['#B8A48E','#F0E6D8','#6A5A47'], ears:'round', tail:'thin', kind:'quad', extras:['longneck'], w:1.3 },
  quetzal:   { n:'케찰코아틀루스',c:['#D9C08A','#FFF6DC','#6E5A2E'], ears:'none', tail:'thin', kind:'bird', extras:['beak','wing','crest'] },
  samjogo:   { n:'삼족오',   c:['#2E2A2E','#F5D98A','#000'],     ears:'none',  tail:'feather',kind:'bird', extras:['beak','wing','flame'] },
  kirin:     { n:'기린',     c:['#E9C874','#FFF5D8','#7A5A22'], ears:'point', tail:'brush', kind:'quad', extras:['horn','mane','flame'] },
  peng:      { n:'붕',       c:['#5F86C9','#E8F0FF','#2B4A7E'], ears:'none',  tail:'feather',kind:'bird', extras:['beak','wing','halo'], w:1.25 },
  /* 적 아키타입 */
  insect:    { n:'벌레',     c:['#7C8A3A','#DDE6A8','#3E4718'], ears:'none',  tail:'none',  kind:'blob', extras:['antenna','shell'] },
  snail:     { n:'달팽이',   c:['#C9A15A','#F3E5C2','#6C4E1E'], ears:'none',  tail:'none',  kind:'blob', extras:['antenna','shell'] },
  critter:   { n:'작은 짐승',c:['#B48A62','#F0DEC8','#5E3F26'], ears:'round', tail:'puff',  kind:'quad', extras:[] },
  bird:      { n:'새',       c:['#8FB3D9','#EEF6FF','#3E5878'], ears:'none',  tail:'feather',kind:'bird', extras:['beak','wing'] },
  reptile:   { n:'파충류',   c:['#8FAE5B','#E4EEC6','#455B22'], ears:'none',  tail:'long',  kind:'quad', extras:['frill','spikes'] },
  fish:      { n:'물고기',   c:['#79A9D8','#E6F1FB','#2E5578'], ears:'none',  tail:'fin',   kind:'fish', extras:['dorsal'] },
  cephalopod:{ n:'두족류',   c:['#B97FC3','#F3E2F7','#5A2E66'], ears:'fan',   tail:'none',  kind:'blob', extras:['tent'] },
  beast:     { n:'맹수',     c:['#A76A44','#EED3B8','#4F2E18'], ears:'point', tail:'brush', kind:'quad', extras:['fang','mane'] },
  brute:     { n:'거수',     c:['#8C8F9C','#D8DBE2','#3F424C'], ears:'tuft',  tail:'thin',  kind:'quad', extras:['horn','tusk'], w:1.2 },
  titan:     { n:'거인',     c:['#6E5A8C','#E4D8F2','#2E2340'], ears:'point', tail:'long',  kind:'quad', extras:['horn','spikes','wing','flame'], w:1.3 },
};

var CSS_ID = 'wl-chibi-css';
function css() {
  if (document.getElementById(CSS_ID)) return;
  var st = document.createElement('style'); st.id = CSS_ID;
  st.textContent =
    '.wl-ch{display:block;overflow:visible}' +
    '.wl-ch .bd{transform-origin:50px 70px}' +
    '.wl-ch.anim .bd{animation:chBreath var(--br,2.6s) ease-in-out infinite}' +
    '@keyframes chBreath{0%,100%{transform:scale(1,1)}50%{transform:scale(1.025,0.975)}}' +
    '.wl-ch.anim .ey{animation:chBlink var(--bl,4.4s) infinite;transform-origin:center}' +
    '@keyframes chBlink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.08)}}' +
    '.wl-ch.flip{transform:scaleX(-1)}' +
    '.wl-ch.is-attack .bd{animation:chAtk .42s ease-out 1}' +
    '@keyframes chAtk{0%{transform:translate(0,0)}35%{transform:translate(9px,-4px) rotate(-6deg)}100%{transform:none}}' +
    '.wl-ch.is-hurt{animation:chHurt .3s ease-out 1}' +
    '@keyframes chHurt{0%{transform:translate(0,0)}30%{transform:translate(-5px,0)}60%{transform:translate(3px,0)}100%{transform:none}}' +
    '.wl-ch.is-cheer .bd{animation:chCheer .5s ease-out 2}' +
    '@keyframes chCheer{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}' +
    '.wl-ch.is-die{opacity:0;transform:translateY(8px) scale(.9);transition:opacity .35s,transform .35s}' +
    '.wl-ch.is-eat .hd{animation:chEat .25s ease-in-out 3;transform-origin:58px 40px}' +
    '@keyframes chEat{50%{transform:rotate(4deg)}}' +
    '.wl-ch.is-pet .hd{animation:chPet .6s ease-in-out 1;transform-origin:58px 40px}' +
    '@keyframes chPet{30%{transform:rotate(-8deg) translateY(2px)}}';
  document.head.appendChild(st);
}

var NS = 'http://www.w3.org/2000/svg';
function E(tag, attrs, parent) {
  var e = document.createElementNS(NS, tag);
  for (var k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
function hex2rgb(h) { h = h.replace('#', ''); if (h.length === 3) h = h.replace(/(.)/g, '$1$1'); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
function rgb2hex(c) { return '#' + c.map(function (v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? '0' : '') + v.toString(16); }).join(''); }
function mix(a, b, t) { var A = hex2rgb(a), B = hex2rgb(b); return rgb2hex([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t]); }
function shade(h, t) { return mix(h, '#2A1E14', t); }

/* ── 조립 ────────────────────────────────────────────────────────────── */
function build(svg, sp, o) {
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  var st = o.stage | 0, baby = st === 0, elite = st >= 3, vet = st >= 4;
  var fur = sp.c[0], belly = sp.c[1], dark = sp.c[2];
  if (o.cold) { fur = mix(fur, '#4A4E5A', 0.22); belly = mix(belly, '#9AA0AA', 0.18); }
  var line = shade(fur, 0.62), lineW = 2.2;
  var g = E('g', { 'class': 'root' }, svg);
  /* 그림자 */
  E('ellipse', { cx: 52, cy: 92, rx: 26, ry: 5, fill: 'rgba(20,24,20,.22)' }, g);

  var headR = baby ? 25 : 22, hx = 60, hy = baby ? 44 : 40;
  var bx = 44, by = 66, brx = baby ? 19 : 22, bry = baby ? 15 : 18;
  var K = sp.kind;
  var bd = E('g', { 'class': 'bd' }, g);

  /* 꼬리 (몸 뒤) */
  var tail = E('g', { 'class': 'tl' }, bd);
  if (sp.tail === 'brush') E('path', { d: 'M28 70 C10 62 8 44 22 40 C30 46 30 60 34 66Z', fill: fur, stroke: line, 'stroke-width': lineW, 'stroke-linejoin': 'round' }, tail),
    E('path', { d: 'M22 41 C14 46 14 56 20 62', fill: 'none', stroke: belly, 'stroke-width': 5, 'stroke-linecap': 'round' }, tail);
  if (sp.tail === 'puff') E('circle', { cx: 26, cy: 68, r: 7, fill: belly, stroke: line, 'stroke-width': lineW }, tail);
  if (sp.tail === 'stub') E('circle', { cx: 26, cy: 70, r: 4.5, fill: fur, stroke: line, 'stroke-width': lineW }, tail);
  if (sp.tail === 'long') E('path', { d: 'M28 72 C10 74 6 56 14 48', fill: 'none', stroke: line, 'stroke-width': 8.4, 'stroke-linecap': 'round' }, tail),
    E('path', { d: 'M28 72 C10 74 6 56 14 48', fill: 'none', stroke: fur, 'stroke-width': 4.6, 'stroke-linecap': 'round' }, tail);
  if (sp.tail === 'thin') E('path', { d: 'M26 66 C16 68 14 76 18 82', fill: 'none', stroke: line, 'stroke-width': 3.2, 'stroke-linecap': 'round' }, tail),
    E('circle', { cx: 18, cy: 83, r: 3, fill: dark }, tail);
  if (sp.tail === 'feather') E('path', { d: 'M26 66 L8 58 L12 70 L6 78 L24 76Z', fill: fur, stroke: line, 'stroke-width': lineW, 'stroke-linejoin': 'round' }, tail);
  if (sp.tail === 'fin') E('path', { d: 'M24 66 L8 52 L14 68 L6 84 L26 74Z', fill: fur, stroke: line, 'stroke-width': lineW, 'stroke-linejoin': 'round' }, tail);
  if (sp.tail === 'coil') E('path', { d: 'M30 74 C8 78 6 60 20 58 C30 57 30 68 22 68', fill: 'none', stroke: line, 'stroke-width': 9, 'stroke-linecap': 'round' }, tail),
    E('path', { d: 'M30 74 C8 78 6 60 20 58 C30 57 30 68 22 68', fill: 'none', stroke: fur, 'stroke-width': 5.4, 'stroke-linecap': 'round' }, tail);

  /* 날개 (뒤) */
  if (sp.extras.indexOf('wing') >= 0) {
    E('path', { d: K === 'bird' ? 'M40 58 C20 40 10 44 6 56 C16 54 26 60 36 68Z' : 'M38 54 C22 30 10 34 8 48 C18 46 28 54 36 62Z',
      fill: mix(fur, dark, 0.25), stroke: line, 'stroke-width': lineW, 'stroke-linejoin': 'round' }, bd);
  }
  /* 뒷다리 */
  var legY = by + bry - 4;
  if (K === 'quad') {
    E('rect', { x: 30, y: legY, width: 10, height: 14, rx: 5, fill: shade(fur, 0.12), stroke: line, 'stroke-width': lineW }, bd);
    E('rect', { x: 46, y: legY, width: 10, height: 14, rx: 5, fill: shade(fur, 0.12), stroke: line, 'stroke-width': lineW }, bd);
  }
  /* 몸통 */
  if (K === 'fish') {
    E('ellipse', { cx: bx + 4, cy: by, rx: brx + 6, ry: bry - 2, fill: fur, stroke: line, 'stroke-width': lineW }, bd);
    E('ellipse', { cx: bx + 6, cy: by + 6, rx: brx, ry: bry * 0.5, fill: belly }, bd);
    if (sp.extras.indexOf('dorsal') >= 0) E('path', { d: 'M40 50 L46 34 L56 50Z', fill: fur, stroke: line, 'stroke-width': lineW, 'stroke-linejoin': 'round' }, bd);
    E('path', { d: 'M46 74 L38 84 L56 78Z', fill: fur, stroke: line, 'stroke-width': lineW, 'stroke-linejoin': 'round' }, bd);
  } else if (K === 'snake') {
    E('path', { d: 'M62 60 C50 72 34 76 26 70', fill: 'none', stroke: line, 'stroke-width': 18, 'stroke-linecap': 'round' }, bd);
    E('path', { d: 'M62 60 C50 72 34 76 26 70', fill: 'none', stroke: fur, 'stroke-width': 14, 'stroke-linecap': 'round' }, bd);
    E('path', { d: 'M60 64 C50 74 36 78 28 72', fill: 'none', stroke: belly, 'stroke-width': 5, 'stroke-linecap': 'round' }, bd);
  } else if (K === 'blob') {
    E('ellipse', { cx: bx + 6, cy: by + 2, rx: brx + 2, ry: bry + 2, fill: fur, stroke: line, 'stroke-width': lineW }, bd);
    E('ellipse', { cx: bx + 8, cy: by + 8, rx: brx * 0.8, ry: bry * 0.5, fill: belly }, bd);
  } else {
    E('ellipse', { cx: bx, cy: by, rx: brx, ry: bry, fill: fur, stroke: line, 'stroke-width': lineW }, bd);
    E('ellipse', { cx: bx + 4, cy: by + 5, rx: brx * 0.62, ry: bry * 0.6, fill: belly }, bd);
    if (sp.extras.indexOf('stripes') >= 0) for (var i = 0; i < 3; i++)
      E('path', { d: 'M' + (30 + i * 9) + ' ' + (by - 14) + ' q3 6 0 12', fill: 'none', stroke: dark, 'stroke-width': 3.2, 'stroke-linecap': 'round' }, bd);
    if (sp.extras.indexOf('spots') >= 0) [[34, 60], [46, 56], [40, 70]].forEach(function (p) { E('circle', { cx: p[0], cy: p[1], r: 3, fill: dark, opacity: .55 }, bd); });
    if (sp.extras.indexOf('shag') >= 0) E('path', { d: 'M24 70 q4 8 8 0 q4 8 8 0 q4 8 8 0 q4 8 8 0', fill: 'none', stroke: line, 'stroke-width': 2.4, 'stroke-linecap': 'round' }, bd);
    if (sp.extras.indexOf('spikes') >= 0) E('path', { d: 'M30 50 l4 -8 l4 8 l4 -8 l4 8 l4 -8 l4 8', fill: shade(fur, 0.2), stroke: line, 'stroke-width': 1.8, 'stroke-linejoin': 'round' }, bd);
    if (sp.extras.indexOf('shell') >= 0) E('circle', { cx: 40, cy: 58, r: 15, fill: shade(fur, 0.15), stroke: line, 'stroke-width': lineW }, bd),
      E('path', { d: 'M40 58 m-9 0 a9 9 0 1 1 18 0 a6 6 0 1 1 -12 0', fill: 'none', stroke: line, 'stroke-width': 2 }, bd);
  }
  /* 앞다리 / 지느러미 / 촉수 */
  if (K === 'quad') {
    E('rect', { x: 38, y: legY + 2, width: 10, height: 14, rx: 5, fill: fur, stroke: line, 'stroke-width': lineW }, bd);
    E('rect', { x: 54, y: legY + 2, width: 10, height: 14, rx: 5, fill: fur, stroke: line, 'stroke-width': lineW }, bd);
    if (sp.extras.indexOf('socks') >= 0) E('rect', { x: 54, y: legY + 9, width: 10, height: 7, rx: 4, fill: dark }, bd),
      E('rect', { x: 38, y: legY + 9, width: 10, height: 7, rx: 4, fill: dark }, bd);
  } else if (K === 'bird') {
    E('path', { d: 'M46 82 l-3 8 M50 82 l0 8 M54 82 l3 8', fill: 'none', stroke: '#E0A040', 'stroke-width': 3, 'stroke-linecap': 'round' }, bd);
  } else if (K === 'fish') {
    E('path', { d: 'M50 74 L44 86 L60 80Z', fill: fur, stroke: line, 'stroke-width': lineW, 'stroke-linejoin': 'round' }, bd);
  }
  if (sp.extras.indexOf('tent') >= 0) for (var t = 0; t < 4; t++)
    E('path', { d: 'M' + (36 + t * 8) + ' 80 q' + (t % 2 ? 6 : -6) + ' 10 0 16', fill: 'none', stroke: fur, 'stroke-width': 5, 'stroke-linecap': 'round' }, bd),
    E('path', { d: 'M' + (36 + t * 8) + ' 80 q' + (t % 2 ? 6 : -6) + ' 10 0 16', fill: 'none', stroke: line, 'stroke-width': 1.4, 'stroke-linecap': 'round', opacity: .5 }, bd);
  if (sp.extras.indexOf('mane') >= 0) E('circle', { cx: hx - 2, cy: hy + 2, r: headR + 7, fill: shade(fur, 0.28), stroke: line, 'stroke-width': lineW }, bd);

  /* 머리 */
  var hd = E('g', { 'class': 'hd' }, bd);
  if (sp.ears === 'long') { E('ellipse', { cx: hx - 6, cy: hy - 28, rx: 6, ry: 15, fill: fur, stroke: line, 'stroke-width': lineW }, hd); E('ellipse', { cx: hx - 6, cy: hy - 27, rx: 3, ry: 10, fill: '#F5B9C0' }, hd);
    E('ellipse', { cx: hx + 6, cy: hy - 26, rx: 6, ry: 15, fill: fur, stroke: line, 'stroke-width': lineW, transform: 'rotate(12 ' + (hx + 6) + ' ' + (hy - 26) + ')' }, hd); }
  if (sp.ears === 'point') { E('path', { d: 'M' + (hx - 20) + ' ' + (hy - 8) + ' L' + (hx - 16) + ' ' + (hy - 32) + ' L' + (hx - 2) + ' ' + (hy - 20) + 'Z', fill: fur, stroke: line, 'stroke-width': lineW, 'stroke-linejoin': 'round' }, hd);
    E('path', { d: 'M' + (hx + 2) + ' ' + (hy - 20) + ' L' + (hx + 10) + ' ' + (hy - 33) + ' L' + (hx + 20) + ' ' + (hy - 10) + 'Z', fill: fur, stroke: line, 'stroke-width': lineW, 'stroke-linejoin': 'round' }, hd);
    E('path', { d: 'M' + (hx + 5) + ' ' + (hy - 18) + ' L' + (hx + 10) + ' ' + (hy - 27) + ' L' + (hx + 16) + ' ' + (hy - 12) + 'Z', fill: '#F3B7BE' }, hd); }
  if (sp.ears === 'round') { E('circle', { cx: hx - 15, cy: hy - 17, r: 8, fill: fur, stroke: line, 'stroke-width': lineW }, hd); E('circle', { cx: hx + 13, cy: hy - 18, r: 8, fill: fur, stroke: line, 'stroke-width': lineW }, hd);
    E('circle', { cx: hx + 13, cy: hy - 18, r: 4, fill: '#F3B7BE' }, hd); }
  if (sp.ears === 'fan') { E('ellipse', { cx: hx - 20, cy: hy - 2, rx: 12, ry: 16, fill: shade(fur, 0.08), stroke: line, 'stroke-width': lineW }, hd); E('ellipse', { cx: hx - 20, cy: hy - 2, rx: 7, ry: 10, fill: '#E9B5B8', opacity: .8 }, hd); }
  if (sp.ears === 'tuft') { E('ellipse', { cx: hx - 12, cy: hy - 19, rx: 5, ry: 7, fill: fur, stroke: line, 'stroke-width': lineW }, hd); E('ellipse', { cx: hx + 10, cy: hy - 20, rx: 5, ry: 7, fill: fur, stroke: line, 'stroke-width': lineW }, hd); }
  if (sp.extras.indexOf('horn') >= 0) {
    if (K === 'quad' && (sp.n.indexOf('코뿔소') >= 0 || sp.n.indexOf('거수') >= 0)) E('path', { d: 'M' + (hx + 18) + ' ' + (hy + 4) + ' L' + (hx + 30) + ' ' + (hy - 8) + ' L' + (hx + 20) + ' ' + (hy + 12) + 'Z', fill: '#EEE2C8', stroke: line, 'stroke-width': lineW, 'stroke-linejoin': 'round' }, hd);
    else { E('path', { d: 'M' + (hx - 8) + ' ' + (hy - 18) + ' L' + (hx - 12) + ' ' + (hy - 34) + ' L' + (hx - 2) + ' ' + (hy - 20) + 'Z', fill: '#EEE2C8', stroke: line, 'stroke-width': lineW, 'stroke-linejoin': 'round' }, hd);
      E('path', { d: 'M' + (hx + 6) + ' ' + (hy - 20) + ' L' + (hx + 6) + ' ' + (hy - 36) + ' L' + (hx + 14) + ' ' + (hy - 18) + 'Z', fill: '#EEE2C8', stroke: line, 'stroke-width': lineW, 'stroke-linejoin': 'round' }, hd); }
  }
  if (sp.extras.indexOf('crest') >= 0) E('path', { d: 'M' + (hx - 4) + ' ' + (hy - 20) + ' L' + (hx - 14) + ' ' + (hy - 36) + ' L' + (hx + 2) + ' ' + (hy - 26) + ' L' + (hx + 8) + ' ' + (hy - 38) + ' L' + (hx + 10) + ' ' + (hy - 20) + 'Z', fill: '#E2545C', stroke: line, 'stroke-width': lineW, 'stroke-linejoin': 'round' }, hd);
  if (sp.extras.indexOf('flame') >= 0) E('path', { d: 'M' + (hx - 2) + ' ' + (hy - 22) + ' C' + (hx - 10) + ' ' + (hy - 30) + ' ' + (hx - 4) + ' ' + (hy - 40) + ' ' + hx + ' ' + (hy - 44) + ' C' + (hx + 2) + ' ' + (hy - 34) + ' ' + (hx + 10) + ' ' + (hy - 34) + ' ' + (hx + 6) + ' ' + (hy - 22) + 'Z', fill: '#FF9333', stroke: '#C1391A', 'stroke-width': 1.6 }, hd);
  if (sp.extras.indexOf('halo') >= 0) E('ellipse', { cx: hx, cy: hy - 30, rx: 16, ry: 4, fill: 'none', stroke: '#FFD36B', 'stroke-width': 3 }, hd);
  if (sp.extras.indexOf('longneck') >= 0) E('rect', { x: hx - 12, y: hy + 8, width: 20, height: 22, rx: 8, fill: fur, stroke: line, 'stroke-width': lineW }, hd);
  /* 얼굴 */
  E('circle', { cx: hx, cy: hy, r: headR, fill: fur, stroke: line, 'stroke-width': lineW }, hd);
  if (K !== 'bird') E('ellipse', { cx: hx + 12, cy: hy + 9, rx: 10, ry: 7, fill: belly }, hd);         /* 주둥이 밝은 부분 */
  if (sp.extras.indexOf('snout') >= 0) E('rect', { x: hx + 6, y: hy, width: 26, height: 12, rx: 6, fill: fur, stroke: line, 'stroke-width': lineW }, hd);
  if (sp.extras.indexOf('trunk') >= 0) E('path', { d: 'M' + (hx + 16) + ' ' + (hy + 4) + ' C' + (hx + 28) + ' ' + (hy + 14) + ' ' + (hx + 26) + ' ' + (hy + 30) + ' ' + (hx + 18) + ' ' + (hy + 34), fill: 'none', stroke: line, 'stroke-width': 11, 'stroke-linecap': 'round' }, hd),
    E('path', { d: 'M' + (hx + 16) + ' ' + (hy + 4) + ' C' + (hx + 28) + ' ' + (hy + 14) + ' ' + (hx + 26) + ' ' + (hy + 30) + ' ' + (hx + 18) + ' ' + (hy + 34), fill: 'none', stroke: fur, 'stroke-width': 7.5, 'stroke-linecap': 'round' }, hd);
  if (sp.extras.indexOf('tusk') >= 0) E('path', { d: 'M' + (hx + 10) + ' ' + (hy + 12) + ' q10 8 14 2', fill: 'none', stroke: '#F3ECDC', 'stroke-width': 4, 'stroke-linecap': 'round' }, hd);
  if (sp.extras.indexOf('beak') >= 0) E('path', { d: 'M' + (hx + 14) + ' ' + (hy + 3) + ' L' + (hx + 32) + ' ' + (hy + 9) + ' L' + (hx + 14) + ' ' + (hy + 13) + 'Z', fill: '#F2B341', stroke: line, 'stroke-width': lineW, 'stroke-linejoin': 'round' }, hd);
  if (sp.extras.indexOf('ruff') >= 0) E('ellipse', { cx: hx - 2, cy: hy + 20, rx: 18, ry: 6, fill: belly, stroke: line, 'stroke-width': lineW }, hd);
  if (sp.extras.indexOf('frill') >= 0) E('path', { d: 'M' + (hx - 22) + ' ' + hy + ' q-8 -14 4 -22 q6 12 10 -2', fill: shade(fur, 0.1), stroke: line, 'stroke-width': lineW, 'stroke-linejoin': 'round' }, hd);
  if (sp.extras.indexOf('antenna') >= 0) E('path', { d: 'M' + (hx - 4) + ' ' + (hy - 20) + ' q-6 -12 -12 -10 M' + (hx + 8) + ' ' + (hy - 20) + ' q2 -14 10 -12', fill: 'none', stroke: line, 'stroke-width': 2.4, 'stroke-linecap': 'round' }, hd);
  if (sp.extras.indexOf('cheek') >= 0) E('circle', { cx: hx + 4, cy: hy + 12, r: 8, fill: belly, stroke: line, 'stroke-width': 1.6 }, hd);
  if (sp.extras.indexOf('blow') >= 0) E('path', { d: 'M' + (hx - 6) + ' ' + (hy - 22) + ' q-4 -10 2 -14 M' + (hx - 2) + ' ' + (hy - 22) + ' q2 -12 8 -14', fill: 'none', stroke: '#BFE3F5', 'stroke-width': 3, 'stroke-linecap': 'round' }, hd);
  /* 눈 — 크고 반짝이게 */
  var eyeR = baby ? 5.2 : 4.4, ex = hx + 9, ey = hy - 6, ex2 = hx - 6;
  var fierce = o.mood === 'fierce';
  [[ex, ey, 1], [ex2, ey + 0.8, 0.82]].forEach(function (p) {
    var eg = E('g', { 'class': 'ey' }, hd);
    E('circle', { cx: p[0], cy: p[1], r: eyeR * p[2] + 1.6, fill: '#fff' }, eg);
    E('circle', { cx: p[0] + 0.6, cy: p[1] + 0.4, r: eyeR * p[2], fill: '#2B1E14' }, eg);
    E('circle', { cx: p[0] + 2.2, cy: p[1] - 1.8, r: eyeR * p[2] * 0.42, fill: '#fff' }, eg);
    if (fierce) E('path', { d: 'M' + (p[0] - 7) + ' ' + (p[1] - 9) + ' L' + (p[0] + 6) + ' ' + (p[1] - 5), stroke: line, 'stroke-width': 3, 'stroke-linecap': 'round' }, eg);
  });
  if (K !== 'bird') { E('ellipse', { cx: hx + 19, cy: hy + 6, rx: 3, ry: 2.2, fill: dark }, hd);
    E('path', { d: 'M' + (hx + 14) + ' ' + (hy + 12) + ' q5 4 10 0', fill: 'none', stroke: dark, 'stroke-width': 1.8, 'stroke-linecap': 'round' }, hd); }
  if (sp.extras.indexOf('fang') >= 0) E('path', { d: 'M' + (hx + 15) + ' ' + (hy + 13) + ' l2 5 l2 -5 M' + (hx + 21) + ' ' + (hy + 13) + ' l2 5 l2 -5', fill: '#fff', stroke: line, 'stroke-width': 1 }, hd);
  E('circle', { cx: hx - 13, cy: hy + 4, r: 3.4, fill: '#F08A8A', opacity: .42 }, hd);   /* 볼터치 — 먼 쪽 뺨 */
  E('circle', { cx: hx + 1, cy: hy + 5, r: 2.6, fill: '#F08A8A', opacity: .3 }, hd);
  /* 성장 장식 — 동료에게만 (적은 목줄·훈장·왕관 없음) */
  if (st >= 1 && !o.cold) E('path', { d: 'M' + (hx - 14) + ' ' + (hy + 16) + ' q14 10 28 0', fill: 'none', stroke: elite ? '#E14E3D' : '#5B8ED8', 'stroke-width': 3.6, 'stroke-linecap': 'round' }, hd);
  if (elite && !o.cold) E('circle', { cx: hx, cy: hy + 21, r: 2.6, fill: '#FFD36B', stroke: line, 'stroke-width': 1 }, hd);
  if (vet && !o.cold) E('path', { d: 'M' + (hx - 10) + ' ' + (hy - headR - 2) + ' l4 -9 l6 6 l6 -6 l4 9Z', fill: '#FFD36B', stroke: '#B8860B', 'stroke-width': 1.6, 'stroke-linejoin': 'round' }, hd);
  if (sp.extras.indexOf('scar') >= 0) E('path', { d: 'M' + (hx - 14) + ' ' + (hy - 6) + ' l6 6 M' + (hx - 8) + ' ' + (hy - 6) + ' l-6 6', stroke: line, 'stroke-width': 1.6 }, hd);
}

var uid = 0;
function make(o) {
  css();
  o = o || {};
  var sp = SP[o.species] || SP.critter;
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('class', 'wl-ch' + (o.flip ? ' flip' : '') + (o.anim !== false ? ' anim' : ''));
  svg.setAttribute('aria-label', o.label || sp.n);
  var H = { el: svg, id: o.species, stage: o.stage | 0, size: o.size || 96, state: 'idle', mood: o.mood || 'calm', spec: sp };
  var cold = !!(o.palette && o.palette.rim === 'cold');
  var seed = (o.seed | 0) || (++uid * 7919);
  svg.style.setProperty('--br', (2.2 + (seed % 9) * 0.12) + 's');
  svg.style.setProperty('--bl', (3.6 + (seed % 7) * 0.5) + 's');
  function paint() { build(svg, sp, { stage: H.stage, cold: cold, mood: H.mood }); }
  function size() { var w = H.size * (sp.w || 1); svg.style.width = w + 'px'; svg.style.height = H.size + 'px'; }
  paint(); size();
  var tmr = 0;
  H.play = function (state) {
    if (tmr) { clearTimeout(tmr); tmr = 0; }
    ['is-attack', 'is-hurt', 'is-cheer', 'is-die', 'is-eat', 'is-pet'].forEach(function (c) { svg.classList.remove(c); });
    if (state === 'idle') return H;
    void svg.offsetWidth;
    svg.classList.add('is-' + state);
    if (state !== 'die') tmr = setTimeout(function () { svg.classList.remove('is-' + state); tmr = 0; }, state === 'cheer' ? 1000 : 500);
    return H;
  };
  H.setStage = function (n) { n = Math.max(0, Math.min(4, n | 0)); if (n !== H.stage) { H.stage = n; paint(); } return H; };
  H.setSize = function (px) { H.size = px; size(); return H; };
  H.setMood = function (m) { H.mood = m || 'calm'; paint(); return H; };
  H.setPalette = function () { return H; };
  H.setFlip = function (f) { svg.classList.toggle('flip', !!f); return H; };
  H.dispose = function () { if (tmr) clearTimeout(tmr); if (svg.parentNode) svg.parentNode.removeChild(svg); };
  return H;
}
var Q = 2;
W.Chibi = {
  SPECIES: SP,
  make: make,
  quality: function (n) { if (n === undefined) return Q; Q = n | 0; document.documentElement.classList.toggle('wl-ch-still', Q <= 0); return Q; },
  autoQuality: function () {},
  drive: function () {},
};
/* quality 0: 상시 애니메이션 정지(상태 연출은 유지) */
(function () { var st = document.createElement('style'); st.textContent = '.wl-ch-still .wl-ch.anim .bd,.wl-ch-still .wl-ch.anim .ey{animation:none}'; document.head.appendChild(st); })();
})();
