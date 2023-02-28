import fetch from 'cross-fetch';
import MicroEvent from '../../vendor/microevent';
import './incito.styl';
import {IIncito, TextView} from './types';

function formatUnit(unit) {
    if (!unit) return 0;

    if (typeof unit === 'number') return unit + 'px';

    if (typeof unit === 'string') return unit.replace('dp', 'px');

    return 0;
}

function escapeAttrValue(value) {
    return typeof value === 'string' ? value.replace(/"/g, '&quot;') : value;
}

function isDefinedStr(value: unknown): value is string {
    return typeof value === 'string' && value.length > 0;
}

function escapeHTML(unsafe) {
    return unsafe
        ? unsafe
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;')
        : '';
}

function formatSpans(text: string, spans: NonNullable<TextView['spans']>) {
    const result: {
        text?: string;
        span?: NonNullable<TextView['spans']>[number];
    }[] = [];

    if (spans.length === 0) {
        result.push({text});
    } else if (spans[0].start! > 0) {
        result.push({text: text.slice(0, spans[0].start)});
    }

    for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        const endIndex = span.end;

        result.push({text: text.slice(span.start, endIndex), span});

        if (i === spans.length - 1) {
            if (endIndex! < text.length) {
                result.push({text: text.slice(endIndex, text.length)});
            }
        } else if (endIndex! < spans[i + 1].start!) {
            result.push({text: text.slice(endIndex, spans[i + 1].start)});
        }
    }

    return result.reduce((memo, item) => {
        const escapedText = escapeHTML(item.text || '');

        if (item.span?.name) {
            if (item.span.name === 'link' && item.span.url) {
                return (
                    memo +
                    '<a href="' +
                    encodeURI(item.span.url) +
                    '" rel="external" target="_blank">' +
                    escapedText +
                    '</a>'
                );
            }

            return (
                memo +
                '<span style="font-family:inherit;" ' +
                'data-name="' +
                item.span.name +
                '">' +
                escapedText +
                '</span>'
            );
        }

        return memo + escapedText;
    }, '');
}

const matches =
    typeof Element !== 'undefined' &&
    (Element.prototype.matches || // @ts-expect-error
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector);
function closest(el: HTMLElement, s: string) {
    do {
        // @ts-expect-error
        if (matches.call(el, s)) return el;

        el = el.parentElement || (el.parentNode as HTMLElement);
    } while (el !== null && el.nodeType === 1);

    return null;
}

const flexAlignItemModes = [
    'stretch',
    'center',
    'flex-start',
    'flex-end',
    'baseline'
];
const flexJustifyModes = [
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around'
];
const flexDirectionModes = ['row', 'column'];
const backgroundTileModes = ['repeat_x', 'repeat_y', 'repeat'];
const strokeStyles = ['solid', 'dotted', 'dashed'];

