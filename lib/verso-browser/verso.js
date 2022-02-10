import Animation from './animation';
import PageSpread from './page_spread';
import Hammer from './vendor/hammer';
import './verso.styl';

export default class Verso {
    constructor(el, options = {}) {
        this.el = el;
        this.options = options;
        this.swipeVelocity = this.options.swipeVelocity ?? 0.3;
        this.swipeThreshold = this.options.swipeThreshold ?? 10;
        this.navigationDuration = this.options.navigationDuration ?? 240;
        this.navigationPanDuration = this.options.navigationPanDuration ?? 200;
        this.zoomDuration = this.options.zoomDuration ?? 200;
        this.doubleTapDelay = this.options.doubleTapDelay ?? 300;

        this.position = -1;
        this.pinching = false;
        this.panning = false;
        this.transform = {left: 0, top: 0, scale: 1};
        this.startTransform = {left: 0, top: 0, scale: 1};
        this.tap = {
            count: 0,
            delay: this.doubleTapDelay
        };
        this.started = false;
        this.destroyed = false;
        this._events = {};
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
        this.scrollerEl = this.el.querySelector('.verso__scroller');
        this.pageSpreadEls = this.el.querySelectorAll('.verso__page-spread');
        this.pageSpreads = this.traversePageSpreads(this.pageSpreadEls);
        this.pageIds = this.buildPageIds(this.pageSpreads);
        this.animation = new Animation(this.scrollerEl);
        this.hammer = new Hammer.Manager(this.scrollerEl, {
            touchAction: 'none',
            enable: false,
            inputClass: this.getHammerInputClass()
        });

        this.hammer.add(
            new Hammer.Pan({threshold: 5, direction: Hammer.DIRECTION_ALL})
        );
        this.hammer.add(new Hammer.Tap({event: 'singletap', interval: 0}));
        this.hammer.add(new Hammer.Pinch());
        this.hammer.add(new Hammer.Press({time: 500}));
        this.hammer.on('panstart', this.onPanStart.bind(this));
        this.hammer.on('panmove', this.onPanMove.bind(this));
        this.hammer.on('panend', this.onPanEnd.bind(this));
        this.hammer.on('pancancel', this.onPanEnd.bind(this));
        this.hammer.on('singletap', this.onSingletap.bind(this));
        this.hammer.on('pinchstart', this.onPinchStart.bind(this));
        this.hammer.on('pinchmove', this.onPinchMove.bind(this));
        this.hammer.on('pinchend', this.onPinchEnd.bind(this));
        this.hammer.on('pinchcancel', this.onPinchEnd.bind(this));
        this.hammer.on('press', this.onPress.bind(this));

        this.scrollerEl.addEventListener(
            'contextmenu',
            this.onContextmenu.bind(this),
            false
        );
        this.scrollerEl.addEventListener(
            'wheel',
            this.onWheel.bind(this),
            false
        );
        const pageId =
            this.getPageSpreadPositionFromPageId(this.options.pageId) ?? 0;

        this.hammer.set({enable: true});
        this.started = true;
        this.destroyed = false;
        this.navigateTo(pageId, {duration: 0});

        this.resizeListener = this.onResize.bind(this);
        this.touchStartListener = this.onTouchStart.bind(this);
        this.touchEndListener = this.onTouchEnd.bind(this);

        this.el.addEventListener('touchstart', this.touchStartListener, false);
        this.el.addEventListener('touchend', this.touchEndListener, false);

        if (typeof window !== 'undefined' && window !== null) {
            window.addEventListener('resize', this.resizeListener, false);
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
        this.scrollerEl.removeEventListener(
            'contextmenu',
            this.onContextmenu.bind(this)
        );
        this.scrollerEl.removeEventListener('wheel', this.onWheel.bind(this));

        this.hammer.destroy();

        this.el.removeEventListener('touchstart', this.touchStartListener);
        this.el.removeEventListener('touchend', this.touchEndListener);

        window.removeEventListener('resize', this.resizeListener);
        this.started = false;
        this.destroyed = true;
        return this;
    }

    first(options) {
        return this.navigateTo(0, options);
    }

    prev(options) {
        return this.navigateTo(this.getPosition() - 1, options);
    }

    next(options) {
        return this.navigateTo(this.getPosition() + 1, options);
    }

    last(options) {
        return this.navigateTo(this.getPageSpreadCount() - 1, options);
    }

    navigateTo(position, options = {}) {
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

        if (position < 0 || position > this.getPageSpreadCount() - 1) {
            return;
        }

        const currentPosition = this.getPosition();
        const currentPageSpread =
            this.getPageSpreadFromPosition(currentPosition);
        const activePageSpread = this.getPageSpreadFromPosition(position);
        let carousel = this.getCarouselFromPageSpread(activePageSpread);
        const velocity = options.velocity ?? 1;
        let duration = options.duration ?? this.navigationDuration;
        duration = duration / Math.abs(velocity);
        const touchAction = activePageSpread.isScrollable() ? 'pan-y' : 'none';

        currentPageSpread?.deactivate();
        activePageSpread.activate();

        carousel.visible.forEach((pageSpread) => {
            pageSpread.position().setVisibility('visible');
        });

        this.hammer.set({touchAction});

        this.transform.left = this.getLeftTransformFromPageSpread(
            position,
            activePageSpread
        );
        this.setPosition(position);

        if (this.transform.scale > 1) {
            this.transform.top = 0;
            this.transform.scale = 1;

            this.trigger('zoomedOut', {position: currentPosition});
        }

        this.trigger('beforeNavigation', {
            currentPosition,
            newPosition: position
        });

        this.animation.animate(
            {
                x: `${this.transform.left}%`,
                duration
            },
            () => {
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
            }
        );
    }

    getPosition() {
        return this.position;
    }

    setPosition(position) {
        this.position = position;

        return this;
    }

    getLeftTransformFromPageSpread(position, pageSpread) {
        let left = 0;

        if (position === this.getPageSpreadCount() - 1) {
            left = 100 - pageSpread.getWidth() - pageSpread.getLeft();
        } else if (position > 0) {
            left = (100 - pageSpread.getWidth()) / 2 - pageSpread.getLeft();
        }

        return left;
    }

    getCarouselFromPageSpread(pageSpreadSubject) {
        const carousel = {
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

            if (visible === true) {
                carousel.visible.push(pageSpread);
            } else {
                carousel.gone.push(pageSpread);
            }
        });

        return carousel;
    }

