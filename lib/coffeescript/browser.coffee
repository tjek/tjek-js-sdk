SGN = require './sgn'

# Expose storage backends.
SGN.storage =
    local: require './storage/client-local'
    cookie: require './storage/client-cookie'

# Expose request handler.
SGN.request = require './request/browser'

# Expose the different kits.
SGN.AuthKit = require './kits/auth'
SGN.AssetsKit = require './kits/assets'
SGN.EventsKit = require './kits/events'
SGN.GraphKit = require './kits/graph'
SGN.CoreKit = require './kits/core'
SGN.PagedPublicationKit = require './kits/paged-publication'
SGN.ShoppingListKit = require './kits/shopping-list'

# Set the core session from the cookie store if possible.
session = SGN.storage.cookie.get 'session'

if typeof session is 'object'
    SGN.config.set
        coreSessionToken: 'lol' #session.token
        coreSessionClientId: session.client_id

SGN.client = do ->
    id = SGN.storage.local.get 'client-id'
    id = id?.data
    firstOpen = not id?

    if firstOpen
        id = SGN.util.uuid()
        
        SGN.storage.local.set 'client-id', id

    firstOpen: firstOpen
    id: id

# Listen for changes in the config.
SGN.config.bind 'change', (changedAttributes) ->
    eventTracker = changedAttributes.eventTracker

    if eventTracker?
        eventTracker.trackEvent 'first-client-session-opened', {}, '1.0.0' if SGN.client.firstOpen is true
        eventTracker.trackEvent 'client-session-opened', {}, '1.0.0'

    return

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
