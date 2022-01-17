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
</div>
<div id="sgn-paged-publication-container"></div\
`;

const mainContainer = ({configs, template, el}) => {
    const fetchPublications = () => {
        return new Promise((resolve) => {
            request(
                {
                    url: `/v2/catalogs`,
                    qs: {
                        dealer_id: configs.dealerId,
                        order_by: configs.orderBy,
                        offset: 0,
                        limit: 24
                    }
                },
                (err, publications) => {
                    if (!err) {
                        resolve(publications);
                    }
                }
            );
        });
    };

    const render = async () => {
        const publications = await fetchPublications();
        el.innerHTML = Mustache.render(template?.innerHTML || defaultTemplate, {
            publications
        });
    };

    return {
        render
    };
};

export default mainContainer;
