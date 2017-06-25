SGN = require '../../sgn'
sha256 = require 'sha256'
clientCookieStorage = require '../../storage/client_cookie'

session =
    url: 'https://api.etilbudsavis.dk/v2/sessions'

    tokenTTL: 1 * 60 * 60 * 24 * 60

    attrs: do ->
        clientCookieStorage.get('sessions') ? {}

    callbackQueue: []

    get: (key) ->
        appKey = SGN.config.get 'appKey'

        if key?
            session.attrs[appKey]?[key]
        else
            session.attrs[appKey] ? {}

    set: (key, value) ->
        attrs = null

        if typeof key is 'object'
            attrs = key
        else if typeof key is 'string' and value?
            attrs = session.attrs
            attrs[key] = value
            
        appKey = SGN.config.get 'appKey'
        sessions = clientCookieStorage.get 'sessions'

        sessions = {} if not sessions?
        sessions[appKey] = attrs

        clientCookieStorage.set 'sessions', sessions

        session.attrs = sessions

        return

    create: (callback) ->
        SGN.request
            method: 'post'
            url: session.url
            headers:
                'Accept': 'application/json'
            qs:
                api_key: SGN.config.get 'appKey'
                token_ttl: session.tokenTTL
        , (err, data) ->
            if err?
                callback err
            else
                session.set JSON.parse(data.body)

                callback err, session.get()

            return

        return
    
    update: (callback) ->
        headers = {}
        token = session.get 'token'
        appSecret = SGN.config.get 'appSecret'

        headers['X-Token'] = token
        headers['X-Signature'] = session.sign appSecret, token if appSecret?
        headers['Accept'] = 'application/json'

        SGN.request
            url: session.url
            headers: headers
        , (err, data) ->
            if err?
                callback err
            else
                session.set JSON.parse(data.body)

                callback err, session.get()

            return

        return

    renew: (callback) ->
        headers = {}
        token = session.get 'token'
        appSecret = SGN.config.get 'appSecret'

        headers['X-Token'] = token
        headers['X-Signature'] = session.sign appSecret, token if appSecret?
        headers['Accept'] = 'application/json'

        SGN.request
            method: 'put'
            url: session.url
            headers: headers
        , (err, data) ->
            if err?
                callback err
            else
                session.set JSON.parse(data.body)

                callback err, session.get()

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
            if not session.get('token')?
                session.create complete
            else if session.willExpireSoon(session.get('expires'))
                session.renew complete
            else
                complete()

        return

    willExpireSoon: (expires) ->
        Date.now() >= Date.parse(expires) - 1000 * 60 * 60 * 24

    sign: (appSecret, token) ->
        sha256 [appSecret, token].join('')

module.exports = session
