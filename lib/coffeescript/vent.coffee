module.exports = class Vent
    constructor: ->
        @._events = {}

        return

    on: (event, fn) ->
        @._events[event] = @._events[event] or []

        @._events[event].push fn

        return

    off: (event, fn) ->
        fns = @._events[event] or []

        fns.splice fns.indexOf(fn), 1

        return

    trigger: (event, args...) ->
        @._events[event] = @._events[event] or []

        @._events[event].forEach (fn) =>
            fn.apply @, args

            return

        return
