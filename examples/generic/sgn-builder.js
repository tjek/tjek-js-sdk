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

var els = {
    offerListBtn: document.querySelector('.sgn__offer-list'),
    cartListBtn: document.querySelector('.sgn__offer-cart'),
    pageListBtn: document.querySelector('.sgn__offer-pages'),
    downloadBtn: document.querySelector('.sgn__offer-download')
};

var sgnData = {};

(function () {
    if (catalogId) {
        options.id = catalogId;

        startSgn(options);
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

                    startSgn(options);
                }
            }
        );
    }

    //List offers
    if (els.offerListBtn) {
        els.offerListBtn.addEventListener('click', showOfferList);
    }

    // Cart offers
    if (els.cartListBtn) {
        els.cartListBtn.addEventListener('click', showCartList);
    }

    // Display Pages
    if (els.pageListBtn) {
        els.pageListBtn.addEventListener('click', showPageList);
    }

    // Download PDF
    if (els.downloadBtn) {
        els.downloadBtn.addEventListener('click', downloadPdf);
    }
})();

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function hideBlock(className = '') {
    var blocks = document.getElementsByClassName('sgn-block-show');
    if (blocks.length) {
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].classList.remove('sgn-block-show');
        }
    }

    if (className) {
        var element = document.querySelector('.' + className);
        element.parentNode.removeChild(element);
    }
}

function downloadPdf() {
    SGN.CoreKit.request(
        {
            url: '/v2/catalogs/' + catalogId + '/download'
        },
        function (err, catalog) {
            if (!err && catalog.pdf_url) {
                window.open(catalog.pdf_url, '_blank').focus();
            }
        }
    );
}

function showPageList(e) {
    e.stopPropagation();
    var pages = sgnData.pages;

    var pagesContainerElement = document.createElement('div');
    pagesContainerElement.className = 'sgn-pages-dd sgn-block-hidden';
    var pagesContainerHtml = `
        <div class="sgn-blocker" onclick="hideBlock(\'sgn-pages-dd\')"></div>
        <div class="sgn-popup-contents sgn-pages-popup">
            <span>Pages</span>
            <ol class="sgn-pages-ol"></ol>
        </div>
    `;
    pagesContainerElement.innerHTML = pagesContainerHtml;
    insertAfter(els.pageListBtn, pagesContainerElement);

    var pagesOl = document.querySelector('.sgn-pages-ol');

    if (!pagesContainerElement.classList.contains('sgn-block-show')) {
        pagesContainerElement.classList.add('sgn-block-show');

        if (pages.length) {
            var pagesHtml = '';

            pages.forEach(function (page, index) {
                pagesHtml += `
                <li class="sgn-page-li">
                    <div class="sgn-page-li-flex-container">
                        <a href="?page=${index + 1}">
                            <div class="sgn-page-li-div-text">
                                <div class="sgn-pages-img-container">
                                    <img src="${page.thumb}">
                                </div>
                                <div>
                                    <span>Page: ${index + 1}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </li>
            `;
            });
            pagesOl.innerHTML = pagesHtml;
        }
    } else {
        pagesOl.innerHTML = '';
        offerScrollElement.classList.remove('sgn-block-show');
    }
}

