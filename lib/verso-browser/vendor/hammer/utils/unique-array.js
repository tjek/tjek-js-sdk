/**
 * @private
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
export default function uniqueArray(src, key, sort) {
    const results = [];
    const values = [];

    let i = 0;
    while (i < src.length) {
        const val = key ? src[i][key] : src[i];
        if (values.indexOf(val) < 0) results.push(src[i]);

        values[i] = val;
        i++;
    }

    if (sort) results.sort(key ? (a, b) => a[key] > b[key] : undefined);

    return results;
}
