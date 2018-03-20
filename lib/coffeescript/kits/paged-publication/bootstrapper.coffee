import { request } from '../core'
import { asyncParallel } from '../../util'
import Viewer from './viewer'

export default class Bootstrapper
    constructor: (@options = {}) ->
        return

    createViewer: (data) ->
        new Viewer @options.el,
            id: @options.id
            ownedBy: data.details.dealer_id
            color: '#' + data.details.branding.pageflip.color
            hotspotRatio: data.details.dimensions.height
            keyboard: true
            pageId: @options.pageId
            eventTracker: @options.eventTracker
            pages: @transformPages data.pages

    transformPages: (pages) ->
        pages.map (page, i) ->
            pageNumber = i + 1

            id: 'page' + pageNumber
            label: pageNumber + ''
            pageNumber: pageNumber
            images:
                medium: page.view
                large: page.zoom

    applyHotspots: (viewer, hotspots) ->
        obj = {}

        hotspots.forEach (hotspot) -> obj[hotspot.id] = hotspot
        
        viewer.applyHotspots obj

        return
    
    fetch: (callback) ->
        asyncParallel [@fetchDetails.bind(@), @fetchPages.bind(@)], (result) ->
            data =
                details: result[0][1]
                pages: result[1][1]

            if data.details? and data.pages?
                callback null, data
            else
                callback new Error()

            return
        
        return

    fetchDetails: (callback) ->
        request
            url: "/v2/catalogs/#{@options.id}"
        , callback

        return

    fetchPages: (callback) ->
        request
            url: "/v2/catalogs/#{@options.id}/pages"
        , callback

        return

    fetchHotspots: (callback) ->
        request
            url: "/v2/catalogs/#{@options.id}/hotspots"
        , callback

        return