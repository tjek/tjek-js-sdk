import MicroEvent from '../../../vendor/microevent';
import Incito from '../../incito-browser/incito';
import {IIncito} from '../../incito-browser/types';
import {V2Catalog} from '../core';
import {Tracker} from '../events';
import EventTracking from './event-tracking';
import './viewer.styl';

interface ViewerInit {
    incito: IIncito;
    eventTracker?: Tracker;
    details?: V2Catalog;
}
class Viewer extends MicroEvent {
    static Incito = Incito;
    el: any;
    options: ViewerInit;
    incito: Incito;
    _eventTracking: EventTracking;
    scrollableContainer: string;
    constructor(
        el: HTMLElement,
        options: ViewerInit,
        scrollableContainer: string
    ) {
        super();

        this.el = el;
        this.options = options;
        this.scrollableContainer = scrollableContainer;
        this.incito = new Incito(
            this.el,
            {
                incito: this.options.incito
            },
            this.scrollableContainer
        );
        this._eventTracking = new EventTracking(
            this.options.eventTracker,
            this.options.details
        );
    }

    start() {
        this.incito.bind(
            'sectionVisible',
            this._eventTracking.onSectionVisible
        );
        this.incito.bind('sectionHidden', this._eventTracking.onSectionHidden);
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
