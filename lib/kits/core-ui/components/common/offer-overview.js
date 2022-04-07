import Mustache from 'mustache';
import {
    createModal,
    formatPrice,
    translate,
    formatDate
} from '../helpers/component';
import './offer-overview.styl';

const defaultTemplate = `\
    <div class="sgn-offer-overview-popup">
        <div class="sgn-popup-header">
            <div class="sgn-menu-popup-labels">
                <div class="sgn-menu-label">
                    <span>{{label}}</span>
                </div>
                <div class="sgn-menu-till">
                    <span>{{translations.untilLabel}} {{till}}</span>
                </div>
            </div>
        </div>
        <div class="sgn-popup-content">
            {{#offer}}
            <div class="sgn-popup-offer-container">
                <div class="sgn-offer-img">
                    <img src="{{image}}" alt="{{heading}}">
                </div>
                <div class="sgn-offer-texts-container">
                    <div class="sgn-offer-heading">
                        <span>{{name}}</span>
                    </div>
                    <div class="sgn-offer-description">
                        <span>{{description}}&nbsp;</span>
                    </div>
                    <div class="sgn-offer-price">
                        <span>{{price}}</span>
                    </div>
                </div>  
                <div class="sgn-offer-buttons-container">
                    {{^disableShoppingList}}
                    <button class="sgn-shopping-add-to-list-btn">Add to list</button>
                    {{/disableShoppingList}}
                    {{#webshop_link}}
                    <button class="sgn-shopping-open-webshop-btn">Visit webshop link</button>
                    {{/webshop_link}}
                </div>
            </div>
            {{/offer}} 
        </div>
    </div>\
`;

const OfferOverview = ({template, sgnData, offer, addToShoppingList}) => {
    template = template?.innerHTML || defaultTemplate;
    let container = null;

    const translations = {
        localeCode: translate('locale_code'),
        currency: translate('publication_viewer_currency'),
        untilLabel: translate('publication_viewer_until_label')
    };

    const render = () => {
        container = document.createElement('div');
        container.className = 'sgn-offer-overview-container';

        container.innerHTML = Mustache.render(template, {
            translations,
            label: sgnData?.details?.label,
            from: formatDate(
                sgnData?.details?.run_from,
                translations.localeCode,
                {dateStyle: 'full'}
            ),
            till: formatDate(
                sgnData?.details?.run_till,
                translations.localeCode,
                {dateStyle: 'full'}
            ),
            disableShoppingList: document.querySelector('.sgn__offer-shopping')
                ? false
                : true,
            offer: transformOffer(offer)
        });

        createModal(container);
        addEventListeners();
    };

    const transformOffer = (offer) => {
        const {localeCode, currency} = translations;

        return {
            ...offer,
            price: formatPrice(
                offer?.price,
                localeCode,
                offer?.currency_code || currency
            ),
            image: offer?.images?.[0]?.url
        };
    };

    const addOpenWebshopListener = () => {
        container
            .querySelector('.sgn-shopping-open-webshop-btn')
            ?.addEventListener('click', () => {
                window.open(offer.webshop_link);
            });
    };

    const addShoppingListListener = () => {
        container
            .querySelector('.sgn-shopping-add-to-list-btn')
            ?.addEventListener('click', () => {
                addToShoppingList(offer);
            });
    };

    const addEventListeners = () => {
        document.querySelector('.sgn-modal-container')?.focus();

        addOpenWebshopListener();
        addShoppingListListener();
    };

    return {render};
};

export default OfferOverview;
