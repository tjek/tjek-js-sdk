import MicroEvent from '../../../vendor/microevent';
import PageSpread from '../../verso-browser/page_spread';
import * as translations from '../../translations';
import {V2Hotspot} from '../core';
import PagedPublicationPageSpread from './page-spread';
import {Page} from './page-spreads';

function getPosition(pages: Page[], ratio: number, hotspot: V2Hotspot) {
    let minX: number | null = null;
    let minY: number | null = null;
    let maxX: number | null = null;
    let maxY: number | null = null;
    const pageNumbers = pages.map((page) => page.pageNumber);

    for (const pageNumber in hotspot.locations) {
        if (pageNumbers.indexOf(Number(pageNumber)) === -1) continue;

        hotspot.locations[pageNumber].forEach(({0: x, 1: y}) => {
            if (pages[1] && pageNumbers[1] === Number(pageNumber)) x += 1;

            x /= pages.length;

            if (minX == null) {
                minX = maxX = x;
                minY = maxY = y;
            }

            if (x < minX!) minX = x;

            if (x > maxX!) maxX = x;

            if (y < minY!) minY = y;

            if (y > maxY!) maxY = y;
        });
    }

    const width = maxX! - minX!;
    const height = maxY! - minY!;

    ratio = hotspot.type === 'pagedecoration' ? 1 : ratio;

    return {
        top: (minY! / ratio) * 100,
        left: minX! * 100,
        width: width * 100,
        height: (height / ratio) * 100
    };
}

function renderHotspot(hotspot, position, contentRect, boundingRect) {
    const el = document.createElement('div');
    let top = Math.round((contentRect.height / 100) * position.top);
    let left = Math.round((contentRect.width / 100) * position.left);
    const width = Math.round((contentRect.width / 100) * position.width);
    const height = Math.round((contentRect.height / 100) * position.height);

    top += Math.round(contentRect.top);
    left += Math.round(contentRect.left);
    top -= boundingRect.top;
    left -= boundingRect.left;

    el.className = 'sgn-pp__hotspot verso__overlay';

    if (hotspot.id) el.dataset.id = hotspot.id;

    if (hotspot.type) el.dataset.type = hotspot.type;

    el.innerHTML = '';

    if (hotspot.type === 'pagedecoration') {
        el.className += ' sgn-pagedecoration-hotspot';

        if (hotspot.embed_link) {
            el.innerHTML = `
                <iframe src="${hotspot.embed_link}"
                    title="sgn-pagedecoration-embed-${hotspot.id}"
                    height="100%"
                    width="100%"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                    style="border:0;"
                ></iframe>
            `;
        } else if (hotspot.link) {
            el.innerHTML = `
            <a href="${hotspot.link}" class="sgn-pagedecoration-hotspot-link" rel="noreferrer noopener" target="_blank">
                <div class="sgn-pagedecoration-hotspot-link-content"></div>
            </a>
            `;
        }

        el.style.transform = `rotate(${hotspot.rotate}deg)`;
    }

    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;

    el.setAttribute('tabindex', '-1');
    el.setAttribute(
        'aria-label',
        `${hotspot.offer.heading}; ${hotspot.offer.pricing.price} ${hotspot.offer.pricing.currency};`
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('tabindex', '0');
            } else {
                entry.target.setAttribute('tabindex', '-1');
            }
        });
    });

    observer.observe(el);

    return el;
}

class PagedPublicationHotspots extends MicroEvent {
    currentPageSpreadId: null | string = null;
    pageSpreadsLoaded = {};
    cache: Record<
        string,
        {
            versoPageSpread: PageSpread;
            pageSpread: PagedPublicationPageSpread;
            hotspots: V2Hotspot[];
            pages: Page[];
            ratio: number;
        }
    > = {};
    constructor() {
        super();

        this.bind('hotspotsReceived', this.hotspotsReceived);
        this.bind('afterNavigation', this.afterNavigation);
        this.bind('pagesLoaded', this.pagesLoaded);
        this.bind('resized', this.resized);
    }

    renderHotspots({
        versoPageSpread,
        pageSpread,
        hotspots,
        pages,
        ratio
    }: {
        versoPageSpread: PageSpread;
        pageSpread: PagedPublicationPageSpread;
        hotspots: V2Hotspot[];
        pages: Page[];
        ratio: number;
    }) {
        const contentRect = versoPageSpread.getContentRect();
        const pageSpreadEl = pageSpread.getEl();
        const boundingRect = pageSpreadEl.getBoundingClientRect();

        pageSpreadEl
            .querySelectorAll('.sgn-pp__hotspot')
            .forEach((hotspotEl) => {
                hotspotEl.parentNode!.removeChild(hotspotEl);
            });

        const frag = document.createDocumentFragment();
        for (const id in hotspots) {
            const hotspot = hotspots[id];
            const position = getPosition(pages, ratio, hotspot);
            const el = renderHotspot(
                hotspot,
                position,
                contentRect,
                boundingRect
            );

            frag.appendChild(el);
        }

        pageSpreadEl.appendChild(frag);

        return this;
    }

    requestHotspots(id: string, pages: Page[]) {
        this.trigger('hotspotsRequested', {id, pages});
    }

    hotspotsReceived = (e) => {
        this.setCache(e.pageSpread.getId(), e);
        this.renderHotspots(e);
    };

    getCache(pageSpreadId: string) {
        return this.cache[pageSpreadId];
    }

    setCache(
        pageSpreadId: string,
        data: (typeof this.cache)[keyof typeof this.cache]
    ) {
        this.cache[pageSpreadId] = data;

        return this;
    }

    afterNavigation = (e) => {
        if (!e.pageSpread) return;
        const pageSpread: PagedPublicationPageSpread = e.pageSpread;
        const id: string = pageSpread.getId();

        this.currentPageSpreadId = id;
        if (this.pageSpreadsLoaded[id]) {
            this.requestHotspots(id, pageSpread.getPages());
        }
    };

    pagesLoaded = (e) => {
        this.pageSpreadsLoaded[e.pageSpreadId] = true;
        if (this.currentPageSpreadId === e.pageSpreadId) {
            this.requestHotspots(e.pageSpreadId, e.pages);
        }
    };

    resized = () => {
        if (this.currentPageSpreadId) {
            const data = this.getCache(this.currentPageSpreadId);

            if (data) {
                this.renderHotspots(data);
            }
        }
    };
}

export default PagedPublicationHotspots;
