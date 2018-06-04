SGN = require '../../sgn'
{ promiseCallbackInterop } = require '../../util'

request = (options = {}, callback = ->, runs = 0) ->
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

        SGN.request
            method: options.method
            url: SGN.config.get('coreUrl') + url
            qs: qs
            body: options.body
            formData: options.formData
            headers: headers
            json: json
            useCookies: false
        , (err, data) ->
            if err?
                callback SGN.util.error(new Error('Core request error'),
                    code: 'CoreRequestError'
                )
            else
                token = SGN.config.get 'coreSessionToken'
                responseToken = data.headers['x-token']

                SGN.CoreKit.session.saveToken responseToken if responseToken and token isnt responseToken

                if data.statusCode >= 200 and data.statusCode < 300 or data.statusCode is 304
                    callback null, data.body
                else
                    if runs is 0 and data.body? and data.body.code in [1101, 1107, 1108]
                        SGN.config.set coreSessionToken: undefined

                        request options, callback, ++runs
                    else
                        callback SGN.util.error(new Error('Core API error'),
                            code: 'CoreAPIError'
                            statusCode: data.statusCode
                        ), data.body

            return

    return

module.exports = promiseCallbackInterop(request, 1)
