import Mustache from 'mustache';
import * as clientLocalStorage from '../../../../storage/client-local';
import type {IIncito} from '../../../../incito-browser/types';
import type {V2Catalog, V2Page} from '../../../core';
import {transformScriptData} from '../helpers/transformers';
import {
    createModal,
    formatPrice,
    translate,
    updateShoppingList,
    getLocaleCode,
    calculateProductPrice,
    getTotalQuantityByOffer
} from '../helpers/component';
import './shopping-list.styl';

const defaultTemplate = `\
    <div class="sgn-shopping-popup sgn-show-print-section">
        <div class="sgn-popup-header">
            <div class="sgn-popup-header-label">
                <span>{{translations.shoppingListLabel}}</span>
            </div>            
            <div class="sgn-menu-share">
                <button class="sgn-shopping-share-list-btn sgn-hide-print">
                    <svg xmlns="http://www.w3.org/2000/svg" class="sgn-share-icon-svg" viewBox="0 0 576 512"><path d="M352 224H305.5c-45 0-81.5 36.5-81.5 81.5c0 22.3 10.3 34.3 19.2 40.5c6.8 4.7 12.8 12 12.8 20.3c0 9.8-8 17.8-17.8 17.8h-2.5c-2.4 0-4.8-.4-7.1-1.4C210.8 374.8 128 333.4 128 240c0-79.5 64.5-144 144-144h80V34.7C352 15.5 367.5 0 386.7 0c8.6 0 16.8 3.2 23.2 8.9L548.1 133.3c7.6 6.8 11.9 16.5 11.9 26.7s-4.3 19.9-11.9 26.7l-139 125.1c-5.9 5.3-13.5 8.2-21.4 8.2H384c-17.7 0-32-14.3-32-32V224zM80 96c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16H400c8.8 0 16-7.2 16-16V384c0-17.7 14.3-32 32-32s32 14.3 32 32v48c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V112C0 67.8 35.8 32 80 32h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H80z"/></svg>
                </button>
            </div>
            <div class="sgn-clearfix"></div>
        </div>
        <ol class="sgn-shopping-list-items-container">
            {{#offers}}
            <li class="sgn-shopping-list-item-container" data-id="{{index}}" data-offer-product-id="{{id}}">
                <div class="sgn-shopping-list-content-container">
                    <div class="sgn-shopping-list-content">
                        <div class="sgn-shopping-list-content-ticker sgn-hide-print">
                            <input type="checkbox" id="sgn-offer-product-id-{{id}}" name="sgn-offer-product-id-{{id}}" value="{{index}}" class="sgn-shopping-list-content-ticker-box"/>
                        </div>
                        <div class="sgn-shopping-list-content-heading sgn-truncate-elipsis">
                            <span>{{name}}</span>
                        </div>
                        <div class="sgn-product-price-container">
                            <div id="sgn-offer-product-quantity-{{id}}" class="sgn-offer-product-quantity">
                                <div class="sgn-offer-product-quantity-content">
                                    <button id="sgn-offer-product-quantity-minus-{{id}}" class="sgn-offer-product-quantity-minus sgn-hide-print">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-minus-circle-fill" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                                    </button>
                                    <input type="text" id="sgn-offer-product-quantity-text-{{id}}" class="sgn-offer-product-quantity-text" value="{{quantity}}" disabled/>
                                    <button id="sgn-offer-product-quantity-plus-{{id}}" class="sgn-offer-product-quantity-plus sgn-hide-print">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-plus-circle-fill" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                                    </button>
                                </div>
                            </div>
                            {{#price}}
                            <div class="sgn-shopping-list-content-price">
                                <span>{{price}}</span>
                            </div>
                            {{/price}}
                        </div>
                    </div>
                </div>
            </li>
            {{/offers}}
            {{#tickedOffers}}
            <li class="sgn-shopping-list-item-container sgn-shopping-list-item-container-ticked" data-id="{{index}}">
                <div class="sgn-shopping-list-content-container">
                    <div class="sgn-shopping-list-content">
                        <div class="sgn-shopping-list-content-ticker sgn-hide-print">
                            <input type="checkbox" id="sgn-offer-product-id-{{id}}" name="sgn-offer-product-id-{{id}}" value="{{index}}" checked="true" class="sgn-shopping-list-content-ticker-box"/>
                        </div>
                        <div class="sgn-shopping-list-content-heading sgn-truncate-elipsis">
                            <span>{{name}}</span>
                        </div>
                        <div class="sgn-product-price-container">
                            <div id="sgn-offer-product-quantity-{{id}}" class="sgn-offer-product-quantity">
                                <div class="sgn-offer-product-quantity-content">
                                    <button id="sgn-offer-product-quantity-minus-{{id}}" class="sgn-offer-product-quantity-minus sgn-hide-print" disabled>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-minus-circle-fill" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                                    </button>
                                    <input type="text" id="sgn-offer-product-quantity-text-{{id}}" class="sgn-offer-product-quantity-text" value="{{quantity}}" disabled/>
                                    <button id="sgn-offer-product-quantity-plus-{{id}}" class="sgn-offer-product-quantity-plus sgn-hide-print" disabled>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-plus-circle-fill" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                                    </button>
                                </div>
                            </div>
                            {{#price}}
                            <div class="sgn-shopping-list-content-price">
                                <span>{{price}}</span>
                            </div>
                            {{/price}}
                        </div>
                    </div>
                </div>
            </li>
            {{/tickedOffers}}
            {{#totalPrice}}
            <li class="sgn-shopping-list-item-container">
                <div class="sgn-shopping-list-content-container sgn-shopping-list-content-container-total">
                    <div class="sgn-shopping-list-content">
                        <div class="sgn-shopping-list-content-heading sgn-truncate-elipsis">
                            <span>Total</span>
                        </div>
                        <div class="sgn-shopping-list-content-price">
                            <span class="sgn-shopping-list-content-price-total">{{totalPrice}}</span>
                        </div>
                    </div>
                </div>
            </li>
            {{/totalPrice}}
            {{#hasTicked}}
            <li class="sgn-shopping-list-item-container-crossed sgn-hide-print">
                <button class="sgn-shopping-clear-ticked-list-btn sgn-hide-print">{{translations.deleteCrossedOutButton}}</button>
            </li>
            {{/hasTicked}}
        </ol>
        <div>
            <button class="sgn-shopping-clear-list-btn sgn-hide-print">{{translations.clearListButton}}</button>
            <button class="sgn-shopping-print-list-btn sgn-hide-print">{{translations.printButton}}</button>
        </div>
    </div>\
`;

