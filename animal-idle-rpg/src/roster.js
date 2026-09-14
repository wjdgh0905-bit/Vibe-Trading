/*!
 * WL.Content — 동료 24종 + 적 135행 콘텐츠 데이터
 * 의존성 0. IIFE. window.WL 에 부착. import/export 없음. 최상위 DOM 조작 없음.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 이 모듈이 하는 일 / 하지 않는 일
 * ─────────────────────────────────────────────────────────────────────────
 * 한다  : 동료·적의 "정체성" 데이터(이름·플레이버·패시브·조형 파라미터)와
 *         결정론적 선택 함수, 패시브 합산 함수.
 * 안 한다: 체력/보상 배율(→ WL.Difficulty), 그리기(→ WL.Creatures), DOM(→ UI).
 *
 * ★ 중요 계약 ★ enemyFor() 는 HP·보상 배율을 일절 곱하지 않는다.
 *   웨이브 종류(kind)만 알려주고, 배율은 WL.Difficulty 가 단독으로 적용한다.
 *   여기서 배율을 한 번 더 곱하면 원장의 E ≤ 2.000 상한이 깨진다.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 공개 API
 * ─────────────────────────────────────────────────────────────────────────
 * WL.Content = {
 *   VERSION,                       // '1.0.0'
 *
 *   // ── 동료 ──
 *   PETS,                          // PetRow[24] (index 0~23, append-only)
 *   PET_COUNT,                     // 24
 *   PASSIVE,                       // {petIndex: {bucket: value}} — 원장 원본 표
 *   BUCKETS,                       // {bucketKey: BucketMeta} — 버킷 사전(캡·종류·이름)
 *   petPassive(pets, bucket),      // 단일 버킷 합계 (roster 특례 포함)
 *   petPassives(pets, opt),        // 전 버킷 합산 + 파생 배율 (상한 적용)
 *   ownedPets(pets),               // 1레벨 이상 보유 종 수
 *   petCost(i, lv),                // 10 * 8.8^i * 1.07^lv
 *   petBaseDps(i),                 // 0.8 * 9.2^i
 *
 *   // ── 적 ──
 *   BIOMES,                        // BiomeRow[10]
 *   OVERLORDS,                     // OverlordRow[5]
 *   RANK,                          // 접두사 14단계
 *   ARCHETYPES,                    // 렌더러 아키타입 id 10종 (검증용)
 *   enemyFor(zone, wave, tier),    // 결정론적 적 1체
 *   biomeFor(zone),                // 지역 1행
 *   waveKind(zone, wave),          // 'mob'|'elite'|'boss'|'overlord'
 *   rankOf(zone),                  // 0..13
 *   isElite(w), isBossWave(w), isOverlord(z,w),
 *   mobIdx(z,w), eliteIdx(z,w), bossIdx(z), overlordIdx(z),
 *
 *   // ── UI 최소 헬퍼 ──
 *   passiveLine(i),                // '🦷 산의 왕 — 보스 피해 +10%'
 *   enemyLabel(e),                 // '고대의 회색올빼미 〈파수꾼〉'
 *   creatureOpts(e, size)          // WL.Creatures.make() 에 그대로 넘길 opts
 * }
 *
 * ─────────────────────────────────────────────────────────────────────────
 * 데이터 형태
 * ─────────────────────────────────────────────────────────────────────────
 * PetRow = {
 *   i:0..23,            // 배열 인덱스 = 비용/피해 계단. 절대 재배치 금지
 *   id:'fox',           // 안정 키. 세이브·렌더러 종 id 와 공유
 *   ic:'🦊',            // 폴백 이모지 (크리처 렌더러 없을 때 / 로그 줄)
 *   n:'여우 루',         // 표시 이름
 *   d:'약점을 정확히 문다',      // 미영입 상태 플레이버
 *   lore:'...',         // 영입 후 한 줄 (도감/육성용)
 *   species:'fox',      // WL.Creatures SPECIES id
 *   personality:'sly',  // WL.Nurture 성격 키 (대사 톤 결정)
 *   biome:0,            // 출신 지역 인덱스 → 초상 틴트 힌트
 *   passive:{ type:'critMult', value:0.4, desc:'약점 간파 — 치명타 배수 +0.4',
 *             name:'약점 간파', extra:{...} },   // extra = 부가 버킷(있을 때만)
 *   art:{ ... }         // WL.Creatures def() 와 같은 스키마. 신규 12종만 제공
 * }
 *
 * BiomeRow = {
 *   i, n:'이끼 낀 숲', tint:'#5E6B52',
 *   mobs  : EnemyRow[8],
 *   elites: EnemyRow[3],   // 각 원소에 title('파수꾼' 등)
 *   bosses: EnemyRow[2]
 * }
 * EnemyRow = { ic, n, a:'insect', title?, unique?, palette:{base,belly,pat,patA} }
 *   unique  = true 면 RANK 접두사를 붙이지 않는다(고유명). 대군주 5종이 해당.
 *   a       = WL.Creatures 아키타입 id (ARCHETYPES 중 하나)
 *   palette = 아키타입 spec.coat 위에 얕게 덮어쓸 색. 신규 종 데이터 0행으로
 *             135종의 외형을 만드는 장치다.
 *
 * enemyFor() 반환 = {
 *   kind, boss, ic, name, baseName, title, rank, rankName,
 *   biome:{i,n,tint}, archetype, palette, sizeMul, glow,
 *   art:{species,tier,size,tint,glow,flip}   // creatureOpts() 로도 꺼낼 수 있음
 * }
 */
