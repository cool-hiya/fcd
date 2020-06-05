import {isParentNode} from '@helpers';

export default class Dropdown {
    constructor(dropdown) {
        this.dropdown = dropdown;

        if (!this.dropdown) {
            return;
        }

        this.trigger = dropdown.querySelector('[data-dropdown-trigger]');
        this.menu = dropdown.querySelector('[data-dropdown-menu]');
        this.isOpen = false;
        this._documentClickListener = (e) => this._onDocumentClicked(e);

        this.trigger.addEventListener('click', () => this.toggle());

        this._addClasses();
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (this.isOpen) {
            return;
        }
        this.dropdown.classList.add('_open');
        this.isOpen = true;

        document.addEventListener('click', this._documentClickListener);
    }

    close() {
        if (!this.isOpen) {
            return;
        }
        this.dropdown.classList.remove('_open');
        this.isOpen = false;

        document.removeEventListener('click', this._documentClickListener);
    }

    _onDocumentClicked(e) {
        if (isParentNode(this.dropdown, e.target)) {
            return;
        }

        this.close();
    }

    _addClasses() {
        this.dropdown.classList.add('dropdown');
        this.menu.classList.add('dropdown__menu');
    }
}
