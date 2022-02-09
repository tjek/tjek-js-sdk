import Mustache from 'mustache';
import {request} from '../../../core';
import {formatDate, translate, transformFilter} from '../helpers/component';
import './main-container.styl';

const defaultTemplate = `\
<div class="sgn__publications">
    <ul class="sgn-publications-list-items-container">
        {{#publications}}
        <li class="sgn-publications-li">
            <div class="publications__item" data-id="{{id}}">
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
<div id="sgn-paged-publication-container"></div\
`;

const MainContainer = ({configs, template, el}) => {
    const translations = {
        localeCode: translate('locale_code'),
        untilLabel: translate('paged_publication_viewer_until_label')
    };

    const fetchPublications = async () => {
        const publications = await request({
            url: `/v2/catalogs`,
            qs: {
                dealer_id: configs.businessId,
                order_by: configs.orderBy,
                offset: 0,
                limit: 24,
                ...transformFilter(configs.requestFilter)
            }
        });

        return transformPublications(publications);
    };

    const transformPublications = (publications = []) => {
        const {localeCode} = translations;
        const filters = transformFilter(configs.clientFilter);

        return (
            publications
                ?.filter((publication) =>
                    Object.entries(filters).reduce(
                        (prev, [key, value]) =>
                            publication[key] === value && prev,
                        {}
                    )
                )
                ?.map((publication) => {
                    const dateFrom = formatDate(
                        publication?.run_from,
                        localeCode
                    );
                    const dateTill = formatDate(
                        publication?.run_till,
                        localeCode
                    );
                    return {
                        ...publication,
                        dateFrom,
                        dateTill
                    };
                }) || []
        );
    };

    const render = async () => {
        const publications = await fetchPublications();

        el.innerHTML = Mustache.render(template?.innerHTML || defaultTemplate, {
            translations,
            publications
        });
    };

    return {
        render
    };
};

export default MainContainer;
