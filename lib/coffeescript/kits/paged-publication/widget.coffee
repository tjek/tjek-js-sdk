Mustache = require 'mustache'
Main = require './main'
Tracker = require '../events/tracker'
template = require './templates/widget'

module.exports = class PagedPublicationWidget
    constructor: (@el) ->
        trackId = @el.getAttribute 'data-track-id'
        publicationId = @el.getAttribute 'data-id'
        progressBar = @el.getAttribute 'data-progress-bar'
        progressLabel = @el.getAttribute 'data-progress-label'
        controls = @el.getAttribute 'data-controls'
        eventTracker = new Tracker trackId: trackId

        @el.innerHTML = Mustache.render template,
            showProgressBar: progressBar is 'true'
            showProgressLabel: progressLabel is 'true'
            showControls: controls is 'true'

        pagedPublication = new Main @el.querySelector('.sgn__pp'),
            id: publicationId
            eventTracker: eventTracker

        pagedPublication.load (err) ->
            if err?
                return

            pagedPublication.render()
            pagedPublication.viewer.start()

            return

        return
