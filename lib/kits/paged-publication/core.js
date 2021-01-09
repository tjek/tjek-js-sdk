import MicroEvent from 'microevent';
import {getColorBrightness, throttle} from '../../util';
import Verso from '../../verso-browser/verso';
import PageSpreads from './page-spreads';

class PagedPublicationCore extends MicroEvent {
    constructor(el, options = {}) {
        super();
        this.beforeNavigation = this.beforeNavigation.bind(this);
        this.afterNavigation = this.afterNavigation.bind(this);
        this.attemptedNavigation = this.attemptedNavigation.bind(this);
        this.clicked = this.clicked.bind(this);
        this.doubleClicked = this.doubleClicked.bind(this);
        this.pressed = this.pressed.bind(this);
        this.contextmenu = this.contextmenu.bind(this);
        this.panStart = this.panStart.bind(this);
        this.panEnd = this.panEnd.bind(this);
        this.zoomedIn = this.zoomedIn.bind(this);
        this.zoomedOut = this.zoomedOut.bind(this);
        this.resize = this.resize.bind(this);
        this.unload = this.unload.bind(this);
        this.options = this.makeOptions(options, this.defaults);
        this.pageId = this.getOption('pageId');
        this.els = {
            root: el,
            pages: el.querySelector('.sgn-pp__pages'),
            verso: el.querySelector('.verso')
        };
        this.pageMode = this.getPageMode();
        this.pageSpreads = new PageSpreads({
            pages: this.getOption('pages'),
            maxZoomScale: this.getOption('pageSpreadMaxZoomScale'),
            width: this.getOption('pageSpreadWidth')
        });

        this.pageSpreads.bind('pageLoaded', this.pageLoaded.bind(this));
        this.pageSpreads.bind('pagesLoaded', this.pagesLoaded.bind(this));

        this.setColor(this.getOption('color'));

        // It's important to insert the page spreads before instantiating Verso.
        this.els.pages.parentNode.insertBefore(
            this.pageSpreads.update(this.pageMode).getFrag(),
            this.els.pages
        );

        this.verso = this.createVerso();

        this.bind('started', this.start.bind(this));
        this.bind('destroyed', this.destroy.bind(this));
    }

    start() {
        const verso = this.getVerso();
        verso.start();

        verso.pageSpreads.forEach(
            this.overridePageSpreadContentRect.bind(this)
        );

        this.resizeListener = throttle(
            this.resize,
            this.getOption('resizeDelay')
        );

        window.addEventListener('resize', this.resizeListener, false);
        window.addEventListener('beforeunload', this.unload, false);

        this.els.root.setAttribute('data-started', '');
        this.els.root.setAttribute('tabindex', '-1');
        this.els.root.focus();
    }

    destroy() {
        const verso = this.getVerso();
        const pageSpreadEls = verso.el.querySelectorAll('.sgn-pp__page-spread');

        this.els.root.removeAttribute('data-started');
        this.els.root.removeAttribute('data-idle');
        this.els.root.removeAttribute('data-navigating');
        this.els.root.removeAttribute('data-color-brightness');
        this.els.root.removeAttribute('data-zoomed-in');

        this.els.root.style.backgroundColor = '#ffffff';

        Array.from(pageSpreadEls).forEach((pageSpreadEl) => {
            pageSpreadEl.parentNode.removeChild(pageSpreadEl);
        });

        verso.destroy();

        window.removeEventListener('resize', this.resizeListener, false);
        window.removeEventListener('beforeunload', this.unload, false);
    }

    makeOptions(options, defaults) {
        const opts = {};

        for (let key in options) {
            opts[key] = options[key] ?? defaults[key];
        }

        return opts;
    }

    getOption(key) {
        return this.options[key];
    }

    setColor(color) {
        this.els.root.setAttribute(
            'data-color-brightness',
            getColorBrightness(color)
        );
        this.els.root.style.backgroundColor = color;
    }

    createVerso() {
        const verso = new Verso(this.els.verso, {pageId: this.pageId});

        verso.bind('beforeNavigation', this.beforeNavigation);
        verso.bind('afterNavigation', this.afterNavigation);
        verso.bind('attemptedNavigation', this.attemptedNavigation);
        verso.bind('clicked', this.clicked);
        verso.bind('doubleClicked', this.doubleClicked);
        verso.bind('pressed', this.pressed);
        verso.bind('contextmenu', this.contextmenu);
        verso.bind('panStart', this.panStart);
        verso.bind('panEnd', this.panEnd);
        verso.bind('zoomedIn', this.zoomedIn);
        verso.bind('zoomedOut', this.zoomedOut);

        return verso;
    }

