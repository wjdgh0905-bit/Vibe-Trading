/*!
 * WL.Nurture — 육성(교감) 레이어
 * 의존성 0. IIFE. window.WL 부착. DOM은 card()를 부를 때만 만든다.
 *
 * 공개 API
 *   init(saved)            저장 상태 복원 (없으면 새로)
 *   serialize()            저장 객체
 *   get(i)                 {bond, fed, mood, seen, nick}
 *   stageOf(level)         0..4 성장 단계
 *   canPet(i) / canFeed(i) 쿨다운 판정
 *   pet(i) / feed(i, cost) 상호작용 → {ok, gain, line}
 *   tick(dt, ctx)          시간 경과 (감쇠 · 함께 싸운 시간 적립)
 *   bonus()                {dpsMult, goldMult}  — 상한 dps ×1.25 / gold ×1.15
 *   chatter(i, when)       상황별 한 마디
 *   note(i)                교감 단계 이름
 *
 * 설계: 방치형의 미덕을 해치지 않는다. 감쇠는 완만하고 하한(30)이 있으며,
 *       교감도는 "함께 싸운 시간"만으로도 천천히 오른다. 징벌 없음.
 */
(function () {
  'use strict';
  var W = (window.WL = window.WL || {});

  var MAX = 100, FLOOR = 30;
  var PET_CD = 45, FEED_CD = 120;          // 초
  var STAGE_AT = [1, 10, 50, 200, 800];    // 레벨 → 단계 0~4
  var STAGE_NAME = ['새끼', '어린것', '성체', '정예', '각성'];
  var BOND_NAME = ['낯선 사이', '눈을 맞춘다', '곁을 내준다', '한 몸처럼', '목숨을 맡긴다'];

  /* 성격별 말투 — 로스터의 personality 키와 1:1 */
  var LINES = {
    timid:    { pet:['…무섭지 않아. 네가 있으니까.','볼주머니가 무거워… 그래도 갈게.'], feed:['이건… 아껴 뒀다 먹을래.','도토리! 도토리다!'], boss:['크다… 크지만, 뒤에 있을게.'], win:['이겼어… 정말?'], back:['어디 갔었어. 계속 봤는데.'], hungry:['배가… 조금.'] },
    skittish: { pet:['간지러워! 아 잠깐, 한 번 더.','뒷발 조심해, 나도 모르게 나가.'], feed:['풀 말고 이거! 이거 좋아!'], boss:['빨리 끝내자. 빨리.'], win:['봤지? 봤지?!'], back:['늦었잖아! 한참 기다렸어.'], hungry:['배고프면 발이 느려져…'] },
    sly:      { pet:['…딱 여기까지만 허락한다.','쓰다듬는 손이 서툴군. 나쁘진 않아.'], feed:['뇌물인가? 받아두지.'], boss:['목덜미가 비었어. 거기야.'], win:['말했잖아. 약점은 늘 있다고.'], back:['기다린 건 아니야. 그냥 여기 있었을 뿐.'], hungry:['굶기면 사냥이 거칠어진다.'] },
    loyal:    { pot:[], pet:['…필요한 게 있으면 말해.','무리는 내가 본다. 너는 앞만 봐.'], feed:['먼저 먹어. 나는 나중에.'], boss:['내가 먼저 들어간다.'], win:['다들 무사한가. 그럼 됐다.'], back:['자리 지키고 있었다.'], hungry:['괜찮다. 아직 뛴다.'] },
    aloof:    { pet:['…끝났나.','짧게. 딱 그 정도로.'], feed:['거기 두고 가라.'], boss:['소란스럽군.'], win:['예상대로.'], back:['왔군.'], hungry:['신경 쓰지 마라.'] },
    gentle:   { pet:['따뜻하네. 너도 쉬어가.','천천히 해도 돼.'], feed:['같이 먹자. 반으로 나눌게.'], boss:['다치지 않게. 그게 제일 중요해.'], win:['모두 무사해서 다행이야.'], back:['잘 쉬었어? 불은 꺼뜨리지 않았어.'], hungry:['조금만 있으면 괜찮아.'] },
    proud:    { pet:['허락하지. 이번만이다.','손끝이 떨리는군. 긴장했나?'], feed:['이 정도는 되어야지.'], boss:['산의 왕이 누군지 보여주마.'], win:['당연한 결과다.'], back:['늦었군. 발톱을 갈아 두었다.'], hungry:['왕은 굶지 않는다. 알겠나?'] },
    stubborn: { pet:['됐어. 아니 잠깐, 거기 말고.','돌아가는 길은 모른다. 앞만 있다.'], feed:['다 먹는다. 남기지 않아.'], boss:['비켜라. 뚫고 간다.'], win:['그럴 줄 알았다.'], back:['그대로 서 있었다. 한 발짝도.'], hungry:['배고파도 안 멈춘다.'] },
    wise:     { pet:['오래 산 자의 등은 넓지.','네 손이 어제보다 단단해졌구나.'], feed:['고맙구나. 기억해 두마.'], boss:['저런 것은 전에도 보았다. 끝은 같다.'], win:['기억에 한 줄 더 남았다.'], back:['돌아왔구나. 자리는 그대로다.'], hungry:['기다림은 익숙하다.'] },
    ancient:  { pet:['…이 온기, 오래전에도 있었다.','털이 무겁다. 그래도 좋군.'], feed:['얼지 않은 것은 오랜만이다.'], boss:['빙하도 결국 물러났다.'], win:['또 하나가 지나갔다.'], back:['시간은 늘 이렇게 흐른다.'], hungry:['견딜 수 있다. 오래 견뎠다.'] },
    regal:    { pet:['좋다. 계속하라.','짐의 비늘은 함부로 만지는 것이 아니다만… 허한다.'], feed:['맛이 괜찮군. 더 가져와라.'], boss:['전설끼리는 예의가 필요하지.'], win:['기록하라. 오늘의 승리를.'], back:['짐을 기다리게 하다니.'], hungry:['시장하다. 당장.'] },
    cold:     { pet:['…','체온이 다르군. 인간은 뜨겁다.'], feed:['필요한 만큼만.'], boss:['피 냄새가 난다.'], win:['끝.'], back:['움직이지 않았다.'], hungry:['굶주림은 감각을 날카롭게 한다.'] },
    patient:  { pet:['서두르지 마라. 다 온다.','움직이지 않는 것에도 이유가 있다.'], feed:['천천히 삼킨다.'], boss:['물면 놓지 않는다. 그뿐이다.'], win:['기다린 보람이 있군.'], back:['같은 자리에 있었다.'], hungry:['배고픔도 기다림의 일부다.'] },
    serene:   { pet:['물결 같구나, 네 손은.','조용하다. 좋은 밤이다.'], feed:['고맙다.'], boss:['파도는 바위를 이긴다. 천천히.'], win:['잔잔해졌다.'], back:['불빛이 계속 보였다.'], hungry:['괜찮다.'] },
    wary:     { pet:['…뒤쪽은 내가 본다. 계속해.','소리 들었나? 아니라면 다행이고.'], feed:['독은 없겠지.'], boss:['저건 혼자가 아니다. 조심해.'], win:['아직 방심하지 마.'], back:['아무 일 없었다. 확인했다.'], hungry:['배고프면 판단이 흐려진다.'] },
    bright:   { pet:['한 번 더! 한 번 더!','오늘 하늘 봤어? 엄청났어!'], feed:['우와, 이거 내가 제일 좋아하는 거야!'], boss:['재밌겠다! …농담이야. 반쯤은.'], win:['우리가 해냈어!'], back:['왔다! 진짜 왔다!'], hungry:['배에서 소리 났어. 들었어?'] },
    scarred:  { pet:['이 흉터? 옛날 얘기다.','부드럽게. 아직 아물지 않았어.'], feed:['한 입이면 된다.'], boss:['저 녀석에게도 흉터를 남겨주지.'], win:['하나 더 갚았다.'], back:['상처는 그대로다. 나도 그대로고.'], hungry:['굶는 건 익숙해.'] },
  };
  var FALLBACK = { pet:['…고맙다.'], feed:['잘 먹겠다.'], boss:['간다.'], win:['끝났군.'], back:['돌아왔군.'], hungry:['배가 고프다.'] };

  var S = null;

  function slot(i) {
    if (!S.p[i]) S.p[i] = { b: 40, f: 0, t: 0, pt: -1e9, ft: -1e9, n: null };
    return S.p[i];
  }
  function init(saved) {
    S = { p: {}, clock: 0 };
    if (saved && saved.p) {
      for (var k in saved.p) {
        var v = saved.p[k] || {};
        S.p[k] = { b: num(v.b, 40), f: num(v.f, 0), t: num(v.t, 0),
                   pt: num(v.pt, -1e9), ft: num(v.ft, -1e9), n: v.n || null };
      }
      S.clock = num(saved.clock, 0);
    }
    return S;
  }
  function num(v, d) { return typeof v === 'number' && isFinite(v) ? v : d; }
  function serialize() { return { p: S.p, clock: S.clock }; }
  function get(i) {
    var s = slot(i);
    return { bond: s.b, fed: s.f, nick: s.n, together: s.t,
             mood: s.f < 0.2 ? 'hungry' : s.b > 80 ? 'happy' : s.b < 45 ? 'tired' : 'calm' };
  }
  function stageOf(lv) {
    var st = 0;
    for (var k = 0; k < STAGE_AT.length; k++) if (lv >= STAGE_AT[k]) st = k;
    return lv > 0 ? st : 0;
  }
  function canPet(i) { return S.clock - slot(i).pt >= PET_CD; }
  function canFeed(i) { return S.clock - slot(i).ft >= FEED_CD; }

  function pet(i, pers) {
    var s = slot(i);
    if (!canPet(i)) return { ok: false, wait: PET_CD - (S.clock - s.pt) };
    s.pt = S.clock;
    var gain = Math.min(6, (MAX - s.b) * 0.18 + 1.5);
    s.b = Math.min(MAX, s.b + gain);
    return { ok: true, gain: gain, line: pick(pers, 'pet', i) };
  }
  function feed(i, pers) {
    var s = slot(i);
    if (!canFeed(i)) return { ok: false, wait: FEED_CD - (S.clock - s.ft) };
    s.ft = S.clock;
    s.f = Math.min(1, s.f + 0.55);
    var gain = Math.min(12, (MAX - s.b) * 0.3 + 3);
    s.b = Math.min(MAX, s.b + gain);
    return { ok: true, gain: gain, line: pick(pers, 'feed', i) };
  }

  /* dt초 경과. ctx = {owned:[인덱스…]} — 함께 싸운 동료만 천천히 교감이 오른다 */
  function tick(dt, ctx) {
    S.clock += dt;
    var owned = (ctx && ctx.owned) || [];
    for (var k = 0; k < owned.length; k++) {
      var s = slot(owned[k]);
      s.t += dt;
      s.b = Math.min(MAX, s.b + dt * 0.05);          // 시간당 +180까지는 아니고, 상한에 수렴
      s.f = Math.max(0, s.f - dt / 2400);            // 40분에 만복 1칸 소모
      if (s.f <= 0) s.b = Math.max(FLOOR, s.b - dt * 0.01);
    }
  }

  /* 교감 보너스 — 보유 동료 평균. 상한 dps ×1.25 / gold ×1.15 */
  function bonus(owned) {
    if (!owned || !owned.length) return { dpsMult: 1, goldMult: 1, avg: 0 };
    var sum = 0, fed = 0;
    for (var k = 0; k < owned.length; k++) { var s = slot(owned[k]); sum += s.b; fed += s.f > 0.05 ? 1 : 0; }
    var avg = sum / owned.length / MAX;              // 0~1
    var full = fed / owned.length;                   // 먹인 비율 0~1
    return { avg: avg, fedRatio: full,
             dpsMult: 1 + 0.25 * avg * (0.7 + 0.3 * full),
             goldMult: 1 + 0.15 * avg };
  }

  function pick(pers, when, i) {
    var t = LINES[pers] || FALLBACK;
    var arr = (t && t[when]) || FALLBACK[when] || FALLBACK.pet;
    if (!arr || !arr.length) arr = FALLBACK.pet;
    return arr[(Math.floor(S.clock) + (i || 0)) % arr.length];
  }
  function chatter(i, pers, when) { return pick(pers, when || 'pet', i); }
  function note(i) {
    var b = slot(i).b;
    return BOND_NAME[Math.min(BOND_NAME.length - 1, Math.floor(b / 21))];
  }
  function nick(i, v) { var s = slot(i); if (v !== undefined) s.n = v || null; return s.n; }

  W.Nurture = {
    MAX: MAX, STAGE_AT: STAGE_AT, STAGE_NAME: STAGE_NAME, BOND_NAME: BOND_NAME,
    PET_CD: PET_CD, FEED_CD: FEED_CD,
    init: init, serialize: serialize, get: get, stageOf: stageOf,
    canPet: canPet, canFeed: canFeed, pet: pet, feed: feed,
    tick: tick, bonus: bonus, chatter: chatter, note: note, nick: nick,
  };
})();