    traversePageSpreads(els) {
        const pageSpreads = [];
        let left = 0;

        for (let el of els) {
            const id = el.dataset.id;
            const type = el.dataset.type;
            const pageIds = el.dataset.pageIds?.split(',') || [];
            const maxZoomScale = Number(el.dataset.maxZoomScale ?? 1);
            const width = Number(el.dataset.width ?? 100);
            const pageSpread = new PageSpread(el, {
                id,
                type,
                pageIds,
                maxZoomScale,
                width,
                left
            });

            left += width;

            pageSpreads.push(pageSpread);
        }

        return pageSpreads;
    }

    buildPageIds = (pageSpreads) =>
        pageSpreads.reduce((pageIds, pageSpread) => {
            pageSpread.options.pageIds.forEach((pageId) => {
                pageIds[pageId] = pageSpread;
            });

            return pageIds;
        }, {});

    isCoordinateInsideElement(x, y, el) {
        const rect = el.getBoundingClientRect();

        return (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        );
    }

    getCoordinateInfo(x, y, pageSpread) {
        let pageEl;
        x -= this.el.offsetLeft;
        y -= this.el.offsetTop;
        const info = {
            x,
            y,
            contentX: 0,
            contentY: 0,
            pageX: 0,
            pageY: 0,
            overlayEls: [],
            pageEl: null,
            isInsideContentX: false,
            isInsideContentY: false,
            isInsideContent: false
        };
        const contentRect = pageSpread.getContentRect();
        const overlayEls = pageSpread.getOverlayEls();
        const pageEls = pageSpread.getPageEls();

        for (let overlayEl of overlayEls) {
            if (this.isCoordinateInsideElement(x, y, overlayEl)) {
                info.overlayEls.push(overlayEl);
            }
        }

        for (pageEl of pageEls) {
            if (this.isCoordinateInsideElement(x, y, pageEl)) {
                info.pageEl = pageEl;
                break;
            }
        }

        info.contentX = (x - contentRect.left) / Math.max(1, contentRect.width);
        info.contentY = (y - contentRect.top) / Math.max(1, contentRect.height);

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

    getPageSpreadFromPosition(position) {
        return this.pageSpreads[position];
    }

    getPageSpreadPositionFromPageId(pageId) {
        for (let idx = 0; idx < this.pageSpreads.length; idx++) {
            const pageSpread = this.pageSpreads[idx];

            if (pageSpread.options.pageIds.indexOf(pageId) > -1) {
                return idx;
            }
        }
    }

    getPageSpreadBounds(pageSpread) {
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
            height:
                (pageSpreadContentRect.height / pageSpreadRect.height) * 100,
            pageSpreadRect,
            pageSpreadContentRect
        };
    }

