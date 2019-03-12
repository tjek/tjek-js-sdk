module.exports = class Controls
    constructor: (@viewer) ->
        @progressEl = @viewer.el.querySelector '.sgn-incito__progress'
        @scrollListener = @scroll.bind @
        @isScrolling = false

        if @progressEl?
            @progressEl.textContent = "0 %"

            window.addEventListener 'scroll', @scrollListener, false

            @viewer.bind 'destroyed', =>
                window.removeEventListener 'scroll', @scrollListener

                return

        return
    
    scroll: ->
        winHeight = window.innerHeight
        rect = @viewer.el.getBoundingClientRect()
        progress = Math.min 100, Math.round(Math.abs(rect.top - winHeight) / rect.height * 100)

        clearTimeout @scrollTimeout
        @scrollTimeout = setTimeout =>
            @isScrolling = false

            @viewer.el.classList.remove 'sgn-incito--scrolling'

            return
        , 1000

        if @isScrolling is false
            @viewer.el.classList.add 'sgn-incito--scrolling'

            @isScrolling = true

        @progressEl.textContent = "#{progress} %"
        @viewer.trigger 'progress', progress: progress

        return