const ShoppingList = ({
    template,
    scriptEls,
    sgnData
}: {
    template: Element | null;
    scriptEls: ReturnType<typeof transformScriptData>;
    sgnData?: {details?: V2Catalog; incito?: IIncito; pages?: V2Page[]};
}) => {
    const templateStr = template?.innerHTML || defaultTemplate;

    const shoppingListBtn = document.querySelector('.sgn__offer-shopping');
    let container: HTMLDivElement | null = null;

    const translations = {
        localeCode: scriptEls.localeCode
            ? translate('locale_code')
            : getLocaleCode(sgnData?.details?.dealer?.country?.id || ''),
        shoppingListLabel: translate('publication_viewer_shopping_list_label'),
        currency: translate('publication_viewer_currency'),
        deleteCrossedOutButton: translate(
            'publication_viewer_delete_crossed_out_button'
        ),
        clearListButton: translate(
            'publication_viewer_shopping_list_clear_button'
        ),
        printButton: translate('publication_viewer_print_button')
    };

    const render = () => {
        shoppingListBtn?.addEventListener('click', showShoppingList, false);
    };

    const showShoppingList = () => {
        const storedPublicationOffers = clientLocalStorage.get(
            'publication-saved-offers'
        );

        document.body.classList.add('sgn-body-print');
        container = document.createElement('div');
        container.className = 'sgn-shopping-list-container';

        container.innerHTML = Mustache.render(templateStr, {
            translations,
            offers: transformSavedOffers(storedPublicationOffers)?.filter(
                (offer) => !offer.is_ticked
            ),
            tickedOffers: transformSavedOffers(storedPublicationOffers)?.filter(
                (offer) => offer.is_ticked
            ),
            hasTicked:
                transformSavedOffers(storedPublicationOffers)?.filter(
                    (offer) => offer.is_ticked
                ).length > 0,
            totalPrice: getTotalPrice()
        });

        createModal(container, destroyModal);
        addEventListeners();
    };

    const destroyModal = () => {
        document.body.classList.remove('sgn-body-print');
    };

    const transformSavedOffers = (savedOffers) => {
        const {localeCode, currency} = translations;

        return (savedOffers || []).map((offer, index) => {
            const totalQuantityByOffer = getTotalQuantityByOffer(
                savedOffers,
                offer.offerId
            );
            const productPrice = calculateProductPrice(
                offer,
                totalQuantityByOffer
            );

            return {
                index,
                ...offer,
                totalQuantityByOffer,
                price: productPrice
                    ? formatPrice(
                          productPrice,
                          localeCode,
                          offer?.pricing?.currency || currency
                      )
                    : null
            };
        });
    };

    const addTickerListener = () => {
        container
            ?.querySelectorAll('.sgn-shopping-list-content-ticker-box')
            .forEach((itemEl) => {
                itemEl.addEventListener('change', tickOffer);
            });
    };

    const tickOffer = (e) => {
        const storedPublicationOffers = clientLocalStorage.get(
            'publication-saved-offers'
        );
        const index = e.currentTarget.value;

        storedPublicationOffers[index].is_ticked =
            !storedPublicationOffers[index].is_ticked;

        clientLocalStorage.setWithEvent(
            'publication-saved-offers',
            storedPublicationOffers,
            'tjek_shopping_list_update'
        );
        if (container)
            container.innerHTML = Mustache.render(templateStr, {
                translations,
                offers: transformSavedOffers(storedPublicationOffers)?.filter(
                    (offer) => !offer.is_ticked
                ),
                tickedOffers: transformSavedOffers(
                    storedPublicationOffers
                )?.filter((offer) => offer.is_ticked),
                hasTicked:
                    transformSavedOffers(storedPublicationOffers)?.filter(
                        (offer) => offer.is_ticked
                    ).length > 0,
                totalPrice: getTotalPrice()
            });

        addEventListeners();
        e.stopPropagation();
    };

    const addClearListListener = () => {
        container
            ?.querySelector('.sgn-shopping-clear-list-btn')
            ?.addEventListener('click', (e) => {
                e.stopPropagation();
                clientLocalStorage.setWithEvent(
                    'publication-saved-offers',
                    [],
                    'tjek_shopping_list_update'
                );
                if (container)
                    container.innerHTML = Mustache.render(templateStr, {
                        translations,
                        offers: []
                    });
                addEventListeners();
            });
    };

    const addClearTickedListListener = () => {
        const clearTickedBtn = container?.querySelector(
            '.sgn-shopping-clear-ticked-list-btn'
        );
        const storedPublicationOffers = clientLocalStorage.get(
            'publication-saved-offers'
        );
        const validOffers = storedPublicationOffers?.filter(
            (offer) => !offer.is_ticked
        );

        clearTickedBtn?.addEventListener('click', (e) => {
            e.stopPropagation();

            clientLocalStorage.setWithEvent(
                'publication-saved-offers',
                validOffers,
                'tjek_shopping_list_update'
            );
            if (container)
                container.innerHTML = Mustache.render(templateStr, {
                    translations,
                    offers: transformSavedOffers(validOffers),
                    totalPrice: getTotalPrice()
                });

            addEventListeners();
        });
    };

    const addPrintListener = () => {
        container
            ?.querySelector('.sgn-shopping-print-list-btn')
            ?.addEventListener('click', () => {
                window.print();
            });
    };

    const addShareListener = () => {
        container
            ?.querySelector('.sgn-shopping-share-list-btn')
            ?.addEventListener('click', async () => {
                try {
                    const shareData = {
                        title: translations.shoppingListLabel,
                        text: formatListToShare(
                            transformSavedOffers(
                                clientLocalStorage.get(
                                    'publication-saved-offers'
                                )
                            )
                        ),
                        url: document.location.href
                    };

                    await navigator.share(shareData);
                } catch (err) {
                    if (
                        err?.toString() ===
                        'TypeError: navigator.share is not a function'
                    ) {
                        const shareEmailData = {
                            subject: translations.shoppingListLabel,
                            body: formatListToShare(
                                transformSavedOffers(
                                    clientLocalStorage.get(
                                        'publication-saved-offers'
                                    )
                                ),
                                '%0d%0a'
                            )
                        };
                        const queryString = Object.keys(shareEmailData)
                            .map((key) => key + '=' + shareEmailData[key])
                            .join('&');

                        window.location.href = `mailto:?${queryString}`;
                    } else {
                        console.log(err);
                    }
                }
            });
    };

    const getTotalPrice = () => {
        const {localeCode, currency} = translations;
        const storedPublicationOffers = clientLocalStorage.get(
            'publication-saved-offers'
        );
        const priceCurrency =
            storedPublicationOffers?.[0]?.pricing?.currency || currency;
        let totalPrice = 0;

        storedPublicationOffers?.forEach((product) => {
            const totalQuantityByOffer = getTotalQuantityByOffer(
                storedPublicationOffers,
                product.offerId
            );
            const priceNum = calculateProductPrice(
                product,
                totalQuantityByOffer
            );

            totalPrice += priceNum;
        });

        return totalPrice
            ? formatPrice(totalPrice, localeCode, priceCurrency)
            : '';
    };

    const updateQuantityHandler = (
        productEl: HTMLElement,
        action: 'plus' | 'minus'
    ) => {
        const {localeCode, currency} = translations;
        const productId = productEl.dataset.offerProductId;
        const priceEl = productEl.querySelector<HTMLElement>(
            '.sgn-shopping-list-content-price'
        );
        const quantityTxt = productEl.querySelector<HTMLInputElement>(
            '.sgn-offer-product-quantity-text'
        );
        const totalPriceContainer = container?.querySelector<HTMLDivElement>(
            '.sgn-shopping-list-content-container-total'
        );
        const totalPriceEL = container?.querySelector<HTMLInputElement>(
            '.sgn-shopping-list-content-price-total'
        );

        const storedPublicationOffers = clientLocalStorage.get(
            'publication-saved-offers'
        );

        let quantity = Number(quantityTxt?.value ?? 1);

        const product = storedPublicationOffers.find(
            (product) => product.id === productId
        );

        if (quantityTxt) {
            quantityTxt.value =
                action === 'plus' ? `${++quantity}` : `${--quantity}`;

            if (quantityTxt?.value === '0' && action === 'minus') {
                productEl.remove();
            }

            updateShoppingList(
                {
                    ...product,
                    basket: {
                        productId,
                        quantity
                    }
                },
                action
            );
        }
    };

    const addQuantityListener = () => {
        const productEls = document.querySelectorAll(
            '.sgn-shopping-list-item-container'
        );

        productEls.forEach((productEl: HTMLElement) => {
            const minusBtn = productEl.querySelector<HTMLElement>(
                '.sgn-offer-product-quantity-minus'
            );
            const plusBtn = productEl.querySelector<HTMLElement>(
                '.sgn-offer-product-quantity-plus'
            );

            plusBtn?.addEventListener('click', () =>
                updateQuantityHandler(productEl, 'plus')
            );
            minusBtn?.addEventListener('click', () =>
                updateQuantityHandler(productEl, 'minus')
            );
        });
    };

    const addLocalStorageListener = () => {
        window.addEventListener('tjek_shopping_list_update', () => {
            const {localeCode, currency} = translations;
            const productEls = document.querySelectorAll(
                '.sgn-shopping-list-item-container'
            );
            let priceCurrency = currency;
            let totalPrice = 0;

            const totalPriceEL = container?.querySelector<HTMLInputElement>(
                '.sgn-shopping-list-content-price-total'
            );
            const totalPriceContainer =
                container?.querySelector<HTMLDivElement>(
                    '.sgn-shopping-list-content-container-total'
                );
            const storedPublicationOffers = clientLocalStorage.get(
                'publication-saved-offers'
            );

            productEls.forEach((productEl: HTMLElement) => {
                const priceEl = productEl.querySelector<HTMLElement>(
                    '.sgn-shopping-list-content-price'
                );
                const productId = productEl.dataset.offerProductId;
                const product = storedPublicationOffers.find(
                    (product) => product.id === productId
                );
                priceCurrency = product?.pricing?.currency || currency;

                if (priceEl && product?.pricing?.price) {
                    const totalQuantityByOffer = getTotalQuantityByOffer(
                        storedPublicationOffers,
                        product.offerId
                    );
                    const priceNum = calculateProductPrice(
                        product,
                        totalQuantityByOffer
                    );

                    totalPrice += priceNum;

                    priceEl.innerHTML = formatPrice(
                        priceNum,
                        localeCode,
                        priceCurrency
                    );
                }
            });

            if (totalPriceEL && totalPrice) {
                totalPriceEL.innerHTML = formatPrice(
                    totalPrice,
                    localeCode,
                    priceCurrency
                );
            } else {
                totalPriceContainer?.remove();
            }
        });
    };

    const formatListToShare = (data, newLineDelimiter = `\n`) => {
        let offerStr = '';

        data?.forEach((offer) => {
            if (!offer.is_ticked) {
                offerStr += offer.price
                    ? `${offer.price} - ${offer.name} (${offer.quantity || 1})`
                    : `${offer.name} (${offer.quantity || 1})`;
                offerStr += newLineDelimiter;
            }
        });

        return offerStr;
    };

    const addEventListeners = () => {
        document.querySelector<HTMLDivElement>('.sgn-modal-container')?.focus();

        addTickerListener();
        addClearTickedListListener();
        addClearListListener();
        addPrintListener();
        addShareListener();
        addQuantityListener();
        addLocalStorageListener();
    };

    return {render};
};

export default ShoppingList;
