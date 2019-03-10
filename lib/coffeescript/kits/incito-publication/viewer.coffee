import Incito from 'incito-browser'
import MicroEvent from 'microevent'
import EventTracking from './event-tracking'

class Viewer
    constructor: (@el, @options = {}) ->
        @incito = new Incito @el,
            incito: @options.incito
        @_eventTracking = new EventTracking @options.eventTracker, @options.id,
            pagedPublicationId: @options.pagedPublicationId

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

export default Viewer
