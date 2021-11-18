(function () {
    var dealerId = document
        .querySelector('script[data-dealer-id]')
        .getAttribute('data-dealer-id');
    var catalogId = document
        .querySelector('script[data-catalog-id]')
        ?.getAttribute('data-catalog-id');

    var pageNum = SGN.util.getQueryParam('page') || 1;

    var options = {
        el: document.querySelector('.sgn__pp'),
        eventTracker: SGN.config.get('eventTracker'),
        pageId: `page${pageNum}`
    };

    var start = function () {
        var bootstrapper = new SGN.PagedPublicationKit.Bootstrapper(options);

        bootstrapper.fetch(function (err, data) {
            if (!err) {
                var viewer = bootstrapper.createViewer(data);

                viewer.bind('hotspotClicked', function (hotspot) {
                    console.log('Hotspot clicked', hotspot);

                    var sgnCookie = getCookie('sgncart');
                    if (sgnCookie != '') {
                        sgnCookie = JSON.parse(sgnCookie);
                        sgnCookie.push(hotspot.offer);
                    } else {
                        var sgnCookie = [hotspot.offer];
                    }

                    setCookie('sgncart', JSON.stringify(sgnCookie));

                    // For example, if you want to redirect to a webshop link if one is set on the offer
                    if (hotspot.webshop) {
                        window.location = hotspot.webshop;
                    }
                });

                viewer.bind('hotspotPressed', function (hotspot) {
                    console.log('Hotspot pressed', hotspot);
                });

                viewer.bind('hotspotContextmenu', function (hotspot) {
                    console.log('Hotspot contextmenu', hotspot);
                });

                viewer.start();

                // Fetch hotspots after rendering the viewer as they are not critical for initial render.
                bootstrapper.fetchHotspots(function (err2, hotspots) {
                    if (!err2) {
                        bootstrapper.applyHotspots(viewer, hotspots);
                    }
                });
            } else {
                console.error(err);
            }
        });
    };

    if (catalogId) {
        options.id = catalogId;

        start();
    } else {
        SGN.CoreKit.request(
            {
                url: '/v2/catalogs',
                qs: {
                    dealer_id: dealerId,
                    order_by: '-publication_date',
                    limit: 1
                }
            },
            function (err, catalogs) {
                if (!err) {
                    options.id = catalogs[0].id;

                    start();
                }
            }
        );
    }

    //List offers
    var offerListBtn = document.querySelector('.sgn__offer-list');
    if (offerListBtn) {
        function insertAfter(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(
                newNode,
                referenceNode.nextSibling
            );
        }

        var offerScrollElement = document.createElement('div');
        offerScrollElement.className = 'sgn-offers-dd hidden';

        var offerSearchHtml = `
                <div>
                    <input type="text" id="sgn-offers-search-text" name="sgn-offers-search-text" placeholder="Search...">
                </div>
            `;
        offerScrollElement.innerHTML += offerSearchHtml;

        var listOfferElement = document.createElement('ol', {
            is: 'expanding-list'
        });
        listOfferElement.className = 'sgn-offers-ol';
        offerScrollElement.appendChild(listOfferElement);

        insertAfter(offerListBtn, offerScrollElement);

        offerListBtn.addEventListener('click', function (e) {
            var offerOl = document.querySelector('.sgn-offers-ol');
            offerScrollElement.classList.toggle('hidden');

            if (!offerScrollElement.classList.contains('hidden')) {
                var offerOffset = 0;
                var offerLimit = 24;
                var getOffers = function (offset, limit = 24) {
                    SGN.CoreKit.request(
                        {
                            url: '/v2/offers',
                            qs: {
                                dealer_id: dealerId,
                                catalogId: options.id,
                                offset,
                                limit
                            }
                        },
                        (err, res) => {
                            if (!err) {
                                console.log('Res:', res);

                                var listHtml = '';

                                res.forEach(function (offer) {
                                    listHtml += `
                                        <li class="sgn-offers-li">
                                            <div class="sgn-offers-li-flex-container">
                                                <div class="sgn-offers-li-div-img">
                                                    <img src="${offer.images.thumb}">
                                                </div>
                                                <div class="sgn-offers-li-div-text">
                                                    <div>
                                                        <span class="sgn-offers-text-heading">${offer.heading}</span>
                                                    </div>
                                                    <div>
                                                        <span class="sgn-offers-text-description">${offer.description}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    `;
                                });

                                offerOl.innerHTML += listHtml;
                            } else {
                                console.log('Error:', err);
                            }
                        }
                    );
                };
                var searchListOffer = function (
                    searchInput = '',
                    limit = 24,
                    result
                ) {
                    console.log('searchListOffer was called');
                    SGN.CoreKit.request(
                        {
                            url: '/v2/offers/search',
                            qs: {
                                dealer_id: dealerId,
                                catalogId: options.id,
                                limit,
                                query: searchInput
                            }
                        },
                        (err, res) => {
                            if (!err) {
                                result(res);
                            } else {
                                console.log('Error:', err);
                            }
                        }
                    );
                };

                getOffers(offerOffset, offerLimit);

                //Search List Offers
                var searchOfferText = document.getElementById(
                    'sgn-offers-search-text'
                );
                searchOfferText.addEventListener('input', function (e) {
                    console.log('Im changed:::', this.value);
                    if (this.value === '') {
                        offerOl.innerHTML = '';
                        getOffers(offerOffset, offerLimit);
                    }
                    searchListOffer(this.value, offerLimit, function (res) {
                        console.log('res', res);

                        var searchListHtml = '';
                        res.forEach(function (offer) {
                            searchListHtml += `
                                <li class="sgn-offers-li">
                                    <div class="sgn-offers-li-flex-container">
                                        <div class="sgn-offers-li-div-img">
                                            <img src="${offer.images.thumb}" width="100" height="100">
                                        </div>
                                        <div class="sgn-offers-li-div-text">
                                            <div>
                                                <span class="sgn-offers-text-heading">${offer.heading}</span>
                                            </div>
                                            <div>
                                                <span class="sgn-offers-text-description">${offer.description}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            `;
                        });

                        offerOl.innerHTML = searchListHtml;
                    });
                });

                if (!searchOfferText.value) {
                    offerOl.addEventListener('scroll', function () {
                        if (
                            offerOl.scrollHeight - offerOl.scrollTop ===
                                offerOl.clientHeight &&
                            !searchOfferText.value
                        ) {
                            getOffers((offerOffset += offerLimit), offerLimit);
                        }
                    });
                }
            } else {
                offerOl.innerHTML = '';
            }
        });
    }

    // Cart offers
    var cartListBtn = document.querySelector('.sgn__offer-cart');
    if (cartListBtn) {
        function insertAfter(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(
                newNode,
                referenceNode.nextSibling
            );
        }

        var cartScrollElement = document.createElement('div');
        cartScrollElement.className = 'sgn-cart-dd hidden';

        var listCartElement = document.createElement('ol', {
            is: 'expanding-list'
        });
        listCartElement.className = 'sgn-cart-ol';
        cartScrollElement.appendChild(listCartElement);

        insertAfter(cartListBtn, cartScrollElement);

        cartListBtn.addEventListener('click', function (e) {
            var cartOl = document.querySelector('.sgn-cart-ol');
            cartScrollElement.classList.toggle('hidden');

            if (!cartScrollElement.classList.contains('hidden')) {
                var sgnCookie = getCookie('sgncart');
                if (sgnCookie != '') {
                    sgnCookie = JSON.parse(sgnCookie);
                }
                if (typeof sgnCookie === 'object') {
                    var cartHtml = '';
                    sgnCookie.forEach(function (offer) {
                        cartHtml += `
                        <li class="sgn-cart-li">
                            <div class="sgn-cart-li-flex-container">
                                <div class="sgn-cart-li-div-text">
                                    <div>
                                        <span>${offer.heading}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    `;
                    });
                    cartOl.innerHTML = cartHtml;
                }
            } else {
                cartOl.innerHTML = '';
            }
        });
    }
})();

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function checkCookie(cname, initialVal = '') {
    let sgnCookie = getCookie(cname);
    if (sgnCookie != '') {
        return true;
    } else {
        setCookie(cname, initialVal);
    }
}
