module.exports = class OfferDetails
    constructor: (@options = {}) ->
        @el = document.createElement 'div'

        @el.className = 'sgn-offer-details'
        @el.setAttribute 'tabindex', -1
        @el.appendChild @options.contentEl

        @position()

        return
    
    appendTo: (el) ->
        el.appendChild @el

        @el.offsetWidth

        @show()

        @
    
    show: ->
        @el.className += ' in'

        window.addEventListener 'resize', @resize, false

        @
    
    destroy: ->
        window.removeEventListener 'resize', @resize, false

        @el.parentNode.removeChild @el

        return
    
    position: ->
        rect = @options.anchorEl.getBoundingClientRect()
        top = window.pageYOffset + rect.top + @options.anchorEl.offsetHeight
        left = window.pageXOffset + rect.left
        width = @options.anchorEl.offsetWidth

        @el.style.top = top + 'px'
        @el.style.left = left + 'px'
        @el.style.width = width + 'px'

        return
    
    resize: =>
        @position()

        return