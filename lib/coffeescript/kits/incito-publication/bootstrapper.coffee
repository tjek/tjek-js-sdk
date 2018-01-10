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
                deviceCategory: @deviceCategory
                pixelRatio: @pixelRatio
                pointer: @pointer
                maxWidth: @maxWidth
                versionsSupported: @versionsSupported
        , callback

        return
    
    createViewer: (data) ->
        viewer = new SGN.IncitoPublicationKit.Viewer
            id: @options.id
            incito: data.incito
            eventTracker: @options.eventTracker

        viewer