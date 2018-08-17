SGN = require './sdk'

describe 'SGN.translations', ->
    test 'can translate', ->
        expect(typeof SGN.translations.t('some_key')).toEqual 'string'

        return

    test 'can update translations', ->
        expect(SGN.translations.t('non_existing_key')).toEqual ''

        SGN.translations.update non_existing_key: 'test'

        expect(SGN.translations.t('non_existing_key')).toEqual 'test'

        return
    
    return