function renderView(view, canLazyload) {
    let tagName = 'div';
    let contents;
    const classNames = ['incito__view'];
    const styles: Record<string, any> = {};
    const attrs: Record<string, any> = {};

    switch (view.view_name) {
        case 'TextView': {
            tagName = 'p';
            classNames.push('incito__text-view');

            const textStyles = (view.text_style || '').split('|');
            let {text} = view;

            text =
                Array.isArray(view.spans) && view.spans.length > 0
                    ? formatSpans(text, view.spans)
                    : escapeHTML(text);

            if (view.text_prevent_widow) {
                text = text
                    .replace(/&nbsp;([^\s]+)$/, ' $1')
                    .replace(/\s([^\s]+)\s*$/, '&nbsp;$1');
            }

            contents = text.replace(/\n/g, '<br>');

            if (
                Array.isArray(view.font_family) &&
                view.font_family.length > 0
            ) {
                styles['font-family'] = view.font_family.join(', ');
            }

            if (view.text_size != null) {
                styles['font-size'] = `${view.text_size}px`;
            }

            if (view.line_spacing_multiplier != null) {
                styles['line-height'] = view.line_spacing_multiplier;
            }

            if (view.text_color) {
                styles.color = view.text_color;
            }

            if (textStyles.indexOf('bold') !== -1) {
                styles['font-weight'] = 'bold';
            }

            if (textStyles.indexOf('italic') !== -1) {
                styles['font-style'] = 'italic';
            }

            if (Array.isArray(view.text_decoration_line)) {
                styles['text-decoration-line'] =
                    view.text_decoration_line.join(' ');
            }

            if (isDefinedStr(view.text_shadow)) {
                styles['text-shadow'] = view.text_shadow;
            } else if (isDefinedStr(view.text_shadow_color)) {
                const dx =
                    typeof view.text_shadow_dx === 'number'
                        ? view.text_shadow_dx
                        : 0;
                const dy =
                    typeof view.text_shadow_dy === 'number'
                        ? view.text_shadow_dy
                        : 0;
                const radius =
                    typeof view.text_shadow_radius === 'number'
                        ? view.text_shadow_radius
                        : 0;
                const color = view.text_shadow_color;

                styles['text-shadow'] = [dx, dy, radius, color].join('px ');
            }

            if (view.text_alignment === 'left') {
                styles['text-align'] = 'left';
            } else if (view.text_alignment === 'center') {
                styles['text-align'] = 'center';
            } else if (view.text_alignment === 'right') {
                styles['text-align'] = 'right';
            }

            if (view.single_line === true || view.max_lines === 1) {
                attrs['data-single-line'] = true;
            } else if (typeof view.max_lines === 'number') {
                styles.display = '-webkit-box';
                styles['-webkit-line-clamp'] = view.max_lines;
                styles['-webkit-box-orient'] = 'vertical';
            }

            if (view.text_all_caps === true) {
                styles['text-transform'] = 'uppercase';
            }

            break;
        }
        case 'ImageView': {
            tagName = 'img';
            classNames.push('incito__image-view');

            attrs.onerror = `this.style.display='none'`;

            const src = String(new URL(view.src));

            if (isDefinedStr(view.src)) {
                attrs.loading = 'lazy';
                attrs.decoding = 'async';
                attrs.src = src;
            }

            if (isDefinedStr(view.label)) attrs['alt'] = view.label;

            break;
        }
        case 'VideoView': {
            tagName = 'video';
            classNames.push('incito__video-view');

            attrs.muted = '';
            attrs.playsinline = '';
            attrs.preload = 'auto';

            const src = String(new URL(view.src));

            if (canLazyload) {
                attrs['data-src'] = `${src}#t=0.1`;
                attrs['data-mime'] = view.mime;
                classNames.push('incito--lazy');

                if (view.autoplay === true) {
                    attrs['data-autoplay'] = true;
                }

                if (view.controls === true) {
                    attrs['controls'] = '';
                }

                if (view.loop === true) {
                    attrs['loop'] = '';
                }
            } else {
                attrs.src = `${src}#t=0.1`;
                attrs.controls = '';
            }

            break;
        }
        case 'HTMLView': {
            if (isDefinedStr(view.style)) {
                view.style
                    .trim()
                    .split(';')
                    .forEach((style) => {
                        const {0: key, 1: value} = style.trim().split(':');

                        styles[key] = value;
                    });
            }

            break;
        }
        case 'VideoEmbedView':
        case 'HTMLEmbedView': {
            tagName = 'iframe';
            classNames.push('incito__html-embed-view');

            attrs.sandbox = 'allow-scripts allow-same-origin';
            attrs.allowfullscreen = '';

            const src = String(new URL(view.src));

            if ('loading' in HTMLIFrameElement.prototype) {
                attrs.loading = 'lazy';
                attrs.src = src;
            } else if (canLazyload) {
                classNames.push('incito--lazy');
                attrs['data-src'] = src;
            } else {
                attrs.src = src;
            }

            break;
        }
        case 'IncitoEmbedView': {
            classNames.push('incito__incito-embed-view');

            if (canLazyload) {
                classNames.push('incito--lazy');

                attrs['data-src'] = String(new URL(view.src));

                if (view.method === 'get' || view.method === 'post') {
                    attrs['data-method'] = view.method;
                }

                if (view.body) {
                    attrs['data-body'] = encodeURIComponent(
                        JSON.stringify(view.body)
                    );
                }
            }

            break;
        }
        case 'AbsoluteLayout': {
            classNames.push('incito__absolute-layout-view');

            break;
        }
        case 'FlexLayout': {
            classNames.push('incito__flex-layout-view');

            styles.display = 'flex';

            if (
                flexAlignItemModes.indexOf(view.layout_flex_align_items) !== -1
            ) {
                styles['align-items'] = styles['ms-align-items'] =
                    view.layout_flex_align_items;
            }

            if (
                flexJustifyModes.indexOf(view.layout_flex_justify_content) !==
                -1
            ) {
                styles['justify-content'] = styles['ms-flex-pack'] =
                    view.layout_flex_justify_content;
            }

            if (flexDirectionModes.indexOf(view.layout_flex_direction) !== -1) {
                styles['flex-direction'] = styles['ms-flex-direction'] =
                    view.layout_flex_direction;
            }

            break;
        }
    }

    if (isDefinedStr(view.id)) {
        attrs['data-id'] = escapeAttrValue(view.id);
    }

    if (isDefinedStr(view.role)) {
        attrs['data-role'] = escapeAttrValue(view.role);
    }

    if (isDefinedStr(view.accessibility_label)) {
        attrs['aria-label'] = escapeAttrValue(view.accessibility_label);
    }

    if (view.accessibility_hidden === true) {
        attrs['aria-hidden'] = true;
    }

    if (Array.isArray(view.feature_labels)) {
        const featureLabels = view.feature_labels.filter((featureLabel) =>
            /^[a-z_-]{1,14}$/.test(featureLabel)
        );

        if (featureLabels.length) {
            attrs['data-feature-labels'] = featureLabels.join(',');
        }
    }

    if (isDefinedStr(view.title)) {
        attrs['title'] = escapeAttrValue(view.title);
    }

    if (view.gravity) {
        attrs['data-gravity'] = view.gravity;
    }

    if (isDefinedStr(view.link)) {
        attrs['data-link'] = view.link;
    }

    if (view.layout_width === 'match_parent') {
        styles.width = '100%';
    } else if (view.layout_width === 'wrap_content') {
        styles.display = 'inline-block';
    } else if (view.layout_width != null) {
        styles.width = formatUnit(view.layout_width);
    }

    if (view.layout_height === 'match_parent') {
        styles.height = '100%';
    } else if (view.layout_height === 'wrap_content') {
        styles.height = 'auto';
    } else if (view.layout_height != null) {
        styles.height = formatUnit(view.layout_height);
    }

    if (view.min_width != null) {
        styles['min-width'] = formatUnit(view.min_width);
    }

    if (view.max_width != null) {
        styles['max-width'] = formatUnit(view.max_width);
    }

    if (view.min_height != null) {
        styles['min-height'] = formatUnit(view.min_height);
    }

    if (view.max_height != null) {
        styles['max-height'] = formatUnit(view.max_height);
    }

    if (view.layout_top != null) {
        styles.top = formatUnit(view.layout_top);
    }
    if (view.layout_left != null) {
        styles.left = formatUnit(view.layout_left);
    }
    if (view.layout_right != null) {
        styles.right = formatUnit(view.layout_right);
    }
    if (view.layout_bottom != null) {
        styles.bottom = formatUnit(view.layout_bottom);
    }

    if (view.background_color) {
        styles['background-color'] = view.background_color;
    }

    if (isDefinedStr(view.background_image)) {
        if (canLazyload) {
            classNames.push('incito--lazy');

            attrs['data-bg'] = view.background_image;
        } else {
            styles['background-image'] = `url(${view.background_image})`;
        }
    }

    if (backgroundTileModes.indexOf(view.background_tile_mode) !== -1) {
        styles['background-repeat'] = view.background_tile_mode.replace(
            '_',
            '-'
        );
    }

    if (isDefinedStr(view.background_image_position)) {
        styles['background-position'] = view.background_image_position.replace(
            '_',
            ' '
        );
    }

    if (view.background_image_scale_type === 'center_crop') {
        styles['background-size'] = 'cover';
    } else if (view.background_image_scale_type === 'center_inside') {
        styles['background-size'] = 'contain';
    }

    if (view.layout_margin != null) {
        styles.margin = formatUnit(view.layout_margin);
    }
    if (view.layout_margin_top != null) {
        styles['margin-top'] = formatUnit(view.layout_margin_top);
    }
    if (view.layout_margin_left != null) {
        styles['margin-left'] = formatUnit(view.layout_margin_left);
    }
    if (view.layout_margin_right != null) {
        styles['margin-right'] = formatUnit(view.layout_margin_right);
    }
    if (view.layout_margin_bottom != null) {
        styles['margin-bottom'] = formatUnit(view.layout_margin_bottom);
    }

    if (view.padding != null) {
        styles.padding = formatUnit(view.padding);
    }
    if (view.padding_top != null) {
        styles['padding-top'] = formatUnit(view.padding_top);
    }
    if (view.padding_left != null) {
        styles['padding-left'] = formatUnit(view.padding_left);
    }
    if (view.padding_right != null) {
        styles['padding-right'] = formatUnit(view.padding_right);
    }
    if (view.padding_bottom != null) {
        styles['padding-bottom'] = formatUnit(view.padding_bottom);
    }

    if (view.corner_radius != null) {
        styles['border-radius'] = formatUnit(view.corner_radius);
    }
    if (view.corner_top_left_radius != null) {
        styles['border-top-left-radius'] = formatUnit(
            view.corner_top_left_radius
        );
    }
    if (view.corner_top_right_radius != null) {
        styles['border-top-right-radius'] = formatUnit(
            view.corner_top_right_radius
        );
    }
    if (view.corner_bottom_left_radius != null) {
        styles['border-bottom-left-radius'] = formatUnit(
            view.corner_bottom_left_radius
        );
    }
    if (view.corner_bottom_right_radius != null) {
        styles['border-bottom-right-radius'] = formatUnit(
            view.corner_bottom_right_radius
        );
    }

    // Clip children.
    if (view.clip_children === false) {
        styles['overflow'] = 'visible';
    }

    if (isDefinedStr(view.shadow_color)) {
        const dx = typeof view.shadow_dx === 'number' ? view.shadow_dx : 0;
        const dy = typeof view.shadow_dy === 'number' ? view.shadow_dy : 0;
        const radius =
            typeof view.shadow_radius === 'number' ? view.shadow_radius : 0;
        const color = view.shadow_color;

        styles['box-shadow'] = [dx, dy, radius, color].join('px ');
    }

    if (view.stroke_width != null) {
        styles['border-width'] = formatUnit(view.stroke_width);
    }
    if (view.stroke_color) {
        styles['border-color'] = view.stroke_color;
    }
    if (strokeStyles.indexOf(view.stroke_style) !== -1) {
        styles['border-style'] = view.stroke_style;
    }

    if (view.stroke_top_width != null) {
        styles['border-top-width'] = formatUnit(view.stroke_top_width);
    }
    if (view.stroke_top_color) {
        styles['border-top-color'] = view.stroke_top_color;
    }

    if (view.stroke_left_width != null) {
        styles['border-left-width'] = formatUnit(view.stroke_left_width);
    }
    if (view.stroke_left_color) {
        styles['border-left-color'] = view.stroke_left_color;
    }

    if (view.stroke_right_width != null) {
        styles['border-right-width'] = formatUnit(view.stroke_right_width);
    }
    if (view.stroke_right_color) {
        styles['border-right-color'] = view.stroke_right_color;
    }

    if (view.stroke_bottom_width != null) {
        styles['border-bottom-width'] = formatUnit(view.stroke_bottom_width);
    }
    if (view.stroke_bottom_color) {
        styles['border-bottom-color'] = view.stroke_bottom_color;
    }

    if (typeof view.layout_flex_shrink === 'number') {
        styles['flex-shrink'] = styles['ms-flex-shrink'] =
            view.layout_flex_shrink;
    }
    if (typeof view.layout_flex_grow === 'number') {
        styles['flex-grow'] = styles['ms-flex-grow'] = view.layout_flex_grow;
    }
    if (view.layout_flex_basis != null) {
        styles['flex-basis'] = styles['ms-flex-basis'] = formatUnit(
            view.layout_flex_basis
        );
    }

    const transforms: string[] = [];
    const translateX = formatUnit(view.transform_translate_x);
    const translateY = formatUnit(view.transform_translate_y);

    if (translateX !== 0) transforms.push(`translateX(${translateX})`);

    if (translateY !== 0) transforms.push(`translateY(${translateY})`);

    if (
        typeof view.transform_rotate === 'number' &&
        view.transform_rotate !== 0
    ) {
        transforms.push(`rotate(${view.transform_rotate}deg)`);
    }

    if (
        typeof view.transform_scale === 'number' &&
        view.transform_scale !== 1
    ) {
        transforms.push(`scale(${view.transform_scale})`);
    }

    if (transforms.length > 0) styles.transform = transforms.join(' ');

    // Transform origin.
    if (
        Array.isArray(view.transform_origin) &&
        view.transform_origin.length === 2
    ) {
        styles['transform-origin'] =
            formatUnit(view.transform_origin[0]) +
            ' ' +
            formatUnit(view.transform_origin[1]);
    }

    attrs.style = '';
    for (const key in styles) attrs.style += key + ':' + styles[key] + ';';

    attrs.class = classNames.join(' ');

    return {tagName, contents, attrs};
}

