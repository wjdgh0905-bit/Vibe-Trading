/* ============================================================================
 * WL.Skills — 스킬 시스템 "모닥불 무리"
 * 의존성 0 · IIFE · window.WL 에 부착 · 최상위에서 DOM 안 건드림
 * ----------------------------------------------------------------------------
 * 공개 API
 *   WL.Skills.CATALOG                 12종 정의(읽기 전용으로 취급하라)
 *   WL.Skills.init(saved, ctx)        ctx 는 아래 "계약" 참조
 *   WL.Skills.serialize()             저장용 평범한 객체
 *   WL.Skills.tick(dt)                쿨다운·지속·자동시전·자동터치 발사
 *   WL.Skills.cast(id) / canCast(id)
 *   WL.Skills.levelUp(id) / costOf(id)
 *   WL.Skills.setAuto(id, bool) / autoOn(id)
 *   WL.Skills.mult()                  {dpsMult, goldMult, clickMult, bossTimeBonus, cdrMult}
 *   WL.Skills.bar()                   씬 하단 스킬바 DOM
 *   WL.Skills.panel()                 스킬 탭 DOM
 *   WL.Skills.refresh()               두 DOM 갱신 (rAF 마다 불러도 싼 값)
 *   — 부가 —
 *   WL.Skills.state(id) · stats() · caps() · SYNERGY · unlocked(id) · reset()
 * ----------------------------------------------------------------------------
 * ctx 계약 (필수 8 + 선택)
 *   필수  dps() clickDamage() tap(n) zone() isBoss() gold() spend(g) fx()
 *   선택  hurt(d)            즉발 피해. 없으면 폭발형은 연출만 남는다.
 *         tapScaled(n, p)    n회를 위력 p(0~1)로. 있으면 "초당 24회" 연출이 산다.
 *         enemyHp() enemyMax() enemyCount()
 *         advance(n)         n웨이브 전진(연쇄 처치)
 *         bossTimeAdd(sec)   진행 중인 보스 제한시간 연장
 *         bossTime()         남은 보스 제한시간(초)
 *         bestZone() bossKills() petsOwned()   해금 판정용. 없으면 zone()에서 추정
 *         foe()              {x,y,w,h} 적 위치 — FX 조준용
 *         critChance()       기대 타격값 보정. 없으면 0.25 로 가정
 * ----------------------------------------------------------------------------
 * ■ 상한 — 스스로 지키는 네 개의 천장 (CAPS)
 *
 *   ① 지속 버프 배율        dpsMult ≤ ×3.00 · clickMult ≤ ×3.00 · goldMult ≤ ×5.00
 *      모든 버프는 곱으로 쌓되 마지막에 잘린다. 포효+난입+거수토벌이 겹쳐도 ×3 을 넘지 않는다.
 *
 *   ② 즉발 폭발             1회 ≤ 현재 DPS × 12초분, 게다가 "폭발 예산" 버킷을 통과해야 한다.
 *      용량 12 dps초 · 회복 0.30 dps초/초 → 폭발만으로 얻는 상시 이득은 +30% 가 천장이다.
 *
 *   ③ 자동터치 합산 기여    켜져 있는 동안 총 피해의 40% 이하 (단일 최고 티어 40 / 30 / 25%)
 *      이 게임의 터치 1회는 DPS 0.18~4.9초분이라 "초당 24회 × 제값"이면 방치 DPS를 7~180배
 *      덮어쓴다. 그래서 횟수와 위력을 분리했다 — 횟수는 연출대로 쏘고, 위력을 깎는다.
 *          명목rate = 티어별 24 / 11 / 6 회/초 (레벨로 오른다)
 *          상한rate = s/(1-s) × dps / 기대타격값,  s = 합산 기여 상한
 *          power  = clamp(상한rate / 명목rate, 0.06, 1)   ← 위력에 바닥이 있다
 *          rate   = min(명목rate, 상한rate / power)       ← 바닥에 닿으면 횟수를 줄인다
 *      바닥(0.06)이 없으면 조련사 훈련이 오를수록 power 가 0.006 까지 내려가
 *      "초당 41회 × 0.6%" 라는 의미 없는 싸라기눈이 된다. 총 피해는 어느 쪽이든
 *      상한rate × 기대타격값 으로 같다 — 바뀌는 건 타격의 결뿐이다.
 *      ctx.tapScaled 가 있으면 (rate, power) 그대로, 없으면 (상한rate, 1.0) 으로 폴백한다.
 *      두 경로의 초당 피해는 같다. 다른 건 타격 연출의 결뿐이다.
 *
 *   ④ 처치형(목줄 끊기·질풍 연쇄)은 "피해"가 아니라 "처치"다. 적 최대 체력에 비례하고
 *      보스에게는 비율 피해만 들어간다. ②의 예산과 별개로 쿨다운이 유일한 고삐다.
 *
 *   동시 최악 합성(12종 전부 겹칠 때) = ×3.00 (버프) ÷ (1-0.40) (자동터치) × 1.30 (폭발)
 *                                     ≈ ×6.5. 쿨다운 때문에 실측 상시 평균은 ×2 안쪽이다.
 *                                     (_sk_verify.mjs 가 이 수를 매번 다시 잰다)
 * ==========================================================================*/
