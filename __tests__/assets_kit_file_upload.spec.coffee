SGN = require '../dist/sgn-sdk.js'

test 'Uploading a JSON blob', (done) ->
    json =
        str: 'str'
        int: 1
    blob = new Blob [JSON.stringify(json)],
        type: 'application/json'
    
    SGN.AssetsKit.fileUpload
        file: blob
    , (err, res) ->
        expect(res).toBeInstanceOf(Object)
        expect(typeof res.id).toBe('string')

        done()

        return

    return