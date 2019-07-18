Incito = require 'incito-browser'
MicroEvent = require 'microevent'
EventTracking = require './event-tracking'

class Viewer
    @Incito: Incito

    constructor: (@el, @options = {}) ->
        @incito = new Incito @el,
            incito: @options.incito
            renderLaziness: @options.renderLaziness
        @_eventTracking = new EventTracking @options.eventTracker, @options.details

        return
    
    start: ->
        @incito.start()

        @el.classList.add 'sgn-incito--started'

        @_eventTracking.trackOpened()

        @
    
    destroy: ->
        @incito.destroy()

        return

MicroEvent.mixin Viewer

module.exports = Viewer
