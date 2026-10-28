// Dee Chernicky Ministries service worker.
//  - App shell (home, today's confession, prayer, give, radio, offline page)
//    is precached at install, so the daily confession and the key actions
//    open without signal.
//  - Page navigations are network-first; the last good copy of a page is
//    served when offline, then the offline page.
//  - Photos, icons and hashed build assets are cache-first, bounded.
//  - API requests and anything that is not a GET are never touched.
const VERSION = "v1";
const STATIC_CACHE = `dcm-static-${VERSION}`;
const PAGE_CACHE = `dcm-pages-${VERSION}`;
const OFFLINE_PAGE = "/offline.html";
const APP_SHELL = ["/", "/today", "/prayer", "/give", "/radio", OFFLINE_PAGE];
const MAX_STATIC = 150;
const MAX_PAGES = 40;
const STATIC_PATTERNS = [/^\/photos\//, /^\/brand\//, /^\/pwa\//, /^\/_next\/static\//, /^\/_next\/image/];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PAGE_CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting?.()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("dcm-") && key !== STATIC_CACHE && key !== PAGE_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients?.claim?.()),
  );
});

async function trim(cache, max, keep) {
  const keys = await cache.keys();
  if (keys.length <= max) return;
  const victim = keys.find((request) => !keep.includes(new URL(request.url).pathname));
  if (victim) await cache.delete(victim);
}

async function handleNavigation(request) {
  const cache = await caches.open(PAGE_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
      await trim(cache, MAX_PAGES, APP_SHELL);
    }
    return response;
  } catch {
    const cached = await cache.match(request, { ignoreSearch: true });
    return cached || cache.match(OFFLINE_PAGE);
  }
}

async function handleStatic(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok && response.type === "basic") {
    await cache.put(request, response.clone());
    await trim(cache, MAX_STATIC, []);
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }
  if (STATIC_PATTERNS.some((pattern) => pattern.test(url.pathname))) {
    event.respondWith(handleStatic(request));
  }
});
