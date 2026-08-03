const CACHE_NAME = 'cangyige-pwa-v1';
const ASSETS = [
    './', './index.html', './manifest.json',
    './icons/icon-192.svg', './icons/maskable.svg', './icons/apple-touch-icon.svg',
    'https://cdn.tailwindcss.com',
    'https://cdn.jsdelivr.net/npm/lunar-javascript/lunar.min.js'
];
self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});
self.addEventListener('activate', e => {
    self.clients.claim();
    e.waitUntil(caches.keys().then(keys => Promise.all(
        keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)
    )));
});
self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});