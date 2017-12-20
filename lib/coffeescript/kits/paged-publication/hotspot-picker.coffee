MicroEvent = require 'microevent'
Gator = require 'gator'
Mustache = require 'mustache'
template = require './templates/hotspot-picker'
keyCodes = require '../../key-codes'

class PagedPublicationHotspotPicker
    constructor: (@options = {}) ->
        @el = document.createElement 'div'
        @resizeListener = @resize.bind @

        return

    render: ->
        width = @options.width ? 100
        header = @options.header
        template = @options.template if @options.template?
        trigger = @trigger.bind @
        view =
            header: header
            hotspots: @options.hotspots
            top: @options.y
            left: @options.x

        @el.className = 'sgn-pp__hotspot-picker'
        @el.setAttribute 'tabindex', -1
        @el.innerHTML = Mustache.render template, view

        popoverEl = @el.querySelector '.sgn__popover'
        width = popoverEl.offsetWidth
        height = popoverEl.offsetHeight
        parentWidth = @el.parentNode.offsetWidth
        parentHeight = @el.parentNode.offsetHeight
        boundingRect = @el.parentNode.getBoundingClientRect()

        view.top -= boundingRect.y
        view.left -= boundingRect.x

        if view.top + height > parentHeight
            popoverEl.style.top = parentHeight - height + 'px'
        else
            popoverEl.style.top = view.top + 'px'

        if view.left + width > parentWidth
            popoverEl.style.left = parentWidth - width + 'px'
        else
            popoverEl.style.left = view.left + 'px'

        @el.addEventListener 'keyup', @keyUp.bind(@)

        Gator(@el).on 'click', '[data-id]', ->
            trigger 'selected', id: @getAttribute('data-id')

            return

        Gator(@el).on 'click', '[data-close]', @destroy.bind(@)

        window.addEventListener 'resize', @resizeListener, false

        @

    destroy: ->
        @el.parentNode.removeChild @el

        @trigger 'destroyed'

        return

    keyUp: (e) ->
        @destroy() if e.keyCode is keyCodes.ESC
        
        return

    resize: ->
        window.removeEventListener 'resize', @resizeListener

        @destroy()

        return

MicroEvent.mixin PagedPublicationHotspotPicker

module.exports = PagedPublicationHotspotPicker
