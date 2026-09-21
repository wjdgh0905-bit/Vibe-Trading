/* 숨결 화분 — bgm.js
 * window.BGM: the generative ambient music layer. Sound effects live in audio.js and carry
 * every interaction; this file only paints the room behind them. Like Sound, everything here
 * is optional polish — every public function is a silent no-op until enabled AND unlocked,
 * and nothing ever throws (all bodies are try/catch'd).
 *
 * Load order in index.html: plants → whispers → audio → **bgm** → app.
 * (Later than audio.js so the SFX sidechain in §duck can decorate window.Sound at unlock;
 *  a wrong order degrades to "no ducking", never to a crash — see attachSfxSidechain.)
 *
 * Wiring, as it stands in app.js. Every call goes through app.js's bgm() helper (which swallows a
 * missing module), and 배경 음악 is nested under 소리, so bgmOn() is `settings.sound && settings.bgm`:
 *   BGM.setEnabled(bgmOn())      // boot() and applySound(): at load, and on either toggle.
 *                                // Self-sufficient — it opens (or borrows) the context itself, so a
 *                                // toggle flipped on long after the app's one unlock() still plays.
 *   BGM.unlock()                 // inside a user gesture (pointerdown / toggle click). Belt and
 *                                // braces only: setEnabled(true) and this file's own capture-phase
 *                                // pointerdown listener recover a session without it.
 *   BGM.suspend() / BGM.resume() // visibilitychange hidden / visible
 *   BGM.setMood(band, { weather: mood, nightness: n, stage: s }) // end of updateSky(), and onStageUp()
 *   BGM.setIntensity(bgmIntensity())   // 1 idle · 0.55 while pouring · 0.45 while sitting (함께 앉기),
 *                                // recomputed at every edge (beginPour / endHold, the sit open and
 *                                // close paths, visibilitychange) — recomputed, never pushed and popped
 *   BGM.accent('stage'|'gather'|'water')                         // alongside the matching SFX
 *   BGM.setMood(band, { ... stage: 0 })                          // explicitly, at replant — see accent('gather')
 *   BGM.isEnabled() / BGM.isAvailable()  // the player's toggle, and whether a context could be opened
 *                                // at all. A settings row reading ON while isAvailable() is false is
 *                                // claiming music from a module that can never make a sound.
 *
 * The context: audio.js owns the page's AudioContext once it has one, and this file borrows it
 * through Sound.__ctx() rather than opening a second — iOS caps concurrent contexts, and a
 * `new AudioContext()` that throws would leave the music dead for the whole session. Only a context
 * this file opened itself (Sound had none yet) is ever suspended here, and none is ever closed.
 *
 * The music: one white-key collection all day, a drone whose root walks F → C → A → D with the
 * sun, a 3–4 voice pad that changes chord every 50–66 s by moving one or two voices a step, a
 * band-limited air layer strictly above 900 Hz (so it can never mask the pour, which is
 * lowpassed at 900), and — from 줄기 onward, in daylight only — a music box playing short
 * composed contours whose pitches are resolved against whatever chord is underneath.
 * No tempo, no bar line, no cadence: the plant's breath is the only grid, and it is locked to
 * the same Date.now() % cycle that Sound.pourPhase() uses.
 *
 * The seven harmony rules every voicing below obeys. Breaking one breaks the guarantee that
 * every Sound effect is consonant with whatever is sounding, at any instant:
 *   1. The drone owns the root; the pad plays only upper structure.
 *   2. Pad range is F3(53) … A4(69) — the chime register C5–B5 stays permanently clear.
 *   3. No minor 2nd and no tritone between sustained pad voices (M2 allowed above A3).
 *   4. Common tones are never retriggered — only voices that move are released and re-attacked.
 *   5. Voice motion ≤ 2 semitones, except one voice per change may move 3 when planing.
 *   6. No V chord, ever. Nothing resolves.
 *   7. No leading tone in a sustained voice (the day pad is pentatonic for exactly this).
 * And the rule underneath all of them: **no accidental appears in any voice, in any band, at any
 * hour.** White keys only. That is what makes C5+G5, E5+B5, C4+G4 and 660 Hz consonant by
 * construction rather than by luck.
 */
