import MicroEvent from 'microevent'

class PagedPublicationEventTracking
    constructor: (@eventTracker, @id) ->
        @hidden = true
        @pageSpread = null

        @bind 'appeared', @appeared.bind(@)
        @bind 'disappeared', @disappeared.bind(@)
        @bind 'beforeNavigation', @beforeNavigation.bind(@)
        @bind 'afterNavigation', @afterNavigation.bind(@)
        @bind 'attemptedNavigation', @attemptedNavigation.bind(@)
        @bind 'panStart', @panStart.bind(@)
        @bind 'destroyed', @destroy.bind(@)

        return

    destroy: ->
        @pageSpreadDisappeared()

        return

    trackOpened: ->
        return @ if not @eventTracker?

        @eventTracker.trackPagedPublicationOpened
            'pp.id': @id
            'vt': @eventTracker.createViewToken(@id)

        @

    trackPageSpreadDisappeared: (pageNumbers) ->
        return @ if not @eventTracker?
        
        pageNumbers.forEach (pageNumber) =>
            @eventTracker.trackPagedPublicationPageDisappeared
                'pp.id': @id
                'ppp.n': pageNumber
                'vt': @eventTracker.createViewToken(@id, pageNumber)
            
            return

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

    panStart: (e) ->
        @pageSpreadDisappeared() if e.scale is 1

        return

    pageSpreadAppeared: (pageSpread) ->
        if pageSpread? and @hidden is true
            @pageSpread = pageSpread
            @hidden = false

        return

    pageSpreadDisappeared: ->
        if @pageSpread? and @hidden is false
            @trackPageSpreadDisappeared @pageSpread.getPages().map (page) -> page.pageNumber

            @hidden = true
            @pageSpread = null

        return

MicroEvent.mixin PagedPublicationEventTracking

export default PagedPublicationEventTracking
