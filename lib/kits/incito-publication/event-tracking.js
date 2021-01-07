import MicroEvent from 'microevent';

class IncitoPublicationEventTracking extends MicroEvent {
    constructor(eventTracker, details) {
        super();
        this.eventTracker = eventTracker;
        this.details = details;
    }

    trackOpened() {
        if (this.eventTracker == null || this.details == null) {
            return this;
        }

        this.eventTracker.trackIncitoPublicationOpened({
            'ip.paged': this.details.types.indexOf('paged') > -1,
            'ip.id': this.details.id,
            vt: this.eventTracker.createViewToken(this.details.id)
        });

        return this;
    }
}

export default IncitoPublicationEventTracking;
