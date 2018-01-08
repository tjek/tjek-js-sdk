util = require '../../util'
SGN = require '../../core'
schema = require '../../../graphql/incito.graphql'

module.exports = class Bootstrapper
    constructor: (@options = {}) ->
        @deviceCategory = @getDeviceCategory()
        @pixelRatio = @getPixelRatio()
        @pointer = @getPointer()
        @orientation = @getOrientation()
        @width = @getWidth @options.el.offsetWidth
        @versionsSupported = ['1.0.0'];

        return
    
    getDeviceCategory: ->
        util.getDeviceCategory()
    
    getPixelRatio: ->
        window.devicePixelRatio || 1
    
    getPointer: ->
        util.getPointer()
    
    getOrientation: ->
        orientation = util.getOrientation window.offsetWidth, window.offsetHeight
        orientation = 'horizontal' if orientation is 'quadratic'

        orientation

    getWidth: (availWidth) ->
        width = availWidth

        if @deviceCategory is 'mobile'
            width = Math.min width, 375
        else if @deviceCategory is 'tablet'
            width = Math.min width, 768
        else
            width = Math.min width, 1200
        
        width

    fetch: (callback) ->
        SGN.GraphKit.request
            query: schema
            operationName: 'GetIncitoPublication'
            variables:
                id: @options.id
                deviceCategory: @deviceCategory
                pixelRatio: @pixelRatio
                pointer: @pointer
                width: @width
                versionsSupported: @versionsSupported
        , callback

        return
    
    createViewer: (data) ->
        viewer = new SGN.IncitoPublicationKit.Viewer
            id: @options.id
            incito: data.incito
            eventTracker: @options.eventTracker

        viewer