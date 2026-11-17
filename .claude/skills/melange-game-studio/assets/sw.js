// 서비스워커 템플릿 (게임 폴더마다 하나: /<slug>/sw.js → 범위도 /<slug>/ 안만)
// SLUG는 게임 이름으로 · 배포할 때마다 VER 숫자 올리기 · 같은 사이트 다른 게임의 캐시는 건드리지 않음
const SLUG = 'mygame', VER = 1, CACHE = SLUG + '-v' + VER;
const CORE = ['./', 'index.html', 'en/', 'en/index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
const FIRST = [];   // 첫 화면에 꼭 필요한 그림·글꼴 (없어도 설치는 실패하지 않음)
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(async c => {
  await c.addAll(CORE);
  await Promise.all(FIRST.map(u => c.add(u).catch(() => {})));
}).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys()
  .then(ks => Promise.all(ks.filter(k => k.startsWith(SLUG + '-') && k !== CACHE).map(k => caches.delete(k))))
  .then(() => self.clients.claim())));
// 페이지가 이번 접속에서 받은 파일 목록을 보내면 캐시에 채움 (오프라인 실행 대비)
self.addEventListener('message', e => {
  const l = e.data && e.data.warm;
  if (Array.isArray(l)) e.waitUntil(caches.open(CACHE).then(c => Promise.all(l.slice(0, 400)
    .filter(u => u.startsWith(self.registration.scope))
    .map(u => c.match(u).then(h => h || c.add(u).catch(() => {}))))));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || !r.url.startsWith(self.registration.scope)) return;
  if (r.mode === 'navigate') {   // 페이지: 네트워크 먼저 (새 버전 바로), 끊기면 캐시
    e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); return res; })
      .catch(() => caches.match(r).then(m => m || caches.match(/\/en\//.test(r.url) ? 'en/' : './'))));
    return;
  }
  e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => {   // 그림·글꼴: 캐시 먼저
    if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); }
    return res;
  })));
});
