import Mustache from 'mustache';
import * as clientLocalStorage from '../../../../storage/client-local';
import './cart-list.styl';

const defaultTemplate = `\
    <div class="sgn-popup-contents sgn-cart-popup">
        <span>List</span>
        <ol class="sgn-cart-ol">
            {{#offers}}
            <li class="sgn-cart-li">
                <div class="sgn-cart-li-flex-container">
                    <div class="sgn-cart-li-div-text">
                        <div class="sgn-truncate-elipsis">
                            <span>{{heading}}</span>
                        </div>
                    </div>
                    <div class="sgn-cart-li-div-btn sgn-hide-print">
                        <div>
                        </div>
                    </div>
                </div>
            </li>
            {{/offers}}
        </ol>
        <div>
            <button class="sgn-cart-clear-cookie sgn-hide-print">Remove All</button>
            <button class="sgn-cart-print sgn-hide-print" onclick="printCart()">Print</button>
        </div>
    </div>\
`;

export default class CartList {
    constructor({template}) {
        this.template = template?.innerHTML || defaultTemplate;
        this.cartListBtn = document.querySelector('.sgn__offer-cart');
        this.headNav = document.querySelector('.sgn__nav');
        this.container = null;
    }

    render() {
        this.cartListBtn?.addEventListener(
            'click',
            this.showCartList.bind(this),
            false
        );
    }

    showCartList() {
        const clientStorage = clientLocalStorage.get(
            'paged-publication-saved-offers'
        );
        this.container = document.createElement('div');
        this.container.className = 'sgn-cart-container';
        this.insertAfter(this.headNav, this.container);

        this.container.innerHTML = Mustache.render(this.template, {
            offers: clientStorage
        });

        this.addWindowListener();
    }

    addWindowListener() {
        this.windowListener = this.processWindowClick.bind(this);
        window.addEventListener('click', this.windowListener, false);
    }

    processWindowClick(e) {
        e.stopPropagation();
        console.log('window clicked');
        if (!this.container.contains(e.target)) {
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
