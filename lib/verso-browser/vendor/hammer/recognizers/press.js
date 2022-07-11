import {INPUT_CANCEL, INPUT_END, INPUT_START} from '../Input';
import Recognizer, {
    STATE_FAILED,
    STATE_POSSIBLE,
    STATE_RECOGNIZED
} from '../Recognizer';
import {TOUCH_ACTION_AUTO} from '../TouchAction';

/**
 * @private
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
export default class PressRecognizer extends Recognizer {
    _timer = null;
    _input = null;

    getTouchAction() {
        return [TOUCH_ACTION_AUTO];
    }

    process(input) {
        const {options} = this;

        const validPointers = input.pointers.length === options.pointers;
        const validMovement = input.distance < options.threshold;
        const validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (
            !validMovement ||
            !validPointers ||
            (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)
        ) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeout(() => {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    }

    reset() {
        clearTimeout(this._timer);
    }

    emit(input) {
        if (this.state !== STATE_RECOGNIZED) return;

        if (input && input.eventType & INPUT_END) {
            this.manager.emit(`${this.options.event}up`, input);
        } else {
            this._input.timeStamp = Date.now();
            this.manager.emit(this.options.event, this._input);
        }
    }
    /**
     * @private
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit(input) {
        if (this.canEmit()) return this.emit(input);

        // it's failing anyway
        this.state = STATE_FAILED;
    }

    /**
     * @private
     * can we emit?
     * @returns {boolean}
     */
    canEmit() {
        let i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE)))
                return false;

            i++;
        }
        return true;
    }
}

PressRecognizer.prototype.defaults = {
    event: 'press',
    pointers: 1,
    time: 251, // minimal time of the pointer to be pressed
    threshold: 9 // a minimal movement is ok, but keep it low
};
