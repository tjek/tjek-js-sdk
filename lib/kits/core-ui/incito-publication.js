import * as clientLocalStorage from '../../storage/client-local';
import {getQueryParam, on} from '../../util';
import request from '../core/request';
import Bootstrapper from '../incito-publication/bootstrapper';
import Header from './components/common/header';
import MenuPopup from './components/common/menu-popup';
import ShoppingList from './components/common/shopping-list';
import {transformScriptData} from './components/helpers/transformers';
import MainContainer from './components/incito-publication/main-container';

const IncitoPublication = (
    scriptEl,
    {mainContainer = '', apiKey, coreUrl, eventTracker} = {}
) => {
    let options = {};
    let sgnData = {};
    let sgnViewer = null;
    let bootstrapper = null;
    const scriptEls = transformScriptData(scriptEl, mainContainer);

    const customTemplates = {
        mainContainer: document.getElementById(
            'sgn-sdk-incito-publication-viewer-template'
        ),
        headerContainer: document.getElementById(
            'sgn-sdk-incito-publication-viewer-header-template'
        ),
        offerList: document.getElementById(
            'sgn-sdk-incito-publication-viewer-offer-list-template'
        ),
        shoppingList: document.getElementById(
            'sgn-sdk-incito-publication-viewer-shopping-list-template'
        ),
        shoppingListCounter: document.getElementById(
            'sgn-sdk-incito-publication-viewer-shopping-list-counter-template'
        ),
        sectionList: document.getElementById(
            'sgn-sdk-incito-publication-viewer-section-list-template'
        ),
        menuContainer: document.getElementById(
            'sgn-sdk-incito-publication-viewer-menu-container-template'
        )
    };

    MainContainer({
        template: customTemplates.mainContainer,
        shoppingListCounterTemplate: customTemplates.shoppingListCounter,
        el: document.querySelector(scriptEls.mainContainer),
        scriptEls
    }).render();

    const header = Header({
        publicationType: 'incito',
        template: customTemplates.headerContainer,
        shoppingListCounterTemplate: customTemplates.shoppingListCounter,
        el: document.querySelector(scriptEls.mainContainer),
        scriptEls
    });

    document
        .querySelector('.sgn__header-container')
        ?.appendChild(header.render());

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
                    publicationType: 'incito',
                    configs: options,
                    sgnData,
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
        const sgnLoader = document.querySelector('.sgn_loader-container');
        bootstrapper = new Bootstrapper(options);

        const data = await bootstrapper.fetch();

        sgnData = data;
        sgnViewer = bootstrapper.createViewer(data);

        header.show(sgnData);

        on(
            options.el,
            'click',
            '.incito__view[data-role="offer"]',
            async function (e) {
                e.preventDefault();

                const viewId = this.dataset.id;
                const publicationId = options.id;

                clickOfferCell(viewId, publicationId);
            }
        );

        sgnViewer.start();

        if (scriptEls.disableGlobalScrollbar) {
            document
                .querySelector('html')
                .classList.add('sgn-incito-publication--open');
        }

        sgnLoader?.parentNode?.removeChild(sgnLoader);
    };

    const dispatchOfferClickEvent = (detail) => {
        window.dispatchEvent(
            new CustomEvent('tjek-incito-publication-view-clicked', {
                detail
            })
        );
    };

    const clickOfferCell = async (viewId, publicationId) => {
        dispatchOfferClickEvent({fetchOffer, viewId, publicationId});

        const shoppingBtn = options.el.querySelector('.sgn__offer-shopping');

        if (scriptEls.offerClickBehavior === 'open_webshop_link_in_tab') {
            const windowOpen = window.open();
            const {offer} = await fetchOffer({viewId, publicationId});

            if (offer.webshop_link) {
                windowOpen.location = offer.webshop_link;
            }
        } else if (
            scriptEls.offerClickBehavior === 'redirect_to_webshop_link'
        ) {
            const {offer} = await fetchOffer({viewId, publicationId});

            if (offer.webshop_link) {
                location.href = offer.webshop_link;
            }
        } else if (shoppingBtn) {
            const {offer} = await fetchOffer({viewId, publicationId});
            const storedPublicationOffers = clientLocalStorage.get(
                'publication-saved-offers'
            );
            const shopListOffer = {
                name: offer.name,
                pricing: {price: offer.price, currency: offer.currency_code},
                is_ticked: false
            };

            if (!storedPublicationOffers) {
                clientLocalStorage.setWithEvent(
                    'publication-saved-offers',
                    [shopListOffer],
                    'tjek_shopping_list_update'
                );
            } else {
                storedPublicationOffers.push(shopListOffer);
                clientLocalStorage.setWithEvent(
                    'publication-saved-offers',
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
                    types: 'incito',
                    limit: 1
                }
            })
        )?.[0]?.id;

    const fetchOffer = async ({viewId, publicationId}, callback) => {
        try {
            const res = await request({
                apiKey,
                coreUrl,
                url: '/v4/rpc/get_offer_from_incito_publication_view',
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    view_id: viewId,
                    publication_id: publicationId
                })
            });
            if (res.offer.id) {
                eventTracker?.trackOfferOpened({
                    'of.id': res.offer.id,
                    vt: eventTracker.createViewToken(res.offer.id)
                });
            }

            if (typeof callback === 'function') callback(null, res);

            return res;
        } catch (err) {
            if (typeof callback === 'function') {
                callback(err);
            } else {
                throw err;
            }
        }
    };

    return {render, setOptions};
};

export default IncitoPublication;
