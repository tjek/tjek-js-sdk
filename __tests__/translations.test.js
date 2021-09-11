const Tjek = require('../');

describe('Tjek.translations', () => {
    test('Can translate', () => {
        expect(typeof Tjek.translations.t('some_key')).toEqual('string');
        expect(typeof Tjek.translations.t('some_key')).toEqual('string');
    });

    test('Can update translations', () => {
        expect(Tjek.translations.t('non_existing_key')).toEqual('');

        Tjek.translations.update({non_existing_key: 'test'});

        expect(Tjek.translations.t('non_existing_key')).toEqual('test');
    });
});
