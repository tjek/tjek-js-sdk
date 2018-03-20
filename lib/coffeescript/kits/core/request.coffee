import * as session from './session'
import { error } from '../../util'
import { config } from '../../core'
import request from '../../request'


coreRequest = (options = {}, callback = ->, runs = 0) ->
    session.ensure (err) ->
        return callback err if err?

        url = options.url ? ''
        headers = options.headers ? {}
        json = if typeof options.json is 'boolean' then options.json else true
        token = config.get 'coreSessionToken'
        clientId = config.get 'coreSessionClientId'
        appVersion = config.get 'appVersion'
        appSecret = config.get 'appSecret'
        locale = config.get 'locale'
        qs = options.qs ? {}
        geo = options.geolocation

        headers['X-Token'] = token
        headers['X-Signature'] = session.sign appSecret, token if appSecret?

        qs.r_locale = locale if locale?
        qs.api_av = appVersion if appVersion?
        qs.client_id = clientId if clientId?

        if geo?
            qs.r_lat = geo.latitude if geo.latitude? and not qs.r_lat?
            qs.r_lng = geo.longitude if geo.longitude? and not qs.r_lng?
            qs.r_radius = geo.radius if geo.radius? and not qs.r_radius?
            qs.r_sensor = geo.sensor if geo.sensor? and not qs.r_sensor?

        request
            method: options.method
            url: config.get('coreUrl') + url
            qs: qs
            body: options.body
            formData: options.formData
            headers: headers
            json: json
            useCookies: false
        , (err, data) ->
            if err?
                callback error(new Error('Core request error'),
                    code: 'CoreRequestError'
                )
            else
                token = config.get 'coreSessionToken'
                responseToken = data.headers['x-token']

                session.saveToken responseToken if responseToken and token isnt responseToken

                if data.statusCode >= 200 and data.statusCode < 300 or data.statusCode is 304
                    callback null, data.body
                else
                    if runs is 0 and data.body? and data.body.code in [1101, 1107, 1108]
                        config.set coreSessionToken: undefined

                        request options, callback, ++runs
                    else
                        callback error(new Error('Core API error'),
                            code: 'CoreAPIError'
                            statusCode: data.statusCode
                        ), data.body

            return

    return

export default coreRequest
