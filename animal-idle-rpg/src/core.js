/*!
 * 모닥불 무리 — 코어
 * 상태 · 전투 · 무대 배치 · UI · 저장. 다른 모듈은 전부 선택적(없으면 조용히 폴백).
 *   필수: WL.Content(로스터) · WL.Difficulty(난이도/보상)
 *   선택: WL.Creatures(크리처) · WL.Scene(야경) · WL.FX(이펙트) · WL.Skills(스킬) · WL.Nurture(육성)
 */
(function () {
'use strict';
var W = (window.WL = window.WL || {});
var C = W.Content, D = W.Difficulty, Cr = W.Creatures, Sc = W.Scene, FX = W.FX, Sk = W.Skills, Nu = W.Nurture;
var $ = function (s) { return document.querySelector(s); };

/* ══ 표기 ══════════════════════════════════════════════════════════════ */
var SUF = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'], AA = 'abcdefghijklmnopqrstuvwxyz';
function fmt(n) {
  if (n === Infinity) return '∞';
  if (!isFinite(n) || isNaN(n)) return '0';
  if (n < 0) return '-' + fmt(-n);
  if (n < 1000) return n < 10 ? String(Math.round(n * 10) / 10) : String(Math.floor(n));
  var t = Math.floor(Math.log10(n) / 3), v = n / Math.pow(1000, t), s;
  if (t < SUF.length) s = SUF[t];
  else { var i = t - SUF.length; s = AA[Math.floor(i / 26) % 26] + AA[i % 26]; }
  return (v < 10 ? v.toFixed(2) : v < 100 ? v.toFixed(1) : String(Math.floor(v))) + s;
}
W.fmt = fmt;
function time(s) {
  s = Math.max(0, Math.floor(s));
  var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
  return h ? h + '시간 ' + m + '분' : m ? m + '분 ' + x + '초' : x + '초';
}
var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
var isPhone = function () { return innerWidth < 720; };
var LOWEND = (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
             (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
/* DOM 쓰기는 값이 바뀐 프레임에만 — 모바일에서 이게 프레임을 지킨다 */
var _txt = new WeakMap();
function setText(node, v) { if (node && _txt.get(node) !== v) { _txt.set(node, v); node.textContent = v; } }
function setHtml(node, v) { if (node && _txt.get(node) !== v) { _txt.set(node, v); node.innerHTML = v; } }
function setStyle(node, prop, v) {
  if (!node) return;
  var k = '_s' + prop;
  if (node[k] !== v) { node[k] = v; node.style[prop] = v; }
}
function plainPassive(i) {
  var line = (C && C.passiveLine) ? C.passiveLine(i) : '';
  return line.replace(/^[^\uAC00-\uD7A3A-Za-z0-9]+/, '').trim();
}
function haptic(ms) { try { if (navigator.vibrate && isPhone()) navigator.vibrate(ms); } catch (e) {} }
var el = function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

/* ══ 상태 ══════════════════════════════════════════════════════════════ */
var KEY = 'moda-bul-muri-v2', OLD_KEY = 'wild-legend-save-v1';
var PET_N = C ? C.PET_COUNT : 24;
var UPS = [
  { k: 'claw',  n: '조련사 훈련', d: '터치 피해 +35%',          c: 60,   g: 2.15 },
  { k: 'gold',  n: '사냥 본능',   d: '발자국 획득 +12%',        c: 250,  g: 2.30 },
  { k: 'bless', n: '야생의 축복', d: '모든 동료 피해 +8%',      c: 700,  g: 2.45 },
  { k: 'fang',  n: '맹수의 이빨', d: '보스 피해 +18%',          c: 1500, g: 2.60 },
  { k: 'luck',  n: '행운의 발톱', d: '치명타 확률 +2% (최대 60%)', c: 1200, g: 2.85 },
];
var SOULS = [
  { k: 'rage',  n: '야수의 분노', d: '모든 피해 +30%',            c: 3,  g: 1.35 },
  { k: 'heart', n: '황금 심장',   d: '발자국 획득 +25%',          c: 4,  g: 1.35 },
  { k: 'time',  n: '시간의 주인', d: '오프라인 보상 최대 +2시간', c: 6,  g: 1.60 },
  { k: 'hunt',  n: '보스 사냥꾼', d: '보스 제한시간 +4초',        c: 5,  g: 1.55 },
  { k: 'echo',  n: '영혼 공명',   d: '야생혼 획득 +15%',          c: 12, g: 1.85 },
  { k: 'path',  n: '개척자',      d: '환생 후 시작 존 +4',        c: 20, g: 2.10 },
];
var MILESTONES = [10, 25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800];
var msMult = function (lv) { var n = 0; for (var i = 0; i < MILESTONES.length; i++) if (lv >= MILESTONES[i]) n++; return Math.pow(2, n); };
var msNext = function (lv) { for (var i = 0; i < MILESTONES.length; i++) if (lv < MILESTONES[i]) return MILESTONES[i]; return null; };

function blank() {
  var s = {
    v: 2, zone: 1, wave: 1, gold: 15, souls: 0, best: 1, runBest: 1,
    pets: new Array(PET_N).fill(0),
    ups: {}, sls: {},
    auto: true, quality: (innerWidth < 720 || LOWEND) ? 1 : 2, qty: 1, tab: 'pets', open: -1,
    kills: 0, bossKills: 0, ascs: 0, played: 0, started: Date.now(), last: Date.now(),
    hp: 0, bt: 0, seen: {}, skills: null, nurture: null,
  };
  UPS.forEach(function (u) { s.ups[u.k] = 0; });
  SOULS.forEach(function (u) { s.sls[u.k] = 0; });
  if (D) { var d = D.newState(); for (var k in d) s[k] = d[k]; }
  return s;
}
var S = blank();

/* ══ 수식 ══════════════════════════════════════════════════════════════ */
var _pp = null, _ppKey = '';
function passives() {
  var key = S.pets.join(',') + '|' + S.ups.luck + S.ups.bless + S.ups.claw + S.ups.gold + S.ups.fang + S.sls.echo +
            '|' + ((Sk && Sk.mult) ? Math.round((Sk.mult().cdrMult || 1) * 100) : 0);
  if (key !== _ppKey) {
    _ppKey = key;
    _pp = C ? C.petPassives(S.pets, {
      upsLuck: S.ups.luck, upsBless: S.ups.bless, upsClaw: S.ups.claw,
      upsGold: S.ups.gold, upsFang: S.ups.fang, slsEcho: S.sls.echo,
      skillCdr: (function () { var m = Sk && Sk.mult ? Sk.mult() : null; return m && m.cdrMult ? Math.max(0, 1 - m.cdrMult) : 0; })(),
    }) : { blessAdd: 0, clawAdd: 0, goldAdd: 0, fangAdd: 0, echoAdd: 0, huntAdd: 0, snackAdd: 0,
           offlineAdd: 0, eliteGoldAdd: 0, pioneerAdd: 0, lowHpAdd: 0, gripAdd: 0, eliteAdd: 0,
           critChance: 0.02 * S.ups.luck, critMult: 5, cdrMul: 1, owned: 0 };
  }
  return _pp;
}
function ownedList() { var a = []; for (var i = 0; i < PET_N; i++) if (S.pets[i] > 0) a.push(i); return a; }
function petCost(i, lv) { return C ? C.petCost(i, lv) : 10 * Math.pow(8.8, i) * Math.pow(1.07, lv); }
function petBase(i) { return C ? C.petBaseDps(i) : 0.8 * Math.pow(9.2, i); }
function petDps(i) { var lv = S.pets[i]; return lv ? petBase(i) * lv * msMult(lv) : 0; }

function skillMult() {
  var m = Sk && Sk.mult ? Sk.mult() : null;
  return {
    dps: m && m.dpsMult ? m.dpsMult : 1,
    gold: m && m.goldMult ? m.goldMult : 1,
    click: m && m.clickMult ? m.clickMult : 1,
    bossTime: m && m.bossTimeBonus ? m.bossTimeBonus : 0,
  };
}
function nurtureBonus() {
  if (!Nu) return { dpsMult: 1, goldMult: 1, avg: 0 };
  return Nu.bonus(ownedList());
}
function globalMult() {
  var p = passives();
  return (1 + 0.08 * S.ups.bless + p.blessAdd) * (1 + 0.30 * S.sls.rage) *
         Math.pow(1.09, S.souls) * nurtureBonus().dpsMult * skillMult().dps;
}
function baseDps() { var t = 0; for (var i = 0; i < PET_N; i++) t += petDps(i); return t; }
function totalDps() { var v = baseDps() * globalMult(); return isFinite(v) ? v : 1e300; }
function clickDamage() {
  var p = passives();
  var v = (totalDps() * 0.18 + 8) * (1 + 0.35 * S.ups.claw + p.clawAdd) * skillMult().click;
  return isFinite(v) ? v : 1e300;
}
function goldMultiplier() {
  var p = passives();
  return (1 + 0.12 * S.ups.gold + p.goldAdd) * (1 + 0.25 * S.sls.heart) *
         nurtureBonus().goldMult * skillMult().gold;
}
function bossMultiplier() { var p = passives(); return 1 + 0.18 * S.ups.fang + p.fangAdd; }
function maxOffline() { var p = passives(); return (2 + 2 * S.sls.time) * 3600 * (1 + p.offlineAdd); }
function soulGain() {
  var b = S.runBest;
  if (b < 26) return 0;
  var p = passives();
  var base = Math.pow((b - 20) / 5, 1.55) * (1 + 0.15 * S.sls.echo + p.echoAdd);
  return Math.floor(base * (D ? D.soulMult(S.tier) : 1));
}
var geoCost = function (base, g, lv, n) { return base * Math.pow(g, lv) * (Math.pow(g, n) - 1) / (g - 1); };
function maxBuy(base, g, lv, gold) {
  var n = Math.floor(Math.log(gold * (g - 1) / (base * Math.pow(g, lv)) + 1) / Math.log(g));
  return Math.max(0, isFinite(n) ? n : 0);
}
function qtyFor(base, g, lv) {
  if (S.qty === 'M') return Math.max(1, maxBuy(base, g, lv, S.gold));
  if (S.qty === 'N') { var nx = msNext(lv); return nx ? Math.max(1, nx - lv) : 10; }
  return S.qty;
}

/* ══ 적 / 전투 ═════════════════════════════════════════════════════════ */
var cur = null;   // 현재 적 {info, mod, max}
function seedOf() { return (S.affixSeed || 1); }
function affixes() { return D ? D.affixesFor(S.zone, S.tier, seedOf()) : []; }
function makeEnemy(z, w) {
  var info = C ? C.enemyFor(z, w, S.tier) : { name: '적', kind: 'mob', boss: w === 10, archetype: 'beast', biome: { i: 0, n: '' }, art: {} };
  var p = passives();
  var mod = D ? D.applyToEnemy(null, {
    zone: z, wave: w, tier: S.tier, seed: seedOf(),
    hunt: S.sls.hunt, petHunt: p.huntAdd,
  }) : { kind: info.kind, hp: 10, count: 1, playerDmgMult: 1, timeLimit: info.boss ? 30 : 0, affixes: [] };
  mod.timeLimit += skillMult().bossTime;
  return { info: info, mod: mod, max: mod.hp * (mod.count || 1) };
}
function spawn(keepHp) {
  cur = makeEnemy(S.zone, S.wave);
  if (!keepHp || !(S.hp > 0) || S.hp > cur.max) S.hp = cur.max;
  S.bt = cur.mod.timeLimit || 0;
  Stage.enemy(cur);
  paintStage();
}
function hurt(amount, opt) {
  if (!cur || S.hp <= 0) return;
  opt = opt || {};
  var p = passives();
  var mult = (cur.mod.playerDmgMult || 1) * (cur.info.boss ? bossMultiplier() : 1);
  if (cur.info.elite) mult *= 1 + (p.eliteAdd || 0);
  if (S.hp / cur.max < 0.3) mult *= 1 + (p.lowHpAdd || 0);
  var amt = amount * mult;
  var nx = S.hp - amt;
  S.hp = isFinite(nx) ? nx : 0;
  Stage.hit(amt, opt);
  if (S.hp <= 0) kill();
}
function kill() {
  var p = passives(), info = cur.info, kind = cur.mod.kind || info.kind;
  var newBest = S.zone > (S.bestBeaten || 0);
  var rw = D ? D.rewardFor({
    zone: S.zone, wave: S.wave, kind: kind, tier: S.tier, seed: seedOf(),
    goldMult: goldMultiplier(), eliteGold: p.eliteGoldAdd, pioneer: p.pioneerAdd,
    newBest: newBest, snackBonus: p.snackAdd,
  }) : { gold: 10, snack: 0 };
  S.gold += rw.gold;
  S.snack = (S.snack || 0) + (rw.snack || 0);
  S.kills++;
  if (!S.seen) S.seen = {};
  S.seen[info.baseName || info.name] = 1;
  Stage.die(rw);

  var boss = info.boss;
  if (boss) {
    S.bossKills++;
    if (D) D.recordBest(S, S.zone, kind);
    ribbon(info.name + ' 격파 · 발자국 +' + fmt(rw.gold), 'gold');
    Stage.cheer();
    haptic([16, 50, 26]);
    if (FX && FX.bossWarn) FX.bossWarn(0);
    chatterSome('win');
  }
  if (S.auto || !boss) {
    if (boss) {
      S.zone++; S.wave = 1;
      S.best = Math.max(S.best, S.zone); S.runBest = Math.max(S.runBest, S.zone);
      if (D && S.zone % 5 === 1) {
        var reg = D.regionReward(S.zone, { tier: S.tier, seed: seedOf(), snackBonus: p.snackAdd });
        S.snack += reg.snack || 0;
        ribbon((C ? C.biomeFor(S.zone).n : '') + '에 들어섰다 · 간식 +' + fmt(reg.snack || 0), 'zone');
        if (Sc && Sc.setBiome) Sc.setBiome(C ? C.biomeFor(S.zone).i : 0);
      }
    } else if (S.auto) S.wave++;
  }
  spawn();
}
function bossFail() {
  if (D) D.recordBossFail(S, S.zone);
  haptic([30, 60, 30]);
  ribbon((cur ? cur.info.name : '보스') + ' 토벌 실패 — 존 ' + S.zone + ' 1웨이브로', 'bad');
  S.wave = 1; spawn();
}
function tapScaled(n, power) {
  n = Math.max(1, n | 0);
  power = (typeof power === 'number' && isFinite(power)) ? clamp(power, 0, 1) : 1;
  var p = passives(), crit = false, dmg = 0;
  var reps = Math.min(n, 24);
  for (var i = 0; i < reps; i++) {
    var c = Math.random() < p.critChance;
    dmg += clickDamage() * power * (c ? p.critMult : 1);
    crit = crit || c;
  }
  if (n > reps) dmg *= n / reps;
  hurt(dmg, { tap: true, crit: crit, auto: true, n: n });
}
function tap(n, opts) {
  n = n || 1;
  var p = passives(), dmg = 0, crit = false;
  for (var i = 0; i < Math.min(n, 40); i++) {
    var c = Math.random() < p.critChance;
    dmg += clickDamage() * (c ? p.critMult : 1);
    crit = crit || c;
  }
  if (n > 40) dmg *= n / 40;
  hurt(dmg, { tap: true, crit: crit, auto: opts && opts.auto, x: opts && opts.x, y: opts && opts.y, n: n });
}

/* ══ 저장 / 오프라인 ═══════════════════════════════════════════════════ */
function save() {
  S.last = Date.now();
  if (Sk && Sk.serialize) S.skills = Sk.serialize();
  if (Nu) S.nurture = Nu.serialize();
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
}
function load() {
  var raw = null;
  try { raw = localStorage.getItem(KEY) || localStorage.getItem(OLD_KEY); } catch (e) {}
  if (!raw) return false;
  var d;
  try { d = JSON.parse(raw); } catch (e) { return false; }
  var s = blank();
  for (var k in d) if (d[k] !== undefined && d[k] !== null) s[k] = d[k];
  s.pets = new Array(PET_N).fill(0);
  if (Array.isArray(d.pets)) for (var i = 0; i < PET_N && i < d.pets.length; i++) s.pets[i] = d.pets[i] || 0;
  UPS.forEach(function (u) { s.ups[u.k] = (d.ups && d.ups[u.k]) || 0; });
  SOULS.forEach(function (u) { s.sls[u.k] = (d.sls && d.sls[u.k]) || 0; });
  s.v = 2;
  S = s;
  if (D) D.migrate(S);
  if (typeof S.snack !== 'number' || !isFinite(S.snack)) S.snack = 0;
  return true;
}
function offline() {
  var dt = Math.min(maxOffline(), (Date.now() - (S.last || Date.now())) / 1000);
  if (dt < 90) return null;
  var dps = totalDps();
  if (dps <= 0) return null;
  var probe = makeEnemy(S.zone, 1);
  var per = Math.max(0.35, probe.max / dps);
  var kills = Math.floor(dt / per * 0.6);
  if (kills < 1) return null;
  var p = passives();
  var rw = D ? D.rewardFor({ zone: S.zone, wave: 1, kind: 'mob', tier: S.tier, seed: seedOf(),
                             goldMult: goldMultiplier(), snackBonus: p.snackAdd })
             : { gold: 1, snack: 0 };
  var gold = kills * rw.gold, snack = kills * (rw.snack || 0);
  S.gold += gold; S.snack += snack; S.kills += kills; S.played += dt;
  if (Nu) Nu.tick(Math.min(dt, 7200), { owned: ownedList() });
  return { dt: dt, kills: kills, gold: gold, snack: snack };
}

/* ══ 무대 : 크리처 배치 ════════════════════════════════════════════════ */
var AIR = { hawk: 1, dragon: 1, condor: 1, quetzal: 1, samjogo: 1, peng: 1 };
var SWIM = { shark: 1, squid: 1, spermwhale: 1, bluewhale: 1, megalodon: 1 };
var HEAVY = { bear: 1, tiger: 1, rhino: 1, elephant: 1, mammoth: 1, crocodile: 1, titanoboa: 1, paracer: 1, kirin: 1 };

var _lastIntro = 0;
var Stage = (function () {
  var field, scene = null, pets = {}, foe = null, atk = {}, W0 = 0, H0 = 0, lastSlots = {};

  var _measured = 0;
  function measure(force) {
    var now = performance.now();
    if (!force && now - _measured < 400 && W0) return;   /* 매 프레임 리플로우 금지 */
    _measured = now;
    var r = (scene ? scene.host : field).getBoundingClientRect();
    W0 = r.width; H0 = r.height;
  }
  function ground() { return scene ? scene.groundY() : H0 * 0.70; }
  function rowOf(species) { return AIR[species] ? 'air' : SWIM[species] ? 'front' : HEAVY[species] ? 'front' : 'back'; }

  function makeCreature(opts, fallbackIcon) {
    if (Cr && Cr.make) { try { return Cr.make(opts); } catch (e) {} }
    var d = el('div', null, fallbackIcon || '🐾');
    d.style.fontSize = (opts.size || 60) + 'px';
    return { el: d, play: function () {}, setStage: function () {}, dispose: function () { d.remove(); } };
  }

  /* 보유 동료를 줄별로 묶는다. 매 프레임 도는 함수라 결과를 캐시한다 */
  var _rows = { front: [], back: [], air: [] }, _rowsKey = '';
  function rows() {
    var list = visibleList(), key = list.join(',');
    if (key !== _rowsKey) {
      _rowsKey = key;
      _rows.front.length = 0; _rows.back.length = 0; _rows.air.length = 0;
      for (var k = 0; k < list.length; k++) _rows[rowOf(C.PETS[list[k]].species)].push(list[k]);
    }
    return _rows;
  }
  /* 화면에 세우는 동료 수 상한 — 강한 쪽부터. 모바일에서 프레임을 지키는 첫 번째 방어선 */
  function actorCap() { return isPhone() ? 5 : LOWEND ? 10 : 14; }
  function visibleList() {
    var all = ownedList(), cap = actorCap();
    return all.length <= cap ? all : all.slice(all.length - cap);
  }
  /* 무리가 늘수록 카메라가 뒤로 물러난다 — 5마리까지는 그대로, 이후 서서히 */
  function camZoom() {
    var n = ownedList().length;
    /* 좁은 화면에서는 너무 멀리 물러나면 아무것도 안 보인다 */
    var floor = isPhone() ? 0.52 : 0.46;
    return clamp(1 - Math.max(0, n - 5) * 0.052, floor, 1);
  }
  function slotSize(slot, i, cam) {
    var base = slot && slot.size ? slot.size : H0 * 0.19;
    /* 폰에서는 무대가 좁다 — 몸집을 한 단계 줄여야 무리가 무대를 잡아먹지 않는다 */
    var v = base * (0.88 + 0.028 * i) * cam * (isPhone() ? 0.74 : 1);
    return clamp(v, 14, H0 * (isPhone() ? 0.34 : 0.50));
  }

  function sync() {
    if (!field) return;
    measure();
    var list = visibleList();
    for (var id in pets) if (list.indexOf(+id) < 0) { pets[id].h.dispose(); pets[id].wrap.remove(); delete pets[id]; }
    list.forEach(function (i) {
      var lv = S.pets[i], st = Nu ? Nu.stageOf(lv) : 2, row = C.PETS[i], rec = pets[i];
      if (!rec) {
        var wrap = el('div', 'actor');
        var h = makeCreature({ species: row.species, stage: st, size: H0 * 0.16, seed: 1000 + i * 77,
                               palette: { rim: 'warm' }, label: row.n, mood: 'calm' }, row.ic);
        wrap.appendChild(h.el);
        field.appendChild(wrap);
        rec = pets[i] = { h: h, wrap: wrap, st: st, size: 0 };
      }
      if (rec.st !== st) { rec.st = st; if (rec.h.setStage) rec.h.setStage(st); }
    });
    place();
  }

  /* 매 프레임 배치 — Scene 이 주는 무대 좌표를 그대로 쓴다 */
  function place() {
    if (!field) return;
    var g = rows(), cam = camZoom();
    /* 카메라가 물러난 만큼 줄을 옆으로 벌린다 — 같은 프레임에 더 넓은 땅이 들어온다 */
    var spread = 1.42 + (1 - cam) * 2.2;
    var maxX = W0 * (isPhone() ? 0.58 : 0.72), minX = W0 * (isPhone() ? 0.07 : 0.06);
    ['front', 'back', 'air'].forEach(function (rw) {
      var ids = g[rw];
      if (!ids.length) return;
      var sl = scene ? scene.slots(ids.length, rw) : null;
      var mid = 0;
      if (sl && sl.length) { for (var q = 0; q < sl.length; q++) mid += sl[q].x; mid /= sl.length; }
      else mid = W0 * 0.45;
      /* 줄에 들어갈 자리가 모자라면 몸집을 줄여서라도 서로 밟지 않게 한다 */
      var band = maxX - minX;
      var want = 0;
      var pack = isPhone() ? 2.6 : 1.5;   /* 실루엣의 가로 폭은 키의 2~3배다 */   /* 네발짐승의 가로 폭은 키보다 넓다 */
      for (var q2 = 0; q2 < ids.length; q2++) want += slotSize(sl && sl[q2], ids[q2], cam) * pack;
      var fit = want > band ? band / want : 1;
      var cell = band / Math.max(1, ids.length);
      ids.forEach(function (i, k) {
        var rec = pets[i]; if (!rec) return;
        var s = sl && sl[k];
        var x = s ? s.x : W0 * (0.30 + 0.30 * (k / Math.max(1, ids.length - 1)));
        var y = s ? s.y : ground() - (rw === 'air' ? H0 * 0.26 : rw === 'back' ? H0 * 0.06 : 0);
        /* 폰: 띠를 칸으로 나눠 고르게 세운다. 데스크톱: 씬이 준 자리를 벌려 쓴다 */
        x = isPhone() ? (minX + cell * (k + 0.5) + ((i * 37) % 11 - 5) * 0.6)
                      : clamp(mid + (x - mid) * spread, minX, maxX);
        /* 일직선으로 서지 않도록 앞뒤로 살짝 어긋나게 — 깊이가 생긴다 */
        /* 줄 사이를 벌리고, 같은 줄 안에서도 앞뒤로 어긋나게 — 깊이가 생긴다 */
        if (rw === 'back') y -= H0 * 0.035;
        if (rw !== 'air') y += (k % 2 ? 1 : -1) * H0 * 0.018 * (0.5 + (1 - cam) * 1.8);
    var size = slotSize(s, i, cam) * (rw === 'back' ? 0.88 : 1);
        if (rec.size !== size) { rec.size = size; if (rec.h.setSize) rec.h.setSize(size); }
        setStyle(rec.wrap, 'transform', 'translate(' + (x | 0) + 'px,' + (y | 0) + 'px) translate(-50%,-100%)');
        setStyle(rec.wrap, 'zIndex', String(Math.round((s ? s.z : (rw === 'front' ? 100 : rw === 'back' ? 40 : 20)) + y * 0.1)));
      });
    });
    if (foe) {
      var fcam = camZoom();
      if (foe.h.setSize && Math.abs((foe.cam || 1) - fcam) > 0.02) {
        foe.cam = fcam;
        var fb = (scene ? (scene.slots(1, 'foe')[0] || {}).size : 0) || H0 * 0.24;
        foe.h.setSize(clamp(fb * (foe.mul || 1) * 1.25 * (0.62 + 0.38 * fcam), 30, H0 * 0.58));
      }
      var fs = scene ? scene.slots(1, 'foe')[0] : null;
      var fx = fs ? fs.x : W0 * 0.80, fy = fs ? fs.y : ground();
      setStyle(foe.wrap, 'transform', 'translate(' + (fx | 0) + 'px,' + (fy | 0) + 'px) translate(-50%,-100%)');
      setStyle(foe.wrap, 'zIndex', '120');
      foe.pos = { x: fx, y: fy };
    }
  }

  function enemy(c) {
    measure();
    if (foe) { foe.h.dispose(); foe.wrap.remove(); foe = null; }
    var info = c.info;
    var fs = scene ? scene.slots(1, 'foe')[0] : null;
    var base = fs && fs.size ? fs.size : H0 * 0.24;
    var cam = camZoom();
    var size = clamp(base * (info.sizeMul || 1) * (isPhone() ? 1.1 : 1.25) * (0.62 + 0.38 * cam),
                     28, H0 * (isPhone() ? 0.44 : 0.58));
    var pal = { rim: 'cold', amt: 0.55 };
    if (info.palette && info.palette.base) pal.tint = info.palette.base;
    if (!pal.tint && info.biome && info.biome.tint) pal.tint = info.biome.tint;
    if (info.boss) pal.accent = '#C1391A';
    var wrap = el('div', 'actor');
    var h = makeCreature({ species: info.archetype, stage: info.boss ? 4 : 2, size: size, flip: true,
                           palette: pal, seed: S.zone * 1000 + S.wave, mood: info.boss ? 'fierce' : 'calm',
                           label: info.name }, info.ic);
    wrap.appendChild(h.el);
    field.appendChild(wrap);
    foe = { h: h, wrap: wrap, pos: { x: W0 * 0.8, y: ground() }, cam: cam, mul: (info.sizeMul || 1) };
    place();
    if (info.boss && FX && FX.bossIntro && Date.now() - _lastIntro > 7000) {
      _lastIntro = Date.now();
      FX.bossIntro(info.name, info.kind === 'overlord' ? '대군주' : '보스');
    }
    if (scene) scene.setMood(info.boss ? 'boss' : 'normal');
    if (info.boss) chatterSome('boss');
  }

  function foePos() {
    var p = foe ? foe.pos : { x: W0 * 0.8, y: ground() };
    return { x: p.x, y: p.y - H0 * 0.12 };
  }

  function hit(amt, opt) {
    if (foe && foe.h.play && !(opt && opt.silent)) foe.h.play('hurt');
    var p = foePos();
    var x = (opt && opt.x != null) ? opt.x : p.x + (Math.random() * 36 - 18);
    var y = (opt && opt.y != null) ? opt.y : p.y;
    if (opt && opt.silent) return;
    if (FX && FX.hit) FX.hit(x, y, { amount: amt, crit: opt && opt.crit, boss: cur && cur.info.boss,
                                     kind: opt && opt.auto ? 'auto' : opt && opt.tap ? 'claw' : 'bite' });
    else popup(x, y, fmt(amt), opt && opt.crit);
    if (opt && opt.tap && FX && FX.tap) FX.tap(x, y, { crit: opt.crit });
  }
  function die(rw) {
    var p = foePos();
    if (foe && foe.h.play) foe.h.play('die');
    if (FX && FX.poof) FX.poof(p.x, p.y, cur && cur.info.palette);
    if (FX && FX.coins) FX.coins(p.x, p.y, $('#r-gold'), clamp(Math.round(Math.log10(Math.max(10, rw.gold))), 3, 12));
    if (scene) scene.shake(cur && cur.info.boss ? 0.8 : 0.15);
  }
  function cheer() { for (var id in pets) if (pets[id].h.play) pets[id].h.play('cheer'); }

  /* 자동 전투 연출 — DPS 비중이 큰 동료일수록 자주 때린다 */
  function beat(dt) {
    place();
    if (scene && cur) scene.setProgress((S.wave - 1 + (1 - clamp(S.hp / cur.max, 0, 1))) / 10);
    var list = visibleList();
    if (!list.length) return;
    var tot = baseDps() || 1;
    list.forEach(function (i) {
      var share = petDps(i) / tot;
      var iv = 0.55 + 0.95 * (1 - clamp(share, 0, 1));
      atk[i] = (atk[i] || Math.random() * iv) - dt;
      if (atk[i] <= 0) {
        atk[i] = iv;
        var rec = pets[i];
        if (rec && rec.h.play) rec.h.play('attack');
      }
    });
  }
  function popup(x, y, text, crit) {
    var d = el('div', null, text);
    d.style.cssText = 'position:absolute;left:0;top:0;transform:translate(' + x + 'px,' + y + 'px);font-family:var(--num);font-weight:600;' +
      'font-size:' + (crit ? 17 : 12) + 'px;color:' + (crit ? 'var(--ember-core)' : 'var(--ink)') +
      ';text-shadow:0 2px 6px #000;pointer-events:none;transition:transform .7s ease-out,opacity .7s ease-out;';
    field.appendChild(d);
    requestAnimationFrame(function () { d.style.transform = 'translate(' + x + 'px,' + (y - 42) + 'px)'; d.style.opacity = '0'; });
    setTimeout(function () { d.remove(); }, 760);
  }
  function mount() {
    var host = $('#stage');
    field = $('#field');
    if (Sc && Sc.mount) {
      try {
        scene = Sc.mount(host, { biome: C ? C.biomeFor(S.zone).i : 0 });
        if (scene && scene.quality) scene.quality(S.quality);
        if (scene && scene.mob) { field.remove(); field = scene.mob; }
      } catch (e) { scene = null; }
    }
    if (!scene) fallbackSky();
    measure();
    if (FX && FX.mount) { try { FX.mount(host, { driveFire: false }); } catch (e) {} }
    addEventListener('resize', function () { measure(); place(); });
  }
  function fallbackSky() {
    $('#stage').style.background = 'radial-gradient(120% 80% at 27% 78%, rgba(255,147,51,.22), transparent 55%),' +
      'linear-gradient(180deg,#0E1119 0%,#141A26 58%,#2B3346 70%,#1C2331 100%)';
  }
  return { mount: mount, sync: sync, enemy: enemy, hit: hit, die: die, beat: beat, cheer: cheer,
           foePos: foePos, measure: measure, place: place, scene: function () { return scene; } };
})();

/* ══ 배너 / 대사 ═══════════════════════════════════════════════════════ */
var _ribT = [];
function ribbon(text, tone) {
  /* 빠르게 진행할 때 배너가 화면을 덮지 않도록 — 3초에 2장까지 */
  var now = Date.now();
  _ribT = _ribT.filter(function (t) { return now - t < 3000; });
  var cap = (typeof innerWidth === 'number' && innerWidth < 700) ? 1 : 2;
  if (tone !== 'bad' && _ribT.length >= cap) return;
  _ribT.push(now);
  if (FX && FX.ribbon) { FX.ribbon(text, tone); return; }
  var box = $('#ribbons'); if (!box) return;
  var d = el('div', 'rib ' + (tone || ''), text);
  box.appendChild(d);
  setTimeout(function () { d.remove(); }, 3700);
}
var _lastChat = 0;
function chatterSome(when) {
  if (!Nu || !C) return;
  var now = Date.now();
  if (now - _lastChat < 9000 || Math.random() > 0.45) return;   /* 무리는 수다스럽지 않다 */
  _lastChat = now;
  var list = ownedList();
  if (!list.length) return;
  var i = list[Math.floor(Math.random() * list.length)];
  var row = C.PETS[i];
  ribbon('「' + Nu.chatter(i, row.personality, when) + '」 — ' + (Nu.nick(i) || row.n), 'good');
}

/* ══ 스킬 폴백 (WL.Skills 없을 때만) ═══════════════════════════════════ */
if (!Sk) {
  Sk = (function () {
    var CAT = [
      { id: 'roar',  n: '포효',     f: '무리 전체의 등줄기가 선다', zone: 3,  cd: 75,  dur: 12, dps: 6 },
      { id: 'rush',  n: '황금 사냥', f: '발자국 냄새를 쫓는다',      zone: 12, cd: 130, dur: 20, gold: 5 },
      { id: 'claw',  n: '연격',      f: '손톱이 잔상을 남긴다',      zone: 6,  cd: 90,  dur: 15, tps: 12 },
      { id: 'warp',  n: '시간 압축', f: '30초를 한 호흡에 밀어 넣는다', zone: 25, cd: 200, burst: 30 },
    ];
    var st = {}, ctx = null, acc = 0;
    CAT.forEach(function (s) { st[s.id] = { cd: 0, left: 0, auto: false }; });
    function unlocked(s) { return (S.best || 1) >= s.zone; }
    return {
      CATALOG: CAT,
      init: function (saved, c) { ctx = c; if (saved && saved.st) for (var k in saved.st) if (st[k]) st[k] = saved.st[k]; },
      serialize: function () { return { st: st }; },
      canCast: function (id) { var s = st[id]; return s && s.cd <= 0 && unlocked(CAT.filter(function (x) { return x.id === id; })[0]); },
      cast: function (id) {
        var def = CAT.filter(function (x) { return x.id === id; })[0]; if (!def || !this.canCast(id)) return false;
        st[id].cd = def.cd; st[id].left = def.dur || 0;
        if (def.burst && ctx) { var d = ctx.dps() * def.burst; ctx.hurt(d); ribbon('⚡ ' + def.n + ' — ' + fmt(d), 'gold'); }
        else ribbon('✦ ' + def.n + ' 발동', 'good');
        return true;
      },
      setAuto: function (id, v) { st[id].auto = !!v; }, autoOn: function (id) { return !!st[id].auto; },
      tick: function (dt) {
        acc += dt;
        CAT.forEach(function (d) {
          var s = st[d.id];
          if (s.cd > 0) s.cd = Math.max(0, s.cd - dt);
          if (s.left > 0) s.left = Math.max(0, s.left - dt);
          if (s.auto && s.cd <= 0 && unlocked(d)) Sk.cast(d.id);
          if (d.tps && s.left > 0 && ctx) { var n = Math.floor(d.tps * dt + Math.random()); if (n > 0) ctx.tap(n); }
        });
      },
      mult: function () {
        var m = { dpsMult: 1, goldMult: 1, clickMult: 1, bossTimeBonus: 0 };
        CAT.forEach(function (d) { var s = st[d.id]; if (s.left > 0) { if (d.dps) m.dpsMult *= d.dps; if (d.gold) m.goldMult *= d.gold; } });
        return m;
      },
      state: function (id) { return st[id]; },
      levelUp: function () { return false; }, costOf: function () { return Infinity; },
      bar: null, panel: null,
    };
  })();
}

/* ══ 화면 ══════════════════════════════════════════════════════════════ */
var TOP = {};
function renderTop() {
  if (!TOP.gold) { TOP.gold = $('#r-gold'); TOP.snack = $('#r-snack'); TOP.dps = $('#r-dps'); TOP.soul = $('#r-soul'); TOP.best = $('#r-best'); }
  setText(TOP.gold, fmt(S.gold));
  setText(TOP.snack, fmt(S.snack || 0));
  setText(TOP.dps, fmt(totalDps()));
  setText(TOP.soul, fmt(S.souls));
  setText(TOP.best, String(S.best));
}
function paintStage() {
  if (!cur) return;
  var info = cur.info, pct = clamp(S.hp / cur.max, 0, 1);
  setText($('#o-zone'), '존 ' + S.zone);
  setText($('#o-biome'), C ? C.biomeFor(S.zone).n : '');
  var tier = D ? D.tierOf(S.tier) : { n: '산책', c: '#7fd4a0' };
  var tb = $('#o-tier');
  setText(tb, tier.n);
  setStyle(tb, 'color', tier.c);
  if (D) {
    var p = passives();
    var r = D.ratingOf(S.zone, totalDps(), { tier: S.tier, seed: seedOf(), bossMult: bossMultiplier(), hunt: S.sls.hunt, petHunt: p.huntAdd });
    var g = $('#o-grade');
    setText(g, r.name || (r.grade && r.grade.n) || '');
    setStyle(g, 'color', r.color || 'var(--moon)');
  }
  var tag = info.kind === 'overlord' ? '<span class="etag ov">대군주</span>'
          : info.boss ? '<span class="etag bs">BOSS</span>'
          : info.elite ? '<span class="etag el">정예</span>' : '';
  var cnt = (cur.mod.count > 1) ? ' <span class="rank">×' + cur.mod.count + '</span>' : '';
  setHtml($('#o-ename'), (info.rankName ? '<span class="rank">' + info.rankName + '</span> ' : '') +
    (info.baseName || info.name) + (info.title ? ' 〈' + info.title + '〉' : '') + cnt + tag);
  setStyle($('#o-hpfill'), 'transform', 'scaleX(' + (Math.round(pct * 400) / 400) + ')');
  var edge = $('#o-hpedge');
  edge.hidden = pct <= 0 || pct >= 1;
  setStyle(edge, 'left', 'calc(' + (Math.round(pct * 400) / 4) + '% - 1px)');
  setText($('#o-hptxt'), fmt(Math.max(0, S.hp)) + ' / ' + fmt(cur.max));
  $('#stage').classList.toggle('boss', !!info.boss);

  var fuse = $('#fuse'), lim = cur.mod.timeLimit || 0;
  if (info.boss && lim > 0) {
    var left = clamp(S.bt / lim, 0, 1);
    setStyle(fuse, 'width', (Math.round(left * 400) / 4) + '%');
    fuse.classList.toggle('warn', left < 0.25);
    if (Sc && Sc.setFire) Sc.setFire(0.45 + 0.55 * left);
  } else { setStyle(fuse, 'width', '0'); fuse.classList.remove('warn'); if (Sc && Sc.setFire) Sc.setFire(-1); }

  var wb = $('#o-waves');
  if (wb.children.length !== 10) {
    wb.innerHTML = '';
    for (var w = 1; w <= 10; w++) {
      var k = D ? D.waveKind(S.zone, w) : (w === 10 ? 'boss' : 'mob');
      wb.appendChild(el('i', 'wv' + (k === 'elite' ? ' el' : '') + (k === 'boss' || k === 'overlord' ? ' bs' : '')));
    }
  }
  for (var i = 0; i < 10; i++) {
    var d = wb.children[i], n = i + 1;
    d.classList.toggle('done', n < S.wave);
    d.classList.toggle('cur', n === S.wave);
  }
  $('#b-auto').classList.toggle('on', S.auto);
  setText($('#b-auto'), S.auto ? '자동 진행' : '파밍 고정');
}
function renderSkills() {
  var bar = $('#skillbar');
  if (Sk && Sk.bar) { if (!bar.firstChild) { var n = Sk.bar(); if (n) bar.appendChild(n); } if (Sk.refresh) Sk.refresh(); return; }
  var cat = Sk.CATALOG || [];
  if (bar.children.length !== cat.length) {
    bar.innerHTML = '';
    cat.forEach(function (d) {
      var b = el('button', 'sk');
      b.innerHTML = '<div class="n"></div><div class="c"></div><div class="f"></div>';
      b.onclick = function () { Sk.cast(d.id); renderSkills(); };
      bar.appendChild(b);
    });
  }
  cat.forEach(function (d, i) {
    var b = bar.children[i], s = Sk.state ? Sk.state(d.id) : { cd: 0, left: 0 };
    var lock = (S.best || 1) < d.zone;
    b.disabled = lock || s.cd > 0;
    b.classList.toggle('rdy', !lock && s.cd <= 0);
    b.classList.toggle('on', s.left > 0);
    b.querySelector('.n').textContent = lock ? '???' : d.n;
    b.querySelector('.c').textContent = lock ? '존 ' + d.zone : s.left > 0 ? Math.ceil(s.left) + '초' : s.cd > 0 ? Math.ceil(s.cd) + '초' : '준비';
    b.querySelector('.f').style.width = (s.cd > 0 ? (1 - s.cd / d.cd) * 100 : 100) + '%';
    b.title = d.n + ' — ' + (d.f || '');
  });
}

/* ══ 탭 : 무리 ═════════════════════════════════════════════════════════ */
var petRows = {}, petLimit = -1, portraits = {}, petIO = null;
function visibleLimit() {
  var top = 0;
  for (var i = 0; i < PET_N; i++) if (S.pets[i] > 0 || S.gold >= petCost(i, 0) * 0.2) top = i;
  return Math.min(PET_N - 1, top + 2);
}
function buildPets() {
  var body = $('#tabbody');
  body.innerHTML = '';
  for (var pk in portraits) portraits[pk].h.dispose();
  petRows = {}; portraits = {};
  if (petIO) petIO.disconnect();
  petIO = ('IntersectionObserver' in window) ? new IntersectionObserver(function (ents) {
    for (var e = 0; e < ents.length; e++) {
      var idx = +ents[e].target.dataset.i, rec = petRows[idx];
      if (!rec) continue;
      rec.vis = ents[e].isIntersecting;
      if (!rec.vis && portraits[idx]) { portraits[idx].h.dispose(); delete portraits[idx]; rec.row.querySelector('.por').innerHTML = ''; }
    }
  }, { rootMargin: '160px 0px' }) : null;
  var qb = el('div', 'qbar', '<span class="lbl">구매 수량</span>');
  [[1, '×1'], [10, '×10'], [100, '×100'], ['N', '다음 단계'], ['M', 'MAX']].forEach(function (q) {
    var b = el('button', 'qb' + (S.qty === q[0] ? ' on' : ''), q[1]);
    b.onclick = function () { S.qty = q[0]; buildPets(); };
    qb.appendChild(b);
  });
  body.appendChild(qb);

  petLimit = visibleLimit();
  for (var i = 0; i <= petLimit; i++) (function (i) {
    var row0 = C.PETS[i];
    var row = el('div', 'row');
    row.innerHTML =
      '<div class="por"></div>' +
      '<div class="info"><div class="nm"><span class="n"></span><span class="lv"></span><span class="x2"></span></div>' +
      '<div class="sub"></div><div class="mst"><i></i></div></div>' +
      '<button class="buy"><div class="c"></div><div class="q"></div></button>';
    var care = el('div', 'care');
    care.innerHTML =
      '<div class="bond"><div class="lbl"><span class="bn"></span> · <span class="bs"></span></div><div class="bar"><i></i></div></div>' +
      '<button class="act pet">쓰다듬기</button><button class="act feed">간식 주기</button>' +
      '<div class="say"></div>';
    body.appendChild(row); body.appendChild(care);
    row.querySelector('.buy').onclick = function (e) { e.stopPropagation(); buyPet(i); };
    row.onclick = function () { S.open = (S.open === i ? -1 : i); updatePets(); };
    care.querySelector('.pet').onclick = function (e) { e.stopPropagation(); doPet(i); };
    care.querySelector('.feed').onclick = function (e) { e.stopPropagation(); doFeed(i); };
    row.dataset.i = i;
    petRows[i] = { row: row, care: care, name: row0.n, vis: !petIO };
    if (petIO) petIO.observe(row);
  })(i);
  updatePets();
}
function portraitFor(i) {
  if (!Cr || !Cr.make) return null;
  var lv = S.pets[i], owned = lv > 0;
  var st = owned ? (Nu ? Nu.stageOf(lv) : 2) : 2;
  var key = st + (owned ? 'o' : 's');
  var p = portraits[i];
  if (p && p.key === key) return p.h;
  if (p) p.h.dispose();
  var h = Cr.make({
    species: C.PETS[i].species, stage: st, size: 38, seed: 1000 + i * 77,
    palette: owned ? { rim: 'warm' } : { rim: 'cold', amt: 0, base: '#1C2331', accent: '#2B3346' },
    mood: owned ? 'calm' : 'tired', label: C.PETS[i].n,
  });
  h.el.style.opacity = owned ? '1' : '.38';
  portraits[i] = { h: h, key: key };
  return h;
}
function updatePets() {
  if (visibleLimit() !== petLimit) { buildPets(); return; }
  var tot = baseDps() || 1, dpsAll = totalDps() || 1;
  for (var i in petRows) (function (i) {
    i = +i;
    var r = petRows[i], d = C.PETS[i], lv = S.pets[i];
    var n = qtyFor(petCost(i, 0), 1.07, lv), cost = geoCost(petCost(i, 0), 1.07, lv, Math.max(1, n));
    var afford = cost <= S.gold && n >= 1;
    var hidden = lv === 0 && S.gold < petCost(i, 0) * 0.2 && i > 0;
    r.row.classList.toggle('locked', hidden);
    r.row.classList.toggle('open', S.open === i && lv > 0);

    var por = r.row.querySelector('.por');
    var h = r.vis ? portraitFor(i) : null;
    if (h && por.firstChild !== h.el) { por.innerHTML = ''; por.classList.remove('emoji'); por.appendChild(h.el); }
    else if (!h) { por.classList.add('emoji'); por.textContent = hidden ? '·' : d.ic; }

    var nick = (Nu && Nu.nick(i)) || null;
    r.row.querySelector('.n').textContent = hidden ? '???' : (nick || d.n);
    r.row.querySelector('.lv').textContent = lv ? 'Lv.' + lv : '';
    r.row.querySelector('.x2').textContent = msMult(lv) > 1 ? '×' + msMult(lv) : '';
    var share = petDps(i) * globalMult() / dpsAll * 100;
    r.row.querySelector('.sub').innerHTML = lv
      ? fmt(petDps(i) * globalMult()) + '/초 · 비중 ' + (share >= 0.1 ? share.toFixed(1) + '%' : '0.1%↓') +
        (d.passive ? ' · <span class="pv">' + d.passive.name + '</span>' : '')
      : (hidden ? '더 많은 발자국이 필요하다' : d.d);
    var nx = msNext(lv);
    r.row.querySelector('.mst i').style.width = nx ? clamp(lv / nx * 100, 0, 100) + '%' : '100%';
    var buy = r.row.querySelector('.buy');
    buy.classList.toggle('ok', afford);
    buy.disabled = !afford;
    buy.querySelector('.c').textContent = fmt(cost);
    buy.querySelector('.q').textContent = lv ? '+' + Math.max(1, n) + ' 레벨' : '영입';

    if (Nu && lv > 0) {
      var g = Nu.get(i);
      r.care.querySelector('.bn').textContent = Nu.note(i);
      r.care.querySelector('.bs').textContent = Nu.STAGE_NAME[Nu.stageOf(lv)] +
        (g.mood === 'hungry' ? ' · 배고픔' : g.mood === 'happy' ? ' · 기분 좋음' : '');
      r.care.querySelector('.bar i').style.width = (g.bond / Nu.MAX * 100) + '%';
      r.care.querySelector('.pet').disabled = !Nu.canPet(i);
      var fb = r.care.querySelector('.feed');
      fb.disabled = !Nu.canFeed(i) || (S.snack || 0) < feedCost();
      fb.textContent = '간식 주기 (' + fmt(feedCost()) + ')';
    }
  })(i);
}
function feedCost() { return 3 + Math.floor((S.zone || 1) / 6); }
function doPet(i) {
  if (!Nu) return;
  var res = Nu.pet(i, C.PETS[i].personality);
  if (!res.ok) return;
  var rec = Stage && portraits[i];
  if (rec && rec.h.play) rec.h.play('pet');
  petRows[i].care.querySelector('.say').textContent = '「' + res.line + '」';
  updatePets();
}
function doFeed(i) {
  if (!Nu) return;
  var cost = feedCost();
  if ((S.snack || 0) < cost) { ribbon('간식이 모자라다', 'bad'); return; }
  var res = Nu.feed(i, C.PETS[i].personality);
  if (!res.ok) return;
  S.snack -= cost;
  if (portraits[i] && portraits[i].h.play) portraits[i].h.play('eat');
  petRows[i].care.querySelector('.say').textContent = '「' + res.line + '」';
  renderTop(); updatePets();
}
function buyPet(i) {
  var lv = S.pets[i], n = qtyFor(petCost(i, 0), 1.07, lv), cost = geoCost(petCost(i, 0), 1.07, lv, n);
  if (n < 1 || cost > S.gold) return;
  S.gold -= cost; S.pets[i] += n;
  haptic(lv === 0 ? [12, 40, 18] : 8);
  if (lv === 0) {
    ribbon(C.PETS[i].n + ' 이(가) 불가에 앉았다', 'good');
    if (C.PETS[i].passive) ribbon(plainPassive(i), 'good');
  }
  var crossed = MILESTONES.filter(function (m) { return m > lv && m <= S.pets[i]; });
  if (crossed.length) {
    ribbon(C.PETS[i].n + ' ' + crossed[crossed.length - 1] + '레벨 — 피해 ×' + Math.pow(2, crossed.length), 'gold');
    if (FX && FX.milestone && petRows[i]) FX.milestone(petRows[i].row, '×2');
  }
  _ppKey = '';
  Stage.sync(); renderTop(); updatePets();
}

/* ══ 탭 : 강화 / 시련 / 환생 / 기록 ════════════════════════════════════ */
function tabUp() {
  var p = passives();
  var h = '<div class="note">터치 피해 <b>' + fmt(clickDamage()) + '</b> · 치명타 <b>' + (p.critChance * 100).toFixed(0) +
    '%</b> (×' + p.critMult.toFixed(1) + ') · 보스 피해 <b>+' + ((bossMultiplier() - 1) * 100).toFixed(0) + '%</b>' +
    '<br>발자국 배율 <b>×' + goldMultiplier().toFixed(2) + '</b> · 교감 보너스 <b>×' + nurtureBonus().dpsMult.toFixed(2) + '</b></div>';
  h += '<div class="qbar"><span class="lbl">강화</span></div>';
  UPS.forEach(function (u) {
    var lv = S.ups[u.k], n = qtyFor(u.c, u.g, lv), cost = geoCost(u.c, u.g, lv, Math.max(1, n));
    var ok = cost <= S.gold;
    h += '<div class="row"><div class="info"><div class="nm">' + u.n + ' <span class="lv">Lv.' + lv + '</span></div>' +
      '<div class="sub">' + u.d + '</div></div>' +
      '<button class="buy' + (ok ? ' ok' : '') + '" data-u="' + u.k + '"' + (ok ? '' : ' disabled') + '>' +
      '<div class="c">' + fmt(cost) + '</div><div class="q">+' + Math.max(1, n) + '</div></button></div>';
  });
  return h;
}
function tabDiff() {
  if (!D) return '<div class="note">난이도 모듈 없음</div>';
  var un = D.unlocked(S), ax = affixes(), p = passives();
  var r = D.ratingOf(S.zone, totalDps(), { tier: S.tier, seed: seedOf(), bossMult: bossMultiplier(), hunt: S.sls.hunt, petHunt: p.huntAdd });
  var h = '<div class="note">지금 존 <b>' + S.zone + '</b> 체감 <b style="color:' + (r.color || '#9EB6D6') + '">' + (r.name || '') + '</b>' +
    ' · 존 1개 소요 <b>' + (isFinite(r.soak) ? time(r.soak) : '—') + '</b><br>' +
    '난이도를 올리면 적이 강해지는 만큼 <b>발자국·간식·야생혼</b>이 함께 늘어난다. 같은 시간에 더 많이 얻는 쪽을 고르면 된다.</div>';
  D.TIERS.forEach(function (T) {
    var u = un.list[T.t], sel = (S.tier | 0) === T.t;
    h += '<div class="tier' + (sel ? ' sel' : '') + (u.ok ? '' : ' off') + '" data-tier="' + T.t + '" style="color:' + T.c + '">' +
      '<div class="ic" style="background:' + T.c + '"></div><div class="info"><div class="tn" style="color:' + T.c + '">' + T.n + '</div>' +
      '<div class="td">' + T.d + '</div>' +
      '<div class="tr">체력 ×' + T.hp.toFixed(2) + ' · 발자국 ×' + T.rg.toFixed(2) + ' · 간식 ×' + T.rn.toFixed(2) + ' · 야생혼 ×' + T.rs.toFixed(2) +
      (u.ok ? '' : ' · <span style="color:#ff9f8c">' + u.reason + '</span>') + '</div></div></div>';
  });
  if (ax && ax.length) {
    h += '<div class="qbar" style="margin-top:10px"><span class="lbl">이 구간의 변수</span></div>';
    ax.forEach(function (a) {
      var info = D.describeAffix ? D.describeAffix(a) : null;
      var id = a.id || a, nm = (info && info.n) || (a.n || id), ds = (info && info.d) || a.d || '';
      var kind = (a.kind === 'bless' || (info && info.kind === 'bless')) ? 'bless' : 'trial';
      h += '<div class="affix ' + kind + '"><span class="an">' + nm + '</span><span class="ad">' + ds + '</span></div>';
    });
  }
  if (D.forecast) {
    var band = D.forecast(S.zone, totalDps(), { tier: S.tier, seed: seedOf(), bossMult: bossMultiplier() });
    if (band && band.length) {
      h += '<div class="qbar" style="margin-top:10px"><span class="lbl">앞으로의 벽</span></div><div class="mapband">';
      band.forEach(function (b) {
        h += '<i class="' + (b.zone === S.zone ? 'cur' : '') + '" style="background:' + (b.color || '#2B3346') + '" title="존 ' + b.zone + ' · ' + (b.name || '') + '">' +
          (b.zone % 5 === 0 ? '<span>' + b.zone + '</span>' : '') + '</i>';
      });
      h += '</div>';
    }
  }
  return h;
}
function tabAsc() {
  var gain = soulGain();
  var h = '<div class="note">환생하면 존·발자국·동료가 초기화되지만 <b class="soul">야생혼</b>과 영혼 강화는 남는다.' +
    ' 야생혼 1개당 모든 피해 <b>×1.09</b>(복리).<br>이번 생 최고 존 <b>' + S.runBest + '</b> → <b class="soul">' + fmt(gain) + ' 야생혼</b>' +
    (gain < 1 ? '<br><span style="color:#ff9f8c">존 26 이상 도달해야 환생할 수 있다.</span>' : '') + '</div>' +
    '<button class="big soulb" id="b-asc"' + (gain < 1 ? ' disabled' : '') + '>환생하기 · +' + fmt(gain) + ' 야생혼</button>' +
    '<div class="qbar" style="margin-top:12px"><span class="lbl">영혼 강화</span></div>';
  SOULS.forEach(function (u) {
    var lv = S.sls[u.k], cost = u.c * Math.pow(u.g, lv), ok = cost <= S.souls;
    h += '<div class="row"><div class="info"><div class="nm">' + u.n + ' <span class="lv">Lv.' + lv + '</span></div>' +
      '<div class="sub">' + u.d + '</div></div>' +
      '<button class="buy' + (ok ? ' ok' : '') + '" data-sl="' + u.k + '"' + (ok ? '' : ' disabled') + '>' +
      '<div class="c soul">' + fmt(Math.ceil(cost)) + '</div><div class="q">야생혼</div></button></div>';
  });
  return h;
}
function tabLog() {
  var p = passives(), nb = nurtureBonus();
  var seen = Object.keys(S.seen || {}).length;
  var rows = [
    ['현재 존 · 웨이브', S.zone + ' · ' + S.wave + '/10'],
    ['최고 도달 존', S.best], ['이번 생 최고', S.runBest],
    ['초당 피해', fmt(totalDps())], ['터치 피해', fmt(clickDamage())],
    ['발자국 배율', '×' + goldMultiplier().toFixed(2)],
    ['교감 평균', (nb.avg * 100).toFixed(0) + '% (피해 ×' + nb.dpsMult.toFixed(2) + ')'],
    ['영입한 동료', p.owned + ' / ' + PET_N],
    ['만난 짐승', seen + '종'],
    ['누적 처치', fmt(S.kills)], ['보스 처치', fmt(S.bossKills)],
    ['환생 횟수', S.ascs], ['오프라인 최대', time(maxOffline())],
    ['총 플레이', time(S.played)],
  ];
  return '<div class="note">불은 꺼지지 않는다. 자리를 비워도 무리는 사냥을 계속한다.</div>' +
    rows.map(function (r) { return '<div class="kv"><span>' + r[0] + '</span><b>' + r[1] + '</b></div>'; }).join('') +
    '<button class="big" id="b-export">저장 내보내기</button>' +
    '<button class="big" id="b-import">저장 불러오기</button>' +
    '<button class="big danger" id="b-reset">처음부터 다시</button>';
}
function renderTab() {
  var body = $('#tabbody');
  [].forEach.call($('#tabs').children, function (t) { t.classList.toggle('on', t.dataset.t === S.tab); });
  if (S.tab === 'pets') { if (!Object.keys(petRows).length || body.dataset.t !== 'pets') { body.dataset.t = 'pets'; buildPets(); } else updatePets(); return; }
  if (S.tab === 'skill') {
    if (body.dataset.t !== 'skill') {
      body.dataset.t = 'skill'; body.innerHTML = ''; petRows = {};
      var pn = (Sk && Sk.panel) ? Sk.panel() : null;
      if (pn) body.appendChild(pn);
      else body.innerHTML = '<div class="note">스킬 패널을 불러오지 못했습니다.</div>';
    } else if (Sk && Sk.refresh) Sk.refresh();
    return;
  }
  body.dataset.t = S.tab;
  body.innerHTML = S.tab === 'up' ? tabUp() : S.tab === 'diff' ? tabDiff() : S.tab === 'asc' ? tabAsc() : tabLog();
  petRows = {};
  body.querySelectorAll('[data-u]').forEach(function (b) { b.onclick = function () { buyUp(b.dataset.u); }; });
  body.querySelectorAll('[data-sl]').forEach(function (b) { b.onclick = function () { buySoul(b.dataset.sl); }; });
  body.querySelectorAll('[data-tier]').forEach(function (b) { b.onclick = function () { setTier(+b.dataset.tier); }; });
  var a = body.querySelector('#b-asc'); if (a) a.onclick = confirmAscend;
  var rs = body.querySelector('#b-reset'); if (rs) rs.onclick = confirmReset;
  var ex = body.querySelector('#b-export'); if (ex) ex.onclick = doExport;
  var im = body.querySelector('#b-import'); if (im) im.onclick = doImport;
}
function buyUp(k) {
  var u = UPS.filter(function (x) { return x.k === k; })[0], lv = S.ups[k];
  var n = qtyFor(u.c, u.g, lv), cost = geoCost(u.c, u.g, lv, n);
  if (n < 1 || cost > S.gold) return;
  S.gold -= cost; S.ups[k] += n; _ppKey = ''; renderTop(); renderTab();
}
function buySoul(k) {
  var u = SOULS.filter(function (x) { return x.k === k; })[0], lv = S.sls[k], cost = u.c * Math.pow(u.g, lv);
  if (cost > S.souls) return;
  S.souls -= cost; S.sls[k]++; _ppKey = '';
  ribbon(u.n + ' Lv.' + S.sls[k], 'soul');
  renderTop(); renderTab();
}
function setTier(t) {
  if (!D) return;
  if (!D.setTier(S, t)) { ribbon('아직 해금되지 않았다', 'bad'); return; }
  ribbon(D.tierOf(t).n + ' 난이도로 사냥한다', 'good');
  spawn(); renderTab(); paintStage();
}

function panelVisible() {
  if (document.hidden) return false;
  var b = $('#tabbody');
  if (!b) return false;
  var r = b.getBoundingClientRect();
  return r.bottom > 0 && r.top < innerHeight;
}

/* ══ 모달 ══════════════════════════════════════════════════════════════ */
function openModal(html) { $('#mbox').innerHTML = html; $('#modal').hidden = false; }
function closeModal() { $('#modal').hidden = true; }
function confirmAscend() {
  var gain = soulGain(), start = 1 + 4 * S.sls.path;
  openModal('<h3>환생하시겠습니까</h3><p>존·발자국·동료 레벨이 초기화됩니다. 교감과 도감은 남습니다.<br>' +
    '획득 <span class="num soul">' + fmt(gain) + '</span> 야생혼 (총 ' + fmt(S.souls + gain) + ')<br>' +
    '시작 존 <span class="num">' + start + '</span></p>' +
    '<div class="mrow"><button class="big soulb" id="m-ok">환생</button><button class="big" id="m-no">취소</button></div>');
  $('#m-ok').onclick = ascend; $('#m-no').onclick = closeModal;
}
function ascend() {
  var gain = soulGain();
  if (gain < 1) return;
  var keep = {
    souls: S.souls + gain, sls: S.sls, best: S.best, ascs: S.ascs + 1,
    kills: S.kills, bossKills: S.bossKills, played: S.played, started: S.started,
    seen: S.seen, nurture: Nu ? Nu.serialize() : null, skills: S.skills,
    tier: S.tier, affixSeed: S.affixSeed, snack: S.snack, bestBeaten: S.bestBeaten,
    tierBest: S.tierBest, wallLog: S.wallLog, quality: S.quality, auto: S.auto,
  };
  var fresh = blank();
  for (var k in keep) if (keep[k] !== undefined && keep[k] !== null) fresh[k] = keep[k];
  S = fresh;
  S.zone = 1 + 4 * S.sls.path;
  S.best = Math.max(S.best, S.zone); S.runBest = S.zone;
  _ppKey = '';
  closeModal(); Stage.sync(); spawn(); renderTop(); renderTab();
  ribbon('환생 ' + S.ascs + '회차 — 야생혼 +' + fmt(gain), 'soul');
}
function confirmReset() {
  openModal('<h3>전부 지웁니다</h3><p>야생혼·교감·기록이 모두 사라집니다. 되돌릴 수 없습니다.</p>' +
    '<div class="mrow"><button class="big danger" id="m-ok">초기화</button><button class="big" id="m-no">취소</button></div>');
  $('#m-ok').onclick = function () {
    try { localStorage.removeItem(KEY); localStorage.removeItem(OLD_KEY); } catch (e) {}
    S = blank(); if (Nu) Nu.init(null); _ppKey = '';
    closeModal(); Stage.sync(); spawn(); renderTop(); renderTab();
  };
  $('#m-no').onclick = closeModal;
}
function doExport() {
  save();
  var txt = '';
  try { txt = btoa(unescape(encodeURIComponent(localStorage.getItem(KEY) || ''))); } catch (e) {}
  openModal('<h3>저장 내보내기</h3><p>아래 문자열을 복사해 보관하세요.</p>' +
    '<textarea id="m-txt" readonly style="width:100%;height:120px;background:#0E1119;color:var(--ink);border:1px solid var(--line);' +
    'font-family:var(--num);font-size:10px;padding:8px;border-radius:2px">' + txt + '</textarea>' +
    '<button class="big" id="m-no">닫기</button>');
  $('#m-txt').select();
  $('#m-no').onclick = closeModal;
}
function doImport() {
  openModal('<h3>저장 불러오기</h3><p>내보낸 문자열을 붙여넣으세요. 현재 진행은 덮어씁니다.</p>' +
    '<textarea id="m-txt" style="width:100%;height:120px;background:#0E1119;color:var(--ink);border:1px solid var(--line);' +
    'font-family:var(--num);font-size:10px;padding:8px;border-radius:2px"></textarea>' +
    '<div class="mrow"><button class="big" id="m-ok">불러오기</button><button class="big" id="m-no">취소</button></div>');
  $('#m-no').onclick = closeModal;
  $('#m-ok').onclick = function () {
    var v = $('#m-txt').value.trim();
    try {
      var json = decodeURIComponent(escape(atob(v)));
      JSON.parse(json);
      localStorage.setItem(KEY, json);
      location.reload();
    } catch (e) { ribbon('불러오기 실패 — 문자열을 확인하세요', 'bad'); }
  };
}

/* ══ 입력 ══════════════════════════════════════════════════════════════ */
function bindInput() {
  var stage = $('#stage');
  $('#tap').addEventListener('pointerdown', function (e) {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    var r = $('#stage').getBoundingClientRect();
    tap(1, { x: e.clientX - r.left, y: e.clientY - r.top });
  });
  $('#b-auto').onclick = function () { S.auto = !S.auto; paintStage(); };
  $('#b-quality').onclick = function () {
    S.quality = (S.quality + 2) % 3;
    var names = ['연출 끔', '연출 약', '연출 강'];
    $('#b-quality').textContent = names[S.quality];
    if (Cr && Cr.quality) Cr.quality(S.quality);
    if (Sc && Sc.quality) Sc.quality(S.quality);
    if (navigator.vibrate) navigator.vibrate(8);
  };
  $('#tabs').onclick = function (e) {
    var t = e.target.closest('.tab');
    if (t) { S.tab = t.dataset.t; renderTab(); }
  };
  $('#modal').onclick = function (e) { if (e.target.id === 'modal') closeModal(); };
  addEventListener('keydown', function (e) {
    if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    if (e.code === 'Space') { e.preventDefault(); tap(1); }
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= 9 && Sk && Sk.CATALOG && Sk.CATALOG[n - 1]) Sk.cast(Sk.CATALOG[n - 1].id);
  });
  addEventListener('visibilitychange', function () { if (document.hidden) save(); });
  addEventListener('beforeunload', save);
}

/* ══ 루프 ══════════════════════════════════════════════════════════════ */
function logic(dt) {
  S.played += dt;
  if (Sk && Sk.tick) Sk.tick(dt);
  if (Nu) Nu.tick(dt, { owned: ownedList() });
  if (S.hp > 0) hurt(totalDps() * dt, { silent: true });
  if (cur && cur.info.boss && S.bt > 0) {
    S.bt -= dt;
    if (FX && FX.bossWarn && S.bt < 8) FX.bossWarn(S.bt);
    if (S.bt <= 0 && S.hp > 0) bossFail();
  }
}
function boot() {
  if (!C || !D) { document.body.innerHTML = '<p style="padding:40px;font-family:sans-serif">콘텐츠 모듈을 불러오지 못했습니다.</p>'; return; }
  var had = load();
  if (Nu) Nu.init(S.nurture);
  Sk.init && Sk.init(S.skills, {
    dps: totalDps,
    clickDamage: clickDamage,
    tap: function (n) { tap(n, { auto: true }); },
    tapScaled: function (n, p) { tapScaled(n, p); },
    hurt: function (d) { hurt(d, { skill: true }); },
    zone: function () { return S.zone; },
    bestZone: function () { return S.best; },
    bossKills: function () { return S.bossKills; },
    petsOwned: function () { return passives().owned; },
    isBoss: function () { return !!(cur && cur.info.boss); },
    enemyHp: function () { return S.hp; },
    enemyMax: function () { return cur ? cur.max : 0; },
    enemyCount: function () { return cur ? (cur.mod.count || 1) : 1; },
    advance: function (n) { for (var k = 0; k < Math.max(1, n | 0) && cur; k++) { S.hp = 0; kill(); } },
    bossTimeAdd: function (sec) { if (cur && cur.info.boss) S.bt += sec; },
    bossTime: function () { return cur && cur.info.boss ? S.bt : 0; },
    critChance: function () { return passives().critChance; },
    gold: function () { return S.gold; },
    spend: function (g) { if (S.gold >= g) { S.gold -= g; _ppKey = ''; return true; } return false; },
    fx: function () { return FX; },
    foe: function () { var p = Stage.foePos(); return { x: p.x, y: p.y, w: 60, h: 60 }; },
  });
  Stage.mount();
  bindInput();
  spawn(true);
  Stage.sync();
  if (Cr && Cr.quality) Cr.quality(S.quality);
  if (Cr && Cr.autoQuality) Cr.autoQuality(true);
  var off = had ? offline() : null;
  renderTop(); renderTab(); paintStage(); renderSkills();
  if (off) {
    openModal('<h3>불은 꺼지지 않았다</h3><p>자리를 비운 시간 <span class="num">' + time(off.dt) + '</span><br>' +
      '무리가 사냥한 짐승 <span class="num">' + fmt(off.kills) + '</span>마리<br>' +
      '발자국 <span class="num">' + fmt(off.gold) + '</span>' + (off.snack > 0 ? ' · 간식 <span class="num">' + fmt(off.snack) + '</span>' : '') + '</p>' +
      '<button class="big" id="m-ok">받기</button>');
    $('#m-ok').onclick = function () { closeModal(); chatterSome('back'); };
  } else if (!had) {
    ribbon('불을 지폈다. 적을 터치해 사냥을 시작하라.', 'good');
  }

  var prev = performance.now();
  setInterval(function () {
    var now = performance.now(), dt = Math.min(0.5, (now - prev) / 1000);
    prev = now;
    logic(dt);
  }, 100);

  var vprev = performance.now(), accHud = 0, accSk = 0, accPlace = 0, accTab = 0;
  var placeStep = (isPhone() || LOWEND) ? 1 / 30 : 0;      /* 폰은 30fps 배치로 충분하다 */
  (function frame(t) {
    requestAnimationFrame(frame);
    var dt = Math.min(0.25, (t - vprev) / 1000); vprev = t;
    if (document.hidden) return;
    accPlace += dt;
    if (accPlace >= placeStep) { Stage.beat(accPlace); accPlace = 0; }
    accHud += dt;
    if (accHud >= 0.1) { accHud = 0; paintStage(); renderTop(); }      /* 10fps — 사람 눈엔 충분 */
    accSk += dt;
    if (accSk >= 0.2) { accSk = 0; renderSkills(); }
    accTab += dt;
    if (accTab >= 0.5) { accTab = 0; if (panelVisible()) renderTab(); }
  })(performance.now());
  setInterval(save, 10000);
}

if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
else boot();
})();
