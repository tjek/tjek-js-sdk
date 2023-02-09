import MicroEvent from 'microevent';
import Tracker from '../events/tracker';
import PagedPublicationPageSpread from './page-spread';

class PagedPublicationEventTracking extends MicroEvent {
    hidden = true;
    pageSpread: null | PagedPublicationPageSpread = null;
    eventTracker: Tracker;
    id: string;
    constructor(eventTracker: Tracker, id: string) {
        super();
        this.eventTracker = eventTracker;
        this.id = id;

        this.bind('appeared', this.appeared);
        this.bind('disappeared', this.disappeared);
        this.bind('beforeNavigation', this.beforeNavigation);
        this.bind('afterNavigation', this.afterNavigation);
        this.bind('attemptedNavigation', this.attemptedNavigation);
        this.bind('panStart', this.panStart);
        this.bind('destroyed', this.destroy);
    }

    destroy = () => {
        this.pageSpreadDisappeared();
    };

    trackOpened() {
        if (!this.eventTracker) return this;

        this.eventTracker.trackPagedPublicationOpened({
            'pp.id': this.id,
            vt: this.eventTracker.createViewToken(this.id)
        });

        return this;
    }

    trackPageSpreadAppeared(pageNumbers: number[]) {
        if (!this.eventTracker) return this;

        pageNumbers.forEach((pageNumber) => {
            this.eventTracker.trackPagedPublicationPageOpened({
                'pp.id': this.id,
                'ppp.n': pageNumber,
                vt: this.eventTracker.createViewToken(
                    this.id,
                    String(pageNumber)
                )
            });
        });

        return this;
    }

    appeared = (e) => {
        this.pageSpreadAppeared(e.pageSpread);
    };

    disappeared = () => {
        this.pageSpreadDisappeared();
    };

    beforeNavigation = () => {
        this.pageSpreadDisappeared();
    };

    afterNavigation = (e) => {
        this.pageSpreadAppeared(e.pageSpread);
    };

    attemptedNavigation = (e) => {
        this.pageSpreadAppeared(e.pageSpread);
    };

    panStart = (e) => {
        if (e.scale === 1) this.pageSpreadDisappeared();
    };

    pageSpreadAppeared(pageSpread: PagedPublicationPageSpread) {
        if (pageSpread && this.hidden) {
            this.pageSpread = pageSpread;
            this.hidden = false;

            this.trackPageSpreadAppeared(
                pageSpread.getPages().map((page) => page.pageNumber)
            );
        }
    }

    pageSpreadDisappeared() {
        if (this.pageSpread && !this.hidden) {
            this.hidden = true;
            this.pageSpread = null;
        }
    }
}

export default PagedPublicationEventTracking;
