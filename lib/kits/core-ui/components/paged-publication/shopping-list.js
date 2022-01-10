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
            <li class="sgn-shopping-li">
                <div class="sgn-shopping-li-flex-container">
                    <div class="sgn-shopping-li-div-text">
                        <div class="sgn-truncate-elipsis">
                            <span>{{heading}}</span>
                        </div>
                    </div>
                    <div class="sgn-shopping-li-div-btn sgn-hide-print">
                        <div>
                            <button class="sgn-shopping-remove-item" data-id="{{index}}">Remove</button>
                        </div>
                    </div>
                    <div class="sgn-clearfix"></div>
                </div>
            </li>
            {{/offers}}
        </ol>
        <div>
            <button class="sgn-shopping-clear-list sgn-hide-print">Clear list</button>
            <button class="sgn-shopping-print-list sgn-hide-print">Print</button>
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
            offers: transformSavedOffers(clientStorage)
        });

        addRemoveItemListener();
        addClearListListener();
        addPrintListener();
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

    const addRemoveItemListener = () => {
        const removeBtns = _container.querySelectorAll(
            '.sgn-shopping-remove-item'
        );

        removeBtns.forEach((itemEl) =>
            itemEl.addEventListener('click', removeItem, false)
        );
    };

    const removeItem = (e) => {
        const clientStorage = clientLocalStorage.get(
            'paged-publication-saved-offers'
        );
        const index = e.currentTarget.dataset?.id;
        clientStorage.splice(index, 1);
        clientLocalStorage.set('paged-publication-saved-offers', clientStorage);
        _container.innerHTML = Mustache.render(_template, {
            offers: transformSavedOffers(clientStorage)
        });

        addRemoveItemListener();
        addClearListListener();
        addPrintListener();
        e.stopPropagation();
    };

    const addClearListListener = () => {
        const clearBtn = _container.querySelector('.sgn-shopping-clear-list');

        clearBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            clientLocalStorage.set('paged-publication-saved-offers', []);
            _container.innerHTML = Mustache.render(_template, {
                offers: []
            });
        });
    };

    const addPrintListener = () => {
        const printBtn = _container.querySelector('.sgn-shopping-print-list');

        printBtn.addEventListener('click', () => {
            window.print();
        });
    };

    return {render};
};

export default shoppingList;
