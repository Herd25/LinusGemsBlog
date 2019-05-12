// Adding javascript application

/* Registre Service Worker */
/**
 * @method
 */
(() => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
            .register('/sw.js')
            .then(regis => {
                console.log('[Service Worker] Registred Completed')
                return regis
            })
            .catch(error => {
                console.log('[Service Worker] error regitration failed', error)
            })
        })
    }
})()

/* adding homescreen button */
let deferredPrompt;
let $ = document.querySelector.bind(document);

const addBtn = $('.add-button');
if (addBtn) {
    addBtn.style.display = 'none';
}

// A2HS prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    addBtn.style.display = 'block';
    addBtn.addEventListener('click', (e) => {
        addBtn.style.display = 'none';
        deferredPrompt.prompt();

        deferredPrompt.userChoice
        .then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt')
            } else {
                console.log('User dismissed the A2HS prompt')
            }
            deferredPrompt = null;
        })
    })
})

// Display Mensaje Offiline

window.addEventListener('online', (e) => {
    console.log('You are online')
    showOfflineWarning();
}, false)

// Show Offiline Mensaje
window.addEventListener('offline', (e) => {
    console.log('You are offline')
    hideOfflineWarning();
}, false)

if (navigator.onLine) {
    hideOfflineWarning();
} else {
    showOfflineWarning();
}

/**
 * @method
 */
function showOfflineWarning() {
    let status = $('.offline-notification');
    if (status) {
        status.classList.add('show');
    }
}

/**
 * @method
 */
function hideOfflineWarning() {
    let status = $('.offline-notification');
    if (status) {
        status.classList.remove('show');
    }
}