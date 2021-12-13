import Mustache from 'mustache';
import {request} from '../../core';
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
                </div>
            </li>
            {{/offers}}
        </ol>
    </div>\
`;

export default class OfferList {
    constructor({configs = {}, template}) {
        this.configs = configs;
        this.template = template?.innerHTML || defaultTemplate;
        this.offerListBtn = document.querySelector('.sgn__offer-list');
        this.container = null;
        this.offers = [];
        this.offset = 0;
        this.limit = 24;
    }

    render() {
        this.offerListBtn?.addEventListener(
            'click',
            this.showOfferList.bind(this),
            false
        );
    }

    async showOfferList() {
        this.offers = await this.fetchOffers(0, 24);

        this.container = document.createElement('div');
        this.container.className = 'sgn-offers-dd sgn-block-hidden';
        this.insertAfter(this.offerListBtn, this.container);

        this.container.innerHTML = Mustache.render(this.template, {
            offers: this.offers
        });

        this.addScrollListener();
        this.addWindowListener();
        return this;
    }

    addScrollListener() {
        const offerOl = document.querySelector('.sgn-offers-ol');
        offerOl.addEventListener('scroll', this.fetchOnScrollEnd.bind(this));
    }

    async fetchOnScrollEnd(e) {
        const offerOl = e.target;

        if (offerOl.scrollHeight - offerOl.scrollTop === offerOl.clientHeight) {
            const offerLiTemplate = `{{#offers}}${
                this.template.match(
                    /(?<=\{\{\#offers\}\}\s+).*?(?=\s+\{\{\/offers\}\})/gs
                )[0]
            }{{/offers}}`;

            this.offers = await this.fetchOffers(
                (this.offset += this.limit),
                this.limit
            );

            offerOl.innerHTML += Mustache.render(offerLiTemplate, {
                offers: this.offers
            });
        }
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
                        dealer_id: this.configs.dealerId,
                        catalogId: this.configs.id,
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
