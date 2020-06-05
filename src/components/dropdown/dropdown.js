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
        this.menu.hidden = false;
        this.isOpen = true;

        document.addEventListener('click', this._documentClickListener);
    }

    close() {
        if (!this.isOpen) {
            return;
        }
        this.menu.hidden = true;
        this.isOpen = false;

        document.removeEventListener('click', this._documentClickListener);
    }

    _onDocumentClicked(e) {
        if (e.target.closest('[data-dropdown]')) {
            return;
        }

        this.close();
    }
}
