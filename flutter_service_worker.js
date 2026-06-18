'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"logo.png": "6fdd2ebd00eb1b22a083c0e9b7ad9577",
"favicon.ico": "a3fad815d742146dd088aa2e0d2b2b82",
"flutter.js": "24bc71911b75b5f8135c949e27a2984e",
"privacy_policy.html": "c7edb2f359757b8c5f5361e7cf19fcdf",
"CNAME": "94ad7088bcf2eb67201ebd86b43d82ba",
"SplashScreen.jpg": "ab36150fd6b28eab4867d033bce60998",
"assets/FontManifest.json": "2a3f09429db12146b660976774660777",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Free-Regular-400.otf": "46be639d952abe98effde36da35e7701",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Brands-Regular-400.otf": "706b13a761d261d759c0a8d557ccfdcb",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Free-Solid-900.otf": "04f79325d65a672c43449be51a19734c",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/shaders/stretch_effect.frag": "40d68efbbf360632f614c731219e95f0",
"assets/assets/images/logo.png": "6fdd2ebd00eb1b22a083c0e9b7ad9577",
"assets/assets/images/splash_screen.jpg": "4ed891cc6ad44cee874f18bc2e69dd21",
"assets/assets/images/facebook.svg": "d22bf66d8ad225c594837c200fb10ee9",
"assets/assets/images/map_marker.svg": "e79dbc29bbe2a0998047704afc3b0812",
"assets/assets/images/logo_android_foreground.png": "14c32a253fe1fd3826230d565385871f",
"assets/assets/images/google.svg": "755f2c08a656572c7029714d8313ba6a",
"assets/assets/images/province_flags/nb.png": "26bc9174293c5717884e724484a082a9",
"assets/assets/images/province_flags/sk.png": "f42ecfda86995cbd66496a4c7d8da12e",
"assets/assets/images/province_flags/nl.png": "0bf2f3d87e80f876f3b4e28f3d7f9e41",
"assets/assets/images/province_flags/ab.png": "6457549e31f59e1e7f5554c113fd03ff",
"assets/assets/images/province_flags/qc.png": "97ce1c76edcb49df1b06fb0f0c66715a",
"assets/assets/images/province_flags/on.png": "74a835682d758651760feb4f349827eb",
"assets/assets/images/province_flags/yt.png": "3b3a977fa5772eabfacb4f20f60cbb9d",
"assets/assets/images/province_flags/bc.png": "81ece3e23bcb2a9e6a6d7c1ae548de41",
"assets/assets/images/province_flags/nt.png": "9c2e6fce0cfa49f189f4f633f5803c86",
"assets/assets/images/province_flags/nu.png": "5917f8eeb41dbd1dac7bf81e832dc65a",
"assets/assets/images/province_flags/ns.png": "0a233a93d170067e2a1991aeeffd83b6",
"assets/assets/images/province_flags/mb.png": "6ecd86e89cb9362209bc794d7023e330",
"assets/assets/images/province_flags/pe.png": "7b11bafcd3a5b700d22e6edd714839b4",
"assets/assets/images/canada_contour.svg": "a808a1d32933c2094d9d8599e386e920",
"assets/assets/images/logo_android.png": "0ff9e71ce7341f82df08c0a31512d09b",
"assets/assets/fonts/Roboto-Regular.ttf": "8a36205bd9b83e03af0591a004bc97f4",
"assets/assets/data/canadian_localities.json": "0cb76a3a472ee7273415393c0ab04354",
"assets/AssetManifest.bin.json": "49a57d1fbacdc7e53ee0c8fef860ea56",
"assets/fonts/MaterialIcons-Regular.otf": "a1239ddbfb5ce3fd87fceccb6e2afbc5",
"assets/AssetManifest.bin": "b807f6928e99cb8a1e22b02736e142fd",
"assets/NOTICES": "305e6f4973929a3fc942f2e02ecfe959",
"icons/Icon-512.png": "487030461f391ba61f2775f5d08aeb1e",
"icons/Icon-maskable-512.png": "487030461f391ba61f2775f5d08aeb1e",
"icons/Icon-maskable-192.png": "ea6ed02992484626e1e510acf7167a66",
"icons/Icon-192.png": "ea6ed02992484626e1e510acf7167a66",
"404.html": "198d423cd7a83d1968b336c8808fa48d",
"flutter_bootstrap.js": "0906d1cd119a925cc90aa7a0a09c8989",
"canvaskit/skwasm.wasm": "7e5f3afdd3b0747a1fd4517cea239898",
"canvaskit/skwasm.js.symbols": "3a4aadf4e8141f284bd524976b1d6bdc",
"canvaskit/chromium/canvaskit.js": "a80c765aaa8af8645c9fb1aae53f9abf",
"canvaskit/chromium/canvaskit.js.symbols": "e2d09f0e434bc118bf67dae526737d07",
"canvaskit/chromium/canvaskit.wasm": "a726e3f75a84fcdf495a15817c63a35d",
"canvaskit/canvaskit.js": "8331fe38e66b3a898c4f37648aaf7ee2",
"canvaskit/skwasm_heavy.js": "740d43a6b8240ef9e23eed8c48840da4",
"canvaskit/canvaskit.js.symbols": "a3c9f77715b642d0437d9c275caba91e",
"canvaskit/skwasm_heavy.js.symbols": "0755b4fb399918388d71b59ad390b055",
"canvaskit/canvaskit.wasm": "9b6a7830bf26959b200594729d73538e",
"canvaskit/skwasm.js": "8060d46e9a4901ca9991edd3a26be4f0",
"canvaskit/skwasm_heavy.wasm": "b0be7910760d205ea4e011458df6ee01",
"index.html": "bef24d024621b5a885d7c261e95a13fd",
"/": "bef24d024621b5a885d7c261e95a13fd",
"main.dart.js": "1bded551e961bf91fbb43a7f84e813c3",
"favicon.png": "83d4aca2a757f80fabd7edc11b191b81",
"manifest.json": "494c976f31cd6470bc076f58db9f0b61",
"version.json": "100bab95cc8933e1beccb3c98b37cee2",
"debug.js": "5d7a759c398cf57505423fa490a78b86",
"account_deletion_instruction.html": "ad1d37c7571529acc254331d5e154a04"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
