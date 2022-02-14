import Input, {
    INPUT_CANCEL,
    INPUT_END,
    INPUT_START,
    INPUT_TYPE_MOUSE,
    INPUT_TYPE_TOUCH
} from '../Input';
import MouseInput from './mouse';
import TouchInput from './touch';

/**
 * @private
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

const DEDUP_TIMEOUT = 2500;
const DEDUP_DISTANCE = 25;

export default class TouchMouseInput extends Input {
    primaryTouch = null;
    lastTouches = [];
    constructor() {
        super(...arguments);

        this.touch = new TouchInput(this.manager, this.handler);
        this.mouse = new MouseInput(this.manager, this.handler);

        this.init();
    }

    /**
     * @private
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler = (manager, inputEvent, inputData) => {
        const isTouch = inputData.pointerType === INPUT_TYPE_TOUCH;
        const isMouse = inputData.pointerType === INPUT_TYPE_MOUSE;

        if (
            isMouse &&
            inputData.sourceCapabilities &&
            inputData.sourceCapabilities.firesTouchEvents
        ) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            if (inputEvent & INPUT_START) {
                this.primaryTouch = inputData.changedPointers[0].identifier;
                this.setLastTouch(inputData);
            } else if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
                this.setLastTouch(inputData);
            }
        } else if (isMouse && this.isSyntheticEvent(inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    };

    /**
     * @private
     * remove the event listeners
     */
    destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }

    isSyntheticEvent({srcEvent: {clientX, clientY}}) {
        return this.lastTouches.some(
            ({x, y}) =>
                Math.abs(clientX - x) <= DEDUP_DISTANCE &&
                Math.abs(clientY - y) <= DEDUP_DISTANCE
        );
    }

    setLastTouch({changedPointers: [{identifier, clientX, clientY}]}) {
        if (identifier === this.primaryTouch) {
            const lastTouch = {x: clientX, y: clientY};
            this.lastTouches.push(lastTouch);
            const lts = this.lastTouches;
            setTimeout(() => {
                const i = lts.indexOf(lastTouch);
                if (i > -1) lts.splice(i, 1);
            }, DEDUP_TIMEOUT);
        }
    }
}
