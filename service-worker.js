    const CACHE_NAME = 'tremor-app-v1';
    const urlsToCache = [
        '/',
        '/index.html',
        '/icons/icon-72x72.png',
        '/icons/icon-96x96.png',
        '/icons/icon-128x128.png',
        '/icons/icon-144x144.png',
        '/icons/icon-152x152.png',
        '/icons/icon-192x192.png',
        '/icons/icon-384x384.png',
        '/icons/icon-512x512.png',
        'https://cdn.tailwindcss.com',
        'https://cdn.jsdelivr.net/npm/chart.js',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
    ];

    self.addEventListener('install', event => {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => {
                    console.log('Opened cache');
                    return cache.addAll(urlsToCache);
                })
        );
    });

    self.addEventListener('fetch', event => {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    // If not in cache, fetch from network
                    return fetch(event.request);
                })
        );
    });

    self.addEventListener('activate', event => {
        const cacheWhitelist = [CACHE_NAME];
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            // Delete old caches
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        );
    });