SGN = require '../dist/sgn-sdk.js'
appKey = '00j4o5wpwptl84fuubdig2s6ej5uyna8'
appSecret = '00j4o5wpwppwtw4ojzn3rey7ujgy79nn'

SGN.config.set
    appKey: appKey
    appSecret: appSecret

test 'Making a request with JSON response', (done) ->
    SGN.CoreKit.request
        url: '/v2/catalogs'
    , (err, data) ->
        expect(data).toBeDefined()
        expect(typeof data).toBe('object')

        done()
        
        return

    return

test 'Making a request with JSON response, promises async/await style', ->
    data = await SGN.CoreKit.request url: '/v2/catalogs'
    expect(data).toBeDefined()
    expect(typeof data).toBe('object')

test 'Making a request with string response', (done) ->
    SGN.CoreKit.request
        url: '/v2/catalogs'
        json: false
    , (err, data) ->
        expect(data).toBeDefined()
        expect(typeof data).toBe('string')

        done()
        
        return

    return