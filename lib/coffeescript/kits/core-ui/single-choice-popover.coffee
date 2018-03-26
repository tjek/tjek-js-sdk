Popover = require './popover'

module.exports = (ctx, callback) ->
    items = ctx.items
    popover = null

    if items.length is 1
        callback items[0]
    else if items.length > 1
        popover = new Popover
            header: ctx.header,
            x: ctx.x
            y: ctx.y
            singleChoiceItems: items

        popover.bind 'selected', (e) ->
            callback items[e.index]

            popover.destroy()

            return

        popover.bind 'destroyed', ->
            ctx.el.focus()

            return

        ctx.el.appendChild popover.el
        popover.render().el.focus()

    destroy: ->
        popover.destroy() if popover?

        return