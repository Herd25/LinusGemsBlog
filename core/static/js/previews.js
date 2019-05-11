// Vista Previa de Imagenes y Animaciones

let $ = document.querySelector.bind(document);

// Previews Modules
function ActivePreview(event, file, tag) {
    if (event) {
        event.addEventListener('click', (e) => {
            file.click();
            file.onchange = (e) => {
                PreviewImage(file, tag)
            }
        })
    }
}

function PreviewImage(input, tag) {
    if ( input.files && input.files[0] ) {
        let reader = new FileReader();

        reader.onload = (e) => {
            let node = `<img src="${e.target.result}" />`
            $(tag).innerHTML = node
            $(tag).appendChild(input)
        }

        reader.readAsDataURL(input.files[0])
    } else {
        console.log('hubo un error')
    }
}

// Animations Modules

function Modal(tigger, event) {
    if (tigger) {
        tigger.addEventListener('click' ,(e) => {
            e.preventDefault();
            let div = tigger.dataset.target;
            $(`${div}`).classList.toggle(event)
        })
    }
}


function Collapse(item, toggle, olditems) {
    if (item) {
        console.log(`El item en su atributo es : ${olditems.getAttribute('id')}`)
        let olditem = olditems.getAttribute('id')
        item.addEventListener('click', (e) => {
           if ( e.target.dataset.target == toggle.dataset.target) {
               let collapsible = $(`${toggle.dataset.target}`)
                console.log('si son iguales')

                if ( collapsible.className === '' ) {
                    console.log('si esta vacia y no tine la clase active')
                    $(`#${olditem}`).style.display = 'none'
                    collapsible.className = 'active'
                } else {
                    console.log('no esta vacia y si tiene la clase activa')
                    collapsible.className = ''
                    $(`#${olditem}`).style.display = 'block'
                }
           } else {
               console.log('no son iguales')
           }
            console.log(`Los target del evento son : ${e.target.dataset.target}`)
            console.log(`Los target del evento son : ${toggle.dataset.target}`)
        })
    }
}

export { Modal, Collapse, ActivePreview, PreviewImage };