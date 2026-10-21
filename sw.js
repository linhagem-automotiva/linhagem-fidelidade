// Navegação: rede primeiro (evita ficar preso a uma versão antiga). Dados do Supabase nunca são cacheados.
const CACHE = 'linhagem-fidelidade-shell-v16';
const SHELL = ['./', './index.html', './admin.html', './config.js', './theme.css', './hero.jpg', './premio-lavagem.jpg', './premio-cristalizacao.jpg', './premio-farois.jpg', './premio-polimento.jpg', './premio-polimento-completo.jpg', './premio-retoque.jpg', './termos.html', './privacidade.html', './manifest.webmanifest', './admin.webmanifest', './icon-192.png', './icon-512.png', './logo.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
});
