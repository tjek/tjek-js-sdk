MicroEvent = require 'microevent'
Gator = require 'gator'
Mustache = require 'mustache'
template = require './templates/hotspot_picker'

class PagedPublicationHotspotPicker
    constructor: (@options = {}) ->
        @el = document.createElement 'div'

        @render()

        return

    render: ->
        width = @options.width ? 100
        header = @options.header
        template = @options.template if @options.template?
        trigger = @trigger.bind @
        view =
            header: header
            hotspots: @options.hotspots

        @el.className = 'sgn-pp__hotspot-picker'
        @el.style.top = "#{@options.y}px"
        @el.style.left = "#{@options.x}px"
        @el.setAttribute 'tabindex', -1
        @el.innerHTML = Mustache.render template, view

        @el.addEventListener 'keyup', (e) =>
            @destroy() if e.keyCode is 27

            return

        Gator(@el).on 'click', '[data-id]', ->
            trigger 'selected', id: @getAttribute('data-id')

            return

        @

    destroy: ->
        @el.parentNode.removeChild @el

        @trigger 'destroyed'

        return

MicroEvent.mixin PagedPublicationHotspotPicker

module.exports = PagedPublicationHotspotPicker
