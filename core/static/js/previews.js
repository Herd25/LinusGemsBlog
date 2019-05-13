// Vista Previa de Imagenes y Animaciones

import { sel } from "./config.js"

// Previews Modules

/**
 * Active Previews submited file
 * @param {*} event
 * @param {*} file
 * @param {*} tag
 */
function ActivePreview(event, file, tag) {
    if (event) {
        event.on('click', (e) => {
            file.click();
            file.on('change', (e) => {
                PreviewImage(file, tag)
            });
        });
    }
}

/**
 * Preview Changes Image
 * @param {*} input
 * @param {*} tag
 */
function PreviewImage(input, tag) {
    if ( input.files && input.files[0] ) {
        let reader = new FileReader();

        reader.onload = (e) => {
            let node = `<img src="sel{e.target.result}" />`
            tag.html(node);
            tag.append(input);
        }

        reader.readAsDataURL(input.files[0])
    } else {
        alert('hubo un error inesperado')
    }
}

// Animations Modules
/**
 * Activate Modals
 * @param {*} tigger
 * @param {*} event
 */
function Modal(tigger, event) {
    if (tigger) {
        tigger.on('click' ,(e) => {
            e.preventDefault();
            let div = tigger.attr();
            sel(`${div}`).toggle(event);
        })
    }
}

/**
 * Manager Collapse Formulary
 * @param {*} item
 * @param {*} toggle
 * @param {*} olditems
 */
function Collapse(item, toggle, olditems) {
    if (item) {
        console.log(`El item en su atributo es : ${olditems.attr('id')} y el toggle ${toggle.attr()} y el antiguo ${olditems.attr('id')}`)
        let olditem = sel(`${olditems.attr('id')}`)
        //let parent = toggle.attr();
        //console.log(parent)
        item.on('click', (e) => {
            console.log(e.target.dataset.target)
            if ( e.target.dataset.target == toggle.attr()) {
                console.log('si son iguales')
                let collapsible = sel(`${toggle.attr()}`)

                if ( collapsible.className === '' ) {
                    console.log('si esta vacia y no tine la clase active')
                    olditem.style.display = '';
                    collapsible.className = 'active'
                } else {
                    console.log('no esta vacia y si tiene la clase activa')
                    collapsible.remove('active');
                    olditem.style.display = '';
                }
            } else {
                console.log('no son iguales')
            }
            console.log(`Los target del evento son : ${e.target.dataset.target}`)
            console.log(`Los target del evento son : ${toggle.attr()}`)
        })
    }
}

/**
 * Show Tab Panels
 * @param {*} panelIndex
 * @param {*} color
 * @param {*} buttons
 * @param {*} panels
 */
function showPanel(panelIndex, color, buttonP, panels) {
    Array.prototype.forEach.call(buttonP.children, node => {
        console.log(`node name is ${node.style}`)
        node.style.backgroundColor = '';
        node.style.color = '';
    });

    buttonP.children[panelIndex].style.backgroundColor = color;
    buttonP.children[panelIndex].style.color = "white";

    Array.prototype.forEach.call( panels ,node => {
        node.style.display = 'none';
    });

    panels[panelIndex].style.display = 'block';
    panels[panelIndex].style.backgroundColor = color;
}


/**
 * Exporting Functions
 */
export { Modal, Collapse, ActivePreview, PreviewImage, showPanel };