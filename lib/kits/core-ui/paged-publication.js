import * as PagedPublicationKit from '../paged-publication';
import * as PagedPublicationComponents from './components/paged-publication';
import * as clientLocalStorage from '../../storage/client-local';
import {request} from '../core';
import SGN from '../../sgn-sdk';

const pagedPublication = (scriptEl, mainContainer = '') => {
    let _options = {};
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
        logoSrc: scriptEl.getAttribute(
            'data-component-paged-publication-logo-src'
        ),
        headerBackground: scriptEl.getAttribute(
            'data-component-paged-publication-header-background-color'
        ),
        removedComponents: scriptEl.getAttribute(
            'data-component-paged-publication-remove-components'
        )
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

            pagedPublicationObj.renderOfferList();
            pagedPublicationObj.renderShoppingList();
            pagedPublicationObj.renderPageList();
            pagedPublicationObj.renderDownload();
        },
        renderOfferList: () => {
            const offerList = new PagedPublicationComponents.OfferList({
                configs: _options,
                template: _customTemplates.offerList
            });
            offerList.render();
        },
        renderShoppingList: () => {
            const shoppingList = new PagedPublicationComponents.ShoppingList({
                template: _customTemplates.shoppingList
            });
            shoppingList.render();
        },
        renderPageList: () => {
            const pageList = new PagedPublicationComponents.PageList({
                configs: _options,
                template: _customTemplates.pageList,
                scriptEl: _scriptEl,
                mainContainer: _scriptEls.mainContainer
            });
            pageList.render();
        },
        renderDownload: () => {
            const download = new PagedPublicationComponents.PublicationDownload(
                {
                    configs: _options
                }
            );
            download.render();
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
                    const viewer = bootstrapper.createViewer(data);
                    console.log(viewer);

                    viewer.bind('hotspotClicked', (hotspot) => {
                        console.log('Hotspot clicked', hotspot);

                        if (
                            !clientLocalStorage.get(
                                'paged-publication-saved-offers'
                            )
                        ) {
                            clientLocalStorage.set(
                                'paged-publication-saved-offers',
                                [hotspot]
                            );
                        } else {
                            const clientLocal = clientLocalStorage.get(
                                'paged-publication-saved-offers'
                            );
                            clientLocal.push(hotspot);
                            clientLocalStorage.set(
                                'paged-publication-saved-offers',
                                clientLocal
                            );
                        }

                        if (hotspot.webshop) {
                            window.location = hotspot.webshop;
                        }
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
