import {isNode} from '../util';

const prefixKey = 'sgn-';

export function get(key) {
    let value;
    if (isNode()) {
        return;
    }

    try {
        const name = `${prefixKey}${key}=`;
        const ca = document.cookie.split(';');

        ca.forEach((c) => {
            const ct = c.trim();

            if (ct.indexOf(name) === 0) {
                value = ct.substring(name.length, ct.length);
            }
        });

        value = JSON.parse(value);
    } catch (err) {
        value = {};
    }

    return value;
}

export function set(key, value) {
    if (isNode()) {
        return;
    }

    try {
        const days = 365;
        const date = new Date();
        const str = JSON.stringify(value);

        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

        document.cookie = `${prefixKey}${key}=${str};expires=${date.toUTCString()};path=/`;
    } catch (err) {}
}
