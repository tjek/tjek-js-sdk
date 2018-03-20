import * as util from './util'

import { config } from './core'
import client from './client'
import clientLocalStorage from './storage/client-local'
import clientSessionStorage from './storage/client-session'
import * as clientCookieStorage from './storage/client-cookie'

import request from './request'

import * as AssetsKit from './kits/assets'
import * as EventsKit from './kits/events'
import * as GraphKit from './kits/graph'
import * as CoreKit from './kits/core'
import * as PagedPublicationKit from './kits/paged-publication'
import * as IncitoPublicationKit from './kits/incito-publication'
import * as CoreUIKit from './kits/core-ui'



SGN =
    config: config
    util: util

# Expose storage backends.
SGN.storage =
    local: clientLocalStorage
    session: clientSessionStorage
    cookie: clientCookieStorage

# Expose request handler.
SGN.request = request

# Expose the different kits.
SGN.AssetsKit = AssetsKit
SGN.EventsKit = EventsKit
SGN.GraphKit = GraphKit
SGN.CoreKit = CoreKit
SGN.PagedPublicationKit = PagedPublicationKit
SGN.IncitoPublicationKit = IncitoPublicationKit
SGN.CoreUIKit = CoreUIKit

# Set the core session from the cookie store if possible.
session = SGN.storage.cookie.get 'session'

if typeof session is 'object'
    SGN.config.set
        coreSessionToken: session.token
        coreSessionClientId: session.client_id

SGN.client = client

# Listen for changes in the config.
SGN.config.bind 'change', (changedAttributes) ->
    eventTracker = changedAttributes.eventTracker

    if eventTracker?
        eventTracker.trackEvent 'first-client-session-opened', {}, '1.0.0' if SGN.client.firstOpen is true
        eventTracker.trackEvent 'client-session-opened', {}, '1.0.0'

    return

if util.isBrowser()
    # Autoconfigure the SDK.
    scriptEl = document.getElementById 'sgn-sdk'
    console.log(SGN)
    if scriptEl?
        appKey = scriptEl.getAttribute 'data-app-key'
        trackId = scriptEl.getAttribute 'data-track-id'
        autoConfig = {}

        autoConfig.appKey = appKey if appKey?
        autoConfig.eventTracker = new SGN.EventsKit.Tracker(trackId: trackId) if trackId?

        SGN.config.set autoConfig

export default SGN
