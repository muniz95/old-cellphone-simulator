const APP_SHELL_CACHE = 'vapour-nr1-shell-v1';
const ASSET_CACHE = 'vapour-nr1-assets-v1';
const KNOWN_CACHES = [APP_SHELL_CACHE, ASSET_CACHE];
const APP_SHELL_FILES = ['/', '/index.html', '/manifest.json', '/favicon.ico'];

const isSameOrigin = (requestUrl) => {
  const url = new URL(requestUrl);

  return url.origin === self.location.origin;
};

const isStaticRequest = (request) => {
  const url = new URL(request.url);
  const path = url.pathname;
  const destination = request.destination;

  return (
    destination === 'script' ||
    destination === 'style' ||
    destination === 'image' ||
    destination === 'font' ||
    path.startsWith('/assets/') ||
    path.startsWith('/icons/') ||
    path.endsWith('.json')
  );
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(APP_SHELL_CACHE)
      .then((cache) => cache.addAll(APP_SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => !KNOWN_CACHES.includes(cacheName))
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

const handleNavigation = async (request) => {
  try {
    const response = await fetch(request);
    const cache = await caches.open(APP_SHELL_CACHE);

    cache.put('/index.html', response.clone());
    return response;
  } catch {
    const cachedIndex = await caches.match('/index.html');

    if (cachedIndex) {
      return cachedIndex;
    }

    return caches.match('/');
  }
};

const staleWhileRevalidate = async (request) => {
  const cache = await caches.open(ASSET_CACHE);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone());
      }

      return response;
    })
    .catch(() => null);

  if (cached) {
    return cached;
  }

  const response = await networkPromise;

  if (response) {
    return response;
  }

  return fetch(request);
};

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET' || !isSameOrigin(request.url)) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
    return;
  }

  if (isStaticRequest(request)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
