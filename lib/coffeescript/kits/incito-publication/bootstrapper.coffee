util = require '../../util'
SGN = require '../../core'
schema = require '../../../graphql/incito.graphql'

module.exports = class Bootstrapper
    constructor: (@options = {}) ->
        @deviceCategory = @getDeviceCategory()
        @pixelRatio = @getPixelRatio()
        @pointer = @getPointer()
        @orientation = @getOrientation()
        @maxWidth = @getMaxWidth()
        @versionsSupported = ['1.0.0']

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
    
    getMaxWidth: ->
        @options.el.offsetWidth

    fetch: (callback) ->
        SGN.GraphKit.request
            query: schema
            operationName: 'GetIncitoPublication'
            variables:
                id: @options.id
                deviceCategory: 'DEVICE_CATEGORY_' + @deviceCategory.toUpperCase()
                pixelRatio: @pixelRatio
                pointer: 'POINTER_' + @pointer.toUpperCase()
                orientation: 'ORIENTATION_' + @orientation.toUpperCase()
                maxWidth: @maxWidth
                versionsSupported: @versionsSupported
        , callback

        return
    
    createViewer: (data) ->
        viewer = new SGN.IncitoPublicationKit.Viewer
            el: @options.el.querySelector('.incito'),
            id: @options.id
            incito: data.incito
            eventTracker: @options.eventTracker
        
        viewer.bind 'progress', (e) ->
            console.log 'progress', e

            return

        viewer