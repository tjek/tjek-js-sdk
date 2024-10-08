import Gator from '../vendor/gator';

export const isBrowser = () =>
    typeof window === 'object' && typeof document === 'object';

export const isNode = () => typeof process === 'object';

export function error(
    err: Error & {code?: string; time?: Date; statusCode?: number},
    options?: {
        message?: string;
        code?: string;
        name?: string;
        stack?: string;
        statusCode?: number;
    }
) {
    err.message = err.message;

    if (typeof options === 'string') {
        err.message = options;
    } else if (typeof options === 'object' && options) {
        for (const key in options) err[key] = options[key];

        if (options.message) err.message = options.message;

        if (options.code || options.message) {
            err.code = options.code || options.name;
        }
        if (options.stack) err.stack = options.stack;

        if (options.statusCode) err.statusCode = options.statusCode;
    }

    err.name = options?.name || err.name || err.code || 'Error';
    err.time = new Date();

    return err;
}

export function getQueryParam(field, url?: string) {
    const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    const string = reg.exec(url || window.location.href);

    return string ? string[1] : undefined;
}

export function throttle<A extends unknown[]>(
    fn: (...args: A) => unknown,
    threshold = 250,
    scope?: object
): (...args: A) => void {
    let last: number | undefined;
    let deferTimer: NodeJS.Timeout;

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

export function debounce<A extends unknown[]>(
    fn: (...args: A) => unknown,
    threshold = 250,
    scope?: object
): (...args: A) => void {
    let deferTimer: NodeJS.Timeout;

    return function () {
        const context = scope || this;
        const args = arguments;

        if (deferTimer) clearTimeout(deferTimer);

        deferTimer = setTimeout(() => fn.apply(context, args), threshold);
    };
}

export function chunk<I extends any>(arr: I[], size: number) {
    const results: I[][] = [];

    if (!arr.length) return results;
    if (size <= 0) return results;

    while (arr.length) results.push(arr.splice(0, size));

    return results;
}

export const on = (
    el: HTMLElement,
    events: string | string[],
    selector: string,
    callback: (event: any) => void
) =>
    //@ts-expect-error
    Gator(el).on(events, selector, callback);

export const off = (
    el: HTMLElement,
    events?: string | string[],
    selector?: string,
    callback?: (event: any) => void
) =>
    //@ts-expect-error
    Gator(el).off(events, selector, callback);

const overflowRE = /auto|scroll/;
export function getScrollContainer(target: HTMLElement) {
    let element: HTMLElement | null = target;
    while (element) {
        const {overflow, overflowY, overflowX} = getComputedStyle(element);
        if (overflowRE.test(overflow + overflowY + overflowX)) {
            return element;
        }

        element = element.parentElement;
    }

    return document.body;
}
