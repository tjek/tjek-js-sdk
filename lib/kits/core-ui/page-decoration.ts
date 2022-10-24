import Mustache from 'mustache';
import {V2PageDecoration} from '../core';
import './page-decoration.styl';

const defaultTemplate = `\
{{#pageDecoration.website_link}}
<div class="sgn-pagedecoration__menu">
    <div class="sgn-pagedecoration__content">
        <ul>
            <li data-index="0">
                <a href="{{pageDecoration.website_link}}" rel="noreferrer noopener" target="_blank">
                    <p class="sgn-pagedecoration-item__header">{{header}}</p>
                    <p class="sgn-pagedecoration-item__domain">{{pageDecoration.urlOrigin}}</p>
                </a>
            </li>
        </ul>
    </div>
</div>
{{/pageDecoration.website_link}}\
`;

const PageDecoration = ({
    header,
    template,
    x,
    y,
    pageDecoration
}: {
    header?: string;
    template?: string;
    x: number;
    y: number;
    pageDecoration: V2PageDecoration;
}) => {
    const render = () => {
        const el = document.createElement('div');

        el.className = 'sgn-pagedecoration';
        el.setAttribute('tabindex', '-1');
        el.innerHTML = Mustache.render(template || defaultTemplate, {
            header,
            pageDecoration: {
                ...pageDecoration,
                urlOrigin: getUrlOrigin(pageDecoration?.website_link)
            }
        });

        return el;
    };

    const getUrlOrigin = (link = '') => {
        try {
            const url = new URL(link);

            return url.origin;
        } catch (e) {
            return '';
        }
    };

    return {render};
};

export default PageDecoration;