(function () {
  'use strict';

  /* ═══════════════════════════ 1. constants ═══════════════════════════ */

  /* Calibrated by ear, which is what the design said this constant was waiting for.
     At 0.050 the realised bed measured peak 0.0047 / rms 0.0014 — about -57 dBFS,
     inaudible on a phone speaker in any real room. The whole mix was scaled the
     same way: audio.js MASTER_GAIN moved 0.12 -> 2.2 in the same pass, so the
     ratio the headroom table protects (music under the sound effects) is intact
     — the music just stopped being 30 dB under the floor of hearing too. */
  var BGM_MASTER = 1.80;
  var XFADE_S = 8.0, XFADE_NIGHT_S = 12.0;
  var SCHED_MS = 200, HORIZON_S = 1.2, RESYNC_GAP_S = 5.0;
  var DUCK_FLOOR = 0.30;
  var MIN_ATTACK = 0.02;         // audio.js's house rule: no amplitude attack under 20 ms
  var USE_CONVOLVER = false;     // an FDN is cheaper, its tail is an AudioParam, and it can be killed in 100 ms
  /* The runaway valve (§15.4): above this, evaluateSlot refuses melody and accents for a chord,
   * so a leak thins the texture instead of crashing. MEASURED steady state in this build, with
   * every node counted (the design's ~122 estimate omits the per-voice dry/send pairs, the stage
   * gates and the pad/melody bus filters): 95 at stage 0, 156 at stage 5 high tier, ~119 lean,
   * about 205 mid-crossfade with two voice sets alive, +8 per melody tail, +24 for a three-note
   * accent. 130 sat *below* the ordinary stage-5 graph and silenced the melody permanently. */
  var NODE_CAP = 280;

  var BANDS = {
    morning: { drone: [41, 53, 60], lowPad: [53, 60], cut: 1500, slots: 22,
               chords: ['Mx', 'My'], home: 'Mx', rt60: 3.2, dampF: 1.10, mel: 'phrase' },
    day:     { drone: [36, 48, 55], lowPad: [48, 55], cut: 1400, slots: 20,
               chords: ['Dx', 'Dy', 'Dx', 'Dz'], home: 'Dx', rt60: 2.8, dampF: 1.15, mel: 'phrase' },
    evening: { drone: [45, 57, 64], lowPad: [57, 64], cut: 1150, slots: 21,
               chords: ['Ex', 'Ey', 'Ex', 'Ew'], home: 'Ex', rt60: 3.8, dampF: 0.90, mel: 'phrase' },
    night:   { drone: [38, 50, 57], lowPad: [50, 57], cut: 850, slots: 22,
               chords: ['Nx', 'Ny'], home: 'Nx', rt60: 4.6, dampF: 0.70, mel: 'walk' }
  };

  var CHORDS = {
    Mx: [57, 60, 64, 67], My: [59, 62, 64, 67], Mz: [57, 62, 64, 67],
    Dx: [62, 64, 67, 69], Dy: [62, 65, 67, 69], Dz: [60, 64, 67, 69], Dr: [62, 67, 69],
    Ex: [60, 64, 67, 69], Ey: [60, 65, 67, 69], Ew: [59, 62, 64, 67], Ez: [60, 62, 67, 69],
    Nx: [53, 60, 64], Ny: [55, 59, 64], Nz: [55, 60, 64], Nr: [53, 60],
    Gg: [59, 64, 67]
  };
  // B3 is the one tritone in the whole design (Lydian ♯11 over the F drone). Two octaves up and
  // 22 % quieter it reads as light rather than as a clash; it vanishes entirely in cloud and rain.
  var SOFT = { 59: 0.78 };

  var POOLS = {
    Mx: [69, 72, 76, 79, 81, 84], My: [74, 76, 79, 81, 83, 86], Mz: [74, 76, 79, 81, 86],
    Dx: [67, 69, 72, 74, 76, 79, 81], Dy: [67, 69, 72, 74, 77, 79, 81],
    Dz: [69, 72, 76, 79, 81], Dr: [67, 69, 74, 79, 81],
    Ex: [69, 72, 76, 79, 81], Ey: [69, 72, 77, 79, 81], Ew: [74, 76, 79, 81, 83], Ez: [69, 72, 74, 79, 81],
    Nx: [69, 72, 74, 77, 81], Ny: [74, 76, 79, 81, 83], Nz: [72, 74, 76, 79, 81], Nr: [69, 72, 74, 77],
    Gg: [72, 76, 79, 81, 83]
  };

  // cloud/rain substitutions. My→Mz and Ey→Ez from cloud up; Dx→Dr and Nx→Nr in rain only;
  // Ny→Nz once nightness ≥ 0.75 (deep night loses every third, major and minor alike).
  var SUB_WET = { My: 'Mz', Ey: 'Ez' };
  var SUB_RAIN = { My: 'Mz', Ey: 'Ez', Dx: 'Dr', Nx: 'Nr' };

  var WEATHER = {
    clear: { cut: 1.00, air: 1.00, airHz: 2400, mel: 1.00, dec: 1.00, damp: 2800, rt: 0.00, send: 1.00 },
    cloud: { cut: 0.86, air: 1.30, airHz: 1700, mel: 0.85, dec: 1.10, damp: 2100, rt: 0.25, send: 1.08 },
    rain:  { cut: 0.72, air: 1.60, airHz: 1250, mel: 0.60, dec: 1.25, damp: 1600, rt: 0.50, send: 1.18 }
  };

  // Mutually near-prime in samples at both 44.1 and 48 kHz: no flutter echo, no comb pile-up.
  var COMB_D = [0.0611, 0.0731, 0.0869, 0.1031];
  var COMB_PAN = [-0.70, 0.70, -0.70, 0.70];
  var ALLPASS = [{ d: 0.00587, g: 0.70 }, { d: 0.01319, g: 0.60 }];

  var SEND = { drone: 0.18, pad: 0.55, low: 0.35, air: 0.00, mel: 0.75, halo: 0.85 };
  var DRY = { drone: 1.00, pad: 0.85, low: 0.90, air: 1.00, mel: 0.55, halo: 0.25 };
  var PEAK = { drone: 0.055, padNote: 0.021, lowNote: 0.024, air: 0.010,
               mel: 0.030, haloA: 0.010, haloB: 0.007,
               accStage: 0.042, accGather: 0.038, accWater: 0.020 };

  var PAD_PAN = { 4: [-0.55, -0.183, 0.183, 0.55], 3: [-0.55, 0, 0.55], 2: [-0.40, 0.40] };

  // [melOffset in units of cycle/16, idxDelta from the phrase anchor, velocity]
  var PHRASES = {
    F1: [[0, 0, 0.78], [2, 1, 0.62], [4, 2, 0.84], [7, 1, 0.58]],
    F2: [[0, 1, 0.74], [1, 2, 0.58], [3, 1, 0.70], [6, 0, 0.62], [9, -1, 0.56]],
    F3: [[0, 2, 0.80], [3, 1, 0.64], [5, 0, 0.70], [9, -1, 0.54]],
    F4: [[0, 0, 0.72], [5, 2, 0.56]],
    F5: [[0, 2, 0.70], [1, 1, 0.54], [2, 0, 0.64], [8, 1, 0.58]],
    F6: [[0, 1, 0.66]]
  };
  var PHRASE_W = {
    morning: { F1: 0.26, F2: 0.22, F3: 0.12, F4: 0.16, F5: 0.14, F6: 0.10 },
    day:     { F1: 0.20, F2: 0.24, F3: 0.10, F4: 0.16, F5: 0.20, F6: 0.10 },
    evening: { F1: 0.08, F2: 0.16, F3: 0.34, F4: 0.18, F5: 0.06, F6: 0.18 },
    night:   { F1: 0.08, F2: 0.16, F3: 0.34, F4: 0.18, F5: 0.06, F6: 0.18 }
  };

  /* ═══════════════════════════ 2. module state ═══════════════════════════ */

  var enabled = false;           // the player's toggle; survives everything, even `dead`
  var dead = false;              // no AudioContext available/constructible — permanent no-op
  var ctx = null;
  var ownCtx = false;            // false when the context was borrowed from audio.js (never park it)
  var G = null;                  // the persistent graph (buses, reverb, air, master chain)
  var sets = [];                 // live band voice sets; 1 normally, 2 during a crossfade
  var active = null;             // the set that owns the chord clock
  var schedTimer = 0;
  var running = false;
  var timers = [];               // every pending setTimeout, so teardown can cancel them all
  var lean = false;              // reduced voice tier (see §tier)
  var tierFloor = false;         // once the audio clock has slipped, never climb back this session

  var mood = { band: 'day', weather: 'clear', nightness: 0, stage: 0 };
  var moodKey = '';              // idempotence guard: updateSky() calls setMood ~1440×/day unchanged
  var intensity = 1;
  var rm = false;                // body.rm, re-read once per chord

  var cycle = 10.0, slotDur = 2.5, melDur = 0.625;
  var slotIndex = 0, nextSlotTime = 0;
  var chordCount = 0;            // chords since band start; drives the order-variation roll
  var restUntilSlot = -1, phrasesSinceRest = 0;
  var lastMelSlot = -99, lastMelTime = -99, melTails = 0, melPanSign = 1;
  var lastPhrase = '', prevPhrase = '';
  var anchor = 2, walkIdx = 2, contourRun = 0, contourDir = 0;
  var pulseCycle = [-9, -9, -9, -9], pulseRun = [0, 0, 0, 0];
  var liveNodes = 0;

  var xfading = false, pendingBand = '';
  var ducks = { pour: 1, chime: 1, pad: 1 }, chimeToken = 0;
  var accentAt = { stage: -99, gather: -99, water: -99 };
  var waterBoostUntil = 0;
  var restMul = 1;               // padLP multiplier during the deep-rest window

  var rndPitch, rndRhythm, rndSpace, rndForm;

  var jitterHist = [], driftRef = null;

  /* ═══════════════════════════ 3. utils ═══════════════════════════ */

  function noop() {}
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function clamp01(x) { x = Number(x); return x !== x ? 0 : x < 0 ? 0 : x > 1 ? 1 : x; }
  function now() { return ctx ? ctx.currentTime : 0; }
  function quiet(p) { if (p && typeof p.then === 'function') p.then(noop, noop); }
  function midiHz(m) { return 440 * Math.pow(2, (m - 69) / 12); }

  // mulberry32 / FNV-1a: the same shapes app.js uses, copied because app.js does not export them.
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

  function seedStreams() {
    var seed = (Date.now() >>> 0) ^ 0x9E3779B9;
    // QA affordance (not API): #bgmseed=123 makes a session reproducible for listening tests.
    try {
      var m = String(location.hash || '').match(/bgmseed=(\d+)/);
      if (m) seed = parseInt(m[1], 10) >>> 0;
    } catch (e) {}
    // Four independent streams: one shared stream correlates pitch with rhythm with pan,
    // and the music audibly clumps.
    rndPitch = mulberry32(seed ^ 0x1A2B3C);
    rndRhythm = mulberry32(seed ^ 0x4D5E6F);
    rndSpace = mulberry32(seed ^ 0x708192);
    rndForm = mulberry32(seed ^ 0xA3B4C5);
  }

  function later(fn, ms) {
    var id = setTimeout(function () {
      for (var i = 0; i < timers.length; i++) if (timers[i] === id) { timers.splice(i, 1); break; }
      try { fn(); } catch (e) {}
    }, ms);
    timers.push(id);
    return id;
  }
  function clearTimers() { for (var i = 0; i < timers.length; i++) clearTimeout(timers[i]); timers.length = 0; }

  /* node factory — every node passes through here so liveNodes is honest */
  function gain(v) { var n = ctx.createGain(); n.gain.value = v; liveNodes++; return n; }
  function biq(type, f, q) {
    var n = ctx.createBiquadFilter();
    n.type = type; n.frequency.value = f; if (q != null) n.Q.value = q;
    liveNodes++; return n;
  }
  function delay(maxS, d) { var n = ctx.createDelay(maxS); n.delayTime.value = d; liveNodes++; return n; }
  function osc(type, f, cents) {
    var n = ctx.createOscillator();
    n.type = type; n.frequency.value = f; if (cents) n.detune.value = cents;
    liveNodes++; return n;
  }
  // StereoPanner only. PannerNode is a 3D spatialiser with its own distance model and would put
  // an HRTF-ish colour on a pad that is supposed to be invisible — mono is the better failure.
  function panner(p) {
    if (!ctx.createStereoPanner) return null;
    var n = ctx.createStereoPanner(); n.pan.value = clamp(p, -1, 1); liveNodes++; return n;
  }
  function chain(a, b) { if (a && b) a.connect(b); return b || a; }

  function killNodes(list) {
    if (!list) return;
    for (var i = 0; i < list.length; i++) {
      var n = list[i];
      if (!n) continue;
      try { if (n.stop) n.stop(); } catch (e) {}
      try { n.disconnect(); } catch (e) {}
      liveNodes--;
    }
    list.length = 0;
  }

  // Smooth release from whatever the param currently is. cancelAndHoldAtTime keeps the running
  // ramp's value; without it setTargetAtTime gets us the same shape without needing to read it.
  function rampDown(param, tR, dur, floor) {
    try {
      if (param.cancelAndHoldAtTime) {
        param.cancelAndHoldAtTime(tR);
        param.exponentialRampToValueAtTime(floor || 0.0001, tR + dur);
      } else {
        param.cancelScheduledValues(tR);
        param.setTargetAtTime(floor || 0.0001, tR, dur / 3);
      }
    } catch (e) {}
  }
  // The same cancelAndHoldAtTime-first shape as rampDown, for the same reason: cancelScheduledValues
  // drops a ramp in flight *and* reverts the param to the setValueAtTime that started it. Re-enabling
  // inside the 1.2 s disable fade would then restore full gain in one render quantum instead of over
  // the ≈ 4 s this function promises. Holding first makes the new target start from wherever the
  // fade actually got to. The cancel gets its own try so a refused hold still leaves a working ramp.
  function toward(param, v, t, tau) {
    try {
      if (param.cancelAndHoldAtTime) param.cancelAndHoldAtTime(t);
      else param.cancelScheduledValues(t);
    } catch (e) { try { param.cancelScheduledValues(t); } catch (e2) {} }
    try { param.setTargetAtTime(v, t, tau); } catch (e) {}
  }

  /* ═══════════════════════════ 4. the room — FDN reverb ═══════════════════════════ */

  /* A feedback delay network, not a convolver. Four of six voices have attacks of 4.5–14 s, so
   * there are no transients for convolution's early reflections to reflect; meanwhile an IR
   * costs ~1.7 MB resident and a hard buffer swap whenever the room changes. Here the tail is an
   * AudioParam, so the room itself crossfades between bands — and setEnabled(false) can kill a
   * 4.6 s tail in 100 ms by zeroing the feedback, which a convolver simply cannot do. */
  function buildReverb() {
    var r = { combs: [], nodes: [] };
    r.input = gain(1.0);
    r.pre = delay(0.2, 0.040);
    r.hp = biq('highpass', 60, 0.5);          // the sub never enters the tail
    r.sum = gain(1.0);
    chain(r.input, r.pre); chain(r.pre, r.hp);

    var n = lean ? 2 : 4;
    var idx = lean ? [0, 3] : [0, 1, 2, 3];
    for (var i = 0; i < n; i++) {
      var k = idx[i];
      var c = {};
      c.inp = gain(lean ? 0.50 : 0.25);       // n combs summing to unit gain
      c.dly = delay(0.5, COMB_D[k]);
      c.damp = biq('lowpass', 2800, 0.3);     // HF decays faster than LF — that is what makes it a room
      c.fb = gain(0.85);
      c.d = COMB_D[k];
      chain(r.hp, c.inp); chain(c.inp, c.dly);
      chain(c.dly, c.damp); chain(c.damp, c.fb); chain(c.fb, c.inp);
      if (!lean) { c.pan = panner(COMB_PAN[k]); }
      if (c.pan) { chain(c.dly, c.pan); chain(c.pan, r.sum); } else chain(c.dly, r.sum);
      r.combs.push(c);
    }

    // Schroeder allpasses: w[n] = x[n] + g·w[n−N], y[n] = −g·w[n] + w[n−N]. A BiquadFilter of
    // type 'allpass' is a 2nd-order phase filter and does not diffuse — this has to be built.
    var src = r.sum;
    var aps = lean ? [ALLPASS[0]] : ALLPASS;
    for (var j = 0; j < aps.length; j++) {
      var a = {};
      a.inp = gain(1.0); a.dly = delay(0.1, aps[j].d);
      a.fb = gain(aps[j].g); a.ff = gain(-aps[j].g); a.out = gain(1.0);
      chain(src, a.inp); chain(a.inp, a.dly);
      chain(a.dly, a.fb); chain(a.fb, a.inp);
      chain(a.dly, a.out);
      chain(a.inp, a.ff); chain(a.ff, a.out);
      r.nodes.push(a.inp, a.dly, a.fb, a.ff, a.out);
      src = a.out;
    }

    r.wetHP = biq('highpass', 180, 0.5);
    r.wetLP = biq('lowpass', 5500, 0.4);
    r.out = gain(0.62);
    chain(src, r.wetHP); chain(r.wetHP, r.wetLP); chain(r.wetLP, r.out);
    return r;
  }

  function applyReverb(t, tau) {
    if (!G || !G.rev) return;
    var b = BANDS[mood.band] || BANDS.day, w = WEATHER[mood.weather] || WEATHER.clear;
    var rt = b.rt60 + w.rt + 0.8 * mood.nightness;
    var damp = w.damp * b.dampF * (1 - 0.25 * mood.nightness);
    var i, c;
    for (i = 0; i < G.rev.combs.length; i++) {
      c = G.rev.combs[i];
      // −60 dB after RT60 seconds, clamped: the loop gain can never reach unity, and the in-loop
      // lowpass only ever reduces it further.
      var g = Math.min(0.94, Math.pow(10, -3 * c.d / rt));
      toward(c.fb.gain, g, t, tau);
      toward(c.damp.frequency, damp, t, tau);
    }
    toward(G.rev.pre.delayTime, mood.nightness >= 0.5 ? 0.060 : 0.040, t, tau);
  }

  /* ═══════════════════════════ 5. the persistent graph ═══════════════════════════ */

  function buildGraph() {
    G = { nodes: [] };

    G.dryBus = gain(1.0);
    G.wetBus = gain(1.0);
    G.sumBus = gain(1.0);
    G.duck = gain(1.0);                       // SFX sidechain — one concern, its own stage
    G.intens = gain(1.0);                     // app-driven energy — its own stage
    G.tilt = biq('highshelf', 3500, 0.7); G.tilt.gain.value = 0;
    G.hpf = biq('highpass', 42, 0.5);
    G.master = gain(0.0001);                  // enable / suspend — its own stage
    /* A safety brickwall at full scale, and nothing else. DynamicsCompressorNode applies an
     * implicit makeup gain derived from its threshold — with threshold -24 / ratio 8 Chrome hands
     * back about +12 dB, which measured as the limiter, not bgmMaster, setting the output level,
     * and by a browser-dependent amount. Threshold 0 with no knee makes the makeup unity, so this
     * node is a straight wire until something would actually clip. The music peaks near -46 dBFS;
     * this exists only to catch stage 5 + a band crossfade + accent('stage') in the same 20 ms. */
    G.limiter = ctx.createDynamicsCompressor(); liveNodes++;
    try {
      G.limiter.threshold.value = 0; G.limiter.knee.value = 0; G.limiter.ratio.value = 12;
      G.limiter.attack.value = 0.005; G.limiter.release.value = 0.25;
    } catch (e) {}

    chain(G.dryBus, G.sumBus); chain(G.wetBus, G.sumBus);
    chain(G.sumBus, G.duck); chain(G.duck, G.intens); chain(G.intens, G.tilt);
    chain(G.tilt, G.hpf); chain(G.hpf, G.master); chain(G.master, G.limiter);
    G.limiter.connect(ctx.destination);

    G.rev = buildReverb();
    chain(G.rev.out, G.wetBus);

    /* per-voice buses: one dry tap and one send tap each (§sends) */
    function voiceBus(name, hasSend) {
      var b = { in: gain(1.0), dry: gain(DRY[name]) };
      chain(b.in, b.dry); chain(b.dry, G.dryBus);
      if (hasSend) { b.send = gain(SEND[name]); chain(b.in, b.send); chain(b.send, G.rev.input); }
      return b;
    }

    // Drone and low pad each get their own ducked gain, ramped together as one spectral stage:
    // the pour is pink noise under 900 Hz, so the bass is what it actually masks.
    G.subDuckDrone = gain(1.0);
    G.subDuckLow = gain(1.0);

    G.droneBus = gain(1.0);
    G.droneLP = biq('lowpass', 620, 0.4);     // triangles keep the fundamental and a whisper of the 3rd
    G.droneBreath = gain(0.94);
    G.drone = voiceBus('drone', true);
    chain(G.droneBus, G.droneLP); chain(G.droneLP, G.droneBreath);
    chain(G.droneBreath, G.subDuckDrone); chain(G.subDuckDrone, G.drone.in);

    G.padBus = gain(1.0);
    G.padGate = gain(0.0001);                 // stage 0 has no pad at all
    G.padLP = biq('lowpass', 1400, 0.55);
    G.padBreath = gain(0.82);
    G.pad = voiceBus('pad', true);
    chain(G.padBus, G.padGate); chain(G.padGate, G.padLP);
    chain(G.padLP, G.padBreath); chain(G.padBreath, G.pad.in);

    G.lowBus = gain(1.0);
    G.lowGate = gain(0.0001);
    G.low = voiceBus('low', true);
    chain(G.lowBus, G.lowGate); chain(G.lowGate, G.subDuckLow); chain(G.subDuckLow, G.low.in);

    G.haloBus = gain(1.0);
    G.haloGate = gain(0.0001);
    G.halo = voiceBus('halo', true);
    chain(G.haloBus, G.haloGate); chain(G.haloGate, G.halo.in);

    G.melBus = gain(1.0);
    G.melHP = biq('highpass', 180, 0.5);      // the melody stays entirely out of the pour's band
    G.melLP = biq('lowpass', 5200, 0.6);
    G.melLift = gain(1.0);                    // the other half of the spectral duck: up, not down
    G.mel = voiceBus('mel', true);
    chain(G.melBus, G.melHP); chain(G.melHP, G.melLP); chain(G.melLP, G.melLift);
    chain(G.melLift, G.mel.in);

    buildAir();
    buildBreathLFO();
    applyReverb(now(), 0.01);
    applyBandParams(now(), 0.01);
    applySends(now(), 0.01);
  }

  /* ── air (stage 2+) ─────────────────────────────────────────────────
   * The 900 Hz highpass is a masking decision, not a taste one: startPour is noise lowpassed at
   * 900 and roomTone at 400, so keeping the music's only noise voice strictly above 900 means it
   * occupies a disjoint band from both. Nothing the music does can mask the water. */
  function buildAir() {
    if (lean) { G.air = null; return; }       // the first thing the lean tier drops
    var secs = lean ? 2 : 3;
    var buf = makePinkNoise(ctx, secs);
    if (!buf) { G.air = null; return; }
    var a = {};
    a.src = ctx.createBufferSource(); liveNodes++;
    a.src.buffer = buf; a.src.loop = true;
    a.bp = biq('bandpass', 2400, 0.8);
    a.hp = biq('highpass', 900, 0.5);
    a.g = gain(0.004);
    a.gate = gain(0.0001);
    a.bus = { in: gain(1.0), dry: gain(DRY.air) };
    chain(a.src, a.bp); chain(a.bp, a.hp); chain(a.hp, a.g);
    chain(a.g, a.gate); chain(a.gate, a.bus.in); chain(a.bus.in, a.bus.dry);
    chain(a.bus.dry, G.dryBus);
    // 43 s is coprime with every other period in the piece, so the drift never lines up with
    // the breath, the chords, or the halo tremolos.
    a.lfo = osc('sine', 1 / 43);
    a.lfoG = gain(0.18 * 2400);
    chain(a.lfo, a.lfoG);
    try { a.lfoG.connect(a.bp.frequency); } catch (e) {}
    try { a.src.start(); a.lfo.start(); } catch (e) {}
    G.air = a;
  }

  // The same Paul Kellet economy filter audio.js uses, so the two noise layers are the same family.
  function makePinkNoise(ac, seconds) {
    try {
      var n = Math.floor(ac.sampleRate * seconds);
      var buf = ac.createBuffer(1, n, ac.sampleRate);
      var d = buf.getChannelData(0);
      var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, peak = 0, i, w;
      for (i = 0; i < n; i++) {
        w = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + w * 0.0555179;
        b1 = 0.99332 * b1 + w * 0.0750759;
        b2 = 0.96900 * b2 + w * 0.1538520;
        b3 = 0.86650 * b3 + w * 0.3104856;
        b4 = 0.55000 * b4 + w * 0.5329522;
        b5 = -0.7616 * b5 - w * 0.0168980;
        d[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362;
        b6 = w * 0.115926;
        if (d[i] > peak) peak = d[i]; else if (-d[i] > peak) peak = -d[i];
      }
      var k = peak > 0 ? 0.9 / peak : 1;
      for (i = 0; i < n; i++) d[i] *= k;
      return buf;
    } catch (e) { return null; }
  }

  /* ═══════════════════════════ 6. the breath clock ═══════════════════════════ */

  /* There is no tempo. The only grid is the plant's breath, and the LFO is phase-locked to
   * Date.now() — the same clock app.js's breathPhase() and Sound.pourPhase() run on — so the
   * music swells in step with the pour noise instead of merely at the same rate. */

  var breathWave = null;

  function makeBreathWave() {
    try {
      if (!ctx.createPeriodicWave) return null;
      var N = 512, H = 8, b = new Float32Array(N), i, u;
      for (i = 0; i < N; i++) {
        var t = i / N;
        if (t < 0.4) { u = t / 0.4; b[i] = (1 - Math.cos(Math.PI * u)) / 2; }
        else { u = (t - 0.4) / 0.6; b[i] = (1 + Math.cos(Math.PI * u)) / 2; }
      }
      // C¹-continuous at t = 0.4 and at the wrap, so there is no corner to alias on.
      var real = new Float32Array(H + 1), imag = new Float32Array(H + 1), dc = 0, k, n, a;
      for (n = 0; n < N; n++) dc += b[n];
      dc /= N;
      for (k = 1; k <= H; k++) {
        for (n = 0; n < N; n++) {
          a = 2 * Math.PI * k * n / N;
          real[k] += b[n] * Math.cos(a);
          imag[k] -= b[n] * Math.sin(a);
        }
        real[k] *= 2 / N; imag[k] *= 2 / N;
      }
      var w = ctx.createPeriodicWave(real, imag, { disableNormalization: true });
      return { wave: w, dc: dc };
    } catch (e) { return null; }
  }

  function dcSource(value) {
    if (ctx.createConstantSource) {
      var c = ctx.createConstantSource(); c.offset.value = value; liveNodes++; return c;
    }
    // No ConstantSourceNode: a looping buffer of 1.0 is the same thing with one more node.
    try {
      var buf = ctx.createBuffer(1, 128, ctx.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < 128; i++) d[i] = value;
      var s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; liveNodes++;
      return s;
    } catch (e) { return null; }
  }

  function buildBreathLFO() {
    G.breathMix = gain(1.0);
    G.lfos = [];
    G.taps = {};
    if (!breathWave) breathWave = makeBreathWave();
    spawnLFO(cycle, 1.0);
    // Each consumer gets its own scaling tap; depth ≤ ±22 % and only at breath rate, so no
    // parameter here can ever read as a filter sweep.
    G.taps.padGain = makeTap(0.18, G.padBreath.gain);
    G.taps.padCut = makeTap(0.22 * 1400, G.padLP.frequency);
    G.taps.drone = makeTap(0.06, G.droneBreath.gain);   // 0.94 static + 0.06 breath = a 6 % swell, felt not heard
    if (G.air) G.taps.air = makeTap(0.006, G.air.g.gain);
    applyBreathDepth();
  }

  function makeTap(base, param) {
    var g = gain(base);
    chain(G.breathMix, g);
    try { g.connect(param); } catch (e) {}
    return { node: g, base: base };
  }

  function spawnLFO(c, level) {
    var L = { c: c, nodes: [] };
    L.out = gain(level);
    if (breathWave) {
      L.osc = osc('sine', 1 / c);
      try { L.osc.setPeriodicWave(breathWave.wave); } catch (e) {}
      L.dc = dcSource(breathWave.dc);
    } else {
      // Fallback: a symmetric sine breath. Inaudibly different at these modulation depths.
      L.osc = osc('sine', 1 / c);
      L.half = gain(0.5);
      L.dc = dcSource(0.5);
    }
    var head = L.osc;
    if (L.half) { chain(L.osc, L.half); head = L.half; }
    chain(head, L.out);
    if (L.dc) chain(L.dc, L.out);
    chain(L.out, G.breathMix);

    // Start on the next Date.now() cycle boundary; until then the pad simply sits at its static
    // level. This is what locks the music's breath to Sound.pourPhase().
    var msIn = Date.now() % (c * 1000);
    var t0 = now() + (c * 1000 - msIn) / 1000;
    try { L.osc.start(t0); } catch (e) { try { L.osc.start(); } catch (e2) {} }
    if (L.dc) { try { L.dc.start(now()); } catch (e) {} }
    L.nodes.push(L.osc, L.out);
    if (L.half) L.nodes.push(L.half);
    if (L.dc) L.nodes.push(L.dc);
    G.lfos.push(L);
    return L;
  }

  // Cycle changes once or twice a day. Never change frequency on a running oscillator — that
  // shifts phase discontinuously; build a second LFO and crossfade the two contributions.
  function retuneBreath(newCycle) {
    if (!G || !G.lfos || !G.lfos.length) return;
    var t = now(), old = G.lfos[G.lfos.length - 1];
    if (Math.abs(old.c - newCycle) < 0.01) return;
    var next = spawnLFO(newCycle, 0.0001);
    toward(next.out.gain, 1.0, t, 2.6);
    toward(old.out.gain, 0.0001, t, 2.6);
    later(function () {
      for (var i = 0; i < G.lfos.length; i++) if (G.lfos[i] === old) { G.lfos.splice(i, 1); break; }
      killNodes(old.nodes);
    }, 8600);
  }

  // body.rm is a motion preference, not a mute: the music keeps playing, the movement stops.
  // accent('water') doubles the depth for two breaths on top of that.
  function breathMul() { return (rm ? 0.5 : 1) * (now() < waterBoostUntil ? 2.0 : 1); }

  function applyBreathDepth() {
    if (!G || !G.taps) return;
    var t = now();
    var mul = breathMul();
    var k;
    for (k in G.taps) {
      if (!G.taps[k]) continue;
      toward(G.taps[k].node.gain, G.taps[k].base * mul, t, 0.9);
    }
  }

  /* ═══════════════════════════ 7. sustained voices ═══════════════════════════ */

  function padVoiceScale(count) {
    var s = count >= 4 ? 0.86 : 1.00;         // growing 3 → 4 voices must add colour, not loudness
    if (mood.stage >= 5) s *= 1.19;           // +1.5 dB at 꽃
    return s;
  }

  function makePadNote(set, midi, when, panIdx, panCount) {
    var peak = PEAK.padNote * padVoiceScale(panCount) * (SOFT[midi] || 1);
    var f = midiHz(midi);
    var oA = osc('triangle', f, -5), gA = gain(0.62);
    var oB = osc('sawtooth', f, 5), gB = gain(0.26);   // harmonics 2–4 only under the LP: a body, never audible as a saw
    var env = gain(0.0001);
    var pans = PAD_PAN[panCount] || PAD_PAN[3];
    var p = panner((pans[panIdx] == null ? 0 : pans[panIdx]) * (rm ? 0.5 : 1));
    chain(oA, gA); chain(gA, env);
    chain(oB, gB); chain(gB, env);
    if (p) { chain(env, p); chain(p, set.padFade); } else chain(env, set.padFade);
    try {
      env.gain.setValueAtTime(0.0001, when);
      env.gain.linearRampToValueAtTime(peak, when + 4.5);
      env.gain.exponentialRampToValueAtTime(0.78 * peak, when + 7.5);
    } catch (e) {}
    try { oA.start(when); oB.start(when); } catch (e) {}
    var nodes = [oA, gA, oB, gB, env]; if (p) nodes.push(p);
    var note = {
      midi: midi, env: env, nodes: nodes, dead: false,
      release: function (tR, dur) {
        if (note.dead) return;
        note.dead = true;
        rampDown(env.gain, tR, dur);
        try { oA.stop(tR + dur + 0.5); oB.stop(tR + dur + 0.5); } catch (e) {}
      }
    };
    oA.onended = function () {
      try {
        for (var i = 0; i < set.notes.length; i++) if (set.notes[i] === note) { set.notes.splice(i, 1); break; }
      } catch (e) {}
      killNodes(nodes);
    };
    return note;
  }

  /* The low pad is the trunk (줄기 → 무성한 잎): a fixed root-and-fifth that does NOT follow the
   * chord. Holding it still is what makes the pad's one-semitone moves audible. The 480 Hz LP
   * puts it under the pad and above the drone — this is the voice that reads on a phone speaker
   * where 65–87 Hz simply does not. */
  function makeLowPad(set, when) {
    var mids = (BANDS[set.band] || BANDS.day).lowPad, out = [], i;
    for (i = 0; i < mids.length; i++) {
      var f = midiHz(mids[i]);
      var oA = osc('triangle', f, -4), gA = gain(0.70);
      var oB = osc('sine', f, 4), gB = gain(0.40);
      var env = gain(0.0001);
      var lp = biq('lowpass', 480, 0.7);
      var p = panner((i === 0 ? -0.25 : 0.25) * (rm ? 0.5 : 1));
      chain(oA, gA); chain(gA, env); chain(oB, gB); chain(gB, env);
      chain(env, lp);
      if (p) { chain(lp, p); chain(p, set.lowFade); } else chain(lp, set.lowFade);
      try {
        env.gain.setValueAtTime(0.0001, when);
        env.gain.linearRampToValueAtTime(PEAK.lowNote, when + 9.0);
      } catch (e) {}
      try { oA.start(when); oB.start(when); } catch (e) {}
      var nodes = [oA, gA, oB, gB, env, lp]; if (p) nodes.push(p);
      out.push({ env: env, nodes: nodes, oscs: [oA, oB] });
    }
    return out;
  }

  /* The halo (꽃) retunes by glide, never by retrigger: at this level a glide is a colour change,
   * where a retrigger would be an event, and the halo must never be an event. 71 and 89 are
   * coprime primes, so the pair of tremolos never repeats its combined shape for ~105 minutes. */
  function makeHalo(set, topMidi, when) {
    if (lean) return null;
    var h = { nodes: [] };
    h.a = osc('sine', midiHz(topMidi + 12));
    h.b = osc('sine', midiHz(topMidi + 19));
    h.ga = gain(0.0001); h.gb = gain(0.0001);
    h.pa = panner(-0.60 * (rm ? 0.5 : 1)); h.pb = panner(0.60 * (rm ? 0.5 : 1));
    chain(h.a, h.ga); chain(h.b, h.gb);
    if (h.pa) { chain(h.ga, h.pa); chain(h.pa, set.haloFade); } else chain(h.ga, set.haloFade);
    if (h.pb) { chain(h.gb, h.pb); chain(h.pb, set.haloFade); } else chain(h.gb, set.haloFade);
    try {
      h.ga.gain.setValueAtTime(0.0001, when);
      h.ga.gain.linearRampToValueAtTime(PEAK.haloA, when + 9.0);
      h.gb.gain.setValueAtTime(0.0001, when);
      h.gb.gain.linearRampToValueAtTime(PEAK.haloB, when + 9.0);
    } catch (e) {}
    if (!rm) {
      h.la = osc('sine', 1 / 71); h.lb = osc('sine', 1 / 89);
      h.lga = gain(0.5 * PEAK.haloA); h.lgb = gain(0.5 * PEAK.haloB);
      chain(h.la, h.lga); chain(h.lb, h.lgb);
      try { h.lga.connect(h.ga.gain); h.lgb.connect(h.gb.gain); } catch (e) {}
      try { h.la.start(when); h.lb.start(when); } catch (e) {}
      h.nodes.push(h.la, h.lb, h.lga, h.lgb);
    }
    try { h.a.start(when); h.b.start(when); } catch (e) {}
    h.nodes.push(h.a, h.b, h.ga, h.gb);
    if (h.pa) h.nodes.push(h.pa); if (h.pb) h.nodes.push(h.pb);
    h.retune = function (top, t) {
      try {
        h.a.frequency.exponentialRampToValueAtTime(midiHz(top + 12), t + 3.5);
        h.b.frequency.exponentialRampToValueAtTime(midiHz(top + 19), t + 3.5);
      } catch (e) {}
    };
    return h;
  }

  /* ── a whole band's voice set ───────────────────────────────────── */

  function makeSet(band, t0) {
    var B = BANDS[band] || BANDS.day;
    var set = { band: band, notes: [], chordId: B.home, order: B.chords.slice(), orderPos: 0, nodes: [] };

    set.padFade = gain(1.0); chain(set.padFade, G.padBus);
    set.lowFade = gain(1.0); chain(set.lowFade, G.lowBus);
    set.haloFade = gain(1.0); chain(set.haloFade, G.haloBus);
    set.nodes.push(set.padFade, set.lowFade, set.haloFade);

    // drone: sub + a ±3-cent octave pair + a fifth. The pair beats at 0.45–0.76 Hz depending on
    // the band — slow enough to read as breathing wood, never as tremolo.
    var fLow = midiHz(B.drone[0]);
    set.dMix = gain(1.0);
    set.dEnv = gain(0.0001);
    chain(set.dMix, set.dEnv); chain(set.dEnv, G.droneBus);
    set.gSub = gain(0.30);
    set.oSub = osc('sine', fLow);
    var o1 = osc('triangle', 2 * fLow, -3), g1 = gain(0.42);
    var o2 = osc('triangle', 2 * fLow, 3), g2 = gain(0.42);
    set.gFifth = gain(mood.stage >= 1 ? 0.22 : 0.0001);
    var o5 = osc('sine', 3 * fLow, 2);
    chain(set.oSub, set.gSub); chain(set.gSub, set.dMix);
    chain(o1, g1); chain(g1, set.dMix);
    chain(o2, g2); chain(g2, set.dMix);
    chain(o5, set.gFifth); chain(set.gFifth, set.dMix);
    set.droneOscs = [set.oSub, o1, o2, o5];
    set.nodes.push(set.dMix, set.dEnv, set.gSub, set.oSub, o1, g1, o2, g2, set.gFifth, o5);
    try { set.oSub.start(t0); o1.start(t0); o2.start(t0); o5.start(t0); } catch (e) {}
    try {
      set.dEnv.gain.setValueAtTime(0.0001, t0);
      set.dEnv.gain.linearRampToValueAtTime(PEAK.drone, t0 + 7.0);   // no decay: sustain forever
    } catch (e) {}

    set.low = makeLowPad(set, t0);
    set.chordId = subChord(B.home);
    voiceChord(set, set.chordId, t0, null);
    set.halo = makeHalo(set, topOf(set.chordId), t0);
    return set;
  }

  function topOf(id) { var c = CHORDS[id] || CHORDS.Dx; return c[c.length - 1]; }

  function subChord(id) {
    var w = mood.weather;
    var out = id;
    if (w === 'rain') out = SUB_RAIN[id] || id;
    else if (w === 'cloud') out = SUB_WET[id] || id;
    if (out === 'Ny' && mood.nightness >= 0.75) out = 'Nz';
    return out;
  }

  /* Rule 4 made concrete: held voices are not touched at all. Release (7 s) outlasts attack
   * (4.5 s), so two chords overlap for ~4.5 s with the common tones sustaining underneath —
   * effortless, correct voice leading, for free. */
  function voiceChord(set, id, when, relDur) {
    var next = CHORDS[id] || CHORDS.Dx;
    var maxV = (lean || set.band === 'night') ? 3 : 4;
    var target = next.slice();
    while (target.length > maxV) target.shift();       // thin from the bottom; the top carries the colour
    var i, j, held, note;
    for (i = set.notes.length - 1; i >= 0; i--) {
      note = set.notes[i];
      held = false;
      for (j = 0; j < target.length; j++) if (target[j] === note.midi) { held = true; break; }
      if (!held) note.release(when, relDur || 7.0);
    }
    for (j = 0; j < target.length; j++) {
      held = false;
      for (i = 0; i < set.notes.length; i++) if (set.notes[i].midi === target[j] && !set.notes[i].dead) { held = true; break; }
      // A voice keeps its pan for its whole life, so a held common tone never jumps channels.
      if (!held) set.notes.push(makePadNote(set, target[j], when, j, target.length));
    }
    set.chordId = id;
    if (set.halo) set.halo.retune(target[target.length - 1], when);
  }

  /* A departing band fades at ONE place per voice, with tau = dur/3 (§11.1 step 3).
   * Fading the set gain and the note envelopes together would multiply two exponentials and put
   * a hole in the middle of the crossfade — measured at −19 dB one second in, which is a dropout,
   * not a fade. The notes keep sustaining; destroySet() stops their oscillators afterwards. */
  function releaseSet(set, t0, dur) {
    var tau = dur / 3;
    toward(set.dEnv.gain, 0.0001, t0, tau);
    toward(set.padFade.gain, 0.0001, t0, tau);
    toward(set.lowFade.gain, 0.0001, t0, tau);
    toward(set.haloFade.gain, 0.0001, t0, tau);
  }

  function destroySet(set) {
    var i;
    for (i = 0; i < set.notes.length; i++) killNodes(set.notes[i].nodes);
    set.notes.length = 0;
    for (i = 0; i < set.low.length; i++) killNodes(set.low[i].nodes);
    set.low.length = 0;
    if (set.halo) { killNodes(set.halo.nodes); set.halo = null; }
    killNodes(set.nodes);
    for (i = 0; i < sets.length; i++) if (sets[i] === set) { sets.splice(i, 1); break; }
  }

  /* ═══════════════════════════ 8. the melody — 음악 상자 ═══════════════════════════ */

  /* osc2 at exactly 2.0× with +9 cents is a stretched octave — the defining inharmonicity of a
   * real tine comb, and the one number that makes this a music box rather than a sine. osc3 at
   * 5.4× is deliberately between the 5th and 6th partials and lives only in the attack: that,
   * and nothing else, is the metallic "ting". */
  function melNote(when, midi, vel, opt) {
    if (melTails >= (lean ? 2 : 4)) return;          // a 5th tail is skipped, never voice-stolen
    if (when < now() + 0.010) return;                // computed into the past: drop, never clamp
    opt = opt || {};
    var f = midiHz(midi);
    var peak = (opt.peak == null ? PEAK.mel : opt.peak) * vel * (opt.mul == null ? 1 : opt.mul);
    var dec = opt.decay == null
      ? clamp(3.6 * (WEATHER[mood.weather] || WEATHER.clear).dec * (1 + 0.35 * mood.nightness), 2.6, 6.5)
      : opt.decay;
    var o1 = osc('sine', f);
    var o2 = osc('sine', 2 * f, 9), g2 = gain(0.300);
    var o3 = osc('sine', 5.4 * f), g3 = gain(0.0001);
    var sum = gain(0.74);                            // (1.000 + 0.300 + 0.045) → 0.995: melEnv's peak IS the voice's peak
    var env = gain(0.0001);
    var p = panner(opt.pan == null ? panForMel() : opt.pan);
    chain(o1, sum); chain(o2, g2); chain(g2, sum); chain(o3, g3); chain(g3, sum);
    chain(sum, env);
    if (p) { chain(env, p); chain(p, G.melBus); } else chain(env, G.melBus);
    try {
      env.gain.setValueAtTime(0.0001, when);
      env.gain.linearRampToValueAtTime(peak, when + MIN_ATTACK);
      env.gain.exponentialRampToValueAtTime(0.0004, when + MIN_ATTACK + dec);
      var ting = Math.max(0.006, 0.045 - 0.023 * mood.nightness);
      g3.gain.setValueAtTime(ting, when);
      g3.gain.exponentialRampToValueAtTime(0.0002, when + 0.12);
    } catch (e) {}
    var stopAt = when + MIN_ATTACK + dec + 0.10;
    var nodes = [o1, o2, g2, o3, g3, sum, env]; if (p) nodes.push(p);
    var started = false;
    try {
      o1.start(when); o2.start(when); o3.start(when);
      o1.stop(stopAt); o2.stop(stopAt); o3.stop(stopAt);
      started = true;
    } catch (e) {}
    if (!started) { killNodes(nodes); return; }   // never leave a counted tail that will not end
    melTails++;
    o1.onended = function () { melTails--; killNodes(nodes); };
    lastMelTime = when;

    if (opt.sendBoost && G && G.mel && G.mel.send) {
      // accents ask for a wetter tail than the running send; ease back afterwards.
      toward(G.mel.send.gain, Math.min(0.95, opt.sendBoost), when, 0.4);
      later(function () { applySends(now(), 2.5); }, (dec + 1) * 1000);
    }
  }

  function panForMel() {
    // Successive notes alternate sides, so the centre stays clear for the SFX.
    melPanSign = -melPanSign;
    var mag = 0.15 + rndSpace() * 0.30;
    return melPanSign * mag * (rm ? 0.5 : 1);
  }

  function poolFor(id) {
    var p = POOLS[id] || POOLS.Dx;
    if (mood.nightness >= 0.6) {
      var out = [];
      for (var i = 0; i < p.length; i++) if (p[i] <= 79) out.push(p[i]);
      if (out.length >= 2) return out;
    }
    return p;
  }

  function melodyMode() {
    if (intensity <= 0.5) return 'silent';            // during 함께 앉기 the breath pad IS the music
    if (mood.stage < 3) return 'silent';
    if (mood.weather === 'rain') return 'walk';
    if (mood.band === 'night') return 'walk';
    if (mood.band === 'evening' && mood.weather === 'cloud') return 'walk';
    return (BANDS[mood.band] || BANDS.day).mel;
  }

  function pickPhrase(band) {
    var w = PHRASE_W[band] || PHRASE_W.day, keys = [], tot = 0, k;
    for (k in w) {
      if (k === lastPhrase || k === prevPhrase) continue;   // never repeat within two
      keys.push(k); tot += w[k];
    }
    if (!keys.length) { for (k in w) { keys.push(k); tot += w[k]; } }
    var r = rndForm() * tot, acc = 0;
    for (var i = 0; i < keys.length; i++) { acc += w[keys[i]]; if (r <= acc) return keys[i]; }
    return keys[keys.length - 1];
  }

  function stepAnchor(len, minD, maxD) {
    var r = rndPitch(), d = r < 0.36 ? -1 : r < 0.64 ? 0 : 1;
    if (d !== 0) {
      if (contourDir === d) contourRun++; else { contourDir = d; contourRun = 1; }
      if (contourRun >= 3) { d = -d; contourDir = d; contourRun = 1; }   // no audible scale runs
    }
    anchor += d;
    if (anchor + maxD >= len) anchor = len - 1 - maxD;
    if (anchor + minD < 0) anchor = -minD;
    anchor = clamp(anchor, 0, Math.max(0, len - 1));
  }

  function firePhrase(when) {
    var pool = poolFor(active.chordId), len = pool.length;
    var id = pickPhrase(mood.band);
    var ph = PHRASES[id], i, minD = 0, maxD = 0;
    for (i = 0; i < ph.length; i++) { if (ph[i][1] < minD) minD = ph[i][1]; if (ph[i][1] > maxD) maxD = ph[i][1]; }
    stepAnchor(len, minD, maxD);
    prevPhrase = lastPhrase; lastPhrase = id;

    var lastT = when, harm = mood.stage >= 5 && !lean, echo = mood.stage >= 4 && !lean;
    for (i = 0; i < ph.length; i++) {
      var jit = rm ? 0 : (rndSpace() * 0.18 - 0.09);
      var t = when + ph[i][0] * melDur + jit;
      var idx = clamp(anchor + ph[i][1], 0, len - 1);
      var vel = ph[i][2];
      var pan = panForMel();
      melNote(t, pool[idx], vel, { pan: pan });
      // Stage 5: a partner at pool index −2 is a 3rd, 4th or 5th below in a chord-tone pool —
      // structurally incapable of a dissonance.
      if (harm && vel >= 0.74 && idx - 2 >= 0) melNote(t + 0.025, pool[idx - 2], vel, { mul: 0.55, pan: -pan });
      lastT = t;
      if (i === ph.length - 1 && echo && rndRhythm() < 0.30) {
        // Quotes Sound.chime's two-notes-a-breath-apart shape, so music and SFX read as one family.
        melNote(t + 0.18 + rndRhythm() * 0.16, pool[idx], vel, { mul: 0.45, pan: -pan });
      }
    }
    var span = Math.ceil((lastT - when) / slotDur);
    lastMelSlot = slotIndex + span;
    phrasesSinceRest++;
  }

  function fireWalk(when) {
    var pool = poolFor(active.chordId), len = pool.length;
    var r = rndPitch(), step = r < 0.13 ? -2 : r < 0.44 ? -1 : r < 0.56 ? 0 : r < 0.87 ? 1 : 2;
    if (walkIdx >= len - 2 && step > 0) step = -step;    // registral gravity: the walk is stationary
    if (walkIdx <= 1 && step < 0) step = -step;
    if (step !== 0) {
      var d = step > 0 ? 1 : -1;
      if (contourDir === d) contourRun++; else { contourDir = d; contourRun = 1; }
      if (contourRun >= 3) { step = -step; contourDir = -d; contourRun = 1; }
    }
    walkIdx = clamp(walkIdx + step, 0, len - 1);
    melNote(when + (rm ? 0 : rndSpace() * 0.18 - 0.09), pool[walkIdx], 0.52 + rndRhythm() * 0.22, {});
    lastMelSlot = slotIndex;
  }

  /* ═══════════════════════════ 9. the lookahead scheduler ═══════════════════════════ */

  /* One setInterval scheduling WebAudio events ahead on ctx.currentTime. No rAF, no DOM reads
   * except document.hidden here and body.rm once per chord. 1.2 s of lookahead survives the
   * 1000 ms interval clamp a hidden tab imposes — and suspend() is the real guard anyway. */
  function tick() {
    try {
      if (!running || !ctx) return;
      measureJitter();
      if (document.hidden) return;
      var t = ctx.currentTime, guard = 0;
      if (t - nextSlotTime > RESYNC_GAP_S) {
        // Back from a throttle or a sleep. Fire NOTHING — never catch up. Without this a phone
        // that slept an hour schedules ~1400 queued events into one render quantum.
        nextSlotTime = t + 0.05;
        resyncSlotIndex();
        return;
      }
      while (nextSlotTime < t + HORIZON_S && guard++ < 32) {
        evaluateSlot(slotIndex, nextSlotTime);
        nextSlotTime += slotDur;
        slotIndex += 1;
      }
    } catch (e) {}
  }

  // slotIndex is absolute and monotonic while the scheduler runs, but this puts it back on the
  // Date.now() grid, i.e. into 0..3 — a fall of hundreds after a long session. lastMelSlot and
  // restUntilSlot are absolute slot numbers too, and evaluateSlot gates the melody on the distance
  // between them, so rebasing one without the others mutes the tune for as long as the session had
  // already been running. Shift them by the same delta (distances survive), then clamp: a gap is a
  // rest, not a debt — nothing carried across it may sit in the future of the new clock.
  function resyncSlotIndex() {
    var prev = slotIndex;
    slotIndex = Math.floor(((Date.now() % (cycle * 1000)) / 1000) / slotDur);
    var d = slotIndex - prev;
    lastMelSlot += d;
    restUntilSlot += d;
    if (lastMelSlot > slotIndex) lastMelSlot = slotIndex;      // ... so the melody waits 3 slots, not 300
    if (restUntilSlot > slotIndex) restUntilSlot = slotIndex;  // a deep rest does not outlive the gap
  }

  function evaluateSlot(i, when) {
    if (!active) return;
    var B = BANDS[active.band] || BANDS.day;
    // 22 slots x 2.5 s = 55 s (morning) ... 22 x 3.0 s = 66 s (night, whose slot is cycle/4 = 3.0).
    var perChord = Math.round(B.slots * (mood.weather === 'rain' && active.band === 'night' ? 1.6 : 1));
    if (i % perChord === 0) advanceChord(when);
    if (restUntilSlot > i) return;
    if (liveNodes > NODE_CAP) return;                  // the valve: a runaway thins the texture, it does not crash
    var mode = melodyMode();
    if (mode === 'silent') return;

    if (mode === 'phrase') {
      if (i % 2 !== 0) return;                         // roll once per half breath
      if (i - lastMelSlot < 3) return;                 // minimum gap after the previous phrase
      var p = 0.20 * (mood.stage >= 5 ? 1.30 : mood.stage === 4 ? 1.15 : 1.00)
        * (WEATHER[mood.weather] || WEATHER.clear).mel
        * (1 - 0.45 * mood.nightness) * intensity;
      if (rndRhythm() >= p) return;
      firePhrase(when);
      maybeRest(i, perChord);
    } else {
      if (i - lastMelSlot < 2) return;
      var k = i % 4;
      var cyc = Math.floor(i / 4);
      // Anti-pulse: at p ≈ 0.2 an accidental pulse is rare, and "rare" over an hour means
      // "it will happen". The hard rule is what prevents it.
      if (pulseCycle[k] === cyc - 1 && pulseRun[k] >= 2) return;
      var q = 0.16 * (mood.stage >= 5 ? 1.45 : mood.stage === 4 ? 1.25 : 1.00)
        * (WEATHER[mood.weather] || WEATHER.clear).mel
        * (1 - 0.45 * mood.nightness) * intensity;
      if (rndRhythm() >= q) return;
      if (pulseCycle[k] === cyc - 1) pulseRun[k]++; else pulseRun[k] = 1;
      pulseCycle[k] = cyc;
      fireWalk(when);
    }
  }

  /* The deep-rest valve: roughly every 4–7 minutes, a minute of near-silence. This is the
   * difference between ambient music and a wall. */
  function maybeRest(i, perChord) {
    if (phrasesSinceRest < 5 || rndForm() >= 0.5) return;
    phrasesSinceRest = 0;
    restUntilSlot = i + perChord * 2;
    restMul = 0.88;
    applyBandParams(now(), 1.4);
    later(function () { restMul = 1; applyBandParams(now(), 2.0); }, perChord * 2 * slotDur * 1000);
  }

  function advanceChord(when) {
    if (!active) return;
    try { rm = !!(document.body && document.body.classList.contains('rm')); } catch (e) {}
    applyBreathDepth();
    var B = BANDS[active.band] || BANDS.day;
    chordCount++;
    // Every 8 chords, swap the next two in the cycle: the 3–4 minute harmonic loop becomes
    // something whose period cannot be measured by ear. Reject a swap that repeats a chord.
    if (chordCount % 8 === 0 && rndForm() < 0.35 && active.order.length > 2) {
      var a = (active.orderPos + 1) % active.order.length, b = (active.orderPos + 2) % active.order.length;
      if (active.order[a] !== active.order[b]
        && active.order[b] !== active.order[active.orderPos]) {
        var tmp = active.order[a]; active.order[a] = active.order[b]; active.order[b] = tmp;
      }
    }
    active.orderPos = (active.orderPos + 1) % active.order.length;
    var id = subChord(active.order[active.orderPos]);
    if (id === active.chordId && active.order.length > 1) {
      active.orderPos = (active.orderPos + 1) % active.order.length;
      id = subChord(active.order[active.orderPos]);
    }
    var prevPool = poolFor(active.chordId);
    voiceChord(active, id, when, null);
    snapMelodyIndices(prevPool, id);
  }

  // On a chord change the melody snaps to the nearest member of the new pool: it appears to
  // resolve into the new harmony, and it is arithmetic. `prev` is the OUTGOING pool, captured
  // before voiceChord() rewrote set.chordId.
  function snapMelodyIndices(prev, id) {
    var pool = poolFor(id), i;
    walkIdx = nearest(pool, prev[clamp(walkIdx, 0, prev.length - 1)]);
    anchor = nearest(pool, prev[clamp(anchor, 0, prev.length - 1)]);
  }

  function nearest(pool, midi) {
    var best = 0, bd = 1e9, i, d;
    for (i = 0; i < pool.length; i++) { d = Math.abs(pool[i] - midi); if (d < bd) { bd = d; best = i; } }
    return best;
  }

  /* ═══════════════════════════ 10. parameters: band / weather / nightness / intensity ═══════ */

  function applyBandParams(t, tau) {
    if (!G) return;
    var B = BANDS[mood.band] || BANDS.day, W = WEATHER[mood.weather] || WEATHER.clear;
    var cut = B.cut * W.cut * (1 - 0.30 * mood.nightness) * (0.70 + 0.30 * intensity) * restMul;
    toward(G.padLP.frequency, 0.78 * cut, t, tau);
    if (G.taps && G.taps.padCut) {
      G.taps.padCut.base = 0.22 * cut;
      toward(G.taps.padCut.node.gain, G.taps.padCut.base * breathMul(), t, tau);
    }
    toward(G.tilt.gain, -2.5 * mood.nightness, t, tau);
    if (G.air) {
      toward(G.air.bp.frequency, W.airHz, t, tau);
      toward(G.air.lfoG.gain, 0.18 * W.airHz * (rm ? 0 : 1), t, tau);
      toward(G.air.g.gain, 0.004 * W.air, t, tau);
      if (G.taps && G.taps.air) {
        G.taps.air.base = 0.006 * W.air;
        toward(G.taps.air.node.gain, G.taps.air.base * breathMul(), t, tau);
      }
    }
  }

  function applySends(t, tau) {
    if (!G) return;
    var W = WEATHER[mood.weather] || WEATHER.clear;
    var k = W.send * (0.85 + 0.15 * intensity);
    function s(bus, base) {
      if (!bus || !bus.send) return;
      toward(bus.send.gain, Math.min(0.95, base * k + 0.12 * mood.nightness), t, tau);
    }
    s(G.drone, SEND.drone); s(G.pad, SEND.pad); s(G.low, SEND.low);
    s(G.mel, SEND.mel); s(G.halo, SEND.halo);
  }

  /* The six voices arrive one per growth stage across weeks — the one structural idea a player
   * can consciously notice, and only over that long. Nobody ever catches them arriving. */
  function applyStage(t, collapsing) {
    if (!G) return;
    var s = mood.stage, i;
    var up = 2.0, down = 3.0;                    // τ: 6 s in, 9 s out
    toward(G.padGate.gain, s >= 1 ? 1 : 0.0001, t, s >= 1 ? up : down);
    if (G.air) toward(G.air.gate.gain, s >= 2 ? 1 : 0.0001, t, s >= 2 ? 4.0 : down);
    toward(G.lowGate.gain, s >= 4 ? 1 : 0.0001, t, s >= 4 ? up : down);
    // Stage down thins the pad one voice at a time, top first, 1.5 s apart, so the collapse
    // reads as a composed ending rather than as a bug.
    if (s >= 5) toward(G.haloGate.gain, 1, t, up);
    else if (G.haloGate.gain.value > 0.01) toward(G.haloGate.gain, 0.0001, t, down);
    for (i = 0; i < sets.length; i++) toward(sets[i].gFifth.gain, s >= 1 ? 0.22 : 0.0001, t, up);
    if (collapsing && s === 0 && active) thinPadDown(t);
  }

  function thinPadDown(t) {
    var list = active.notes.slice().sort(function (a, b) { return b.midi - a.midi; });
    for (var i = 0; i < list.length; i++) {
      (function (note, k) { later(function () { note.release(now(), 9.0); }, k * 1500); })(list[i], i);
    }
  }

  /* ═══════════════════════════ 11. band crossfade ═══════════════════════════ */

  function switchBand(band) {
    if (!ctx || !G) { mood.band = band; return; }
    if (xfading) {
      // At most one crossfade in flight; latest pending wins; never build a third voice set.
      if (active && band !== active.band) pendingBand = band;
      else pendingBand = '';
      // mood.band is the band that has been *asked for*, not the one sounding: setMood compares
      // against it to decide whether a request is a band change at all. Leaving it stale here made
      // an A→B→A sequence inside one crossfade drop the third request and settle on B forever,
      // because moodKey had already advanced past it.
      mood.band = band;
      return;
    }
    if (active && active.band === band) return;
    xfading = true;
    var old = active;
    var xf = (band === 'night' || (old && old.band === 'night')) ? XFADE_NIGHT_S : XFADE_S;
    var t0 = now() + 0.05;

    var next = makeSet(band, t0);
    sets.push(next);
    active = next;
    mood.band = band;

    // Stagger the subs: the two sub-octaves never overlap. This is what keeps the night D2 →
    // morning F2 minor third from thickening the bass.
    try {
      next.gSub.gain.setValueAtTime(0.0001, t0);
      next.gSub.gain.setValueAtTime(0.0001, t0 + 4.0);
      next.gSub.gain.linearRampToValueAtTime(0.30, t0 + 10.0);
    } catch (e) {}
    if (old) {
      rampDown(old.gSub.gain, t0, 3.0);
      releaseSet(old, t0, xf);   // rampDown uses tau = dur/3, i.e. XFADE/3
      later(function () { destroySet(old); }, (xf + 0.5) * 1000);
    }

    // Two melodic voices at once is the one thing a crossfade must never produce.
    rampDown(G.melBus.gain, t0, 0.75);
    later(function () { toward(G.melBus.gain, 1.0, now(), 0.4); }, (xf * 0.5 + 0.3) * 1000);
    // The incoming band's first chord length is forced to rest: the tune goes quiet across the
    // transition and returns in the new band, which reads as intentional because it is.
    var B = BANDS[band] || BANDS.day;
    restUntilSlot = slotIndex + B.slots;

    applyBandParams(t0, 2.2);
    applySends(t0, 2.2);
    applyReverb(t0, 2.2);
    applyStage(t0);

    later(function () {
      xfading = false;
      if (pendingBand && pendingBand !== active.band) { var p = pendingBand; pendingBand = ''; switchBand(p); }
      else pendingBand = '';
    }, (xf + 0.6) * 1000);
  }

  /* ═══════════════════════════ 12. SFX sidechain ═══════════════════════════ */

  /* BGM shares audio.js's AudioContext when there is one (Sound.__ctx()), because iOS caps
   * concurrent contexts — but sharing a context says nothing about when a sound effect fires,
   * so BGM still learns that by decorating Sound non-destructively. No public API is added, no file is edited, and a missing
   * or late Sound degrades to "no ducking" rather than to a crash. tap() is deliberately NOT
   * wrapped: it is 100 ms long and fires constantly, and ducking on it would pump. */
  function attachSfxSidechain() {
    var S = window.Sound;
    if (!S || S.__bgmHook) return !!(S && S.__bgmHook);
    function wrap(k) {
      var orig = S[k];
      if (typeof orig !== 'function') return;
      S[k] = function () {
        var r;
        try { r = orig.apply(S, arguments); }
        finally { try { onSfx(k); } catch (e) {} }    // a duck must never break an SFX
        return r;
      };
    }
    wrap('startPour'); wrap('stopPour'); wrap('chime'); wrap('breathPad');
    S.__bgmHook = true;
    return true;
  }

  function applyDuck(t) {
    if (!G) return;
    var target = Math.max(DUCK_FLOOR, Math.min(ducks.pour, ducks.chime, ducks.pad));
    // setTargetAtTime only: a linear pull-down at these ratios has an audible corner, and a
    // release τ under ~0.5 s is heard as a compressor rather than as the room making space.
    toward(G.duck.gain, target, t, target < G.duck.gain.value ? 0.09 : 0.75);
  }

  function onSfx(kind) {
    if (!ctx || !G || !enabled) return;
    var t = now();
    if (kind === 'startPour') {
      ducks.pour = 0.55;
      toward(G.subDuckDrone.gain, 0.62, t, 0.15);
      toward(G.subDuckLow.gain, 0.62, t, 0.15);
      toward(G.melLift.gain, 1.20, t, 0.15);
      applyDuck(t);
    } else if (kind === 'stopPour') {
      ducks.pour = 1;
      toward(G.subDuckDrone.gain, 1, t, 0.55);
      toward(G.subDuckLow.gain, 1, t, 0.55);
      toward(G.melLift.gain, 1, t, 0.55);
      applyDuck(t);
    } else if (kind === 'chime') {
      // The token means a second chime inside the hold window re-arms the release instead of
      // letting the first timer lift the duck out from under it.
      ducks.chime = 0.45;
      chimeToken++;
      var tok = chimeToken;
      toward(G.duck.gain, Math.max(DUCK_FLOOR, 0.45), t, 0.04);
      later(function () {
        if (tok !== chimeToken) return;
        ducks.chime = 1;
        // 1.15 s tau ≈ 3.5 s of release, which covers the chime's full 1.8 s decay.
        toward(G.duck.gain, Math.max(DUCK_FLOOR, Math.min(ducks.pour, ducks.pad)), now(), 1.15);
      }, 900);
    } else if (kind === 'breathPad') {
      ducks.pad = 0.62;
      applyDuck(t);
      later(function () { ducks.pad = 1; applyDuck(now()); }, 1200);
    }
  }

  /* ═══════════════════════════ 13. accents ═══════════════════════════ */

  function nextMelBoundary() {
    var phase = (Date.now() % (cycle * 1000)) / 1000;
    var d = melDur - (phase % melDur);
    return now() + d;
  }

  function accentStage() {
    var t = now();
    // The only harmonic event in the game: pull the harmony home. Every home chord contains C
    // and is consonant with G, so it answers chime('stage') (C5+G5) instead of colliding.
    var home = subChord((BANDS[active.band] || BANDS.day).home);
    var prevPool = poolFor(active.chordId);
    voiceChord(active, home, t + 0.05, 2.5);
    snapMelodyIndices(prevPool, home);
    var pool = poolFor(home), picks = [], i;
    for (i = pool.length - 1; i >= 0 && picks.length < 3; i--) if (pool[i] <= 84) picks.unshift(pool[i]);
    var base = Math.max(t + 0.45, nextMelBoundary());
    for (i = 0; i < picks.length; i++) {                                  // rising = growth
      melNote(base + i * 0.28, picks[i], 1, { peak: PEAK.accStage, decay: 5.5, pan: 0, sendBoost: 0.85 });
    }
    toward(G.droneBreath.gain, 0.94 * 1.41, t, 0.4);
    later(function () { toward(G.droneBreath.gain, 0.94, now(), 2.0); }, 1200);
    var f = G.padLP.frequency.value;
    toward(G.padLP.frequency, f + 700, t, 0.5);
    later(function () { applyBandParams(now(), 2.7); }, 1500);
  }

  function accentGather() {
    var t = now();
    var pool = poolFor(active.chordId), i;
    var base = Math.max(t + 0.60, nextMelBoundary());
    for (i = 0; i < 4; i++) {                                             // descending: letting go
      var idx = pool.length - 1 - i;
      if (idx < 0) break;
      melNote(base + i * 0.32, pool[idx], 1, { peak: PEAK.accGather, decay: 6.0, pan: 0, sendBoost: 0.90 });
    }
    // The pad becomes the chime: Gg is chime('gather')'s own E and B, an octave and two octaves
    // down, over the band's unchanged drone. Fmaj7♯11 / Cmaj7 / Am7(9) / G6/D — consonant everywhere.
    voiceChord(active, 'Gg', t + 0.05, 3.0);
    if (G.air) {
      toward(G.air.g.gain, G.air.g.gain.value * 1.8, t, 0.7);
      later(function () { applyBandParams(now(), 2.7); }, 2000);
    }
    if (G.pad.send) toward(G.pad.send.gain, 0.90, t, 0.5);   // the room blooms, then eases back
    if (G.halo.send) toward(G.halo.send.gain, 0.90, t, 0.5);
    later(function () { applySends(now(), 3.3); }, 10000);
  }

  function accentWater() {
    var t = now();
    if (t - lastMelTime < 2.0) { /* skip the note; the breath and the pad still answer */ }
    else {
      var top = topOf(active.chordId) + 12, pool = poolFor(active.chordId);
      var best = pool[pool.length - 1], bd = 1e9;
      for (var i = 0; i < pool.length; i++) { var d = Math.abs(pool[i] - top); if (d < bd) { bd = d; best = pool[i]; } }
      melNote(Math.max(t + 0.06, nextMelBoundary()), best, 1, { peak: PEAK.accWater, decay: 3.2, pan: 0, sendBoost: 0.70 });
    }
    // The music breathes harder while the player is watering — and because the LFO is locked to
    // Date.now(), it swells in step with the pour noise.
    waterBoostUntil = t + 2 * cycle;
    applyBreathDepth();
    later(function () { waterBoostUntil = 0; applyBreathDepth(); }, 2 * cycle * 1000);
    var f = G.padLP.frequency.value;
    toward(G.padLP.frequency, f + 400, t, 0.4);
    later(function () { applyBandParams(now(), 1.4); }, 4000);
  }

  /* ═══════════════════════════ 14. tier + self-healing ═══════════════════════════ */

  // Safari never implements navigator.deviceMemory, so reading an absent value as 8 made the
  // low-end detector inert on the one browser family that runs on phones: every iPhone took the
  // full tier (~156 nodes) while a mid-range Android reporting deviceMemory 4 took the lean one.
  // Unknown means unknown — assume the smaller device, exactly as scenefx.js does, and let the
  // jitter watchdog in measureJitter() decide from measurement rather than from a guess.
  function detectLean() {
    try {
      var cores = typeof navigator.hardwareConcurrency === 'number' ? navigator.hardwareConcurrency : 4;
      var memGB = typeof navigator.deviceMemory === 'number' ? navigator.deviceMemory : 4;
      return cores <= 4 || memGB <= 4;
    } catch (e) { return true; }
  }

  var lastTickAt = 0, healRef = 0, healCtx = 0;
  function measureJitter() {
    var wall = Date.now();
    if (lastTickAt) {
      jitterHist.push(Math.abs(wall - lastTickAt - SCHED_MS));
      if (jitterHist.length > 40) jitterHist.shift();
    }
    lastTickAt = wall;
    // Self-healing: if the audio clock falls more than 2 % behind wall time the render thread is
    // struggling. Drop a tier and never climb back this session — cheap, and it saves the one
    // device nobody tested.
    if (!healRef) { healRef = wall; healCtx = ctx.currentTime; return; }
    if (wall - healRef >= 20000) {
      var wallS = (wall - healRef) / 1000, audioS = ctx.currentTime - healCtx;
      if (audioS < wallS * 0.98 && !tierFloor) { tierFloor = true; goLean(); }
      healRef = wall; healCtx = ctx.currentTime;
    }
    if (!lean && jitterHist.length >= 20 && median(jitterHist.slice(-20)) > 120) goLean();
  }

  function median(a) {
    var b = a.slice().sort(function (x, y) { return x - y; });
    return b[Math.floor(b.length / 2)];
  }

  // Entering lean is a texture change, not damage: it reads as a quieter evening. It is one-way
  // within a session (no oscillation), because the cost of rebuilding the room is worse than the
  // benefit of climbing back.
  function goLean() {
    if (lean) return;
    lean = true;
    try {
      if (G && G.air) { toward(G.air.gate.gain, 0.0001, now(), 2.0); }
      if (G) toward(G.haloGate.gain, 0.0001, now(), 2.0);
    } catch (e) {}
  }

  /* ═══════════════════════════ 15. lifecycle ═══════════════════════════ */

  function startScheduler() {
    if (schedTimer || !ctx) return;
    running = true;
    lastTickAt = 0; healRef = 0;
    nextSlotTime = ctx.currentTime + 0.1;
    resyncSlotIndex();
    schedTimer = setInterval(tick, SCHED_MS);
  }
  function stopScheduler() {
    running = false;
    if (schedTimer) { clearInterval(schedTimer); schedTimer = 0; }
  }

  function applyCycle() {
    var c = mood.nightness >= 0.5 ? 12.0 : 10.0;    // the same discontinuity app.js's breathCycle() has
    if (Math.abs(c - cycle) < 0.01) return;
    cycle = c; slotDur = c / 4; melDur = c / 16;
    retuneBreath(c);
  }

  function teardownVoices() {
    while (sets.length) destroySet(sets[0]);
    active = null;
  }

  function fullTeardown() {
    stopScheduler();
    clearTimers();
    teardownVoices();
    // The air source, the breath LFO and the master chain are the persistent graph: a suspended
    // context silences them, and killing them would leave a re-enable with no air layer at all.
    xfading = false; pendingBand = '';
  }

  // audio.js's context, or null while it has none. Borrowing it is worth a little care: iOS caps
  // concurrent AudioContexts, and once Sound holds one `new AudioContext()` can throw — which would
  // kill the music for the session. Sharing also means the two layers are finally summed in one
  // graph, so they can be levelled against each other with a single analyser.
  function sharedCtx() {
    try {
      var S = window.Sound;
      if (S && typeof S.__ctx === 'function') return S.__ctx() || null;
    } catch (e) {}
    return null;
  }
  // True while audio.js is enabled and about to open a context we should wait for rather than
  // race. 배경 음악 is nested under 소리, so this is the ordinary state of a fresh session.
  function soundPending() {
    try {
      var S = window.Sound;
      if (!S || typeof S.__ctx !== 'function') return false;
      if (S.__ctx()) return false;
      return !(typeof S.isEnabled === 'function' && !S.isEnabled());
    } catch (e) {}
    return false;
  }

  function ensureContext() {
    if (dead) return false;
    if (ctx) return true;
    try {
      // A QA affordance: an OfflineAudioContext can be handed in for headless rendering.
      if (window.__bgmCtx) { ctx = window.__bgmCtx; ownCtx = false; }
      else {
        var shared = sharedCtx();
        if (shared) { ctx = shared; ownCtx = false; }
        else {
          var AC = window.AudioContext || window.webkitAudioContext;
          if (!AC) { dead = true; return false; }
          ctx = new AC(); ownCtx = true;
        }
      }
    } catch (e) { dead = true; ctx = null; return false; }
    if (!ctx) { dead = true; return false; }
    lean = lean || detectLean();
    seedStreams();
    try { buildGraph(); } catch (e) { dead = true; return false; }
    return true;
  }

  /* ═══════════════════════════ 16. public API ═══════════════════════════ */

  function setEnabled(on) {
    try {
      enabled = !!on;
      // The toggle cannot depend on someone else having called unlock() first. A player who turns
      // 배경 음악 on after the app's one-shot unlock has already run — or who arrives with it
      // saved on — otherwise just stores the flag and hears nothing, forever. A toggle click is
      // itself a user gesture, so opening the context here is legal; while audio.js is enabled and
      // has not opened its own yet we wait instead, and the pointerdown listener at the foot of
      // this file borrows that one on the next tap (nothing can sound before a gesture anyway).
      if (enabled && !ctx && !dead && !soundPending()) ensureContext();
      if (dead || !ctx || !G) return;
      var t = now();
      if (enabled) {
        toward(G.master.gain, BGM_MASTER, t, 1.3);   // ≈ 4 s; never a bang
        applyReverb(t, 0.5);                         // undo the tail-kill from a previous disable
        if (!sets.length) bootVoices();
        startScheduler();
        if (ctx.state !== 'running') { try { quiet(ctx.resume()); } catch (e) {} }
      } else {
        // A linear ramp actually arrives at zero; setTargetAtTime only ever approaches it, and
        // a -70 dBFS remnant sitting in the graph forever is not "off".
        try {
          G.master.gain.cancelScheduledValues(t);
          G.master.gain.setValueAtTime(G.master.gain.value, t);
          G.master.gain.linearRampToValueAtTime(0, t + 1.2);
        } catch (e) {}
        // Kill the tail at once. A 4.6 s reverb ringing after the player turned sound off is a
        // bug report — and being able to do this is the reason the FDN beat a convolver.
        for (var i = 0; i < G.rev.combs.length; i++) toward(G.rev.combs[i].fb.gain, 0, t + 0.1, 0.03);
        stopScheduler();
        later(function () {
          if (enabled) return;      // the toggle was flipped back inside the fade — leave it playing
          fullTeardown();
          // Never ctx.close(): a closed context cannot be reopened. And never park a context
          // borrowed from audio.js — suspending it would take every sound effect down with the music.
          try { if (ownCtx && ctx && ctx.state === 'running') quiet(ctx.suspend()); } catch (e) {}
        }, 1600);
      }
    } catch (e) {}
  }

  function bootVoices() {
    var t0 = now() + 0.05;
    active = makeSet(mood.band, t0);
    sets.push(active);
    applyBandParams(t0, 0.5);
    applySends(t0, 0.5);
    applyReverb(t0, 0.5);
    applyStage(t0);
    applyCycle();
  }

  // Must be called from inside a user gesture.
  function unlock() {
    try {
      if (!enabled || dead) return;
      if (!ensureContext()) return;
      // iOS: 'interrupted' (a call, Siri, another app) needs resume() just as 'suspended' does.
      if (ctx.state !== 'running') { try { quiet(ctx.resume()); } catch (e) {} }
      if (!sets.length) bootVoices();
      startScheduler();
      toward(G.master.gain, BGM_MASTER, now(), 1.3);
      if (!attachSfxSidechain()) later(attachSfxSidechain, 1000);   // covers a wrong script order
    } catch (e) {}
  }

  function suspend() {
    try {
      if (!ctx || !G) return;
      toward(G.master.gain, 0.0001, now(), 0.12);
      stopScheduler();
      later(function () {
        if (running) return;        // resume() landed inside the fade; do not park the context
        // Only ours: audio.js parks its own from the same visibilitychange handler.
        try { if (ownCtx && ctx && ctx.state === 'running') quiet(ctx.suspend()); } catch (e) {}
      }, 400);
    } catch (e) {}
  }

  function resume() {
    try {
      if (!enabled || dead || !ctx || !G) return;
      try { quiet(ctx.resume()); } catch (e) {}
      if (!sets.length) bootVoices();
      startScheduler();
      toward(G.master.gain, BGM_MASTER, now(), 1.0);
    } catch (e) {}
  }

  function setMood(band, opts) {
    try {
      opts = opts || {};
      var b = BANDS[band] ? band : mood.band;
      var w = WEATHER[opts.weather] ? opts.weather : mood.weather;
      var n = opts.nightness == null ? mood.nightness : clamp01(opts.nightness);
      var s = opts.stage == null ? mood.stage : clamp(Math.round(opts.stage), 0, 5);
      // updateSky() calls this ~1440× a day with nothing changed. The early-out is load-bearing.
      var key = b + '|' + w + '|' + Math.round(n / 0.02) + '|' + s;
      if (key === moodKey) return;
      moodKey = key;

      var bandChanged = b !== mood.band, stageChanged = s !== mood.stage;
      var wasNight = mood.nightness >= 0.5;
      mood.weather = w; mood.nightness = n; mood.stage = s;
      if (!ctx || !G || !sets.length) { mood.band = b; return; }

      var t = now();
      if (bandChanged) switchBand(b);
      else {
        applyBandParams(t, 2.0);     // weather: 6 s · nightness: 4 s — both far slower than the change
        applySends(t, 2.0);
        applyReverb(t, 2.2);
      }
      if (stageChanged) applyStage(t, s === 0);
      if ((n >= 0.5) !== wasNight) applyCycle();
    } catch (e) {}
  }

  function setIntensity(x) {
    try {
      intensity = clamp01(x);
      if (!ctx || !G) return;
      var t = now();
      toward(G.intens.gain, 0.25 + 0.75 * intensity, t, 1.2);
      applyBandParams(t, 1.2);
      applySends(t, 1.2);           // slightly wetter when quieter, so the room does not shrink
    } catch (e) {}
  }

  function accent(kind) {
    try {
      if (!enabled || dead || !ctx || !G || !active) return;
      if (G.master.gain.value < 0.01) return;
      var t = now();
      var limit = kind === 'gather' ? 10 : kind === 'water' ? 6 : 4;
      if (t - (accentAt[kind] == null ? -99 : accentAt[kind]) < limit) return;
      accentAt[kind] = t;
      if (kind === 'stage') accentStage();
      else if (kind === 'gather') accentGather();
      else if (kind === 'water') accentWater();
    } catch (e) {}
  }

  function isEnabled() { return enabled; }
  // "the toggle is on" and "the music can ever be heard" are different facts: on a device where no
  // AudioContext can be constructed, enabled stays true and nothing will ever sound. A settings row
  // that wants to be honest greys itself out on isAvailable() === false.
  function isAvailable() { return !dead; }

  // Two holes, one listener. iOS leaves the context 'interrupted' after a call or Siri and app.js
  // will not call unlock() again; and a 배경 음악 toggle restored at boot has no gesture to open a
  // context in at all. The `ctx &&` this used to carry made the second case unrecoverable — no
  // context meant the listener that was supposed to create one never ran. Capture phase, no DOM
  // mutation, no preventDefault.
  function gestureRecover() {
    try {
      if (!enabled || dead) return;
      if (ctx) { if (ctx.state !== 'running') unlock(); return; }
      // No context yet. audio.js unlocks from this same pointerdown, so let its handler go first
      // and borrow what it opens instead of opening a second context; if it opens none, the
      // deferred call opens ours, and the next tap resumes it from inside a gesture.
      if (soundPending()) later(unlock, 0);
      else unlock();
    } catch (e) {}
  }
  try {
    document.addEventListener('pointerdown', gestureRecover, { capture: true, passive: true });
  } catch (e) {
    try { document.addEventListener('pointerdown', gestureRecover, true); } catch (e3) {}
  }

  window.BGM = {
    setEnabled: setEnabled,
    unlock: unlock,
    suspend: suspend,
    resume: resume,
    setMood: setMood,
    setIntensity: setIntensity,
    accent: accent,
    isEnabled: isEnabled,
    isAvailable: isAvailable,
    // read-only QA helpers (not in contract; harmless — audio.js exposes state() the same way)
    __dbg: function () {
      return {
        state: ctx ? ctx.state : 'none', dead: dead, lean: lean, nodes: liveNodes, own: ownCtx,
        band: active ? active.band : mood.band, chord: active ? active.chordId : '',
        sets: sets.length, xfading: xfading, tails: melTails, slot: slotIndex,
        cycle: cycle, master: G ? G.master.gain.value : 0,
        duck: G ? G.duck.gain.value : 0, intens: G ? G.intens.gain.value : 0,
        fb: G ? G.rev.combs.map(function (c) { return c.fb.gain.value; }) : [],
        hook: !!(window.Sound && window.Sound.__bgmHook),
        ctx: ctx, out: G ? G.limiter : null, tick: tick, convolver: USE_CONVOLVER
      };
    }
  };
})();
