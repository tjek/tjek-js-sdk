/**
 * @jest-environment node
 */
const SGN = require('../dist/sgn-sdk.js');

test('isBrowser works right', () => {
    expect(SGN.util.isNode()).toBeTruthy()
});