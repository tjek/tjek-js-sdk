SGN = require '../../sgn'

module.exports = (options = {}, callback, progressCallback) ->
    throw new Error('File is not defined') if not options.file?

    url = SGN.config.get 'assetsFileUploadUrl'
    timeout = 1000 * 60 * 60

    SGN.request
        method: 'post'
        url: url
        headers:
            'Content-Type': 'application/json'
            'Accept': 'application/json'
        formData:
            file: options.file
        timeout: timeout
    , (err, data) ->
        if err?
            callback SGN.util.error(new Error('Request error'),
                code: 'RequestError'
            )
        else
            if data.statusCode is 200
                callback null, JSON.parse(data.body)
            else
                callback SGN.util.error(new Error('Request error'),
                    code: 'RequestError'
                    statusCode: data.statusCode
                )

        return
    , (loaded, total) ->
        if typeof progressCallback is 'function'
            progressCallback
                progress: loaded / total
                loaded: loaded
                total: total

        return

    return
