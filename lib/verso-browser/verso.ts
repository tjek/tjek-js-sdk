import Animation from './animation';
import PageSpread from './page_spread';
import {
    DIRECTION_ALL,
    DIRECTION_LEFT,
    DIRECTION_RIGHT
} from './vendor/hammer/Input';
import Manager from './vendor/hammer/Manager';
import TouchInput from './vendor/hammer/input/touch';
import PanRecognizer from './vendor/hammer/recognizers/pan';
import PinchRecognizer from './vendor/hammer/recognizers/pinch';
import PressRecognizer from './vendor/hammer/recognizers/press';
import TapRecognizer from './vendor/hammer/recognizers/tap';
import './verso.styl';

const buildPageIds = (pageSpreads: PageSpread[]) =>
    pageSpreads.reduce<Record<PageSpread['pageIds'][number], PageSpread>>(
        (pageIds, pageSpread) => {
            pageSpread.options.pageIds.forEach((pageId) => {
                pageIds[pageId] = pageSpread;
            });

            return pageIds;
        },
        {}
    );

const clipCoordinate = (
    coordinate: number,
    scale: number,
    size: number,
    offset: number
) =>
    size * scale < 100
        ? offset * -scale + 50 - (size * scale) / 2
        : Math.max(
              Math.min(coordinate, offset * -scale),
              offset * -scale - size * scale + 100
          );

function getPageSpreadBounds(pageSpread: PageSpread) {
    const pageSpreadRect = pageSpread.getRect();
    const pageSpreadContentRect = pageSpread.getContentRect();

    return {
        left:
            ((pageSpreadContentRect.left - pageSpreadRect.left) /
                pageSpreadRect.width) *
            100,
        top:
            ((pageSpreadContentRect.top - pageSpreadRect.top) /
                pageSpreadRect.height) *
            100,
        width: (pageSpreadContentRect.width / pageSpreadRect.width) * 100,
        height: (pageSpreadContentRect.height / pageSpreadRect.height) * 100,
        pageSpreadRect,
        pageSpreadContentRect
    };
}

function isCoordinateInsideElement(x: number, y: number, el: HTMLElement) {
    const {left, right, top, bottom} = el.getBoundingClientRect();

    return x >= left && x <= right && y >= top && y <= bottom;
}

function traversePageSpreads(els: NodeListOf<HTMLElement>) {
    const pageSpreads: PageSpread[] = [];
    let left = 0;

    for (let i = 0; i < els.length; i++) {
        const el = els[i];
        const width = Number(el.dataset.width ?? 100);
        const pageSpread = new PageSpread(el, {
            id: el.dataset.id,
            type: el.dataset.type,
            pageIds: el.dataset.pageIds?.split(',') || [],
            maxZoomScale: Number(el.dataset.maxZoomScale ?? 1),
            width,
            left
        });

        left += width;

        pageSpreads.push(pageSpread);
    }

    return pageSpreads;
}

interface VersoInit {
    swipeVelocity?: number;
    swipeThreshold?: number;
    navigationDuration?: number;
    navigationPanDuration?: number;
    zoomDuration?: number;
    doubleTapDelay?: number;
    pageId?: string;
}
export default class Verso {
    position = -1;
    pinching = false;
    panning = false;
    transform = {left: 0, top: 0, scale: 1};
    startTransform = {left: 0, top: 0, scale: 1};
    started = false;
    destroyed = false;
    _events = {};
    el: HTMLElement;
    scrollerEl: HTMLElement;
    pageSpreadEls: NodeListOf<HTMLElement>;
    pageSpreads: PageSpread[];
    pageIds: Record<PageSpread['pageIds'][number], PageSpread>;
    options: VersoInit;
    swipeVelocity: number;
    swipeThreshold: number;
    navigationDuration: number;
    prefersReducedMotion: boolean;
    prefersReducedMotionMediaList: MediaQueryList | null;
    navigationPanDuration: number;
    zoomDuration: number;
    tap: {count: number; delay: number; timeout?: NodeJS.Timeout};
    animation: Animation;
    hammer: Manager;
    coarsePointerQuery: MediaQueryList | null;
    constructor(el: HTMLElement, options: VersoInit = {}) {
        this.el = el;
        this.options = options;
        this.swipeVelocity = this.options.swipeVelocity ?? 0.3;
        this.swipeThreshold = this.options.swipeThreshold ?? 10;
        this.navigationDuration = this.options.navigationDuration ?? 240;
        this.navigationPanDuration = this.options.navigationPanDuration ?? 200;
        this.zoomDuration = this.options.zoomDuration ?? 200;
        this.prefersReducedMotion = false;
        this.tap = {
            count: 0,
            delay: this.options.doubleTapDelay ?? 300,
            timeout: undefined
        };
    }

