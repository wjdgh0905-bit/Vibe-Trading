/* 숨결 화분 — audio.js
 * window.Sound: lazy WebAudio layer. Everything here is optional polish:
 * every public function is a silent no-op unless sound is enabled AND an
 * AudioContext exists, and nothing ever throws (all bodies are try/catch'd).
 *
 * Wiring expected from app.js:
 *   Sound.setEnabled(state.settings.sound)     // at load, and when the toggle flips
 *   Sound.unlock()                             // inside a user gesture (pointerdown / toggle click)
 *   Sound.suspend() / Sound.resume()           // visibilitychange hidden / visible
 *   Sound.roomTone(true)                       // scene open (safe to call before unlock; applied on unlock)
 *   Sound.startPour(); Sound.pourPhase(p); Sound.stopPour()
 *   Sound.tap(); Sound.chime('stage'|'gather'); Sound.breathPad()
 */
(function () {
  'use strict';

  /* 0.12 put a chime at 0.0144 peak — roughly 30 dB under where a UI sound wants
     to sit, and it read as "the sound is too quiet" the first time anyone heard it
     on a phone. 2.2 lands the chime at 0.26 peak, the pour at 0.20 and the room
     tone at 0.09; everything downstream is a fraction of this, so the internal
     balance the file was tuned with is unchanged. */
  var MASTER_GAIN = 2.2;
  var ROOM_GAIN = 0.04;
  var POUR_MAX = 0.10;
  var POUR_FLOOR = 0.02;     // pour is never fully silent while held
  var MIN_ATTACK = 0.02;     // 20 ms — no clicks, ever

  var enabled = false;
  var ctx = null;
  var master = null;
  var noiseBuf = null;

  var room = null;           // { src, filter, gain }
  var roomWanted = false;    // requested before unlock → applied once ctx exists

  var pour = null;           // { src, filter, gain }
  var pouring = false;
  var pourStopTimer = 0;
  var pourPhaseValue = 0.5;

  function noop() {}
  function clamp01(x) { x = Number(x); return x !== x ? 0 : x < 0 ? 0 : x > 1 ? 1 : x; }
  function now() { return ctx ? ctx.currentTime : 0; }
  function running() { return !!(enabled && ctx && master && ctx.state === 'running'); }

  // Swallow promise rejections from resume()/suspend() (iOS may reject outside a gesture).
  function quiet(p) { if (p && typeof p.then === 'function') p.then(noop, noop); }

  /* ---------- context ---------- */

  function createContext() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = MASTER_GAIN;
    master.connect(ctx.destination);
    noiseBuf = makePinkNoise(ctx, 2);
    return true;
  }

  // 2 s pink-ish noise buffer (Paul Kellet's economy filter over white noise), normalized to ±0.9.
  function makePinkNoise(ac, seconds) {
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
  }

  // Looped noise → lowpass → gain(0) → master. Returns the chain or null.
  function noiseChain(cutoff, q) {
    var src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    src.loop = true;
    var filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = cutoff;
    filter.Q.value = q || 0.7;
    var gain = ctx.createGain();
    gain.gain.value = 0;
    src.connect(filter); filter.connect(gain); gain.connect(master);
    src.start();
    return { src: src, filter: filter, gain: gain };
  }

  function killChain(c) {
    if (!c) return;
    try { c.src.stop(); } catch (e) {}
    try { c.src.disconnect(); c.filter.disconnect(); c.gain.disconnect(); } catch (e) {}
  }

  /* ---------- public: enable / unlock / suspend / resume ---------- */

  function setEnabled(on) {
    try {
      enabled = !!on;
      if (!ctx || !master) return;
      var t = now();
      if (enabled) {
        master.gain.cancelScheduledValues(t);
        master.gain.setTargetAtTime(MASTER_GAIN, t, 0.1);
        if (ctx.state !== 'running') quiet(ctx.resume());
        if (roomWanted) roomTone(true);
      } else {
        // Fully silent: fade master, drop live noise chains, park the context.
        master.gain.cancelScheduledValues(t);
        master.gain.setTargetAtTime(0, t, 0.08);
        pouring = false;
        clearTimeout(pourStopTimer);
        killChain(pour); pour = null;
        killChain(room); room = null;
        setTimeout(function () {
          try { if (!enabled && ctx && ctx.state === 'running') quiet(ctx.suspend()); } catch (e) {}
        }, 400);
      }
    } catch (e) {}
  }

  // Must be called from inside a user gesture (pointerdown / click).
  function unlock() {
    try {
      if (!enabled) return;
      if (!ctx && !createContext()) return;
      // iOS: 'interrupted' (call, Siri, another app) and 'suspended' both need resume().
      if (ctx.state !== 'running') quiet(ctx.resume());
      if (master.gain.value < MASTER_GAIN * 0.5) {
        master.gain.cancelScheduledValues(now());
        master.gain.setTargetAtTime(MASTER_GAIN, now(), 0.1);
      }
      if (roomWanted && !room) roomTone(true);
    } catch (e) {}
  }

  function suspend() {
    try {
      pouring = false;
      clearTimeout(pourStopTimer);
      killChain(pour); pour = null;
      if (ctx && ctx.state === 'running') quiet(ctx.suspend());
    } catch (e) {}
  }

  function resume() {
    try {
      if (!enabled || !ctx) return;
      if (ctx.state !== 'running') quiet(ctx.resume());
      if (roomWanted && !room) roomTone(true);
    } catch (e) {}
  }

  /* ---------- public: room tone ---------- */

  function roomTone(on) {
    try {
      roomWanted = !!on;
      if (!enabled || !ctx || !master) return;   // remembered; applied on unlock()
      var t = now();
      if (on) {
        if (!room) room = noiseChain(400, 0.5);
        room.gain.cancelScheduledValues(t);
        room.gain.setTargetAtTime(ROOM_GAIN, t, 0.6);   // ≈ 2 s to settle
      } else if (room) {
        room.gain.cancelScheduledValues(t);
        room.gain.setTargetAtTime(0, t, 0.6);
        var r = room; room = null;
        setTimeout(function () { killChain(r); }, 2200);
      }
    } catch (e) {}
  }

  /* ---------- public: pour ---------- */

  function pourTarget(p) {
    return POUR_FLOOR + (POUR_MAX - POUR_FLOOR) * clamp01(p);
  }

  function startPour() {
    try {
      if (!enabled || !ctx || !master) return;
      clearTimeout(pourStopTimer);
      if (pour) { killChain(pour); pour = null; }
      pour = noiseChain(900, 0.8);
      pouring = true;
      var t = now();
      pour.gain.cancelScheduledValues(t);
      pour.gain.setValueAtTime(0, t);
      pour.gain.setTargetAtTime(pourTarget(pourPhaseValue), t, 0.12);  // soft ≥ 20 ms attack
    } catch (e) {}
  }

  // p: 0..1 breath amplitude (ring scale phase). Gain glides toward 0.02..0.10.
  function pourPhase(p) {
    try {
      pourPhaseValue = clamp01(p);
      if (!pouring || !pour) return;
      pour.gain.setTargetAtTime(pourTarget(pourPhaseValue), now(), 0.25);
    } catch (e) {}
  }

  function stopPour() {
    try {
      pouring = false;
      if (!pour) return;
      var t = now();
      pour.gain.cancelScheduledValues(t);
      pour.gain.setTargetAtTime(0, t, 0.18);   // → 0 over ≈ 600 ms
      var p = pour; pour = null;
      clearTimeout(pourStopTimer);
      pourStopTimer = setTimeout(function () { killChain(p); }, 900);
    } catch (e) {}
  }

  /* ---------- one-shots ---------- */

  // Sine voice with linear attack then exponential decay. All times in seconds.
  function voice(freq, peak, attack, decay, startAt) {
    var t0 = startAt == null ? now() : startAt;
    var a = Math.max(MIN_ATTACK, attack);
    var osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(peak, t0 + a);
    g.gain.exponentialRampToValueAtTime(0.0004, t0 + a + decay);
    osc.connect(g); g.connect(master);
    osc.start(t0);
    osc.stop(t0 + a + decay + 0.05);
    osc.onended = function () { try { osc.disconnect(); g.disconnect(); } catch (e) {} };
    return g;
  }

  // Tap: 660 Hz, 20 ms in, ~80 ms exponential tail, peak 0.06.
  function tap() {
    try {
      if (!running()) return;
      voice(660, 0.06, 0.02, 0.08);
    } catch (e) {}
  }

  // Two-note chime: 'stage' C5+G5, 'gather' E5+B5. 30 ms attack, 1.8 s decay, peak 0.12.
  var CHIMES = { stage: [523.25, 783.99], gather: [659.25, 987.77] };
  function chime(kind) {
    try {
      if (!running()) return;
      var f = CHIMES[kind] || CHIMES.stage;
      var t = now();
      voice(f[0], 0.12, 0.03, 1.8, t);
      voice(f[1], 0.09, 0.03, 1.8, t + 0.12);   // second note a breath later, slightly softer
    } catch (e) {}
  }

  // Breath pad: C4 + G4, 2 s swell to 0.03, held, then a slow release; ~6 s total.
  function breathPad() {
    try {
      if (!running()) return;
      var t = now();
      [261.63, 392.0].forEach(function (freq, i) {
        var osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        var g = ctx.createGain();
        var peak = i === 0 ? 0.03 : 0.022;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(peak, t + 2.0);
        g.gain.setValueAtTime(peak, t + 3.4);
        g.gain.exponentialRampToValueAtTime(0.0004, t + 6.0);
        osc.connect(g); g.connect(master);
        osc.start(t);
        osc.stop(t + 6.1);
        osc.onended = function () { try { osc.disconnect(); g.disconnect(); } catch (e) {} };
      });
    } catch (e) {}
  }

  /* ---------- export ---------- */

  window.Sound = {
    setEnabled: setEnabled,
    unlock: unlock,
    suspend: suspend,
    resume: resume,
    roomTone: roomTone,
    startPour: startPour,
    pourPhase: pourPhase,
    stopPour: stopPour,
    tap: tap,
    chime: chime,
    breathPad: breathPad,
    // read-only helpers (not in contract; harmless)
    isEnabled: function () { return enabled; },
    state: function () { return ctx ? ctx.state : 'none'; },
    // iOS caps concurrent AudioContexts and `new AudioContext()` can throw once one exists,
    // so bgm.js shares this one rather than opening a second. Null until unlock() has run.
    __ctx: function () { return ctx; }
  };
})();
