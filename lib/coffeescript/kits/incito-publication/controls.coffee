module.exports = class Controls
    constructor: (@viewer) ->
        @progressDelay = 1500
        @progressEl = @viewer.el.querySelector '.sgn-incito__progress'

        @setupProgress() if @progressEl?

        @viewer.bind 'destroyed', =>
            clearInterval @progressInterval

            return

        return
    
    setupProgress: ->
        @progressInterval = setInterval =>
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
                @progressEl.textContent = "#{progress}%"
                @progressEl.style.opacity = 1

            return
        , @progressDelay
        
        return