import Config from './config';
import * as CoreKit from './kits/core';
import * as CoreUIKit from './kits/core-ui';
import * as EventsKit from './kits/events';
import * as IncitoPublicationKit from './kits/incito-publication';
import * as PagedPublicationKit from './kits/paged-publication';
import * as clientLocal from './storage/client-local';
import './stylus/sgn.styl';
import * as translations from './translations';
import * as util from './util';
import {error, isBrowser} from './util';

const config = new Config();

const SGN = {config, util, translations};

// Expose storage backends.
SGN.storage = {
    local: clientLocal
};

// Expose the different kits.
SGN.EventsKit = EventsKit;
SGN.CoreKit = CoreKit;
SGN.PagedPublicationKit = PagedPublicationKit;
SGN.IncitoPublicationKit = IncitoPublicationKit;
SGN.CoreUIKit = CoreUIKit;

SGN.config.bind('change', (changedAttributes) => {
    const newEventTracker = changedAttributes.eventTracker;
    const newApiKey = changedAttributes.apiKey;
    if (
        (newApiKey || newEventTracker) &&
        (newEventTracker || SGN.config.get('eventTracker'))?.trackId ===
            (newApiKey || SGN.config.get('apiKey'))
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
        const apiKey =
            scriptEl.getAttribute('data-api-key') ||
            scriptEl.getAttribute('data-app-key');
        const trackId = scriptEl.getAttribute('data-track-id');
        const pubController = scriptEl.getAttribute('data-controller');
        const dealerId = scriptEl.getAttribute('data-dealer-id');
        const catalogId = scriptEl.getAttribute('data-catalog-id');
        const config = {};

        if (apiKey) {
            config.apiKey = apiKey;
        }
        if (trackId) {
            config.eventTracker = new SGN.EventsKit.Tracker({trackId});
        }
        if (pubController) {
            config.pubController = pubController;
        }
        if (dealerId) {
            config.dealerId = dealerId;
        }
        if (catalogId) {
            config.catalogId = catalogId;
        }

        SGN.config.set(config);

        if (pubController === 'view-publication') {
            const pageNum = SGN.util.getQueryParam('page') || 1;
            const options = {
                el: document.querySelector('.sgn__pp'),
                eventTracker: SGN.config.get('eventTracker'),
                pageId: `page${pageNum}`,
                id: catalogId ? catalogId : '',
                dealerId
            };
            const templateBuilder = new SGN.PagedPublicationKit.TemplateBuilder(
                options
            );

            templateBuilder.start();
        }
    }
}

export default SGN;
