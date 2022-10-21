import {request, V2Catalog, V2Hotspot, V2Page, V2PageDecoration} from '../core';
import {Tracker} from '../events';
import Viewer, {ViewerInit} from './viewer';

interface BootstrapperInit {
    el: HTMLElement;
    id: string;
    pageId: string;
    eventTracker: Tracker;
    apiKey: string;
    coreUrl: string;
}
export default class Bootstrapper {
    options: BootstrapperInit;
    constructor(options = {}) {
        //@ts-expect-error
        this.options = options;
    }

    createViewer(
        data: {
            details: V2Catalog;
            pages: V2Page[];
            pageDecorations: V2PageDecoration[];
        },
        viewerOptions?: Partial<ViewerInit>
    ) {
        return new Viewer(this.options.el!, {
            id: this.options.id,
            ownedBy: data.details.dealer_id,
            color: '#' + data.details.branding.pageflip.color,
            hotspotRatio: data.details.dimensions.height,
            keyboard: true,
            pageId: this.options.pageId,
            eventTracker: this.options.eventTracker,
            pageDecorations: data.pageDecorations,
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

    applyHotspots(viewer, hotspots) {
        viewer.applyHotspots(
            hotspots.reduce((obj, hotspot) => {
                obj[hotspot.id] = hotspot;

                return obj;
            }, {})
        );
    }

    async fetch(callback?: Parameters<typeof request>[1]) {
        try {
            const {
                0: details,
                1: pages,
                2: pageDecorations
            } = await Promise.all([
                this.fetchDetails(),
                this.fetchPages(),
                this.fetchPageDecorations()
            ]);

            if (!details || !pages) throw new Error();

            const data = {details, pages, pageDecorations};
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
        request<V2Hotspot>(
            {
                apiKey: this.options.apiKey,
                coreUrl: this.options.coreUrl,
                url: `/v2/catalogs/${this.options.id}/hotspots`
            },
            callback
        );

    fetchPageDecorations = (callback?: Parameters<typeof request>[1]) =>
        request<V2PageDecoration>(
            {
                apiKey: this.options.apiKey,
                coreUrl: this.options.coreUrl,
                url: `/v2/catalogs/${this.options.id}/page_decorations`
            },
            callback
        );
}
