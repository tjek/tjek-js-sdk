import type {IIncito} from '../../incito-browser/types';
import * as clientLocalStorage from '../../storage/client-local';
import {getQueryParam, on} from '../../util';
import type {V2Catalog} from '../core';
import request from '../core/request';
import type {Tracker} from '../events';
import type {Viewer} from '../incito-publication';
import Bootstrapper from '../incito-publication/bootstrapper';
import Header from './components/common/header';
import MenuPopup from './components/common/menu-popup';
import OfferOverview from './components/common/offer-overview';
import ShoppingList from './components/common/shopping-list';
import {transformScriptData} from './components/helpers/transformers';
import {transformFilter} from './components/helpers/component';
import MainContainer from './components/incito-publication/main-container';
import SectionList from './components/incito-publication/section-list';

const IncitoPublication = (
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
    let options: {
        el?: HTMLDivElement | null;
        apiKey: string;
        coreUrl: string;
        eventTracker: Tracker;
        pageId?: string;
        id?: string;
        businessId?: string;
    };
    let sgnData: {details?: V2Catalog; incito?: IIncito} | undefined;
    let sgnViewer: Viewer | undefined;
    let bootstrapper: Bootstrapper | undefined;
    const scriptEls = transformScriptData(scriptEl, mainContainer);

    const customTemplates = {
        mainContainer: document.getElementById(
            'sgn-sdk-incito-publication-viewer-template'
        ),
        headerContainer: document.getElementById(
            'sgn-sdk-incito-publication-viewer-header-template'
        ),
        sidebarContainer: document.getElementById(
            'sgn-sdk-incito-publication-viewer-sidebar-template'
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
        offerOverview: document.getElementById(
            'sgn-sdk-incito-publication-viewer-offer-overview-template'
        ),
        menuContainer: document.getElementById(
            'sgn-sdk-incito-publication-viewer-menu-container-template'
        )
    };

    MainContainer({
        el: document.querySelector(scriptEls.mainContainer),
        scriptEls
    }).render();

    const header = Header({
        publicationType: 'incito',
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

        addScrollListener();
        renderShoppingList();
        renderMenuPopup();
        dispatchPublicationData();
        renderSectionList();

        return sgnData;
    };

    const renderShoppingList = () =>
        ShoppingList({template: customTemplates.shoppingList}).render();

    const renderSectionList = async () =>
        document.querySelector('.sgn__sidebar-content-container')?.appendChild(
            await SectionList({
                sgnData,
                template: customTemplates.sectionList,
                scriptEls
            }).render()
        );

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

    const setOptions = async (opts?: any) => {
        options = {
            el: document.querySelector<HTMLDivElement>('.sgn__incito'),
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
        // @ts-expect-error
        bootstrapper = new Bootstrapper(options);

        const data = await bootstrapper.fetch();

        sgnData = data;
        // @ts-expect-error
        sgnViewer = bootstrapper.createViewer(data);

        header.show(sgnData);

        if (options?.el)
            on(
                options.el,
                'click',
                '.incito__view[data-role="offer"]',
                async function (e) {
                    e.preventDefault();

                    const viewId = this.dataset.id;
                    const publicationId = options.id;

                    clickOfferCell(viewId, publicationId, sgnViewer);
                }
            );

        sgnViewer.start();

        if (scriptEls.disableGlobalScrollbar) {
            document
                .querySelector('html')
                ?.classList.add('sgn-incito-publication--open');
        }

        sgnLoader?.parentNode?.removeChild(sgnLoader);
    };

    const dispatchOfferClickEvent = (detail) => {
        const mainContainerEl = document.querySelector(
            scriptEls.listPublicationsContainer || scriptEls.mainContainer
        );

        mainContainerEl?.dispatchEvent(
            new CustomEvent('publication:offer_clicked', {
                detail
            })
        );
    };

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

    const clickOfferCell = async (viewId, publicationId, sgnViewer) => {
        const {products} =
            sgnViewer.incito?.ids?.[viewId]?.['tjek.offer.v1'] || {};
        dispatchOfferClickEvent({fetchOffer, viewId, publicationId, products});

        const shoppingBtn = options.el?.querySelector('.sgn__offer-shopping');

        if (scriptEls.offerClickBehavior === 'overview_modal') {
            const {offer} = await fetchOffer({viewId, publicationId});

            OfferOverview({
                template: customTemplates.offerOverview,
                configs: options,
                scriptEls,
                sgnData,
                offer,
                type: 'incito',
                addToShoppingList
            }).render();
        } else if (
            scriptEls.offerClickBehavior === 'open_webshop_link_in_tab'
        ) {
            const newWindowRef = window.open();
            const {offer} = await fetchOffer({viewId, publicationId});

            if (newWindowRef) {
                if (offer.webshop_link) {
                    newWindowRef.location = offer.webshop_link;
                } else {
                    newWindowRef.close();
                }
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
            addToShoppingList(offer);
        }
    };

    const addToShoppingList = (offer) => {
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
    };

    const addScrollListener = () => {
        if (!options.el) return;

        const isContainerFixed =
            window.getComputedStyle(options.el).position === 'fixed';
        const progressContainer = options.el.querySelector(
            '.sgn-incito__scroll-progress'
        );
        const progressBar = options.el.querySelector<HTMLDivElement>(
            '.sgn-incito__scroll-progress-bar'
        );
        const progressText = options.el.querySelector(
            '.sgn-incito__scroll-progress-text'
        );

        if (progressText && isContainerFixed && !scriptEls.enableSidebar) {
            progressText.innerHTML = '0%';

            options.el.addEventListener('scroll', () => {
                const scrollValue = getContainerScrollValue(options.el);
                if (scrollValue) {
                    if (progressBar)
                        progressBar.style.transform = `scaleX(${
                            scrollValue / 100
                        })`;
                    progressText.innerHTML = `${Math.round(scrollValue)}%`;
                }
            });
        } else if (
            progressText &&
            isContainerFixed &&
            scriptEls.enableSidebar
        ) {
            progressText.innerHTML = '0%';
            const incitoContainer = document.querySelector('.incito');

            incitoContainer?.addEventListener('scroll', () => {
                const scrollValue = getContainerScrollValue(incitoContainer);
                if (scrollValue) {
                    if (progressBar)
                        progressBar.style.transform = `scaleX(${
                            scrollValue / 100
                        })`;
                    progressText.innerHTML = `${Math.round(scrollValue)}%`;
                }
            });
        } else {
            progressContainer?.parentNode?.removeChild(progressContainer);
        }
    };

    const getContainerScrollValue = (element) =>
        element &&
        (100 * element.scrollTop) /
            (element.scrollHeight - element.clientHeight);

    const fetchLatestPublicationId = async () =>
        (
            await request<V2Catalog[]>({
                apiKey,
                coreUrl,
                url: '/v2/catalogs',
                qs: {
                    dealer_id: scriptEls.businessId,
                    order_by: '-publication_date',
                    types: 'incito',
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

    const fetchOffer = async ({viewId, publicationId}) => {
        const res = await request<{
            offer: {
                __typename: 'offer';
                id: string;
                name: string;
                description?: string;
                images: {width: number; height?: number; url: string}[];
                webshop_link?: string;
                price: number;
                currency_code:
                    | 'DKK'
                    | 'EUR'
                    | 'NOK'
                    | 'PLN'
                    | 'SEK'
                    | 'ISK'
                    | 'RON';
                savings?: number;
                piece_count: {from: number; to: number};
                unit_symbol:
                    | 'gram'
                    | 'kilogram'
                    | 'milligram'
                    | 'milliliter'
                    | 'centiliter'
                    | 'deciliter'
                    | 'liter'
                    | 'piece'
                    | 'microgram'
                    | 'centigram'
                    | 'decigram'
                    | 'tonne'
                    | 'ounce'
                    | 'pound'
                    | 'stone'
                    | 'us_ton'
                    | 'imperial_ton'
                    | 'kiloliter'
                    | 'cubic_meter'
                    | 'megaliter'
                    | 'us_teaspoon'
                    | 'us_tablespoon'
                    | 'us_fluid_ounce'
                    | 'us_cup'
                    | 'us_pint'
                    | 'us_quart'
                    | 'us_gallon'
                    | 'imperial_fluid_ounce'
                    | 'imperial_teaspoon'
                    | 'imperial_tablespoon'
                    | 'imperial_pint'
                    | 'imperial_quart'
                    | 'imperial_gallon'
                    | 'cubic_inch'
                    | 'cubic_foot';
                unit_size: {from: number; to: number};
                validity: {from: Date; to: Date};
                visible_from: string;
            };
        }>({
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

        if (!res) throw new Error();

        if (res.offer.id) {
            eventTracker?.trackOfferOpened({
                'of.id': res.offer.id,
                vt: eventTracker.createViewToken(res.offer.id)
            });
        }

        return res;
    };

    return {render, setOptions};
};

export default IncitoPublication;
