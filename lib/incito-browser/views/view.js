import {formatUnit, isDefinedStr} from '../utils';
import './view.styl';

class View {
    constructor(attrs = {}) {
        this.attrs = attrs;
        this.el = this.createElement();

        this.setAttributes();
    }

    render() {
        return this;
    }

    createElement() {
        const el = document.createElement(this.tagName);
        const className = this.className ?? '';

        el.className = 'incito__view ' + className;

        return el;
    }

    setAttributes() {
        // Identifier.
        if (isDefinedStr(this.attrs.id)) {
            this.el.setAttribute('data-id', this.attrs.id);
        }

        // Role.
        if (isDefinedStr(this.attrs.role)) {
            this.el.setAttribute('data-role', this.attrs.role);
        }

        // Accessibility label.
        if (isDefinedStr(this.attrs.accessibility_label)) {
            this.el.setAttribute('aria-label', this.attrs.accessibility_label);
        }

        // Accessibility visibility.
        if (this.attrs.accessibility_hidden === true) {
            this.el.setAttribute('aria-hidden', true);
        }

        // Feature labels.
        if (Array.isArray(this.attrs.feature_labels)) {
            const featureLabels = this.attrs.feature_labels.filter(
                (featureLabel) => /^[a-z_-]{1,14}$/.test(featureLabel)
            );

            if (featureLabels.length) {
                this.el.setAttribute(
                    'data-feature-labels',
                    featureLabels.join(',')
                );
            }
        }

        // Title.
        if (isDefinedStr(this.attrs.title)) {
            this.el.setAttribute('title', this.attrs.title);
        }

        // Gravity.
        if (isDefinedStr(this.attrs.gravity)) {
            this.el.setAttribute('data-gravity', this.attrs.gravity);
        }

        // Link.
        if (isDefinedStr(this.attrs.link)) {
            this.el.setAttribute('data-link', '');
            this.el.addEventListener(
                'click',
                () => {
                    window.open(this.attrs.link, '_blank');
                },
                false
            );
        }

        // Width.
        if (this.attrs.layout_width === 'match_parent') {
            this.el.style.width = '100%';
        } else if (this.attrs.layout_width === 'wrap_content') {
            this.el.style.display = 'inline-block';
        } else if (this.attrs.layout_width != null) {
            this.el.style.width = formatUnit(this.attrs.layout_width);
        }

        // Height.
        if (this.attrs.layout_height === 'match_parent') {
            this.el.style.height = '100%';
        } else if (this.attrs.layout_height === 'wrap_content') {
            this.el.style.height = 'auto';
        } else if (this.attrs.layout_height != null) {
            this.el.style.height = formatUnit(this.attrs.layout_height);
        }

        // Min width.
        if (this.attrs.min_width != null) {
            this.el.style.minWidth = formatUnit(this.attrs.min_width);
        }

        // Max width.
        if (this.attrs.max_width != null) {
            this.el.style.maxWidth = formatUnit(this.attrs.max_width);
        }

        // Min height.
        if (this.attrs.min_height != null) {
            this.el.style.minHeight = formatUnit(this.attrs.min_height);
        }

        // Max height.
        if (this.attrs.max_height != null) {
            this.el.style.maxHeight = formatUnit(this.attrs.max_height);
        }

        // Position in relation to parent.
        if (this.attrs.layout_top != null) {
            this.el.style.top = formatUnit(this.attrs.layout_top);
        }
        if (this.attrs.layout_left != null) {
            this.el.style.left = formatUnit(this.attrs.layout_left);
        }
        if (this.attrs.layout_right != null) {
            this.el.style.right = formatUnit(this.attrs.layout_right);
        }
        if (this.attrs.layout_bottom != null) {
            this.el.style.bottom = formatUnit(this.attrs.layout_bottom);
        }

        // Background.
        if (isDefinedStr(this.attrs.background_color)) {
            this.el.style.backgroundColor = this.attrs.background_color;
        }
        if (isDefinedStr(this.attrs.background_image)) {
            this.el.setAttribute('data-src', this.attrs.background_image);
            this.lazyload = true;
        }
        if (
            ['repeat_x', 'repeat_y', 'repeat'].indexOf(
                this.attrs.background_tile_mode
            ) !== -1
        ) {
            this.el.style.backgroundRepeat = this.attrs.background_tile_mode.replace(
                '_',
                '-'
            );
        }
        if (isDefinedStr(this.attrs.background_image_position)) {
            this.el.style.backgroundPosition = this.attrs.background_image_position.replace(
                '_',
                ' '
            );
        }
        if (this.attrs.background_image_scale_type === 'center_crop') {
            this.el.style.backgroundSize = 'cover';
        } else if (this.attrs.background_image_scale_type === 'center_inside') {
            this.el.style.backgroundSize = 'contain';
        }

        // Margin.
        if (this.attrs.layout_margin != null) {
            this.el.style.margin = formatUnit(this.attrs.layout_margin);
        }
        if (this.attrs.layout_margin_top != null) {
            this.el.style.marginTop = formatUnit(this.attrs.layout_margin_top);
        }
        if (this.attrs.layout_margin_left != null) {
            this.el.style.marginLeft = formatUnit(
                this.attrs.layout_margin_left
            );
        }
        if (this.attrs.layout_margin_right != null) {
            this.el.style.marginRight = formatUnit(
                this.attrs.layout_margin_right
            );
        }
        if (this.attrs.layout_margin_bottom != null) {
            this.el.style.marginBottom = formatUnit(
                this.attrs.layout_margin_bottom
            );
        }

        // Padding.
        if (this.attrs.padding != null) {
            this.el.style.padding = formatUnit(this.attrs.padding);
        }
        if (this.attrs.padding_top != null) {
            this.el.style.paddingTop = formatUnit(this.attrs.padding_top);
        }
        if (this.attrs.padding_left != null) {
            this.el.style.paddingLeft = formatUnit(this.attrs.padding_left);
        }
        if (this.attrs.padding_right != null) {
            this.el.style.paddingRight = formatUnit(this.attrs.padding_right);
        }
        if (this.attrs.padding_bottom != null) {
            this.el.style.paddingBottom = formatUnit(this.attrs.padding_bottom);
        }

        // Corner radius.
        if (this.attrs.corner_radius != null) {
            this.el.style.borderRadius = formatUnit(this.attrs.corner_radius);
        }
        if (this.attrs.corner_top_left_radius != null) {
            this.el.style.borderTopLeftRadius = formatUnit(
                this.attrs.corner_top_left_radius
            );
        }
        if (this.attrs.corner_top_right_radius != null) {
            this.el.style.borderTopRightRadius = formatUnit(
                this.attrs.corner_top_right_radius
            );
        }
        if (this.attrs.corner_bottom_left_radius != null) {
            this.el.style.borderBottomLeftRadius = formatUnit(
                this.attrs.corner_bottom_left_radius
            );
        }
        if (this.attrs.corner_bottom_right_radius != null) {
            this.el.style.borderBottomRightRadius = formatUnit(
                this.attrs.corner_bottom_right_radius
            );
        }

        // Clip children.
        if (this.attrs.clip_children === false) {
            this.el.style.overflow = 'visible';
        }

        // Shadow.
        const shadow = this.getShadow();

        if (shadow != null) {
            this.el.style.boxShadow = `${shadow.dx}px ${shadow.dy}px ${shadow.radius}px ${shadow.color}`;
        }

        // Stroke.
        const strokeStyles = ['solid', 'dotted', 'dashed'];

        if (this.attrs.stroke_width != null) {
            this.el.style.borderWidth = formatUnit(this.attrs.stroke_width);
        }
        if (this.attrs.stroke_color != null) {
            this.el.style.borderColor = this.attrs.stroke_color;
        }
        if (strokeStyles.indexOf(this.attrs.stroke_style) !== -1) {
            this.el.style.borderStyle = this.attrs.stroke_style;
        }

        if (this.attrs.stroke_top_width != null) {
            this.el.style.borderTopWidth = formatUnit(
                this.attrs.stroke_top_width
            );
        }
        if (this.attrs.stroke_top_color != null) {
            this.el.style.borderTopColor = this.attrs.stroke_top_color;
        }

        if (this.attrs.stroke_left_width != null) {
            this.el.style.borderLeftWidth = formatUnit(
                this.attrs.stroke_left_width
            );
        }
        if (this.attrs.stroke_left_color != null) {
            this.el.style.borderLeftColor = this.attrs.stroke_left_color;
        }

        if (this.attrs.stroke_right_width != null) {
            this.el.style.borderRightWidth = formatUnit(
                this.attrs.stroke_right_width
            );
        }
        if (this.attrs.stroke_right_color != null) {
            this.el.style.borderRightColor = this.attrs.stroke_right_color;
        }

        if (this.attrs.stroke_bottom_width != null) {
            this.el.style.borderBottomWidth = formatUnit(
                this.attrs.stroke_bottom_width
            );
        }
        if (this.attrs.stroke_bottom_color != null) {
            this.el.style.borderBottomColor = this.attrs.stroke_bottom_color;
        }

        // Flex.
        if (typeof this.attrs.layout_flex_shrink === 'number') {
            this.el.style.flexShrink = this.attrs.layout_flex_shrink;
            this.el.style.msFlexShrink = this.attrs.layout_flex_shrink;
        }
        if (typeof this.attrs.layout_flex_grow === 'number') {
            this.el.style.flexGrow = this.attrs.layout_flex_grow;
            this.el.style.msFlexGrow = this.attrs.layout_flex_grow;
        }
        if (this.attrs.layout_flex_basis != null) {
            this.el.style.flexBasis = formatUnit(this.attrs.layout_flex_basis);
            this.el.style.msFlexBasis = formatUnit(
                this.attrs.layout_flex_basis
            );
        }

        // Transforms.
        const transforms = this.getTransforms();

        if (transforms.length > 0) {
            this.el.style.transform = transforms.join(' ');
        }

        // Transform origin.
        if (
            Array.isArray(this.attrs.transform_origin) &&
            this.attrs.transform_origin.length === 2
        ) {
            this.el.style.transformOrigin = [
                formatUnit(this.attrs.transform_origin[0]),
                formatUnit(this.attrs.transform_origin[1])
            ].join(' ');
        }
    }

