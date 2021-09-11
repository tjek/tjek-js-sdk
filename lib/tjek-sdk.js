import Config from './config';
import * as CoreKit from './kits/core';
import * as CoreUIKit from './kits/core-ui';
import * as EventsKit from './kits/events';
import * as IncitoPublicationKit from './kits/incito-publication';
import * as PagedPublicationKit from './kits/paged-publication';
import * as clientLocal from './storage/client-local';
import './stylus/tjek.styl';
import * as translations from './translations';
import * as util from './util';
import {error, isBrowser} from './util';

const config = new Config();

const Tjek = {config, util, translations};

// Expose storage backends.
Tjek.storage = {
    local: clientLocal
};

// Expose the different kits.
Tjek.EventsKit = EventsKit;
Tjek.CoreKit = CoreKit;
Tjek.PagedPublicationKit = PagedPublicationKit;
Tjek.IncitoPublicationKit = IncitoPublicationKit;
Tjek.CoreUIKit = CoreUIKit;

Tjek.config.bind('change', (changedAttributes) => {
    const newEventTracker = changedAttributes.eventTracker;
    const newApiKey = changedAttributes.apiKey;
    if (
        (newApiKey || newEventTracker) &&
        (newEventTracker || Tjek.config.get('eventTracker'))?.trackId ===
            (newApiKey || Tjek.config.get('apiKey'))
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
            newEventTracker.setEventsTrackUrl(Tjek.config.get('eventsTrackUrl'));
        }
    }

    const newEventsTrackUrl = changedAttributes.eventsTrackUrl;
    
    if (newEventsTrackUrl && Tjek.config.get('eventTracker')) {
        Tjek.config.get('eventTracker').setEventsTrackUrl(newEventsTrackUrl);
    }
});

if (isBrowser()) {
    // Autoconfigure the SDK.
    const scriptEl = document.getElementById('tjek-sdk');

    if (scriptEl) {
        const apiKey =
            scriptEl.getAttribute('data-api-key') ||
            scriptEl.getAttribute('data-app-key');
        const trackId = scriptEl.getAttribute('data-track-id');
        const config = {};

        if (apiKey) {
            config.apiKey = apiKey;
        }
        if (trackId) {
            config.eventTracker = new Tjek.EventsKit.Tracker({trackId});
        }

        Tjek.config.set(config);
    }
}

export default Tjek;
