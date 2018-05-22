MicroEvent = require 'microevent'
md5 = require 'md5'
util = require '../../util'
SGN = require '../../sgn'

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

    trackOpened: (properties) ->
        @eventTracker.trackPagedPublicationOpened
            'pp.id': @id
            'vt': @getViewToken([SGN.client.id, @id])

        @

    trackPageSpreadDisappeared: (pageNumbers) ->
        pageNumbers.forEach (pageNumber) =>
            @eventTracker.trackPagedPublicationPageDisappeared
                'pp.id': @id
                'ppp.n': pageNumber
                'vt': @getViewToken([SGN.client.id, @id, pageNumber])
            
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
    
    getViewToken: (parts) ->
        str = parts.join ''
        viewToken = util.btoa String.fromCharCode.apply(null, (new Uint8Array(md5(str, {asBytes: true}))).slice(0,8))

        viewToken

MicroEvent.mixin PagedPublicationEventTracking

module.exports = PagedPublicationEventTracking