import MicroEvent from 'microevent';
import {throttle} from '../../util';
import PageSpread from '../../verso-browser/page_spread';
import Verso from '../../verso-browser/verso';
import PageSpreads, {PageMode} from './page-spreads';

function getColorBrightness(color: string) {
    color = color.replace('#', '');
    let sum = 0;
    let x = 0;

    while (x < 3) {
        sum += parseInt(color.substring(2 * x, 2), 16) || 0;

        ++x;
    }

    return sum <= 381 ? 'dark' : 'light';
}

interface PagedPublicationCoreInit {}
class PagedPublicationCore extends MicroEvent {
    defaults = {
        pages: [],
        pageDecorations: [],
        pageSpreadWidth: 100,
        pageSpreadMaxZoomScale: 2.3,
        idleDelay: 1000,
        resizeDelay: 400,
        color: '#ffffff'
    };
    rootEl: HTMLElement;
    pagesEl: HTMLElement | null;
    pageDecorationEl: HTMLElement | null;
    options: PagedPublicationCoreInit;
    pageId: string;
    verso: Verso;
    pageMode: PageMode;
    idleTimeout: NodeJS.Timeout | undefined;
    pageSpreads: PageSpreads;
    resizeListener: () => void;
    constructor(el: HTMLElement, options: PagedPublicationCoreInit = {}) {
        super();
        this.options = this.makeOptions(options, this.defaults);
        this.pageId = this.getOption('pageId');
        this.rootEl = el;
        this.pagesEl = el.querySelector('.sgn-pp__pages');
        this.pageDecorationEl = el.querySelector('.sgn-pp__page-decoration');

        this.pageMode = this.getPageMode();
        this.pageSpreads = new PageSpreads({
            pages: this.getOption('pages'),
            maxZoomScale: this.getOption('pageSpreadMaxZoomScale'),
            width: this.getOption('pageSpreadWidth')
        });

        this.pageSpreads.bind('pageLoaded', this.pageLoaded);
        this.pageSpreads.bind('pagesLoaded', this.pagesLoaded);

        this.setColor(this.getOption('color'));

        // It's important to insert the page spreads before instantiating Verso.
        this.pagesEl!.parentNode!.insertBefore(
            this.pageSpreads.update(this.pageMode).getFrag(),
            this.pagesEl
        );

        this.verso = this.createVerso();

        this.bind('started', this.start);
        this.bind('destroyed', this.destroy);
    }

    start = () => {
        const verso = this.getVerso();
        verso.start();

        verso.pageSpreads.forEach(this.overridePageSpreadContentRect);

        this.resizeListener = throttle(
            this.resize,
            this.getOption('resizeDelay')
        );

        window.addEventListener('resize', this.resizeListener, false);
        window.addEventListener('beforeunload', this.unload, false);

        this.rootEl.dataset.started = '';
        this.rootEl.setAttribute('tabindex', '-1');
        this.rootEl.focus();
    };

    destroy = () => {
        const verso = this.getVerso();

        delete this.rootEl.dataset.started;
        delete this.rootEl.dataset.idle;
        delete this.rootEl.dataset.navigating;
        delete this.rootEl.dataset.colorBrightness;
        delete this.rootEl.dataset.zoomedIn;

        this.rootEl.style.backgroundColor = '#ffffff';

        verso.el
            .querySelectorAll('.sgn-pp__page-spread')
            .forEach((pageSpreadEl) => {
                pageSpreadEl.parentNode!.removeChild(pageSpreadEl);
            });

        verso.destroy();

        window.removeEventListener('resize', this.resizeListener, false);
        window.removeEventListener('beforeunload', this.unload, false);
    };

    makeOptions(
        options: Partial<PagedPublicationCoreInit>,
        defaults: typeof this.defaults
    ): Partial<PagedPublicationCoreInit> & typeof this.defaults {
        const opts = {};

        for (const key in options) opts[key] = options[key] ?? defaults[key];

        return opts as Partial<PagedPublicationCoreInit> & typeof this.defaults;
    }

