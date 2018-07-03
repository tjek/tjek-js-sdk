util = require '../../util'
SGN = require '../../core'
Controls = require './controls'
schema = require '../../../graphql/incito.graphql'

module.exports = class Bootstrapper
    constructor: (@options = {}) ->
        @deviceCategory = @getDeviceCategory()
        @pixelRatio = @getPixelRatio()
        @pointer = @getPointer()
        @orientation = @getOrientation()
        @maxWidth = @getMaxWidth()
        @versionsSupported = ['1.0.0']
        @storageKey = "incito-#{@options.id}"

        return
    
    getDeviceCategory: ->
        util.getDeviceCategory()
    
    getPixelRatio: ->
        window.devicePixelRatio or 1
    
    getPointer: ->
        util.getPointer()
    
    getOrientation: ->
        orientation = util.getOrientation screen.width, screen.height
        orientation = 'horizontal' if orientation is 'quadratic'

        orientation
    
    getMaxWidth: ->
        if Math.abs(window.orientation) is 90
            Math.min @options.el.offsetWidth, screen.width
        else
            @options.el.offsetWidth

    fetch: (callback) ->
        callback = callback.bind @
        data = SGN.storage.session.get @storageKey

        if data? and data.response? and data.width is @maxWidth
            return callback null, data.response

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
        , (err, res) =>
            if err?
                callback err
            else if res.errors and res.errors.length > 0
                callback util.error(new Error(), 'graph request contained errors')
            else
                callback null, res

                SGN.storage.session.set @storageKey,
                    width: @maxWidth
                    response: res
            
            return

        return
    
    createViewer: (data) ->
        if not data.incito?
            throw util.error new Error(), 'you need to supply valid Incito to create a viewer'

        viewer = new SGN.IncitoPublicationKit.Viewer @options.el,
            id: @options.id
            incito: data.incito
            eventTracker: @options.eventTracker
        controls = new Controls viewer

        viewer