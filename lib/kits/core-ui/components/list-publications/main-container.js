import Mustache from 'mustache';
import {request} from '../../../core';
import {formatDate, translate, transformFilter} from '../helpers/component';
import './main-container.styl';

const defaultTemplate = `\
<div class="sgn__publications">
    <ul class="sgn-publications-list-items-container">
        {{#publications}}
        <li class="sgn-publications-li">
            <div class="publications__item" data-id="{{id}}" data-types="{{types}}">
                <div class="sgn-publications-list-content-img">
                    <img data-id="{{id}}" src="{{images.view}}" alt="{{label}}">
                </div>
                <div class="sgn-publications-list-content-text">
                    <div class="sgn-publications-list-content-heading">
                        <span>{{label}}</span>
                    </div>
                    <div class="sgn-publications-list-content-date">
                        <span>{{dateFrom}}-{{dateTill}}</span>
                    </div>
                </div>
            </div>
        </li>
        {{/publications}}
    </u;>
</div>
<div id="sgn-paged-publication-container"></div>
<div id="sgn-incito-publication-container"></div>
\
`;

const MainContainer = ({configs, template, el}) => {
    const translations = {
        localeCode: translate('locale_code'),
        untilLabel: translate('paged_publication_viewer_until_label')
    };

    const fetchPublications = async () =>
        transformPublications(
            await request({
                apiKey: configs.apiKey,
                coreUrl: configs.coreUrl,
                url: `/v2/catalogs`,
                qs: {
                    dealer_id: configs.businessId,
                    order_by: configs.orderBy,
                    offset: 0,
                    limit: 24,
                    types: 'paged,incito',
                    ...transformFilter(configs.requestFilter)
                }
            })
        );

    const transformPublications = (publications) => {
        const {localeCode} = translations;
        const filters = transformFilter(configs.clientFilter);

        return publications
            .filter((publication) =>
                Object.entries(filters).reduce(
                    (prev, {0: key, 1: value}) =>
                        publication[key] === value && prev,
                    {}
                )
            )
            .map((publication) => ({
                ...publication,
                dateFrom: formatDate(publication?.run_from, localeCode),
                dateTill: formatDate(publication?.run_till, localeCode)
            }));
    };

    const render = async () => {
        el.innerHTML = Mustache.render(template?.innerHTML || defaultTemplate, {
            translations,
            publications: await fetchPublications()
        });
    };

    return {render};
};

export default MainContainer;
