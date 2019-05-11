// imports module

import { PreviewImage } from "./previews.js"

let $ = document.querySelector.bind(document);

// Profiles User Settings and Functions

function ManagerEdit(social, about, photo, editabout, description, editfeed, avatar, text, changes, tag1, tag2) {
    if (social && about) {
        about.onclick = (e) => {
            if ( editabout.style.display != 'none' ) {
                editabout.style.display = 'none';
                description.style.display = 'block';
            } else {
                editabout.style.display = 'block';
                description.style.display = 'none';
            }
        }

        social.onclick = (e) => {
            if ( editfeed.style.display != 'none' ) {
                editfeed.style.display = 'none';
            } else {
                editfeed.style.display = 'block';
            }
        }

        photo.onclick = (e) => {
            avatar.click();
            avatar.onchange = (e) => {
                PreviewImage(avatar, tag1)
            }
        }

        changes.onclick = (e) => {
            e.preventDefault();
            PreviewAbout(text, tag2)
        }
    }
}

/* Preview Changes */
function PreviewAbout(input, tag) {
    if ( input.value != '' ) {
        $(tag).innerText = input.value
    } else {
        alert('No se han guardado los cambios')
    }
}

export { ManagerEdit };