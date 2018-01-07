SGN = require '../dist/sgn-sdk.js'
appKey = '00j486xcipwzk2rmcbzfalpk4sgx9v3i'
appSecret = '00j486xcipwg451xiucovj60t2buq5f6'

SGN.config.set
    appKey: appKey
    appSecret: appSecret

test 'Making a request', (done) ->
    SGN.CoreKit.request
        url: '/v2/countries'
    , (err, data) ->
        expect(data).toBeDefined()

        done()
        
        return

    return
