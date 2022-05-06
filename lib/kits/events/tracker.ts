import fetch from 'cross-fetch';
import md5 from 'md5';
import {eventsTrackUrl as defaultEventsTrackUrl} from '../../config-defaults';
import * as clientLocalStorage from '../../storage/client-local';
import {error, isBrowser, throttle} from '../../util';

const uuid = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;

        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });

const btoa = (str) =>
    isBrowser()
        ? window.btoa(str)
        : Buffer.from(str.toString(), 'binary').toString('base64');

const createTrackerClient = () => {
    let id = clientLocalStorage.get('client-id');
    if (id?.data) id = id.data;

    if (!id) id = uuid();

    clientLocalStorage.set('client-id', id);

    return {id};
};
type TrackerClient = {id: string};
function getPool() {
    const data = clientLocalStorage.get('event-tracker-pool');

    return Array.isArray(data)
        ? data.filter(({_i}) => typeof _i === 'string')
        : [];
}

const unloadHandler = () => {
    clientLocalStorage.set('event-tracker-pool', pool.concat(getPool()));
};

let pool;
class Tracker {
    hasMadeInitialDispatch = false;
    location = {geohash: null, time: null, country: null};
    trackId = null;
    poolLimit = 1000;
    client: TrackerClient;
    eventsTrackUrl: string;
    constructor(options) {
        if (!pool) {
            pool = getPool();

            clientLocalStorage.set('event-tracker-pool', []);
            if (typeof window !== 'undefined') {
                window.addEventListener('beforeunload', unloadHandler, false);
            }
        }
        this.trackId = options?.trackId || this.trackId;
        this.poolLimit = options?.poolLimit || this.poolLimit;

        this.client = options?.client || createTrackerClient();
        this.eventsTrackUrl = options?.eventsTrackUrl || defaultEventsTrackUrl;

        if (this.eventsTrackUrl) {
            dispatch(this.eventsTrackUrl);
            this.hasMadeInitialDispatch = true;
        }
    }
    setEventsTrackUrl(eventsTrackUrl: string) {
        this.eventsTrackUrl = eventsTrackUrl;
        if (!this.hasMadeInitialDispatch) {
            dispatch(this.eventsTrackUrl);
            this.hasMadeInitialDispatch = true;
        }
    }
    trackEvent(
        type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
        properties: Record<string, string | number>,
        version = 2
    ) {
        if (typeof type !== 'number')
            throw error(new Error('Event type is required'));

        if (!this.trackId) return;

        const evt = Object.assign({}, properties, {
            _e: type,
            _v: version,
            _i: uuid(),
            _t: Math.round(new Date().getTime() / 1000),
            _a: this.trackId
        });

        if (this.location.geohash) evt['l.h'] = this.location.geohash;

        if (this.location.time) evt['l.ht'] = this.location.time;

        if (this.location.country) evt['l.c'] = this.location.country;

        pool.push(evt);
        while (pool.length > this.poolLimit) pool.shift();

        dispatch(this.eventsTrackUrl);

        return this;
    }

    setLocation(location) {
        for (const key in location) this.location[key] = location[key];

        return this;
    }

    trackPagedPublicationOpened(properties, version?: number) {
        return this.trackEvent(1, properties, version);
    }

    trackPagedPublicationPageDisappeared(properties, version?: number) {
        return this.trackEvent(2, properties, version);
    }

    trackOfferOpened(properties, version?: number) {
        return this.trackEvent(3, properties, version);
    }

    trackSearched(properties, version?: number) {
        return this.trackEvent(5, properties, version);
    }

    trackIncitoPublicationOpened(properties, version?: number) {
        return this.trackEvent(11, properties, version);
    }

    createViewToken(...parts) {
        return btoa(
            String.fromCharCode.apply(
                null,
                md5([this.client.id].concat(parts).join(''), {
                    asBytes: true
                }).slice(0, 8)
            )
        );
    }
}

export default Tracker;

let dispatching = false;
const dispatchLimit = 100;

let dispatchRetryInterval: NodeJS.Timeout | null | void = null;
const dispatch = throttle(async (eventsTrackUrl: string) => {
    if (!pool) {
        console.warn('Tracker: dispatch called with no active event pool.');
        return;
    }

    if (dispatching || !pool?.length) return;

    const events = pool.slice(0, dispatchLimit);
    let nacks = 0;
    dispatching = true;

    try {
        const response = await fetch(eventsTrackUrl, {
            method: 'post',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify({events})
        });
        const json = await response.json();

        if (dispatchRetryInterval) {
            dispatchRetryInterval = clearInterval(dispatchRetryInterval);
        }

        for (let i = 0; i < json.events.length; i++) {
            const {status, id} = json.events[i];

            if (status === 'validation_error' || status === 'ack') {
                pool = pool.filter(({_i}) => _i !== id);
            } else {
                nacks++;
            }
        }

        // Keep dispatching until the pool size reaches a sane level.
        if (pool.length >= dispatchLimit && !nacks) dispatch(eventsTrackUrl);
    } catch (err) {
        // Try dispatching again in 20 seconds, if we aren't already trying
        if (!dispatchRetryInterval) {
            console.warn(
                "We're gonna keep trying, but there was an error while dispatching events:",
                err
            );

            dispatchRetryInterval = setInterval(() => {
                dispatch(eventsTrackUrl);
            }, 20000);
        }
    } finally {
        dispatching = false;
    }
}, 4000);
