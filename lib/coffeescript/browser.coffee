# Make sure we define we're in a browser environment.
process = browser: true if typeof process is 'undefined'

SGN = require './sgn'

# Expose storage backends.
SGN.storage =
    local: require './storage/client_local'
    cookie: require './storage/client_cookie'

# Expose request handler.
SGN.request = require './request/browser'

# Expose the different kits.
SGN.AuthKit = require './kits/auth'
SGN.AssetsKit = require './kits/assets'
SGN.EventsKit = require './kits/events'
SGN.GraphKit = require './kits/graph'
SGN.CoreKit = require './kits/core'
SGN.PagedPublicationKit = require './kits/paged_publication'

# Set the core session from the cookie store if possible.
session = SGN.storage.cookie.get 'session'

if typeof session is 'object'
    SGN.config.set
        coreSessionToken: session.token
        coreSessionClientId: session.client_id

SGN.client = do ->
    id = SGN.storage.local.get 'client-id'
    firstOpen = not id?

    if firstOpen
        id = SGN.util.uuid()
        
        SGN.storage.local.set 'client-id', id

    firstOpen: firstOpen
    id: id

# Optional start function to invoke session tracking.
SGN.startSession = ->
    # Emit session events if a tracker is available.
    eventTracker = SGN.config.get 'eventTracker'

    if eventTracker?
        eventTracker.trackEvent 'first-client-session-opened', {}, '1.0.0' if SGN.client.firstOpen is true
        eventTracker.trackEvent 'client-session-opened', {}, '1.0.0'

    return

module.exports = SGN
