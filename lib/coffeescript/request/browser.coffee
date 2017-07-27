SGN = require '../sgn'

module.exports = (options = {}, callback, progressCallback) ->
    http = new XMLHttpRequest()
    method = options.method ? 'get'
    url = options.url
    headers = options.headers ? {}

    if options.qs?
        queryParams = SGN.util.formatQueryParams options.qs

        if url.indexOf('?') is -1
            url += '?' + queryParams
        else
            url += '&' + queryParams

    http.open method.toUpperCase(), url
    http.timeout = options.timeout if options.timeout?
    http.withCredentials = true if options.useCookies is true

    if options.json is true
        headers['Content-Type'] = 'application/json'
        headers['Accept'] = 'application/json'

    for header, value of options.headers
        http.setRequestHeader header, value

    http.addEventListener 'load', ->
        headers = http.getAllResponseHeaders().split '\r\n'
        headers = headers.reduce (acc, current, i) ->
            parts = current.split ': '

            acc[parts[0].toLowerCase()] = parts[1]

            acc
        , {}
        body = http.responseText

        body = JSON.parse body if options.json is true

        callback null,
            statusCode: http.status
            headers: headers
            body: body

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

    if options.formData?
        formData = new FormData()

        for key, value of options.formData
            formData.append key, value

        http.send formData
    else if options.body?
        if options.json is true
            http.send JSON.stringify(options.body)
        else
            http.send options.body
    else
        http.send()

    return
