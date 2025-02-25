import Mustache from 'mustache';
import './main-container.styl';
import {translate} from '../helpers/component';

const defaultTemplate = `\
<div class="sgn__publications">
    <ul class="sgn-publications-list-items-container">
        {{#publications}}
        <li class="sgn-publications-li" data-status="{{status}}">
            <div class="publications__item" data-id="{{id}}" tabindex="0" aria-label="{{label}}; {{translations.validFrom}} {{dateReaderFrom}} {{translations.till}} {{dateReaderTill}}">
                <div class="sgn-publications-list-content-img">
                    <img data-id="{{id}}" src="{{images.view}}" alt="{{label}}">
                    <div class="sgn-publications-list-content-status">
                        <span>{{upcomingLabel}}</span>
                    </div>
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
<div id="sgn-publication-viewer-container"></div>
\
`;

const MainContainer = ({publications, template, el}) => {
    const translations = {
        upcoming: translate('publication_viewer_upcoming'),
        validFrom: translate('publication_viewer_offer_valid_from'),
        till: translate('publication_viewer_until_label')
    };

    const render = () => {
        el.innerHTML = Mustache.render(template?.innerHTML || defaultTemplate, {
            publications,
            translations,
            upcomingLabel: function () {
                return this.status === 'inactive' ? translations.upcoming : '';
            }
        });
    };

    return {render};
};

export default MainContainer;
