import './page_spread.styl';

export default class PageSpread {
    visibility = 'gone';
    positioned = false;
    active = false;
    constructor(el, options = {}) {
        this.el = el;
        this.options = options;
        this.id = this.options.id;
        this.type = this.options.type;
        this.pageIds = this.options.pageIds;
        this.width = this.options.width;
        this.left = this.options.left;
        this.maxZoomScale = this.options.maxZoomScale;
    }

    isZoomable() {
        return (
            this.getMaxZoomScale() > 1 &&
            this.getEl().dataset.zoomable !== 'false'
        );
    }

    isScrollable() {
        return this.getEl().classList.contains('verso--scrollable');
    }

    getEl() {
        return this.el;
    }

    getOverlayEls() {
        return this.getEl().querySelectorAll('.verso__overlay');
    }

    getPageEls() {
        return this.getEl().querySelectorAll('.verso__page');
    }

    getRect() {
        return this.getEl().getBoundingClientRect();
    }

    getContentRect() {
        const rect = {
            top: null,
            left: null,
            right: null,
            bottom: null,
            width: null,
            height: null
        };

        const pageEls = this.getPageEls();
        for (let idx = 0; idx < pageEls.length; idx++) {
            const pageEl = pageEls[idx];
            const pageRect = pageEl.getBoundingClientRect();

            if (pageRect.top < rect.top || rect.top == null) {
                rect.top = pageRect.top;
            }
            if (pageRect.left < rect.left || rect.left == null) {
                rect.left = pageRect.left;
            }
            if (pageRect.right > rect.right || rect.right == null) {
                rect.right = pageRect.right;
            }
            if (pageRect.bottom > rect.bottom || rect.bottom == null) {
                rect.bottom = pageRect.bottom;
            }
        }

        rect.top = rect.top ?? 0;
        rect.left = rect.left ?? 0;
        rect.right = rect.right ?? 0;
        rect.bottom = rect.bottom ?? 0;
        rect.width = rect.right - rect.left;
        rect.height = rect.bottom - rect.top;

        return rect;
    }

    getId() {
        return this.id;
    }

    getType() {
        return this.type;
    }

    getPageIds() {
        return this.pageIds;
    }

    getWidth() {
        return this.width;
    }

    getLeft() {
        return this.left;
    }

    getMaxZoomScale() {
        return this.maxZoomScale;
    }

    getVisibility() {
        return this.visibility;
    }

    setVisibility(visibility) {
        if (this.visibility !== visibility) {
            this.getEl().style.display =
                visibility === 'visible' ? 'block' : 'none';

            this.visibility = visibility;
        }

        return this;
    }

    position() {
        if (this.positioned === false) {
            this.getEl().style.left = `${this.getLeft()}%`;

            this.positioned = true;
        }

        return this;
    }

    activate() {
        this.active = true;
        this.getEl().dataset.active = this.active;
    }

    deactivate() {
        this.active = false;
        this.getEl().dataset.active = this.active;
    }
}
