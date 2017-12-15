MicroEvent = require 'microevent'
Mustache = require 'mustache'
template = require './templates/hotspot'

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
        boundingRect = pageSpreadEl.getBoundingClientRect()

        hotspotEl.parentNode.removeChild hotspotEl for hotspotEl in hotspotEls

        for id, hotspot of data.hotspots
            position = @getPosition data.pages, data.ratio, hotspot
            el = @renderHotspot hotspot, position, contentRect, boundingRect
            
            frag.appendChild el

        pageSpreadEl.appendChild frag

        @

    renderHotspot: (hotspot, position, contentRect, boundingRect) ->
        el = document.createElement 'div'
        top = Math.round contentRect.height / 100 * position.top
        left = Math.round contentRect.width / 100 * position.left
        width = Math.round contentRect.width / 100 * position.width
        height = Math.round contentRect.height / 100 * position.height

        top += Math.round contentRect.top
        left += Math.round contentRect.left
        top -= boundingRect.y
        left -= boundingRect.x

        el.className = 'sgn-pp__hotspot verso__overlay'
        el.setAttribute 'data-id', hotspot.id if hotspot.id?
        el.setAttribute 'data-type', hotspot.type if hotspot.type?
        el.innerHTML = Mustache.render hotspot.template ? template, hotspot

        el.style.top = "#{top}px"
        el.style.left = "#{left}px"
        el.style.width = "#{width}px"
        el.style.height = "#{height}px"

        el

    getPosition: (pages, ratio, hotspot) ->
        minX = null
        minY = null
        maxX = null
        maxY = null
        pageNumbers = pages.map (page) -> page.pageNumber

        for pageNumber of hotspot.locations
            continue if pageNumbers.indexOf(+pageNumber) is -1

            hotspot.locations[pageNumber].forEach (coords) ->
                x = coords[0]
                y = coords[1]

                x +=1 if pages[1] and pageNumbers[1] is +pageNumber
                x /= pages.length

                if not minX?
                    minX = maxX = x
                    minY = maxY = y

                minX = x if x < minX
                maxX = x if x > maxX
                minY = y if y < minY
                maxY = y if y > maxY

        width = maxX - minX
        height = maxY - minY

        top: minY / ratio * 100
        left: minX * 100
        width: width * 100
        height: height / ratio * 100

    requestHotspots: (pageSpreadId, pages) ->
        @trigger 'hotspotsRequested',
            id: pageSpreadId
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
        return if not e.pageSpread?

        id = e.pageSpread.getId()

        @currentPageSpreadId = id
        @requestHotspots id, e.pageSpread.getPages() if @pageSpreadsLoaded[id]

        return

    pagesLoaded: (e) ->
        @pageSpreadsLoaded[e.pageSpreadId] = true
        @requestHotspots e.pageSpreadId, e.pages if @currentPageSpreadId is e.pageSpreadId

        return

    resized: (e) ->
        data = @getCache @currentPageSpreadId

        @renderHotspots data if data?

        return

MicroEvent.mixin PagedPublicationHotspots

module.exports = PagedPublicationHotspots