export default class Incito extends MicroEvent<{
    started: [];
    destroyed: [];
    sectionVisible: [{sectionId: string; sectionPosition: number}];
    sectionHidden: [{sectionId: string; sectionPosition: number}];
}> {
    containerEl: HTMLElement;
    incito: IIncito;
    el: HTMLDivElement;
    ids: Record<string, unknown>;
    sections: unknown[];
    canLazyload: boolean;
    styleEl: HTMLStyleElement;
    lazyObserver: IntersectionObserver;
    videoObserver: IntersectionObserver;
    sectionObserver: IntersectionObserver;
    sectionVisibility: Map<HTMLElement, boolean>;
    constructor(containerEl: HTMLElement, {incito}: {incito: IIncito}) {
        super();

        this.containerEl = containerEl;
        this.incito = incito;
        this.el = document.createElement('div');
        this.ids = {};
        this.sections = [];
        this.canLazyload = 'IntersectionObserver' in window;
        this.render();
    }

    render() {
        const theme = this.incito.theme || {};

        if (this.incito.font_assets) {
            const styleEl = document.createElement('style');

            for (const key in this.incito.font_assets) {
                const {src} = this.incito.font_assets[key];
                const urls = src
                    .map((item) => {
                        return `url("${item[1]}")`;
                    })
                    .join(', ');
                const rule = `@font-face { font-family: "${key}"; font-display: swap; src: ${urls}; }`;

                styleEl.appendChild(document.createTextNode(rule));
            }

            document.head.appendChild(styleEl);
        }

        this.el.dataset.readme = 'Incito by Tjek (https://incito.io)';
        this.el.className = 'incito';

        if (Array.isArray(theme.font_family)) {
            this.el.style.fontFamily = theme.font_family.join(', ');
        }

        if (isDefinedStr(theme.background_color)) {
            this.el.style.backgroundColor = theme.background_color;
        }

        if (isDefinedStr(theme.text_color)) {
            this.el.style.color = theme.text_color;
        }

        if (isDefinedStr(theme.style)) {
            this.styleEl = document.createElement('style');

            this.styleEl.innerText = theme.style;

            document.head.appendChild(this.styleEl);
        }

        if (typeof theme.line_spacing_multiplier === 'number') {
            //@ts-expect-error
            this.el.style.lineHeight = theme.line_spacing_multiplier;
        }

        // By setting the language we help the browser with stuff like hyphenation.
        if (this.incito.locale) {
            this.el.setAttribute('lang', this.incito.locale);
        }

        this.el.innerHTML = this.renderHtml(this.incito.root_view);

        this.containerEl.appendChild(this.el);

        if (this.canLazyload) {
            this.enableLazyloading();
        }
    }

    start() {
        this.el.addEventListener('click', (e) => {
            const el = closest(
                e.target as HTMLElement,
                '.incito__view [data-link]'
            );
            const link = el ? el.dataset.link : null;

            if (isDefinedStr(link)) window.open(link!, '_blank');
        });

        if (this.canLazyload) {
            this.observeElements(this.el);
        }

        this.trigger('started');
    }

    destroy() {
        if (this.lazyObserver) {
            this.lazyObserver.disconnect();
        }

        if (this.videoObserver) {
            this.videoObserver.disconnect();
        }

        this.containerEl.removeChild(this.el);

        if (this.styleEl) {
            this.styleEl.parentNode!.removeChild(this.styleEl);
        }

        window.removeEventListener('visibilitychange', this.handleVisibility);
        window.removeEventListener('blur', this.handleBlur);
        window.removeEventListener('focus', this.handleFocus);
        window.removeEventListener('beforeunload', this.handleBeforeUnload);

        this.trigger('destroyed');
    }

    observeElements(el: HTMLDivElement) {
        this.sectionVisibility = new Map();
        el.querySelectorAll('[data-role="section"]').forEach(
            (el: HTMLDivElement) => {
                this.sectionVisibility.set(el, false);
                this.sectionObserver.observe(el);
            }
        );
        el.querySelectorAll('.incito--lazy').forEach((el) => {
            this.lazyObserver.observe(el);
        });
        el.querySelectorAll('.incito__video-view[data-autoplay=true]').forEach(
            (el) => {
                this.videoObserver.observe(el);
            }
        );
    }

    loadEl(el) {
        if (el instanceof HTMLMediaElement) {
            const sourceEl = document.createElement('source');

            if (el.dataset.src) sourceEl.setAttribute('src', el.dataset.src);
            if (el.dataset.mime) sourceEl.setAttribute('type', el.dataset.mime);

            el.appendChild(sourceEl);

            // Check if media isn't already being loaded.
            if (el.networkState !== 2) el.load();
        } else if (el.classList.contains('incito__incito-embed-view')) {
            const {src: url, method = 'get', body} = el.dataset;

            fetch(url, {
                method,
                body: body ? JSON.parse(decodeURIComponent(body)) : null
            })
                .then((res) => {
                    if (res.status === 200) return res.json();
                })
                .then((res) => {
                    el.innerHTML = this.renderHtml(res);

                    this.observeElements(el);
                });
        } else if (el.dataset.bg) {
            el.style.backgroundImage = `url(${el.dataset.bg})`;
        } else if (el.dataset.src) {
            el.src = el.dataset.src;
        }
    }

    triggerSectionVisibility(sectionEl: HTMLElement, visible: boolean) {
        const sectionId = sectionEl.dataset.id;
        if (!sectionId) return;

        const sectionPosition =
            Array.prototype.slice
                .call(sectionEl.parentElement!.children)
                .indexOf(sectionEl) + 1;
        if (!sectionPosition) return;

        const visibility = visible ? 'sectionVisible' : 'sectionHidden';
        this.trigger(visibility, {sectionId, sectionPosition});
    }
    visibility: DocumentVisibilityState = 'visible';
    onVisibilityChange(newVisibility: DocumentVisibilityState) {
        if (newVisibility === this.visibility) return;

        this.visibility = newVisibility;

        this.sectionVisibility.forEach((visible, target) => {
            if (!visible) return;

            this.triggerSectionVisibility(target, newVisibility === 'visible');
        });
    }
    handleBlur = () => this.onVisibilityChange('hidden');
    handleFocus = () => this.onVisibilityChange('visible');
    handleVisibility = () => this.onVisibilityChange(document.visibilityState);
    handleBeforeUnload = () => this.onVisibilityChange('hidden');
    enableLazyloading() {
        window.addEventListener('visibilitychange', this.handleVisibility);
        window.addEventListener('blur', this.handleBlur);
        window.addEventListener('focus', this.handleFocus);
        window.addEventListener('beforeunload', this.handleBeforeUnload);

        this.sectionObserver = new IntersectionObserver(
            (entries) =>
                entries.forEach(({target, isIntersecting: newVisibility}) => {
                    if (!(target instanceof HTMLElement)) return;

                    const previousVisibility =
                        this.sectionVisibility.get(target);
                    if (newVisibility === previousVisibility) return;

                    this.sectionVisibility.set(target, newVisibility);
                    this.triggerSectionVisibility(target, newVisibility);
                }),
            {rootMargin: '5px 0px'}
        );
        this.lazyObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.loadEl(entry.target);
                        this.lazyObserver.unobserve(entry.target);
                    }
                });
            },
            {rootMargin: '500px 0px'}
        );
        this.videoObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(async (entry) => {
                    if (entry.target instanceof HTMLVideoElement) {
                        if (entry.isIntersecting) {
                            entry.target.play();
                        } else {
                            // If loading is ongoing, we _have to_ wait for play() to be ready before pausing.
                            if (entry.target.networkState === 2) {
                                await entry.target.play();
                            }

                            entry.target.pause();
                        }
                    }
                });
            },
            {threshold: 0.1}
        );
    }

    renderHtml(view) {
        let html = '';

        try {
            const {tagName, contents, attrs} = renderView(
                view,
                this.canLazyload
            );
            const {id, child_views, meta, role} = view;

            if (id != null && typeof meta === 'object') this.ids[id] = meta;

            if (role === 'section') {
                this.sections.push({id, meta});
            }

            html += '<' + tagName;

            for (const key in attrs)
                html += ' ' + key + '="' + attrs[key] + '"';

            html += '>';

            if (Array.isArray(child_views)) {
                for (let i = 0; i < child_views.length; i++) {
                    html += this.renderHtml(child_views[i]);
                }
            }

            if (contents) html += contents;

            html += '</' + tagName + '>';
        } catch {}

        return html;
    }
}
