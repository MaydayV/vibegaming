const CACHE_NAME = 'vibegaming-cache-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/',
                '/manifest.webmanifest',
                '/icon',
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    // Stale-while-revalidate strategy for navigation and static assets
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                });
                return networkResponse;
            });
            return cachedResponse || fetchPromise;
        })
    );
});
