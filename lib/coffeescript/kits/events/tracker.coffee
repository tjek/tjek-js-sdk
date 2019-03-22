import 'core-js/modules/es.promise'
import 'core-js/modules/es.object.assign'
import fetch from 'cross-fetch'
import md5 from 'md5'
import { eventsTrackUrl as defaultEventsTrackUrl } from '../../configDefaults'
import { error, btoa, throttle, uuid, isBrowser } from '../../util'
import * as clientLocalStorage from '../../storage/client-local'

createTrackerClient = ->
    id = clientLocalStorage.get 'client-id'
    id = id.data if id?.data

    if not id?
        id = uuid()
        
        clientLocalStorage.set 'client-id', id

    id: id

getPool = ->
    data = clientLocalStorage.get 'event-tracker-pool'
    data = [] if Array.isArray(data) is false
    data = data.filter (evt) ->
        typeof evt._i is 'string'

    data

pool = getPool()

export default class Tracker
    defaultOptions:
        trackId: null
        poolLimit: 1000

    constructor: (options = {}) ->
        for key, value of @defaultOptions
            @[key] = options[key] or value

        @client = options?.client or createTrackerClient()
        @eventsTrackUrl = options?.eventsTrackUrl or defaultEventsTrackUrl
        @location =
            geohash: null
            time: null
            country: null
        @dispatching = false
        @hasMadeInitialDispatch = false

        if @eventsTrackUrl
            dispatch(@eventsTrackUrl)
            @hasMadeInitialDispatch = true

        return
    
    setEventsTrackUrl: (eventsTrackUrl) ->
        @eventsTrackUrl = eventsTrackUrl

        if not @hasMadeInitialDispatch
            dispatch(@eventsTrackUrl)
            @hasMadeInitialDispatch = true

    trackEvent: (type, properties = {}, version = 2) ->
        throw error(new Error('Event type is required')) if typeof type isnt 'number'
        return if not @trackId?
        
        now = new Date().getTime()
        evt = Object.assign {}, properties, {
            '_e': type
            '_v': version
            '_i': uuid()
            '_t': Math.round(new Date().getTime() / 1000)
            '_a': @trackId
        }

        evt['l.h'] = @location.geohash if @location.geohash?
        evt['l.ht'] = @location.time if @location.time?
        evt['l.c'] = @location.country if @location.country?

        pool.push evt
        pool.shift() while pool.length > @poolLimit

        dispatch(@eventsTrackUrl)

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

    trackIncitoPublicationOpened: (properties, version) ->
        @trackEvent 8, properties, version
    
    createViewToken: (...parts) ->
        str = [@client.id].concat(parts).join ''
        viewToken = btoa String.fromCharCode.apply(null, (md5(str, {asBytes: true})).slice(0,8))

        viewToken

dispatching = false
dispatchLimit = 100

ship = (events = [], eventsTrackUrl) ->
    req = fetch eventsTrackUrl,
        method: 'post'
        timeout: 1000 * 20
        headers:
            'Content-Type': 'application/json; charset=utf-8'
        body: JSON.stringify(events: events)
    
    req.then (response) -> response.json()

_dispatch = (eventsTrackUrl) ->
    if not eventsTrackUrl
        # coffeelint: disable=max_line_length
        throw error(new Error('If you are using the EventsKit Tracker outside the singleton you must manually pass in an `eventsTrackUrl`'))

    return if dispatching is true or pool.length is 0

    events = pool.slice 0, dispatchLimit
    nacks = 0
    dispatching = true

    ship(events, eventsTrackUrl)
        .then (response) ->
            dispatching = false

            response.events.forEach (resEvent) ->
                if resEvent.status is 'validation_error' or resEvent.status is 'ack'
                    pool = pool.filter (poolEvent) -> poolEvent._i isnt resEvent.id
                else if 'nack'
                    nacks++

                return

            # Keep dispatching until the pool size reaches a sane level.
            dispatch(eventsTrackUrl) if pool.length >= dispatchLimit and nacks is 0

            return
        .catch (err) ->
            dispatching = false

            throw err

            return
    
    return
dispatch = throttle _dispatch, 4000

clientLocalStorage.set 'event-tracker-pool', []

try
    window.addEventListener 'beforeunload', (e) ->
        pool = pool.concat getPool()

        clientLocalStorage.set 'event-tracker-pool', pool

        return
    , false
