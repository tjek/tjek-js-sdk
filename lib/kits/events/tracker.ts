import md5 from 'md5';
import {eventsTrackUrl as defaultEventsTrackUrl} from '../../config-defaults';
import * as clientLocalStorage from '../../storage/client-local';
import {chunk, error, isBrowser} from '../../util';

let sendBeacon: typeof navigator.sendBeacon;
if (
    typeof navigator === 'object' &&
    typeof navigator.sendBeacon === 'function'
) {
    sendBeacon = navigator.sendBeacon.bind(navigator);
} else if (typeof XMLHttpRequest === 'function') {
    sendBeacon = (url: string, body: string) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, false);
        xhr.withCredentials = true;
        xhr.setRequestHeader('Accept', '*/*');
        xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');

        try {
            xhr.send(body);
            return true;
        } catch (error) {
            return false;
        }
    };
} else if (typeof fetch === 'function') {
    sendBeacon = (url: string, body: string) => {
        try {
            fetch(url, {
                method: 'POST',
                body,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'text/plain;charset=UTF-8'
                }
            });
            return true;
        } catch (error) {
            return false;
        }
    };
} else {
    sendBeacon = () => {
        console.warn(
            `[Tjek SDK] Events: Tracker tried to dispatch events, but this is an unsupported environment.
    
    Ensure that your environment has \`navigator.sendBeacon\`, \`XMLHttpRequest\` or \`fetch\` support to track events.`
        );
        return false;
    };
}

const uuid = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;

        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });

const btoa = (str: string) =>
    isBrowser()
        ? window.btoa(str)
        : Buffer.from(str.toString(), 'binary').toString('base64');

type TrackerClient = {id: string};
const createTrackerClient = (): TrackerClient => {
    let id = clientLocalStorage.get('client-id');
    if (id?.data) id = id.data;

    if (!id) id = uuid();

    clientLocalStorage.set('client-id', id);

    return {id};
};

