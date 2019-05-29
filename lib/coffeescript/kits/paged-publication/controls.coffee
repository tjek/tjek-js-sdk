import MicroEvent from 'microevent'
import { throttle } from '../../util'
import * as keyCodes from '../../key-codes'

class PagedPublicationControls
    constructor: (el, @options = {}) ->
        @els =
            root: el
            progress: el.querySelector '.sgn-pp__progress'
            progressBar: el.querySelector '.sgn-pp-progress__bar'
            progressLabel: el.querySelector '.sgn-pp__progress-label'
            prevControl: el.querySelector '.sgn-pp__control[data-direction=prev]'
            nextControl: el.querySelector '.sgn-pp__control[data-direction=next]'
            close: el.querySelector '.sgn-pp--close'

        @keyDownHandler = throttle @keyDown, 150
        @els.root.addEventListener 'keydown', @keyDownHandler, false if @options.keyboard is true
        @els.prevControl.addEventListener 'mousedown', @prevClicked, false if @els.prevControl?
        @els.nextControl.addEventListener 'mousedown', @nextClicked, false if @els.nextControl?
        @els.close.addEventListener 'mousedown', @closeClicked, false if @els.close?

        @bind 'beforeNavigation', @beforeNavigation
        @bind 'destroyed', @destroy

        return

    destroy: =>
        @els.root.removeEventListener 'keydown', @keyDownHandler, false if @options.keyboard is true
        @els.prevControl.removeEventListener 'mousedown', @prevClicked, false if @els.prevControl?
        @els.nextControl.removeEventListener 'mousedown', @nextClicked, false if @els.nextControl?
        @els.close.removeEventListener 'mousedown', @closeClicked, false if @els.close?

        return

    beforeNavigation: (e) =>
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

    prevClicked: (e) =>
        e.preventDefault()

        @trigger 'prev'

        return

    nextClicked: (e) =>
        e.preventDefault()

        @trigger 'next'

        return
    
    closeClicked: (e) =>
        e.preventDefault()

        @trigger 'close'

        return

    keyDown: (e) =>
        keyCode = e.keyCode

        if keyCodes.ARROW_LEFT is keyCode
            @trigger 'prev', duration: 0
        else if keyCodes.ARROW_RIGHT is keyCode or keyCodes.SPACE is keyCode
            @trigger 'next', duration: 0
        else if keyCodes.NUMBER_ONE is keyCode
            @trigger 'first', duration: 0

        return

MicroEvent.mixin PagedPublicationControls

export default PagedPublicationControls
