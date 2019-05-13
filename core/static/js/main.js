// auto invocke

// require modules
import { timer } from "./time.js";
import { editor } from "./editor.js";
import { Modal, Collapse, ActivePreview } from "./previews.js"
import { ManagerEdit } from "./profile.js"
import { sel } from "./config.js"

/**
 * @method
 */
((e) => {
    //let sel = document.querySelector.bind(document);
    let probe = sel('div').attr('id');

    console.log(probe)
    console.log(sel())

    window.onload = () => {

        /* remove loader */
        sel('#ContentBody').removeClass('lds-hourglass');

        /* calculate modals window */
        let tiggers = sel('a[data-toggle=modal], button[data-toggle=modal]');
        let close = sel('.iconclose');
        let closemodl = sel('.iconclose');
        let alertwelcome = sel('#AlertWelcome');
        let alerts = sel('#AlertsMessage');
        let modlsession = sel('#ModalSession');

        Modal(tiggers, 'active')

        // close alters
        close.on('click', e => {
            e.preventDefault();
            alertwelcome.addClass('hidde');
        });

        // close Modal
        closemodl.on('click', e => {
            e.preventDefault();
            modlsession.addClass('hidde');
        });

        // create collapse formularie
        let toggle = sel('a[data-toggle=collapse], button[data-toggle=collapse]');
        let itemcoll = sel('#SessionUser');
        let form = sel('form');

        Collapse(itemcoll, toggle, form);

        // LiveImagePreview
        let event = sel('#FileIcon');
        let file = sel('#fileicon');

        //ActivePreview(event, file, event);

        /* published current time */
        //let time = sel('#Timer')
        //timer(time,"/time_feed");

        /* edit profile functions */
        let about = sel('#EditAbout');
        let social = sel('#EditSocialFeed');
        let photo = sel('#Photo');
        let avatar = sel('#Avatar');
        let avatarlive = sel('#PreviewAvatar');
        let editfeed = sel('#SocialFeedForm');
        let editabout = sel('#AboutForm');
        let description = sel('#Description');
        let changes = sel('#ChangesAbout');
        let text = sel('#AboutText');
        let previewtext = sel('#Description')

        //ManagerEdit(social, about, photo, editabout, description, editfeed, avatar, text, changes, avatarlive, previewtext);

        /* Editor Instance  */
        let Editor = sel('#MyEditorPost');
        let Update = sel('#MyEditorPostUpdate');
        let Actions = sel('#ActionButtons');
        let inputColor = sel('#ColorPicker');
        let formulary = sel('#CreationPost');
        let formulary2 = sel('#UpdatePost');
        let datainput = sel('#TextContentEditor');
        let updateinput = sel('#TextUpdateContentEditor');
        let ActionSendData = sel('.MyActionButtons');
        let ActionUpdateData = sel('.MyActionButtonsUpdate');
        let value = sel('#TextUpdateContentEditor');

        //editor(Editor, Actions, ActionSendData, inputColor, Update, value, datainput, updateinput, ActionUpdateData, formulary, formulary2);

        /* tabs Manager */
        let lkparent = sel('.tabs__links');
        //let lks = lkparent.find('A');
        let item = sel('.tabs__contents');
        //console.log(lks)
        //lks.addClass('active');
        console.log(item)
        //item.classList += 'active';
    }

})();