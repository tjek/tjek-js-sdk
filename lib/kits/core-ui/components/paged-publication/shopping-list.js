import Mustache from 'mustache';
import * as clientLocalStorage from '../../../../storage/client-local';
import './shopping-list.styl';

const defaultTemplate = `\
    <div class="sgn-shopping-popup">
        <span>Shopping List</span>
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
                        </div>
                    </div>
                </div>
            </li>
            {{/offers}}
        </ol>
        <div>
            <button class="sgn-shopping-clear-cookie sgn-hide-print">Remove All</button>
        </div>
    </div>\
`;

export default class CartList {
    constructor({template}) {
        this.template = template?.innerHTML || defaultTemplate;
        this.shoppingListBtn = document.querySelector('.sgn__offer-shopping');
        this.headNav = document.querySelector('.sgn__nav');
        this.container = null;
        this.shown = false;
    }

    render() {
        this.shoppingListBtn?.addEventListener(
            'click',
            this.showCartList.bind(this),
            false
        );
    }

    showCartList(e) {
        if (!this.shown) {
            const clientStorage = clientLocalStorage.get(
                'paged-publication-saved-offers'
            );
            this.container = document.createElement('div');
            this.container.className = 'sgn-shopping-container';
            this.insertAfter(this.headNav, this.container);

            this.container.innerHTML = Mustache.render(this.template, {
                offers: clientStorage
            });
            this.shown = true;
            e.stopPropagation();
            this.addWindowListener();
        }
    }

    addWindowListener() {
        if (this.shown) {
            this.windowListener = this.processWindowClick.bind(this);
            window.addEventListener('click', this.windowListener, false);
        }
    }

    processWindowClick(e) {
        e.stopPropagation();
        if (!this.container.contains(e.target)) {
            this.shown = false;
            this.destroy();
        }
    }

    destroy() {
        window.removeEventListener('click', this.windowListener, false);
        this.container?.parentNode?.removeChild(this.container);
    }

    insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(
            newNode,
            referenceNode.nextSibling
        );
    }
}
