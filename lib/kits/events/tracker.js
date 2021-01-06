import fetch from 'cross-fetch';
import md5 from 'md5';
import {eventsTrackUrl as defaultEventsTrackUrl} from '../../configDefaults';
import * as clientLocalStorage from '../../storage/client-local';
import {btoa, error, throttle, uuid} from '../../util';

const createTrackerClient = () => {
    let id = clientLocalStorage.get('client-id');
    if (id?.data) {
        id = id.data;
    }

    if (id == null) {
        id = uuid();

        clientLocalStorage.set('client-id', id);
    }

    return {id};
};

function getPool() {
    let data = clientLocalStorage.get('event-tracker-pool');
    if (Array.isArray(data) === false) {
        data = [];
    }
    data = data.filter((evt) => typeof evt._i === 'string');

    return data;
}

let pool = getPool();

class Tracker {
    constructor(options = {}) {
        for (let key in this.defaultOptions) {
            const value = this.defaultOptions[key];
            this[key] = options[key] || value;
        }

        this.client = options?.client || createTrackerClient();
        this.eventsTrackUrl = options?.eventsTrackUrl || defaultEventsTrackUrl;
        this.location = {
            geohash: null,
            time: null,
            country: null
        };
        this.dispatching = false;
        this.hasMadeInitialDispatch = false;

        if (this.eventsTrackUrl) {
            dispatch(this.eventsTrackUrl);
            this.hasMadeInitialDispatch = true;
        }
    }
    setEventsTrackUrl(eventsTrackUrl) {
        this.eventsTrackUrl = eventsTrackUrl;
        if (!this.hasMadeInitialDispatch) {
            dispatch(this.eventsTrackUrl);
            this.hasMadeInitialDispatch = true;
        }
    }
    trackEvent(type, properties = {}, version = 2) {
        if (typeof type !== 'number') {
            throw error(new Error('Event type is required'));
        }
        if (this.trackId == null) {
            return;
        }

        const evt = Object.assign({}, properties, {
            _e: type,
            _v: version,
            _i: uuid(),
            _t: Math.round(new Date().getTime() / 1000),
            _a: this.trackId
        });

        if (this.location.geohash) {
            evt['l.h'] = this.location.geohash;
        }
        if (this.location.time) {
            evt['l.ht'] = this.location.time;
        }
        if (this.location.country) {
            evt['l.c'] = this.location.country;
        }

        pool.push(evt);
        while (pool.length > this.poolLimit) {
            pool.shift();
        }

        dispatch(this.eventsTrackUrl);

        return this;
    }

    setLocation(location = {}) {
        for (let key in location) {
            const value = location[key];
            if (Object.prototype.hasOwnProperty.call(this.location, key)) {
                this.location[key] = value;
            }
        }

        return this;
    }

    trackPagedPublicationOpened(properties, version) {
        return this.trackEvent(1, properties, version);
    }

    trackPagedPublicationPageDisappeared(properties, version) {
        return this.trackEvent(2, properties, version);
    }

    trackOfferOpened(properties, version) {
        return this.trackEvent(3, properties, version);
    }

    trackSearched(properties, version) {
        return this.trackEvent(5, properties, version);
    }

    trackIncitoPublicationOpened(properties, version) {
        return this.trackEvent(11, properties, version);
    }

    createViewToken(...parts) {
        const str = [this.client.id].concat(parts).join('');
        const viewToken = btoa(
            String.fromCharCode.apply(
                null,
                md5(str, {asBytes: true}).slice(0, 8)
            )
        );

        return viewToken;
    }
}
Tracker.prototype.defaultOptions = {
    trackId: null,
    poolLimit: 1000
};
export default Tracker;

let dispatching = false;
const dispatchLimit = 100;

function ship(events = [], eventsTrackUrl) {
    return fetch(eventsTrackUrl, {
        method: 'post',
        timeout: 1000 * 20,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({events})
    }).then((response) => response.json());
}

let dispatchRetryInterval = null;
function _dispatch(eventsTrackUrl) {
    if (dispatching === true || pool.length === 0) {
        return;
    }

    const events = pool.slice(0, dispatchLimit);
    let nacks = 0;
    dispatching = true;

    ship(events, eventsTrackUrl)
        .then((response) => {
            dispatching = false;
            if (dispatchRetryInterval) {
                clearInterval(dispatchRetryInterval);
                dispatchRetryInterval = null;
            }

            response.events.forEach((resEvent) => {
                if (
                    resEvent.status === 'validation_error' ||
                    resEvent.status === 'ack'
                ) {
                    pool = pool.filter(
                        (poolEvent) => poolEvent._i !== resEvent.id
                    );
                } else {
                    nacks++;
                }
            });

            // Keep dispatching until the pool size reaches a sane level.
            if (pool.length >= dispatchLimit && nacks === 0) {
                dispatch(eventsTrackUrl);
            }
        })
        .catch((err) => {
            dispatching = false;
            // Try dispatching again in 20 seconds, if we aren't already trying
            if (!dispatchRetryInterval) {
                console.warn(
                    "We're gonna keep trying, but there was an error while dispatching events:",
                    err
                );

                dispatchRetryInterval = setInterval(
                    () => dispatch(eventsTrackUrl),
                    20000
                );
            }
        });
}
var dispatch = throttle(_dispatch, 4000);

clientLocalStorage.set('event-tracker-pool', []);

try {
    window.addEventListener(
        'beforeunload',
        () => {
            pool = pool.concat(getPool());

            clientLocalStorage.set('event-tracker-pool', pool);
        },
        false
    );
} catch (error) {}
