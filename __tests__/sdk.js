if (typeof process === 'object') {
    module.exports = require('../dist/sgn-sdk.cjs');
} else {
    module.exports = require('../dist/sgn-sdk');
}