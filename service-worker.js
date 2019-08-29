var cacheName = 'heroProject6';
// var cacheAssets = [
//   '/',
//   '/index.html',
//   '/style.css',
//   '/script.js',
//   '/images/aaron-burden-3403_KhdpwU-unsplash.jpg',
//   '/images/ben-white-4K2lIP0zc_k-unsplash.jpg',
//   '/images/bible-solid.svg',
//   '/images/cross-night.jpg',
//   '/images/cross-on-mountain.jpg',
//   '/images/edward-cisneros-QSa-uv4WJ0k-unsplash.jpg',
//   '/images/floating-angel.jpg',
//   '/images/geetanjal-khanna-8CwoHpZe3qE-unsplash.jpg',
//   '/images/hand-holding-heart-solid.svg',
//   '/images/hands-solid.svg',
//   '/images/hannah-busing-FF049vNP1eg-unsplash.jpg',
//   '/images/heaven.svg',
//   '/images/hero-background.jpg',
//   '/images/isaiah-no weapon.jpg',
//   '/images/john14_12.jpg',
//   '/images/john15_7.jpg',
//   '/images/lady-on-pier.jpg',
//   '/images/little-girl-with-wings.jpg',
//   '/images/man-on-knees.jpg',
//   '/images/matt-botsford-bBNabN9R_ac-unsplash.jpg',
//   '/images/rachel-lynette-french-U7HLzMO4SIY-unsplash.jpg',
//   '/images/scott-broome-9l7Z-oBVYYU-unsplash.jpg',
//   '/images/sleeping-angel.jpg',
//   '/images/white-bird.jpg',
//   '/images/woman-with-wings.jpg',
//   '/images/zac-durant-_6HzPU9Hyfg-unsplash.jpg'
// ];

self.addEventListener('install', e => {
  console.log('[ServiceWorker] Installed');

  // e.waitUntil Delays the event until the Promise is resolved
    e.waitUntil(
	//Only use if wanting to cache certain items 
    	// Open the cache
	    // caches.open(cacheName).then(cache => {

    // Add all the default files to the cache
    // 			console.log('ServiceWorker: Caching Files');
    // 			cache.addAll(cacheAssets);
    // 	    })
    // 	    .then(() => self.skipWaiting())
  ); // end e.waitUntil
});


self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activated');

  e.waitUntil(

    // Get all the cache keys (cacheName)
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (thisCacheName) {

        // If a cached item is saved under a previous cacheName
        if (thisCacheName !== cacheName) {

          // Delete that cached file
          console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
          return caches.delete(thisCacheName);
        }
      }));
    })
  ); // end e.waitUntil

});


self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e.request.url);

  // e.respondWidth Responds to the fetch event
  e.respondWith(

    // Check in cache for the request being made
    caches.match(e.request)


    .then(function (response) {

      // If the request is in the cache
      if (response) {
        console.log("[ServiceWorker] Found in Cache", e.request.url, response);
        // Return the cached version
        return response;
      }

      // If the request is NOT in the cache, fetch and cache

      var requestClone = e.request.clone();
      return fetch(requestClone)
        .then(function (response) {

          if (!response) {
            console.log("[ServiceWorker] No response from fetch ")
            return response;
          }

          var responseClone = response.clone();

          //  Open the cache
          caches.open(cacheName).then(function (cache) {

            // Put the fetched response in the cache
            cache.put(e.request, responseClone);
            console.log('[ServiceWorker] New Data Cached', e.request.url);

            // Return the response
            return response;

          }); // end caches.open

        })
        .catch(function (err) {
          console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
        });


    }) // end caches.match(e.request)
  ); // end e.respondWith
});