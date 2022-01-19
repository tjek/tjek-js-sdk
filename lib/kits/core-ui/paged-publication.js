import * as PagedPublicationKit from '../paged-publication';
import * as PagedPublicationComponents from './components/paged-publication';
import * as clientLocalStorage from '../../storage/client-local';
import {request} from '../core';
import SGN from '../../sgn-sdk';

const pagedPublication = (scriptEl, mainContainer = '') => {
    let _options = {};
    let _sgnData = {};
    const _scriptEl = scriptEl;
    const _scriptEls = {
        mainContainer:
            scriptEl.getAttribute(
                'data-component-paged-publication-container'
            ) || mainContainer,
        publicationIdParam:
            scriptEl.getAttribute('data-publication-id-query-param') ||
            'publicationid',
        pageIdParam:
            scriptEl.getAttribute('data-publication-page-query-param') ||
            'page',
        localeCode: scriptEl.getAttribute('data-locale-code'),
        translationKeys: scriptEl.getAttribute(
            'data-translation-key-paged_publication_viewer'
        ),
        logoSrc: scriptEl.getAttribute(
            'data-component-paged-publication-logo-src'
        ),
        headerBackground: scriptEl.getAttribute(
            'data-component-paged-publication-header-background-color'
        ),
        removedComponents: scriptEl.getAttribute(
            'data-component-paged-publication-remove-components'
        ),
        theme: scriptEl.getAttribute('data-component-theme')
    };

    const _customTemplates = {
        mainContainer: document.getElementById(
            'sgn-sdk-paged-publication-viewer-template'
        ),
        offerList: document.getElementById(
            'sgn-sdk-paged-publication-viewer-offer-list-template'
        ),
        shoppingList: document.getElementById(
            'sgn-sdk-paged-publication-viewer-shopping-list-template'
        ),
        shoppingCounter: document.getElementById(
            'sgn-sdk-paged-publication-viewer-shopping-counter-template'
        ),
        pageList: document.getElementById(
            'sgn-sdk-paged-publication-viewer-page-list-template'
        ),
        menuContainer: document.getElementById(
            'sgn-sdk-paged-publication-viewer-menu-container-template'
        )
    };

    const renderMainContainer = () => {
        const mainContainerEl = document.querySelector(
            _scriptEls.mainContainer
        );

        PagedPublicationComponents.MainContainer({
            template: _customTemplates.mainContainer,
            shoppingCounterTemplate: _customTemplates.shoppingCounter,
            el: mainContainerEl,
            scriptEls: _scriptEls
        }).render();
    };
    renderMainContainer();

    const pagedPublicationObj = {
        render: async () => {
            if (Object.keys(_options).length === 0) {
                await pagedPublicationObj.setOptions();
            }

            pagedPublicationObj.start();

            pagedPublicationObj.renderShoppingList();
            pagedPublicationObj.renderMenuPopup();
        },

        renderShoppingList: () => {
            PagedPublicationComponents.ShoppingList({
                template: _customTemplates.shoppingList,
                scriptEls: _scriptEls
            }).render();
        },

        renderMenuPopup: () => {
            const menuBtn = document.querySelector('.sgn__nav-menu-btn');
            menuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                PagedPublicationComponents.MenuPopup({
                    configs: _options,
                    sgnData: _sgnData,
                    templates: _customTemplates,
                    scriptEl: _scriptEl,
                    scriptEls: _scriptEls
                }).render();
            });
        },

        animateShoppingCounter: () => {
            const shoppingCounter = document.querySelector(
                '.sgn__offer-shopping-counter'
            );

            shoppingCounter?.classList.remove('sgn-animate-bounce');
            shoppingCounter?.classList.add('sgn-animate-bounce');
        },

        setOptions: async (options = {}) => {
            _options = {
                el: document.querySelector('.sgn__pp'),
                eventTracker: SGN.config.get('eventTracker'),
                pageId:
                    options.pageId ||
                    `page${
                        SGN.util.getQueryParam(_scriptEls.pageIdParam) || 1
                    }`,
                id:
                    options.id ||
                    SGN.util.getQueryParam(_scriptEls.publicationIdParam) ||
                    SGN.config.get('publicationId') ||
                    '',
                dealerId: options.dealerId || SGN.config.get('businessId')
            };

            if (!_options.id) {
                _options.id = await pagedPublicationObj.fetchLatestCatId();
            }
        },

        start: () => {
            const bootstrapper = new PagedPublicationKit.Bootstrapper(_options);

            bootstrapper.fetch((err, data) => {
                if (!err) {
                    _sgnData = data;
                    const viewer = bootstrapper.createViewer(data);

                    const headerEl = _options.el.querySelector('.sgn__header');
                    headerEl?.classList.add('sgn-animate-header');
                    console.log(viewer);
                    console.log(data);

                    viewer.bind('hotspotClicked', (hotspot) => {
                        console.log(hotspot);
                        const clientLocal = clientLocalStorage.get(
                            'paged-publication-saved-offers'
                        );
                        const shopListOffer = {
                            name: hotspot.heading,
                            price: hotspot.offer?.pricing?.price,
                            is_ticked: false
                        };

                        if (!clientLocal) {
                            clientLocalStorage.set(
                                'paged-publication-saved-offers',
                                [shopListOffer]
                            );
                        } else {
                            clientLocal.push(shopListOffer);
                            clientLocalStorage.set(
                                'paged-publication-saved-offers',
                                clientLocal
                            );
                        }

                        pagedPublicationObj.animateShoppingCounter();
                    });

                    viewer.bind('hotspotPressed', (hotspot) => {
                        console.log('Hotspot pressed', hotspot);
                    });

                    viewer.bind('hotspotContextmenu', (hotspot) => {
                        console.log('Hotspot contextmenu', hotspot);
                    });

                    viewer.start();

                    // Fetch hotspots after rendering the viewer as they are not critical for initial render.
                    bootstrapper.fetchHotspots((err2, hotspots) => {
                        if (!err2) {
                            bootstrapper.applyHotspots(viewer, hotspots);
                        }
                    });
                } else {
                    console.error(err);
                }
            });
        },

        fetchLatestCatId: () => {
            return new Promise((resolve) => {
                request(
                    {
                        url: '/v2/catalogs',
                        qs: {
                            dealer_id: SGN.config.get('businessId'),
                            order_by: '-publication_date',
                            limit: 1
                        }
                    },
                    (err, catalogs) => {
                        if (!err) {
                            const config = {
                                publicationId: catalogs[0].id
                            };
                            SGN.config.set(config);
                            resolve(catalogs[0].id);
                        }
                    }
                );
            });
        }
    };

    return pagedPublicationObj;
};

export default pagedPublication;
