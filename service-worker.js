const CACHE_NAME = "kal-pro-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/kalkilatris.css",
  "/kalkilatris.js",
  "/manifest.json"
];

// Enstale service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Aktivasyon ak netwayaj cache ansyen
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Entèsepte rezo pou sèvi fichye cache yo
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
