const CACHE = 'juno-v2';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      c.addAll([
        '/offline.html',
        '/manifest.webmanifest',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png',
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Ne pas cacher les appels Supabase ni les routes API
  if (
    e.request.method !== 'GET' ||
    url.hostname.includes('supabase.co') ||
    url.pathname.startsWith('/api/')
  ) return;

  // Pages HTML — network first, offline fallback
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('/offline.html'))
    );
    return;
  }

  // Assets statiques — network first, cache fallback
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok && url.pathname.startsWith('/_next/')) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
