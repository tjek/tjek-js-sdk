(function () {
    // TODO: Set your business id
    var businessId = 'YOUR_BUSINESS_ID';

    var loadIncito = function () {
        var incitoRootElement = document.querySelector('#incito__publication');

        fetchPublications(function (err, publications) {
            if (!err) {
                if (publications[0]) {
                    openIncitoPublication(publications[0], incitoRootElement);
                } else {
                    alert('No Incito publications found!');
                }
            } else {
                console.error('Error fetching publications:');
                console.error(err);
            }
        });
    };

    var incitoPublicationViewer;
    var fetchPublications = function (callback) {
        Tjek.CoreKit.request(
            {
                url: '/v2/catalogs',
                qs: {
                    dealer_id: businessId,
                    order_by: '-valid_date',
                    types: 'incito',
                    offset: 0,
                    limit: 4
                }
            },
            callback
        );
    };

    var openIncitoPublication = function (publication, incitoRootElement) {
        var incitoPublication = new Tjek.IncitoPublicationKit.Bootstrapper({
            el: incitoRootElement,
            id: publication.id
        });

        incitoPublication.fetchIncito(
            publication.incito_publication_id,
            function (err, incito) {
                if (!err) {
                    incitoPublicationViewer = incitoPublication.createViewer({
                        details: publication,
                        incito: incito
                    });

                    incitoPublicationViewer.bind(
                        'progress',
                        function (navEvent) {
                            console.info(
                                'loading progress ' +
                                    Math.ceil(navEvent.progress) +
                                    '%'
                            );
                        }
                    );

                    incitoPublicationViewer.start();
                } else {
                    console.error('Error loading incito:');
                    console.error(err);
                }
            }
        );
    };

    window.tjek = {loadIncito: loadIncito};
})();
