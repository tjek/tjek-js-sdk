SGN = require '../../sgn'
{ promiseCallbackInterop } = require '../../util'

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
    url = SGN.config.get 'graphUrl'
    timeout = 1000 * 12
    appKey = SGN.config.get 'appKey'
    authToken = SGN.config.get 'authToken'
    authTokenCookieName = 'shopgun-auth-token'
    options =
        method: 'post'
        url: url
        timeout: timeout
        json: true
        headers: {}
        body:
            query: options.query
            operationName: options.operationName
            variables: options.variables

    # Apply authorization header when app key is provided to avoid rate limiting.
    options.headers.Authorization = 'Basic ' + SGN.util.btoa("app-key:#{appKey}") if appKey?

    # Set cookies manually in node.js.
    if SGN.util.isNode() and authToken?
        options.cookies = [
            key: authTokenCookieName
            value: authToken
            url: url
        ]
    else if SGN.util.isBrowser()
        options.useCookies = true

    SGN.request options, (err, data) ->
        if err?
            callback SGN.util.error(new Error('Graph request error'),
                code: 'GraphRequestError'
            )
        else
            # Update auth token as it might have changed.
            if SGN.util.isNode()
                cookies = parseCookies data.headers?['set-cookie']
                authCookie = cookies[authTokenCookieName]

                if SGN.config.get('authToken') isnt authCookie
                    SGN.config.set 'authToken', authCookie

            if data.statusCode is 200
                callback null, data.body
            else
                callback SGN.util.error(new Error('Graph API error'),
                    code: 'GraphAPIError'
                    statusCode: data.statusCode
                )

        return

    return

module.exports = promiseCallbackInterop(request, 1)
