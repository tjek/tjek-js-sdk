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
import {
    transformFilter,
    getHashFragments,
    pushQueryParam,
    transformWebshopLink,
    animateShoppingListCounter,
    dispatchProductClickEvent,
    displayOfferMessage
} from './components/helpers/component';
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
        template: customTemplates.mainContainer,
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

        scrollToSection();
        addScrollListener();
        renderShoppingList();
        renderMenuPopup();
        dispatchPublicationData();
        renderSectionList();
        addSectionScrollListener();

        return sgnData;
    };

    const scrollToSection = () => {
        const sectionId = decodeURIComponent(
            getQueryParam(scriptEls.sectionIdParam)?.replace(/\+/g, '%20') ||
                getHashFragments(scriptEls.publicationHash)?.pageNum ||
                ''
        );

        const sectionCell = document.querySelector(
            `[data-id="${sectionId}"][data-role="section"]`
        );

        if (sectionCell) {
            const incitoEl = scriptEls.enableSidebar
                ? document.querySelector('.incito')
                : document.querySelector('.sgn__incito');
            const headerOffset = document.querySelector('.sgn__header')
                ? 76
                : 0;
            // @ts-expect-error
            const sectionOffset = sectionCell.offsetTop - headerOffset || 0;

            incitoEl?.scrollTo({top: sectionOffset});
        }
    };

    const renderShoppingList = () =>
        ShoppingList({
            template: customTemplates.shoppingList,
            scriptEls,
            sgnData
        }).render();

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
                getHashFragments(scriptEls.publicationHash)?.publicationId ||
                scriptEls.publicationId ||
                (await fetchLatestPublicationId()),
            businessId: opts?.businessId || scriptEls.businessId
        };
    };

    const start = async () => {
        const sgnLoader = document.querySelector('.sgn_loader-container');
        // @ts-expect-error
        bootstrapper = new Bootstrapper(options);
        bootstrapper.enableLazyLoading = scriptEls.enableLazyload;
        bootstrapper.scrollableContainer = scriptEls.enableSidebar
            ? '.incito'
            : '.sgn__incito';

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
        const {products, link} =
            sgnViewer.incito?.ids?.[viewId]?.['tjek.offer.v1'] || {};
        dispatchOfferClickEvent({fetchOffer, viewId, publicationId, products});

        const shoppingBtn = options.el?.querySelector('.sgn__offer-shopping');

        if (scriptEls.offerClickBehavior === 'overview_modal') {
            OfferOverview({
                template: customTemplates.offerOverview,
                configs: options,
                scriptEls,
                sgnData,
                offer: {
                    fetchOffer,
                    viewId,
                    publicationId,
                    products
                },
                type: 'incito',
                addToShoppingList
            }).render();
        } else if (
            scriptEls.offerClickBehavior === 'open_webshop_link_in_tab'
        ) {
            if (!link) {
                displayOfferMessage(viewId, scriptEls.noOfferLinkMessage);
                return;
            }

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
            if (!link) {
                displayOfferMessage(viewId, scriptEls.noOfferLinkMessage);
                return;
            }

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
        const storedPublicationOffers =
            clientLocalStorage.get('publication-saved-offers') || [];
        let shopListOffer = {
            id: offer.id,
            name: offer.name,
            pricing: {price: offer.price, currency: offer.currency_code},
            quantity: 1,
            is_ticked: false
        };

        if (offer.basket?.productId) {
            const product = offer.products?.find(
                ({id}) => id == offer.basket?.productId
            );
            if (product) {
                shopListOffer = {
                    id: product.id,
                    name: product.title,
                    pricing: {
                        price: offer.price,
                        currency: offer.currency_code
                    },
                    quantity: offer.basket?.quantity || 1,
                    is_ticked: false
                };
            }
        }

        storedPublicationOffers.push(shopListOffer);

        const mergedOffers = storedPublicationOffers.reduce(
            (acc, currentOffer) => {
                const existingOffer = acc.find(
                    (offer) => offer.id === currentOffer.id
                );

                if (existingOffer) {
                    existingOffer.quantity += currentOffer.quantity;
                } else {
                    acc.push({...currentOffer});
                }

                return acc;
            },
            []
        );

        clientLocalStorage.setWithEvent(
            'publication-saved-offers',
            mergedOffers,
            'tjek_shopping_list_update'
        );

        dispatchProductClickEvent({product: shopListOffer});
        animateShoppingListCounter();
    };

    const addSectionScrollListener = () => {
        const toc = sgnData?.incito?.table_of_contents;
        const scrollContainer = document.querySelector(
            `${scriptEls.enableSidebar ? '.incito' : '.sgn__incito'}`
        );
        const mainContainerEl = document.querySelector(
            scriptEls.listPublicationsContainer || scriptEls.mainContainer
        );
        let currentSection;

        toc?.forEach((section) => {
            scrollContainer?.addEventListener('scroll', () => {
                const sectionEl = document.querySelector(
                    `[data-id="${section.view_id}"][data-role="section"]`
                );

                const rect = sectionEl?.getBoundingClientRect();
                const viewportHeight =
                    window.innerHeight || document.documentElement.clientHeight;

                if (
                    (rect?.top || 0) <= viewportHeight / 2 &&
                    (rect?.bottom || 0) >= viewportHeight / 2 &&
                    currentSection !== section.view_id
                ) {
                    currentSection = section.view_id;

                    mainContainerEl?.dispatchEvent(
                        new CustomEvent('section:show', {
                            detail: section
                        })
                    );

                    if (scriptEls.displayUrlParams?.toLowerCase() === 'query') {
                        pushQueryParam({
                            [scriptEls.sectionIdParam]: section.view_id
                        });
                    } else if (
                        scriptEls.displayUrlParams?.toLowerCase() === 'hash'
                    ) {
                        location.hash = `${scriptEls.publicationHash}/${
                            sgnData?.details?.id
                        }/${encodeURIComponent(section.view_id)}`;
                    }
                }
            });
        });
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
            res.offer.webshop_link = transformWebshopLink(
                res.offer.webshop_link
            );

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
