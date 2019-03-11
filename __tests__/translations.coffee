import SGN from './sdk'

describe 'SGN.translations', ->
    test 'Can translate', ->
        expect(typeof SGN.translations.t('some_key')).toEqual 'string'

        return

    test 'Can update translations', ->
        expect(SGN.translations.t('non_existing_key')).toEqual ''

        SGN.translations.update non_existing_key: 'test'

        expect(SGN.translations.t('non_existing_key')).toEqual 'test'

        return
    
    return
