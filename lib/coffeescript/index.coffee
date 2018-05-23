{isBrowser} = require './util'

SGN = require './core'

# Expose storage backends.
SGN.storage =
    local: require './storage/client-local'
    session: require './storage/client-session'
    cookie: require './storage/client-cookie'

# Expose request handler.
SGN.request = require './request'

# Expose the different kits.
SGN.AssetsKit = require './kits/assets'
SGN.EventsKit = require './kits/events'
SGN.GraphKit = require './kits/graph'
SGN.CoreKit = require './kits/core'
SGN.PagedPublicationKit = require './kits/paged-publication'
SGN.IncitoPublicationKit = require './kits/incito-publication'
SGN.CoreUIKit = require './kits/core-ui'

# Set the core session from the cookie store if possible.
session = SGN.storage.cookie.get 'session'

if typeof session is 'object'
    SGN.config.set
        coreSessionToken: session.token
        coreSessionClientId: session.client_id

SGN.client = do ->
    id = SGN.storage.local.get 'client-id'
    id = id.data if id?.data

    if not id?
        id = SGN.util.uuid()
        
        SGN.storage.local.set 'client-id', id

    id: id

# Listen for changes in the config.
SGN.config.bind 'change', (changedAttributes) ->
    eventTracker = changedAttributes.eventTracker

    if eventTracker?
        eventTracker.trackClientSessionOpened()

    return

if isBrowser()
    # Autoconfigure the SDK.
    scriptEl = document.getElementById 'sgn-sdk'

    if scriptEl?
        appKey = scriptEl.getAttribute 'data-app-key'
        trackId = scriptEl.getAttribute 'data-track-id'
        config = {}

        config.appKey = appKey if appKey?
        config.eventTracker = new SGN.EventsKit.Tracker(trackId: trackId) if trackId?

        SGN.config.set config

module.exports = SGN
