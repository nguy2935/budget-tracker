const APP_PREFIX = "Budget Tracker-"
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    "./public/index.html",
    "./public/css/style.css",
    "./public/js/index.js",
    "./public/js/idb.js"
];

self.addEventListener("install", function(e) {
    e.waitUtil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log("installing cache : " + CACHE_NAME);
            return cache.addAll(FILES_TO_CACHE)
        })
    )
});

self.addEventListener("activate", function(e) {
    e.waitUtil(
        caches.keys().then(function(keyList) {
            let cacheKeeplist = keyList.filter(function(key) {
                return key.indexOf(APP_PREFIX);
            });
            cacheKeeplist.push(CACHE_NAME);
            return Promise.all(keyList.map(function(key, i) { 
                if(cacheKeeplist.indexOf(key) === -1) {
                    console.log("deleting cache : " + keyList[i]);
                    return caches.delete(keyList[i]);
                }
            }));
        })
    )
});