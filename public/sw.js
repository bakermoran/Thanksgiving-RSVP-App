// Service worker for the Thanksgiving RSVP PWA.
//
// Pages are server-rendered and depend on the session cookie, so HTML and
// server function calls always go to the network. Only static assets are
// cached. Bump VERSION to drop old caches after changing this file.
const VERSION = "v1";
const STATIC_CACHE = `static-${VERSION}`;
const OFFLINE_URL = "/offline.html";

const PRECACHE = [
  OFFLINE_URL,
  "/images/turkey.svg",
  "/icons/icon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_URL)));
    return;
  }

  if (
    url.origin === self.location.origin &&
    url.pathname.startsWith("/assets/")
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Images, icons and Google Fonts: serve from cache, refresh in the background
  if (
    (url.origin === self.location.origin &&
      (url.pathname.startsWith("/images/") ||
        url.pathname.startsWith("/icons/"))) ||
    url.origin === "https://fonts.googleapis.com" ||
    url.origin === "https://fonts.gstatic.com"
  ) {
    event.respondWith(staleWhileRevalidate(event, request));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

async function staleWhileRevalidate(event, request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);

  const network = fetch(request)
    .then((response) => {
      if (response.ok || response.type === "opaque") {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  if (cached) {
    event.waitUntil(network);
    return cached;
  }
  return network;
}
