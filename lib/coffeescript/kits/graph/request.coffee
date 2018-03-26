import { config } from '../../core'
import { btoa, error, isBrowser, isNode } from '../../util'
import request from '../../request'

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

export default (options = {}, callback) ->
    url = config.get 'graphUrl'
    timeout = 1000 * 12
    appKey = config.get 'appKey'
    authToken = config.get 'authToken'
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
    options.headers.Authorization = 'Basic ' + btoa("app-key:#{appKey}") if appKey?

    # Set cookies manually in node.js.
    if isNode() and authToken?
        options.cookies = [
            key: authTokenCookieName
            value: authToken
            url: url
        ]
    else if isBrowser()
        options.useCookies = true

    request options, (err, data) ->
        if err?
            callback error(new Error('Graph request error'),
                code: 'GraphRequestError'
            )
        else
            # Update auth token as it might have changed.
            if isNode()
                cookies = parseCookies data.headers?['set-cookie']
                authCookie = cookies[authTokenCookieName]

                if config.get('authToken') isnt authCookie
                    config.set 'authToken', authCookie

            if data.statusCode is 200
                callback null, data.body
            else
                callback error(new Error('Graph API error'),
                    code: 'GraphAPIError'
                    statusCode: data.statusCode
                )

        return

    return


