window.shopgun = (function () {
    var ngaPool = [];
    var nga = function (arg1, arg2, arg3) {
        ngaPool.push([arg1, arg2, arg3]);
    };
    var once = function (f) {
        var done = false;

        return function () {
            if (!done) {
                done = true;
                
                return f.apply(this, arguments);
            }
        };
    };
    var initialized = false;
    var config = {
        businessId: 'c35es'
    };
    var els = {
        html: document.querySelector('html'),
        root: document.querySelector('#publications'),
        modal: document.querySelector('#publication__modal'),
        close: document.querySelector('#publication-modal__close')
    };
    var formatDate = function (dtstr) {
        var dtcomps = dtstr.replace(/\D/g, ' ').split(' ');

        dtcomps[1]--;

        return new Date(Date.UTC(dtcomps[0], dtcomps[1], dtcomps[2], dtcomps[3], dtcomps[4], dtcomps[5]));
    };
    var getPublicationRuntimeEventLabel = function (data) {
        return data.run_from.substr(0, 10) + '/' + data.run_till.substr(0, 10);
    }
    var fetchPublications = function (callback) {
        SGN.CoreKit.request({
            url: '/v2/catalogs',
            qs: {
                dealer_id: config.businessId,
                order_by: '-expiration_date',
                offset: 0,
                limit: 4
            }
        }, callback);
    };
    var renderPublications = function (publications) {
        var html = '';

        publications.forEach(function (item) {
            var runFrom = formatDate(item.run_from);
            var runTill = formatDate(item.run_till);
            var formattedDate = ['Fra ', runFrom.getDate(), '/', runFrom.getMonth() + 1, ' t.o.m. ', runTill.getDate(), '/', runTill.getMonth() + 1].join('');

            html += '<div class="publications__item">';
            html += '<img data-id="' + item.id + '" src="' + item.images.view + '">';
            html += '<div>' + formattedDate + '</div>';
            html += '</div>';
        });

        els.root.innerHTML = html;
    };
    var matchSKU = function (str) {
        var i = 0;
        var word;
        var words = [];

        str.replace(/\./g, '').split(' ').forEach(function(word) {
            word.split(/\(/).forEach(function(part) {
                words.push(part.replace(/\./, ''));
            });
        });

        words.reverse();
        
        while (i < words.length) {
            word = words[i];

            if (word.length >= 6) {
                if (word.toUpperCase() === word && /[A-Z]/.test(word) && /\d/.test(word)) {
                    return word;
                }
            }
        
            i++;
        }

        i = 0;
        
        while (i < words.length) {
            word = words[i];

            if (word.length >= 6) {
                if (word.toUpperCase() === word && /^[a-zA-Z]*$/.test(word) && word !== 'SPARER') {
                    return word;
                }
            }

            i++;
        }

        i = 0;

        while (i < words.length) {
            word = words[i];

            if (word.length >= 6) {
                if (/^[a-zA-Z0-9]*$/.test(word) && /\d/.test(word)) {
                    return word;
                }
            }

            i++;
        }
    };
    var fetchOffers = function (id, callback) {
        var offset = 0;
        var limit = 100;
        var offers = [];
        var fetch = function () {
            SGN.CoreKit.request({
                url: '/v2/offers',
                qs: {
                    catalog_id: id,
                    offset: offset,
                    limit: limit
                }
            }, function (err, res) {
                if (err) {
                    callback(err);
                } else if (res.length < limit) {
                    offers = offers.concat(res);

                    callback(null, offers);
                } else {
                    offset += limit;
                    offers = offers.concat(res);

                    fetch();
                }
            });
        };

        fetch();
    };
    var openActivePublication = function (pageNumber) {
        fetchPublications(function (err, res) {
            if (!err && res && res.length > 0) {
                res.sort(function (a, b) {
                    var aDate = formatDate(a.run_from).getTime();
                    var bDate = formatDate(b.run_from).getTime();
                    
                    return aDate - bDate;
                });

                openPublication(res[0].id, pageNumber);
            }
        });
    };
    var openPublication = function (id, pageNumber) {
        var options = {
            el: els.modal,
            id: id,
            eventTracker: SGN.config.get('eventTracker')
        };

        if (typeof pageNumber === 'number' && pageNumber > 0) {
            options.pageId = 'page' + encodeURIComponent(pageNumber);
        }
        
        window.scrollTo(0, 0);

        els.html.classList.add('publication--open');

        var bootstrapper = new SGN.PagedPublicationKit.Bootstrapper(options);

        bootstrapper.fetch(function (err, data) {
            if (!err) {
                var viewer = bootstrapper.createViewer(data);
                var time = new Date().getTime();
                var fetchCustomHotspots = function (callback) {
                    var oReq = new XMLHttpRequest();
                    var customHotspotsURL = 'https://s3-eu-west-1.amazonaws.com/sgn-clients/elgiganten/hotspots.json?t=' + time;

                    function reqListener() {
                        var catalogsCustomHotspots = JSON.parse(this.responseText);
                        var customHotspots = id in catalogsCustomHotspots ? catalogsCustomHotspots[id] : [];

                        callback(null, customHotspots)
                    }

                    oReq.addEventListener('load', reqListener);
                    oReq.addEventListener('error', function () {
                        callback(null, []);
                    });
                    oReq.addEventListener('abort', function () {
                        callback(null, []);
                    });
                    oReq.open('GET', customHotspotsURL, true);
                    oReq.send();
                };
                var _fetchHotspots = function (callback) {
                    SGN.util.async.parallel([bootstrapper.fetchHotspots.bind(bootstrapper), fetchCustomHotspots], function (result) {
                        var offerHotspots = result[0][1];
                        var customHotspots = result[1][1];
                        var allHotspots = offerHotspots.concat(customHotspots);

                        callback(null, allHotspots);
                    });
                };
                var _fetchOffers = function (callback) {
                    return fetchOffers(id, callback);
                };

                viewer.bind('hotspotClicked', function (hotspot) {
                    if (hotspot.type === 'offer') {
                        if (hotspot.sku) {
                            nga('send', 'event', {
                                'eventCategory': 'Publication',
                                'eventAction': 'Offer Opened',
                                'eventLabel': getPublicationRuntimeEventLabel(data.details) + '-' + hotspot.sku
                            });
                            
                            window.open('https://www.elgiganten.dk/product/' + encodeURIComponent(hotspot.sku) + '/?intcid=INT_IPAPER_BUTTON', '_blank');
                        } else {
                            nga('send', 'event', {
                                'eventCategory': 'Publication',
                                'eventAction': 'Offer Opened',
                                'eventLabel': getPublicationRuntimeEventLabel(data.details) + '-unknown'
                            });

                            if (hotspot.offer.description) {
                                var url = hotspot.offer.description.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

                                if (url && url.length > 0) {
                                    window.open(url[0], '_blank');

                                    return;
                                }
                            }

                            window.open('https://www.elgiganten.dk/search?SearchTerm=' + encodeURIComponent(hotspot.offer.heading) + '&searchResultTab=&search=&intcid=INT_IPAPER_BUTTON', '_blank');
                        }
                    } else if (hotspot.type === 'url' && hotspot.url) {
                        nga('send', 'event', {
                            'eventCategory': 'Publication',
                            'eventAction': 'URL Opened',
                            'eventLabel': getPublicationRuntimeEventLabel(data.details)
                        });

                        window.open(hotspot.url, '_blank');
                    }
                });
                var trackProgress = function (progress) {
                    nga('send', 'event', {
                        'eventCategory': 'Publication',
                        'eventAction': 'Read-through ' + progress + '%',
                        'eventLabel': getPublicationRuntimeEventLabel(data.details)
                    });
                }
                var navigationHandlers = {
                    page2: once(function () {
                        nga('send', 'event', {
                            'eventCategory': 'Publication',
                            'eventAction': 'Read-through page 2',
                            'eventLabel': getPublicationRuntimeEventLabel(data.details)
                        });
                    }),
                    progress20: once(function () { trackProgress(20) }),
                    progress40: once(function () { trackProgress(40) }),
                    progress60: once(function () { trackProgress(60) }),
                    progress80: once(function () { trackProgress(80) }),
                    progress100: once(function () { trackProgress(100) })
                }

                if (!(typeof pageNumber === 'number' && pageNumber > 1)) {
                    nga('send', 'event', {
                        'eventCategory': 'Publication',
                        'eventAction': 'Opened',
                        'eventLabel': getPublicationRuntimeEventLabel(data.details)
                    });

                    viewer.bind('beforeNavigation', function (navEvent) {
                        if (navEvent.verso.newPosition === 1) {
                            navigationHandlers.page2();
                        }

                        if (navEvent.progress >= 100) {
                            navigationHandlers.progress100();
                        } else if (navEvent.progress >= 80) {
                            navigationHandlers.progress80();
                        } else if (navEvent.progress >= 60) {
                            navigationHandlers.progress60();
                        } else if (navEvent.progress >= 40) {
                            navigationHandlers.progress40();
                        } else if (navEvent.progress >= 20) {
                            navigationHandlers.progress20();
                        }
                    });
                } else {
                    nga('send', 'event', {
                        'eventCategory': 'Publication',
                        'eventAction': 'Opened Specific Page',
                        'eventLabel': getPublicationRuntimeEventLabel(data.details)
                    });
                }

                viewer.start();

                SGN.util.async.parallel([_fetchHotspots, _fetchOffers], function (result) {
                    var hotspots = result[0][1];
                    var offers = result[1][1];

                    if (hotspots && offers) {
                        hotspots.forEach(function (hotspot) {
                            for (let i = 0; i < offers.length; i++) {
                                if (hotspot.type === 'offer' && hotspot.offer.id === offers[i].id) {
                                    var desc = offers[i].description;
                                    var sku = matchSKU(desc);

                                    hotspot.offer.description = desc;

                                    if (sku) {
                                        hotspot.sku = sku.toUpperCase();

                                        break;
                                    }
                                }
                            }
                        });
                    }

                    bootstrapper.applyHotspots(viewer, hotspots);
                });

                var close = function (e) {
                    e.preventDefault();

                    els.close.removeEventListener('click', close);
                    els.html.classList.remove('publication--open');
                    viewer.destroy();
                };

                window.addEventListener('load', function () {
                    setTimeout(function () {
                        viewer.el.focus();
                    }, 1);
                });
                els.close.addEventListener('click', close);
            }
        });
    };
    var init = function () {
        if (!els.root || initialized) {
            return;
        }

        var autoopen = SGN.util.getQueryParam('autoopen') || '';

        initialized = true;

        els.root.addEventListener('click', function (e) {
            if (e.target.tagName === 'IMG') {
                var id = e.target.dataset.id;

                openPublication(id);
            }
        });

        fetchPublications(function (err, res) {
            if (!err) {
                renderPublications(res);

                var parts = autoopen.split(',');

                if (parts[0] === 'current') {
                    if (res[res.length - 1]) {
                        openPublication(res[res.length - 1].id, parseInt(parts[1]));
                    }
                } else if (parts[0] === 'future') {
                    if (res[0]) {
                        openPublication(res[0].id, parseInt(parts[1]));
                    }
                } else if (parts[0].length > 0) {
                    for (var i = 0; i < res.length; i++) {
                        if (parts[0] === res[i].id && res[i].dealer_id === config.businessId) {
                            openPublication(res[i].id, parseInt(parts[1]));

                            break;
                        }
                    }
                }
            }
        });
    };

    setInterval(function () {
        if (ngaPool.length && typeof n === 'function') {
            for (var i = 0; i < ngaPool.length; i++) {
                var evt = ngaPool[i];

                n(evt[0], evt[1], evt[2]);
            }

            ngaPool = [];
        }
    }, 1000);

    return {
        init: init,
        openActivePublication: openActivePublication
    };
})();