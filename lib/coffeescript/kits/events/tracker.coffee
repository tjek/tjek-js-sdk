fetch = require 'cross-fetch'
md5 = require 'md5'
SGN = require '../../sgn'
clientLocalStorage = require '../../storage/client-local'

getPool = ->
    data = clientLocalStorage.get 'event-tracker-pool'
    data = [] if Array.isArray(data) is false
    data = data.filter (evt) ->
        typeof evt._i is 'string'

    data

pool = getPool()

module.exports = class Tracker
    defaultOptions:
        trackId: null
        poolLimit: 1000

    constructor: (options = {}) ->
        for key, value of @defaultOptions
            @[key] = options[key] or value

        @location =
            geohash: null
            time: null
            country: null
        @dispatching = false

        dispatch()

        return

    trackEvent: (type, properties = {}, version = 2) ->
        throw SGN.util.error(new Error('Event type is required')) if typeof type isnt 'number'
        return if not @trackId?

        if SGN.config.get('appKey') is @trackId
            # coffeelint: disable=max_line_length
            throw SGN.util.error(new Error('Track identifier must not be identical to app key. Go to https://business.shopgun.com/developers/apps to get a track identifier for your app'))
        
        now = new Date().getTime()
        evt = Object.assign {}, properties, {
            '_e': type
            '_v': version
            '_i': SGN.util.uuid()
            '_t': Math.round(new Date().getTime() / 1000)
            '_a': @trackId
        }

        evt['l.h'] = @location.geohash if @location.geohash?
        evt['l.ht'] = @location.time if @location.time?
        evt['l.c'] = @location.country if @location.country?

        pool.push evt
        pool.shift() while pool.length > @poolLimit

        dispatch()

        @

    setLocation: (location = {}) ->
        for key, value of location
            if @location.hasOwnProperty(key)
                @location[key] = value

        @

    trackPagedPublicationOpened: (properties, version) ->
        @trackEvent 1, properties, version
    
    trackPagedPublicationPageDisappeared: (properties, version) ->
        @trackEvent 2, properties, version
    
    trackOfferOpened: (properties, version) ->
        @trackEvent 3, properties, version
    
    trackClientSessionOpened: (properties, version) ->
        @trackEvent 4, properties, version
    
    trackSearched: (properties, version) ->
        @trackEvent 5, properties, version
    
    createViewToken: (...parts) ->
        str = [SGN.client.id].concat(parts).join ''
        viewToken = SGN.util.btoa String.fromCharCode.apply(null, (md5(str, {asBytes: true})).slice(0,8))

        viewToken

dispatching = false
dispatchLimit = 100

ship = (events = []) ->
    req = fetch SGN.config.get('eventsTrackUrl'),
        method: 'post'
        timeout: 1000 * 20
        keepalive: true
        mode: 'cors'
        headers:
            'Content-Type': 'application/json; charset=utf-8'
        body: JSON.stringify(events: events)
    
    req.then (response) -> response.json()
dispatch = SGN.util.throttle ->
    return if dispatching is true or pool.length is 0

    events = pool.slice 0, dispatchLimit
    nacks = 0
    dispatching = true

    ship(events)
        .then (response) ->
            dispatching = false

            response.events.forEach (resEvent) ->
                if resEvent.status is 'validation_error' or resEvent.status is 'ack'
                    pool = pool.filter (poolEvent) -> poolEvent._i isnt resEvent.id
                else if 'nack'
                    nacks++

                return

            # Keep dispatching until the pool size reaches a sane level.
            dispatch() if pool.length >= dispatchLimit and nacks is 0

            return
        .catch (err) ->
            dispatching = false

            console.log err

            throw err

            return
, 5000

clientLocalStorage.set 'event-tracker-pool', []

try
    window.addEventListener 'unload', ->
        dispatch()

        pool = pool.concat getPool()

        clientLocalStorage.set 'event-tracker-pool', pool

        return
    , false