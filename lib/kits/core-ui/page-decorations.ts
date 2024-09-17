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
        pageDecorations,
        aspectRatio
    }: {
        pageDecorations: V2PageDecoration[];
        aspectRatio: number;
    }) => {
        if (pageDecorationsContainer?.innerHTML) {
            pageDecorationsContainer.innerHTML = '';
        }

        const pageDecorationsEls = document.createElement('div');

        const filteredPageDecorations = pageDecorations?.filter(
            (pageDecor) => pageDecor?.website_link
        );

        filteredPageDecorations?.forEach((pageDecoration) => {
            if (
                pageDecoration &&
                pageDecoration.website_link &&
                getHostname(pageDecoration.website_link)
            ) {
                const el = document.createElement('div');
                const position =
                    pageDecorations?.length <= 1
                        ? 'center'
                        : pageDecoration.page_number % 2 == 0
                        ? 'left'
                        : 'right';

                const bgImgDimension = getPubImageDimension(
                    aspectRatio,
                    pageDecorations.length
                );

                el.classList.add('sgn-pagedecoration');
                el.classList.add(`sgn-pagedecoration-${position}`);
                el.innerHTML = Mustache.render(
                    pageDecorationTemplate?.innerHTML || defaultTemplate,
                    {
                        pageDecoration: {
                            ...pageDecoration,
                            hostname:
                                pageDecoration.website_link_title ||
                                getHostname(pageDecoration.website_link)
                        }
                    }
                );

                if (position === 'left') {
                    el.style.left = `calc(50% - ${bgImgDimension.width / 2}px)`;
                } else if (position === 'right') {
                    el.style.left = `calc(50% + ${bgImgDimension.width / 2}px)`;
                }

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

            const hostnameArr = url.hostname.split('.');
            const [subDomain, secondDomain, topDomain] = hostnameArr;

            return subDomain === 'www'
                ? [secondDomain, topDomain].join('.')
                : url.hostname;
        } catch (e) {
            console.log('Error:', e?.message);

            return null;
        }
    };

    const getPubImageDimension = (aspectRatio: number, pageCount: number) => {
        const versoPageSpreadEl =
            document.querySelector<HTMLElement>('.verso__scroller');
        const pageElWidth = (versoPageSpreadEl?.offsetWidth || 0) / pageCount;
        const pageElHeight = versoPageSpreadEl?.offsetHeight || 0;
        const aspectRatioWidth = pageElHeight / aspectRatio;
        const aspectRatioHeight = pageElWidth * aspectRatio;

        return {
            width:
                aspectRatioWidth < pageElWidth ? aspectRatioWidth : pageElWidth,
            height:
                aspectRatioWidth < pageElWidth
                    ? pageElHeight
                    : aspectRatioHeight,
            pageElWidth,
            pageElHeight
        };
    };

    return {render, hide, show};
};

export default PageDecorations;
