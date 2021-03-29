const SGN = require('../');
const appKey = '00j4o5wpwptl84fuubdig2s6ej5uyna8';

SGN.config.set({
    appKey
});

describe('SGN.CoreKit', () => {
    test('Making a request with JSON response', async () => {
        const data = await SGN.CoreKit.request({url: '/v2/catalogs'});

        expect(data).toBeDefined();
        expect(typeof data).toBe('object');
    });
});
