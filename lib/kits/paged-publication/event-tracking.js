import MicroEvent from 'microevent';

class PagedPublicationEventTracking extends MicroEvent {
    constructor(eventTracker, id) {
        super();
        this.eventTracker = eventTracker;
        this.id = id;
        this.hidden = true;
        this.pageSpread = null;

        this.bind('appeared', this.appeared.bind(this));
        this.bind('disappeared', this.disappeared.bind(this));
        this.bind('beforeNavigation', this.beforeNavigation.bind(this));
        this.bind('afterNavigation', this.afterNavigation.bind(this));
        this.bind('attemptedNavigation', this.attemptedNavigation.bind(this));
        this.bind('panStart', this.panStart.bind(this));
        this.bind('destroyed', this.destroy.bind(this));
    }

    destroy() {
        this.pageSpreadDisappeared();
    }

    trackOpened() {
        if (this.eventTracker == null) {
            return this;
        }

        this.eventTracker.trackPagedPublicationOpened({
            'pp.id': this.id,
            vt: this.eventTracker.createViewToken(this.id)
        });

        return this;
    }

    trackPageSpreadDisappeared(pageNumbers) {
        if (this.eventTracker == null) {
            return this;
        }

        pageNumbers.forEach((pageNumber) => {
            this.eventTracker.trackPagedPublicationPageDisappeared({
                'pp.id': this.id,
                'ppp.n': pageNumber,
                vt: this.eventTracker.createViewToken(this.id, pageNumber)
            });
        });

        return this;
    }

    appeared(e) {
        this.pageSpreadAppeared(e.pageSpread);
    }

    disappeared() {
        this.pageSpreadDisappeared();
    }

    beforeNavigation() {
        this.pageSpreadDisappeared();
    }

    afterNavigation(e) {
        this.pageSpreadAppeared(e.pageSpread);
    }

    attemptedNavigation(e) {
        this.pageSpreadAppeared(e.pageSpread);
    }

    panStart(e) {
        if (e.scale === 1) {
            this.pageSpreadDisappeared();
        }
    }

    pageSpreadAppeared(pageSpread) {
        if (pageSpread && this.hidden === true) {
            this.pageSpread = pageSpread;
            this.hidden = false;
        }
    }

    pageSpreadDisappeared() {
        if (this.pageSpread && this.hidden === false) {
            this.trackPageSpreadDisappeared(
                this.pageSpread.getPages().map((page) => page.pageNumber)
            );

            this.hidden = true;
            this.pageSpread = null;
        }
    }
}

export default PagedPublicationEventTracking;
