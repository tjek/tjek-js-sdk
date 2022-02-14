import MicroEvent from 'microevent';
import Mustache from 'mustache';

function getPosition(pages, ratio, hotspot) {
    let minX = null;
    let minY = null;
    let maxX = null;
    let maxY = null;
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

            if (x < minX) minX = x;

            if (x > maxX) maxX = x;

            if (y < minY) minY = y;

            if (y > maxY) maxY = y;
        });
    }

    const width = maxX - minX;
    const height = maxY - minY;

    return {
        top: (minY / ratio) * 100,
        left: minX * 100,
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

    el.innerHTML = Mustache.render('', hotspot);

    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;

    return el;
}

class PagedPublicationHotspots extends MicroEvent {
    currentPageSpreadId = null;
    pageSpreadsLoaded = {};
    cache = {};
    constructor() {
        super();

        this.bind('hotspotsReceived', this.hotspotsReceived);
        this.bind('afterNavigation', this.afterNavigation);
        this.bind('pagesLoaded', this.pagesLoaded);
        this.bind('resized', this.resized);
    }

    renderHotspots({versoPageSpread, pageSpread, hotspots, pages, ratio}) {
        const contentRect = versoPageSpread.getContentRect();
        const pageSpreadEl = pageSpread.getEl();
        const boundingRect = pageSpreadEl.getBoundingClientRect();

        pageSpreadEl
            .querySelectorAll('.sgn-pp__hotspot')
            .forEach((hotspotEl) => {
                hotspotEl.parentNode.removeChild(hotspotEl);
            });

        const frag = document.createDocumentFragment();
        for (let id in hotspots) {
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

    requestHotspots(id, pages) {
        this.trigger('hotspotsRequested', {id, pages});
    }

    hotspotsReceived = (e) => {
        this.setCache(e.pageSpread.getId(), e);
        this.renderHotspots(e);
    };

    getCache(pageSpreadId) {
        return this.cache[pageSpreadId];
    }

    setCache(pageSpreadId, data) {
        this.cache[pageSpreadId] = data;

        return this;
    }

    afterNavigation = (e) => {
        if (!e.pageSpread) return;

        const id = e.pageSpread.getId();

        this.currentPageSpreadId = id;
        if (this.pageSpreadsLoaded[id]) {
            this.requestHotspots(id, e.pageSpread.getPages());
        }
    };

    pagesLoaded = (e) => {
        this.pageSpreadsLoaded[e.pageSpreadId] = true;
        if (this.currentPageSpreadId === e.pageSpreadId) {
            this.requestHotspots(e.pageSpreadId, e.pages);
        }
    };

    resized = () => {
        const data = this.getCache(this.currentPageSpreadId);

        if (data) this.renderHotspots(data);
    };
}

export default PagedPublicationHotspots;
