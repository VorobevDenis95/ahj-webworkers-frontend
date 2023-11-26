// const FETCH_PRIORITY_URLS = ['/', '/index.html', '/main.css'];
// const CacheKey = 'cache';

// const initCache = () => caches.open(CacheKey)
//   .then(
//     (cache) =>
//       cache.addAll([
//         './',
//         './index.html',
//         './main.css',
//       ]),
//     (err) => {
//       console.log(err);
//     },
//   );

// self.addEventListener('install', (e) => {
//   console.log('Установлен');
//   e.waitUntil(initCache());
// });

// self.addEventListener('activate', (e) => {
//   console.log('Активен');
//   e.waitUntil(
//     caches.keys().then((keyList) =>
//       Promise.all(keyList.map((key) => {
//         if (key !== CacheKey) {
//           return caches.delete(key);
//         }
//       }))),
//   );
// });

// async function fetchPriorityThenCache(e) {
//   let response;

//   try {
//     response = await fetch(e.request);
//   } catch (err) {
//     const cacheResponse = await caches.match(e.request);

//     if (cacheResponse) {
//       return cacheResponse;
//     }
//     console.error(err);
//     return new Response('Нет соединения');
//   }

//   const cache = await caches.open(CacheKey);
//   cache.put(e.request, response.clone());
//   return response;
// }

// async function fetchPriorityThenCacheThenImageFallback(e) {
//   let response;

//   try {
//     response = await fetch(e.request);
//   } catch (err) {
//     const cacheResponse = await caches.match(e.request);

//     if (cacheResponse) {
//       return cacheResponse;
//     }
//     console.error(err);
//     return;
//   }

//   const cache = await caches.open(CacheKey);
//   cache.put(e.request, response.clone());
//   return response;
// }

// self.addEventListener('fetch', (e) => {
//   console.log('Происходит запрос на сервер');
//   const url = new URL(e.request.url);
//   if (FETCH_PRIORITY_URLS.includes(url.pathname)) {
//     e.respondWith(fetchPriorityThenCache(e));
//     return;
//   }

//   if (url.pathname.startsWith('')) {
//     e.respondWith(fetchPriorityThenCacheThenImageFallback(e));
//     return;
//   }

//   e.respondWith(fetchPriorityThenCache(e));
// });

/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */

const version = 'v1';
const cacheName = `ahj-${version}`;
const files = ['./', './index.html', './main.js', './main.css'];

self.addEventListener('install', (event) => {
  console.log('SW Installed. Cache name:', cacheName);
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => cache.addAll(files))
      .then(self.skipWaiting()),
  );
});

self.addEventListener('activate', () => {
  console.log('SW activated');
});

self.addEventListener('fetch', (event) => {
  console.log('SW fetchin:', event.request.url);

  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request)),
  );
});
