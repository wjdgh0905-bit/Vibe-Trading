/*!
 * WL.Pixel — 픽셀 아트 동물 스프라이트 (옆모습, 눈 하나, 3톤 명암)
 * 템플릿(문자 격자) + 팔레트 + 오버레이(종 특징)로 34종을 만든다.
 * 캔버스 36×26 을 한 번 그리고 CSS 로 확대(image-rendering:pixelated). 애니메이션은 프레임 교체 + 래퍼 transform 뿐.
 * API: make(opts) -> {el, play(state), setStage(n), setSize(px), setMood(m), setPalette(p), dispose()}
 */
(function () {
'use strict';
var W = (window.WL = window.WL || {});
var GW = 40, GH = 26;

/* ── 팔레트 키: o 외곽 f 털 s 그늘 h 하이라이트 b 배 e 눈 w 눈빛 n 코 k 무늬 x 뿔/엄니 p 귀속 ── */
function pal(f, b, k) {
  return { o: shade(f, .62), f: f, s: shade(f, .28), h: tint(f, .28), b: b, e: '#1A1410', w: '#F4F0E8', n: '#1E1512', k: k || shade(f, .45), x: '#EDE4CF', p: '#D98F96', t: '#F2B341', c: '#C1391A', g: '#FFD36B' };
}
function hex(h) { h = h.replace('#', ''); if (h.length === 3) h = h.replace(/(.)/g, '$1$1'); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
function rgb(c) { return '#' + c.map(function (v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? '0' : '') + v.toString(16); }).join(''); }
function shade(h, t) { var c = hex(h); return rgb([c[0] * (1 - t) + 26 * t, c[1] * (1 - t) + 20 * t, c[2] * (1 - t) + 22 * t]); }
function tint(h, t) { var c = hex(h); return rgb([c[0] + (255 - c[0]) * t, c[1] + (250 - c[1]) * t, c[2] + (235 - c[2]) * t]); }
function mixc(a, b, t) { var A = hex(a), B = hex(b); return rgb([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t]); }

/* ── 템플릿: 36×26, 오른쪽을 본다. 프레임 0 = 서있기, 1 = 걷기/공격 ── */
var T = {};
T.quad = [[
'........................................',
'........................................',
'.........................oo.............',
'........................ofho............',
'.......................oofhhoo..........',
'......................offfhhffoo........',
'.....................offfffffweffo......',
'....................offffffffeefffo.....',
'..........ooooooooooffffffffffffffno....',
'........oofhhhhhhhfffffffffffffffoo.....',
'.......ofhhhfffffffffffffffffsooo.......',
'......offhfffffffffffffffffssso.........',
'.....offffffffffffffffffssssso..........',
'....ofsfffffffffffffffssssssso..........',
'...ofssfffffffffffffsssssssso...........',
'..ofsssffffffffffbbbsssssso.............',
'..osssssssssssssbbbbbssssso.............',
'...oossssssssssssbbbssssoo..............',
'.....oosssoooosssssoooo.................',
'.......osso..osso.oss..oo...............',
'.......oss...oss..oss..oo...............',
'.......oss...os...os...oo...............',
'.......oso...oso..oso..oo...............',
'.......ooo...ooo..ooo..oo...............',
'........................................',
'........................................',
],[
'........................................',
'........................................',
'........................................',
'.........................oo.............',
'........................ofho............',
'.......................oofhhoo..........',
'......................offfhhffoo........',
'.....................offfffffweffo......',
'....................offffffffeefffo.....',
'..........ooooooooooffffffffffffffno....',
'........oofhhhhhhhfffffffffffffffoo.....',
'.......ofhhhfffffffffffffffffsooo.......',
'......offhfffffffffffffffffssso.........',
'.....offffffffffffffffffssssso..........',
'....ofsfffffffffffffffssssssso..........',
'...ofssfffffffffffffsssssssso...........',
'..ofsssffffffffffbbbsssssso.............',
'..osssssssssssssbbbbbsssssoo............',
'...oosssooosssssssoooossoooo............',
'.....osso.ossoo.....oss..oo.............',
'....oss...oss........oss..o.............',
'...oss....os..........oss...............',
'...oso....oso..........oso..............',
'...ooo....ooo..........ooo..............',
'........................................',
'........................................',
]];
/* 위 quad 의 머리는 오른쪽 위(열 23~27, 행 5~9). 눈·코·귀 오버레이는 거기에 찍는다. */

/* ── 프레임 1 생성기: 다리만 벌린다(앞다리 +2, 뒷다리 -2, 몸통·머리는 그대로) / 위로 띄운다 ── */
function stride(rows, from, a, b) {
  return rows.map(function (r, y) {
    if (y < from) return r;
    r = padRow(r); var out = new Array(GW).fill('.'), k = (y === from) ? 1 : 2;
    for (var x = 0; x < GW; x++) { var ch = r[x]; if (ch === '.') continue; var nx = x < a ? x - k : x >= b ? x + k : x; if (nx >= 0 && nx < GW) out[nx] = ch; }
    return out.join('');
  });
}
function lift(rows, n) { var out = rows.slice(n); while (out.length < GH) out.push(''); return out; }

/* 개과(여우·늑대): 가는 몸, 긴 다리, 뾰족한 주둥이, 위로 치켜든 풍성한 꼬리 — 머리는 quad 와 같은 자리 */
var CANID0 = [
'........................................',
'........................................',
'.........................oo.............',
'........................ofho............',
'.......................oofhhoo..........',
'......................offfhhffoo........',
'.....................offfffffweffo......',
'....................offffffffeefffo.....',
'...................offffffffffffffno....',
'..oo..........oooooffffffffffffoo.......',
'.ofho........offhhfffffffffffso.........',
'.ofhfo......offhhffffffffffsso..........',
'.offffo....offfffffffffffsso............',
'.offfffoo.offffffffffffsso..............',
'..osfffffoofffffffffffssso..............',
'...osfffffsffffffbbbbssso...............',
'....ossffsssssssbbbbbssso...............',
'.....oosssssssssbbbbsssso...............',
'.......oossooooossooosso................',
'........oss....oss..oss.................',
'........oss....oss..oss.................',
'........oss....os...os..................',
'........oso....oso..oso.................',
'........ooo....ooo..ooo.................',
'........................................',
'........................................',
];
T.canid = [CANID0, stride(CANID0, 18, 12, 19)];

/* 고양이과·맹수(호랑이·기린·야수): 낮고 매끈한 등, 긴 꼬리 */
var CAT0 = [
'........................................',
'........................................',
'.........................oo.............',
'........................ofho............',
'.......................oofhhoo..........',
'......................offfhhffoo........',
'.....................offfffffweffo......',
'....................offffffffeefffo.....',
'..........ooooooooooffffffffffffffno....',
'..oo....oofhhhhhhhfffffffffffffffoo.....',
'.ofso..ofhhhfffffffffffffffffsooo.......',
'.ofso.offhfffffffffffffffffssso.........',
'.ofsooffffffffffffffffffsssso...........',
'..osoffffffffffffffffsssssso............',
'...oossffffffffffffsssssssso............',
'.....osssffffffffbbbsssssso.............',
'.....osssssssssbbbbbssssso..............',
'......osssssssssbbbssssso...............',
'.......oossooooossssooosso..............',
'........oss...oss...oss.oss.............',
'........oss...oss...oss.oss.............',
'........oss...os....os..os..............',
'........oso...oso...oso.oso.............',
'........ooo...ooo...ooo.ooo.............',
'........................................',
'........................................',
];
T.cat = [CAT0, stride(CAT0, 18, 12, 19)];

/* 거구(곰·코뿔소·코끼리·매머드): 등혹, 굵고 짧은 다리, 넓은 몸 */
var BULK0 = [
'........................................',
'........................................',
'.........................oo.............',
'........................ofho............',
'.......................oofhhoo..........',
'..............oooooooofffhhffoo.........',
'...........oooffhhhhhhfffffffweffo......',
'.........oofhhhhhhhhfffffffffeefffo.....',
'.......oofhhhhffffffffffffffffffffno....',
'......offhhffffffffffffffffffffffoo.....',
'.....offhffffffffffffffffffffffso.......',
'....offffffffffffffffffffffffsso........',
'...offfffffffffffffffffffffsssso........',
'...ofsffffffffffffffffffffssssso........',
'...ofssffffffffffffbbbbffsssssso........',
'...osssffffffffffbbbbbbbsssssso.........',
'...ossssffffffffbbbbbbbbssssssso........',
'....osssssssssssbbbbbbbsssssssso........',
'.....oossssssssssbbbbbsssssssoo.........',
'......ossssoooossssssoooosssso..........',
'......osss....osss...osss.osss..........',
'......osss....osss...osss.osss..........',
'......osso....osso...osso.osso..........',
'......oooo....oooo...oooo.oooo..........',
'........................................',
'........................................',
];
T.bulk = [BULK0, stride(BULK0, 19, 12, 20)];

/* 소형 설치류(햄스터): 동그란 몸, 볼주머니, 작은 귀 — 눈 (21,11) */
var SMALL0 = [
'........................................',
'........................................',
'........................................',
'........................................',
'........................................',
'........................................',
'..............oo......oo................',
'.............ofpoooooofpo...............',
'............oofhhhhhhhffoo..............',
'...........offhhhhhhffffffo.............',
'..........offhhhffffffffffo.............',
'.........offhhffffffffwefffo............',
'........offhffffffffffeeffffo...........',
'........offffffffffffffhhffno...........',
'........ofsfffffffffffhhhfffo...........',
'........ofssffffffbbbbffffffo...........',
'........ossssfffbbbbbbbfffffo...........',
'.........osssssbbbbbbbbbssso............',
'.........oosssssbbbbbbbsssso............',
'...........oossssssbbbsssso.............',
'............oosssssssssso...............',
'.............ossoooooosso...............',
'.............oso.....oso................',
'.............ooo.....ooo................',
'........................................',
'........................................',
];
T.small = [SMALL0, lift(SMALL0, 2)];

/* 토끼: 긴 귀, 웅크린 몸, 솜꼬리, 긴 뒷발 — 눈 (28,9) */
var BUNNY0 = [
'.......................oo...oo..........',
'......................ofpo.ofpo.........',
'......................ofpo.ofpo.........',
'......................ofpo.ofpo.........',
'......................ofpo.ofpo.........',
'......................ofpoofpo..........',
'......................offoffo...........',
'.....................offffffoo..........',
'....................offhhfffffo.........',
'...................offhhffffwefo........',
'...................offfffffeefffo.......',
'...................offffffffffffno......',
'..............ooooofffffffffffffo.......',
'............oofhhhffffffffffffoo........',
'...........ofhhhfffffffffffffso.........',
'.......oo.offhffffffffffffffsso.........',
'......obbooffffffffffffffsssso..........',
'.....obbbbofffffffffffssssssso..........',
'......obbossfffffffffbbbssssso..........',
'.......oosssssssssssbbbbssssso..........',
'........ossssssssssssbbbsssoo...........',
'........osssssssssoosssoo.oss...........',
'.........oossssssssso.....oso...........',
'...........oooooooooo.....ooo...........',
'........................................',
'........................................',
];
T.bunny = [BUNNY0, stride(lift(BUNNY0, 2), 19, 14, 24)];
var FOX_TIP = [['b', 2, 10], ['b', 2, 11], ['b', 3, 11], ['b', 2, 12], ['b', 3, 12], ['b', 4, 12], ['k', 24, 1], ['k', 25, 0]];
var WOLF_BACK = [['k', 9, 13], ['k', 11, 12], ['k', 13, 11], ['k', 15, 10], ['k', 17, 10], ['k', 10, 14], ['k', 12, 13]];
var QUADS = { quad: 1, canid: 1, cat: 1, bulk: 1 };


T.bird = [[
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'.......................oooo.........',
'......................ofhhfo........',
'......................ofhffftt......',
'.............oooooooooffffffo.......',
'...........ooffffhhhhffffffo........',
'.........ooffffffffhhhfffffo........',
'.......ooffffffssffffffffso.........',
'....oooffsssssssssffffffsso.........',
'...osssssssssssssssssffsso..........',
'....ooossssssssssssssssso...........',
'.......oooosssssssssssoo............',
'...........oooooosssoo..............',
'..................oo................',
'.................ottt...............',
'.................ot.t...............',
'................ott.t...............',
'................................... ',
'....................................',
'....................................',
'....................................',
],[
'....................................',
'....................................',
'..........oooo......................',
'........oofhhfoo....................',
'.......ofhffffffo......oooo.........',
'......offfffffffo.....ofhhfo........',
'......offffffffo......ofhffftt......',
'.......ossffffo.......ffffffo.......',
'........ossffoooooooooffffffo.......',
'.........ossffffhhhhffffffo.........',
'..........osfffffffhhhfffffo........',
'.......ooooosffffsssffffffso........',
'....oooffsssssssssssfffffsso........',
'...osssssssssssssssssffsso..........',
'....ooossssssssssssssssso...........',
'.......oooosssssssssssoo............',
'...........oooooosssoo..............',
'..................oo................',
'.................ottt...............',
'................ott.t...............',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
]];

T.fish = [[
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................ooo.............',
'...................ofhho............',
'..............oooooffhhho...........',
'.....o.....ooffffffffffhhoo.........',
'....oso..ooffffffffffffffffoo.......',
'...osso.offffffffffffffffffffo......',
'..ossssoffhhfffffffffffffffffo......',
'..ossssssbbbbbbbbbbbbbbbbbbbfo......',
'...osssobbbbbbbbbbbbbbbbbbbbo.......',
'....osoobssbbbbbbbbbbbbbbbbo........',
'.....o..oosssbbbbbbbbbbbboo.........',
'..........ooosssbbbbbbooo...........',
'............ooooooooo...............',
'..............oss...................',
'...............oo...................',
'....................................',
'....................................',
'....................................',
'....................................',
],[
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................ooo.............',
'...................ofhho............',
'..............oooooffhhho...........',
'..........oooffffffffffhhoo.........',
'...oo...ooffffffffffffffffffoo......',
'..osso.offffffffffffffffffffffo.....',
'.ossssoffhhffffffffffffffffffo......',
'.ossssssbbbbbbbbbbbbbbbbbbbbfo......',
'..osssobbbbbbbbbbbbbbbbbbbbbo.......',
'...ooooobssbbbbbbbbbbbbbbbbo........',
'........oosssbbbbbbbbbbbboo.........',
'..........ooosssbbbbbbooo...........',
'............ooooooooo...............',
'.............oss....................',
'..............oo....................',
'....................................',
'....................................',
'....................................',
'....................................',
]];

T.snake = [[
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'.......................ooooo........',
'......................ofhhhfo.......',
'.....................offfffffo......',
'......ooooo.........offffffffo......',
'....oofffffoo......offfffffffo......',
'...offffkfffffo...offffffsffo.......',
'..offkffffffkffo.offffffsso.........',
'..offfffffkfffffoffkfffsso..........',
'..ofsffffffffffffffffsso............',
'...ossffkfffffkffffsso..............',
'....ossssfffffffsssso...............',
'.....oossssssssssoo.................',
'.......ooooooooo....................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
],[
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................ooooo...........',
'...................ofhhhfo..........',
'..................offfffffo.........',
'.................offffffffo.........',
'......ooooo.....offfffffffo.........',
'....oofffffoo..offfffffsffo.........',
'...offffkfffffoffffffffsso..........',
'..offkffffffkffffffkffsso...........',
'..offfffffkffffffffffso.............',
'..ofsfffffffffffffsso...............',
'...ossffkfffffkfffso................',
'....ossssfffffffsso.................',
'.....oossssssssoo...................',
'.......ooooooo......................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
]];

T.blob = [[
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'..............ooooooo...............',
'............oofhhhhffoo.............',
'..........oofffhhffffffoo...........',
'.........offffffffffffffo...........',
'........offhffffffffffffso..........',
'........ofhfffffffffffffso..........',
'........offfffffffffffsso...........',
'........ofsffffffffffssso...........',
'.........osssffffffsssso............',
'.........ossssssssssssso............',
'..........osssssssssso..............',
'...........oossssssoo...............',
'............ooooooo.................',
'...........ossssssso................',
'..........oss.oo.sso................',
'..........oo.....oo.................',
'....................................',
'....................................',
'....................................',
],[
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'....................................',
'..............ooooooo...............',
'............oofhhhhffoo.............',
'..........oofffhhffffffoo...........',
'.........offffffffffffffo...........',
'........offhffffffffffffso..........',
'........ofhfffffffffffffso..........',
'........offfffffffffffsso...........',
'........ofsffffffffffssso...........',
'.........osssffffffsssso............',
'.........ossssssssssssso............',
'..........osssssssssso..............',
'...........oossssssoo...............',
'............ooooooo.................',
'.........osssssssssso...............',
'........oss..oo...sso...............',
'........oo.........oo...............',
'....................................',
'....................................',
]];

/* ── 종 정의: 템플릿 · 색 · 오버레이(문자, x, y 를 두 프레임에 찍음) · 크기 배율 ── */
/* 오버레이 스탬프 좌표계는 quad 머리 기준: 눈 (25,7), 코 (27,8) 근처 */
function S(t, f, b, ov, sc, k, eye) { return { t: t, p: pal(f, b, k), ov: ov || [], sc: sc || 1, eye: eye || null }; }
var EYE_Q = [], NOSE_Q = [];   /* 눈·코는 quad 템플릿에 내장 */
var EAR_POINT = [['o', 24, 1], ['o', 25, 0], ['o', 23, 2], ['f', 24, 2], ['p', 25, 2], ['f', 25, 1], ['o', 26, 1], ['o', 26, 2], ['f', 24, 3], ['p', 25, 3]];
var EAR_ROUND = [['o', 24, 2], ['o', 25, 1], ['o', 26, 1], ['o', 27, 2], ['f', 25, 2], ['p', 26, 2], ['f', 24, 3], ['f', 27, 3]];
var EAR_LONG = [['o', 24, 0], ['o', 23, 1], ['o', 23, 2], ['o', 23, 3], ['f', 24, 1], ['p', 24, 2], ['p', 24, 3], ['o', 25, 0], ['o', 25, 1], ['o', 25, 2], ['o', 25, 3], ['f', 24, 4], ['o', 27, 0], ['f', 27, 1], ['f', 27, 2], ['o', 26, 1], ['o', 26, 2], ['o', 28, 1], ['o', 28, 2], ['o', 27, 3]];
var HORN_NOSE = [['x', 33, 7], ['x', 33, 6], ['x', 34, 5], ['o', 34, 4], ['o', 32, 6], ['x', 34, 6], ['o', 35, 6], ['o', 35, 5]];
var HORN_HEAD = [['x', 24, 2], ['x', 24, 1], ['o', 24, 0], ['o', 23, 1], ['x', 28, 3], ['x', 28, 2], ['x', 29, 1], ['o', 29, 0], ['o', 27, 2]];
var TUSK = [['x', 31, 10], ['x', 32, 10], ['x', 33, 10], ['x', 34, 9], ['o', 35, 9], ['o', 30, 10], ['o', 34, 10]];
var TRUNK = [['f', 34, 9], ['f', 34, 10], ['f', 34, 11], ['s', 34, 12], ['s', 34, 13], ['s', 34, 14], ['o', 35, 9], ['o', 35, 10], ['o', 35, 11], ['o', 35, 12], ['o', 35, 13], ['o', 35, 14], ['o', 34, 15], ['o', 33, 10], ['o', 33, 11], ['o', 33, 12], ['o', 33, 13], ['o', 33, 14], ['f', 35, 8], ['o', 36, 8], ['o', 36, 9]];
var FANG = [['w', 31, 10], ['w', 33, 10]];
var MANE = [['k', 21, 5], ['k', 20, 6], ['k', 19, 7], ['k', 19, 8], ['k', 20, 9], ['k', 21, 10], ['k', 22, 4], ['k', 23, 3], ['k', 20, 7], ['k', 21, 8], ['k', 21, 6], ['k', 22, 5], ['k', 18, 8], ['k', 19, 9]];
var STRIPES = [['k', 10, 10], ['k', 10, 11], ['k', 11, 12], ['k', 13, 10], ['k', 13, 11], ['k', 14, 12], ['k', 16, 10], ['k', 16, 11], ['k', 17, 12], ['k', 19, 11], ['k', 19, 12], ['k', 8, 12], ['k', 8, 13], ['k', 22, 11], ['k', 22, 12], ['k', 26, 6], ['k', 27, 5]];
var SPOTS = [['k', 10, 11], ['k', 11, 11], ['k', 15, 13], ['k', 16, 13], ['k', 13, 10], ['k', 19, 11], ['k', 8, 13], ['k', 21, 13]];
var SHAG = [['s', 6, 17], ['s', 8, 18], ['s', 10, 18], ['s', 12, 18], ['s', 14, 18], ['s', 16, 18], ['o', 7, 19], ['o', 9, 19], ['o', 11, 19], ['o', 13, 19], ['o', 15, 19], ['o', 17, 19], ['k', 4, 14], ['k', 5, 15]];
var FLAME = [['g', 27, 2], ['c', 27, 1], ['g', 28, 1], ['c', 28, 0], ['g', 26, 1], ['c', 27, 0], ['g', 26, 2]];
var WING_Q = [['o', 9, 8], ['o', 10, 6], ['o', 11, 5], ['o', 12, 4], ['o', 13, 4], ['o', 14, 4], ['o', 15, 5], ['o', 16, 6], ['o', 17, 7], ['s', 10, 7], ['s', 11, 6], ['s', 11, 7], ['s', 12, 5], ['s', 12, 6], ['s', 12, 7], ['s', 13, 5], ['s', 13, 6], ['s', 13, 7], ['s', 14, 5], ['s', 14, 6], ['s', 14, 7], ['s', 15, 6], ['s', 15, 7], ['s', 16, 7], ['h', 12, 5], ['h', 13, 5], ['o', 10, 8], ['o', 11, 8], ['o', 12, 8], ['o', 13, 8], ['o', 14, 8], ['o', 15, 8], ['o', 16, 8]];
var HALO = [['g', 22, 3], ['g', 23, 2], ['g', 24, 2], ['g', 25, 2], ['g', 26, 3]];
var CREST = [['c', 24, 4], ['c', 25, 4], ['c', 24, 3], ['c', 23, 5], ['c', 25, 3]];
var EYE_B = [['e', 25, 8], ['w', 25, 7]], EYE_F = [['e', 24, 12], ['w', 24, 11]], EYE_S = [['e', 26, 11], ['w', 26, 10]], EYE_BL = [['e', 20, 11], ['w', 20, 10], ['e', 15, 11], ['w', 15, 10]];
var GILL = [['o', 20, 13], ['o', 20, 14], ['o', 20, 15], ['o', 21, 12]];
var DORSAL = [['o', 16, 7], ['o', 17, 6], ['o', 18, 5], ['o', 19, 6], ['o', 20, 7], ['f', 17, 7], ['f', 18, 6], ['f', 18, 7], ['f', 19, 7], ['s', 18, 8], ['s', 19, 8]];
var TENT = [['f', 12, 20], ['f', 13, 21], ['f', 14, 22], ['f', 20, 20], ['f', 21, 21], ['f', 22, 22], ['f', 16, 21], ['f', 16, 22], ['o', 12, 21], ['o', 13, 22], ['o', 14, 23], ['o', 20, 21], ['o', 21, 22], ['o', 22, 23], ['o', 16, 23]];
var ANTENNA = [['o', 22, 6], ['o', 23, 5], ['o', 24, 4], ['o', 17, 6], ['o', 16, 5], ['o', 15, 4]];
var SHELL = [['k', 12, 11], ['k', 13, 10], ['k', 14, 10], ['k', 15, 11], ['k', 15, 12], ['k', 14, 13], ['k', 13, 13], ['k', 12, 12], ['k', 13, 12]];
var SNOUT = [['f', 35, 7], ['f', 36, 7], ['f', 37, 7], ['o', 38, 7], ['f', 35, 8], ['f', 36, 8], ['f', 37, 8], ['o', 38, 8], ['s', 34, 9], ['s', 35, 9], ['s', 36, 9], ['s', 37, 9], ['o', 38, 9], ['o', 34, 10], ['o', 35, 10], ['o', 36, 10], ['o', 37, 10], ['w', 35, 10], ['w', 37, 10], ['o', 35, 6], ['o', 36, 6], ['o', 37, 6], ['n', 37, 7]];
var SPIKES = [['o', 10, 8], ['o', 13, 7], ['o', 16, 7], ['o', 19, 7], ['k', 10, 9], ['k', 13, 8], ['k', 16, 8], ['k', 19, 8], ['o', 22, 6], ['k', 22, 7]];
var BLOW = [['w', 21, 6], ['w', 22, 5], ['w', 20, 5]];
var BEAK_L = [['t', 29, 8], ['t', 30, 8], ['t', 31, 8], ['o', 32, 8], ['t', 29, 9], ['o', 30, 9]];
var FIN_TOP = [['o', 15, 8], ['o', 16, 7], ['o', 17, 7], ['o', 18, 8], ['f', 16, 8], ['f', 17, 8]];
var COLLAR = [['c', 21, 10], ['c', 22, 10], ['c', 21, 11], ['c', 22, 11], ['c', 23, 11], ['g', 22, 12]];
var CROWN = [['g', 26, 3], ['g', 27, 3], ['g', 28, 3], ['g', 26, 2], ['g', 28, 2], ['g', 27, 1], ['g', 29, 2]];

var SPEC = {
  hamster:   S('small', '#D9A25E', '#F4E3C6', [], .8, null, [22, 11]),
  rabbit:    S('bunny', '#E8E1D6', '#FFFFFF', [], .78, null, [28, 9]),
  fox:       S('canid', '#E27A34', '#FFE9CF', EAR_POINT.concat(FOX_TIP), .82, '#3A2412'),
  wolf:      S('canid', '#7F8CA3', '#E6ECF3', EAR_POINT.concat(FANG, WOLF_BACK), .98, '#4A5468'),
  hawk:      S('bird', '#A9803F', '#EBD9B4', EYE_B, .85),
  bear:      S('bulk', '#7E5636', '#D9B88C', EAR_ROUND, 1.08),
  tiger:     S('cat', '#E9973A', '#FFF1D8', EAR_ROUND.concat(STRIPES, FANG), 1.05, '#3A2412'),
  rhino:     S('bulk', '#8E97A5', '#C9D0DA', EAR_ROUND.concat(HORN_NOSE), 1.15),
  elephant:  S('bulk', '#9AA2AE', '#D3D9E1', EYE_Q.concat(TRUNK, TUSK, [['o', 24, 1], ['o', 23, 2], ['o', 22, 3], ['o', 22, 4], ['o', 22, 5], ['o', 23, 6], ['f', 24, 2], ['f', 23, 3], ['f', 23, 4], ['f', 23, 5], ['f', 24, 3], ['f', 24, 4], ['f', 24, 5], ['p', 24, 4], ['o', 25, 2], ['o', 25, 3]]), 1.25),
  shark:     S('fish', '#6E95B6', '#E3EEF6', EYE_F.concat(DORSAL, GILL), 1.1),
  mammoth:   S('bulk', '#7E5E42', '#D9C0A0', TRUNK.concat(TUSK, SHAG, EAR_ROUND), 1.3),
  dragon:    S('quad', '#C8563A', '#F5CFA6', EYE_Q.concat(NOSE_Q, HORN_HEAD, WING_Q, SPIKES, FANG), 1.15),
  squid:     S('blob', '#8F62A8', '#E5D2EE', EYE_BL.concat(TENT), .95),
  crocodile: S('quad', '#6E9350', '#CFE0B5', EYE_Q.concat(SNOUT, SPIKES), 1.1),
  condor:    S('bird', '#4C4750', '#DED6CC', EYE_B.concat([['w', 22, 12], ['w', 23, 12], ['w', 21, 13]]), 1.0),
  spermwhale:S('fish', '#66768B', '#D6DEE8', EYE_F.concat(BLOW), 1.35),
  bluewhale: S('fish', '#6A98C6', '#E3EFFA', EYE_F.concat(BLOW), 1.4),
  megalodon: S('fish', '#5B7891', '#D6E0E9', EYE_F.concat(DORSAL, GILL, [['k', 10, 12], ['k', 11, 13]]), 1.35),
  titanoboa: S('snake', '#7A9A4A', '#E2E9C0', EYE_S, 1.2, '#3F5A1F'),
  paracer:   S('bulk', '#B3A08A', '#EFE5D6', EYE_Q.concat(NOSE_Q, EAR_ROUND, [['f', 22, 5], ['f', 22, 6], ['f', 21, 6], ['f', 21, 7], ['o', 21, 5], ['o', 20, 6], ['o', 20, 7]]), 1.3),
  quetzal:   S('bird', '#D2B77E', '#F8EBCF', EYE_B.concat(CREST, [['t', 30, 8], ['t', 31, 8], ['t', 32, 8], ['t', 33, 8], ['o', 34, 8]]), 1.15),
  samjogo:   S('bird', '#2C282E', '#3C363E', EYE_B.concat(FLAME, [['g', 25, 7]]), 1.05, '#F2C25A'),
  kirin:     S('cat', '#E2BF6A', '#FFF3D6', EAR_POINT.concat(HORN_HEAD, MANE, FLAME), 1.15, '#B7802A'),
  peng:      S('bird', '#5A82C2', '#E5EEFF', EYE_B.concat(HALO), 1.3),
  insect:    S('blob', '#7C8A3A', '#D8E0A0', EYE_BL.concat(ANTENNA, SHELL), .7, '#3E4718'),
  snail:     S('blob', '#C39B5A', '#F0E0BE', EYE_BL.concat(ANTENNA, SHELL), .72, '#6C4E1E'),
  critter:   S('small', '#AE865F', '#EBD7BF', [], .85, null, [22, 11]),
  bird:      S('bird', '#86A8CE', '#EAF3FC', EYE_B, .85),
  reptile:   S('quad', '#89A75A', '#DCE7BF', EYE_Q.concat(SNOUT, SPIKES), .95),
  fish:      S('fish', '#73A2CF', '#E4EFF9', EYE_F.concat(FIN_TOP), .9),
  cephalopod:S('blob', '#B47ABE', '#EDDCF2', EYE_BL.concat(TENT), .95),
  beast:     S('cat', '#A3673F', '#E8CDB0', EAR_POINT.concat(MANE, FANG), 1.1, '#5A3418'),
  brute:     S('bulk', '#8A8D98', '#D2D6DE', EAR_ROUND.concat(HORN_NOSE, TUSK), 1.25),
  titan:     S('quad', '#6A5A8A', '#DDD1EE', EYE_Q.concat(NOSE_Q, EAR_POINT, HORN_HEAD, WING_Q, SPIKES, FLAME, FANG), 1.4, '#2E2340'),
};

var CSS_ID = 'wl-px-css';
function css() {
  if (document.getElementById(CSS_ID)) return;
  var st = document.createElement('style'); st.id = CSS_ID;
  st.textContent =
    '.wl-px{display:block;image-rendering:pixelated;image-rendering:crisp-edges;}' +
    '.wl-px.flip{transform:scaleX(-1)}' +
    '.wl-pxw{position:relative;display:inline-block;line-height:0}' +
    '.wl-pxw.is-die{transition:transform .38s ease-in,opacity .38s;transform:rotate(-70deg) translateY(10px);opacity:0}' +
    '';
  document.head.appendChild(st);
}

function padRow(r) { r = r || ''; while (r.length < GW) r += '.'; return r.slice(0, GW); }
function draw(ctx, spec, frame, o) {
  var flash = !!o.flash;
  var P = o.P || spec.p, t = T[spec.t][frame] || T[spec.t][0];
  var grid = [];
  for (var y = 0; y < GH; y++) grid.push(padRow(t[y]).split(''));
  /* 오버레이 스탬프 — 프레임 1 에서 몸이 위로 1칸 이동하는 템플릿(bird/blob)은 y 보정 */
  var dy = frame !== 1 ? 0 : (spec.t === 'bird' || spec.t === 'snake' || spec.t === 'small' || spec.t === 'bunny') ? -2 : (spec.t === 'blob' || spec.t === 'quad') ? 1 : 0;
  var dx = (spec.t === 'quad' && frame === 1) ? 0 : (spec.t === 'fish' && frame === 1) ? 1 : (spec.t === 'snake' && frame === 1) ? -3 : 0;
  spec.ov.forEach(function (s) {
    var x = s[1] + dx, y = s[2] + dy;
    if (x >= 0 && x < GW && y >= 0 && y < GH) grid[y][x] = s[0];
  });
  if (o.stage >= 99 && !o.cold && QUADS[spec.t]) COLLAR.forEach(function (s) { var x = s[1] + dx, y = s[2] + dy; if (grid[y] && grid[y][x] && grid[y][x] !== '.') grid[y][x] = s[0]; });
  if (o.stage >= 4 && !o.cold && QUADS[spec.t]) CROWN.forEach(function (s) { var x = s[1] + dx, y = s[2] + dy; if (grid[y]) grid[y][x] = s[0]; });
  ctx.clearRect(0, 0, GW, GH);
  var fierce = o.mood === 'fierce';
  for (var yy = 0; yy < GH; yy++) for (var xx = 0; xx < GW; xx++) {
    var ch = grid[yy][xx];
    if (ch === '.' || ch === ' ') continue;
    var col = P[ch] || P.f;
    if (o.cold && ch !== 'e' && ch !== 'w') col = mixc(col, '#5A6070', 0.16);
    if (fierce && ch === 'w') col = '#FF6A4A';
    if (flash) col = (ch === 'o') ? '#FFF6E0' : '#FFFFFF';
    ctx.fillStyle = col; ctx.fillRect(xx, yy, 1, 1);
  }
  if (fierce) { ctx.fillStyle = P.o; var eo = spec.ov.filter(function (v) { return v[0] === 'e'; })[0];
    var ex = spec.eye ? spec.eye[0] + dx : eo ? eo[1] + dx : 29 + dx, ey = spec.eye ? spec.eye[1] + dy : eo ? eo[2] + dy : 6 + dy; ctx.fillRect(ex - 1, ey - 1, 3, 1); }
}

/* 적 개체 색 변형: 종 기본 팔레트에 로스터 색을 섞어 같은 종이라도 지역마다 다르게 */
function tintPal(base, t) {
  if (!t || !/^#[0-9a-fA-F]{3,6}$/.test(t)) return base;
  var f = mixc(base.f, t, 0.5);
  var P = {}; for (var k in base) P[k] = base[k];
  P.f = f; P.o = shade(f, .62); P.s = shade(f, .28); P.h = tint(f, .28); P.b = mixc(base.b, tint(f, .55), 0.4); P.k = mixc(base.k, shade(f, .45), 0.5);
  return P;
}
function make(o) {
  css();
  o = o || {};
  var spec = SPEC[o.species] || SPEC.critter;
  var wrap = document.createElement('div'); wrap.className = 'wl-pxw';
  var cv = document.createElement('canvas'); cv.width = GW; cv.height = GH; cv.className = 'wl-px' + (o.flip ? ' flip' : '');
  cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', o.label || o.species);
  wrap.appendChild(cv);
  var ctx = cv.getContext('2d');
  var H = { el: wrap, id: o.species, stage: o.stage | 0, size: o.size || 96, state: 'idle', mood: o.mood || 'calm', spec: spec, frame: 0 };
  var cold = !!(o.palette && o.palette.rim === 'cold');
  var flashing = false;
  var P = tintPal(spec.p, o.palette && o.palette.tint);
  function paint() { draw(ctx, spec, H.frame, { stage: H.stage, cold: cold, mood: H.mood, flash: flashing, P: P }); }
  function size() { var h = H.size * spec.sc; cv.style.height = h + 'px'; cv.style.width = (h * GW / GH) + 'px'; }
  paint(); size();
  var tmr = 0;
  H.play = function (state) {
    if (tmr) { clearTimeout(tmr); tmr = 0; }
    wrap.classList.remove('is-hurt', 'is-die');
    if (state === 'attack' || state === 'cheer' || state === 'eat' || state === 'pet') {
      H.frame = 1; paint();
      tmr = setTimeout(function () { H.frame = 0; paint(); tmr = 0; }, state === 'attack' ? 220 : 400);
    } else if (state === 'hurt') { void wrap.offsetWidth; wrap.classList.add('is-hurt'); tmr = setTimeout(function () { wrap.classList.remove('is-hurt'); tmr = 0; }, 240); }
    else if (state === 'die') { wrap.classList.add('is-die'); }
    return H;
  };
  H.step = function () { H.frame = H.frame ? 0 : 1; paint(); return H; };   /* 걷기 프레임 토글 */
  H.setStage = function (n) { n = Math.max(0, Math.min(4, n | 0)); if (n !== H.stage) { H.stage = n; paint(); } return H; };
  H.setSize = function (px) { H.size = px; size(); return H; };
  H.setMood = function (m) { H.mood = m || 'calm'; paint(); return H; };
  H.setPalette = function () { return H; };
  H.setFlip = function (f) { cv.classList.toggle('flip', !!f); return H; };
  H.dispose = function () { if (tmr) clearTimeout(tmr); if (wrap.parentNode) wrap.parentNode.removeChild(wrap); };
  return H;
}
var SHOT = { hawk:'feather', condor:'feather', quetzal:'feather', bird:'feather', peng:'feather', samjogo:'fire',
  dragon:'fire', kirin:'fire', titan:'fire', shark:'water', megalodon:'water', spermwhale:'water', bluewhale:'water',
  fish:'water', squid:'ink', cephalopod:'ink', titanoboa:'bite', crocodile:'bite', reptile:'bite', snail:'bite', insect:'bite',
  rhino:'stomp', elephant:'stomp', mammoth:'stomp', paracer:'stomp', brute:'stomp', bear:'stomp' };
W.Pixel = { SPECIES: SPEC, TEMPLATES: T, make: make, shotOf: function (id) { return SHOT[id] || 'claw'; }, quality: function (n) { return n === undefined ? 1 : n; }, autoQuality: function () {}, drive: function () {} };
})();
