import Config from './config';
import {
    IncitoPublication,
    ListPublications,
    PagedPublication
} from './kits/core-ui';
import request from './kits/core/request';
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
import {error, isBrowser} from './util';

export const config = new Config();
config.bind('change', (changedAttributes) => {
    const newEventTracker: Tracker | undefined = changedAttributes.eventTracker;
    const newApiKey: string | undefined = changedAttributes.apiKey;
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
        config
            .get<Tracker>('eventTracker')
            .setEventsTrackUrl(newEventsTrackUrl);
    }
});

if (isBrowser()) {
    // Autoconfigure the SDK.
    const scriptEl = document.currentScript;

    if (scriptEl instanceof HTMLScriptElement) {
        const apiKey = scriptEl.dataset.apiKey || scriptEl.dataset.appKey;
        const trackId = scriptEl.dataset.trackId;
        const component = scriptEl.dataset.component;
        const scriptConfig: {
            apiKey?: string;
            eventTracker?: Tracker;
        } = {};

        if (apiKey) scriptConfig.apiKey = apiKey;

        if (trackId) scriptConfig.eventTracker = new Tracker({trackId});

        config.set(scriptConfig);

        if (component === 'paged-publication-viewer') {
            PagedPublication(scriptEl, config.shadow()).render();
        }

        if (component === 'incito-publication-viewer') {
            IncitoPublication(scriptEl, config.shadow()).render();
        }

        if (component === 'list-publications') {
            ListPublications(scriptEl, config.shadow()).render();
        }
    }
}

export * as CoreUIKit from './kits/core-ui';
export * as EventsKit from './kits/events';
export * as translations from './translations';
export * as util from './util';
export const storage = {local: clientLocal};
export const CoreKit = {
    request: (
        options: Parameters<typeof request>[0],
        callback: Parameters<typeof request>[1]
    ) => request(config.shadow(options), callback)
};
export const PagedPublicationKit = {
    Bootstrapper: function (
        options: ConstructorParameters<typeof PagedBootstrapper>[0]
    ) {
        return new PagedBootstrapper(config.shadow(options));
    },
    Viewer: PagedViewer
};
export const IncitoPublicationKit = {
    Bootstrapper: function (
        options: ConstructorParameters<typeof IncitoBootstrapper>[0]
    ) {
        return new IncitoBootstrapper(config.shadow(options));
    },
    Viewer: IncitoViewer
};
