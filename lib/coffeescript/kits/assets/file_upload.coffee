SGN = require '../../sgn'

module.exports = (options = {}, callback, progressCallback) ->
    throw new Error('File is not defined') if not options.file?

    url = 'https://assets.service.shopgun.com/upload'
    body = new FormData()
    timeout = 1000 * 60 * 60

    body.append 'file', options.file

    SGN.request
        method: 'post'
        url: url
        body: body
        timeout: timeout
        headers:
            'Accept': 'application/json'
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
