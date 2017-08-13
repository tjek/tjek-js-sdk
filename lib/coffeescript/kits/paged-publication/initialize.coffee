MicroEvent = require 'microevent'
SGN = require '../../core'

module.exports = (options = {}, callback) ->
    data =
        details: null
        pages: null
        hotspots: null
    viewer = null
    hotspots = {}
    hotspotQueue = []
    hotspotPicker = null
    fetch = (callback) ->
        SGN.CoreKit.request
            url: "/v2/catalogs/#{options.id}"
        , callback

        return
    fetchPages = (callback) ->
        SGN.CoreKit.request
            url: "/v2/catalogs/#{options.id}/pages"
        , callback

        return
    fetchHotspots = (callback) ->
        SGN.CoreKit.request
            url: "/v2/catalogs/#{options.id}/hotspots"
        , callback

        return
    render = ->
        viewer = new SGN.PagedPublicationKit.Viewer options.el,
            id: options.id
            ownedBy: data.details.dealer_id
            color: '#' + data.details.branding.pageflip.color
            keyboard: true
            eventTracker: options.eventTracker
            pages: transformPages data.pages

        viewer.bind 'hotspotsRequested', (e) ->
            hotspotQueue.push e
            processHotspotQueue()

            return

        viewer.bind 'beforeNavigation', ->
            hotspotPicker.destroy() if hotspotPicker?

            return

        viewer.bind 'clicked', (e) ->
            clickedHotspots = e.verso.overlayEls.map (overlayEl) ->
                data.hotspots[overlayEl.getAttribute('data-id')]

            if clickedHotspots.length is 1
                viewer.trigger 'hotspotSelected', clickedHotspots[0]
            else if clickedHotspots.length > 1
                hotspots = clickedHotspots
                    .filter (hotspot) -> hotspot.type is 'offer'
                    .map (hotspot) ->
                        id: hotspot.id
                        title: hotspot.offer.heading
                        subtitle: hotspot.offer.pricing.currency + '' + hotspot.offer.pricing.price

                hotspotPicker = new SGN.PagedPublicationKit.HotspotPicker
                    header: SGN.i18n.t 'paged_publication.hotspot_picker.header'
                    x: e.verso.x
                    y: e.verso.y
                    hotspots: hotspots

                hotspotPicker.bind 'selected', (e) ->
                    viewer.trigger 'hotspotSelected', data.hotspots[e.id]
                    hotspotPicker.destroy()

                    return

                hotspotPicker.bind 'destroyed', ->
                    hotspotPicker = null
                    viewer.el.focus()

                    return

                viewer.el.appendChild hotspotPicker.el
                hotspotPicker.render().el.focus()

            return

        callback null, viewer

        return
    transformPages = (pages) ->
        pages.map (page, i) ->
            pageNumber = i + 1

            id: 'page' + pageNumber
            label: pageNumber + ''
            pageNumber: pageNumber
            images:
                medium: page.view
                large: page.zoom
    processHotspotQueue = ->
        return if not viewer or not data.hotspots

        hotspotQueue = hotspotQueue.filter (hotspotRequest) ->
            hotspots = {}

            for id, hotspot of data.hotspots
                match = false

                hotspotRequest.pages.forEach (page) ->
                    match = true if hotspot.locations[page.pageNumber]?

                    return

                if match
                    hotspots[id] =
                        type: hotspot.type
                        id: hotspot.id
                        locations: hotspot.locations

            viewer.trigger 'hotspotsReceived',
                id: hotspotRequest.id
                pages: hotspotRequest.pages
                ratio: data.details.dimensions.height
                hotspots: hotspots

            false

        return

    SGN.util.async.parallel [fetch, fetchPages], (result) ->
        details = result[0][1]
        pages = result[1][1]

        if details? and pages?
            data.details = details
            data.pages = pages

            render()
        else
            callback new Error()

        return

    if options.showHotspots isnt false
        fetchHotspots (err, response) ->
            return if err?

            data.hotspots = {}

            response.forEach (hotspot) ->
                data.hotspots[hotspot.id] = hotspot

                return

            processHotspotQueue()

            return

    return
