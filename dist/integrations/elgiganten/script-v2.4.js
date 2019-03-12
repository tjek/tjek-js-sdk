(function () {
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
var isIncitoAllowed = (function () {
    var percentage = Math.floor(Math.random() * 100) + 0;

    try {
        var allowed = window.localStorage.getItem('sgn-elgiganten-incito-allowed');

        if (allowed === '1') {
            return true;
        } else if (allowed === '0') {
            return false;
        }
    } catch (err) {}

    var allowed = percentage <= 50;

    window.localStorage.setItem('sgn-elgiganten-incito-allowed', allowed ? '1' : '0');

    return allowed;
})();
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
        top: document.querySelector('#incito-publication__top')
    }
};
var formatDate = function (dtstr) {
    var dtcomps = dtstr.replace(/\D/g, ' ').split(' ');

    dtcomps[1]--;

    return new Date(Date.UTC(dtcomps[0], dtcomps[1], dtcomps[2], dtcomps[3], dtcomps[4], dtcomps[5]));
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

            openPagedPublication(res[0].id, pageNumber);
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

            viewer.bind('hotspotClicked', function (hotspot) {
                var url = hotspot.type === 'url' ? hotspot.url : hotspot.webshop;

                url = updateQueryStringParameter(url, 'utm_source', 'elgiganten');
                url = updateQueryStringParameter(url, 'utm_medium', 'pdf-tilbudsavis');
                url = updateQueryStringParameter(url, 'utm_campaign', 'dm-' + getPublicationRuntimeEventLabel(data.details));
                url = updateQueryStringParameter(url, 'intcid', 'INT_IPAPER_BUTTON');

                if (hotspot.type === 'offer') {
                    nga({
                        'eventCategory': 'Publication',
                        'eventAction': 'Offer Opened',
                        'eventLabel': getPublicationRuntimeEventLabel(data.details)
                    });
                }

                window.open(url, '_blank');
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
var openIncitoPublication = function (id, pagedId) {
    var el = els.incito.root;

    el.style.display = 'block';

    if (incitoPublicationViewer) {
        incitoPublicationViewer.destroy();
    }

    nga({
        'eventCategory': 'Incito Publication',
        'eventAction': 'Opened',
        'eventLabel': 'dm'
    });

    var incitoPublication = new SGN.IncitoPublicationKit.Bootstrapper({
        el: el,
        id: id,
        pagedPublicationId: pagedId,
        eventTracker: SGN.config.get('eventTracker')
    });

    var rect = els.incito.root.getBoundingClientRect();

    window.scrollTo(0, Math.max(0, rect.top + window.pageYOffset));

    incitoPublication.fetch(function (err, res) {
        if (!err) {
            incito = res.data.node.incito;
            incitoPublicationViewer = incitoPublication.createViewer({
                incito: incito
            });

            incitoPublicationViewer.start();

            var rect = els.incito.root.getBoundingClientRect();
        
            window.scrollTo(0, Math.max(0, rect.top + window.pageYOffset));

            SGN.CoreUIKit.on(el, 'click', '.incito__view[data-role="offer"]', function (e) {
                e.preventDefault();
                
                var id = this.getAttribute('data-id');
                var url = 'https://www.elgiganten.dk/product/' + encodeURIComponent(id) + '/';

                url = updateQueryStringParameter(url, 'utm_source', 'elgiganten');
                url = updateQueryStringParameter(url, 'utm_medium', 'incito-tilbudsavis');
                url = updateQueryStringParameter(url, 'utm_campaign', 'dm');

                nga({
                    'eventCategory': 'Incito Publication',
                    'eventAction': 'Offer Opened',
                    'eventLabel': id
                });
                
                window.open(url, '_blank');
            });
        }
    });
};

if (els.list) {
    els.list.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
            var id = e.target.dataset.id;
            var incitoId = e.target.dataset.incitoId;

            if (incitoId && isIncitoAllowed) {
                openIncitoPublication(incitoId, id);
            } else {
                openPagedPublication(id);
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

if (els.incito.top) {
    els.incito.top.addEventListener('click', function (e) {
        e.preventDefault();

        var rect = els.incito.root.getBoundingClientRect();
        
        window.scrollTo(0, Math.max(0, rect.top + window.pageYOffset));

        nga({
            'eventCategory': 'Incito Publication',
            'eventAction': 'Scroll to Top',
            'eventLabel': 'dm'
        });
    });
}

if (els.incito.categorySwitcher) {
    els.incito.categorySwitcher.addEventListener('change', function (e) {
        var category = e.target.value;
        var sections = {};
        var likelySection;
        var find = function (view, sectionId, callback) {
            if (view.role === 'offer' && view.meta && view.meta.ids && sectionId) {
                for (var i = 0; i < view.meta.ids.length; i++) {
                    var id = view.meta.ids[i];

                    if (id.provider === 'elgiganten' && id.type === 'category' && id.value === category) {
                        if (typeof sections[sectionId] !== 'number') {
                            sections[sectionId] = 0;
                        }
    
                        sections[sectionId]++;

                        break;
                    }
                }
            }
            
            if (view.child_views) {
                for (var i = 0; i < view.child_views.length; i++) {
                    var childView = view.child_views[i];

                    find(childView, childView.role === 'section' ? childView.id : sectionId, callback);
                }
            }
        };

        if (category && incito) {
            find(incito.root_view);

            for (var key in sections) {
                if (!likelySection || (likelySection.count < sections[key] && likelySection.count < 2)) {
                    likelySection = {
                        count: sections[key],
                        id: key
                    };
                }
            }

            if (likelySection) {
                var sectionEl = els.incito.root.querySelector('.incito__view[data-role=section][data-id="' + likelySection.id + '"]');

                if (isSmoothScrollSupported) {
                    sectionEl.scrollIntoView({
                        behavior: 'auto',
                        block: 'start'
                    });
                } else {
                    var rect = sectionEl.getBoundingClientRect();

                    window.scrollTo(0, Math.max(0, rect.top + window.pageYOffset));
                }
            } else {
                alert('Der findes desværre ingen tilbud i den kategori');
            }
        }

        nga({
            'eventCategory': 'Incito Publication',
            'eventAction': 'Category Changed',
            'eventLabel': 'dm'
        });
    });
}

window.shopgun = {
    openActivePublication: openActivePublication
};
})();