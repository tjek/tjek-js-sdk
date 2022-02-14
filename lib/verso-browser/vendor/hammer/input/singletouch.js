import {TOUCH_INPUT_MAP} from '../Input';
import Input from '../inputjs/input-constructor';
import {
    INPUT_CANCEL,
    INPUT_END,
    INPUT_START,
    INPUT_TYPE_TOUCH
} from '../inputjs/input-consts';
import toArray from '../utils/to-array';
import uniqueArray from '../utils/unique-array';

const SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
const SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * @private
 * Touch events input
 * @constructor
 * @extends Input
 */
export default class SingleTouchInput extends Input {
    evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    started = false;
    constructor() {
        super(...arguments);

        this.init();
    }

    handler(ev) {
        const type = TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) this.started = true;

        if (!this.started) return;

        const touches = this.normalizeSingleTouches(ev, type);

        // when done, reset the started state
        if (
            type & (INPUT_END | INPUT_CANCEL) &&
            touches[0].length - touches[1].length === 0
        ) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
    normalizeSingleTouches(ev, type) {
        const changed = toArray(ev.changedTouches);

        let all = toArray(ev.touches);
        if (type & (INPUT_END | INPUT_CANCEL)) {
            all = uniqueArray(all.concat(changed), 'identifier', true);
        }

        return [all, changed];
    }
}
