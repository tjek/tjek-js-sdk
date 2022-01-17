import Mustache from 'mustache';
import {request} from '../../../core';
import PagedPublication from '../../paged-publication';
import './offer-list.styl';

const defaultTemplate = `\
    <div class="sgn-offers-content">
        <div class="sgn-offers-search-container">
            <input type="text" id="sgn-offers-search-text" class="sgn-offers-search-text" name="sgn-offers-search-text" placeholder="Search...">
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
                            <span>{{pricing.price}} kr.</span>
                        </div>
                    </div>
                    <div class="sgn-clearfix"></div>
                </div>
            </li>
            {{/offers}}
        </ol>
    </div>\
`;

const offerList = ({configs = {}, template, scriptEl, mainContainer}) => {
    const _configs = configs;
    const _template = template?.innerHTML || defaultTemplate;
    const _offerTemplate = _template.match(
        /(?={{#offers}}).*({{\/offers}})/gs
    )?.[0];
    const _scriptEl = scriptEl;
    const _mainContainer = mainContainer;
    let _container = null;
    let _offers = [];
    let _offset = 0;
    let _limit = 24;
    let _searchKey = '';

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
                        catalogId: _configs.id,
                        limit: _limit,
                        query: keyword
                    }
                },
                (err, offers) => {
                    if (!err) {
                        resolve(offers);
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
                        catalogId: _configs.id,
                        offset,
                        limit
                    }
                },
                (err, offers) => {
                    if (!err) {
                        console.log(offers);
                        resolve(offers);
                    }
                }
            );
        });
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
        _configs.pageId = `page${e.currentTarget.dataset?.pageNumber || 1}`;

        const pagedPublication = PagedPublication(_scriptEl, _mainContainer);
        pagedPublication.setOptions(_configs);
        pagedPublication.render();
    };

    const render = async () => {
        _offers = await fetchOffers(0, 24);
        _container = document.createElement('div');
        _container.className = 'sgn-offers-container';
        _container.innerHTML = Mustache.render(_template, {
            offers: _offers
        });

        addSearchListener();
        addScrollListener();
        addOfferClickListener();
        // ComponentHelper.addBlockerListenerTo(_container, () => {
        //     _offers = [];
        //     _offset = 0;
        // });

        return _container;
    };

    return {render};
};

export default offerList;
