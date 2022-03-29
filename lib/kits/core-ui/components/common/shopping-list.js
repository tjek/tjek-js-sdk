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
                {{^disableShareList}}
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
                {{/disableShareList}}
            </div>
            <div class="sgn-clearfix"></div>
        </div>
        <ol class="sgn-shopping-list-items-container">
            {{#offers}}
            <li class="sgn-shopping-list-item-container" data-id="{{index}}">
                <div class="sgn-shopping-list-content-container">
                    <div class="sgn-shopping-list-content">
                        <div class="sgn-shopping-list-content-heading sgn-truncate-elipsis">
                            <span>{{#price}}{{price}} - {{/price}}{{name}}</span><br/>
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
                            <span>{{#price}}{{price}} - {{/price}}{{name}}</span><br/>
                        </div>
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
    let container = null;
    let disableShareList = true;

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
        disableShareList = !navigator.share && !navigator.canShare;
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
                ).length > 0,
            disableShareList
        });

        createModal(container);
        addEventListeners();
    };

    const transformSavedOffers = (savedOffers = []) => {
        const {localeCode, currency} = translations;

        return savedOffers.map((offer, index) => ({
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
            .querySelectorAll('.sgn-shopping-list-item-container')
            .forEach((itemEl) => {
                itemEl.addEventListener('click', tickOffer, false);
            });
    };

    const tickOffer = (e) => {
        const storedPublicationOffers = clientLocalStorage.get(
            'publication-saved-offers'
        );
        const index = e.currentTarget.dataset?.id;

        storedPublicationOffers[index].is_ticked =
            !storedPublicationOffers[index].is_ticked;

        clientLocalStorage.setWithEvent(
            'publication-saved-offers',
            storedPublicationOffers,
            'tjek_shopping_list_update'
        );
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
                ).length > 0,
            disableShareList
        });

        addEventListeners();
        e.stopPropagation();
    };

    const addClearListListener = () => {
        container
            .querySelector('.sgn-shopping-clear-list-btn')
            ?.addEventListener('click', (e) => {
                e.stopPropagation();
                clientLocalStorage.setWithEvent(
                    'publication-saved-offers',
                    [],
                    'tjek_shopping_list_update'
                );
                container.innerHTML = Mustache.render(template, {
                    translations,
                    offers: [],
                    disableShareList
                });
                addEventListeners();
            });
    };

    const addClearTickedListListener = () => {
        const clearTickedBtn = container.querySelector(
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
            container.innerHTML = Mustache.render(template, {
                translations,
                offers: transformSavedOffers(validOffers),
                disableShareList
            });

            addEventListeners();
        });
    };

    const addPrintListener = () => {
        container
            .querySelector('.sgn-shopping-print-list-btn')
            ?.addEventListener('click', () => {
                window.print();
            });
    };

    const addShareListener = () => {
        const shareData = {
            title: 'My Shopping List',
            text: formatListToShare(
                transformSavedOffers(
                    clientLocalStorage.get('publication-saved-offers')
                )
            ),
            url: document.location.href
        };

        container
            .querySelector('.sgn-shopping-share-list-btn')
            ?.addEventListener('click', async () => {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.log(err);
                }
            });
    };

    const formatListToShare = (data = []) => {
        let offerStr = '';

        data?.forEach((offer) => {
            if (!offer.is_ticked) {
                offerStr += offer.price
                    ? `[ ] ${offer.price} - ${offer.name}\n`
                    : `[ ] ${offer.name}\n`;
            }
        });

        data?.forEach((offer) => {
            if (offer.is_ticked) {
                offerStr += offer.price
                    ? `[x] ${offer.price} - ${offer.name}\n`
                    : `[x] ${offer.name}\n`;
            }
        });

        return offerStr;
    };

    const addEventListeners = () => {
        document.querySelector('.sgn-modal-container')?.focus();

        addTickerListener();
        addClearTickedListListener();
        addClearListListener();
        addPrintListener();
        addShareListener();
    };

    return {render};
};

export default ShoppingList;
