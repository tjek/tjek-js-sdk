import Mustache from 'mustache';
import * as clientLocalStorage from '../../../../storage/client-local';
import {createModal, formatPrice, translate} from '../helpers/component';
import './shopping-list.styl';

const defaultTemplate = `\
    <div class="sgn-shopping-popup sgn-show-print-section">
        <div class="sgn-popup-header">
            <div class="sgn-popup-header-label">
                <span>{{translations.shoppingListLabel}}</span>
            </div>            
            <div class="sgn-menu-share">
                <button class="sgn-shopping-share-list-btn sgn-hide-print">
                    <svg 
                        aria-hidden="true"
                        class="sgn-share-icon-svg"
                        role="img"
                        viewBox="0 0 640 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            fill="currentColor" 
                            d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
                        >
                        </path>
                    </svg>
                </button>
            </div>
            <div class="sgn-clearfix"></div>
        </div>
        <ol class="sgn-shopping-list-items-container">
            {{#offers}}
            <li class="sgn-shopping-list-item-container" data-id="{{index}}" data-offer-product-id="{{id}}">
                <div class="sgn-shopping-list-content-container">
                    <div class="sgn-shopping-list-content">
                        <div class="sgn-shopping-list-content-heading sgn-truncate-elipsis">
                            <span>{{#price}}{{price}} - {{/price}}{{name}}</span>
                        </div>
                        <div id="sgn-offer-product-quantity-{{id}}" class="sgn-offer-product-quantity">
                            <div class="sgn-offer-product-quantity-content">
                                <button id="sgn-offer-product-quantity-minus-{{id}}" class="sgn-offer-product-quantity-minus sgn-hide-print">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-minus-circle-fill" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                                </button>
                                <input type="text" id="sgn-offer-product-quantity-text-{{id}}" class="sgn-offer-product-quantity-text" value="{{quantity}}" disabled/>
                                <button id="sgn-offer-product-quantity-plus-{{id}}" class="sgn-offer-product-quantity-plus sgn-hide-print">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-plus-circle-fill" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                                </button>
                            </div>
                        </div>
                        <div class="sgn-shopping-list-content-ticker sgn-hide-print">
                            <input type="checkbox" id="sgn-offer-product-id-{{id}}" name="sgn-offer-product-id-{{id}}" value="{{index}}" checked="true" class="sgn-shopping-list-content-ticker-box"/>
                        </div>
                    </div>
                </div>
            </li>
            {{/offers}}
            {{#tickedOffers}}
            <li class="sgn-shopping-list-item-container sgn-shopping-list-item-container-ticked" data-id="{{index}}">
                <div class="sgn-shopping-list-content-container">
                    <div class="sgn-shopping-list-content">
                        <div class="sgn-shopping-list-content-heading sgn-truncate-elipsis">
                            <span>{{#price}}{{price}} - {{/price}}{{name}}</span>
                        </div>
                        <div id="sgn-offer-product-quantity-{{id}}" class="sgn-offer-product-quantity">
                            <button id="sgn-offer-product-quantity-minus-{{id}}" class="sgn-offer-product-quantity-minus sgn-hide-print" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-minus-circle-fill" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                            </button>
                            <input type="text" id="sgn-offer-product-quantity-text-{{id}}" class="sgn-offer-product-quantity-text" value="{{quantity}}" disabled/>
                            <button id="sgn-offer-product-quantity-plus-{{id}}" class="sgn-offer-product-quantity-plus sgn-hide-print" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-plus-circle-fill" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                            </button>
                        </div>
                        <div class="sgn-shopping-list-content-ticker sgn-hide-print">
                            <input type="checkbox" id="sgn-offer-product-id-{{id}}" name="sgn-offer-product-id-{{id}}" value="{{index}}" class="sgn-shopping-list-content-ticker-box"/>
                        </div>
                        <div class="sgn-clearfix"></div>
                    </div>
                </div>
            </li>
            {{/tickedOffers}}
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

const ShoppingList = ({template}) => {
    template = template?.innerHTML || defaultTemplate;
    const shoppingListBtn = document.querySelector('.sgn__offer-shopping');
    let container: HTMLDivElement | null = null;

    const translations = {
        localeCode: translate('locale_code'),
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

        container.innerHTML = Mustache.render(template, {
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
                ).length > 0
        });

        createModal(container, destroyModal);
        addEventListeners();
    };

    const destroyModal = () => {
        document.body.classList.remove('sgn-body-print');
    };

    const transformSavedOffers = (savedOffers) => {
        const {localeCode, currency} = translations;

        return (savedOffers || []).map((offer, index) => ({
            index,
            ...offer,
            price: offer?.pricing?.price
                ? formatPrice(
                      offer?.pricing?.price,
                      localeCode,
                      offer?.pricing?.currency || currency
                  )
                : null
        }));
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
            container.innerHTML = Mustache.render(template, {
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
                    ).length > 0
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
                    container.innerHTML = Mustache.render(template, {
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
                container.innerHTML = Mustache.render(template, {
                    translations,
                    offers: transformSavedOffers(validOffers)
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

    const addQuantityListener = () => {
        const productEls = document.querySelectorAll(
            '.sgn-shopping-list-item-container'
        );

        productEls.forEach((productEl: HTMLElement) => {
            const index = productEl.dataset.id;
            const minusBtn = productEl.querySelector<HTMLElement>(
                '.sgn-offer-product-quantity-minus'
            );
            const plusBtn = productEl.querySelector<HTMLElement>(
                '.sgn-offer-product-quantity-plus'
            );
            const quantityTxt = productEl.querySelector<HTMLInputElement>(
                '.sgn-offer-product-quantity-text'
            );
            const storedPublicationOffers = clientLocalStorage.get(
                'publication-saved-offers'
            );

            let quantity = +(quantityTxt?.value ?? 1);

            plusBtn?.addEventListener('click', () => {
                if (quantityTxt && index) {
                    quantityTxt.value = `${++quantity}`;

                    storedPublicationOffers[index].quantity = quantityTxt.value;
                    clientLocalStorage.setWithEvent(
                        'publication-saved-offers',
                        storedPublicationOffers,
                        'tjek_shopping_list_update'
                    );
                }
            });
            minusBtn?.addEventListener('click', () => {
                if (quantityTxt && quantity > 1 && index) {
                    quantityTxt.value = `${--quantity}`;

                    storedPublicationOffers[index].quantity = quantityTxt.value;
                    clientLocalStorage.setWithEvent(
                        'publication-saved-offers',
                        storedPublicationOffers,
                        'tjek_shopping_list_update'
                    );
                }
            });
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

        addQuantityListener();
        addTickerListener();
        addClearTickedListListener();
        addClearListListener();
        addPrintListener();
        addShareListener();
    };

    return {render};
};

export default ShoppingList;
