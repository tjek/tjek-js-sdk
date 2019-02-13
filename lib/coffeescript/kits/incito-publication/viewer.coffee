import Incito from 'incito-browser'
import MicroEvent from 'microevent'

class Viewer
    constructor: (@el, @options = {}) ->
        @incito = new Incito @el,
            incito: @options.incito
            
        return
    
    start: ->
        @incito.start()

        @el.classList.add 'sgn-incito--started'

        @
    
    destroy: ->
        @incito.destroy()

        return

MicroEvent.mixin Viewer

export default Viewer
