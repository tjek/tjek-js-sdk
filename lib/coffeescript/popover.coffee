MicroEvent = require 'microevent'
Gator = require 'gator'
Mustache = require 'mustache'
keyCodes = require './key-codes'

template = """
<div class="sgn-popover__background" data-close></div>
<div class="sgn-popover__menu">
    {{#header}}
        <div class="sgn-popover__header">{{header}}</div>
    {{/header}}
    <div class="sgn-popover__content">
        <ul>
            {{#singleChoiceItems}}
                <li data-index="{{index}}">
                    <p class="sgn-popover-item__title">{{item.title}}</p>
                    {{#item.subtitle}}
                        <p class="sgn-popover-item__subtitle">{{item.subtitle}}</p>
                    {{/item.subtitle}}
                </li>
            {{/singleChoiceItems}}
        </ul>
    </div>
</div>
"""

class Popover
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
            singleChoiceItems: @options.singleChoiceItems.map (item, i) ->
                item: item
                index: i
            top: @options.y
            left: @options.x

        @el.className = 'sgn-popover'
        @el.setAttribute 'tabindex', -1
        @el.innerHTML = Mustache.render template, view

        menuEl = @el.querySelector '.sgn-popover__menu'
        width = menuEl.offsetWidth
        height = menuEl.offsetHeight
        parentWidth = @el.parentNode.offsetWidth
        parentHeight = @el.parentNode.offsetHeight
        boundingRect = @el.parentNode.getBoundingClientRect()

        view.top -= boundingRect.top
        view.left -= boundingRect.left

        if view.top + height > parentHeight
            menuEl.style.top = parentHeight - height + 'px'
        else
            menuEl.style.top = view.top + 'px'

        if view.left + width > parentWidth
            menuEl.style.left = parentWidth - width + 'px'
        else
            menuEl.style.left = view.left + 'px'

        @el.addEventListener 'keyup', @keyUp.bind(@)

        Gator(@el).on 'click', '[data-index]', (e) ->
            trigger 'selected', index: +@getAttribute 'data-index'

            return

        Gator(@el).on 'click', '[data-close]', @destroy.bind(@)

        window.addEventListener 'resize', @resizeListener, false

        @

    destroy: ->
        if @el.parentNode?
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

MicroEvent.mixin Popover

module.exports = Popover