(function () {
'use strict';

var W = window.WL || (window.WL = {});
var doc = document;

/* ─────────────────── 0. 유틸 ─────────────────── */
var min = Math.min, max = Math.max, flr = Math.floor, pw = Math.pow, rnd = Math.random;

function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function lerp(a, b, t) { return a + (b - a) * t; }
function r2(v) { return Math.round(v * 100) / 100; }

var SUF = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'], AA = 'abcdefghijklmnopqrstuvwxyz';
function fmt(n) {
  if (W.fmt) return W.fmt(n);
  if (!isFinite(n) || isNaN(n)) return '∞';
  if (n < 0) return '-' + fmt(-n);
  if (n < 1000) return n < 10 ? String(Math.round(n * 10) / 10) : String(flr(n));
  var t = flr(Math.log10(n) / 3), v = n / pw(1000, t), s;
  if (t < SUF.length) s = SUF[t];
  else { var i = t - SUF.length; s = AA[flr(i / 26) % 26] + AA[i % 26]; }
  return (v < 10 ? v.toFixed(2) : v < 100 ? v.toFixed(1) : String(flr(v))) + s;
}
function secs(v) { return (v < 10 ? v.toFixed(1) : String(Math.round(v))) + '초'; }

function el(tag, cls, html) {
  var e = doc.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}
function txt(node, s) { if (node && node.__t !== s) { node.__t = s; node.textContent = s; } }
function cls(node, s) { if (node && node.__c !== s) { node.__c = s; node.className = s; } }
function sty(node, k, v) { var m = node.__s || (node.__s = {}); if (m[k] !== v) { m[k] = v; node.style[k] = v; } }

/* ─────────────────── 1. 상한 ─────────────────── */
var CAPS = {
  dpsMult:     3.00,   // 지속 피해 배율 동시 상한
  clickMult:   3.00,   // 터치 피해 배율 동시 상한
  goldMult:    5.00,   // 발자국 배율 동시 상한
  cdrMult:     0.55,   // 쿨다운 최소 배수 (= 최대 45% 감소)
  bossTime:    16,     // 보스 제한시간 총 보너스 상한(초)
  burstSec:    12,     // 즉발 폭발 1회 상한 = 현재 DPS × 12초분
  burstBank:   12,     // 폭발 예산 용량(dps초)
  burstRefill: 0.30,   // 폭발 예산 회복(dps초/초) → 폭발의 상시 기여 천장 +30%
  autoShare:   0.40,   // 자동터치 합산 기여 상한 (총 피해 대비)
  autoRate:    48,     // 초당 발사 상한(성능). 프레임당 배치로 묶어 보낸다
  autoMinPower: 0.06,  // 자동터치 1타의 최소 위력(수동 터치 대비). 아래 주석 참조
  critAssume:  0.25    // ctx.critChance 가 없을 때의 기대 치명 확률
};
var CRIT_MULT = 5;     // 게임 기준치 — 기대 타격값 = clickDamage × (1 + p×(5-1))

/* ─────────────────── 2. 카탈로그 (12종) ───────────────────
 * 값은 전부 [Lv.1, Lv.12] 쌍. 중간 레벨은 선형 보간한다.
 *   un   해금 조건 {zone|boss|pets}
 *   cd   재사용 [초]              dur  지속 [초]
 *   tone 색 역할  warm/core/deep/leaf/soul/cool
 * ------------------------------------------------------------------- */
var LVMAX = 12;

var CATALOG = [
  { id: 'roar', n: '야성 포효', han: '野性咆哮', role: '지속 버프', tone: 'warm', hot: 1,
    f: '한 번의 울음에 무리 전체의 등줄기가 선다.',
    un: { zone: 3 }, cd: [70, 46], dur: [14, 24], cost: [900, 2.90],
    v: { dps: [2.00, 2.90] },
    desc: function (v, d) { return '무리 피해 ×' + v.dps.toFixed(2) + ' · ' + secs(d.dur) + ' 유지'; },
    cond: 'always' },

  { id: 'rend', n: '열조연격', han: '裂爪連擊', role: '자동터치 Ⅰ · 폭발형', tone: 'leaf', hot: 2,
    f: '손톱이 공기보다 빨라서, 남는 건 잔상뿐이다.',
    un: { zone: 6 }, cd: [62, 42], dur: [7, 11], cost: [2.4e3, 3.00],
    auto: { rate: [16, 24], share: [0.28, 0.40] },
    v: {},
    desc: function (v, d) { return '초당 ' + Math.round(d.auto.rate) + '연타 · 기여 상한 ' + Math.round(d.auto.share * 100) + '% · ' + secs(d.dur); },
    cond: 'always' },

  { id: 'gold', n: '금맥 추적', han: '金脈追跡', role: '골드 특화', tone: 'core', hot: 3,
    f: '피 냄새 밑에 깔린 다른 냄새를 무리가 먼저 안다.',
    un: { zone: 12 }, cd: [150, 105], dur: [22, 33], cost: [9e3, 3.00],
    v: { gold: [2.80, 4.60] },
    desc: function (v, d) { return '발자국 ×' + v.gold.toFixed(2) + ' · ' + secs(d.dur) + ' 유지'; },
    cond: 'always' },

  { id: 'execute', n: '목줄 끊기', han: '頸縛斷', role: '즉발 처치', tone: 'deep', hot: 4,
    f: '숨통은 길게 찾지 않는다. 한 번에 끊는다.',
    un: { boss: 8 }, cd: [95, 62], dur: [0, 0], cost: [3.5e4, 3.10],
    v: { bossPct: [0.08, 0.16] },
    desc: function (v) { return '일반 적 즉시 처치 · 보스는 최대 체력 ' + Math.round(v.bossPct * 100) + '%'; },
    cond: 'enemy' },

  { id: 'thunder', n: '뇌전 일격', han: '雷電一擊', role: '순간 화력', tone: 'deep', hot: 5,
    f: '하늘이 한 번 깜빡이고, 짐승은 이미 반으로 갈라져 있다.',
    un: { zone: 18 }, cd: [58, 38], dur: [0, 0], cost: [1.2e5, 3.10],
    v: { burst: [5.0, 11.0] },
    desc: function (v) { return '즉발 피해 = 현재 DPS × ' + v.burst.toFixed(1) + '초분'; },
    cond: 'enemy' },

  { id: 'breath', n: '숨고르기', han: '調息', role: '쿨다운 감소', tone: 'cool', hot: 6,
    f: '무리가 숨을 맞추면 다음 한 수가 빨리 온다.',
    un: { pets: 6 }, cd: [120, 90], dur: [16, 26], cost: [4e5, 3.20],
    v: { cdr: [0.80, 0.62], instant: [0.12, 0.26] },
    desc: function (v, d) { return '재사용 ×' + v.cdr.toFixed(2) + ' · 즉시 −' + Math.round(v.instant * 100) + '% · ' + secs(d.dur); },
    cond: 'always' },

  { id: 'myriad', n: '천수난무', han: '千手亂舞', role: '자동터치 Ⅱ · 지속형', tone: 'leaf', hot: 7,
    f: '손이 천 개로 갈라져 어둠을 두드린다. 멈출 이유가 없다.',
    un: { zone: 24 }, cd: [155, 112], dur: [40, 58], cost: [1.5e6, 3.20],
    auto: { rate: [8, 11], share: [0.22, 0.30] },
    v: {},
    desc: function (v, d) { return '초당 ' + Math.round(d.auto.rate) + '연타 · 기여 상한 ' + Math.round(d.auto.share * 100) + '% · ' + secs(d.dur); },
    cond: 'always' },

  { id: 'bosshunt', n: '거수 토벌', han: '巨獸討伐', role: '보스 특화', tone: 'deep', hot: 8,
    f: '큰 놈일수록 무리는 조용해진다. 조용해야 물 곳이 보인다.',
    un: { boss: 25 }, cd: [125, 88], dur: [18, 28], cost: [6e6, 3.20],
    v: { dps: [1.80, 2.50], click: [1.50, 2.10], burst: [3.0, 6.0] },
    desc: function (v, d) { return '보스 한정 피해 ×' + v.dps.toFixed(2) + ' · 터치 ×' + v.click.toFixed(2) + ' · ' + secs(d.dur); },
    cond: 'boss' },

  { id: 'emberlife', n: '불씨 연명', han: '火種延命', role: '위기 구제', tone: 'core', hot: 9,
    f: '꺼지려던 불에 마른 가지 한 줌. 그만큼만 더 싸운다.',
    un: { boss: 40 }, cd: [180, 132], dur: [0, 0], cost: [2.5e7, 3.30],
    v: { time: [6, 13], keep: [2, 5] },
    passiveBossTime: true,   // keep 만큼은 해금만으로 늘 붙는다 (mult().bossTimeBonus)
    desc: function (v) { return '보스 제한시간 +' + Math.round(v.time) + '초 (즉시) · 상시 +' + Math.round(v.keep) + '초'; },
    cond: 'boss' },

  { id: 'stampede', n: '질풍 연쇄', han: '疾風連鎖', role: '연쇄 처치', tone: 'leaf', hot: 0,
    f: '한 마리를 넘어뜨린 발이 멈추지 않고 다음을 밟는다.',
    un: { zone: 45 }, cd: [210, 150], dur: [0, 0], cost: [1.2e8, 3.30],
    v: { waves: [3, 7] },
    desc: function (v) { return '일반 웨이브 ' + Math.round(v.waves) + '개 연쇄 처치 (보스에서 멈춘다)'; },
    cond: 'enemy' },

  { id: 'intrude', n: '어둠 난입', han: '暗黑亂入', role: '소환 난입 · 광역', tone: 'soul', hot: 0,
    f: '불빛 밖에서 이름 없는 것들이 우리 편을 들기로 했다.',
    un: { pets: 12 }, cd: [140, 100], dur: [16, 24], cost: [6e8, 3.30],
    v: { dps: [1.55, 2.10], aoe: [3.0, 6.5], beasts: [2, 4] },
    desc: function (v, d) { return Math.round(v.beasts) + '마리 난입 · 피해 ×' + v.dps.toFixed(2) + ' · 광역 ' + v.aoe.toFixed(1) + '초분 · ' + secs(d.dur); },
    cond: 'always' },

  { id: 'brand', n: '야성각인', han: '野性刻印', role: '자동터치 Ⅲ · 상시형', tone: 'soul', hot: 0,
    f: '무리의 사냥법이 손에 새겨졌다. 이제는 잊으려 해도 안 된다.',
    un: { zone: 70, boss: 60 }, cd: [34, 30], dur: [36, 40], cost: [4e9, 3.40],
    auto: { rate: [4, 6], share: [0.16, 0.25] },
    v: {},
    desc: function (v, d) { return '초당 ' + Math.round(d.auto.rate) + '연타 · 기여 상한 ' + Math.round(d.auto.share * 100) + '% · 사실상 상시'; },
    cond: 'always' }
];

var BY = {};
for (var _i = 0; _i < CATALOG.length; _i++) BY[CATALOG[_i].id] = CATALOG[_i];

/* ─────────────────── 3. 시너지 (6종) ─────────────────── */
var SYNERGY = [
  { id: 'quicken', n: '연쇄 각성', han: '連鎖覺醒', need: ['breath', 'thunder'],
    d: '숨고르기가 도는 동안 뇌전 일격·거수 토벌의 재사용이 추가로 35% 짧아진다.',
    test: function () { return act('breath') && (has('thunder') || has('bosshunt')); } },

  { id: 'scent', n: '피와 금', han: '血金', need: ['roar', 'gold'],
    d: '야성 포효와 금맥 추적이 겹치면 발자국 배율 ×1.35 — 흥분한 무리가 더 많이 흘린다.',
    test: function () { return act('roar') && act('gold'); } },

  { id: 'resonate', n: '각인 공명', han: '刻印共鳴', need: ['rend', 'myriad', 'brand'],
    d: '자동터치가 둘 이상 겹치면 모든 자동터치의 지속시간 +20%. 기여 상한은 그대로 40%다.',
    test: function () { return autoActiveCount() >= 2; } },

  { id: 'cullchain', n: '처형 연쇄', han: '處刑連鎖', need: ['execute', 'stampede'],
    d: '목줄 끊기 후 8초 안에 질풍 연쇄를 쓰면 연쇄 웨이브 +2.',
    test: function () { return S.execMark > 0 && has('stampede'); } },

  { id: 'gravekeep', n: '거수 연명', han: '巨獸延命', need: ['bosshunt', 'emberlife'],
    d: '거수 토벌이 도는 동안 불씨 연명이 4초 더 붙고, 보스 피해 배율 +0.30.',
    test: function () { return act('bosshunt') && has('emberlife'); } },

  { id: 'nightraid', n: '난입 포효', han: '亂入咆哮', need: ['intrude', 'roar'],
    d: '어둠 난입과 야성 포효가 겹치면 난입한 짐승의 피해 배율 +0.45.',
    test: function () { return act('intrude') && act('roar'); } }
];

/* ─────────────────── 4. 상태 ─────────────────── */
var ctx = null;
var S = null;          // {sk:{id:{lv,cd,left,auto,u,used}}, bank, execMark, tapAcc, tapFired, ...}
var reduced = false;
var ver = 0;           // mult() 캐시 무효화 카운터

function blankState() {
  var s = { v: 1, sk: {}, bank: CAPS.burstBank, execMark: 0, tapAcc: 0,
            fired: 0, firedAuto: 0, dmgAuto: 0, dmgIdle: 0, liveRate: 0, chain: null };
  for (var i = 0; i < CATALOG.length; i++) {
    s.sk[CATALOG[i].id] = { lv: 1, cd: 0, left: 0, auto: false, u: false, used: 0 };
  }
  return s;
}
S = blankState();

function st(id) { return S.sk[id]; }
function has(id) { return !!(S.sk[id] && S.sk[id].u); }
function act(id) { var s = S.sk[id]; return !!(s && s.u && s.left > 0); }
function autoActiveCount() {
  var n = 0;
  for (var i = 0; i < CATALOG.length; i++) if (CATALOG[i].auto && act(CATALOG[i].id)) n++;
  return n;
}
function synOn(id) {
  for (var i = 0; i < SYNERGY.length; i++) if (SYNERGY[i].id === id) { try { return !!SYNERGY[i].test(); } catch (e) { return false; } }
  return false;
}

/* ─────────────────── 5. 레벨 곡선 ─────────────────── */
function t01(lv) { return clamp((lv - 1) / (LVMAX - 1), 0, 1); }
function pick(pair, lv) { return lerp(pair[0], pair[1], t01(lv)); }

/** 레벨에 따른 파생값 전부 — 시너지·상한 적용 전의 "설계값" */
function derive(def, lv) {
  var o = { cd: pick(def.cd, lv), dur: pick(def.dur, lv), v: {} };
  if (def.v) for (var k in def.v) o.v[k] = pick(def.v[k], lv);
  if (def.auto) o.auto = { rate: pick(def.auto.rate, lv), share: pick(def.auto.share, lv) };
  return o;
}
/** 실제 적용되는 재사용 시간 — 시너지 + 전역 cdr */
function cdOf(def, lv) {
  var base = pick(def.cd, lv);
  var m = cdrNow();
  if ((def.id === 'thunder' || def.id === 'bosshunt') && synOn('quicken')) m *= 0.65;
  return max(4, base * m);
}
function durOf(def, lv) {
  var d = pick(def.dur, lv);
  if (def.auto && synOn('resonate')) d *= 1.20;
  return d;
}
function cdrNow() {
  var m = 1;
  var b = st('breath');
  if (b && b.u && b.left > 0) m *= pick(BY.breath.v.cdr, b.lv);
  return max(CAPS.cdrMult, m);
}

/* ─────────────────── 6. 해금 ─────────────────── */
function bestZone() { return (ctx && ctx.bestZone ? ctx.bestZone() : ctx && ctx.zone ? ctx.zone() : 1) || 1; }
function bossKills() {
  if (ctx && ctx.bossKills) return ctx.bossKills() | 0;
  return max(0, bestZone() - 1);                          // 존 하나당 보스 하나 — 추정
}
function petsOwned() {
  if (ctx && ctx.petsOwned) return ctx.petsOwned() | 0;
  return clamp(2 + flr(bestZone() / 5), 0, 24);           // 추정
}
function unlockMet(def) {
  var u = def.un;
  if (u.zone && bestZone() < u.zone) return false;
  if (u.boss && bossKills() < u.boss) return false;
  if (u.pets && petsOwned() < u.pets) return false;
  return true;
}
function unlockText(def) {
  var u = def.un, a = [];
  if (u.zone) a.push('존 ' + u.zone + ' 도달');
  if (u.boss) a.push('보스 ' + u.boss + '회 토벌');
  if (u.pets) a.push('동료 ' + u.pets + '종 영입');
  return a.join(' · ');
}
function unlockProgress(def) {
  var u = def.un, p = 1;
  if (u.zone) p = min(p, bestZone() / u.zone);
  if (u.boss) p = min(p, bossKills() / u.boss);
  if (u.pets) p = min(p, petsOwned() / u.pets);
  return clamp(p, 0, 1);
}
function scanUnlocks() {
  var newly = null;
  for (var i = 0; i < CATALOG.length; i++) {
    var d = CATALOG[i], s = S.sk[d.id];
    if (!s.u && unlockMet(d)) { s.u = true; (newly || (newly = [])).push(d); }
  }
  if (newly) {
    ver++;
    for (var j = 0; j < newly.length; j++) ribbon('✦ 스킬 해금 — ' + newly[j].n, 'good');
    dirty = true;
  }
  return newly;
}

/* ─────────────────── 7. 비용 ─────────────────── */
function costOf(id) {
  var d = BY[id], s = S.sk[id];
  if (!d || !s || !s.u || s.lv >= LVMAX) return Infinity;
  return Math.ceil(d.cost[0] * pw(d.cost[1], s.lv - 1));
}
function levelUp(id) {
  var c = costOf(id);
  if (!isFinite(c)) return false;
  if (!ctx || !ctx.spend || !ctx.spend(c)) return false;
  S.sk[id].lv++;
  ver++; dirty = true;
  var d = BY[id];
  ribbon('▲ ' + d.n + ' Lv.' + S.sk[id].lv, 'good');
  fxLevel();
  return true;
}

/* ─────────────────── 8. FX 다리 (전부 선택적) ─────────────────── */
function FX() { try { return (ctx && ctx.fx && ctx.fx()) || null; } catch (e) { return null; } }
function ribbon(text, tone) { var f = FX(); if (f && f.ribbon) f.ribbon(text, tone); }
function foePos() {
  try {
    var p = ctx && ctx.foe && ctx.foe();
    if (p && isFinite(p.x)) return p;
  } catch (e) {}
  var f = FX(), sz = f && f.size ? f.size() : null;
  if (sz && sz.w) return { x: sz.w * 0.80, y: sz.h * 0.62, w: 60, h: 60 };
  return null;
}
function fxHit(amount, kind, boss) {
  var f = FX(), p = foePos();
  if (!f || !f.hit || !p) return;
  f.hit(p.x + (rnd() - 0.5) * (p.w || 40) * 0.5, p.y + (rnd() - 0.5) * (p.h || 40) * 0.5,
        { amount: amount, kind: kind || 'bite', boss: !!boss, crit: false });
}
function fxBurst(amount, boss) {
  var f = FX(), p = foePos();
  if (f && f.shake) f.shake(boss ? 0.9 : 0.6);
  if (f && f.flash) f.flash('#FFE2A6', 130, 0.5);
  if (f && f.hit && p) f.hit(p.x, p.y, { amount: amount, kind: 'stomp', crit: true, boss: !!boss });
}
function fxLevel() { var f = FX(); if (f && f.flash) f.flash('#C7DE7A', 110, 0.28); }

/* ─────────────────── 9. 폭발 예산 ─────────────────── */
/** 요청한 dps초를 예산에서 꺼낸다. 모자라면 있는 만큼만. */
function grantBurst(sec) {
  sec = min(sec, CAPS.burstSec);
  var g = min(sec, S.bank);
  S.bank -= g;
  return max(0, g);
}
function boom(sec, kind) {
  var g = grantBurst(sec);
  if (g <= 0) return 0;
  var dps = safe(ctx.dps), d = dps * g;
  if (d > 0 && ctx.hurt) { try { ctx.hurt(d); } catch (e) {} }
  fxBurst(d, !!safeB(ctx.isBoss));
  return d;
}
function safe(fn, dflt) { try { var v = fn && fn(); return isFinite(v) ? v : (dflt || 0); } catch (e) { return dflt || 0; } }
function safeB(fn) { try { return !!(fn && fn()); } catch (e) { return false; } }

/* ─────────────────── 10. 자동터치 ───────────────────
 * 이 게임의 터치 1회 기대값은 DPS 0.18~4.9초분이다. 연출대로 초당 24회를 "제값"으로 쏘면
 * 방치 DPS를 7~180배 덮어쓴다. 그래서 횟수(rate)와 위력(power)을 분리한다.
 *   rate  = 명목 연타수 합
 *   상한rate = s/(1-s) × dps / 기대타격   (s = 합산 기여 상한)
 *   power = min(1, 상한rate / rate)
 * ctx.tapScaled(n, power) 가 있으면 그대로, 없으면 (상한rate, 1.0) 으로 같은 피해를 낸다.
 * ------------------------------------------------------------------- */
function tapValue() {
  var cd = safe(ctx.clickDamage);
  var p = ctx && ctx.critChance ? clamp(safe(ctx.critChance, CAPS.critAssume), 0, 1) : CAPS.critAssume;
  return cd * (1 + p * (CRIT_MULT - 1));
}
function autoPlan() {
  var rate = 0, share = 0, n = 0;
  for (var i = 0; i < CATALOG.length; i++) {
    var d = CATALOG[i];
    if (!d.auto || !act(d.id)) continue;
    var lv = S.sk[d.id].lv;
    rate += pick(d.auto.rate, lv);
    share += pick(d.auto.share, lv);
    n++;
  }
  if (!n) return null;
  share = min(share, CAPS.autoShare);
  rate = min(rate, CAPS.autoRate);

  var dps = safe(ctx.dps), tv = tapValue();
  var capRate = (dps > 0 && tv > 0) ? (share / (1 - share)) * dps / tv : rate;
  capRate = min(capRate, CAPS.autoRate);

  /* 위력에 바닥을 깐다.
   * 바닥이 없으면 조련사 훈련이 올라갈수록 power 가 0.006 까지 내려가 "초당 41회 × 0.6%" 가 된다.
   * 숫자는 맞지만 화면에는 의미 없는 싸라기눈이 쏟아진다. 그래서 위력이 바닥에 닿으면
   * 그때부터는 횟수를 줄인다 — 총 피해(rate×power×tv = capRate×tv)는 어느 쪽이든 똑같다. */
  var nom = rate;
  var power = nom > 0 ? clamp(capRate / nom, CAPS.autoMinPower, 1) : 0;
  rate = power > 0 ? min(nom, capRate / power) : 0;

  return { rate: rate, nominal: nom, capRate: capRate, share: share,
           power: power, tiers: n, tv: tv, dps: dps };
}
function autoStep(dt) {
  var p = autoPlan();
  if (!p) { S.liveRate = lerp(S.liveRate, 0, min(1, dt * 6)); S.tapAcc = 0; return; }

  var scaled = !!(ctx && ctx.tapScaled);
  var fireRate = scaled ? p.rate : p.capRate;
  var power = scaled ? p.power : 1;

  S.tapAcc += fireRate * dt;
  var n = flr(S.tapAcc);
  S.tapAcc -= n;
  S.liveRate = lerp(S.liveRate, fireRate, min(1, dt * 5));

  if (n > 0) {
    S.fired += n; S.firedAuto += n;
    S.dmgAuto += n * power * p.tv;
    /* 프레임당 배치 — core.tap 은 40회 초과분을 비례 환산한다. 그래도 덩어리로 끊어 넘긴다. */
    var left = n;
    while (left > 0) {
      var k = min(left, 40);
      try {
        if (scaled) ctx.tapScaled(k, power);
        else ctx.tap(k);
      } catch (e) {}
      left -= k;
    }
  }
}

/* ─────────────────── 11. 시전 ─────────────────── */
function condOk(def) {
  if (def.cond === 'boss') return safeB(ctx.isBoss);
  if (def.cond === 'enemy') return true;
  return true;
}
function canCast(id) {
  var d = BY[id], s = S.sk[id];
  if (!d || !s || !ctx) return false;
  if (!s.u) return false;
  if (s.cd > 0) return false;
  if (d.auto && s.left > 0) return false;          // 자동터치는 겹쳐 쏘지 않는다
  return condOk(d);
}
function cast(id) {
  if (!canCast(id)) return false;
  var d = BY[id], s = S.sk[id], lv = s.lv, v = derive(d, lv).v;
  var boss = safeB(ctx.isBoss);

  s.cd = cdOf(d, lv);
  s.left = durOf(d, lv);
  s.used++;
  ver++; dirty = true;

  switch (id) {
    case 'thunder': {
      var dmg = boom(v.burst, 'stomp');
      ribbon('⚡ 뇌전 일격 — ' + fmt(dmg), 'gold');
      break;
    }
    case 'execute': {
      if (boss) {
        var mx = safe(ctx.enemyMax);
        var pct = v.bossPct + (synOn('gravekeep') ? 0.03 : 0);
        var dd = mx > 0 ? mx * pct : 0;
        if (dd <= 0) dd = boom(CAPS.burstSec * 0.5, 'stomp');
        else { if (ctx.hurt) { try { ctx.hurt(dd); } catch (e) {} } fxBurst(dd, true); }
        ribbon('✂ 목줄 끊기 — 보스 ' + Math.round(pct * 100) + '% (' + fmt(dd) + ')', 'gold');
      } else {
        killOne('✂ 목줄 끊기 — 숨통을 끊었다');
        S.execMark = 8;
      }
      break;
    }
    case 'stampede': {
      var wv = Math.round(v.waves) + (synOn('cullchain') ? 2 : 0);
      S.execMark = 0;
      S.chain = { left: wv, t: 0 };
      ribbon('≫ 질풍 연쇄 — ' + wv + '웨이브', 'good');
      break;
    }
    case 'emberlife': {
      var add = v.time + (synOn('gravekeep') ? 4 : 0);
      add = min(add, CAPS.bossTime);
      if (ctx.bossTimeAdd) { try { ctx.bossTimeAdd(add); } catch (e) {} }
      var f = FX(); if (f && f.flash) f.flash('#FF9333', 200, 0.42);
      ribbon('🜂 불씨 연명 — 제한시간 +' + Math.round(add) + '초', 'gold');
      break;
    }
    case 'bosshunt': {
      if (boss) { var b = boom(v.burst, 'stomp'); ribbon('✦ 거수 토벌 — 급소 ' + fmt(b), 'gold'); }
      else ribbon('✦ 거수 토벌 — 무리가 숨을 죽인다', 'good');
      break;
    }
    case 'breath': {
      var cut = v.instant;
      for (var i = 0; i < CATALOG.length; i++) {
        var o = CATALOG[i];
        if (o.id === 'breath') continue;
        var os = S.sk[o.id];
        if (os.cd > 0) os.cd = max(0, os.cd - pick(o.cd, os.lv) * cut);
      }
      ribbon('◎ 숨고르기 — 재사용 −' + Math.round(cut * 100) + '%', 'good');
      break;
    }
    case 'intrude': {
      var aoe = v.aoe * (safe(ctx.enemyCount, 1) > 1 ? 1.35 : 1);
      var dm = boom(aoe, 'stomp');
      ribbon('☾ 어둠 난입 — ' + Math.round(v.beasts) + '마리 (' + fmt(dm) + ')', 'good');
      break;
    }
    default:
      ribbon('✦ ' + d.n + ' 발동', d.tone === 'core' ? 'gold' : 'good');
  }
  return true;
}

/** 눈앞의 일반 적 하나를 처치한다. 피해가 아니라 "처치"다 — 적 체력에 비례한다.
 *  체력을 알 수 없을 때만 폭발 예산에서 꺼내 쓴다. 폴백이 무한 화력이 되면 안 되니까. */
function killOne(msg) {
  var mx = safe(ctx.enemyMax), hp = safe(ctx.enemyHp);
  var d;
  if (mx > 0 || hp > 0) {
    d = max(mx, hp) * 1.02;
    if (ctx.hurt) { try { ctx.hurt(d); } catch (e) {} }
    fxBurst(d, false);
  } else {
    d = boom(CAPS.burstSec, 'stomp');                // 체력 미상 — 예산을 통과한다
  }
  if (msg) ribbon(msg, 'good');
  return d;
}

/* ─────────────────── 12. 틱 ─────────────────── */
function tick(dt) {
  if (!ctx) return;
  dt = clamp(dt || 0, 0, 0.5);
  if (dt <= 0) return;

  S.bank = min(CAPS.burstBank, S.bank + CAPS.burstRefill * dt);
  if (S.execMark > 0) S.execMark = max(0, S.execMark - dt);

  scanUnlocks();

  var i, d, s;
  for (i = 0; i < CATALOG.length; i++) {
    d = CATALOG[i]; s = S.sk[d.id];
    if (s.cd > 0) { s.cd = max(0, s.cd - dt); if (s.cd === 0) dirty = true; }
    if (s.left > 0) { s.left = max(0, s.left - dt); if (s.left === 0) { ver++; dirty = true; } }
  }
  /* 자동 시전 — 해금 + 토글 + 조건이 맞을 때만 */
  for (i = 0; i < CATALOG.length; i++) {
    d = CATALOG[i]; s = S.sk[d.id];
    if (!s.auto || !s.u || s.cd > 0) continue;
    if (!autoWorth(d)) continue;
    cast(d.id);
  }
  /* 연쇄 처치 — 0.32초 간격으로 한 마리씩 */
  if (S.chain && S.chain.left > 0) {
    S.chain.t -= dt;
    if (S.chain.t <= 0) {
      S.chain.t = 0.32;
      if (safeB(ctx.isBoss)) { S.chain = null; ribbon('≫ 연쇄가 보스 앞에서 멎었다', 'bad'); }
      else {
        killOne(null);
        if (ctx.advance) { try { ctx.advance(1); } catch (e) {} }
        S.chain.left--;
        if (S.chain.left <= 0) S.chain = null;
      }
    }
  }
  autoStep(dt);

  /* 방치 피해 누적 — 기여율 표시용 (게임 피해와 무관, 계측만) */
  S.dmgIdle += safe(ctx.dps) * dt;
}
/** 자동 시전이 지금 의미가 있나 */
function autoWorth(d) {
  if (!condOk(d)) return false;
  if (d.auto && S.sk[d.id].left > 0) return false;
  if (d.id === 'emberlife') {
    var t = ctx.bossTime ? safe(ctx.bossTime, 99) : 99;
    return safeB(ctx.isBoss) && t > 0 && t < 12;         // 위기일 때만
  }
  if (d.id === 'execute' || d.id === 'stampede') return !safeB(ctx.isBoss);
  if (d.id === 'thunder') return true;
  return true;
}

/* ─────────────────── 13. 배율 (상한 적용) ─────────────────── */
var _m = null, _mk = '';
function mult() {
  var boss = safeB(ctx && ctx.isBoss);
  var key = ver + '|' + (boss ? 1 : 0);
  if (_m && _mk === key) return _m;

  var dps = 1, click = 1, gold = 1, bt = 0;
  var i, d, s, v;
  for (i = 0; i < CATALOG.length; i++) {
    d = CATALOG[i]; s = S.sk[d.id];
    if (!s.u || !d.v) continue;
    /* 해금만으로 늘 붙는 몫 — 보스 제한시간은 스폰 시점에 읽히므로 지속시간에 묶을 수 없다 */
    if (d.passiveBossTime) bt += pick(d.v.keep, s.lv);
    if (s.left <= 0) continue;
    v = derive(d, s.lv).v;
    if (d.id === 'bosshunt') {
      if (boss) {
        var bonus = synOn('gravekeep') ? 0.30 : 0;
        dps *= (v.dps + bonus);
        click *= v.click;
      }
      continue;
    }
    if (d.id === 'intrude') {
      dps *= (v.dps + (synOn('nightraid') ? 0.45 : 0));
      continue;
    }
    if (v.dps) dps *= v.dps;
    if (v.gold) gold *= v.gold;
    if (v.click) click *= v.click;
  }
  if (synOn('scent')) gold *= 1.35;

  _mk = key;
  _m = {
    dpsMult:       min(dps, CAPS.dpsMult),
    clickMult:     min(click, CAPS.clickMult),
    goldMult:      min(gold, CAPS.goldMult),
    bossTimeBonus: min(bt, CAPS.bossTime),
    cdrMult:       cdrNow(),
    /* 참고용 원값 — 패널의 "상한에 걸렸다" 표시에 쓴다 */
    raw:           { dps: dps, click: click, gold: gold }
  };
  return _m;
}

/* ─────────────────── 14. 통계 ─────────────────── */
function stats() {
  var p = autoPlan();
  var tot = S.dmgAuto + S.dmgIdle;
  return {
    rate:      S.liveRate,                       // 초당 실제 발사수
    nominal:   p ? p.nominal : 0,
    capRate:   p ? p.capRate : 0,
    power:     p ? p.power : 0,
    share:     p ? p.share : 0,
    tiers:     p ? p.tiers : 0,
    fired:     S.firedAuto,
    realShare: tot > 0 ? S.dmgAuto / tot : 0,    // 누적 실측 기여율
    bank:      S.bank,
    bankPct:   S.bank / CAPS.burstBank,
    scaled:    !!(ctx && ctx.tapScaled)
  };
}

/* ─────────────────── 15. DOM ─────────────────── */
var CSS_ID = 'wl-sk-css';
var CSS = [
/* 12종이니 6×2 · 4×3 · 3×4 로만 접힌다. auto-fill 은 7+5 같은 이 빠진 줄을 만든다 */
'.wl-sk-bar{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:5px;padding:9px 9px 10px;',
  'width:100%;flex:1 1 100%;',
  'border-top:1px solid var(--line,rgba(158,182,214,.14));background:linear-gradient(180deg,rgba(28,35,49,.34),rgba(14,17,25,.5))}',
/* core 의 .skills 안에 얹힐 때 — 테두리·여백이 두 겹이 되지 않게 양보한다 */
'.skills>.wl-sk-bar{border-top:0;padding:0;background:none}',
'.wl-sk{position:relative;overflow:hidden;text-align:left;padding:15px 7px 9px;min-height:50px;',
  'border:1px solid var(--line,rgba(158,182,214,.14));border-radius:2px;background:rgba(14,17,25,.55);',
  'font:inherit;color:inherit;cursor:pointer;transition:border-color .18s,box-shadow .18s,opacity .2s}',
'.wl-sk:disabled{cursor:not-allowed}',
'.wl-sk .k{position:absolute;left:7px;top:4px;font-family:var(--num,monospace);font-size:8.5px;font-weight:600;',
  'color:rgba(158,182,214,.30);letter-spacing:.04em}',
'.wl-sk .n{display:block;font-family:var(--disp,serif);font-weight:500;font-size:11.5px;line-height:1.25;',
  'letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--moon,#9EB6D6)}',
'.wl-sk .c{display:block;margin-top:2px;font-family:var(--num,monospace);font-variant-numeric:tabular-nums;',
  'font-size:9px;color:rgba(158,182,214,.50);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
/* 바닥의 선 하나가 상태를 전부 말한다 — 충전이면 차오르고, 가동이면 빠진다 */
'.wl-sk .f{position:absolute;left:0;bottom:0;height:2px;width:0;pointer-events:none;',
  'background:rgba(158,182,214,.26);transition:width .12s linear}',
'.wl-sk .a{position:absolute;right:6px;top:5px;width:5px;height:5px;border-radius:50%;',
  'background:var(--soulfire,#5FD9C4);box-shadow:0 0 6px rgba(95,217,196,.85)}',
/* 준비 */
'.wl-sk.rdy{border-color:rgba(255,147,51,.24)}',
'.wl-sk.rdy .n{color:var(--ember-core,#FFE2A6)}',
'.wl-sk.rdy .c{color:var(--firefly,#C7DE7A)}',
'.wl-sk.rdy .f{background:var(--firefly,#C7DE7A);opacity:.55}',
'.wl-sk.t-leaf.rdy{border-color:rgba(199,222,122,.28)}',
'.wl-sk.t-soul.rdy{border-color:rgba(95,217,196,.28)}',
'.wl-sk.t-deep.rdy{border-color:rgba(193,57,26,.36)}',
/* 충전 중 — 덮개 대신 흐리게. 이 크기에서 와이프는 이름을 삼킨다 */
'.wl-sk.cool{opacity:.54}',
'.wl-sk.cool .n{color:rgba(158,182,214,.80)}',
'.wl-sk.cool .f{background:rgba(158,182,214,.40)}',
/* 가동 중 */
'.wl-sk.on{border-color:var(--ember,#FF9333);box-shadow:inset 0 0 15px rgba(255,147,51,.16)}',
'.wl-sk.on .n{color:var(--ember-core,#FFE2A6)}',
'.wl-sk.on .c{color:var(--ember,#FF9333)}',
'.wl-sk.on .f{background:var(--ember,#FF9333);box-shadow:0 0 6px rgba(255,147,51,.55)}',
'.wl-sk.t-soul.on{border-color:var(--soulfire,#5FD9C4);box-shadow:inset 0 0 15px rgba(95,217,196,.15)}',
'.wl-sk.t-soul.on .n,.wl-sk.t-soul.on .c{color:var(--soulfire,#5FD9C4)}',
'.wl-sk.t-soul.on .f{background:var(--soulfire,#5FD9C4);box-shadow:0 0 6px rgba(95,217,196,.5)}',
'.wl-sk.t-leaf.on{border-color:var(--firefly,#C7DE7A);box-shadow:inset 0 0 15px rgba(199,222,122,.14)}',
'.wl-sk.t-leaf.on .n,.wl-sk.t-leaf.on .c{color:var(--firefly,#C7DE7A)}',
'.wl-sk.t-leaf.on .f{background:var(--firefly,#C7DE7A);box-shadow:0 0 6px rgba(199,222,122,.5)}',
/* 잠김 */
'.wl-sk.lock{opacity:.34}',
'.wl-sk.lock .n{color:rgba(158,182,214,.52)}',
'.wl-sk:not(:disabled):hover{border-color:rgba(255,147,51,.44)}',

/* ── 패널 ── */
'.wl-sp{font-size:12px}',
'.wl-sp .cap{padding:9px 10px;margin-bottom:11px;border-left:2px solid rgba(255,147,51,.22);',
  'background:rgba(28,35,49,.35)}',
'.wl-sp .cap h4{margin:0 0 7px;font-family:var(--disp,serif);font-weight:700;font-size:12px;letter-spacing:-.01em;',
  'color:var(--ink,#E6DCCB)}',
'.wl-sp .mtr{display:grid;grid-template-columns:auto 1fr auto;gap:5px 9px;align-items:center}',
'.wl-sp .mtr s{text-decoration:none;font-size:10px;font-weight:300;letter-spacing:.07em;color:var(--label,rgba(158,182,214,.62))}',
'.wl-sp .mtr u{text-decoration:none;display:block;height:3px;background:rgba(158,182,214,.11);border-radius:1px;overflow:hidden}',
'.wl-sp .mtr u i{display:block;height:100%;background:var(--ember,#FF9333);opacity:.8;transition:width .2s}',
'.wl-sp .mtr u i.leaf{background:var(--firefly,#C7DE7A)}',
'.wl-sp .mtr u i.soul{background:var(--soulfire,#5FD9C4)}',
'.wl-sp .mtr u i.hot{background:var(--ember-deep,#C1391A);opacity:1}',
'.wl-sp .mtr b{font-family:var(--num,monospace);font-variant-numeric:tabular-nums;font-size:10.5px;font-weight:600;',
  'color:var(--ink,#E6DCCB);white-space:nowrap}',
'.wl-sp .mtr b.max{color:var(--ember-deep,#C1391A)}',

'.wl-sp .r{position:relative;padding:10px 2px 11px;border-bottom:1px solid var(--line,rgba(158,182,214,.14))}',
'.wl-sp .r.lock{opacity:.5}',
'.wl-sp .hd{display:flex;align-items:baseline;gap:7px;flex-wrap:wrap}',
'.wl-sp .hd .n{font-family:var(--disp,serif);font-weight:700;font-size:13.5px;letter-spacing:-.01em;color:var(--ink,#E6DCCB)}',
'.wl-sp .hd .ha{font-family:var(--disp,serif);font-weight:500;font-size:10px;color:rgba(158,182,214,.40);letter-spacing:.12em}',
'.wl-sp .hd .rl{font-size:9.5px;letter-spacing:.06em;padding:1px 6px;border:1px solid var(--line,rgba(158,182,214,.14));',
  'border-radius:2px;color:var(--label,rgba(158,182,214,.62))}',
'.wl-sp .hd .lv{margin-left:auto;font-family:var(--num,monospace);font-size:10px;font-weight:600;color:var(--moon,#9EB6D6)}',
'.wl-sp .fl{margin-top:3px;font-size:11px;font-style:italic;color:rgba(158,182,214,.58);line-height:1.6}',
'.wl-sp .ef{margin-top:5px;font-family:var(--num,monospace);font-variant-numeric:tabular-nums;font-size:10.5px;',
  'color:var(--ink,#E6DCCB);line-height:1.6}',
'.wl-sp .nx{font-size:10px;color:rgba(158,182,214,.50);font-family:var(--num,monospace)}',
'.wl-sp .ct{display:flex;gap:6px;align-items:center;margin-top:7px;flex-wrap:wrap}',
'.wl-sp .bt{font:inherit;font-size:10.5px;font-family:var(--num,monospace);font-weight:600;padding:4px 10px;cursor:pointer;',
  'border:1px solid var(--line,rgba(158,182,214,.14));border-radius:2px;background:none;color:var(--dim,rgba(158,182,214,.40));',
  'transition:color .16s,border-color .16s}',
'.wl-sp .bt.ok{color:var(--ember,#FF9333);border-color:rgba(255,147,51,.28);box-shadow:inset 0 -1px 0 rgba(255,147,51,.5)}',
'.wl-sp .bt.ok:hover{background:rgba(255,147,51,.08)}',
'.wl-sp .bt:disabled{cursor:not-allowed}',
'.wl-sp .tg{font:inherit;font-size:10.5px;padding:4px 10px;cursor:pointer;border-radius:2px;background:none;',
  'border:1px solid var(--line,rgba(158,182,214,.14));color:var(--label,rgba(158,182,214,.62));transition:color .16s,border-color .16s}',
'.wl-sp .tg.on{color:var(--soulfire,#5FD9C4);border-color:rgba(95,217,196,.36);box-shadow:inset 0 -1px 0 rgba(95,217,196,.55)}',
'.wl-sp .tg:disabled{opacity:.45;cursor:not-allowed}',
'.wl-sp .cast{font:inherit;font-size:10.5px;font-family:var(--disp,serif);font-weight:500;padding:4px 12px;cursor:pointer;',
  'border-radius:2px;background:none;border:1px solid rgba(255,147,51,.28);color:var(--ember-core,#FFE2A6)}',
'.wl-sp .cast:disabled{opacity:.32;cursor:not-allowed;border-color:var(--line,rgba(158,182,214,.14));color:var(--label,rgba(158,182,214,.62))}',
'.wl-sp .lk{margin-top:6px;font-size:10.5px;color:var(--label,rgba(158,182,214,.62));font-family:var(--num,monospace)}',
'.wl-sp .lk u{text-decoration:none;display:inline-block;vertical-align:middle;width:70px;height:3px;margin-left:7px;',
  'background:rgba(158,182,214,.11);border-radius:1px;overflow:hidden}',
'.wl-sp .lk u i{display:block;height:100%;background:var(--moon,#9EB6D6);opacity:.7}',

'.wl-sp .syn{margin-top:13px}',
'.wl-sp .syn h4{margin:0 0 6px;font-family:var(--disp,serif);font-weight:700;font-size:12px;color:var(--ink,#E6DCCB)}',
'.wl-sp .sy{padding:7px 9px;margin-bottom:5px;border:1px solid var(--line,rgba(158,182,214,.14));border-radius:2px;',
  'background:rgba(14,17,25,.4)}',
'.wl-sp .sy .t{display:flex;align-items:baseline;gap:6px}',
'.wl-sp .sy .t b{font-family:var(--disp,serif);font-weight:700;font-size:11.5px;color:var(--moon,#9EB6D6)}',
'.wl-sp .sy .t s{text-decoration:none;font-size:9px;letter-spacing:.12em;color:rgba(158,182,214,.34)}',
'.wl-sp .sy .t em{margin-left:auto;font-style:normal;font-family:var(--num,monospace);font-size:9px;',
  'letter-spacing:.06em;color:rgba(158,182,214,.38)}',
'.wl-sp .sy p{margin:3px 0 0;font-size:10.5px;line-height:1.65;color:var(--label,rgba(158,182,214,.62))}',
'.wl-sp .sy.on{border-color:rgba(95,217,196,.38);background:rgba(95,217,196,.06)}',
'.wl-sp .sy.on .t b{color:var(--soulfire,#5FD9C4)}',
'.wl-sp .sy.on .t em{color:var(--soulfire,#5FD9C4)}',
'@media (max-width:900px){.wl-sk-bar{grid-template-columns:repeat(4,minmax(0,1fr))}}',
'@media (max-width:560px){',
  '.wl-sk-bar{grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;padding:7px}',
  '.wl-sk{min-height:46px;padding:5px 6px 7px}',
  '.wl-sk .n{font-size:11px;margin-top:8px} .wl-sk .c{font-size:8.5px}',
  '.wl-sp .hd .n{font-size:12.5px}',
'}',
'@media (prefers-reduced-motion:reduce){.wl-sk,.wl-sp .mtr u i{transition:none}}'
].join('');

function ensureCss() {
  if (doc.getElementById(CSS_ID)) return;
  var s = doc.createElement('style');
  s.id = CSS_ID;
  s.textContent = CSS;
  (doc.head || doc.documentElement).appendChild(s);
}

var barRoot = null, barTiles = null, panelRoot = null, panelRows = null, panelMeters = null, panelSyn = null;
var dirty = true;

function bar() {
  ensureCss();
  if (barRoot) return barRoot;
  barRoot = el('div', 'wl-sk-bar');
  barTiles = {};
  for (var i = 0; i < CATALOG.length; i++) {
    (function (d) {
      var b = el('button', 'wl-sk t-' + d.tone);
      b.type = 'button';
      b.title = d.n + ' — ' + d.role;
      b.setAttribute('data-id', d.id);
      if (W.Icons && W.Icons.has(d.id)) { var ic = el('i', 'ic'); W.Icons.apply(ic, d.id); b.appendChild(ic); }
      var fill = el('i', 'f');
      var adot = el('i', 'a'); adot.style.display = 'none';
      var k = el('i', 'k', d.hot ? String(d.hot) : '·');
      var n = el('b', 'n', d.n);
      var c = el('i', 'c', '—');
      b.appendChild(fill); b.appendChild(adot);
      b.appendChild(k); b.appendChild(n); b.appendChild(c);
      b.onclick = function () { cast(d.id); refresh(); };
      barRoot.appendChild(b);
      barTiles[d.id] = { b: b, fill: fill, a: adot, n: n, c: c };
    })(CATALOG[i]);
  }
  dirty = true;
  refresh();
  return barRoot;
}

function meterRow(label, klass) {
  var s = el('s', null, label), u = el('u'), i = el('i', klass || ''), b = el('b', null, '—');
  u.appendChild(i);
  return { s: s, u: u, i: i, b: b };
}

function panel() {
  ensureCss();
  if (panelRoot) return panelRoot;
  panelRoot = el('div', 'wl-sp');

  /* 상한 계기판 */
  var cap = el('div', 'cap');
  cap.appendChild(el('h4', null, '지금 걸려 있는 천장'));
  var mtr = el('div', 'mtr');
  panelMeters = {
    dps:   meterRow('지속 배율'),
    click: meterRow('터치 배율'),
    gold:  meterRow('발자국'),
    auto:  meterRow('자동터치', 'leaf'),
    bank:  meterRow('폭발 예산', 'soul'),
    cdr:   meterRow('재사용')
  };
  ['dps', 'click', 'gold', 'auto', 'bank', 'cdr'].forEach(function (k) {
    var m = panelMeters[k];
    mtr.appendChild(m.s); mtr.appendChild(m.u); mtr.appendChild(m.b);
  });
  cap.appendChild(mtr);
  panelRoot.appendChild(cap);

  /* 스킬 행 */
  panelRows = {};
  for (var i = 0; i < CATALOG.length; i++) {
    (function (d) {
      var r = el('div', 'r');
      var hd = el('div', 'hd');
      var nm = el('b', 'n', d.n), ha = el('s', 'ha', d.han), rl = el('i', 'rl', d.role), lv = el('i', 'lv', 'Lv.1');
      hd.appendChild(nm); hd.appendChild(ha); hd.appendChild(rl); hd.appendChild(lv);
      var fl = el('p', 'fl', '&ldquo;' + d.f + '&rdquo;');
      var ef = el('div', 'ef', '—');
      var nx = el('div', 'nx', '');
      var lk = el('div', 'lk');
      var lkt = el('span', null, ''), lku = el('u'), lki = el('i');
      lku.appendChild(lki); lk.appendChild(lkt); lk.appendChild(lku);
      var ct = el('div', 'ct');
      var cb = el('button', 'cast', '시전'); cb.type = 'button';
      var ub = el('button', 'bt', '강화'); ub.type = 'button';
      var tb = el('button', 'tg', '자동 시전'); tb.type = 'button';
      cb.onclick = function () { cast(d.id); refresh(); };
      ub.onclick = function () { levelUp(d.id); refresh(); };
      tb.onclick = function () { setAuto(d.id, !S.sk[d.id].auto); refresh(); };
      ct.appendChild(cb); ct.appendChild(ub); ct.appendChild(tb);
      r.appendChild(hd); r.appendChild(fl); r.appendChild(ef); r.appendChild(nx); r.appendChild(lk); r.appendChild(ct);
      panelRoot.appendChild(r);
      panelRows[d.id] = { r: r, lv: lv, ef: ef, nx: nx, lk: lk, lkt: lkt, lki: lki, ct: ct, cb: cb, ub: ub, tb: tb };
    })(CATALOG[i]);
  }

  /* 시너지 */
  var sy = el('div', 'syn');
  sy.appendChild(el('h4', null, '조합'));
  panelSyn = {};
  for (var j = 0; j < SYNERGY.length; j++) {
    (function (g) {
      var box = el('div', 'sy');
      var t = el('div', 't');
      t.appendChild(el('b', null, g.n));
      t.appendChild(el('s', null, g.han));
      var em = el('em', null, '대기');
      t.appendChild(em);
      box.appendChild(t);
      box.appendChild(el('p', null, g.d));
      sy.appendChild(box);
      panelSyn[g.id] = { box: box, em: em };
    })(SYNERGY[j]);
  }
  panelRoot.appendChild(sy);

  dirty = true;
  refresh();
  return panelRoot;
}

/* ── 갱신 ── (rAF 마다 불려도 문자열이 같으면 DOM 을 안 건드린다) */
function refresh() {
  if (!barRoot && !panelRoot) return;
  var m = mult(), sx = stats(), i, d, s, t;

  if (barRoot) {
    for (i = 0; i < CATALOG.length; i++) {
      d = CATALOG[i]; s = S.sk[d.id]; t = barTiles[d.id];
      if (!t) continue;
      var k = 'wl-sk t-' + d.tone, sub, w = 0;
      if (!s.u) {
        k += ' lock';
        sub = unlockText(d).replace(' 도달', '').replace('회 토벌', '회').replace('종 영입', '종');
        t.b.disabled = true;
        w = unlockProgress(d);                       // 해금까지 얼마나 왔나
      } else if (s.left > 0) {
        k += ' on';
        sub = secs(s.left);
        t.b.disabled = !canCast(d.id);
        w = s.left / max(0.01, durOf(d, s.lv));      // 남은 지속 — 빠져나간다
      } else if (s.cd > 0) {
        k += ' cool';
        sub = Math.ceil(s.cd) + '초';
        t.b.disabled = true;
        w = 1 - s.cd / max(1, cdOf(d, s.lv));        // 충전 — 차오른다
      } else {
        var ok = canCast(d.id);
        k += ok ? ' rdy' : ' cool';
        sub = ok ? '준비' : (d.cond === 'boss' ? '보스 전용' : '대기');
        t.b.disabled = !ok;
        w = ok ? 1 : 0;
      }
      cls(t.b, k);
      sty(t.fill, 'width', (clamp(w, 0, 1) * 100).toFixed(1) + '%');
      txt(t.c, sub);
      sty(t.a, 'display', s.auto && s.u ? 'block' : 'none');
    }
  }

  if (!panelRoot) return;

  /* 계기판 */
  meter(panelMeters.dps,   m.dpsMult,   CAPS.dpsMult,
        '×' + m.dpsMult.toFixed(2) + ' / ' + CAPS.dpsMult.toFixed(2), m.raw.dps > CAPS.dpsMult + 1e-6);
  meter(panelMeters.click, m.clickMult, CAPS.clickMult,
        '×' + m.clickMult.toFixed(2) + ' / ' + CAPS.clickMult.toFixed(2), m.raw.click > CAPS.clickMult + 1e-6);
  meter(panelMeters.gold,  m.goldMult,  CAPS.goldMult,
        '×' + m.goldMult.toFixed(2) + ' / ' + CAPS.goldMult.toFixed(2), m.raw.gold > CAPS.goldMult + 1e-6);
  meter(panelMeters.auto,  sx.share,    CAPS.autoShare,
        sx.tiers ? Math.round(sx.share * 100) + '% / ' + Math.round(CAPS.autoShare * 100) + '%  ·  '
                   + sx.rate.toFixed(1) + '회/초'
                 : '꺼짐',
        sx.tiers > 0 && sx.share >= CAPS.autoShare - 1e-6);
  meter(panelMeters.bank,  sx.bank,     CAPS.burstBank,
        sx.bank.toFixed(1) + ' / ' + CAPS.burstBank + ' dps초', false);
  meter(panelMeters.cdr,   1 - m.cdrMult, 1 - CAPS.cdrMult,
        '×' + m.cdrMult.toFixed(2) + ' / ' + CAPS.cdrMult.toFixed(2), m.cdrMult <= CAPS.cdrMult + 1e-6);

  /* 행 */
  for (i = 0; i < CATALOG.length; i++) {
    d = CATALOG[i]; s = S.sk[d.id];
    var p = panelRows[d.id];
    if (!p) continue;
    var dv = derive(d, s.lv);
    cls(p.r, 'r' + (s.u ? '' : ' lock'));
    txt(p.lv, 'Lv.' + s.lv + (s.lv >= LVMAX ? ' MAX' : ''));

    var line = d.desc(dv.v, dv);
    if (!d.auto && dv.dur > 0) line += ' · 재사용 ' + Math.round(cdOf(d, s.lv)) + '초';
    else if (d.auto) line += ' · 재사용 ' + Math.round(cdOf(d, s.lv)) + '초';
    else line += ' · 재사용 ' + Math.round(cdOf(d, s.lv)) + '초';
    txt(p.ef, line);

    if (s.lv >= LVMAX) { sty(p.nx, 'display', 'none'); }
    else {
      sty(p.nx, 'display', 'block');
      var nv = derive(d, s.lv + 1);
      txt(p.nx, '다음 → ' + d.desc(nv.v, nv));
    }

    if (s.u) {
      sty(p.lk, 'display', 'none');
      sty(p.ct, 'display', 'flex');
      var c = costOf(d.id);
      var afford = isFinite(c) && safe(ctx && ctx.gold) >= c;
      cls(p.ub, 'bt' + (afford ? ' ok' : ''));
      txt(p.ub, isFinite(c) ? '강화 ' + fmt(c) : '강화 완료');
      p.ub.disabled = !afford;
      cls(p.tb, 'tg' + (s.auto ? ' on' : ''));
      txt(p.tb, s.auto ? '자동 시전 ●' : '자동 시전 ○');
      p.tb.disabled = false;
      p.cb.disabled = !canCast(d.id);
      txt(p.cb, s.left > 0 ? '유지 ' + secs(s.left) : s.cd > 0 ? Math.ceil(s.cd) + '초' : '시전');
    } else {
      sty(p.lk, 'display', 'block');
      sty(p.ct, 'display', 'none');
      txt(p.lkt, '잠김 — ' + unlockText(d));
      sty(p.lki, 'width', (unlockProgress(d) * 100).toFixed(0) + '%');
    }
  }

  /* 시너지 */
  for (var j = 0; j < SYNERGY.length; j++) {
    var g = SYNERGY[j], ps = panelSyn[g.id];
    if (!ps) continue;
    var on = false;
    try { on = !!g.test(); } catch (e) {}
    var owned = 0;
    for (var q = 0; q < g.need.length; q++) if (has(g.need[q])) owned++;
    cls(ps.box, 'sy' + (on ? ' on' : ''));
    txt(ps.em, on ? '발동 중' : owned >= 2 ? '대기' : '미해금 ' + (g.need.length - owned));
  }
  dirty = false;
}

function meter(m, v, cap, label, hot) {
  if (!m) return;
  sty(m.i, 'width', clamp(cap > 0 ? v / cap : 0, 0, 1) * 100 + '%');
  /* 상한에 걸린 건 경고가 아니라 설계다. 바는 제 색을 지키고 숫자 색만 바뀐다. */
  txt(m.b, label);
  cls(m.b, hot ? 'max' : '');
}

/* ─────────────────── 16. 나머지 API ─────────────────── */
function setAuto(id, v) {
  var s = S.sk[id];
  if (!s || !s.u) return false;
  s.auto = !!v;
  dirty = true;
  return true;
}
function autoOn(id) { var s = S.sk[id]; return !!(s && s.auto); }

function init(saved, c) {
  ctx = c || null;
  S = blankState();
  try {
    reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  } catch (e) { reduced = false; }

  if (saved && saved.sk) {
    for (var id in saved.sk) {
      if (!S.sk[id]) continue;
      var a = saved.sk[id], b = S.sk[id];
      b.lv   = clamp(a.lv | 0 || 1, 1, LVMAX);
      b.cd   = max(0, +a.cd || 0);
      b.left = max(0, +a.left || 0);
      b.auto = !!a.auto;
      b.u    = !!a.u;
      b.used = a.used | 0;
    }
    if (isFinite(saved.bank)) S.bank = clamp(+saved.bank, 0, CAPS.burstBank);
  }
  ver++;
  scanUnlocks();
  dirty = true;
  if (barRoot || panelRoot) refresh();
  return W.Skills;
}
function serialize() {
  var out = { v: 1, sk: {}, bank: r2(S.bank) };
  for (var id in S.sk) {
    var s = S.sk[id];
    out.sk[id] = { lv: s.lv, cd: r2(s.cd), left: r2(s.left), auto: s.auto, u: s.u, used: s.used };
  }
  return out;
}
function reset() { S = blankState(); ver++; dirty = true; if (barRoot || panelRoot) refresh(); }

/* ─────────────────── 17. 파사드 ─────────────────── */
W.Skills = {
  CATALOG:  CATALOG,
  SYNERGY:  SYNERGY,
  LVMAX:    LVMAX,
  init:     init,
  serialize: serialize,
  tick:     tick,
  cast:     cast,
  canCast:  canCast,
  levelUp:  levelUp,
  costOf:   costOf,
  setAuto:  setAuto,
  autoOn:   autoOn,
  mult:     mult,
  bar:      bar,
  panel:    panel,
  refresh:  refresh,
  /* 부가 */
  state:    function (id) { return S.sk[id]; },
  unlocked: has,
  stats:    stats,
  caps:     function () { var o = {}; for (var k in CAPS) o[k] = CAPS[k]; return o; },
  derive:   function (id, lv) { var d = BY[id]; return d ? derive(d, clamp(lv | 0 || S.sk[id].lv, 1, LVMAX)) : null; },
  cdOf:     function (id) { var d = BY[id]; return d ? cdOf(d, S.sk[id].lv) : 0; },
  durOf:    function (id) { var d = BY[id]; return d ? durOf(d, S.sk[id].lv) : 0; },
  reset:    reset
};

})();
