import MicroEvent from 'microevent'
import Core from './core'
import Hotspots from './hotspots'
import Controls from './controls'
import EventTracking from './event-tracking'
import { uuid } from '../../util'
import translations from '../../translations'
import * as CoreUIKit from '../core-ui'
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
        @viewSession = uuid()
        @hotspots = null
        @hotspotQueue = []
        @popover = null

        @_setupEventListeners()

        return

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

        @trigger 'destroyed'

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

    _setupEventListeners: ->
        @_eventTracking.bind 'trackEvent', (e) =>
            @_trackEvent e

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
            @last e
            
            return
        @_controls.bind 'close', (e) =>
            @destroy e

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

        @bind 'hotspotsRequested', @hotspotsRequested.bind(@)
        @bind 'beforeNavigation', @beforeNavigation.bind(@)
        @bind 'clicked', @clicked.bind(@)
        @bind 'contextmenu', @contextmenu.bind(@)
        @bind 'pressed', @pressed.bind(@)

        return

    pickHotspot: (e, callback) ->
        return if not @hotspots?

        if @popover?
            @popover.destroy()
            @popover = null
        
        hotspots = e.verso.overlayEls.map (overlayEl) =>
            @hotspots[overlayEl.getAttribute('data-id')]

        if hotspots.length is 1
            callback hotspots[0]
        else if hotspots.length > 1
            @popover = CoreUIKit.singleChoicePopover
                el: @el
                header: translations.t 'paged_publication.hotspot_picker.header'
                x: e.verso.x
                y: e.verso.y
                items: hotspots
                    .filter (hotspot) -> hotspot.type is 'offer'
                    .map (hotspot) ->
                        id: hotspot.id
                        title: hotspot.offer.heading
                        subtitle: hotspot.offer.pricing.currency + '' + hotspot.offer.pricing.price
            , (e) =>
                callback @hotspots[e.id]

                return
        
        return

    processHotspotQueue: ->
        return if not @hotspots?

        @hotspotQueue = @hotspotQueue.filter (hotspotRequest) =>
            hotspots = {}
            versoPageSpread = @_core.getVerso().pageSpreads.find (pageSpread) ->
                pageSpread.getId() is hotspotRequest.id

            for id, hotspot of @hotspots
                continue if hotspots[id]?

                for page in hotspotRequest.pages
                    if hotspot.locations[page.pageNumber]?
                        hotspots[id] =
                            type: hotspot.type
                            id: hotspot.id
                            locations: hotspot.locations
                        
                        break

            @_hotspots.trigger 'hotspotsReceived',
                pageSpread: @_core.pageSpreads.get hotspotRequest.id
                versoPageSpread: versoPageSpread
                ratio: @options.hotspotRatio
                pages: hotspotRequest.pages
                hotspots: hotspots

            false

        return

    hotspotsRequested: (e) ->
        @hotspotQueue.push e
        @processHotspotQueue()

        return
    
    applyHotspots: (hotspots = {}) ->
        @hotspots = hotspots

        @processHotspotQueue()

        return
    
    beforeNavigation: ->
        @popover.destroy() if @popover?

        return
    
    clicked: (e) ->
        @pickHotspot e, (hotspot) =>
            @trigger 'hotspotClicked', hotspot

            return
            
        return
    
    contextmenu: (e) ->
        @pickHotspot e, (hotspot) =>
            @trigger 'hotspotContextmenu', hotspot

            return
        
        return
    
    pressed: (e) ->
        @pickHotspot e, (hotspot) =>
            @trigger 'hotspotPressed', hotspot

            return
            
        return

MicroEvent.mixin Viewer

export default Viewer
