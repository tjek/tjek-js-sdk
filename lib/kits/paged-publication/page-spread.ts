import MicroEvent from 'microevent';
import {Page, PageMode} from './page-spreads';
import {V2PageDecoration} from '../core';
import PageDecoration from '../core-ui/page-decoration';

const loadImage = (src, callback) =>
    Object.assign(new Image(), {
        onload: ({target}) => {
            callback(null, target);
        },
        onerror: () => {
            callback(new Error('Failed to load page image'));
        },
        src
    });

interface PagedPublicationPageSpreadInit {
    id: string;
    pages: Page[];
    pageDecorations: V2PageDecoration[];
    maxZoomScale: number;
    width: number;
    pageMode: PageMode;
}
class PagedPublicationPageSpread extends MicroEvent {
    contentsRendered = false;
    hotspotsRendered = false;
    el: HTMLElement;
    options: PagedPublicationPageSpreadInit;
    // @ts-expect-error
    constructor(options: PagedPublicationPageSpreadInit = {}) {
        super();
        this.options = options;
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

        el.dataset.id = this.getId();
        el.dataset.type = 'page';
        el.dataset.width = String(this.options.width);
        el.dataset.pageIds = pageIds.join(',');
        el.dataset.maxZoomScale = String(this.options.maxZoomScale);
        el.dataset.zoomable = String(false);

        return el;
    }

    renderContents() {
        const pageSpreadId = this.getId();
        const el = this.getEl();
        const pages = this.getPages();
        const pageCount = pages.length;
        let imageLoads = 0;

        let maxPageWidth = el.clientWidth * (window.devicePixelRatio || 1);
        if (this.options.pageMode === 'double') maxPageWidth = maxPageWidth / 2;

        const useLargeImage = maxPageWidth > 700;

        pages.forEach((page, i) => {
            const image = useLargeImage
                ? page.images.large
                : page.images.medium;

            const pageEl = document.createElement('div');
            const loaderEl = document.createElement('div');

            pageEl.className = 'sgn-pp__page verso__page';
            if (page.id) pageEl.dataset.id = page.id;

            if (pageCount === 2) {
                pageEl.className +=
                    i === 0 ? ' verso-page--verso' : ' verso-page--recto';
            }

            pageEl.appendChild(loaderEl);
            el.appendChild(pageEl);

            loaderEl.className = 'sgn-pp-page__loader';
            loaderEl.innerHTML = `<span>${page.label}</span>`;

            loadImage(image, (err, img) => {
                if (err) {
                    loaderEl.innerHTML = '<span>!</span>';

                    return console.error(err);
                }

                const isComplete = ++imageLoads === pageCount;
                pageEl.style.backgroundImage = `url(${image})`;
                pageEl.dataset.width = img.width;
                pageEl.dataset.height = img.height;
                pageEl.innerHTML = '&nbsp;';

                const pageDecoration = this.getPageDecoration(page.pageNumber);
                const pageDecorationEl =
                    this.renderPageDecoration(pageDecoration);

                pageEl.appendChild(pageDecorationEl);

                if (isComplete) el.dataset.zoomable = String(true);

                this.trigger('pageLoaded', {pageSpreadId, page});
                if (isComplete) {
                    this.trigger('pagesLoaded', {pageSpreadId, pages});
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
        const pages = this.getPages();

        this.el
            .querySelectorAll<HTMLElement>('.sgn-pp__page')
            .forEach((pageEl) => {
                const id = pageEl.dataset.id;
                const image = pages.find((page) => page.id === id)!.images
                    .large;

                loadImage(image, (err) => {
                    if (err) return console.error(err);

                    if (this.el.dataset.active === 'true') {
                        pageEl.dataset.image = pageEl.style.backgroundImage;
                        pageEl.style.backgroundImage = `url(${image})`;
                    }
                });
            });
    }

    zoomOut() {
        this.el
            .querySelectorAll<HTMLElement>('.sgn-pp__page[data-image]')
            .forEach((pageEl) => {
                pageEl.style.backgroundImage = pageEl.dataset.image!;

                delete pageEl.dataset.image;
            });
    }

    getPageDecorations() {
        return this.options.pageDecorations;
    }

    getPageDecoration(pageNumber) {
        const pageDecorations = this.getPageDecorations();

        return pageDecorations?.find(
            (pageDecor) => pageDecor?.page_number === pageNumber
        );
    }

    renderPageDecoration(pageDecoration) {
        const pageDecorationEl = PageDecoration({
            header: 'See more...',
            template: '',
            x: 0,
            y: 0,
            pageDecoration
        });

        return pageDecorationEl.render();
    }
}

export default PagedPublicationPageSpread;
