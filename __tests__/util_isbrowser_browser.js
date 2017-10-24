/**
 * @jest-environment jsdom
 */
SGN = require('../lib/coffeescript/browser');

test('isBrowser works right', () => {
  expect(SGN.util.isBrowser()).toBeTruthy;
  expect(SGN.util.isNode()).toBeFalsy;
});
