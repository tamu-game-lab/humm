// Humm guided build 12A: self-unregistering service worker.
// Replaces the previous worker so devices that cached the old build update:
// install -> skipWaiting; activate -> delete every cache, unregister this registration, claim clients.
self.addEventListener('install', () => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => caches.delete(key)));
    await self.registration.unregister();
    await self.clients.claim();
  })());
});
