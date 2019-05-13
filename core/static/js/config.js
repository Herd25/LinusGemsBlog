/**
 * Define Global Selector and Methods
 */

let sel = (() => {
    'use strict';

    /**
     * Class Constructor
     * @param {Object} args
     * Recibe all Objects DOM
     */
    let Constructor = function(args) {

        let self = {};

        self.selector = args;

        self.element = document.querySelector(self.selector);

        self.each = function(callback) {
            Array.prototype.forEach.call(self, callback);
            return self;
        }

        self.html = function(value) {
            if(!value) return self.element.innerHtml;
            self.element.innerHtml = value;
            return self;
        }

        self.text = function(value) {
            if(!value) return self.element.textContent;
            self.element.innerText = value;
            return self;
        }

        self.append = function(element) {
            self.element.insertAdjacentHTML('beforeend',element);
            return self;
        }

        self.prepend = function(element) {
            self.element.insertAdjacentHTML('afterbegin',element);
            return self;
        }

        self.after = function(element) {
            self.element.insertAdjacentHTML('afterend',element);
            return self;
        }

        self.before = function(element) {
            self.element.insertAdjacentHTML('beforebegin',element);
            return self;
        }

        self.attr = function(name, value) {
            if(!name) return self.element.dataset.target;
            if(!value) return self.element.getAttribute(name);
            self.element.setAttribute(name, value);
            return self;
        }

        self.removeAttr = function(name) {
            self.element.removeAttribute(name);
            return self;
        }

        self.on = function(type, callback) {
            self.element['on' + type] = callback;
            return self;
        }

        self.toggle = function(name) {
            self.element.classList.toggle(name);
            return self;
        }

        self.addClass = function(name) {
            self.element.classList.add(name);
            return self;
        }

        self.removeClass = function(name) {
            self.element.classList.remove(name);
            return self;
        }

        self.show = function() {
            self.element.style.display = 'block';
            return self;
        }

        self.hidden = function() {
            self.element.style.display = 'none';
            return self;
        }

        return self;
    }


    /**
     * Instance Constructor
     * @param {String} Selector
     * Obtains Object form DOM
     */
    let instance = function (Selector) {
        return new Constructor(Selector);
    }

    /**
     * Inicialize class
     */
    return instance;

})();

export { sel };