import Mustache from 'mustache';
import {request} from '../../../core';
import {ComponentHelper} from '../helpers';
import './offer-list.styl';

const defaultTemplate = `\
    <div class="sgn-scroll-contents">
        <div class="sgn-popup-header">
            <span>Offer List</span>
        </div>
        <div class="sgn-offers-search-container">
            <input type="text" id="sgn-offers-search-text" class="sgn-offers-search-text" name="sgn-offers-search-text" placeholder="Search...">
        </div>
        <ol class="sgn-offers-ol">
            {{#offers}}
            <li class="sgn-offers-li">
                <div class="sgn-offers-li-flex-container">
                    <div class="sgn-offers-li-div-img">
                        <img src="{{images.thumb}}" alt="{{heading}}">
                    </div>
                    <div class="sgn-offers-li-div-text">
                        <div class="sgn-truncate-elipsis">
                            <span class="sgn-offers-text-heading">{{heading}}</span>
                        </div>
                        <div>
                            <span class="sgn-offers-text-description">{{description}}</span>
                        </div>
                    </div>
                    <div class="sgn-clearfix"></div>
                </div>
            </li>
            {{/offers}}
        </ol>
    </div>\
`;

const offerList = ({configs = {}, template}) => {
    const _configs = configs;
    const _template = template?.innerHTML || defaultTemplate;
    const _offerTemplate = _template.match(
        /(?={{#offers}}).*({{\/offers}})/gs
    )?.[0];
    const _headNav = document.querySelector('.sgn__nav');
    const _offerListBtn = document.querySelector('.sgn__offer-list');
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
        }
    };

    const fetchOnSearch = async (e) => {
        _searchKey = e.target.value || '';
        const offerOl = _container.querySelector('.sgn-offers-ol');
        const offersRes = await fetchSearch(_searchKey);

        offerOl.innerHTML = Mustache.render(_offerTemplate, {
            offers: _searchKey ? offersRes : _offers
        });
    };

    const addScrollListener = () => {
        const offerOl = _container.querySelector('.sgn-offers-ol');
        offerOl.addEventListener('scroll', fetchOnScrollEnd);
    };

    const addSearchListener = () => {
        const offerOl = document.querySelector('.sgn-offers-search-text');
        offerOl.addEventListener('input', fetchOnSearch);
    };

    const overrideDestroyEvent = () => {
        const componentDestroy = ComponentHelper.destroy;

        ComponentHelper.destroy = (e) => {
            _offers = [];
            _offset = 0;
            return componentDestroy(e);
        };
    };

    const showOfferList = async () => {
        _offers = await fetchOffers(0, 24);
        _container = document.createElement('div');
        _container.className = 'sgn-offers-container';
        ComponentHelper.insertAfter(_headNav, _container);

        _container.innerHTML = Mustache.render(_template, {
            offers: _offers
        });

        addSearchListener();
        addScrollListener();
        overrideDestroyEvent();
        ComponentHelper.addBlockerListenerTo(_container);
    };

    const render = () => {
        _offerListBtn?.addEventListener('click', showOfferList, false);
    };

    return {render};
};

export default offerList;
