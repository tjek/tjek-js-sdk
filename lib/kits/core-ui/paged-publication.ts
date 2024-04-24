import * as clientLocalStorage from '../../storage/client-local';
import {update as updateViewerTranslation} from '../../translations';
import {getQueryParam} from '../../util';
import type {V2Catalog, V2Hotspot, V2Page, V2PageDecoration} from '../core';
import request from '../core/request';
import type {Tracker} from '../events';
import type {Viewer} from '../paged-publication';
import Bootstrapper from '../paged-publication/bootstrapper';
import Header from './components/common/header';
import MenuPopup from './components/common/menu-popup';
import OfferOverview from './components/common/offer-overview';
import ShoppingList from './components/common/shopping-list';
import {
    getHashFragments,
    pushQueryParam,
    transformFilter,
    translate
} from './components/helpers/component';
import {transformScriptData} from './components/helpers/transformers';
import MainContainer from './components/paged-publication/main-container';
import PageList from './components/paged-publication/page-list';
import PageDecorationList from './components/paged-publication/page-decoration-list';

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
    let sgnPageDecorations: V2PageDecoration[];
    const scriptEls = transformScriptData(scriptEl, mainContainer);

    const customTemplates = {
        mainContainer: document.getElementById(
            'sgn-sdk-paged-publication-viewer-template'
        ),
        headerContainer: document.getElementById(
            'sgn-sdk-paged-publication-viewer-header-template'
        ),
        sidebarContainer: document.getElementById(
            'sgn-sdk-incito-publication-viewer-sidebar-template'
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
        template: scriptEls.enableSidebar
            ? customTemplates.sidebarContainer
            : customTemplates.headerContainer,
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

        if (sgnPageDecorations.length && !scriptEls.disablePageDecorations) {
            renderPageDecorationList();
        } else {
            renderPageList();
        }

        renderShoppingList();
        renderMenuPopup();
        dispatchPublicationData();
    };

    const renderPageList = async () =>
        document?.querySelector('.sgn__sidebar-content-container')?.appendChild(
            await PageList({
                scriptEls,
                configs: options,
                sgnData,
                sgnViewer,
                template: customTemplates.pageList
            }).render()
        );

    const renderPageDecorationList = async () =>
        document?.querySelector('.sgn__sidebar-content-container')?.appendChild(
            await PageDecorationList({
                scriptEls,
                configs: options,
                sgnPageDecorations,
                sgnViewer,
                template: customTemplates.pageList
            }).render()
        );

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

        sgnData = await bootstrapper.fetch();
        // @ts-expect-error
        sgnViewer = bootstrapper.createViewer(sgnData);

        updateViewerTranslation({
            'paged_publication.hotspot_picker.header': translate(
                'publication_viewer_hotspot_picker_header'
            )
        });

        header.show(sgnData);

        if (!scriptEls.disablePageDecorations) {
            sgnPageDecorations = await bootstrapper.fetchPageDecorations();
            bootstrapper.applyPageDecorations(sgnViewer, sgnPageDecorations);

            updateViewerTranslation({
                'paged_publication.hotspot_picker.pagedecoration.link':
                    translate('publication_viewer_hotspot_decoration_link')
            });
        }

        sgnViewer.bind('hotspotClicked', clickHotspot);

        sgnViewer.start();

        if (scriptEls.disableGlobalScrollbar) {
            document
                .querySelector('html')
                ?.classList.add('sgn-paged-publication--open');
        }

        const hotspots = await bootstrapper.fetchHotspots();
        bootstrapper.applyHotspots(sgnViewer, hotspots, sgnPageDecorations);

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
        if (hotspot.type === 'pagedecoration') return;

        const shoppingBtn = options.el.querySelector('.sgn__offer-shopping');

        if (scriptEls.offerClickBehavior === 'overview_modal') {
            OfferOverview({
                template: customTemplates.offerOverview,
                configs: options,
                scriptEls,
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
                    types: 'paged',
                    limit: 24,
                    ...transformFilter(scriptEls.requestFilter)
                }
            })
        )?.filter((publication) =>
            Object.entries(transformFilter(scriptEls.clientFilter)).reduce(
                (prev, {0: key, 1: value}) =>
                    publication[key] === value && prev,
                {}
            )
        )?.[0]?.id;

    const dispatchPublicationData = () => {
        const mainContainerEl = document.querySelector(
            scriptEls.listPublicationsContainer || scriptEls.mainContainer
        );

        mainContainerEl?.dispatchEvent(
            new CustomEvent('publication:rendered', {
                detail: scriptEls.disablePageDecorations
                    ? sgnData
                    : {...sgnData, pageDecorations: sgnPageDecorations}
            })
        );
    };

    return {render, setOptions};
};

export default PagedPublication;
