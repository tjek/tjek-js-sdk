import fetch from 'cross-fetch'
import sha256 from 'sha256'
import SGN from '../../sgn'
import * as clientCookieStorage from '../../storage/client-cookie'

callbackQueue = []
renewed = false

session =
    ttl: 1 * 60 * 60 * 24 * 60

    saveToken: (token) ->
        throw new Error('No token provided for saving') if not token

        SGN.config.set coreSessionToken: token

        session.saveCookie()

        return

    saveClientId: (clientId) ->
        SGN.config.set coreSessionClientId: clientId

        session.saveCookie()

        return

    saveCookie: ->
        clientCookieStorage.set 'session',
            token: SGN.config.get 'coreSessionToken'
            client_id: SGN.config.get 'coreSessionClientId'

        return

    create: (callback) ->
        key = SGN.config.get 'appKey'
        ttl = session.ttl

        req = fetch SGN.config.get('coreUrl') + "/v2/sessions?api_key=#{key}&token_ttl=#{ttl}",
            method: 'post'

        req
            .then (response) ->
                response.json().then (json) ->
                    if response.status is 201
                        session.saveToken json.token
                        session.saveClientId json.client_id

                        callback null, json
                    else
                        callback new Error('Could not create session')
                    
                    return
            .catch (err) ->
                callback err

                return
        
        return
    
    update: (callback) ->
        headers = {}
        token = SGN.config.get 'coreSessionToken'
        appSecret = SGN.config.get 'appSecret'

        headers['X-Token'] = token
        headers['X-Signature'] = session.sign appSecret, token if appSecret?

        req = fetch SGN.config.get('coreUrl') + '/v2/sessions',
            method: 'put'
            headers: headers

        req
            .then (response) ->
                response.json().then (json) ->
                    if response.status is 200
                        session.saveToken json.token
                        session.saveClientId json.client_id

                        callback null, json
                    else
                        callback new Error('Could not update session')
                    
                    return
            .catch (err) ->
                callback err

                return

        return

    renew: (callback) ->
        headers = {}
        token = SGN.config.get 'coreSessionToken'
        appSecret = SGN.config.get 'appSecret'

        headers['X-Token'] = token
        headers['X-Signature'] = session.sign appSecret, token if appSecret

        req = fetch SGN.config.get('coreUrl') + '/v2/sessions',
            method: 'put'
            headers: headers

        req
            .then (response) ->
                response.json().then (json) ->
                    if response.status is 200
                        session.saveToken json.token
                        session.saveClientId json.client_id

                        callback null, json
                    else
                        callback new Error('Could not renew session')
                    
                    return
            .catch (err) ->
                callback err

                return

        return

    ensure: (callback) ->
        queueCount = callbackQueue.length
        complete = (err) ->
            callbackQueue = callbackQueue.filter (fn) ->
                fn err

                false

            return

        callbackQueue.push callback

        if queueCount is 0
            if not SGN.config.get('coreSessionToken')?
                session.create complete
            else if renewed is false
                renewed = true
                session.renew (err) ->
                    if err?
                        session.create complete
                    else
                        complete()
                    
                    return
            else
                complete()

        return

    sign: (appSecret, token) ->
        sha256 [appSecret, token].join('')

export default session
