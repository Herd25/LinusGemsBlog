/* add start service workers */

const cacheName = "LinusGems";
const filestoCache = [
    '/',
    '/static/service/app.js',
    '/static/css/gridsystem.css',
    '/offline.html',
    '/static/js/main.js'
];

// Add install worker
/**
 * @method
 */
self.addEventListener('install', (e) => {
    console.log('[Service Worker] install')
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('[Service Worker] Caching a Shell')
            return cache.addAll(filestoCache)
        })
    )
})

// Activate worker
/**
 * @method
 */
self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Activate')
    e.waitUntil(
        caches.keys()
        .then(keylits => {
            return Promise.all(keylits.map(key => {
                if (key !== cacheName) {
                    console.log('[Service Worker] removing old cache', key)
                    return caches.delete(key)
                }
            }))
        })
    )

    return self.clients.claim();
})

// fecthing data
/**
 * @method
 */
self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] fetch', e.request.url)
    e.respondWith(
        caches.match(e.request)
        .then(resp => {
            return resp || fetch(e.request)
                            .catch(error => {
                                console.log('[Service Worker] fecth failed, return offiline page', error);
                                // Adding offiline data
                                let url = e.request.url;
                                let extension = url.split('.').pop()

                                if (extension === 'jpg' || extension === 'png') {
                                    const FALLBACKIMAGE = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="180" stroke-linejoin="round">
                                    <path stroke="#DDD" stroke-width="25" d="M99,18 15,162H183z"/>
                                    <path stroke-width="17" fill="#FFF" d="M99,18 15,162H183z" stroke="#eee"/>
                                    <path d="M91,70a9,9 0 0,1 18,0l-5,50a4,4 0 0,1-8,0z" fill="#aaa"/>
                                    <circle cy="138" r="9" cx="100" fill="#aaa"/>
                                    </svg>`

                                    return Promise.resolve(new Response(FALLBACKIMAGE, {
                                        headers : {
                                            'Content-Type' : 'image/svg+xml'
                                        }
                                    }))
                                }

                                // Return Offiline
                                return caches.match('offline.html')
                            })
        })
    )
})