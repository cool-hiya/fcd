import MenuDropdown from "@components/menu-dropdown/menu-dropdown";

class Menu {
    constructor() {
        this._init();
    }

    _init() {
        this._initDropdowns();
    }

    _initDropdowns() {
        const dropdowns = Array.from(document.querySelectorAll('[data-menu-dropdown]') || []);
        dropdowns.forEach(d => {
            new MenuDropdown(d);
        });
    }

}


export default new Menu();