    getOption(key: string) {
        return this.options[key];
    }

    setColor(color: string) {
        this.rootEl.dataset.colorBrightness = getColorBrightness(color);
        this.rootEl.style.backgroundColor = color;
    }

    createVerso() {
        const verso = new Verso(this.rootEl.querySelector('.verso')!, {
            pageId: this.pageId
        });

        verso.bind('beforeNavigation', this.beforeNavigation);
        verso.bind('afterNavigation', this.afterNavigation);
        verso.bind('attemptedNavigation', this.attemptedNavigation);
        verso.bind('pointerdown', this.pointerdown);
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

        if (!pageCount) return rect;

        const {scale} = this.getVerso().transform;
        const pageWidth = pageEl.offsetWidth * pageCount * scale;
        const pageHeight = pageEl.offsetHeight * scale;
        const imageRatio =
            Number(pageEl.dataset.height) /
            (Number(pageEl.dataset.width) * pageCount);
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
        const pages = pageSpread?.options.pages || [];
        const pageLabels = pages.map(({label}) => label);

        return pages.length > 0
            ? pageLabels.join('-') + ' / ' + this.getOption('pages').length
            : null;
    }

    getPageDecorations(pageSpread) {
        const pages = pageSpread?.options.pages || [];
        const pageDecorations = this.getOption('pageDecorations');

        return pages.map(({pageNumber}) =>
            pageDecorations?.find(
                (pageDecor) => pageDecor.page_number == pageNumber
            )
        );
    }

    renderPageSpreads() {
        this.getVerso().pageSpreads.forEach((pageSpread) => {
            const visibility = pageSpread.getVisibility();
            const match = this.pageSpreads.get(pageSpread.getId());

            if (visibility === 'visible' && match?.contentsRendered === false) {
                setTimeout(match.renderContents.bind(match), 0);
            }
            if (visibility === 'gone' && match?.contentsRendered === true) {
                setTimeout(match.clearContents.bind(match), 0);
            }
        });

        return this;
    }

    findPage(pageId) {
        return this.getOption('pages').find((page) => page.id === pageId);
    }

    pageLoaded = (e) => {
        this.trigger('pageLoaded', e);
    };

    pagesLoaded = (e) => {
        this.trigger('pagesLoaded', e);
    };

    beforeNavigation = (e) => {
        const position = e.newPosition;
        const theVerso = this.getVerso();
        const versoPageSpread = theVerso.getPageSpreadFromPosition(position);
        const pageSpread = this.pageSpreads.get(versoPageSpread.getId());
        const pageSpreadCount = theVerso.getPageSpreadCount();
        const newSpreadEl = theVerso.pageSpreadEls[e.newPosition];
        const progress = (position / (pageSpreadCount - 1)) * 100;
        const progressLabel = this.formatProgressLabel(pageSpread);
        const pageDecorations = this.getPageDecorations(pageSpread);

        console.log('pageDecorations', pageDecorations);

        this.rootEl.dataset.navigating = String(true);

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
    };

    afterNavigation = (e) => {
        const position = e.newPosition;
        const theVerso = this.getVerso();
        const versoPageSpread = theVerso.getPageSpreadFromPosition(position);
        const pageSpread = this.pageSpreads.get(versoPageSpread.getId());
        const pageSpreadCount = theVerso.getPageSpreadCount();
        const newSpreadEl = theVerso.pageSpreadEls[e.newPosition];

        this.rootEl.dataset.navigating = String(false);

        this.trigger('afterNavigation', {
            verso: e,
            pageSpread,
            pageSpreadCount,
            newSpreadEl,
            newPositionIsEnd: e.newPosition + 1 === pageSpreadCount
        });
    };

    attemptedNavigation = (e) => {
        this.trigger('attemptedNavigation', {verso: e});
    };

