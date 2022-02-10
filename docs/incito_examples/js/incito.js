(function () {
    /*
        NOTE: Enable this code block to fetch from **staging** environment
        Feel free to remove the whole function call when working on production

    SGN.config.set({
        coreUrl: 'https://squid-api.tjek-staging.com'
    });
	*/

    var elements;

    // Call onload when the elements mentioned below are in view
    // call onload to start the Incito loading process
    /**
     * loadIncito will start the process of:
     *   - Fetch current publications from our API
     *   - Fetch Incito payload for a selected publication
     *   - Load Incito into view
     *
     * Call onload when the elements mentioned below are in view
     */
    var loadIncito = function () {
        // Gather relevant HTML elements
        elements = {
            html: document.querySelector('html'),
            incito: {
                root: document.querySelector('#incito__publication'),
                top: document.querySelector('#incito-publication__top'),
                details: {
                    root: document.querySelector('#incito__details'),
                    title: document.querySelector(
                        '#incito__details > .incito__details__title'
                    ),
                    description: document.querySelector(
                        '#incito__details > .incito__details__description'
                    ),
                    button: document.querySelector(
                        '#incito__details > .incito__details__button'
                    )
                }
            }
        };

        // Call API to get latest publications
        fetchPublication(function (err, publication) {
            if (!err) {
                if (!publication) {
                    alert('No Incito publication found!');
                    return;
                }
                // Open first (latest) incito publication
                openIncitoPublication(publication);
            } else {
                console.error('Error fetching publications:');
                console.error(err);
            }
        });
    };

    var incitoPublicationViewer;
    /**
     * Fetch _incito_ publications from API, sorted by valid date
     * @param {callback returning array of publications} callback
     */
    // TODO: Set your catalog and business ids
    var catalogId = 'YOUR_CATALOG_ID';
    var dealerId = 'YOUR_BUSINESS_ID';
    var fetchPublication = function (callback) {
        SGN.CoreKit.request(
            {
                url: '/v2/catalogs/' + catalogId,
                qs: {
                    dealer_id: dealerId
                }
            },
            callback
        );
    };

    /**
     * Use to visualize Incito scrolling progress
     * NOTE: The Incito viewer will search for .sgn-incito__progress by default and update its value
     * @param {progress [0-100]} progress
     */
    var trackViewProgress = function (progress) {
        console.info('loading progress ' + Math.ceil(progress) + '%');
    };

    /**
     * Load an Incito publication into element (defined in elements.incito.root)
     * openIncitoPublication can be called multiple times to load different incitors into a view
     * @param {publication payload} publication
     */
    var openIncitoPublication = function (publication) {
        var incitoRootElement = elements.incito.root;

        // In case there is another Incito created, destroy
        if (incitoPublicationViewer) {
            incitoPublicationViewer.destroy();
        }

        // Generate Incito bootstraper
        var incitoPublication = new SGN.IncitoPublicationKit.Bootstrapper({
            el: incitoRootElement,
            id: publication.id,
            eventTracker: SGN.config.get('eventTracker')
        });

        trackViewProgress(0);

        // Fetch Incito payload
        incitoPublication.fetchIncito(
            publication.incito_publication_id,
            function (err, incito) {
                if (!err) {
                    // Generate Incito viewer
                    incitoPublicationViewer = incitoPublication.createViewer({
                        details: publication,
                        incito: incito
                    });

                    // Bind progress event
                    incitoPublicationViewer.bind(
                        'progress',
                        function (navEvent) {
                            trackViewProgress(navEvent.progress);
                        }
                    );

                    incitoPublicationViewer.start();

                    // Bind clicks on offers
                    var lastClickedOffer = false;
                    SGN.CoreUIKit.on(
                        incitoRootElement,
                        'click',
                        '.incito__view[data-role="offer"]',
                        function (e) {
                            e.preventDefault();

                            var id = this.dataset.id;

                            // Get metadata on offer
                            var meta = incitoPublicationViewer.incito.ids[id];

                            if (!meta['tjek.offer.v1']) {
                                return; // No metadata for offer
                            }

                            /*
                        The `meta` object can be customised to include any information on the offer you are clicking
                        By default, it has the following structure:
                        {
                            "tjek.offer.v1": {
                                "title": "the title of the offer",
                                "description": "long description of the product",
                                "products": [{
                                    "id": "the id of the product",
                                    "title": "title of the product"
                                }],
                                "labels": ["product label", "product label" ...]
                            }
                        }
                        This data can be used in several ways, most commonly to:
                          - Open a link to the offer
                          - Open a view to the offer
                          - Add offer to a cart
                          - Display description of the offer

                        Below there are two examples, showcasing opening a link to an offer in a new tab and displaying a detail view under it
                     */

                            meta = meta['tjek.offer.v1'];
                            var details = elements.incito.details;

                            // Example A: Update a detail view and attach it under the offer view
                            // NOTE: There are some CSS issues here and the detail view is hidden cross-section
                            if (
                                lastClickedOffer == this &&
                                details.root.style.display != 'none'
                            ) {
                                details.root.style.display = 'none';
                            } else {
                                lastClickedOffer = this;
                                details.title.innerHTML = meta.title;
                                details.description.innerHTML =
                                    meta.description ||
                                    'Placeholder description of the product(s)';
                                details.button.href = meta.ids[0].value;
                                details.root.style.display = 'block';
                                this.parentNode.insertBefore(
                                    details.root,
                                    this.nextSibling
                                );

                                elements.incito.root.insertBefore(
                                    details.root,
                                    null
                                );
                                details.root.style.width =
                                    Number(this.style.width.replace('px', '')) -
                                    22 +
                                    'px'; // Subtract border + padding
                                details.root.style.left =
                                    'calc(' +
                                    [
                                        this.style.left,
                                        this.parentNode.offsetLeft + 'px'
                                    ].join(' + ') +
                                    ')';
                                details.root.style.top =
                                    'calc(' +
                                    [
                                        this.style.top,
                                        this.style.height,
                                        this.parentNode.offsetTop + 'px'
                                    ].join(' + ') +
                                    ')';
                            }

                            // Another example would be to NOT set a detail view and just open a new link like so:
                            // window.open(meta.ids[0].value, '_blank');
                        }
                    );
                    setTimeout(function () {
                        var selectorA =
                            '.incito__view[data-role="offer"] > div > div.incito__view.incito__flex-layout-view > div:first-child > p:last-child';
                        var selectorB =
                            '.incito__view[data-role="offer"] > div > div > p:last-child';
                        var selector = [selectorA, selectorB].join(', ');
                        learnMoreButtons = $(
                            '.incito__view[data-role="offer"] > div > div.incito__view.incito__flex-layout-view > div:first-child > p:last-child'
                        );
                        learnMoreButtons = $(selector);
                        learnMoreButtons.each(function () {
                            var btn = $(this);
                            // Something to filter our false positives
                            if (
                                !/\D/.test(btn.text()) &&
                                btn.text().length === 7
                            ) {
                                btn.text('L\u00C6R MERE');
                                btn.css('background-color', 'black');
                                btn.css('color', '#FFFFFF');
                                btn.css('padding', '2px');
                            }
                        });
                    }, 1000);

                    for (var i = 0; i < learnMoreButtons.length; i++) {
                        if (/\D/.test(learnMoreButtons[i].innerHTML)) {
                        }
                    }
                } else {
                    console.error('Error loading incito:');
                    console.error(err);
                }
            }
        );
    };

    // Expose loadIncito
    window.shopgun = {loadIncito};
})();
