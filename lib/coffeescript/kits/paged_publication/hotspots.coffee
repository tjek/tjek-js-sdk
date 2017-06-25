MicroEvent = require 'microevent'

class PagedPublicationHotspots
    constructor: ->
        @currentPageSpreadId = null
        @pageSpreadsLoaded = {}
        @hotspots = {}

        @bind 'hotspotsReceived', @hotspotsReceived.bind(@)
        @bind 'afterNavigation', @afterNavigation.bind(@)
        @bind 'pagesLoaded', @pagesLoaded.bind(@)
        @bind 'resized', @resized.bind(@)

        return

    renderHotspots: (options) ->
        frag = document.createDocumentFragment()
        contentRect = options.versoPageSpread.getContentRect()
        pageSpreadEl = options.pageSpread.getEl()
        hotspotEls = pageSpreadEl.querySelectorAll '.sgn-pp__hotspot'

        options.hotspots.forEach (hotspot) =>
            frag.appendChild @renderHotspot(hotspot, contentRect)

            return

        hotspotEl.parentNode.removeChild hotspotEl for hotspotEl in hotspotEls
        pageSpreadEl.appendChild frag

        @

    renderHotspot: (hotspot, contentRect) ->
        el = document.createElement 'div'
        top = Math.round contentRect.height / 100 * hotspot.top
        left = Math.round contentRect.width / 100 * hotspot.left
        width = Math.round contentRect.width / 100 * hotspot.width
        height = Math.round contentRect.height / 100 * hotspot.height

        top += Math.round contentRect.top
        left += Math.round contentRect.left

        el.className = 'sgn-pp__hotspot verso__overlay'

        el.style.top = "#{top}px"
        el.style.left = "#{left}px"
        el.style.width = "#{width}px"
        el.style.height = "#{height}px"

        el

    requestHotspots: (pageSpreadId, pages) ->
        @trigger 'hotspotsRequested',
            pageSpreadId: pageSpreadId
            pages: pages

        return

    hotspotsReceived: (e) ->
        @hotspots[e.pageSpread.getId()] = e
        @renderHotspots e

        return

    afterNavigation: (e) ->
        if e.pageSpread?
            id = e.pageSpread.getId()

            @currentPageSpreadId = id
            @requestHotspots id, e.pageSpread.getPages() if @pageSpreadsLoaded[id]

        return

    pagesLoaded: (e) ->
        @pageSpreadsLoaded[e.pageSpreadId] = true
        @requestHotspots e.pageSpreadId, e.pages if @currentPageSpreadId is e.pageSpreadId

        return

    resized: ->
        hotspots = @hotspots[@currentPageSpreadId]

        @renderHotspots hotspots if hotspots?

        return

MicroEvent.mixin PagedPublicationHotspots

module.exports = PagedPublicationHotspots