export interface BaseEvent {
    // Event version
    _v: number;
    // Event type
    _e: keyof WolfEventTypeMap;
    // UUID
    _i: string;
    // Track ID
    _a: string;
    // UNIX timestamp
    _t: number;
    // Location geohash (4 digit precision)
    'l.h'?: string;
    // Location obtained at UNIX timestamp
    'l.ht'?: number;
    'l.c'?: string;
    // A map from a scenario (string) to a placement group (string)
    ab?: Record<string, string>;
}
interface PagedPublicationOpenedEvent {
    // ID of the Paged Publication
    'pp.id': string;
    // View token unique for this event data
    vt: string;
}
interface PagedPublicationPageOpenedEvent {
    // ID of the Paged Publication
    'pp.id': string;
    // Paged Publication Page Number
    'ppp.n': number;
    // View token unique for this event data
    vt: string;
}
interface OfferOpenedEvent {
    // ID of the offer
    'of.id': string;
    s?: string;
    a?: string;
    // View token unique for this event data
    vt: string;
}
interface ClientSessionOpenedEvent {}
interface SearchedEvent {
    // Search Query
    'sea.q': string;
    // Search Language
    'sea.l'?: string;
    // View token unique for this event data
    vt: string;
}
interface FirstOfferClickedAfterSearchEvent {
    // Search Query
    'sea.q': string;
    // Search Language
    'sea.l'?: string;
    // ID of the offer
    'of.id': string;
    // Preceding offer IDs
    'of.ids': string[];
}
interface AnyOfferClickedAfterSearchEvent {
    // Search Query
    'sea.q': string;
    // Search Language
    'sea.l'?: string;
    // ID of the offer
    'of.id': string;
}
interface IncitoPublicationOpenedEvent {
    // Offer ID
    'ip.id': string;
    // If an Incito publication has a corresponding paged publication, note the view token of the paged publication here.
    // This allows us to see if a person has read both the Incito and paged publication.
    'pp.vt'?: string;
    // View token unique for this event data
    vt: string;
}
interface ViewedSearchResultsThenLeftEvent {
    // Search Query
    'sea.q': string;
    // Search Language
    'sea.l'?: string;
    'sea.v': number;
}
interface PotentialLocalBusinessVisitEvent {
    // The horizontal accuracy of a device's geolocation in meters
    'l.hac': number;
    // ID of the store aka local business
    'lb.id': string;
    // Distance between things in meters
    'lb.dis': number;
    // ID of the business aka dealer
    'lb.bid': string;
    'b.cin': boolean;
    'b.cint': number;
    // View token unique for this event data
    vt: string;
}
interface IncitoPublicationOpenedV2Event {
    // ID of the Incito Publication
    'ip.id': string;
    // Set true if the publication is presentable as a paged publication as well, otherwise false
    'ip.paged': boolean;
    // View token unique for this event data
    vt: string;
}
interface AnalyticsV2Event {
    // Device model
    d?: string;
    // Operating system
    os?: string;
    // Operating system version
    osv?: string;
    // Application version
    _av: string;
    // Category
    c: string;
    // Action
    a: string;
    // Current screen name
    s?: string;
    // Previous screen name
    ps?: string;
    // Label
    l?: string;
    // Numeric value
    v?: number;
    // Flags/tags
    f?: string[];
    // View token unique for this event data
    vt: string;
}
interface IncitoPublicationSectionViewedEvent {
    // Time section entered screen
    _t: BaseEvent['_t'];
    //  Incito Publication ID
    'ip.id': string;
    //  Incito Publication Section ID
    'ips.id': string;
    //  Incito Publication Section Position
    'ips.p': number;
    //  Milliseconds On Screen
    mos: number;
    // View token unique for this event data
    vt: string;
}
interface WolfEventTypeMap {
    1: PagedPublicationOpenedEvent;
    2: PagedPublicationPageOpenedEvent;
    3: OfferOpenedEvent;
    4: ClientSessionOpenedEvent;
    5: SearchedEvent;
    6: FirstOfferClickedAfterSearchEvent;
    7: AnyOfferClickedAfterSearchEvent;
    8: IncitoPublicationOpenedEvent;
    9: ViewedSearchResultsThenLeftEvent;
    10: PotentialLocalBusinessVisitEvent;
    11: IncitoPublicationOpenedV2Event;
    12: AnalyticsV2Event;
    13: IncitoPublicationSectionViewedEvent;
}
export type WolfEvent = WolfEventTypeMap[keyof WolfEventTypeMap];

const locationSources = ['gps', 'geoip', 'manual', 'fallback'] as const;
interface TrackerLocation {
    geohash: string | null;
    source: typeof locationSources[number] | null;
    time: number | null;
    country: string | null;
}

class Tracker {
    hasMadeInitialDispatch = false;
    location: TrackerLocation = {
        geohash: null,
        time: null,
        country: null,
        source: null
    };
    trackId: string | null = null;
    poolLimit = 1000;
    pool: (BaseEvent & WolfEvent)[] = [];
    client: TrackerClient;
    eventsTrackUrl: string;

    handleVisibility = () => {
        if (document.visibilityState === 'hidden') this.dispatchBeacon();
    };
    handleBeforeUnload = () => {
        this.dispatchBeacon();
    };

