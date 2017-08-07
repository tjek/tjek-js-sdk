MicroEvent = require 'microevent'
SGN = require '../../sgn'
keyCodes = require '../../key-codes'

class PagedPublicationControls
    constructor: (el, @options = {}) ->
        @els =
            root: el
            progress: el.querySelector '.sgn-pp__progress'
            progressBar: el.querySelector '.sgn-pp-progress__bar'
            progressLabel: el.querySelector '.sgn-pp__progress-label'
            prevControl: el.querySelector '.sgn-pp__control[data-direction=prev]'
            nextControl: el.querySelector '.sgn-pp__control[data-direction=next]'

        @keyDownListener = SGN.util.throttle @keyDown, 150, @
        @mouseMoveListener = SGN.util.throttle @mouseMove, 50, @

        @els.root.addEventListener 'keydown', @keyDownListener, false if @options.keyboard is true
        @els.root.addEventListener 'mousemove', @mouseMoveListener, false
        @els.prevControl.addEventListener 'click', @prevClicked.bind(@), false if @els.prevControl?
        @els.nextControl.addEventListener 'click', @nextClicked.bind(@), false if @els.nextControl?

        @bind 'beforeNavigation', @beforeNavigation.bind(@)

        return

    destroy: ->
        @els.root.removeEventListener 'keydown', @keyDownListener
        @els.root.removeEventListener 'mousemove', @mouseMoveListener

        return

    beforeNavigation: (e) ->
        showProgress = typeof e.progressLabel is 'string' and e.progressLabel.length > 0
        visibilityClassName = 'sgn-pp--hidden'

        if @els.progress? and @els.progressBar?
            @els.progressBar.style.width = "#{e.progress}%"
            
            if showProgress is true
                @els.progress.classList.remove visibilityClassName
            else
                @els.progress.classList.add visibilityClassName

        if @els.progressLabel?
            if showProgress is true
                @els.progressLabel.textContent = e.progressLabel
                @els.progressLabel.classList.remove visibilityClassName
            else
                @els.progressLabel.classList.add visibilityClassName

        if @els.prevControl?
            if e.verso.newPosition is 0
                @els.prevControl.classList.add visibilityClassName
            else
                @els.prevControl.classList.remove visibilityClassName

        if @els.nextControl?
            if e.verso.newPosition is e.pageSpreadCount - 1
                @els.nextControl.classList.add visibilityClassName
            else
                @els.nextControl.classList.remove visibilityClassName

        return

    prevClicked: (e) ->
        e.preventDefault()

        @trigger 'prev'

        return

    nextClicked: (e) ->
        e.preventDefault()

        @trigger 'next'

        return

    keyDown: (e) ->
        keyCode = e.keyCode

        if keyCodes.ARROW_LEFT is keyCode
            @trigger 'prev', duration: 0
        else if keyCodes.ARROW_RIGHT is keyCode or keyCodes.SPACE is keyCode
            @trigger 'next', duration: 0
        else if keyCodes.NUMBER_ONE is keyCode
            @trigger 'first', duration: 0

        return

    mouseMove: ->
        @els.root.dataset.mouseMoving = true

        clearTimeout @mouseMoveTimeout

        @mouseMoveTimeout = setTimeout =>
            @els.root.dataset.mouseMoving = false

            return
        , 4000

        return

MicroEvent.mixin PagedPublicationControls

module.exports = PagedPublicationControls
