/* Service worker: caché versionado para uso sin conexión. Sube CACHE_VERSION al cambiar archivos. */
const CACHE_VERSION = 'v2-2026-11-24';
const CACHE = 'estrategia-ef-' + CACHE_VERSION;
const ASSETS = [
  './', './index.html', './manifest.webmanifest', './css/styles.css',
  './js/svg.js', './js/gen.js', './js/app.js',
  './js/data/teoria.js', './js/data/herramientas.js', './js/data/casos1.js', './js/data/casos2.js', './js/data/casos3.js', './js/data/casos_extra.js',
  './js/data/ejercicios.js', './js/data/preguntas.js',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('estrategia-ef-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // El video (42 MB, con peticiones por rangos) va directo a la red y no se guarda en caché.
  if (/\.(mp4|vtt)$/i.test(new URL(req.url).pathname)) return;
  // Red primero para HTML (para recibir actualizaciones), caché primero para el resto.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return r;
  })));
});
