Incito = require 'incito-browser'

class Viewer
    constructor: (el, @options = {}) ->
        @els =
            root: el
            incito: el.querySelector '.incito'
        @incito = new Incito @els.incito,
            incito: @options.incito

        return
    
    start: ->
        @els.root.setAttribute 'data-started', ''
        @els.root.setAttribute 'tabindex', '-1'
        @els.root.focus()

        @incito.start()

        @
    
    destroy: ->
        return

module.exports = Viewer