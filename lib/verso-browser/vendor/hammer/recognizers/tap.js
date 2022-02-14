import {getDistance, INPUT_END, INPUT_START} from '../Input';
import Recognizer, {STATE_FAILED, STATE_RECOGNIZED} from '../Recognizer';
import {TOUCH_ACTION_MANIPULATION} from '../TouchAction';

/**
 * @private
 * A tap is recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
export default class TapRecognizer extends Recognizer {
    // previous time and center,
    // used for tap counting
    pTime = false;
    pCenter = false;
    _timer = null;
    _input = null;
    count = 0;

    getTouchAction() {
        return [TOUCH_ACTION_MANIPULATION];
    }

    process(input) {
        const {options} = this;

        const validPointers = input.pointers.length === options.pointers;
        const validMovement = input.distance < options.threshold;
        const validTouchTime = input.deltaTime < options.time;

        this.reset();

        if (input.eventType & INPUT_START && this.count === 0) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType !== INPUT_END) return this.failTimeout();

            const validInterval = this.pTime
                ? input.timeStamp - this.pTime < options.interval
                : true;
            const validMultiTap =
                !this.pCenter ||
                getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            this.count = !validMultiTap || !validInterval ? 1 : this.count + 1;

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            if (this.count % options.taps === 0) return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    }

    failTimeout() {
        this._timer = setTimeout(() => {
            this.state = STATE_FAILED;
        }, this.options.interval);
        return STATE_FAILED;
    }

    reset() {
        clearTimeout(this._timer);
    }

    emit() {
        if (this.state === STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
}

TapRecognizer.prototype.defaults = {
    event: 'tap',
    pointers: 1,
    taps: 1,
    interval: 300, // max time between the multi-tap taps
    time: 250, // max time of the pointer to be down (like finger on the screen)
    threshold: 9, // a minimal movement is ok, but keep it low
    posThreshold: 10 // a multi-tap can be a bit off the initial position
};