    clipCoordinate(coordinate, scale, size, offset) {
        if (size * scale < 100) {
            coordinate = offset * -scale + 50 - (size * scale) / 2;
        } else {
            coordinate = Math.min(coordinate, offset * -scale);
            coordinate = Math.max(
                coordinate,
                offset * -scale - size * scale + 100
            );
        }

        return coordinate;
    }

    zoomTo(options = {}, callback) {
        const {scale} = options;
        const curScale = this.transform.scale;
        const activePageSpread = this.getActivePageSpread();
        const pageSpreadBounds = this.getPageSpreadBounds(activePageSpread);
        const carouselOffset = activePageSpread.getLeft();
        const carouselScaledOffset = carouselOffset * curScale;
        let x = options.x ?? 0;
        let y = options.y ?? 0;

        if (scale !== 1) {
            x -= pageSpreadBounds.pageSpreadRect.left;
            y -= pageSpreadBounds.pageSpreadRect.top;
            x = (x / (pageSpreadBounds.pageSpreadRect.width / curScale)) * 100;
            y = (y / (pageSpreadBounds.pageSpreadRect.height / curScale)) * 100;
            x =
                this.transform.left +
                carouselScaledOffset +
                x -
                (x * scale) / curScale;
            y = this.transform.top + y - (y * scale) / curScale;

            // Make sure the animation doesn't exceed the content bounds.
            if (options.bounds !== false && scale > 1) {
                x = this.clipCoordinate(
                    x,
                    scale,
                    pageSpreadBounds.width,
                    pageSpreadBounds.left
                );
                y = this.clipCoordinate(
                    y,
                    scale,
                    pageSpreadBounds.height,
                    pageSpreadBounds.top
                );
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
            {
                x: `${x}%`,
                y: `${y}%`,
                scale,
                easing: options.easing,
                duration: options.duration
            },
            callback
        );
    }

    refresh() {
        this.pageSpreadEls = this.el.querySelectorAll('.verso__page-spread');
        this.pageSpreads = this.traversePageSpreads(this.pageSpreadEls);
        this.pageIds = this.buildPageIds(this.pageSpreads);

        return this;
    }

    getHammerInputClass() {
        const mobileRegex = /mobile|tablet|ip(ad|hone|od)|android/i;
        const supportTouch =
            typeof window !== 'undefined' && 'ontouchstart' in window;

        if (supportTouch && mobileRegex.test(navigator.userAgent)) {
            return Hammer.TouchInput;
        } else {
            return null;
        }
    }

    //#############
    /* Events */
    //#############

    onPanStart(e) {
        // Only allow panning if zoomed in or doing a horizontal pan.
        // This ensures vertical scrolling works for scrollable page spreads.
        if (
            this.transform.scale > 1 ||
            e.direction === Hammer.DIRECTION_LEFT ||
            e.direction === Hammer.DIRECTION_RIGHT
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
    }

    onPanMove(e) {
        let x;
        if (this.pinching === true || this.panning === false) {
            return;
        }

        if (this.transform.scale > 1) {
            const activePageSpread = this.getActivePageSpread();
            const carouselOffset = activePageSpread.getLeft();
            const carouselScaledOffset = carouselOffset * this.transform.scale;
            const pageSpreadBounds = this.getPageSpreadBounds(activePageSpread);
            const {scale} = this.transform;
            x =
                this.startTransform.left +
                carouselScaledOffset +
                (e.deltaX / this.scrollerEl.offsetWidth) * 100;
            let y =
                this.startTransform.top +
                (e.deltaY / this.scrollerEl.offsetHeight) * 100;
            x = this.clipCoordinate(
                x,
                scale,
                pageSpreadBounds.width,
                pageSpreadBounds.left
            );
            y = this.clipCoordinate(
                y,
                scale,
                pageSpreadBounds.height,
                pageSpreadBounds.top
            );
            x -= carouselScaledOffset;

            this.transform.left = x;
            this.transform.top = y;

            this.animation.animate({
                x: `${x}%`,
                y: `${y}%`,
                scale,
                easing: 'linear'
            });
        } else {
            x =
                this.transform.left +
                (e.deltaX / this.scrollerEl.offsetWidth) * 100;

            this.animation.animate({
                x: `${x}%`,
                easing: 'linear'
            });
        }
    }

    onPanEnd(e) {
        if (this.panning === false) {
            return;
        }

        this.panning = false;
        this.trigger('panEnd');

        if (this.transform.scale === 1 && this.pinching === false) {
            const position = this.getPosition();
            const velocity = e.overallVelocityX;

            if (Math.abs(velocity) >= this.swipeVelocity) {
                if (Math.abs(e.deltaX) >= this.swipeThreshold) {
                    if (e.offsetDirection === Hammer.DIRECTION_LEFT) {
                        this.next({
                            velocity,
                            duration: this.navigationPanDuration
                        });
                    } else if (e.offsetDirection === Hammer.DIRECTION_RIGHT) {
                        this.prev({
                            velocity,
                            duration: this.navigationPanDuration
                        });
                    }
                }
            }

            if (position === this.getPosition()) {
                this.animation.animate({
                    x: `${this.transform.left}%`,
                    duration: this.navigationPanDuration
                });

                this.trigger('attemptedNavigation', {
                    position: this.getPosition()
                });
            }
        }
    }

    onPinchStart() {
        if (!this.getActivePageSpread().isZoomable()) {
            return;
        }

        this.pinching = true;
        this.el.dataset.pinching = true;
        this.startTransform.scale = this.transform.scale;
    }

    onPinchMove(e) {
        if (this.pinching === false) {
            return;
        }

        this.zoomTo({
            x: e.center.x,
            y: e.center.y,
            scale: this.startTransform.scale * e.scale,
            bounds: false,
            easing: 'linear'
        });
    }

    onPinchEnd(e) {
        if (this.pinching === false) {
            return;
        }

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
                this.el.dataset.pinching = false;
            }
        );
    }

