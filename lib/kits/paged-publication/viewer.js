import MicroEvent from 'microevent';
import * as translations from '../../translations';
import singleChoicePopover from '../core-ui/single-choice-popover';
import Controls from './controls';
import Core from './core';
import EventTracking from './event-tracking';
import Hotspots from './hotspots';
import './viewer.styl';

function defaultPickHotspot(hotspots, e, el, callback) {
    const popover = singleChoicePopover(
        {
            el,
            header: translations.t('paged_publication.hotspot_picker.header'),
            x: e.verso.x,
            y: e.verso.y,
            items: hotspots
                .filter((hotspot) => hotspot.type === 'offer')
                .map((hotspot) => ({
                    id: hotspot.id,
                    title: hotspot.offer.heading,
                    subtitle:
                        hotspot.offer.pricing.currency +
                        '' +
                        hotspot.offer.pricing.price
                }))
        },
        (picked) =>
            callback(hotspots.find((hotspot) => hotspot.id === picked.id))
    );

    return popover.destroy;
}

class Viewer extends MicroEvent {
    constructor(el, options = {}) {
        super();
        this.el = el;
        this.options = options;
        this._core = new Core(this.el, {
            id: this.options.id,
            pages: this.options.pages,
            pageSpreadWidth: this.options.pageSpreadWidth,
            pageSpreadMaxZoomScale: this.options.pageSpreadMaxZoomScale,
            pageId: this.options.pageId,
            idleDelay: this.options.idleDelay,
            resizeDelay: this.options.resizeDelay,
            color: this.options.color
        });
        this._hotspots = new Hotspots();
        this._controls = new Controls(this.el, {
            keyboard: this.options.keyboard
        });
        this._eventTracking = new EventTracking(
            this.options.eventTracker,
            this.options.id
        );
        this.hotspots = null;
        this.hotspotQueue = [];
        this.popover = null;

        this._setupEventListeners();
    }

    start() {
        this._eventTracking.trackOpened();
        this._core.trigger('started');

        return this;
    }

    destroy() {
        this._core.trigger('destroyed');
        this._hotspots.trigger('destroyed');
        this._controls.trigger('destroyed');
        this._eventTracking.trigger('destroyed');

        this.trigger('destroyed');

        return this;
    }

    navigateTo(position, options) {
        this.navigateToIndex(position, options);

        return this;
    }

    navigateToIndex(position, options) {
        this._core.getVerso().navigateTo(position, options);

        return this;
    }

    navigateToPageId(pageId, options) {
        return this._core
            .getVerso()
            .navigateTo(
                this._core.getVerso().getPageSpreadPositionFromPageId(pageId),
                options
            );
    }

    first(options) {
        this._core.getVerso().first(options);

        return this;
    }

    prev(options) {
        this._core.getVerso().prev(options);

        return this;
    }

    next(options) {
        this._core.getVerso().next(options);

        return this;
    }

    last(options) {
        this._core.getVerso().last(options);

        return this;
    }

