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
        window.devicePixelRatio or 1
    
    getPointer: ->
        util.getPointer()
    
    getOrientation: ->
        orientation = util.getOrientation window.innerWidth, window.innerHeight
        orientation = 'horizontal' if orientation is 'quadratic'

        orientation
    
    getMaxWidth: ->
        @options.el.offsetWidth

    fetch: (callback) ->
        data = SGN.storage.session.get "incito-#{@options.id}"

        return callback null, data if data?

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
        , (err, data) =>
            if err?
                callback err
            else
                callback null, data

                SGN.storage.session.set "incito-#{@options.id}", data
            
            return

        return
    
    createViewer: (data) ->
        if not data.incito?
            throw util.error new Error(), 'you need to supply valid Incito to create a viewer'

        viewer = new SGN.IncitoPublicationKit.Viewer @options.el,
            id: @options.id
            incito: data.incito
            eventTracker: @options.eventTracker

        viewer