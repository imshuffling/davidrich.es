// Minimal worker so the site is installable; no fetch handler, so every
// request goes straight to the network and nothing can be served stale
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
