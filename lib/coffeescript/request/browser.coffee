SGN = require '../sgn'

module.exports = (options = {}, callback, progressCallback) ->
    http = new XMLHttpRequest()
    method = options.method ? 'get'
    url = options.url

    url += SGN.util.formatQueryParams options.qs if options.qs?

    http.open method.toUpperCase(), url
    http.timeout = options.timeout if options.timeout?
    http.withCredentials = true if options.useCookies isnt false

    if options.headers?
        for header, value of options.headers
            http.setRequestHeader header, value

    http.addEventListener 'load', ->
        headers = http.getAllResponseHeaders().split '\r\n'
        headers = headers.reduce (acc, current, i) ->
            parts = current.split ': '

            acc[parts[0].toLowerCase()] = parts[1]

            acc
        , {}

        callback null,
            statusCode: http.status
            headers: headers
            body: http.responseText

        return
    http.addEventListener 'error', ->
        callback new Error()

        return
    http.addEventListener 'timeout', ->
        callback new Error()

        return
    http.addEventListener 'progress', (e) ->
        if e.lengthComputable and typeof progressCallback is 'function'
            progressCallback e.loaded, e.total

        return

    http.send options.body

    return
