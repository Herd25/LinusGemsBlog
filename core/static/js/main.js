// auto invocke

// require modules
import { timer } from "./time.js";
import { editor } from "./editor.js";
import { Modal, Collapse, ActivePreview, addeventclass } from "./previews.js"
import { ManagerEdit } from "./profile.js"

/**
 * @method
 */
((e) => {
    let $ = document.querySelector.bind(document);

    window.onload = () => {

        /* remove loader */
        $('#ContentBody').classList.remove('lds-hourglass')

        /* calculate modals window */
        let tiggers = $('a[data-toggle=modal], button[data-toggle=modal]');
        let close = $('.iconclose');
        let closemodl = $('.iconclose');
        let alertwelcome = $('#AlertWelcome');
        let alerts = $('#AlertsMessage');
        let modlsession = $('#ModalSession');

        Modal(tiggers, 'active')

        // close alters
        addeventclass(alertwelcome, close, 'hidde');

        //close modal
        addeventclass(modlsession, closemodl, 'hidde');

        // create collapse formularie
        let toggle = $('a[data-toggle=collapse], button[data-toggle=collapse]');
        let itemcoll = $('#SessionUser');
        let form = $('form');

        Collapse(itemcoll, toggle, form);

        // LiveImagePreview
        let event = $('#FileIcon');
        let file = $('#fileicon');

        ActivePreview(event, file, event);

        /* published current time */
        //let time = $('#Timer')
        //timer(time,"/time_feed");

        /* edit profile functions */
        let about = $('#EditAbout');
        let social = $('#EditSocialFeed');
        let photo = $('#Photo');
        let avatar = $('#Avatar');
        let avatarlive = $('#PreviewAvatar');
        let editfeed = $('#SocialFeedForm');
        let editabout = $('#AboutForm');
        let description = $('#Description');
        let changes = $('#ChangesAbout');
        let text = $('#AboutText');
        let previewtext = $('#Description')

        ManagerEdit(social, about, photo, editabout, description, editfeed, avatar, text, changes, avatarlive, previewtext);

        /* Editor Instance  */
        let Editor = $('#MyEditorPost');
        let Update = $('#MyEditorPostUpdate');
        let Actions = $('#ActionButtons');
        let inputColor = $('#ColorPicker');
        let formulary = $('#CreationPost');
        let formulary2 = $('#UpdatePost');
        let datainput = $('#TextContentEditor');
        let updateinput = $('#TextUpdateContentEditor');
        let ActionSendData = $('.MyActionButtons');
        let ActionUpdateData = $('.MyActionButtonsUpdate');
        let value = $('#TextUpdateContentEditor');

        editor(Editor, Actions, ActionSendData, inputColor, Update, value, datainput, updateinput, ActionUpdateData, formulary, formulary2);

    }

})();