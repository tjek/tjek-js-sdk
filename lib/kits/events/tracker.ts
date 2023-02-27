import md5 from 'md5';
import {eventsTrackUrl as defaultEventsTrackUrl} from '../../config-defaults';
import * as clientLocalStorage from '../../storage/client-local';
import {chunk, error, isBrowser, throttle} from '../../util';

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

interface BaseEvent {
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
type WolfEvent = WolfEventTypeMap[keyof WolfEventTypeMap];

class Tracker {
    hasMadeInitialDispatch = false;
    location = {geohash: null, time: null, country: null};
    trackId: string | null = null;
    poolLimit = 1000;
    pool: (BaseEvent & WolfEvent)[] = [];
    client: TrackerClient;
    eventsTrackUrl: string;

    handleVisibility = () => {
        if (document.visibilityState === 'hidden') this.dispatchBeacon();
    };
    handleBeforeUnload = () => {
        if (document.visibilityState === 'hidden') this.dispatchBeacon();
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

        if (this.location.time) evt['l.ht'] = this.location.time;

        if (this.location.country) evt['l.c'] = this.location.country;

        this.pool.push(evt);
        while (this.pool.length > this.poolLimit) this.pool.shift();

        this.dispatch();

        return this;
    }

    setLocation(location) {
        for (const key in location) this.location[key] = location[key];

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

    dispatching = false;
    dispatchLimit = 100;
    dispatch = throttle(this.dispatchBeacon, 4000);
    dispatchBeacon() {
        for (const events of chunk(this.pool, this.dispatchLimit)) {
            navigator.sendBeacon(this.eventsTrackUrl, JSON.stringify({events}));
        }
        this.pool = [];
    }
}

export default Tracker;
