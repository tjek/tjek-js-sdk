import * as AssetsKit from '../lib/coffeescript/kits/assets'

if typeof Blob != 'undefined'
    test 'Uploading a JSON blob', (done) ->
        json =
            str: 'str'
            int: 1
        blob = new Blob [JSON.stringify(json)],
            type: 'application/json'
        
        AssetsKit.fileUpload
            file: blob
        , (err, res) ->
            expect(res).toBeInstanceOf(Object)
            expect(typeof res.id).toBe('string')

            done()

            return

        return
else test('', ->)