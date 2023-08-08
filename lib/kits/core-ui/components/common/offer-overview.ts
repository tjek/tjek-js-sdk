import Mustache from 'mustache';
import {
    createModal,
    destroyModal,
    formatPrice,
    translate,
    getDateRange,
    getPubState,
    getPubStateMessage,
    parseDateStr
} from '../helpers/component';
import {request, V2Offer} from '../../../core';
import './offer-overview.styl';

const defaultTemplate = `\
    <div class="sgn-offer-overview-popup">
        {{#offer}}
        <div class="sgn-popup-header">
            <div class="sgn-menu-popup-labels">
                <div class="sgn-menu-label">
                    <span>{{label}}&nbsp;</span>
                </div>
                <div class="sgn-menu-date">
                    <span data-validity-state="{{status}}">{{dateRange}}&nbsp;</span>
                </div>
            </div>
        </div>
        <div class="sgn-popup-content">
            <div class="sgn-popup-offer-container">
                <div class="sgn-offer-img">
                    {{#loader}}
                    <div class="sgn_modal_loader"></div>
                    {{/loader}}
                    {{^loader}}
                    <img src="{{images.zoom}}" alt="{{heading}}">
                    {{/loader}}
                </div>
                <div class="sgn-offer-texts-container">
                    <div class="sgn-offer-heading">
                        <span>{{heading}}&nbsp;</span>
                    </div>
                    <div class="sgn-offer-description">
                        <span>{{description}}&nbsp;</span>
                    </div>
                    <div class="sgn-offer-price">
                        <span>{{price}}&nbsp;</span>
                    </div>
                </div>  
                <div class="sgn-offer-buttons-container">
                    {{^disableShoppingList}}
                    <button class="sgn-shopping-add-to-list-btn">{{translations.addToShoppingList}}</button>
                    {{/disableShoppingList}}
                    {{#webshop_link}}
                    <button class="sgn-shopping-open-webshop-btn">{{translations.visitWebshopLink}}</button>
                    {{/webshop_link}}
                </div>
            </div>
        </div>
        {{/offer}} 
    </div>\
`;

const defaultTemplateV2 = `\
    <div class="sgn-offer-overview-popup sgn-offer-overview-popup-v2" style="width:{{layoutWidth}}px;">
        {{#offer}}
        <div class="sgn-popup-header">
            <div class="sgn-menu-popup-labels">
                <div class="sgn-menu-label">
                    <span>{{label}}&nbsp;</span>
                </div>
                <div class="sgn-menu-date">
                    <span data-validity-state="{{status}}">{{dateRange}}&nbsp;</span>
                </div>
            </div>
        </div>
        <div class="sgn-popup-content">
            <div class="sgn-offer-texts-container">
                <div class="sgn-offer-heading">
                    <span>{{heading}}&nbsp;</span>
                </div>
                <div class="sgn-offer-description">
                    <span>{{description}}&nbsp;</span>
                </div>
                <div class="sgn-offer-price">
                    <span>{{price}}&nbsp;</span>
                </div>
            </div>
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
                <div class="sgn-products-container">
                    <div class="sgn-products-texts-container">
                        {{#products}}
                        <div id="sgn-offer-product-{{id}}" data-offer-product-id="{{id}}" class="sgn-product-details">
                            <div class="sgn-product-heading">{{title}}</div>
                            <div id="sgn-offer-product-quantity-{{id}}" class="sgn-offer-product-quantity">
                                <button id="sgn-offer-product-quantity-minus-{{id}}" class="sgn-offer-product-quantity-minus">-</button>
                                <input type="text" id="sgn-offer-product-quantity-text-{{id}}" class="sgn-offer-product-quantity-text" value="1" />
                                <button id="sgn-offer-product-quantity-plus-{{id}}" class="sgn-offer-product-quantity-plus">+</button>
                            </div>
                            <div class="sgn-offer-product-basket">
                                <button id="sgn-offer-product-add-basket-{{id}}" class="sgn-offer-product-add-basket">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16"> <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/> </svg>
                                </button>
                            </div>
                            <div class="sgn-clearfix"></div>
                        </div>
                        {{/products}}
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
    template =
        template?.innerHTML ||
        (scriptEls.offerModalVersion === 2 && type === 'incito'
            ? defaultTemplateV2
            : defaultTemplate);
    let container: HTMLDivElement | null = null;

    const translations = {
        localeCode: translate('locale_code'),
        currency: translate('publication_viewer_currency'),
        addToShoppingList: translate('publication_viewer_add_to_shopping_list'),
        visitWebshopLink: translate('publication_viewer_visit_webshop_link')
    };

    const render = async () => {
        container = document.createElement('div');
        container.className = 'sgn-offer-overview-container';

        createModal(container);

        container.innerHTML = Mustache.render(template, {
            translations,
            label: '',
            disableShoppingList: document.querySelector('.sgn__offer-shopping')
                ? false
                : true,
            offer: {},
            loader: true,
            layoutWidth: sgnData?.incito?.root_view?.layout_width
        });

        const transformedOffer =
            type === 'paged'
                ? await fetchOffer(offer.id)
                : await transformIncitoOffer(offer);

        container.innerHTML = Mustache.render(template, {
            translations,
            label: sgnData?.details?.label,
            disableShoppingList: document.querySelector('.sgn__offer-shopping')
                ? false
                : true,
            offer: transformedOffer,
            layoutWidth: sgnData?.incito?.root_view?.layout_width
        });

        dispatchOfferClickEvent(transformedOffer);
        addEventListeners();
    };

    const transformIncitoOffer = async ({
        fetchOffer,
        viewId,
        publicationId,
        products
    }) => {
        const {localeCode, currency} = translations;
        const {offer: incitoOffer} = await fetchOffer({viewId, publicationId});
        offer = incitoOffer;
        offer.products = products;

        return {
            ...offer,
            heading: offer.name,
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
        const offer = await request<V2Offer>({
            apiKey: configs.apiKey,
            coreUrl: configs.coreUrl,
            url: `/v2/offers/${id}`
        });

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

            let quantity = +(quantityTxt?.value ?? 1);

            plusBtn?.addEventListener('click', () => {
                if (quantityTxt) quantityTxt.value = `${++quantity}`;
            });
            minusBtn?.addEventListener('click', () => {
                if (quantityTxt && quantity > 1)
                    quantityTxt.value = `${--quantity}`;
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

    const addEventListeners = () => {
        document.querySelector<HTMLDivElement>('.sgn-modal-container')?.focus();

        addOpenWebshopListener();
        addShoppingListListener();
        addProductListener();
    };

    return {render};
};

export default OfferOverview;
