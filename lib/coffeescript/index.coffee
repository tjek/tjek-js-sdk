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
    newEventTracker = changedAttributes.eventTracker

    newAppKey = changedAttributes.appKey
    if (newAppKey or newEventTracker) and
    (newEventTracker or SGN.config.get('eventTracker'))?.trackId is (newAppKey or SGN.config.get('appKey'))
        
        # coffeelint: disable=max_line_length
        throw error(new Error('Track identifier must not be identical to app key. Go to https://business.shopgun.com/developers/apps to get a track identifier for your app'))

    if newEventTracker?
        # default eventsTrackUrl
        if not newEventTracker.eventsTrackUrl
            newEventTracker.setEventsTrackUrl(SGN.config.get('eventsTrackUrl'))
        
        newEventTracker.trackClientSessionOpened()

    newEventsTrackUrl = changedAttributes.eventsTrackUrl
    if newEventsTrackUrl and SGN.config.get('eventTracker')
        SGN.config.get('eventTracker').setEventsTrackUrl(newEventsTrackUrl)


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
