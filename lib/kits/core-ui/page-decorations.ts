import Mustache from 'mustache';
import {V2PageDecoration} from '../core';
import './page-decorations.styl';
import PageSpread from '../../verso-browser/page_spread';
import PagedPublicationPageSpread from '../paged-publication/page-spread';

const defaultTemplate = `\

{{#pageDecoration.hotspots}}
    {{#pageDecoration.isEmbed}}
        <iframe src="{{link}}" height="100%" width="100%" title="Iframe Example" style="border:0;"></iframe>
    {{/pageDecoration.isEmbed}}
    {{^pageDecoration.isEmbed}}
    <a href="{{link}}" rel="noreferrer noopener" target="_blank">
        <div class="sgn-pagedecoration__content" style="width:100%;height:100%;border:1px solid black;">
                <p class="sgn-pagedecoration-item__domain"></p>
        </div>
    </a>
    {{/pageDecoration.isEmbed}}
{{/pageDecoration.hotspots}}
{{^pageDecoration.hotspots}}
{{#pageDecoration.website_link}}
<div class="sgn-pagedecoration__content">
    <a href="{{pageDecoration.website_link}}" rel="noreferrer noopener" target="_blank">
        <p class="sgn-pagedecoration-item__domain">{{pageDecoration.hostname}}</p>
    </a>
</div>
{{/pageDecoration.website_link}}
{{/pageDecoration.hotspots}}
\
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
        aspectRatio,
        versoPageSpread,
        versoPageSpreads,
        pageSpread,
        pageSpreads
    }: {
        pageDecorations: V2PageDecoration[];
        aspectRatio: {};
        versoPageSpread?: PageSpread;
        versoPageSpreads?: PageSpread[];
        pageSpread?: PagedPublicationPageSpread;
        pageSpreads?: PagedPublicationPageSpread[];
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
            if (pageDecoration && pageDecoration.hotspots?.length) {
                const [hotspot] = pageDecoration.hotspots;
                const versoPageSpread = versoPageSpreads?.find((pageSpread) =>
                    pageSpread.pageIds.includes(
                        `page${pageDecoration.page_number}`
                    )
                );
                const contentRect = versoPageSpread?.getContentRect();

                const pageSpreadEl = pageSpreads
                    ?.find((spread) =>
                        spread
                            .getPages()
                            .some(
                                (page) =>
                                    page.id ===
                                    `page${pageDecoration.page_number}`
                            )
                    )
                    ?.getEl();
                const boundingRect = pageSpreadEl?.getBoundingClientRect();

                const el = document.createElement('div');
                el.classList.add('sgn-pagedecoration-container');
                const position =
                    filteredPageDecorations?.length <= 1
                        ? 'center'
                        : pageDecoration.page_number % 2 == 0
                        ? 'left'
                        : 'right';

                el.classList.add('sgn-pagedecoration-hotspot');
                el.classList.add(`sgn-pagedecoration-${position}`);

                let x1 = hotspot.x1;
                let x2 = hotspot.x2;

                if (versoPageSpread?.pageIds?.length == 2 && contentRect) {
                    contentRect.width = contentRect?.width / 2;
                    if (
                        versoPageSpread?.pageIds?.indexOf(
                            `page${pageDecoration.page_number}`
                        )
                    ) {
                        x1 += 1;
                        x2 += 1;
                    }
                }

                let top = Math.round(
                    ((contentRect?.height || 0) / 100) * (hotspot.y1! * 100)
                );

                let left = Math.round(
                    ((contentRect?.width || 0) / 100) * (x1 * 100)
                );

                const width = Math.round(
                    ((contentRect?.width || 0) / 100) * ((x2 - x1) * 100)
                );

                const height = Math.round(
                    ((contentRect?.height || 0) / 100) *
                        ((hotspot.y2 - hotspot.y1) * 100)
                );

                top += Math.round(contentRect?.top || 0);
                left += Math.round(contentRect?.left || 0);
                // top -= boundingRect?.top || 0;
                left -= boundingRect?.left || 0;

                el.style.top = `${top}px`;
                el.style.left = `${left}px`;
                el.style.width = `${width}px`;
                el.style.height = `${height}px`;

                el.innerHTML = Mustache.render(
                    pageDecorationTemplate?.innerHTML || defaultTemplate,
                    {
                        pageDecoration: {
                            ...pageDecoration,
                            hostname:
                                pageDecoration.website_link_title ||
                                getHostname(pageDecoration?.website_link || ''),
                            isEmbed:
                                pageDecoration?.hotspots?.[0]?.type?.toLowerCase() ===
                                'embed',
                            width: `${width}px`,
                            height: `${height}px`
                        }
                    }
                );

                pageDecorationsEls?.appendChild(el);
            } else if (
                pageDecoration &&
                pageDecoration.website_link &&
                getHostname(pageDecoration.website_link)
            ) {
                const el = document.createElement('div');
                const position =
                    filteredPageDecorations?.length <= 1
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

    const getPubImageDimension = (aspectRatio, pageCount) => {
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
