import * as clientLocalStorage from '../../storage/client-local';
import {getQueryParam} from '../../util';
import request from '../core/request';
import Bootstrapper from '../incito-publication/bootstrapper';
import MainContainer from './components/incito-publication/main-container';
import MenuPopup from './components/incito-publication/menu-popup';
import ShoppingList from './components/incito-publication/shopping-list';
import {on} from './';

const IncitoPublication = (
    scriptEl,
    {mainContainer = '', apiKey, coreUrl, eventTracker} = {}
) => {
    let options = {};
    let sgnData = {};
    let sgnViewer = null;
    const scriptEls = {
        businessId: scriptEl.dataset.businessId,
        mainContainer:
            scriptEl.dataset.componentPagedPublicationContainer ||
            mainContainer,
        publicationId: scriptEl.dataset.componentPublicationId,
        publicationIdParam:
            scriptEl.dataset.componentPublicationIdQueryParam ||
            'publicationid',
        pageIdParam: scriptEl.dataset.publicationPageQueryParam || 'page',
        localeCode: scriptEl.dataset.localeCode,
        translationKeys:
            scriptEl.dataset.translationKeyPaged_publication_viewer,
        theme: scriptEl.dataset.componentTheme,
        offerClickBehavior:
            scriptEl.dataset
                .componentPagedPublicationViewerOfferClickBehavior ||
            'shopping_list',
        disableShoppingList:
            scriptEl.dataset.componentPagedPublicationDisableShoppingList ===
            'true',
        disableClose:
            scriptEl.dataset.componentPagedPublicationDisableClose === 'true',
        disableMenu:
            scriptEl.dataset.componentPagedPublicationDisableMenu === 'true',
        disableDownload:
            scriptEl.dataset.componentPagedPublicationDisableDownload ===
            'true',
        disableHeader:
            scriptEl.dataset.componentPagedPublicationDisableHeader === 'true'
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

    MainContainer({
        template: customTemplates.mainContainer,
        shoppingListCounterTemplate: customTemplates.shoppingListCounter,
        el: document.querySelector(scriptEls.mainContainer),
        scriptEls
    }).render();

    const render = async () => {
        if (Object.keys(options).length === 0) await setOptions();

        start();

        renderShoppingList();
        renderMenuPopup();
    };

    const renderShoppingList = () =>
        ShoppingList({template: customTemplates.shoppingList}).render();

    const renderMenuPopup = () =>
        document
            .querySelector('.sgn__nav-menu-btn')
            ?.addEventListener('click', (e) => {
                e.preventDefault();
                MenuPopup({
                    configs: options,
                    sgnData,
                    sgnViewer,
                    templates: customTemplates,
                    scriptEls
                }).render();
            });

    const animateShoppingListCounter = () => {
        const shoppingListCounter = document.querySelector(
            '.sgn__offer-shopping-list-counter'
        );

        shoppingListCounter?.classList.remove('sgn-animate-bounce');
        shoppingListCounter?.classList.add('sgn-animate-bounce');
    };

    const setOptions = async (opts) => {
        options = {
            el: document.querySelector('.sgn__incito'),
            apiKey,
            coreUrl,
            eventTracker,
            pageId:
                opts?.pageId ||
                `page${getQueryParam(scriptEls.pageIdParam) || 1}`,
            id:
                opts?.id ||
                getQueryParam(scriptEls.publicationIdParam) ||
                scriptEls.publicationId ||
                (await fetchLatestPublicationId()),
            businessId: opts?.businessId || scriptEls.businessId
        };
    };

    const start = async () => {
        const bootstrapper = new Bootstrapper(options);

        const data = await bootstrapper.fetch();

        sgnData = data;
        sgnViewer = bootstrapper.createViewer(data);

        options.el
            .querySelector('.sgn__header')
            ?.classList.add('sgn-animate-header');

        on(
            options.el,
            'click',
            '.incito__view[data-role="offer"]',
            function (e) {
                e.preventDefault();

                var id = this.dataset.id;
                var meta = sgnViewer.incito.ids[id];

                clickHotspot(meta);
                console.log('clicked', id, meta);
            }
        );

        sgnViewer.start();
    };

    const clickHotspot = (hotspot) => {
        const shoppingBtn = options.el.querySelector('.sgn__offer-shopping');

        if (
            scriptEls.offerClickBehavior === 'open_webshop_link_in_tab' &&
            hotspot?.webshop
        ) {
            window.open(hotspot.webshop);
        } else if (
            scriptEls.offerClickBehavior === 'redirect_to_webshop_link' &&
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

    const fetchLatestPublicationId = async () =>
        (
            await request({
                apiKey,
                coreUrl,
                url: '/v2/catalogs',
                qs: {
                    dealer_id: scriptEls.businessId,
                    order_by: '-publication_date',
                    limit: 1
                }
            })
        )?.[0]?.id;

    return {render, setOptions};
};

export default IncitoPublication;
