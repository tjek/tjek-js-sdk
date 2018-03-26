import { getPointer, error, getDeviceCategory, getOrientation } from '../../util'
import * as Controls from './controls'
import * as schema from '../../../graphql/incito.graphql'
import sessionStorage from '../../storage/client-session'
import * as GraphKit from '../graph'
import Viewer from './viewer'

export default class Bootstrapper
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
        getDeviceCategory()
    
    getPixelRatio: ->
        window.devicePixelRatio or 1
    
    getPointer: ->
        getPointer()
    
    getOrientation: ->
        orientation = getOrientation screen.width, screen.height
        orientation = 'horizontal' if orientation is 'quadratic'

        orientation
    
    getMaxWidth: ->
        if Math.abs(window.orientation) is 90
            Math.min @options.el.offsetWidth, screen.width
        else
            @options.el.offsetWidth

    fetch: (callback) ->
        data = sessionStorage.get @storageKey

        if data? and data.response? and data.width is @maxWidth
            return callback null, data.response

        GraphKit.request
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
                callback error(new Error(), 'graph request contained errors')
            else
                callback null, res

                sessionStorage.set @storageKey,
                    width: @maxWidth
                    response: res
            
            return

        return
    
    createViewer: (data) ->
        if not data.incito?
            throw error new Error(), 'you need to supply valid Incito to create a viewer'

        viewer = new Viewer @options.el,
            id: @options.id
            incito: data.incito
            eventTracker: @options.eventTracker
        controls = new Controls viewer

        viewer