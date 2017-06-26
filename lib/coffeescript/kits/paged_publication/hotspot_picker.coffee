module.exports = class PagedPublicationHotspotPicker
    constructor: (@options = {}) ->
        @el = document.createElement 'div'

        @render()

        return

    render: ->
        @el.className = 'sgn-pp__hotspot-picker'
        @el.style.top = "#{@options.y}px"
        @el.style.left = "#{@options.x}px"

        @options.hotspots.forEach (hotspot) =>
            el = document.createElement 'div'

            el.textContent = hotspot.title

            @el.appendChild el

            return

        @
