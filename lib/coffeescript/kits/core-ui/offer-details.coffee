Mustache = require 'mustache'

module.exports = class OfferDetails
    constructor: (@options = {}) ->
        @el = document.createElement 'div'
        @resizeListener = @resize.bind @

        return
    
    render: ->
        @el.className = 'sgn-offer-details'
        @el.setAttribute 'tabindex', -1
        @el.innerHTML = Mustache.render @options.template, @options.view

        @position()

        @
    
    show: ->
        @el.focus()
        @el.className += ' in'

        window.addEventListener 'resize', @resizeListener, false

        @
    
    destroy: ->
        window.removeEventListener 'resize', @resizeListener

        @el.parentNode.removeChild @el

        return
    
    position: ->
        rect = @options.el.getBoundingClientRect()
        top = window.pageYOffset + rect.top + @options.el.offsetHeight
        left = window.pageXOffset + rect.left

        @el.style.top = top + 'px'
        @el.style.left = left + 'px'
        @el.style.width = @options.el.offsetWidth + 'px'

        return
    
    resize: ->
        @position()

        return