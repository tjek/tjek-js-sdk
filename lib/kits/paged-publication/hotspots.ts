import MicroEvent from '../../../vendor/microevent';
import PageSpread from '../../verso-browser/page_spread';
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

    return {
        top: (minY! / ratio) * 100,
        left: minX! * 100,
        width: width * 100,
        height: (height / ratio) * 100
    };
}

function getHostname(link: string) {
    try {
        const url = new URL(link);

        const hostnameArr = url.hostname.split('.');
        const [subDomain, secondDomain, topDomain] = hostnameArr;

        return subDomain === 'www'
            ? [secondDomain, topDomain].join('.')
            : url.hostname;
    } catch (e) {
        console.log('Error:', e?.message);

        return null;
    }
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

        if (hotspot.link_embed) {
            el.innerHTML = `<iframe src="${hotspot.link}" height="100%" width="100%"  style="border:0;"></iframe>`;
        } else {
            el.innerHTML = `
            <a href="${
                hotspot.link
            }" class="sgn-pagedecoration-hotspot-link" rel="noreferrer noopener" target="_blank">
                <div class="sgn-pagedecoration-hotspot-link-content" style="width:100%;height:100%;">
                        <div class="sgn-pagedecoration-hotspot-link-icon">
                            <svg class="sgn-pagedecoration-link-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/>
                            </svg>
                        </div>
                        <div class="sgn-pagedecoration-hotspot-link-label">
                            <span>${getHostname(hotspot.link)}</span>
                        </div>
                </div>
            </a>
            `;
        }

        el.style.transform = `rotate(${hotspot.rotate}deg)`;
    }

    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;

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
