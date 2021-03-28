import Config from './config';
import * as CoreKit from './kits/core';
import * as CoreUIKit from './kits/core-ui';
import * as EventsKit from './kits/events';
import * as IncitoPublicationKit from './kits/incito-publication';
import * as PagedPublicationKit from './kits/paged-publication';
import * as clientCookie from './storage/client-cookie';
import * as clientLocal from './storage/client-local';
import * as clientSession from './storage/client-session';
import './stylus/sgn.styl';
import * as translations from './translations';
import * as util from './util';
import {error, isBrowser} from './util';

const config = new Config();

const SGN = {config, util, translations};

// Expose storage backends.
SGN.storage = {
    local: clientLocal,
    session: clientSession,
    cookie: clientCookie
};

// Expose the different kits.
SGN.EventsKit = EventsKit;
SGN.CoreKit = CoreKit;
SGN.PagedPublicationKit = PagedPublicationKit;
SGN.IncitoPublicationKit = IncitoPublicationKit;
SGN.CoreUIKit = CoreUIKit;

SGN.config.bind('change', (changedAttributes) => {
    const newEventTracker = changedAttributes.eventTracker;
    const newAppKey = changedAttributes.appKey;
    if (
        (newAppKey || newEventTracker) &&
        (newEventTracker || SGN.config.get('eventTracker'))?.trackId ===
            (newAppKey || SGN.config.get('appKey'))
    ) {
        throw error(
            new Error(
                'Track identifier must not be identical to app key. Go to https://etilbudsavis.dk/developers/apps to get a track identifier for your app'
            )
        );
    }

    if (newEventTracker != null) {
        // default eventsTrackUrl
        if (!newEventTracker.eventsTrackUrl) {
            newEventTracker.setEventsTrackUrl(SGN.config.get('eventsTrackUrl'));
        }
    }

    const newEventsTrackUrl = changedAttributes.eventsTrackUrl;
    if (newEventsTrackUrl && SGN.config.get('eventTracker')) {
        SGN.config.get('eventTracker').setEventsTrackUrl(newEventsTrackUrl);
    }
});

if (isBrowser()) {
    // Autoconfigure the SDK.
    const scriptEl = document.getElementById('sgn-sdk');

    if (scriptEl) {
        const appKey = scriptEl.getAttribute('data-app-key');
        const trackId = scriptEl.getAttribute('data-track-id');
        const config = {};

        if (appKey) {
            config.appKey = appKey;
        }
        if (trackId) {
            config.eventTracker = new SGN.EventsKit.Tracker({trackId});
        }

        SGN.config.set(config);
    }
}

export default SGN;
