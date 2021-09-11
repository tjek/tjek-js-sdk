const prefixKey = 'tjek-';

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
        const firstTry = JSON.parse(storage[`${prefixKey}${key}`]);

        if (firstTry) {
            return firstTry;
        }

        return JSON.parse(storage[`sgn-${key}`]);
    } catch (error) {}
}

export function set(key, value) {
    try {
        storage[`${prefixKey}${key}`] = JSON.stringify(value);
    } catch (error) {}
}
