import Mustache from 'mustache';
import {
    createModal,
    destroyModal,
    formatPrice,
    translate,
    getDateRange,
    getPubState,
    getPubStateMessage,
    parseDateStr,
    updateShoppingList,
    displayOfferMessage,
    getLocaleCode,
    calculateProductPrice,
    getTotalQuantityByOffer
} from '../helpers/component';
import {request, V2Offer} from '../../../core';
import * as clientLocalStorage from '../../../../storage/client-local';
import './offer-overview.styl';

const defaultTemplate = `\
    <div class="sgn-offer-overview-popup">
        {{#offer}}
        <div class="sgn-popup-content" data-hide-offer-details="{{hideOfferDetails}}">
            <div class="sgn-popup-offer-container">
                {{#loader}}
                <div class="sgn-offer-img sgn-offer-img-v2">
                    <div class="sgn_modal_loader"></div>
                </div>
                {{/loader}}
                {{^loader}}
                <div class="sgn-offer-img">
                    <img src="{{images.zoom}}" alt="{{heading}}">
                </div>
                <div class="sgn-offer-details-container">
                    <button class="sgn-modal-close">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                    </button>
                    {{#label}}
                    <div class="sgn-popup-header">
                        <div class="sgn-menu-popup-labels">
                            <div class="sgn-menu-label">
                                <span>{{label}}</span>
                            </div>
                        </div>
                    </div>
                    {{/label}}
                    <div class="sgn-offer-texts-container">
                        <div class="sgn-offer-info">
                            <div class="sgn-offer-heading">
                                <span>{{heading}}</span>
                            </div>
                            <div class="sgn-offer-description">
                                <span>{{description}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="sgn-products-container">
                        <div class="sgn-products-texts-container">
                            {{#products}}
                            <div id="sgn-offer-product-{{id}}" data-offer-product-id="{{id}}" data-offer-product-quantity="{{quantity}}" class="sgn-product-details">
                                <div class="sgn-product-image">
                                {{#image}}
                                <img src="{{#image}}{{image}}{{/image}}{{^image}}{{images.zoom}}{{/image}}" alt="{{heading}}" onError="this.onerror=null;this.replaceWith(document.createRange().createContextualFragment('<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; class=&quot;no-product-image-icon&quot; viewBox=&quot;0 0 640 512&quot;><path fill=&quot;currentColor&quot; d=&quot;M13 1.7C9.5-1 4.5-.4 1.7 3S-.4 11.5 3 14.3l624 496c3.5 2.7 8.5 2.2 11.2-1.3s2.2-8.5-1.3-11.2L13 1.7zM467.3 464h-280L310.8 340.5l-12.6-10L288 340.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0L80 356.7V158.3L64 145.6V416c0 35.3 28.7 64 64 64H487.5l-20.3-16zM512 32H152.5l20.3 16H512c26.5 0 48 21.5 48 48V292.7l-89.4-89.4c-12.5-12.5-32.8-12.5-45.3 0L400.7 228l12.6 10 23.3-23.3c6.2-6.2 16.4-6.2 22.6 0L560 315.3v38.4l16 12.6V96c0-35.3-28.7-64-64-64zM80 379.3L180.7 278.6c6.2-6.2 16.4-6.2 22.6 0L276.7 352l-112 112H128c-26.5 0-48-21.5-48-48V379.3z&quot;/></svg>'));">
                                {{/image}}
                                {{^image}}
                                <svg xmlns="http://www.w3.org/2000/svg" class="no-product-image-icon" viewBox="0 0 640 512"><path fill="currentColor" d="M13 1.7C9.5-1 4.5-.4 1.7 3S-.4 11.5 3 14.3l624 496c3.5 2.7 8.5 2.2 11.2-1.3s2.2-8.5-1.3-11.2L13 1.7zM467.3 464h-280L310.8 340.5l-12.6-10L288 340.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0L80 356.7V158.3L64 145.6V416c0 35.3 28.7 64 64 64H487.5l-20.3-16zM512 32H152.5l20.3 16H512c26.5 0 48 21.5 48 48V292.7l-89.4-89.4c-12.5-12.5-32.8-12.5-45.3 0L400.7 228l12.6 10 23.3-23.3c6.2-6.2 16.4-6.2 22.6 0L560 315.3v38.4l16 12.6V96c0-35.3-28.7-64-64-64zM80 379.3L180.7 278.6c6.2-6.2 16.4-6.2 22.6 0L276.7 352l-112 112H128c-26.5 0-48-21.5-48-48V379.3z"/></svg>
                                {{/image}}
                                </div>
                                <div class="sgn-product-heading">
                                    <div class="sgn-product-title">
                                        {{#link}}
                                        <a href="{{link}}" class="data-offer-product-link" target="_blank">
                                            <span>{{title}}</span>
                                        </a>
                                        {{/link}}
                                        {{^link}}
                                        <span>{{title}}</span>
                                        {{/link}}
                                    </div>
                                    <div class="sgn-product-description"><span>{{description}}</span></div>
                                </div>
                                <div class="sgn-product-price-container">
                                    {{#showQuantityButtons}}
                                    <div id="sgn-offer-product-quantity-{{id}}" class="sgn-offer-product-quantity">
                                        <div class="sgn-offer-product-quantity-content">
                                            <button id="sgn-offer-product-quantity-minus-{{id}}" class="sgn-offer-product-quantity-minus">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-minus-circle-fill" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                                            </button>
                                            <input type="text" id="sgn-offer-product-quantity-text-{{id}}" class="sgn-offer-product-quantity-text" value="{{quantity}}" disabled/>
                                            <button id="sgn-offer-product-quantity-plus-{{id}}" class="sgn-offer-product-quantity-plus">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-plus-circle-fill" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                                            </button>
                                        </div>
                                    </div>
                                    {{/showQuantityButtons}}
                                    <div class="sgn-product-price"><span>{{formattedPrice}}</span></div>
                                </div>
                            </div>
                            {{/products}}
                        </div>
                    </div>
                    <div class="sgn-menu-date">
                        <span>{{translations.validFrom}}</span>
                        <span data-validity-state="{{status}}">{{dateRange}}</span>
                    </div>
                </div>
                {{/loader}}
            </div>
        </div>
        {{/offer}}
    </div>\
`;

