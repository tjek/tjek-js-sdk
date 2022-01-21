import Mustache from 'mustache';
import {request} from '../../../core';
import {ComponentHelper, translate} from '../helpers';
import './main-container.styl';

const defaultTemplate = `\
<div class="sgn__publications">
    {{#publications}}
    <div class="publications__item" data-id="{{id}}">
        <img data-id="{{id}}" src="{{images.view}}">
        <div>
            <div>
                <span>{{label}}</span>
            </div>
            <div>
                <span>{{translations.untilLabel}} {{date_till}}</span>
            </div>
        </div>
    </div>
    {{/publications}}
</div>
<div id="sgn-paged-publication-container"></div\
`;

const mainContainer = ({configs, template, el}) => {
    const _translations = {
        localeCode: translate('locale_code'),
        untilLabel: translate('paged_publication_viewer_until_label')
    };

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
                        console.log(transformPublications(publications));
                        resolve(transformPublications(publications));
                    }
                }
            );
        });
    };

    const transformPublications = (publications = []) => {
        const {localeCode} = _translations;

        return (
            publications?.map((publication) => {
                const date_from = ComponentHelper.formatDate(
                    publication?.run_from,
                    localeCode
                );
                const date_till = ComponentHelper.formatDate(
                    publication?.run_till,
                    localeCode
                );
                return {
                    ...publication,
                    date_from,
                    date_till
                };
            }) || []
        );
    };

    const render = async () => {
        const publications = await fetchPublications();

        el.innerHTML = Mustache.render(template?.innerHTML || defaultTemplate, {
            translations: _translations,
            publications
        });
    };

    return {
        render
    };
};

export default mainContainer;
