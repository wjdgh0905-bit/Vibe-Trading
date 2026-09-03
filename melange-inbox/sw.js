// Offline shell + Android share target. API calls are never cached.
const CACHE = "melange-inbox-v6";
const SHARE_CACHE = "melange-inbox-share";
const SHELL = ["./", "./index.html", "./icon.svg", "./icon-192.png", "./site.webmanifest"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== SHARE_CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  // "Share" from the phone's screenshot/gallery app lands here as a POST with the files.
  if (e.request.method === "POST" && url.pathname.endsWith("/share")) {
    e.respondWith((async () => {
      try {
        const fd = await e.request.formData();
        const files = fd.getAll("screenshots").filter(f => f && f.type && f.type.startsWith("image/"));
        const cache = await caches.open(SHARE_CACHE);
        const base = new URL("./", url).href;
        for (let i = 0; i < files.length; i++) {
          const f = files[i];
          try {
            // header values must be ByteStrings: encode non-Latin filenames (한글, emoji)
            await cache.put(new Request(base + "__share/" + Date.now() + "-" + i),
              new Response(f, { headers: { "content-type": f.type, "x-name": encodeURIComponent(f.name || "screenshot.jpg"), "x-time": String(f.lastModified || Date.now()) } }));
          } catch (err) {}
        }
      } catch (err) {}
      return Response.redirect(new URL("./?share=1", url).href, 303);
    })());
    return;
  }
  if (e.request.method !== "GET" || url.pathname.includes("__share/")) return;
  // App shell: serve the cached copy at once, refresh it in the background (stale-while-revalidate),
  // so a deploy reaches installed phones on the next open without hanging on a slow network.
  if (e.request.mode === "navigate" || url.pathname.endsWith("/index.html")) {
    const scopePath = new URL("./", self.registration.scope).pathname;
    const isIndex = url.pathname === scopePath || url.pathname === scopePath + "index.html";
    const refresh = fetch(e.request).then(r => {
      if (r && r.ok && isIndex) caches.open(CACHE).then(c => c.put("./index.html", r.clone()));
      return r;
    }).catch(() => null);
    e.waitUntil(refresh);
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = isIndex ? await cache.match("./index.html") : await cache.match(e.request);
      return cached || (await refresh) || Response.error();
    })());
    return;
  }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
