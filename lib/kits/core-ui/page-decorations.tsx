import {Fragment, RefObject, h} from 'preact';
import {useImperativeHandle, useState} from 'preact/hooks';
import type {V2PageDecoration} from '../core';
import './page-decorations.styl';

const getPubImageDimension = (aspectRatio: number, pageCount: number) => {
    const versoPageSpreadEl =
        document.querySelector<HTMLElement>('.verso__scroller');
    const pageElWidth = (versoPageSpreadEl?.offsetWidth || 0) / pageCount;
    const pageElHeight = versoPageSpreadEl?.offsetHeight || 0;
    const aspectRatioWidth = pageElHeight / aspectRatio;
    const aspectRatioHeight = pageElWidth * aspectRatio;

    return {
        width: aspectRatioWidth < pageElWidth ? aspectRatioWidth : pageElWidth,
        height:
            aspectRatioWidth < pageElWidth ? pageElHeight : aspectRatioHeight,
        pageElWidth,
        pageElHeight
    };
};

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

export default function PageDecorationsComponent({
    pageDecorations,
    aspectRatio,
    handleRef
}: {
    pageDecorations: V2PageDecoration[];
    aspectRatio: number;
    handleRef: RefObject<{show: () => void; hide: () => void}>;
}) {
    const [isHidden, setIsHidden] = useState<boolean>(false);

    useImperativeHandle(handleRef, () => ({
        hide: () => setIsHidden(true),
        show: () => setIsHidden(false)
    }));

    return (
        <>
            {pageDecorations
                .filter(
                    (pageDecor, index, self) =>
                        index ===
                        self.findIndex(
                            (pd) => pd.website_link == pageDecor.website_link
                        )
                )
                .map((pageDecoration) => {
                    if (
                        !pageDecoration.website_link ||
                        !getHostname(pageDecoration.website_link)
                    ) {
                        return null;
                    }

                    const position =
                        pageDecorations?.length <= 1
                            ? 'center'
                            : pageDecoration.page_number % 2 == 0
                            ? 'left'
                            : 'right';

                    return (
                        <div
                            data-preact
                            class={`sgn-pagedecoration sgn-pagedecoration-${position} ${
                                isHidden ? 'sgn-pagedecoration-hidden' : ''
                            }`}
                            key={position}
                            style={{
                                left:
                                    position === 'left'
                                        ? `calc(50% - ${
                                              getPubImageDimension(
                                                  aspectRatio,
                                                  pageDecorations.length
                                              ).width / 2
                                          }px)`
                                        : position === 'right'
                                        ? `calc(50% + ${
                                              getPubImageDimension(
                                                  aspectRatio,
                                                  pageDecorations.length
                                              ).width / 2
                                          }px)`
                                        : undefined
                            }}
                        >
                            <div class="sgn-pagedecoration__content">
                                <a
                                    href={pageDecoration.website_link}
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
                                    <p class="sgn-pagedecoration-item__domain">
                                        {getHostname(
                                            pageDecoration.website_link
                                        )}
                                    </p>
                                </a>
                            </div>
                        </div>
                    );
                })}
        </>
    );
}
