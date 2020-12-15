const {error, isBrowser} = require('./util');

const SGN = require('./core');

// Expose storage backends.
SGN.storage = {
    local: require('./storage/client-local'),
    session: require('./storage/client-session'),
    cookie: require('./storage/client-cookie')
};

// Expose the different kits.
SGN.EventsKit = require('./kits/events');
SGN.CoreKit = require('./kits/core');
SGN.PagedPublicationKit = require('./kits/paged-publication');
SGN.IncitoPublicationKit = require('./kits/incito-publication');
SGN.CoreUIKit = require('./kits/core-ui');

// Set the core session from the cookie store if possible.
const session = SGN.storage.cookie.get('session');

if (typeof session === 'object') {
    SGN.config.set({
        coreSessionToken: session.token,
        coreSessionClientId: session.client_id
    });
}

SGN.config.bind('change', (changedAttributes) => {
    let eventTracker = changedAttributes.eventTracker;
    if (eventTracker) {
        const appKey = SGN.config.get('appKey');

        if (appKey && eventTracker.trackId && eventTracker.trackId === appKey) {
            throw error(
                new Error(
                    'Track identifier must not be identical to app key. Go to https://business.shopgun.com/developers/apps to get a track identifier for your app'
                )
            );
        }
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

module.exports = SGN;
