// auto invocke

((e) => {
    let $ = document.querySelector.bind(document);

    window.onload = () => {
        TextEditor.document.designMode = 'On';
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
            'format_format_quote' : 'bold',
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

        $('#ActionButtons').addEventListener('click', (e) => {
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
                            const color = e.target.value;
                            console.log(color)
                            execCommandWidthArg(nodetypes[name],color)
                            console.log(nodevalue)
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
            console.log(e.target.nodeName);
        })

        // custom varibale control
        let showSourceCode = false
        let showEditMode = true

        function execCmd(command) {
            TextEditor.document.execCommand(command, false, null);
        }

        function execCommandWidthArg(command, arg) {
            TextEditor.document.execCommand(command, false, arg);
        }

        function toogleSource() {
            if (showSourceCode) {
                TextEditor.document.getElementsByTagName('body')[0].innerHTML = TextEditor.document.getElementsByTagName('body')[0].textContent;
                showSourceCode = false
            } else {
                TextEditor.document.getElementsByTagName('body')[0].textContent = TextEditor.document.getElementsByTagName('body')[0].innerHTML;
                showSourceCode = true
            }
        }

        function toogleEdit() {
            if (showEditMode) {
                TextEditor.document.designMode = 'Off';
                showEditMode = false
            } else {
                TextEditor.document.designMode = 'On';
                showEditMode = true
            }
        }
    }

})()