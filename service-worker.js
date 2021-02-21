let cache_name = "aqapp";
let urlsToCache = [
  './css/style.css',
  './css/materialize.min.css',
  './imgs/icon.png',
  './js/api.js',
  './js/main.js',
  './js/materialize.min.js',
  './js/nav.js',
  './pages/about.html',
  './pages/home.html',
  './datas.html',
  './favicon.ico',
  './index.html',
  './manifest.json',
  './nav.html'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cache_name).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  var base_url = "https://api.thingspeak.com/channels/1182846/feeds.json?results=2";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(cache_name).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function (response) {
        return response || fetch(event.request);
      })
    )
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != cache_name) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
