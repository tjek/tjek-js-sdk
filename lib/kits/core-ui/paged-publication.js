import * as PagedPublicationKit from '../paged-publication';
import * as PagedPublicationComponents from './components/paged-publication';
import * as clientLocalStorage from '../../storage/client-local';
import {request} from '../core';
import SGN from '../../sgn-sdk';

const pagedPublication = (scriptEl, mainContainer = '') => {
    let options = {};
    let sgnData = {};
    let sgnViewer = null;
    const scriptEls = {
        businessId: scriptEl.getAttribute('data-business-id'),
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

    const customTemplates = {
        mainContainer: document.getElementById(
            'sgn-sdk-paged-publication-viewer-template'
        ),
        offerList: document.getElementById(
            'sgn-sdk-paged-publication-viewer-offer-list-template'
        ),
        shoppingList: document.getElementById(
            'sgn-sdk-paged-publication-viewer-shopping-list-template'
        ),
        shoppingListCounter: document.getElementById(
            'sgn-sdk-paged-publication-viewer-shopping-list-counter-template'
        ),
        pageList: document.getElementById(
            'sgn-sdk-paged-publication-viewer-page-list-template'
        ),
        menuContainer: document.getElementById(
            'sgn-sdk-paged-publication-viewer-menu-container-template'
        )
    };

    const renderMainContainer = () => {
        const mainContainerEl = document.querySelector(scriptEls.mainContainer);

        PagedPublicationComponents.MainContainer({
            template: customTemplates.mainContainer,
            shoppingListCounterTemplate: customTemplates.shoppingListCounter,
            el: mainContainerEl,
            scriptEls
        }).render();
    };
    renderMainContainer();

    const pagedPublicationObj = {
        render: async () => {
            if (Object.keys(options).length === 0) {
                await pagedPublicationObj.setOptions();
            }

            pagedPublicationObj.start();

            pagedPublicationObj.renderShoppingList();
            pagedPublicationObj.renderMenuPopup();
        },

        renderShoppingList: () => {
            PagedPublicationComponents.ShoppingList({
                template: customTemplates.shoppingList
            }).render();
        },

        renderMenuPopup: () => {
            const menuBtn = document.querySelector('.sgn__nav-menu-btn');
            menuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                PagedPublicationComponents.MenuPopup({
                    configs: options,
                    sgnData,
                    sgnViewer,
                    templates: customTemplates
                }).render();
            });
        },

        animateShoppingListCounter: () => {
            const shoppingListCounter = document.querySelector(
                '.sgn__offer-shopping-list-counter'
            );

            shoppingListCounter?.classList.remove('sgn-animate-bounce');
            shoppingListCounter?.classList.add('sgn-animate-bounce');
        },

        setOptions: async (opts = {}) => {
            options = {
                el: document.querySelector('.sgn__pp'),
                eventTracker: SGN.config.get('eventTracker'),
                pageId:
                    opts.pageId ||
                    `page${SGN.util.getQueryParam(scriptEls.pageIdParam) || 1}`,
                id:
                    opts.id ||
                    SGN.util.getQueryParam(scriptEls.publicationIdParam) ||
                    SGN.config.get('publicationId') ||
                    '',
                businessId: opts.businessId || scriptEls.businessId
            };

            if (!options.id) {
                options.id =
                    await pagedPublicationObj.fetchLatestPublicationId();
            }
        },

        start: () => {
            const bootstrapper = new PagedPublicationKit.Bootstrapper(options);

            bootstrapper.fetch((err, data) => {
                if (!err) {
                    sgnData = data;
                    sgnViewer = bootstrapper.createViewer(data);

                    const headerEl = options.el.querySelector('.sgn__header');
                    headerEl?.classList.add('sgn-animate-header');

                    sgnViewer.bind('hotspotClicked', (hotspot) => {
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

                        pagedPublicationObj.animateShoppingListCounter();
                    });

                    sgnViewer.start();
                    // Fetch hotspots after rendering the viewer as they are not critical for initial render.
                    bootstrapper.fetchHotspots((err2, hotspots) => {
                        if (!err2) {
                            bootstrapper.applyHotspots(sgnViewer, hotspots);
                        }
                    });
                } else {
                    console.error(err);
                }
            });
        },

        fetchLatestPublicationId: () => {
            return new Promise((resolve) => {
                request(
                    {
                        url: '/v2/catalogs',
                        qs: {
                            dealer_id: scriptEls.businessId,
                            order_by: '-publication_date',
                            limit: 1
                        }
                    },
                    (err, publications) => {
                        if (!err) {
                            const config = {
                                publicationId: publications[0].id
                            };
                            SGN.config.set(config);
                            resolve(publications[0].id);
                        }
                    }
                );
            });
        }
    };

    return pagedPublicationObj;
};

export default pagedPublication;
