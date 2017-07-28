SGN = require '../../sgn'
sha256 = require 'sha256'
clientCookieStorage = require '../../storage/client_cookie'

session =
    tokenTTL: 1 * 60 * 60 * 24 * 60

    callbackQueue: []

    save: (token, clientId) ->
        clientCookieStorage.set 'session',
            token: token
            clientId: clientId

        SGN.config.set
            coreSessionToken: token
            coreSessionClientId: clientId

        return

    create: (callback) ->
        SGN.request
            method: 'post'
            url: SGN.config.get('coreUrl') + '/v2/sessions'
            json: true
            qs:
                api_key: SGN.config.get 'appKey'
                token_ttl: session.tokenTTL
        , (err, data) ->
            if err?
                callback err
            else if data.statusCode is 201
                session.save data.body.token, data.body.client_id

                callback err
            else
                callback new Error('Could not create session')

            return

        return
    
    update: (callback) ->
        headers = {}
        token = SGN.config.get 'coreSessionToken'
        appSecret = SGN.config.get 'appSecret'

        headers['X-Token'] = token
        headers['X-Signature'] = session.sign appSecret, token if appSecret?

        SGN.request
            url: SGN.config.get('coreUrl') + '/v2/sessions'
            headers: headers
            json: true
        , (err, data) ->
            if err?
                callback err
            else if data.statusCode is 200
                session.save data.body.token, data.body.client_id

                callback err
            else
                callback new Error('Could not update session')

            return

        return

    renew: (callback) ->
        headers = {}
        token = SGN.config.get 'coreSessionToken'
        appSecret = SGN.config.get 'appSecret'

        headers['X-Token'] = token
        headers['X-Signature'] = session.sign appSecret, token if appSecret?

        SGN.request
            method: 'put'
            url: SGN.config.get('coreUrl') + '/v2/sessions'
            headers: headers
            json: true
        , (err, data) ->
            if err?
                callback err
            else if data.statusCode is 200
                session.save data.body.token, data.body.client_id

                callback err
            else
                callback new Error('Could not renew session')

            return

        return

    ensure: (callback) ->
        queueCount = session.callbackQueue.length
        complete = (err) ->
            session.callbackQueue = session.callbackQueue.filter (fn) ->
                fn err

                false

            return

        session.callbackQueue.push callback

        if queueCount is 0
            if not SGN.config.get('coreSessionToken')?
                session.create complete
            else
                complete()

        return

    sign: (appSecret, token) ->
        sha256 [appSecret, token].join('')

module.exports = session
