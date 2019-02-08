(function () {
// TODO: Remove
SGN.config.set({
    graphUrl: 'https://graph.service-staging.shopgun.com'
});

var config = {
    id: SGN.util.getQueryParam('autoopen'),
    businessId: 'c35es'
};
var isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
var noop = function () {};
var nga = 'dataLayer' in window ? function (ctx) {
    dataLayer.push({
        'event': 'shopgun',
        'shopgunCategory': ctx.eventCategory,
        'shopgunAction': ctx.eventAction,
        'shopgunLabel': ctx.eventLabel
    });
} : noop;
var once = function (fun) {
    var done = false;

    return function () {
        if (!done) {
            done = true;
            
            return fun.apply(this, arguments);
        }
    };
};
var els = {
    html: document.querySelector('html'),
    list: document.querySelector('#publications'),
    paged: {
        modal: document.querySelector('#paged-publication__modal'),
        close: document.querySelector('#paged-publication-modal__close')
    },
    incito: {
        root: document.querySelector('#incito__publication'),
        categorySwitcher: document.querySelector('#incito-publication__nav select'),
        classic: document.querySelector('#incito-publication__classic'),
        top: document.querySelector('#incito-publication__top')
    }
};
var formatDate = function (dtstr) {
    var dtcomps = dtstr.replace(/\D/g, ' ').split(' ');

    dtcomps[1]--;

    return new Date(Date.UTC(dtcomps[0], dtcomps[1], dtcomps[2], dtcomps[3], dtcomps[4], dtcomps[5]));
};
var getPublicationRuntimeEventLabel = function (data) {
    return data.run_from.substr(0, 10) + '/' + data.run_till.substr(0, 10);
};
var incito;
var incitoPublicationViewer;
var fetchPublications = function (callback) {
    SGN.CoreKit.request({
        url: '/v2/catalogs',
        qs: {
            dealer_id: config.businessId,
            order_by: '-valid_date',
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
        html += '<img data-id="' + item.id + '" data-incito-id="' + item.incito_publication_id + '" src="' + item.images.view + '">';
        html += '<div>' + formattedDate + '</div>';
        html += '</div>';
    });

    els.list.innerHTML = html;
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
var openPagedPublication = function (id, pageNumber) {
    var options = {
        el: els.paged.modal,
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

                oReq.addEventListener('load', function () {
                    try {
                        var catalogsCustomHotspots = JSON.parse(this.responseText);
                        var customHotspots = id in catalogsCustomHotspots ? catalogsCustomHotspots[id] : [];

                        callback(null, customHotspots);
                    } catch (err) {
                        callback(null, []);
                    }
                });
                oReq.addEventListener('error', function () {
                    callback(null, []);
                });
                oReq.addEventListener('abort', function () {
                    callback(null, []);
                });
                oReq.open('GET', customHotspotsURL, true);
                oReq.send();
            };
            var fetchHotspots = function (callback) {
                SGN.util.async.parallel([bootstrapper.fetchHotspots.bind(bootstrapper), fetchCustomHotspots], function (result) {
                    var offerHotspots = result[0][1];
                    var customHotspots = result[1][1];
                    var allHotspots = offerHotspots.concat(customHotspots);

                    callback(null, allHotspots);
                });
            };
            var updateQueryStringParameter = function (uri, key, value) {
                var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
                var separator = uri.indexOf('?') !== -1 ? "&" : "?";

                if (uri.match(re)) {
                    return uri.replace(re, '$1' + key + "=" + value + '$2');
                } else {
                    return uri + separator + key + "=" + value;
                }
            };

            viewer.bind('hotspotClicked', function (hotspot) {
                if (hotspot.type === 'url') {
                    window.open(updateQueryStringParameter(hotspot.url, 'intcid', 'INT_IPAPER_BUTTON'), '_blank');
                } else {
                    nga({
                        'eventCategory': 'Publication',
                        'eventAction': 'Offer Opened',
                        'eventLabel': getPublicationRuntimeEventLabel(data.details)
                    });
                    
                    window.open(updateQueryStringParameter(hotspot.webshop, 'intcid', 'INT_IPAPER_BUTTON'), '_blank');
                }
            });
            var trackProgress = function (progress) {
                nga({
                    'eventCategory': 'Publication',
                    'eventAction': 'Read-through ' + progress + '%',
                    'eventLabel': getPublicationRuntimeEventLabel(data.details)
                });
            }
            var navigationHandlers = {
                page2: once(function () {
                    nga({
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
                nga({
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
                nga({
                    'eventCategory': 'Publication',
                    'eventAction': 'Opened Specific Page',
                    'eventLabel': getPublicationRuntimeEventLabel(data.details)
                });
            }

            viewer.start();

            fetchHotspots(function (err, hotspots) {
                if (hotspots && !err) {
                    hotspots = hotspots.filter(function (hotspot) {
                        return hotspot.type === 'url' || (hotspot.type === 'offer' && typeof hotspot.webshop === 'string' && hotspot.webshop.length > 0);
                    });

                    bootstrapper.applyHotspots(viewer, hotspots);
                }
            });

            var close = function (e) {
                e.preventDefault();

                els.paged.close.removeEventListener('click', close);
                els.html.classList.remove('publication--open');
                viewer.destroy();
            };

            // Something steals focus on load so regain it.
            window.addEventListener('load', function () {
                setTimeout(function () {
                    viewer.el.focus();
                }, 1);
            });
            els.paged.close.addEventListener('click', close);
        }
    });
};
var openIncitoPublication = (id, pagedId) => {
    var el = els.incito.root;

    el.style.display = 'block';

    if (incitoPublicationViewer) {
        incitoPublicationViewer.destroy();
    }

    if (pagedId) {
        els.incito.classic.setAttribute('data-id', pagedId);
        els.incito.classic.style.display = 'inline';
    } else {
        els.incito.classic.style.display = 'none';
    }

    var incitoPublication = new SGN.IncitoPublicationKit.Bootstrapper({
        el: el,
        id: id,
        eventTracker: SGN.config.get('eventTracker')
    });

    incitoPublication.fetch(function (err, res) {
        if (!err) {
            incito = res.data.node.incito;
            incitoPublicationViewer = incitoPublication.createViewer({
                incito: incito
            });

            incitoPublicationViewer.start();

            SGN.CoreUIKit.on(el, 'click', '.incito__view[data-role="offer"]', function (e) {
                e.preventDefault();
                
                var id = this.getAttribute('data-id');

                window.open('https://www.elgiganten.dk/search?SearchTerm=' + encodeURIComponent(id));
            });
        }
    });
};
var closeIncitoPublication = function () {
    if (incitoPublicationViewer) {
        incitoPublicationViewer.destroy();

        incitoPublicationViewer = null;

        els.incito.categorySwitcher.value = '';
        els.incito.root.style.display = 'none';
        els.incito.root.classList.remove('sgn-incito--started');
    }
};

if (els.list) {
    els.list.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
            // TODO: Remove.
            var id = e.target.dataset.id;
            var incitoId = 'SW5jaXRvUHVibGljYXRpb246MTI3MzgzMTIxNzM5MzA3MzQ0MA=='; //e.target.dataset.incitoId;

            if (incitoId) {
                openIncitoPublication(incitoId, id);
            } else {
                openPublication(id);
            }
        }
    });

    fetchPublications(function (err, res) {
        if (!err) {
            renderPublications(res);
    
            var parts = (config.id || '').split(',');
    
            if (parts[0] === 'current' || parts[0] === 'future') {
                res.sort(function (a, b) {
                    var aDate = formatDate(a.run_from).getTime();
                    var bDate = formatDate(b.run_from).getTime();
    
                    if (parts[0] === 'current') {
                        return aDate - bDate;
                    } else {
                        return bDate - aDate;
                    }
                });
    
                if (res[0]) {
                    openPagedPublication(res[0].id, parseInt(parts[1]));
                }
            } else if (parts[0].length > 0) {
                for (var i = 0; i < res.length; i++) {
                    if (parts[0] === res[i].id) {
                        openPagedPublication(res[i].id, parseInt(parts[1]));
    
                        break;
                    }
                }
            }
        }
    });
}

if (els.incito.classic) {
    els.incito.classic.addEventListener('click', function (e) {
        e.preventDefault();

        closeIncitoPublication();
        openPagedPublication(e.target.dataset.id);
    });
}

if (els.incito.top) {
    els.incito.top.addEventListener('click', function (e) {
        e.preventDefault();

        if (isSmoothScrollSupported) {
            document.body.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            window.scrollTo(0, 0);
        }
    });
}

if (els.incito.categorySwitcher) {
    els.incito.categorySwitcher.addEventListener('change', function (e) {
        var category = e.target.value;
        var find = function (view, callback) {
            if (view.role === 'offer' && view.meta && view.meta.ids) {
                var match;

                for (var i = 0; i < view.meta.ids.length; i++) {
                    var id = view.meta.ids[i];

                    if (id.provider === 'elgiganten' && id.type === 'category' && id.value === category) {
                        match = view;

                        break;
                    }
                }

                if (match) {
                    return match;
                }
            }
            
            if (view.child_views) {
                for (var i = 0; i < view.child_views.length; i++) {
                    var match = find(view.child_views[i], callback);

                    if (match) {
                        return match;
                    }
                }
            }
        };

        if (category && incito) {
            var view = find(incito.root_view);

            if (view) {
                var offerEl = els.incito.root.querySelector('.incito__view[data-role=offer][data-id="' + view.id + '"]');

                if (isSmoothScrollSupported) {
                    offerEl.scrollIntoView({
                        behavior: 'auto',
                        block: 'center'
                    });
                } else {
                    var rect = offerEl.getBoundingClientRect();

                    window.scrollTo(0, Math.max(0, rect.top + window.pageYOffset - 100));
                }
            } else {
                alert('Der findes desværre ingen tilbud i den kategori');
            }
        }
    });
}

window.shopgun = {
    openActivePublication: openActivePublication
};
})();