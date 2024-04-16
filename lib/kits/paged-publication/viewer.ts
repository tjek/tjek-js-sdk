import MicroEvent from '../../../vendor/microevent';
import * as translations from '../../translations';
import Verso from '../../verso-browser/verso';
import {V2Hotspot, V2PageDecoration} from '../core';
import PageDecorations from '../core-ui/page-decorations';
import singleChoicePopover from '../core-ui/single-choice-popover';
import {Tracker} from '../events';
import Controls from './controls';
import Core from './core';
import EventTracking from './event-tracking';
import Hotspots from './hotspots';
import {Page} from './page-spreads';
import './viewer.styl';

function defaultPickHotspot(
    hotspots: V2Hotspot[],
    e,
    el: HTMLElement,
    callback
) {
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
        (picked) => {
            callback(hotspots.find((hotspot) => hotspot.id === picked.id));
        }
    );

    return popover.destroy;
}
export interface ViewerInit {
    id: string;
    ownedBy: unknown;
    pages?: Page[];
    pageSpreadWidth?: number;
    pageSpreadMaxZoomScale?: number;
    pageId?: string;
    idleDelay?: number;
    resizeDelay?: number;
    color?: string;
    eventTracker: Tracker;
    keyboard: 'disabled' | 'enabled' | 'global';
    hotspotRatio: unknown;
    pickHotspot?: typeof defaultPickHotspot;
}
class Viewer extends MicroEvent {
    _hotspots = new Hotspots();
    hotspots: Record<
        string,
        {
            type: string;
            id: string;
            locations;
            link: string;
            embed_link: string;
            rotate: number;
        }
    > | null = null;
    hotspotQueue: {id: string; pages: Page[]}[] = [];
    popover: null | {destroy: () => void} = null;
    el: HTMLElement;
    _core: Core;
    _controls: Controls;
    _eventTracking: EventTracking;
    pageDecorations: V2PageDecoration[];
    options: ViewerInit;
    // @ts-expect-error
    constructor(el: HTMLElement, options: ViewerInit = {}) {
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
        this._controls = new Controls(this.el, {
            keyboard: this.options.keyboard
        });
        this._eventTracking = new EventTracking(
            this.options.eventTracker,
            this.options.id
        );

        this._controls.bind('prev', this.prev);
        this._controls.bind('next', this.next);
        this._controls.bind('first', this.first);
        this._controls.bind('last', this.last);
        this._controls.bind('close', this.destroy);
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
        this._core.bind('pointerdown', (e) => {
            this._eventTracking.trigger('pointerdown', e);
            this.trigger('pointerdown', e);
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

        this.bind('hotspotsRequested', this.hotspotsRequested);
        this.bind('beforeNavigation', this.beforeNavigation);
        this.bind('clicked', this.clicked);
        this.bind('pointerdown', this.pointerdown);
        this.bind('contextmenu', this.contextmenu);
        this.bind('pressed', this.pressed);
    }

    start() {
        this._eventTracking.trackOpened();
        this._core.trigger('started');

        return this;
    }

    destroy = () => {
        this._core.trigger('destroyed');
        this._hotspots.trigger('destroyed');
        this._controls.trigger('destroyed');
        this._eventTracking.trigger('destroyed');

        this.trigger('destroyed');

        return this;
    };

    navigateTo(position, options) {
        return this.navigateToIndex(position, options);
    }

    navigateToIndex(position, options) {
        this._core.getVerso().navigateTo(position, options);

        return this;
    }

    navigateToPageId(pageId, options?: Parameters<Verso['navigateTo']>[1]) {
        const verso = this._core.getVerso();

        const newPosition = verso.getPageSpreadPositionFromPageId(pageId)!;
        verso.navigateTo(newPosition, options);

        return this;
    }

    first = (options?: Parameters<Verso['first']>[0]) => {
        this._core.getVerso().first(options);

        return this;
    };

    prev = (options: Parameters<Verso['prev']>[0]) => {
        this._core.getVerso().prev(options);

        return this;
    };

    next = (options: Parameters<Verso['next']>[0]) => {
        this._core.getVerso().next(options);

        return this;
    };

    last = (options?: Parameters<Verso['last']>[0]) => {
        this._core.getVerso().last(options);

        return this;
    };

    getPointerEventHotspots(e): V2Hotspot[] {
        const hotspots = this.hotspots;
        if (!hotspots) return [];

        return e.verso.overlayEls.map((el) => hotspots[el.dataset.id]);
    }

    pickHotspot(e: any, callback: (hotspot: V2Hotspot) => void) {
        if (this.popover) {
            this.popover.destroy?.();
            this.popover = null;
        }

        const hotspots = this.getPointerEventHotspots(e);

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
            const hotspots: typeof this.hotspots = {};
            for (const hotspotId in this.hotspots) {
                if (hotspots[hotspotId]) continue;

                const {id, type, locations, link, embed_link, rotate} =
                    this.hotspots[hotspotId];
                for (let idx = 0; idx < hotspotRequest.pages.length; idx++) {
                    const {pageNumber} = hotspotRequest.pages[idx];
                    if (locations[pageNumber]) {
                        hotspots[hotspotId] = {
                            type,
                            id,
                            locations,
                            link,
                            embed_link,
                            rotate
                        };

                        break;
                    }
                }
            }

            const versoPageSpread = this._core
                .getVerso()
                .pageSpreads.find(
                    (pageSpread) => pageSpread.getId() === hotspotRequest.id
                );
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

    hotspotsRequested = (e) => {
        this.hotspotQueue.push(e);
        this.processHotspotQueue();
    };

    applyHotspots(hotspots) {
        this.hotspots = hotspots;

        this.processHotspotQueue();
    }

    applyPageDecorations(pageDecorations?: V2PageDecoration[]) {
        if (!pageDecorations?.length) return;

        this.pageDecorations = pageDecorations;
        const currentPageSpread = this._core.pageSpreads.collection.find(
            (spread) =>
                spread.getPages().some((page) => page.id === this._core.pageId)
        );

        if (currentPageSpread) {
            const currentPageDecorations = this.pageDecorations?.filter(
                ({page_number}) =>
                    currentPageSpread
                        .getPages()
                        .some((page) => page.pageNumber === page_number)
            );

            if (currentPageDecorations) {
                PageDecorations().render({
                    pageDecorations: currentPageDecorations,
                    aspectRatio: this.options?.hotspotRatio || 1
                });
            }
        }

        this.bind('beforeNavigation', (e) => {
            PageDecorations().show();

            const pageDecors = e?.pageSpread?.options?.pages?.map(
                ({pageNumber}) =>
                    this.pageDecorations?.find(
                        ({page_number}) => page_number == pageNumber
                    )
            );

            PageDecorations().render({
                pageDecorations: pageDecors,
                aspectRatio: this.options?.hotspotRatio || 1
            });

            this._core.bind('resized', (e) => {
                PageDecorations().render({
                    pageDecorations: pageDecors,
                    aspectRatio: this.options?.hotspotRatio || 1
                });
            });
        });

        this.bind('zoomedIn', PageDecorations().hide);
        this.bind('zoomedOut', PageDecorations().show);
        this.bind('panStart', PageDecorations().hide);
        this.bind('attemptedNavigation', PageDecorations().show);
    }

    getPageDecorations() {
        return this.pageDecorations;
    }

    beforeNavigation = () => {
        this.popover?.destroy?.();
    };

    clicked = (e) => {
        this.pickHotspot(e, (hotspot) => {
            this.trigger('hotspotClicked', hotspot);
        });
    };

    pointerdown = (e) => {
        const hotspots = this.getPointerEventHotspots(e);
        if (hotspots.length > 0) this.trigger('hotspotsPointerdown', hotspots);
    };

    contextmenu = (e) => {
        this.pickHotspot(e, (hotspot) => {
            this.trigger('hotspotContextmenu', hotspot);
        });
    };

    pressed = (e) => {
        this.pickHotspot(e, (hotspot) => {
            this.trigger('hotspotPressed', hotspot);
        });
    };
}

export default Viewer;
