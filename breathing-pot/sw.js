/* 숨결 화분 — tiny cache-first service worker (registered by app.js only over http/https). */
const CACHE = 'sumgyeol-v1';
const PRECACHE = ['./', 'index.html', 'style.css', 'plants.js', 'whispers.js', 'audio.js', 'app.js',
  'icon.svg', 'icon-180.png', 'icon-512.png', 'manifest.webmanifest'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request).then((res) => {
    const sameOrigin = new URL(e.request.url).origin === self.location.origin;
    if (res.ok && sameOrigin) caches.open(CACHE).then((c) => c.put(e.request, res.clone()));
    return res;
  })));
});
