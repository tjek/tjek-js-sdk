import MicroEvent from 'microevent';
import Incito from '../../incito-browser/incito';
import EventTracking from './event-tracking';
import './viewer.styl';

class Viewer extends MicroEvent {
    static Incito = Incito;
    constructor(el, options = {}) {
        super();
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

export default Viewer;
