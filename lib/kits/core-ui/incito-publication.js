import * as clientLocalStorage from '../../storage/client-local';
import {getQueryParam} from '../../util';
import request from '../core/request';
import Bootstrapper from '../incito-publication/bootstrapper';
import MainContainer from './components/incito-publication/main-container';
import MenuPopup from './components/common/menu-popup';
import ShoppingList from './components/common/shopping-list';
import Header from './components/common/header';
import {transformScriptData} from './components/helpers/transformers';
import {on} from './';

const IncitoPublication = (
    scriptEl,
    {mainContainer = '', apiKey, coreUrl, eventTracker} = {}
) => {
    let options = {};
    let sgnData = {};
    let sgnViewer = null;
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
        const bootstrapper = new Bootstrapper(options);

        const data = await bootstrapper.fetch();

        sgnData = data;
        sgnViewer = bootstrapper.createViewer(data);

        header.show(sgnData);

        on(
            options.el,
            'click',
            '.incito__view[data-role="offer"]',
            function (e) {
                e.preventDefault();

                const id = this.dataset.id;
                const meta = sgnViewer.incito.ids[id];

                clickHotspot(meta['tjek.offer.v1']);
            }
        );

        sgnViewer.start();
        sgnLoader?.parentNode?.removeChild(sgnLoader);
    };

    const clickHotspot = (hotspot) => {
        const shoppingBtn = options.el.querySelector('.sgn__offer-shopping');

        if (
            scriptEls.offerClickBehavior === 'open_webshop_link_in_tab' &&
            hotspot?.link
        ) {
            window.open(hotspot.link);
        } else if (
            scriptEls.offerClickBehavior === 'redirect_to_webshop_link' &&
            hotspot?.link
        ) {
            location.href = hotspot.link;
        }

        if (shoppingBtn) {
            const storedPublicationOffers = clientLocalStorage.get(
                'publication-saved-offers'
            );
            const shopListOffer = {
                name: hotspot.title,
                pricing: hotspot.offer?.pricing,
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

    return {render, setOptions};
};

export default IncitoPublication;
