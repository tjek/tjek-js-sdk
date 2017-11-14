MicroEvent = require 'microevent'
SGN = require '../../sgn'
Core = require './core'
Hotspots = require './hotspots'
Controls = require './controls'
EventTracking = require './event-tracking'
LegacyEventTracking = require './legacy-event-tracking'

class Viewer
    constructor: (@el, @options = {}) ->
        @_core = new Core @el,
            id: @options.id
            pages: @options.pages
            pageSpreadWidth: @options.pageSpreadWidth
            pageSpreadMaxZoomScale: @options.pageSpreadMaxZoomScale
            pageId: @options.pageId
            idleDelay: @options.idleDelay
            resizeDelay: @options.resizeDelay
            color: @options.color
        @_hotspots = new Hotspots()
        @_controls = new Controls @el, keyboard: @options.keyboard
        @_eventTracking = new EventTracking()
        @_legacyEventTracking = new LegacyEventTracking()
        @viewSession = SGN.util.uuid()

        @_setupEventListeners()

        return

    start: ->
        @_eventTracking.trackOpened()
        @_core.trigger 'started'

        @

    destroy: ->
        @_core.trigger 'destroyed'
        @_hotspots.trigger 'destroyed'
        @_controls.trigger 'destroyed'
        @_eventTracking.trigger 'destroyed'

        @el.parentNode.removeChild @el

        @

    navigateTo: (position, options) ->
        @navigateToIndex position, options

        @

    navigateToIndex: (position, options) ->
        @_core.getVerso().navigateTo position, options

        @
    
    navigateToPageId: (pageId, options) ->
        position = @_core.getVerso().getPageSpreadPositionFromPageId pageId
        
        @_core.getVerso().navigateTo position, options

    first: (options) ->
        @_core.getVerso().first options

        @

    prev: (options) ->
        @_core.getVerso().prev options

        @

    next: (options) ->
        @_core.getVerso().next options

        @

    last: (options) ->
        @_core.getVerso().last options

        @

    _trackEvent: (e) ->
        type = e.type
        idType = 'legacy'
        properties = pagedPublication:
            id: [idType, @options.id]
            ownedBy: [idType, @options.ownedBy]
        eventTracker = @options.eventTracker

        properties[key] = value for key, value of e.properties

        eventTracker.trackEvent type, properties if eventTracker?

        return

    _trackLegacyEvent: (e) ->
        eventTracker = @options.eventTracker
        geolocation = {}

        if eventTracker?
            geolocation.latitude = eventTracker.location.latitude
            geolocation.longitude = eventTracker.location.longitude
            geolocation.sensor = true if geolocation.latitude?

            SGN.CoreKit.request
                geolocation: geolocation
                method: 'post'
                url: "/v2/catalogs/#{@options.id}/collect"
                json: true
                body:
                    type: e.type
                    ms: e.ms
                    orientation: e.orientation
                    pages: e.pages.join ','
                    view_session: @viewSession
        
        return

    _setupEventListeners: ->
        @_eventTracking.bind 'trackEvent', (e) =>
            @_trackEvent e
            @_legacyEventTracking.trigger 'eventTracked', e

            return

        @_legacyEventTracking.bind 'trackEvent', (e) =>
            @_trackLegacyEvent e
                
            return

        @_controls.bind 'prev', (e) =>
            @prev e
            
            return
        @_controls.bind 'next', (e) =>
            @next e
            
            return
        @_controls.bind 'first', (e) =>
            @first e
            
            return
        @_controls.bind 'last', (e) =>
            @last()
            
            return
        @_hotspots.bind 'hotspotsRequested', (e) =>
            @trigger 'hotspotsRequested', e

            return

        @_core.bind 'appeared', (e) =>
            @_eventTracking.trigger 'appeared', e
            @trigger 'appeared', e

            return
        @_core.bind 'disappeared', (e) =>
            @_eventTracking.trigger 'disappeared', e
            @trigger 'disappeared', e

            return
        @_core.bind 'beforeNavigation', (e) =>
            @_eventTracking.trigger 'beforeNavigation', e
            @_controls.trigger 'beforeNavigation', e
            @trigger 'beforeNavigation', e

            return
        @_core.bind 'afterNavigation', (e) =>
            @_eventTracking.trigger 'afterNavigation', e
            @_hotspots.trigger 'afterNavigation', e
            @trigger 'afterNavigation', e

            return
        @_core.bind 'attemptedNavigation', (e) =>
            @_eventTracking.trigger 'attemptedNavigation', e
            @trigger 'attemptedNavigation', e

            return
        @_core.bind 'clicked', (e) =>
            @_eventTracking.trigger 'clicked', e
            @trigger 'clicked', e

            return
        @_core.bind 'doubleClicked', (e) =>
            @_eventTracking.trigger 'doubleClicked', e
            @trigger 'doubleClicked', e

            return
        @_core.bind 'contextmenu', (e) =>
            @trigger 'contextmenu', e

            return
        @_core.bind 'pressed', (e) =>
            @_eventTracking.trigger 'pressed', e
            @trigger 'pressed', e

            return
        @_core.bind 'panStart', (e) =>
            @_eventTracking.trigger 'panStart', e
            @trigger 'panStart', e

            return
        @_core.bind 'zoomedIn', (e) =>
            @_eventTracking.trigger 'zoomedIn', e
            @trigger 'zoomedIn', e

            return
        @_core.bind 'zoomedOut', (e) =>
            @_eventTracking.trigger 'zoomedOut', e
            @trigger 'zoomedOut', e

            return
        @_core.bind 'pageLoaded', (e) =>
            @_eventTracking.trigger 'pageLoaded', e
            @trigger 'pageLoaded', e

            return
        @_core.bind 'pagesLoaded', (e) =>
            @_hotspots.trigger 'pagesLoaded', e
            @trigger 'pagesLoaded', e

            return
        @_core.bind 'resized', (e) =>
            @_hotspots.trigger 'resized'
            @trigger 'resized', e

            return

        @bind 'hotspotsReceived', (e) =>
            @_hotspots.trigger 'hotspotsReceived',
                pageSpread: @_core.pageSpreads.get e.id
                versoPageSpread: SGN.util.find @_core.getVerso().pageSpreads, (pageSpread) ->
                    pageSpread.getId() is e.id
                ratio: e.ratio
                pages: e.pages
                hotspots: e.hotspots

            return

        return

MicroEvent.mixin Viewer

module.exports = Viewer
