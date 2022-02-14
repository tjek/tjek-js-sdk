import Gator from '../vendor/gator';

export const isBrowser = () =>
    typeof window === 'object' && typeof document === 'object';

export const isNode = () => typeof process === 'object';

export function error(err, options) {
    err.message = err.message || null;

    if (typeof options === 'string') {
        err.message = options;
    } else if (typeof options === 'object' && options) {
        for (const key in options) err[key] = options[key];

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
    const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    const string = reg.exec(url || window.location.href);

    return string ? string[1] : undefined;
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

export const on = (el, events, selector, callback) =>
    Gator(el).on(events, selector, callback);

export const off = (el, events, selector, callback) =>
    Gator(el).off(events, selector, callback);
