import Config from './config';
import * as CoreUIKit from './kits/core-ui';
import request from './kits/core/request';
import * as EventsKit from './kits/events';
import {
    Bootstrapper as IncitoBootstrapper,
    Viewer as IncitoViewer
} from './kits/incito-publication';
import {
    Bootstrapper as PagedBootstrapper,
    Viewer as PagedViewer
} from './kits/paged-publication';
import * as clientLocal from './storage/client-local';
import './stylus/sgn.styl';
import * as translations from './translations';
import * as util from './util';
import {error, isBrowser} from './util';

const config = new Config();

const SGN = {config, util, translations};

// Expose storage backends.
SGN.storage = {local: clientLocal};

// Expose the different kits.
SGN.EventsKit = EventsKit;
SGN.CoreKit = {
    request: (options, callback) =>
        request(
            {
                coreUrl: config.get('coreUrl'),
                apiKey: config.get('apiKey'),
                ...options
            },
            callback
        )
};
SGN.PagedPublicationKit = {
    Bootstrapper: (options) =>
        new PagedBootstrapper({
            coreUrl: config.get('coreUrl'),
            apiKey: config.get('apiKey'),
            ...options
        }),
    Viewer: PagedViewer
};
SGN.IncitoPublicationKit = {
    Bootstrapper: (options) =>
        new IncitoBootstrapper({
            coreUrl: config.get('coreUrl'),
            apiKey: config.get('apiKey'),
            ...options
        }),
    Viewer: IncitoViewer
};
SGN.CoreUIKit = CoreUIKit;

config.bind('change', (changedAttributes) => {
    const newEventTracker = changedAttributes.eventTracker;
    const newApiKey = changedAttributes.apiKey;
    if (
        (newApiKey || newEventTracker) &&
        (newEventTracker || config.get('eventTracker'))?.trackId ===
            (newApiKey || config.get('apiKey'))
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
            newEventTracker.setEventsTrackUrl(config.get('eventsTrackUrl'));
        }
    }

    const newEventsTrackUrl = changedAttributes.eventsTrackUrl;
    if (newEventsTrackUrl && config.get('eventTracker')) {
        config.get('eventTracker').setEventsTrackUrl(newEventsTrackUrl);
    }
});

if (isBrowser()) {
    // Autoconfigure the SDK.
    const scriptEl = document.getElementById('sgn-sdk');

    if (scriptEl) {
        const apiKey =
            scriptEl.getAttribute('data-api-key') ||
            scriptEl.getAttribute('data-app-key');
        const trackId = scriptEl.getAttribute('data-track-id');
        const component = scriptEl.getAttribute('data-component');
        const scriptConfig = {};

        if (apiKey) scriptConfig.apiKey = apiKey;

        if (trackId)
            scriptConfig.eventTracker = new EventsKit.Tracker({trackId});

        config.set(scriptConfig);

        if (component === 'paged-publication-viewer') {
            CoreUIKit.PagedPublication(scriptEl, {
                apiKey: config.get('apiKey'),
                coreUrl: config.get('coreUrl'),
                eventTracker: config.get('eventTracker')
            }).render();
        }

        if (component === 'list-publications') {
            CoreUIKit.ListPublications(scriptEl, {
                apiKey: config.get('apiKey'),
                coreUrl: config.get('coreUrl'),
                eventTracker: config.get('eventTracker')
            }).render();
        }
    }
}

export default SGN;
