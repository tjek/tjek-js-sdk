import './offer-details.styl';

export default class OfferDetails {
    constructor({minWidth = 300, maxWidth = '100vw', anchorEl, contentEl}) {
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.anchorEl = anchorEl;
        this.contentEl = contentEl;
        this.elInner = document.createElement('div');
        this.elInner.className = 'sgn-offer-details-inner';

        this.el = document.createElement('div');

        this.el.className = 'sgn-offer-details';
        this.el.setAttribute('tabindex', -1);
        this.el.appendChild(this.elInner);
        this.el.appendChild(this.contentEl);

        this.position();
    }

    appendTo(el) {
        el.appendChild(this.el);

        this.el.offsetWidth;

        this.show();

        return this;
    }

    show() {
        this.el.className += ' in';

        window.addEventListener('resize', this.resize, false);

        return this;
    }

    destroy() {
        window.removeEventListener('resize', this.resize, false);

        this.el.parentNode.removeChild(this.el);
    }

    position() {
        const rect = this.anchorEl.getBoundingClientRect();
        const top = window.pageYOffset + rect.top + this.anchorEl.offsetHeight;
        let left = window.pageXOffset + rect.left;
        const width = this.anchorEl.offsetWidth;

        this.el.style.top = top + 'px';

        const rightAligned = rect.left >= window.outerWidth / 2;
        left = window.pageXOffset + rect.left;
        const right = window.pageXOffset + (window.outerWidth - rect.right);

        if (rightAligned) {
            this.el.style.left = 'auto';
            this.el.style.right = right + 'px';

            this.elInner.style.left = 'auto';
            this.elInner.style.right = 0;
        } else {
            this.el.style.left = left + 'px';
            this.el.style.right = 'auto';

            this.elInner.style.left = 0;
            this.elInner.style.right = 'auto';
        }

        this.el.style.minWidth =
            typeof this.minWidth === 'number'
                ? Math.max(width, this.minWidth) + 'px'
                : this.minWidth;
        this.el.style.maxWidth = this.maxWidth;

        this.elInner.style.width = width - 8 + 'px';
    }

    resize = () => {
        this.position();
    };
}
