import MicroEvent, {EventArg} from '../../../vendor/microevent';
import Incito from '../../incito-browser/incito';
import type {V2Catalog} from '../core';
import type {Tracker} from '../events';

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
    trackIncitoPublicationOpenedMinimumMosMs = 500;
    sectionVisibility: Map<string, number> = new Map();
    onSectionVisible = ({
        sectionId,
        sectionPosition
    }: EventArg<Incito, 'sectionVisible'>) => {
        if (!this.eventTracker || !this.details) return this;

        const sectionKey = `${sectionId}-${sectionPosition}`;
        this.sectionVisibility.set(sectionKey, Date.now());
    };
    onSectionHidden = ({
        sectionId,
        sectionPosition
    }: EventArg<Incito, 'sectionVisible'>) => {
        if (!this.eventTracker || !this.details) return this;

        const sectionKey = `${sectionId}-${sectionPosition}`;
        const visibleFrom = this.sectionVisibility.get(sectionKey);
        this.sectionVisibility.delete(sectionKey);
        if (!visibleFrom) return;

        const mos = Date.now() - visibleFrom;
        if (mos <= this.trackIncitoPublicationOpenedMinimumMosMs) return;

        this.eventTracker.trackIncitoPublicationSectionOpened({
            'ip.id': this.details.id,
            'ips.id': sectionId,
            'ips.p': sectionPosition,
            _t: Math.round(visibleFrom / 1000),
            mos,
            vt: this.eventTracker.createViewToken(this.details.id, sectionKey)
        });
    };
}

export default IncitoPublicationEventTracking;
