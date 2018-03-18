(function () {
    var bootstrapper = new SGN.PagedPublicationKit.Bootstrapper({
        el: document.querySelector('.sgn__pp'),
        id: SGN.util.getQueryParam('id') || '0852mDU',
        eventTracker: SGN.config.get('eventTracker')
    });

    bootstrapper.fetch(function (err, data) {
        if (!err) {
            var viewer = bootstrapper.createViewer(data);

            viewer.bind('hotspotClicked', function (hotspot) {
                console.log('Hotspot clicked.', hotspot);
            });

            viewer.bind('hotspotPressed', function (hotspot) {
                console.log('Hotspot pressed.', hotspot);
            });

            viewer.start();

            // Fetch hotspots after rendering the viewer as they are not critical for initial render.
            bootstrapper.fetchHotspots(function (err2, hotspots) {
                if (!err2) {
                    bootstrapper.applyHotspots(viewer, hotspots);
                }
            });
        }
    });
})();