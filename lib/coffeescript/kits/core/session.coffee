import { config } from '../../core'
import sha256 from 'sha256'
import * as clientCookieStorage from '../../storage/client-cookie'
import request from '../../request'
callbackQueue = []
renewed = false

export ttl = 1 * 60 * 60 * 24 * 60

export saveToken = (token) ->
    throw new Error('No token provided for saving') if not token

    config.set coreSessionToken: token

    saveCookie()

    return

export saveClientId = (clientId) ->
    config.set coreSessionClientId: clientId

    saveCookie()

    return

export saveCookie = ->
    clientCookieStorage.set 'session',
        token: config.get 'coreSessionToken'
        client_id: config.get 'coreSessionClientId'

    return

export create = (callback) ->
    request
        method: 'post'
        url: config.get('coreUrl') + '/v2/sessions'
        json: true
        qs:
            api_key: config.get 'appKey'
            token_ttl: ttl
    , (err, data) ->
        if err?
            callback err
        else if data.statusCode is 201
            saveToken data.body.token
            saveClientId data.body.client_id

            callback err, data.body
        else
            callback new Error('Could not create session')

        return

    return

export update = (callback) ->
    headers = {}
    token = config.get 'coreSessionToken'
    appSecret = config.get 'appSecret'

    headers['X-Token'] = token
    headers['X-Signature'] = sign appSecret, token if appSecret?

    request
        url: config.get('coreUrl') + '/v2/sessions'
        headers: headers
        json: true
    , (err, data) ->
        if err?
            callback err
        else if data.statusCode is 200
            saveToken data.body.token
            saveClientId data.body.client_id

            callback err, data.body
        else
            callback new Error('Could not update session')

        return

    return

export renew = (callback) ->
    headers = {}
    token = config.get 'coreSessionToken'
    appSecret = config.get 'appSecret'

    headers['X-Token'] = token
    headers['X-Signature'] = sign appSecret, token if appSecret?

    request
        method: 'put'
        url: config.get('coreUrl') + '/v2/sessions'
        headers: headers
        json: true
    , (err, data) ->
        if err?
            callback err
        else if data.statusCode is 200
            saveToken data.body.token
            saveClientId data.body.client_id

            callback err, data.body
        else
            callback new Error('Could not renew session')

        return

    return

export ensure = (callback) ->
    queueCount = callbackQueue.length
    complete = (err) ->
        callbackQueue = callbackQueue.filter (fn) ->
            fn err

            false

        return

    callbackQueue.push callback

    if queueCount is 0
        if not config.get('coreSessionToken')?
            create complete
        else if renewed is false
            renewed = true
            renew (err) ->
                if err?
                    create complete
                else
                    complete()
                
                return
        else
            complete()

    return

export sign = (appSecret, token) ->
    sha256 [appSecret, token].join('')
