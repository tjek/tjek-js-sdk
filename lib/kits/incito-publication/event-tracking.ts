import MicroEvent from 'microevent';
import {V2Catalog} from '../core';
import {Tracker} from '../events';

class IncitoPublicationEventTracking extends MicroEvent {
    eventTracker: Tracker | undefined;
    details: V2Catalog | undefined;
    constructor(eventTracker?: Tracker, details?: V2Catalog) {
        super();
        this.eventTracker = eventTracker;
        this.details = details;
    }

    trackOpened() {
        if (!this.eventTracker || !this.details) return this;

        this.eventTracker.trackIncitoPublicationOpened({
            'ip.paged': this.details.types.indexOf('paged') > -1,
            'ip.id': this.details.id,
            vt: this.eventTracker.createViewToken(this.details.id)
        });

        return this;
    }
}

export default IncitoPublicationEventTracking;
