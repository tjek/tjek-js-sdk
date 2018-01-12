Incito = require 'incito-browser'

class Viewer
    constructor: (@options = {}) ->
        @incito = new Incito @options.el,
            incito: @options.incito

        return
    
    start: ->
        @incito.start()

        @

module.exports = Viewer