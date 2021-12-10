import Mustache from 'mustache';
import {request} from '../../core';
import SGN from '../../../sgn-sdk';
import './offer-list.styl';

const defaultTemplate = `\
    <div class="sgn-scroll-contents">
        <div>
            <input type="text" id="sgn-offers-search-text" name="sgn-offers-search-text" placeholder="Search...">
        </div>
        <ol class="sgn-offers-ol">
            {{#offers}}
            <li class="sgn-offers-li">
                <div class="sgn-offers-li-flex-container">
                    <div class="sgn-offers-li-div-img">
                        <img src="{{images.thumb}}">
                    </div>
                    <div class="sgn-offers-li-div-text">
                        <div class="sgn-truncate-elipsis">
                            <span class="sgn-offers-text-heading">{{heading}}</span>
                        </div>
                        <div>
                            <span class="sgn-offers-text-description">{{description}}</span>
                        </div>
                    </div>
                </div>
            </li>
            {{/offers}}
        </ol>
    </div>\
`;

export default class OfferList {
    constructor(options = {}) {
        this.options = options;
        this.offerListBtn = document.querySelector('.sgn__offer-list');
        this.container = null;
    }

    render() {
        this.offerListBtn?.addEventListener(
            'click',
            this.showOfferList.bind(this),
            false
        );
    }

    async showOfferList() {
        const offers = await this.fetchOffers(0, 24);

        this.container = document.createElement('div');
        this.container.className = 'sgn-offers-dd sgn-block-hidden';
        this.insertAfter(this.offerListBtn, this.container);

        const template = this.options.template?.innerHTML || defaultTemplate;
        this.container.innerHTML = Mustache.render(template, {offers});

        this.addWindowListener();
        return this;
    }

    addWindowListener() {
        window.addEventListener(
            'click',
            (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!this.container.contains(e.target)) {
                    this.destroy();
                }
            },
            false
        );
    }

    fetchOffers(offset = 0, limit = 24) {
        return new Promise((resolve) => {
            request(
                {
                    url: '/v2/offers',
                    qs: {
                        dealer_id: SGN.config.get('businessId'),
                        catalogId: SGN.config.get('publicationId'),
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
    }

    destroy() {
        this.container?.parentNode?.removeChild(this.container);
    }

    insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(
            newNode,
            referenceNode.nextSibling
        );
    }
}
