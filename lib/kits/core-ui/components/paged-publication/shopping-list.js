import Mustache from 'mustache';
import * as clientLocalStorage from '../../../../storage/client-local';
import ComponentHelpers from '../component-helpers';
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
                </div>
            </li>
            {{/offers}}
        </ol>
        <div>
            <button class="sgn-shopping-clear-list sgn-hide-print">Clear list</button>
        </div>
    </div>\
`;

export default class ShoppingList extends ComponentHelpers {
    constructor({template}) {
        super();
        this.template = template?.innerHTML || defaultTemplate;
        this.shoppingListBtn = document.querySelector('.sgn__offer-shopping');
    }

    render() {
        this.shoppingListBtn?.addEventListener(
            'click',
            this.showShoppingList.bind(this),
            false
        );
    }

    showShoppingList() {
        const clientStorage = clientLocalStorage.get(
            'paged-publication-saved-offers'
        );
        this.container = document.createElement('div');
        this.container.className = 'sgn-shopping-container';
        this.insertAfter(this.headNav, this.container);
        this.container.innerHTML = Mustache.render(this.template, {
            offers: this.transformSavedOffers(clientStorage)
        });

        this.addRemoveItemListener();
        this.addClearListLitener();
        this.addBlockerListener();
    }

    transformSavedOffers(savedOffers = []) {
        const newSavedOffers = [];
        savedOffers.forEach((offer, index) => {
            newSavedOffers.push({
                index,
                ...offer
            });
        });

        return newSavedOffers;
    }

    addRemoveItemListener() {
        const removeBtns = document.querySelectorAll(
            '.sgn-shopping-remove-item'
        );

        removeBtns.forEach((itemEl) =>
            itemEl.addEventListener('click', this.removeItem.bind(this), false)
        );
    }

    removeItem(e) {
        const clientStorage = clientLocalStorage.get(
            'paged-publication-saved-offers'
        );
        const index = e.currentTarget.dataset?.id;
        clientStorage.splice(index, 1);
        clientLocalStorage.set('paged-publication-saved-offers', clientStorage);
        this.container.innerHTML = Mustache.render(this.template, {
            offers: this.transformSavedOffers(clientStorage)
        });

        this.addRemoveItemListener();
        this.addClearListLitener();
        this.addWindowListener();
        e.stopPropagation();
    }

    addClearListLitener() {
        const clearBtn = document.querySelector('.sgn-shopping-clear-list');

        clearBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            clientLocalStorage.set('paged-publication-saved-offers', []);
            this.container.innerHTML = Mustache.render(this.template, {
                offers: []
            });
        });
    }
}
