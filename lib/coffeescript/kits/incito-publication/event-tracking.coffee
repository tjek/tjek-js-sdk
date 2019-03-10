import MicroEvent from 'microevent'

class IncitoPublicationEventTracking
    constructor: (@eventTracker, @id, {
        @pagedPublicationId
    }) ->
        return

    trackOpened: (properties) ->
        return @ if not @eventTracker?

        @eventTracker.trackIncitoPublicationOpened
            'ip.id': @id
            'pp.vt': @eventTracker.createViewToken(@pagedPublicationId) if @pagedPublicationId
            'vt': @eventTracker.createViewToken(@id)

        @

MicroEvent.mixin IncitoPublicationEventTracking

export default IncitoPublicationEventTracking
