export function isBrowser() {
    return typeof window === 'object' && typeof document === 'object';
}

export function isNode() {
    return typeof process === 'object';
}

export function error(err, options) {
    err.message = err.message || null;

    if (typeof options === 'string') {
        err.message = options;
    } else if (typeof options === 'object' && options != null) {
        for (let key in options) {
            const value = options[key];
            err[key] = value;
        }

        if (options.message != null) {
            err.message = options.message;
        }
        if (options.code != null || options.message != null) {
            err.code = options.code || options.name;
        }
        if (options.stack != null) {
            err.stack = options.stack;
        }
    }

    err.name = options?.name || err.name || err.code || 'Error';
    err.time = new Date();

    return err;
}

export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;

        return v.toString(16);
    });
}

export function getQueryParam(field, url) {
    const href = url || window.location.href;
    const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    const string = reg.exec(href);

    if (string) {
        return string[1];
    }
    return undefined;
}

export function getRandomNumberBetween(from, to) {
    return Math.floor(Math.random() * to) + from;
}

export function getOS() {
    let name = null;
    const ua = window.navigator.userAgent;

    if (ua.indexOf('Windows') > -1) {
        name = 'Windows';
    } else if (ua.indexOf('Mac') > -1) {
        name = 'macOS';
    } else if (ua.indexOf('X11') > -1) {
        name = 'unix';
    } else if (ua.indexOf('Linux') > -1) {
        name = 'Linux';
    } else if (ua.indexOf('iOS') > -1) {
        name = 'iOS';
    } else if (ua.indexOf('Android') > -1) {
        name = 'Android';
    }

    return name;
}

export function getDeviceCategory() {
    let deviceCategory = 'desktop';

    if (navigator.platform === 'iPod' || navigator.platform === 'iPhone') {
        deviceCategory = 'mobile';
    } else if (navigator.platform === 'iPad') {
        deviceCategory = 'tablet';
    } else if (
        navigator.platform === 'Android' ||
        /android/gi.test(navigator.userAgent)
    ) {
        if (/tablet/gi.test(navigator.userAgent)) {
            deviceCategory = 'tablet';
        } else {
            deviceCategory = 'mobile';
        }
    }

    return deviceCategory;
}

export function getPointer() {
    let pointer = 'fine';

    if (matchMedia('(pointer:coarse)').matches) {
        pointer = 'coarse';
    }

    return pointer;
}

export function getOrientation(width, height) {
    if (width === height) {
        return 'quadratic';
    } else if (width > height) {
        return 'horizontal';
    } else {
        return 'vertical';
    }
}

export function getScreenDimensions() {
    const density = window.devicePixelRatio ?? 1;
    const logical = {
        width: window.screen.width,
        height: window.screen.height
    };
    const physical = {
        width: Math.round(logical.width * density),
        height: Math.round(logical.height * density)
    };

    return {
        density,
        logical,
        physical
    };
}

export function getUtcOffsetSeconds() {
    const now = new Date();
    const jan1 = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    const tmp = jan1.toGMTString();
    const jan2 = new Date(tmp.substring(0, tmp.lastIndexOf(' ') - 1));
    const stdTimeOffset = (jan1 - jan2) / 1000;

    return stdTimeOffset;
}

export function getUtcDstOffsetSeconds() {
    return new Date().getTimezoneOffset() * 60 * -1;
}

export function getColorBrightness(color) {
    color = color.replace('#', '');
    var hex = parseInt((hex + '').replace(/[^a-f0-9]/gi, ''), 16);
    const rgb = [];
    let sum = 0;
    let x = 0;

    while (x < 3) {
        const s = parseInt(color.substring(2 * x, 2), 16);
        rgb[x] = s;

        if (s > 0) {
            sum += s;
        }

        ++x;
    }

    if (sum <= 381) {
        return 'dark';
    } else {
        return 'light';
    }
}

export function btoa(str) {
    if (isBrowser()) {
        return window.btoa(str);
    } else {
        let buffer = null;

        if (str instanceof Buffer) {
            buffer = str;
        } else {
            buffer = Buffer.from(str.toString(), 'binary');
        }

        return buffer.toString('base64');
    }
}

export function chunk(arr, size) {
    const results = [];

    while (arr.length) {
        results.push(arr.splice(0, size));
    }

    return results;
}

export function throttle(fn, threshold = 250, scope) {
    let last = undefined;
    let deferTimer = undefined;

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

export function loadImage(src, callback) {
    const img = new Image();

    img.onload = () => callback(null, img.width, img.height);
    img.onerror = () => callback(new Error());
    img.src = src;

    return img;
}

export function distance(lat1, lng1, lat2, lng2) {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lng1 - lng2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344 * 1000;

    return dist;
}

export function closest(el, s) {
    const matches =
        Element.prototype.matches ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;

    do {
        if (matches.call(el, s)) return el;

        el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
}
