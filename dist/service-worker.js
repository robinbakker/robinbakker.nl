/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "eleventy-plugin-pwa"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "d1e0c129e1212da6a8cc1534f23041a7"
  },
  {
    "url": "assets/1tuner-bg--white.jpg",
    "revision": "860609472c5351ef9f64709845401b63"
  },
  {
    "url": "assets/1tuner-bg--white.webp",
    "revision": "622b1dc89e3137c4e8567d029d1761ab"
  },
  {
    "url": "assets/1tuner-bg.jpg",
    "revision": "ed8e44948667c12c12bacb362b4f5816"
  },
  {
    "url": "assets/1tuner-bg.webp",
    "revision": "70a6cdbce169f2eb2deba7bf9c650cd8"
  },
  {
    "url": "assets/1tuner-hom.png",
    "revision": "83d7bb95cf5b2e2227f2af11f9f70a77"
  },
  {
    "url": "assets/1tuner-home.png",
    "revision": "83d7bb95cf5b2e2227f2af11f9f70a77"
  },
  {
    "url": "assets/1tuner-logo - Copy.svg",
    "revision": "8ae838a4f8da0cbfc772a2dd4fd7d993"
  },
  {
    "url": "assets/1tuner-logo--dark.svg",
    "revision": "934b0db7b0a003dd2c64076b140b685e"
  },
  {
    "url": "assets/1tuner-logo.svg",
    "revision": "01802beae7ef63f8041dc8ecbace8ff6"
  },
  {
    "url": "assets/amp-bg-1tuner.jpg",
    "revision": "ca0dcea3fa68e0d39cea7111ba602989"
  },
  {
    "url": "assets/amp-bg-home.png",
    "revision": "9a41d6ee4677f656389af5d767f0412e"
  },
  {
    "url": "assets/amp-bg-topzender (1).png",
    "revision": "cdaca55bfb2602f65e82ec36f85d4441"
  },
  {
    "url": "assets/amp-bg-topzender.png",
    "revision": "cdaca55bfb2602f65e82ec36f85d4441"
  },
  {
    "url": "assets/amp-bg.png",
    "revision": "9a41d6ee4677f656389af5d767f0412e"
  },
  {
    "url": "assets/android-chrome-192x192.png",
    "revision": "837348290d9cb6979f31de6d3db14319"
  },
  {
    "url": "assets/android-chrome-512x512.png",
    "revision": "af0ea78ea27334894be452540618ecbd"
  },
  {
    "url": "assets/apple-touch-icon.png",
    "revision": "8adfc8f450298013368e5b5f703a31f1"
  },
  {
    "url": "assets/bg.jpg",
    "revision": "c332f67955dc1cc21f7f457f58933612"
  },
  {
    "url": "assets/bg.webp",
    "revision": "90c7d3d9a958495fa409b747903d4594"
  },
  {
    "url": "assets/bike-it.jpg",
    "revision": "adaacc0d3df41cc7fb6d9b19232e5d5a"
  },
  {
    "url": "assets/cargo-bike.jpg",
    "revision": "c19d2395c98b7f0de03734f2ed03b294"
  },
  {
    "url": "assets/favicon-16x16.png",
    "revision": "f3f2d603f1689ecdb9bf128c6f77e2e6"
  },
  {
    "url": "assets/favicon-32x32.png",
    "revision": "afd81297ccaf6d7a28a448712a101354"
  },
  {
    "url": "assets/favicon.ico",
    "revision": "1afd56328ceaa83fde73a0a80f1f277e"
  },
  {
    "url": "assets/github-solid.svg",
    "revision": "ff7dcb8ba81efadb9ffad5c260bccb2e"
  },
  {
    "url": "assets/github.svg",
    "revision": "967626d9a7596eb44d13eb949fc251df"
  },
  {
    "url": "assets/hi.jpg",
    "revision": "9bee3ea83307419686a4be347c92d5d9"
  },
  {
    "url": "assets/icon-192x192.png",
    "revision": "0e13a23619997409fe81ff602c570a0b"
  },
  {
    "url": "assets/icon-512x512.png",
    "revision": "830a812c561f9b09bb45df2505101bfd"
  },
  {
    "url": "assets/linkedin.svg",
    "revision": "2a5b0ddfc11e900d53f2ffa6a23eb89f"
  },
  {
    "url": "assets/maven-pro-400.woff2",
    "revision": "167af2a4006b90c9902559b1fe636daa"
  },
  {
    "url": "assets/medium.svg",
    "revision": "9f471de936f6d11bbd6177334b2b0785"
  },
  {
    "url": "assets/mstile-144x144.png",
    "revision": "79ff3c2750b432a961a035c7f061dbca"
  },
  {
    "url": "assets/mstile-150x150.png",
    "revision": "d7aadbf0f88f621aa68f91bdc874883c"
  },
  {
    "url": "assets/mstile-310x150.png",
    "revision": "c2a8fd099882b041a172fc3068f37f32"
  },
  {
    "url": "assets/mstile-310x310.png",
    "revision": "b77f9ab1325530a696c66e57798db190"
  },
  {
    "url": "assets/mstile-70x70.png",
    "revision": "4140a08c23872399689f765f46aa2fd1"
  },
  {
    "url": "assets/nrc (1).png",
    "revision": "f087662d07b0e0a367892514d7f292eb"
  },
  {
    "url": "assets/nz-sunrise.jpg",
    "revision": "c07d0ee283dd6f9aaf6525c78fef9c5a"
  },
  {
    "url": "assets/onetuner-dev.web.app_(website).png",
    "revision": "83d7bb95cf5b2e2227f2af11f9f70a77"
  },
  {
    "url": "assets/podcast-dkl.jpg",
    "revision": "681f6fc2684327ba3401950b5a0343d3"
  },
  {
    "url": "assets/podcast-nrc.jpg",
    "revision": "4cbba481cddc411839a15073de79eb2d"
  },
  {
    "url": "assets/podcast-nrc.png",
    "revision": "f087662d07b0e0a367892514d7f292eb"
  },
  {
    "url": "assets/podcast-pom.jpg",
    "revision": "de697680258a0eee9442b10ec221764f"
  },
  {
    "url": "assets/podcast-shoptalk.jpg",
    "revision": "f57a96c94667df77a9603ff1b363c98e"
  },
  {
    "url": "assets/radio-edge.png",
    "revision": "62b81c5d01435210d7feac37125b1436"
  },
  {
    "url": "assets/radio-kink.jpg",
    "revision": "9f049417470041c7d2a581f8bbea113d"
  },
  {
    "url": "assets/radio-npo3fm.png",
    "revision": "7803796cc34d7fa17c52d69cfe2e64ba"
  },
  {
    "url": "assets/radio-radio2.svg",
    "revision": "0d0f0eaa3c17540119429e70cd4464ba"
  },
  {
    "url": "assets/raleway-200.woff2",
    "revision": "3440406065f306d1e53513b65b4339f2"
  },
  {
    "url": "assets/rb-icon.svg",
    "revision": "655debe2893b95a89f0a0ed23fba3222"
  },
  {
    "url": "assets/rb-rawpath.svg",
    "revision": "e93df67651a8ecb37e1d0b312e9b00d6"
  },
  {
    "url": "assets/rb-test.svg",
    "revision": "042a48dc4c4a0543adb72144369e3589"
  },
  {
    "url": "assets/rb.svg",
    "revision": "1c3e1dcc6de3aa45ba88671f7b39db09"
  },
  {
    "url": "assets/safari-pinned-tab.svg",
    "revision": "5fcc6b4bd42d8be096eb1aa2b15662df"
  },
  {
    "url": "assets/share.jpg",
    "revision": "1e46324579ef4626d899f681a576edb0"
  },
  {
    "url": "assets/stroopwafel.jpg",
    "revision": "a25bb5097f16b7eff994fbd83aa8ebfc"
  },
  {
    "url": "assets/topzender-logo.svg",
    "revision": "8881af5b8e9470eec5c4604a238a9716"
  },
  {
    "url": "assets/topzender-waves.svg",
    "revision": "6fb7d2317582798d664a06bdfc039db3"
  },
  {
    "url": "assets/twitter.svg",
    "revision": "c158936062e3dd4f08360c6434aa1b6a"
  },
  {
    "url": "css/styles.css",
    "revision": "9811057387ce68627bd63583e3c700d6"
  },
  {
    "url": "en/index.html",
    "revision": "741334e6a1287beb1ddf37fea9c47364"
  },
  {
    "url": "en/uses/index.html",
    "revision": "608b75f2f637cb3a83d174dd568c35d9"
  },
  {
    "url": "images/1tuner-bg.jpg",
    "revision": "ed8e44948667c12c12bacb362b4f5816"
  },
  {
    "url": "images/1tuner-bg.webp",
    "revision": "70a6cdbce169f2eb2deba7bf9c650cd8"
  },
  {
    "url": "images/1tuner-logo.svg",
    "revision": "8ae838a4f8da0cbfc772a2dd4fd7d993"
  },
  {
    "url": "images/b.svg",
    "revision": "629199afa111460fc2582e24811538db"
  },
  {
    "url": "images/bg.jpg",
    "revision": "c332f67955dc1cc21f7f457f58933612"
  },
  {
    "url": "images/bg.webp",
    "revision": "90c7d3d9a958495fa409b747903d4594"
  },
  {
    "url": "images/logo.svg",
    "revision": "d55fb19581608807013ff34600c827d0"
  },
  {
    "url": "images/r.svg",
    "revision": "05b02870624853165440ab5167984178"
  },
  {
    "url": "images/topzender-logo.svg",
    "revision": "64085d91675300c016c6494b2ff0e870"
  },
  {
    "url": "images/topzender-waves.svg",
    "revision": "6fb7d2317582798d664a06bdfc039db3"
  },
  {
    "url": "index copy/index.html",
    "revision": "1c473160a014d32aa0f1fffff9d28630"
  },
  {
    "url": "index.html",
    "revision": "aeefd212ebfb9bf2e2d1ffc58049d2f8"
  },
  {
    "url": "js/default.js",
    "revision": "1c0e1f4cd14a315e43920a22e05f22cc"
  },
  {
    "url": "manifest.json",
    "revision": "71c22a3d50c151b7a9b73601f75e2d10"
  },
  {
    "url": "nl/index copy/index.html",
    "revision": "32d2f9bb31692c2d19779224d9f120b1"
  },
  {
    "url": "nl/index.html",
    "revision": "5ba83d76caf2d609f59ea9fc7e5152e1"
  },
  {
    "url": "us/index.html",
    "revision": "d3ffa1a4e32907dbd0efeba102d2c5ae"
  },
  {
    "url": "uses/index.html",
    "revision": "6ac40b7fbd9a7a50fd6206ade11a9553"
  },
  {
    "url": "webstory.html",
    "revision": "d610aa46ab116922e08ce6647ed5c1b8"
  },
  {
    "url": "webstory/index.html",
    "revision": "20001af506fb36eb6dce6a791e54873c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:html|json|xml)$/, new workbox.strategies.NetworkFirst({ "cacheName":"content", plugins: [new workbox.expiration.Plugin({ maxEntries: 100, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg)$/, new workbox.strategies.CacheFirst({ "cacheName":"images", plugins: [new workbox.expiration.Plugin({ maxEntries: 100, purgeOnQuotaError: false })] }), 'GET');

workbox.googleAnalytics.initialize({});
