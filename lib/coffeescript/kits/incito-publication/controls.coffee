module.exports = class Controls
    constructor: (@viewer) ->
        @progressEl = @viewer.el.querySelector '.sgn-incito__progress'
        @scrollListener = @scroll.bind @

        if @progressEl?
            window.addEventListener 'scroll', @scrollListener, false

            @viewer.bind 'destroyed', =>
                window.removeEventListener 'scroll', @scrollListener

                return

        return
    
    scroll: ->
        scrollTop = window.scrollY
        winHeight = window.innerHeight
        docHeight = document.body.clientHeight
        progress = Math.round (scrollTop + winHeight) / docHeight * 100

        if scrollTop < 300
            @progressEl.style.opacity = 0
        else if scrollTop >= docHeight - winHeight
            @progressEl.textContent = '100%'
            @progressEl.style.opacity = 1
        else
            @progressEl.textContent = "#{progress} %"
            @progressEl.style.opacity = 1

        return