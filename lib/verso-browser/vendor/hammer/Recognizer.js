export const STATE_POSSIBLE = 1;
export const STATE_BEGAN = 2;
export const STATE_CHANGED = 4;
export const STATE_ENDED = 8;
export const STATE_RECOGNIZED = STATE_ENDED;
export const STATE_CANCELLED = 16;
export const STATE_FAILED = 32;

/**
 * @private
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
const getRecognizerByNameIfManager = (otherRecognizer, recognizer) =>
    recognizer.manager
        ? recognizer.manager.get(otherRecognizer)
        : otherRecognizer;

function stateStr(state) {
    if (state & STATE_CANCELLED) return 'cancel';

    if (state & STATE_ENDED) return 'end';

    if (state & STATE_CHANGED) return 'move';

    if (state & STATE_BEGAN) return 'start';

    return '';
}

/**
 * @private
 * get a unique id
 * @returns {number} uniqueId
 */
let _uniqueId = 1;
const uniqueId = () => _uniqueId++;

/**
 * @private
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */

/**
 * @private
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
export default class Recognizer {
    id = uniqueId();
    manager = null;
    state = STATE_POSSIBLE;
    simultaneous = {};
    requireFail = [];
    constructor(options) {
        this.options = {...this.defaults, ...options};
        this.options.enable = this.options.enable ?? true;
    }

    /**
     * @private
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set(options) {
        Object.assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        if (this.manager) this.manager.touchAction.update();

        return this;
    }

    /**
     * @private
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith(otherRecognizer) {
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!this.simultaneous[otherRecognizer.id]) {
            this.simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }

        return this;
    }

    /**
     * @private
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith(otherRecognizer) {
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];

        return this;
    }

    /**
     * @private
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure(otherRecognizer) {
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (this.requireFail.indexOf(otherRecognizer) === -1) {
            this.requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }

        return this;
    }

    /**
     * @private
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure(otherRecognizer) {
        const index = this.requireFail.indexOf(
            getRecognizerByNameIfManager(otherRecognizer, this)
        );
        if (index > -1) this.requireFail.splice(index, 1);

        return this;
    }

    /**
     * @private
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures() {
        return this.requireFail.length > 0;
    }

    /**
     * @private
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith(otherRecognizer) {
        return Boolean(this.simultaneous[otherRecognizer.id]);
    }

    /**
     * @private
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit(input) {
        const {manager, options, state} = this;

        const emit = (event) => manager.emit(event, input);

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) emit(options.event + stateStr(state));

        emit(this.options.event); // simple 'eventName' events

        // additional event(panleft, panright, pinchin, pinchout...)
        if (input.additionalEvent) emit(input.additionalEvent);

        // panend and pancancel
        if (state >= STATE_ENDED) emit(options.event + stateStr(state));
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
            const state = this.requireFail[i].state;
            if (!(state & (STATE_FAILED | STATE_POSSIBLE))) return false;

            i++;
        }

        return true;
    }

    /**
     * @private
     * update the recognizer
     * @param {Object} inputData
     */
    recognize(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        const inputDataClone = {...inputData};

        // is is enabled and allow recognizing?
        if (!this.options.enable) {
            this.reset();
            this.state = STATE_FAILED;

            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (
            this.state &
            (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)
        ) {
            this.tryEmit(inputDataClone);
        }
    }

    /**
     * @private
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {constant} STATE
     */

    /* jshint ignore:start */
    process() {}
    /* jshint ignore:end */

    /**
     * @private
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction() {}

    /**
     * @private
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset() {}
}
