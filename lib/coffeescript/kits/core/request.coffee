fetch = require 'cross-fetch'
SGN = require '../../sgn'

module.exports = (options = {}, callback = ->, runs = 0) ->
    SGN.CoreKit.session.ensure (err) ->
        return callback err if err?

        url = options.url ? ''
        headers = options.headers ? {}
        json = if typeof options.json is 'boolean' then options.json else true
        token = SGN.config.get 'coreSessionToken'
        clientId = SGN.config.get 'coreSessionClientId'
        appVersion = SGN.config.get 'appVersion'
        appSecret = SGN.config.get 'appSecret'
        locale = SGN.config.get 'locale'
        qs = options.qs ? {}
        geo = options.geolocation

        headers['X-Token'] = token
        headers['X-Signature'] = SGN.CoreKit.session.sign appSecret, token if appSecret?

        qs.r_locale = locale if locale?
        qs.api_av = appVersion if appVersion?
        qs.client_id = clientId if clientId?

        if geo?
            qs.r_lat = geo.latitude if geo.latitude? and not qs.r_lat?
            qs.r_lng = geo.longitude if geo.longitude? and not qs.r_lng?
            qs.r_radius = geo.radius if geo.radius? and not qs.r_radius?
            qs.r_sensor = geo.sensor if geo.sensor? and not qs.r_sensor?

        req = fetch SGN.config.get('coreUrl') + url,
            method: options.method
            qs: qs
            body: options.body
            formData: options.formData
            headers: headers
            useCookies: false
        
        req
            .then (response) ->
                response.json().then (json) ->
                    token = SGN.config.get 'coreSessionToken'
                    responseToken = response.headers['x-token']

                    SGN.CoreKit.session.saveToken responseToken if responseToken and token isnt responseToken

                    if response.status >= 200 and response.status < 300 or response.status is 304
                        callback null, json
                    else
                        if runs is 0 and json? and json.code in [1101, 1107, 1108]
                            SGN.config.set coreSessionToken: undefined

                            request options, callback, ++runs
                        else
                            callback SGN.util.error(new Error('Core API error'),
                                code: 'CoreAPIError'
                                statusCode: response.status
                            ), json
                    
                    return
            .catch (err) ->
                callback err

                return

    return