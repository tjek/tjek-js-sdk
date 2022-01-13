import Mustache from 'mustache';
import * as clientLocalStorage from '../../../../storage/client-local';
import {ComponentHelper} from '../helpers';
import './shopping-list.styl';

const defaultTemplate = `\
    <div class="sgn-shopping-popup">    
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
        <div class="sgn-popup-header">
            <span>Shopping List</span>
        </div>
        <ol class="sgn-shopping-ol">
            {{#offers}}
            <li class="sgn-shopping-li" data-id="{{index}}">
                <div class="sgn-shopping-li-flex-container">
                    <div class="sgn-shopping-li-div-text">
                        <div class="sgn-shopping-li-div-text-heading sgn-truncate-elipsis">
                            <span>{{name}}</span>
                        </div>
                    </div>
                </div>
            </li>
            {{/offers}}
            {{#tickedOffers}}
            <li class="sgn-shopping-li sgn-shopping-li-ticked" data-id="{{index}}">
                <div class="sgn-shopping-li-flex-container">
                    <div class="sgn-shopping-li-div-text">
                        <div class="sgn-shopping-li-div-text-heading sgn-truncate-elipsis">
                            <span>{{name}}</span>
                        </div>
                    </div>
                </div>
            </li>
            {{/tickedOffers}}
            {{#hasTicked}}
            <li class="sgn-shopping-li-crossed sgn-hide-print">
                <button class="sgn-shopping-clear-ticked-list-btn sgn-hide-print">Delete crossed out items</button>
            </li>
            {{/hasTicked}}
        </ol>
        <div>
            <button class="sgn-shopping-clear-list-btn sgn-hide-print">Clear list</button>
            <button class="sgn-shopping-print-list-btn sgn-hide-print">Print</button>
        </div>
    </div>\
`;

const shoppingList = ({template}) => {
    const _template = template?.innerHTML || defaultTemplate;
    const _headNav = document.querySelector('.sgn__nav');
    const _shoppingListBtn = document.querySelector('.sgn__offer-shopping');
    let _container = null;

    const render = () => {
        _shoppingListBtn?.addEventListener('click', showShoppingList, false);
    };

    const showShoppingList = () => {
        const clientStorage = clientLocalStorage.get(
            'paged-publication-saved-offers'
        );
        _container = document.createElement('div');
        _container.className = 'sgn-shopping-container';
        ComponentHelper.insertAfter(_headNav, _container);
        _container.innerHTML = Mustache.render(_template, {
            offers: transformSavedOffers(clientStorage).filter(
                (offer) => !offer.is_ticked
            ),
            tickedOffers: transformSavedOffers(clientStorage).filter(
                (offer) => offer.is_ticked
            ),
            hasTicked:
                transformSavedOffers(clientStorage).filter(
                    (offer) => offer.is_ticked
                ).length > 0
        });

        if (!navigator.canShare) {
            const shareBtn = _container.querySelector(
                '.sgn-shopping-share-list-btn'
            );
            shareBtn.parentNode.removeChild(shareBtn);
        }

        addEventListeners();
        ComponentHelper.addBlockerListenerTo(_container);
    };

    const transformSavedOffers = (savedOffers = []) => {
        const newSavedOffers = [];
        savedOffers.forEach((offer, index) => {
            newSavedOffers.push({
                index,
                ...offer
            });
        });

        return newSavedOffers;
    };

    const addTickerListener = () => {
        const offerList = _container.querySelectorAll('.sgn-shopping-li');

        offerList.forEach((itemEl) => {
            itemEl?.addEventListener('click', tickOffer, false);
        });
    };

    const tickOffer = (e) => {
        const clientStorage = clientLocalStorage.get(
            'paged-publication-saved-offers'
        );
        const index = e.currentTarget.dataset?.id;

        clientStorage[index].is_ticked = clientStorage[index].is_ticked
            ? false
            : true;
        clientLocalStorage.set('paged-publication-saved-offers', clientStorage);
        _container.innerHTML = Mustache.render(_template, {
            offers: transformSavedOffers(clientStorage).filter(
                (offer) => !offer.is_ticked
            ),
            tickedOffers: transformSavedOffers(clientStorage).filter(
                (offer) => offer.is_ticked
            ),
            hasTicked:
                transformSavedOffers(clientStorage).filter(
                    (offer) => offer.is_ticked
                ).length > 0
        });

        addEventListeners();
        e.stopPropagation();
    };

    const addClearListListener = () => {
        const clearBtn = _container.querySelector(
            '.sgn-shopping-clear-list-btn'
        );

        clearBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            clientLocalStorage.set('paged-publication-saved-offers', []);
            _container.innerHTML = Mustache.render(_template, {
                offers: []
            });
            addEventListeners();
        });
    };

    const addClearTickedListListener = () => {
        const clearTickedBtn = _container.querySelector(
            '.sgn-shopping-clear-ticked-list-btn'
        );
        const clientStorage = clientLocalStorage.get(
            'paged-publication-saved-offers'
        );
        const validOffers = clientStorage.filter((offer) => !offer.is_ticked);

        clearTickedBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            clientLocalStorage.set(
                'paged-publication-saved-offers',
                validOffers
            );
            _container.innerHTML = Mustache.render(_template, {
                offers: transformSavedOffers(validOffers)
            });
            addEventListeners();
        });
    };

    const addPrintListener = () => {
        const printBtn = _container.querySelector(
            '.sgn-shopping-print-list-btn'
        );

        printBtn?.addEventListener('click', () => {
            window.print();
        });
    };

    const addShareListener = () => {
        const shareBtn = _container.querySelector(
            '.sgn-shopping-share-list-btn'
        );
        const clientStorage = clientLocalStorage.get(
            'paged-publication-saved-offers'
        );
        const textData = transformListToShare(
            transformSavedOffers(clientStorage)
        );

        const shareData = {
            title: 'My Shopping List',
            text: textData,
            url: document.location.href
        };

        shareBtn?.addEventListener('click', () => {
            if (navigator.share) {
                navigator
                    .share(shareData)
                    .then(() => {
                        console.log('Shared data:', shareData);
                    })
                    .catch(console.error);
            }
        });
    };

    const transformListToShare = (data = []) => {
        let notTickedStr = '';
        const notTicked = transformSavedOffers(data).filter(
            (offer) => !offer.is_ticked
        );
        const ticked = transformSavedOffers(data).filter(
            (offer) => offer.is_ticked
        );

        notTicked.forEach((offer) => {
            notTickedStr += `[] ${offer.name}\n`;
        });

        ticked.forEach((offer) => {
            notTickedStr += `[x] ${offer.name}\n`;
        });

        return notTickedStr;
    };

    const addEventListeners = () => {
        addTickerListener();
        addClearTickedListListener();
        addClearListListener();
        addPrintListener();
        addShareListener();
    };

    return {render};
};

export default shoppingList;
