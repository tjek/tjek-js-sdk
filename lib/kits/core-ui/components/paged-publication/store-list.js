import Mustache from 'mustache';
import {request} from '../../../core';
import ComponentHelpers from '../component-helpers';
import './store-list.styl';

const defaultTemplate = `\
    <div class="sgn-scroll-contents">
        <div class="sgn-popup-header">
            <span>Store List</span>
        </div>
        <ol class="sgn-stores-ol">
            {{#stores}}
            <li class="sgn-stores-li">
                <div class="sgn-stores-li-flex-container">
                    <div class="sgn-stores-li-div-text">
                        <div class="sgn-truncate-elipsis">
                            <span class="sgn-stores-text-heading">{{street}}</span>
                        </div>
                        <div>
                            <span class="sgn-stores-text-description">{{zip_code}} {{city}}</span>
                        </div>
                    </div>
                </div>
            </li>
            {{/stores}}
        </ol>
    </div>\
`;

export default class StoreList extends ComponentHelpers {
    constructor({configs = {}, template, scriptEls}) {
        super();
        this.configs = configs;
        this.template = template?.innerHTML || defaultTemplate;
        this.scriptEls = scriptEls;
        this.storeListBtn = document.querySelector('.sgn__store-list');
        this.container = null;
        this.stores = [];
        this.offset = 0;
        this.limit = 24;
        this.storeTemplate = this.getStoreTemplate();
    }

    render() {
        this.storeListBtn?.addEventListener(
            'click',
            this.showStoreList.bind(this),
            false
        );
    }

    async showStoreList() {
        this.stores = await this.fetchStores(0, 24);
        this.container = document.createElement('div');
        this.container.className = 'sgn-stores-container';
        this.insertAfter(this.headNav, this.container);

        this.container.innerHTML = Mustache.render(this.template, {
            stores: this.stores
        });

        this.addScrollListener();
        this.addBlockerListener();
    }

    addScrollListener() {
        const storeOl = this.container.querySelector('.sgn-stores-ol');
        storeOl.addEventListener('scroll', this.fetchOnScrollEnd.bind(this));
    }

    async fetchOnScrollEnd(e) {
        const storeOl = e.target;

        if (storeOl.scrollHeight - storeOl.scrollTop === storeOl.clientHeight) {
            const stores = await this.fetchStores(
                (this.offset += this.limit),
                this.limit
            );

            this.stores = this.stores.concat(stores);

            storeOl.innerHTML += Mustache.render(this.storeTemplate, {
                stores
            });
        }
    }

    fetchStores(offset = 0, limit = 24) {
        return new Promise((resolve) => {
            request(
                {
                    url: '/v2/stores',
                    qs: {
                        dealer_id: this.configs.dealerId,
                        catalogId: this.configs.id,
                        offset,
                        limit,
                        r_lat: this.scriptEls.storeLatitude,
                        r_lng: this.scriptEls.storeLongitude
                    }
                },
                (err, stores) => {
                    if (!err) {
                        resolve(stores);
                    }
                }
            );
        });
    }

    getStoreTemplate() {
        return `{{#stores}}${
            this.template.match(
                /(?<={{#stores}}\s+).*?(?=\s+{{\/stores}})/gs
            )[0]
        }{{/stores}}`;
    }

    destroy(e) {
        this.stores = [];
        this.offset = 0;

        super.destroy(e);
    }
}
