// datos de corroboracion o respuesta rapidas al servidor en consultas

'use strict'

// module for current time
/**
 * function timer for post
 * @param {*} tag
 * @param {*} url
 */
export function timer(tag, url) {
    /* published current time */
    if (tag) {
        setInterval(() => {
            fetch(url)
            .then(resp => {
                resp.text().then(time => tag.innerHTML = time)
            })
            .catch(error => {
                alert(`Hubo un error al cargar modulos ${error}`)
            });
        },1000);
    }
}