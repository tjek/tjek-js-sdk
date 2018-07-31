Incito = require 'incito-browser'
MicroEvent = require 'microevent'

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

module.exports = Viewer