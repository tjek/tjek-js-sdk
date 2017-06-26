MicroEvent = require 'microevent'

class PagedPublicationHotspots
    constructor: ->
        @currentPageSpreadId = null
        @pageSpreadsLoaded = {}
        @cache = {}

        @bind 'hotspotsReceived', @hotspotsReceived.bind(@)
        @bind 'afterNavigation', @afterNavigation.bind(@)
        @bind 'pagesLoaded', @pagesLoaded.bind(@)
        @bind 'resized', @resized.bind(@)

        return

    renderHotspots: (data) ->
        frag = document.createDocumentFragment()
        contentRect = data.versoPageSpread.getContentRect()
        pageSpreadEl = data.pageSpread.getEl()
        hotspotEls = pageSpreadEl.querySelectorAll '.sgn-pp__hotspot'

        data.hotspots.forEach (hotspot) =>
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
        el.setAttribute 'data-id', hotspot.id if hotspot.id?
        el.setAttribute 'data-type', hotspot.type if hotspot.type?

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
        pageSpreadId = e.pageSpread.getId()

        @setCache pageSpreadId, e
        @renderHotspots e

        return

    getCache: (pageSpreadId) ->
        @cache[pageSpreadId]

    setCache: (pageSpreadId, data) ->
        @cache[pageSpreadId] = data

        @

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
        data = @getCache @currentPageSpreadId

        @renderHotspots data if data?

        return

MicroEvent.mixin PagedPublicationHotspots

module.exports = PagedPublicationHotspots
