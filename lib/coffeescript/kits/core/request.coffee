fetch = require 'cross-fetch'
SGN = require '../../sgn'
{promiseCallbackInterop} = require '../../util'

request = (options = {}, callback, secondTime) ->
    SGN.CoreKit.session.ensure (err) ->
        return reject(err) if err?

        url = SGN.config.get('coreUrl') + (options.url ? '')
        headers = options.headers ? {}
        token = SGN.config.get 'coreSessionToken'
        appVersion = SGN.config.get 'appVersion'
        appSecret = SGN.config.get 'appSecret'
        locale = SGN.config.get 'locale'
        qs = options.qs ? {}
        geo = options.geolocation

        headers['X-Token'] = token
        headers['X-Signature'] = SGN.CoreKit.session.sign appSecret, token if appSecret?

        qs.r_locale = locale if locale?
        qs.api_av = appVersion if appVersion?

        if geo?
            qs.r_lat = geo.latitude if geo.latitude? and not qs.r_lat?
            qs.r_lng = geo.longitude if geo.longitude? and not qs.r_lng?
            qs.r_radius = geo.radius if geo.radius? and not qs.r_radius?
            qs.r_sensor = geo.sensor if geo.sensor? and not qs.r_sensor?
        
        if Object.keys(qs).length
            url += '?' + (Object.keys(qs).map (k) ->
                if Array.isArray k
                    return qs[k].map((val) -> "#{encodeURIComponent(k)}[]=#{encodeURIComponent(val)}").join '&'
                
                "#{encodeURIComponent(k)}=#{encodeURIComponent(qs[k])}"
            ).join '&'

        req = fetch url,
            method: options.method
            body: options.body
            headers: headers
        
        req
            .then (response) ->
                response.json().then (json) ->
                    token = SGN.config.get 'coreSessionToken'
                    responseToken = response.headers['x-token']

                    SGN.CoreKit.session.saveToken responseToken if responseToken and token isnt responseToken

                    if response.status >= 200 and response.status < 300 or response.status is 304
                        callback null, json
                    else
                        if secondTime isnt true and json?.code in [1101, 1107, 1108]
                            SGN.config.set coreSessionToken: undefined

                            request options, callback, true
                        else
                            callback SGN.util.error(new Error('Core API error'),
                                code: 'CoreAPIError'
                                statusCode: response.status
                            ), json
                    
                    return
            .catch callback

    return

module.exports = promiseCallbackInterop request, 1