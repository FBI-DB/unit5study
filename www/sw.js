const CACHE = "application-cache";

self.addEventListener("fetch", event => {
	if(location.port !== "") return;
	if(event.request.method === "GET") {
		console.log(request.url, request.url.match(/\/\g\//g))
		event.respondWith(fromCache(event.request));
		event.waitUntil(update(event.request));
	}
});

async function fromCache(request) {
	// if(request.url.match(/\/\g\//g)) request.url = request.url.split("g/")[0];
    const cache = await caches.open(CACHE);
    const match = await cache.match(request);
    return match || fetch(request);
}

async function update(request) {
    const cache = await caches.open(CACHE);
    const response = await fetch(request);
    return cache.put(request, response);
}
