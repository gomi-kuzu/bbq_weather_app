const STATIC_DATA = [
  'index.html',
  './img/dummy.png',
  './jquery-ui-1.12.1/jquery-ui.js',
  './jquery-ui-1.12.1/jquery-ui.css',
  // '/css/materialize.css',
  // '/css/materialize.min.css',
  // '/js/materialize.js',
  // '/js/materialize.min.js',
];

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('cache_v1').then(function(cache) {
     return cache.addAll(STATIC_DATA);
   })
 );
});

self.addEventListener('fetch', function(event) {
 console.log(event.request.url);

 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});