    getTransforms() {
        const transforms = [];
        const translateX = formatUnit(this.attrs.transform_translate_x);
        const translateY = formatUnit(this.attrs.transform_translate_y);

        if (translateX !== 0) {
            transforms.push(`translateX(${translateX})`);
        }

        if (translateY !== 0) {
            transforms.push(`translateY(${translateY})`);
        }

        if (
            typeof this.attrs.transform_rotate === 'number' &&
            this.attrs.transform_rotate !== 0
        ) {
            transforms.push(`rotate(${this.attrs.transform_rotate}deg)`);
        }

        if (
            typeof this.attrs.transform_scale === 'number' &&
            this.attrs.transform_scale !== 1
        ) {
            transforms.push(`scale(${this.attrs.transform_scale})`);
        }

        return transforms;
    }

    getShadow() {
        if (isDefinedStr(this.attrs.shadow_color)) {
            const dx =
                typeof this.attrs.shadow_dx === 'number'
                    ? this.attrs.shadow_dx
                    : 0;
            const dy =
                typeof this.attrs.shadow_dy === 'number'
                    ? this.attrs.shadow_dy
                    : 0;
            const radius =
                typeof this.attrs.shadow_radius === 'number'
                    ? this.attrs.shadow_radius
                    : 0;
            const color = this.attrs.shadow_color;

            return {
                dx,
                dy,
                radius,
                color
            };
        }
    }
}
View.prototype.tagName = 'div';
View.prototype.className = null;
export default View;
