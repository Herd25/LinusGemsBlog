// Adding javascript application

/* Registre Service Worker */
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

const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

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
    showOffilineWarning();
}, false)

// Show Offiline Mensaje
window.addEventListener('offline', (e) => {
    console.log('You are offline')
    hideOffilineWarning();
}, false)

if (navigator.onLine) {
    hideOffilineWarning();
} else {
    showOffilineWarning();
}

function showOffilineWarning() {
    document.querySelector('.offiline-notification').classList.add('show');
}

function hideOffilineWarning() {
    document.querySelector('.offiline-notification').classList.remove('show');
}