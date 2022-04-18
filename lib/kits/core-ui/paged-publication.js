import * as clientLocalStorage from '../../storage/client-local';
import {update as updateViewerTranslation} from '../../translations';
import {getQueryParam} from '../../util';
import request from '../core/request';
import Bootstrapper from '../paged-publication/bootstrapper';
import Header from './components/common/header';
import MenuPopup from './components/common/menu-popup';
import ShoppingList from './components/common/shopping-list';
import {
    translate,
    pushQueryParam,
    getHashFragments
} from './components/helpers/component';
import {transformScriptData} from './components/helpers/transformers';
import MainContainer from './components/paged-publication/main-container';
import * as keyCodes from '../../key-codes';

const PagedPublication = (
    scriptEl,
    {mainContainer = '', apiKey, coreUrl, eventTracker} = {}
) => {
    let options = {};
    let sgnData = {};
    let sgnViewer = null;
    const scriptEls = transformScriptData(scriptEl, mainContainer);

    const customTemplates = {
        mainContainer: document.getElementById(
            'sgn-sdk-paged-publication-viewer-template'
        ),
        headerContainer: document.getElementById(
            'sgn-sdk-paged-publication-viewer-header-template'
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

    const header = Header({
        publicationType: 'paged',
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
                    publicationType: 'paged',
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
            el: document.querySelector('.sgn__pp'),
            apiKey,
            coreUrl,
            eventTracker,
            pageId:
                opts?.pageId ||
                `page${
                    getQueryParam(scriptEls.pageIdParam) ||
                    getHashFragments(scriptEls.publicationHash)?.pageNum ||
                    1
                }`,
            id:
                opts?.id ||
                getQueryParam(scriptEls.publicationIdParam) ||
                getHashFragments(scriptEls.publicationHash)?.publicationId ||
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

        updateViewerTranslation({
            'paged_publication.hotspot_picker.header': translate(
                'paged_publication_viewer_hotspot_picker_header'
            )
        });

        header.show(sgnData);

        sgnViewer.bind('hotspotClicked', (hotspot) => {
            clickHotspot(hotspot);
        });

        sgnViewer.start();

        if (scriptEls.disableGlobalScrollbar) {
            document
                .querySelector('html')
                .classList.add('sgn-paged-publication--open');
        }

        const hotspots = await bootstrapper.fetchHotspots();
        bootstrapper.applyHotspots(sgnViewer, hotspots);
        displayUrlParams();
    };

    const displayUrlParams = () => {
        if (
            scriptEls.displayUrlParams?.toLowerCase() === 'query' ||
            scriptEls.displayUrlParams?.toLowerCase() === 'hash'
        ) {
            const progressLabel = options.el.querySelector(
                '.sgn-pp__progress-label'
            );

            progressLabel?.addEventListener('DOMSubtreeModified', (e) => {
                const pageNum = e.target.innerHTML
                    ?.split(' ')?.[0]
                    ?.split('-')?.[0];

                scriptEls.displayUrlParams?.toLowerCase() === 'query'
                    ? pushQueryParam({
                          [scriptEls.publicationIdParam]: options.id,
                          [scriptEls.pageIdParam]: pageNum
                      })
                    : (location.hash = `${scriptEls.publicationHash}/${options.id}/${pageNum}`);
            });
        }
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
                'publication-saved-offers'
            );
            const shopListOffer = {
                name: hotspot.heading,
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
                    limit: 1
                }
            })
        )?.[0]?.id;

    return {render, setOptions};
};

export default PagedPublication;
