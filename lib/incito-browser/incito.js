import MicroEvent from 'microevent';
import './incito.styl';
import {isDefinedStr, throttle} from './utils';
import * as views from './views';

let requestIdleCallback;
if (
    typeof window !== 'undefined' &&
    typeof window.requestIdleCallback === 'function'
) {
    ({requestIdleCallback} = window);
} else {
    requestIdleCallback = (cb) =>
        setTimeout(function () {
            const start = Date.now();
            return cb({
                didTimeout: false,
                timeRemaining() {
                    return Math.max(0, 50 - (Date.now() - start));
                }
            });
        }, 1);
}

// like requestIdleCallback but effectively synchronous
// as we give infinite time to run
const syncIdleCallback = function (cb) {
    cb({
        timeRemaining() {
            return Number.MAX_VALUE;
        },
        didTimeout: false
    });
};

export default class Incito extends MicroEvent {
    constructor(
        containerEl,
        {
            incito = {},
            renderLaziness = 1 // 0: All synchronous. 1: Visible synchronous, rest lazy. 2: All lazy.
        }
    ) {
        super();
        this.containerEl = containerEl;
        this.incito = incito;
        this.renderLaziness = renderLaziness;
        this.el = document.createElement('div');
        this.ids = {};
        this.views = flattenViews([], this.incito.root_view);
        this.viewsLength = this.views.length;
        this.viewIndex = 0;
        this.lazyloadables = [];
        this.lazyloader = throttle(this.lazyload.bind(this), 150);
        this.renderedOutsideOfViewport = false;
    }

    start() {
        let triggeredVisibleRendered = false;
        var render = (IdleDeadline) => {
            this.render(IdleDeadline);

            if (this.viewIndex <= this.viewsLength - 1) {
                this.renderCallbackHandle = requestIdleCallback(render);
            } else {
                // make sure visibleRendered gets triggered even
                // if renderedOutsideOfViewport wasn't
                this.renderedOutsideOfViewport = true;
                this.trigger('allRendered');
            }

            if (this.renderedOutsideOfViewport && !triggeredVisibleRendered) {
                this.trigger('visibleRendered');

                triggeredVisibleRendered = true;
            }

            if (this.renderedOutsideOfViewport) {
                this.lazyload(0);
            }
        };

        this.el.className = 'incito';
        if (this.incito.locale != null) {
            this.el.setAttribute('lang', this.incito.locale);
        }

        loadFonts(this.incito.font_assets);
        this.applyTheme(this.incito.theme);

        this.containerEl.appendChild(this.el);

        // do first render synchronously unless we're very lazy
        if (this.renderLaziness === 2) {
            this.renderCallbackHandle = requestIdleCallback(render);
        } else {
            syncIdleCallback(render);
        }

        document.addEventListener('scroll', this.lazyloader, true);
        window.addEventListener('resize', this.lazyloader, false);

        return this;
    }

    destroy() {
        cancelIdleCallback(this.renderCallbackHandle);
        this.containerEl.removeChild(this.el);

        document.removeEventListener('scroll', this.lazyloader, true);
        window.removeEventListener('resize', this.lazyloader, false);

        this.trigger('destroyed');
    }

    render(IdleDeadline) {
        while (
            IdleDeadline.timeRemaining() > 0 &&
            this.viewIndex <= this.viewsLength - 1
        ) {
            const item = this.views[this.viewIndex];
            const {attrs} = item;
            const match = views[attrs.view_name] ?? views.View;
            const view = new match(attrs).render();

            if (attrs.id != null && typeof attrs.meta === 'object') {
                this.ids[attrs.id] = attrs.meta;
            }

            if (view.lazyload === true) {
                this.lazyloadables.push(view.el);
            }

            item.view = view;

            if (item.parent?.view != null) {
                item.parent.view.el.appendChild(view.el);
            } else {
                this.el.appendChild(view.el);
            }

            this.viewIndex++;

            // check if we rendered something out of the viewport for the first time and yield.
            // the check is expensive so it's faster to only check every few iterations, the downside is that
            // we might overrender a tiny bit but it comes out to faster than checking every iteration.
            if (
                this.renderLaziness &&
                !(this.viewIndex % 20) &&
                !this.renderedOutsideOfViewport &&
                !isInsideViewport(view.el)
            ) {
                this.renderedOutsideOfViewport = true;

                break;
            }
        }
    }

    applyTheme(theme = {}) {
        if (Array.isArray(theme.font_family)) {
            this.el.style.fontFamily = theme.font_family.join(', ');
        }

        if (isDefinedStr(theme.background_color)) {
            this.el.style.backgroundColor = theme.background_color;
        }

        if (isDefinedStr(theme.text_color)) {
            this.el.style.color = theme.text_color;
        }

        if (typeof theme.line_spacing_multiplier === 'number') {
            this.el.style.lineHeight = theme.line_spacing_multiplier;
        }
    }

    lazyload(threshold) {
        this.lazyloadables = this.lazyloadables.filter(function (el) {
            if (isInsideViewport(el, threshold)) {
                revealElement(el);

                return false;
            } else {
                return true;
            }
        });
    }
}

var flattenViews = function (views, attrs, parent) {
    const item = {
        attrs,
        view: null,
        parent
    };

    views.push(item);

    if (Array.isArray(attrs.child_views)) {
        attrs.child_views.forEach((childAttrs) =>
            flattenViews(views, childAttrs, item)
        );
    }

    return views;
};

var loadFonts = function (fontAssets = {}) {
    let key, urls, value;
    if ('FontFace' in window) {
        for (key in fontAssets) {
            value = fontAssets[key];
            urls = value.src.map((src) => `url(${src[1]})`).join(', ');
            const font = new FontFace(key, urls, {
                style: value.style ?? 'normal',
                weight: value.weight ?? 'normal',
                display: 'swap'
            });

            document.fonts.add(font);

            font.load();
        }
    } else {
        const styleEl = document.createElement('style');

        for (key in fontAssets) {
            value = fontAssets[key];
            urls = value.src
                .map((src) => `url('${src[1]}') format('${src[0]}')`)
                .join(', ');
            const text = `\
@font-face {
    font-family: '${key}';
    font-display: swap;
    src: ${urls};
}\
`;

            styleEl.appendChild(document.createTextNode(text));
        }

        document.head.appendChild(styleEl);
    }
};

var isInsideViewport = function (el, threshold) {
    const windowHeight = window.innerHeight;
    threshold = threshold ?? windowHeight;
    const rect = el.getBoundingClientRect();

    return (
        rect.top <= windowHeight + threshold &&
        rect.top + rect.height >= -threshold
    );
};

var revealElement = function (el) {
    const src = el.getAttribute('data-src');

    if (el.tagName.toLowerCase() === 'img') {
        el.addEventListener('load', function () {
            el.className += ' incito--loaded';
        });
        el.setAttribute('src', src);
    } else if (el.tagName.toLowerCase() === 'video') {
        const sourceEl = document.createElement('source');

        sourceEl.setAttribute('src', src);
        sourceEl.setAttribute('type', el.getAttribute('data-mime'));

        el.appendChild(sourceEl);
    } else if (/incito__video-embed-view/gi.test(el.className)) {
        const iframeEl = document.createElement('iframe');

        iframeEl.setAttribute(
            'allow',
            'fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        );
        iframeEl.setAttribute('src', src);

        el.appendChild(iframeEl);
    } else {
        el.style.backgroundImage = `url(${src})`;
    }
};
