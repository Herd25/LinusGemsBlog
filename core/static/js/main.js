// auto invocke

// require modules
//import { timer } from "./time.js";
import { editor } from "./editor.js";
//import { Modal, Collapse, ActivePreview } from "./previews.js"
import { ManagerEdit } from "./profile.js"
import { S } from "./config.js"

/**
 * @method
 */
((e) => {

    window.onload = () => {

        /* remove loader */
        S('#ContentBody').css.rm('lds-hourglass');

        /* calculate modals window */
        let tiggers = S('a[data-toggle=modal], button[data-toggle=modal]');
        let close = S('.iconclose');
        let closemodl = S('.closemodal');
        let alertwelcome = S('#AlertWelcome');
        let alerts = S('#AlertsMessage');
        let modlsession = S('#ModalSession');

        /**
         * Manager Modals
         */
        if(tiggers) {
            //Modal(tiggers, 'active');
        }

        // close alters
        if(close) {
            close.event.on('click', e => {
                e.preventDefault();
                alertwelcome.css.add('hidde');
            });
        }

        // create collapse formularie
        let toggle = S('a[data-toggle=collapse], button[data-toggle=collapse]');
        let itemcoll = S('#SessionUser');
        let form = S('form');

        /**
         * Manager collapse formulary
         */
        if(toggle) {
            //Collapse(itemcoll, toggle, form);
        }

        // close Modal
        if(closemodl) {
            //closemodl.event.on('click', e => {
            //    e.preventDefault();
            //    itemcoll.css.rm('active');
            //});
        }

        // LiveImagePreview
        let event = S('#FileIcon');
        let file = S('#fileicon');

        //ActivePreview(event, file, '#FileIcon');

        /* published current time */
        //let time = sel('#Timer')
        //timer(time,"/time_feed");

        /* edit profile functions */
        let about = S('#EditAbout');
        let social = S('#EditSocialFeed');
        let photo = S('#Photo');
        let avatar = S('#Avatar');
        let avatarlive = S('#PreviewAvatar');
        let editfeed = S('#SocialFeedForm');
        let editabout = S('#AboutForm');
        let description = S('#Description');
        let changes = S('#ChangesAbout');
        let text = S('#AboutText');
        let previewtext = S('#Description')

        ManagerEdit(social, about, photo, editabout, description, editfeed, avatar, text, changes, avatarlive, previewtext);

        /* Editor Instance  */
        let Editor = S('#MyEditorPost');
        let Update = S('#MyEditorPostUpdate');
        let Actions = S('#ActionButtons');
        let inputColor = S('#ColorPicker');
        let formulary = S('#CreationPost');
        let formulary2 = S('#UpdatePost');
        let datainput = S('#TextContentEditor');
        let updateinput = S('#TextUpdateContentEditor');
        let ActionSendData = S('.MyActionButtons');
        let ActionUpdateData = S('.MyActionButtonsUpdate');
        let value = S('#TextUpdateContentEditor');

        editor(Editor, Actions, ActionSendData, inputColor, Update, value, datainput, updateinput, ActionUpdateData, formulary, formulary2);

        /* tabs Manager */
        //let lkparent = sel('.tabs__links');
        //let lks = lkparent.find('a');
        //let item = sel('.tabs__contents');
        //console.log(`el item es : ${lkparent.addClass('ndie')} y su hijo es : ${lks.nodeName}`)
        //lks.addClass('active');
        //console.log(lks)
        //item.classList += 'active';
    }

})();