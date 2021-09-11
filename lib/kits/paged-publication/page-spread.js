import MicroEvent from 'microevent';
import {loadImage} from '../../util';

class PagedPublicationPageSpread extends MicroEvent {
    constructor(options = {}) {
        super();
        this.options = options;
        this.contentsRendered = false;
        this.hotspotsRendered = false;
        this.el = this.renderEl();
    }

    getId() {
        return this.options.id;
    }

    getEl() {
        return this.el;
    }

    getPages() {
        return this.options.pages;
    }

    renderEl() {
        const el = document.createElement('div');
        const pageIds = this.getPages().map((page) => page.id);

        el.className = 'verso__page-spread sgn-pp__page-spread';

        el.setAttribute('data-id', this.getId());
        el.setAttribute('data-type', 'page');
        el.setAttribute('data-width', this.options.width);
        el.setAttribute('data-page-ids', pageIds.join(','));
        el.setAttribute('data-max-zoom-scale', this.options.maxZoomScale);
        el.setAttribute('data-zoomable', false);

        return el;
    }

    renderContents() {
        const id = this.getId();
        const el = this.getEl();
        const pages = this.getPages();
        const pageCount = pages.length;
        let imageLoads = 0;

        let maxPageWidth = el.clientWidth * (window.devicePixelRatio || 1);
        if (this.options.pageMode === 'double') {
            maxPageWidth = maxPageWidth / 2;
        }

        const useLargeImage = maxPageWidth > 700;

        pages.forEach((page, i) => {
            let image = page.images.medium;
            if (useLargeImage) {
                image = page.images.large;
            }

            const pageEl = document.createElement('div');
            const loaderEl = document.createElement('div');

            pageEl.className = 'tjek-pp__page verso__page';
            
            if (page.id != null) {
                pageEl.setAttribute('data-id', page.id);
            }

            if (pageCount === 2) {
                pageEl.className +=
                    i === 0 ? ' verso-page--verso' : ' verso-page--recto';
            }

            pageEl.appendChild(loaderEl);
            el.appendChild(pageEl);

            loaderEl.className = 'tjek-pp-page__loader';
            loaderEl.innerHTML = `<span>${page.label}</span>`;

            loadImage(image, (err, width, height) => {
                if (err == null) {
                    const isComplete = ++imageLoads === pageCount;

                    pageEl.style.backgroundImage = `url(${image})`;
                    pageEl.setAttribute('data-width', width);
                    pageEl.setAttribute('data-height', height);
                    pageEl.innerHTML = '&nbsp;';

                    if (isComplete) {
                        el.setAttribute('data-zoomable', true);
                    }

                    this.trigger('pageLoaded', {pageSpreadId: id, page});
                    if (isComplete) {
                        this.trigger('pagesLoaded', {pageSpreadId: id, pages});
                    }
                } else {
                    loaderEl.innerHTML = '<span>!</span>';
                }
            });
        });

        this.contentsRendered = true;

        return this;
    }

    clearContents() {
        this.el.innerHTML = '';
        this.contentsRendered = false;

        return this;
    }

    zoomIn() {
        const pageEls = [].slice.call(
            this.el.querySelectorAll('.tjek-pp__page')
        );
        const pages = this.getPages();

        pageEls.forEach((pageEl) => {
            const id = pageEl.getAttribute('data-id');
            const page = pages.find((page) => page.id === id);
            const image = page.images.large;

            loadImage(image, (err) => {
                if (
                    err == null &&
                    this.el.getAttribute('data-active') === 'true'
                ) {
                    pageEl.setAttribute(
                        'data-image',
                        pageEl.style.backgroundImage
                    );
                    pageEl.style.backgroundImage = `url(${image})`;
                }
            });
        });
    }

    zoomOut() {
        const pageEls = Array.from(
            this.el.querySelectorAll('.tjek-pp__page[data-image]')
        );

        pageEls.forEach((pageEl) => {
            pageEl.style.backgroundImage = pageEl.getAttribute('data-image');

            pageEl.removeAttribute('data-image');
        });
    }
}

export default PagedPublicationPageSpread;
