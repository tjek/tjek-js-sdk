SGN = require '../../sgn'
clientLocalStorage = require '../../storage/client-local'
getPool = ->
    data = clientLocalStorage.get 'event-tracker-pool'
    data = [] if Array.isArray(data) is false

    data
pool = getPool()

clientLocalStorage.set 'event-tracker-pool', []

try
    window.addEventListener 'unload', ->
        pool = pool.concat getPool()

        clientLocalStorage.set 'event-tracker-pool', pool

        return
    , false

module.exports = class Tracker
    defaultOptions:
        trackId: null
        dispatchInterval: 3000
        dispatchLimit: 100
        poolLimit: 1000
        dryRun: false

    constructor: (options = {}) ->
        for key, value of @defaultOptions
            @[key] = options[key] or value

        @dispatching = false
        @session =
            id: SGN.util.uuid()
        @client =
            trackId: @trackId
            id: SGN.client.id
        @view =
            path: []
            previousPath: []
            uri: null
        @location = {}
        @application = {}
        @identity = {}

        # Dispatch events periodically.
        @interval = setInterval @dispatch.bind(@), @dispatchInterval

        return

    trackEvent: (type, properties = {}, version = '1.0.0') ->
        throw SGN.util.error(new Error('Event type is required')) if typeof type isnt 'string'
        return if not @trackId?

        pool.push
            id: SGN.util.uuid()
            type: type
            version: version
            recordedAt: new Date().toISOString()
            sentAt: null
            client:
                id: @client.id
                trackId: @client.trackId
            context: @getContext()
            properties: properties

        pool.shift() while @getPoolSize() > @poolLimit

        @

    identify: (id) ->
        @identity.id = id

        @

    setLocation: (location = {}) ->
        @location.determinedAt = new Date(location.timestamp).toISOString()
        @location.latitude = location.latitude
        @location.longitude = location.longitude
        @location.altitude = location.altitude
        @location.accuracy =
            horizontal: location.accuracy?.horizontal
            vertical: location.accuracy?.vertical
        @location.speed = location.speed
        @location.floor = location.floor

        @

    setApplication: (application = {}) ->
        @application.name = application.name
        @application.version = application.version
        @application.build = application.build

        @

    setView: (path) ->
        @view.previousPath = @view.path
        @view.path = path if Array.isArray(path) is true
        @view.uri = window.location.href

        @

    getView: ->
        view = {}

        view.path = @view.path if @view.path.length > 0
        view.previousPath = @view.previousPath if @view.previousPath.length > 0
        view.uri = @view.uri if @view.uri?

        view

    getContext: ->
        screenDimensions = SGN.util.getScreenDimensions()
        os = SGN.util.getOS()
        context =
            userAgent: window.navigator.userAgent
            locale: navigator.language
            timeZone:
                utcOffsetSeconds: SGN.util.getUtcOffsetSeconds()
                utcDstOffsetSeconds: SGN.util.getUtcDstOffsetSeconds()
            device:
                screen:
                    width: screenDimensions.physical.width
                    height: screenDimensions.physical.height
                    density: screenDimensions.density
            session:
                id: @session.id
            view: @getView()
        application =
            name: @application.name
            version: @application.version
            build: @application.build
        campaign =
            source: SGN.util.getQueryParam 'utm_source'
            medium: SGN.util.getQueryParam 'utm_medium'
            name: SGN.util.getQueryParam 'utm_campaign'
            term: SGN.util.getQueryParam 'utm_term'
            content: SGN.util.getQueryParam 'utm_content'
        loc =
            determinedAt: @location.determinedAt
            latitude: @location.latitude
            longitude: @location.longitude
            altitude: @location.altitude
            speed: @location.speed
            floor: @location.floor
            accuracy:
                horizontal: @location.accuracy?.horizontal
                vertical: @location.accuracy?.vertical

        # Operating system.
        context.os = name: os if os?

        # Session referrer.
        context.session.referrer = document.referrer if document.referrer.length > 0

        # Application.
        ['name', 'version', 'build'].forEach (key) ->
            delete application[key] if typeof application[key] isnt 'string' or application[key].length is 0
            return
        context.application = application if Object.keys(application).length > 0

        # Campaign.
        ['source', 'medium', 'name', 'term', 'content'].forEach (key) ->
            delete campaign[key] if typeof campaign[key] isnt 'string' or campaign[key].length is 0
            return
        context.campaign = campaign if Object.keys(campaign).length > 0

        # Location.
        ['latitude', 'longitude', 'altitude', 'speed', 'floor'].forEach (key) ->
            delete loc[key] if typeof loc[key] isnt 'number'
            return
        delete loc.accuracy.horizontal if typeof loc.accuracy.horizontal isnt 'number'
        delete loc.accuracy.vertical if typeof loc.accuracy.vertical isnt 'number'
        delete loc.accuracy if Object.keys(loc.accuracy).length is 0
        delete loc.determinedAt if typeof loc.determinedAt isnt 'string' or loc.determinedAt.length is 0
        context.location = loc if Object.keys(loc).length > 0

        # Person identifier.
        context.personId = @identity.id if @identity.id?

        context

    getPoolSize: ->
        pool.length

    dispatch: ->
        return if @dispatching is true or @getPoolSize() is 0
        return pool.splice(0, @dispatchLimit) if @dryRun is true

        events = pool.slice 0, @dispatchLimit
        nacks = 0

        @dispatching = true

        @ship events, (err, response) =>
            @dispatching = false

            if not err?
                response.events.forEach (resEvent) ->
                    if resEvent.status is 'validation_error' or resEvent.status is 'ack'
                        pool = pool.filter (poolEvent) -> poolEvent.id isnt resEvent.id
                    else if 'nack'
                        nacks++

                    return

                # Keep dispatching until the pool size reaches a sane level.
                @dispatch() if @getPoolSize() >= @dispatchLimit and nacks is 0

            return

        @

    ship: (events = [], callback) ->
        http = new XMLHttpRequest()
        url = SGN.config.get 'eventsTrackUrl'
        payload = events: events.map (event) ->
            event.sentAt = new Date().toISOString()

            event

        http.open 'POST', url
        http.setRequestHeader 'Content-Type', 'application/json'
        http.setRequestHeader 'Accept', 'application/json'
        http.timeout = 1000 * 20
        http.onload = ->
            if http.status is 200
                try
                    callback null, JSON.parse(http.responseText)
                catch err
                    callback SGN.util.error(new Error('Could not parse JSON'))
            else
                callback SGN.util.error(new Error('Server did not accept request'))

            return
        http.onerror = ->
            callback SGN.util.error(new Error('Could not perform network request'))

            return
        http.send JSON.stringify(payload)

        @
