import * as PagedPublicationKit from '../paged-publication';
import * as components from './components';
import {request} from '../core';
import SGN from '../../sgn-sdk';

export default class PagedPublication {
    constructor(scriptEl) {
        this.scriptEl = scriptEl;
        this.scriptEls = {
            pagedContainer: scriptEl.getAttribute(
                'data-component-paged-publication-viewer-container'
            )
        };

        this.renderPagedContainer();
        this.setOptions();
        this.renderOfferList();
    }

    async render() {
        if (!this.options.id) {
            this.options.id = await this.fetchLatestCatId();
        }
        this.start();

        this.els = {
            offerListBtn: this.options?.el?.querySelector('.sgn__offer-list'),
            cartListBtn: this.options?.el?.querySelector('.sgn__offer-cart'),
            pageListBtn: this.options?.el?.querySelector('.sgn__offer-pages'),
            downloadBtn: this.options?.el?.querySelector('.sgn__offer-download')
        };

        this.els?.downloadBtn?.addEventListener(
            'click',
            this.downloadPdf.bind(this),
            false
        );
    }

    renderPagedContainer() {
        const pagedContainerEl = document.querySelector(
            this.scriptEls.pagedContainer
        );
        const customTemplate = document.getElementById(
            'sgn-sdk-paged-publication-viewer-template'
        );
        const pagedContainer = new components.PagedContainer({
            template: customTemplate,
            el: pagedContainerEl
        });
        pagedContainer.render();
    }

    renderOfferList() {
        const customTemplate = document.getElementById(
            'sgn-sdk-paged-publication-viewer-offer-list-template'
        );
        const offerList = new components.OfferList({
            template: customTemplate
        });
        offerList.render();
    }

    setOptions() {
        const pageNum = SGN.util.getQueryParam('page') || 1;
        this.options = {
            el: document.querySelector('.sgn__pp'),
            eventTracker: SGN.config.get('eventTracker'),
            pageId: `page${pageNum}`,
            id: SGN.config.get('publicationId')
                ? SGN.config.get('publicationId')
                : '',
            dealerId: SGN.config.get('businessId')
        };
    }

    start() {
        const bootstrapper = new PagedPublicationKit.Bootstrapper(this.options);

        bootstrapper.fetch((err, data) => {
            if (!err) {
                this.data = data;
                const viewer = bootstrapper.createViewer(data);

                viewer.bind('hotspotClicked', (hotspot) => {
                    console.log('Hotspot clicked', hotspot);

                    if (hotspot.webshop) {
                        window.location = hotspot.webshop;
                    }
                });

                viewer.bind('hotspotPressed', (hotspot) => {
                    console.log('Hotspot pressed', hotspot);
                });

                viewer.bind('hotspotContextmenu', (hotspot) => {
                    console.log('Hotspot contextmenu', hotspot);
                });

                viewer.start();

                // Fetch hotspots after rendering the viewer as they are not critical for initial render.
                bootstrapper.fetchHotspots((err2, hotspots) => {
                    if (!err2) {
                        bootstrapper.applyHotspots(viewer, hotspots);
                    }
                });
            } else {
                console.error(err);
            }
        });
    }

    fetchLatestCatId() {
        return new Promise((resolve) => {
            request(
                {
                    url: '/v2/catalogs',
                    qs: {
                        dealer_id: this.options.dealerId,
                        order_by: '-publication_date',
                        limit: 1
                    }
                },
                (err, catalogs) => {
                    if (!err) {
                        const config = {
                            publicationId: catalogs[0].id
                        };
                        SGN.config.set(config);
                        resolve(catalogs[0].id);
                    }
                }
            );
        });
    }

    downloadPdf() {
        return new Promise((resolve, reject) => {
            request(
                {
                    url: `/v2/catalogs/${this.options.id}/download`
                },
                (err, catalog) => {
                    if (!err && catalog.pdf_url) {
                        resolve(catalog.pdf_url);
                    } else {
                        reject(err);
                    }
                }
            );
        }).then((url) => {
            window.open(url, '_blank')?.focus();
        });
    }
}
