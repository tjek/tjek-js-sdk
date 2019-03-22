if (typeof process === 'object' && typeof window !== 'object') {
  module.exports = require('../dist/sgn-sdk.cjs');
} else {
  module.exports = require('../dist/sgn-sdk');
}
