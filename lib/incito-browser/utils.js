export const formatUnit = (unit) => {
    if (unit == null) {
        return 0;
    } else if (typeof unit === 'number') {
        return `${unit}px`;
    } else if (typeof unit === 'string') {
        return unit.replace('dp', 'px');
    } else {
        return 0;
    }
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

export const throttle = (fn, delay) => {
    if (delay === 0) {
        return fn;
    }

    let timer = false;

    return () => {
        if (timer) {
            return;
        }

        timer = true;

        return setTimeout(function () {
            timer = false;

            fn(...arguments);
        }, delay);
    };
};
