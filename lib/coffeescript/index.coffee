import { isBrowser, error } from './util'
import SGN from './core'
import * as storageClientLocal from './storage/client-local'
import * as storageClientSession from './storage/client-session'
import * as storageClientCookie from './storage/client-cookie'

import * as AssetsKit from './kits/assets'
import * as EventsKit from './kits/events'
import * as GraphKit from './kits/graph'
import * as CoreKit from './kits/core'
import * as PagedPublicationKit from './kits/paged-publication'
import * as IncitoPublicationKit from './kits/incito-publication'
import * as CoreUIKit from './kits/core-ui'

# Expose storage backends.
SGN.storage =
    local: storageClientLocal
    session: storageClientSession
    cookie: storageClientCookie

# Expose the different kits.
SGN.AssetsKit = AssetsKit
SGN.EventsKit = EventsKit
SGN.GraphKit = GraphKit
SGN.CoreKit = CoreKit
SGN.PagedPublicationKit = PagedPublicationKit
SGN.IncitoPublicationKit = IncitoPublicationKit
SGN.CoreUIKit = CoreUIKit

# Set the core session from the cookie store if possible.
session = storageClientCookie.get 'session'

if typeof session is 'object'
    SGN.config.set
        coreSessionToken: session.token
        coreSessionClientId: session.client_id


# Listen for changes in the config.
SGN.config.bind 'change', (changedAttributes) ->
    eventTracker = changedAttributes.eventTracker

    if eventTracker?
        appKey = SGN.config.get('appKey')

        if appKey and eventTracker.trackId and eventTracker.trackId == appKey
            # coffeelint: disable=max_line_length
            throw error(new Error('Track identifier must not be identical to app key. Go to https://business.shopgun.com/developers/apps to get a track identifier for your app'))

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
        config.eventTracker = new EventsKit.Tracker(trackId: trackId) if trackId?

        SGN.config.set config

export default SGN