    onPress(e) {
        this.trigger(
            'pressed',
            this.getCoordinateInfo(
                e.center.x,
                e.center.y,
                this.getActivePageSpread()
            )
        );
    }

    onContextmenu(e) {
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
    }

    onWheel(e) {
        let position, scale;
        const activePageSpread = this.getActivePageSpread();

        if (activePageSpread.isZoomable() === false) {
            return;
        }

        // see https://stackoverflow.com/a/23668035
        let {deltaY} = e;

        if (event.webkitDirectionInvertedFromDevice) {
            deltaY = -deltaY;
        }

        if (deltaY > 0 && this.transform.scale === 1) {
            scale = activePageSpread.getMaxZoomScale();
            position = this.getPosition();

            this.zoomTo(
                {
                    x: e.clientX,
                    y: e.clientY,
                    scale,
                    duration: this.zoomDuration
                },
                () => {
                    this.trigger('zoomedIn', {position});
                }
            );
        } else if (deltaY < 0 && this.transform.scale > 1) {
            position = this.getPosition();

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
    }

    onSingletap(e) {
        const activePageSpread = this.getActivePageSpread();
        const coordinateInfo = this.getCoordinateInfo(
            e.center.x,
            e.center.y,
            activePageSpread
        );

        clearTimeout(this.tap.timeout);

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
    }

    onTouchStart(e) {
        if (!this.getActivePageSpread().isScrollable()) {
            e.preventDefault();
        }
    }

    onTouchEnd(e) {
        if (!this.getActivePageSpread().isScrollable()) {
            e.preventDefault();
        }
    }

    onResize() {
        if (this.transform.scale > 1) {
            const position = this.getPosition();
            const activePageSpread = this.getActivePageSpread();

            this.transform.left = this.getLeftTransformFromPageSpread(
                position,
                activePageSpread
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
    }
}
