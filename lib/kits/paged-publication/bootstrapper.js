import {async} from '../../util';
import {request} from '../core';
import Viewer from './viewer';
const {parallel} = async;

export default class Bootstrapper {
    constructor(options = {}) {
        this.fetchDetails = this.fetchDetails.bind(this);
        this.fetchPages = this.fetchPages.bind(this);
        this.fetchHotspots = this.fetchHotspots.bind(this);
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

    applyHotspots(viewer, hotspots) {
        const obj = {};

        hotspots.forEach((hotspot) => (obj[hotspot.id] = hotspot));

        viewer.applyHotspots(obj);
    }

    fetch(callback) {
        parallel(
            [this.fetchDetails, this.fetchPages],
            ([[detailsError, details], [pagesError, pages]]) => {
                const data = {details, pages};

                if (detailsError) {
                    callback(detailsError);
                } else if (pagesError) {
                    callback(pagesError);
                } else if (data.details && data.pages) {
                    callback(null, data);
                } else {
                    callback(new Error());
                }
            }
        );
    }

    fetchDetails(callback) {
        request({url: `/v2/catalogs/${this.options.id}`}, callback);
    }

    fetchPages(callback) {
        request({url: `/v2/catalogs/${this.options.id}/pages`}, callback);
    }

    fetchHotspots(callback) {
        request({url: `/v2/catalogs/${this.options.id}/hotspots`}, callback);
    }
}