    _setupEventListeners() {
        this._controls.bind('prev', (e) => {
            this.prev(e);
        });
        this._controls.bind('next', (e) => {
            this.next(e);
        });
        this._controls.bind('first', (e) => {
            this.first(e);
        });
        this._controls.bind('last', (e) => {
            this.last(e);
        });
        this._controls.bind('close', (e) => {
            this.destroy(e);
        });
        this._hotspots.bind('hotspotsRequested', (e) => {
            this.trigger('hotspotsRequested', e);
        });

        this._core.bind('appeared', (e) => {
            this._eventTracking.trigger('appeared', e);
            this.trigger('appeared', e);
        });
        this._core.bind('disappeared', (e) => {
            this._eventTracking.trigger('disappeared', e);
            this.trigger('disappeared', e);
        });
        this._core.bind('beforeNavigation', (e) => {
            this._eventTracking.trigger('beforeNavigation', e);
            this._controls.trigger('beforeNavigation', e);
            this.trigger('beforeNavigation', e);
        });
        this._core.bind('afterNavigation', (e) => {
            this._eventTracking.trigger('afterNavigation', e);
            this._hotspots.trigger('afterNavigation', e);
            this.trigger('afterNavigation', e);
        });
        this._core.bind('attemptedNavigation', (e) => {
            this._eventTracking.trigger('attemptedNavigation', e);
            this.trigger('attemptedNavigation', e);
        });
        this._core.bind('clicked', (e) => {
            this._eventTracking.trigger('clicked', e);
            this.trigger('clicked', e);
        });
        this._core.bind('doubleClicked', (e) => {
            this._eventTracking.trigger('doubleClicked', e);
            this.trigger('doubleClicked', e);
        });
        this._core.bind('contextmenu', (e) => {
            this.trigger('contextmenu', e);
        });
        this._core.bind('pressed', (e) => {
            this._eventTracking.trigger('pressed', e);
            this.trigger('pressed', e);
        });
        this._core.bind('panStart', (e) => {
            this._eventTracking.trigger('panStart', e);
            this.trigger('panStart', e);
        });
        this._core.bind('zoomedIn', (e) => {
            this._eventTracking.trigger('zoomedIn', e);
            this.trigger('zoomedIn', e);
        });
        this._core.bind('zoomedOut', (e) => {
            this._eventTracking.trigger('zoomedOut', e);
            this.trigger('zoomedOut', e);
        });
        this._core.bind('pageLoaded', (e) => {
            this._eventTracking.trigger('pageLoaded', e);
            this.trigger('pageLoaded', e);
        });
        this._core.bind('pagesLoaded', (e) => {
            this._hotspots.trigger('pagesLoaded', e);
            this.trigger('pagesLoaded', e);
        });
        this._core.bind('resized', (e) => {
            this._hotspots.trigger('resized');
            this.trigger('resized', e);
        });

        this.bind('hotspotsRequested', this.hotspotsRequested.bind(this));
        this.bind('beforeNavigation', this.beforeNavigation.bind(this));
        this.bind('clicked', this.clicked.bind(this));
        this.bind('contextmenu', this.contextmenu.bind(this));
        this.bind('pressed', this.pressed.bind(this));
    }

    pickHotspot(e, callback) {
        if (!this.hotspots) return;

        if (this.popover) {
            this.popover.destroy?.();
            this.popover = null;
        }

        const hotspots = e.verso.overlayEls.map(
            (overlayEl) => this.hotspots[overlayEl.dataset.id]
        );

        if (hotspots.length === 1) {
            callback(hotspots[0]);
        } else if (hotspots.length > 1) {
            this.popover = {
                destroy: (this.options.pickHotspot || defaultPickHotspot)(
                    hotspots,
                    e,
                    this.el,
                    callback
                )
            };
        }
    }

    processHotspotQueue() {
        if (!this.hotspots) return;

        this.hotspotQueue = this.hotspotQueue.filter((hotspotRequest) => {
            const versoPageSpread = this._core
                .getVerso()
                .pageSpreads.find(
                    (pageSpread) => pageSpread.getId() === hotspotRequest.id
                );

            const hotspots = {};
            for (const id in this.hotspots) {
                if (hotspots[id]) continue;

                const hotspot = this.hotspots[id];
                for (let idx = 0; idx < hotspotRequest.pages.length; idx++) {
                    const page = hotspotRequest.pages[idx];
                    if (hotspot.locations[page.pageNumber]) {
                        hotspots[id] = {
                            type: hotspot.type,
                            id: hotspot.id,
                            locations: hotspot.locations
                        };

                        break;
                    }
                }
            }

            this._hotspots.trigger('hotspotsReceived', {
                pageSpread: this._core.pageSpreads.get(hotspotRequest.id),
                versoPageSpread,
                ratio: this.options.hotspotRatio,
                pages: hotspotRequest.pages,
                hotspots
            });

            return false;
        });
    }

    hotspotsRequested(e) {
        this.hotspotQueue.push(e);
        this.processHotspotQueue();
    }

    applyHotspots(hotspots = {}) {
        this.hotspots = hotspots;

        this.processHotspotQueue();
    }

    beforeNavigation() {
        this.popover?.destroy?.();
    }

    clicked(e) {
        this.pickHotspot(e, (hotspot) => {
            this.trigger('hotspotClicked', hotspot);
        });
    }

    contextmenu(e) {
        this.pickHotspot(e, (hotspot) => {
            this.trigger('hotspotContextmenu', hotspot);
        });
    }

    pressed(e) {
        this.pickHotspot(e, (hotspot) => {
            this.trigger('hotspotPressed', hotspot);
        });
    }
}

export default Viewer;
