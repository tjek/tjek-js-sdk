function PagedPublication (el, options) {
    this.el = el;
    this.options = options || {};
    this.data = {
        details: null,
        pages: null,
        hotspots: null
    };
    this.hotspots = {};
    this.hotspotQueue = [];
    this.eventTracker = new SGN.EventsKit.Tracker({
        trackId: this.options.trackId
    });

    // Configure the SDK.
    SGN.config.set({ appKey: this.options.appKey });

    // Fetch details and pages at the same time to speed things up.
    SGN.util.async.parallel([
        this.fetch.bind(this),
        this.fetchPages.bind(this)
    ], function (result) {
        this.data.details = result[0][1];
        this.data.pages = result[1][1];

        this.render();
    }.bind(this));

    // Then, fetch hotspots since they are not important for the initial render.
    this.fetchHotspots(function (err, response) {
        if (err) return;

        // Convert the hotspots to an object from an array for quick future lookup.
        this.data.hotspots = {};

        response.forEach(function (hotspot) {
            this.data.hotspots[hotspot.id] = hotspot;
        }.bind(this));

        // Since the hotspots can load after initial render, the user might already have requested hotspots, which need to be resolved.
        this.processHotspotQueue();
    }.bind(this));

    // Prevent the document from scrolling vertically on touch devices.
    document.addEventListener('touchstart', function (e) {
        if (e.target.tagName !== 'A') e.preventDefault();
    });
}

PagedPublication.prototype.render = function () {
    this.pagedPublication = new SGN.PagedPublicationKit.Viewer(this.el, {
        id: this.options.id,
        ownedBy: this.data.details.dealer_id,
        color: '#' + this.data.details.branding.pageflip.color,
        keyboard: true,
        eventTracker: this.eventTracker,
        pages: this.transformPages(this.data.pages)
    });

    this.pagedPublication.bind('hotspotsRequested', function (e) {
        this.hotspotQueue.push(e);
        this.processHotspotQueue();
    }.bind(this));

    this.pagedPublication.bind('clicked', function (e) {
        var clickedHotspots = e.verso.overlayEls.map(function (overlayEl) {
            return this.data.hotspots[overlayEl.getAttribute('data-id')];
        }.bind(this));

        if (clickedHotspots.length === 1) {
            console.log('Hotspot clicked', clickedHotspots[0]);
        } else if (e.verso.overlayEls.length > 1) {
            console.log('Hotspots clicked', clickedHotspots);

            var hotspotPicker = new SGN.PagedPublicationKit.HotspotPicker({
                x: e.verso.x,
                y: e.verso.y,
                hotspots: clickedHotspots
            });
        }
    }.bind(this));

    this.pagedPublication.start();
};

PagedPublication.prototype.transformPages = function (pages) {
    return pages.map(function (page, i) {
        var pageNumber = i + 1;

        return {
            id: 'page' + pageNumber,
            label: pageNumber + '',
            pageNumber: pageNumber,
            images: {
                medium: page.view,
                large: page.zoom
            }
        };
    });
};

PagedPublication.prototype.processHotspotQueue = function () {
    if (!this.pagedPublication || !this.data.hotspots) return;

    this.hotspotQueue = this.hotspotQueue.filter(function (hotspotRequest) {
        var hotspots = {};

        for (var id in this.data.hotspots) {
            var match = false;
            var hotspot = this.data.hotspots[id];

            hotspotRequest.pages.forEach(function (page) {
                if (hotspot.locations[page.pageNumber]) match = true;
            });

            if (match) hotspots[id] = hotspot;
        }

        this.pagedPublication.trigger('hotspotsReceived', {
            id: hotspotRequest.id,
            pages: hotspotRequest.pages,
            ratio: this.data.details.dimensions.height,
            hotspots: hotspots
        });

        return false;
    }.bind(this));
};

PagedPublication.prototype.fetch = function (callback) {
    SGN.CoreKit.request({ url: '/v2/catalogs/' + this.options.id }, callback);
};

PagedPublication.prototype.fetchPages = function (callback) {
    SGN.CoreKit.request({ url: '/v2/catalogs/' + this.options.id + '/pages' }, callback);
};

PagedPublication.prototype.fetchHotspots = function (callback) {
    SGN.CoreKit.request({ url: '/v2/catalogs/' + this.options.id + '/hotspots' }, callback);
};
