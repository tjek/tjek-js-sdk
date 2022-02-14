const prefixKey = 'sgn-';

let storage;
function ensureStorage() {
    if (storage) return;

    try {
        storage = window.localStorage;

        storage[prefixKey + 'test-storage'] = 'foobar';
        delete storage[prefixKey + 'test-storage'];
    } catch (error) {
        storage = {};
    }
}

export function get(key) {
    ensureStorage();

    try {
        return JSON.parse(storage[prefixKey + key]);
    } catch (error) {}
}

export function set(key, value) {
    ensureStorage();

    try {
        storage[prefixKey + key] = JSON.stringify(value);
    } catch (error) {}
}

export function remove(key) {
    ensureStorage();

    delete storage[prefixKey + key];
}

export function setWithEvent(key, value, eventName) {
    try {
        set(key, value);

        const event = new Event(eventName);

        window.dispatchEvent(event);
    } catch (error) {}
}
