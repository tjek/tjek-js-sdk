MicroEvent = require 'microevent'

class PagedPublicationLegacyEventTracking
    constructor: ->
        @bind 'eventTracked', @eventTracked.bind(@)
        @zoomedIn = false
        @appearedAt = null

        return

    trackEvent: (e) ->
        @trigger 'trackEvent', e

        return

    eventTracked: (e) ->
        if e.type is 'paged-publication-page-spread-appeared'
            @appearedAt = Date.now()
        if e.type is 'paged-publication-page-spread-disappeared'
            @trigger 'trackEvent',
                type: if @zoomedIn then 'zoom' else 'view'
                ms: Date.now() - @appearedAt
                orientation: @getOrientation()
                pages: e.properties.pagedPublicationPageSpread.pageNumbers
        else if e.type is 'paged-publication-page-spread-zoomed-in'
            @trigger 'trackEvent',
                type: 'view'
                ms: @getDuration()
                orientation: @getOrientation()
                pages: e.properties.pagedPublicationPageSpread.pageNumbers

            @zoomedIn = true
            @appearedAt = Date.now()
        else if e.type is 'paged-publication-page-spread-zoomed-out'
            @trigger 'trackEvent',
                type: 'zoom'
                ms: @getDuration()
                orientation: @getOrientation()
                pages: e.properties.pagedPublicationPageSpread.pageNumbers

            @zoomedIn = false
            @appearedAt = Date.now()

        return

    getOrientation: ->
        if window.innerWidth >= window.innerHeight then 'landscape' else 'portrait'

    getDuration: ->
        Date.now() - @appearedAt

MicroEvent.mixin PagedPublicationLegacyEventTracking

module.exports = PagedPublicationLegacyEventTracking
