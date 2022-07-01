import * as clientLocalStorage from '../../storage/client-local';
import {update as updateViewerTranslation} from '../../translations';
import {getQueryParam} from '../../util';
import request from '../core/request';
import Bootstrapper from '../paged-publication/bootstrapper';
import Header from './components/common/header';
import MenuPopup from './components/common/menu-popup';
import ShoppingList from './components/common/shopping-list';
import OfferOverview from './components/common/offer-overview';
import {
    translate,
    pushQueryParam,
    getHashFragments
} from './components/helpers/component';
import {transformScriptData} from './components/helpers/transformers';
import MainContainer from './components/paged-publication/main-container';
import {Viewer} from '../paged-publication';
import {V2Catalog, V2Hotspot, V2Page} from '../core';
import type {Tracker} from '../events';

const PagedPublication = (
    scriptEl: HTMLScriptElement,
    {
        mainContainer = '',
        apiKey,
        coreUrl,
        eventTracker
    }: {
        mainContainer: string;
        apiKey: string;
        coreUrl: string;
        eventTracker: Tracker;
    }
) => {
    let options;
    let sgnData: {details: V2Catalog; pages: V2Page[]} | undefined | {} = {};
    let sgnViewer: Viewer;
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
        offerOverview: document.getElementById(
            'sgn-sdk-paged-publication-viewer-offer-overview-template'
        ),
        menuContainer: document.getElementById(
            'sgn-sdk-paged-publication-viewer-menu-container-template'
        )
    };

    MainContainer({
        template: customTemplates.mainContainer,
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
        if (Object.keys(options || {}).length === 0) await setOptions();

        await start();

        renderShoppingList();
        renderMenuPopup();
        dispatchPublicationData();
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

    const setOptions = async (opts?: any) => {
        options = {
            el: document.querySelector<HTMLDivElement>('.sgn__pp'),
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
        // @ts-expect-error
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
                ?.classList.add('sgn-paged-publication--open');
        }

        const hotspots = await bootstrapper.fetchHotspots();
        bootstrapper.applyHotspots(sgnViewer, hotspots);
        displayUrlParams();
        addFirstLastControlListener();
    };

    const addFirstLastControlListener = () => {
        const firstControl = options.el.querySelector(
            '.sgn-pp__control[data-direction=first]'
        );
        const lastControl = options.el.querySelector(
            '.sgn-pp__control[data-direction=last]'
        );

        const prevBtn = options.el.querySelector(
            '.sgn-pp__control[data-direction=prev]'
        );

        const nextBtn = options.el.querySelector(
            '.sgn-pp__control[data-direction=next]'
        );

        const controlDirectionObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes') {
                    const element = mutation.target as HTMLButtonElement;
                    if (element.dataset.direction === 'prev') {
                        element.classList.contains('sgn-pp--hidden')
                            ? firstControl.classList.add('sgn-pp--hidden')
                            : firstControl.classList.remove('sgn-pp--hidden');
                    }
                    if (element.dataset.direction === 'next') {
                        element.classList.contains('sgn-pp--hidden')
                            ? lastControl.classList.add('sgn-pp--hidden')
                            : lastControl.classList.remove('sgn-pp--hidden');
                    }
                }
            });
        });

        prevBtn?.classList.contains('sgn-pp--hidden')
            ? firstControl.classList.add('sgn-pp--hidden')
            : firstControl.classList.remove('sgn-pp--hidden');
        nextBtn?.classList.contains('sgn-pp--hidden')
            ? lastControl.classList.add('sgn-pp--hidden')
            : lastControl.classList.remove('sgn-pp--hidden');

        firstControl?.addEventListener('click', () => {
            sgnViewer?.first();
        });
        lastControl?.addEventListener('click', () => {
            sgnViewer?.last();
        });

        controlDirectionObserver.observe(prevBtn, {attributes: true});

        controlDirectionObserver.observe(nextBtn, {attributes: true});
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

    const clickHotspot = (hotspot: V2Hotspot) => {
        const shoppingBtn = options.el.querySelector('.sgn__offer-shopping');

        if (scriptEls.offerClickBehavior === 'overview_modal') {
            OfferOverview({
                template: customTemplates.offerOverview,
                configs: options,
                sgnData,
                offer: hotspot,
                type: 'paged',
                addToShoppingList
            }).render();
        } else if (
            scriptEls.offerClickBehavior === 'open_webshop_link_in_tab' &&
            hotspot?.webshop
        ) {
            window.open(hotspot.webshop);
        } else if (
            scriptEls.offerClickBehavior === 'redirect_to_webshop_link' &&
            hotspot?.webshop
        ) {
            location.href = hotspot.webshop;
        } else if (shoppingBtn) {
            addToShoppingList(hotspot);
        }
    };

    const addToShoppingList = (hotspot: V2Hotspot) => {
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
    };

    const fetchLatestPublicationId = async () =>
        scriptEls.businessId &&
        (
            await request<V2Catalog[]>({
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

    const dispatchPublicationData = () => {
        const mainContainerEl = document.querySelector(
            scriptEls.listPublicationsContainer || scriptEls.mainContainer
        );

        mainContainerEl?.dispatchEvent(
            new CustomEvent('publication:rendered', {
                detail: sgnData
            })
        );
    };

    return {render, setOptions};
};

export default PagedPublication;