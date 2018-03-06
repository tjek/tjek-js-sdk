Incito = require 'incito-browser'
MicroEvent = require 'microevent'
smoothscroll = require 'smoothscroll-polyfill'

smoothscroll.polyfill()

class Viewer
    constructor: (@el, @options = {}) ->
        incito = new Incito @el,
            incito: @options.incito
        trigger = incito.trigger

        incito.trigger = (args...) =>
            trigger.apply incito, args
            @trigger.apply @, args
            
            return
        
        @incito = incito
            
        return
    
    start: ->
        @incito.start()

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