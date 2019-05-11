// Manejador del Editor de Texto para el Blog
'use strict';

export function editor(idEditor, NameEditor, tiggers, SaveData, colordata, data, value, datainput, updateinput, UpdateData, formulary, updateformulary) {
    // Define Node Actions
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
    if ( idEditor ) {
        NameEditor.document.designMode = 'On';

        // Target Events
        tiggers.addEventListener('click', (e) => {
            const nodename = e.target.nodeName;

            if(nodename === 'I')
            {
                const nodevalue = e.target.textContent;
                for(name in nodetypes) {
                    if (name == nodevalue) {
                        if (name == 'http' || name == 'link') {
                            execCommandWidthArg(nodetypes[name],prompt('Añade la direccion del vinculo','http://'))
                            break
                        } else if (name == 'insert_photo' || name == 'attach_file' || name == 'perm_media') {
                            execCommandWidthArg(nodetypes[name],prompt('Añade la Ruta del Elemento Multimedia','./'))
                            break
                        } else if (name == 'format_color_fill' || name == 'format_color_text') {
                            colordata.click();
                            colordata.addEventListener('change', (e) => {
                                const color = e.target.value;
                                execCommandWidthArg(nodetypes[name],color)
                            })
                            break
                        } else if (name == 'code') {
                            toogleSource()
                            break
                        } else if (name == 'visibility') {
                            toogleEdit()
                            break
                        } else {
                            execCmd(nodetypes[name])
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
                        execCommandWidthArg(nodetypes[name],valuedata);
                        break
                    }
                }
            }
        })

        SaveData.addEventListener('click', (e) => {
            e.preventDefault();
            let nodename = e.target.nodeName;

            if (nodename == 'I') {
                let nodevalue = e.target.textContent;
                if (nodevalue == 'save' || nodevalue == 'send') {
                    let data = NameEditor.document.getElementsByTagName('body')[0].innerHTML;
                    datainput.value = data;
                    formulary.submit();
                } else if (nodevalue == 'cancel') {
                    formulary.reset();
                } else if (nodevalue == 'visibility') {
                    let dataframe = $('.actionsTextButtonEditor');
                    let data = NameEditor.document.getElementsByTagName('body')[0].innerHTML;
                }
            }
        })

        console.log(SaveData)
    }

    // Function for update post
    if ( data ) {
        NameEditor.document.designMode = 'On';
        NameEditor.document.getElementsByTagName('body')[0].innerHTML = value.value;

        tiggers.addEventListener('click', (e) => {
            const nodename = e.target.nodeName;

            if(nodename === 'I')
            {
                const nodevalue = e.target.textContent;
                for(name in nodetypes) {
                    if (name == nodevalue) {
                        if (name == 'http' || name == 'link') {
                            execCommandWidthArg(nodetypes[name],prompt('Añade la direccion del vinculo','http://'))
                            break
                        } else if (name == 'insert_photo' || name == 'attach_file' || name == 'perm_media') {
                            execCommandWidthArg(nodetypes[name],prompt('Añade la Ruta del Elemento Multimedia','./'))
                            break
                        } else if (name == 'format_color_fill' || name == 'format_color_text') {
                            colordata.click();
                            colordata.addEventListener('change', (e) => {
                                const color = e.target.value;
                                execCommandWidthArg(nodetypes[name],color)
                            })
                            break
                        } else if (name == 'code') {
                            toogleSource()
                            break
                        } else if (name == 'visibility') {
                            toogleEdit()
                            break
                        } else {
                            execCmd(nodetypes[name])
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
                        execCommandWidthArg(nodetypes[name],valuedata);
                        break
                    }
                }
            }
        })

        UpdateData.addEventListener('click', (e) => {
            e.preventDefault();
            let nodename = e.target.nodeName;

            if (nodename == 'I') {
                let nodevalue = e.target.textContent;
                if (nodevalue == 'save' || nodevalue == 'send') {
                    let data = NameEditor.document.getElementsByTagName('body')[0].innerHTML;
                    updateinput.value = data;
                    updateformulary.submit();
                } else if (nodevalue == 'cancel') {
                    updateformulary.reset();
                } else if (nodevalue == 'visibility') {
                    let dataframe = $('.actionsTextButtonEditor');
                    let data = NameEditor.document.getElementsByTagName('body')[0].innerHTML;
                }
            }
        })

        console.log(UpdateData)
    }

    // custom varibale control
    let showSourceCode = false
    let showEditMode = true

    // Manager Handlers Actions
    function execCmd(command) {
        NameEditor.document.execCommand(command, false, null);
    }

    function execCommandWidthArg(command, arg) {
        NameEditor.document.execCommand(command, false, arg);
    }

    function toogleSource() {
        if (showSourceCode) {
            NameEditor.document.getElementsByTagName('body')[0].innerHTML = NameEditor.document.getElementsByTagName('body')[0].textContent;
            showSourceCode = false
        } else {
            NameEditor.document.getElementsByTagName('body')[0].textContent = NameEditor.document.getElementsByTagName('body')[0].innerHTML;
            showSourceCode = true
        }
    }

    function toogleEdit() {
        if (showEditMode) {
            NameEditor.document.designMode = 'Off';
            showEditMode = false
        } else {
            NameEditor.document.designMode = 'On';
            showEditMode = true
        }
    }
}
