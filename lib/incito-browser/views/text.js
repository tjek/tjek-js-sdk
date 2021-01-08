import {escapeHTML, isDefinedStr} from '../utils';
import './text.styl';
import View from './view';

class TextView extends View {
    render() {
        if (!isDefinedStr(this.attrs.text)) {
            return this;
        }

        const textStyles = (this.attrs.text_style || '').split('|');
        let {text} = this.attrs;

        if (Array.isArray(this.attrs.spans) && this.attrs.spans.length > 0) {
            const parsedText = this.parseSpans(text, this.attrs.spans);
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

        if (this.attrs.text_prevent_widow) {
            text = text
                .replace(/&nbsp;([^\s]+)$/, ' $1')
                .replace(/\s([^\s]+)\s*$/, '&nbsp;$1');
        }

        this.el.innerHTML = text.replace(/\n/g, '<br>');

        // Font family.
        if (
            Array.isArray(this.attrs.font_family) &&
            this.attrs.font_family.length > 0
        ) {
            this.el.style.fontFamily = this.attrs.font_family.join(', ');
        } else {
            this.el.style.fontFamily = 'inherit';
        }

        // Text size.
        if (this.attrs.text_size != null) {
            this.el.style.fontSize = `${this.attrs.text_size}px`;
        }

        // Line height.
        if (this.attrs.line_spacing_multiplier != null) {
            this.el.style.lineHeight = this.attrs.line_spacing_multiplier;
        }

        // Text color.
        if (this.attrs.text_color != null) {
            this.el.style.color = this.attrs.text_color;
        }

        // Text styles.
        if (textStyles.indexOf('bold') !== -1) {
            this.el.style.fontWeight = 'bold';
        }
        if (textStyles.indexOf('italic') !== -1) {
            this.el.style.fontStyle = 'italic';
        }

        if (Array.isArray(this.attrs.text_decoration_line)) {
            this.el.style.textDecorationLine = this.attrs.text_decoration_line.join(
                ' '
            );
        }

        // Text shadow.
        const textShadow = this.getTextShadow();

        if (isDefinedStr(this.attrs.text_shadow)) {
            this.el.style.textShadow = this.attrs.text_shadow;
        } else if (textShadow != null) {
            this.el.style.textShadow = `${textShadow.dx}px ${textShadow.dy}px ${textShadow.radius}px ${textShadow.color}`;
        }

        // Text alignment.
        if (this.attrs.text_alignment === 'left') {
            this.el.style.textAlign = 'left';
        } else if (this.attrs.text_alignment === 'center') {
            this.el.style.textAlign = 'center';
        } else if (this.attrs.text_alignment === 'right') {
            this.el.style.textAlign = 'right';
        }

        // Max lines.
        if (this.attrs.single_line === true || this.attrs.max_lines === 1) {
            this.el.setAttribute('data-single-line', true);
        } else if (typeof this.attrs.max_lines === 'number') {
            this.el.style.display = '-webkit-box';
            this.el.style.webkitLineClamp = this.attrs.max_lines;
            this.el.style.webkitBoxOrient = 'vertical';
        }

        // All caps.
        if (this.attrs.text_all_caps === true) {
            this.el.style.textTransform = 'uppercase';
        }

        return this;
    }

    parseSpans(text, spans = []) {
        const result = [];

        if (spans.length === 0) {
            result.push({
                text
            });
        } else if (spans[0].start > 0) {
            result.push({
                text: text.slice(0, spans[0].start)
            });
        }

        spans.forEach((span, i) => {
            const startIndex = span.start;
            const endIndex = span.end;

            result.push({
                text: text.slice(startIndex, endIndex),
                span
            });

            if (i === spans.length - 1) {
                if (endIndex < text.length) {
                    result.push({
                        text: text.slice(endIndex, text.length)
                    });
                }
            } else if (endIndex < spans[i + 1].start) {
                result.push({
                    text: text.slice(endIndex, spans[i + 1].start)
                });
            }
        });

        return result;
    }

    getTextShadow() {
        if (isDefinedStr(this.attrs.text_shadow_color)) {
            const dx =
                typeof this.attrs.text_shadow_dx === 'number'
                    ? this.attrs.text_shadow_dx
                    : 0;
            const dy =
                typeof this.attrs.text_shadow_dy === 'number'
                    ? this.attrs.text_shadow_dy
                    : 0;
            const radius =
                typeof this.attrs.text_shadow_radius === 'number'
                    ? this.attrs.text_shadow_radius
                    : 0;
            const color = this.attrs.text_shadow_color;

            return {
                dx,
                dy,
                radius,
                color
            };
        }
    }
}
TextView.prototype.tagName = 'p';
TextView.prototype.className = 'incito__text-view';
export default TextView;
