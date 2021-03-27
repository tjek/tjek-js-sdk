export const formatUnit = (unit) => {
    if (unit == null) {
        return 0;
    } else if (typeof unit === 'number') {
        return unit + 'px';
    } else if (typeof unit === 'string') {
        return unit.replace('dp', 'px');
    } else {
        return 0;
    }
};

export const escapeAttrValue = (value) => {
    if (typeof value === 'string') {
        return value.replace(/"/g, '&quot;');
    }

    return value;
};

export const isDefinedStr = (value) =>
    typeof value === 'string' && value.length > 0;

export const escapeHTML = (unsafe = '') =>
    unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

export const getShadow = (view) => {
    if (isDefinedStr(view.shadow_color)) {
        const dx = typeof view.shadow_dx === 'number' ? view.shadow_dx : 0;
        const dy = typeof view.shadow_dy === 'number' ? view.shadow_dy : 0;
        const radius =
            typeof view.shadow_radius === 'number' ? view.shadow_radius : 0;
        const color = view.shadow_color;

        return {
            dx,
            dy,
            radius,
            color
        };
    }
};

export const getTransforms = (view) => {
    const transforms = [];
    const translateX = formatUnit(view.transform_translate_x);
    const translateY = formatUnit(view.transform_translate_y);

    if (translateX !== 0) {
        transforms.push(`translateX(${translateX})`);
    }

    if (translateY !== 0) {
        transforms.push(`translateY(${translateY})`);
    }

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

    return transforms;
};

export const parseSpans = (text, spans = []) => {
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
};

export const getTextShadow = (view) => {
    if (isDefinedStr(view.text_shadow_color)) {
        const dx =
            typeof view.text_shadow_dx === 'number' ? view.text_shadow_dx : 0;
        const dy =
            typeof view.text_shadow_dy === 'number' ? view.text_shadow_dy : 0;
        const radius =
            typeof view.text_shadow_radius === 'number'
                ? view.text_shadow_radius
                : 0;
        const color = view.text_shadow_color;

        return {
            dx,
            dy,
            radius,
            color
        };
    }
};

export const loadFonts = (fontAssets = {}) => {
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
