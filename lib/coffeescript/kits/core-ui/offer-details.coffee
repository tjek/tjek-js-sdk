module.exports = class OfferDetails
    constructor: ({@minWidth = 300, @maxWidth = '100vw', @anchorEl, @contentEl}) ->
        @elInner = document.createElement 'div'
        @elInner.className = 'sgn-offer-details-inner'

        @el = document.createElement 'div'

        @el.className = 'sgn-offer-details'
        @el.setAttribute 'tabindex', -1
        @el.appendChild @elInner
        @el.appendChild @contentEl

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
        rect = @anchorEl.getBoundingClientRect()
        top = window.pageYOffset + rect.top + @anchorEl.offsetHeight
        left = window.pageXOffset + rect.left
        width = @anchorEl.offsetWidth
        
        @el.style.top = top + 'px'

        rightAligned = rect.left >= (window.outerWidth / 2)
        left = window.pageXOffset + rect.left
        right = window.pageXOffset + (window.outerWidth - rect.right)

        if rightAligned
            @el.style.left = 'auto'
            @el.style.right = right + 'px'

            @elInner.style.left = 'auto'
            @elInner.style.right = 0
        else
            @el.style.left = left + 'px'
            @el.style.right = 'auto'

            @elInner.style.left = 0
            @elInner.style.right = 'auto'

        @el.style.minWidth = if typeof @minWidth == 'number' then Math.max(width, @minWidth) + 'px' else @minWidth
        @el.style.maxWidth = @maxWidth

        @elInner.style.width = (width - 8) + 'px'

        return
    
    resize: =>
        @position()

        return
