MicroEvent = require 'microevent'
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
        view =
            header: header
            hotspots: @options.hotspots

        @el.className = 'sgn-pp__hotspot-picker'
        @el.style.top = "#{@options.y}px"
        @el.style.left = "#{@options.x}px"
        @el.innerHTML = Mustache.render template, view

        @el.addEventListener 'click', (e) =>
            if e.target.tagName is 'A'
                id = e.target.getAttribute 'data-id'

                @trigger 'selected', id: id if id?

            return

        @

    destroy: ->
        @el.parentNode.removeChild @el

        return

MicroEvent.mixin PagedPublicationHotspotPicker

module.exports = PagedPublicationHotspotPicker
