util = require '../../util'
SGN = require '../../core'
Controls = require './controls'
clientLocalStorage = require '../../storage/client-local'
schema = require '../../../graphql/incito.graphql'

module.exports = class Bootstrapper
    constructor: (@options = {}) ->
        @deviceCategory = @getDeviceCategory()
        @pixelRatio = @getPixelRatio()
        @pointer = @getPointer()
        @orientation = @getOrientation()
        @time = @getTime()
        @locale = @getLocale()
        @maxWidth = @getMaxWidth()
        @featureLabels = @getFeatureLabels()
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
    
    getTime: ->
        new Date().toISOString()
    
    getLocale: ->
        localeChain = []
        locale = null

        if Array.isArray(navigator.languages) and navigator.languages.length > 0
            localeChain = localeChain.concat navigator.languages
        else if typeof navigator.language == 'string' and navigator.language.length > 0
            localeChain.push navigator.language
        else if typeof navigator.browserLanguage == 'string' and navigator.browserLanguage.length > 0
            localeChain.push navigator.browserLanguage

        localeChain.push 'en_US'

        for prefLocale in localeChain
            continue if not prefLocale?

            prefLocale = prefLocale.replace '-', '_'

            if /[a-z][a-z]_[A-Z][A-Z]/g.test prefLocale
                locale = prefLocale
                
                break

        locale
    
    getMaxWidth: ->
        if Math.abs(window.orientation) is 90
            Math.min @options.el.offsetWidth, screen.width
        else
            @options.el.offsetWidth
    
    getFeatureLabels: ->
        featureLabels = clientLocalStorage.get 'incito-feature-labels'
        featureLabels = [] if Array.isArray(featureLabels) is false

        featureLabels
    
    anonymizeFeatureLabels: ->
        totalCount = @featureLabels.reduce (acc, cur) ->
            acc + cur.value
        , 0

        @featureLabels.map (featureLabel) ->
            key: featureLabel.key
            value: featureLabel.value / totalCount

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
                time: @time
                locale: @locale
                maxWidth: @maxWidth
                versionsSupported: @versionsSupported
                featureLabels: @anonymizeFeatureLabels @featureLabels
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
            pagedPublicationId: @options.pagedPublicationId
            incito: data.incito
            eventTracker: @options.eventTracker
        controls = new Controls viewer
        self = @

        # Persist clicks on feature labels for later anonymization.
        SGN.CoreUIKit.on viewer.el, 'click', '.incito__view[data-feature-labels]', ->
            featureLabels = this.getAttribute('data-feature-labels').split ','

            featureLabels.forEach (key) ->
                match = self.featureLabels.find (featureLabel) -> featureLabel.key is key

                if match?
                    match.value++
                else
                    self.featureLabels.push
                        key: key
                        value: 1

                return
            
            clientLocalStorage.set 'incito-feature-labels', self.featureLabels
            
            return

        viewer