    getVerso() {
        return this.verso;
    }

    getContentRect(pageSpread) {
        const rect = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: 0,
            height: 0
        };
        const pageEls = pageSpread.getPageEls();
        const pageEl = pageEls[0];
        const pageCount = pageEls.length;

        if (!pageCount) {
            return rect;
        }

        const {scale} = this.getVerso().transform;
        const pageWidth = pageEl.offsetWidth * pageCount * scale;
        const pageHeight = pageEl.offsetHeight * scale;
        const imageRatio =
            +pageEl.getAttribute('data-height') /
            (+pageEl.getAttribute('data-width') * pageCount);
        let actualHeight = pageHeight;
        let actualWidth = actualHeight / imageRatio;
        actualWidth = Math.min(pageWidth, actualWidth);
        actualHeight = actualWidth * imageRatio;
        const clientRect = pageEl.getBoundingClientRect();

        rect.width = actualWidth;
        rect.height = actualHeight;
        rect.top = clientRect.top + (pageHeight - actualHeight) / 2;
        rect.left = clientRect.left + (pageWidth - actualWidth) / 2;
        rect.right = rect.width + rect.left;
        rect.bottom = rect.height + rect.top;

        return rect;
    }

    formatProgressLabel(pageSpread) {
        const pages = pageSpread?.options.pages ?? [];
        const pageIds = pages.map((page) => page.id);
        const pageLabels = pages.map((page) => page.label);
        const pageCount = this.getOption('pages').length;
        const label =
            pageIds.length > 0
                ? pageLabels.join('-') + ' / ' + pageCount
                : null;

        return label;
    }

    renderPageSpreads() {
        this.getVerso().pageSpreads.forEach((pageSpread) => {
            const visibility = pageSpread.getVisibility();
            const match = this.pageSpreads.get(pageSpread.getId());

            if (match) {
                if (
                    visibility === 'visible' &&
                    match.contentsRendered === false
                ) {
                    setTimeout(match.renderContents.bind(match), 0);
                }
                if (visibility === 'gone' && match.contentsRendered === true) {
                    setTimeout(match.clearContents.bind(match), 0);
                }
            }
        });

        return this;
    }

    findPage(pageId) {
        return this.getOption('pages').find((page) => page.id === pageId);
    }

    pageLoaded(e) {
        this.trigger('pageLoaded', e);
    }

    pagesLoaded(e) {
        this.trigger('pagesLoaded', e);
    }

    beforeNavigation(e) {
        const position = e.newPosition;
        const theVerso = this.getVerso();
        const versoPageSpread = theVerso.getPageSpreadFromPosition(position);
        const pageSpread = this.pageSpreads.get(versoPageSpread.getId());
        const pageSpreadCount = theVerso.getPageSpreadCount();
        const newSpreadEl = theVerso.pageSpreadEls[e.newPosition];
        const progress = (position / (pageSpreadCount - 1)) * 100;
        const progressLabel = this.formatProgressLabel(pageSpread);

        this.els.root.setAttribute('data-navigating', true);

        this.renderPageSpreads();
        this.resetIdleTimer();
        this.startIdleTimer();
        this.trigger('beforeNavigation', {
            verso: e,
            pageSpread,
            newSpreadEl,
            progress,
            progressLabel,
            pageSpreadCount,
            newPositionIsEnd: e.newPosition + 1 === pageSpreadCount
        });
    }

    afterNavigation(e) {
        const position = e.newPosition;
        const theVerso = this.getVerso();
        const versoPageSpread = theVerso.getPageSpreadFromPosition(position);
        const pageSpread = this.pageSpreads.get(versoPageSpread.getId());
        const pageSpreadCount = theVerso.getPageSpreadCount();
        const newSpreadEl = theVerso.pageSpreadEls[e.newPosition];

        this.els.root.setAttribute('data-navigating', false);

        this.trigger('afterNavigation', {
            verso: e,
            pageSpread,
            pageSpreadCount,
            newSpreadEl,
            newPositionIsEnd: e.newPosition + 1 === pageSpreadCount
        });
    }

    attemptedNavigation(e) {
        this.trigger('attemptedNavigation', {verso: e});
    }

    clicked(e) {
        if (e.isInsideContent) {
            const pageId = e.pageEl.getAttribute('data-id');
            const page = this.findPage(pageId);

            this.trigger('clicked', {verso: e, page});
        }
    }

    doubleClicked(e) {
        if (e.isInsideContent) {
            const pageId = e.pageEl.getAttribute('data-id');
            const page = this.findPage(pageId);

            this.trigger('doubleClicked', {verso: e, page});
        }
    }

    pressed(e) {
        if (e.isInsideContent) {
            const pageId = e.pageEl.getAttribute('data-id');
            const page = this.findPage(pageId);

            this.trigger('pressed', {verso: e, page});
        }
    }

    contextmenu(e) {
        if (e.isInsideContent) {
            const pageId = e.pageEl.getAttribute('data-id');
            const page = this.findPage(pageId);

            this.trigger('contextmenu', {verso: e, page});
        }
    }

    panStart() {
        this.resetIdleTimer();
        this.trigger('panStart', {scale: this.getVerso().transform.scale});
    }

    panEnd() {
        this.startIdleTimer();
        this.trigger('panEnd');
    }

    zoomedIn(e) {
        const {position} = e;
        const versoPageSpread = this.getVerso().getPageSpreadFromPosition(
            position
        );
        const pageSpread = this.pageSpreads.get(versoPageSpread.getId());

        pageSpread?.zoomIn();

        this.els.root.setAttribute('data-zoomed-in', true);
        this.trigger('zoomedIn', {verso: e, pageSpread});
    }

    zoomedOut(e) {
        const {position} = e;
        const versoPageSpread = this.getVerso().getPageSpreadFromPosition(
            position
        );
        const pageSpread = this.pageSpreads.get(versoPageSpread.getId());

        pageSpread?.zoomOut();

        this.els.root.setAttribute('data-zoomed-in', false);
        this.trigger('zoomedOut', {verso: e, pageSpread});
    }

    getPageMode() {
        let pageMode = this.getOption('pageMode');

        if (pageMode == null) {
            const width = this.els.root.offsetWidth;
            const height = this.els.root.offsetHeight;

            pageMode = height / width < 0.8 ? 'double' : 'single';
        }

        return pageMode;
    }

    resetIdleTimer() {
        clearTimeout(this.idleTimeout);

        this.els.root.setAttribute('data-idle', false);

        return this;
    }

    startIdleTimer() {
        this.idleTimeout = setTimeout(() => {
            this.els.root.setAttribute('data-idle', true);
        }, this.getOption('idleDelay'));

        return this;
    }

    switchPageMode(pageMode) {
        if (this.pageMode === pageMode) {
            return this;
        }

        const verso = this.getVerso();
        const pageIds = verso
            .getPageSpreadFromPosition(verso.getPosition())
            .getPageIds();
        const pageSpreadEls = this.getVerso().el.querySelectorAll(
            '.sgn-pp__page-spread'
        );

        this.pageMode = pageMode;

        this.pageSpreads.update(this.pageMode);

        Array.from(pageSpreadEls).forEach((pageSpreadEl) => {
            pageSpreadEl.parentNode.removeChild(pageSpreadEl);
        });
        this.els.pages.parentNode.insertBefore(
            this.pageSpreads.getFrag(),
            this.els.pages
        );

        verso.refresh();
        verso.navigateTo(verso.getPageSpreadPositionFromPageId(pageIds[0]), {
            duration: 0
        });
        verso.pageSpreads.forEach(
            this.overridePageSpreadContentRect.bind(this)
        );

        return this;
    }

    overridePageSpreadContentRect(pageSpread) {
        if (pageSpread.getType() === 'page') {
            return (pageSpread.getContentRect = () =>
                this.getContentRect(pageSpread));
        }
    }

    resize() {
        const pageMode = this.getPageMode();

        if (this.getOption('pageMode') == null && pageMode !== this.pageMode) {
            this.switchPageMode(pageMode);
        } else {
            this.trigger('resized');
        }
    }

    unload() {
        this.trigger('disappeared');
    }
}
PagedPublicationCore.prototype.defaults = {
    pages: [],
    pageSpreadWidth: 100,
    pageSpreadMaxZoomScale: 2.3,
    idleDelay: 1000,
    resizeDelay: 400,
    color: '#ffffff'
};

export default PagedPublicationCore;
