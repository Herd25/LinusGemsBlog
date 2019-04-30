// auto invocke

((e) => {
    let $ = document.querySelector.bind(document);

    $('.dropdown-trigger').dropdown();
})()