(function () {
  'use strict';

  var W = (window.WL = window.WL || {});
  var VERSION = '1.0.0';

  /* ══════════════════════════════════════════════════════════════════════
     0. 유틸
     ══════════════════════════════════════════════════════════════════════ */
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  /** 음수 존/웨이브에도 안전한 나머지 */
  function mod(a, n) { return ((a % n) + n) % n; }

  /* ══════════════════════════════════════════════════════════════════════
     1. 패시브 버킷 사전
     ──────────────────────────────────────────────────────────────────────
     원장 계약: 새 "곱항"을 만들지 않는다. 대부분의 버킷은 기존 업그레이드가
     이미 쓰는 가산 괄호 안에 얹힌다. kind 가 그 배선을 지시한다.
       'add'   → 기존 (1 + 0.08*lv) 괄호 안에 더한다
       'flat'  → 초 단위 등 절대값 가산
       'prob'  → 확률 (0..1 클램프)
       'cond'  → 조건부 피해 가산 (조건 만족 시에만)
       'flag'  → 0/1 구조 플래그 (배율 없음)
     cap: 이 모듈이 스스로 적용할 수 있는 상한. null 이면 호출부가 공유 상한을
          관리한다(luck·cdr 은 업그레이드/스킬과 상한을 공유하므로 여기서
          단독 클램프하지 않는다).
     ══════════════════════════════════════════════════════════════════════ */
  var BUCKETS = {
    /* 전투 — 가산 버킷 */
    bless:     { n: '동료 피해',   kind: 'add',  cap: null, note: "globalMult 의 (1+0.08*ups.bless) 괄호 안에 가산" },
    roster:    { n: '무리 규모',   kind: 'add',  cap: null, note: '보유 종 수를 곱한 뒤 bless 와 같은 괄호에 가산' },
    claw:      { n: '터치 피해',   kind: 'add',  cap: null, note: "clickDmg 의 (1+0.35*ups.claw) 괄호 안에 가산" },
    fang:      { n: '보스 피해',   kind: 'add',  cap: null, note: "bossMult 의 (1+0.18*ups.fang) 에 가산" },
    luck:      { n: '치명타 확률', kind: 'add',  cap: null, note: '업그레이드와 60% 상한 공유 → critChance() 에서 클램프' },
    critMult:  { n: '치명타 배수', kind: 'flat', cap: null, note: '기본 ×5 에 가산 (24종 만재 ×6.0)' },
    /* 자원 */
    gold:      { n: '발자국',      kind: 'add',  cap: null, note: "goldMult 의 (1+0.12*ups.gold) 괄호 안에 가산" },
    snack:     { n: '간식',        kind: 'add',  cap: null, note: 'snackReward 말미에 (1+snack)' },
    echo:      { n: '야생혼',      kind: 'add',  cap: null, note: "soulGain 의 (1+0.15*sls.echo) 괄호 안에 가산" },
    /* 시간 */
    hunt:      { n: '보스 제한시간', kind: 'flat', cap: null, note: '초 단위. 티어 배율 적용 "전"에 가산' },
    offline:   { n: '오프라인 효율', kind: 'add', cap: 2.00, note: '오프라인 획득에 (1+offline)' },
    cdr:       { n: '쿨다운 감소', kind: 'add',  cap: null, note: 'WL.Skills 와 −60% 상한 공유 → cdrMul() 에서 클램프' },
    /* 조건부 피해 */
    lowHp:     { n: '마무리',      kind: 'cond', cap: null, note: '적 HP ≤ 30% 일 때만' },
    grip:      { n: '고정',        kind: 'cond', cap: null, note: '같은 적 교전 3초 초과일 때만' },
    elite:     { n: '정예 특효',   kind: 'cond', cap: null, note: 'kind === "elite" 일 때만' },
    shift:     { n: '지역 전환',   kind: 'cond', cap: null, note: 'zone % 5 === 1 일 때만' },
    eliteGold: { n: '정예 발자국', kind: 'add',  cap: null, note: '정예 처치 골드에만' },
    pioneer:   { n: '개척 보상',   kind: 'add',  cap: null, note: '최고 존 갱신 보스에만' },
    recrit:    { n: '재타격 확률', kind: 'prob', cap: 1.00, note: '치명타 시 같은 피해 1회 추가' },
    /* 구조 */
    mercy:     { n: '보스 구제',   kind: 'flag', cap: null, note: '>0 이면 보스 실패 시 7웨이브로 복귀' }
  };

  /* 원장 원본표 — dataShapes 의 PASSIVE 와 1바이트도 다르지 않다 */
  var PASSIVE = {
    0: { snack: 0.15 },   1: { luck: 0.02 },     2: { critMult: 0.4 },
    3: { roster: 0.003 }, 4: { offline: 0.08 },  5: { claw: 0.20 },
    6: { fang: 0.10 },    7: { hunt: 2 },        8: { gold: 0.10 },
    9: { lowHp: 0.15 },  10: { echo: 0.05 },    11: { cdr: 0.08 },
    12: { hunt: 3 },     13: { grip: 0.25 },    14: { offline: 0.12 },
    15: { critMult: 0.6 }, 16: { bless: 0.06 }, 17: { elite: 0.25, eliteGold: 0.20 },
    18: { mercy: 1 },    19: { pioneer: 0.50 }, 20: { shift: 0.20 },
    21: { recrit: 0.12 }, 22: { echo: 0.08, snack: 0.20 }, 23: { roster: 0.006 }
  };

  /* ══════════════════════════════════════════════════════════════════════
     2. 동료 24종
     ──────────────────────────────────────────────────────────────────────
     index 0~11 은 원본 그대로(append only). ic/n/d 는 원본 문자열 유지.
     cost = 10 * 8.8^i , dps = 0.8 * 9.2^i  ← 기존 공식 그대로. 주석의 값은
     그 공식의 실제 산출값이며, 코드가 런타임에 다시 계산하므로 어긋날 수 없다.

     조형 원칙: 종마다 "식별 파츠" 정확히 1개. bulk(mass) 가 오를수록 장식을
     줄인다 — 큰 몸은 실루엣만으로 읽히고, 작은 몸은 파츠로 읽힌다.
     ══════════════════════════════════════════════════════════════════════ */

  /* 신규 12종의 art 파라미터.
     WL.Creatures 의 def({...}) 스키마와 동일하다 — 그대로 def() 에 넣으면 된다.
     신규 extras 는 fluke · halo · flame 3개뿐. sucker 는 coat.pattern 의
     기존 값이므로 새 파츠가 아니다. */
  var ART = {
    /* 12. 대왕오징어 — 식별 파츠: tentacle. 심해 3종 중 유일한 무척추 실루엣 */
    squid: {
      id: 'squid', name: '대왕오징어', h: .86, w: 1.30, mass: .55, gait: 'drift', float: 1,
      body: { len: .70, arch: .02, hip: .20, chest: .40 },
      rT: [.055, .105, .150, .175, .160, .095], rB: [.050, .098, .142, .166, .150, .088],
      neck: { len: .03, ang: -8, thick: .150 },
      head: { size: .26, snout: .10, taper: .80, jaw: .30, brow: .80, tilt: -2, chin: .25 },
      legs: { rows: [], len: 0, thick: 0, bend: 1, hock: 0, sprawl: 0, paw: 0, fwd: 0, spread: 0 },
      tail: { seg: 5, len: .52, r: .055, fluff: 0, up: 4, curl: 14, lag: .34 },
      ears: { type: 'fin', h: .17, w: .22, tilt: -26, x: -.24 },
      eyes: { shape: 'round', size: .085, x: .09, y: -.06 },
      coat: { base: '#7E3F5E', belly: '#D9A6B6', pattern: 'sucker', pat: '#42203A', patA: .50 },
      extras: ['tentacle', 'mantle', 'siphon']
    },
    /* 13. 바다악어 — 식별 파츠: lips(긴 턱선). 낮고 길게 깔린 유일한 실루엣 */
    crocodile: {
      id: 'crocodile', name: '바다악어', h: .44, w: 1.62, mass: .80, gait: 'sprawl',
      body: { len: .86, arch: .02, hip: .34, chest: .36 },
      rT: [.090, .118, .128, .124, .104, .068], rB: [.086, .114, .124, .118, .096, .062],
      neck: { len: .05, ang: -8, thick: .118 },
      head: { size: .30, snout: .62, taper: .30, jaw: .84, brow: 1.14, tilt: 2, chin: .70 },
      legs: { rows: [.20, .80], len: .58, thick: .036, bend: 1.46, hock: .02, sprawl: .72, paw: .040, fwd: .01, spread: .115 },
      tail: { seg: 6, len: .70, r: .085, fluff: 0, up: -4, curl: 10, lag: .30 },
      ears: { type: 'none', h: 0, w: 0, tilt: 0, x: 0 },
      eyes: { shape: 'slit', size: .042, x: .20, y: -.16 },
      coat: { base: '#4C5A44', belly: '#B3AE84', pattern: 'plate', pat: '#232B22', patA: .60 },
      extras: ['lips', 'fang', 'plate', 'claw']
    },
    /* 14. 안데스콘도르 — 식별 파츠: ruffcheek(목도리). 매와 구분되는 단 하나 */
    condor: {
      id: 'condor', name: '안데스콘도르', h: .78, w: 1.30, mass: .30, gait: 'perch', float: .6,
      body: { len: .56, arch: .10, hip: .30, chest: .38 },
      rT: [.078, .112, .128, .122, .100, .062], rB: [.072, .106, .122, .114, .090, .055],
      neck: { len: .17, ang: -58, thick: .072 },
      head: { size: .24, snout: .30, taper: .52, jaw: .50, brow: 1.16, tilt: 4, chin: .40 },
      legs: { rows: [.30, .70], len: .82, thick: .026, bend: 1.30, hock: .10, sprawl: 0, paw: .038, fwd: .01, spread: .070 },
      tail: { seg: 3, len: .30, r: .060, fluff: .20, up: -8, curl: 6, lag: .20 },
      ears: { type: 'none', h: 0, w: 0, tilt: 0, x: 0 },
      eyes: { shape: 'raptor', size: .046, x: .14, y: -.14 },
      coat: { base: '#2A2A30', belly: '#EDE6D8', pattern: 'countershade', pat: '#14141A', patA: .55 },
      extras: ['wingFeather', 'beak', 'talon', 'ruffcheek']
    },
    /* 15. 향유고래 — 식별 파츠: snoutPad(사각 두상). 등지느러미 없음이 정체성 */
    spermwhale: {
      id: 'spermwhale', name: '향유고래', h: .92, w: 1.70, mass: 1.0, gait: 'swim', float: 1,
      body: { len: .88, arch: .03, hip: .34, chest: .56 },
      rT: [.088, .150, .186, .196, .170, .102], rB: [.084, .144, .180, .188, .160, .094],
      neck: { len: .02, ang: -6, thick: .180 },
      head: { size: .40, snout: .58, taper: .88, jaw: .46, brow: .70, tilt: 0, chin: .30 },
      legs: { rows: [], len: 0, thick: 0, bend: 1, hock: 0, sprawl: 0, paw: 0, fwd: 0, spread: 0 },
      tail: { seg: 4, len: .46, r: .070, fluff: 0, up: 0, curl: 6, lag: .26 },
      ears: { type: 'none', h: 0, w: 0, tilt: 0, x: 0 },
      eyes: { shape: 'bead', size: .030, x: .06, y: -.04 },
      coat: { base: '#4A4842', belly: '#9E9A8E', pattern: 'wrinkle', pat: '#26241F', patA: .45 },
      extras: ['fluke', 'pectoral', 'snoutPad']          /* fluke = 신규 */
    },
    /* 16. 대왕고래 — 식별 파츠: 길이 그 자체 + 작은 dorsal. 향유고래의 반대 실루엣 */
    bluewhale: {
      id: 'bluewhale', name: '대왕고래', h: .98, w: 1.85, mass: 1.0, gait: 'swim', float: 1,
      body: { len: .94, arch: .05, hip: .30, chest: .44 },
      rT: [.062, .118, .162, .178, .150, .080], rB: [.058, .112, .156, .170, .140, .074],
      neck: { len: .02, ang: -4, thick: .150 },
      head: { size: .30, snout: .52, taper: .66, jaw: .40, brow: .76, tilt: -2, chin: .25 },
      legs: { rows: [], len: 0, thick: 0, bend: 1, hock: 0, sprawl: 0, paw: 0, fwd: 0, spread: 0 },
      tail: { seg: 5, len: .58, r: .062, fluff: 0, up: 0, curl: 4, lag: .30 },
      ears: { type: 'none', h: 0, w: 0, tilt: 0, x: 0 },
      eyes: { shape: 'bead', size: .028, x: .11, y: -.05 },
      coat: { base: '#4C6A86', belly: '#CBD8DE', pattern: 'speckle', pat: '#2A3E52', patA: .40 },
      extras: ['fluke', 'pectoral', 'dorsal']            /* fluke = 신규 */
    },
    /* 17. 메갈로돈 — 식별 파츠: sharkjaw. 상어(9번)와 같은 계열이되 턱이 전부다 */
    megalodon: {
      id: 'megalodon', name: '메갈로돈', h: .80, w: 1.90, mass: 1.0, gait: 'swim', float: 1,
      body: { len: .90, arch: .04, hip: .30, chest: .54 },
      rT: [.070, .136, .176, .180, .140, .066], rB: [.066, .130, .170, .172, .130, .060],
      neck: { len: .02, ang: -6, thick: .166 },
      head: { size: .34, snout: .46, taper: .44, jaw: .92, brow: .96, tilt: 2, chin: .62 },
      legs: { rows: [], len: 0, thick: 0, bend: 1, hock: 0, sprawl: 0, paw: 0, fwd: 0, spread: 0 },
      tail: { seg: 4, len: .54, r: .072, fluff: 0, up: -6, curl: 16, lag: .28 },
      ears: { type: 'none', h: 0, w: 0, tilt: 0, x: 0 },
      eyes: { shape: 'bead', size: .034, x: .17, y: -.14 },
      coat: { base: '#53606B', belly: '#DCE3E6', pattern: 'countershade', pat: '#2C353D', patA: .50 },
      extras: ['sharkjaw', 'dorsal', 'caudal', 'pectoral', 'gills']
    },
    /* 18. 티타노보아 — 식별 파츠: 다리 없음 + seg 8. 로스터에서 유일한 무족 */
    titanoboa: {
      id: 'titanoboa', name: '티타노보아', h: .34, w: 2.00, mass: .70, gait: 'glide',
      body: { len: .92, arch: .06, hip: .22, chest: .24 },
      rT: [.092, .112, .120, .116, .100, .070], rB: [.090, .110, .118, .112, .096, .066],
      neck: { len: .10, ang: -16, thick: .108 },
      head: { size: .22, snout: .34, taper: .46, jaw: .72, brow: 1.06, tilt: 2, chin: .55 },
      legs: { rows: [], len: 0, thick: 0, bend: 1, hock: 0, sprawl: 0, paw: 0, fwd: 0, spread: 0 },
      tail: { seg: 8, len: .96, r: .078, fluff: 0, up: -2, curl: 26, lag: .38 },
      ears: { type: 'none', h: 0, w: 0, tilt: 0, x: 0 },
      eyes: { shape: 'slit', size: .040, x: .16, y: -.14 },
      coat: { base: '#6B6238', belly: '#C6BE86', pattern: 'scale', pat: '#332E1A', patA: .58 },
      extras: ['lips', 'fang', 'chitin']
    },
    /* 19. 파라케라테리움 — 식별 파츠: neck.len. 최대 bulk 이므로 장식 최소 2개 */
    paracer: {
      id: 'paracer', name: '파라케라테리움', h: 1.00, w: 1.52, mass: 1.0, gait: 'lumber',
      body: { len: .78, arch: .07, hip: .52, chest: .60 },
      rT: [.104, .148, .172, .190, .176, .118], rB: [.100, .144, .166, .180, .162, .104],
      neck: { len: .30, ang: -62, thick: .124 },
      head: { size: .26, snout: .42, taper: .56, jaw: .56, brow: 1.00, tilt: 6, chin: .45 },
      legs: { rows: [.16, .84], len: 1.08, thick: .052, bend: 1.14, hock: .05, sprawl: 0, paw: .052, fwd: .02, spread: .096 },
      tail: { seg: 2, len: .18, r: .048, fluff: .25, up: -6, curl: 8, lag: .16 },
      ears: { type: 'tube', h: .12, w: .07, tilt: -14, x: -.19 },
      eyes: { shape: 'almond', size: .036, x: .12, y: -.14 },
      coat: { base: '#7A6A56', belly: '#B6A68C', pattern: 'none', pat: '#3E362B', patA: .40 },
      extras: ['lips', 'snoutPad']
    },
    /* 20. 케찰코아틀루스 — 식별 파츠: wingMembrane. 조류 3종과 갈라지는 지점 */
    quetzal: {
      id: 'quetzal', name: '케찰코아틀루스', h: .96, w: 1.72, mass: .62, gait: 'stalk', float: .35,
      body: { len: .60, arch: .09, hip: .30, chest: .40 },
      rT: [.068, .106, .126, .120, .096, .056], rB: [.064, .100, .120, .112, .086, .050],
      neck: { len: .26, ang: -60, thick: .076 },
      head: { size: .30, snout: .78, taper: .34, jaw: .52, brow: 1.04, tilt: 6, chin: .40 },
      legs: { rows: [.28, .72], len: 1.04, thick: .028, bend: 1.26, hock: .12, sprawl: .10, paw: .040, fwd: .01, spread: .082 },
      tail: { seg: 2, len: .16, r: .042, fluff: 0, up: -4, curl: 6, lag: .16 },
      ears: { type: 'none', h: 0, w: 0, tilt: 0, x: 0 },
      eyes: { shape: 'raptor', size: .044, x: .16, y: -.15 },
      coat: { base: '#8E6C55', belly: '#E2CDAE', pattern: 'none', pat: '#4A382C', patA: .45 },
      extras: ['wingMembrane', 'beak', 'crestFeather', 'talon']
    },
    /* 21. 삼족오 — 식별 파츠: legs.rows 3개(!). 신규 파츠 0개로 만든 정체성 */
    samjogo: {
      id: 'samjogo', name: '삼족오', h: .82, w: 1.20, mass: .34, gait: 'perch', float: .45,
      body: { len: .54, arch: .11, hip: .30, chest: .36 },
      rT: [.074, .108, .122, .116, .096, .060], rB: [.070, .102, .116, .108, .088, .054],
      neck: { len: .13, ang: -50, thick: .074 },
      head: { size: .25, snout: .34, taper: .48, jaw: .48, brow: 1.10, tilt: 4, chin: .40 },
      legs: { rows: [.26, .52, .78], len: .90, thick: .026, bend: 1.34, hock: .10, sprawl: 0, paw: .038, fwd: .01, spread: .076 },
      tail: { seg: 3, len: .34, r: .056, fluff: .30, up: -6, curl: 10, lag: .22 },
      ears: { type: 'none', h: 0, w: 0, tilt: 0, x: 0 },
      eyes: { shape: 'raptor', size: .048, x: .14, y: -.14 },
      coat: { base: '#241C24', belly: '#4A3A30', pattern: 'none', pat: '#120E12', patA: .50 },
      extras: ['wingFeather', 'beak', 'tailFeather', 'flame']   /* flame = 신규 */
    },
    /* 22. 기린(麒麟) — 식별 파츠: horn 1개. 사슴 골격 + 비늘이라는 모순이 정체성 */
    kirin: {
      id: 'kirin', name: '기린', h: .92, w: 1.40, mass: .66, gait: 'trot',
      body: { len: .70, arch: .09, hip: .40, chest: .42 },
      rT: [.082, .112, .122, .118, .104, .074], rB: [.078, .108, .118, .112, .096, .068],
      neck: { len: .17, ang: -54, thick: .092 },
      head: { size: .27, snout: .40, taper: .46, jaw: .50, brow: 1.02, tilt: 4, chin: .45 },
      legs: { rows: [.15, .85], len: 1.06, thick: .026, bend: 1.24, hock: .09, sprawl: 0, paw: .034, fwd: .02, spread: .074 },
      tail: { seg: 3, len: .34, r: .058, fluff: .70, up: -4, curl: 18, lag: .24 },
      ears: { type: 'point', h: .17, w: .11, tilt: -12, x: -.13 },
      eyes: { shape: 'almond', size: .048, x: .13, y: -.13 },
      coat: { base: '#C08A46', belly: '#F2E0BA', pattern: 'scale', pat: '#7A4E22', patA: .42 },
      extras: ['horn', 'flame', 'toes']                        /* flame = 신규 */
    },
    /* 23. 붕(鵬) — 식별 파츠: halo. 최종 동료이므로 발광 링 하나로 끝낸다 */
    peng: {
      id: 'peng', name: '붕', h: 1.00, w: 1.95, mass: .88, gait: 'perch', float: .8,
      body: { len: .66, arch: .10, hip: .36, chest: .48 },
      rT: [.080, .124, .146, .140, .114, .066], rB: [.076, .118, .140, .132, .104, .060],
      neck: { len: .18, ang: -56, thick: .088 },
      head: { size: .28, snout: .40, taper: .46, jaw: .50, brow: 1.08, tilt: 4, chin: .42 },
      legs: { rows: [.28, .72], len: .96, thick: .028, bend: 1.28, hock: .11, sprawl: 0, paw: .042, fwd: .01, spread: .080 },
      tail: { seg: 4, len: .52, r: .066, fluff: .45, up: -8, curl: 14, lag: .28 },
      ears: { type: 'none', h: 0, w: 0, tilt: 0, x: 0 },
      eyes: { shape: 'raptor', size: .046, x: .14, y: -.14 },
      coat: { base: '#2E4A6E', belly: '#D8E2EE', pattern: 'countershade', pat: '#16243A', patA: .48 },
      extras: ['wingFeather', 'halo', 'beak', 'tailFeather']    /* halo = 신규 */
    }
  };

  /* 동료 원본 행. cost/dps 는 아래 .map 에서 공식으로 붙는다. */
  var PET_ROWS = [
    /* ── index 0~11 : 원본. ic/n/d 문자열 1바이트도 변경 없음 ───────────── */
    /* i= 0  cost 10        dps 0.8      */
    { id: 'hamster', ic: '🐹', n: '햄찌', d: '볼주머니에 도토리를 숨긴다',
      lore: '먹을 것을 숨기는 버릇이 무리 전체를 먹여 살린다.',
      species: 'hamster', personality: 'timid', biome: 0,
      pn: '도토리 저금' },
    /* i= 1  cost 88        dps 7.4      */
    { id: 'rabbit', ic: '🐰', n: '토깽이', d: '뒷발차기가 매섭다',
      lore: '겁이 많아서 빠르고, 빠르기 때문에 정확하다.',
      species: 'rabbit', personality: 'skittish', biome: 1,
      pn: '놀란 발차기' },
    /* i= 2  cost 774       dps 67.7     */
    { id: 'fox', ic: '🦊', n: '여우 루', d: '약점을 정확히 문다',
      lore: '한 번 본 상처는 잊지 않는다.',
      species: 'fox', personality: 'sly', biome: 0,
      pn: '약점 간파' },
    /* i= 3  cost 6.82K     dps 623      */
    { id: 'wolf', ic: '🐺', n: '늑대 카이', d: '무리를 이끌어 공격한다',
      lore: '혼자 싸운 적이 없다. 그래서 혼자서는 약하다.',
      species: 'wolf', personality: 'loyal', biome: 2,
      pn: '무리 사냥' },
    /* i= 4  cost 59.97K    dps 5.73K    */
    { id: 'hawk', ic: '🦅', n: '매 하늘', d: '급강하로 내리꽂는다',
      lore: '모닥불이 꺼져 있는 동안에도 하늘에는 하늘이 있다.',
      species: 'hawk', personality: 'aloof', biome: 7,
      pn: '활공' },
    /* i= 5  cost 527.73K   dps 52.73K   */
    { id: 'bear', ic: '🐻', n: '곰 바우', d: '한 방이 묵직하다',
      lore: '천천히 일어나서, 한 번만 휘두른다.',
      species: 'bear', personality: 'gentle', biome: 0,
      pn: '묵직한 일격' },
    /* i= 6  cost 4.64M     dps 485.08K  */
    { id: 'tiger', ic: '🐯', n: '호랑이 범', d: '산의 왕, 발톱이 갈린다',
      lore: '산에서는 누구에게도 길을 비켜준 적이 없다.',
      species: 'tiger', personality: 'proud', biome: 5,
      pn: '산의 왕' },
    /* i= 7  cost 40.87M    dps 4.46M    */
    { id: 'rhino', ic: '🦏', n: '코뿔소 탱', d: '돌진으로 전열을 부순다',
      lore: '멈추는 법을 배우지 않았다.',
      species: 'rhino', personality: 'stubborn', biome: 1,
      pn: '돌진' },
    /* i= 8  cost 359.63M   dps 41.06M   */
    { id: 'elephant', ic: '🐘', n: '코끼리 우르', d: '대지를 울리는 발걸음',
      lore: '지나온 길을 전부 기억한다. 물이 어디 있었는지까지.',
      species: 'elephant', personality: 'wise', biome: 8,
      pn: '무리의 기억' },
    /* i= 9  cost 3.16B     dps 377.73M  */
    { id: 'shark', ic: '🦈', n: '상어 지느', d: '피 냄새를 놓치지 않는다',
      lore: '약해진 것을 먼저 안다.',
      species: 'shark', personality: 'cold', biome: 4,
      pn: '피 냄새' },
    /* i=10  cost 27.85B    dps 3.48B    */
    { id: 'mammoth', ic: '🦣', n: '매머드 설', d: '고대의 힘을 품었다',
      lore: '얼음 아래에서 아주 오래 기다렸다.',
      species: 'mammoth', personality: 'ancient', biome: 2,
      pn: '고대의 힘' },
    /* i=11  cost 245.08B   dps 31.97B   */
    { id: 'dragon', ic: '🐉', n: '비룡 아르', d: '전설이 깨어난다',
      lore: '이야기 속에만 있던 것이 모닥불 옆에 앉았다.',
      species: 'dragon', personality: 'regal', biome: 9,
      pn: '용의 숨결' },

    /* ── index 12~17 : 실존 심해·거대 동물 ─────────────────────────────── */
    /* i=12  cost 2.16T     dps 294.13B  */
    { id: 'squid', ic: '🦑', n: '대왕오징어 크라', d: '빛을 처음 본 눈이 아직 적응하지 못했다',
      lore: '깊은 곳에서는 눈이 클수록 유리했다. 여기서는 아직 아니다.',
      species: 'squid', personality: 'wary', biome: 4,
      pn: '먹물 장막' },
    /* i=13  cost 18.98T    dps 2.71T    */
    { id: 'crocodile', ic: '🐊', n: '바다악어 고르', d: '물고 나면 놓지 않는다',
      lore: '기다리는 시간이 길수록 한 번이 확실해진다.',
      species: 'crocodile', personality: 'patient', biome: 8,
      pn: '턱 고정' },
    /* i=14  cost 167.02T   dps 24.90T   */
    { id: 'condor', ic: '🪶', n: '안데스콘도르 미르', d: '날갯짓을 세어 본 적이 없다',
      lore: '바람이 올라가는 곳을 알면 날개는 거의 쓸 일이 없다.',
      species: 'condor', personality: 'aloof', biome: 7,
      pn: '상승 기류' },
    /* i=15  cost 1.47aa    dps 229.04T  */
    { id: 'spermwhale', ic: '🐋', n: '향유고래 므레', d: '흉터는 전부 크라의 친척들이 남겼다',
      lore: '소리 한 번으로 어둠의 지도를 그린다.',
      species: 'spermwhale', personality: 'scarred', biome: 4,
      pn: '음파 충격' },
    /* i=16  cost 12.93aa   dps 2.11aa   */
    { id: 'bluewhale', ic: '🐳', n: '대왕고래 온', d: '가장 크고, 아무것도 사냥하지 않는다',
      lore: '심장 소리가 무리 전체의 박자가 되었다.',
      species: 'bluewhale', personality: 'serene', biome: 4,
      pn: '바다의 심장' },
    /* i=17  cost 113.82aa  dps 19.39aa  */
    { id: 'megalodon', ic: '🦷', n: '메갈로돈 강', d: '지느가 올려다보는 조상',
      lore: '이빨만 남기고 사라졌다던 이야기는 사실이 아니었다.',
      species: 'megalodon', personality: 'cold', biome: 9,
      pn: '멸종하지 않은 턱' },

    /* ── index 18~20 : 멸종 고생물 ─────────────────────────────────────── */
    /* i=18  cost 1.00ab    dps 178.35aa */
    { id: 'titanoboa', ic: '🐍', n: '티타노보아 유르', d: '허물을 벗을 때마다 실수를 두고 온다',
      lore: '실패한 사냥은 벗어 버리면 그만이라고 믿는다.',
      species: 'titanoboa', personality: 'patient', biome: 5,
      pn: '허물' },
    /* i=19  cost 8.81ab    dps 1.64ab   */
    { id: 'paracer', ic: '🦒', n: '파라케라테리움 무르', d: '뒤를 돌아보는 법을 배우지 못했다',
      lore: '앞만 보고 걸었더니 아무도 가 본 적 없는 곳에 닿았다.',
      species: 'paracer', personality: 'stubborn', biome: 1,
      pn: '지축' },
    /* i=20  cost 77.56ab   dps 15.10ab  */
    { id: 'quetzal', ic: '🦇', n: '케찰코아틀루스 실', d: '새 하늘은 언제나 실이 먼저 본다',
      lore: '날개를 펴면 지역 하나가 그늘에 들어간다.',
      species: 'quetzal', personality: 'aloof', biome: 7,
      pn: '성층권' },

    /* ── index 21~23 : 동아시아 신화 ───────────────────────────────────── */
    /* i=21  cost 682.55ab  dps 138.88ab */
    { id: 'samjogo', ic: '🐦‍⬛', n: '삼족오 하루', d: '다리가 셋인 이유는 묻지 않기로 했다',
      lore: '해 속에 살던 새라서, 그림자가 생기지 않는다.',
      species: 'samjogo', personality: 'bright', biome: 6,
      pn: '세 번째 발' },
    /* i=22  cost 6.01ac    dps 1.28ac   */
    { id: 'kirin', ic: '🦌', n: '기린 노을', d: '밟은 풀이 상하지 않는다',
      lore: '좋은 일이 생기기 직전에만 나타난다고 한다.',
      species: 'kirin', personality: 'serene', biome: 3,
      pn: '상서' },
    /* i=23  cost 52.86ac   dps 11.75ac  */
    { id: 'peng', ic: '🪽', n: '붕 아름', d: '바다였던 것이 하늘이 되었다',
      lore: '한 번 날아오르면 구만 리를 간다. 무리는 그 그늘 아래를 걷는다.',
      species: 'peng', personality: 'regal', biome: 9,
      pn: '구만리' }
  ];

  /* 패시브 설명문 — 게임에 그대로 노출되므로 문장으로 다듬어 둔다 */
  var PASSIVE_DESC = [
    '간식 획득 +15%',
    '치명타 확률 +2%',
    '치명타 배수 +0.4',
    '영입한 동료 1종마다 동료 피해 +0.3%',
    '오프라인 효율 +8%',
    '터치 피해 +20%',
    '보스에게 주는 피해 +10%',
    '보스 제한시간 +2초',
    '발자국 획득 +10%',
    '적 체력이 30% 이하일 때 피해 +15%',
    '야생혼 획득 +5%',
    '스킬 재사용 대기시간 −8%',
    '보스 제한시간 +3초',
    '같은 적을 3초 넘게 물고 있으면 피해 +25%',
    '오프라인 효율 +12%',
    '치명타 배수 +0.6',
    '모든 동료 피해 +6%',
    '정예에게 주는 피해 +25%, 정예 처치 발자국 +20%',
    '보스 토벌에 실패해도 1웨이브가 아닌 7웨이브부터 다시 시작한다',
    '최고 존을 새로 밟는 순간, 그 존 보스의 보상 +50%',
    '지역이 바뀌는 존에서 피해 +20%',
    '치명타가 터질 때 12% 확률로 같은 피해를 한 번 더 꽂는다',
    '야생혼 획득 +8%, 간식 획득 +20%',
    '영입한 동료 1종마다 동료 피해 +0.6%'
  ];

  /* 최종 PETS — cost/dps 는 여기서 공식으로 생성한다(원본 .map 체인과 동일) */
  var PETS = PET_ROWS.map(function (p, i) {
    var tbl = PASSIVE[i] || {};
    var keys = Object.keys(tbl);
    var main = keys[0];
    var extra = null;
    if (keys.length > 1) {
      extra = {};
      for (var k = 1; k < keys.length; k++) extra[keys[k]] = tbl[keys[k]];
    }
    return {
      i: i,
      id: p.id, ic: p.ic, n: p.n, d: p.d, lore: p.lore,
      species: p.species, personality: p.personality, biome: p.biome,
      cost: 10 * Math.pow(8.8, i),
      dps: 0.8 * Math.pow(9.2, i),
      passive: {
        name: p.pn,
        type: main,
        value: tbl[main],
        extra: extra,
        desc: p.pn + ' — ' + PASSIVE_DESC[i],
        all: tbl
      },
      art: ART[p.species] || null      /* 0~11 은 렌더러가 이미 보유 → null */
    };
  });
  var PET_COUNT = PETS.length;

  var petCost = function (i, lv) { return 10 * Math.pow(8.8, i) * Math.pow(1.07, lv || 0); };
  var petBaseDps = function (i) { return 0.8 * Math.pow(9.2, i); };

  /* ══════════════════════════════════════════════════════════════════════
     3. 패시브 합산
     ══════════════════════════════════════════════════════════════════════ */

  /** 1레벨 이상 보유한 "종" 수 (레벨 합이 아니다) */
  function ownedPets(pets) {
    var c = 0, n = pets ? pets.length : 0;
    for (var i = 0; i < n && i < PET_COUNT; i++) if (pets[i] > 0) c++;
    return c;
  }

  /**
   * 단일 버킷 합계. 원본 스펙의 petPassive(b) 와 의미가 같다.
   * 'roster' 만 특례: 합계 × 보유 종 수.
   */
  function petPassive(pets, bucket) {
    var v = 0, n = pets ? pets.length : 0;
    for (var i = 0; i < n && i < PET_COUNT; i++) {
      if (!(pets[i] > 0)) continue;
      var p = PASSIVE[i];
      if (p && p[bucket] !== undefined) v += p[bucket];
    }
    if (bucket === 'roster') v *= ownedPets(pets);
    var meta = BUCKETS[bucket];
    if (meta && meta.cap != null) v = Math.min(v, meta.cap);
    return v;
  }

  /**
   * 전 버킷 합산 + 파생 배율.
   *
   * @param pets  number[] — S.pets (레벨 배열). 길이가 24 미만이어도 안전.
   * @param opt   {upsLuck, upsBless, upsClaw, upsGold, upsFang, slsEcho, skillCdr}
   *              기존 업그레이드 레벨. 공유 상한(치명타 60%, 쿨감 60%)을
   *              정확히 계산하려면 넘겨야 한다. 생략하면 0으로 본다.
   *
   * @return {
   *   owned, raw:{버킷:합계},
   *   // ── 기존 괄호에 "더할" 값 (곱항을 새로 만들지 말 것) ──
   *   blessAdd, clawAdd, goldAdd, fangAdd, luckAdd, echoAdd, snackAdd,
   *   offlineAdd, huntAdd, eliteGoldAdd, pioneerAdd,
   *   // ── 조건부 (조건 만족 시에만 곱한다) ──
   *   lowHpAdd, gripAdd, eliteAdd, shiftAdd, recritP, mercy,
   *   // ── 상한이 적용된 최종값 ──
   *   critChance, critMult, cdrMul,
   *   // ── 요약 배율 (UI 표시용. 업그레이드 레벨 포함) ──
   *   dpsMult, goldMult, bossMult, snackMult, soulMult, offlineMult
   * }
   */
  function petPassives(pets, opt) {
    opt = opt || {};
    var owned = ownedPets(pets);
    var raw = {};
    for (var b in BUCKETS) raw[b] = 0;

    var n = pets ? pets.length : 0;
    for (var i = 0; i < n && i < PET_COUNT; i++) {
      if (!(pets[i] > 0)) continue;
      var p = PASSIVE[i];
      if (!p) continue;
      for (var k in p) if (raw[k] !== undefined) raw[k] += p[k];
    }
    raw.roster *= owned;

    /* 이 모듈이 단독으로 책임지는 상한만 적용 */
    for (var b2 in BUCKETS) {
      var cap = BUCKETS[b2].cap;
      if (cap != null && raw[b2] > cap) raw[b2] = cap;
    }

    var upsLuck  = opt.upsLuck  || 0;
    var upsBless = opt.upsBless || 0;
    var upsClaw  = opt.upsClaw  || 0;
    var upsGold  = opt.upsGold  || 0;
    var upsFang  = opt.upsFang  || 0;
    var slsEcho  = opt.slsEcho  || 0;
    var skillCdr = opt.skillCdr || 0;

    /* 공유 상한 — 업그레이드/스킬과 같은 통에 넣고 한 번만 클램프 */
    var critChance = Math.min(0.60, 0.02 * upsLuck + raw.luck);
    var cdrTotal   = Math.min(0.60, raw.cdr + skillCdr);

    /* bless 와 roster 는 "같은 가산 버킷". 곱연산으로 분리하지 말 것. */
    var blessAdd = raw.bless + raw.roster;

    return {
      owned: owned,
      raw: raw,

      blessAdd: blessAdd,
      clawAdd: raw.claw,
      goldAdd: raw.gold,
      fangAdd: raw.fang,
      luckAdd: raw.luck,
      echoAdd: raw.echo,
      snackAdd: raw.snack,
      offlineAdd: raw.offline,
      huntAdd: raw.hunt,
      eliteGoldAdd: raw.eliteGold,
      pioneerAdd: raw.pioneer,

      lowHpAdd: raw.lowHp,
      gripAdd: raw.grip,
      eliteAdd: raw.elite,
      shiftAdd: raw.shift,
      recritP: clamp(raw.recrit, 0, 1),
      mercy: raw.mercy > 0 ? 1 : 0,

      critChance: critChance,
      critMult: 5 + raw.critMult,
      cdrMul: 1 - cdrTotal,

      /* 요약 — 상단 스트립/도감 표시용. 실제 전투식은 위의 *Add 를 쓴다. */
      dpsMult: 1 + 0.08 * upsBless + blessAdd,
      goldMult: 1 + 0.12 * upsGold + raw.gold,
      bossMult: 1 + 0.18 * upsFang + raw.fang,
      snackMult: 1 + raw.snack,
      soulMult: 1 + 0.15 * slsEcho + raw.echo,
      offlineMult: 1 + raw.offline,
      clickMult: 1 + 0.35 * upsClaw + raw.claw
    };
  }

  /* ══════════════════════════════════════════════════════════════════════
     4. 적 — 지역 10 × (일반 8 + 정예 3 + 보스 2) + 대군주 5 = 135행
     ──────────────────────────────────────────────────────────────────────
     a       : WL.Creatures 아키타입 id. 신규 종 데이터 0행으로 135종을 만든다.
     palette : 아키타입 spec.coat 위에 얕게 덮어쓸 색.
     ══════════════════════════════════════════════════════════════════════ */
  var ARCHETYPES = ['insect', 'snail', 'critter', 'bird', 'reptile',
                    'fish', 'cephalopod', 'beast', 'brute', 'titan'];

  /* 색 조합 단축 — 지역마다 재사용해 파일을 짧게 유지한다 */
  function C(base, belly, pat, patA) {
    return { base: base, belly: belly, pat: pat, patA: patA == null ? 0.5 : patA };
  }

  var BIOMES = [
    { n: '이끼 낀 숲', tint: '#5E6B52',
      mobs: [
        { ic: '🐜', n: '숲개미',   a: 'insect',  palette: C('#3E4436', '#5E6650', '#1E221B') },
        { ic: '🐌', n: '달팽이',   a: 'snail',   palette: C('#8E9678', '#BFC4A6', '#565C48') },
        { ic: '🐛', n: '애벌레',   a: 'insect',  palette: C('#6E8446', '#A8BE78', '#3A4A24') },
        { ic: '🐸', n: '청개구리', a: 'critter', palette: C('#4E8A4A', '#C8DE9E', '#2A4E28') },
        { ic: '🦔', n: '고슴도치', a: 'critter', palette: C('#6E5E48', '#C4B294', '#342C20') },
        { ic: '🐞', n: '무당벌레', a: 'insect',  palette: C('#A8362E', '#E0C0A0', '#201A18') },
        { ic: '🕷️', n: '이끼거미', a: 'insect',  palette: C('#4A5840', '#7E8C68', '#242C1E') },
        { ic: '🐭', n: '들쥐',     a: 'critter', palette: C('#7A7268', '#C6BCAE', '#3A342E') }
      ],
      elites: [
        { ic: '🦉', n: '회색올빼미',   title: '파수꾼', a: 'bird',    palette: C('#6E6A5E', '#CFC8B4', '#34322C') },
        { ic: '🦫', n: '나무꾼비버',   title: '선봉',   a: 'critter', palette: C('#6A4E32', '#B89470', '#32241A') },
        { ic: '🐗', n: '새끼멧돼지',   title: '추적자', a: 'beast',   palette: C('#584E42', '#8E8070', '#2A241E') }
      ],
      bosses: [
        { ic: '🐗', n: '멧돼지 우두머리',   a: 'brute',  palette: C('#4E443A', '#8A7C68', '#241E18', .6) },
        { ic: '🕷️', n: '숲을 삼킨 거미어미', a: 'insect', palette: C('#3A4432', '#6E7C56', '#161C12', .65) }
      ] },

    { n: '바람의 초원', tint: '#8FA65B',
      mobs: [
        { ic: '🐇', n: '들토끼',   a: 'critter', palette: C('#B0A48E', '#EDE4D2', '#6E6252') },
        { ic: '🦊', n: '붉은여우', a: 'beast',   palette: C('#BE6A30', '#E8D4B0', '#3E2C22') },
        { ic: '🐑', n: '뿔양',     a: 'beast',   palette: C('#C6BCA6', '#EFE8D8', '#6E6452') },
        { ic: '🦡', n: '오소리',   a: 'critter', palette: C('#544E48', '#E2DED4', '#201E1A') },
        { ic: '🐿️', n: '다람쥐',   a: 'critter', palette: C('#A07044', '#DCC49A', '#4E3620') },
        { ic: '🦗', n: '메뚜기떼', a: 'insect',  palette: C('#7E8E46', '#B6C47E', '#3E4A22') },
        { ic: '🕊️', n: '초원비둘기', a: 'bird',  palette: C('#8E9098', '#D6D8DE', '#46484E') },
        { ic: '🦦', n: '두더지',   a: 'critter', palette: C('#5A544C', '#968E82', '#2A2622') }
      ],
      elites: [
        { ic: '🐺', n: '뿔늑대',     title: '선봉',   a: 'beast', palette: C('#7A7266', '#CAC0AE', '#3A342C') },
        { ic: '🐏', n: '큰뿔산양',   title: '파수꾼', a: 'beast', palette: C('#A8987E', '#E4DAC6', '#544A38') },
        { ic: '🦅', n: '초원매',     title: '추적자', a: 'bird',  palette: C('#7E6A50', '#E0D2B8', '#3A3024') }
      ],
      bosses: [
        { ic: '🦌', n: '초원의 큰뿔사슴',   a: 'brute', palette: C('#8E7A58', '#D8C8A6', '#463A26', .6) },
        { ic: '🐃', n: '바람을 쫓는 들소',  a: 'brute', palette: C('#4E463C', '#8A7E6C', '#221E18', .6) }
      ] },

    { n: '서리 설원', tint: '#8FB6CE',
      mobs: [
        { ic: '🐧', n: '황제펭귄', a: 'bird',    palette: C('#2E3440', '#F0EEE6', '#16181E') },
        { ic: '🦭', n: '물범',     a: 'critter', palette: C('#8E9AA6', '#DEE4EA', '#464E58') },
        { ic: '🦌', n: '순록',     a: 'beast',   palette: C('#9E8E76', '#E2D8C6', '#4E4436') },
        { ic: '🐺', n: '설원늑대', a: 'beast',   palette: C('#B6BEC8', '#EEF2F6', '#5A626C') },
        { ic: '🦉', n: '흰올빼미', a: 'bird',    palette: C('#DCE2E8', '#F6F8FA', '#8A929C') },
        { ic: '🐰', n: '눈토끼',   a: 'critter', palette: C('#E0E6EC', '#F8FAFC', '#98A0AA') },
        { ic: '🕸️', n: '서리거미', a: 'insect',  palette: C('#6E7C8A', '#B2C0CE', '#343E48') },
        { ic: '🪲', n: '얼음벌레', a: 'insect',  palette: C('#5E7A8E', '#A6C2D4', '#2C3C48') }
      ],
      elites: [
        { ic: '🐺', n: '흰늑대',     title: '파수꾼', a: 'beast', palette: C('#C8D2DC', '#F2F6FA', '#6A727C') },
        { ic: '🦌', n: '서리뿔사슴', title: '선봉',   a: 'beast', palette: C('#A2AEBA', '#E6EDF2', '#4E5660') },
        { ic: '🐆', n: '눈표범',     title: '추적자', a: 'beast', palette: C('#B4B0AA', '#E8E6E0', '#3E3C38') }
      ],
      bosses: [
        { ic: '🐻‍❄️', n: '빙하의 백곰',        a: 'brute', palette: C('#DCE4EC', '#F8FAFC', '#7E8894', .6) },
        { ic: '🦣', n: '설원을 덮은 매머드',  a: 'titan', palette: C('#8A8E96', '#D0D6DE', '#3E4248', .6) }
      ] },

    { n: '모래 사막', tint: '#C9A167',
      mobs: [
        { ic: '🦂', n: '전갈',     a: 'insect',  palette: C('#8E6A38', '#C6A068', '#463420') },
        { ic: '🐍', n: '사막뱀',   a: 'reptile', palette: C('#C2A470', '#E8D8B4', '#6E5A36') },
        { ic: '🦎', n: '도마뱀',   a: 'reptile', palette: C('#A8894E', '#D8C292', '#544428') },
        { ic: '🐪', n: '쌍봉낙타', a: 'brute',   palette: C('#B69468', '#E0CCA8', '#5E4C32') },
        { ic: '🦤', n: '모래새',   a: 'bird',    palette: C('#C6B088', '#EEE2CA', '#6A5A40') },
        { ic: '🦊', n: '사막여우', a: 'beast',   palette: C('#D8BE8E', '#F4EAD6', '#7A6644') },
        { ic: '🕷️', n: '왕거미',   a: 'insect',  palette: C('#7A6242', '#B29870', '#3A2E1E') },
        { ic: '🐀', n: '모래쥐',   a: 'critter', palette: C('#C0AC88', '#E8DCC4', '#665A44') }
      ],
      elites: [
        { ic: '🦅', n: '모래독수리', title: '파수꾼', a: 'bird',   palette: C('#9E8256', '#DCCCA8', '#4A3C26') },
        { ic: '🦂', n: '왕전갈',     title: '선봉',   a: 'insect', palette: C('#6E4E28', '#A87E48', '#341E10') },
        { ic: '🐕', n: '사막하이에나', title: '추적자', a: 'beast', palette: C('#A08A66', '#D6C6A6', '#4E4230') }
      ],
      bosses: [
        { ic: '🐫', n: '사막의 폭군',          a: 'brute',   palette: C('#8E7048', '#C8AE84', '#463424', .6) },
        { ic: '🐍', n: '모래를 헤엄치는 왕뱀', a: 'reptile', palette: C('#B29452', '#E4D29A', '#584626', .65) }
      ] },

    { n: '심해 해구', tint: '#3E6C82',
      mobs: [
        { ic: '🐟', n: '비늘물고기', a: 'fish',       palette: C('#4E7A92', '#C2D6E0', '#243C4A') },
        { ic: '🦀', n: '집게발',     a: 'insect',     palette: C('#9E4238', '#D8A08E', '#4A1E18') },
        { ic: '🦑', n: '오징어',     a: 'cephalopod', palette: C('#7E4A64', '#D0A4B6', '#3E2232') },
        { ic: '🐡', n: '복어',       a: 'fish',       palette: C('#6A7A56', '#C6CEA8', '#323C28') },
        { ic: '🪼', n: '해파리',     a: 'cephalopod', palette: C('#6E7EA8', '#CAD2E8', '#343E58') },
        { ic: '🎣', n: '등불아귀',   a: 'fish',       palette: C('#2E3A46', '#6E7C88', '#161C22') },
        { ic: '🦐', n: '갯가재',     a: 'insect',     palette: C('#3E6A70', '#88B2B4', '#1C3236') },
        { ic: '🐍', n: '심해장어',   a: 'fish',       palette: C('#3A4A58', '#8496A4', '#1A2430') }
      ],
      elites: [
        { ic: '🏮', n: '등불아귀',   title: '파수꾼', a: 'fish',   palette: C('#26303A', '#7E8E9A', '#101820') },
        { ic: '🦀', n: '대왕게',     title: '선봉',   a: 'insect', palette: C('#8E3A32', '#CE9082', '#40180E') },
        { ic: '🦈', n: '그림자상어', title: '추적자', a: 'fish',   palette: C('#3E4A54', '#96A4AE', '#1C242C') }
      ],
      bosses: [
        { ic: '🐙', n: '심해의 크라켄',     a: 'cephalopod', palette: C('#5E2E4E', '#B47E9A', '#2A1224', .65) },
        { ic: '🦴', n: '해구를 채운 고래뼈', a: 'titan',     palette: C('#C6C2B4', '#EEEAE0', '#6E6A5E', .55) }
      ] },

    { n: '울창한 정글', tint: '#3F7A4A',
      mobs: [
        { ic: '🦜', n: '앵무새',     a: 'bird',    palette: C('#2E8A56', '#E0D06A', '#164028') },
        { ic: '🐒', n: '원숭이',     a: 'critter', palette: C('#7E6242', '#C6A87E', '#3A2C1C') },
        { ic: '🐍', n: '보아뱀',     a: 'reptile', palette: C('#5E7A3E', '#B2C486', '#2A3A1C') },
        { ic: '🦥', n: '나무늘보',   a: 'critter', palette: C('#8E8670', '#C8C2AC', '#464236') },
        { ic: '🦋', n: '독나비',     a: 'insect',  palette: C('#5E3A8A', '#C0A0E0', '#2A1842') },
        { ic: '🐆', n: '재규어',     a: 'beast',   palette: C('#B08A42', '#E4D0A0', '#2E2416') },
        { ic: '🐜', n: '큰개미핥기', a: 'beast',   palette: C('#5A5248', '#A69C8C', '#2A2620') },
        { ic: '🐸', n: '왕개구리',   a: 'critter', palette: C('#3E7A46', '#A8CE8A', '#1C3A20') }
      ],
      elites: [
        { ic: '🐆', n: '흑표범',     title: '추적자', a: 'beast',  palette: C('#26242A', '#4E4A54', '#121016') },
        { ic: '🕷️', n: '왕독거미',   title: '파수꾼', a: 'insect', palette: C('#4A2E56', '#8E6EA0', '#221428') },
        { ic: '🦍', n: '붉은고릴라', title: '선봉',   a: 'brute',  palette: C('#6E3A2E', '#A87462', '#321A14') }
      ],
      bosses: [
        { ic: '🦍', n: '정글의 실버백',     a: 'brute',   palette: C('#4A4650', '#948EA0', '#22202A', .6) },
        { ic: '🐍', n: '넝쿨을 두른 뱀신',  a: 'reptile', palette: C('#3E6A3A', '#9EC486', '#1A301A', .65) }
      ] },

    { n: '화산 지대', tint: '#B4512C',
      mobs: [
        { ic: '🦂', n: '용암전갈',   a: 'insect',  palette: C('#7A2A1E', '#D8763E', '#380E08') },
        { ic: '🦇', n: '화염박쥐',   a: 'bird',    palette: C('#5A2622', '#B06248', '#280E0C') },
        { ic: '🐊', n: '마그마악어', a: 'reptile', palette: C('#4E2A22', '#C25A2E', '#220E0A') },
        { ic: '🦎', n: '불도마뱀',   a: 'reptile', palette: C('#8E3A1E', '#E08A46', '#401608') },
        { ic: '🕷️', n: '재거미',     a: 'insect',  palette: C('#4A423E', '#8E827C', '#221E1C') },
        { ic: '🐦‍⬛', n: '잿빛까마귀', a: 'bird',   palette: C('#3A3634', '#7A726E', '#1A1816') },
        { ic: '🐌', n: '용암달팽이', a: 'snail',   palette: C('#6E3A2A', '#C4764E', '#301610') },
        { ic: '🐜', n: '불개미',     a: 'insect',  palette: C('#9E3A22', '#E08E56', '#48160A') }
      ],
      elites: [
        { ic: '🐆', n: '불꽃표범',   title: '추적자', a: 'beast',  palette: C('#A24E26', '#E8A468', '#48200E') },
        { ic: '🐢', n: '화산거북',   title: '파수꾼', a: 'brute',  palette: C('#4E3E38', '#96786A', '#241C18') },
        { ic: '🪲', n: '용암갑충',   title: '선봉',   a: 'insect', palette: C('#6A2A1A', '#C06A38', '#2E0E06') }
      ],
      bosses: [
        { ic: '🦖', n: '화산의 티라노',           a: 'titan', palette: C('#6E3226', '#BE6A44', '#2E1210', .6) },
        { ic: '🔥', n: '잿더미에서 깨어난 불사조', a: 'bird',  palette: C('#C2521E', '#F6C878', '#5E1E08', .65) }
      ] },

    { n: '하늘 절벽', tint: '#7E8FB8',
      mobs: [
        { ic: '🕊️', n: '바람비둘기', a: 'bird',    palette: C('#9A9EAA', '#E2E6EE', '#4A4E58') },
        { ic: '🦅', n: '매',         a: 'bird',    palette: C('#7A6650', '#DCCCB2', '#382E22') },
        { ic: '🦢', n: '백조',       a: 'bird',    palette: C('#E8ECF2', '#FAFCFE', '#9AA2AE') },
        { ic: '🦩', n: '홍학',       a: 'bird',    palette: C('#D4788E', '#F2C6D2', '#7A3A48') },
        { ic: '🦇', n: '절벽박쥐',   a: 'bird',    palette: C('#4A4654', '#8E88A0', '#22202A') },
        { ic: '🐐', n: '산양',       a: 'beast',   palette: C('#A69C8A', '#E0D8C8', '#504A3E') },
        { ic: '🦎', n: '절벽도마뱀', a: 'reptile', palette: C('#7A8290', '#BEC6D2', '#3A3E48') },
        { ic: '🦀', n: '바위게',     a: 'insect',  palette: C('#6E6A66', '#AAA49E', '#343230') }
      ],
      elites: [
        { ic: '🦅', n: '절벽수리',   title: '추적자', a: 'bird',  palette: C('#6A5E4E', '#D2C4AA', '#302A22') },
        { ic: '🐆', n: '구름표범',   title: '파수꾼', a: 'beast', palette: C('#AEB4C0', '#E6EAF0', '#4E5460') },
        { ic: '🐏', n: '바위뿔양',   title: '선봉',   a: 'beast', palette: C('#8E8A82', '#CEC8BE', '#42403C') }
      ],
      bosses: [
        { ic: '🦅', n: '창공의 대독수리',   a: 'bird',  palette: C('#5E5244', '#CEBEA2', '#2A241C', .6) },
        { ic: '⛰️', n: '절벽을 쪼개는 뇌조', a: 'titan', palette: C('#6E7688', '#BAC2D2', '#323842', .6) }
      ] },

    { n: '고대 습지', tint: '#5A6B45',
      mobs: [
        { ic: '🐊', n: '악어',     a: 'reptile', palette: C('#4E5A40', '#A2A67E', '#242C1E') },
        { ic: '🐢', n: '늪거북',   a: 'brute',   palette: C('#5A5E46', '#9EA282', '#2A2C20') },
        { ic: '🪰', n: '늪파리',   a: 'insect',  palette: C('#3E4A3E', '#76866E', '#1C221C') },
        { ic: '🐸', n: '독개구리', a: 'critter', palette: C('#6E8A2E', '#C6DE7E', '#324214') },
        { ic: '🦫', n: '비버',     a: 'critter', palette: C('#6A503A', '#B0947A', '#32241A') },
        { ic: '🐍', n: '늪뱀',     a: 'reptile', palette: C('#4A5A48', '#96A68E', '#222A20') },
        { ic: '🪱', n: '왕거머리', a: 'snail',   palette: C('#503E42', '#8E7278', '#241A1E') },
        { ic: '🦀', n: '진흙게',   a: 'insect',  palette: C('#6A5A48', '#A89684', '#322A20') }
      ],
      elites: [
        { ic: '🐊', n: '늪의 왕악어', title: '선봉',   a: 'reptile', palette: C('#42503A', '#8E9670', '#1E2618') },
        { ic: '🐢', n: '이끼거북',   title: '파수꾼', a: 'brute',   palette: C('#4E5E42', '#8E9E76', '#242C1C') },
        { ic: '🐈', n: '안개삵',     title: '추적자', a: 'beast',   palette: C('#8A8E86', '#C6CAC2', '#42463E') }
      ],
      bosses: [
        { ic: '🦛', n: '습지의 하마왕',     a: 'brute', palette: C('#5E5052', '#A2908E', '#2A2224', .6) },
        { ic: '🐟', n: '진흙을 먹는 고대어', a: 'fish',  palette: C('#5A5238', '#A29A72', '#2A2618', .6) }
      ] },

    { n: '별빛 심연', tint: '#4A4468',
      mobs: [
        { ic: '🦈', n: '심연상어',   a: 'fish',       palette: C('#3A3A52', '#8E8EAE', '#1A1A28') },
        { ic: '🐋', n: '고래',       a: 'fish',       palette: C('#44506E', '#A2ACC8', '#202634') },
        { ic: '🦣', n: '그림자매머드', a: 'titan',    palette: C('#3E3A4A', '#7E7890', '#1C1A24') },
        { ic: '🐉', n: '새끼용',     a: 'reptile',    palette: C('#5A3E6E', '#AE8ECA', '#2A1A34') },
        { ic: '🦄', n: '환수',       a: 'beast',      palette: C('#B4AECE', '#E8E4F4', '#565070') },
        { ic: '🪼', n: '별빛해파리', a: 'cephalopod', palette: C('#5E6EA6', '#BEC8EE', '#2A3252') },
        { ic: '🦋', n: '유성나방',   a: 'insect',     palette: C('#6A5E9A', '#C2B4EE', '#302A4A') },
        { ic: '🕊️', n: '무중력새',   a: 'bird',       palette: C('#7E86B6', '#CED4F0', '#3A3E5A') }
      ],
      elites: [
        { ic: '🐺', n: '별을 쫓는 늑대', title: '추적자', a: 'beast',      palette: C('#5A5E86', '#B2B6DA', '#2A2C42') },
        { ic: '🐙', n: '공허문어',       title: '파수꾼', a: 'cephalopod', palette: C('#3E2E56', '#8A6EA8', '#1C1428') },
        { ic: '🐢', n: '운석거북',       title: '선봉',   a: 'brute',      palette: C('#4E4652', '#948A9E', '#241E28') }
      ],
      bosses: [
        { ic: '🐲', n: '별을 삼킨 용',     a: 'titan', palette: C('#4A3E72', '#9E8ECE', '#221A38', .65) },
        { ic: '💫', n: '빛을 잃은 초신성', a: 'titan', palette: C('#2E2A44', '#8A82B6', '#141220', .65) }
      ] }
  ];
  BIOMES.forEach(function (b, i) { b.i = i; });

  /* 50존마다 등장. 지역과 무관하게 순환한다. */
  var OVERLORDS = [
    { ic: '👁️', n: '심연을 보는 눈',     a: 'titan',      unique: true, palette: C('#3A2E4E', '#9E86C2', '#1A1226', .65) },
    { ic: '🌠', n: '무너진 별의 주인',   a: 'titan',      unique: true, palette: C('#4E3A56', '#C2A2CE', '#241A2A', .65) },
    { ic: '🐲', n: '시간을 삼킨 용',     a: 'titan',      unique: true, palette: C('#2E4A56', '#86BECE', '#12222A', .65) },
    { ic: '🕳️', n: '형태 없는 왕',       a: 'cephalopod', unique: true, palette: C('#22202E', '#6E6A86', '#0E0C14', .70) },
    { ic: '✨', n: '최초의 짐승',        a: 'titan',      unique: true, palette: C('#5E5238', '#E2D2A2', '#2A2418', .60) }
  ];

  /* 접두사 14단계. r = min(13, floor((z-1)/18)) → 존 235에서 포화.
     원본 11단계는 존 180에서 포화되는데 로스터가 존 123, 반복 환생이 300까지 간다. */
  var RANK = ['', '거친 ', '굶주린 ', '사나운 ', '단단한 ', '고대의 ', '광폭한 ',
              '전설의 ', '심연의 ', '초월한 ', '신화의 ', '초신성의 ', '무형의 ', '태초의 '];

  /* ══════════════════════════════════════════════════════════════════════
     5. 결정론적 선택
     ──────────────────────────────────────────────────────────────────────
     NORD: 일반 웨이브(1,2,3,5,6,8,9)에 0..6 순번을 부여한다.
     원안의 (z*7 + w*3) % 8 은 w=1 과 w=9 가 8 차이라 mod 8 에서 반드시
     충돌한다 — 선형 사상으로는 불가능하다. 순번 룩업이 유일한 해법이다.
     ══════════════════════════════════════════════════════════════════════ */
  var NORD = [0, 0, 1, 2, 0, 3, 4, 0, 5, 6];   /* 인덱스 = w (1..9). w4·w7 미사용 */

  function isElite(w) { return w === 4 || w === 7; }
  function isBossWave(w) { return w === 10; }
  function isOverlord(z, w) { return w === 10 && z % 50 === 0; }
  function cycleOf(z) { return Math.floor((z - 1) / 50); }

  function mobIdx(z, w) { return mod(z * 3 + NORD[w], 8); }
  function eliteIdx(z, w) { return mod(z * 5 + (w === 4 ? 0 : 1), 3); }
  function bossIdx(z) { return mod(cycleOf(z), 2); }
  function overlordIdx(z) { return mod(Math.round(z / 50) - 1, OVERLORDS.length); }

  function biomeFor(z) { return BIOMES[mod(Math.floor((z - 1) / 5), BIOMES.length)]; }
  function rankOf(z) { return clamp(Math.floor((z - 1) / 18), 0, RANK.length - 1); }

  function waveKind(z, w) {
    if (isOverlord(z, w)) return 'overlord';
    if (isBossWave(w)) return 'boss';
    if (isElite(w)) return 'elite';
    return 'mob';
  }

  /* 종류별 렌더 크기 배수 — 전투력이 아니라 "눈에 보이는 위압" 전용 */
  var SIZE_MUL = { mob: 1.00, elite: 1.22, boss: 1.55, overlord: 1.90 };
  var GLOW = { mob: 0, elite: 0.18, boss: 0.45, overlord: 0.85 };

  /**
   * 결정론적으로 적 1체를 뽑는다. 같은 (zone, wave) → 항상 같은 적.
   * tier 는 이름/종을 바꾸지 않는다 — 높은 티어에서 발광만 약간 세진다.
   *
   * ★ HP·보상 배율은 여기서 곱하지 않는다. WL.Difficulty 단독 책임.
   */
  function enemyFor(zone, wave, tier) {
    var z = Math.max(1, Math.floor(zone || 1));
    var w = clamp(Math.floor(wave || 1), 1, 10);
    var t = clamp(Math.floor(tier || 0), 0, 4);

    var kind = waveKind(z, w);
    var b = biomeFor(z);
    var r = rankOf(z);
    var row, title = null;

    if (kind === 'overlord')   row = OVERLORDS[overlordIdx(z)];
    else if (kind === 'boss')  row = b.bosses[bossIdx(z)];
    else if (kind === 'elite') { row = b.elites[eliteIdx(z, w)]; title = row.title; }
    else                       row = b.mobs[mobIdx(z, w)];

    /* 고유명(대군주)은 접두사를 붙이지 않는다.
       RANK 는 "같은 종이 깊은 곳에서 더 사나워진다"를 말하는 장치인데,
       대군주는 애초에 한 번씩만 나타나는 고유 개체다. 게다가 r=13('태초의')
       + '최초의 짐승' 처럼 같은 형태소가 겹쳐 한국어가 무너지는 조합이 나온다. */
    var px = row.unique ? '' : RANK[r];
    var name = px + row.n + (title ? ' 〈' + title + '〉' : '');
    var glow = GLOW[kind] + 0.04 * t;

    return {
      kind: kind,
      boss: kind === 'boss' || kind === 'overlord',
      elite: kind === 'elite',
      ic: row.ic,
      name: name,
      baseName: row.n,
      title: title,
      rank: r,
      rankName: px.trim(),
      biome: { i: b.i, n: b.n, tint: b.tint },
      archetype: row.a,
      palette: row.palette,
      sizeMul: SIZE_MUL[kind],
      glow: glow,
      tier: t,
      /* WL.Creatures.make() 에 그대로 넘길 수 있는 형태.
         renderer 의 tier 는 0..10 이므로 RANK(0..13) 를 클램프한다. */
      art: {
        species: row.a,
        tier: Math.min(10, r),
        coat: row.palette,
        tint: b.tint,
        glow: glow,
        seed: z * 1000 + w
      }
    };
  }

  /* ══════════════════════════════════════════════════════════════════════
     6. UI 최소 헬퍼
     ══════════════════════════════════════════════════════════════════════ */

  /** '🦷 산의 왕 — 보스에게 주는 피해 +10%' */
  function passiveLine(i) {
    var p = PETS[i];
    return p ? p.ic + ' ' + p.passive.desc : '';
  }

  /** 로그 한 줄용 이름 (이모지 포함) */
  function enemyLabel(e) { return e ? e.ic + ' ' + e.name : ''; }

  /**
   * enemyFor() 결과 → WL.Creatures.make() opts.
   * 렌더러가 없으면 호출부가 ic 이모지로 폴백하면 된다.
   */
  function creatureOpts(e, size) {
    var s = size || 96;
    return {
      species: e.art.species,
      tier: e.art.tier,
      size: s * e.sizeMul,
      fit: 'scene',
      flip: true,
      tint: e.art.tint,
      glow: e.art.glow,
      seed: e.art.seed,
      coat: e.art.coat
    };
  }

  /* ══════════════════════════════════════════════════════════════════════
     7. 부착
     ══════════════════════════════════════════════════════════════════════ */
  W.Content = {
    VERSION: VERSION,

    PETS: PETS,
    PET_COUNT: PET_COUNT,
    PASSIVE: PASSIVE,
    BUCKETS: BUCKETS,
    petPassive: petPassive,
    petPassives: petPassives,
    ownedPets: ownedPets,
    petCost: petCost,
    petBaseDps: petBaseDps,

    BIOMES: BIOMES,
    OVERLORDS: OVERLORDS,
    RANK: RANK,
    ARCHETYPES: ARCHETYPES,
    NORD: NORD,
    SIZE_MUL: SIZE_MUL,

    enemyFor: enemyFor,
    biomeFor: biomeFor,
    waveKind: waveKind,
    rankOf: rankOf,
    isElite: isElite,
    isBossWave: isBossWave,
    isOverlord: isOverlord,
    mobIdx: mobIdx,
    eliteIdx: eliteIdx,
    bossIdx: bossIdx,
    overlordIdx: overlordIdx,

    passiveLine: passiveLine,
    enemyLabel: enemyLabel,
    creatureOpts: creatureOpts
  };
})();
