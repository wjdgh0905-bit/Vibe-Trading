/* ══════════════════════════════════════════════════════════════════════════════
   WL.Difficulty — 스테이지 난이도 · 어픽스 · 보상          (바닐라 JS / 의존성 0)

   순수 데이터 테이블 + 순수 함수만 담는다. DOM·렌더·타이머 없음.
   전부 JSON 직렬화 가능한 값만 주고받는다.

   ┌ 설계 불변식 (테스트로 강제됨 — selfTest()) ────────────────────────────┐
   │ 1. E_max = 1.78824 ≤ 2.000        유효 난이도(존 전투시간 배율) 상한    │
   │ 2. 보스 실패 문턱 DPS는 티어·어픽스와 무관하다                          │
   │    (체력 배율과 제한시간 배율이 언제나 같은 계수 → 난이도 절벽 없음)    │
   │ 3. 모든 시련은 '초당 발자국 중립, 초당 간식 순증'                        │
   │    발자국 = tf, 간식 ≥ tf^1.3  (tf = 그 어픽스가 만드는 시간 배율)      │
   │ 4. T1~T4의 어떤 어픽스 조합도 T0보다 초당 발자국·간식이 적을 수 없다    │
   │ 5. 벽 지수 W는 보상에 절대 관여하지 않는다 (W는 플레이어 DPS의 역수다)  │
   └──────────────────────────────────────────────────────────────────────────┘

   ┌ 공개 API ────────────────────────────────────────────────────────────────┐
   데이터
     .VERSION                        문자열
     .TIERS                          난이도 5티어
     .AFFIXES / .TRIALS / .BLESSES   어픽스 8종 (시련 5 + 축복 3)
     .GRADES                         벽 등급 6단계
     .WAVE                           웨이브 종류별 배율 {hp, gold, snack}
     .UNITS                          존 1개의 체력/발자국/간식 단위 합

   웨이브 구조  (정예 판정은 이 모듈에 일원화 — WL.Events는 별도 HP 배율 금지)
     .waveKind(zone, wave)           'mob' | 'elite' | 'boss' | 'overlord'
     .isElite(zone, wave) / .isBossWave(wave) / .isOverlord(zone, wave)
     .pick.mob(z,w) .pick.elite(z,w) .pick.boss(z) .pick.overlord(z)
                                     적 테이블 인덱스 선택자 (테이블 자체는 로스터 모듈 소관)

   난이도
     .zoneHP(zone)                   원본과 동일한 존 기본 체력 (순수·캐시)
     .affixesFor(zone, tier, seed)   결정론적 [시련, 축복]  (T0은 [])
     .E(zone, tier, seed)            유효 난이도 = 존 전투시간 배율
     .applyToEnemy(baseHP, ctx)      → {kind, hp, count, hpMult, playerDmgMult,
                                        timeLimit, goldMult, snackMult, affixes}
     .enemyMaxHP(zone, wave, opts)   한 방에 계산
     .bossTimeFor(opts)              보스 제한시간(초)

   보상
     .rewardFor(ctx)                 → {gold, snack, kind, ...}   처치 1회분
     .regionReward(zone, opts)       → {snack}                    지역 돌파 1회성
     .soulMult(tier)                 환생 야생혼 배율
     .zoneReward(zone, opts)         존 1개 총량 (분석·검증용)

   체감 난이도
     .ratingOf(zone, playerDps, opts)→ {index, grade, gradeIndex, fill, soak, ...}
     .forecast(zone, playerDps, opts)→ 앞뒤 존 색 띠용 배열

   상태
     .newState() / .migrate(save) / .FIELDS
     .unlocked(state) / .setTier(state, t) / .tierOf(t)
     .recordBest(state, zone, kind) / .recordBossFail(state, zone)
     .describeTier(t) / .describeAffix(a)
     .selfTest()                     불변식 자체 검증 → {ok, fails:[...]}
   └──────────────────────────────────────────────────────────────────────────┘

   ┌ 상태 형태 (save 객체에 평면으로 얹는다 — 전부 JSON 안전) ───────────────┐
     tier       : 0..4   선택한 난이도
     affixSeed  : int    어픽스 회전 시드 (기본 1)
     snack      : number 🍖 간식 보유량 (수도꼭지는 이 모듈 단독)
     bestBeaten : int    보스를 실제로 잡은 최고 존 (개척 보너스 판정)
     tierBest   : {티어: 최고 존}   난이도별 최고 기록
     wallLog    : {존: 보스 실패 횟수}  지도 띠의 💀 표시 (상위 40개만 보존)
   └──────────────────────────────────────────────────────────────────────────┘
   ══════════════════════════════════════════════════════════════════════════ */

