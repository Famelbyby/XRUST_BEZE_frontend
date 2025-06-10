const CACHE_NAME = 'my-cache';
const NO_CACHE_URLS = ['/api/v1/static']; // URL, которые не кэшируем

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(['/', '/index.html']); // Стартовый кэш
        }),
    );
});

self.addEventListener('fetch', (event) => {
    const { url } = event.request;

    // Пропускаем запросы, которые не должны кэшироваться
    if (NO_CACHE_URLS.some((path) => url.includes(path))) {
        event.respondWith(fetch(event.request));
        return;
    }

    // Кэшируем остальное
    event.respondWith(
        caches.match(event.request).then((cached) => {
            return (
                cached ||
                (url.startsWith('http') &&
                    fetch(event.request).then((response) => {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                        return response;
                    }))
            );
        }),
    );
});

// Очистка старого кэша
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key))),
            ),
    );
});
