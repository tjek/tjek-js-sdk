const prefixKey = 'sgn-';

const storage = (() => {
    try {
        const storage = window.localStorage;

        storage[`${prefixKey}test-storage`] = 'foobar';
        delete storage[`${prefixKey}test-storage`];

        return storage;
    } catch (error) {
        return {};
    }
})();

export function get(key) {
    try {
        return JSON.parse(storage[`${prefixKey}${key}`]);
    } catch (error) {}
}

export function set(key, value) {
    try {
        storage[`${prefixKey}${key}`] = JSON.stringify(value);

        const event = new Event('tjek_shopping_list_update');

        window.dispatchEvent(event);
    } catch (error) {}
}