    pointerdown = (e) => {
        if (e.isInsideContent) {
            const page = this.findPage(e.pageEl.dataset.id);

            this.trigger('pointerdown', {verso: e, page});
        }
    };
    clicked = (e) => {
        if (e.isInsideContent) {
            const page = this.findPage(e.pageEl.dataset.id);

            this.trigger('clicked', {verso: e, page});
        }
    };

    doubleClicked = (e) => {
        if (e.isInsideContent) {
            const page = this.findPage(e.pageEl.dataset.id);

            this.trigger('doubleClicked', {verso: e, page});
        }
    };

    pressed = (e) => {
        if (e.isInsideContent) {
            const page = this.findPage(e.pageEl.dataset.id);

            this.trigger('pressed', {verso: e, page});
        }
    };

    contextmenu = (e) => {
        if (e.isInsideContent) {
            const page = this.findPage(e.pageEl.dataset.id);

            this.trigger('contextmenu', {verso: e, page});
        }
    };

    panStart = () => {
        this.resetIdleTimer();
        this.trigger('panStart', {scale: this.getVerso().transform.scale});
    };

    panEnd = () => {
        this.startIdleTimer();
        this.trigger('panEnd');
    };

    zoomedIn = (e) => {
        const {position} = e;
        const versoPageSpread =
            this.getVerso().getPageSpreadFromPosition(position);
        const pageSpread = this.pageSpreads.get(versoPageSpread.getId());

        pageSpread?.zoomIn();

        this.rootEl.dataset.zoomedIn = String(true);
        this.trigger('zoomedIn', {verso: e, pageSpread});
    };

    zoomedOut = (e) => {
        const {position} = e;
        const versoPageSpread =
            this.getVerso().getPageSpreadFromPosition(position);
        const pageSpread = this.pageSpreads.get(versoPageSpread.getId());

        pageSpread?.zoomOut();

        this.rootEl.dataset.zoomedIn = String(false);
        this.trigger('zoomedOut', {verso: e, pageSpread});
    };

    getPageMode(): PageMode {
        return (
            this.getOption('pageMode') ||
            (this.rootEl.offsetHeight / this.rootEl.offsetWidth < 0.8
                ? 'double'
                : 'single')
        );
    }

    resetIdleTimer() {
        clearTimeout(this.idleTimeout!);

        this.rootEl.dataset.idle = String(false);

        return this;
    }

    startIdleTimer() {
        this.idleTimeout = setTimeout(() => {
            this.rootEl.dataset.idle = String(true);
        }, this.getOption('idleDelay'));

        return this;
    }

    switchPageMode(pageMode: PageMode) {
        if (this.pageMode === pageMode) return this;

        const verso = this.getVerso();
        const pageIds = verso
            .getPageSpreadFromPosition(verso.getPosition())
            .getPageIds();

        this.pageMode = pageMode;

        this.pageSpreads.update(this.pageMode);

        this.getVerso()
            .el.querySelectorAll('.sgn-pp__page-spread')
            .forEach((pageSpreadEl) => {
                pageSpreadEl.parentNode!.removeChild(pageSpreadEl);
            });
        this.pagesEl!.parentNode!.insertBefore(
            this.pageSpreads.getFrag(),
            this.pagesEl
        );

        verso.refresh();
        verso.navigateTo(verso.getPageSpreadPositionFromPageId(pageIds[0])!, {
            duration: 0
        });
        verso.pageSpreads.forEach(this.overridePageSpreadContentRect);

        return this;
    }

    overridePageSpreadContentRect = (pageSpread: PageSpread) => {
        if (pageSpread.getType() === 'page') {
            return (pageSpread.getContentRect = () =>
                this.getContentRect(pageSpread));
        }
    };

    resize = () => {
        const pageMode = this.getPageMode();

        if (!this.getOption('pageMode') && pageMode !== this.pageMode) {
            this.switchPageMode(pageMode);
        } else {
            this.trigger('resized');
        }
    };

    unload = () => {
        this.trigger('disappeared');
    };
}

export default PagedPublicationCore;
