const Tjek = require('../');
const apiKey = '00j4o5wpwptl84fuubdig2s6ej5uyna8';

Tjek.config.set({
    apiKey
});

describe('Tjek.CoreKit', () => {
    test('Making a request with JSON response', async () => {
        const data = await Tjek.CoreKit.request({url: '/v2/catalogs'});

        expect(data).toBeDefined();
        expect(typeof data).toBe('object');
    });
});
