MicroEvent = require 'microevent'

class IncitoPublicationEventTracking
    constructor: (@eventTracker, @details) ->
        return

    trackOpened: (properties) ->
        return @ if not @eventTracker? or not @details?

        @eventTracker.trackIncitoPublicationOpened
            'ip.paged': @details.types.indexOf('paged') > -1
            'ip.id': @details.id
            'vt': @eventTracker.createViewToken(@details.id)

        @

MicroEvent.mixin IncitoPublicationEventTracking

module.exports = IncitoPublicationEventTracking