(function (global) {
'use strict';

var WL = global.WL || (global.WL = {});

/* ══════════════════════════════════════════════════════════════════════════
   0. 기본 곡선 — 원본 index.html과 1:1 동일해야 한다
   ══════════════════════════════════════════════════════════════════════════ */

const HP_CAP = 1e300;
const hpCache = [0, 10];
/** 존 기본 체력. zoneHP(1)=10, 이후 존당 ×(1.42 + min(0.26, z×0.0012)) */
function zoneHP(z){
  z = Math.max(1, Math.floor(z));
  if(hpCache[z] !== undefined) return hpCache[z];
  let hp = hpCache[hpCache.length - 1];
  for(let i = hpCache.length; i <= z; i++){
    hp = Math.min(HP_CAP, hp * (1.42 + Math.min(0.26, i * 0.0012)));
    hpCache[i] = hp;
  }
  return hpCache[z];
}

/* ══════════════════════════════════════════════════════════════════════════
   1. 웨이브 구조 — 전 티어 공통. 존의 기승전결을 '구조'로 고정한다.
      w1,2,3,5,6,8,9 일반 · w4,w7 정예 · w10 보스 · 50존마다 w10은 대군주
   ══════════════════════════════════════════════════════════════════════════ */

const WAVES_PER_ZONE = 10;
const BOSS_WAVE      = 10;
const ELITE_WAVES    = [4, 7];
const OVERLORD_EVERY = 50;
const OVERLORD_TIME  = 1.35;   // 대군주 제한시간 배수
const BASE_BOSS_TIME = 30;     // 원본과 동일

/** 웨이브 종류별 배율. hp=체력, gold=발자국, snack=간식 기본치 */
const WAVE = {
  mob:      {hp:1.0, gold:1,  snack:0.8, n:'일반'},
  elite:    {hp:2.2, gold:3,  snack:5,   n:'정예'},
  boss:     {hp:5.5, gold:9,  snack:14,  n:'보스'},
  overlord: {hp:8.8, gold:18, snack:40,  n:'대군주'},
};
const REGION_SNACK = 30;       // 지역 돌파(5존마다) 1회성 간식 계수

const waveHpFactor = w => 1 + (w - 1) * 0.12;

const isBossWave  = w => w === BOSS_WAVE;
const isOverlord  = (z, w) => w === BOSS_WAVE && z % OVERLORD_EVERY === 0;
const isElite     = (z, w) => w === 4 || w === 7;

function waveKind(z, w){
  if(w === BOSS_WAVE) return (z % OVERLORD_EVERY === 0) ? 'overlord' : 'boss';
  if(w === 4 || w === 7) return 'elite';
  return 'mob';
}

/* 적 테이블 인덱스 선택자.
   테이블(지역 10 × 일반8/정예3/보스2 + 대군주 5)은 로스터 모듈이 소유하고,
   '어느 행을 쓸지'만 여기서 결정론적으로 고른다.
   NORD: 일반 웨이브 7개의 순번(0..6). 선형식 (z*a+w*b)%8 로는
   w=1과 w=9가 항상 충돌하므로(차이 8) 순번 룩업이 필수다. */
const NORD = [0, 0, 1, 2, 0, 3, 4, 0, 5, 6];   // 첨자 = wave(1..9), w4·w7은 미사용
const pick = {
  mob:      (z, w) => (z * 3 + NORD[w]) % 8,
  elite:    (z, w) => (z * 5 + (w === 4 ? 0 : 1)) % 3,
  boss:     z => Math.floor((z - 1) / OVERLORD_EVERY) % 2,
  overlord: z => (Math.floor(z / OVERLORD_EVERY) - 1 + 1e9) % 5,
};

/* 존 1개의 단위 합 — 어픽스 시간계수 tf와 보상 중립성의 분모가 된다 */
const UNITS = (function(){
  const u = {hp:{mob:0, elite:0, boss:0}, gold:{mob:0, elite:0, boss:0},
             snack:{mob:0, elite:0, boss:0}, kills:{mob:0, elite:0, boss:0}};
  for(let w = 1; w <= WAVES_PER_ZONE; w++){
    const k = waveKind(1, w);                    // 1존 = 대군주 아님 = 표준 존
    u.hp[k]    += waveHpFactor(w) * WAVE[k].hp;  // 체력은 웨이브 보정을 받는다
    u.gold[k]  += WAVE[k].gold;                  // 발자국은 받지 않는다(원본 규칙)
    u.snack[k] += WAVE[k].snack;
    u.kills[k] += 1;
  }
  const sum = o => o.mob + o.elite + o.boss;
  u.hp.total = sum(u.hp); u.gold.total = sum(u.gold);
  u.snack.total = sum(u.snack); u.kills.total = sum(u.kills);
  return u;
})();
/* → hp {mob:10.240, elite:6.776, boss:11.440, total:28.456}
     gold {7, 6, 9, total:22}   snack {5.6, 10, 14, total:29.6} */

/* ══════════════════════════════════════════════════════════════════════════
   2. 난이도 5티어
      hp : 모든 적 체력 ×  (보스 제한시간도 '같은 계수'로 늘어난다)
      rg : 발자국 ×   rn : 간식 ×   rs : 환생 야생혼 ×
      런타임 지수 연산 없이 상수로 박는다.
   ══════════════════════════════════════════════════════════════════════════ */

const TIERS = [
  {t:0, k:'stroll', ic:'🍃', n:'산책', c:'#7fd4a0',
   hp:1.00, rg:1.00, rn:1.00, rs:1.00, affix:false, slots:0, zone:0,   asc:0,
   d:'있는 그대로의 야생. 아무것도 더해지지 않는다.'},
  {t:1, k:'track',  ic:'🐾', n:'추적', c:'#5ec8f0',
   hp:1.10, rg:1.67, rn:1.95, rs:1.07, affix:true,  slots:2, zone:20,  asc:0,
   d:'발자국을 쫓기 시작한다. 시련 하나와 축복 하나가 따라붙는다.'},
  {t:2, k:'hunt',   ic:'🏹', n:'사냥', c:'#e0c344',
   hp:1.22, rg:2.06, rn:2.56, rs:1.14, affix:true,  slots:2, zone:50,  asc:0,
   d:'쫓기던 쪽과 쫓는 쪽이 바뀐다.'},
  {t:3, k:'frenzy', ic:'🔥', n:'광란', c:'#f08a3c',
   hp:1.36, rg:2.56, rn:3.39, rs:1.22, affix:true,  slots:2, zone:100, asc:2,
   d:'짐승도 물러서지 않는다. 사냥이 길어지는 만큼 수확이 커진다.'},
  {t:4, k:'myth',   ic:'🐲', n:'신화', c:'#c0508a',
   hp:1.52, rg:3.20, rn:4.53, rs:1.30, affix:true,  slots:2, zone:180, asc:8,
   d:'이야기 속 짐승들이 걸어 나온다. 환생의 수확이 30% 두꺼워진다.'},
];
const TIER_MAX = TIERS.length - 1;

function tierOf(t){
  if(t && typeof t === 'object') t = t.tier;
  t = (t | 0);
  return TIERS[t] || TIERS[0];
}

/* ══════════════════════════════════════════════════════════════════════════
   3. 어픽스 8종 — 항상 정확히 시련 1 + 축복 1. 채찍에는 반드시 당근이 붙는다.

   원시 필드(설계자가 손으로 정하는 값)
     dmg     플레이어 피해 배율
     hpMob / hpElite / hpBoss   종류별 체력 배율
     dup     일반 웨이브 1개당 등장 수
     g / sn  발자국·간식 배율 (생략하면 아래 규칙으로 자동 유도)

   파생 필드(코드가 계산 — 하드코딩하지 않는다)
     tf      존 전투시간 배율          = (체력 단위 합 / 기준) / dmg
     bt      보스 제한시간 배율        = hpBoss / dmg      ← 실패율 불변의 근거
     gold/snack {mob,elite,boss}      처치 1회당 자원 배율
     zoneGold / zoneSnack             존 총량 배율

   보상 규칙(시련): 존 총 발자국 = tf  → 초당 발자국 정확히 중립
                   존 총 간식   ≥ tf^1.3 → 간식만 순증
   ══════════════════════════════════════════════════════════════════════════ */

const AFFIX_SRC = [
  /* ── 시련 5 ── */
  {id:'mud',   kind:'trial', ic:'🪨', n:'진흙 발굽', dmg:0.85,
   d:'모든 피해 ×0.85',
   tip:'발이 무거워진 만큼 발자국과 간식이 늘어난다. 시간만 빌려주는 시련.'},
  {id:'plate', kind:'trial', ic:'👑', n:'여왕의 갑주', hpBoss:1.40,
   d:'보스 체력 ×1.40 · 보스 제한시간 ×1.40',
   tip:'체력과 시간이 같이 늘어난다 — 보스 실패 확률은 조금도 변하지 않는다.'},
  {id:'hide',  kind:'trial', ic:'🛡️', n:'두꺼운 가죽', hpMob:1.25, hpElite:1.25,
   d:'일반·정예 체력 ×1.25 (보스 제외)',
   tip:'보스는 멀쩡하다. 잔몹 구간만 길어진다.'},
  {id:'swarm', kind:'trial', ic:'🐜', n:'떼거리', hpMob:0.62, dup:2, sn:1.00,
   d:'일반 웨이브마다 2마리 · 각 체력 ×0.62',
   tip:'처치 수가 두 배라 간식이 더 쌓인다. 콤보를 쌓기에도 좋다.'},
  {id:'mist',  kind:'trial', ic:'☠️', n:'역병 안개', g:0.70, sn:2.50,
   d:'발자국 ×0.70 · 간식 ×2.50',
   tip:'시간 비용 없이 발자국을 간식으로 바꾸는 거래. 티어 보정이 손해를 덮는다.'},
  /* ── 축복 3 ── */
  {id:'rich',  kind:'bless', ic:'💰', n:'황금 발자국', g:1.80,
   d:'발자국 ×1.80',
   tip:'동료를 한 계단 먼저 들이는 구간.'},
  {id:'wind',  kind:'bless', ic:'🌬️', n:'순풍', dmg:1.35,
   d:'모든 피해 ×1.35',
   tip:'유일하게 사냥이 빨라지는 축복. 보스 제한시간도 같이 줄지만 실패율은 그대로다.'},
  {id:'feast', kind:'bless', ic:'🧺', n:'풍요의 계절', sn:2.50,
   d:'간식 ×2.50',
   tip:'교감도를 몰아서 올릴 다섯 존.'},
];

const SNACK_RULE_EXP = 1.3;   // 간식 = tf^1.3

function deriveAffix(src){
  const a = {
    id:src.id, kind:src.kind, ic:src.ic, n:src.n, d:src.d, tip:src.tip,
    dmg:     src.dmg     === undefined ? 1 : src.dmg,
    hpMob:   src.hpMob   === undefined ? 1 : src.hpMob,
    hpElite: src.hpElite === undefined ? 1 : src.hpElite,
    hpBoss:  src.hpBoss  === undefined ? 1 : src.hpBoss,
    dup:     src.dup     === undefined ? 1 : src.dup,
  };
  const U = UNITS.hp;
  /* 존 전투시간 배율: 체력 총량이 늘어난 만큼 + 피해가 줄어든 만큼 */
  a.tf = (U.mob * a.hpMob * a.dup + U.elite * a.hpElite + U.boss * a.hpBoss)
         / U.total / a.dmg;
  /* 보스 제한시간 배율 — 보스 체력비 ÷ 피해비. 이 정의가 '실패율 불변'을 만든다 */
  a.bt = a.hpBoss / a.dmg;

  /* ── 발자국 ── */
  const G = UNITS.gold, K = UNITS.kills;
  if(src.g !== undefined){
    a.gold = {mob:src.g, elite:src.g, boss:src.g};
  } else if(a.kind === 'trial'){
    if(a.dup === 1){
      a.gold = {mob:a.tf, elite:a.tf, boss:a.tf};          // 균일 = tf
    } else {
      /* 처치 수가 늘어난 채널(일반)만 조정해 존 총량을 정확히 tf로 맞춘다 */
      const m = (G.total * a.tf - G.elite - G.boss) / (G.mob * a.dup);
      a.gold = {mob:m, elite:1, boss:1};
    }
  } else {
    a.gold = {mob:1, elite:1, boss:1};
  }

  /* ── 간식 ── */
  if(src.sn !== undefined){
    a.snack = {mob:src.sn, elite:src.sn, boss:src.sn};
  } else if(a.kind === 'trial'){
    const target = Math.pow(a.tf, SNACK_RULE_EXP);
    if(a.dup === 1){
      a.snack = {mob:target, elite:target, boss:target};
    } else {
      const S = UNITS.snack;
      const m = (S.total * target - S.elite - S.boss) / (S.mob * a.dup);
      a.snack = {mob:m, elite:1, boss:1};
    }
  } else {
    a.snack = {mob:1, elite:1, boss:1};
  }

  /* 존 총량 배율 (검증·UI용) */
  const zone = (per, unit) =>
    (unit.mob * a.dup * per.mob + unit.elite * per.elite + unit.boss * per.boss) / unit.total;
  a.zoneGold  = zone(a.gold,  G);
  a.zoneSnack = zone(a.snack, UNITS.snack);
  a.snackFloor = Math.pow(a.tf, SNACK_RULE_EXP);
  return a;
}

const AFFIXES = AFFIX_SRC.map(deriveAffix);
const AFFIX_BY_ID = {};
AFFIXES.forEach(a => { AFFIX_BY_ID[a.id] = a; });
const TRIALS  = AFFIXES.filter(a => a.kind === 'trial');
const BLESSES = AFFIXES.filter(a => a.kind === 'bless');

/* ── 결정론적 선택: 5존마다(지역 교체와 동기) 재추첨 ─────────────────────
   순수 함수이므로 '아직 가 보지 않은 존'의 어픽스도 미리 계산된다.        */
const AFFIX_BLOCK = 5;
const DEFAULT_SEED = 1;

function hash32(a, b){
  let h = (Math.imul(a | 0, 73856093) ^ Math.imul(b | 0, 19349663)) >>> 0;
  h ^= h >>> 13;
  h = Math.imul(h, 1274126177) >>> 0;
  return (h ^ (h >>> 16)) >>> 0;
}

function affixesFor(zone, tier, seed){
  const T = tierOf(tier);
  if(!T.affix) return [];
  const blk = Math.floor((Math.max(1, Math.floor(zone)) - 1) / AFFIX_BLOCK);
  const sd  = (seed === undefined || seed === null || !isFinite(seed)) ? DEFAULT_SEED : (seed | 0);
  return [
    TRIALS [hash32(blk, sd) % TRIALS.length],
    BLESSES[hash32(blk, sd + 7) % BLESSES.length],
  ];
}

/** 어픽스 배열을 어떤 형태로 받아도(객체/아이디/미지정) 정규화한다 */
function normAffixes(ctx){
  if(ctx && ctx.affixes){
    const out = [];
    for(const x of ctx.affixes){
      const a = (typeof x === 'string') ? AFFIX_BY_ID[x] : x;
      if(a && a.id) out.push(a);
    }
    return out;
  }
  return affixesFor(ctx && ctx.zone !== undefined ? ctx.zone : 1,
                    ctx && ctx.tier, ctx && ctx.seed);
}
const affixMul = (list, field) => list.reduce((m, a) => m * (a[field] === undefined ? 1 : a[field]), 1);
const affixMulK = (list, field, kind) =>
  list.reduce((m, a) => m * ((a[field] && a[field][kind] !== undefined) ? a[field][kind] : 1), 1);

/* ══════════════════════════════════════════════════════════════════════════
   4. 유효 난이도 E — 존 하나를 비우는 데 걸리는 시간의 배율. 상한 2.000
   ══════════════════════════════════════════════════════════════════════════ */

function E(zone, tier, seed){
  return tierOf(tier).hp * affixMul(affixesFor(zone, tier, seed), 'tf');
}

/** 이 티어에서 나올 수 있는 최악의 E */
function worstE(tier){
  let worst = 1;
  const T = tierOf(tier);
  if(!T.affix) return T.hp;
  for(const tr of TRIALS) for(const bl of BLESSES)
    worst = Math.max(worst, tr.tf * bl.tf);
  return T.hp * worst;
}

/* ══════════════════════════════════════════════════════════════════════════
   5. 적 보정
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * @param {number|null} baseHP  웨이브 보정까지 끝난 순수 기본 체력
 *                              = zoneHP(z) × (1 + (w-1)×0.12).
 *                              null이면 zone/wave로 직접 계산한다.
 *                              (종류 배율 ×2.2/×5.5/×8.8은 이 함수가 붙인다)
 * @param {object} ctx {zone, wave, tier, seed, affixes, kind, isBoss, hunt, petHunt}
 */
function applyToEnemy(baseHP, ctx){
  ctx = ctx || {};
  const z = Math.max(1, Math.floor(ctx.zone === undefined ? 1 : ctx.zone));
  const w = Math.min(WAVES_PER_ZONE, Math.max(1, Math.floor(ctx.wave === undefined ? 1 : ctx.wave)));
  let kind = ctx.kind;
  if(!kind || !WAVE[kind]){
    kind = (ctx.isBoss === true && ctx.wave === undefined) ? 'boss' : waveKind(z, w);
  }
  const T  = tierOf(ctx.tier);
  const ax = normAffixes({zone:z, tier:ctx.tier, seed:ctx.seed, affixes:ctx.affixes});

  const base = (baseHP === undefined || baseHP === null || !isFinite(baseHP))
             ? zoneHP(z) * waveHpFactor(w) : baseHP;

  const hpField = kind === 'mob' ? 'hpMob' : kind === 'elite' ? 'hpElite' : 'hpBoss';
  const affixHP = affixMul(ax, hpField);
  const hpMult  = WAVE[kind].hp * T.hp * affixHP;

  const boss = (kind === 'boss' || kind === 'overlord');
  return {
    kind: kind,
    zone: z, wave: w, tier: T.t,
    hp: Math.min(HP_CAP, base * hpMult),
    hpMult: hpMult,
    count: (kind === 'mob') ? Math.round(affixMul(ax, 'dup')) : 1,
    playerDmgMult: affixMul(ax, 'dmg'),
    timeLimit: boss ? bossTimeFor({zone:z, wave:w, tier:ctx.tier, seed:ctx.seed,
                                   affixes:ax, hunt:ctx.hunt, petHunt:ctx.petHunt}) : 0,
    goldMult:  affixMulK(ax, 'gold',  kind === 'overlord' ? 'boss' : kind),
    snackMult: affixMulK(ax, 'snack', kind === 'overlord' ? 'boss' : kind),
    affixes: ax.map(a => a.id),
  };
}

function enemyMaxHP(zone, wave, opts){
  opts = opts || {};
  return applyToEnemy(null, {zone:zone, wave:wave, tier:opts.tier,
                             seed:opts.seed, affixes:opts.affixes}).hp;
}

/**
 * 보스 제한시간(초).
 * (30 + 4×보스사냥꾼 + 동료 hunt) × 티어 hp × 어픽스 bt × (대군주 ? 1.35 : 1)
 * 티어 hp가 체력과 시간에 '같이' 곱해지는 것이 난이도 절벽 제거의 핵심이다.
 */
function bossTimeFor(opts){
  opts = opts || {};
  const z = Math.max(1, Math.floor(opts.zone === undefined ? 1 : opts.zone));
  const w = opts.wave === undefined ? BOSS_WAVE : opts.wave;
  const T = tierOf(opts.tier);
  const ax = normAffixes({zone:z, tier:opts.tier, seed:opts.seed, affixes:opts.affixes});
  const base = BASE_BOSS_TIME + 4 * (opts.hunt || 0) + (opts.petHunt || 0);
  return base * T.hp * affixMul(ax, 'bt') * (isOverlord(z, w) ? OVERLORD_TIME : 1);
}

/* ══════════════════════════════════════════════════════════════════════════
   6. 보상
      발자국 = zoneHP × 0.09 × 종류배율 × 티어 rg × 어픽스 × goldMult()
      간식   = 기본치 × √B(z) × 티어 rn × 어픽스 × (1 + 동료 snack)
      B(z) = 절대 심도. 플레이어 강함과 무관하므로 저존 눌러앉기가 이득이 될 수 없다.
   ══════════════════════════════════════════════════════════════════════════ */

const GOLD_K   = 0.09;
const DEPTH_LEN = 15;
const depth  = z => 1 + Math.floor((Math.max(1, Math.floor(z)) - 1) / DEPTH_LEN);
const depthS = z => Math.sqrt(depth(z));

/**
 * 처치 1회분 보상.
 * @param ctx {
 *   zone, wave,                  필수
 *   tier, seed,                  난이도 / 어픽스 시드
 *   kind,                        생략 시 waveKind로 판정
 *   goldMult   = 1,              호스트 goldMult() (사냥 본능·황금 심장·황금 사냥)
 *   snackBonus = 0,              petPassive('snack')  가산
 *   eliteGold  = 0,              petPassive('eliteGold')  정예 전용 가산
 *   pioneer    = 0,              petPassive('pioneer')    최고 존 갱신 보스 가산
 *   newBest    = false           이 보스가 최고 존 갱신분인가 (zone > state.bestBeaten)
 * }
 * @returns {gold, snack, kind, zoneHP, depth, tierGold, tierSnack, affixes}
 */
function rewardFor(ctx){
  ctx = ctx || {};
  const z = Math.max(1, Math.floor(ctx.zone === undefined ? 1 : ctx.zone));
  const w = Math.min(WAVES_PER_ZONE, Math.max(1, Math.floor(ctx.wave === undefined ? 1 : ctx.wave)));
  const kind = (ctx.kind && WAVE[ctx.kind]) ? ctx.kind : waveKind(z, w);
  const T  = tierOf(ctx.tier);
  const ax = normAffixes({zone:z, tier:ctx.tier, seed:ctx.seed, affixes:ctx.affixes});
  const ch = (kind === 'overlord') ? 'boss' : kind;

  let gm = WAVE[kind].gold * T.rg * affixMulK(ax, 'gold', ch)
         * (ctx.goldMult === undefined ? 1 : ctx.goldMult);
  if(kind === 'elite')                      gm *= 1 + (ctx.eliteGold || 0);
  if((kind === 'boss' || kind === 'overlord') && ctx.newBest) gm *= 1 + (ctx.pioneer || 0);

  const snack = WAVE[kind].snack * depthS(z) * T.rn * affixMulK(ax, 'snack', ch)
              * (1 + (ctx.snackBonus || 0));

  return {
    kind: kind, zone: z, wave: w,
    gold:  Math.min(HP_CAP, zoneHP(z) * GOLD_K * gm),
    snack: snack,
    zoneHP: zoneHP(z), depth: depth(z),
    tierGold: T.rg, tierSnack: T.rn,
    affixes: ax.map(a => a.id),
  };
}

/** 지역 돌파(5존마다, z%5===1 진입 시) 1회성 간식 */
function regionReward(zone, opts){
  opts = opts || {};
  const T = tierOf(opts.tier);
  const ax = normAffixes({zone:zone, tier:opts.tier, seed:opts.seed, affixes:opts.affixes});
  return {
    snack: REGION_SNACK * depthS(zone) * T.rn * affixMulK(ax, 'snack', 'boss')
         * (1 + (opts.snackBonus || 0)),
  };
}

/** 환생 야생혼 배율 (soulGain에 곱한다) */
const soulMult = t => tierOf(t).rs;

/** 존 1개 총량 — 중립성 검증과 티어 비교 UI에 쓴다 (대군주 제외한 표준 존) */
function zoneReward(zone, opts){
  opts = opts || {};
  let gold = 0, snack = 0;
  for(let w = 1; w <= WAVES_PER_ZONE; w++){
    const kind = waveKind(1, w);                       // 표준 존
    const mod  = applyToEnemy(null, {zone:zone, wave:w, tier:opts.tier,
                                     seed:opts.seed, affixes:opts.affixes, kind:kind});
    const r = rewardFor({zone:zone, wave:w, kind:kind, tier:opts.tier, seed:opts.seed,
                         affixes:opts.affixes, goldMult:opts.goldMult,
                         snackBonus:opts.snackBonus, eliteGold:opts.eliteGold});
    gold  += r.gold  * mod.count;
    snack += r.snack * mod.count;
  }
  return {gold:gold, snack:snack, E:E(zone, opts.tier, opts.seed)};
}

/* ══════════════════════════════════════════════════════════════════════════
   7. 벽 지수 W — 표시 전용. 보상에는 절대 관여하지 않는다.
      W = 보스 체력 / (실사용 DPS) / 보스 제한시간
      W ≥ 1.00 이면 '제한시간 안에 물리적으로 못 잡는다'. 지표가 곧 벽의 정의다.

      ※ 티어·어픽스는 체력과 시간에 같은 계수로 곱해지므로 W에서 상쇄된다.
        즉 난이도를 올려도 벽의 '위치'는 그대로고 소요 시간만 늘어난다 —
        그것이 이 설계의 논지이며, soak 값이 그 변화를 대신 보여준다.
   ══════════════════════════════════════════════════════════════════════════ */

const GRADES = [
  {k:'calm',  max:0.08,     n:'무풍', c:'#5ec8f0'},
  {k:'fair',  max:0.20,     n:'순조', c:'#54c98a'},
  {k:'tense', max:0.40,     n:'긴장', c:'#e0c344'},
  {k:'tight', max:0.65,     n:'팽팽', c:'#e8a93a'},
  {k:'harsh', max:1.00,     n:'험난', c:'#f08a3c'},
  {k:'wall',  max:Infinity, n:'불가', c:'#a02c4a'},
];
const gradeOf = idx => {
  for(let i = 0; i < GRADES.length; i++) if(idx < GRADES[i].max) return GRADES[i];
  return GRADES[GRADES.length - 1];
};

/**
 * 체감 난이도.
 * @param zone
 * @param playerDps   동료 총 DPS (totalDps() — 자동터치 제외한 값)
 * @param opts {tier, seed, autoRatio, bossMult, hunt, petHunt, affixes}
 * @returns {index, grade, gradeIndex, name, color, fill, ttk, soak, E, clearDps}
 */
function ratingOf(zone, playerDps, opts){
  opts = opts || {};
  const z = Math.max(1, Math.floor(zone));
  const w = BOSS_WAVE;
  const ax = normAffixes({zone:z, tier:opts.tier, seed:opts.seed, affixes:opts.affixes});
  const mod = applyToEnemy(null, {zone:z, wave:w, tier:opts.tier, seed:opts.seed, affixes:ax});
  const t   = bossTimeFor({zone:z, wave:w, tier:opts.tier, seed:opts.seed, affixes:ax,
                           hunt:opts.hunt, petHunt:opts.petHunt});

  /* 실사용 DPS = 동료 DPS × (1 + 자동터치 비율) × 보스 피해 × 어픽스 피해 */
  const eff = Math.max(0, playerDps || 0)
            * (1 + (opts.autoRatio || 0))
            * (opts.bossMult === undefined ? 1 : opts.bossMult)
            * mod.playerDmgMult;

  const index = eff > 0 ? (mod.hp / eff / Math.max(t, 1e-9)) : Infinity;
  const g = gradeOf(index);

  /* 존 전체 소요 시간(초) — 티어·어픽스에 따라 실제로 변하는 값 */
  let soak = 0;
  if(eff > 0){
    const effZone = Math.max(0, playerDps || 0) * (1 + (opts.autoRatio || 0)) * mod.playerDmgMult;
    for(let ww = 1; ww <= WAVES_PER_ZONE; ww++){
      const m = applyToEnemy(null, {zone:z, wave:ww, tier:opts.tier, seed:opts.seed, affixes:ax});
      const d = (m.kind === 'boss' || m.kind === 'overlord')
              ? effZone * (opts.bossMult === undefined ? 1 : opts.bossMult) : effZone;
      soak += (m.hp * m.count) / Math.max(d, 1e-9);
    }
  } else soak = Infinity;

  return {
    zone: z,
    index: index,
    grade: g, gradeIndex: GRADES.indexOf(g), name: g.n, color: g.c,
    fill: Math.max(0, Math.min(1, index)),          // 게이지 0~1 (1.0 지점이 눈금)
    ttk: eff > 0 ? mod.hp / eff : Infinity,         // 보스 처치 소요(초)
    soak: soak,                                     // 존 전체 소요(초)
    clearDps: mod.hp / Math.max(t, 1e-9) / Math.max(mod.playerDmgMult, 1e-9),
    E: E(z, opts.tier, opts.seed),
    affixes: ax.map(a => a.id),
    overlord: isOverlord(z, w),
  };
}

/** 앞뒤 존 색 띠(#ui-map)용. 기본 −8 ~ +11 존 */
function forecast(zone, playerDps, opts){
  opts = opts || {};
  const back = opts.back === undefined ? 8 : opts.back;
  const fwd  = opts.fwd  === undefined ? 11 : opts.fwd;
  const from = Math.max(1, Math.floor(zone) - back);
  const to   = Math.floor(zone) + fwd;
  const log  = opts.wallLog || {};
  const out  = [];
  for(let z = from; z <= to; z++){
    const r = ratingOf(z, playerDps, opts);
    out.push({
      zone: z, color: r.color, name: r.name, gradeIndex: r.gradeIndex,
      index: r.index, cur: z === Math.floor(zone),
      region: z % AFFIX_BLOCK === 1, overlord: isOverlord(z, BOSS_WAVE),
      fails: log[z] || 0,
      affixes: r.affixes,
    });
  }
  return out;
}

/* ══════════════════════════════════════════════════════════════════════════
   8. 상태 · 해금 · 마이그레이션
   ══════════════════════════════════════════════════════════════════════════ */

const FIELDS = ['tier', 'affixSeed', 'snack', 'bestBeaten', 'tierBest', 'wallLog'];
const WALLLOG_KEEP = 40;

const newState = () => ({
  tier: 0, affixSeed: DEFAULT_SEED, snack: 0, bestBeaten: 1,
  tierBest: {}, wallLog: {},
});

/** 해금 판정. state = {best, ascs} */
function unlocked(state){
  const best = (state && state.best) || 1;
  const ascs = (state && state.ascs) || 0;
  const list = TIERS.map(T => {
    const zOK = best >= T.zone, aOK = ascs >= T.asc;
    let reason = '';
    if(!zOK && !aOK)      reason = '환생 ' + T.asc + '회 + 최고 존 ' + T.zone + ' 필요';
    else if(!zOK)         reason = '최고 존 ' + T.zone + ' 필요 (현재 ' + best + ')';
    else if(!aOK)         reason = '환생 ' + T.asc + '회 필요 (현재 ' + ascs + ')';
    return {tier:T.t, ok:zOK && aOK, reason:reason, zone:T.zone, asc:T.asc};
  });
  let max = 0;
  for(const r of list) if(r.ok) max = Math.max(max, r.tier);
  return {max:max, list:list, next:list.find(r => !r.ok) || null};
}

const tierUnlocked = (t, state) => unlocked(state).list[tierOf(t).t].ok;

/** 난이도 변경. 해금되지 않았으면 false를 반환하고 아무것도 바꾸지 않는다 */
function setTier(state, t){
  if(!state) return false;
  const T = TIERS[t | 0];
  if(!T) return false;
  if(!tierUnlocked(T.t, state)) return false;
  state.tier = T.t;
  return true;
}

function trimWallLog(state){
  const keys = Object.keys(state.wallLog);
  if(keys.length <= WALLLOG_KEEP) return;
  keys.sort((a, b) => (+b) - (+a));
  const next = {};
  for(let i = 0; i < WALLLOG_KEEP; i++) next[keys[i]] = state.wallLog[keys[i]];
  state.wallLog = next;
}

/**
 * 기존 세이브에 난이도 필드를 얹는다. 자기 소유 키만 건드린다(멱등).
 * v1 세이브는 tier=0(E=1.000)으로 진입 → 기존 플레이어는 체감 변화가 없다.
 */
function migrate(save){
  const S = save || {};
  const num = (v, d) => (typeof v === 'number' && isFinite(v)) ? v : d;
  const obj = v => (v && typeof v === 'object' && !Array.isArray(v)) ? v : {};

  S.tier = num(S.tier, 0) | 0;
  if(!TIERS[S.tier]) S.tier = 0;
  S.affixSeed  = num(S.affixSeed, DEFAULT_SEED) | 0;
  S.snack      = Math.max(0, num(S.snack, 0));
  S.bestBeaten = Math.max(1, num(S.bestBeaten, 1) | 0);
  S.tierBest   = obj(S.tierBest);
  S.wallLog    = obj(S.wallLog);

  /* 해금되지 않은 티어로 저장된 세이브는 가능한 최고 티어로 내린다 */
  const mx = unlocked(S).max;
  if(S.tier > mx) S.tier = mx;

  trimWallLog(S);
  if(!(num(S.v, 1) >= 2)) S.v = 2;
  return S;
}

/** 보스를 실제로 잡았을 때. bestBeaten·tierBest 갱신 (보상 지급 뒤에 호출) */
function recordBest(state, zone, kind){
  if(!state) return;
  const z = Math.floor(zone);
  if(kind === 'boss' || kind === 'overlord' || kind === undefined)
    state.bestBeaten = Math.max(state.bestBeaten || 1, z);
  const t = String(state.tier | 0);
  state.tierBest = state.tierBest || {};
  state.tierBest[t] = Math.max(state.tierBest[t] || 1, z);
}

/** 보스 제한시간 초과. 지도 띠의 💀 표시용 */
function recordBossFail(state, zone){
  if(!state) return;
  state.wallLog = state.wallLog || {};
  const k = String(Math.floor(zone));
  state.wallLog[k] = (state.wallLog[k] || 0) + 1;
  trimWallLog(state);
}

/* ══════════════════════════════════════════════════════════════════════════
   9. UI 헬퍼 (문자열만 만든다 — DOM은 건드리지 않는다)
   ══════════════════════════════════════════════════════════════════════════ */

const x = v => '×' + (v >= 10 ? v.toFixed(1) : v.toFixed(2));

function describeTier(t){
  const T = tierOf(t);
  return {
    tier:T.t, key:T.k, icon:T.ic, name:T.n, color:T.c, desc:T.d,
    label: T.ic + ' ' + T.n,
    hp:    '적 체력 ' + x(T.hp),
    gold:  '발자국 ' + x(T.rg),
    snack: '간식 ' + x(T.rn),
    soul:  '환생 야생혼 ' + x(T.rs),
    line:  '발자국 ' + x(T.rg) + ' · 간식 ' + x(T.rn) + ' · 야생혼 ' + x(T.rs),
    perSec:'초당 발자국 ' + x(T.rg / T.hp) + ' · 초당 간식 ' + x(T.rn / T.hp),
    bossTime: Math.round(BASE_BOSS_TIME * T.hp) + '초',
    slots: T.slots,
    need:  T.zone === 0 && T.asc === 0 ? '기본 해금'
         : T.asc === 0 ? '최고 존 ' + T.zone
         : '환생 ' + T.asc + '회 + 최고 존 ' + T.zone,
  };
}

function describeAffix(a){
  const A = (typeof a === 'string') ? AFFIX_BY_ID[a] : a;
  if(!A) return null;
  return {
    id:A.id, kind:A.kind, icon:A.ic, name:A.n, desc:A.d, tip:A.tip,
    label: A.ic + ' ' + A.n,
    badge: A.kind === 'trial' ? '시련' : '축복',
    reward: A.kind === 'trial'
      ? '발자국 ' + x(A.zoneGold) + ' · 간식 ' + x(A.zoneSnack)
      : A.d,
    time: A.tf > 1 ? '사냥 시간 ' + x(A.tf)
        : A.tf < 1 ? '사냥 시간 ' + x(A.tf) + ' (단축)'
        : '사냥 시간 변화 없음',
  };
}

/* ══════════════════════════════════════════════════════════════════════════
   10. 자체 검증 — 설계 불변식이 코드와 어긋나면 즉시 잡는다
   ══════════════════════════════════════════════════════════════════════════ */

function selfTest(){
  const fails = [];
  const near = (a, b, eps, msg) => { if(!(Math.abs(a - b) <= eps)) fails.push(msg + ' (' + a + ' vs ' + b + ')'); };
  const ok   = (c, msg) => { if(!c) fails.push(msg); };

  /* 1. 존 단위 합 */
  near(UNITS.hp.total, 28.456, 1e-9, '존 체력 단위 합');
  near(UNITS.gold.total, 22, 1e-9, '존 발자국 단위 합');

  /* 2. E 상한 */
  let emax = 0;
  for(const T of TIERS) emax = Math.max(emax, worstE(T.t));
  ok(emax <= 2.0, 'E 상한 초과: ' + emax);
  near(emax, 1.7882352941, 1e-6, 'E 최댓값');

  /* 3. 시련 보상 규칙 */
  for(const a of TRIALS){
    if(a.id === 'mist') continue;                       // 명시적 예외(자원 교환)
    near(a.zoneGold, a.tf, 1e-9, a.n + ' 초당 발자국 중립');
    ok(a.zoneSnack >= a.snackFloor - 1e-9, a.n + ' 간식 하한');
  }

  /* 4. T1+ 어떤 조합도 T0보다 나쁘지 않다 */
  for(let t = 1; t < TIERS.length; t++){
    for(const tr of TRIALS) for(const bl of BLESSES){
      const tf = tr.tf * bl.tf;
      const g  = TIERS[t].rg * tr.zoneGold  * bl.zoneGold  / tf;
      const s  = TIERS[t].rn * tr.zoneSnack * bl.zoneSnack / tf;
      ok(g >= 1, 'T' + t + ' ' + tr.n + '+' + bl.n + ' 초당 발자국 < T0');
      ok(s >= 1, 'T' + t + ' ' + tr.n + '+' + bl.n + ' 초당 간식 < T0');
    }
  }

  /* 5. 보스 실패 문턱 DPS 불변 */
  const ref = ratingOf(60, 1e6, {tier:0}).clearDps;
  for(let t = 0; t < TIERS.length; t++)
    for(let s = 1; s <= 6; s++){
      const c = ratingOf(60, 1e6, {tier:t, seed:s}).clearDps;
      near(c / ref, 1, 1e-9, 'T' + t + ' seed' + s + ' 보스 문턱 DPS 불변');
    }

  /* 6. 웨이브 구성 */
  let m = 0, e = 0, b = 0;
  for(let w = 1; w <= 10; w++){ const k = waveKind(7, w); if(k === 'mob') m++; else if(k === 'elite') e++; else b++; }
  ok(m === 7 && e === 2 && b === 1, '웨이브 구성 7/2/1');

  return {ok: fails.length === 0, fails: fails, E_max: emax};
}

/* ══════════════════════════════════════════════════════════════════════════ */

WL.Difficulty = {
  VERSION: '2.0.0',

  /* 데이터 */
  TIERS: TIERS, AFFIXES: AFFIXES, TRIALS: TRIALS, BLESSES: BLESSES,
  AFFIX_BY_ID: AFFIX_BY_ID, GRADES: GRADES, WAVE: WAVE, UNITS: UNITS,
  WAVES_PER_ZONE: WAVES_PER_ZONE, BOSS_WAVE: BOSS_WAVE, ELITE_WAVES: ELITE_WAVES,
  OVERLORD_EVERY: OVERLORD_EVERY, OVERLORD_TIME: OVERLORD_TIME,
  BASE_BOSS_TIME: BASE_BOSS_TIME, AFFIX_BLOCK: AFFIX_BLOCK,
  DEFAULT_SEED: DEFAULT_SEED, GOLD_K: GOLD_K, REGION_SNACK: REGION_SNACK,
  FIELDS: FIELDS, TIER_MAX: TIER_MAX,

  /* 곡선 */
  zoneHP: zoneHP, waveHpFactor: waveHpFactor,
  depth: depth, depthS: depthS,

  /* 웨이브 구조 */
  waveKind: waveKind, isElite: isElite, isBossWave: isBossWave, isOverlord: isOverlord,
  pick: pick, NORD: NORD,

  /* 난이도 */
  tierOf: tierOf, affixesFor: affixesFor, affixMul: affixMul,
  E: E, worstE: worstE,
  applyToEnemy: applyToEnemy, enemyMaxHP: enemyMaxHP, bossTimeFor: bossTimeFor,

  /* 보상 */
  rewardFor: rewardFor, regionReward: regionReward, zoneReward: zoneReward,
  soulMult: soulMult,

  /* 체감 난이도 */
  ratingOf: ratingOf, forecast: forecast, gradeOf: gradeOf,

  /* 상태 */
  newState: newState, migrate: migrate, unlocked: unlocked,
  tierUnlocked: tierUnlocked, setTier: setTier,
  recordBest: recordBest, recordBossFail: recordBossFail,

  /* UI 헬퍼 */
  describeTier: describeTier, describeAffix: describeAffix,

  /* 검증 */
  selfTest: selfTest, hash32: hash32,
};

if(typeof module !== 'undefined' && module.exports) module.exports = WL.Difficulty;

})(typeof globalThis !== 'undefined' ? globalThis : this);
