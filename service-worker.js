var cacheName = 'heroProject';
var filesToCache = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'images/aaron-burden-3403_KhdpwU-unsplash.jpg',
  'images/ben-white-4K2lIP0zc_k-unsplash.jpg',
  'images/bible-solid.svg',
  'images/cross-night.jpg',
  'images/cross-on-mountain.jpg',
  'images/edward-cisneros-QSa-uv4WJ0k-unsplash.jpg',
  'images/floating-angel.jpg',
  'images/geetanjal-khanna-8CwoHpZe3qE-unsplash.jpg',
  'images/hand-holding-heart-solid.svg',
  'images/hands-solid.svg',
  'images/hannah-busing-FF049vNP1eg-unsplash.jpg',
  'images/heaven.svg',
  'images/hero-background.jpg',
  'images/isaiah-no weapon.jpg',
  'images/john14_12.jpg',
  'images/john15_7.jpg',
  'images/lady-on-pier.jpg',
  'images/little-girl-with-wings.jpg',
  'images/man-on-knees.jpg',
  'images/matt-botsford-bBNabN9R_ac-unsplash.jpg',
  'images/rachel-lynette-french-U7HLzMO4SIY-unsplash.jpg',
  'images/scott-broome-9l7Z-oBVYYU-unsplash.jpg',
  'images/sleeping-angel.jpg',
  'images/white-bird.jpg',
  'images/woman-with-wings.jpg',
  'images/zac-durant-_6HzPU9Hyfg-unsplash.jpg'
];


self.addEventListener('install', function (e) {
  //Perform install steps
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.responseWith(
    caches.match(e.request)
    .then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(e.request);
    })
  );
});