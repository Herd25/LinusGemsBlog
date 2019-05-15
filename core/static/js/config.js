/**
 * Define Global Selector and Methods
 */

function init(selector) {
    let self = {};

    self.selector = selector;

    if(!self.selector) return;

    if(self.selector === 'document') {
        self.element = [document];
    } else if (self.selector === 'window') {
        self.element = [window];
    } else {
        self.element = document.querySelector(self.selector);
    }

    self.each = function(callback) {
        let children = document.querySelector(selector).children;
        if(!callback || typeof callback !== 'function') return;
        for (let index = 0; index < children.length; index++) {
            const element = children[index];
            callback(element, index);
        }
    }

    self.find = function(name) {
        if(!name) return;
        let children = document.querySelector(selector).children;
        for(let index = 0; index < children.length; index++) {
            const element = children[index];
            if(element.nodeName === name.toUpperCase()) {
                console.log('si afirmativo');
                return init(element.nodeName);
            }
        }
        return self;
    }

    self.html = {
        children: function() {
            return self.element.children;
        },

        insert: function(node) {
            self.element.innerHTML = node;
        },

        after: function(node) {
            self.element.insertAdjacentHTML('afterend',node);
        },

        before: function(node) {
            self.element.insertAdjacentHTML('beforebegin',node);
        },

        prepend: function(node) {
            self.element.insertAdjacentHTML('afterbegin',node);
        },

        append: function(node) {
            self.element.insertAdjacentHTML('beforeend',node);
        },

        new: function(node) {
            self.element.appendChild(node);
        },

        super: function(node) {
            self.element.insertBefore(node);
        },

        remove: function() {
            self.element.parentNode.removeChild(document.querySelector(selector));
        }
    }

    self.css = {
        get: function(name) {
            if(self.element.className === name) {
                console.log('verdadero')
                return true;
            } else {
                console.log('falso')
                return false;
            }
        },

        add: function(name) {
            self.element.classList.add(name);
            return self;
        },

        rm: function(name) {
            self.element.classList.remove(name);
            return self;
        },

        toggle: function(name) {
            self.element.classList.toggle(name);
            return self;
        },

        set: function(styles) {
            if(typeof styles === 'object') {
                    let array = [],
                        stylesLength = 0;

                    for (const key in styles) {
                        if (styles.hasOwnProperty(key)) {
                            array.push(key);
                        }
                    }

                    stylesLength = array.length;

                    for (let index = 0; index < stylesLength; index++) {
                        self.element.style[array[index]] = styles[array[index]];
                    }

            } else if (typeof styles === 'string') {
                    styles = styles.replace(/\s/g,"");
                    let separator = styles.indexOf(",") ? "," : ":",
                        multiple = styles.indexOf(";");

                    if (multiple >= 0) return;

                    if (separator == ',' || separator == ':') {
                        styles = styles.split(separator);

                        if (self.element.style[styles[0]] != undefined) {
                            self.element.style[styles[0]] = styles[1];
                        } else if (self.element.style[styles[1]] != undefined) {
                            self.element.style[styles[1]] = styles[0];
                        }
                    }
            }

            return self;
        },

        hidden: function() {
            self.element.style.display = 'none';
        },

        block: function() {
            self.element.style.display = 'block';
        }
    }

    self.txt = {
        get: function() {
            return document.querySelector(selector).textContent;
        },

        set: function(value) {
            document.querySelector(selector).textContent = value;
            document.querySelector(selector).innerText = value;
        }
    }

    self.attr = {
        get: function(name) {
            if(!name) return self.element.dataset.target;
            return self.element.getAttribute(name);
        },

        set: function(name, type) {
            self.element.setAttribute(name, type);
        },

        rm: function(name) {
            self.element.removeAttribute(name);
        },
    }

    self.files = {
        get: function() {
            return self.element.files;
        },

        files: function() {
            return self.element.files;
        },

        data: function() {
            return self.element.files[0];
        }
    }

    self.event = {
        on: function(name, callback) {
            self.element.addEventListener(name, callback, false);
            return self;
        },

        off: function(name, callback) {
            self.element.removeEventListener(name, callback, false);
            return self;
        },

        click: function(callback) {
            if(!callback || typeof callback !== 'function') self.element.click();

            self.element.onclick = callback;
        },

        dbclick: function(callback) {
            if(!callback || typeof callback !== 'function') self.element.dblclick();

            self.element.ondblclick = callback;
        },

        change: function(callback) {
            if(!callback || typeof callback !== 'function') self.element.change();

            self.element.onchange = callback;
        },

        focus: function(callback) {
            if(!callback || typeof callback !== 'function') self.element.focus();

            self.element.onfocus = callback;
        },

        input: function(callback) {
            if(!callback || typeof callback !== 'function') self.element.click();

            self.element.oninput = callback;
        },

        keydown: function(callback) {
            if(!callback || typeof callback !== 'function') return;

            self.element.onkeydown = callback;
        },

        keyup: function(callback) {
            if(!callback || typeof callback !== 'function') return;

            self.element.onkeyup = callback;
        },

        load: function(callback) {
            if(!callback || typeof callback !== 'function') return;

            self.element.onload = callback;
        },

        loadInit: function(callback) {
            if(!callback || typeof callback !== 'function') return;

            self.element.onloadstart = callback;
        },

        loadEnd: function(callback) {
            if(!callback || typeof callback !== 'function') return;

            self.element.onloadend = callback;
        },

        down: function(callback) {
            if(!callback || typeof callback !== 'function') return;

            self.element.onmousedown = callback;
        },

        over: function(callback) {
            if(!callback || typeof callback !== 'function') self.element.over();

            self.element.onmouseover = callback;
        },

        out: function(callback) {
            if(!callback || typeof callback !== 'function') return;

            self.element.onmouseout = callback;
        },

        up: function(callback) {
            if(!callback || typeof callback !== 'function') return;

            self.element.onmouseup = callback;
        },

        move: function(callback) {
            if(!callback || typeof callback !== 'function') return;

            self.element.onmousemove = callback;
        },

        reset: function(callback) {
            if(!callback || typeof callback !== 'function') self.element.reset();

            self.element.onreset = callback;
        },

        resize: function(callback) {
            if(!callback || typeof callback !== 'function') return;

            self.element.onresize = callback;
        },

        select: function(callback) {
            if(!callback || typeof callback !== 'function') return;

            self.element.onselect = callback;
        },

        scroll: function(callback) {
            if(!callback || typeof callback !== 'function') return;

            self.element.onscroll = callback;
        },

        submit: function(callback) {
            if(!callback || typeof callback !== 'function') return;

            self.element.onsubmit = callback;
        },
    }

    return self;
}

let S = function(selector) {
    return new init(selector);
}


export { S };