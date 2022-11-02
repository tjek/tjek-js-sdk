import Mustache from 'mustache';
import {V2PageDecoration} from '../core';
import './page-decorations.styl';

const defaultTemplate = `\
{{#pageDecoration.website_link}}
<div class="sgn-pagedecoration__content">
    <a href="{{pageDecoration.website_link}}" rel="noreferrer noopener" target="_blank">
        <p class="sgn-pagedecoration-item__domain">{{pageDecoration.hostname}}</p>
    </a>
</div>
{{/pageDecoration.website_link}}\
`;

const PageDecorations = () => {
    const pageDecorationsContainer = document.querySelector<HTMLDivElement>(
        '.sgn-page_decorations'
    );
    const pageDecorationTemplate = document.getElementById(
        'sgn-sdk-paged-publication-viewer-page-decorations-template'
    );

    const render = ({
        pageDecorations
    }: {
        pageDecorations: V2PageDecoration[];
    }) => {
        if (pageDecorationsContainer?.innerHTML) {
            pageDecorationsContainer.innerHTML = '';
        }

        const pageDecorationsEls = document.createElement('div');

        const filteredPageDecorations = pageDecorations?.filter(
            (pageDecor, index, self) =>
                index ===
                self.findIndex(
                    (pd) => pd?.website_link == pageDecor?.website_link
                )
        );

        filteredPageDecorations?.forEach((pageDecoration) => {
            if (pageDecoration && getHostname(pageDecoration?.website_link)) {
                const el = document.createElement('div');
                const position =
                    filteredPageDecorations?.length <= 1
                        ? 'center'
                        : pageDecoration.page_number % 2 == 0
                        ? 'left'
                        : 'right';

                el.classList.add('sgn-pagedecoration');
                el.classList.add(`sgn-pagedecoration-${position}`);
                el.innerHTML = Mustache.render(
                    pageDecorationTemplate?.innerHTML || defaultTemplate,
                    {
                        pageDecoration: {
                            ...pageDecoration,
                            hostname: getHostname(pageDecoration?.website_link)
                        }
                    }
                );

                pageDecorationsEls?.appendChild(el);
            }
        });

        pageDecorationsContainer?.appendChild(pageDecorationsEls);

        return pageDecorationsContainer;
    };

    const hide = () =>
        pageDecorationsContainer?.classList.add('sgn-pagedecoration-hidden');

    const show = () =>
        pageDecorationsContainer?.classList.remove('sgn-pagedecoration-hidden');

    const getHostname = (link = '') => {
        try {
            const url = new URL(link);

            return url.hostname;
        } catch (e) {
            console.log('Error:', e?.message);

            return null;
        }
    };

    return {render, hide, show};
};

export default PageDecorations;
