import Mustache from 'mustache';
import {request} from '../../../core';
import {ComponentHelper, translate} from '../helpers';
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
                        <span>{{date_from}}-{{date_till}}</span>
                    </div>
                </div>
            </div>
        </li>
        {{/publications}}
    </u;>
</div>
<div id="sgn-paged-publication-container"></div\
`;

const mainContainer = ({configs, template, el}) => {
    const translations = {
        localeCode: translate('locale_code'),
        untilLabel: translate('paged_publication_viewer_until_label')
    };

    const fetchPublications = () => {
        return new Promise((resolve) => {
            request(
                {
                    url: `/v2/catalogs`,
                    qs: {
                        dealer_id: configs.businessId,
                        order_by: configs.orderBy,
                        offset: 0,
                        limit: 24
                    }
                },
                (err, publications) => {
                    if (!err) {
                        resolve(transformPublications(publications));
                    }
                }
            );
        });
    };

    const transformPublications = (publications = []) => {
        const {localeCode} = translations;

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
            translations,
            publications
        });
    };

    return {
        render
    };
};

export default mainContainer;
