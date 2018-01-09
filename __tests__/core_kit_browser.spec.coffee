SGN = require '../dist/sgn-sdk.js'
appKey = '00j4o5wpwptl84fuubdig2s6ej5uyna8'
appSecret = '00j4o5wpwppwtw4ojzn3rey7ujgy79nn'

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
