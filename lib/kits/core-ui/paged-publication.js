import {Bootstrapper} from '../paged-publication';
import {
    MainContainer,
    ShoppingList,
    MenuPopup
} from './components/paged-publication';
import * as clientLocalStorage from '../../storage/client-local';
import {request} from '../core';
import SGN from '../../sgn-sdk';
import {update as updateViewerTranslation} from '../../translations';
import {translate} from './components/helpers/component';

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
        publicationId: scriptEl.getAttribute('data-component-publication-id'),
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
        removedComponents: scriptEl.getAttribute(
            'data-component-paged-publication-remove-components'
        ),
        theme: scriptEl.getAttribute('data-component-theme'),
        offerClickBehavior: scriptEl.getAttribute(
            'data-component-paged-publication-viewer-offer-click-behavior'
        )
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

    const mainContainerEl = document.querySelector(scriptEls.mainContainer);

    MainContainer({
        template: customTemplates.mainContainer,
        shoppingListCounterTemplate: customTemplates.shoppingListCounter,
        el: mainContainerEl,
        scriptEls
    }).render();

    const render = async () => {
        if (Object.keys(options).length === 0) {
            await setOptions();
        }

        start();

        renderShoppingList();
        renderMenuPopup();
    };

    const renderShoppingList = () => {
        ShoppingList({
            template: customTemplates.shoppingList
        }).render();
    };

    const renderMenuPopup = () => {
        const menuBtn = document.querySelector('.sgn__nav-menu-btn');
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            MenuPopup({
                configs: options,
                sgnData,
                sgnViewer,
                templates: customTemplates
            }).render();
        });
    };

    const animateShoppingListCounter = () => {
        const shoppingListCounter = document.querySelector(
            '.sgn__offer-shopping-list-counter'
        );

        shoppingListCounter?.classList.remove('sgn-animate-bounce');
        shoppingListCounter?.classList.add('sgn-animate-bounce');
    };

    const setOptions = async (opts = {}) => {
        options = {
            el: document.querySelector('.sgn__pp'),
            eventTracker: SGN.config.get('eventTracker'),
            pageId:
                opts.pageId ||
                `page${SGN.util.getQueryParam(scriptEls.pageIdParam) || 1}`,
            id:
                opts.id ||
                SGN.util.getQueryParam(scriptEls.publicationIdParam) ||
                scriptEls.publicationId ||
                '',
            businessId: opts.businessId || scriptEls.businessId
        };

        if (!options.id) {
            options.id = await fetchLatestPublicationId();
        }
    };

    const start = () => {
        const bootstrapper = new Bootstrapper(options);

        bootstrapper.fetch((err, data) => {
            if (!err) {
                sgnData = data;
                sgnViewer = bootstrapper.createViewer(data);

                updateViewerTranslation({
                    'paged_publication.hotspot_picker.header': translate(
                        'paged_publication_viewer_hotspot_picker_header'
                    )
                });

                const headerEl = options.el.querySelector('.sgn__header');
                headerEl?.classList.add('sgn-animate-header');

                sgnViewer.bind('hotspotClicked', (hotspot) =>
                    clickHotspot(hotspot)
                );

                sgnViewer.start();

                bootstrapper.fetchHotspots((err2, hotspots) => {
                    if (!err2) {
                        bootstrapper.applyHotspots(sgnViewer, hotspots);
                    }
                });
            } else {
                console.error(err);
            }
        });
    };

    const clickHotspot = (hotspot) => {
        const shoppingBtn = options.el.querySelector('.sgn__offer-shopping');

        if (
            scriptEls.offerClickBehavior === 'open-offer-link' &&
            hotspot?.webshop
        ) {
            location.href = hotspot.webshop;
        }

        if (shoppingBtn) {
            const storedPublicationOffers = clientLocalStorage.get(
                'paged-publication-saved-offers'
            );
            const shopListOffer = {
                name: hotspot.heading,
                pricing: hotspot.offer?.pricing,
                is_ticked: false
            };

            if (!storedPublicationOffers) {
                clientLocalStorage.setWithEvent(
                    'paged-publication-saved-offers',
                    [shopListOffer],
                    'tjek_shopping_list_update'
                );
            } else {
                storedPublicationOffers.push(shopListOffer);
                clientLocalStorage.setWithEvent(
                    'paged-publication-saved-offers',
                    storedPublicationOffers,
                    'tjek_shopping_list_update'
                );
            }

            animateShoppingListCounter();
        }
    };

    const fetchLatestPublicationId = async () => {
        const publications = await request({
            url: '/v2/catalogs',
            qs: {
                dealer_id: scriptEls.businessId,
                order_by: '-publication_date',
                limit: 1
            }
        });

        return publications?.[0]?.id;
    };

    return {
        render,
        setOptions
    };
};

export default pagedPublication;
