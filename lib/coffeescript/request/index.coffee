SGN = require '../sgn'

{ isBrowser } = require '../util'

XMLHttpRequest = if isBrowser() then window.XMLHttpRequest else require('xmlhttprequest')?.XMLHttpRequest

module.exports = (options = {}, callback, progressCallback) ->
    http = new XMLHttpRequest()
    method = options.method ? 'get'
    url = options.url
    headers = options.headers ? {}

    if options.json is true
        headers['Content-Type'] = 'application/json'
        headers['Accept'] = 'application/json'

    if options.qs?
        queryParams = SGN.util.formatQueryParams options.qs

        if url.indexOf('?') is -1
            url += '?' + queryParams
        else
            url += '&' + queryParams

    http.addEventListener 'load', ->
        resHeaders = http.getAllResponseHeaders().split '\r\n'
        resHeaders = resHeaders.reduce (acc, current, i) ->
            parts = current.split ': '

            acc[parts[0].toLowerCase()] = parts[1]

            acc
        , {}
        body = http.responseText

        if headers['Accept'] is 'application/json'
            try
                body = JSON.parse body

        callback null,
            statusCode: http.status
            headers: resHeaders
            body: body

        return
    http.addEventListener 'error', ->
        callback new Error()

        return
    http.addEventListener 'timeout', ->
        callback new Error()

        return
    
    if typeof progressCallback is 'function'
        http.upload.onprogress = (e) ->
            if e.lengthComputable
                progressCallback e.loaded, e.total

            return

    http.open method.toUpperCase(), url, true
    http.timeout = options.timeout if options.timeout?
    http.withCredentials = true if options.useCookies is true

    for header, value of headers
        http.setRequestHeader header, value if value?

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
