import Mustache from 'mustache';
import {request} from '../../../core';
import {formatPrice, destroyModal, translate} from '../helpers/component';
import './offer-list.styl';

const defaultTemplate = `\
    <div class="sgn-offers-content">
        <div class="sgn-offers-search-container">
            <input type="text" id="sgn-offers-search-text" class="sgn-offers-search-text" name="sgn-offers-search-text" placeholder="{{translations.searchText}}...">
        </div>
        <ol class="sgn-offers-list-items-container">
            {{#offers}}
            <li class="sgn-offers-list-item-container">
                <div class="sgn-offers-content-container" data-page-id="{{pageId}}">
                    <div class="sgn-offers-content-img">
                        <img src="{{images.view}}" alt="{{heading}}">
                    </div>
                    <div class="sgn-offers-content-text">
                        <div class="sgn-offers-content-heading">
                            <span>{{heading}}</span>
                        </div>
                        <div class="sgn-offers-content-description">
                            <span>{{description}}&nbsp;</span>
                        </div>
                        <div class="sgn-offers-content-price">
                            <span>{{price}}</span>
                        </div>
                    </div>
                    <div class="sgn-clearfix"></div>
                </div>
            </li>
            {{/offers}}
        </ol>
    </div>\
`;

const OfferList = ({configs = {}, sgnViewer, template}) => {
    template = template?.innerHTML || defaultTemplate;

    const offerTemplate = template.match(
        /(?={{#offers}}).*({{\/offers}})/gs
    )?.[0];
    let container = null;
    let offersList = [];
    let offset = 0;
    let limit = 24;
    let searchKey = '';

    const translations = {
        localeCode: translate('locale_code'),
        currency: translate('paged_publication_viewer_currency'),
        searchText: translate('paged_publication_viewer_search_text')
    };

    const fetchSearch = async (keyword = '') => {
        if (!keyword) {
            return offersList;
        }

        const offers = await request({
            url: '/v2/offers/search',
            qs: {
                dealer_id: configs.businessId,
                catalog_id: configs.id,
                limit,
                query: keyword
            }
        });

        return transformOffers(offers);
    };

    const fetchOffers = async (offset = 0, limit = 24) => {
        const offers = await request({
            url: '/v2/offers',
            qs: {
                dealer_id: configs.businessId,
                catalog_id: configs.id,
                offset,
                limit
            }
        });

        return transformOffers(offers);
    };

    const transformOffers = (offers = []) => {
        const {localeCode, currency} = translations;

        return (
            offers?.map((offer) => {
                const price = formatPrice(
                    offer?.pricing?.price,
                    localeCode,
                    offer?.pricing?.currency || currency
                );
                const pageId = `page${offer.catalog_page || 1}`;

                return {
                    ...offer,
                    price,
                    pageId
                };
            }) || []
        );
    };

    const fetchOnScrollEnd = async (e) => {
        const offerOl = e.target;

        if (
            offerOl.scrollHeight - offerOl.scrollTop === offerOl.clientHeight &&
            !searchKey
        ) {
            const offers = await fetchOffers((offset += limit), limit);

            offersList = offersList.concat(offers);

            offerOl.innerHTML += Mustache.render(offerTemplate, {
                translations,
                offers
            });

            addOfferClickListener();
        }
    };

    const fetchOnSearch = async (e) => {
        searchKey = e.target.value || '';
        const offerOl = container.querySelector(
            '.sgn-offers-list-items-container'
        );
        const offersRes = await fetchSearch(searchKey);

        offerOl.innerHTML = Mustache.render(offerTemplate, {
            translations: translations,
            offers: searchKey ? offersRes : offersList
        });

        addOfferClickListener();
    };

    const addScrollListener = () => {
        const offerOl = container.querySelector(
            '.sgn-offers-list-items-container'
        );
        offerOl.addEventListener('scroll', fetchOnScrollEnd);
    };

    const addSearchListener = () => {
        const offerOlSearchText = container.querySelector(
            '.sgn-offers-search-text'
        );
        offerOlSearchText.addEventListener('input', fetchOnSearch);
    };

    const addOfferClickListener = () => {
        const offerList = container.querySelectorAll(
            '.sgn-offers-content-container'
        );

        offerList.forEach((itemEl) => {
            itemEl?.addEventListener('click', redirectToPage, false);
        });
    };

    const redirectToPage = (e) => {
        destroyModal();
        sgnViewer.navigateToPageId(e.currentTarget.dataset?.pageId);
    };

    const render = async () => {
        offersList = await fetchOffers(0, 24);
        container = document.createElement('div');
        container.className = 'sgn-offers-container';
        container.innerHTML = Mustache.render(template, {
            translations: translations,
            offers: offersList
        });

        addSearchListener();
        addScrollListener();
        addOfferClickListener();

        return container;
    };

    return {render};
};

export default OfferList;
