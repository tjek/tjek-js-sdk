import MicroEvent from 'microevent'

class PagedPublicationEventTracking
    constructor: ->
        @hidden = true
        @pageSpread = null

        @bind 'appeared', @appeared.bind(@)
        @bind 'disappeared', @disappeared.bind(@)
        @bind 'beforeNavigation', @beforeNavigation.bind(@)
        @bind 'afterNavigation', @afterNavigation.bind(@)
        @bind 'attemptedNavigation', @attemptedNavigation.bind(@)
        @bind 'clicked', @clicked.bind(@)
        @bind 'doubleClicked', @doubleClicked.bind(@)
        @bind 'pressed', @pressed.bind(@)
        @bind 'panStart', @panStart.bind(@)
        @bind 'zoomedIn', @zoomedIn.bind(@)
        @bind 'zoomedOut', @zoomedOut.bind(@)
        @bind 'destroyed', @destroy.bind(@)

        return

    destroy: ->
        @pageSpreadDisappeared()

        return

    trackEvent: (type, properties = {}) ->
        @trigger 'trackEvent', type: type, properties: properties

        return

    trackOpened: (properties) ->
        @trackEvent 'paged-publication-opened', properties

        @

    trackPageClicked: (properties) ->
        @trackEvent 'paged-publication-page-clicked', properties

        @

    trackPageDoubleClicked: (properties) ->
        @trackEvent 'paged-publication-page-double-clicked', properties

        @

    trackPageLongPressed: (properties) ->
        @trackEvent 'paged-publication-page-long-pressed', properties

        @

    trackPageHotspotsClicked: (properties) ->
        @trackEvent 'paged-publication-page-hotspots-clicked', properties

        @

    trackPageSpreadAppeared: (properties) ->
        @trackEvent 'paged-publication-page-spread-appeared', properties

        @

    trackPageSpreadDisappeared: (properties) ->
        @trackEvent 'paged-publication-page-spread-disappeared', properties

        @

    trackPageSpreadZoomedIn: (properties) ->
        @trackEvent 'paged-publication-page-spread-zoomed-in', properties

        @

    trackPageSpreadZoomedOut: (properties) ->
        @trackEvent 'paged-publication-page-spread-zoomed-out', properties

        @

    appeared: (e) ->
        @pageSpreadAppeared e.pageSpread

        return

    disappeared: ->
        @pageSpreadDisappeared()

        return

    beforeNavigation: ->
        @pageSpreadDisappeared()

        return

    afterNavigation: (e) ->
        @pageSpreadAppeared e.pageSpread

        return

    attemptedNavigation: (e) ->
        @pageSpreadAppeared e.pageSpread

        return

    clicked: (e) ->
        if e.page?
            properties =
                pageNumber: e.page.pageNumber
                x: e.verso.pageX
                y: e.verso.pageY

            @trackPageClicked pagedPublicationPage: properties
            @trackPageHotspotsClicked pagedPublicationPage: properties if e.verso.overlayEls.length > 0

        return

    doubleClicked: (e) =>
        if e.page?
            @trackPageDoubleClicked pagedPublicationPage:
                pageNumber: e.page.pageNumber
                x: e.verso.pageX
                y: e.verso.pageY

        return

    pressed: (e) ->
        if e.page?
            @trackPageLongPressed pagedPublicationPage:
                pageNumber: e.page.pageNumber
                x: e.verso.pageX
                y: e.verso.pageY

        return

    panStart: (e) ->
        @pageSpreadDisappeared() if e.scale is 1

        return

    zoomedIn: (e) ->
        if e.pageSpread?
            @trackPageSpreadZoomedIn pagedPublicationPageSpread:
                pageNumbers: e.pageSpread.getPages().map (page) -> page.pageNumber

        return

    zoomedOut: (e) ->
        if e.pageSpread?
            @trackPageSpreadZoomedOut pagedPublicationPageSpread:
                pageNumbers: e.pageSpread.getPages().map (page) -> page.pageNumber

        return

    pageSpreadAppeared: (pageSpread) ->
        if pageSpread? and @hidden is true
            @pageSpread = pageSpread

            @trackPageSpreadAppeared pagedPublicationPageSpread:
                pageNumbers: pageSpread.getPages().map (page) -> page.pageNumber

            @hidden = false

        return

    pageSpreadDisappeared: ->
        if @pageSpread? and @hidden is false
            @trackPageSpreadDisappeared pagedPublicationPageSpread:
                pageNumbers: @pageSpread.getPages().map (page) -> page.pageNumber

            @hidden = true
            @pageSpread = null

        return

MicroEvent.mixin PagedPublicationEventTracking

export default PagedPublicationEventTracking
