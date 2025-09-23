// Service Worker for offline support and caching
const _CACHE_NAME = "braingame-v1";
const STATIC_CACHE_NAME = "braingame-static-v1";
const DYNAMIC_CACHE_NAME = "braingame-dynamic-v1";

// Assets to cache on install
const STATIC_ASSETS = ["/", "/offline.html", "/manifest.json"];

// Install event - cache static assets
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(STATIC_CACHE_NAME).then((cache) => {
			return cache.addAll(STATIC_ASSETS);
		}),
	);
	self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames
					.filter((cacheName) => {
						return (
							cacheName.startsWith("braingame-") &&
							cacheName !== STATIC_CACHE_NAME &&
							cacheName !== DYNAMIC_CACHE_NAME
						);
					})
					.map((cacheName) => caches.delete(cacheName)),
			);
		}),
	);
	self.clients.claim();
});

// Fetch event - implement cache strategies
self.addEventListener("fetch", (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Skip non-GET requests
	if (request.method !== "GET") return;

	// Skip Chrome extension requests
	if (url.protocol === "chrome-extension:") return;

	// Handle API requests - Network First
	if (url.pathname.startsWith("/api/")) {
		event.respondWith(networkFirst(request));
		return;
	}

	// Handle static assets - Cache First
	if (
		request.destination === "image" ||
		request.destination === "script" ||
		request.destination === "style" ||
		request.destination === "font"
	) {
		event.respondWith(cacheFirst(request));
		return;
	}

	// Handle navigation requests - Network First with offline fallback
	if (request.mode === "navigate") {
		event.respondWith(
			networkFirst(request).catch(() => {
				return caches.match("/offline.html");
			}),
		);
		return;
	}

	// Default - Network First
	event.respondWith(networkFirst(request));
});

// Cache strategies
async function cacheFirst(request) {
	const cache = await caches.open(STATIC_CACHE_NAME);
	const cached = await cache.match(request);

	if (cached) {
		return cached;
	}

	try {
		const response = await fetch(request);
		if (response.ok) {
			cache.put(request, response.clone());
		}
		return response;
	} catch (_error) {
		return new Response("Network error", { status: 408 });
	}
}

async function networkFirst(request) {
	const cache = await caches.open(DYNAMIC_CACHE_NAME);

	try {
		const response = await fetch(request);
		if (response.ok) {
			cache.put(request, response.clone());
		}
		return response;
	} catch (error) {
		const cached = await cache.match(request);
		if (cached) {
			return cached;
		}
		throw error;
	}
}
