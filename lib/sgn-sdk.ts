import Config from './config';
import * as CoreUIKit from './kits/core-ui';
import request from './kits/core/request';
import * as EventsKit from './kits/events';
import Tracker from './kits/events/tracker';
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

const SGN = {
    config,
    util,
    translations,

    // Expose storage backends.
    storage: {local: clientLocal},

    // Expose the different kits.
    EventsKit,
    CoreKit: {
        request: (
            options: Parameters<typeof request>[0],
            callback: Parameters<typeof request>[1]
        ) => request(config.shadow(options), callback)
    },
    PagedPublicationKit: {
        Bootstrapper: function (
            options: ConstructorParameters<typeof PagedBootstrapper>[0]
        ) {
            return new PagedBootstrapper(config.shadow(options));
        },
        Viewer: PagedViewer
    },
    IncitoPublicationKit: {
        Bootstrapper: function (
            options: ConstructorParameters<typeof IncitoBootstrapper>[0]
        ) {
            return new IncitoBootstrapper(config.shadow(options));
        },
        Viewer: IncitoViewer
    },
    CoreUIKit
};

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

    // default eventsTrackUrl
    if (newEventTracker && !newEventTracker.eventsTrackUrl) {
        newEventTracker.setEventsTrackUrl(config.get('eventsTrackUrl'));
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
        const apiKey = scriptEl.dataset.apiKey || scriptEl.dataset.appKey;
        const trackId = scriptEl.dataset.trackId;
        const component = scriptEl.dataset.component;
        const scriptConfig: {
            apiKey?: string;
            eventTracker?: Tracker;
        } = {};

        if (apiKey) scriptConfig.apiKey = apiKey;

        if (trackId)
            scriptConfig.eventTracker = new EventsKit.Tracker({trackId});

        config.set(scriptConfig);

        if (component === 'paged-publication-viewer') {
            CoreUIKit.PagedPublication(scriptEl, config.shadow()).render();
        }

        if (component === 'incito-publication-viewer') {
            CoreUIKit.IncitoPublication(scriptEl, {
                apiKey: config.get('apiKey'),
                coreUrl: config.get('coreUrl'),
                eventTracker: config.get('eventTracker')
            }).render();
        }

        if (component === 'list-publications') {
            CoreUIKit.ListPublications(scriptEl, config.shadow()).render();
        }
    }
}

export default SGN;
