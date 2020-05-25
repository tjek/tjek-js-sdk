fetch = require 'cross-fetch'
SGN = require '../../sgn'
{promiseCallbackInterop} = require '../../util'

parseCookies = (cookies = []) ->
    parsedCookies = {}

    cookies.map (cookie) ->
        parts = cookie.split '; '
        keyValuePair = parts[0].split '='
        key = keyValuePair[0]
        value = keyValuePair[1]

        parsedCookies[key] = value

        return
    
    parsedCookies

request = (options = {}, callback) ->
    url = SGN.config.get 'coreUrl'
    timeout = 1000 * 12
    appKey = SGN.config.get 'appKey'
    options =
        method: 'post'
        timeout: timeout
        headers:
            'Content-Type': 'application/json; charset=utf-8'
            'X-Api-Key': appKey
        body: JSON.stringify
            query: options.query
            operationName: options.operationName
            variables: options.variables

    fetch(url, options)
        .then (response) ->
            response.json().then (json) ->
                if response.status isnt 200
                    callback SGN.util.error(new Error('Graph API error'),
                        code: 'GraphAPIError'
                        statusCode: data.statusCode
                    )
                else
                    callback null, json
        .catch callback
    
    return

module.exports = promiseCallbackInterop request, 1