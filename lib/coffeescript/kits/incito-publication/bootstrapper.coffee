util = require '../../util'
SGN = require '../../core'

module.exports = class Bootstrapper
    constructor: (@options = {}) ->
        @deviceCategory = @getDeviceCategory()
        @pointer = @getPointer()
        @orientation = @getOrientation()
        @width = @getWidth @options.el.offsetWidth

        return
    
    getDeviceCategory: ->
        util.getDeviceCategory()
    
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
            query: """
                query GetIncitoPublication($id: ID!, $deviceCategory: DeviceCategory!, $pointer: Pointer!, $width: Int!) {
                    node(id: $ID) {
                        ... on IncitoPublication {
                            id
                            incito(deviceCategory: $deviceCategory, pointer: $pointer, width: $width)
                        }
                    }
                }
            """
            operationName: 'GetIncitoPublication'
            variables:
                id: @options.id
                deviceCategory: @deviceCategory
                pointer: @pointer
                width: @width
        , callback

        return
    
    createViewer: (data) ->
        viewer = new SGN.IncitoPublicationKit.Viewer
            id: @options.id
            incito: data.incito
            eventTracker: @options.eventTracker

        viewer