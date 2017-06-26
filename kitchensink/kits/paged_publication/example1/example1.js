var id = 'be84g1C';
var appKey = '00j486xcipwzk2rmcbzfalpk4sgx9v3i';
var trackId = appKey;
var el = document.querySelector('.sgn__pp');
var eventTracker = new SGN.EventsKit.Tracker({ trackId: trackId });
var pagedPublication;
var details;
var pages;
var hotspots;
var hotspotRequests = [];
var fetch = {
    details: function (callback) {
        SGN.CoreKit.request({ url: '/v2/catalogs/' + id }, callback);
    },
    pages: function (callback) {
        SGN.CoreKit.request({ url: '/v2/catalogs/' + id + '/pages' }, callback);
    },
    hotspots: function (callback) {
        SGN.CoreKit.request({ url: '/v2/catalogs/' + id + '/hotspots' }, callback);
    }
};

// Configure the SDK.
SGN.config.set({ appKey: appKey });

// Fetch details and pages at the same time to speed things up.
SGN.util.async.parallel([fetch.details, fetch.pages], function (result) {
    details = result[0][1];
    pages = result[1][1];

    render();
});

// Then, fetch hotspots since they are a progressive enhancements and not important on initial render.
fetch.hotspots(function (err, response) {
    if (err) return;

    // Convert the hotspots to an object from an array for quick future lookup.
    hotspots = {};

    response.forEach(function (hotspot) { hotspots[hotspot.id] = hotspot; });

    satisfyHotspotRequests();
});

// Prevent the document from scrolling vertically on touch devices.
document.addEventListener('touchstart', function (e) {
    if (e.target.tagName !== 'A') e.preventDefault();
});

function render () {
    pagedPublication = new SGN.PagedPublicationKit.Viewer(el, {
        id: id,
        ownedBy: details.dealer_id,
        color: '#' + details.branding.pageflip.color,
        pages: pages.map(function (page, i) {
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
        }),
        keyboard: true,
        eventTracker: null //eventTracker
    });

    pagedPublication.bind('hotspotsRequested', function (e) {
        hotspotRequests.push(e);
        satisfyHotspotRequests();
    });

    pagedPublication.bind('beforeNavigation', function (e) {
        console.log('beforeNavigation', e);
    });

    pagedPublication.bind('clicked', function (e) {
        var clickedHotspots = e.verso.overlayEls.map(function (overlayEl) {
            return hotspots[overlayEl.getAttribute('data-id')];
        });

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
    });

    pagedPublication.start();
}

function satisfyHotspotRequests () {
    if (!pagedPublication || !hotspots) return;

    hotspotRequests = hotspotRequests.filter(function (hotspotRequest) {
        pagedPublication.trigger('hotspotsReceived', {
            pageSpreadId: hotspotRequest.pageSpreadId,
            hotspots: getHotspots(hotspotRequest.pages)
        });

        return false;
    });
}

function getHotspots (pages) {
    var matches = [];
    var pageNumbers = pages.map(function (page) { return page.pageNumber; });

    for (var id in hotspots) {
        var hotspot = hotspots[id];
        var match = false;

        pages.forEach(function (page) {
            if (hotspot.locations[page.pageNumber]) match = true;
        });

        if (match) matches.push(hotspot);
    }

    matches = matches.map(function (match) {
        var minX, minY, maxX, maxY = null;

        for (var pageNumber in match.locations) {
            if (pageNumbers.indexOf(+pageNumber) === -1) continue;

            var poly = match.locations[pageNumber];

            poly.forEach(function (coords) {
                var x = coords[0];
                var y = coords[1];

                if (pages[1] && pageNumbers[1] === +pageNumber) {
                    x += 1;
                }

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

        var width = maxX - minX;
        var height = maxY - minY;
        var ratio = details.dimensions.height;

        return {
            id: match.id,
            type: match.type,
            title: match.heading,
            top: minY / ratio * 100,
            left: minX * 100,
            width: width * 100,
            height: height / ratio * 100
        };
    });

    return matches;
}
