// Offline shell + Android share target. API calls are never cached.
const CACHE = "melange-inbox-v2";
const SHARE_CACHE = "melange-inbox-share";
const SHELL = ["./", "./index.html", "./icon.svg", "./site.webmanifest"];
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
        await Promise.all(files.map((f, i) => cache.put(new Request(base + "__share/" + Date.now() + "-" + i),
          new Response(f, { headers: { "content-type": f.type, "x-name": f.name || "screenshot.jpg", "x-time": String(f.lastModified || Date.now()) } }))));
      } catch (err) {}
      return Response.redirect(new URL("./?share=1", url).href, 303);
    })());
    return;
  }
  if (e.request.method !== "GET" || url.pathname.includes("__share/")) return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
