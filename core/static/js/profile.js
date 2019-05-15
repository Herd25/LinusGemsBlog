// imports module

import { PreviewImage } from "./previews.js"

// Profiles User Settings and Functions

/**
 * Manager Edit Profile Options
 * @param {*} social
 * @param {*} about
 * @param {*} photo
 * @param {*} editabout
 * @param {*} description
 * @param {*} editfeed
 * @param {*} avatar
 * @param {*} text
 * @param {*} changes
 * @param {*} tag1
 * @param {*} tag2
 */
function ManagerEdit(social, about, photo, editabout, description, editfeed, avatar, text, changes, tag1, tag2) {
    if (social && about) {
        about.event.click = (e) => {
            if ( editabout.style.display != 'none' ) {
                editabout.style.display = 'none';
                description.style.display = 'block';
            } else {
                editabout.style.display = 'block';
                description.style.display = 'none';
            }
        }

        social.event.click = (e) => {
            if ( editfeed.style.display != 'none' ) {
                editfeed.style.display = 'none';
            } else {
                editfeed.style.display = 'block';
            }
        }

        photo.event.click = (e) => {
            avatar.event.click();
            avatar.event.change = (e) => {
                PreviewImage(avatar, tag1)
            }
        }

        changes.event.click = (e) => {
            e.preventDefault();
            PreviewAbout(text, tag2)
        }
    }
}

/* Preview Changes */
/**
 * Preview About Changes
 * @param {*} input
 * @param {*} tag
 */
function PreviewAbout(input, tag) {
    if ( input.value != '' ) {
        tag.innerText = input.value
    } else {
        alert('No se han guardado los cambios')
    }
}

export { ManagerEdit };