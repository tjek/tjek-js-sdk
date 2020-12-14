const Incito = require('incito-browser');
const MicroEvent = require('microevent');
const EventTracking = require('./event-tracking');

class Viewer {
    constructor(el, options = {}) {
        this.el = el;
        this.options = options;
        this.incito = new Incito(this.el, {
            incito: this.options.incito,
            renderLaziness: this.options.renderLaziness
        });
        this._eventTracking = new EventTracking(
            this.options.eventTracker,
            this.options.details
        );
    }

    start() {
        this.incito.start();
        this.el.classList.add('sgn-incito--started');
        this._eventTracking.trackOpened();

        return this;
    }

    destroy() {
        this.incito.destroy();
    }
}
Viewer.Incito = Incito;

MicroEvent.mixin(Viewer);

module.exports = Viewer;
