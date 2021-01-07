import MicroEvent from 'microevent';
import {chunk} from '../../util';
import PageSpread from './page-spread';

class PagedPublicationPageSpreads extends MicroEvent {
    constructor(options) {
        super();
        this.options = options;
        this.collection = [];
        this.ids = {};
    }

    get(id) {
        return this.ids[id];
    }

    getFrag() {
        const frag = document.createDocumentFragment();

        this.collection.forEach((pageSpread) =>
            frag.appendChild(pageSpread.el)
        );

        return frag;
    }

    update(pageMode = 'single') {
        const pageSpreads = [];
        const ids = {};
        const pages = this.options.pages.slice();
        const {width, maxZoomScale} = this.options;

        if (pageMode === 'single') {
            pages.forEach((page) => pageSpreads.push([page]));
        } else {
            const firstPage = pages.shift();
            const lastPage = pages.length % 2 === 1 ? pages.pop() : null;
            const midstPageSpreads = chunk(pages, 2);

            if (firstPage) {
                pageSpreads.push([firstPage]);
            }
            midstPageSpreads.forEach((midstPages) =>
                pageSpreads.push(midstPages.map((page) => page))
            );
            if (lastPage) {
                pageSpreads.push([lastPage]);
            }
        }

        this.collection = pageSpreads.map((pages, i) => {
            const id = `${pageMode}-${i}`;
            const pageSpread = new PageSpread({
                width,
                pageMode,
                maxZoomScale,
                pages,
                id
            });

            pageSpread.bind('pageLoaded', (e) => this.trigger('pageLoaded', e));
            pageSpread.bind('pagesLoaded', (e) =>
                this.trigger('pagesLoaded', e)
            );

            ids[id] = pageSpread;

            return pageSpread;
        });
        this.ids = ids;

        return this;
    }
}

export default PagedPublicationPageSpreads;
