import {
    directionStr,
    DIRECTION_ALL,
    DIRECTION_DOWN,
    DIRECTION_HORIZONTAL,
    DIRECTION_LEFT,
    DIRECTION_NONE,
    DIRECTION_RIGHT,
    DIRECTION_UP,
    DIRECTION_VERTICAL
} from '../Input';
import {STATE_BEGAN} from '../Recognizer';
import {TOUCH_ACTION_PAN_X, TOUCH_ACTION_PAN_Y} from '../TouchAction';
import AttrRecognizer from './attribute';

/**
 * @private
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
export default class PanRecognizer extends AttrRecognizer {
    pX = null;
    pY = null;

    getTouchAction() {
        const {
            options: {direction}
        } = this;

        const actions = [];
        if (direction & DIRECTION_HORIZONTAL) actions.push(TOUCH_ACTION_PAN_Y);
        if (direction & DIRECTION_VERTICAL) actions.push(TOUCH_ACTION_PAN_X);

        return actions;
    }

    directionTest(input) {
        const {options} = this;

        const {deltaX, deltaY} = input;
        let {distance} = input;

        // lock to axis?
        let hasMoved = true;
        if (!(input.direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                input.direction =
                    deltaX === 0
                        ? DIRECTION_NONE
                        : deltaX < 0
                        ? DIRECTION_LEFT
                        : DIRECTION_RIGHT;
                hasMoved = deltaX !== this.pX;
                distance = Math.abs(deltaX);
            } else {
                input.direction =
                    deltaY === 0
                        ? DIRECTION_NONE
                        : deltaY < 0
                        ? DIRECTION_UP
                        : DIRECTION_DOWN;
                hasMoved = deltaY !== this.pY;
                distance = Math.abs(deltaY);
            }
        }

        return (
            hasMoved &&
            distance > options.threshold &&
            input.direction & options.direction
        );
    }

    attrTest(input) {
        return (
            super.attrTest(input) &&
            (this.state & STATE_BEGAN ||
                (!(this.state & STATE_BEGAN) && this.directionTest(input)))
        );
    }

    emit(input) {
        this.pX = input.deltaX;
        this.pY = input.deltaY;

        const direction = directionStr(input.direction);
        if (direction) input.additionalEvent = this.options.event + direction;

        super.emit(input);
    }
}

PanRecognizer.prototype.defaults = {
    event: 'pan',
    threshold: 10,
    pointers: 1,
    direction: DIRECTION_ALL
};
