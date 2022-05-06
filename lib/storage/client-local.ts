const prefixKey = 'sgn-';

let storage: Storage;
function ensureStorage() {
    if (storage) return;

    try {
        storage = window.localStorage;

        storage[prefixKey + 'test-storage'] = 'foobar';
        delete storage[prefixKey + 'test-storage'];
    } catch (error) {
        storage = {} as Storage;
    }
}

export function get(key) {
    ensureStorage();

    try {
        return JSON.parse(storage[prefixKey + key]);
    } catch (error) {}
}

export function set(key: string, value: any) {
    ensureStorage();

    try {
        storage[prefixKey + key] = JSON.stringify(value);
    } catch (error) {}
}

export function remove(key: string) {
    ensureStorage();

    delete storage[prefixKey + key];
}

export function setWithEvent(key: string, value: any, eventName: string) {
    try {
        set(key, value);

        const event = new Event(eventName);

        window.dispatchEvent(event);
    } catch (error) {}
}
