/* 숨결 화분 — app.js
 * Game logic + all DOM wiring (spec §2, §3, §4, §7, §8). The only file that touches
 * localStorage and the document. Plants / Whispers / Sound are optional globals: every
 * call is guarded so a missing module degrades to a quieter game, never a blank screen.
 */
(function () {
  'use strict';

  /* ═══════════════════════════ 1. constants (spec §3.1) ═══════════════════════════ */
  var KEY = 'sumgyeol.v1';
  var CURRENT_V = 1;
  var GP_HYDRATED = 1.0 / 60;            // GP per second while hydration > 0
  var GP_THIRSTY = 0.35 / 60;            // GP per second while hydration == 0
  var OFFLINE_CAP_MIN = 720;             // 12 h of growth credit per absence
  var HYD_DECAY_PER_MIN = 100 / 2160;    // 100 → 0 over 36 h
  var THIRSTY_AT = 25;
  var WATER_PER_SEC = 12;                // +1.2 per 100 ms tick
  var HOLD_GRACE_MS = 120;
  var HOLD_TICK_MS = 100;
  var TAP_MAX_MS = 250, TAP_MAX_PX = 8;
  var THRESH = [0, 2, 60, 480, 1500, 3600];
  var STAGE_NAMES = ['씨앗', '새싹', '떡잎', '줄기', '무성한 잎', '꽃'];
  /* prototype-less: a hand-edited / imported id such as 'constructor' or '__proto__' must
   * miss the table instead of inheriting Object.prototype and passing validation. */
  var PLANT_NAMES = Object.assign(Object.create(null), { bean: '강낭콩', succulent: '다육이', dandelion: '민들레', morningglory: '나팔꽃', pine: '작은 소나무' });
  var MOOD_NAMES = Object.assign(Object.create(null), { sun: '맑음', cloud: '구름', rain: '비', wind: '바람' });
  var MOOD_KEYS = ['sun', 'cloud', 'rain', 'wind'];

  var BUBBLE_FADE_MS = 600, BUBBLE_MIN_MS = 5000, BUBBLE_QUIET_MS = 25000;
  var TAP_WHISPER_COOLDOWN = 20000;
  var IDLE_MS = 3000;
  var GATHER_HOLD_MS = 1500;
  var DAY_MS = 86400000;

  var SUNRISE = [7.6, 7.2, 6.7, 6.0, 5.4, 5.2, 5.4, 5.8, 6.2, 6.6, 7.1, 7.5];
  var SUNSET = [17.6, 18.1, 18.6, 19.0, 19.4, 19.8, 19.8, 19.4, 18.7, 18.0, 17.4, 17.3];

  var PALETTES = {
    morning: { skyA: '#FBEFE4', skyB: '#F3E6DD', wall: '#F5ECE2', sill: '#EADCCD', sillLine: '#DCCBB9', onScene: '#524C46', ring: 'rgba(231,183,166,.8)' },
    day:     { skyA: '#F6EFE6', skyB: '#E8EEF2', wall: '#F3ECE3', sill: '#E9DCCF', sillLine: '#DCCBB9', onScene: '#524C46', ring: 'rgba(231,183,166,.8)' },
    evening: { skyA: '#F4DFD8', skyB: '#D9CFE3', wall: '#EFE3E0', sill: '#E4D3C7', sillLine: '#DCCBB9', onScene: '#524C46', ring: 'rgba(231,183,166,.8)' },
    night:   { skyA: '#2E3446', skyB: '#4A4F66', wall: '#3A3F52', sill: '#55596E', sillLine: '#3F4356', onScene: '#E9E4DC', ring: 'rgba(233,228,220,.6)' }
  };
  var MOOD_GREY = '#D8D6D2';

  /* Fallback lines used only if whispers.js failed to load (strings identical to spec §12). */
  var FALLBACK_LINES = Object.assign(Object.create(null), {
    onboard_1: '안녕하세요. 저는 작은 씨앗이에요.',
    onboard_2: '여기서 천천히 자랄 거예요. 서두를 일은 없어요.',
    onboard_3: '준비되면 꾹 눌러 물을 주세요. 천천히요.',
    onboard_done: '고마워요. 이제 곧 눈을 뜰게요.',
    new_seed: '안녕하세요. 새 씨앗이에요. 천천히 시작해요.',
    storage_fail: '오늘은 기억을 남기지 못할 것 같아요. 그래도 함께 있어요.',
    open_default_1: '오늘도 와 주셨네요.'
  });

  /* ═══════════════════════════ 2. utils ═══════════════════════════ */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smooth(x) { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function dayKey(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }
  function dayKeyOffset(daysAgo) { var d = new Date(); d.setDate(d.getDate() - daysAgo); return dayKey(d); }
  function mulberry32(a) {
    a = a >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hashStr(s) {
    var h = 2166136261;
    s = String(s);
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function fmtDate(ts) { var d = new Date(ts); return (d.getMonth() + 1) + '월 ' + d.getDate() + '일'; }
  function fmtDateLong(ts) { var d = new Date(ts); return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate(); }
  function $(id) { return document.getElementById(id); }
  function on(el, ev, fn, opts) { if (el) el.addEventListener(ev, fn, opts || false); }
  function raf(fn) { (window.requestAnimationFrame || function (f) { setTimeout(f, 16); })(fn); }
  function now() { return Date.now(); }
  function safe(fn) { try { return fn(); } catch (e) { if (window.console && console.warn) console.warn('[sumgyeol]', e); } }

  /* Restart a one-shot CSS animation on the plant group. SVGGElement has no offsetWidth, so the
   * style flush has to come from a geometry read the element actually supports; the removal timer
   * is kept per class so a re-tap gets the full duration instead of the first tap's leftover. */
  var animTimers = Object.create(null);
  function restartAnim(el, cls, ms) {
    if (!el) return;
    if (animTimers[cls]) { clearTimeout(animTimers[cls]); animTimers[cls] = 0; }
    el.classList.remove(cls);
    void el.getBoundingClientRect();
    el.classList.add(cls);
    animTimers[cls] = setTimeout(function () { el.classList.remove(cls); animTimers[cls] = 0; }, ms);
  }

  function hasPlants() { return typeof window.Plants === 'object' && !!window.Plants; }
  function hasWhispers() { return typeof window.Whispers === 'object' && !!window.Whispers; }
  function hasSound() { return typeof window.Sound === 'object' && !!window.Sound; }
  function snd(method) {
    if (!hasSound() || typeof window.Sound[method] !== 'function') return;
    var args = Array.prototype.slice.call(arguments, 1);
    try { window.Sound[method].apply(window.Sound, args); } catch (e) { /* audio is optional */ }
  }

  function hasBgm() { return typeof window.BGM === 'object' && !!window.BGM; }
  function bgm(method) {
    if (!hasBgm() || typeof window.BGM[method] !== 'function') return;
    var args = Array.prototype.slice.call(arguments, 1);
    try { window.BGM[method].apply(window.BGM, args); } catch (e) { /* music is optional */ }
  }
  /* music rides on 소리: with sound off there is nothing for the SFX sidechain to duck against */
  function bgmOn() { return !!(state.settings.sound && state.settings.bgm); }
  function hasFx() { return typeof window.SceneFX === 'object' && !!window.SceneFX; }
  function vfx(method) {
    if (!hasFx() || typeof window.SceneFX[method] !== 'function') return;
    var args = Array.prototype.slice.call(arguments, 1);
    try { window.SceneFX[method].apply(window.SceneFX, args); } catch (e) { /* lighting is optional */ }
  }

  /* color helpers for the sky blend */
  function parseColor(c) {
    c = String(c).trim();
    if (c[0] === '#') {
      if (c.length === 4) c = '#' + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];
      return [parseInt(c.substr(1, 2), 16), parseInt(c.substr(3, 2), 16), parseInt(c.substr(5, 2), 16), 1];
    }
    var m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return [0, 0, 0, 1];
    var p = m[1].split(',').map(function (x) { return parseFloat(x); });
    return [p[0] || 0, p[1] || 0, p[2] || 0, p.length > 3 ? p[3] : 1];
  }
  function fmtColor(c) {
    var r = Math.round(clamp(c[0], 0, 255)), g = Math.round(clamp(c[1], 0, 255)), b = Math.round(clamp(c[2], 0, 255));
    if (c[3] >= 0.999) return '#' + pad2hex(r) + pad2hex(g) + pad2hex(b);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + (Math.round(c[3] * 100) / 100) + ')';
  }
  function pad2hex(n) { var s = n.toString(16); return s.length < 2 ? '0' + s : s; }
  function mixColor(a, b, t) {
    a = parseColor(a); b = parseColor(b);
    return fmtColor([lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t), lerp(a[3], b[3], t)]);
  }

  /* ═══════════════════════════ 3. state (spec §2) ═══════════════════════════ */
  var state = null;
  var storageOK = true;
  var storageWarned = false;           // the 기억을 남기지 못할 whisper is told once per session
  var saveTimer = 0;
  var firstOpenToday = false;
  var lastSeenBeforeOpen = 0;          // lastSeen as loaded, before offline catch-up (absence days)

  function fresh() {
    var t = now();
    return {
      v: CURRENT_V,
      plantId: 'bean',
      plantSeed: Math.floor(t / 1000),
      plantedAt: t,
      gp: 0,
      hydration: 80,
      lastSeen: t,
      firstSeen: t,
      daysTogether: 1,
      lastDayKey: dayKey(),
      breaths: 0,
      lastStageUpAt: 0,
      lastStageUpDayKey: '',
      whispersSeen: Object.create(null),
      whisperN: Object.create(null),   // {n} value a templated line was first heard with (journal copy)
      recentWhispers: [],
      lastTapWhisperAt: 0,
      pressed: [],
      moods: Object.create(null),
      unlocked: ['bean'],
      firsts: { thirstyRevive: false, nightVisit: false, rainVisit: false, sit: false, bloom: false },
      settings: { sound: false, haptic: true, motion: 'auto', textSize: 0, bgm: false, fx: true },
      onboarded: false,
      storageHintShown: false
    };
  }

  function migrate(s) {
    if (!s || typeof s !== 'object') s = fresh();
    // a hand-edited / hostile `v` (-1e16, -Infinity, "1", 99) must never spin the upgrade loop
    var v = Number(s.v);
    if (!isFinite(v) || v !== Math.floor(v) || v < 1 || v > CURRENT_V) { s = fresh(); v = CURRENT_V; }
    s.v = v;
    for (; s.v < CURRENT_V; s.v++) {
      switch (s.v) {
        /* case 1: upgrade v1 → v2 here */
        default: break;
      }
    }
    s.v = CURRENT_V;
    var f = fresh();
    var out = Object.assign(f, s);
    out.settings = Object.assign(fresh().settings, (s.settings && typeof s.settings === 'object') ? s.settings : {});
    out.firsts = Object.assign(fresh().firsts, (s.firsts && typeof s.firsts === 'object') ? s.firsts : {});
    var t0 = now();
    var num = function (v) { return typeof v === 'number' && isFinite(v); };
    // a damaged or hand-edited record must never turn growth into NaN or break the journal
    if (!Array.isArray(out.pressed)) out.pressed = [];
    var seenIds = Object.create(null);
    out.pressed = out.pressed.filter(function (p) { return p && typeof p === 'object'; }).map(function (p, i) {
      var c = Object.assign({ id: '', plantId: 'bean', plantSeed: 0, plantedAt: 0, bloomedAt: 0, gatheredAt: 0, daysTogether: 0, note: '' }, p);
      c.id = String(c.id || ('p_' + t0 + '_' + i));
      if (seenIds[c.id]) c.id = 'p_' + t0 + '_' + i;          // duplicate ids make the detail toggle ambiguous
      seenIds[c.id] = true;
      c.note = String(c.note || '').slice(0, 40);
      if (!PLANT_NAMES[c.plantId]) c.plantId = 'bean';
      ['plantSeed', 'plantedAt', 'bloomedAt', 'gatheredAt', 'daysTogether'].forEach(function (k) { if (!num(c[k])) c[k] = 0; });
      c.daysTogether = Math.max(0, Math.floor(c.daysTogether));
      return c;
    });
    if (!Array.isArray(out.unlocked) || out.unlocked.indexOf('bean') === -1) out.unlocked = ['bean'].concat(Array.isArray(out.unlocked) ? out.unlocked : []);
    out.unlocked = out.unlocked.filter(function (id) { return !!PLANT_NAMES[id]; });
    if (!Array.isArray(out.recentWhispers)) out.recentWhispers = [];
    // whispersSeen / whisperN / moods are keyed by data: rebuild them prototype-less, keeping
    // only in-domain values so the journal never renders inherited members or junk classes
    out.whispersSeen = numMap(out.whispersSeen);
    out.whisperN = numMap(out.whisperN);
    out.moods = (function (m) {
      var o = Object.create(null);
      if (m && typeof m === 'object') Object.keys(m).forEach(function (k) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(k) && MOOD_KEYS.indexOf(m[k]) !== -1) o[k] = m[k];
      });
      return o;
    })(out.moods);
    if (!num(out.gp) || out.gp < 0) out.gp = 0;
    ['lastSeen', 'plantedAt', 'firstSeen'].forEach(function (k) { if (!num(out[k])) out[k] = t0; });
    ['lastStageUpAt', 'lastTapWhisperAt', 'breaths'].forEach(function (k) { if (!num(out[k]) || out[k] < 0) out[k] = 0; });
    out.breaths = Math.min(Math.floor(out.breaths), 1e7);
    if (!num(out.daysTogether) || out.daysTogether < 1) out.daysTogether = 1;
    out.daysTogether = Math.max(1, Math.floor(out.daysTogether));
    if (!num(out.plantSeed)) out.plantSeed = Math.floor(t0 / 1000);
    if (typeof out.lastDayKey !== 'string') out.lastDayKey = '';
    if (typeof out.lastStageUpDayKey !== 'string') out.lastStageUpDayKey = '';
    out.hydration = clamp(typeof out.hydration === 'number' && isFinite(out.hydration) ? out.hydration : 80, 0, 100);
    if (!PLANT_NAMES[out.plantId]) out.plantId = 'bean';
    if (['auto', 'on', 'off'].indexOf(out.settings.motion) === -1) out.settings.motion = 'auto';
    if ([0, 1, 2].indexOf(out.settings.textSize) === -1) out.settings.textSize = 0;
    out.settings.bgm = !!out.settings.bgm;
    out.settings.fx = out.settings.fx !== false;          // new field: on unless a save says otherwise
    return out;
  }

  /* {id: timestamp} maps rebuilt prototype-less, dropping non-numeric values */
  function numMap(m) {
    var o = Object.create(null);
    if (m && typeof m === 'object') Object.keys(m).forEach(function (k) {
      var v = m[k];
      if (typeof v === 'number' && isFinite(v) && v >= 0) o[k] = v;
    });
    return o;
  }

  function load() {
    var raw = null;
    try { raw = window.localStorage.getItem(KEY); } catch (e) { storageOK = false; }
    if (raw) {
      try { return migrate(JSON.parse(raw)); } catch (e) { /* corrupt → fresh */ }
    }
    return fresh();
  }

  function saveNow() {
    if (!state) return;
    state.lastSeen = now();
    if (saveTimer) { clearTimeout(saveTimer); saveTimer = 0; }
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); storageOK = true; }
    catch (e) {
      // quota / private-mode writes fail long after boot: say it once, then stay quiet (spec §2)
      storageOK = false;
      if (!storageWarned) { storageWarned = true; state.storageHintShown = true; sayId('storage_fail'); }
    }
  }
  function save() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNow, 500);
  }

  function exportString() {
    return 'SUMGYEOL1:' + btoa(unescape(encodeURIComponent(JSON.stringify(state))));
  }
  function parseImport(str) {
    str = String(str || '').trim();
    if (str.indexOf('SUMGYEOL1:') !== 0) return null;
    try {
      var json = decodeURIComponent(escape(atob(str.slice('SUMGYEOL1:'.length))));
      var obj = JSON.parse(json);
      if (!obj || typeof obj !== 'object' || typeof obj.gp !== 'number') return null;
      return migrate(obj);
    } catch (e) { return null; }
  }

  /* ═══════════════════════════ 4. sim (spec §3.2–3.6) ═══════════════════════════ */
  function advance(st, nowMs) {
    var realMin = Math.max(0, (nowMs - st.lastSeen) / 60000);            // clock rollback → 0
    var creditMin = Math.min(realMin, OFFLINE_CAP_MIN);
    var hydMin = Math.min(creditMin, st.hydration / HYD_DECAY_PER_MIN);   // minutes before hitting 0
    st.gp += hydMin * 1.0 + (creditMin - hydMin) * 0.35;
    st.hydration = Math.max(0, st.hydration - realMin * HYD_DECAY_PER_MIN); // decays over FULL real time
    st.lastSeen = nowMs;
  }
  function stageOf(gp) { var s = 0; for (var i = 0; i < THRESH.length; i++) if (gp >= THRESH[i]) s = i; return s; }
  function stageT(gp) {
    var s = stageOf(gp); if (s >= 5) return 1;
    return smooth((gp - THRESH[s]) / (THRESH[s + 1] - THRESH[s]));
  }
  function stageName(plantId, s) {
    if (hasPlants() && window.Plants.get) {
      var e = safe(function () { return window.Plants.get(plantId); });
      if (e && e.stageNames && e.stageNames[s]) return e.stageNames[s];
    }
    if (plantId === 'pine' && s === 5) return '작은 솔방울';
    return STAGE_NAMES[s] || STAGE_NAMES[0];
  }
  function plantName(id) {
    if (hasPlants() && window.Plants.get) {
      var e = safe(function () { return window.Plants.get(id); });
      if (e && e.name) return e.name;
    }
    return PLANT_NAMES[id] || PLANT_NAMES.bean;
  }
  function isThirsty() { return state.hydration <= THIRSTY_AT; }
  function isBloomed() { return stageOf(state.gp) >= 5; }

  /* live tick: advance + stage-up detection. The clock only starts after the first watering
   * (spec §4.2: the seed stays bare through the first-run bubbles). */
  function tick() {
    if (!state.onboarded) { state.lastSeen = now(); return; }
    var before = stageOf(state.gp);
    advance(state, now());
    var after = stageOf(state.gp);
    if (after > before) onStageUp(after, false);
  }
  /* offline catch-up (boot, import): same as tick() but the stage-up is announced quietly */
  function catchUp() {
    if (!state.onboarded) { state.lastSeen = now(); return; }
    var before = stageOf(state.gp);
    advance(state, now());
    var after = stageOf(state.gp);
    if (after > before) onStageUp(after, true);
  }
  function onStageUp(stage, offline) {
    var t = now();
    if (offline) {
      // the threshold was crossed while away: estimate when (hydrated-rate bound), never before the last visit
      var est = t - Math.max(0, (state.gp - THRESH[stage]) * 60000);
      state.lastStageUpAt = Math.max(lastSeenBeforeOpen || 0, est);
      state.lastStageUpDayKey = dayKey(new Date(state.lastStageUpAt));
    } else {
      state.lastStageUpAt = t;
      state.lastStageUpDayKey = dayKey();
    }
    renderScene();
    if (offline) { pendingStage = stage; save(); return; }   // whispered after the greeting (flushStageWhisper)
    restartAnim($('plant'), 'stageup', 1300);
    vib(30);
    snd('chime', 'stage');
    bgm('accent', 'stage');
    vfx('pulse', 'stage');
    updateSky();                           // the music reads `stage` from here and nowhere else
    stageWhisper(stage);
  }
  var pendingStage = 0;
  function stageWhisper(stage) {
    say('stage');
    if (stage >= 5 && !state.firsts.bloom) { state.firsts.bloom = true; say('first', { firstId: 'bloom' }); }
    if (stage >= 5) checkUnlocks();
    save();
  }
  function flushStageWhisper() {
    if (!pendingStage) return;
    var s = pendingStage; pendingStage = 0;
    stageWhisper(s);
  }

  function checkDay() {
    var k = dayKey();
    if (k !== state.lastDayKey) {
      state.daysTogether += 1;
      state.lastDayKey = k;
      firstOpenToday = true;
      save();
      return true;
    }
    return false;
  }

  function unlockCtx() { return { pressedCount: state.pressed.length, daysTogether: state.daysTogether, breaths: state.breaths }; }
  function checkUnlocks() {
    if (!hasPlants() || !Array.isArray(window.Plants.LIST)) return;
    var ctx = unlockCtx();
    window.Plants.LIST.forEach(function (p) {
      if (state.unlocked.indexOf(p.id) !== -1) return;
      var ok = safe(function () { return typeof p.unlock === 'function' && p.unlock(ctx); });
      if (ok) { state.unlocked.push(p.id); say('unlock', { unlockId: p.id }); save(); }
    });
  }

  /* ═══════════════════════════ 5. sky (spec §3.8, §3.9) ═══════════════════════════ */
  var isNight = false;
  var debugHour = null;                  // set via window.__sumgyeol.setHour(h) for QA only
  function hourNow() {
    if (debugHour !== null) return debugHour;
    var d = new Date(); return d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
  }
  function band() {
    var h = Math.floor(hourNow());
    return h >= 5 && h < 11 ? 'morning' : h >= 11 && h < 17 ? 'day' : h >= 17 && h < 21 ? 'evening' : 'night';
  }
  function season() {
    var m = new Date().getMonth() + 1;
    return m >= 3 && m <= 5 ? 'spring' : m >= 6 && m <= 8 ? 'summer' : m >= 9 && m <= 11 ? 'autumn' : 'winter';
  }
  function skyMood(key) { var r = mulberry32(hashStr(key))(); return r < 0.60 ? 'clear' : r < 0.85 ? 'cloud' : 'rain'; }
  function breathCycle() { return isNight ? 12000 : 10000; }

  /* Returns {a: paletteName, b: paletteName, t: 0..1} for the current hour with 60-min blends. */
  function paletteMix(h, month) {
    var dawn = SUNRISE[month], dayStart = dawn + 3, eveStart = SUNSET[month] - 2, night = SUNSET[month] + 1;
    var edges = [[dawn, 'morning'], [dayStart, 'day'], [eveStart, 'evening'], [night, 'night']];
    var cur = 'night';
    for (var i = 0; i < edges.length; i++) {
      var e = edges[i][0], nxt = edges[i][1];
      if (h >= e - 0.5 && h < e + 0.5) return { a: cur, b: nxt, t: h - (e - 0.5) };
      if (h >= e) cur = nxt;
    }
    return { a: cur, b: cur, t: 0 };
  }
  function updateSky() {
    var scene = $('scene');
    if (!scene) return;
    var d = new Date();
    var mix = paletteMix(hourNow(), d.getMonth());
    var A = PALETTES[mix.a], B = PALETTES[mix.b];
    var nightness = (mix.a === 'night' ? 1 - mix.t : 0) + (mix.b === 'night' ? mix.t : 0);
    var mood = skyMood(dayKey(d));
    var out = {};
    Object.keys(A).forEach(function (k) { out[k] = mixColor(A[k], B[k], mix.t); });
    if (mood !== 'clear' && nightness < 1) {
      var m = 0.2 * (1 - nightness);
      out.skyA = mixColor(out.skyA, MOOD_GREY, m);
      out.skyB = mixColor(out.skyB, MOOD_GREY, m);
    }
    var st = scene.style;
    st.setProperty('--sky-a', out.skyA);
    st.setProperty('--sky-b', out.skyB);
    st.setProperty('--wall', out.wall);
    st.setProperty('--sill', out.sill);
    st.setProperty('--sill-line', out.sillLine);
    st.setProperty('--on-scene', out.onScene);
    st.setProperty('--ring', out.ring);
    var meta = $('themeColor');
    if (meta) meta.setAttribute('content', out.skyA);
    isNight = nightness >= 0.5;
    document.body.classList.toggle('night', isNight);
    scene.classList.toggle('rain', mood === 'rain');
    // the lighting rig and the music both read the blend, not band(): they cross-fade with it
    vfx('setTime', { band: mix.a, nextBand: mix.b, t: mix.t, nightness: nightness, palette: out });
    vfx('setWeather', mood);
    bgm('setMood', mix.t < 0.5 ? mix.a : mix.b, { weather: mood, nightness: nightness, stage: stageOf(state.gp) });
    if (mood === 'rain' && !state.firsts.rainVisit) { state.firsts.rainVisit = true; save(); }
  }

  /* ═══════════════════════════ 6. render ═══════════════════════════ */
  var holding = false;
  function renderScene() {
    var gPot = $('pot'), gPlant = $('plant');
    if (hasPlants()) {
      safe(function () { window.Plants.renderPot(gPot, { hydration: state.hydration }); });
      safe(function () {
        window.Plants.render(gPlant, {
          plantId: state.plantId, stage: stageOf(state.gp), t: stageT(state.gp),
          seed: state.plantSeed, thirsty: isThirsty(), hour: hourNow()
        });
      });
    }
    var days = $('days');
    if (days) {
      var dtxt = '함께한 날 ' + state.daysTogether + '일';
      if (days.textContent !== dtxt) days.textContent = dtxt;
    }
    // the scene has no text: the plant's name carries species / stage / thirst (no numbers, spec §8)
    var svg = $('plantSvg');
    if (svg) {
      var lbl = plantName(state.plantId) + ' · ' + stageName(state.plantId, stageOf(state.gp)) + (isThirsty() ? ', 조금 목말라요' : '');
      if (svg.getAttribute('aria-label') !== lbl) svg.setAttribute('aria-label', lbl);
    }
    renderHoldLabel();
    document.body.classList.toggle('thirsty', isThirsty());
  }
  function renderHoldLabel() {
    var btn = $('btnHold'), label = $('holdLabel');
    if (!btn || !label) return;
    var txt = holding ? '천천히…' : state.hydration >= 98 ? '충분히 마셨어요' : '꾹 눌러 물 주기';
    if (label.textContent !== txt) label.textContent = txt;
    // the accessible name must match the visible label in every state (WCAG 2.5.3)
    if (btn.getAttribute('aria-label') !== txt) btn.setAttribute('aria-label', txt);
    btn.classList.toggle('full', !holding && state.hydration >= 98);
  }
  function renderAll() {
    renderScene();
    if (isOpen('sheetJournal')) renderJournal();
    if (isOpen('sheetSettings')) renderSettings();
    if (isOpen('sheetSeeds')) buildSeedCards();
  }

  /* ═══════════════════════════ 7. whisper bubble ═══════════════════════════ */
  var bubble = { queue: [], visible: false, shownAt: 0, hideTimer: 0, pumpTimer: 0, swapTimer: 0, lastId: '', holdUntil: 0 };

  function whisperCtx(extra) {
    var absent = Math.floor(Math.max(0, now() - (lastSeenBeforeOpen || state.lastSeen)) / DAY_MS);
    var ctx = {
      stage: stageOf(state.gp), t: stageT(state.gp), hyd: state.hydration,
      band: band(), season: season(), absentDays: absent, firstOpenToday: firstOpenToday,
      daysTogether: state.daysTogether, bloomed: isBloomed(), plantId: state.plantId,
      mood: skyMood(dayKey()), stageUpYesterday: state.lastStageUpDayKey === dayKeyOffset(1),
      firsts: state.firsts, seenIds: Object.keys(state.whispersSeen), sitCount: 0, hour: hourNow()
    };
    return Object.assign(ctx, extra || {});
  }
  function lineById(id, ctx) {
    var r = null;
    if (hasWhispers() && typeof window.Whispers.byId === 'function') r = safe(function () { return window.Whispers.byId(id, ctx || whisperCtx()); });
    if (r && r.text) return { id: r.id || id, text: r.text };
    return FALLBACK_LINES[id] ? { id: id, text: FALLBACK_LINES[id] } : null;
  }
  /* say(kind, extraCtx) → picks a line and queues it */
  function say(kind, extra, opts) {
    var line = null;
    if (hasWhispers() && typeof window.Whispers.pick === 'function') {
      line = safe(function () { return window.Whispers.pick(kind, whisperCtx(extra), state.recentWhispers.slice(-8)); });
    } else if (kind === 'open') {
      line = lineById('open_default_1');
    }
    // exhausted single-fire pools (e.g. stage_N after a replant) fall back to open_default in
    // Whispers.pick; for these kinds the plant prefers silence over a generic greeting.
    if (line && /^(stage|unlock|first|system)$/.test(kind) && /^open_default_/.test(line.id)) return null;
    if (line && line.text) enqueue(line, opts);
    return line;
  }
  function sayId(id, opts) { var l = lineById(id); if (l) enqueue(l, opts); }

  function enqueue(line, opts) {
    opts = opts || {};
    if (opts.force) { bubble.queue.length = 0; showBubble(line, opts); return; }
    if (bubble.lastId === line.id && bubble.visible) return;
    bubble.queue.push({ line: line, opts: opts });
    pump();
  }
  function pump() {
    if (bubble.pumpTimer || !bubble.queue.length) return;
    // a crossfade in progress counts as "visible": the incoming line still needs its 5 s dwell
    var wait = bubble.swapTimer ? BUBBLE_FADE_MS + BUBBLE_MIN_MS
      : bubble.visible ? Math.max(0, BUBBLE_MIN_MS - (now() - bubble.shownAt)) : 0;
    wait = Math.max(wait, bubble.holdUntil - now());
    // a sheet covers the bubble: keep the line until the sheet closes (e.g. the unlock after gathering)
    if (sheets.current) wait = Math.max(wait, 500);
    bubble.pumpTimer = setTimeout(function () {
      bubble.pumpTimer = 0;
      if (sheets.current || now() < bubble.holdUntil || bubble.swapTimer || (bubble.visible && now() - bubble.shownAt < BUBBLE_MIN_MS - 50)) { pump(); return; }
      var item = bubble.queue.shift();
      if (item) showBubble(item.line, item.opts);
      pump();
    }, wait);
  }
  function showBubble(line, opts) {
    var el = $('bubble'), txt = $('bubbleText');
    if (!el || !txt) return;
    if (bubble.swapTimer) { clearTimeout(bubble.swapTimer); bubble.swapTimer = 0; }
    if (bubble.hideTimer) { clearTimeout(bubble.hideTimer); bubble.hideTimer = 0; }
    var apply = function () {
      txt.textContent = line.text;
      el.classList.add('show');
      bubble.visible = true;
      bubble.shownAt = now();
      bubble.lastId = line.id;
      bubble.hideTimer = setTimeout(hideBubble, BUBBLE_QUIET_MS);
    };
    if (bubble.visible) {           // crossfade: out 600 ms, then in
      el.classList.remove('show');
      bubble.visible = false;
      bubble.swapTimer = setTimeout(function () { bubble.swapTimer = 0; apply(); }, BUBBLE_FADE_MS);
    } else apply();
    if (!(opts && opts.noRecord)) recordWhisper(line.id);
  }
  function hideBubble() {
    var el = $('bubble');
    if (el) el.classList.remove('show');
    bubble.visible = false;
    bubble.lastId = '';
  }
  function recordWhisper(id) {
    if (!id) return;
    if (!state.whispersSeen[id]) state.whispersSeen[id] = now();
    state.recentWhispers.push(id);
    while (state.recentWhispers.length > 8) state.recentWhispers.shift();
    save();
  }

  /* ═══════════════════════════ 8. haptics ═══════════════════════════ */
  var interacted = false;              // browsers block vibrate() before the first tap (console error)
  function vib(ms) {
    if (!state || !state.settings.haptic || !interacted) return;
    if (!navigator.vibrate) return;
    if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;   // no real gesture yet
    try { navigator.vibrate(ms); } catch (e) { /* ignore */ }
  }

  /* ═══════════════════════════ 9. hold-to-water (spec §3.4, §7) ═══════════════════════════ */
  var hold = { active: false, pointerId: null, graceTimer: 0, tickTimer: 0, startedAt: 0, hydBefore: 0, fullAt: 0, already: false, puddled: false, keyboard: false };

  function ensureDrops() {
    var wrap = $('drops');
    if (!wrap) return;
    if (!wrap.children.length) {
      for (var i = 0; i < 8; i++) { var d = document.createElement('div'); d.className = 'drop'; wrap.appendChild(d); }
    }
    for (var j = 0; j < wrap.children.length; j++) {
      wrap.children[j].style.setProperty('--dx', (Math.round((Math.random() * 2 - 1) * 10)) + 'px');
    }
  }
  function breathPhase() {
    var c = breathCycle(), p = (now() % c) / c;
    return p < 0.4 ? p / 0.4 : 1 - (p - 0.4) / 0.6;   // 0→1 over inhale, 1→0 over exhale
  }

  /* one source of truth: sitting is quieter than watering, which is quieter than idle */
  function bgmIntensity() { return sit.open ? 0.45 : hold.active ? 0.55 : 1; }

  function startHold(e) {
    if (hold.active || hold.graceTimer) return;
    var cf = $('confirm');
    if (sheets.current || sit.open || (cf && !cf.hidden)) return;     // a modal is open: the pot is not reachable
    var btn = $('btnHold');
    if (e && typeof e.pointerId === 'number') {
      hold.pointerId = e.pointerId;
      try { btn.setPointerCapture(e.pointerId); } catch (err) { /* unsupported */ }
    }
    hold.keyboard = !e;
    hold.startedAt = now();
    hold.hydBefore = state.hydration;
    hold.fullAt = 0; hold.already = false; hold.puddled = false;
    if (btn) btn.setAttribute('aria-pressed', 'true');
    hold.graceTimer = setTimeout(beginPour, HOLD_GRACE_MS);
  }
  function beginPour() {
    hold.graceTimer = 0;
    hold.active = true;
    holding = true;
    ensureDrops();
    document.body.classList.add('holding');
    renderHoldLabel();
    vib(8);
    snd('startPour');
    bgm('setIntensity', bgmIntensity());
    hold.tickTimer = setInterval(pourTick, HOLD_TICK_MS);
  }
  function pourTick() {
    var prev = state.hydration;
    state.hydration = Math.min(100, state.hydration + WATER_PER_SEC / 10);
    if (state.hydration >= 100 && prev < 100 && !hold.fullAt) {
      hold.fullAt = now();
      vib(15);
      if (hasPlants()) safe(function () { window.Plants.ripple($('fx')); });
    }
    if (state.hydration >= 100 && !hold.fullAt) hold.fullAt = hold.startedAt;   // started full
    if (hold.fullAt && now() - hold.fullAt >= 3000 && !hold.puddled) {
      hold.puddled = true; hold.already = true;
      for (var i = 0; i < 3; i++) setTimeout(function () { if (hasPlants()) safe(function () { window.Plants.ripple($('fx')); }); }, i * 500);
    }
    if (hasPlants()) safe(function () { window.Plants.renderPot($('pot'), { hydration: state.hydration }); });
    if (prev <= THIRSTY_AT && state.hydration > THIRSTY_AT) renderScene();   // posture lifts within 800 ms
    snd('pourPhase', breathPhase());
    pourN += 1;
    if (pourN % 10 === 0) { vfx('pulse', 'water'); bgm('accent', 'water'); }   // 1 Hz, not 10
  }
  var pourN = 0;
  function endHold() {
    var btn = $('btnHold');
    if (hold.graceTimer) { clearTimeout(hold.graceTimer); hold.graceTimer = 0; }
    if (btn) {
      btn.setAttribute('aria-pressed', 'false');
      if (hold.pointerId !== null) { try { btn.releasePointerCapture(hold.pointerId); } catch (e) { /* ignore */ } }
    }
    hold.pointerId = null;
    if (!hold.active) return;
    hold.active = false;
    holding = false;
    if (hold.tickTimer) { clearInterval(hold.tickTimer); hold.tickTimer = 0; }
    document.body.classList.remove('holding');
    snd('stopPour');
    pourN = 0;
    bgm('setIntensity', bgmIntensity());

    var dur = now() - hold.startedAt;
    var revived = hold.hydBefore <= THIRSTY_AT && state.hydration > THIRSTY_AT;
    if (!state.onboarded) {
      state.onboarded = true;
      finishOnboarding();
    } else if (hold.already) say('water_already');
    else if (revived) say('water_revive');
    else if (dur < 3000) say('water_partial');
    else say('water_full');
    if (revived && !state.firsts.thirstyRevive) { state.firsts.thirstyRevive = true; say('first', { firstId: 'thirstyRevive' }); }
    renderScene();
    save();
  }

  function wireHold() {
    var btn = $('btnHold');
    if (!btn) return;
    on(btn, 'pointerdown', function (e) {
      if (e.button && e.button !== 0) return;
      e.preventDefault();
      snd('unlock');                       // user gesture: create/resume the AudioContext
      startHold(e);
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (ev) {
      on(btn, ev, function (e) { if (hold.keyboard) return; if (hold.pointerId === null || e.pointerId === hold.pointerId) endHold(); });
    });
    on(btn, 'keydown', function (e) {
      if (e.key !== ' ' && e.key !== 'Enter' && e.key !== 'Spacebar') return;
      e.preventDefault();
      if (e.repeat) return;
      startHold(null);
    });
    on(btn, 'keyup', function (e) {
      if (e.key !== ' ' && e.key !== 'Enter' && e.key !== 'Spacebar') return;
      e.preventDefault();
      if (hold.keyboard) endHold();
    });
    on(btn, 'blur', function () { if (hold.keyboard) endHold(); });
    on(btn, 'contextmenu', function (e) { e.preventDefault(); });
    on(btn, 'click', function (e) { e.preventDefault(); });
  }

  /* ═══════════════════════════ 10. tap on the plant (spec §3.5) ═══════════════════════════ */
  var tapStart = null;
  function wireTap() {
    var svg = $('plantSvg');
    if (!svg) return;
    on(svg, 'contextmenu', function (e) { e.preventDefault(); });
    on(svg, 'pointerdown', function (e) { snd('unlock'); tapStart = { x: e.clientX, y: e.clientY, t: now() }; });
    on(svg, 'pointerup', function (e) {
      if (!tapStart) return;
      var dx = e.clientX - tapStart.x, dy = e.clientY - tapStart.y;
      var ok = now() - tapStart.t < TAP_MAX_MS && Math.sqrt(dx * dx + dy * dy) < TAP_MAX_PX;
      tapStart = null;
      if (ok) onPlantTap();
    });
    on(svg, 'pointercancel', function () { tapStart = null; });
    // the same little greeting from the keyboard (the svg carries tabindex="0")
    on(svg, 'keydown', function (e) {
      if (e.key !== ' ' && e.key !== 'Enter' && e.key !== 'Spacebar') return;
      e.preventDefault();
      if (e.repeat) return;
      onPlantTap();
    });
  }
  function onPlantTap() {
    restartAnim($('plant'), 'tapped', 1400);
    vib(10);
    snd('tap');
    if (!state.onboarded) return;
    if (now() - state.lastTapWhisperAt >= TAP_WHISPER_COOLDOWN) {
      if (say('tap')) { state.lastTapWhisperAt = now(); save(); }
    }
  }

  /* ═══════════════════════════ 11. sit-together overlay (spec §4.6) ═══════════════════════════ */
  var sit = { open: false, timers: [], progress: 0, count: 0, max: 6, cycle: 10000, startedAt: 0, closing: 0, lastFocus: null };

  function sitTimer(fn, ms) { var id = setTimeout(fn, ms); sit.timers.push(id); return id; }
  function clearSitTimers() { sit.timers.forEach(clearTimeout); sit.timers.length = 0; if (sit.progress) { clearInterval(sit.progress); sit.progress = 0; } }
  function swapText(el, txt) {
    if (!el) return;
    el.classList.add('fade');
    sitTimer(function () { el.textContent = txt; el.classList.remove('fade'); }, 300);
  }
  function openSit() {
    var ov = $('sitOverlay');
    if (!ov || sit.open) return;
    if (sit.closing) { clearTimeout(sit.closing); sit.closing = 0; }
    hideBubble();
    sit.open = true; sit.count = 0;
    sit.cycle = breathCycle(); sit.max = isNight ? 5 : 6;
    sit.startedAt = now();
    var txt = $('breathText'); if (txt) { txt.textContent = '들이쉬어요…'; txt.classList.remove('fade'); }
    var bar = $('sitProgress'); if (bar) bar.style.width = '0%';
    sit.lastFocus = document.activeElement;
    ov.hidden = false;
    updateModalInert();
    try { ov.focus({ preventScroll: true }); } catch (e) { ov.focus(); }
    raf(function () { ov.classList.add('show'); });
    bgm('setIntensity', bgmIntensity());
    breathStep();
    sit.progress = setInterval(function () {
      var b = $('sitProgress');
      if (b) b.style.width = (clamp((now() - sit.startedAt) / (sit.max * sit.cycle), 0, 1) * 100) + '%';
    }, 1000);
  }
  function breathStep() {
    var txt = $('breathText');
    if (txt && txt.textContent !== '들이쉬어요…') swapText(txt, '들이쉬어요…');
    vib(6);
    snd('breathPad');
    sitTimer(function () { swapText($('breathText'), '천천히 내쉬어요…'); }, Math.round(sit.cycle * 0.4));
    sitTimer(function () {
      sit.count += 1;
      state.breaths += 1;
      save();
      if (sit.count >= sit.max) endSit(); else breathStep();
    }, sit.cycle);
  }
  function endSit() {
    var ov = $('sitOverlay');
    if (!sit.open) return;
    sit.open = false;
    clearSitTimers();
    bgm('setIntensity', bgmIntensity());
    if (ov) { ov.classList.remove('show'); sit.closing = setTimeout(function () { ov.hidden = true; sit.closing = 0; }, isRM() ? 200 : 800); }
    updateModalInert();
    restoreFocus(sit.lastFocus);
    sit.lastFocus = null;
    var wasFirst = !state.firsts.sit;
    var line = say('sit', { sitCount: sit.count });
    if (line && line.id === 'sit_end' && !state.whisperN.sit_end) state.whisperN.sit_end = sit.count;   // remembered as first heard
    if (sit.count > 0 && wasFirst) state.firsts.sit = true;
    checkUnlocks();
    renderScene();
    save();
  }
  function wireSit() {
    on($('btnSit'), 'click', function () { if (state.onboarded) openSit(); });
    on($('sitOverlay'), 'click', function () { endSit(); });
    // "any tap ends it" (spec §4.6) needs a keyboard equivalent while the overlay holds focus
    on($('sitOverlay'), 'keydown', function (e) {
      if (e.key !== ' ' && e.key !== 'Enter' && e.key !== 'Spacebar') return;
      e.preventDefault();
      endSit();
    });
  }

  /* ═══════════════════════════ 12. sheets + scrim + confirm (spec §4.3–4.5) ═══════════════════════════ */
  var sheets = { current: null, lastFocus: null, closeTimer: 0, closing: null };
  function isRM() { return document.body.classList.contains('rm'); }
  function isOpen(id) { return sheets.current === id; }

  /* ── focus containment (spec §8: dialogs are aria-modal) ──────────────────────────
   * Everything outside the topmost dialog is made inert, so Tab, Space and taps cannot
   * reach the scene controls behind the scrim. A Tab handler keeps the ring closed on
   * engines that route past the last element instead of wrapping. */
  var HAS_INERT = typeof HTMLElement !== 'undefined' && 'inert' in HTMLElement.prototype;
  function setInert(el, on) {
    if (!el) return;
    if (HAS_INERT) el.inert = !!on;
    else if (on) el.setAttribute('aria-hidden', 'true');
    if (!on && !HAS_INERT) el.removeAttribute('aria-hidden');
  }
  function topDialog() {
    var c = $('confirm');
    if (c && !c.hidden) return c;
    if (sheets.current) return $(sheets.current);
    if (sit.open) return $('sitOverlay');
    return null;
  }
  function updateModalInert() {
    var top = topDialog();
    var bg = [$('scene'), $('sitOverlay'), $('sheetJournal'), $('sheetSeeds'), $('sheetSettings')];
    bg.forEach(function (el) { setInert(el, !!top && el !== top); });
  }
  function focusables(root) {
    var out = [];
    if (!root) return out;
    var els = root.querySelectorAll('button, [href], input, select, textarea, summary, [tabindex]');
    Array.prototype.forEach.call(els, function (el) {
      if (el.disabled || el.hidden) return;
      var ti = el.getAttribute('tabindex');
      if (ti !== null && parseInt(ti, 10) < 0) return;
      if (!el.getClientRects().length) return;
      out.push(el);
    });
    return out;
  }
  function trapTab(e) {
    if (e.key !== 'Tab') return;
    var dlg = topDialog();
    if (!dlg) return;
    var f = focusables(dlg);
    if (!f.length) { e.preventDefault(); try { dlg.focus({ preventScroll: true }); } catch (err) { /* ignore */ } return; }
    var i = f.indexOf(document.activeElement);
    if (i === -1) { e.preventDefault(); (e.shiftKey ? f[f.length - 1] : f[0]).focus(); return; }
    if (e.shiftKey && i === 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
  }
  function restoreFocus(f) {
    if (f && typeof f.focus === 'function' && f !== document.body && document.contains(f)) {
      try { f.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    }
  }
  function scrim(show) {
    var s = $('scrim');
    if (!s) return;
    if (show) { s.hidden = false; raf(function () { s.classList.add('show'); }); }
    else { s.classList.remove('show'); setTimeout(function () { if (!sheets.current && $('confirm').hidden) s.hidden = true; }, isRM() ? 200 : 500); }
  }
  function openSheet(id) {
    var el = $(id);
    if (!el) return;
    if (sheets.closeTimer) { clearTimeout(sheets.closeTimer); sheets.closeTimer = 0; }
    // a close that was still animating out would otherwise stay un-hidden forever
    if (sheets.closing && sheets.closing !== el) {
      var c = sheets.closing;
      c.classList.remove('open'); c.hidden = true;
      if (c.id === 'sheetSeeds') safe(afterSeedsClosed);
    }
    sheets.closing = null;
    if (sheets.current && sheets.current !== id) {        // swap sheets without dropping the scrim
      var prev = $(sheets.current);
      if (prev) { prev.classList.remove('open'); prev.hidden = true; }
    } else if (!sheets.current) {
      sheets.lastFocus = document.activeElement;
    }
    sheets.current = id;
    if (id === 'sheetJournal') safe(renderJournal);
    if (id === 'sheetSettings') safe(renderSettings);
    if (id === 'sheetSeeds') safe(buildSeedCards);
    el.hidden = false;
    el.style.transform = '';
    el.scrollTop = 0;
    scrim(true);
    updateModalInert();
    raf(function () {
      el.classList.add('open');
      var title = el.querySelector('.sheet-title');
      if (title) { try { title.focus({ preventScroll: true }); } catch (e) { title.focus(); } }
    });
  }
  function closeSheet() {
    var id = sheets.current;
    if (!id) return;
    var el = $(id);
    sheets.current = null;
    hideConfirm();
    if (el) {
      el.classList.remove('open', 'dragging');
      el.style.transform = '';
      sheets.closing = el;
      sheets.closeTimer = setTimeout(function () {
        el.hidden = true; sheets.closeTimer = 0;
        if (sheets.closing === el) sheets.closing = null;
        if (id === 'sheetSeeds') afterSeedsClosed();
      }, isRM() ? 200 : 500);
    }
    scrim(false);
    updateModalInert();
    var f = sheets.lastFocus;
    sheets.lastFocus = null;
    restoreFocus(f);
  }
  function wireSheets() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-close]'), function (b) { on(b, 'click', closeSheet); });
    on($('scrim'), 'click', function () { if (!$('confirm').hidden) hideConfirm(); else closeSheet(); });
    on($('btnJournal'), 'click', function () { openSheet('sheetJournal'); });
    on($('btnSettings'), 'click', function () { openSheet('sheetSettings'); });
    on(document, 'keydown', function (e) {
      if (e.key !== 'Escape' && e.key !== 'Esc') return;
      if (!$('confirm').hidden) { hideConfirm(); return; }
      if (sit.open) { endSit(); return; }
      if (sheets.current) closeSheet();
    });
    on(document, 'keydown', trapTab);
    Array.prototype.forEach.call(document.querySelectorAll('.sheet'), wireDrag);
  }
  /* drag-down ≥ 80 px on the handle / head closes the sheet */
  function wireDrag(sheet) {
    var drag = null;
    var grip = [sheet.querySelector('.handle'), sheet.querySelector('.sheet-head')];
    grip.forEach(function (g) {
      if (!g) return;
      on(g, 'pointerdown', function (e) {
        if (e.target && e.target.closest && e.target.closest('button')) return;
        drag = { y: e.clientY, id: e.pointerId, dy: 0 };
        sheet.classList.add('dragging');
        try { g.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      });
      on(g, 'pointermove', function (e) {
        if (!drag || e.pointerId !== drag.id) return;
        drag.dy = Math.max(0, e.clientY - drag.y);
        if (!isRM()) sheet.style.transform = 'translateY(' + drag.dy + 'px)';
      });
      var done = function (e) {
        if (!drag || e.pointerId !== drag.id) return;
        var dy = drag.dy; drag = null;
        sheet.classList.remove('dragging');
        sheet.style.transform = '';
        if (dy >= 80) closeSheet();
      };
      on(g, 'pointerup', done); on(g, 'pointercancel', done); on(g, 'lostpointercapture', done);
    });
  }

  /* inline confirm card */
  var confirmCb = null;
  var confirmLastFocus = null;
  function showConfirm(text, yesLabel, onYes) {
    var c = $('confirm');
    if (!c) return;
    $('confirmText').textContent = text;
    $('confirmYes').textContent = yesLabel;
    confirmCb = onYes;
    confirmLastFocus = document.activeElement;
    c.hidden = false;
    if (!sheets.current) scrim(true);
    updateModalInert();
    raf(function () { try { $('confirmNo').focus({ preventScroll: true }); } catch (e) { /* ignore */ } });
  }
  function hideConfirm() {
    var c = $('confirm');
    if (!c || c.hidden) return;
    c.hidden = true;
    confirmCb = null;
    if (!sheets.current) scrim(false);
    updateModalInert();
    var f = confirmLastFocus;                 // focus goes back to what opened the card, not to <body>
    confirmLastFocus = null;
    restoreFocus(f);
  }
  function wireConfirm() {
    on($('confirmNo'), 'click', hideConfirm);
    on($('confirmYes'), 'click', function () { var cb = confirmCb; hideConfirm(); if (cb) safe(cb); });
  }

  /* ═══════════════════════════ 13. journal (spec §4.3) ═══════════════════════════ */
  var journal = { whispersExpanded: false, detailId: null, inkId: null };

  function growthPhrase(t, bloomed) {
    if (bloomed) return state.plantId === 'pine' ? '완성이 없어요. 그게 좋아요.' : '다 피었어요. 여기 그대로 있어도 좋아요.';
    return t < 0.33 ? '이제 막 시작했어요' : t < 0.66 ? '천천히 자라고 있어요' : '다음 잎까지 조금 남았어요';
  }
  function hydPhrase(h) { return h > 60 ? '물은 충분해요' : h > THIRSTY_AT ? '아직 괜찮아요' : '조금 목말라요. 급하진 않아요.'; }

  function renderJournal() {
    var s = stageOf(state.gp), t = stageT(state.gp), bloomed = s >= 5;
    var el;
    if ((el = $('jPlantLine'))) el.textContent = plantName(state.plantId) + ' · ' + stageName(state.plantId, s);
    if ((el = $('jBar'))) el.style.width = (Math.round(t * 1000) / 10) + '%';
    if ((el = $('jGrowth'))) el.textContent = growthPhrase(t, bloomed);
    if ((el = $('jHyd'))) el.textContent = hydPhrase(state.hydration);
    if ((el = $('btnGather'))) el.hidden = !bloomed;
    if ((el = $('jDays'))) el.textContent = state.daysTogether + '일';
    if ((el = $('jBreaths'))) el.textContent = state.breaths + '번';
    renderMood();
    renderWhisperList();
    renderPressed();
  }

  /* 마음 날씨 chips + 14-day dots (today rightmost) */
  function renderMood() {
    var today = state.moods[dayKey()] || '';
    Array.prototype.forEach.call(document.querySelectorAll('#moodChips .chip'), function (c) {
      c.setAttribute('aria-pressed', c.getAttribute('data-mood') === today ? 'true' : 'false');
    });
    var dots = $('moodDots');
    if (!dots) return;
    dots.textContent = '';
    for (var i = 13; i >= 0; i--) {
      var k = dayKeyOffset(i), m = state.moods[k];
      var d = document.createElement('span');
      d.className = 'dot' + (m ? ' ' + m : '') + (i === 0 ? ' today' : '');
      d.setAttribute('title', k);
      // colour alone carries the mood: name each recorded day, hide the empty ones
      if (m) {
        var p = k.split('-');
        d.setAttribute('role', 'listitem');
        d.setAttribute('aria-label', (parseInt(p[1], 10)) + '월 ' + (parseInt(p[2], 10)) + '일 · ' + (MOOD_NAMES[m] || '') + (i === 0 ? ' (오늘)' : ''));
      } else d.setAttribute('aria-hidden', 'true');
      dots.appendChild(d);
    }
  }
  function wireMood() {
    on($('moodChips'), 'click', function (e) {
      var chip = e.target && e.target.closest ? e.target.closest('.chip') : null;
      if (!chip) return;
      var m = chip.getAttribute('data-mood'), k = dayKey();
      if (state.moods[k] === m) delete state.moods[k]; else state.moods[k] = m;
      save();
      renderMood();
    });
  }

  /* 들려준 말: newest first, 5 collapsed */
  function whisperEntries() {
    return Object.keys(state.whispersSeen)
      .filter(function (id) { return !/^onboard_[123]$/.test(id); })
      .map(function (id) { return { id: id, ts: state.whispersSeen[id] }; })
      .sort(function (a, b) { return b.ts - a.ts; });
  }
  function renderWhisperList() {
    var list = $('whisperList'), empty = $('whisperEmpty'), more = $('btnMoreWhispers');
    if (!list) return;
    // ids that no longer resolve to a line must not keep the empty state hidden or pad 더 보기
    var entries = whisperEntries().map(function (e) {
      // templated lines are shown as first heard, never with the growing lifetime total
      e.line = lineById(e.id, whisperCtx({ sitCount: state.whisperN[e.id] || Math.min(state.breaths, 6) || 1 }));
      return e;
    }).filter(function (e) { return !!e.line; });
    list.textContent = '';
    if (empty) empty.hidden = entries.length > 0;
    var shown = journal.whispersExpanded ? entries : entries.slice(0, 5);
    shown.forEach(function (e) {
      var line = e.line;
      var li = document.createElement('li');
      var txt = document.createElement('span'); txt.className = 'txt'; txt.textContent = line.text;
      var date = document.createElement('span'); date.className = 'date'; date.textContent = fmtDate(e.ts);
      li.appendChild(txt); li.appendChild(date);
      list.appendChild(li);
    });
    if (more) {
      more.hidden = entries.length <= 5;
      more.textContent = journal.whispersExpanded ? '접기' : '더 보기';
    }
  }
  function wireWhisperList() {
    on($('btnMoreWhispers'), 'click', function () { journal.whispersExpanded = !journal.whispersExpanded; renderWhisperList(); });
  }

  /* 눌러 말린 꽃 grid + inline detail + note */
  function renderPressed() {
    var grid = $('pressedGrid'), empty = $('pressedEmpty'), detail = $('pressedDetail');
    if (!grid) return;
    grid.textContent = '';
    if (empty) empty.hidden = state.pressed.length > 0;
    state.pressed.forEach(function (p) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'pressed-card' + (p.id === journal.inkId ? ' ink' : '');
      card.setAttribute('data-id', p.id);
      card.setAttribute('aria-expanded', p.id === journal.detailId ? 'true' : 'false');
      card.setAttribute('aria-label', plantName(p.plantId) + ' · 함께한 날 ' + p.daysTogether + '일');
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 200 260');
      svg.setAttribute('aria-hidden', 'true');
      card.appendChild(svg);
      if (hasPlants()) safe(function () { window.Plants.renderStatic(svg, p.plantId); });
      grid.appendChild(card);
    });
    journal.inkId = null;
    if (detail) {
      var cur = journal.detailId ? state.pressed.filter(function (p) { return p.id === journal.detailId; })[0] : null;
      if (!cur) { detail.hidden = true; journal.detailId = null; return; }
      detail.hidden = false;
      var dsvg = $('pressedDetailSvg');
      if (dsvg && hasPlants()) safe(function () { window.Plants.renderStatic(dsvg, cur.plantId); });
      var meta = $('pressedDetailMeta');
      if (meta) {
        var end = cur.bloomedAt || cur.gatheredAt;
        // a record without dates shows no range at all, never 1970.1.1
        var range = (cur.plantedAt && end) ? ' · ' + fmtDateLong(cur.plantedAt) + ' ~ ' + fmtDateLong(end) : '';
        meta.textContent = plantName(cur.plantId) + ' · 함께한 날 ' + cur.daysTogether + '일' + range;
      }
      var note = $('pressedNote');
      if (note && note.value !== (cur.note || '')) note.value = cur.note || '';
      updateNoteCounter();
    }
  }
  function updateNoteCounter() {
    var note = $('pressedNote'), c = $('pressedNoteCount');
    if (!note || !c) return;
    var n = note.value.length;
    c.textContent = n > 30 ? n + '/40' : '';
  }
  function saveNote() {
    var note = $('pressedNote');
    if (!note || !journal.detailId) return;
    var p = state.pressed.filter(function (x) { return x.id === journal.detailId; })[0];
    if (!p) return;
    var v = note.value.slice(0, 40);
    if (p.note !== v) { p.note = v; save(); }
  }
  function wirePressed() {
    on($('pressedGrid'), 'click', function (e) {
      var card = e.target && e.target.closest ? e.target.closest('.pressed-card') : null;
      if (!card) return;
      var id = card.getAttribute('data-id');
      journal.detailId = journal.detailId === id ? null : id;
      renderPressed();
      var d = $('pressedDetail');
      if (d && !d.hidden) setTimeout(function () { try { d.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (err) { /* ignore */ } }, 50);
    });
    var note = $('pressedNote');
    on(note, 'input', function () { updateNoteCounter(); saveNote(); });
    on(note, 'blur', saveNote);
    on(note, 'focus', function () { try { note.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) { /* ignore */ } });
    on(note, 'keydown', function (e) { if (e.key === 'Enter') note.blur(); });
  }

  /* gather: hold 1.5 s → release */
  var gather = { timer: 0, armed: false, pointerId: null, busy: false };
  function wireGather() {
    var btn = $('btnGather');
    if (!btn) return;
    var start = function (e) {
      if (gather.busy || gather.timer) return;
      if (e) { e.preventDefault(); gather.pointerId = e.pointerId; try { btn.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ } }
      gather.armed = false;
      btn.classList.add('holding');
      btn.setAttribute('aria-pressed', 'true');
      gather.timer = setTimeout(function () { gather.timer = 0; gather.armed = true; vib(20); }, GATHER_HOLD_MS);
    };
    var end = function () {
      if (gather.timer) { clearTimeout(gather.timer); gather.timer = 0; }
      btn.classList.remove('holding');
      btn.setAttribute('aria-pressed', 'false');
      gather.pointerId = null;
      if (gather.armed) { gather.armed = false; doGather(); }
    };
    on(btn, 'pointerdown', function (e) { if (!e.button) start(e); });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (ev) { on(btn, ev, end); });
    on(btn, 'keydown', function (e) { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); start(null); } });
    on(btn, 'keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); end(); } });
    on(btn, 'contextmenu', function (e) { e.preventDefault(); });
    on(btn, 'click', function (e) { e.preventDefault(); });
  }
  function doGather() {
    if (!isBloomed() || gather.busy) return;
    gather.busy = true;
    var card = {
      id: 'p_' + now(), plantId: state.plantId, plantSeed: state.plantSeed, plantedAt: state.plantedAt,
      bloomedAt: state.lastStageUpAt || now(), gatheredAt: now(), daysTogether: state.daysTogether, note: ''
    };
    state.pressed.push(card);
    journal.inkId = card.id;
    journal.detailId = null;
    var plantId = state.plantId;
    snd('chime', 'gather');
    bgm('accent', 'gather');
    vib(20);
    closeSheet();
    var rm = isRM();
    var fx = $('fx');
    var done = function () {
      plantNew(plantId, true);         // fresh seed of the same species until another is chosen
      gather.busy = false;
      checkUnlocks();
      save();
      openSheet('sheetSeeds');
    };
    var p = hasPlants() ? safe(function () { return window.Plants.gatherEffect(plantId, fx, { reducedMotion: rm }); }) : null;
    if (p && typeof p.then === 'function') p.then(done, done);
    else setTimeout(done, rm ? 800 : 1500);
  }

  /* ═══════════════════════════ 14. seed picker (spec §4.4) ═══════════════════════════ */
  var seedWhisperPending = false;
  function buildSeedCards() {
    var wrap = $('seedScroller');
    if (!wrap) return;
    checkUnlocks();
    wrap.textContent = '';
    var list = hasPlants() && Array.isArray(window.Plants.LIST) ? window.Plants.LIST : [{ id: 'bean', name: '강낭콩', personality: '가장 먼저 만나는 친구예요', unlockHint: '' }];
    list.forEach(function (p) {
      var unlocked = state.unlocked.indexOf(p.id) !== -1;
      var card = document.createElement('div');
      card.className = 'seed-card' + (unlocked ? '' : ' locked');
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 200 260');
      svg.setAttribute('aria-hidden', 'true');
      card.appendChild(svg);
      if (hasPlants()) safe(function () { (unlocked ? window.Plants.renderStatic : window.Plants.renderSeedSilhouette)(svg, p.id); });
      var name = document.createElement('p'); name.className = 'name'; name.textContent = p.name; card.appendChild(name);
      var pers = document.createElement('p'); pers.className = 'personality'; pers.textContent = p.personality; card.appendChild(pers);
      if (unlocked) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'pill';
        b.setAttribute('data-plant', p.id);
        var sp = document.createElement('span'); sp.textContent = '이 씨앗으로 시작해요'; b.appendChild(sp);
        card.appendChild(b);
      } else {
        var hint = document.createElement('p'); hint.className = 'hint'; hint.textContent = p.unlockHint || ''; card.appendChild(hint);
      }
      wrap.appendChild(card);
    });
  }
  function wireSeeds() {
    on($('seedScroller'), 'click', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('button[data-plant]') : null;
      if (!b) return;
      var id = b.getAttribute('data-plant');
      if (state.unlocked.indexOf(id) === -1) return;
      plantNew(id, false);
      closeSheet();
    });
  }
  /* New seed: pot fades to bare soil (600 ms), seed fades in (600 ms). */
  function plantNew(plantId, quiet) {
    var t = now();
    state.plantId = plantId;
    state.gp = 0;
    state.hydration = 80;
    state.plantedAt = t;
    state.plantSeed = Math.floor(t / 1000);
    state.lastStageUpAt = 0;
    state.lastStageUpDayKey = '';
    var g = $('plant');
    if (g) {
      g.style.transition = 'opacity 600ms var(--ease)';
      g.style.opacity = '0';
      setTimeout(function () { renderScene(); g.style.opacity = '1'; setTimeout(function () { g.style.transition = ''; }, 700); }, 600);
    } else renderScene();
    updateSky();                           // a fresh seed must score as stage 0 now, not in 60s
    seedWhisperPending = true;
    if (!quiet) afterSeedsClosed();
    save();
  }
  function afterSeedsClosed() {
    if (!seedWhisperPending) return;
    seedWhisperPending = false;
    sayId('new_seed');
  }

  /* ═══════════════════════════ 15. settings (spec §4.5) ═══════════════════════════ */
  var soundUnlockArmed = false;
  function renderSettings() {
    var el;
    if ((el = $('setSound'))) el.setAttribute('aria-checked', state.settings.sound ? 'true' : 'false');
    if ((el = $('setBgm'))) {
      // iOS caps concurrent AudioContexts: if BGM could not get one, the switch must not
      // claim the music is on. bgm.js reports that through isAvailable().
      var bgmDead = !!(hasBgm() && window.BGM.isAvailable && !window.BGM.isAvailable());
      el.setAttribute('aria-checked', state.settings.bgm && !bgmDead ? 'true' : 'false');
      el.setAttribute('aria-disabled', bgmDead ? 'true' : 'false');
    }
    if ((el = $('setFx'))) el.setAttribute('aria-checked', state.settings.fx ? 'true' : 'false');
    if ((el = $('setHaptic'))) el.setAttribute('aria-checked', state.settings.haptic ? 'true' : 'false');
    if ((el = $('rowHaptic'))) el.hidden = !navigator.vibrate;
    setSeg('setMotion', state.settings.motion);
    setSeg('setText', String(state.settings.textSize));
    var ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if ((el = $('homeHintIos'))) el.hidden = !ios;
    if ((el = $('homeHintAndroid'))) el.hidden = ios;
  }
  function setSeg(id, value) {
    var seg = $(id);
    if (!seg) return;
    Array.prototype.forEach.call(seg.querySelectorAll('[role=radio]'), function (b) {
      var sel = b.getAttribute('data-value') === value;
      b.setAttribute('aria-checked', sel ? 'true' : 'false');
      b.setAttribute('tabindex', sel ? '0' : '-1');    // a radio group is one tab stop
    });
  }
  /* arrow keys move and select inside a radiogroup (the expected radio interaction) */
  function wireSegKeys(id) {
    var seg = $(id);
    if (!seg) return;
    on(seg, 'keydown', function (e) {
      var fwd = e.key === 'ArrowRight' || e.key === 'ArrowDown';
      var back = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
      var home = e.key === 'Home', end = e.key === 'End';
      if (!fwd && !back && !home && !end) return;
      var radios = Array.prototype.slice.call(seg.querySelectorAll('[role=radio]'));
      if (!radios.length) return;
      var i = radios.indexOf(document.activeElement);
      if (i === -1) for (var k = 0; k < radios.length; k++) if (radios[k].getAttribute('aria-checked') === 'true') i = k;
      if (i === -1) i = 0;
      var n = home ? 0 : end ? radios.length - 1 : (i + (fwd ? 1 : -1) + radios.length) % radios.length;
      e.preventDefault();
      radios[n].focus();
      radios[n].click();                                // reuse the click path: state, apply*, render, save
    });
  }
  function applyTextSize() {
    document.documentElement.style.fontSize = ['100%', '112%', '125%'][state.settings.textSize] || '100%';
  }
  var rmQuery = null;
  function applyMotion() {
    var m = state.settings.motion;
    var sys = false;
    try { rmQuery = rmQuery || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')); sys = !!(rmQuery && rmQuery.matches); } catch (e) { /* ignore */ }
    document.body.classList.toggle('rm', m === 'on' || (m === 'auto' && sys));
    vfx('setReducedMotion', document.body.classList.contains('rm'));
  }
  /* 'high' is where SceneFX starts; it still steps itself down on a slow device */
  function applyFx() { vfx('setQuality', state.settings.fx ? 'high' : 'off'); }
  function applySound() {
    snd('setEnabled', !!state.settings.sound);
    bgm('setEnabled', bgmOn());
    if (state.settings.sound) {
      snd('unlock');           // we are inside a user gesture when toggled
      if (bgmOn()) bgm('unlock');
      snd('roomTone', true);
      if (!soundUnlockArmed) {
        soundUnlockArmed = true;
        on(document, 'pointerdown', function unlockOnce() {
          if (state.settings.sound) { snd('unlock'); snd('roomTone', true); }
          if (bgmOn()) bgm('unlock');
          document.removeEventListener('pointerdown', unlockOnce);
          soundUnlockArmed = false;
        });
      }
    } else snd('roomTone', false);
  }
  function copyText(text) {
    var fallback = function () {
      try {
        var ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.opacity = '0'; ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select(); ta.setSelectionRange(0, text.length);
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return Promise.resolve(!!ok);
      } catch (e) { return Promise.resolve(false); }
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, fallback);
    }
    return fallback();
  }
  function flashLabel(id, text, ms) {
    var el = $(id);
    if (!el) return;
    var orig = el.getAttribute('data-orig') || el.textContent;
    el.setAttribute('data-orig', orig);
    el.textContent = text;
    setTimeout(function () { el.textContent = orig; }, ms || 2000);
  }
  function wireSettings() {
    on($('setSound'), 'click', function () { state.settings.sound = !state.settings.sound; applySound(); renderSettings(); save(); });
    // turning the music on with 소리 off would be a dead switch, so it brings 소리 with it
    on($('setBgm'), 'click', function () {
      if (hasBgm() && window.BGM.isAvailable && !window.BGM.isAvailable()) return;   // no context: the row is inert
      state.settings.bgm = !state.settings.bgm;
      if (state.settings.bgm) state.settings.sound = true;
      applySound(); renderSettings(); save();
    });
    on($('setFx'), 'click', function () { state.settings.fx = !state.settings.fx; applyFx(); renderSettings(); save(); });
    on($('setHaptic'), 'click', function () { state.settings.haptic = !state.settings.haptic; renderSettings(); save(); if (state.settings.haptic) vib(8); });
    on($('setMotion'), 'click', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('[data-value]') : null;
      if (!b) return;
      state.settings.motion = b.getAttribute('data-value');
      applyMotion(); renderSettings(); save();
    });
    on($('setText'), 'click', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('[data-value]') : null;
      if (!b) return;
      state.settings.textSize = parseInt(b.getAttribute('data-value'), 10) || 0;
      applyTextSize(); renderSettings(); save();
    });
    on($('btnExport'), 'click', function () {
      saveNow();
      copyText(exportString()).then(function (ok) {
        if (ok) flashLabel('exportLabel', '복사했어요', 2000);
        else { var ta = $('importText'); if (ta) { ta.value = exportString(); ta.focus(); ta.select(); } }
      });
    });
    on($('btnImport'), 'click', function () {
      var ta = $('importText');
      var s = parseImport(ta ? ta.value : '');
      if (!s) { flashLabel('importLabel', '읽을 수 없는 글이에요', 2000); return; }
      showConfirm('지금 화분 대신 이 기록을 불러올까요?', '네, 불러와요', function () {
        if (sit.open) endSit();
        endHold();
        state = s;
        lastSeenBeforeOpen = state.lastSeen;
        catchUp();
        checkDay();
        checkUnlocks();
        flushStageWhisper();
        saveNow();
        applyTextSize(); applyMotion(); applyFx();
        snd('setEnabled', !!state.settings.sound); bgm('setEnabled', bgmOn());
        updateSky(); renderAll();
        if (ta) ta.value = '';
        closeSheet();
        if (state.onboarded) {
          if (onboard.active) {                 // an onboarded record replaces an unfinished first run
            onboard.active = false;
            document.body.classList.remove('onboarding');
            Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) { el.classList.remove('reveal'); });
          }
        } else if (!onboard.active) {           // a fresh record: run the first-run bubbles again
          onboard.step = 0;
          startOnboarding();
        }
      });
    });
    on($('btnReplant'), 'click', function () {
      showConfirm('정말 다시 심을까요? 지금까지의 일기는 그대로 남아요.', '네, 다시 심어요', function () {
        plantNew(state.plantId, true);
        openSheet('sheetSeeds');
      });
    });
    on($('btnResetAll'), 'click', function () {
      showConfirm('정말요? 지금 식물과 일기가 모두 사라져요.', '네, 새로 시작해요', function () {
        state = fresh();
        try { window.localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
        try { window.localStorage.removeItem('sumgyeol.gfx'); } catch (e) { /* ignore */ }
        saveNow();
        try { window.location.reload(); } catch (e) { /* ignore */ }
      });
    });
    wireSegKeys('setMotion');
    wireSegKeys('setText');
    var importBtn = $('btnImport');
    if (importBtn && importBtn.firstElementChild && !importBtn.firstElementChild.id) importBtn.firstElementChild.id = 'importLabel';
  }

  /* ═══════════════════════════ 16. onboarding (spec §4.2) ═══════════════════════════ */
  var onboard = { step: 0, lastAdvance: 0, active: false, wired: false };
  function startOnboarding() {
    onboard.active = true;
    document.body.classList.add('onboarding');
    // the timer only opens the sequence; a tap that already advanced it is never overridden
    setTimeout(function () { if (onboard.active && onboard.step === 0) onboardStep(); }, 1500);
    if (!onboard.wired) { onboard.wired = true; on($('scene'), 'pointerup', onboardTap); }
  }
  function onboardTap(e) {
    if (!onboard.active || onboard.step >= 3) return;
    if (e.target && e.target.closest && e.target.closest('button')) return;
    if (now() - onboard.lastAdvance < 800) return;
    onboardStep();
  }
  function onboardStep() {
    onboard.step += 1;
    onboard.lastAdvance = now();
    var line = lineById('onboard_' + onboard.step);
    if (line) enqueue(line, { force: true, noRecord: true });
    if (onboard.step === 3) {
      var hb = $('btnHold');
      if (hb) hb.classList.add('reveal');                                   // fades in over 1200 ms
      setTimeout(function () { var t = $('top'); if (t) t.classList.add('reveal'); }, 600);
    }
  }
  function finishOnboarding() {
    onboard.active = false;
    var sb = $('btnSit'); if (sb) sb.classList.add('reveal');
    sayId('onboard_done', { force: true });
    setTimeout(function () {
      document.body.classList.remove('onboarding');
      Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) { el.classList.remove('reveal'); });
    }, 1300);
    save();
  }

  /* ═══════════════════════════ 17. idle chrome ═══════════════════════════ */
  var idleTimer = 0;
  function chromeIdle(idle) {
    Array.prototype.forEach.call(document.querySelectorAll('.chrome'), function (el) { el.classList.toggle('idle', idle); });
  }
  function pokeIdle() {
    interacted = true;
    chromeIdle(false);
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { if (state.onboarded && !sheets.current) chromeIdle(true); }, IDLE_MS);
  }

  /* ═══════════════════════════ 18. boot ═══════════════════════════ */
  function firstWhisper() {
    var absent = Math.floor(Math.max(0, now() - (lastSeenBeforeOpen || state.lastSeen)) / DAY_MS);
    var mood = skyMood(dayKey());
    var kind = 'open';
    var milestone = [7, 30, 100].indexOf(state.daysTogether) !== -1 && !state.whispersSeen['days_' + state.daysTogether];
    // priority: absence / thirst > days milestone (exact day, once) > first open > mood > season > default
    if (absent >= 2 || isThirsty()) kind = 'open';
    else if (milestone) kind = 'days';
    else if (firstOpenToday) kind = 'open';
    else if ((mood === 'rain' || mood === 'cloud') && Math.random() < 0.3) kind = 'mood';
    else if (Math.random() < 0.15) kind = 'season';
    say(kind);
    if (band() === 'night' && !state.firsts.nightVisit) { state.firsts.nightVisit = true; say('first', { firstId: 'nightVisit' }); save(); }
    flushStageWhisper();                   // a stage reached while away is told after the greeting
  }

  function boot() {
    state = load();
    lastSeenBeforeOpen = state.lastSeen;
    bubble.holdUntil = now() + 1500;       // scene fades in first; any boot whisper (stage-up, greeting) follows
    catchUp();
    checkDay();
    applyTextSize();
    applyMotion();
    vfx('init');
    applyFx();
    applySound();                          // also arms the one-shot pointerdown unlock — boot is
                                           // not a gesture, so the first tap anywhere is what
                                           // gives audio.js its context for BGM to share
    if (rmQuery && rmQuery.addEventListener) rmQuery.addEventListener('change', applyMotion);
    else if (rmQuery && rmQuery.addListener) rmQuery.addListener(applyMotion);

    updateSky();
    renderScene();
    checkUnlocks();

    wireHold(); wireTap(); wireSit(); wireSheets(); wireConfirm();
    wireMood(); wireWhisperList(); wirePressed(); wireGather(); wireSeeds(); wireSettings();

    on(document, 'pointerdown', pokeIdle, { passive: true });
    pokeIdle();

    if (!state.onboarded) startOnboarding();
    else setTimeout(firstWhisper, 1500);
    if (!storageOK) { storageWarned = true; setTimeout(function () { sayId('storage_fail'); }, state.onboarded ? 4000 : 9000); }

    setInterval(tick, 1000);
    setInterval(function () { if (!document.hidden) renderScene(); }, 5000);   // visibilitychange re-renders on return
    setInterval(updateSky, 60000);
    setInterval(function () { if (isBloomed() && state.plantId === 'bean' && !document.hidden && !isRM() && hasPlants()) safe(function () { window.Plants.petalDrift($('fx'), state.plantId); }); }, 8000);

    on(document, 'visibilitychange', function () {
      if (document.hidden) {
        document.body.classList.add('hidden');
        endHold();
        if (sit.open) endSit();              // breaths are only counted while the player is present
        saveNow();
        snd('suspend');
        bgm('suspend');
      } else {
        document.body.classList.remove('hidden');
        lastSeenBeforeOpen = state.lastSeen;
        tick();
        if (checkDay()) { setTimeout(firstWhisper, 1200); }
        updateSky();
        renderAll();
        snd('resume');
        bgm('resume');
        bgm('setIntensity', bgmIntensity());
      }
    });
    on(window, 'pagehide', saveNow);
    on(window, 'beforeunload', saveNow);

    if (/^https?:/.test(location.protocol) && 'serviceWorker' in navigator) {
      try { navigator.serviceWorker.register('sw.js').catch(function () { /* optional */ }); } catch (e) { /* optional */ }
    }
    save();
  }

  /* debug surface (unit tests; harmless in production) */
  window.__sumgyeol = {
    advance: advance, stageOf: stageOf, stageT: stageT, THRESH: THRESH,
    state: function () { return state; },
    setState: function (fn) { safe(function () { var r = fn(state); if (r && typeof r === 'object') state = r; renderAll(); save(); }); },
    setHour: function (h) { debugHour = (typeof h === 'number' && isFinite(h)) ? h : null; updateSky(); renderScene(); },
    say: say, sayId: sayId, render: renderAll, renderAll: renderAll, updateSky: updateSky, skyMood: skyMood,
    fx: function () { return window.SceneFX; }, bgm: function () { return window.BGM; }
  };

  function start() { try { boot(); } catch (e) { if (window.console) console.error('[sumgyeol] boot failed', e); } }
  if (document.readyState === 'loading') on(document, 'DOMContentLoaded', start);
  else start();
})();
