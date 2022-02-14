import Input, {
    INPUT_CANCEL,
    INPUT_END,
    INPUT_MOVE,
    INPUT_START,
    INPUT_TYPE_TOUCH
} from '../Input';

const POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

const POINTER_ELEMENT_EVENTS = 'pointerdown';
const POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

/**
 * @private
 * Pointer events input
 * @constructor
 * @extends Input
 */
export default class PointerEventInput extends Input {
    evEl = POINTER_ELEMENT_EVENTS;
    evWin = POINTER_WINDOW_EVENTS;
    constructor() {
        super(...arguments);

        this.store = this.manager.session.pointerEvents = [];

        this.init();
    }

    /**
     * @private
     * handle mouse events
     * @param {Object} ev
     */
    handler(ev) {
        const {store} = this;
        let removePointer = false;

        const eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        const eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        const pointerType = ev.pointerType;

        const isTouch = pointerType === INPUT_TYPE_TOUCH;

        // get index of the event in the store
        let storeIndex = store.findIndex(
            ({pointerId}) => pointerId === ev.pointerId
        );

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) return;

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType,
            srcEvent: ev
        });

        // remove from the store
        if (removePointer) store.splice(storeIndex, 1);
    }
}
