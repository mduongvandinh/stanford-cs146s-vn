// Service Worker for CS146S Vietnamese
const CACHE_NAME = 'cs146s-vn-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/course.html',
    '/glossary.html',
    '/qr.png',
    'https://cdn.jsdelivr.net/npm/marked/marked.min.js'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(function(err) {
                console.log('Cache install failed:', err);
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(function(response) {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    // Cache markdown files and other resources
                    if (event.request.url.endsWith('.md') ||
                        event.request.url.endsWith('.html') ||
                        event.request.url.endsWith('.css') ||
                        event.request.url.endsWith('.js') ||
                        event.request.url.endsWith('.png') ||
                        event.request.url.endsWith('.jpg')) {
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });
                    }

                    return response;
                }).catch(function() {
                    // Offline fallback for HTML pages
                    if (event.request.headers.get('accept').includes('text/html')) {
                        return caches.match('/index.html');
                    }
                });
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
