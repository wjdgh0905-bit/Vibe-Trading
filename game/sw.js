// 오프라인 지원: 게임 파일은 설치 시 캐시, 그림·글꼴(같은 사이트 fonts/)은 처음 받을 때 캐시
// v65 (v3.1.3): 첫 방문 뒤·업데이트 직후 오프라인에서도 글꼴·로고·아이콘이 보이게
//  - 설치 때 첫 화면 그림·글꼴(FIRST)도 같이 받음 (하나 못 받아도 설치는 계속)
//  - 페이지가 이미 받은 같은 사이트 파일 목록을 보내면(warm) 캐시에 없는 것만 받아 둠 (서비스워커가 붙기 전에 받은 파일 · 새 버전으로 캐시를 바꾼 직후)
const CACHE = 'sanghanga-v65';
const CORE = ['./', 'index.html', 'en/', 'en/index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
const EN = new URL('en/', self.location).pathname;
const FIRST = ['fonts/fonts.css', 'fonts/inter.latin.woff2', 'fonts/noto.latin.woff2', 'fonts/gasoek.latin.woff2',
  'brand/title_ko.webp', 'brand/title_en.webp', 'brand/intro_portrait_ko.webp', 'brand/intro_portrait_v3.webp'].concat(
  ('chart_up clipboard skill_tree briefcase shopping_cart bar_chart gear_cog gift sprout level_up newspaper fire robot smartphone personality_quiz ' +
  'type_fox type_lion type_squirrel type_turtle classical_building frog_coin dna penny_coin globe_dollar shield magnifier stopwatch lightning hundred keyboard lock star ' +
  'thumbs_up explosion hourglass party_popper warning share money_bag trophy house watch_ad rocket money_wings credit_card restart cash lightbulb potion receipt zzz rank_insignia skull check_badge point_down repeat new_badge books office_building treasure_chest theater_masks')
  .split(' ').map(id => 'ui/' + id + '.webp'));

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE).then(() => Promise.all(FIRST.map(u => c.add(u).catch(() => {}))))).then(() => self.skipWaiting()));
});
// 페이지가 보낸 목록(같은 사이트 주소만, 최대 400개) 중 캐시에 없는 것만 받아 둠 · 하나 못 받아도 계속
self.addEventListener('message', e => {
  const l = e.data && e.data.warm;
  if (!Array.isArray(l)) return;
  const o = self.location.origin + '/';
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(l.slice(0, 400).filter(u => typeof u === 'string' && u.startsWith(o))
    .map(u => c.match(u).then(h => h || c.add(u).catch(() => {}))))));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // 게임 페이지: 온라인이면 최신 버전, 오프라인이면 캐시 (영어 페이지는 영어 캐시로만, 언어를 넘어 대신 보여 주지 않음)
  if (e.request.mode === 'navigate') {
    const en = url.pathname.startsWith(EN);
    e.respondWith(fetch(e.request)
      .then(r => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request.url.split('?')[0], copy)); } return r; })
      .catch(() => caches.match(e.request.url.split('?')[0]).then(h => h || caches.match(en ? 'en/' : './'))));
    return;
  }
  // 나머지(그림, 글꼴): 캐시 우선
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
    if (r.ok || r.type === 'opaque') {
      if (url.origin === location.origin) {
        const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy));
      }
    }
    return r;
  })));
});
