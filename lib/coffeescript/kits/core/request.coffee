import fetch from 'cross-fetch'
import SGN from '../../sgn'
import session from './session'
import { promiseCallbackInterop, error } from '../../util'

request = (options = {}, callback, secondTime) ->
    session.ensure (err) ->
        return callback(err) if err?

        url = SGN.config.get('coreUrl') + (options.url ? '')
        headers = options.headers ? {}
        json = if typeof options.json is 'boolean' then options.json else true
        token = SGN.config.get 'coreSessionToken'
        appKey = SGN.config.get 'appKey'
        appVersion = SGN.config.get 'appVersion'
        appSecret = SGN.config.get 'appSecret'
        locale = SGN.config.get 'locale'
        qs = options.qs ? {}
        geo = options.geolocation
        body = options.body
        
        headers['X-Api-Key'] = appKey
        headers['X-Token'] = token
        headers['X-Signature'] = session.sign appSecret, token if appSecret?

        if json
            headers['Content-Type'] = 'application/json'
            headers['Accept'] = 'application/json'

            if body
                body = JSON.stringify(body)

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
            body: body
            headers: headers
        
        req
            .then (response) ->
                response.json().then (data) ->
                    token = SGN.config.get 'coreSessionToken'
                    responseToken = response.headers.get 'x-token'

                    session.saveToken responseToken if responseToken and token isnt responseToken

                    if response.status >= 200 and response.status < 300 or response.status is 304
                        callback null, data
                    else
                        if secondTime isnt true and data?.code in [1101, 1107, 1108]
                            SGN.config.set coreSessionToken: undefined

                            request options, callback, true
                        else
                            callback error(new Error('Core API error'),
                                code: 'CoreAPIError'
                                statusCode: response.status
                            ), data
                    
                    return
            .catch callback

    return

export default promiseCallbackInterop request, 1
