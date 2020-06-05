import IMask from 'imask';

class RegistrationPopup {
    constructor() {
        this._init();
    }

    _init() {
        this.popup = document.querySelector('[data-registration-popup]');

        if (!this.popup) {
            return;
        }

        this._initForm();
    }

    _initForm() {
        const birthdayField = this.popup.querySelector('[data-birthday]');
        IMask(birthdayField, {mask: Date});
    }
}

export default new RegistrationPopup();