const OfferOverview = ({
    template,
    configs,
    scriptEls,
    sgnData,
    offer,
    type,
    addToShoppingList
}) => {
    template = template?.innerHTML || defaultTemplate;
    let container: HTMLDivElement | null = null;
    let transformedOffer;

    const translations = {
        localeCode: scriptEls.localeCode
            ? translate('locale_code')
            : getLocaleCode(sgnData?.details?.dealer?.country?.id),
        currency: translate('publication_viewer_currency'),
        addToShoppingList: translate('publication_viewer_add_to_shopping_list'),
        visitWebshopLink: translate('publication_viewer_visit_webshop_link'),
        priceFrom: translate('publication_viewer_offer_price_from'),
        validFrom: translate('publication_viewer_offer_valid_from')
    };

    const render = async () => {
        try {
            transformedOffer =
                type === 'paged'
                    ? await fetchOffer(offer.id)
                    : await transformIncitoOffer(offer);

            const disableShoppingList = document.querySelector(
                '.sgn__offer-shopping'
            )
                ? false
                : true;

            container = document.createElement('div');
            container.className = 'sgn-offer-overview-container';

            createModal(container);

            container.innerHTML = Mustache.render(template, {
                translations,
                label: sgnData?.details?.label,
                disableShoppingList,
                offer: transformedOffer,
                showQuantityButtons:
                    !disableShoppingList || scriptEls.showQuantityButtons,
                layoutWidth: sgnData?.incito?.root_view?.layout_width
            });

            dispatchOfferClickEvent(transformedOffer);
            addEventListeners();
        } catch (error) {
            displayOfferMessage(
                offer.viewId,
                translate('publication_viewer_no_product_message')
            );
        }
    };

    const transformProducts = (offer, products) => {
        const {localeCode, currency} = translations;
        const storedPublicationOffers =
            clientLocalStorage.get('publication-saved-offers') || [];

        const allPricesAreTheSame = products?.every(
            (product, index, array) => product.price === array[0].price
        );

        const useOfferPrice =
            allPricesAreTheSame && offer.price !== products[0].price;

        const transformedProducts = products?.map((product, index) => {
            const matchingOffer = storedPublicationOffers.find(
                (offer) => offer.id === product.id
            );

            let price = useOfferPrice
                ? offer.price || offer.pricing.price
                : product?.price;

            if (offer.piece_count?.from > 1) {
                price = (price + (offer.savings || 0)) / offer.piece_count.from;
            }

            const priceCurrency =
                offer.currency_code || offer.pricing?.currency || currency;

            return {
                ...product,
                link: product.link || offer.webshop_link,
                price,
                formattedPrice: formatPrice(price, localeCode, priceCurrency),
                currency: priceCurrency,
                quantity: matchingOffer ? matchingOffer.quantity : 0
            };
        });

        return transformedProducts;
    };

    const transformIncitoOffer = async ({
        fetchOffer,
        viewId,
        publicationId,
        products
    }) => {
        const {localeCode, currency, priceFrom} = translations;
        const {offer: incitoOffer} = await fetchOffer({viewId, publicationId});
        offer = incitoOffer;
        offer.products = transformProducts(offer, products);

        if (products?.length > 1) {
            offer.products = transformProducts(offer, products);
        } else {
            const products = transformProducts(offer, [
                {
                    id: offer.id,
                    title: offer.name,
                    description: offer.description,
                    price: offer.price,
                    link: offer.webshop_link
                }
            ]);

            offer.products = products;
            offer.hideOfferDetails = true;
        }

        const hasPriceFrom = products.some((product, i, arr) => {
            if (i === 0) return false;
            return product.price !== arr[i - 1].price;
        });

        return {
            ...offer,
            heading: offer.name,
            priceFrom: hasPriceFrom ? priceFrom : '',
            price: formatPrice(
                offer?.price,
                localeCode,
                offer?.currency_code || currency
            ),
            images: {
                zoom: offer?.images?.[0]?.url
            },
            dateRange: getDateRange(
                offer?.validity?.from,
                new Date(
                    Number(parseDateStr(offer?.validity?.to)) - 1000
                ).toISOString(),
                'publication_viewer_offer_date_range'
            ),
            status: getPubState(
                offer?.validity?.from,
                new Date(
                    Number(parseDateStr(offer?.validity?.to)) - 1000
                ).toISOString()
            ),
            statusMessage: getPubStateMessage(
                offer?.validity?.from,
                new Date(
                    Number(parseDateStr(offer?.validity?.to)) - 1000
                ).toISOString()
            )
        };
    };

    const addOpenWebshopListener = () => {
        container
            ?.querySelector('.sgn-shopping-open-webshop-btn')
            ?.addEventListener('click', () => {
                window.open(offer.webshop_link);
            });
    };

    const addShoppingListListener = () => {
        container
            ?.querySelector('.sgn-shopping-add-to-list-btn')
            ?.addEventListener('click', () => {
                addToShoppingList(offer);
                destroyModal();
            });
    };

    const fetchOffer = async (id: string) => {
        const {localeCode, currency} = translations;
        const offerData = await request<V2Offer>({
            apiKey: configs.apiKey,
            coreUrl: configs.coreUrl,
            url: `/v2/offers/${id}`
        });

        offer = offerData;

        const rawProducts = await fetchProducts(id);

        if (rawProducts.offer_products?.length) {
            const dirtyProducts = rawProducts.offer_products.map((product) => ({
                id: product.product.id,
                title: product.name,
                description: null,
                image: product.product.images?.[0]?.assets?.[0]?.url,
                price: offer.pricing.price,
                link: offer.links.webshop
            }));

            const products = transformProducts(offer, dirtyProducts);

            offer.products = products;
        } else {
            const products = transformProducts(offer, [
                {
                    id: offer.id,
                    title: offer.heading,
                    description: offer.description,
                    price: offer.pricing.price,
                    link: offer.links.webshop
                }
            ]);

            offer.products = products;
            offer.hideOfferDetails = true;
        }

        if (offer.id && configs.eventTracker) {
            configs.eventTracker?.trackOfferOpened({
                'of.id': offer.id,
                vt: configs.eventTracker.createViewToken(offer.id)
            });
        }

        return {
            ...offer,
            price: formatPrice(
                offer?.pricing?.price,
                localeCode,
                offer?.pricing?.currency || currency
            ),
            dateRange: getDateRange(
                offer?.run_from,
                offer?.run_till,
                'publication_viewer_offer_date_range'
            ),
            status: getPubState(offer?.run_from, offer?.run_till),
            statusMessage: getPubStateMessage(offer?.run_from, offer?.run_till)
        };
    };

    const dispatchOfferClickEvent = (detail) => {
        const mainContainerEl = document.querySelector(
            scriptEls.listPublicationsContainer || scriptEls.mainContainer
        );

        mainContainerEl?.dispatchEvent(
            new CustomEvent('publication:offer_modal_rendered', {
                detail
            })
        );
    };

    const addProductListener = () => {
        const productEls = document.querySelectorAll('.sgn-product-details');

        productEls.forEach((productEl: HTMLElement) => {
            const productId = productEl.dataset.offerProductId;
            const minusBtn = productEl.querySelector<HTMLElement>(
                '.sgn-offer-product-quantity-minus'
            );
            const plusBtn = productEl.querySelector<HTMLElement>(
                '.sgn-offer-product-quantity-plus'
            );
            const quantityTxt = productEl.querySelector<HTMLInputElement>(
                '.sgn-offer-product-quantity-text'
            );
            const basketBtn = productEl.querySelector<HTMLElement>(
                '.sgn-offer-product-add-basket'
            );

            let quantity = +(quantityTxt?.value ?? 0);

            plusBtn?.addEventListener('click', () => {
                if (quantityTxt) quantityTxt.value = `${++quantity}`;

                productEl.dataset.offerProductQuantity = `${quantity}`;

                updateShoppingList(
                    {
                        ...offer,
                        basket: {
                            productId,
                            quantity
                        }
                    },
                    'plus'
                );
            });

            minusBtn?.addEventListener('click', () => {
                if (quantityTxt && quantity >= 1)
                    quantityTxt.value = `${--quantity}`;

                productEl.dataset.offerProductQuantity = `${quantity}`;

                updateShoppingList(
                    {
                        ...offer,
                        basket: {
                            productId,
                            quantity
                        }
                    },
                    'minus'
                );
            });

            basketBtn?.addEventListener('click', () => {
                addToShoppingList({
                    ...offer,
                    basket: {
                        productId,
                        quantity
                    }
                });
            });
        });
    };

    const fetchProducts = async (offerId: string) => {
        const res = await request<{
            offer_products: {
                product: {
                    __typename: string;
                    id: string;
                    gtin: null | string;
                    images: {
                        assets: {
                            width: number;
                            url: string;
                        }[];
                    }[];
                    country_code: string;
                    brand: {
                        __typename: string;
                        id: string;
                        slug: string;
                        name: string;
                        description: null | string;
                        positive_logotype: null | string;
                        negative_logotype: null | string;
                        positive_logomark: null | string;
                        negative_logomark: null | string;
                        is_active: boolean;
                        country_code: string;
                        locale_code: string;
                        website_link: null | string;
                        business: null | string;
                    };
                };
                name: string;
                external_id: string;
            }[];
        }>({
            apiKey: configs.apiKey,
            coreUrl: configs.coreUrl,
            url: '/v4/rpc/get_offer_products',
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: offerId
            })
        });

        if (!res) throw new Error();

        return res;
    };

    const closeModalListener = () => {
        container
            ?.querySelector('.sgn-modal-close')
            ?.addEventListener('click', () => {
                destroyModal();
            });
    };

    const addLocalStorageListener = () => {
        window.addEventListener('tjek_shopping_list_update', () => {
            const {localeCode, currency} = translations;
            const productEls = container?.querySelectorAll(
                '.sgn-product-details'
            );
            let priceCurrency = currency;
            const storedPublicationOffers = clientLocalStorage.get(
                'publication-saved-offers'
            );

            productEls?.forEach((productEl: HTMLElement) => {
                const priceEl =
                    productEl.querySelector<HTMLElement>('.sgn-product-price');
                const productId = productEl.dataset.offerProductId;
                const product = storedPublicationOffers.find(
                    (product) => product.id === productId
                );
                priceCurrency = product?.pricing?.currency || currency;

                if (priceEl && !product) {
                    const offerProduct = transformedOffer.products.find(
                        (product) => product.id === productId
                    );

                    priceEl.innerHTML = formatPrice(
                        offerProduct.price,
                        localeCode,
                        priceCurrency
                    );
                    return;
                }

                if (priceEl && product?.pricing?.price) {
                    const totalQuantityByOffer = getTotalQuantityByOffer(
                        storedPublicationOffers,
                        product.offerId
                    );
                    const priceNum = calculateProductPrice(
                        product,
                        totalQuantityByOffer
                    );

                    priceEl.innerHTML = formatPrice(
                        priceNum,
                        localeCode,
                        priceCurrency
                    );
                }
            });
        });
    };

    const addEventListeners = () => {
        document.querySelector<HTMLDivElement>('.sgn-modal-container')?.focus();

        addOpenWebshopListener();
        addShoppingListListener();
        addProductListener();
        closeModalListener();
        addLocalStorageListener();
    };

    return {render};
};

export default OfferOverview;
