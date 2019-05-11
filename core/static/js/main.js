// auto invocke

// require modules
import { timer } from "./time.js";
import { editor } from "./editor.js";
import { Modal, Collapse, ActivePreview } from "./previews.js"
import { ManagerEdit } from "./profile.js"

((e) => {
    let $ = document.querySelector.bind(document);

    window.onload = () => {
        /* calculate modals window */
        let tiggers = $('a[data-toggle=modal], button[data-toggle=modal]');

        Modal(tiggers, 'active')

        // create collapse formularie
        let toggle = $('a[data-toggle=collapse], button[data-toggle=collapse]');
        let itemcoll = $('#SessionUser');
        let form = $('form');

        Collapse(itemcoll, toggle, form);

        // LiveImagePreview
        let event = $('#FileIcon');
        let file = $('#fileicon');

        ActivePreview(event, file, '#FileIcon');

        /* published current time */
        let time = $('#Timer')
        timer(time,"/time_feed");

        /* edit profile functions */
        let about = $('#EditAbout');
        let social = $('#EditSocialFeed');
        let photo = $('#Photo');
        let avatar = $('#Avatar');
        let editfeed = $('#SocialFeedForm');
        let editabout = $('#AboutForm');
        let description = $('#Description');
        let changes = $('#ChangesAbout');
        let text = $('#AboutText');

        ManagerEdit(social, about, photo, editabout, description, editfeed, avatar, text, changes, '#PreviewAvatar', '#Description');

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

        editor(Editor, TextEditor, Actions, ActionSendData, inputColor, Update, value, datainput, updateinput, ActionUpdateData, formulary, formulary2)

    }

})();