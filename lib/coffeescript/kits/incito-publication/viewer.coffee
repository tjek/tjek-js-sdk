Incito = require 'incito-browser'
MicroEvent = require 'microevent'

class Viewer
    constructor: (@el, @options = {}) ->
        @incito = new Incito @el,
            incito: @options.incito
            
        return
    
    start: ->
        @incito.start()

        @_trackEvent
            type: 'x-incito-publication-opened'
            properties:
                id: @options.id

        @
    
    destroy: ->
        @incito.destroy()

        return
    
    _trackEvent: (e) ->
        type = e.type
        properties =
            id: @options.id
        eventTracker = @options.eventTracker

        properties[key] = value for key, value of e.properties

        eventTracker.trackEvent type, properties if eventTracker?

MicroEvent.mixin Viewer

module.exports = Viewer