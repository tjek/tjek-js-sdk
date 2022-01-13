import Mustache from 'mustache';
import * as clientLocalStorage from '../../../../storage/client-local';
import {ComponentHelper} from '../helpers';
import './shopping-list.styl';

const defaultTemplate = `\
    <div class="sgn-shopping-popup">
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
        </ol>
        <div>
            <button class="sgn-shopping-clear-list-btn sgn-hide-print">Clear list</button>
            <button class="sgn-shopping-print-list-btn sgn-hide-print">Print</button>
            <button class="sgn-shopping-share-list-btn sgn-hide-print">Share</button>
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
            )
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
            )
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
            notTickedStr += `[/] ${offer.name}\n`;
        });

        ticked.forEach((offer) => {
            notTickedStr += `[x] ${offer.name}\n`;
        });

        return notTickedStr;
    };

    const addEventListeners = () => {
        addTickerListener();
        addClearListListener();
        addPrintListener();
        addShareListener();
    };

    return {render};
};

export default shoppingList;
