(function () {
var config = {
    publication: {
        autoopen: SGN.util.getQueryParam('pub_auto_open'),
        incitoCategory: SGN.util.getQueryParam('pub_incito_category')
    },
    businessId: 'c35es'
};
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
var publications;
var activePublication;
var incito;
var incitoPublicationViewer;
var fetchPublications = function (callback) {
    SGN.CoreKit.request({
        url: '/v2/catalogs',
        qs: {
            dealer_id: config.businessId,
            order_by: '-valid_date',
            types: 'paged,incito',
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

            openPagedPublication(res[0], pageNumber);
        }
    });
};
var openPagedPublication = function (publication, pageNumber) {
    var options = {
        el: els.paged.modal,
        id: publication.id,
        eventTracker: SGN.config.get('eventTracker')
    };

    if (typeof pageNumber === 'number' && pageNumber > 0) {
        options.pageId = 'page' + encodeURIComponent(pageNumber);
    }
    
    window.scrollTo(0, 0);

    els.html.classList.add('publication--open');

    var bootstrapper = new SGN.PagedPublicationKit.Bootstrapper(options);

    bootstrapper.fetchPages(function (err, pages) {
        if (!err) {
            var data = {
                details: publication,
                pages: pages
            };
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

                url = updateQueryStringParameter(url, 'intcid', 'INT_PDF_BUTTON');

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
            };
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
            };

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
var openIncitoPublication = function (publication, category) {
    var el = els.incito.root;

    el.style.display = 'block';

    if (incitoPublicationViewer) {
        incitoPublicationViewer.destroy();
    }

    activePublication = publication;

    nga({
        'eventCategory': 'Incito Publication',
        'eventAction': 'Opened',
        'eventLabel': getPublicationRuntimeEventLabel(activePublication)
    });

    var incitoPublication = new SGN.IncitoPublicationKit.Bootstrapper({
        el: el,
        id: publication.id,
        eventTracker: SGN.config.get('eventTracker')
    });
    var trackProgress = function (progress) {
        nga({
            'eventCategory': 'Incito Publication',
            'eventAction': 'Read-through ' + progress + '%',
            'eventLabel': getPublicationRuntimeEventLabel(activePublication)
        });
    };
    var navigationHandlers = {
        progress20: once(function () { trackProgress(20) }),
        progress40: once(function () { trackProgress(40) }),
        progress60: once(function () { trackProgress(60) }),
        progress80: once(function () { trackProgress(80) }),
        progress100: once(function () { trackProgress(100) })
    };
    var rect = els.incito.root.getBoundingClientRect();

    window.scrollTo(0, Math.max(0, rect.top + window.pageYOffset));

    incitoPublication.fetch(function (err, res) {
        if (!err) {
            incito = res.incito;
            incitoPublicationViewer = incitoPublication.createViewer(res);

            incitoPublicationViewer.start();
            incitoPublicationViewer.bind('progress', function (navEvent) {
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

            var rect = els.incito.root.getBoundingClientRect();
        
            if (category) {
                scrollToIncitoCategory(category);
            } else {
                window.scrollTo(0, Math.max(0, rect.top + window.pageYOffset - 40));
            }

            SGN.CoreUIKit.on(el, 'click', '.incito__view[data-role="offer"]', function (e) {
                e.preventDefault();
                
                var id = this.getAttribute('data-id');
                var meta = incitoPublicationViewer.incito.ids[id];

                if (!meta || !meta['tjek.offer.v1'] || !meta['tjek.offer.v1'].link) {
                    return;
                }

                var url = updateQueryStringParameter(meta['tjek.offer.v1'].link, 'intcid', 'INT_INCITO_BUTTON');

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
var scrollToIncitoCategory = function (category) {
    var sections = {};
    var sectionCount = 0;
    var likelySection;
    var mappings = {
        'pc-tablets': ['bb-offers-533'],
        'gaming': ['bb-offers-550', 'bb-offers-551', 'bb-offers-552'],
        'tv-billede': [],
        'lyd-hi-fi': [],
        'mobil-gps': [],
        'hvidevarer': [],
        'kokken-bryggers-og-garderobe': [],
        'husholdning': [],
        'personlig-pleje-skonhed-og-velvare': [],
        'smart-home': [],
        'wearables-sport-og-fitness': [],
        'foto-video': [],
        'apple': ['apple']
    };
    var find = function (view, sectionId, callback) {
        if (view.role === 'offer' && view.meta && view.meta['tjek.offer.v1'].ids && sectionId) {
            for (var i = 0; i < view.meta['tjek.offer.v1'].ids.length; i++) {
                var id = view.meta['tjek.offer.v1'].ids[i];

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
            if (mappings[category] && mappings[category].indexOf(key) > -1) {
                likelySection = {
                    count: sections[key],
                    id: key
                };

                break;
            } else if (!likelySection || likelySection.count < sections[key]) {
                likelySection = {
                    count: sections[key],
                    id: key
                };
            }

            sectionCount++;
        }

        if (likelySection) {
            var sectionEl = els.incito.root.querySelector('.incito__view[data-role=section][data-id="' + likelySection.id + '"]');

            if (sectionEl) {
                var rect = sectionEl.getBoundingClientRect();

                window.scrollTo(0, Math.max(0, rect.top + window.pageYOffset - 40));

                return;
            }
        }
        
        alert('Der findes desværre ingen tilbud i den kategori');
    }
};
 
if (els.list) {
    els.list.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
            var id = e.target.dataset.id;
            var publication;

            for (var i = 0; i < publications.length; i++) {
                if (publications[i].id === id) {
                    publication = publications[i];

                    break;
                }
            }

            if (publication) {
                if (publication.incito_publication_id) {
                    openIncitoPublication(publication);
                } else {
                    openPagedPublication(publication);
                }
            }
        }
    });

    fetchPublications(function (err, res) {
        if (!err) {
            publications = res;

            renderPublications(res);

            if (config.publication.autoopen === 'current' || config.publication.autoopen === 'future') {
                res.sort(function (a, b) {
                    var aDate = formatDate(a.run_from).getTime();
                    var bDate = formatDate(b.run_from).getTime();
    
                    if (config.publication.autoopen === 'current') {
                        return aDate - bDate;
                    } else {
                        return bDate - aDate;
                    }
                });
    
                if (res[0]) {
                    if (res[0].incito_publication_id) {
                        openIncitoPublication(res[0], config.publication.incitoCategory);
                    } else {
                        openPagedPublication(res[0]);
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
        
        window.scrollTo(0, Math.max(0, rect.top + window.pageYOffset - 40));

        if (activePublication) {
            nga({
                'eventCategory': 'Incito Publication',
                'eventAction': 'Scroll to Top',
                'eventLabel': getPublicationRuntimeEventLabel(activePublication)
            });
        }
    });
}

if (els.incito.categorySwitcher) {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var showApple = false;

    if (year === 2019) {
        if (month === 7 && day >= 29) {
            showApple = true;
        } else if (month === 8 && day <= 25) {
            showApple = true;
        }
    }

    if (showApple) {
        var appleOptionEl = document.createElement('option');

        appleOptionEl.value = 'apple';
        appleOptionEl.textContent = 'Apple';

        els.incito.categorySwitcher.appendChild(appleOptionEl);
    }

    els.incito.categorySwitcher.addEventListener('change', function (e) {
        var category = e.target.value;

        scrollToIncitoCategory(category);

        nga({
            'eventCategory': 'Incito Publication',
            'eventAction': 'Category Changed',
            'eventLabel': category
        });
    });
}

window.shopgun = {
    openActivePublication: openActivePublication
};
})();