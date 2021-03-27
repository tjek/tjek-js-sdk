import './incito.styl';
import {
    isDefinedStr,
    formatUnit,
    escapeHTML,
    escapeAttrValue,
    getShadow,
    getTransforms,
    parseSpans,
    getTextShadow,
    loadFonts
} from './utils.js';

export default class Incito {
    constructor(containerEl, {incito = {}}) {
        this.containerEl = containerEl;
        this.incito = incito;
        this.el = document.createElement('div');
        this.imageCount = 0;
        this.preloadImageCount = 20;
        this.ids = {};
    }

    start() {
        const html = this.renderHtml();
        const theme = this.incito.theme || {};

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

        this.el.className = 'incito';

        if (this.incito.locale != null) {
            this.el.setAttribute('lang', this.incito.locale);
        }

        this.el.innerHTML = html;
        this.containerEl.appendChild(this.el);

        loadFonts(this.incito.font_assets);

        this.el.addEventListener('click', (e) => {
            const link = e.target.getAttribute('data-link');

            if (isDefinedStr(link)) {
                window.open(link, '_blank');
            }
        });

        function loadEl (el) {
            if (el.dataset.bg) {
                el.style.backgroundImage = `url(${el.dataset.bg})`;
            } else if (el.dataset.src) {
                el.src = el.dataset.src;
            }

            if (el.tagName.toLowerCase() === 'video') {
                if (el.getAttribute('data-controls')) {
                    el.setAttribute('controls', 'true');
                }

                el.querySelectorAll('[data-src]').forEach((sourceEl) => {
                    sourceEl.setAttribute('src', sourceEl.dataset.src);
                });

                el.load();
            }
        }

        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            loadEl(entry.target);

                            this.observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    rootMargin: '500px'
                }
            );

            this.el.querySelectorAll('.incito--lazy').forEach((lazyEl) => {
                this.observer.observe(lazyEl);
            });
        } else {
            this.el.querySelectorAll('.incito--lazy').forEach((lazyEl) => {
                loadEl(lazyEl);
            });
        }
    }

    renderView(view) {
        let tagName = 'div';
        let contents;
        const classNames = ['incito__view'];
        const styles = {};
        const attrs = {};

        if (view.view_name === 'TextView') {
            tagName = 'p';
            classNames.push('incito__text-view');

            const textStyles = (view.text_style || '').split('|');
            let {text} = view;

            if (Array.isArray(view.spans) && view.spans.length > 0) {
                const parsedText = parseSpans(text, view.spans);

                text = parsedText.map((item) => {
                    const escapedText = escapeHTML(item.text || '');

                    if (item.span?.name === 'link' && item.span.url != null) {
                        return `<a href="${encodeURI(
                            item.span.url
                        )}" rel="external" target="_blank">${escapedText}</a>`;
                    }
                    if (item.span?.name != null) {
                        const spanName = item.span.name;

                        return `<span data-name="${spanName}">${escapedText}</span>`;
                    }
                    return escapedText;
                });
                text = text.join('');
            } else {
                text = escapeHTML(text);
            }

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

            if (view.text_color != null) {
                styles.color = view.text_color;
            }

            if (textStyles.indexOf('bold') !== -1) {
                styles['font-weight'] = 'bold';
            }

            if (textStyles.indexOf('italic') !== -1) {
                styles['font-style'] = 'italic';
            }

            if (Array.isArray(view.text_decoration_line)) {
                styles['text-decoration-line'] = view.text_decoration_line.join(
                    ' '
                );
            }

            const textShadow = getTextShadow(view);

            if (isDefinedStr(view.text_shadow)) {
                styles['text-shadow'] = view.text_shadow;
            } else if (textShadow != null) {
                styles[
                    'text-shadow'
                ] = `${textShadow.dx}px ${textShadow.dy}px ${textShadow.radius}px ${textShadow.color}`;
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
                styles['webkit-line-clamp'] = view.max_lines;
                styles['webkit-box-orient'] = 'vertical';
            }

            if (view.text_all_caps === true) {
                styles['text-transform'] = 'uppercase';
            }
        } else if (view.view_name === 'ImageView') {
            tagName = 'img';
            classNames.push('incito__image-view');
            classNames.push('incito--lazy');

            if (isDefinedStr(view.src)) {
                if (this.imageCount <= this.preloadImageCount) {
                    attrs.src = view.src;
                } else {
                    attrs['data-src'] = view.src;
                }

                this.imageCount++;
            }

            if (isDefinedStr(view.label)) {
                attrs['alt'] = view.label;
            }
        } else if (view.view_name === 'VideoView') {
            tagName = 'video';
            classNames.push('incito__video-view');
            classNames.push('incito--lazy');

            attrs['muted'] = true;
            attrs.preload = 'metadata';
            attrs.playsinline = true;
            attrs['webkit-playsinline'] = true;

            if (view.autoplay === true) {
                attrs['autoplay'] = true;
            }

            if (view.loop === true) {
                attrs['loop'] = true;
            }

            if (view.controls === true) {
                attrs['data-controls'] = true;
            }

            contents = `<source type="${view.mime}" data-src="${view.src}"/>`;
        } else if (view.view_name === 'HTMLView') {
            // view.style
        } else if (
            view.view_name === 'VideoEmbedView' ||
            view.view_name === 'HTMLEmbedView'
        ) {
            tagName = 'iframe';
            classNames.push('incito__html-embed-view');
            classNames.push('incito--lazy');

            attrs.sandbox = 'allow-scripts allow-same-origin';
            attrs['data-src'] = view.src;
            attrs.allowfullscreen = '';
        } else if (view.view_name === 'AbsoluteLayout') {
            classNames.push('incito__absolute-layout-view');
        } else if (view.view_name === 'FlexLayout') {
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

            classNames.push('incito__flex-layout-view');

            styles.display = 'flex';

            if (
                flexAlignItemModes.indexOf(view.layout_flex_align_items) !== -1
            ) {
                styles['align-items'] = view.layout_flex_align_items;
                styles['ms-align-items'] = view.layout_flex_align_items;
            }

            if (
                flexJustifyModes.indexOf(view.layout_flex_justify_content) !==
                -1
            ) {
                styles['justify-content'] = view.layout_flex_justify_content;
                styles['ms-flex-pack'] = view.layout_flex_justify_content;
            }

            if (flexDirectionModes.indexOf(view.layout_flex_direction) !== -1) {
                styles['flex-direction'] = view.layout_flex_direction;
                styles['ms-flex-direction'] = view.layout_flex_direction;
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
            classNames.push('incito--lazy');

            attrs['data-bg'] = view.background_image;
        }

        if (
            ['repeat_x', 'repeat_y', 'repeat'].indexOf(
                view.background_tile_mode
            ) !== -1
        ) {
            styles['background-repeat'] = view.background_tile_mode.replace(
                '_',
                '-'
            );
        }

        if (isDefinedStr(view.background_image_position)) {
            styles[
                'background-position'
            ] = view.background_image_position.replace('_', ' ');
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

        const shadow = getShadow(view);

        if (shadow != null) {
            styles[
                'box-shadow'
            ] = `${shadow.dx}px ${shadow.dy}px ${shadow.radius}px ${shadow.color}`;
        }

        const strokeStyles = ['solid', 'dotted', 'dashed'];

        if (view.stroke_width != null) {
            styles['border-width'] = formatUnit(view.stroke_width);
        }
        if (view.stroke_color != null) {
            styles['border-color'] = view.stroke_color;
        }
        if (strokeStyles.indexOf(view.stroke_style) !== -1) {
            styles['border-style'] = view.stroke_style;
        }

        if (view.stroke_top_width != null) {
            styles['border-top-width'] = formatUnit(view.stroke_top_width);
        }
        if (view.stroke_top_color != null) {
            styles['border-top-color'] = view.stroke_top_color;
        }

        if (view.stroke_left_width != null) {
            styles['border-left-width'] = formatUnit(view.stroke_left_width);
        }
        if (view.stroke_left_color != null) {
            styles['border-left-color'] = view.stroke_left_color;
        }

        if (view.stroke_right_width != null) {
            styles['border-right-width'] = formatUnit(view.stroke_right_width);
        }
        if (view.stroke_right_color != null) {
            styles['border-right-color'] = view.stroke_right_color;
        }

        if (view.stroke_bottom_width != null) {
            styles['border-bottom-width'] = formatUnit(
                view.stroke_bottom_width
            );
        }
        if (view.stroke_bottom_color != null) {
            styles['border-bottom-color'] = view.stroke_bottom_color;
        }

        if (typeof view.layout_flex_shrink === 'number') {
            styles['flex-shrink'] = view.layout_flex_shrink;
            styles['ms-flex-shrink'] = view.layout_flex_shrink;
        }
        if (typeof view.layout_flex_grow === 'number') {
            styles['flex-grow'] = view.layout_flex_grow;
            styles['ms-flex-grow'] = view.layout_flex_grow;
        }
        if (view.layout_flex_basis != null) {
            styles['flex-basis'] = formatUnit(view.layout_flex_basis);
            styles['ms-flex-basis'] = formatUnit(view.layout_flex_basis);
        }

        const transforms = getTransforms(view);

        if (transforms.length > 0) {
            styles.transform = transforms.join(' ');
        }

        // Transform origin.
        if (
            Array.isArray(view.transform_origin) &&
            view.transform_origin.length === 2
        ) {
            styles['transform-origin'] = [
                formatUnit(view.transform_origin[0]),
                formatUnit(view.transform_origin[1])
            ].join(' ');
        }

        return {
            tagName,
            contents,
            classNames,
            styles,
            attrs
        };
    }

    renderHtml() {
        let html = '';
        const iter = (view) => {
            try {
                const {
                    tagName,
                    contents,
                    classNames,
                    styles,
                    attrs
                } = this.renderView(view);

                if (view.id != null && typeof view.meta === 'object') {
                    this.ids[view.id] = view.meta;
                }

                html += `<${tagName}`;
                html += ` class="${classNames.join(' ')}"`;

                for (const key in attrs) {
                    const value = attrs[key];

                    html += ` ${key}="${value}"`;
                }

                html += ' style="';

                for (const key in styles) {
                    const value = styles[key];

                    html += `${key}:${value};`;
                }

                html += '"';

                for (const key in attrs) {
                    const value = attrs[key];

                    html += ` ${key}="${value}"`;
                }

                html += '>';

                if (Array.isArray(view.child_views)) {
                    view.child_views.forEach((childView) => {
                        iter(childView);
                    });
                }

                if (contents) {
                    html += contents;
                }

                html += `</${tagName}>`;
            } catch (error) {}
        };

        iter(this.incito.root_view);

        return html;
    }
}
