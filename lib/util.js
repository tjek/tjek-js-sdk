export const isBrowser = () =>
    typeof window === 'object' && typeof document === 'object';

export const isNode = () => typeof process === 'object';

export function error(err, options) {
    err.message = err.message || null;

    if (typeof options === 'string') {
        err.message = options;
    } else if (typeof options === 'object' && options != null) {
        for (let key in options) err[key] = options[key];

        if (options.message) err.message = options.message;

        if (options.code || options.message) {
            err.code = options.code || options.name;
        }
        if (options.stack) err.stack = options.stack;
    }

    err.name = options?.name || err.name || err.code || 'Error';
    err.time = new Date();

    return err;
}

export function getQueryParam(field, url) {
    const href = url || window.location.href;
    const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    const string = reg.exec(href);

    return string ? string[1] : undefined;
}

export function getDeviceCategory() {
    if (navigator.platform === 'iPod' || navigator.platform === 'iPhone')
        return 'mobile';

    if (navigator.platform === 'iPad') return 'tablet';

    if (
        navigator.platform === 'Android' ||
        /android/gi.test(navigator.userAgent)
    ) {
        if (/tablet/gi.test(navigator.userAgent)) return 'tablet';

        return 'mobile';
    }

    return 'desktop';
}

export const getPointer = () =>
    matchMedia('(pointer:coarse)').matches ? 'coarse' : 'fine';

export function getOrientation(width, height) {
    if (width === height) return 'quadratic';

    return width > height ? 'horizontal' : 'vertical';
}

export function throttle(fn, threshold = 250, scope) {
    let last;
    let deferTimer;

    return function () {
        const context = scope || this;
        const now = new Date().getTime();
        const args = arguments;

        if (last && now < last + threshold) {
            clearTimeout(deferTimer);

            deferTimer = setTimeout(() => {
                last = now;

                fn.apply(context, args);
            }, threshold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}
