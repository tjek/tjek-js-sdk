const VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
/**
 * @private
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
export default function prefixed(obj, property) {
    const camelProp = property[0].toUpperCase() + property.slice(1);

    let i = 0;
    while (i < VENDOR_PREFIXES.length) {
        const prefix = VENDOR_PREFIXES[i];
        const prop = prefix ? prefix + camelProp : property;

        if (prop in obj) return prop;

        i++;
    }
}