    bind(event, fn) {
        this._events[event] = this._events[event] || [];
        return this._events[event].push(fn);
    }

    unbind(event, fn) {
        if (this._events[event]) {
            return this._events[event].splice(
                this._events[event].indexOf(fn),
                1
            );
        }
    }

    trigger(event, ...args) {
        this._events[event]?.forEach((e) => {
            e.apply(this, args);
        });
    }

    start() {
        this.coarsePointerQuery =
            typeof window !== 'undefined' && window.matchMedia
                ? window.matchMedia('(pointer: coarse)')
                : null;
        this.scrollerEl = this.el.querySelector('.verso__scroller')!;
        this.pageSpreadEls = this.el.querySelectorAll('.verso__page-spread');
        this.pageSpreads = traversePageSpreads(this.pageSpreadEls);
        this.pageIds = buildPageIds(this.pageSpreads);
        this.animation = new Animation(this.scrollerEl);
        this.hammer = new Manager(this.scrollerEl, {
            touchAction: 'none',
            enable: false,
            inputClass: this.coarsePointerQuery?.matches ? TouchInput : null,
            recognizers: [
                [PanRecognizer, {threshold: 5, direction: DIRECTION_ALL}],
                [TapRecognizer, {event: 'singletap', interval: 0}],
                [PinchRecognizer],
                [PressRecognizer, {time: 500}]
            ]
        });
        if (this.coarsePointerQuery) {
            const onMedia = ({matches}) => {
                this.hammer.set({inputClass: matches ? TouchInput : null});
            };

            if (this.coarsePointerQuery.addEventListener) {
                this.coarsePointerQuery.addEventListener('change', onMedia);
            } else if (this.coarsePointerQuery.addListener) {
                this.coarsePointerQuery.addListener(onMedia);
            }
        }
        this.hammer.on('panstart', this.onPanStart);
        this.hammer.on('panmove', this.onPanMove);
        this.hammer.on('panend', this.onPanEnd);
        this.hammer.on('pancancel', this.onPanEnd);
        this.hammer.on('singletap', this.onSingletap);
        this.hammer.on('pinchstart', this.onPinchStart);
        this.hammer.on('pinchmove', this.onPinchMove);
        this.hammer.on('pinchend', this.onPinchEnd);
        this.hammer.on('pinchcancel', this.onPinchEnd);
        this.hammer.on('press', this.onPress);

        this.scrollerEl.addEventListener(
            'contextmenu',
            this.onContextmenu,
            false
        );
        this.scrollerEl.addEventListener('wheel', this.onWheel, false);
        const pageId =
            this.getPageSpreadPositionFromPageId(this.options.pageId!) ?? 0;

        this.hammer.set({enable: true});
        this.started = true;
        this.destroyed = false;
        this.navigateTo(pageId, {duration: 0});

        this.el.addEventListener('touchstart', this.onTouchStart, false);
        this.el.addEventListener('touchend', this.onTouchEnd, false);

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.onResize, false);

