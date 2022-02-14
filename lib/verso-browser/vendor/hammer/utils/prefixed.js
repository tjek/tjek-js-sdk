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

    return VENDOR_PREFIXES.find(
        (prefix) => (prefix ? prefix + camelProp : property) in obj
    );
}