function showOfferList(e) {
    e.stopPropagation();

    var offerScrollElement = document.createElement('div');
    offerScrollElement.className = 'sgn-offers-dd sgn-block-hidden';

    offerScrollElement.innerHTML += `
        <div class="sgn-blocker" onclick="hideBlock(\'sgn-offers-dd\')"></div>
        <div class="sgn-scroll-contents">
            <div>
                <input type="text" id="sgn-offers-search-text" name="sgn-offers-search-text" placeholder="Search...">
            </div>
            <ol class="sgn-offers-ol"></ol>
        </div>
    `;

    insertAfter(els.offerListBtn, offerScrollElement);

    var offerScrollHtml = function (offers) {
        var offerHtml = '';
        offers.forEach(function (offer, index) {
            offerHtml += `
                <li class="sgn-offers-li">
                    <div class="sgn-offers-li-flex-container">
                        <div class="sgn-offers-li-div-img">
                            <img src="${offer.images.thumb}">
                        </div>
                        <div class="sgn-offers-li-div-text">
                            <div class="sgn-truncate-elipsis">
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

        return offerHtml;
    };

    var offerOl = document.querySelector('.sgn-offers-ol');

    if (!offerScrollElement.classList.contains('sgn-block-show')) {
        offerScrollElement.classList.add('sgn-block-show');
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
                        offerOl.innerHTML += offerScrollHtml(res);
                    } else {
                        console.log('Error:', err);
                    }
                }
            );
        };

        var searchListOffer = function (searchInput = '', limit = 24, result) {
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
        var searchOfferText = document.getElementById('sgn-offers-search-text');
        searchOfferText.addEventListener('input', function (e) {
            if (this.value === '') {
                offerOl.innerHTML = '';
                getOffers(offerOffset, offerLimit);
            }
            searchListOffer(this.value, offerLimit, function (res) {
                offerOl.innerHTML = offerScrollHtml(res);
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
        offerScrollElement.classList.remove('sgn-block-show');
    }
}

function showCartList(e) {
    e.stopPropagation();

    var cartScrollElement = document.createElement('div');
    cartScrollElement.className = 'sgn-cart-dd sgn-block-hidden';

    var cartHtml = `
        <div class="sgn-blocker" onclick="hideBlock(\'sgn-cart-dd\')"></div>
        <div class="sgn-popup-contents sgn-cart-popup">
            <span>List</span>
            <ol class="sgn-cart-ol"></ol>
            <div>
                <button class="sgn-cart-clear-cookie">Remove All</button>
                <button class="sgn-cart-print" onclick="printCart()">Print</button>
            </div>
        </div>
        `;
    cartScrollElement.innerHTML += cartHtml;
    insertAfter(els.cartListBtn, cartScrollElement);

    var cartOl = document.querySelector('.sgn-cart-ol');

    if (!cartScrollElement.classList.contains('sgn-block-show')) {
        cartScrollElement.classList.add('sgn-block-show');
        var sgnCookie = getCookie('sgncart');

        var appendCartList = function (sgnCookie) {
            var cartHtml = '';

            if (sgnCookie.length > 0) {
                sgnCookie.forEach(function (offer, index) {
                    cartHtml += `
                        <li class="sgn-cart-li">
                            <div class="sgn-cart-li-flex-container">
                                <div class="sgn-cart-li-div-text">
                                    <div class="sgn-truncate-elipsis">
                                        <span>${offer.heading}</span>
                                    </div>
                                </div>
                                <div class="sgn-cart-li-div-btn">
                                    <div>
                                        <button class="sgn-cart-remove-btn" data-cart-offer-index="${index}">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    `;
                });
            }

            cartOl.innerHTML = cartHtml;

            var cartRemoveBtns = document.getElementsByClassName(
                'sgn-cart-remove-btn'
            );
            var removeCartCookie = function () {
                var offerIndex = this.getAttribute('data-cart-offer-index');

                sgnCookie.splice(offerIndex, 1);
                setCookie('sgncart', JSON.stringify(sgnCookie));
                appendCartList(sgnCookie);
            };

            for (var i = 0; i < cartRemoveBtns.length; i++) {
                cartRemoveBtns[i].addEventListener(
                    'click',
                    removeCartCookie,
                    false
                );
            }
        };

        if (sgnCookie != '') {
            sgnCookie = JSON.parse(sgnCookie);

            if (typeof sgnCookie === 'object') {
                appendCartList(sgnCookie);
            }
        }

        var clearCookieBtn = document.querySelector('.sgn-cart-clear-cookie');
        clearCookieBtn.addEventListener('click', function (e) {
            setCookie('sgncart', '');
            appendCartList('');
        });
    } else {
        cartOl.innerHTML = '';
        cartScrollElement.classList.remove('sgn-block-show');
    }
}

function startSgn(options) {
    var bootstrapper = new SGN.PagedPublicationKit.Bootstrapper(options);

    bootstrapper.fetch(function (err, data) {
        if (!err) {
            sgnData = data;
            var viewer = bootstrapper.createViewer(data);

            viewer.bind('hotspotClicked', function (hotspot) {
                console.log('Hotspot clicked', hotspot);

                var hotspotOffer = {
                    id: hotspot.offer.ids,
                    heading: hotspot.offer.heading
                };

                var sgnCookie = getCookie('sgncart');
                if (sgnCookie != '') {
                    sgnCookie = JSON.parse(sgnCookie);
                    sgnCookie.push(hotspotOffer);
                } else {
                    var sgnCookie = [hotspotOffer];
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
}

function printCart() {
    var sgnCookie = getCookie('sgncart');
    sgnCookie = JSON.parse(sgnCookie);

    var printContainer = document.createElement('div');
    var printOl = document.createElement('ol');
    printOl.className = 'sgn-print-ol';
    printContainer.appendChild(printOl);

    var cartHtml = '';

    if (sgnCookie.length > 0) {
        sgnCookie.forEach(function (offer, index) {
            cartHtml += `
                <li class="sgn-cart-li">
                    <div class="sgn-cart-li-flex-container">
                        <div class="sgn-cart-li-div-text">
                            <div class="sgn-truncate-elipsis">
                                <span>${offer.heading}</span>
                            </div>
                        </div>
                    </div>
                </li>
            `;
        });
    }

    printOl.innerHTML = cartHtml;

    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContainer.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
}

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
