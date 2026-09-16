/* 숨결 화분 — whispers.js
 * Pure whisper pool + selector. Defines window.Whispers (see CONTRACT.md).
 * No DOM, no storage, no timers. Never throws: bad ctx → fallback line.
 *
 *   Whispers.pick(kind, ctx, recentIds, rng?) → {id, text} | null
 *   Whispers.byId(id, ctx?)                    → {id, text, kind, weight, once} | null
 *   Whispers.ALL                               → frozen array of lines
 *   Whispers.KINDS                             → frozen array of kind names
 *
 * Line fields: id, text, kind (primary), kinds (all kinds it answers to),
 *              weight, once, when(ctx) → boolean, priority (higher wins within a kind),
 *              plantId (informational filter used by `when`).
 */
(function (root) {
  'use strict';

  var RECENT_MAX = 8;

  /* ── predicates (ctx fields may be missing; every helper tolerates that) ── */
  function num(v) { return typeof v === 'number' && isFinite(v) ? v : NaN; }
  function band(b)      { return function (c) { return c.band === b; }; }
  function season(s)    { return function (c) { return c.season === s; }; }
  function mood(m)      { return function (c) { return c.mood === m; }; }
  function stageIs(n)   { return function (c) { return num(c.stage) === n; }; }
  function daysIs(n)    { return function (c) { return num(c.daysTogether) === n; }; }
  function plant(p)     { return function (c) { return c.plantId === p; }; }
  function unlockIs(id) { return function (c) { return c.unlockId === id || c.unlockId === 'unlock_' + id; }; }
  function firstIs(names) {
    return function (c) { return names.indexOf(c.firstId) !== -1; };
  }
  function systemIs(names) {
    return function (c) { return names.indexOf(c.systemId) !== -1; };
  }
  function all() {
    var fns = Array.prototype.slice.call(arguments);
    return function (c) { for (var i = 0; i < fns.length; i++) if (!fns[i](c)) return false; return true; };
  }
  function always() { return true; }
  function thirsty(c)   { return num(c.hyd) <= 25; }
  function absentShort(c) { var d = num(c.absentDays); return d >= 2 && d <= 6; }
  function absentLong(c)  { return num(c.absentDays) >= 7; }
  function firstOpen(c) { return !!c.firstOpenToday; }
  function bloomed(c)   { return !!c.bloomed; }
  /* 05:00–11:00 by `hour` (0–23 float); falls back to the fixed morning band */
  function morningHour(c) {
    var h = num(c.hour);
    if (!isNaN(h)) return h >= 5 && h < 11;
    return c.band === 'morning';
  }
  function notMorningHour(c) { return !morningHour(c); }
  function sitPositive(c) { return num(c.sitCount) > 0; }
  function sitZero(c)     { return num(c.sitCount) === 0; }
  function sitIsFirst(c)  { return !(c.firsts && c.firsts.sit) && sitPositive(c); }

  /* ── pool builder ── */
  var POOL = [];
  function L(id, text, opts) {
    opts = opts || {};
    var kinds = opts.kinds || [opts.kind || 'open'];
    POOL.push({
      id: id,
      text: text,
      kind: kinds[0],
      kinds: kinds,
      weight: opts.weight || 1,
      once: !!opts.once,
      when: opts.when || always,
      priority: opts.priority || 0,
      plantId: opts.plantId || null
    });
  }

  /* Open — default (any) w1 */
  L('open_default_1', '오늘도 와 주셨네요.');
  L('open_default_2', '여기 있었어요. 늘 그렇듯이요.');
  L('open_default_3', '오늘은 아무것도 안 해도 돼요. 그냥 여기 있어요.');
  L('open_default_4', '천천히 가도 괜찮아요. 저도 그래요.');
  L('open_default_5', '창가가 조금 따뜻해졌어요. 와 주셔서요.');

  /* Open — first open of the day w3 */
  L('open_first_1', '돌아오셨네요. 오늘 하루의 첫 인사예요.', { weight: 3, when: firstOpen });
  L('open_first_2', '새 하루네요. 저는 조금 자랐어요.', { weight: 3, when: firstOpen });
  L('open_first_bloomed', '아직 활짝 피어 있어요.', { weight: 3, when: all(firstOpen, bloomed) });

  /* Open — time band w2 */
  L('open_morning_1', '좋은 아침이에요. 빛이 부드러워요.', { weight: 2, when: band('morning') });
  L('open_morning_2', '아침 공기가 서늘해요. 좋아요.', { weight: 2, when: band('morning') });
  L('open_day_1', '오늘 햇살이 참 좋아요.', { weight: 2, when: band('day') });
  L('open_day_2', '한낮이에요. 잎이 살짝 따뜻해요.', { weight: 2, when: band('day') });
  L('open_evening_1', '저녁 빛이 예뻐요.', { weight: 2, when: band('evening') });
  L('open_evening_2', '오늘 하루도 수고했어요.', { weight: 2, when: band('evening') });
  L('open_night_1', '늦은 밤이네요. 조용히 있어드릴게요.', { weight: 2, when: band('night') });
  L('open_night_2', '밤이네요. 저는 천천히 숨 쉬고 있어요.', { weight: 2, when: band('night') });
  L('open_night_3', '잘 자요. 저도 곧 잘게요.', { weight: 2, when: band('night') });

  /* Open — absence w4 (2–6 days / ≥ 7 days). priority 1: the first open after an absence always speaks to it. */
  L('open_absent_1', '며칠 못 봤죠? 괜찮아요. 저는 기다리는 게 잘 맞아요.', { weight: 4, priority: 1, when: absentShort });
  L('open_absent_2', '그동안 조금 자랐어요. 천천히요.', { weight: 4, priority: 1, when: absentShort });
  L('open_absent_long_1', '오래 기다렸어요. 그래도 여기 있어요.', { weight: 4, priority: 1, when: absentLong });
  L('open_absent_long_2', '다시 만나서 반가워요. 서두를 일은 없어요.', { weight: 4, priority: 1, when: absentLong });

  /* Open — thirsty (hyd ≤ 25) w3 */
  L('open_thirsty_1', '조금 목말라요. 급하진 않아요.', { weight: 3, when: thirsty });
  L('open_thirsty_2', '목이 좀 마르지만, 그래도 자라고 있어요.', { weight: 3, when: thirsty });

  /* Open — season w1 (also pickable as kind 'season') */
  L('season_spring', '창밖은 봄이래요. 여기도 조금 들썩여요.', { kinds: ['open', 'season'], when: season('spring') });
  L('season_summer', '여름 햇살은 길어요. 천천히 쬐고 있어요.', { kinds: ['open', 'season'], when: season('summer') });
  L('season_autumn', '창밖은 가을이래요. 여기는 늘 따뜻해요.', { kinds: ['open', 'season'], when: season('autumn') });
  L('season_winter', '겨울이래요. 유리 너머로만 느껴요.', { kinds: ['open', 'season'], when: season('winter') });

  /* Open — sky mood w2 (also pickable as kind 'mood') */
  L('mood_rain_1', '비 소리 들려요? 저는 좋아요.', { kinds: ['open', 'mood'], weight: 2, when: mood('rain') });
  L('mood_rain_2', '창밖이 촉촉해요. 여기는 뽀송해요.', { kinds: ['open', 'mood'], weight: 2, when: mood('rain') });
  L('mood_cloud_1', '구름이 많은 날이에요. 빛이 부드러워요.', { kinds: ['open', 'mood'], weight: 2, when: mood('cloud') });

  /* Open — days-together milestones w5, once, exact day (also kind 'days') */
  L('days_7', '함께한 날이 일주일이 됐어요. 고마워요.', { kinds: ['open', 'days'], weight: 5, once: true, when: daysIs(7) });
  L('days_30', '한 달이에요. 매일이 아니어도 좋았어요.', { kinds: ['open', 'days'], weight: 5, once: true, when: daysIs(30) });
  L('days_100', '백 번째 날이에요. 조용히 기뻐요.', { kinds: ['open', 'days'], weight: 5, once: true, when: daysIs(100) });

  /* Water w1 */
  L('water_partial_1', '조금만 마셔도 좋아요.', { kind: 'water_partial' });
  L('water_partial_2', '고마워요. 이만큼도 충분해요.', { kind: 'water_partial' });
  L('water_full_1', '물이 참 달아요.', { kind: 'water_full' });
  L('water_full_2', '천천히 마셨어요. 고마워요.', { kind: 'water_full' });
  L('water_full_3', '숨 한 번만큼 함께했네요.', { kind: 'water_full' });
  L('water_revive_1', '조금 목말랐는데, 딱 맞춰 왔네요.', { kind: 'water_revive' });
  L('water_revive_2', '이제 다시 잎이 펴졌어요.', { kind: 'water_revive' });
  L('water_already_1', '이미 충분히 마셨어요. 고마워요.', { kind: 'water_already' });
  L('water_already_2', '잠깐 발만 담갔어요. 시원해요.', { kind: 'water_already' });

  /* Tap w1 (tap_night w2, night only; tap_3 stage 0–1 only) */
  L('tap_1', '잎이 살짝 흔들렸어요.', { kind: 'tap' });
  L('tap_2', '간지러워요. 좋아요.', { kind: 'tap' });
  L('tap_3', '뿌리가 조금 더 깊어졌어요. 보이진 않지만요.', { kind: 'tap', when: function (c) { return num(c.stage) <= 1; } });
  L('tap_4', '잎 하나하나가 다 달라요. 눈치챘어요?', { kind: 'tap' });
  L('tap_night_1', '밤엔 저도 조금 쉬어요.', { kind: 'tap', weight: 2, when: band('night') });

  /* Stage-up w9, once, exact stage. priority 1 so they beat stage_dayafter on the same call. */
  L('stage_1', '눈을 떴어요. 안녕하세요.', { kind: 'stage', weight: 9, once: true, priority: 1, when: stageIs(1) });
  L('stage_2', '첫 잎이에요. 아직 둥글어요.', { kind: 'stage', weight: 9, once: true, priority: 1, when: stageIs(2) });
  L('stage_3', '조금 키가 컸어요. 위가 궁금해서요.', { kind: 'stage', weight: 9, once: true, priority: 1, when: stageIs(3) });
  L('stage_4', '잎이 많아졌어요. 그늘이 생겼어요.', { kind: 'stage', weight: 9, once: true, priority: 1, when: stageIs(4) });
  L('stage_5', '피었어요. 서두르지 않았는데도요.', { kind: 'stage', weight: 9, once: true, priority: 1,
    when: function (c) { return num(c.stage) === 5 && c.plantId !== 'pine'; } });
  L('stage_5_pine', '완성이 없어요. 그게 좋아요.', { kind: 'stage', weight: 9, once: true, priority: 1, plantId: 'pine',
    when: all(stageIs(5), plant('pine')) });
  /* Day after a stage-up: reachable from 'stage' and from the ordinary 'open' call. Not single-fire (ring buffer spaces it). */
  L('stage_dayafter', '어제보다 잎이 하나 늘었어요. 눈치챘어요?', { kinds: ['stage', 'open'], weight: 9,
    when: function (c) { return !!c.stageUpYesterday; } });

  /* Sit w9. {n} = ctx.sitCount */
  L('sit_end', '함께 쉰 숨, {n}번. 고마워요.', { kind: 'sit', weight: 9, when: sitPositive });
  L('sit_zero', '잠깐이라도 좋았어요.', { kind: 'sit', weight: 9, when: sitZero });
  L('sit_first', '함께 숨 쉬는 건 처음이에요. 좋네요.', { kind: 'sit', weight: 9, once: true, priority: 1, when: sitIsFirst });

  /* Unlock w9, once. ctx.unlockId = plant id */
  L('unlock_succulent', '다육이가 창가에 오고 싶다고 해요.', { kind: 'unlock', weight: 9, once: true, plantId: 'succulent', when: unlockIs('succulent') });
  L('unlock_dandelion', '민들레가 바람을 타고 왔어요.', { kind: 'unlock', weight: 9, once: true, plantId: 'dandelion', when: unlockIs('dandelion') });
  L('unlock_morningglory', '나팔꽃이 감아 올라올 준비를 해요.', { kind: 'unlock', weight: 9, once: true, plantId: 'morningglory', when: unlockIs('morningglory') });
  L('unlock_pine', '작은 소나무가 아주 천천히 인사해요.', { kind: 'unlock', weight: 9, once: true, plantId: 'pine', when: unlockIs('pine') });

  /* Plant-specific — kind 'open' w2, filtered by ctx.plantId */
  L('bean_tendril', '덩굴이 뭔가를 잡으려 해요. 아무거나요.', { weight: 2, plantId: 'bean',
    when: function (c) { return c.plantId === 'bean' && num(c.stage) >= 3; } });
  L('succulent_still', '저는 거의 안 움직여요. 그래도 살아 있어요.', { weight: 2, plantId: 'succulent', when: plant('succulent') });
  L('dandelion_wind', '바람이 불면 제일 먼저 흔들려요.', { weight: 2, plantId: 'dandelion', when: plant('dandelion') });
  L('mg_morning', '아침이라 열었어요.', { weight: 2, plantId: 'morningglory', when: all(plant('morningglory'), stageIs(5), morningHour) });
  L('mg_furled', '아침에 다시 열어요.', { weight: 2, plantId: 'morningglory', when: all(plant('morningglory'), stageIs(5), notMorningHour) });
  L('pine_slow', '저는 아주 천천히요. 그게 저예요.', { weight: 2, plantId: 'pine', when: plant('pine') });

  /* Firsts w9, once. ctx.firstId accepts the firsts-key or the id suffix. */
  L('first_night', '밤에 오신 건 처음이네요. 별은 안 보여도 괜찮아요.', { kind: 'first', weight: 9, once: true,
    when: firstIs(['night', 'nightVisit', 'first_night']) });
  L('first_thirsty_revive', '목말랐던 걸 알아채 주셨네요. 고마워요.', { kind: 'first', weight: 9, once: true,
    when: firstIs(['thirsty_revive', 'thirstyRevive', 'first_thirsty_revive']) });
  L('first_bloom', '첫 꽃이에요. 언제든, 받고 싶을 때 받아요.', { kind: 'first', weight: 9, once: true,
    when: firstIs(['bloom', 'first_bloom']) });

  /* System w9. ctx.systemId selects the line. */
  L('storage_fail', '오늘은 기억을 남기지 못할 것 같아요. 그래도 함께 있어요.', { kind: 'system', weight: 9,
    when: systemIs(['storage_fail', 'storageFail']) });
  L('new_seed', '안녕하세요. 새 씨앗이에요. 천천히 시작해요.', { kind: 'system', weight: 9,
    when: systemIs(['new_seed', 'newSeed']) });
  L('onboard_done', '고마워요. 이제 곧 눈을 뜰게요.', { kind: 'system', weight: 9,
    when: systemIs(['onboard_done', 'onboardDone']) });
  /* First-run bubbles (spec §4.2) kept here so every player-facing line lives in one table. */
  L('onboard_1', '안녕하세요. 저는 작은 씨앗이에요.', { kind: 'system', weight: 9, when: systemIs(['onboard_1']) });
  L('onboard_2', '여기서 천천히 자랄 거예요. 서두를 일은 없어요.', { kind: 'system', weight: 9, when: systemIs(['onboard_2']) });
  L('onboard_3', '준비되면 꾹 눌러 물을 주세요. 천천히요.', { kind: 'system', weight: 9, when: systemIs(['onboard_3']) });

  /* ── indexes ── */
  var BY_ID = {};
  var DEFAULTS = [];
  for (var i = 0; i < POOL.length; i++) {
    Object.freeze(POOL[i].kinds);
    Object.freeze(POOL[i]);
    BY_ID[POOL[i].id] = POOL[i];
    if (POOL[i].id.indexOf('open_default_') === 0) DEFAULTS.push(POOL[i]);
  }
  var KINDS = Object.freeze(['open', 'water_partial', 'water_full', 'water_revive', 'water_already',
    'tap', 'stage', 'sit', 'unlock', 'first', 'system', 'season', 'mood', 'days']);

  /* ── helpers ── */
  function safeWhen(line, ctx) {
    try { return !!line.when(ctx); } catch (e) { return false; }
  }
  function toSet(arr) {
    var s = {};
    if (Array.isArray(arr)) for (var k = 0; k < arr.length; k++) s[arr[k]] = true;
    return s;
  }
  function weightedPick(pool, rng) {
    var total = 0, j;
    for (j = 0; j < pool.length; j++) total += pool[j].weight;
    var r = rng();
    if (!(r >= 0 && r < 1)) r = 0;            // tolerate a bad rng
    r *= total;
    for (j = 0; j < pool.length; j++) {
      r -= pool[j].weight;
      if (r < 0) return pool[j];
    }
    return pool[pool.length - 1];
  }
  function render(line, ctx) {
    var n = line.kind === 'sit' ? ctx.sitCount : ctx.daysTogether;
    if (typeof n !== 'number' || !isFinite(n)) n = 0;
    return line.text.replace(/\{n\}/g, String(n));
  }

  /* ── public ── */
  function pick(kind, ctx, recentIds, rng) {
    ctx = (ctx && typeof ctx === 'object') ? ctx : {};
    rng = typeof rng === 'function' ? rng : Math.random;
    var recent = toSet(Array.isArray(recentIds) ? recentIds.slice(-RECENT_MAX) : []);
    var seen = toSet(ctx.seenIds);

    // 1. kind + when(ctx) + single-fire
    var pool = [], maxP = -Infinity, j;
    for (j = 0; j < POOL.length; j++) {
      var l = POOL[j];
      if (l.kinds.indexOf(kind) === -1) continue;
      if (l.once && seen[l.id]) continue;
      if (!safeWhen(l, ctx)) continue;
      pool.push(l);
      if (l.priority > maxP) maxP = l.priority;
    }
    // 2. keep only the highest priority tier (stage_N over stage_dayafter, sit_first over sit_end)
    if (pool.length) pool = pool.filter(function (l) { return l.priority === maxP; });
    // 3. drop recently shown ids unless that empties the pool
    if (pool.length) {
      var fresh = pool.filter(function (l) { return !recent[l.id]; });
      if (fresh.length) pool = fresh;
    }
    // 4. fallback: open_default group, preferring non-recent but never empty
    if (!pool.length) {
      pool = DEFAULTS.filter(function (l) { return !recent[l.id]; });
      if (!pool.length) pool = DEFAULTS;
    }
    var line = weightedPick(pool, rng);
    return line ? { id: line.id, text: render(line, ctx) } : null;
  }

  function byId(id, ctx) {
    var line = BY_ID[id];
    if (!line) return null;
    return { id: line.id, text: render(line, ctx || {}), kind: line.kind, weight: line.weight, once: line.once };
  }

  var API = {
    pick: pick,
    byId: byId,
    ALL: Object.freeze(POOL.slice()),
    KINDS: KINDS,
    RECENT_MAX: RECENT_MAX
  };

  root.Whispers = API;
  if (typeof module !== 'undefined' && module.exports) module.exports = API; // node tests
})(typeof window !== 'undefined' ? window : this);
