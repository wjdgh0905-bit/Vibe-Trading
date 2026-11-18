/*!
 * WL.Icons — 12×12 픽셀 아이콘을 data-URL PNG 로 굽는다 (한 번만, 캐시)
 * url(id) → 'data:image/png;base64,…'   apply(el, id) → background-image 지정
 */
(function () {
'use strict';
var W = (window.WL = window.WL || {});
var C = { g:'#FFC65C', G:'#E0862A', o:'#3B2A1A', w:'#FFFFFF', c:'#F3EDE2', r:'#FF6B57', R:'#B3261E', y:'#FFE58A',
          l:'#B8E06A', L:'#6E9A3A', s:'#5FE1C8', S:'#2A9A88', b:'#6EB4FF', B:'#2E6BC4', p:'#C79BFF', P:'#7A4FCF', k:'#1A1410', d:'#8A7A6A' };
var A = {
  gold: ['............','....gggg....','...gGGGGg...','..gGggggGg..','..gGgooggg..','..gGggggGg..','..gGgooggg..','..gGggggGg..','...gGGGGg...','....gggg....','............','............'],
  paw:  ['............','..gg....gg..','.gGGg..gGGg.','.gGGg..gGGg.','..gg....gg..','....gggg....','...gGGGGg...','..gGGGGGGg..','..gGGGGGGg..','...gGGGGg...','....gggg....','............'],
  snack:['............','.....oo.....','....oLLo....','...oLllLo...','...oLLLLo...','....oooo....','...gGGGGg...','..gGgGgGGg..','..gGGgGgGg..','..gGGGGGGg..','...gGGGGg...','....gggg....'],
  soul: ['............','.....s......','....ss......','...sSs.s....','..sSSs.ss...','..sSSSsSs...','.sSSSSSSSs..','.sSSSSSSSs..','.sSSSwSSSs..','..sSSwwSs...','...ssssss...','............'],
  dps:  ['............','.........w..','........wc..','.......wc...','......wc....','..o..wc.....','..oowc......','..ooo.......','.oooo.......','.oo.oo......','.o..........','............'],
  best: ['............','..gggggggg..','..gGGGGGGg..','..gGGGGGGg..','.gGgGGGGgGg.','.g.gGGGGg.g.','....gGGg....','.....gg.....','....gggg....','...gGGGGg...','..gggggggg..','............'],
  raid: ['............','..R......R..','..RR....RR..','..RrRRRRrR..','..RrrrrrrR..','..RrwRRwrR..','..RrrrrrrR..','..RRrrrrRR..','...RrRRrR...','....RrrR....','.....RR.....','............'],
  /* 스킬 */
  roar:     ['............','....rr......','...rRRr.....','..rRRRRr....','..rRwRwRr...','..rRRRRRr...','...rRkkR....','....rRRr.w..','.....rr.ww..','.......www..','......ww....','............'],
  rend:     ['............','.w....w....w','.ww...ww..ww','..ww...ww.ww','...ww...www.','....ww..ww..','.....ww.....','....ww.ww...','...ww...ww..','..ww.....ww.','.w........w.','............'],
  gold:     ['............','....gggg....','...gyyyyg...','..gyGGGGyg..','..gyGooGyg..','..gyGooGyg..','..gyGGGGyg..','...gyyyyg...','....gggg....','..gg.gg.gg..','.gGggGggGg..','..gg.gg.gg..'],
  execute:  ['............','.....o......','....oco.....','....oco.....','....oco.....','....oco.....','....oco.....','...ooooo....','..oRRRRRo...','..oRRRRRo...','...ooooo....','............'],
  thunder:  ['............','......yyyy..','.....yyyy...','....yyyy....','...yyyyyyy..','..yyyyyyy...','.....yyyy...','....yyyy....','...yyyy.....','..yyy.......','..yy........','............'],
  breath:   ['............','....bbbb....','..bbBBBBbb..','.bBBbbbbBBb.','.bBb....bBb.','.bB..ww..Bb.','.bB..ww..Bb.','.bBb....bBb.','.bBBbbbbBBb.','..bbBBBBbb..','....bbbb....','............'],
  myriad:   ['............','.l..l..l..l.','.lL.lL.lL.lL','..lL.lL.lL.l','...l..l..l..','.l..l..l..l.','.lL.lL.lL.lL','..lL.lL.lL.l','...l..l..l..','.l..l..l..l.','.lL.lL.lL.lL','............'],
  bosshunt: ['............','..R......R..','..RR....RR..','..RrRRRRrR..','..RrrrrrrR..','..RrwRRwrR..','..RrrrrrrR..','..RRrrrrRR..','...RrRRrR...','....RrrR....','.....RR.....','............'],
  emberlife:['............','.....g......','....gg......','...ggg.g....','..gGGggg....','..gGGGGgg...','.gGGyyGGg...','.gGyyyyGg...','.gGGyyGGg...','..gGGGGg....','...gggg.....','............'],
  stampede: ['............','............','..w.........','..ww..w.....','..www.ww..w.','..wwwwwww.ww','..wwwwwwwwww','..wwwwwww.ww','..www.ww..w.','..ww..w.....','..w.........','............'],
  intrude:  ['............','....pppp....','...pPPPPp...','..pPPPPPPp..','..pPwPPwPp..','..pPPPPPPp..','..pPPkkPPp..','...pPPPPp...','..p.pppp.p..','.pPp....pPp.','..p......p..','............'],
  brand:    ['............','..ssssssss..','.sSSSSSSSSs.','.sS......Ss.','.sS.ssss.Ss.','.sS.sSSs.Ss.','.sS.sSSs.Ss.','.sS.ssss.Ss.','.sS......Ss.','.sSSSSSSSSs.','..ssssssss..','............'],
};
var CACHE = {};
function url(id) {
  if (CACHE[id]) return CACHE[id];
  var rows = A[id]; if (!rows) return '';
  var cv = document.createElement('canvas'); cv.width = 12; cv.height = 12;
  var ctx = cv.getContext('2d');
  for (var y = 0; y < 12; y++) for (var x = 0; x < 12; x++) { var ch = rows[y][x]; if (!ch || ch === '.') continue; ctx.fillStyle = C[ch] || '#fff'; ctx.fillRect(x, y, 1, 1); }
  var u = cv.toDataURL('image/png'); cv.width = cv.height = 0;
  CACHE[id] = u; return u;
}
function apply(el, id) { var u = url(id); if (u && el) el.style.backgroundImage = 'url(' + u + ')'; return el; }
function boot() {
  var els = document.querySelectorAll('[data-ic]');
  for (var i = 0; i < els.length; i++) apply(els[i], els[i].getAttribute('data-ic'));
}
W.Icons = { url: url, apply: apply, boot: boot, has: function (id) { return !!A[id]; } };
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
