import { S } from "./config.js"

// Manejador del Editor de Texto para el Blog
'use strict';

/**
 * Manager Editor
 * @param {*} NameEditor
 * @param {*} tiggers
 * @param {*} SaveData
 * @param {*} colordata
 * @param {*} data
 * @param {*} value
 * @param {*} datainput
 * @param {*} updateinput
 * @param {*} UpdateData
 * @param {*} formulary
 * @param {*} updateformulary
 */
export function editor(tiggers, SaveData, colordata, data, value, datainput, updateinput, UpdateData, formulary, updateformulary) {
    // Define Node Actions
    //let TextEditor = TextEditor
    let nodetypes = {
        'format_bold' : 'bold',
        'format_italic' : 'italic',
        'format_strikethrough' : 'strikeThrough',
        'format_underlined' : 'underline',
        'format_textdirection_l_to_r' : 'subscript',
        'format_textdirection_r_to_l' : 'superscript',
        'FontSize' : 'fontSize',
        'TypeFont' : 'fontName',
        'TitleSet' : 'formatBlock',
        'select_all' : 'selectAll',
        'file_copy' : 'copy',
        'compare_arrows' : 'cut',
        'insert_drive_file' : 'paste',
        'perm_media' : 'insertMedia',
        'format_align_left' : 'justifyLeft',
        'format_align_justify' : 'justifyFull',
        'format_align_center' : 'justifyCenter',
        'format_align_right' : 'justifyRight',
        'format_color_fill' : 'hiliteColor',
        'format_color_reset' : 'uncolor',
        'format_color_text' : 'foreColor',
        'format_indent_increase' : 'indent',
        'format_indent_decrease' : 'outdent',
        'format_line_spacing' : 'insertSpacing',
        'format_list_bulleted' : 'insertUnorderedList',
        'format_list_numbered' : 'insertOrderedList',
        'format_list_numbered_rtl' : 'bold',
        'format_format_quote' : 'formatblock',
        'list' : 'bold',
        'toc' : 'bold',
        'insert_photo' : 'insertImage',
        'attach_file' : 'insertFile',
        'http' : 'createLink',
        'link' : 'createLink',
        'link_off' : 'unlink',
        'code' : 'toogleCode',
        'undo' : 'undo',
        'redo' : 'redo',
        'visibility' : 'toogleEdit'
    }

    // Function for creator
    if ( TextEditor ) {
        TextEditor.document.designMode = 'On';

        // Target Events
        tiggers.event.on('click', (e) => {
            const nodename = e.target.nodeName;
            if(nodename === 'I')
            {
                const nodevalue = e.target.textContent;
                console.log(nodevalue)
                for(name in nodetypes) {
                    if (name == nodevalue) {
                        if (name == 'http' || name == 'link') {
                            execCommandWidthArg(TextEditor, nodetypes[name] ,prompt('Añade la direccion del vinculo','http://'))
                            break
                        } else if (name == 'insert_photo' || name == 'attach_file' || name == 'perm_media') {
                            execCommandWidthArg(TextEditor, nodetypes[name] ,prompt('Añade la Ruta del Elemento Multimedia','./'))
                            break
                        } else if (name == 'format_color_fill' || name == 'format_color_text') {
                            colordata.event.click();
                            colordata.event.on('change', (e) => {
                                const color = e.target.value;
                                execCommandWidthArg(nodetypes[name],color)
                            })
                            break
                        } else if (name == 'code') {
                            toogleSource(TextEditor)
                            break
                        } else if (name == 'visibility') {
                            toogleEdit(TextEditor)
                            break
                        } else {
                            execCmd(TextEditor, nodetypes[name])
                            break
                        }
                    }
                }
            }

            if(nodename === 'SELECT')
            {
                const nodevalue = e.target.id;
                const valuedata = e.target.value;
                for(name in nodetypes) {
                    if(name == nodevalue)
                    {
                        execCommandWidthArg(TextEditor, nodetypes[name],valuedata);
                        break
                    }
                }
            }
        })

        SaveData.event.on('click', (e) => {
            e.preventDefault();
            let nodename = e.target.nodeName;
            console.log(nodename)

            if (nodename == 'I') {
                let nodevalue = e.target.textContent;
                console.log(nodevalue)
                if (nodevalue == 'save' || nodevalue == 'send') {
                    let data = TextEditor.document.getElementsByTagName('body')[0].innerHTML;
                    console.log(data)
                    datainput.input.set(data);
                    console.log(datainput.input.data());
                    formulary.event.submit();
                } else if (nodevalue == 'cancel') {
                    formulary.event.reset();
                } else if (nodevalue == 'visibility') {
                    let dataframe = S('.actionsTextButtonEditor');
                    let data = TextEditor.document.getElementsByTagName('body')[0].innerHTML;
                }
            }
        })

        console.log(SaveData)
    }

    // Function for update post
    if ( data ) {
        TextEditorUpdate.document.getElementsByTagName('body')[0].innerHTML += value.input.data();
        TextEditorUpdate.document.designMode = 'On';

        tiggers.event.on('click', (e) => {
            const nodename = e.target.nodeName;

            if(nodename === 'I')
            {
                const nodevalue = e.target.textContent;
                for(name in nodetypes) {
                    if (name == nodevalue) {
                        if (name == 'http' || name == 'link') {
                            execCommandWidthArg(TextEditorUpdate, nodetypes[name],prompt('Añade la direccion del vinculo','http://'))
                            break
                        } else if (name == 'insert_photo' || name == 'attach_file' || name == 'perm_media') {
                            execCommandWidthArg(TextEditorUpdate, nodetypes[name],prompt('Añade la Ruta del Elemento Multimedia','./'))
                            break
                        } else if (name == 'format_color_fill' || name == 'format_color_text') {
                            colordata.event.click();
                            colordata.event.on('change', (e) => {
                                const color = e.target.value;
                                execCommandWidthArg(TextEditorUpdate, nodetypes[name],color)
                            })
                            break
                        } else if (name == 'code') {
                            toogleSource(TextEditorUpdate)
                            break
                        } else if (name == 'visibility') {
                            toogleEdit(TextEditorUpdate)
                            break
                        } else {
                            execCmd(TextEditorUpdate, nodetypes[name])
                            break
                        }
                    }
                }
            }

            if(nodename === 'SELECT')
            {
                const nodevalue = e.target.id;
                const valuedata = e.target.value;
                for(name in nodetypes) {
                    if(name == nodevalue)
                    {
                        execCommandWidthArg(TextEditorUpdate, nodetypes[name],valuedata);
                        break
                    }
                }
            }
        })

        UpdateData.event.click = (e) => {
            e.preventDefault();
            let nodename = e.target.nodeName;

            if (nodename == 'I') {
                let nodevalue = e.target.textContent;
                if (nodevalue == 'save' || nodevalue == 'send') {
                    let data = TextEditorUpdate.document.getElementsByTagName('body')[0].innerHTML;
                    updateinput.input.set(data);
                    updateformulary.event.submit();
                } else if (nodevalue == 'cancel') {
                    updateformulary.event.reset();
                } else if (nodevalue == 'visibility') {
                    let dataframe = S('.actionsTextButtonEditor');
                    let data = TextEditorUpdate.document.getElementsByTagName('body')[0].innerHTML;
                }
            }
        }

        console.log(UpdateData)
    }

    // custom varibale control

    // Manager Handlers Actions
    /**
     * Execute command
     * @param {String} name
     * @param {args} command
     */
    function execCmd(name,command) {
        name.document.execCommand(command, false, null);
    }

    /**
     * Function execute commands and arguments
     * @param {String} name
     * @param {args} command
     * @param {args} arg
     */
    function execCommandWidthArg(name, command, arg) {
        name.document.execCommand(command, false, arg);
    }

    /**
     * View Code Source
     * @param {String} name
     */
    function toogleSource(name) {
        let showSourceCode = false
        if (showSourceCode) {
            name.document.getElementsByTagName('body')[0].innerHTML = name.document.getElementsByTagName('body')[0].textContent;
            showSourceCode = false
        } else {
            name.document.getElementsByTagName('body')[0].textContent = name.document.getElementsByTagName('body')[0].innerHTML;
            showSourceCode = true
        }
    }

    /**
     * Enable Edit Mode
     * @param {String} name
     */
    function toogleEdit(name) {
        let showEditMode = true
        if (showEditMode) {
            name.document.designMode = 'Off';
            showEditMode = false
        } else {
            name.document.designMode = 'On';
            showEditMode = true
        }
    }
}