    constructor(options?: {
        trackId?: string;
        poolLimit?: number;
        client?: TrackerClient;
        eventsTrackUrl?: string;
    }) {
        // Handle legacy event pools
        const localPool = clientLocalStorage.get('event-tracker-pool');
        if (Array.isArray(localPool)) {
            this.pool = localPool.filter(({_i}) => typeof _i === 'string');
            clientLocalStorage.remove('event-tracker-pool');
        }

        if (typeof window !== 'undefined') {
            window.addEventListener(
                'beforeunload',
                this.handleBeforeUnload,
                false
            );
        }

        this.trackId = options?.trackId || this.trackId;
        this.poolLimit = options?.poolLimit || this.poolLimit;

        this.client = options?.client || createTrackerClient();
        this.eventsTrackUrl = options?.eventsTrackUrl || defaultEventsTrackUrl;

        if (this.eventsTrackUrl) {
            this.dispatch();
            this.hasMadeInitialDispatch = true;
        }
    }
    setEventsTrackUrl(eventsTrackUrl: string) {
        this.eventsTrackUrl = eventsTrackUrl;
        if (!this.hasMadeInitialDispatch) {
            this.dispatch();
            this.hasMadeInitialDispatch = true;
        }
    }
    trackEvent<T extends keyof WolfEventTypeMap = keyof WolfEventTypeMap>(
        type: T,
        properties: WolfEventTypeMap[T],
        version = 2
    ) {
        if (typeof type !== 'number')
            throw error(new Error('Event type is required'));

        if (!this.trackId) return;

        const evt = {
            ...properties,
            _e: type,
            _v: version,
            _i: uuid(),
            _t:
                '_t' in properties
                    ? properties._t
                    : Math.round(new Date().getTime() / 1000),
            _a: this.trackId
        };

        if (this.location.geohash) evt['l.h'] = this.location.geohash;

        if (this.location.source) evt['l.hs'] = this.location.source;

        if (this.location.time) evt['l.ht'] = this.location.time;

        if (this.location.country) evt['l.c'] = this.location.country;

        this.pool.push(evt);
        while (this.pool.length > this.poolLimit) this.pool.shift();

        this.dispatch();

        return this;
    }

    setLocation(location: Partial<TrackerLocation>) {
        for (const key in location) {
            const value = location[key];
            if (key === 'source' && value && !locationSources.includes(value)) {
                throw new Error(
                    `Tracker.setLocation: "source" must be one of: ${locationSources.join(
                        ', '
                    )}`
                );
            }

            this.location[key] = value;
        }

        return this;
    }

    trackPagedPublicationOpened(
        properties: PagedPublicationOpenedEvent,
        version?: number
    ) {
        return this.trackEvent(1, properties, version);
    }

    trackPagedPublicationPageOpened(
        properties: PagedPublicationPageOpenedEvent,
        version?: number
    ) {
        return this.trackEvent(2, properties, version);
    }

    trackOfferOpened(properties: OfferOpenedEvent, version?: number) {
        return this.trackEvent(3, properties, version);
    }

    trackSearched(properties: SearchedEvent, version?: number) {
        return this.trackEvent(5, properties, version);
    }

    trackIncitoPublicationOpened(
        properties: IncitoPublicationOpenedV2Event,
        version?: number
    ) {
        return this.trackEvent(11, properties, version);
    }

    trackIncitoPublicationSectionOpened(
        properties: {
            //  Incito Publication ID
            'ip.id': string;
            //  Incito Publication Section ID
            'ips.id': string;
            //  Incito Publication Section Position
            'ips.p': number;
            //  Milliseconds On Screen
            mos: number;
            // Viewtoken
            vt: string;
            //
            _t: number;
        },
        version?: number
    ) {
        return this.trackEvent(13, properties, version);
    }

    createViewToken(...parts: string[]) {
        return btoa(
            String.fromCharCode.apply(
                null,
                md5([this.client.id].concat(parts).join(''), {
                    asBytes: true
                }).slice(0, 8)
            )
        );
    }

    dispatchLimit = 100;
    dispatchTimeout: ReturnType<typeof setTimeout> | null = null;
    dispatch() {
        if (this.dispatchTimeout) return;
        // Queue up a dispatch if none is queued
        this.dispatchTimeout = setTimeout(() => this.dispatchBeacon(), 4000);
    }
    dispatchBeacon() {
        for (const events of chunk(this.pool, this.dispatchLimit)) {
            sendBeacon(this.eventsTrackUrl, JSON.stringify({events}));
        }
        this.pool = [];
        this.dispatchTimeout = null;
    }
}

export default Tracker;
