import SGN from './sdk'

appKey = '00j4o5wpwptl84fuubdig2s6ej5uyna8'
appSecret = '00j4o5wpwppwtw4ojzn3rey7ujgy79nn'

SGN.config.set
    appKey: appKey
    appSecret: appSecret

describe 'SGN.CoreKit', ->
    test 'Making a request with JSON response', ->
        data = await SGN.CoreKit.request url: '/v2/catalogs'
        
        expect(data).toBeDefined()
        expect(typeof data).toBe 'object'

        return
    
    return