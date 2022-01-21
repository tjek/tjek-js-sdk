import Mustache from 'mustache';
import {request} from '../../../core';
import {ComponentHelper, translate} from '../helpers';
import './offer-list.styl';

const defaultTemplate = `\
    <div class="sgn-offers-content">
        <div class="sgn-offers-search-container">
            <input type="text" id="sgn-offers-search-text" class="sgn-offers-search-text" name="sgn-offers-search-text" placeholder="{{translations.searchText}}...">
        </div>
        <ol class="sgn-offers-ol">
            {{#offers}}
            <li class="sgn-offers-li">
                <div class="sgn-offers-li-flex-container" data-page-number="{{catalog_page}}">
                    <div class="sgn-offers-li-div-img">
                        <img src="{{images.view}}" alt="{{heading}}">
                    </div>
                    <div class="sgn-offers-li-div-text">
                        <div class="sgn-offers-li-heading">
                            <span>{{heading}}</span>
                        </div>
                        <div class="sgn-offers-li-description">
                            <span>{{description}}&nbsp;</span>
                        </div>
                        <div class="sgn-offers-li-price">
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

const offerList = ({configs = {}, viewer, template}) => {
    const _configs = configs;
    const _viewer = viewer;
    const _template = template?.innerHTML || defaultTemplate;
    const _offerTemplate = _template.match(
        /(?={{#offers}}).*({{\/offers}})/gs
    )?.[0];
    let _container = null;
    let _offers = [];
    let _offset = 0;
    let _limit = 24;
    let _searchKey = '';

    const _translations = {
        localeCode: translate('locale_code'),
        currency: translate('paged_publication_viewer_currency'),
        searchText: translate('paged_publication_viewer_search_text')
    };

    const fetchSearch = (keyword = '') => {
        if (!keyword) {
            return _offers;
        }
        return new Promise((resolve) => {
            request(
                {
                    url: '/v2/offers/search',
                    qs: {
                        dealer_id: _configs.dealerId,
                        catalog_id: _configs.id,
                        limit: _limit,
                        query: keyword
                    }
                },
                (err, offers) => {
                    if (!err) {
                        resolve(transformOffers(offers));
                    }
                }
            );
        });
    };

    const fetchOffers = (offset = 0, limit = 24) => {
        return new Promise((resolve) => {
            request(
                {
                    url: '/v2/offers',
                    qs: {
                        dealer_id: _configs.dealerId,
                        catalog_id: _configs.id,
                        offset,
                        limit
                    }
                },
                (err, offers) => {
                    if (!err) {
                        resolve(transformOffers(offers));
                    }
                }
            );
        });
    };

    const transformOffers = (offers = []) => {
        const {localeCode, currency} = _translations;

        return (
            offers?.map((offer) => {
                const price = ComponentHelper.formatPrice(
                    offer?.pricing?.price,
                    localeCode,
                    currency
                );
                return {
                    ...offer,
                    price
                };
            }) || []
        );
    };

    const fetchOnScrollEnd = async (e) => {
        const offerOl = e.target;

        if (
            offerOl.scrollHeight - offerOl.scrollTop === offerOl.clientHeight &&
            !_searchKey
        ) {
            const offers = await fetchOffers((_offset += _limit), _limit);

            _offers = _offers.concat(offers);

            offerOl.innerHTML += Mustache.render(_offerTemplate, {
                translations: _translations,
                offers
            });

            addOfferClickListener();
        }
    };

    const fetchOnSearch = async (e) => {
        _searchKey = e.target.value || '';
        const offerOl = _container.querySelector('.sgn-offers-ol');
        const offersRes = await fetchSearch(_searchKey);

        offerOl.innerHTML = Mustache.render(_offerTemplate, {
            translations: _translations,
            offers: _searchKey ? offersRes : _offers
        });

        addOfferClickListener();
    };

    const addScrollListener = () => {
        const offerOl = _container.querySelector('.sgn-offers-ol');
        offerOl.addEventListener('scroll', fetchOnScrollEnd);
    };

    const addSearchListener = () => {
        const offerOlSearchText = _container.querySelector(
            '.sgn-offers-search-text'
        );
        offerOlSearchText.addEventListener('input', fetchOnSearch);
    };

    const addOfferClickListener = () => {
        const offerList = _container.querySelectorAll(
            '.sgn-offers-li-flex-container'
        );

        offerList.forEach((itemEl) => {
            itemEl?.addEventListener('click', redirectToPage, false);
        });
    };

    const redirectToPage = (e) => {
        const pageId = `page${e.currentTarget.dataset?.pageNumber || 1}`;

        _viewer.navigateToPageId(pageId);
    };

    const render = async () => {
        _offers = await fetchOffers(0, 24);
        _container = document.createElement('div');
        _container.className = 'sgn-offers-container';
        _container.innerHTML = Mustache.render(_template, {
            translations: _translations,
            offers: _offers
        });

        addSearchListener();
        addScrollListener();
        addOfferClickListener();

        return _container;
    };

    return {render};
};

export default offerList;
