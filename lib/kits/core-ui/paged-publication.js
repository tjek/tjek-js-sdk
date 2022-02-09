import * as clientLocalStorage from '../../storage/client-local';
import {update as updateViewerTranslation} from '../../translations';
import {getQueryParam} from '../../util';
import request from '../core/request';
import Bootstrapper from '../paged-publication/bootstrapper';
import {translate} from './components/helpers/component';
import MainContainer from './components/paged-publication/main-container';
import MenuPopup from './components/paged-publication/menu-popup';
import ShoppingList from './components/paged-publication/shopping-list';

const PagedPublication = (
    scriptEl,
    {mainContainer = '', eventTracker} = {}
) => {
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
        theme: scriptEl.getAttribute('data-component-theme'),
        offerClickBehavior:
            scriptEl.getAttribute(
                'data-component-paged-publication-viewer-offer-click-behavior'
            ) || 'shopping_list',
        disableShoppingList:
            scriptEl.getAttribute(
                'data-component-paged-publication-disable-shopping-list'
            ) === 'true',
        disableClose:
            scriptEl.getAttribute(
                'data-component-paged-publication-disable-close'
            ) === 'true',
        disableMenu:
            scriptEl.getAttribute(
                'data-component-paged-publication-disable-menu'
            ) === 'true',
        disableDownload:
            scriptEl.getAttribute(
                'data-component-paged-publication-disable-download'
            ) === 'true',
        disableHeader:
            scriptEl.getAttribute(
                'data-component-paged-publication-disable-header'
            ) === 'true'
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

    const setOptions = async (opts = {}) => {
        options = {
            el: document.querySelector('.sgn__pp'),
            eventTracker,
            pageId:
                opts.pageId ||
                `page${getQueryParam(scriptEls.pageIdParam) || 1}`,
            id:
                opts.id ||
                getQueryParam(scriptEls.publicationIdParam) ||
                scriptEls.publicationId ||
                (await fetchLatestPublicationId()),
            businessId: opts.businessId || scriptEls.businessId
        };
    };

    const start = async () => {
        const bootstrapper = new Bootstrapper(options);

        const data = await bootstrapper.fetch();

        sgnData = data;
        sgnViewer = bootstrapper.createViewer(data);

        updateViewerTranslation({
            'paged_publication.hotspot_picker.header': translate(
                'paged_publication_viewer_hotspot_picker_header'
            )
        });

        options.el
            .querySelector('.sgn__header')
            ?.classList.add('sgn-animate-header');

        sgnViewer.bind('hotspotClicked', (hotspot) => {
            clickHotspot(hotspot);
        });

        sgnViewer.start();

        const hotspots = await bootstrapper.fetchHotspots();
        bootstrapper.applyHotspots(sgnViewer, hotspots);
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

export default PagedPublication;
