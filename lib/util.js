var util = {
    isBrowser() {
        return typeof window === 'object' && typeof document === 'object';
    },

    isNode() {
        return typeof process === 'object';
    },

    error(err, options) {
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
    },

    uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;

            return v.toString(16);
        });
    },

    getQueryParam(field, url) {
        const href = url || window.location.href;
        const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        const string = reg.exec(href);

        if (string) {
            return string[1];
        }
        return undefined;
    },

    getRandomNumberBetween(from, to) {
        return Math.floor(Math.random() * to) + from;
    },

    getOS() {
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
    },

    getDeviceCategory() {
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
    },

    getPointer() {
        let pointer = 'fine';

        if (matchMedia('(pointer:coarse)').matches) {
            pointer = 'coarse';
        }

        return pointer;
    },

    getOrientation(width, height) {
        if (width === height) {
            return 'quadratic';
        } else if (width > height) {
            return 'horizontal';
        } else {
            return 'vertical';
        }
    },

    getScreenDimensions() {
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
    },

    getUtcOffsetSeconds() {
        const now = new Date();
        const jan1 = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
        const tmp = jan1.toGMTString();
        const jan2 = new Date(tmp.substring(0, tmp.lastIndexOf(' ') - 1));
        const stdTimeOffset = (jan1 - jan2) / 1000;

        return stdTimeOffset;
    },

    getUtcDstOffsetSeconds() {
        return new Date().getTimezoneOffset() * 60 * -1;
    },

    getColorBrightness(color) {
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
    },

    btoa(str) {
        if (util.isBrowser()) {
            return btoa(str);
        } else {
            let buffer = null;

            if (str instanceof Buffer) {
                buffer = str;
            } else {
                buffer = new Buffer(str.toString(), 'binary');
            }

            return buffer.toString('base64');
        }
    },

    chunk(arr, size) {
        const results = [];

        while (arr.length) {
            results.push(arr.splice(0, size));
        }

        return results;
    },

    throttle(fn, threshold = 250, scope) {
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
    },

    loadImage(src, callback) {
        const img = new Image();

        img.onload = () => callback(null, img.width, img.height);
        img.onerror = () => callback(new Error());
        img.src = src;

        return img;
    },

    distance(lat1, lng1, lat2, lng2) {
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
    },

    async: {
        parallel(asyncCalls, sharedCallback) {
            let counter = asyncCalls.length;
            const allResults = [];
            let k = 0;

            const makeCallback = (index) =>
                function () {
                    const results = [];
                    let i = 0;

                    counter--;

                    while (i < arguments.length) {
                        results.push(arguments[i]);
                        i++;
                    }

                    allResults[index] = results;

                    if (counter === 0) {
                        sharedCallback(allResults);
                    }
                };

            while (k < asyncCalls.length) {
                asyncCalls[k](makeCallback(k));
                k++;
            }
        }
    },

    // Method for wrapping a function that takes a callback in any position
    // to return promises if no callback is given in a call.
    // The second argument, cbParameterIndex, is the position of the callback in the original functions parameter list.
    // CoffeeScript optional parameters messes with this function arity detection,
    // not sure what to do about that, other than always setting cbParameterIndex at callsites.
    promiseCallbackInterop(fun, cbParameterIndex = fun.length - 1) {
        // This is the function that actually wraps and calls a method to return a promise.
        const makePromise = (fun, cbParameterIndex, parameters) =>
            new Promise((resolve, reject) => {
                const neoCallback = (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);
                };

                const callParameters = [];
                for (
                    let i = 0,
                        end = Math.max(parameters.length, cbParameterIndex) + 1,
                        asc = 0 <= end;
                    asc ? i < end : i > end;
                    asc ? i++ : i--
                ) {
                    callParameters.push(
                        i === cbParameterIndex ? neoCallback : parameters[i]
                    );
                }

                return fun.apply(this, callParameters);
            });
        // Wrapper function that decides what to do per-call.
        return (...parameters) => {
            if (typeof parameters[cbParameterIndex] === 'function') {
                // Callback given, do a regular old call.
                return fun.apply(null, parameters);
            } else if (typeof Promise === 'function') {
                // No callback given, and we have promise support, use makePromise to wrap the call.
                return makePromise(fun, cbParameterIndex, parameters);
            } else {
                // Ain't got callback, ain't got promise support; we gotta tell the developer.
                throw new Error(`To be able to use this asynchronous method you should:
Supply a callback function as argument #${1 + cbParameterIndex}.
This callback function will be called with the method call response.
Alternatively, when supported, it can return a Promise if no callback function is given.\
`);
            }
        };
    }
};

module.exports = util;
