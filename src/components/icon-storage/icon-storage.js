class IconStorage {
    constructor() {
        this.container = document.querySelector('[data-icon-storage]');

        if (this.container) {
            this._init();
        }
    }

    async _getSprite() {
        const res = await fetch(`images/icons.svg`);
        const sprite = await res.text();
        return sprite;
    }

    async _init() {
        this._importAll(require.context('../../assets/images/icons'), false, /\.svg$/);
        this.sprite = await this._getSprite();
        this._renderSprite();
    }

    _renderSprite() {
        this.container.innerHTML = this.sprite;
    }

    _importAll(r) {
        r.keys().forEach(r);
    }
}

export default new IconStorage();