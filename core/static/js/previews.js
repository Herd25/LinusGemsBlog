// Vista Previa de Imagenes y Animaciones

import { S } from "./config.js"

// Previews Modules

/**
 * Active Previews submited file
 * @param {*} event
 * @param {*} file
 * @param {*} tag
 */
function ActivePreview(event, file, tag) {
    if (event) {
        event.event.on('click' ,(e) => {
            file.event.click();
            file.event.on('change' ,(e) => {
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
    if ( input.files.files() && input.files.data() ) {
        let reader = new FileReader();

        reader.onload = (e) => {
            let node = `<img src="${e.target.result}" />`
            S(tag).html.prepend(node);
        }

        reader.readAsDataURL(input.files.data())
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
    if (tigger && event) {
        tigger.event.on('click' ,(e) => {
            e.preventDefault();
            let div = tigger.attr.get();
            console.log(div)
            S(`${div}`).css.toggle(event);
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
    if (item && toggle && olditems) {
        //console.log(`El item en su atributo es : ${olditems.attr.get('id')} y el toggle ${toggle.attr.get()} y el antiguo ${olditems.attr.get('id')}`)
        let olditem = S(`#${olditems.attr.get('id')}`)

        item.event.on('click', (e) => {
            if ( e.target.dataset.target == toggle.attr.get()) {
                let collapsible = S(`${toggle.attr.get()}`)

                if ( collapsible.css.get('active') ) {
                    collapsible.css.rm('active');
                    olditem.css.add('active');
                } else {
                    collapsible.css.add('active');
                    olditem.css.rm('active');
                }
            } else {
                console.log('no son iguales')
            }
            //console.log(`Los target del evento son : ${e.target.dataset.target}`)
            //console.log(`Los target del evento son : ${toggle.attr.get()}`)
        })
    }
}

/**
 * Show Tab Panels
 * @param {Object} tab
 * @param {Selector} container
 * @param {Object} panels
 * @param {String} clas
 */
function TabPanel(tab, container, panels, clas, search) {
    let Tab = Array.prototype.slice.apply(tab)
    let Panels = Array.prototype.slice.apply(panels)

    container.event.on('click', e => {
        if(e.target.classList.contains(search)) {
            let index = Tab.indexOf(e.target);
            Tab.map(tab => tab.classList.remove(clas));
            Tab[index].classList.add(clas);
            Panels.map(panel => panel.classList.remove(clas));
            Panels[index].classList.add(clas);
        } else {
            console.log(`no existe las clase ${search}`)
        }
    });
}


/**
 * Exporting Functions
 */
export { Modal, Collapse, ActivePreview, PreviewImage, TabPanel };