import {request, V2Catalog, V2Hotspot, V2Page, V2PageDecoration} from '../core';
import type {Tracker} from '../events';
import Viewer, {ViewerInit} from './viewer';

interface BootstrapperInit {
    el: HTMLElement;
    id: string;
    pageId: string;
    eventTracker: Tracker;
    apiKey: string;
    coreUrl: string;
    keyboard: 'disabled' | 'enabled' | 'global';
}
export default class Bootstrapper {
    options: BootstrapperInit;
    constructor(options = {}) {
        //@ts-expect-error
        this.options = options;
    }

    createViewer(
        data: {details: V2Catalog; pages: V2Page[]},
        viewerOptions?: Partial<ViewerInit>
    ) {
        return new Viewer(this.options.el!, {
            id: this.options.id,
            ownedBy: data.details.dealer_id,
            color: '#' + data.details.branding.pageflip.color,
            hotspotRatio: data.details.dimensions.height,
            keyboard: this.options.keyboard ?? 'enabled',
            pageId: this.options.pageId,
            eventTracker: this.options.eventTracker,
            pages: data.pages.map(({view, zoom}, i) => {
                const pageNumber = i + 1;

                return {
                    id: 'page' + pageNumber,
                    label: String(pageNumber),
                    pageNumber,
                    images: {medium: view, large: zoom}
                };
            }),
            ...viewerOptions
        });
    }

    applyHotspots(viewer: Viewer, hotspots: V2Hotspot[]) {
        viewer.applyHotspots(
            hotspots.reduce((obj, hotspot) => {
                obj[hotspot.id] = hotspot;

                return obj;
            }, {})
        );
    }

    async fetch(callback?: Parameters<typeof request>[1]) {
        try {
            const {0: details, 1: pages} = await Promise.all([
                this.fetchDetails(),
                this.fetchPages()
            ]);

            if (!details || !pages) throw new Error();

            const data = {details, pages};
            if (typeof callback === 'function') callback(null, data);

            return data;
        } catch (error) {
            if (typeof callback === 'function') {
                callback(error);
            } else {
                throw error;
            }
        }
    }

    fetchDetails = (callback?: Parameters<typeof request>[1]) =>
        request<V2Catalog>(
            {
                apiKey: this.options.apiKey,
                coreUrl: this.options.coreUrl,
                url: `/v2/catalogs/${this.options.id}`
            },
            callback
        );

    fetchPages = (callback?: Parameters<typeof request>[1]) =>
        request<V2Page[]>(
            {
                apiKey: this.options.apiKey,
                coreUrl: this.options.coreUrl,
                url: `/v2/catalogs/${this.options.id}/pages`
            },
            callback
        );

    fetchHotspots = (callback?: Parameters<typeof request>[1]) =>
        request<V2Hotspot[]>(
            {
                apiKey: this.options.apiKey,
                coreUrl: this.options.coreUrl,
                url: `/v2/catalogs/${this.options.id}/hotspots`
            },
            callback
        );

    fetchPageDecorations = (callback?: Parameters<typeof request>[1]) =>
        request<V2PageDecoration[]>(
            {
                apiKey: this.options.apiKey,
                coreUrl: this.options.coreUrl,
                url: `/v2/catalogs/${this.options.id}/page_decorations`
            },
            callback
        );

    applyPageDecorations(viewer: Viewer, pageDecorations: V2PageDecoration[]) {
        pageDecorations = [
            {
                page_number: 1,
                title: 'Title for page 1',
                website_link: 'https://shop.rema1000.dk/varer/304718'
            },
            {
                page_number: 2,
                title: 'Title for page 2',
                website_link: 'https://shop.rema1000.dk/varer/304718',
                website_link_title: 'Rema1000'
            },
            {
                page_number: 3,
                title: 'Title for page 3',
                website_link: '',
                website_link_title: 'Rema1000',
                hotspots: [
                    {
                        x1: 0,
                        x2: 1,
                        y1: 0,
                        y2: 0.47,
                        type: 'embed',
                        link: 'https://www.youtube.com/embed/z9Ud_-Y3iHY?si=VsN9IHfChY0cgUYs&controls=0&autoplay=1&mute=1'
                    }
                ]
            },
            {
                page_number: 4,
                title: 'Title for page 4',
                website_link: 'https://shop.rema1000.dk/varer/304718',
                website_link_title: 'Website title'
            },
            {
                page_number: 5,
                title: 'Title for page 5',
                website_link: 'https://shop.rema1000.dk/varer/400176',
                website_link_title: 'Website link title',
                hotspots: [
                    {
                        x1: 0.425,
                        x2: 1,
                        y1: 0.09,
                        y2: 0.68,
                        type: 'link',
                        link: 'https://shop.rema1000.dk/varer/400176'
                    }
                ]
            }
        ];

        viewer.applyPageDecorations(pageDecorations);
    }
}
