Mustache = require 'mustache'
SGN = require '../../core'
template = require './templates/widget'

module.exports = class PagedPublicationWidget
    constructor: (@el) ->
        publicationId = @el.getAttribute 'data-id'
        hotspots = @el.getAttribute 'data-hotspots'
        progressBar = @el.getAttribute 'data-progress-bar'
        progressLabel = @el.getAttribute 'data-progress-label'
        controls = @el.getAttribute 'data-controls'

        @el.innerHTML = Mustache.render template,
            showProgressBar: progressBar is 'true'
            showProgressLabel: progressLabel is 'true'
            showControls: controls is 'true'

        SGN.PagedPublicationKit.initialize
            el: @el.querySelector '.sgn__pp'
            id: publicationId
            eventTracker: SGN.config.get 'eventTracker'
            showHotspots: hotspots is 'true'
        , (err, viewer) ->
            viewer.start() if not err?

            return

        return
