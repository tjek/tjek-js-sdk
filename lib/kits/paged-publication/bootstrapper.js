import {request} from '../core';
import Viewer from './viewer';

export default class Bootstrapper {
    constructor(options = {}) {
        this.options = options;
    }

    createViewer(data, viewerOptions) {
        return new Viewer(this.options.el, {
            id: this.options.id,
            ownedBy: data.details.dealer_id,
            color: '#' + data.details.branding.pageflip.color,
            hotspotRatio: data.details.dimensions.height,
            keyboard: true,
            pageId: this.options.pageId,
            eventTracker: this.options.eventTracker,
            pages: this.transformPages(data.pages),
            ...viewerOptions
        });
    }

    transformPages(pages) {
        return pages.map((page, i) => {
            const pageNumber = i + 1;

            return {
                id: 'page' + pageNumber,
                label: pageNumber + '',
                pageNumber,
                images: {
                    medium: page.view,
                    large: page.zoom
                }
            };
        });
    }

    applyHotspots = (viewer, hotspots) => {
        viewer.applyHotspots(
            hotspots.reduce((obj, hotspot) => {
                obj[hotspot.id] = hotspot;

                return obj;
            }, {})
        );
    };

    async fetch(callback) {
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

    fetchDetails = (callback) =>
        request(
            {
                apiKey: this.options.apiKey,
                coreUrl: this.options.coreUrl,
                url: `/v2/catalogs/${this.options.id}`
            },
            callback
        );

    fetchPages = (callback) =>
        request(
            {
                apiKey: this.options.apiKey,
                coreUrl: this.options.coreUrl,
                url: `/v2/catalogs/${this.options.id}/pages`
            },
            callback
        );

    fetchHotspots = (callback) =>
        request(
            {
                apiKey: this.options.apiKey,
                coreUrl: this.options.coreUrl,
                url: `/v2/catalogs/${this.options.id}/hotspots`
            },
            callback
        );
}
