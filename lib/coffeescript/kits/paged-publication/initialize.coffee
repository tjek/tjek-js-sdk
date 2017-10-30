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
        if options.data?.details
            callback null, options.data.details
        else
            SGN.CoreKit.request
                url: "/v2/catalogs/#{options.id}"
            , callback

        return
    fetchPages = (callback) ->
        if options.data?.pages
            callback null, options.data.pages
        else
            SGN.CoreKit.request
                url: "/v2/catalogs/#{options.id}/pages"
            , callback

        return
    fetchHotspots = (callback) ->
        if options.data?.hotspots
            callback null, options.data.hotspots
        else
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
            pageId: options.pageId
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
            getSelectedHotspot e, (hotspot) ->
                viewer.trigger 'hotspotClicked', hotspot

                return
            
            return

        viewer.bind 'contextmenu', (e) ->
            getSelectedHotspot e, (hotspot) ->
                viewer.trigger 'hotspotContextmenu', hotspot

                return
            
            return
        
        viewer.bind 'pressed', (e) ->
            getSelectedHotspot e, (hotspot) ->
                viewer.trigger 'hotspotPressed', hotspot

                return
            
            return

        callback null, viewer, data
        
        if !options.data?.details
            viewer.trigger 'pagedPublicationFetched', data.details
        if !options.data?.pages
            viewer.trigger 'pagesFetched', data.pages
        if data.hotspots and !options.data?.hotspots
            viewer.trigger 'hotspotsFetched', Object.keys(data.hotspots).map((key) -> data.hotspots[key])

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
    getSelectedHotspot = (e, callback) ->
        hotspots = e.verso.overlayEls.map (overlayEl) ->
            data.hotspots[overlayEl.getAttribute('data-id')]

        if hotspots.length is 1
            callback hotspots[0]
        else if hotspots.length > 1
            hotspots = hotspots
                .filter (hotspot) -> hotspot.type is 'offer'
                .map (hotspot) ->
                    id: hotspot.id
                    title: hotspot.offer.heading
                    subtitle: hotspot.offer.pricing.currency + '' + hotspot.offer.pricing.price

            hotspotPicker = new SGN.PagedPublicationKit.HotspotPicker
                header: SGN.translations.t 'paged_publication.hotspot_picker.header'
                x: e.verso.x
                y: e.verso.y
                hotspots: hotspots

            hotspotPicker.bind 'selected', (e) ->
                callback data.hotspots[e.id]
                hotspotPicker.destroy()

                return

            hotspotPicker.bind 'destroyed', ->
                hotspotPicker = null
                viewer.el.focus()

                return

            viewer.el.appendChild hotspotPicker.el
            hotspotPicker.render().el.focus()

    SGN.util.async.parallel [fetch, fetchPages], (result) ->
        details = result[0][1]
        pages = result[1][1]

        if details? and pages?
            data.details = details
            data.pages = pages

            if options.showHotspots isnt false
                fetchHotspots (err, response) ->
                    return if err?

                    data.hotspots = {}

                    response.forEach (hotspot) ->
                        data.hotspots[hotspot.id] = hotspot

                        return

                    processHotspotQueue()

                    render()
            else
                render()
        else
            callback new Error()

        return


    return
