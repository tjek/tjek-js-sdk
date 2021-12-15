import Mustache from 'mustache';
import './main-container.styl';
import {request} from '../../../core';

const defaultTemplate = `\
<div class="sgn__publications">
    {{#publications}}
    <div class="publications__item" data-id="{{id}}">
        <img data-id="{{id}}" src="{{images.view}}">
    </div>
    {{/publications}}
</div>\
`;

export default class MainContainer {
    constructor({configs, template, el}) {
        this.configs = configs;
        this.template = template;
        this.el = el;
    }

    async render() {
        const template = this.template?.innerHTML || defaultTemplate;
        const publications = await this.fetchPublications();
        this.el.innerHTML = Mustache.render(template, {publications});
        return this;
    }

    fetchPublications() {
        return new Promise((resolve) => {
            request(
                {
                    url: `/v2/catalogs`,
                    qs: {
                        dealer_id: this.configs.dealerId,
                        order_by: this.configs.orderBy,
                        offset: 0,
                        limit: 4
                    }
                },
                (err, publications) => {
                    if (!err) {
                        resolve(publications);
                    }
                }
            );
        });
    }
}
