const SGN = require('../__tests_utils__/sdk');
const appKey = '00j4o5wpwptl84fuubdig2s6ej5uyna8';
const appSecret = '00j4o5wpwppwtw4ojzn3rey7ujgy79nn';

SGN.config.set({
    appKey,
    appSecret
});

describe('SGN.CoreKit', () => {
    test('Making a request with JSON response', async () => {
        const data = await SGN.CoreKit.request({url: '/v2/catalogs'});

        expect(data).toBeDefined();
        expect(typeof data).toBe('object');
    });
});
