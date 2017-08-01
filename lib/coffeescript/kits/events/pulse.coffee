MicroEvent = require 'microevent'

class Pulse
    constructor: ->
        @destroyed = false
        @connection = @connect()

        return

    destroy: ->
        @destroyed = true

        @connection.close()

        @

    connect: ->
        connection = new WebSocket SGN.config.get('eventsPulseUrl'), 'json'

        connection.onopen = @onOpen.bind @
        connection.onmessage = @onMessage.bind @
        connection.onerror = @onError.bind @
        connection.onclose = @onClose.bind @

        connection

    onOpen: ->
        @trigger 'open'

        return

    onMessage: (e) ->
        @trigger 'event', e.data

        return

    onError: ->
        return

    onClose: ->
        if @destroyed is false
            setTimeout =>
                @connection = @connect()

                return
            , 2000

        return

MicroEvent.mixin Pulse

module.exports = Pulse
