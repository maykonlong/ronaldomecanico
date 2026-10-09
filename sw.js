/**
 * sw.js — Service Worker PWA para Ronaldo Mecânico
 * Cache offline, estratégias de carregamento e atualização rápida.
 */

const CACHE_NAME = 'ronaldo-mecanico-v1.0.0';

const ESTATICOS = [
  './',
  './index.html',
  './src/css/styles.css',
  './src/js/config.js',
  './src/js/main.js',
  './src/js/opening-hours.js',
  './src/js/pwa.js',
  './src/js/whatsapp.js',
  './public/icons/favicon.svg',
  './public/icons/icon-192.png',
  './public/icons/icon-512.png',
  './public/images/hero.jpg',
  './public/images/oficina.jpg',
  './manifest.webmanifest'
];

/* ── Instalação: Cache dos arquivos estáticos essenciais ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pré-carregando cache estático');
      return cache.addAll(ESTATICOS);
    }).then(() => self.skipWaiting())
  );
});

/* ── Ativação: Limpeza de caches antigos ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Removendo cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

/* ── Fetch: Estratégia Stale-While-Revalidate / Cache First ── */
self.addEventListener('fetch', (event) => {
  const request = event.request;

  /* Ignorar requisições não-GET e esquemas não suportados (ex: chrome-extension) */
  if (request.method !== 'GET' || !request.url.startsWith('http')) return;

  /* Requisições externas como Google Maps e WhatsApp tratadas com Network Only */
  if (request.url.includes('wa.me') || request.url.includes('google.com/maps')) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      /* Se encontrou no cache, retorna e atualiza em segundo plano */
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          /* Erro de rede — se for navegação HTML e não tiver cache, fallback offline */
          if (request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});
