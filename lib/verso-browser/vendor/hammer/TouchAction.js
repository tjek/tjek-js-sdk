import {DIRECTION_HORIZONTAL, DIRECTION_VERTICAL} from './Input';
import prefixed from './utils/prefixed';

const PREFIXED_TOUCH_ACTION =
    typeof document !== 'undefined' &&
    prefixed(document.createElement('div').style, 'touchAction');

// magical touchAction value
export const TOUCH_ACTION_COMPUTE = 'compute';
export const TOUCH_ACTION_AUTO = 'auto';
export const TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
export const TOUCH_ACTION_PAN_X = 'pan-x';
export const TOUCH_ACTION_PAN_Y = 'pan-y';
export const TOUCH_ACTION_NONE = 'none';
const actions = [
    'auto',
    'manipulation',
    'pan-y',
    'pan-x',
    'pan-x pan-y',
    'none'
];
const cssSupports = typeof window !== 'undefined' && window.CSS?.supports;
const TOUCH_ACTION_MAP =
    PREFIXED_TOUCH_ACTION &&
    actions.reduce((touchMap, val) => {
        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? cssSupports('touch-action', val) : true;

        return touchMap;
    }, {});

function cleanTouchActions(actions) {
    // none
    if (actions.includes(TOUCH_ACTION_NONE)) return TOUCH_ACTION_NONE;

    const hasPanX = actions.includes(TOUCH_ACTION_PAN_X);
    const hasPanY = actions.includes(TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) return TOUCH_ACTION_NONE;

    // pan-x OR pan-y
    if (hasPanX) return TOUCH_ACTION_PAN_X;

    if (hasPanY) return TOUCH_ACTION_PAN_Y;

    // manipulation
    const hasManipulation = actions.includes(TOUCH_ACTION_MANIPULATION);
    if (hasManipulation) return TOUCH_ACTION_MANIPULATION;

    return TOUCH_ACTION_AUTO;
}

/**
 * @private
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
export default class TouchAction {
    constructor(manager, value) {
        this.manager = manager;
        this.set(value);
    }

    /**
     * @private
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set(value) {
        // find out the touch-action by the event handlers
        if (value === TOUCH_ACTION_COMPUTE) value = this.compute();

        if (
            PREFIXED_TOUCH_ACTION &&
            this.manager.element.style &&
            TOUCH_ACTION_MAP[value]
        ) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    }

    /**
     * @private
     * just re-set the touchAction value
     */
    update() {
        this.set(this.manager.options.touchAction);
    }

    /**
     * @private
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute() {
        return cleanTouchActions(
            this.manager.recognizers
                .reduce(
                    (actions, recognizer) =>
                        recognizer.options.enable
                            ? actions.concat(recognizer.getTouchAction())
                            : actions,
                    []
                )
                .join(' ')
        );
    }

    /**
     * @private
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults({
        srcEvent,
        pointers,
        distance,
        deltaTime,
        offsetDirection
    }) {
        // if the touch action did prevented once this session
        if (this.manager.session.prevented) return srcEvent.preventDefault();

        const hasNone =
            this.actions.includes(TOUCH_ACTION_NONE) &&
            !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];

        // do not prevent defaults if this is a tap gesture
        if (hasNone && pointers.length === 1 && distance < 2 && deltaTime < 250)
            return;

        const hasPanY =
            this.actions.includes(TOUCH_ACTION_PAN_Y) &&
            !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        const hasPanX =
            this.actions.includes(TOUCH_ACTION_PAN_X) &&
            !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
        if (hasPanX && hasPanY) return;

        if (
            hasNone ||
            (hasPanY && offsetDirection & DIRECTION_HORIZONTAL) ||
            (hasPanX && offsetDirection & DIRECTION_VERTICAL)
        ) {
            this.manager.session.prevented = true;
            srcEvent.preventDefault();
        }
    }
}
