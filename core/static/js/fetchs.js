// update submited data

/**
 * submited Avatar profile
 * @param {*} id
 * @param {*} value
 */
function submitavatar(id,value) {
    value.onchange = (e) => {
        let data = e.target.value;
        console.log(data)
        id.submit()
    }
}

/**
 * submited username value data
 * @param {*} id
 * @param {*} value
 */
function updatename(id, value) {
    let value = value.value;
    console.log(value)
    id.submit()
}

/**
 * submited about profile data
 * @param {*} id
 * @param {*} body
 */
function updateabout(id, body) {
    let body = body.value;
    console.log(body)
    id.submit()
}

/**
 * add social feeds profile
 * @param {*} id
 * @param {*} name
 * @param {*} url
 */
function socialfeed(id, name, url) {
    let name = name.value;
    let url = url.value;
    console.log(`los datos de la red social son nombre : ${name} url : ${url}`)
    id.submit()
}