import fetch from 'cross-fetch'
import SGN from'../../sgn'
import { promiseCallbackInterop, error, isBrowser, isNode } from '../../util'

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
        timeout: timeout
        headers:
            'Content-Type': 'application/json; charset=utf-8'
        body: JSON.stringify
            query: options.query
            operationName: options.operationName
            variables: options.variables

    # Set cookies manually in node.js.
    if isNode() and authToken?
        options.cookies = [
            key: authTokenCookieName
            value: authToken
            url: url
        ]
    else if isBrowser()
        options.credentials = 'include'

    fetch(url, options)
        .then (response) ->
            response.json().then (json) ->
                # Update auth token as it might have changed.
                if isNode()
                    cookies = parseCookies response.headers?['set-cookie']
                    authCookie = cookies[authTokenCookieName]

                    if SGN.config.get('authToken') isnt authCookie
                        SGN.config.set 'authToken', authCookie

                if response.status isnt 200
                    callback error(new Error('Graph API error'),
                        code: 'GraphAPIError'
                        statusCode: data.statusCode
                    )
                else
                    callback null, json
        .catch callback
    
    return

export default promiseCallbackInterop request, 1