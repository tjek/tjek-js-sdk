Incito = require 'incito-browser'
MicroEvent = require 'microevent'

class Viewer
    constructor: (el, @options = {}) ->
        @els =
            root: el
            incito: el.querySelector '.incito'
        @incito = new Incito @els.incito,
            incito: @options.incito
        
        trigger = @incito.trigger

        @incito.trigger = (args...) =>
            trigger.apply @incito, args
            @trigger.apply @, args
            
            return

        return
    
    start: ->
        @els.root.setAttribute 'data-started', ''
        @els.root.setAttribute 'tabindex', '-1'
        @els.root.focus()

        @incito.start()

        @
    
    destroy: ->
        return

MicroEvent.mixin Viewer

module.exports = Viewer