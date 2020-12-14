const prefixKey = 'sgn-';

module.exports = {
    key: 'sgn-',

    storage: (() => {
        try {
            const storage = window.localStorage;

            storage[`${prefixKey}test-storage`] = 'foobar';
            delete storage[`${prefixKey}test-storage`];

            return storage;
        } catch (error) {
            return {};
        }
    })(),

    get(key) {
        try {
            return JSON.parse(this.storage[`${prefixKey}${key}`]);
        } catch (error) {}
    },

    set(key, value) {
        try {
            this.storage[`${prefixKey}${key}`] = JSON.stringify(value);
        } catch (error) {}

        return this;
    }
};