            this.prefersReducedMotionMediaList =
                typeof window !== 'undefined' && window.matchMedia
                    ? window.matchMedia('(prefers-reduced-motion: reduce)')
                    : null;
            if (this.prefersReducedMotionMediaList) {
                this.prefersReducedMotion = Boolean(
                    this.prefersReducedMotionMediaList.matches
                );
                if (this.prefersReducedMotionMediaList.addEventListener) {
                    this.prefersReducedMotionMediaList.addEventListener(
                        'change',
                        this.onPrefersReducedMotionChange
                    );
                } else if (this.prefersReducedMotionMediaList.addListener) {
                    this.prefersReducedMotionMediaList.addListener(
                        this.onPrefersReducedMotionChange
                    );
                }
            }
        }

        return this;
    }

    destroy() {
        if (!this.started) {
            return console.warn(
                "You've called .destroy() on a viewer that was not started yet, this is a no-op."
            );
        }
        if (this.destroyed) {
            return console.warn(
                "You've called .destroy() on a viewer that has already been destroyed and not restarted, this is a no-op."
            );
        }
        this.scrollerEl.removeEventListener('contextmenu', this.onContextmenu);
        this.scrollerEl.removeEventListener('wheel', this.onWheel);

        this.hammer.destroy();

        this.el.removeEventListener('touchstart', this.onTouchStart);
        this.el.removeEventListener('touchend', this.onTouchEnd);

        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.onResize);
        }

        if (this.prefersReducedMotionMediaList) {
            if (this.prefersReducedMotionMediaList.removeEventListener) {
                this.prefersReducedMotionMediaList.removeEventListener(
                    'change',
                    this.onPrefersReducedMotionChange
                );
            } else if (this.prefersReducedMotionMediaList.removeListener) {
                this.prefersReducedMotionMediaList.removeListener(
                    this.onPrefersReducedMotionChange
                );
            }
        }

        this.started = false;
        this.destroyed = true;
        return this;
    }

    first(options?: Parameters<typeof this.navigateTo>[1]) {
        return this.navigateTo(0, options);
    }

    prev(options?: Parameters<typeof this.navigateTo>[1]) {
        return this.navigateTo(this.getPosition() - 1, options);
    }

    next(options?: Parameters<typeof this.navigateTo>[1]) {
        return this.navigateTo(this.getPosition() + 1, options);
    }

    last(options?: Parameters<typeof this.navigateTo>[1]) {
        return this.navigateTo(this.getPageSpreadCount() - 1, options);
    }

    navigateTo(
        newPosition: number,
        options?: {duration?: number; velocity?: number}
    ) {
        if (this.destroyed) {
            return console.warn(`\ 
You've called a navigation method on a viewer that was previously destroyed, this is a no-op.
Please call viewer.start() again, if you want to reuse this Viewer instance.

You might have forgotten to remove an event handler that
calls first/prev/next/last/navigateTo on the viewer.\
`);
        }
        if (!this.started) {
            return console.warn(`
You've called a navigation method on a viewer that hasn't been started yet, this is a no-op.
Please call viewer.start() first.

You might have forgotten to remove an event handler that
calls .first()/.prev()/.next()/.last()/.navigateTo() on the viewer.
`);
        }

        if (newPosition < 0 || newPosition > this.getPageSpreadCount() - 1) {
            return;
        }

        const currentPosition = this.getPosition();
        const currentPageSpread =
            this.getPageSpreadFromPosition(currentPosition);
        const activePageSpread = this.getPageSpreadFromPosition(newPosition);
        const touchAction = activePageSpread.isScrollable() ? 'pan-y' : 'none';
        let carousel = this.getCarouselFromPageSpread(activePageSpread);
        const velocity = options?.velocity ?? 1;
        let duration = options?.duration ?? this.navigationDuration;

        if (duration > 0) {
            if (this.prefersReducedMotion) {
                duration = 0;
            } else {
                duration = duration / Math.abs(velocity);
            }
        }

        currentPageSpread?.deactivate();
        activePageSpread.activate();

        carousel.visible.forEach((pageSpread) => {
            pageSpread.position().setVisibility('visible');
        });
        this.hammer.set({touchAction});

        this.transform.left = this.getLeftTransformFromPageSpread(
            newPosition,
            activePageSpread
        );
        this.setPosition(newPosition);

        if (this.transform.scale > 1) {
            this.transform.top = 0;
            this.transform.scale = 1;

            this.trigger('zoomedOut', {position: currentPosition});
        }

        this.trigger('beforeNavigation', {currentPosition, newPosition});

        this.animation.animate({x: this.transform.left + '%', duration}, () => {
            carousel = this.getCarouselFromPageSpread(
                this.getActivePageSpread()
            );

            carousel.gone.forEach((pageSpread) => {
                pageSpread.setVisibility('gone');
            });

            this.trigger('afterNavigation', {
                newPosition: this.getPosition(),
                previousPosition: currentPosition
            });
        });
    }

    getPosition() {
        return this.position;
    }

    setPosition(position: number) {
        this.position = position;

        return this;
    }

    getLeftTransformFromPageSpread(position: number, pageSpread: PageSpread) {
        if (position === this.getPageSpreadCount() - 1) {
            return 100 - pageSpread.getWidth() - pageSpread.getLeft();
        }
        if (position > 0) {
            return (100 - pageSpread.getWidth()) / 2 - pageSpread.getLeft();
        }

        return 0;
    }

    getCarouselFromPageSpread(pageSpreadSubject: PageSpread) {
        const carousel: {visible: PageSpread[]; gone: PageSpread[]} = {
            visible: [],
            gone: []
        };

        // Identify the page spreads that should be a part of the carousel.
        this.pageSpreads.forEach((pageSpread) => {
            let visible = false;

            if (pageSpread.getLeft() <= pageSpreadSubject.getLeft()) {
                if (
                    pageSpread.getLeft() + pageSpread.getWidth() >
                    pageSpreadSubject.getLeft() - 100
                ) {
                    visible = true;
                }
            } else {
                if (
                    pageSpread.getLeft() - pageSpread.getWidth() <
                    pageSpreadSubject.getLeft() + 100
                ) {
                    visible = true;
                }
            }

            if (visible) {
                carousel.visible.push(pageSpread);
            } else {
                carousel.gone.push(pageSpread);
            }
        });

        return carousel;
    }

    getCoordinateInfo(x: number, y: number, pageSpread: PageSpread) {
        x -= this.el.offsetLeft;
        y -= this.el.offsetTop;
        const info = {
            x,
            y,
            contentX: 0,
            contentY: 0,
            pageX: 0,
            pageY: 0,
            overlayEls: [] as HTMLElement[],
            pageEl: null as null | HTMLElement,
            isInsideContentX: false,
            isInsideContentY: false,
            isInsideContent: false
        };

        const overlayEls = pageSpread.getOverlayEls();
        for (let idx = 0; idx < overlayEls.length; idx++) {
            const overlayEl = overlayEls[idx];
            if (isCoordinateInsideElement(x, y, overlayEl)) {
                info.overlayEls.push(overlayEl);
            }
        }

        const pageEls = pageSpread.getPageEls();
        for (let idx = 0; idx < pageEls.length; idx++) {
            const pageEl = pageEls[idx];
            if (isCoordinateInsideElement(x, y, pageEl)) {
                info.pageEl = pageEl;
                break;
            }
        }

        const contentRect = pageSpread.getContentRect();
        info.contentX =
            (x - contentRect.left!) / Math.max(1, contentRect.width!);
        info.contentY =
            (y - contentRect.top!) / Math.max(1, contentRect.height!);

        if (info.pageEl) {
            info.isInsideContentX = info.contentX >= 0 && info.contentX <= 1;
            info.isInsideContentY = info.contentY >= 0 && info.contentY <= 1;
            info.isInsideContent =
                info.isInsideContentX && info.isInsideContentY;
        }

        return info;
    }

    getPageSpreadCount() {
        return this.pageSpreads.length;
    }

    getActivePageSpread() {
        return this.getPageSpreadFromPosition(this.getPosition());
    }

    getPageSpreadFromPosition(position: number) {
        return this.pageSpreads[position];
    }

    getPageSpreadPositionFromPageId(pageId: string) {
        for (let idx = 0; idx < this.pageSpreads.length; idx++) {
            const pageSpread = this.pageSpreads[idx];

            if (pageSpread.options.pageIds.indexOf(pageId) > -1) return idx;
        }
    }

    zoomTo(
        //@ts-expect-error
        {
            duration,
            easing,
            scale,
            x = 0,
            y = 0,
            bounds
        }: {
            duration?: number;
            easing?: string;
            scale: number;
            x: number;
            y: number;
            bounds?: boolean;
        } = {},
        callback?: () => void
    ) {
        const curScale = this.transform.scale;
        const activePageSpread = this.getActivePageSpread();
        const {left, top, width, height, pageSpreadRect} =
            getPageSpreadBounds(activePageSpread);
        const carouselOffset = activePageSpread.getLeft();
        const carouselScaledOffset = carouselOffset * curScale;

        if (scale !== 1) {
            x -= pageSpreadRect.left;
            y -= pageSpreadRect.top;
            x = (x / (pageSpreadRect.width / curScale)) * 100;
            y = (y / (pageSpreadRect.height / curScale)) * 100;
            x =
                this.transform.left +
                carouselScaledOffset +
                x -
                (x * scale) / curScale;
            y = this.transform.top + y - (y * scale) / curScale;

            // Make sure the animation doesn't exceed the content bounds.
            if (bounds !== false && scale > 1) {
                x = clipCoordinate(x, scale, width, left);
                y = clipCoordinate(y, scale, height, top);
            }
        } else {
            x = 0;
            y = 0;
        }

        // Account for the page spreads left of the active one.
        x -= carouselOffset * scale;

        this.transform.left = x;
        this.transform.top = y;
        this.transform.scale = scale;

        this.animation.animate(
            {x: x + '%', y: y + '%', scale, easing, duration},
            callback
        );
    }

    refresh() {
        this.pageSpreadEls = this.el.querySelectorAll('.verso__page-spread');
        this.pageSpreads = traversePageSpreads(this.pageSpreadEls);
        this.pageIds = buildPageIds(this.pageSpreads);

        return this;
    }

    //#############
    /* Events */
    //#############

    onPanStart = (e) => {
        // Only allow panning if zoomed in or doing a horizontal pan.
        // This ensures vertical scrolling works for scrollable page spreads.
        if (
            this.transform.scale > 1 ||
            e.direction === DIRECTION_LEFT ||
            e.direction === DIRECTION_RIGHT
        ) {
            const {x} = e.center;
            const edgeThreshold = 30;
            const width = this.scrollerEl.offsetWidth;

            // Prevent panning when edge-swiping on iOS.
            if (x > edgeThreshold && x < width - edgeThreshold) {
                this.startTransform.left = this.transform.left;
                this.startTransform.top = this.transform.top;

                this.panning = true;

                this.trigger('panStart');
            }
        }
    };

    onPanMove = (e) => {
        if (this.pinching || !this.panning) return;

        const {scale} = this.transform;
        if (scale > 1) {
            const activePageSpread = this.getActivePageSpread();
            const carouselOffset = activePageSpread.getLeft();
            const carouselScaledOffset = carouselOffset * scale;
            const {width, height, left, top} =
                getPageSpreadBounds(activePageSpread);

            let x =
                this.startTransform.left +
                carouselScaledOffset +
                (e.deltaX / this.scrollerEl.offsetWidth) * 100;
            x = clipCoordinate(x, scale, width, left) - carouselScaledOffset;
            let y =
                this.startTransform.top +
                (e.deltaY / this.scrollerEl.offsetHeight) * 100;
            y = clipCoordinate(y, scale, height, top);

            this.transform.left = x;
            this.transform.top = y;

            this.animation.animate({
                x: x + '%',
                y: y + '%',
                scale,
                easing: 'linear'
            });
        } else {
            this.animation.animate({
                x:
                    this.transform.left +
                    (e.deltaX / this.scrollerEl.offsetWidth) * 100 +
                    '%',
                easing: 'linear'
            });
        }
    };

    onPanEnd = (e) => {
        if (!this.panning) return;

        this.panning = false;
        this.trigger('panEnd');

        if (this.transform.scale === 1 && !this.pinching) {
            const position = this.getPosition();
            const velocity = e.overallVelocityX;
            if (
                Math.abs(velocity) >= this.swipeVelocity &&
                Math.abs(e.deltaX) >= this.swipeThreshold
            ) {
                const options = {
                    velocity,
                    duration: this.navigationPanDuration
                };
                if (e.offsetDirection === DIRECTION_LEFT) {
                    this.next(options);
                } else if (e.offsetDirection === DIRECTION_RIGHT) {
                    this.prev(options);
                }
            }

            if (position === this.getPosition()) {
                this.animation.animate({
                    x: this.transform.left + '%',
                    duration: this.navigationPanDuration
                });

                this.trigger('attemptedNavigation', {
                    position: this.getPosition()
                });
            }
        }
    };

    onPinchStart = () => {
        if (!this.getActivePageSpread().isZoomable()) return;

        this.pinching = true;
        // @ts-expect-error
        this.el.dataset.pinching = true;
        this.startTransform.scale = this.transform.scale;
    };

    onPinchMove = (e) => {
        if (!this.pinching) return;

        this.zoomTo({
            x: e.center.x,
            y: e.center.y,
            scale: this.startTransform.scale * e.scale,
            bounds: false,
            easing: 'linear'
        });
    };

    onPinchEnd = (e) => {
        if (!this.pinching) return;

        const activePageSpread = this.getActivePageSpread();
        const maxZoomScale = activePageSpread.getMaxZoomScale();
        const scale = Math.max(1, Math.min(this.transform.scale, maxZoomScale));
        const position = this.getPosition();

        if (this.startTransform.scale === 1 && scale > 1) {
            this.trigger('zoomedIn', {position});
        } else if (this.startTransform.scale > 1 && scale === 1) {
            this.trigger('zoomedOut', {position});
        }

        this.zoomTo(
            {x: e.center.x, y: e.center.y, scale, duration: this.zoomDuration},
            () => {
                this.pinching = false;
                // @ts-expect-error
                this.el.dataset.pinching = false;
            }
        );
    };

    onPress = (e) => {
        this.trigger(
            'pressed',
            this.getCoordinateInfo(
                e.center.x,
                e.center.y,
                this.getActivePageSpread()
            )
        );
    };

    onContextmenu = (e) => {
        e.preventDefault();

        this.trigger(
            'contextmenu',
            this.getCoordinateInfo(
                e.clientX,
                e.clientY,
                this.getActivePageSpread()
            )
        );

        return false;
    };

    onPrefersReducedMotionChange = (e) => {
        this.prefersReducedMotion = Boolean(e.matches);
    };

    onWheel = (e: WheelEvent) => {
        const activePageSpread = this.getActivePageSpread();

        if (!activePageSpread.isZoomable()) return;

        // see https://stackoverflow.com/a/23668035
        let {deltaY} = e;

        if ((e as any).webkitDirectionInvertedFromDevice as boolean)
            deltaY = -deltaY;

        const position = this.getPosition();
        if (deltaY > 0 && this.transform.scale === 1) {
            this.zoomTo(
                {
                    x: e.clientX,
                    y: e.clientY,
                    scale: activePageSpread.getMaxZoomScale(),
                    duration: this.zoomDuration
                },
                () => {
                    this.trigger('zoomedIn', {position});
                }
            );
        } else if (deltaY < 0 && this.transform.scale > 1) {
            this.zoomTo(
                {
                    x: e.clientX,
                    y: e.clientY,
                    scale: 1,
                    duration: this.zoomDuration
                },
                () => {
                    this.trigger('zoomedOut', {position});
                }
            );
        }
    };

    onSingletap = (e) => {
        const activePageSpread = this.getActivePageSpread();
        const coordinateInfo = this.getCoordinateInfo(
            e.center.x,
            e.center.y,
            activePageSpread
        );
        this.trigger('pointerdown', coordinateInfo);

        clearTimeout(this.tap.timeout!);

        if (this.tap.count === 1) {
            this.tap.count = 0;

            this.trigger('doubleClicked', coordinateInfo);

            if (activePageSpread.isZoomable()) {
                const maxZoomScale = activePageSpread.getMaxZoomScale();
                const zoomedIn = this.transform.scale > 1;
                const scale = zoomedIn ? 1 : maxZoomScale;
                const zoomEvent = zoomedIn ? 'zoomedOut' : 'zoomedIn';
                const position = this.getPosition();

                this.zoomTo(
                    {
                        x: e.center.x,
                        y: e.center.y,
                        scale,
                        duration: this.zoomDuration
                    },
                    () => {
                        this.trigger(zoomEvent, {position});
                    }
                );
            }
        } else {
            this.tap.count++;
            this.tap.timeout = setTimeout(() => {
                this.tap.count = 0;

                this.trigger('clicked', coordinateInfo);
            }, this.tap.delay);
        }
    };

    onTouchStart = (e) => {
        if (!this.getActivePageSpread().isScrollable()) e.preventDefault();
    };

    onTouchEnd = (e) => {
        if (!this.getActivePageSpread().isScrollable()) e.preventDefault();
    };

    onResize = () => {
        if (this.transform.scale > 1) {
            const position = this.getPosition();

            this.transform.left = this.getLeftTransformFromPageSpread(
                position,
                this.getActivePageSpread()
            );
            this.transform.top = 0;
            this.transform.scale = 1;

            this.zoomTo({
                x: this.transform.left,
                y: this.transform.top,
                scale: this.transform.scale,
                duration: 0
            });

            this.trigger('zoomedOut', {position});
        }
    };
}
