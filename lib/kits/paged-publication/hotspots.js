import MicroEvent from 'microevent';
import Mustache from 'mustache';

class PagedPublicationHotspots {
    constructor() {
        this.currentPageSpreadId = null;
        this.pageSpreadsLoaded = {};
        this.cache = {};

        this.bind('hotspotsReceived', this.hotspotsReceived.bind(this));
        this.bind('afterNavigation', this.afterNavigation.bind(this));
        this.bind('pagesLoaded', this.pagesLoaded.bind(this));
        this.bind('resized', this.resized.bind(this));
    }

    renderHotspots(data) {
        const frag = document.createDocumentFragment();
        const contentRect = data.versoPageSpread.getContentRect();
        const pageSpreadEl = data.pageSpread.getEl();
        const hotspotEls = pageSpreadEl.querySelectorAll('.sgn-pp__hotspot');
        const boundingRect = pageSpreadEl.getBoundingClientRect();

        Array.from(hotspotEls).forEach((hotspotEl) => {
            hotspotEl.parentNode.removeChild(hotspotEl);
        });

        for (let id in data.hotspots) {
            const hotspot = data.hotspots[id];
            const position = this.getPosition(data.pages, data.ratio, hotspot);
            const el = this.renderHotspot(
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

    renderHotspot(hotspot, position, contentRect, boundingRect) {
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
        if (hotspot.id != null) {
            el.setAttribute('data-id', hotspot.id);
        }
        if (hotspot.type != null) {
            el.setAttribute('data-type', hotspot.type);
        }
        el.innerHTML = Mustache.render('', hotspot);

        el.style.top = `${top}px`;
        el.style.left = `${left}px`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;

        return el;
    }

    getPosition(pages, ratio, hotspot) {
        let minX = null;
        let minY = null;
        let maxX = null;
        let maxY = null;
        const pageNumbers = pages.map((page) => page.pageNumber);

        for (var pageNumber in hotspot.locations) {
            if (pageNumbers.indexOf(+pageNumber) === -1) {
                continue;
            }

            hotspot.locations[pageNumber].forEach((coords) => {
                let [x, y] = coords;

                if (pages[1] && pageNumbers[1] === +pageNumber) {
                    x += 1;
                }
                x /= pages.length;

                if (minX == null) {
                    minX = maxX = x;
                    minY = maxY = y;
                }

                if (x < minX) {
                    minX = x;
                }
                if (x > maxX) {
                    maxX = x;
                }
                if (y < minY) {
                    minY = y;
                }
                if (y > maxY) {
                    return (maxY = y);
                }
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

    requestHotspots(pageSpreadId, pages) {
        this.trigger('hotspotsRequested', {
            id: pageSpreadId,
            pages
        });
    }

    hotspotsReceived(e) {
        const pageSpreadId = e.pageSpread.getId();

        this.setCache(pageSpreadId, e);
        this.renderHotspots(e);
    }

    getCache(pageSpreadId) {
        return this.cache[pageSpreadId];
    }

    setCache(pageSpreadId, data) {
        this.cache[pageSpreadId] = data;

        return this;
    }

    afterNavigation(e) {
        if (e.pageSpread == null) {
            return;
        }

        const id = e.pageSpread.getId();

        this.currentPageSpreadId = id;
        if (this.pageSpreadsLoaded[id]) {
            this.requestHotspots(id, e.pageSpread.getPages());
        }
    }

    pagesLoaded(e) {
        this.pageSpreadsLoaded[e.pageSpreadId] = true;
        if (this.currentPageSpreadId === e.pageSpreadId) {
            this.requestHotspots(e.pageSpreadId, e.pages);
        }
    }

    resized() {
        const data = this.getCache(this.currentPageSpreadId);

        if (data) {
            this.renderHotspots(data);
        }
    }
}

MicroEvent.mixin(PagedPublicationHotspots);

export default PagedPublicationHotspots;
